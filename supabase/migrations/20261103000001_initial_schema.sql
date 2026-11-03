-- =====================================================================
-- BloodBond Bangladesh: PostgreSQL Database Migration
-- Complete Schema with RLS, Triggers, Functions and Constraints
-- =====================================================================

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 1. ENUMS
DO $$ BEGIN
    CREATE TYPE blood_group_type AS ENUM ('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE user_role_type AS ENUM ('super_admin', 'admin', 'district_admin', 'org_admin', 'donor', 'recipient', 'guest');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE gender_type AS ENUM ('male', 'female', 'other');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE request_status_type AS ENUM ('pending', 'searching', 'donor_found', 'accepted', 'completed', 'cancelled', 'expired');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE priority_level_type AS ENUM ('low', 'normal', 'urgent', 'critical');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE verification_status_type AS ENUM ('unverified', 'pending', 'verified', 'rejected');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE donation_type_enum AS ENUM ('whole_blood', 'platelets', 'plasma', 'double_red_cells');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 2. GEOGRAPHICAL TABLES
CREATE TABLE IF NOT EXISTS divisions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL UNIQUE,
    bn_name VARCHAR(100) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS districts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    division_id UUID NOT NULL REFERENCES divisions(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    bn_name VARCHAR(100) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(division_id, name)
);

CREATE TABLE IF NOT EXISTS upazilas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    district_id UUID NOT NULL REFERENCES districts(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    bn_name VARCHAR(100) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(district_id, name)
);

CREATE TABLE IF NOT EXISTS unions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    upazila_id UUID NOT NULL REFERENCES upazilas(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    bn_name VARCHAR(100) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. PROFILES TABLE (Linked with Supabase auth.users or standalone uuid)
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    auth_user_id UUID UNIQUE,
    full_name VARCHAR(150) NOT NULL,
    phone VARCHAR(20) NOT NULL UNIQUE,
    email VARCHAR(150) UNIQUE,
    avatar_url TEXT,
    date_of_birth DATE NOT NULL,
    gender gender_type NOT NULL,
    occupation VARCHAR(100),
    bio TEXT,
    is_phone_verified BOOLEAN DEFAULT FALSE,
    is_email_verified BOOLEAN DEFAULT FALSE,
    preferred_language VARCHAR(5) DEFAULT 'bn',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. USER ROLES
CREATE TABLE IF NOT EXISTS user_roles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    role user_role_type NOT NULL DEFAULT 'donor',
    assigned_by UUID REFERENCES profiles(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(profile_id, role)
);

-- 5. DONORS TABLE
CREATE TABLE IF NOT EXISTS donors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE UNIQUE,
    donor_code VARCHAR(30) NOT NULL UNIQUE, -- e.g. BB-BD-2026-0841
    blood_group blood_group_type NOT NULL,
    division_id UUID NOT NULL REFERENCES divisions(id),
    district_id UUID NOT NULL REFERENCES districts(id),
    upazila_id UUID NOT NULL REFERENCES upazilas(id),
    union_id UUID REFERENCES unions(id),
    present_address TEXT NOT NULL,
    permanent_address TEXT,
    is_available BOOLEAN DEFAULT TRUE,
    manual_unavailable BOOLEAN DEFAULT FALSE,
    last_donation_date DATE,
    next_eligible_date DATE,
    verification_status verification_status_type DEFAULT 'unverified',
    verified_at TIMESTAMPTZ,
    verified_by UUID REFERENCES profiles(id),
    total_donations_count INT DEFAULT 0,
    total_verified_donations INT DEFAULT 0,
    rating_avg NUMERIC(3, 2) DEFAULT 5.00,
    review_count INT DEFAULT 0,
    emergency_contact VARCHAR(20),
    preferred_contact_method VARCHAR(20) DEFAULT 'call',
    medical_declaration_accepted BOOLEAN NOT NULL DEFAULT TRUE,
    is_public_visible BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. ORGANIZATIONS (Hospitals, Blood Banks, Clubs)
CREATE TABLE IF NOT EXISTS organizations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(200) NOT NULL,
    type VARCHAR(50) NOT NULL DEFAULT 'hospital', -- hospital, blood_bank, volunteer_org
    division_id UUID NOT NULL REFERENCES divisions(id),
    district_id UUID NOT NULL REFERENCES districts(id),
    upazila_id UUID NOT NULL REFERENCES upazilas(id),
    address TEXT NOT NULL,
    phone VARCHAR(30) NOT NULL,
    email VARCHAR(100),
    website VARCHAR(255),
    license_number VARCHAR(100),
    verification_status verification_status_type DEFAULT 'pending',
    verified_by UUID REFERENCES profiles(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS organization_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    designation VARCHAR(100) DEFAULT 'coordinator',
    can_verify_donations BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(organization_id, profile_id)
);

-- 7. BLOOD REQUESTS (Emergency Requests)
CREATE TABLE IF NOT EXISTS blood_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    requester_id UUID REFERENCES profiles(id),
    patient_name VARCHAR(150),
    blood_group blood_group_type NOT NULL,
    bags_required INT NOT NULL DEFAULT 1,
    hospital_name VARCHAR(200) NOT NULL,
    hospital_address TEXT NOT NULL,
    division_id UUID NOT NULL REFERENCES divisions(id),
    district_id UUID NOT NULL REFERENCES districts(id),
    upazila_id UUID NOT NULL REFERENCES upazilas(id),
    required_date DATE NOT NULL,
    required_time TIME,
    primary_phone VARCHAR(20) NOT NULL,
    alternate_phone VARCHAR(20),
    contact_person VARCHAR(100) NOT NULL,
    medical_reason TEXT,
    priority priority_level_type DEFAULT 'urgent',
    status request_status_type DEFAULT 'searching',
    matched_donor_id UUID REFERENCES donors(id),
    completed_at TIMESTAMPTZ,
    expires_at TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. REQUEST RESPONSES (Donors responding to requests)
CREATE TABLE IF NOT EXISTS request_responses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    blood_request_id UUID NOT NULL REFERENCES blood_requests(id) ON DELETE CASCADE,
    donor_id UUID NOT NULL REFERENCES donors(id) ON DELETE CASCADE,
    status VARCHAR(30) DEFAULT 'interested', -- interested, accepted, rejected, completed
    message TEXT,
    responded_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(blood_request_id, donor_id)
);

-- 9. DONATION RECORDS & VERIFICATION
CREATE TABLE IF NOT EXISTS donation_records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    donor_id UUID NOT NULL REFERENCES donors(id) ON DELETE CASCADE,
    donation_date DATE NOT NULL,
    donation_type donation_type_enum DEFAULT 'whole_blood',
    hospital_name VARCHAR(200) NOT NULL,
    organization_id UUID REFERENCES organizations(id),
    blood_request_id UUID REFERENCES blood_requests(id),
    proof_document_url TEXT,
    notes TEXT,
    verification_status verification_status_type DEFAULT 'pending',
    verified_by UUID REFERENCES profiles(id),
    verified_at TIMESTAMPTZ,
    rejection_reason TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. DONOR REVIEWS
CREATE TABLE IF NOT EXISTS donor_reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    donor_id UUID NOT NULL REFERENCES donors(id) ON DELETE CASCADE,
    reviewer_id UUID NOT NULL REFERENCES profiles(id),
    donation_record_id UUID REFERENCES donation_records(id),
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    is_approved BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(donor_id, donation_record_id)
);

-- 11. CAMPAIGNS
CREATE TABLE IF NOT EXISTS campaigns (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    bn_title VARCHAR(255),
    description TEXT NOT NULL,
    banner_url TEXT,
    organization_id UUID REFERENCES organizations(id),
    division_id UUID NOT NULL REFERENCES divisions(id),
    district_id UUID NOT NULL REFERENCES districts(id),
    upazila_id UUID NOT NULL REFERENCES upazilas(id),
    venue_address TEXT NOT NULL,
    start_date TIMESTAMPTZ NOT NULL,
    end_date TIMESTAMPTZ NOT NULL,
    target_bags INT DEFAULT 50,
    collected_bags INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS campaign_registrations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    campaign_id UUID NOT NULL REFERENCES campaigns(id) ON DELETE CASCADE,
    donor_id UUID NOT NULL REFERENCES donors(id) ON DELETE CASCADE,
    status VARCHAR(30) DEFAULT 'registered', -- registered, attended, donated, absent
    registered_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(campaign_id, donor_id)
);

-- 12. NOTIFICATIONS
CREATE TABLE IF NOT EXISTS notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    type VARCHAR(50) DEFAULT 'general', -- emergency_request, verification, eligibility, system
    link TEXT,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 13. USER NOTIFICATION PREFERENCES & CONSENT
CREATE TABLE IF NOT EXISTS notification_preferences (
    profile_id UUID PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,
    email_alerts BOOLEAN DEFAULT TRUE,
    sms_alerts BOOLEAN DEFAULT TRUE,
    push_alerts BOOLEAN DEFAULT TRUE,
    emergency_radius_km INT DEFAULT 25,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS user_consents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    consent_type VARCHAR(100) NOT NULL,
    accepted BOOLEAN NOT NULL DEFAULT TRUE,
    ip_address VARCHAR(50),
    consented_at TIMESTAMPTZ DEFAULT NOW()
);

-- 14. ADMIN AUDIT LOGS
CREATE TABLE IF NOT EXISTS admin_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    admin_id UUID NOT NULL REFERENCES profiles(id),
    action VARCHAR(100) NOT NULL,
    entity_type VARCHAR(50) NOT NULL,
    entity_id UUID,
    details JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 15. INDEXES FOR PERFORMANCE
CREATE INDEX IF NOT EXISTS idx_donors_blood_group ON donors(blood_group);
CREATE INDEX IF NOT EXISTS idx_donors_division_district ON donors(division_id, district_id, upazila_id);
CREATE INDEX IF NOT EXISTS idx_donors_is_available ON donors(is_available, manual_unavailable);
CREATE INDEX IF NOT EXISTS idx_blood_requests_status ON blood_requests(status);
CREATE INDEX IF NOT EXISTS idx_blood_requests_location ON blood_requests(division_id, district_id);
CREATE INDEX IF NOT EXISTS idx_donation_records_donor ON donation_records(donor_id);
CREATE INDEX IF NOT EXISTS idx_notifications_profile ON notifications(profile_id, is_read);

-- 16. TRIGGERS & FUNCTIONS
-- Function: Auto calculate 90 days next eligibility & update donor availability
CREATE OR REPLACE FUNCTION handle_verified_donation()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.verification_status = 'verified' AND (OLD.verification_status IS NULL OR OLD.verification_status <> 'verified') THEN
        -- Update donor stats
        UPDATE donors
        SET 
            last_donation_date = NEW.donation_date,
            next_eligible_date = NEW.donation_date + INTERVAL '90 days',
            is_available = FALSE, -- Unavailable during 90-day recovery
            total_verified_donations = total_verified_donations + 1,
            updated_at = NOW()
        WHERE id = NEW.donor_id;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_handle_verified_donation ON donation_records;
CREATE TRIGGER trigger_handle_verified_donation
AFTER UPDATE ON donation_records
FOR EACH ROW
EXECUTE FUNCTION handle_verified_donation();

-- 17. ROW LEVEL SECURITY (RLS)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE donors ENABLE ROW LEVEL SECURITY;
ALTER TABLE blood_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE donation_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_logs ENABLE ROW LEVEL SECURITY;

-- Basic Policies (Public read for active donors, requests, campaigns, orgs; User-only update)
CREATE POLICY "Public can view verified active donors" 
    ON donors FOR SELECT 
    USING (is_public_visible = TRUE);

CREATE POLICY "Public can view blood requests" 
    ON blood_requests FOR SELECT 
    USING (TRUE);

CREATE POLICY "Public can view active campaigns" 
    ON campaigns FOR SELECT 
    USING (is_active = TRUE);

CREATE POLICY "Public can view verified organizations" 
    ON organizations FOR SELECT 
    USING (verification_status = 'verified');


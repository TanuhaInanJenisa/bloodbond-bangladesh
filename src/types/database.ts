export type BloodGroup = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
export type UserRole = 'super_admin' | 'admin' | 'district_admin' | 'org_admin' | 'donor' | 'recipient' | 'guest';
export type VerificationStatus = 'unverified' | 'pending' | 'verified' | 'rejected';
export type RequestPriority = 'low' | 'normal' | 'urgent' | 'critical';
export type RequestStatus = 'pending' | 'searching' | 'donor_found' | 'accepted' | 'completed' | 'cancelled' | 'expired';

export interface UserProfile {
  id: string;
  auth_user_id?: string;
  full_name: string;
  phone: string;
  email: string;
  avatar_url?: string;
  date_of_birth: string;
  gender: 'male' | 'female' | 'other';
  occupation?: string;
  bio?: string;
  role: UserRole;
  is_phone_verified: boolean;
  is_email_verified: boolean;
  created_at: string;
}

export interface DonorProfile {
  id: string;
  profile_id: string;
  donor_code: string; // e.g. BB-BD-2026-0101
  blood_group: BloodGroup;
  division_id: string;
  district_id: string;
  upazila_id: string;
  division_name: string;
  district_name: string;
  upazila_name: string;
  present_address: string;
  is_available: boolean;
  manual_unavailable: boolean;
  last_donation_date?: string;
  next_eligible_date?: string;
  verification_status: VerificationStatus;
  total_verified_donations: number;
  rating_avg: number;
  review_count: number;
  emergency_contact?: string;
  preferred_contact_method: 'call' | 'sms' | 'whatsapp';
  is_public_visible: boolean;
  profile: UserProfile;
}

export interface BloodRequest {
  id: string;
  requester_id?: string;
  patient_name: string;
  blood_group: BloodGroup;
  bags_required: number;
  hospital_name: string;
  hospital_address: string;
  division_id: string;
  district_id: string;
  upazila_id: string;
  division_name: string;
  district_name: string;
  upazila_name: string;
  required_date: string;
  required_time: string;
  primary_phone: string;
  alternate_phone?: string;
  contact_person: string;
  medical_reason?: string;
  priority: RequestPriority;
  status: RequestStatus;
  matched_donor_id?: string;
  created_at: string;
  expires_at: string;
}

export interface DonationRecord {
  id: string;
  donor_id: string;
  donation_date: string;
  donation_type: 'whole_blood' | 'platelets' | 'plasma';
  hospital_name: string;
  proof_document_url?: string;
  verification_status: VerificationStatus;
  verified_by_name?: string;
  verified_at?: string;
  notes?: string;
  created_at: string;
}

export interface Campaign {
  id: string;
  title: string;
  bn_title?: string;
  description: string;
  banner_url?: string;
  organizer_name: string;
  division_name: string;
  district_name: string;
  venue_address: string;
  start_date: string;
  end_date: string;
  target_bags: number;
  collected_bags: number;
  is_active: boolean;
}

export interface Organization {
  id: string;
  name: string;
  type: 'hospital' | 'blood_bank' | 'volunteer_club';
  division_name: string;
  district_name: string;
  address: string;
  phone: string;
  email?: string;
  is_verified: boolean;
}


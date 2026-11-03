import { BloodRequest, Campaign, DonationRecord, DonorProfile, Organization, UserProfile } from "@/types/database";
import { INITIAL_CAMPAIGNS, INITIAL_DONATION_RECORDS, INITIAL_DONORS, INITIAL_ORGANIZATIONS, INITIAL_REQUESTS } from "./mockStore";

const STORAGE_KEYS = {
  DONORS: "bloodbond_donors_v1",
  REQUESTS: "bloodbond_requests_v1",
  CAMPAIGNS: "bloodbond_campaigns_v1",
  ORGS: "bloodbond_orgs_v1",
  DONATIONS: "bloodbond_donations_v1",
  CURRENT_USER: "bloodbond_current_user_v1",
};

function safeGet<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch (e) {
    console.error("Failed to load from storage", key, e);
    return fallback;
  }
}

function safeSet<T>(key: string, data: T): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error("Failed to save to storage", key, e);
  }
}

export class BloodBondRepository {
  // DONORS
  static getDonors(): DonorProfile[] {
    return safeGet<DonorProfile[]>(STORAGE_KEYS.DONORS, INITIAL_DONORS);
  }

  static getDonorById(id: string): DonorProfile | undefined {
    const donors = this.getDonors();
    return donors.find((d) => d.id === id || d.donor_code === id);
  }

  static searchDonors(filters: {
    divisionId?: string;
    districtId?: string;
    upazilaId?: string;
    bloodGroup?: string;
    onlyAvailable?: boolean;
    onlyVerified?: boolean;
    searchTerm?: string;
  }): DonorProfile[] {
    const donors = this.getDonors();
    return donors.filter((d) => {
      if (filters.divisionId && d.division_id !== filters.divisionId) return false;
      if (filters.districtId && d.district_id !== filters.districtId) return false;
      if (filters.upazilaId && d.upazila_id !== filters.upazilaId) return false;
      if (filters.bloodGroup && filters.bloodGroup !== "ALL" && d.blood_group !== filters.bloodGroup) return false;
      if (filters.onlyAvailable && (!d.is_available || d.manual_unavailable)) return false;
      if (filters.onlyVerified && d.verification_status !== "verified") return false;
      if (filters.searchTerm) {
        const query = filters.searchTerm.toLowerCase();
        const matchName = d.profile.full_name.toLowerCase().includes(query);
        const matchCode = d.donor_code.toLowerCase().includes(query);
        const matchArea = d.present_address.toLowerCase().includes(query);
        if (!matchName && !matchCode && !matchArea) return false;
      }
      return true;
    });
  }

  static registerDonor(data: Omit<Partial<DonorProfile>, "profile"> & { profile: Partial<UserProfile> }): DonorProfile {
    const donors = this.getDonors();
    const newId = `donor-${Date.now()}`;
    const newProfId = `prof-${Date.now()}`;
    const randomCodeSuffix = Math.floor(1000 + Math.random() * 9000);
    const donorCode = `BB-BD-2026-${randomCodeSuffix}`;

    const newProfile: UserProfile = {
      id: newProfId,
      full_name: data.profile.full_name || "New Donor",
      phone: data.profile.phone || "",
      email: data.profile.email || "",
      avatar_url: data.profile.avatar_url || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
      date_of_birth: data.profile.date_of_birth || "2000-01-01",
      gender: data.profile.gender || "male",
      occupation: data.profile.occupation || "",
      bio: data.profile.bio || "",
      role: "donor",
      is_phone_verified: true,
      is_email_verified: true,
      created_at: new Date().toISOString(),
    };

    const newDonor: DonorProfile = {
      id: newId,
      profile_id: newProfId,
      donor_code: donorCode,
      blood_group: data.blood_group || "O+",
      division_id: data.division_id || "dhaka",
      district_id: data.district_id || "dhaka_dist",
      upazila_id: data.upazila_id || "dhanmondi",
      division_name: data.division_name || "Dhaka",
      district_name: data.district_name || "Dhaka",
      upazila_name: data.upazila_name || "Dhanmondi",
      present_address: data.present_address || "Dhaka, Bangladesh",
      is_available: true,
      manual_unavailable: false,
      last_donation_date: data.last_donation_date,
      next_eligible_date: data.next_eligible_date,
      verification_status: "verified", // Automatically verified in demo/MVP
      total_verified_donations: data.last_donation_date ? 1 : 0,
      rating_avg: 5.0,
      review_count: 0,
      emergency_contact: data.emergency_contact || "",
      preferred_contact_method: data.preferred_contact_method || "call",
      is_public_visible: true,
      profile: newProfile,
    };

    const updated = [newDonor, ...donors];
    safeSet(STORAGE_KEYS.DONORS, updated);
    this.setCurrentUser(newProfile);
    return newDonor;
  }

  static updateDonorAvailability(donorId: string, isAvailable: boolean): void {
    const donors = this.getDonors();
    const updated = donors.map((d) => {
      if (d.id === donorId) {
        return {
          ...d,
          is_available: isAvailable,
          manual_unavailable: !isAvailable,
        };
      }
      return d;
    });
    safeSet(STORAGE_KEYS.DONORS, updated);
  }

  // BLOOD REQUESTS
  static getRequests(): BloodRequest[] {
    return safeGet<BloodRequest[]>(STORAGE_KEYS.REQUESTS, INITIAL_REQUESTS);
  }

  static getRequestById(id: string): BloodRequest | undefined {
    return this.getRequests().find((r) => r.id === id);
  }

  static createRequest(data: Omit<BloodRequest, "id" | "created_at" | "status">): BloodRequest {
    const requests = this.getRequests();
    const newReq: BloodRequest = {
      ...data,
      id: `req-${Date.now()}`,
      created_at: new Date().toISOString(),
      status: "searching",
    };
    const updated = [newReq, ...requests];
    safeSet(STORAGE_KEYS.REQUESTS, updated);
    return newReq;
  }

  static updateRequestStatus(id: string, status: BloodRequest["status"]): void {
    const requests = this.getRequests();
    const updated = requests.map((r) => (r.id === id ? { ...r, status } : r));
    safeSet(STORAGE_KEYS.REQUESTS, updated);
  }

  // CAMPAIGNS
  static getCampaigns(): Campaign[] {
    return safeGet<Campaign[]>(STORAGE_KEYS.CAMPAIGNS, INITIAL_CAMPAIGNS);
  }

  // ORGANIZATIONS
  static getOrganizations(): Organization[] {
    return safeGet<Organization[]>(STORAGE_KEYS.ORGS, INITIAL_ORGANIZATIONS);
  }

  // DONATIONS & 90 DAYS ELIGIBILITY ENGINE
  static getDonationRecords(donorId?: string): DonationRecord[] {
    const records = safeGet<DonationRecord[]>(STORAGE_KEYS.DONATIONS, INITIAL_DONATION_RECORDS);
    if (!donorId) return records;
    return records.filter((r) => r.donor_id === donorId);
  }

  static addDonationRecord(record: Omit<DonationRecord, "id" | "created_at" | "verification_status">): DonationRecord {
    const records = safeGet<DonationRecord[]>(STORAGE_KEYS.DONATIONS, INITIAL_DONATION_RECORDS);
    const newRecord: DonationRecord = {
      ...record,
      id: `don-rec-${Date.now()}`,
      verification_status: "verified", // auto-verified in demo
      verified_by_name: "BloodBond Admin",
      verified_at: new Date().toISOString(),
      created_at: new Date().toISOString(),
    };

    // Calculate 90 days rule for Whole Blood:
    const donationDate = new Date(record.donation_date);
    const nextEligibleDate = new Date(donationDate);
    nextEligibleDate.setDate(nextEligibleDate.getDate() + 90);
    const nextEligibleStr = nextEligibleDate.toISOString().split("T")[0];

    // Update the donor record
    const donors = this.getDonors();
    const updatedDonors = donors.map((d) => {
      if (d.id === record.donor_id) {
        return {
          ...d,
          last_donation_date: record.donation_date,
          next_eligible_date: nextEligibleStr,
          is_available: false, // In recovery period
          total_verified_donations: d.total_verified_donations + 1,
        };
      }
      return d;
    });

    safeSet(STORAGE_KEYS.DONORS, updatedDonors);
    safeSet(STORAGE_KEYS.DONATIONS, [newRecord, ...records]);
    return newRecord;
  }

  // CURRENT USER SESSION (MOCK AUTH)
  static getCurrentUser(): UserProfile {
    const defaultUser: UserProfile = {
      id: "prof-01",
      full_name: "Tanvir Ahmed",
      phone: "+8801712-345678",
      email: "tanvir.ahmed@example.com",
      avatar_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      date_of_birth: "1994-05-12",
      gender: "male",
      occupation: "Software Engineer",
      bio: "Regular donor since 2018. Happy to help in emergencies.",
      role: "donor",
      is_phone_verified: true,
      is_email_verified: true,
      created_at: "2023-01-10T10:00:00Z",
    };
    return safeGet<UserProfile>(STORAGE_KEYS.CURRENT_USER, defaultUser);
  }

  static setCurrentUser(user: UserProfile): void {
    safeSet(STORAGE_KEYS.CURRENT_USER, user);
  }

  // ADMIN METRICS
  static getAdminStats() {
    const donors = this.getDonors();
    const requests = this.getRequests();
    const donations = safeGet<DonationRecord[]>(STORAGE_KEYS.DONATIONS, INITIAL_DONATION_RECORDS);

    const totalDonors = donors.length;
    const verifiedDonors = donors.filter((d) => d.verification_status === "verified").length;
    const availableDonors = donors.filter((d) => d.is_available && !d.manual_unavailable).length;
    const activeRequests = requests.filter((r) => r.status === "searching" || r.status === "pending").length;
    const totalDonations = donations.length;

    // Blood group counts
    const bloodGroupCounts: Record<string, number> = {
      "A+": 0, "A-": 0, "B+": 0, "B-": 0,
      "AB+": 0, "AB-": 0, "O+": 0, "O-": 0,
    };
    donors.forEach((d) => {
      if (bloodGroupCounts[d.blood_group] !== undefined) {
        bloodGroupCounts[d.blood_group]++;
      }
    });

    return {
      totalDonors,
      verifiedDonors,
      availableDonors,
      activeRequests,
      totalDonations,
      bloodGroupCounts,
      totalOrganizations: INITIAL_ORGANIZATIONS.length,
      totalCampaigns: INITIAL_CAMPAIGNS.length,
    };
  }
}


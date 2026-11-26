import {
  collection,
  doc,
  getDocs,
  setDoc,
  updateDoc,
  query,
  orderBy,
  limit,
  serverTimestamp,
} from "firebase/firestore";
import { getFirebaseDb, isFirebaseConfigured } from "./config";
import { DonorProfile, BloodRequest } from "@/types/database";

const COLLECTIONS = {
  DONORS: "donors",
  REQUESTS: "blood_requests",
  DONATIONS: "donation_records",
  CAMPAIGNS: "campaigns",
  USERS: "users",
};

export class FirebaseService {
  /**
   * Save a newly registered donor to Firestore
   */
  static async createDonor(donor: DonorProfile): Promise<boolean> {
    if (!isFirebaseConfigured) return false;
    const db = getFirebaseDb();
    if (!db) return false;
    try {
      await setDoc(doc(db, COLLECTIONS.DONORS, donor.id), {
        ...donor,
        created_at: serverTimestamp(),
        updated_at: serverTimestamp(),
      });
      return true;
    } catch (error) {
      console.warn("Firestore createDonor error:", error);
      return false;
    }
  }

  /**
   * Fetch all donors from Firestore
   */
  static async getDonors(): Promise<DonorProfile[]> {
    if (!isFirebaseConfigured) return [];
    const db = getFirebaseDb();
    if (!db) return [];
    try {
      const q = query(collection(db, COLLECTIONS.DONORS), limit(100));
      const querySnapshot = await getDocs(q);
      const donors: DonorProfile[] = [];
      querySnapshot.forEach((docSnap) => {
        donors.push(docSnap.data() as DonorProfile);
      });
      return donors;
    } catch (error) {
      console.warn("Firestore getDonors error:", error);
      return [];
    }
  }

  /**
   * Save an emergency blood request
   */
  static async createBloodRequest(req: BloodRequest): Promise<boolean> {
    if (!isFirebaseConfigured) return false;
    const db = getFirebaseDb();
    if (!db) return false;
    try {
      await setDoc(doc(db, COLLECTIONS.REQUESTS, req.id), {
        ...req,
        created_at: serverTimestamp(),
        updated_at: serverTimestamp(),
      });
      return true;
    } catch (error) {
      console.warn("Firestore createBloodRequest error:", error);
      return false;
    }
  }

  /**
   * Fetch active blood requests
   */
  static async getBloodRequests(): Promise<BloodRequest[]> {
    if (!isFirebaseConfigured) return [];
    const db = getFirebaseDb();
    if (!db) return [];
    try {
      const q = query(
        collection(db, COLLECTIONS.REQUESTS),
        orderBy("created_at", "desc"),
        limit(50)
      );
      const querySnapshot = await getDocs(q);
      const list: BloodRequest[] = [];
      querySnapshot.forEach((docSnap) => {
        list.push(docSnap.data() as BloodRequest);
      });
      return list;
    } catch (error) {
      console.warn("Firestore getBloodRequests error:", error);
      return [];
    }
  }

  /**
   * Update donor availability or cooldown
   */
  static async updateDonorAvailability(
    donorId: string,
    isAvailable: boolean,
    manualUnavailable?: boolean,
    lastDonationDate?: string,
    nextEligibleDate?: string
  ): Promise<boolean> {
    if (!isFirebaseConfigured) return false;
    const db = getFirebaseDb();
    if (!db) return false;
    try {
      const donorRef = doc(db, COLLECTIONS.DONORS, donorId);
      const updateData: Record<string, any> = {
        is_available: isAvailable,
        updated_at: serverTimestamp(),
      };
      if (manualUnavailable !== undefined) updateData.manual_unavailable = manualUnavailable;
      if (lastDonationDate) updateData.last_donation_date = lastDonationDate;
      if (nextEligibleDate) updateData.next_eligible_date = nextEligibleDate;

      await updateDoc(donorRef, updateData);
      return true;
    } catch (error) {
      console.warn("Firestore updateDonorAvailability error:", error);
      return false;
    }
  }
}

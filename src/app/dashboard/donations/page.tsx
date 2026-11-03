"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { BloodBondRepository } from "@/lib/data/repository";
import { DonorProfile, DonationRecord } from "@/types/database";
import {
  Droplet,
  PlusCircle,
  Building,
  Calendar,
  CheckCircle2,
  Clock,
  ShieldCheck,
  FileText,
  AlertCircle,
} from "lucide-react";

export default function DonationsPage() {
  const { language } = useLanguage();

  const [donor, setDonor] = useState<DonorProfile | null>(null);
  const [donations, setDonations] = useState<DonationRecord[]>([]);
  const [showLogModal, setShowLogModal] = useState(false);

  // Form State
  const [hospitalName, setHospitalName] = useState("");
  const [donationDate, setDonationDate] = useState("");
  const [donationType, setDonationType] = useState<"whole_blood" | "platelets" | "plasma">("whole_blood");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const curUser = BloodBondRepository.getCurrentUser();
    const donors = BloodBondRepository.getDonors();
    const myDonor = donors.find((d) => d.profile_id === curUser.id || d.id === "donor-01");
    if (myDonor) {
      setDonor(myDonor);
      loadDonations(myDonor.id);
    }
  }, []);

  const loadDonations = (donorId: string) => {
    const records = BloodBondRepository.getDonationRecords(donorId);
    setDonations(records);
  };

  const handleLogDonation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!donor || !hospitalName || !donationDate) {
      alert("Please fill in hospital name and donation date.");
      return;
    }

    setSubmitting(true);
    BloodBondRepository.addDonationRecord({
      donor_id: donor.id,
      donation_date: donationDate,
      donation_type: donationType,
      hospital_name: hospitalName,
      notes: notes,
    });

    setSubmitting(false);
    setShowLogModal(false);
    setHospitalName("");
    setDonationDate("");
    setNotes("");

    // Reload updated donor and records
    const updated = BloodBondRepository.getDonorById(donor.id);
    if (updated) setDonor(updated);
    loadDonations(donor.id);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-foreground">
            {language === "bn" ? "রক্তদানের ইতিহাস ও রেকর্ড" : "Donation History & Verification"}
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            {language === "bn"
              ? "আপনার প্রতিটি রক্তদানের হাসপাতাল রেকর্ড এবং ৯০ দিনের পরবর্তী যোগ্যতা হিসাব।"
              : "Track every verified whole-blood and apheresis donation on your health record."}
          </p>
        </div>

        <button
          onClick={() => setShowLogModal(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary-hover text-white text-xs sm:text-sm font-bold rounded-2xl shadow-md shadow-primary/20 transition-all hover:scale-105"
        >
          <PlusCircle className="w-4 h-4" />
          <span>{language === "bn" ? "নতুন রক্তদান রেকর্ড যোগ করুন" : "Log New Donation"}</span>
        </button>
      </div>

      {/* 90-Day Automation Card */}
      <div className="p-5 rounded-2xl bg-card border border-border shadow-sm flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-blood-100 text-primary">
            <Droplet className="w-6 h-6 fill-current" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-foreground">
              {language === "bn" ? "সর্বমোট যাচাইকৃত রক্তদান:" : "Total Verified Donations:"}{" "}
              <span className="text-primary font-black text-base">
                {donor?.total_verified_donations || 0} Times
              </span>
            </h3>
            <p className="text-xs text-muted-foreground">
              {language === "bn"
                ? `পরবর্তী সম্ভাব্য রক্তদানের তারিখ: ${donor?.next_eligible_date || "Eligible Now"}`
                : `Next Whole-Blood Eligibility Date: ${donor?.next_eligible_date || "Eligible Now"}`}
            </p>
          </div>
        </div>

        <span className="hidden sm:inline-flex px-3 py-1 rounded-full bg-bdgreen-100 text-bdgreen-700 text-xs font-bold">
          90-Day Auto Cooldown Engine
        </span>
      </div>

      {/* Donations List */}
      <div className="space-y-4">
        {donations.length === 0 ? (
          <div className="p-10 text-center rounded-3xl bg-card border border-border space-y-3">
            <Calendar className="w-10 h-10 text-muted-foreground mx-auto" />
            <h3 className="text-base font-bold text-foreground">
              {language === "bn" ? "এখনও কোনো রেকর্ড যুক্ত করা হয়নি" : "No Donations Logged Yet"}
            </h3>
            <p className="text-xs text-muted-foreground max-w-sm mx-auto">
              {language === "bn"
                ? "হাসপাতালে রক্তদান করার পর স্লিপের তথ্য দিয়ে রক্তদান রেকর্ড যোগ করুন।"
                : "Add your recent blood donations to earn official badges and maintain your active donor card."}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {donations.map((rec) => (
              <div
                key={rec.id}
                className="p-5 rounded-3xl bg-card border border-border shadow-sm hover:border-primary/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-extrabold text-base text-foreground">
                      {rec.hospital_name}
                    </h3>
                    <span className="px-2 py-0.5 rounded-full bg-muted text-[10px] font-bold uppercase font-mono text-muted-foreground">
                      {rec.donation_type.replace("_", " ")}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-primary" />
                      {rec.donation_date}
                    </span>
                    {rec.verified_by_name && (
                      <span className="flex items-center gap-1 text-bdgreen-600 font-semibold">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        Verified by {rec.verified_by_name}
                      </span>
                    )}
                  </div>

                  {rec.notes && (
                    <p className="text-xs text-muted-foreground italic pt-1">
                      &ldquo;{rec.notes}&rdquo;
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-bdgreen-100 text-bdgreen-700 dark:bg-bdgreen-950/40 dark:text-bdgreen-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Verified</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* LOG DONATION MODAL */}
      {showLogModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg bg-card rounded-3xl p-6 sm:p-8 border border-border shadow-2xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <h2 className="text-lg font-black text-foreground">
                {language === "bn" ? "নতুন রক্তদানের তথ্য জমা দিন" : "Log Blood Donation Record"}
              </h2>
              <button
                onClick={() => setShowLogModal(false)}
                className="text-muted-foreground hover:text-foreground text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleLogDonation} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase text-muted-foreground">
                  {language === "bn" ? "হাসপাতাল বা ব্লাড ব্যাংকের নাম *" : "Hospital / Blood Bank Name *"}
                </label>
                <input
                  type="text"
                  placeholder="e.g. Dhaka Medical College Hospital"
                  value={hospitalName}
                  onChange={(e) => setHospitalName(e.target.value)}
                  className="w-full px-4 py-2.5 bg-muted/50 border border-border rounded-xl text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase text-muted-foreground">
                    {language === "bn" ? "রক্তদানের তারিখ *" : "Donation Date *"}
                  </label>
                  <input
                    type="date"
                    value={donationDate}
                    onChange={(e) => setDonationDate(e.target.value)}
                    className="w-full px-4 py-2.5 bg-muted/50 border border-border rounded-xl text-sm text-foreground focus:outline-none"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase text-muted-foreground">
                    {language === "bn" ? "রক্তদানের ধরন" : "Donation Type"}
                  </label>
                  <select
                    value={donationType}
                    onChange={(e) => setDonationType(e.target.value as any)}
                    className="w-full px-4 py-2.5 bg-muted/50 border border-border rounded-xl text-sm font-semibold text-foreground focus:outline-none"
                  >
                    <option value="whole_blood">Whole Blood (সম্পূর্ণ রক্ত)</option>
                    <option value="platelets">Platelets (প্লাটিলেট)</option>
                    <option value="plasma">Plasma (প্লাজমা)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase text-muted-foreground">
                  {language === "bn" ? "অতিরিক্ত বিবরণ / হাসপাতাল স্লিপ নম্বর" : "Hospital Slip / Reference"}
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Slip #12891, Patient Ward 4"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-4 py-2.5 bg-muted/50 border border-border rounded-xl text-sm text-foreground focus:outline-none"
                />
              </div>

              <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 text-[11px] text-amber-900 dark:text-amber-200">
                {language === "bn"
                  ? "রেকর্ডটি জমা দেওয়ার সাথে সাথে স্বয়ংক্রিয়ভাবে পরবর্তী ৯০ দিনের স্বাস্থ্য বিরতি গণনা করা হবে।"
                  : "Logging this whole-blood donation will automatically trigger the 90-day cooldown countdown for your safety."}
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowLogModal(false)}
                  className="px-5 py-2.5 bg-secondary text-foreground text-xs font-bold rounded-xl border border-border"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 py-3 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-xl shadow-md transition-all"
                >
                  {submitting ? "Saving..." : "Confirm & Save Donation"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}


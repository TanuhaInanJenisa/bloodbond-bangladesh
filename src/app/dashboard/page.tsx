"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { BloodBondRepository } from "@/lib/data/repository";
import { DonorProfile, DonationRecord } from "@/types/database";
import {
  Calendar,
  Clock,
  Droplet,
  Award,
  Star,
  CheckCircle2,
  AlertCircle,
  ToggleLeft,
  ToggleRight,
  PlusCircle,
  CreditCard,
  Heart,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

export default function DashboardOverviewPage() {
  const { language } = useLanguage();

  const [donor, setDonor] = useState<DonorProfile | null>(null);
  const [donations, setDonations] = useState<DonationRecord[]>([]);
  const [isAvailable, setIsAvailable] = useState<boolean>(true);

  useEffect(() => {
    const curUser = BloodBondRepository.getCurrentUser();
    const donors = BloodBondRepository.getDonors();
    const myDonor = donors.find((d) => d.profile_id === curUser.id || d.id === "donor-01");
    if (myDonor) {
      setDonor(myDonor);
      setIsAvailable(myDonor.is_available && !myDonor.manual_unavailable);
      const records = BloodBondRepository.getDonationRecords(myDonor.id);
      setDonations(records);
    }
  }, []);

  const handleToggleAvailability = () => {
    if (!donor) return;
    const nextVal = !isAvailable;
    setIsAvailable(nextVal);
    BloodBondRepository.updateDonorAvailability(donor.id, nextVal);
  };

  // Calculate days until next potential eligibility
  let daysUntilEligible = 0;
  if (donor?.next_eligible_date) {
    const target = new Date(donor.next_eligible_date).getTime();
    const now = new Date().getTime();
    const diff = Math.ceil((target - now) / (1000 * 60 * 60 * 24));
    daysUntilEligible = diff > 0 ? diff : 0;
  }

  return (
    <div className="space-y-6">
      {/* Welcome Banner & Availability Engine */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-blood-100/80 via-card to-card border border-border shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-bdgreen-100 text-bdgreen-700 dark:bg-bdgreen-950/40 dark:text-bdgreen-400 text-xs font-bold mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-bdgreen-600" />
            <span>{language === "bn" ? "ভেরিফায়েড রক্তদাতা সদস্য" : "Verified Blood Donor"}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-foreground">
            {language === "bn" ? `স্বাগতম, ${donor?.profile.full_name || "রক্তদাতা"}` : `Welcome, ${donor?.profile.full_name || "Hero"}`}
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            {language === "bn"
              ? "আপনার নিয়মিত রক্তদান বাঁচাতে পারে কোনো মুমূর্ষু রোগীর জীবন।"
              : "Your verified donations power life-saving care across Bangladesh."}
          </p>
        </div>

        {/* Availability Toggle Switch */}
        <div className="p-4 rounded-2xl bg-card border border-border shadow-md flex items-center justify-between gap-4 min-w-[240px]">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block">
              {language === "bn" ? "রক্তদানের প্রাপ্যতা" : "Availability Status"}
            </span>
            <span
              className={`text-xs font-black ${
                isAvailable ? "text-bdgreen-600" : "text-amber-500"
              }`}
            >
              {isAvailable
                ? language === "bn"
                  ? "প্রস্তুত (Ready)"
                  : "Available"
                : language === "bn"
                ? "বিরতিতে (Cooldown)"
                : "Unavailable"}
            </span>
          </div>

          <button
            onClick={handleToggleAvailability}
            className="text-primary hover:opacity-80 transition-opacity"
            title="Toggle Availability"
          >
            {isAvailable ? (
              <ToggleRight className="w-10 h-10 text-bdgreen-600" />
            ) : (
              <ToggleLeft className="w-10 h-10 text-muted-foreground" />
            )}
          </button>
        </div>
      </div>

      {/* 4 Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Verified Donations */}
        <div className="p-5 rounded-3xl bg-card border border-border shadow-sm">
          <div className="flex items-center justify-between text-muted-foreground mb-3">
            <span className="text-xs font-bold uppercase tracking-wider">
              {language === "bn" ? "যাচাইকৃত রক্তদান" : "Donations"}
            </span>
            <Droplet className="w-5 h-5 text-primary fill-current" />
          </div>
          <div className="text-3xl font-black text-foreground">
            {donor?.total_verified_donations || 0}
          </div>
          <span className="text-[11px] text-muted-foreground">
            {language === "bn" ? "হাসপাতাল দ্বারা স্বীকৃত" : "Verified by Hospital"}
          </span>
        </div>

        {/* Next Potential Eligibility Date */}
        <div className="p-5 rounded-3xl bg-card border border-border shadow-sm">
          <div className="flex items-center justify-between text-muted-foreground mb-3">
            <span className="text-xs font-bold uppercase tracking-wider">
              {language === "bn" ? "পরবর্তী রক্তদান" : "Cooldown Status"}
            </span>
            <Calendar className="w-5 h-5 text-bdgreen-600" />
          </div>
          <div className="text-2xl font-black text-foreground">
            {daysUntilEligible === 0 ? "Eligible Now" : `${daysUntilEligible} Days`}
          </div>
          <span className="text-[11px] text-muted-foreground">
            {donor?.next_eligible_date || "Anytime (90 Days rule)"}
          </span>
        </div>

        {/* Donor Rating */}
        <div className="p-5 rounded-3xl bg-card border border-border shadow-sm">
          <div className="flex items-center justify-between text-muted-foreground mb-3">
            <span className="text-xs font-bold uppercase tracking-wider">
              {language === "bn" ? "ডোনার রেটিং" : "Donor Rating"}
            </span>
            <Star className="w-5 h-5 text-amber-500 fill-current" />
          </div>
          <div className="text-3xl font-black text-foreground">
            {donor?.rating_avg.toFixed(1) || "5.0"}★
          </div>
          <span className="text-[11px] text-muted-foreground">
            {donor?.review_count || 0} {language === "bn" ? "রিভিউ" : "verified reviews"}
          </span>
        </div>

        {/* Unique Donor ID */}
        <div className="p-5 rounded-3xl bg-card border border-border shadow-sm">
          <div className="flex items-center justify-between text-muted-foreground mb-3">
            <span className="text-xs font-bold uppercase tracking-wider">
              {language === "bn" ? "ইউনিক আইডি" : "Donor ID"}
            </span>
            <CreditCard className="w-5 h-5 text-primary" />
          </div>
          <div className="text-lg font-black text-primary font-mono truncate">
            {donor?.donor_code || "BB-BD-2026-0841"}
          </div>
          <Link
            href="/dashboard/id-card"
            className="text-[11px] font-bold text-primary hover:underline block mt-1"
          >
            {language === "bn" ? "কার্ড ডাউনলোড করুন →" : "View ID Card →"}
          </Link>
        </div>
      </div>

      {/* 90-Day Medical Recovery Notice */}
      <div className="p-5 rounded-2xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/40 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <div className="text-xs text-amber-900 dark:text-amber-200 leading-relaxed">
          <strong className="font-bold block mb-0.5">
            {language === "bn" ? "স্বয়ংক্রিয় ৯০ দিনের স্বাস্থ্য সুরক্ষা নীতি" : "90-Day Whole Blood Recovery Rule"}
          </strong>
          {language === "bn"
            ? "প্রতিটি সম্পূর্ণ রক্তদানের পর লোহিত রক্তকণিকা ও হিমোগ্লোবিন স্বাভাবিক স্তরে পৌঁছাতে কমপক্ষে ৯০ দিন সময় লাগে। রক্তদানের পর এই পোর্টাল স্বয়ংক্রিয়ভাবে আপনার স্ট্যাটাস কুলডাউনে রাখবে।"
            : "BloodBond automatically calculates a 90-day cooldown period following each verified whole-blood donation to safeguard your red blood cell count and physical well-being."}
        </div>
      </div>

      {/* Quick Actions & Recent Donation Log */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions Card */}
        <div className="p-6 rounded-3xl bg-card border border-border shadow-sm space-y-4">
          <h3 className="font-bold text-base text-foreground">
            {language === "bn" ? "দ্রুত কার্যক্রম" : "Quick Actions"}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Link
              href="/dashboard/donations"
              className="p-4 rounded-2xl bg-muted/50 hover:bg-muted border border-border transition-all flex items-center gap-3"
            >
              <div className="p-2.5 rounded-xl bg-blood-100 text-primary">
                <PlusCircle className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-xs sm:text-sm text-foreground">
                  {language === "bn" ? "নতুন রক্তদান যোগ করুন" : "Log New Donation"}
                </h4>
                <p className="text-[11px] text-muted-foreground">
                  {language === "bn" ? "হাসপাতাল স্লিপ জমা দিন" : "Submit hospital proof"}
                </p>
              </div>
            </Link>

            <Link
              href="/dashboard/id-card"
              className="p-4 rounded-2xl bg-muted/50 hover:bg-muted border border-border transition-all flex items-center gap-3"
            >
              <div className="p-2.5 rounded-xl bg-bdgreen-100 text-bdgreen-600">
                <CreditCard className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-xs sm:text-sm text-foreground">
                  {language === "bn" ? "ডিজিটাল আইডি কার্ড" : "Digital Donor Card"}
                </h4>
                <p className="text-[11px] text-muted-foreground">
                  {language === "bn" ? "প্রিন্ট বা ডাউনলোড" : "Print & QR Verify"}
                </p>
              </div>
            </Link>

            <Link
              href="/emergency-requests"
              className="p-4 rounded-2xl bg-muted/50 hover:bg-muted border border-border transition-all flex items-center gap-3"
            >
              <div className="p-2.5 rounded-xl bg-rose-100 text-rose-600">
                <Heart className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-xs sm:text-sm text-foreground">
                  {language === "bn" ? "জরুরি লাইভ রিকোয়েস্ট" : "Emergency Requests"}
                </h4>
                <p className="text-[11px] text-muted-foreground">
                  {language === "bn" ? "রোগীদের সাড়া দিন" : "Respond to calls"}
                </p>
              </div>
            </Link>

            <Link
              href="/dashboard/settings"
              className="p-4 rounded-2xl bg-muted/50 hover:bg-muted border border-border transition-all flex items-center gap-3"
            >
              <div className="p-2.5 rounded-xl bg-amber-100 text-amber-600">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-xs sm:text-sm text-foreground">
                  {language === "bn" ? "প্রাইভেসি নিয়ন্ত্রণ" : "Privacy & Profile"}
                </h4>
                <p className="text-[11px] text-muted-foreground">
                  {language === "bn" ? "ফোন নম্বর ও তথ্য" : "Manage visibility"}
                </p>
              </div>
            </Link>
          </div>
        </div>

        {/* Recent Donation Records */}
        <div className="p-6 rounded-3xl bg-card border border-border shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base text-foreground">
              {language === "bn" ? "সর্বশেষ রক্তদান রেকর্ড" : "Recent Donation Log"}
            </h3>
            <Link
              href="/dashboard/donations"
              className="text-xs font-bold text-primary hover:underline"
            >
              {language === "bn" ? "সবগুলো দেখুন" : "View All"}
            </Link>
          </div>

          {donations.length === 0 ? (
            <div className="p-6 text-center text-xs text-muted-foreground bg-muted/30 rounded-2xl">
              {language === "bn"
                ? "এখনও কোনো রক্তদান রেকর্ড নেই। রক্তদান করে প্রমাণ আপলোড করুন।"
                : "No donation records logged yet. Log your past donations to earn verified badges!"}
            </div>
          ) : (
            <div className="space-y-3">
              {donations.slice(0, 3).map((rec) => (
                <div
                  key={rec.id}
                  className="p-3.5 rounded-2xl bg-muted/40 border border-border/80 flex items-center justify-between gap-3"
                >
                  <div className="min-w-0">
                    <h4 className="font-bold text-xs sm:text-sm text-foreground truncate">
                      {rec.hospital_name}
                    </h4>
                    <span className="text-[11px] text-muted-foreground">
                      {rec.donation_date} • {rec.donation_type.replace("_", " ")}
                    </span>
                  </div>

                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-bdgreen-600 bg-bdgreen-100 dark:bg-bdgreen-950/40 px-2 py-0.5 rounded-full flex-shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Verified</span>
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


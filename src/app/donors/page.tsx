"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { DonorProfile } from "@/types/database";
import { BloodBondRepository } from "@/lib/data/repository";
import {
  BANGLADESH_DIVISIONS,
  getDistricts,
  getUpazilas,
} from "@/lib/data/bangladeshGeo";
import {
  Search,
  Filter,
  CheckCircle2,
  Star,
  MapPin,
  Clock,
  Phone,
  ShieldCheck,
  RotateCcw,
  UserCheck,
  AlertCircle,
  X,
} from "lucide-react";

function DonorsSearchContent() {
  const searchParams = useSearchParams();
  const { language, t } = useLanguage();

  // Filters State
  const [division, setDivision] = useState<string>(searchParams.get("division") || "");
  const [district, setDistrict] = useState<string>(searchParams.get("district") || "");
  const [upazila, setUpazila] = useState<string>(searchParams.get("upazila") || "");
  const [bloodGroup, setBloodGroup] = useState<string>(searchParams.get("bloodGroup") || "ALL");
  const [onlyAvailable, setOnlyAvailable] = useState<boolean>(true);
  const [onlyVerified, setOnlyVerified] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortBy, setSortBy] = useState<"donations" | "rating" | "recent">("donations");

  // Contact Modal State
  const [activeContactDonor, setActiveContactDonor] = useState<DonorProfile | null>(null);
  const [consentConfirmed, setConsentConfirmed] = useState(false);

  // Donors Results
  const [donors, setDonors] = useState<DonorProfile[]>([]);

  const districts = getDistricts(division || undefined);
  const upazilas = getUpazilas(district || undefined, division || undefined);
  const bloodGroups = ["ALL", "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  useEffect(() => {
    const list = BloodBondRepository.searchDonors({
      divisionId: division || undefined,
      districtId: district || undefined,
      upazilaId: upazila || undefined,
      bloodGroup: bloodGroup !== "ALL" ? bloodGroup : undefined,
      onlyAvailable,
      onlyVerified,
      searchTerm,
    });

    // Sorting
    const sorted = [...list].sort((a, b) => {
      if (sortBy === "donations") return b.total_verified_donations - a.total_verified_donations;
      if (sortBy === "rating") return b.rating_avg - a.rating_avg;
      return 0;
    });

    setDonors(sorted);
  }, [division, district, upazila, bloodGroup, onlyAvailable, onlyVerified, searchTerm, sortBy]);

  const handleReset = () => {
    setDivision("");
    setDistrict("");
    setUpazila("");
    setBloodGroup("ALL");
    setOnlyAvailable(false);
    setOnlyVerified(false);
    setSearchTerm("");
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
          {language === "bn" ? "রক্তদাতা অনুসন্ধান" : "Find Blood Donors Across Bangladesh"}
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          {language === "bn"
            ? "বিভাগ, জেলা এবং রক্তের গ্রুপ ফিল্টার করে নিকটস্থ স্বেচ্ছাসেবী রক্তদাতাদের সাথে যোগাযোগ করুন।"
            : "Search verified voluntary blood donors across all 64 districts with safety and privacy protection."}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Filters Sidebar */}
        <div className="lg:col-span-4">
          <div className="p-6 rounded-2xl bg-card border border-border shadow-sm sticky top-28 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <div className="flex items-center gap-2 font-bold text-foreground">
                <Filter className="w-4 h-4 text-primary" />
                <span>{language === "bn" ? "ফিল্টার সমূহ" : "Search Filters"}</span>
              </div>
              <button
                onClick={handleReset}
                className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1 font-semibold"
              >
                <RotateCcw className="w-3 h-3" />
                <span>{language === "bn" ? "রিসেট" : "Reset"}</span>
              </button>
            </div>

            {/* Keyword Search */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1.5">
                {language === "bn" ? "নাম বা এলাকা" : "Keyword / Area"}
              </label>
              <div className="relative">
                <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder={language === "bn" ? "নাম বা এলাকার নাম লিখুন..." : "Search name or location..."}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-muted/60 border border-border rounded-xl text-xs sm:text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>

            {/* Blood Group Filter */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1.5">
                {t("bloodGroup")}
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {bloodGroups.map((bg) => (
                  <button
                    key={bg}
                    onClick={() => setBloodGroup(bg)}
                    className={`py-1.5 text-xs font-bold rounded-lg border transition-all ${
                      bloodGroup === bg
                        ? "bg-primary text-white border-primary shadow-sm"
                        : "bg-muted/50 text-foreground border-border/80 hover:border-primary/40"
                    }`}
                  >
                    {bg}
                  </button>
                ))}
              </div>
            </div>

            {/* Division */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1.5">
                {t("division")}
              </label>
              <select
                value={division}
                onChange={(e) => {
                  setDivision(e.target.value);
                  setDistrict("");
                  setUpazila("");
                }}
                className="w-full py-2 px-3 bg-muted/60 border border-border rounded-xl text-xs sm:text-sm text-foreground focus:outline-none"
              >
                <option value="">{t("selectDivision")}</option>
                {BANGLADESH_DIVISIONS.map((div) => (
                  <option key={div.id} value={div.id}>
                    {language === "bn" ? div.bnName : div.name}
                  </option>
                ))}
              </select>
            </div>

            {/* District */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1.5">
                {t("district")}
              </label>
              <select
                value={district}
                onChange={(e) => {
                  setDistrict(e.target.value);
                  setUpazila("");
                }}
                className="w-full py-2 px-3 bg-muted/60 border border-border rounded-xl text-xs sm:text-sm text-foreground focus:outline-none"
              >
                <option value="">{t("selectDistrict")}</option>
                {districts.map((dist) => (
                  <option key={dist.id} value={dist.id}>
                    {language === "bn" ? dist.bnName : dist.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Upazila / Thana */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1.5">
                {t("thana")}
              </label>
              <select
                value={upazila}
                onChange={(e) => {
                  const val = e.target.value;
                  setUpazila(val);
                  if (val) {
                    const found = upazilas.find((u) => u.id === val);
                    if (found && !district) {
                      setDistrict(found.districtId);
                    }
                  }
                }}
                className="w-full py-2 px-3 bg-muted/60 border border-border rounded-xl text-xs sm:text-sm text-foreground focus:outline-none"
              >
                <option value="">{t("selectThana")}</option>
                {upazilas.map((upa) => (
                  <option key={upa.id} value={upa.id}>
                    {language === "bn" ? upa.bnName : upa.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Checkboxes */}
            <div className="space-y-2 pt-2 border-t border-border">
              <label className="flex items-center gap-2 text-xs font-semibold text-foreground cursor-pointer">
                <input
                  type="checkbox"
                  checked={onlyAvailable}
                  onChange={(e) => setOnlyAvailable(e.target.checked)}
                  className="rounded text-primary focus:ring-primary w-4 h-4"
                />
                <span>{language === "bn" ? "শুধুমাত্র প্রস্তুত রক্তদাতা" : "Only Available Donors"}</span>
              </label>
              <label className="flex items-center gap-2 text-xs font-semibold text-foreground cursor-pointer">
                <input
                  type="checkbox"
                  checked={onlyVerified}
                  onChange={(e) => setOnlyVerified(e.target.checked)}
                  className="rounded text-primary focus:ring-primary w-4 h-4"
                />
                <span>{language === "bn" ? "শুধুমাত্র যাচাইকৃত রক্তদাতা" : "Only Verified Donors"}</span>
              </label>
            </div>
          </div>
        </div>

        {/* Results Main Area */}
        <div className="lg:col-span-8 space-y-6">
          {/* Header Controls */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-card border border-border">
            <div className="text-xs sm:text-sm text-muted-foreground">
              {language === "bn" ? (
                <span>
                  সর্বমোট <strong className="text-foreground">{donors.length}</strong> জন রক্তদাতা পাওয়া গেছে
                </span>
              ) : (
                <span>
                  Found <strong className="text-foreground">{donors.length}</strong> matching donors
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground font-semibold">
                {language === "bn" ? "সাজান:" : "Sort By:"}
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="py-1.5 px-3 bg-muted border border-border rounded-lg text-xs font-bold text-foreground focus:outline-none"
              >
                <option value="donations">
                  {language === "bn" ? "সর্বাধিক রক্তদান" : "Most Verified Donations"}
                </option>
                <option value="rating">
                  {language === "bn" ? "সর্বোচ্চ রেটিং" : "Highest Rating"}
                </option>
              </select>
            </div>
          </div>

          {/* Donors List */}
          {donors.length === 0 ? (
            <div className="p-12 text-center rounded-2xl bg-card border border-border space-y-3">
              <AlertCircle className="w-10 h-10 text-muted-foreground mx-auto" />
              <h3 className="text-lg font-bold text-foreground">
                {language === "bn" ? "কোন রক্তদাতা পাওয়া যায়নি" : "No Donors Found"}
              </h3>
              <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                {language === "bn"
                  ? "ফিল্টার পরিবর্তন করে আবার চেষ্টা করুন অথবা আপনার এলাকায় রক্তদাতা হিসেবে নিবন্ধন করুন।"
                  : "Try loosening your search filters or be the first to register as a donor in this area."}
              </p>
              <button
                onClick={handleReset}
                className="mt-2 px-4 py-2 bg-primary text-white text-xs font-bold rounded-xl"
              >
                {language === "bn" ? "ফিল্টার রিসেট করুন" : "Reset Filters"}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {donors.map((donor) => {
                const isReady = donor.is_available && !donor.manual_unavailable;
                return (
                  <div
                    key={donor.id}
                    className="p-5 rounded-2xl bg-card border border-border shadow-sm hover:shadow-md hover:border-primary/40 transition-all flex flex-col justify-between"
                  >
                    <div>
                      {/* Top Row: Blood Group & Availability Badge */}
                      <div className="flex items-center justify-between gap-2 mb-4">
                        <div className="flex items-center gap-2.5">
                          <div className="w-12 h-12 rounded-xl bg-blood-100 dark:bg-blood-900/40 text-primary font-black text-xl flex items-center justify-center border border-blood-200 dark:border-blood-800">
                            {donor.blood_group}
                          </div>
                          <div>
                            <span className="text-[10px] font-mono text-muted-foreground block">
                              {donor.donor_code}
                            </span>
                            <span
                              className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                isReady
                                  ? "bg-bdgreen-100 text-bdgreen-700 dark:bg-bdgreen-950/40 dark:text-bdgreen-400"
                                  : "bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400"
                              }`}
                            >
                              <span
                                className={`w-1.5 h-1.5 rounded-full ${
                                  isReady ? "bg-bdgreen-600 animate-pulse" : "bg-neutral-400"
                                }`}
                              />
                              {isReady
                                ? language === "bn"
                                  ? "রক্তদানে প্রস্তুত"
                                  : "Ready to Donate"
                                : language === "bn"
                                ? "বিরতিতে আছেন"
                                : "In Recovery"}
                            </span>
                          </div>
                        </div>

                        {donor.verification_status === "verified" && (
                          <div className="flex items-center gap-1 text-[11px] font-bold text-bdgreen-700 dark:text-bdgreen-400 bg-bdgreen-50 dark:bg-bdgreen-950/30 px-2 py-1 rounded-lg border border-bdgreen-200 dark:border-bdgreen-900">
                            <ShieldCheck className="w-3.5 h-3.5 text-bdgreen-600" />
                            <span>{language === "bn" ? "যাচাইকৃত" : "Verified"}</span>
                          </div>
                        )}
                      </div>

                      {/* Donor Info */}
                      <div className="flex items-center gap-3 mb-3">
                        <div className="relative w-12 h-12 rounded-full overflow-hidden border border-border flex-shrink-0">
                          <Image
                            src={donor.profile.avatar_url || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"}
                            alt={donor.profile.full_name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-bold text-sm text-foreground truncate">
                            {donor.profile.full_name}
                          </h3>
                          <div className="flex items-center gap-1 text-xs text-amber-500 font-semibold">
                            <Star className="w-3 h-3 fill-current" />
                            <span>{donor.rating_avg.toFixed(1)}</span>
                            <span className="text-[10px] text-muted-foreground">
                              ({donor.review_count} {language === "bn" ? "রিভিউ" : "reviews"})
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Location & Stats */}
                      <div className="space-y-1.5 text-xs text-muted-foreground py-2 border-t border-border/60">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                          <span className="truncate">
                            {donor.upazila_name}, {donor.district_name}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <UserCheck className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                          <span>
                            {donor.total_verified_donations} {language === "bn" ? "টি যাচাইকৃত রক্তদান" : "Verified Donations"}
                          </span>
                        </div>
                        {donor.last_donation_date && (
                          <div className="flex items-center gap-2 text-[11px]">
                            <Clock className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
                            <span>
                              {language === "bn" ? "সর্বশেষ রক্তদান:" : "Last donated:"} {donor.last_donation_date}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center gap-2 pt-4 mt-2 border-t border-border/60">
                      <button
                        onClick={() => {
                          setActiveContactDonor(donor);
                          setConsentConfirmed(false);
                        }}
                        className="flex-1 py-2 px-3 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 shadow-sm transition-all"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>{language === "bn" ? "যোগাযোগ করুন" : "Contact Donor"}</span>
                      </button>

                      <Link
                        href={`/donors/${donor.id}`}
                        className="py-2 px-3 bg-secondary hover:bg-muted text-foreground text-xs font-bold rounded-xl border border-border transition-colors"
                      >
                        {language === "bn" ? "প্রোফাইল" : "Profile"}
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* PRIVACY-PROTECTED CONTACT MODAL */}
      {activeContactDonor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-card rounded-3xl p-6 border border-border shadow-2xl relative space-y-4">
            <button
              onClick={() => setActiveContactDonor(null)}
              className="absolute top-4 right-4 p-1 rounded-full text-muted-foreground hover:bg-muted"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-blood-100 text-primary font-black text-xl flex items-center justify-center">
                {activeContactDonor.blood_group}
              </div>
              <div>
                <h3 className="font-bold text-base text-foreground">
                  {activeContactDonor.profile.full_name}
                </h3>
                <span className="text-xs text-muted-foreground font-mono">
                  {activeContactDonor.donor_code} • {activeContactDonor.upazila_name}
                </span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-200 space-y-2">
              <div className="flex items-center gap-1.5 font-bold">
                <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />
                <span>
                  {language === "bn" ? "রোগীর জরুরি রক্তের সম্মতি নীতি" : "Emergency Contact Policy"}
                </span>
              </div>
              <p className="leading-relaxed">
                {language === "bn"
                  ? "রক্তদাতার ব্যক্তিগত গোপনীয়তা রক্ষায় ফোন নম্বরটি শুধুমাত্র জরুরি রক্তের প্রয়োজনে ব্যবহারের জন্য প্রদান করা হচ্ছে। কোনো প্রকার বাণিজ্যিক বা অপ্রয়োজনীয় যোগাযোগ কঠোরভাবে নিষিদ্ধ।"
                  : "To protect voluntary donor privacy, contact details must only be used for urgent blood requests. Commercial misuse is strictly prohibited."}
              </p>
            </div>

            {!consentConfirmed ? (
              <div className="space-y-3 pt-2">
                <label className="flex items-start gap-2.5 text-xs text-foreground cursor-pointer">
                  <input
                    type="checkbox"
                    checked={consentConfirmed}
                    onChange={(e) => setConsentConfirmed(e.target.checked)}
                    className="mt-0.5 rounded text-primary focus:ring-primary w-4 h-4"
                  />
                  <span className="leading-tight">
                    {language === "bn"
                      ? "আমি নিশ্চিত করছি যে এটি একটি প্রকৃত জরুরি চিকিৎসা প্রয়োজন।"
                      : "I confirm this is for a genuine medical blood emergency."}
                  </span>
                </label>
              </div>
            ) : (
              <div className="space-y-3 pt-2">
                <div className="p-4 rounded-xl bg-muted border border-border text-center space-y-1">
                  <span className="text-[10px] font-bold uppercase text-muted-foreground">
                    {language === "bn" ? "রক্তদাতার ফোন নম্বর" : "Donor Contact Phone"}
                  </span>
                  <div className="text-xl font-black text-primary tracking-wide">
                    {activeContactDonor.profile.phone}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <a
                    href={`tel:${activeContactDonor.profile.phone}`}
                    className="py-2.5 px-3 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-xl text-center shadow-md transition-all flex items-center justify-center gap-1.5"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>{language === "bn" ? "সরাসরি কল" : "Call Directly"}</span>
                  </a>
                  <a
                    href={`sms:${activeContactDonor.profile.phone}`}
                    className="py-2.5 px-3 bg-secondary hover:bg-muted text-foreground text-xs font-bold rounded-xl text-center border border-border transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>{language === "bn" ? "এসএমএস পাঠান" : "Send SMS"}</span>
                  </a>
                </div>
              </div>
            )}

            <button
              onClick={() => setActiveContactDonor(null)}
              className="w-full py-2 text-xs font-bold text-muted-foreground hover:text-foreground"
            >
              {language === "bn" ? "বন্ধ করুন" : "Close"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function DonorsPage() {
  return (
    <Suspense fallback={<div className="container mx-auto px-4 py-12 text-center text-sm text-muted-foreground">Loading donors...</div>}>
      <DonorsSearchContent />
    </Suspense>
  );
}


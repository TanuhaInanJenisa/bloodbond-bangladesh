"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { DonorProfile } from "@/types/database";
import { BloodBondRepository } from "@/lib/data/repository";
import { Award, CheckCircle2, Star, MapPin, ArrowRight } from "lucide-react";

export const HomeTopDonors: React.FC = () => {
  const { language } = useLanguage();
  const [topDonors, setTopDonors] = useState<DonorProfile[]>([]);

  useEffect(() => {
    const donors = BloodBondRepository.getDonors();
    // Sort by verified donations descending
    const sorted = [...donors].sort(
      (a, b) => b.total_verified_donations - a.total_verified_donations
    );
    setTopDonors(sorted.slice(0, 4));
  }, []);

  return (
    <div className="w-full my-12">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 text-xs font-bold mb-2">
            <Award className="w-3.5 h-3.5 text-amber-600" />
            <span>{language === "bn" ? "সেরা রক্তদাতা" : "Top Blood Heroes"}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
            {language === "bn" ? "যাচাইকৃত শীর্ষ রক্তদাতাবৃন্দ" : "Featured Verified Donors"}
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            {language === "bn"
              ? "যাঁদের নিয়মিত নিঃস্বার্থ রক্তদান অসংখ্য মানুষের জীবন রক্ষা করেছে।"
              : "Recognizing lifetime champions who donate blood with dedication."}
          </p>
        </div>

        <Link
          href="/leaderboard"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-primary hover:underline group"
        >
          <span>{language === "bn" ? "পুরো লিডারবোর্ড দেখুন" : "View Full Leaderboard"}</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {topDonors.map((donor, idx) => (
          <div
            key={donor.id}
            className="p-5 rounded-2xl bg-card border border-border shadow-sm hover:shadow-lg hover:border-primary/40 transition-all flex flex-col justify-between relative group"
          >
            {/* Rank badge */}
            <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 font-extrabold text-xs flex items-center justify-center border border-amber-300/40">
              #{idx + 1}
            </div>

            <div>
              {/* Avatar & Badges */}
              <div className="flex items-center gap-3.5 mb-4">
                <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-primary/30 group-hover:border-primary transition-colors flex-shrink-0">
                  <Image
                    src={donor.profile.avatar_url || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"}
                    alt={donor.profile.full_name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-foreground flex items-center gap-1 group-hover:text-primary transition-colors">
                    {donor.profile.full_name}
                    <CheckCircle2 className="w-3.5 h-3.5 text-bdgreen-600 fill-current inline flex-shrink-0" />
                  </h3>
                  <div className="text-[11px] text-muted-foreground font-mono">
                    {donor.donor_code}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-amber-500 font-semibold mt-0.5">
                    <Star className="w-3 h-3 fill-current" />
                    <span>{donor.rating_avg.toFixed(1)}</span>
                    <span className="text-[10px] text-muted-foreground">({donor.review_count})</span>
                  </div>
                </div>
              </div>

              {/* Stats badges */}
              <div className="grid grid-cols-2 gap-2 my-3 py-2 px-3 rounded-xl bg-muted/50 border border-border/60 text-center">
                <div>
                  <div className="text-[10px] text-muted-foreground uppercase font-bold">
                    {language === "bn" ? "রক্তের গ্রুপ" : "Blood Group"}
                  </div>
                  <div className="text-base font-black text-primary">
                    {donor.blood_group}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-muted-foreground uppercase font-bold">
                    {language === "bn" ? "রক্তদান সংখ্যা" : "Donations"}
                  </div>
                  <div className="text-base font-black text-foreground">
                    {donor.total_verified_donations}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-4">
                <MapPin className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                <span className="truncate">
                  {donor.upazila_name}, {donor.district_name}
                </span>
              </div>
            </div>

            <Link
              href={`/donors/${donor.id}`}
              className="w-full py-2 px-3 bg-secondary hover:bg-primary hover:text-white text-foreground text-xs font-bold rounded-xl text-center transition-colors border border-border"
            >
              {language === "bn" ? "প্রোফাইল দেখুন" : "View Profile"}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};


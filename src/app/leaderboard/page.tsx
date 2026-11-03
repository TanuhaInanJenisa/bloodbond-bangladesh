"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { DonorProfile } from "@/types/database";
import { BloodBondRepository } from "@/lib/data/repository";
import { Award, Star, CheckCircle2, Trophy, Medal, MapPin, ArrowRight } from "lucide-react";

export default function LeaderboardPage() {
  const { language, t } = useLanguage();
  const [donors, setDonors] = useState<DonorProfile[]>([]);

  useEffect(() => {
    const list = BloodBondRepository.getDonors();
    const sorted = [...list].sort(
      (a, b) => b.total_verified_donations - a.total_verified_donations
    );
    setDonors(sorted);
  }, []);

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2 mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 text-xs font-bold">
          <Trophy className="w-3.5 h-3.5 text-amber-600" />
          <span>{language === "bn" ? "জাতীয় রক্তদাতা সম্মাননা" : "National Honor Roll"}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-foreground">
          {language === "bn" ? "সেরা রক্তদাতা লিডারবোর্ড" : "Top Donor Leaderboard"}
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground">
          {language === "bn"
            ? "শুধুমাত্র হাসপাতাল দ্বারা যাচাইকৃত প্রকৃত রক্তদান রেকর্ডের ভিত্তিতে তৈরি।"
            : "Ranking lifetime voluntary donors based strictly on verified hospital records."}
        </p>
      </div>

      {/* Podium for Top 3 */}
      {donors.length >= 3 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12 items-end">
          {/* #2 Rank */}
          <div className="p-6 rounded-3xl bg-card border border-border shadow-md text-center space-y-3 order-2 md:order-1 relative">
            <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-800 font-black text-sm flex items-center justify-center mx-auto">
              #2
            </div>
            <div className="relative w-20 h-20 rounded-full overflow-hidden mx-auto border-2 border-slate-300">
              <Image src={donors[1].profile.avatar_url || ""} alt="Donor" fill className="object-cover" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-foreground">{donors[1].profile.full_name}</h3>
              <span className="text-xs text-muted-foreground">{donors[1].upazila_name}, {donors[1].district_name}</span>
            </div>
            <div className="p-2.5 rounded-2xl bg-muted/60 font-black text-primary text-xl">
              {donors[1].total_verified_donations} Donations
            </div>
            <Link
              href={`/donors/${donors[1].id}`}
              className="text-xs font-bold text-primary hover:underline block"
            >
              View Profile →
            </Link>
          </div>

          {/* #1 Champion */}
          <div className="p-8 rounded-3xl bg-gradient-to-b from-amber-500/10 via-card to-card border-2 border-amber-400 shadow-xl text-center space-y-4 order-1 md:order-2 relative scale-105">
            <div className="w-10 h-10 rounded-full bg-amber-400 text-neutral-900 font-black text-base flex items-center justify-center mx-auto shadow-lg shadow-amber-400/30">
              <Trophy className="w-5 h-5" />
            </div>
            <div className="relative w-24 h-24 rounded-full overflow-hidden mx-auto border-4 border-amber-400 shadow-xl">
              <Image src={donors[0].profile.avatar_url || ""} alt="Donor" fill className="object-cover" />
            </div>
            <div>
              <h3 className="font-black text-lg text-foreground">{donors[0].profile.full_name}</h3>
              <span className="text-xs text-muted-foreground">{donors[0].upazila_name}, {donors[0].district_name}</span>
            </div>
            <div className="p-3 rounded-2xl bg-amber-100 dark:bg-amber-950/40 font-black text-amber-700 dark:text-amber-300 text-2xl border border-amber-300/40">
              {donors[0].total_verified_donations} Donations
            </div>
            <Link
              href={`/donors/${donors[0].id}`}
              className="text-xs font-bold text-primary hover:underline block"
            >
              View Profile →
            </Link>
          </div>

          {/* #3 Rank */}
          <div className="p-6 rounded-3xl bg-card border border-border shadow-md text-center space-y-3 order-3 relative">
            <div className="w-8 h-8 rounded-full bg-amber-700/20 text-amber-800 dark:text-amber-200 font-black text-sm flex items-center justify-center mx-auto">
              #3
            </div>
            <div className="relative w-20 h-20 rounded-full overflow-hidden mx-auto border-2 border-amber-700/40">
              <Image src={donors[2].profile.avatar_url || ""} alt="Donor" fill className="object-cover" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-foreground">{donors[2].profile.full_name}</h3>
              <span className="text-xs text-muted-foreground">{donors[2].upazila_name}, {donors[2].district_name}</span>
            </div>
            <div className="p-2.5 rounded-2xl bg-muted/60 font-black text-primary text-xl">
              {donors[2].total_verified_donations} Donations
            </div>
            <Link
              href={`/donors/${donors[2].id}`}
              className="text-xs font-bold text-primary hover:underline block"
            >
              View Profile →
            </Link>
          </div>
        </div>
      )}

      {/* Full Leaderboard Table */}
      <div className="p-6 rounded-3xl bg-card border border-border shadow-sm max-w-4xl mx-auto overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-border text-muted-foreground font-bold uppercase tracking-wider text-[10px]">
              <th className="py-3 px-3">Rank</th>
              <th className="py-3 px-3">Donor</th>
              <th className="py-3 px-3">Blood Group</th>
              <th className="py-3 px-3">Location</th>
              <th className="py-3 px-3">Verified Donations</th>
              <th className="py-3 px-3">Rating</th>
              <th className="py-3 px-3 text-right">Profile</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            {donors.map((d, index) => (
              <tr key={d.id} className="hover:bg-muted/40 transition-colors">
                <td className="py-3.5 px-3 font-black text-sm text-foreground">
                  #{index + 1}
                </td>
                <td className="py-3.5 px-3">
                  <div className="flex items-center gap-3">
                    <div className="relative w-9 h-9 rounded-full overflow-hidden border border-border flex-shrink-0">
                      <Image
                        src={d.profile.avatar_url || ""}
                        alt={d.profile.full_name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <span className="font-bold text-foreground block">{d.profile.full_name}</span>
                      <span className="text-[10px] text-muted-foreground font-mono">{d.donor_code}</span>
                    </div>
                  </div>
                </td>
                <td className="py-3.5 px-3 font-black text-primary text-sm">
                  {d.blood_group}
                </td>
                <td className="py-3.5 px-3 text-muted-foreground">
                  {d.upazila_name}, {d.district_name}
                </td>
                <td className="py-3.5 px-3 font-extrabold text-foreground text-sm">
                  {d.total_verified_donations}
                </td>
                <td className="py-3.5 px-3">
                  <span className="flex items-center gap-1 text-amber-500 font-bold">
                    <Star className="w-3 h-3 fill-current" />
                    <span>{d.rating_avg.toFixed(1)}</span>
                  </span>
                </td>
                <td className="py-3.5 px-3 text-right">
                  <Link
                    href={`/donors/${d.id}`}
                    className="px-3 py-1.5 rounded-xl bg-secondary hover:bg-primary hover:text-white text-foreground text-xs font-bold border border-border transition-colors"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


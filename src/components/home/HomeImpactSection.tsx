"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { BloodBondRepository } from "@/lib/data/repository";
import { Users, Droplet, Building2, Star, ArrowRight, AlertCircle, HeartHandshake } from "lucide-react";

export const HomeImpactSection: React.FC = () => {
  const { language, t } = useLanguage();
  const [stats, setStats] = useState({
    totalDonors: 50240,
    totalDonations: 25890,
    hospitals: 1120,
    rating: 4.8,
  });

  useEffect(() => {
    try {
      const realStats = BloodBondRepository.getAdminStats();
      if (realStats.totalDonors > 0) {
        setStats({
          totalDonors: 50000 + realStats.totalDonors,
          totalDonations: 25000 + realStats.totalDonations,
          hospitals: 1000 + realStats.totalOrganizations,
          rating: 4.8,
        });
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  return (
    <section className="w-full my-12 rounded-3xl overflow-hidden border border-border shadow-xl bg-card">
      <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
        {/* Left: Our Impact Stats Red Banner */}
        <div className="lg:col-span-5 bg-gradient-to-br from-[#C62828] to-[#8E0000] text-white p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
          {/* Subtle background circle decoration */}
          <div className="absolute -right-12 -bottom-12 w-48 h-48 rounded-full bg-white/5 pointer-events-none" />

          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white/90 text-xs font-semibold mb-3">
              <HeartHandshake className="w-3.5 h-3.5" />
              <span>{t("ourImpact")}</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {t("impactSub")}
            </h3>
            <p className="text-xs sm:text-sm text-white/80 mt-1">
              {language === "bn"
                ? "স্বেচ্ছায় রক্তদানে বাংলাদেশের সবচেয়ে সক্রিয় এবং নির্ভরযোগ্য প্ল্যাটফর্ম।"
                : "Realtime network powering voluntary blood delivery to critical patients."}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:gap-6 mt-8">
            {/* Stat 1 */}
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-white/10 flex-shrink-0">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-black">{stats.totalDonors.toLocaleString()}+</div>
                <div className="text-[11px] sm:text-xs text-white/80 font-medium">
                  {t("registeredDonorsLabel")}
                </div>
              </div>
            </div>

            {/* Stat 2 */}
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-white/10 flex-shrink-0">
                <Droplet className="w-6 h-6 text-white fill-current" />
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-black">{stats.totalDonations.toLocaleString()}+</div>
                <div className="text-[11px] sm:text-xs text-white/80 font-medium">
                  {t("donationsLabel")}
                </div>
              </div>
            </div>

            {/* Stat 3 */}
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-white/10 flex-shrink-0">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-black">{stats.hospitals.toLocaleString()}+</div>
                <div className="text-[11px] sm:text-xs text-white/80 font-medium">
                  {t("hospitalsLabel")}
                </div>
              </div>
            </div>

            {/* Stat 4 */}
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-white/10 flex-shrink-0">
                <Star className="w-6 h-6 text-amber-300 fill-current" />
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-black">{stats.rating}★</div>
                <div className="text-[11px] sm:text-xs text-white/80 font-medium">
                  {t("ratingLabel")}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Center: Stylized Bangladesh Network Graphic */}
        <div className="lg:col-span-3 bg-blood-50/60 dark:bg-blood-950/20 p-6 flex flex-col items-center justify-center border-y lg:border-y-0 lg:border-r border-border relative">
          <div className="text-center space-y-2">
            <div className="w-24 h-24 sm:w-28 sm:h-28 mx-auto relative flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-primary/10 animate-ping opacity-30" />
              <div className="relative w-20 h-20 rounded-full bg-gradient-to-tr from-primary to-blood-400 text-white flex items-center justify-center shadow-lg shadow-primary/30">
                <Droplet className="w-10 h-10 fill-current animate-pulse-blood" />
              </div>
            </div>
            <h4 className="font-extrabold text-sm sm:text-base text-foreground">
              {language === "bn" ? "দেশব্যাপী ৬৪ জেলায় বিস্তৃত" : "Covering All 64 Districts"}
            </h4>
            <p className="text-xs text-muted-foreground max-w-xs">
              {language === "bn"
                ? "বিভাগ ও উপজেলা ভিত্তিক সুসংগঠিত রক্তদাতা নেটওয়ার্ক।"
                : "Decentralized donor nodes delivering emergency assistance."}
            </p>
          </div>
        </div>

        {/* Right: Dual Callouts */}
        <div className="lg:col-span-4 p-6 sm:p-8 flex flex-col justify-center space-y-6 bg-card">
          {/* Box 1: Need Blood */}
          <div className="p-5 rounded-2xl bg-blood-100/50 dark:bg-blood-900/10 border border-blood-200 dark:border-blood-800/40 space-y-3">
            <div className="flex items-center gap-2 text-primary font-bold text-base">
              <AlertCircle className="w-5 h-5 text-primary" />
              <span>{t("emergencyHeading")}</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {t("emergencyText")}
            </p>
            <Link
              href="/request-blood"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-xl shadow-md shadow-primary/20 transition-all hover:translate-x-1"
            >
              <span>{t("requestBloodNow")}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Box 2: Join Movement */}
          <div className="p-5 rounded-2xl bg-muted/60 border border-border space-y-3">
            <h4 className="font-bold text-base text-foreground">
              {t("joinHeading")}
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {t("joinSub")}
            </p>
            <Link
              href="/become-a-donor"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-foreground text-background hover:bg-neutral-800 dark:hover:bg-neutral-200 text-xs font-bold rounded-xl shadow-md transition-all hover:translate-x-1"
            >
              <span>{t("registerNow")}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};


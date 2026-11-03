"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { CheckCircle2, ArrowRight, Droplet, Search } from "lucide-react";
import { HomeSearchBar } from "@/components/home/HomeSearchBar";
import { HomeFeatureBadges } from "@/components/home/HomeFeatureBadges";
import { HomeImpactSection } from "@/components/home/HomeImpactSection";
import { HomeEmergencyRequests } from "@/components/home/HomeEmergencyRequests";
import { HomeTopDonors } from "@/components/home/HomeTopDonors";
import { HomeAwarenessSection } from "@/components/home/HomeAwarenessSection";
import { HeroHeartPulse } from "@/components/home/HeroHeartPulse";

export default function HomePage() {
  const { language, t } = useLanguage();

  return (
    <div className="w-full min-h-screen bg-background">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-8 pb-12 md:py-16 bg-gradient-to-b from-blood-100/40 via-background to-background">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-bdgreen-100 text-bdgreen-700 dark:bg-bdgreen-950/40 dark:text-bdgreen-400 border border-bdgreen-300/40">
                  <CheckCircle2 className="w-3.5 h-3.5 text-bdgreen-600 fill-current" />
                  <span>{t("districtsBadge")}</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-bdgreen-100 text-bdgreen-700 dark:bg-bdgreen-950/40 dark:text-bdgreen-400 border border-bdgreen-300/40">
                  <CheckCircle2 className="w-3.5 h-3.5 text-bdgreen-600 fill-current" />
                  <span>{t("divisionsBadge")}</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-bdgreen-100 text-bdgreen-700 dark:bg-bdgreen-950/40 dark:text-bdgreen-400 border border-bdgreen-300/40">
                  <CheckCircle2 className="w-3.5 h-3.5 text-bdgreen-600 fill-current" />
                  <span>{t("trustedBadge")}</span>
                </span>
              </div>

              {/* Headline */}
              <div className="space-y-3">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-foreground">
                  <span className="text-primary">Blood</span>Bond{" "}
                  <span className="text-bdgreen-600">Bangladesh</span>
                </h1>
                <p className="text-lg sm:text-xl font-semibold text-muted-foreground">
                  {t("heroSubtitle")}
                </p>
                <p className="text-xl sm:text-2xl font-bold text-primary dark:text-blood-400 font-bengali">
                  {t("heroSlogan")}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/become-a-donor"
                  className="flex items-center gap-2 px-6 py-3.5 bg-primary hover:bg-primary-hover text-white rounded-full font-bold text-sm shadow-xl shadow-primary/25 transition-all hover:scale-105 active:scale-95"
                >
                  <Droplet className="w-4 h-4 fill-current" />
                  <span>{t("becomeDonorBtn")}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/donors"
                  className="flex items-center gap-2 px-6 py-3.5 bg-card hover:bg-muted text-foreground border border-border rounded-full font-bold text-sm shadow-md transition-all hover:scale-105 active:scale-95"
                >
                  <Search className="w-4 h-4 text-primary" />
                  <span>{t("findDonorBtn")}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Right Hero: Animated Red Heart with Running White Pulse */}
            <div className="lg:col-span-5 relative">
              <HeroHeartPulse />
            </div>
          </div>

          {/* 2. SEARCH BAR OVERLAY */}
          <div className="mt-10 lg:-mb-6 relative z-20">
            <HomeSearchBar />
          </div>
        </div>
      </section>

      {/* 3. QUICK FEATURE BADGES */}
      <section className="container mx-auto px-4 sm:px-6">
        <HomeFeatureBadges />
      </section>

      {/* 4. IMPACT SECTION */}
      <section className="container mx-auto px-4 sm:px-6">
        <HomeImpactSection />
      </section>

      {/* 5. LIVE EMERGENCY BLOOD REQUESTS */}
      <section className="container mx-auto px-4 sm:px-6">
        <HomeEmergencyRequests />
      </section>

      {/* 6. TOP DONOR LEADERBOARD */}
      <section className="container mx-auto px-4 sm:px-6">
        <HomeTopDonors />
      </section>

      {/* 7. AWARENESS & SAFETY SECTION */}
      <section className="container mx-auto px-4 sm:px-6 mb-16">
        <HomeAwarenessSection />
      </section>
    </div>
  );
}


"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { CreditCard, CalendarCheck, Star, Siren, LineChart } from "lucide-react";

export const HomeFeatureBadges: React.FC = () => {
  const { t } = useLanguage();

  const features = [
    {
      title: t("featureDigitalIdTitle"),
      desc: t("featureDigitalIdDesc"),
      icon: CreditCard,
      href: "/dashboard/id-card",
      color: "text-primary",
      bg: "bg-blood-100/70 dark:bg-blood-900/20",
    },
    {
      title: t("feature90DaysTitle"),
      desc: t("feature90DaysDesc"),
      icon: CalendarCheck,
      href: "/awareness",
      color: "text-primary",
      bg: "bg-blood-100/70 dark:bg-blood-900/20",
    },
    {
      title: t("featureReviewTitle"),
      desc: t("featureReviewDesc"),
      icon: Star,
      href: "/leaderboard",
      color: "text-amber-500",
      bg: "bg-amber-100/60 dark:bg-amber-900/20",
    },
    {
      title: t("featureEmergencyTitle"),
      desc: t("featureEmergencyDesc"),
      icon: Siren,
      href: "/emergency-requests",
      color: "text-rose-600",
      bg: "bg-rose-100/70 dark:bg-rose-900/20",
    },
    {
      title: t("featureHistoryTitle"),
      desc: t("featureHistoryDesc"),
      icon: LineChart,
      href: "/dashboard/donations",
      color: "text-bdgreen-600",
      bg: "bg-bdgreen-100/60 dark:bg-bdgreen-900/20",
    },
  ];

  return (
    <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 my-8">
      {features.map((f, i) => {
        const Icon = f.icon;
        return (
          <Link
            key={i}
            href={f.href}
            className="flex items-center gap-3 p-3.5 sm:p-4 rounded-2xl bg-card border border-border/80 shadow-sm hover:shadow-md hover:border-primary/40 transition-all group"
          >
            <div className={`p-2.5 rounded-xl ${f.bg} flex-shrink-0 transition-transform group-hover:scale-110`}>
              <Icon className={`w-5 h-5 ${f.color}`} />
            </div>
            <div className="min-w-0">
              <h4 className="text-xs sm:text-sm font-bold text-foreground truncate group-hover:text-primary transition-colors">
                {f.title}
              </h4>
              <p className="text-[11px] sm:text-xs text-muted-foreground truncate">
                {f.desc}
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
};


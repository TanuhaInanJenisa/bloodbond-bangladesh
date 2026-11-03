"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { ShieldAlert, HeartPulse, CheckCircle, ArrowRight, Activity } from "lucide-react";

export const HomeAwarenessSection: React.FC = () => {
  const { language } = useLanguage();

  const rules = [
    {
      title: language === "bn" ? "বয়স ও শারীরিক সুস্থতা" : "Age & Physical Fitness",
      desc: language === "bn" ? "১৮ থেকে ৬০ বছর বয়সী সুস্থ প্রাপ্তবয়স্ক (ন্যূনতম ৫০ কেজি ওজন)।" : "Aged 18-60, weight at least 50 kg, with good general health.",
    },
    {
      title: language === "bn" ? "৯০ দিনের সুস্থ ব্যবধান" : "90-Day Standard Interval",
      desc: language === "bn" ? "সর্বশেষ সম্পূর্ণ রক্তদানের পর অন্তত ৩ মাস বিরতি বাধ্যতামূলক।" : "Minimum 90 days interval between full whole blood donations for red cell replenishment.",
    },
    {
      title: language === "bn" ? "হিমোগ্লোবিন স্তর" : "Hemoglobin Screening",
      desc: language === "bn" ? "পুরুষদের ন্যূনতম ১২.৫ g/dL এবং নারীদের ১২.০ g/dL হতে হবে।" : "Minimum 12.5 g/dL for males and 12.0 g/dL for females prior to donation.",
    },
    {
      title: language === "bn" ? "হাসপাতাল ক্রস-ম্যাচিং" : "Mandatory Crossmatching",
      desc: language === "bn" ? "রক্তদানের পূর্বে ল্যাবরেটরিতে ক্রস-ম্যাচিং ও স্ক্রিনিং আবশ্যক।" : "Direct donor-recipient serological crossmatching must always be performed by licensed labs.",
    },
  ];

  return (
    <section className="w-full my-12 p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-blood-50/70 via-background to-card border border-border">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Information */}
        <div className="lg:col-span-7 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blood-100 dark:bg-blood-900/30 text-primary text-xs font-bold">
            <HeartPulse className="w-3.5 h-3.5 text-primary" />
            <span>{language === "bn" ? "স্বাস্থ্য নিরাপত্তা নির্দেশিকা" : "Medical Eligibility"}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
            {language === "bn"
              ? "নিরাপদ রক্তদান এবং ৯১ দিনের সুরক্ষা বিজ্ঞান"
              : "Safe Blood Donation & The 90-Day Rule"}
          </h2>

          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            {language === "bn"
              ? "রক্তদান সম্পূর্ণ নিরাপদ এবং এতে মানবদেহের কোনো ক্ষতি হয় না। বরং নতুন লোহিত রক্তকণিকা তৈরিতে সহায়তা করে এবং রক্তচাপ স্বাভাবিক রাখতে ইতিবাচক ভূমিকা রাখে।"
              : "Blood donation is safe and promotes healthy cellular renewal. BloodBond implements an automated 90-day cooldown period to ensure donor recovery before subsequent donation."}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
            {rules.map((item, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-card border border-border/80 shadow-sm">
                <div className="flex items-center gap-2 font-bold text-xs sm:text-sm text-foreground">
                  <CheckCircle className="w-4 h-4 text-bdgreen-600 flex-shrink-0" />
                  <span>{item.title}</span>
                </div>
                <p className="text-[11px] sm:text-xs text-muted-foreground mt-1 pl-6 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="pt-3">
            <Link
              href="/awareness"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-primary hover:underline group"
            >
              <span>{language === "bn" ? "রক্তের গ্রুপ সামঞ্জস্যতা ও বিস্তারিত জানুন" : "Learn More Compatibility & Guidelines"}</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Right: Quick Blood Compatibility Table Preview */}
        <div className="lg:col-span-5 p-5 rounded-2xl bg-card border border-border shadow-md">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-border">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-primary" />
              <h3 className="font-bold text-sm text-foreground">
                {language === "bn" ? "রক্তের গ্রুপ চার্ট" : "Compatibility Matrix"}
              </h3>
            </div>
            <span className="text-[10px] font-mono text-muted-foreground bg-muted px-2 py-0.5 rounded">
              Whole Blood
            </span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between p-2 rounded-lg bg-muted/40 font-semibold">
              <span className="text-primary font-bold">O-</span>
              <span className="text-muted-foreground">{language === "bn" ? "সার্বজনীন দাতা (সবার জন্য)" : "Universal Donor (All Groups)"}</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-lg bg-muted/40 font-semibold">
              <span className="text-primary font-bold">AB+</span>
              <span className="text-muted-foreground">{language === "bn" ? "সার্বজনীন গ্রহীতা (সবার থেকে গ্রহণ)" : "Universal Recipient (From All)"}</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-lg bg-muted/40 font-semibold">
              <span className="text-primary font-bold">O+</span>
              <span className="text-muted-foreground">{language === "bn" ? "রক্ত দিতে পারে: O+, A+, B+, AB+" : "Can donate to: O+, A+, B+, AB+"}</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-lg bg-muted/40 font-semibold">
              <span className="text-primary font-bold">A+</span>
              <span className="text-muted-foreground">{language === "bn" ? "রক্ত দিতে পারে: A+, AB+" : "Can donate to: A+, AB+"}</span>
            </div>
          </div>

          <div className="mt-4 p-3 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/40 flex items-start gap-2.5 text-[11px] text-amber-800 dark:text-amber-300">
            <ShieldAlert className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <span>
              {language === "bn"
                ? "সতর্কতা: রক্তের গ্রুপ মিল থাকা সত্ত্বেও রোগীর শরীরে রক্ত প্রয়োগের আগে অবশ্যই ক্রস-ম্যাচিং বাধ্যতামূলক।"
                : "Clinical Disclaimer: Real blood compatibility always requires laboratory crossmatching."}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};


"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import {
  HeartPulse,
  Droplet,
  CheckCircle,
  HelpCircle,
  ShieldAlert,
  Calendar,
  Activity,
  ArrowRight,
} from "lucide-react";

export default function AwarenessPage() {
  const { language } = useLanguage();

  const compatibilityData = [
    { group: "O-", givesTo: "All Blood Groups (Universal Donor)", receivesFrom: "O- only" },
    { group: "O+", givesTo: "O+, A+, B+, AB+", receivesFrom: "O+, O-" },
    { group: "A-", givesTo: "A-, A+, AB-, AB+", receivesFrom: "A-, O-" },
    { group: "A+", givesTo: "A+, AB+", receivesFrom: "A+, A-, O+, O-" },
    { group: "B-", givesTo: "B-, B+, AB-, AB+", receivesFrom: "B-, O-" },
    { group: "B+", givesTo: "B+, AB+", receivesFrom: "B+, B-, O+, O-" },
    { group: "AB-", givesTo: "AB-, AB+", receivesFrom: "AB-, A-, B-, O-" },
    { group: "AB+", givesTo: "AB+ only", receivesFrom: "All Blood Groups (Universal Recipient)" },
  ];

  const mythsVsFacts = [
    {
      myth: language === "bn" ? "রক্ত দিলে শরীর দুর্বল বা অসুস্থ হয়ে পড়ে।" : "Donating blood makes you permanently weak or sick.",
      fact: language === "bn" ? "রক্তদানের ২৪-৪৮ ঘণ্টার মধ্যে রক্তের তরল অংশ পূরণ হয় এবং ৩-৪ সপ্তাহের মধ্যে লোহিত রক্তকণিকা সম্পূর্ণ পুনরুজ্জীবিত হয়।" : "Blood plasma replenishes within 24-48 hours and red blood cells fully renew within weeks with zero long-term weakness.",
    },
    {
      myth: language === "bn" ? "রক্ত দিলে ওজন কমে যায় বা রোগ প্রতিরোধ ক্ষমতা নষ্ট হয়।" : "Donating blood causes weight loss or harms immunity.",
      fact: language === "bn" ? "রক্তদান নতুন রক্তকণিকা তৈরিতে মজ্জাকে উদ্দীপিত করে যা রক্ত সঞ্চালন ও হৃদযন্ত্রের স্বাস্থ্যের জন্য উপকারী।" : "Donation stimulates healthy bone marrow hematopoiesis and has positive effects on arterial elasticity and iron balance.",
    },
    {
      myth: language === "bn" ? "একই গ্রুপের রক্ত পেলেই সাথে সাথে রোগীর শরীরে দেওয়া যায়।" : "Matching group blood can be infused directly without laboratory testing.",
      fact: language === "bn" ? "রক্তের গ্রুপ মিল থাকা সত্ত্বেও রোগীর শরীরে রক্ত প্রয়োগের আগে অবশ্যই ক্রস-ম্যাচিং ও স্ক্রিনিং টেস্ট বাধ্যতামূলক।" : "Clinical serological crossmatching and infectious disease screening in a licensed laboratory is legally and medically mandatory.",
    },
  ];

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 max-w-4xl space-y-12">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blood-100 dark:bg-blood-900/30 text-primary text-xs font-bold">
          <HeartPulse className="w-3.5 h-3.5 text-primary" />
          <span>{language === "bn" ? "স্বাস্থ্য ও রক্তদান বিজ্ঞান" : "Blood Donation Science & Guide"}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-foreground">
          {language === "bn" ? "রক্তদান নির্দেশিকা ও সচেতনতা" : "Nationwide Blood Donation Guide"}
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground max-w-xl mx-auto">
          {language === "bn"
            ? "রক্তদান সম্পর্কিত সঠিক চিকিৎসা তথ্য, রক্তের গ্রুপ সামঞ্জস্যতা এবং ৯০ দিনের নিয়মের বিজ্ঞান জানুন।"
            : "Understanding blood compatibility, clinical cooldown intervals, and evidence-based voluntary donation principles."}
        </p>
      </div>

      {/* 90-Day Scientific Cooldown Section */}
      <section className="p-8 rounded-3xl bg-gradient-to-br from-card via-card to-blood-50/50 dark:to-blood-950/20 border border-border shadow-md space-y-4">
        <div className="flex items-center gap-3 text-primary">
          <Calendar className="w-7 h-7" />
          <h2 className="text-xl sm:text-2xl font-black text-foreground">
            {language === "bn" ? "৯০ দিনের নিয়ম কী এবং কেন জরুরি?" : "The Science Behind the 90-Day Rule"}
          </h2>
        </div>

        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
          {language === "bn"
            ? "একজন সুস্থ প্রাপ্তবয়স্ক ব্যক্তির শরীর থেকে এক ব্যাগ (৩৫০-৪৫০ মিলি) সম্পূর্ণ রক্ত (Whole Blood) গ্রহণের পর রক্তের ভলিউম দ্রুত ঠিক হলেও লোহিত রক্তকণিকা (Red Blood Cells) ও হিমোগ্লোবিনের স্বাভাবিক স্তর সম্পূর্ণরূপে রিকভার হতে প্রায় ৮ থেকে ১২ সপ্তাহ সময় প্রয়োজন। সে কারণে আন্তর্জাতিক স্বাস্থ্য সংস্থা (WHO) এবং রক্ত পরিসঞ্চালন নীতিমালা অনুযায়ী পরবর্তী রক্তদানের মাঝে ন্যূনতম ৯০ দিনের ব্যবধান থাকা আবশ্যক।"
            : "When you donate whole blood (350-450 mL), plasma volume quickly balances within hours, but the regeneration of mature erythrocytes (red blood cells) and iron stores requires approximately 8 to 12 weeks. International transfusion medicine standards therefore mandate a minimum 90-day cooldown period before whole blood can be donated again."}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          <div className="p-4 rounded-2xl bg-muted/50 border border-border">
            <span className="text-[10px] font-bold uppercase text-muted-foreground block">
              Whole Blood (সম্পূর্ণ রক্ত)
            </span>
            <span className="text-lg font-black text-primary block mt-1">90 Days</span>
            <span className="text-[11px] text-muted-foreground">Standard Interval</span>
          </div>
          <div className="p-4 rounded-2xl bg-muted/50 border border-border">
            <span className="text-[10px] font-bold uppercase text-muted-foreground block">
              Platelets / Apheresis (প্লাটিলেট)
            </span>
            <span className="text-lg font-black text-bdgreen-600 block mt-1">14 Days</span>
            <span className="text-[11px] text-muted-foreground">Cell Separator</span>
          </div>
          <div className="p-4 rounded-2xl bg-muted/50 border border-border">
            <span className="text-[10px] font-bold uppercase text-muted-foreground block">
              Plasma (প্লাজমা)
            </span>
            <span className="text-lg font-black text-amber-500 block mt-1">28 Days</span>
            <span className="text-[11px] text-muted-foreground">Protein Recovery</span>
          </div>
        </div>
      </section>

      {/* Compatibility Matrix */}
      <section id="compatibility" className="space-y-4">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-primary" />
          <h2 className="text-xl sm:text-2xl font-black text-foreground">
            {language === "bn" ? "রক্তের গ্রুপ সামঞ্জস্যতা চার্ট" : "Blood Group Compatibility Matrix"}
          </h2>
        </div>

        <div className="p-6 rounded-3xl bg-card border border-border shadow-sm overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-border text-muted-foreground font-bold uppercase text-[10px]">
                <th className="py-3 px-3">Blood Group</th>
                <th className="py-3 px-3">Can Donate To (কাকে রক্ত দিতে পারে)</th>
                <th className="py-3 px-3">Can Receive From (কার থেকে নিতে পারে)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {compatibilityData.map((row) => (
                <tr key={row.group} className="hover:bg-muted/40 transition-colors">
                  <td className="py-3.5 px-3 font-black text-primary text-base">
                    {row.group}
                  </td>
                  <td className="py-3.5 px-3 font-semibold text-foreground">
                    {row.givesTo}
                  </td>
                  <td className="py-3.5 px-3 text-muted-foreground">
                    {row.receivesFrom}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 flex items-start gap-3 text-xs text-amber-900 dark:text-amber-200">
          <ShieldAlert className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <span>
            {language === "bn"
              ? "জরুরি চিকিৎসা ঘোষণা: ABO ও Rh সামঞ্জস্যতা থাকা সত্ত্বেও রোগীর শরীরে রক্ত দেওয়ার আগে হাসপাতালে মাইনর ও মেজর ক্রস-ম্যাচিং অবশ্যই সম্পন্ন করতে হবে।"
              : "Medical Transfusion Protocol: Even with theoretical compatibility, licensed clinical crossmatching and infectious screening must be completed prior to every transfusion."}
          </span>
        </div>
      </section>

      {/* Myths vs Facts */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-primary" />
          <h2 className="text-xl sm:text-2xl font-black text-foreground">
            {language === "bn" ? "রক্তদান নিয়ে ভুল ধারণা বনাম সঠিক তথ্য" : "Myths vs Scientific Facts"}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {mythsVsFacts.map((item, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-card border border-border shadow-sm space-y-2"
            >
              <div className="flex items-start gap-2 text-rose-600 dark:text-rose-400 font-bold text-xs sm:text-sm">
                <span className="px-2 py-0.5 rounded bg-rose-100 dark:bg-rose-950/40 text-[10px] uppercase font-mono">
                  Myth
                </span>
                <span>{item.myth}</span>
              </div>
              <div className="flex items-start gap-2 text-foreground font-medium text-xs sm:text-sm pl-4 border-l-2 border-bdgreen-600">
                <span className="px-2 py-0.5 rounded bg-bdgreen-100 text-bdgreen-700 text-[10px] uppercase font-mono">
                  Fact
                </span>
                <span className="text-muted-foreground leading-relaxed">{item.fact}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}


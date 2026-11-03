"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { Search, Heart, UserCheck, ShieldCheck, ArrowRight, Droplets } from "lucide-react";

export default function HowItWorksPage() {
  const { language } = useLanguage();

  const steps = [
    {
      step: "01",
      title: language === "bn" ? "নিবন্ধন ও স্বাস্থ্য স্ক্রীনিং" : "Register & Health Screening",
      desc: language === "bn" ? "৪টি ধাপে ব্যক্তিগত তথ্য, রক্তের গ্রুপ এবং স্বাস্থ্য ঘোষণা পূরণ করে তাৎক্ষণিক ডিজিটাল আইডি পান।" : "Complete multi-step registration, verify age (18+) and receive your digital donor ID card with dynamic QR code.",
      icon: UserCheck,
    },
    {
      step: "02",
      title: language === "bn" ? "জরুরি রিকোয়েস্ট বা রক্তদাতা অনুসন্ধান" : "Search or Post Urgent Request",
      desc: language === "bn" ? "বিভাগ ও জেলা অনুযায়ী উপযুক্ত রক্তদাতা খুঁজে নিন অথবা রোগীর জন্য আবেদন পোস্ট করুন।" : "Filter donors across all 64 districts or post an urgent appeal for hospitalized family members.",
      icon: Search,
    },
    {
      step: "03",
      title: language === "bn" ? "নিরাপদ যোগাযোগ ও সম্মতি" : "Consent-Protected Contact",
      desc: language === "bn" ? "রক্তদাতার ব্যক্তিগত ফোন নম্বর শুধুমাত্র চিকিৎসাগত জরুরি প্রয়োজনে প্রকাশের সুযোগ।" : "Donor privacy is protected. Contact details are safely shared solely with verified emergency patient attendants.",
      icon: Heart,
    },
    {
      step: "04",
      title: language === "bn" ? "রক্তদান ও ৯০ দিনের স্বয়ংক্রিয় কুলডাউন" : "Donation & Automatic 90D Rule",
      desc: language === "bn" ? "রক্তদানের পর হাসপাতাল স্লিপ নথিভুক্ত করলেই পরবর্তী ৩ মাসের স্বাস্থ্য বিরতি স্বয়ংক্রিয়ভাবে চালু হয়।" : "After hospital donation, the verified record triggers the automated 90-day cooldown to ensure healthy recovery.",
      icon: Droplets,
    },
  ];

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 max-w-4xl space-y-10">
      <div className="text-center space-y-3">
        <h1 className="text-3xl sm:text-4xl font-black text-foreground">
          {language === "bn" ? "ব্লাডবন্ড বাংলাদেশ কীভাবে কাজ করে?" : "How BloodBond Bangladesh Works"}
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground max-w-lg mx-auto">
          {language === "bn"
            ? "একটি নিরাপদ, স্বচ্ছ এবং আধুনিক ডিজিটাল রক্তদান ইকোসিস্টেম।"
            : "A transparent nationwide digital ecosystem connecting donors, patients and hospitals."}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {steps.map((st) => {
          const Icon = st.icon;
          return (
            <div
              key={st.step}
              className="p-6 rounded-3xl bg-card border border-border shadow-sm space-y-3 relative overflow-hidden"
            >
              <span className="text-4xl font-black text-muted-foreground/20 absolute top-4 right-4">
                {st.step}
              </span>
              <div className="p-3 rounded-2xl bg-blood-100 text-primary w-fit">
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-foreground">{st.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{st.desc}</p>
            </div>
          );
        })}
      </div>

      <div className="p-8 rounded-3xl bg-primary text-white text-center space-y-4 shadow-xl">
        <h3 className="text-2xl font-black">
          {language === "bn" ? "আজই জীবন বাঁচানোর অংশীদার হোন" : "Become Part of this Life-Saving Movement"}
        </h3>
        <p className="text-xs sm:text-sm text-white/80 max-w-md mx-auto">
          {language === "bn"
            ? "স্বেচ্ছায় রক্তদানে এগিয়ে আসুন এবং দেশের প্রতিটি প্রান্তে অসহায় রোগীদের পাশে দাঁড়ান।"
            : "Register as a verified voluntary donor or connect with nearby donors in your district."}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link
            href="/become-a-donor"
            className="px-6 py-3 bg-white text-primary text-xs font-bold rounded-2xl shadow-md hover:bg-neutral-100 transition-colors"
          >
            Become a Donor
          </Link>
          <Link
            href="/donors"
            className="px-6 py-3 bg-black/20 text-white text-xs font-bold rounded-2xl border border-white/30 hover:bg-black/30 transition-colors"
          >
            Search Donors
          </Link>
        </div>
      </div>
    </div>
  );
}


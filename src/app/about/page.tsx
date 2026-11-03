"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { Heart, ShieldCheck, Users, Target, ArrowRight } from "lucide-react";

export default function AboutPage() {
  const { language } = useLanguage();

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 max-w-4xl space-y-10">
      <div className="text-center space-y-3">
        <div className="relative w-16 h-16 mx-auto">
          <Image src="/images/bloodbond-logo.png" alt="Logo" fill className="object-contain" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-foreground">
          BloodBond Bangladesh
        </h1>
        <p className="text-base font-bold text-primary italic font-bengali">
          &ldquo;Donate Blood, Save Lives • রক্ত দিন, জীবন বাঁচান&rdquo;
        </p>
      </div>

      <div className="p-6 sm:p-8 rounded-3xl bg-card border border-border shadow-sm space-y-4 text-xs sm:text-sm text-muted-foreground leading-relaxed">
        <p>
          {language === "bn"
            ? "BloodBond Bangladesh হলো বাংলাদেশের সকল ৬৪টি জেলা এবং প্রত্যন্ত অঞ্চলে স্বেচ্ছাসেবী রক্তদাতা, হাসপাতাল, থ্যালাসেমিয়া রোগী এবং জরুরি রক্তের সন্ধানকারী পরিবারগুলোর মধ্যে একটি নির্ভরযোগ্য, আধুনিক এবং প্রযুক্তি-চালিত সংযোগ ব্যবস্থা।"
            : "BloodBond Bangladesh is a nationwide digital blood donation and emergency donor management ecosystem connecting donors, accredited hospitals, thalassemia foundations, and patients across all 64 districts."}
        </p>
        <p>
          {language === "bn"
            ? "আমাদের লক্ষ্য প্রতিটি রোগীকে সময়মতো রক্ত প্রাপ্তিতে সহায়তা করা, রক্তদাতার ব্যক্তিগত গোপনীয়তা রক্ষা করা এবং সম্পূর্ণ রক্তদানের বৈজ্ঞানিক ৯০ দিনের ব্যবধান ও স্বাস্থ্য সুরক্ষার নিশ্চয়তা প্রদান করা।"
            : "Our mission is to eliminate blood shortages through decentralized voluntary donation, safeguard donor privacy, ensure hospital crossmatching compliance, and enforce the 90-day whole blood cooldown for donor wellness."}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-card border border-border text-center space-y-2">
          <ShieldCheck className="w-8 h-8 text-bdgreen-600 mx-auto" />
          <h3 className="font-bold text-sm text-foreground">100% Voluntary</h3>
          <p className="text-xs text-muted-foreground">Completely non-commercial humanitarian initiative.</p>
        </div>
        <div className="p-5 rounded-2xl bg-card border border-border text-center space-y-2">
          <Users className="w-8 h-8 text-primary mx-auto" />
          <h3 className="font-bold text-sm text-foreground">64 Districts</h3>
          <p className="text-xs text-muted-foreground">Decentralized network covering upazilas and thanas.</p>
        </div>
        <div className="p-5 rounded-2xl bg-card border border-border text-center space-y-2">
          <Target className="w-8 h-8 text-amber-500 mx-auto" />
          <h3 className="font-bold text-sm text-foreground">Digital ID Verification</h3>
          <p className="text-xs text-muted-foreground">Instant authenticity check via dynamic secure QR codes.</p>
        </div>
      </div>
    </div>
  );
}


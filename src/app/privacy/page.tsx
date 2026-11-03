"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { ShieldCheck } from "lucide-react";

export default function PrivacyPage() {
  const { language } = useLanguage();

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 max-w-3xl space-y-6 text-foreground">
      <div className="flex items-center gap-2 text-primary font-bold">
        <ShieldCheck className="w-6 h-6" />
        <h1 className="text-2xl sm:text-3xl font-black">
          {language === "bn" ? "গোপনীয়তা নীতি" : "Privacy Policy"}
        </h1>
      </div>

      <div className="p-6 sm:p-8 rounded-3xl bg-card border border-border shadow-sm space-y-4 text-xs sm:text-sm text-muted-foreground leading-relaxed">
        <p>
          BloodBond Bangladesh values the privacy and personal security of voluntary donors, hospital attendants, and patients. This policy outlines our strict protocols against unauthorized commercial data exploitation.
        </p>

        <h3 className="font-bold text-foreground text-sm pt-2">1. Phone Number & Address Protection</h3>
        <p>
          Precise residential street addresses and private donor phone numbers are never displayed publicly on unauthenticated search results. Emergency patient attendants must accept an explicit consent declaration before viewing a donor&apos;s contact number.
        </p>

        <h3 className="font-bold text-foreground text-sm pt-2">2. Non-Commercial Voluntary Use</h3>
        <p>
          Data stored on BloodBond is exclusively utilized for life-saving humanitarian blood matching. Under no circumstances is user information sold, rented, or distributed to marketing agencies.
        </p>

        <h3 className="font-bold text-foreground text-sm pt-2">3. Digital QR Code Safety</h3>
        <p>
          The QR code displayed on digital donor ID cards links strictly to a public validation URL on the bloodbond.bd domain. It does not encode private medical histories or unencrypted passwords.
        </p>
      </div>
    </div>
  );
}


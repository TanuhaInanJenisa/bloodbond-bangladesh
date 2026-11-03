"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { ShieldAlert } from "lucide-react";

export default function TermsPage() {
  const { language } = useLanguage();

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 max-w-3xl space-y-6 text-foreground">
      <div className="flex items-center gap-2 text-primary font-bold">
        <ShieldAlert className="w-6 h-6" />
        <h1 className="text-2xl sm:text-3xl font-black">
          {language === "bn" ? "ব্যবহারের শর্তাবলী" : "Terms & Conditions"}
        </h1>
      </div>

      <div className="p-6 sm:p-8 rounded-3xl bg-card border border-border shadow-sm space-y-4 text-xs sm:text-sm text-muted-foreground leading-relaxed">
        <p>
          By accessing or registering with BloodBond Bangladesh, you unconditionally agree to abide by these guidelines governing ethical voluntary blood donation.
        </p>

        <h3 className="font-bold text-foreground text-sm pt-2">1. Prohibition of Paid Blood Transactions</h3>
        <p>
          Blood donation on BloodBond is strictly voluntary and non-remunerated. Demanding or offering money or financial incentives for blood donation is strictly unlawful and grounds for immediate permanent expulsion and legal escalation.
        </p>

        <h3 className="font-bold text-foreground text-sm pt-2">2. Mandatory Clinical Screening & Crossmatching</h3>
        <p>
          BloodBond acts as a digital discovery network. It does not replace clinical laboratory responsibilities. Recipient hospital pathologists must always perform rigorous serological crossmatching, infectious disease tests, and hemoglobin screening before any transfusion takes place.
        </p>

        <h3 className="font-bold text-foreground text-sm pt-2">3. 90-Day Health Cooldown</h3>
        <p>
          Whole blood donors must comply with the recommended 90-day cooldown interval between donations to maintain their physical health and normal hematocrit indices.
        </p>
      </div>
    </div>
  );
}


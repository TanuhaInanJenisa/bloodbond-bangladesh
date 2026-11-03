"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Organization } from "@/types/database";
import { BloodBondRepository } from "@/lib/data/repository";
import { Building, Phone, Mail, MapPin, ShieldCheck, HeartHandshake } from "lucide-react";

export default function OrganizationsPage() {
  const { language } = useLanguage();
  const [organizations, setOrganizations] = useState<Organization[]>([]);

  useEffect(() => {
    setOrganizations(BloodBondRepository.getOrganizations());
  }, []);

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8">
      <div className="text-center max-w-2xl mx-auto space-y-2 mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-bdgreen-100 dark:bg-bdgreen-950/40 text-bdgreen-700 dark:text-bdgreen-400 text-xs font-bold">
          <Building className="w-3.5 h-3.5" />
          <span>{language === "bn" ? "সংযুক্ত চিকিৎসালয় ও ব্লাড ব্যাংক" : "Institutional Partners"}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-foreground">
          {language === "bn" ? "হাসপাতাল ও রক্তদান সংস্থা" : "Hospitals & Organizations"}
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground">
          {language === "bn"
            ? "বাংলাদেশে সরকারি ও বেসরকারি মেডিকেল কলেজ হাসপাতাল এবং স্বেচ্ছাসেবী ব্লাড ব্যাংকের তালিকা।"
            : "Directory of authorized healthcare facilities, red crescent centers, and accredited volunteer blood societies."}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {organizations.map((org) => (
          <div
            key={org.id}
            className="p-6 rounded-3xl bg-card border border-border shadow-sm hover:shadow-md hover:border-primary/40 transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-muted text-[10px] font-bold uppercase font-mono text-muted-foreground">
                  {org.type.replace("_", " ")}
                </span>
                <span className="flex items-center gap-1 text-[11px] font-bold text-bdgreen-600">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Verified</span>
                </span>
              </div>

              <h3 className="font-extrabold text-base text-foreground leading-tight">
                {org.name}
              </h3>

              <div className="space-y-1.5 text-xs text-muted-foreground pt-2 border-t border-border/60">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                  <span>{org.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                  <span className="font-semibold text-foreground">{org.phone}</span>
                </div>
                {org.email && (
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                    <span>{org.email}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-border/60">
              <a
                href={`tel:${org.phone}`}
                className="w-full py-2.5 bg-secondary hover:bg-muted text-foreground text-xs font-bold rounded-xl border border-border flex items-center justify-center gap-1.5 transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Contact Facility</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


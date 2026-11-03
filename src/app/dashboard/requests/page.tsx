"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { BloodBondRepository } from "@/lib/data/repository";
import { BloodRequest } from "@/types/database";
import { Heart, PlusCircle, Building, MapPin, Clock, Phone, AlertCircle } from "lucide-react";

export default function DashboardRequestsPage() {
  const { language } = useLanguage();
  const [requests, setRequests] = useState<BloodRequest[]>([]);

  useEffect(() => {
    const list = BloodBondRepository.getRequests();
    setRequests(list);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-foreground">
            {language === "bn" ? "আমার রক্তের আবেদনসমূহ" : "My Blood Requests"}
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            {language === "bn"
              ? "জরুরি রক্তের প্রয়োজনে আপনার পোস্ট করা আবেদনগুলো পরিচালনা করুন।"
              : "Manage active and historical blood requests you have posted."}
          </p>
        </div>

        <Link
          href="/request-blood"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary-hover text-white text-xs sm:text-sm font-bold rounded-2xl shadow-md shadow-primary/20 transition-all hover:scale-105"
        >
          <PlusCircle className="w-4 h-4" />
          <span>{language === "bn" ? "নতুন আবেদন পোস্ট করুন" : "New Blood Request"}</span>
        </Link>
      </div>

      <div className="space-y-4">
        {requests.map((req) => (
          <div
            key={req.id}
            className="p-5 rounded-3xl bg-card border border-border shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="flex items-start gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-blood-100 text-primary font-black text-xl flex items-center justify-center flex-shrink-0">
                {req.blood_group}
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-base text-foreground">
                    {req.patient_name}
                  </h3>
                  <span className="text-xs text-muted-foreground">
                    ({req.bags_required} {language === "bn" ? "ব্যাগ" : "bags"})
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-amber-100 text-amber-700">
                    {req.status}
                  </span>
                </div>
                <div className="text-xs text-muted-foreground flex items-center gap-1">
                  <Building className="w-3.5 h-3.5 text-primary" />
                  <span>{req.hospital_name}</span>
                </div>
                <div className="text-xs text-muted-foreground flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-primary" />
                  <span>Required: {req.required_date} • {req.required_time}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={`tel:${req.primary_phone}`}
                className="py-2 px-4 bg-secondary text-foreground text-xs font-bold rounded-xl border border-border hover:bg-muted"
              >
                Call Contact
              </a>
              <Link
                href="/emergency-requests"
                className="py-2 px-4 bg-primary text-white text-xs font-bold rounded-xl shadow-sm"
              >
                Public View
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { BloodRequest } from "@/types/database";
import { BloodBondRepository } from "@/lib/data/repository";
import { AlertCircle, Clock, MapPin, Building, Phone, ArrowRight, ShieldCheck } from "lucide-react";

export const HomeEmergencyRequests: React.FC = () => {
  const { language } = useLanguage();
  const [requests, setRequests] = useState<BloodRequest[]>([]);

  useEffect(() => {
    const list = BloodBondRepository.getRequests();
    setRequests(list.slice(0, 3));
  }, []);

  return (
    <div className="w-full my-12">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 text-xs font-bold mb-2">
            <span className="w-2 h-2 rounded-full bg-rose-600 animate-ping" />
            <span>{language === "bn" ? "জরুরি লাইভ রিকোয়েস্ট" : "Live Emergency Requests"}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
            {language === "bn" ? "জরুরি রক্তের প্রয়োজন" : "Urgent Blood Needed Now"}
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            {language === "bn"
              ? "সরাসরি হাসপাতালে চিকিৎসাধীন রোগীদের রক্তের আবেদনে সাড়া দিন।"
              : "Directly respond to verified patient appeals in critical care."}
          </p>
        </div>

        <Link
          href="/emergency-requests"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-primary hover:underline group"
        >
          <span>{language === "bn" ? "সবগুলো আবেদন দেখুন" : "View All Requests"}</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {requests.map((req) => (
          <div
            key={req.id}
            className="flex flex-col justify-between p-5 rounded-2xl bg-card border border-border shadow-sm hover:shadow-md hover:border-primary/40 transition-all relative overflow-hidden"
          >
            {/* Urgency indicator strip */}
            <div
              className={`absolute top-0 left-0 right-0 h-1.5 ${
                req.priority === "critical"
                  ? "bg-rose-600 animate-pulse"
                  : req.priority === "urgent"
                  ? "bg-amber-500"
                  : "bg-blue-500"
              }`}
            />

            <div>
              {/* Header with Blood Group & Priority */}
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-2xl bg-blood-100 dark:bg-blood-900/40 text-primary font-black text-2xl flex items-center justify-center border border-blood-200 dark:border-blood-800 shadow-inner">
                    {req.blood_group}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-foreground">
                      {req.patient_name}
                    </h3>
                    <span className="text-xs text-muted-foreground font-medium">
                      {req.bags_required} {language === "bn" ? "ব্যাগ প্রয়োজন" : "Bag(s) Needed"}
                    </span>
                  </div>
                </div>

                <span
                  className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                    req.priority === "critical"
                      ? "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400"
                      : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                  }`}
                >
                  {req.priority}
                </span>
              </div>

              {/* Hospital & Location */}
              <div className="space-y-2 text-xs text-muted-foreground border-y border-border/60 py-3 my-3">
                <div className="flex items-start gap-2">
                  <Building className="w-3.5 h-3.5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-foreground font-semibold leading-tight line-clamp-1">
                    {req.hospital_name}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                  <span>
                    {req.upazila_name}, {req.district_name}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                  <span>
                    {req.required_date} • {req.required_time}
                  </span>
                </div>
              </div>

              {/* Medical Reason */}
              {req.medical_reason && (
                <p className="text-xs text-muted-foreground line-clamp-2 italic bg-muted/40 p-2 rounded-lg mb-4">
                  &ldquo;{req.medical_reason}&rdquo;
                </p>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 pt-2">
              <a
                href={`tel:${req.primary_phone}`}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-xl shadow-md shadow-primary/20 transition-all hover:scale-[1.02]"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>{language === "bn" ? "কল করুন" : "Call Now"}</span>
              </a>
              <Link
                href={`/emergency-requests`}
                className="py-2.5 px-3 bg-secondary hover:bg-muted text-foreground text-xs font-semibold rounded-xl border border-border transition-colors"
              >
                {language === "bn" ? "বিস্তারিত" : "Details"}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


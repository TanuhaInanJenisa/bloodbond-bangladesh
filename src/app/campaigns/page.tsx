"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { Campaign } from "@/types/database";
import { BloodBondRepository } from "@/lib/data/repository";
import { Calendar, MapPin, Users, Droplet, CheckCircle2, ArrowRight } from "lucide-react";

export default function CampaignsPage() {
  const { language, t } = useLanguage();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [joined, setJoined] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setCampaigns(BloodBondRepository.getCampaigns());
  }, []);

  const handleJoin = (id: string) => {
    setJoined((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2 mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blood-100 dark:bg-blood-900/30 text-primary text-xs font-bold">
          <Calendar className="w-3.5 h-3.5" />
          <span>{language === "bn" ? "রক্তদান উৎসব ও কর্মসূচি" : "Nationwide Blood Drives"}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-foreground">
          {language === "bn" ? "সারা বাংলাদেশে রক্তদান ক্যাম্পেইন" : "Blood Donation Campaigns"}
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground">
          {language === "bn"
            ? "বিভিন্ন বিশ্ববিদ্যালয়, সামাজিক সংগঠন এবং রেড ক্রিসেন্ট পরিচালিত রক্তদান ক্যাম্পে অংশগ্রহণ করুন।"
            : "Join voluntary donation camps organized by universities, clubs, and humanitarian societies."}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {campaigns.map((camp) => (
          <div
            key={camp.id}
            className="p-6 rounded-3xl bg-card border border-border shadow-sm hover:shadow-lg hover:border-primary/40 transition-all flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold text-primary font-mono block">
                  {camp.organizer_name}
                </span>
                <h3 className="font-extrabold text-lg text-foreground leading-tight">
                  {language === "bn" && camp.bn_title ? camp.bn_title : camp.title}
                </h3>
              </div>

              <p className="text-xs text-muted-foreground leading-relaxed">
                {camp.description}
              </p>

              <div className="space-y-2 text-xs text-muted-foreground py-3 border-y border-border/60">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-foreground font-semibold">
                    {camp.venue_address} ({camp.district_name})
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-primary flex-shrink-0" />
                  <span>
                    {new Date(camp.start_date).toLocaleDateString()} - {new Date(camp.end_date).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {/* Progress of Bags */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Target: {camp.target_bags} Bags</span>
                  <span className="font-bold text-primary">{camp.collected_bags} Collected</span>
                </div>
                <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all"
                    style={{
                      width: `${Math.min(100, (camp.collected_bags / camp.target_bags) * 100)}%`,
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="pt-5 mt-4 border-t border-border/60">
              {joined[camp.id] ? (
                <div className="w-full py-2.5 rounded-xl bg-bdgreen-100 text-bdgreen-700 text-xs font-bold text-center flex items-center justify-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{language === "bn" ? "নিবন্ধন সম্পন্ন হয়েছে" : "Registered for Drive"}</span>
                </div>
              ) : (
                <button
                  onClick={() => handleJoin(camp.id)}
                  className="w-full py-3 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-xl shadow-md shadow-primary/20 transition-all"
                >
                  {language === "bn" ? "অংশগ্রহণ নিশ্চিত করুন" : "Join this Campaign"}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


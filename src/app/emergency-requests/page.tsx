"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { BloodRequest } from "@/types/database";
import { BloodBondRepository } from "@/lib/data/repository";
import { BANGLADESH_DIVISIONS, getDistricts } from "@/lib/data/bangladeshGeo";
import {
  AlertCircle,
  Building,
  MapPin,
  Clock,
  Phone,
  PlusCircle,
  Filter,
  Share2,
  Calendar,
  CheckCircle,
} from "lucide-react";

export default function EmergencyRequestsPage() {
  const { language, t } = useLanguage();

  const [requests, setRequests] = useState<BloodRequest[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<string>("ALL");
  const [selectedDivision, setSelectedDivision] = useState<string>("");
  const [selectedPriority, setSelectedPriority] = useState<string>("ALL");
  const [shareSuccess, setShareSuccess] = useState<string | null>(null);

  useEffect(() => {
    const list = BloodBondRepository.getRequests();
    setRequests(list);
  }, []);

  const bloodGroups = ["ALL", "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  const filtered = requests.filter((r) => {
    if (selectedGroup !== "ALL" && r.blood_group !== selectedGroup) return false;
    if (selectedDivision && r.division_id !== selectedDivision) return false;
    if (selectedPriority !== "ALL" && r.priority !== selectedPriority) return false;
    return true;
  });

  const handleShare = (req: BloodRequest) => {
    const text = `URGENT BLOOD REQUIRED: ${req.blood_group} (${req.bags_required} bags) at ${req.hospital_name}, ${req.district_name}. Contact: ${req.primary_phone}. Shared via BloodBond Bangladesh.`;
    if (navigator.share) {
      navigator.share({
        title: `Urgent ${req.blood_group} Blood Required`,
        text: text,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(text);
      setShareSuccess(req.id);
      setTimeout(() => setShareSuccess(null), 2500);
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 text-xs font-bold mb-2">
            <span className="w-2 h-2 rounded-full bg-rose-600 animate-ping" />
            <span>{language === "bn" ? "জরুরি লাইভ ফিড" : "Live Emergency Appeals"}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
            {language === "bn" ? "জরুরি রক্তের আবেদনসমূহ" : "Emergency Blood Requests"}
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            {language === "bn"
              ? "হাসপাতালে চিকিৎসাধীন রোগীদের জীবন রক্ষায় দ্রুততম সময়ে রক্তদানে এগিয়ে আসুন।"
              : "Directly support critical patients across Bangladesh. Every second matters."}
          </p>
        </div>

        <Link
          href="/request-blood"
          className="inline-flex items-center gap-2 px-5 py-3 bg-primary hover:bg-primary-hover text-white rounded-2xl font-bold text-xs sm:text-sm shadow-xl shadow-primary/25 transition-all hover:scale-105 active:scale-95"
        >
          <PlusCircle className="w-4 h-4" />
          <span>{language === "bn" ? "রক্তের আবেদন পোস্ট করুন" : "Post Urgent Blood Request"}</span>
        </Link>
      </div>

      {/* Filter Bar */}
      <div className="p-4 rounded-2xl bg-card border border-border shadow-sm mb-8 space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
          <Filter className="w-3.5 h-3.5 text-primary" />
          <span>{language === "bn" ? "ফিল্টার করুন" : "Quick Filters"}</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Blood group */}
          <div>
            <label className="text-[10px] font-bold uppercase text-muted-foreground block mb-1">
              {t("bloodGroup")}
            </label>
            <select
              value={selectedGroup}
              onChange={(e) => setSelectedGroup(e.target.value)}
              className="w-full py-2 px-3 bg-muted/60 border border-border rounded-xl text-xs font-semibold text-foreground focus:outline-none"
            >
              {bloodGroups.map((bg) => (
                <option key={bg} value={bg}>
                  {bg}
                </option>
              ))}
            </select>
          </div>

          {/* Division */}
          <div>
            <label className="text-[10px] font-bold uppercase text-muted-foreground block mb-1">
              {t("division")}
            </label>
            <select
              value={selectedDivision}
              onChange={(e) => setSelectedDivision(e.target.value)}
              className="w-full py-2 px-3 bg-muted/60 border border-border rounded-xl text-xs font-semibold text-foreground focus:outline-none"
            >
              <option value="">{language === "bn" ? "সকল বিভাগ" : "All Divisions"}</option>
              {BANGLADESH_DIVISIONS.map((div) => (
                <option key={div.id} value={div.id}>
                  {language === "bn" ? div.bnName : div.name}
                </option>
              ))}
            </select>
          </div>

          {/* Priority */}
          <div>
            <label className="text-[10px] font-bold uppercase text-muted-foreground block mb-1">
              {language === "bn" ? "জরুরিতা স্তর" : "Urgency Priority"}
            </label>
            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="w-full py-2 px-3 bg-muted/60 border border-border rounded-xl text-xs font-semibold text-foreground focus:outline-none"
            >
              <option value="ALL">{language === "bn" ? "সকল স্তর" : "All Urgency Levels"}</option>
              <option value="critical">Critical / Life Threatening</option>
              <option value="urgent">Urgent</option>
              <option value="normal">Normal</option>
            </select>
          </div>
        </div>
      </div>

      {/* Requests Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((req) => (
          <div
            key={req.id}
            className="p-6 rounded-3xl bg-card border border-border shadow-sm hover:shadow-lg hover:border-primary/40 transition-all flex flex-col justify-between relative overflow-hidden"
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
              {/* Header */}
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-2xl bg-blood-100 dark:bg-blood-900/40 text-primary font-black text-2xl flex items-center justify-center border border-blood-200 dark:border-blood-800 shadow-inner">
                    {req.blood_group}
                  </div>
                  <div>
                    <h3 className="font-extrabold text-base text-foreground leading-tight">
                      {req.patient_name}
                    </h3>
                    <span className="text-xs text-muted-foreground font-semibold">
                      {req.bags_required} {language === "bn" ? "ব্যাগ রক্ত প্রয়োজন" : "Bags Needed"}
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
              <div className="space-y-2 text-xs text-muted-foreground py-3 border-y border-border/60 my-3">
                <div className="flex items-start gap-2">
                  <Building className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-foreground font-bold leading-tight">
                    {req.hospital_name}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                  <span>
                    {req.hospital_address || `${req.upazila_name}, ${req.district_name}`}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="font-semibold text-foreground">
                    {req.required_date} • {req.required_time}
                  </span>
                </div>
              </div>

              {/* Medical Reason */}
              {req.medical_reason && (
                <div className="p-3 rounded-xl bg-muted/40 border border-border/60 text-xs text-muted-foreground italic mb-4">
                  &ldquo;{req.medical_reason}&rdquo;
                </div>
              )}

              {/* Contact Person */}
              <div className="text-xs text-muted-foreground mb-4">
                <span>{language === "bn" ? "যোগাযোগকারী:" : "Contact Person:"} </span>
                <strong className="text-foreground">{req.contact_person}</strong>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2 pt-2 border-t border-border/60">
              <a
                href={`tel:${req.primary_phone}`}
                className="w-full py-3 px-4 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 shadow-md shadow-primary/20 transition-all hover:scale-[1.02]"
              >
                <Phone className="w-4 h-4" />
                <span>{language === "bn" ? "এখনই কল করুন" : "Call to Donate"}</span>
              </a>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleShare(req)}
                  className="flex-1 py-2 px-3 bg-secondary hover:bg-muted text-foreground text-xs font-semibold rounded-xl border border-border transition-colors flex items-center justify-center gap-1.5"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>
                    {shareSuccess === req.id
                      ? language === "bn"
                        ? "কপি হয়েছে!"
                        : "Copied!"
                      : language === "bn"
                      ? "শেয়ার করুন"
                      : "Share Request"}
                  </span>
                </button>

                {req.alternate_phone && (
                  <a
                    href={`tel:${req.alternate_phone}`}
                    className="py-2 px-3 bg-secondary hover:bg-muted text-foreground text-xs font-semibold rounded-xl border border-border"
                  >
                    Alt Call
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


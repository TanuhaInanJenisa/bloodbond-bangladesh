"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import QRCode from "qrcode";
import { useLanguage } from "@/context/LanguageContext";
import { BloodBondRepository } from "@/lib/data/repository";
import { DonorProfile } from "@/types/database";
import {
  Download,
  Printer,
  Share2,
  ShieldCheck,
  MapPin,
  Calendar,
  CheckCircle2,
  RefreshCw,
  Droplet,
} from "lucide-react";

export default function DigitalDonorIdPage() {
  const { language } = useLanguage();

  const [donor, setDonor] = useState<DonorProfile | null>(null);
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    const curUser = BloodBondRepository.getCurrentUser();
    const donors = BloodBondRepository.getDonors();
    const myDonor = donors.find((d) => d.profile_id === curUser.id || d.id === "donor-01");
    if (myDonor) {
      setDonor(myDonor);
      generateQR(myDonor);
    }
  }, []);

  const generateQR = (donorData: DonorProfile) => {
    if (typeof window !== "undefined") {
      const verifyUrl = `${window.location.origin}/donors/${donorData.id}`;
      QRCode.toDataURL(verifyUrl, {
        width: 220,
        margin: 1,
        color: {
          dark: "#C62828",
          light: "#FFFFFF",
        },
      }).then((url) => setQrCodeDataUrl(url));
    }
  };

  const handleRegenerate = () => {
    if (!donor) return;
    setIsGenerating(true);
    setTimeout(() => {
      generateQR(donor);
      setIsGenerating(false);
    }, 600);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    if (!donor) return;
    const url = `${window.location.origin}/donors/${donor.id}`;
    if (navigator.share) {
      navigator.share({
        title: `Official BloodBond ID - ${donor.profile.full_name}`,
        text: `Verified Voluntary Blood Donor ID: ${donor.donor_code}`,
        url,
      });
    } else {
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!donor) {
    return <div className="p-8 text-center text-sm text-muted-foreground">Loading Donor ID...</div>;
  }

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      {/* Title & Action controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-foreground">
            {language === "bn" ? "ডিজিটাল রক্তদাতা আইডি কার্ড" : "Digital Donor Membership Card"}
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            {language === "bn"
              ? "জরুরি পরিস্থিতিতে আপনার রক্তদাতা পরিচয় নিশ্চিত করতে এই কার্ডটি প্রদর্শন করুন।"
              : "Present your verified digital membership badge when donating blood nationwide."}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleRegenerate}
            disabled={isGenerating}
            className="flex items-center gap-1.5 px-3 py-2 bg-card hover:bg-muted text-foreground text-xs font-bold rounded-xl border border-border shadow-sm"
            title="Regenerate Card"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isGenerating ? "animate-spin" : ""}`} />
            <span>{language === "bn" ? "রিফ্রেশ" : "Sync"}</span>
          </button>

          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3 py-2 bg-card hover:bg-muted text-foreground text-xs font-bold rounded-xl border border-border shadow-sm"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{copied ? (language === "bn" ? "কপি হয়েছে!" : "Copied!") : language === "bn" ? "শেয়ার" : "Share"}</span>
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-4 py-2 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-xl shadow-md shadow-primary/20"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>{language === "bn" ? "প্রিন্ট কার্ড" : "Print ID Card"}</span>
          </button>
        </div>
      </div>

      {/* THE OFFICIAL DIGITAL DONOR ID CARD (CR80 Credit Card Standard Aspect Ratio) */}
      <div
        id="printable-donor-card"
        className="w-full aspect-[1.586/1] max-w-lg mx-auto rounded-3xl p-6 sm:p-7 bg-gradient-to-br from-[#8E0000] via-[#C62828] to-[#991B1B] text-white shadow-2xl relative overflow-hidden border-2 border-white/20 flex flex-col justify-between"
      >
        {/* Hologram / Guilloche security pattern simulation */}
        <div className="absolute -right-16 -top-16 w-56 h-56 rounded-full bg-white/5 pointer-events-none" />
        <div className="absolute -left-16 -bottom-16 w-56 h-56 rounded-full bg-black/10 pointer-events-none" />

        {/* Card Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/25">
          <div className="flex items-center gap-2.5">
            <div className="relative w-8 h-8 flex-shrink-0">
              <Image src="/images/bloodbond-logo.png" alt="Emblem" fill className="object-contain" />
            </div>
            <div>
              <span className="font-black text-sm sm:text-base tracking-wide leading-none block">
                BloodBond Bangladesh
              </span>
              <span className="text-[9px] text-white/80 tracking-widest uppercase font-semibold">
                Nationwide Donor Network
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/20 border border-white/30 text-[10px] font-extrabold uppercase tracking-wider">
            <ShieldCheck className="w-3 h-3 text-emerald-300" />
            <span>Verified Donor</span>
          </div>
        </div>

        {/* Card Body */}
        <div className="my-auto flex items-center justify-between gap-4 py-2">
          {/* Avatar & Personal Data */}
          <div className="flex items-center gap-4">
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-white/70 shadow-xl flex-shrink-0">
              <Image
                src={donor.profile.avatar_url || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"}
                alt={donor.profile.full_name}
                fill
                className="object-cover"
              />
            </div>

            <div className="min-w-0 space-y-1">
              <h3 className="font-black text-lg sm:text-xl leading-tight truncate">
                {donor.profile.full_name}
              </h3>
              <div className="text-xs text-white/90 font-mono tracking-wider font-bold">
                {donor.donor_code}
              </div>
              <div className="text-[11px] text-white/80 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-white/70" />
                <span>{donor.upazila_name}, {donor.district_name}</span>
              </div>
              <div className="text-[10px] text-white/70 flex items-center gap-1">
                <Calendar className="w-3 h-3 text-white/70" />
                <span>Registered: {new Date(donor.profile.created_at).toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          {/* Blood Group Highlight */}
          <div className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl bg-black/25 border border-white/20 shadow-inner min-w-[70px] sm:min-w-[85px]">
            <span className="text-[9px] font-extrabold uppercase text-white/70 tracking-widest">
              Blood
            </span>
            <span className="text-3xl sm:text-4xl font-black text-white">
              {donor.blood_group}
            </span>
          </div>
        </div>

        {/* Card Footer with QR Code & Statistics */}
        <div className="pt-3 border-t border-white/25 flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-4 text-xs font-bold text-white/90">
              <div>
                <span className="text-[9px] uppercase tracking-wider text-white/70 block">Verified Donations</span>
                <span className="text-base font-black text-white">{donor.total_verified_donations} Times</span>
              </div>
              <div>
                <span className="text-[9px] uppercase tracking-wider text-white/70 block">Donor Score</span>
                <span className="text-base font-black text-amber-300">{donor.rating_avg.toFixed(1)}★</span>
              </div>
            </div>
            <div className="text-[9px] text-white/70 font-mono">
              Scan QR code on mobile for real-time validation
            </div>
          </div>

          {qrCodeDataUrl && (
            <div className="p-1 rounded-xl bg-white shadow-lg flex-shrink-0">
              <Image src={qrCodeDataUrl} alt="Verification QR Code" width={64} height={64} />
            </div>
          )}
        </div>
      </div>

      {/* Safety Notice */}
      <div className="p-4 rounded-2xl bg-muted/60 border border-border text-xs text-muted-foreground text-center space-y-1">
        <strong className="text-foreground block">
          {language === "bn" ? "ডিজিটাল আইডি যাচাইকরণ তথ্য" : "Official Verification Notice"}
        </strong>
        <p>
          {language === "bn"
            ? "যে কোনো হাসপাতাল বা ব্লাড ব্যাংক কর্মকর্তা কার্ডের কিউআর কোড স্ক্যান করে রক্তদাতার বৈধতা যাচাই করতে পারবেন।"
            : "Hospital authorities and blood bank personnel can instantly verify donor authenticity by scanning this QR code."}
        </p>
      </div>
    </div>
  );
}


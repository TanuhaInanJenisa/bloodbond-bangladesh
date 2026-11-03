"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import QRCode from "qrcode";
import { useLanguage } from "@/context/LanguageContext";
import { DonorProfile, DonationRecord } from "@/types/database";
import { BloodBondRepository } from "@/lib/data/repository";
import {
  ShieldCheck,
  Star,
  Award,
  Calendar,
  MapPin,
  Heart,
  Share2,
  Phone,
  Printer,
  Download,
  AlertCircle,
  Clock,
  ArrowLeft,
  CheckCircle2,
} from "lucide-react";

export default function DonorDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { language } = useLanguage();
  const id = params?.id as string;

  const [donor, setDonor] = useState<DonorProfile | null>(null);
  const [donations, setDonations] = useState<DonationRecord[]>([]);
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>("");
  const [showPhone, setShowPhone] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!id) return;
    const found = BloodBondRepository.getDonorById(id);
    if (found) {
      setDonor(found);
      const records = BloodBondRepository.getDonationRecords(found.id);
      setDonations(records);

      // Generate QR Code containing public verification URL
      if (typeof window !== "undefined") {
        const verifyUrl = `${window.location.origin}/donors/${found.id}`;
        QRCode.toDataURL(verifyUrl, {
          width: 180,
          margin: 1,
          color: {
            dark: "#C62828",
            light: "#FFFFFF",
          },
        }).then((url) => setQrCodeDataUrl(url));
      }
    }
  }, [id]);

  if (!donor) {
    return (
      <div className="container mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-xl font-bold text-foreground">
          {language === "bn" ? "রক্তদাতার তথ্য পাওয়া যায়নি" : "Donor Profile Not Found"}
        </h2>
        <Link
          href="/donors"
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white text-xs font-bold rounded-xl"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{language === "bn" ? "রক্তদাতাদের তালিকায় ফিরে যান" : "Back to Donors"}</span>
        </Link>
      </div>
    );
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${donor.profile.full_name} - Verified Blood Donor`,
        text: `BloodBond Bangladesh Verified Donor Profile: ${donor.blood_group}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const badges = [
    { threshold: 1, title: language === "bn" ? "প্রথম রক্তদান" : "First Hero", icon: Award },
    { threshold: 5, title: language === "bn" ? "৫ম রক্তদান ব্রোঞ্জ" : "Bronze Champion (5+)", icon: Award },
    { threshold: 10, title: language === "bn" ? "১০ম রক্তদান সিলভার" : "Silver Champion (10+)", icon: Award },
    { threshold: 20, title: language === "bn" ? "২০তম রক্তদান গোল্ড" : "Gold Legend (20+)", icon: Award },
  ];

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 max-w-5xl">
      {/* Top Navigation */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{language === "bn" ? "পিছনে যান" : "Back"}</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-card border border-border text-xs font-semibold text-foreground hover:bg-muted"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{copied ? (language === "bn" ? "কপি হয়েছে!" : "Copied!") : language === "bn" ? "শেয়ার" : "Share"}</span>
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-card border border-border text-xs font-semibold text-foreground hover:bg-muted"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>{language === "bn" ? "প্রিন্ট" : "Print"}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Digital Donor Card */}
        <div className="lg:col-span-5 space-y-6">
          {/* DIGITAL DONOR ID CARD DESIGN */}
          <div className="rounded-3xl p-6 bg-gradient-to-br from-[#8E0000] via-[#C62828] to-[#B71C1C] text-white shadow-2xl relative overflow-hidden border border-white/20">
            {/* Card Watermark */}
            <div className="absolute -right-8 -bottom-8 w-40 h-40 rounded-full bg-white/10 pointer-events-none" />

            {/* Card Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/20">
              <div className="flex items-center gap-2">
                <div className="relative w-7 h-7">
                  <Image src="/images/bloodbond-logo.png" alt="Logo" fill className="object-contain" />
                </div>
                <span className="font-black text-sm tracking-wide">
                  BloodBond <span className="text-white/80 font-normal">ID</span>
                </span>
              </div>
              <span className="text-[10px] uppercase tracking-wider font-extrabold bg-white/20 px-2.5 py-0.5 rounded-full border border-white/30">
                Official Donor
              </span>
            </div>

            {/* Card Body */}
            <div className="my-5 flex items-center gap-4">
              <div className="relative w-20 h-20 rounded-2xl overflow-hidden border-2 border-white/60 shadow-lg flex-shrink-0">
                <Image
                  src={donor.profile.avatar_url || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"}
                  alt={donor.profile.full_name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="min-w-0">
                <h3 className="font-black text-lg leading-tight truncate">
                  {donor.profile.full_name}
                </h3>
                <div className="text-xs text-white/80 font-mono tracking-wider mt-0.5">
                  {donor.donor_code}
                </div>
                <div className="text-xs text-white/90 flex items-center gap-1 mt-1">
                  <MapPin className="w-3 h-3 text-white/80" />
                  <span>{donor.upazila_name}, {donor.district_name}</span>
                </div>
              </div>
            </div>

            {/* Blood Group & Stats inside Card */}
            <div className="grid grid-cols-3 gap-2 py-3 px-4 rounded-2xl bg-black/20 border border-white/15 text-center mb-4">
              <div>
                <span className="text-[9px] uppercase tracking-wider text-white/70 block">Group</span>
                <span className="text-xl font-black text-white">{donor.blood_group}</span>
              </div>
              <div>
                <span className="text-[9px] uppercase tracking-wider text-white/70 block">Donations</span>
                <span className="text-xl font-black text-white">{donor.total_verified_donations}</span>
              </div>
              <div>
                <span className="text-[9px] uppercase tracking-wider text-white/70 block">Status</span>
                <span className="text-xs font-black text-emerald-300 block mt-1">
                  {donor.is_available ? "Ready" : "Cooldown"}
                </span>
              </div>
            </div>

            {/* QR Code Verification Footer */}
            <div className="pt-3 border-t border-white/20 flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="text-[10px] text-white/70">Scan QR to verify authenticity</div>
                <div className="text-xs font-bold text-white flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
                  <span>Government-Compliant Voluntary ID</span>
                </div>
              </div>
              {qrCodeDataUrl && (
                <div className="p-1 rounded-xl bg-white shadow-md">
                  <Image src={qrCodeDataUrl} alt="QR Code" width={56} height={56} />
                </div>
              )}
            </div>
          </div>

          {/* Quick Contact Box */}
          <div className="p-5 rounded-2xl bg-card border border-border shadow-sm space-y-3">
            <h4 className="font-bold text-sm text-foreground">
              {language === "bn" ? "রক্তদাতার সাথে যোগাযোগ" : "Contact This Donor"}
            </h4>

            {!showPhone ? (
              <button
                onClick={() => setShowPhone(true)}
                className="w-full py-3 px-4 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 shadow-md shadow-primary/20 transition-all"
              >
                <Phone className="w-4 h-4" />
                <span>{language === "bn" ? "ফোন নম্বর দেখুন" : "Reveal Emergency Phone"}</span>
              </button>
            ) : (
              <div className="space-y-2">
                <div className="p-3 rounded-xl bg-muted border border-border text-center">
                  <div className="text-lg font-black text-primary tracking-wide">
                    {donor.profile.phone}
                  </div>
                  <span className="text-[10px] text-muted-foreground">
                    {language === "bn" ? "জরুরি রক্তের প্রয়োজনে যোগাযোগ করুন" : "Use only for genuine emergencies"}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <a
                    href={`tel:${donor.profile.phone}`}
                    className="py-2.5 px-3 bg-primary text-white text-xs font-bold rounded-xl text-center shadow-sm"
                  >
                    Call Now
                  </a>
                  <a
                    href={`sms:${donor.profile.phone}`}
                    className="py-2.5 px-3 bg-secondary text-foreground text-xs font-bold rounded-xl text-center border border-border"
                  >
                    SMS
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Details, History & Achievements */}
        <div className="lg:col-span-7 space-y-6">
          {/* Bio & Details */}
          <div className="p-6 rounded-2xl bg-card border border-border shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-black text-foreground">
                  {donor.profile.full_name}
                </h2>
                <div className="text-xs text-muted-foreground flex items-center gap-2 mt-1">
                  <span>{donor.profile.occupation || "Voluntary Donor"}</span>
                  <span>•</span>
                  <span>Member since {new Date(donor.profile.created_at).getFullYear()}</span>
                </div>
              </div>

              <div className="flex items-center gap-1 bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 px-3 py-1.5 rounded-xl font-bold text-sm">
                <Star className="w-4 h-4 fill-current text-amber-500" />
                <span>{donor.rating_avg.toFixed(1)}</span>
              </div>
            </div>

            {donor.profile.bio && (
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed italic bg-muted/40 p-3 rounded-xl border border-border/60">
                &ldquo;{donor.profile.bio}&rdquo;
              </p>
            )}

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-muted/40 border border-border/60">
                <span className="text-[10px] font-bold uppercase text-muted-foreground block">
                  {language === "bn" ? "লিঙ্গ" : "Gender"}
                </span>
                <span className="text-xs font-bold text-foreground capitalize">
                  {donor.profile.gender}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-muted/40 border border-border/60">
                <span className="text-[10px] font-bold uppercase text-muted-foreground block">
                  {language === "bn" ? "রক্তের গ্রুপ" : "Blood Group"}
                </span>
                <span className="text-xs font-bold text-primary">
                  {donor.blood_group}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-muted/40 border border-border/60">
                <span className="text-[10px] font-bold uppercase text-muted-foreground block">
                  {language === "bn" ? "পরবর্তী রক্তদান" : "Next Eligibility"}
                </span>
                <span className="text-xs font-bold text-foreground">
                  {donor.next_eligible_date || "Eligible Now"}
                </span>
              </div>
            </div>
          </div>

          {/* Achievement Badges */}
          <div className="p-6 rounded-2xl bg-card border border-border shadow-sm space-y-4">
            <h3 className="font-bold text-base text-foreground flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-500" />
              <span>{language === "bn" ? "অর্জিত ব্যাজ ও সম্মাননা" : "Honors & Achievement Badges"}</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {badges.map((b, i) => {
                const unlocked = donor.total_verified_donations >= b.threshold;
                return (
                  <div
                    key={i}
                    className={`p-3 rounded-2xl border text-center transition-all ${
                      unlocked
                        ? "bg-amber-50 dark:bg-amber-950/20 border-amber-300 dark:border-amber-800 text-foreground"
                        : "bg-muted/30 border-border/60 text-muted-foreground opacity-50"
                    }`}
                  >
                    <div
                      className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center mb-2 ${
                        unlocked ? "bg-amber-100 dark:bg-amber-900/40 text-amber-600" : "bg-muted text-muted-foreground"
                      }`}
                    >
                      <Award className="w-5 h-5" />
                    </div>
                    <div className="text-xs font-bold leading-tight">{b.title}</div>
                    <div className="text-[10px] text-muted-foreground mt-0.5">
                      {unlocked ? "Unlocked" : `Need ${b.threshold}`}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Verified Donation History */}
          <div className="p-6 rounded-2xl bg-card border border-border shadow-sm space-y-4">
            <h3 className="font-bold text-base text-foreground flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              <span>{language === "bn" ? "যাচাইকৃত রক্তদানের ইতিহাস" : "Verified Donation History"}</span>
            </h3>

            {donations.length === 0 ? (
              <p className="text-xs text-muted-foreground italic">
                {language === "bn"
                  ? "এখনও কোনো আনুষ্ঠানিক রক্তদানের প্রমাণ নথিভুক্ত হয়নি।"
                  : "No officially verified hospital slips logged yet."}
              </p>
            ) : (
              <div className="space-y-3">
                {donations.map((rec) => (
                  <div
                    key={rec.id}
                    className="p-3.5 rounded-xl bg-muted/40 border border-border/80 flex items-start justify-between gap-3"
                  >
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-foreground">
                        {rec.hospital_name}
                      </h4>
                      <div className="text-xs text-muted-foreground mt-0.5">
                        {rec.donation_date} • {rec.donation_type.replace("_", " ")}
                      </div>
                      {rec.notes && (
                        <p className="text-[11px] text-muted-foreground mt-1">
                          {rec.notes}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-1 text-[11px] font-bold text-bdgreen-600 bg-bdgreen-100 dark:bg-bdgreen-950/40 px-2 py-1 rounded-lg">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Verified</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


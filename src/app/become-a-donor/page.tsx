"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import confetti from "canvas-confetti";
import { useLanguage } from "@/context/LanguageContext";
import { BloodBondRepository } from "@/lib/data/repository";
import { BANGLADESH_DIVISIONS, getDistricts, getUpazilas } from "@/lib/data/bangladeshGeo";
import { BloodGroup } from "@/types/database";
import {
  User,
  Heart,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Lock,
  ArrowRight,
  ArrowLeft,
  Calendar,
  MapPin,
  Sparkles,
} from "lucide-react";

export default function BecomeDonorPage() {
  const router = useRouter();
  const { language, t } = useLanguage();

  const [step, setStep] = useState(1);

  // Step 1: Personal info
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState<"male" | "female" | "other">("male");
  const [occupation, setOccupation] = useState("");
  const [ageError, setAgeError] = useState("");

  // Step 2: Blood Group & Location
  const [bloodGroup, setBloodGroup] = useState<BloodGroup>("O+");
  const [divisionId, setDivisionId] = useState("dhaka");
  const [districtId, setDistrictId] = useState("dhaka_dist");
  const [upazilaId, setUpazilaId] = useState("dhanmondi");
  const [presentAddress, setPresentAddress] = useState("");
  const [lastDonationDate, setLastDonationDate] = useState("");

  // Step 3: Medical screening
  const [weightOk, setWeightOk] = useState(false);
  const [healthOk, setHealthOk] = useState(false);
  const [infectionFree, setInfectionFree] = useState(false);
  const [intervalOk, setIntervalOk] = useState(false);

  // Step 4: Contact & Consent
  const [emergencyContact, setEmergencyContact] = useState("");
  const [preferredContact, setPreferredContact] = useState<"call" | "sms" | "whatsapp">("call");
  const [bio, setBio] = useState("");
  const [password, setPassword] = useState("");
  const [consentAccepted, setConsentAccepted] = useState(false);

  const [createdDonor, setCreatedDonor] = useState<any>(null);

  const districts = getDistricts(divisionId);
  const upazilas = getUpazilas(districtId);
  const bloodGroups: BloodGroup[] = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  // Age calculation helper
  const validateAge = (dobString: string): boolean => {
    if (!dobString) return false;
    const dob = new Date(dobString);
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const m = today.getMonth() - dob.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
      age--;
    }
    if (age < 18) {
      setAgeError(
        language === "bn"
          ? "রক্তদানের জন্য আপনার বয়স ন্যূনতম ১৮ বছর হতে হবে।"
          : "Medical screening requires donors to be at least 18 years old."
      );
      return false;
    }
    if (age > 65) {
      setAgeError(
        language === "bn"
          ? "রক্তদানের সর্বোচ্চ বয়সসীমা ৬৫ বছর।"
          : "Upper voluntary donation limit is 65 years."
      );
      return false;
    }
    setAgeError("");
    return true;
  };

  const handleNextStep1 = () => {
    if (!fullName || !phone || !dateOfBirth) {
      alert("Please fill in all mandatory fields.");
      return;
    }
    if (!validateAge(dateOfBirth)) {
      return;
    }
    setStep(2);
  };

  const handleNextStep2 = () => {
    if (!presentAddress) {
      alert("Please provide your present address or area.");
      return;
    }
    setStep(3);
  };

  const handleNextStep3 = () => {
    if (!weightOk || !healthOk || !infectionFree || !intervalOk) {
      alert(
        language === "bn"
          ? "নিরাপদ রক্তদানের জন্য সকল স্বাস্থ্য বিষয়ক শর্ত পূরণ আবশ্যক।"
          : "Please confirm all medical self-declaration criteria."
      );
      return;
    }
    setStep(4);
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consentAccepted || !password) {
      alert("Please enter a secure password and accept donor consent.");
      return;
    }

    const divObj = BANGLADESH_DIVISIONS.find((d) => d.id === divisionId);
    const distObj = districts.find((d) => d.id === districtId);
    const upaObj = upazilas.find((u) => u.id === upazilaId);

    // Calculate next eligible date if last donation was recent
    let nextEligible = "";
    if (lastDonationDate) {
      const d = new Date(lastDonationDate);
      d.setDate(d.getDate() + 90);
      nextEligible = d.toISOString().split("T")[0];
    }

    const newDonor = BloodBondRepository.registerDonor({
      blood_group: bloodGroup,
      division_id: divisionId,
      district_id: districtId,
      upazila_id: upazilaId,
      division_name: divObj ? divObj.name : "Dhaka",
      district_name: distObj ? distObj.name : "Dhaka",
      upazila_name: upaObj ? upaObj.name : "Dhanmondi",
      present_address: presentAddress,
      last_donation_date: lastDonationDate || undefined,
      next_eligible_date: nextEligible || undefined,
      emergency_contact: emergencyContact,
      preferred_contact_method: preferredContact,
      profile: {
        full_name: fullName,
        phone: phone,
        email: email || `${phone.replace(/\D/g, "")}@bloodbond.bd`,
        date_of_birth: dateOfBirth,
        gender: gender,
        occupation: occupation,
        bio: bio,
      },
    });

    setCreatedDonor(newDonor);
    setStep(5);

    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch {}
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 max-w-3xl">
      <div className="p-6 sm:p-10 rounded-3xl bg-card border border-border shadow-xl">
        {/* Header */}
        <div className="text-center space-y-2 mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blood-100 dark:bg-blood-900/30 text-primary text-xs font-bold">
            <Heart className="w-3.5 h-3.5 text-primary fill-current" />
            <span>{language === "bn" ? "রক্তদাতা নিবন্ধন পোর্টাল" : "Donor Registration"}</span>
          </div>
          <h1 className="text-3xl font-black text-foreground">
            {language === "bn" ? "জীবন রক্ষক হিসেবে যোগ দিন" : "Become a Verified Blood Hero"}
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            {language === "bn"
              ? "৪টি সহজ ধাপে নিবন্ধন সম্পন্ন করে আপনার ডিজিটাল ডোনার আইডি কার্ড বুঝে নিন।"
              : "Complete the 4-step registration to receive your official digital donor card."}
          </p>
        </div>

        {/* Step Progress Indicator */}
        {step <= 4 && (
          <div className="grid grid-cols-4 gap-2 mb-8">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className="space-y-1.5">
                <div
                  className={`h-2 rounded-full transition-all ${
                    s <= step ? "bg-primary" : "bg-muted"
                  }`}
                />
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block text-center">
                  {s === 1
                    ? "Personal"
                    : s === 2
                    ? "Blood & Area"
                    : s === 3
                    ? "Medical"
                    : "Security"}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* STEP 1: PERSONAL INFO */}
        {step === 1 && (
          <div className="space-y-5">
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
              <User className="w-5 h-5 text-primary" />
              <span>{language === "bn" ? "ব্যক্তিগত তথ্য ও বয়স যাচাই" : "Personal Information"}</span>
            </h2>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase text-muted-foreground">
                {language === "bn" ? "পুরো নাম *" : "Full Name *"}
              </label>
              <input
                type="text"
                placeholder="e.g. Tanvir Ahmed"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-4 py-2.5 bg-muted/50 border border-border rounded-xl text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase text-muted-foreground">
                  {language === "bn" ? "মোবাইল নম্বর *" : "Phone Number *"}
                </label>
                <input
                  type="tel"
                  placeholder="+88017XXXXXXXX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-2.5 bg-muted/50 border border-border rounded-xl text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase text-muted-foreground">
                  {language === "bn" ? "ইমেইল ঠিকানা" : "Email Address"}
                </label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 bg-muted/50 border border-border rounded-xl text-sm text-foreground focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase text-muted-foreground">
                  {language === "bn" ? "জন্ম তারিখ (১৮+ আবশ্যক) *" : "Date of Birth (18+ Required) *"}
                </label>
                <input
                  type="date"
                  value={dateOfBirth}
                  onChange={(e) => {
                    setDateOfBirth(e.target.value);
                    validateAge(e.target.value);
                  }}
                  className="w-full px-4 py-2.5 bg-muted/50 border border-border rounded-xl text-sm text-foreground focus:outline-none"
                  required
                />
                {ageError && (
                  <p className="text-xs text-rose-600 font-bold mt-1 flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    {ageError}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase text-muted-foreground">
                  {language === "bn" ? "লিঙ্গ *" : "Gender *"}
                </label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value as any)}
                  className="w-full px-4 py-2.5 bg-muted/50 border border-border rounded-xl text-sm font-semibold text-foreground focus:outline-none"
                >
                  <option value="male">{language === "bn" ? "পুরুষ" : "Male"}</option>
                  <option value="female">{language === "bn" ? "মহিলা" : "Female"}</option>
                  <option value="other">{language === "bn" ? "অন্যান্য" : "Other"}</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase text-muted-foreground">
                {language === "bn" ? "পেশা" : "Occupation"}
              </label>
              <input
                type="text"
                placeholder="e.g. Student, Software Engineer, Teacher..."
                value={occupation}
                onChange={(e) => setOccupation(e.target.value)}
                className="w-full px-4 py-2.5 bg-muted/50 border border-border rounded-xl text-sm text-foreground focus:outline-none"
              />
            </div>

            <button
              onClick={handleNextStep1}
              className="w-full py-3.5 bg-primary hover:bg-primary-hover text-white text-sm font-bold rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-primary/25 transition-all"
            >
              <span>{language === "bn" ? "পরবর্তী ধাপ: রক্তের গ্রুপ ও ঠিকানা" : "Continue to Blood & Location"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* STEP 2: BLOOD GROUP & LOCATION */}
        {step === 2 && (
          <div className="space-y-5">
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              <span>{language === "bn" ? "রক্তের গ্রুপ ও বিভাগীয় ঠিকানা" : "Blood Group & Location"}</span>
            </h2>

            {/* Blood Group Selection Grid */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-muted-foreground block">
                {t("bloodGroup")} *
              </label>
              <div className="grid grid-cols-4 gap-2.5">
                {bloodGroups.map((bg) => (
                  <button
                    key={bg}
                    type="button"
                    onClick={() => setBloodGroup(bg)}
                    className={`py-3 rounded-2xl font-black text-base border transition-all ${
                      bloodGroup === bg
                        ? "bg-primary text-white border-primary shadow-lg shadow-primary/30 scale-105"
                        : "bg-muted/40 text-foreground border-border hover:border-primary/40"
                    }`}
                  >
                    {bg}
                  </button>
                ))}
              </div>
            </div>

            {/* Division, District, Upazila */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-[10px] font-bold uppercase text-muted-foreground block mb-1">
                  {t("division")} *
                </label>
                <select
                  value={divisionId}
                  onChange={(e) => {
                    setDivisionId(e.target.value);
                    const newDists = getDistricts(e.target.value);
                    if (newDists[0]) {
                      setDistrictId(newDists[0].id);
                      const newUpas = getUpazilas(newDists[0].id);
                      if (newUpas[0]) setUpazilaId(newUpas[0].id);
                    }
                  }}
                  className="w-full py-2.5 px-3 bg-muted/60 border border-border rounded-xl text-xs font-semibold text-foreground focus:outline-none"
                >
                  {BANGLADESH_DIVISIONS.map((div) => (
                    <option key={div.id} value={div.id}>
                      {language === "bn" ? div.bnName : div.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase text-muted-foreground block mb-1">
                  {t("district")} *
                </label>
                <select
                  value={districtId}
                  onChange={(e) => {
                    setDistrictId(e.target.value);
                    const newUpas = getUpazilas(e.target.value);
                    if (newUpas[0]) setUpazilaId(newUpas[0].id);
                  }}
                  className="w-full py-2.5 px-3 bg-muted/60 border border-border rounded-xl text-xs font-semibold text-foreground focus:outline-none"
                >
                  {districts.map((d) => (
                    <option key={d.id} value={d.id}>
                      {language === "bn" ? d.bnName : d.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase text-muted-foreground block mb-1">
                  {t("thana")} *
                </label>
                <select
                  value={upazilaId}
                  onChange={(e) => setUpazilaId(e.target.value)}
                  className="w-full py-2.5 px-3 bg-muted/60 border border-border rounded-xl text-xs font-semibold text-foreground focus:outline-none"
                >
                  {upazilas.map((u) => (
                    <option key={u.id} value={u.id}>
                      {language === "bn" ? u.bnName : u.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase text-muted-foreground">
                {language === "bn" ? "বর্তমান ঠিকানা / এলাকা *" : "Present Address / Area *"}
              </label>
              <input
                type="text"
                placeholder={language === "bn" ? "যেমন: রোড ৭, ধানমন্ডি, ঢাকা" : "e.g. Road 7, Dhanmondi, Dhaka"}
                value={presentAddress}
                onChange={(e) => setPresentAddress(e.target.value)}
                className="w-full px-4 py-2.5 bg-muted/50 border border-border rounded-xl text-sm text-foreground focus:outline-none"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase text-muted-foreground">
                {language === "bn" ? "সর্বশেষ রক্তদানের তারিখ (যদি প্রযোজ্য হয়)" : "Last Donation Date (If any)"}
              </label>
              <input
                type="date"
                value={lastDonationDate}
                onChange={(e) => setLastDonationDate(e.target.value)}
                className="w-full px-4 py-2.5 bg-muted/50 border border-border rounded-xl text-sm text-foreground focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-5 py-3 bg-secondary text-foreground text-xs font-bold rounded-2xl border border-border"
              >
                {language === "bn" ? "পিছনে" : "Back"}
              </button>
              <button
                type="button"
                onClick={handleNextStep2}
                className="flex-1 py-3.5 bg-primary hover:bg-primary-hover text-white text-sm font-bold rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-primary/25"
              >
                <span>{language === "bn" ? "পরবর্তী ধাপ: স্বাস্থ্য যোগ্যতা" : "Continue to Medical Screening"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: MEDICAL SCREENING */}
        {step === 3 && (
          <div className="space-y-5">
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-bdgreen-600" />
              <span>{language === "bn" ? "স্বাস্থ্য যোগ্যতা স্ব-ঘোষণা" : "Medical Eligibility Declaration"}</span>
            </h2>

            <div className="p-4 rounded-2xl bg-blood-50/70 dark:bg-blood-950/20 border border-blood-200 dark:border-blood-800 text-xs text-muted-foreground leading-relaxed">
              {language === "bn"
                ? "দাতা এবং গ্রহীতা উভয়ের সুরক্ষার স্বার্থে রক্তদান নীতিমালার শর্তাবলী মেনে চলা অত্যন্ত জরুরি। অনুগ্রহ করে প্রতিটি শর্ত পড়ে টিক দিন।"
                : "For the safety of both donors and recipients, clinical screening requires confirmation of the following standards."}
            </div>

            <div className="space-y-3">
              <label className="flex items-start gap-3 p-3.5 rounded-2xl bg-card border border-border cursor-pointer hover:border-primary/40 transition-colors">
                <input
                  type="checkbox"
                  checked={weightOk}
                  onChange={(e) => setWeightOk(e.target.checked)}
                  className="mt-0.5 rounded text-primary focus:ring-primary w-4 h-4"
                />
                <div className="text-xs">
                  <strong className="text-foreground block">
                    {language === "bn" ? "ওজন ন্যূনতম ৫০ কেজি" : "Weight Minimum 50 kg"}
                  </strong>
                  <span className="text-muted-foreground">
                    {language === "bn" ? "আমার শরীরের ওজন কমপক্ষে ৫০ কেজি বা তার বেশি।" : "My current body weight is at least 50 kg."}
                  </span>
                </div>
              </label>

              <label className="flex items-start gap-3 p-3.5 rounded-2xl bg-card border border-border cursor-pointer hover:border-primary/40 transition-colors">
                <input
                  type="checkbox"
                  checked={healthOk}
                  onChange={(e) => setHealthOk(e.target.checked)}
                  className="mt-0.5 rounded text-primary focus:ring-primary w-4 h-4"
                />
                <div className="text-xs">
                  <strong className="text-foreground block">
                    {language === "bn" ? "শারীরিক সুস্থতা" : "General Good Health"}
                  </strong>
                  <span className="text-muted-foreground">
                    {language === "bn"
                      ? "আমি কোনো প্রকার গুরুতর দীর্ঘমেয়াদী হৃদরোগ, ডায়াবেটিস ইনসুলিন বা রক্তচাপ জটিলতায় আক্রান্ত নই।"
                      : "I do not suffer from uncontrolled hypertension, heart conditions or active illnesses."}
                  </span>
                </div>
              </label>

              <label className="flex items-start gap-3 p-3.5 rounded-2xl bg-card border border-border cursor-pointer hover:border-primary/40 transition-colors">
                <input
                  type="checkbox"
                  checked={infectionFree}
                  onChange={(e) => setInfectionFree(e.target.checked)}
                  className="mt-0.5 rounded text-primary focus:ring-primary w-4 h-4"
                />
                <div className="text-xs">
                  <strong className="text-foreground block">
                    {language === "bn" ? "সংক্রমণ মুক্ত" : "Infection Screening"}
                  </strong>
                  <span className="text-muted-foreground">
                    {language === "bn"
                      ? "আমি হেপাটাইটিস বি/সি, এইচআইভি বা ম্যালেরিয়া জাতীয় রক্তবাহিত রোগমুক্ত।"
                      : "I am free from blood-borne viral infections (Hepatitis B/C, HIV, Malaria)."}
                  </span>
                </div>
              </label>

              <label className="flex items-start gap-3 p-3.5 rounded-2xl bg-card border border-border cursor-pointer hover:border-primary/40 transition-colors">
                <input
                  type="checkbox"
                  checked={intervalOk}
                  onChange={(e) => setIntervalOk(e.target.checked)}
                  className="mt-0.5 rounded text-primary focus:ring-primary w-4 h-4"
                />
                <div className="text-xs">
                  <strong className="text-foreground block">
                    {language === "bn" ? "৯০ দিনের বিরতি নীতি" : "90-Day Cooldown Compliance"}
                  </strong>
                  <span className="text-muted-foreground">
                    {language === "bn"
                      ? "আমার পূর্ববর্তী রক্তদানের পর কমপক্ষে ৯০ দিন (৩ মাস) অতিক্রান্ত হয়েছে অথবা এটি আমার প্রথম রক্তদান।"
                      : "At least 90 days have elapsed since my last whole blood donation (or this is my first donation)."}
                  </span>
                </div>
              </label>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-5 py-3 bg-secondary text-foreground text-xs font-bold rounded-2xl border border-border"
              >
                {language === "bn" ? "পিছনে" : "Back"}
              </button>
              <button
                type="button"
                onClick={handleNextStep3}
                className="flex-1 py-3.5 bg-primary hover:bg-primary-hover text-white text-sm font-bold rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-primary/25"
              >
                <span>{language === "bn" ? "পরবর্তী ধাপ: পাসওয়ার্ড ও সম্মতি" : "Continue to Security & Consent"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: SECURITY & CONSENT */}
        {step === 4 && (
          <form onSubmit={handleFinalSubmit} className="space-y-5">
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
              <Lock className="w-5 h-5 text-primary" />
              <span>{language === "bn" ? "অ্যাকাউন্ট নিরাপত্তা ও সম্মতি" : "Security & Consent"}</span>
            </h2>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase text-muted-foreground">
                {language === "bn" ? "পাসওয়ার্ড তৈরি করুন *" : "Create Secure Password *"}
              </label>
              <input
                type="password"
                placeholder="Minimum 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 bg-muted/50 border border-border rounded-xl text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase text-muted-foreground">
                  {language === "bn" ? "জরুরি বিকল্প নম্বর" : "Emergency Alternate Contact"}
                </label>
                <input
                  type="tel"
                  placeholder="+8801XXXXXXXXX"
                  value={emergencyContact}
                  onChange={(e) => setEmergencyContact(e.target.value)}
                  className="w-full px-4 py-2.5 bg-muted/50 border border-border rounded-xl text-sm text-foreground focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase text-muted-foreground">
                  {language === "bn" ? "পছন্দের যোগাযোগ মাধ্যম" : "Preferred Contact Method"}
                </label>
                <select
                  value={preferredContact}
                  onChange={(e) => setPreferredContact(e.target.value as any)}
                  className="w-full px-4 py-2.5 bg-muted/50 border border-border rounded-xl text-sm font-semibold text-foreground focus:outline-none"
                >
                  <option value="call">Phone Call (সরাসরি কল)</option>
                  <option value="whatsapp">WhatsApp</option>
                  <option value="sms">SMS</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase text-muted-foreground">
                {language === "bn" ? "সংক্ষিপ্ত পরিচিতি বা বার্তা" : "Short Bio / Note"}
              </label>
              <textarea
                rows={2}
                placeholder={language === "bn" ? "জরুরি রোগীদের রক্তদানে আমার ইচ্ছা..." : "Available in emergency..."}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full px-4 py-2.5 bg-muted/50 border border-border rounded-xl text-sm text-foreground focus:outline-none"
              />
            </div>

            <label className="flex items-start gap-3 p-4 rounded-2xl bg-muted/50 border border-border cursor-pointer">
              <input
                type="checkbox"
                checked={consentAccepted}
                onChange={(e) => setConsentAccepted(e.target.checked)}
                className="mt-0.5 rounded text-primary focus:ring-primary w-4 h-4"
                required
              />
              <span className="text-xs text-muted-foreground leading-relaxed">
                {language === "bn"
                  ? "আমি নিশ্চিত করছি যে প্রদত্ত সকল তথ্য সত্য ও নির্ভুল। আমি স্বেচ্ছায় রক্তদানে এবং BloodBond Bangladesh-এর প্ল্যাটফর্ম নীতিমালার সাথে একমত পোষণ করছি।"
                  : "I confirm that all provided details are accurate. I voluntarily consent to become a blood donor and agree to BloodBond Bangladesh platform terms."}
              </span>
            </label>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setStep(3)}
                className="px-5 py-3 bg-secondary text-foreground text-xs font-bold rounded-2xl border border-border"
              >
                {language === "bn" ? "পিছনে" : "Back"}
              </button>
              <button
                type="submit"
                className="flex-1 py-4 bg-primary hover:bg-primary-hover text-white text-base font-extrabold rounded-2xl flex items-center justify-center gap-2 shadow-xl shadow-primary/30 transition-all hover:scale-[1.01]"
              >
                <Sparkles className="w-5 h-5" />
                <span>{language === "bn" ? "নিবন্ধন সম্পন্ন করুন ও কার্ড পান" : "Complete & Generate ID Card"}</span>
              </button>
            </div>
          </form>
        )}

        {/* STEP 5: REGISTRATION SUCCESS */}
        {step === 5 && createdDonor && (
          <div className="text-center space-y-6 py-6">
            <div className="w-20 h-20 rounded-full bg-bdgreen-100 text-bdgreen-600 flex items-center justify-center mx-auto shadow-lg shadow-bdgreen-600/20">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-black text-foreground">
                {language === "bn" ? "অভিনন্দন! নিবন্ধন সফল হয়েছে" : "Congratulations! Welcome Hero"}
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground max-w-md mx-auto">
                {language === "bn"
                  ? "আপনার ডিজিটাল রক্তদাতা মেম্বারশিপ প্রস্তুত করা হয়েছে।"
                  : "Your official Digital Donor Membership Card has been generated."}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-muted/60 border border-border inline-block">
              <span className="text-xs font-bold uppercase text-muted-foreground block mb-1">
                Your Official Donor ID
              </span>
              <span className="text-2xl font-black text-primary font-mono tracking-wider">
                {createdDonor.donor_code}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Link
                href="/dashboard/id-card"
                className="w-full sm:w-auto px-6 py-3.5 bg-primary hover:bg-primary-hover text-white text-xs sm:text-sm font-bold rounded-2xl shadow-xl shadow-primary/25 transition-all"
              >
                {language === "bn" ? "ডিজিটাল আইডি কার্ড দেখুন" : "View Digital Donor Card"}
              </Link>
              <Link
                href="/dashboard"
                className="w-full sm:w-auto px-6 py-3.5 bg-secondary hover:bg-muted text-foreground text-xs sm:text-sm font-bold rounded-2xl border border-border transition-colors"
              >
                {language === "bn" ? "ড্যাশবোর্ডে প্রবেশ করুন" : "Go to Donor Dashboard"}
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


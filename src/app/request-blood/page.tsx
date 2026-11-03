"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { BloodBondRepository } from "@/lib/data/repository";
import { BANGLADESH_DIVISIONS, getDistricts, getUpazilas } from "@/lib/data/bangladeshGeo";
import { BloodGroup, RequestPriority } from "@/types/database";
import {
  PlusCircle,
  Building,
  MapPin,
  Calendar,
  Clock,
  Phone,
  User,
  FileText,
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
} from "lucide-react";

export default function RequestBloodPage() {
  const router = useRouter();
  const { language, t } = useLanguage();

  const [patientName, setPatientName] = useState("");
  const [bloodGroup, setBloodGroup] = useState<BloodGroup>("O+");
  const [bagsRequired, setBagsRequired] = useState(1);
  const [hospitalName, setHospitalName] = useState("");
  const [hospitalAddress, setHospitalAddress] = useState("");
  const [divisionId, setDivisionId] = useState("dhaka");
  const [districtId, setDistrictId] = useState("dhaka_dist");
  const [upazilaId, setUpazilaId] = useState("dhanmondi");
  const [requiredDate, setRequiredDate] = useState("");
  const [requiredTime, setRequiredTime] = useState("10:00 AM");
  const [primaryPhone, setPrimaryPhone] = useState("");
  const [alternatePhone, setAlternatePhone] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [medicalReason, setMedicalReason] = useState("");
  const [priority, setPriority] = useState<RequestPriority>("urgent");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const districts = getDistricts(divisionId);
  const upazilas = getUpazilas(districtId, divisionId);
  const bloodGroups: BloodGroup[] = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!primaryPhone || !hospitalName || !contactPerson) {
      alert("Please fill in all mandatory fields.");
      return;
    }

    setSubmitting(true);

    const divObj = BANGLADESH_DIVISIONS.find((d) => d.id === divisionId);
    const distObj = districts.find((d) => d.id === districtId);
    const upaObj = upazilas.find((u) => u.id === upazilaId);

    const expiresDate = new Date();
    expiresDate.setDate(expiresDate.getDate() + 3);

    BloodBondRepository.createRequest({
      patient_name: patientName || (language === "bn" ? "জরুরি রোগী" : "Emergency Patient"),
      blood_group: bloodGroup,
      bags_required: Number(bagsRequired),
      hospital_name: hospitalName,
      hospital_address: hospitalAddress,
      division_id: divisionId,
      district_id: districtId,
      upazila_id: upazilaId,
      division_name: divObj ? divObj.name : "Dhaka",
      district_name: distObj ? distObj.name : "Dhaka",
      upazila_name: upaObj ? upaObj.name : "Dhanmondi",
      required_date: requiredDate || new Date().toISOString().split("T")[0],
      required_time: requiredTime,
      primary_phone: primaryPhone,
      alternate_phone: alternatePhone,
      contact_person: contactPerson,
      medical_reason: medicalReason,
      priority: priority,
      expires_at: expiresDate.toISOString(),
    });

    setSubmitting(false);
    setSuccess(true);
    setTimeout(() => {
      router.push("/emergency-requests");
    }, 1800);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 max-w-3xl">
      <Link
        href="/emergency-requests"
        className="inline-flex items-center gap-1.5 text-xs font-bold text-muted-foreground hover:text-foreground mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>{language === "bn" ? "জরুরি রিকোয়েস্টে ফিরে যান" : "Back to Emergency Requests"}</span>
      </Link>

      <div className="p-6 sm:p-10 rounded-3xl bg-card border border-border shadow-xl">
        <div className="flex items-center gap-3 mb-6 pb-6 border-b border-border">
          <div className="p-3 rounded-2xl bg-rose-100 dark:bg-rose-900/40 text-primary">
            <PlusCircle className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-foreground">
              {language === "bn" ? "জরুরি রক্তের আবেদন করুন" : "Post Emergency Blood Request"}
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
              {language === "bn"
                ? "সঠিক তথ্য দিয়ে ফর্মটি পূরণ করুন যাতে নিকটস্থ রক্তদাতারা অবিলম্বে যোগাযোগ করতে পারেন।"
                : "Fill out the verified medical details so nearby donors can respond immediately."}
            </p>
          </div>
        </div>

        {success ? (
          <div className="p-8 text-center space-y-3 bg-bdgreen-50 dark:bg-bdgreen-950/20 border border-bdgreen-300 rounded-2xl">
            <CheckCircle2 className="w-12 h-12 text-bdgreen-600 mx-auto" />
            <h2 className="text-xl font-bold text-foreground">
              {language === "bn" ? "আবেদনটি সফলভাবে পোস্ট হয়েছে!" : "Request Posted Successfully!"}
            </h2>
            <p className="text-xs text-muted-foreground">
              {language === "bn"
                ? "নিকটস্থ রক্তদাতাদের সাথে যোগাযোগ স্থাপন করা হচ্ছে..."
                : "Connecting with nearby matching donors. Redirecting to live feed..."}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Patient & Blood Group */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2 space-y-1.5">
                <label className="text-xs font-bold uppercase text-muted-foreground">
                  {language === "bn" ? "রোগীর নাম (ঐচ্ছিক)" : "Patient Name"}
                </label>
                <input
                  type="text"
                  placeholder={language === "bn" ? "রোগীর পুরো নাম..." : "Patient Full Name"}
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  className="w-full px-4 py-2.5 bg-muted/50 border border-border rounded-xl text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase text-muted-foreground">
                  {t("bloodGroup")} *
                </label>
                <select
                  value={bloodGroup}
                  onChange={(e) => setBloodGroup(e.target.value as BloodGroup)}
                  className="w-full px-4 py-2.5 bg-muted/50 border border-border rounded-xl text-sm font-bold text-primary focus:outline-none"
                  required
                >
                  {bloodGroups.map((bg) => (
                    <option key={bg} value={bg}>
                      {bg}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Bags & Urgency */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase text-muted-foreground">
                  {language === "bn" ? "রক্তের ব্যাগের সংখ্যা *" : "Number of Bags *"}
                </label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={bagsRequired}
                  onChange={(e) => setBagsRequired(Number(e.target.value))}
                  className="w-full px-4 py-2.5 bg-muted/50 border border-border rounded-xl text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase text-muted-foreground">
                  {language === "bn" ? "জরুরিতা স্তর *" : "Urgency Priority *"}
                </label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as RequestPriority)}
                  className="w-full px-4 py-2.5 bg-muted/50 border border-border rounded-xl text-sm font-semibold text-foreground focus:outline-none"
                >
                  <option value="critical">Critical / Life Threatening (জীবন সংকট)</option>
                  <option value="urgent">Urgent (জরুরি)</option>
                  <option value="normal">Normal (স্বাভাবিক)</option>
                </select>
              </div>
            </div>

            {/* Hospital Information */}
            <div className="space-y-4 pt-2 border-t border-border">
              <h3 className="font-bold text-sm text-foreground flex items-center gap-2">
                <Building className="w-4 h-4 text-primary" />
                <span>{language === "bn" ? "হাসপাতালের বিবরণ" : "Hospital Details"}</span>
              </h3>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase text-muted-foreground">
                  {language === "bn" ? "হাসপাতালের নাম *" : "Hospital Name *"}
                </label>
                <input
                  type="text"
                  placeholder={language === "bn" ? "যেমন: ঢাকা মেডিকেল কলেজ হাসপাতাল" : "e.g. Dhaka Medical College Hospital"}
                  value={hospitalName}
                  onChange={(e) => setHospitalName(e.target.value)}
                  className="w-full px-4 py-2.5 bg-muted/50 border border-border rounded-xl text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase text-muted-foreground">
                  {language === "bn" ? "হাসপাতালের ঠিকানা বা ওয়ার্ড নম্বর" : "Hospital Address / Ward"}
                </label>
                <input
                  type="text"
                  placeholder={language === "bn" ? "ওয়ার্ড, কেবিন নম্বর বা ফ্লোর..." : "Ward / Bed / Floor details"}
                  value={hospitalAddress}
                  onChange={(e) => setHospitalAddress(e.target.value)}
                  className="w-full px-4 py-2.5 bg-muted/50 border border-border rounded-xl text-sm text-foreground focus:outline-none"
                />
              </div>

              {/* Cascading Location Selectors */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-[10px] font-bold uppercase text-muted-foreground block mb-1">
                    {t("division")}
                  </label>
                  <select
                    value={divisionId}
                    onChange={(e) => {
                      setDivisionId(e.target.value);
                      const newDistricts = getDistricts(e.target.value);
                      if (newDistricts[0]) {
                        setDistrictId(newDistricts[0].id);
                        const newUpas = getUpazilas(newDistricts[0].id);
                        if (newUpas[0]) setUpazilaId(newUpas[0].id);
                      }
                    }}
                    className="w-full py-2 px-3 bg-muted/60 border border-border rounded-xl text-xs font-semibold text-foreground focus:outline-none"
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
                    {t("district")}
                  </label>
                  <select
                    value={districtId}
                    onChange={(e) => {
                      setDistrictId(e.target.value);
                      const newUpas = getUpazilas(e.target.value);
                      if (newUpas[0]) setUpazilaId(newUpas[0].id);
                    }}
                    className="w-full py-2 px-3 bg-muted/60 border border-border rounded-xl text-xs font-semibold text-foreground focus:outline-none"
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
                    {t("thana")}
                  </label>
                  <select
                    value={upazilaId}
                    onChange={(e) => setUpazilaId(e.target.value)}
                    className="w-full py-2 px-3 bg-muted/60 border border-border rounded-xl text-xs font-semibold text-foreground focus:outline-none"
                  >
                    {upazilas.map((u) => (
                      <option key={u.id} value={u.id}>
                        {language === "bn" ? u.bnName : u.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Date & Contact Information */}
            <div className="space-y-4 pt-2 border-t border-border">
              <h3 className="font-bold text-sm text-foreground flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" />
                <span>{language === "bn" ? "তারিখ ও যোগাযোগের বিবরণ" : "Timing & Contact"}</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase text-muted-foreground">
                    {language === "bn" ? "রক্তদানের তারিখ *" : "Required Date *"}
                  </label>
                  <input
                    type="date"
                    value={requiredDate}
                    onChange={(e) => setRequiredDate(e.target.value)}
                    className="w-full px-4 py-2.5 bg-muted/50 border border-border rounded-xl text-sm text-foreground focus:outline-none"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase text-muted-foreground">
                    {language === "bn" ? "প্রয়োজনীয় সময় *" : "Required Time *"}
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 10:30 AM"
                    value={requiredTime}
                    onChange={(e) => setRequiredTime(e.target.value)}
                    className="w-full px-4 py-2.5 bg-muted/50 border border-border rounded-xl text-sm text-foreground focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase text-muted-foreground">
                    {language === "bn" ? "যোগাযোগকারীর নাম *" : "Contact Person Name *"}
                  </label>
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={contactPerson}
                    onChange={(e) => setContactPerson(e.target.value)}
                    className="w-full px-4 py-2.5 bg-muted/50 border border-border rounded-xl text-sm text-foreground focus:outline-none"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase text-muted-foreground">
                    {language === "bn" ? "প্রধান ফোন নম্বর *" : "Primary Phone Number *"}
                  </label>
                  <input
                    type="tel"
                    placeholder="+88017XXXXXXXX"
                    value={primaryPhone}
                    onChange={(e) => setPrimaryPhone(e.target.value)}
                    className="w-full px-4 py-2.5 bg-muted/50 border border-border rounded-xl text-sm text-foreground focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase text-muted-foreground">
                  {language === "bn" ? "চিকিৎসার কারণ ও অতিরিক্ত নোট" : "Medical Reason / Diagnosis"}
                </label>
                <textarea
                  rows={3}
                  placeholder={language === "bn" ? "রোগীর অস্ত্রোপচার বা চিকিৎসার সংক্ষিপ্ত বিবরণ..." : "Reason for transfusion..."}
                  value={medicalReason}
                  onChange={(e) => setMedicalReason(e.target.value)}
                  className="w-full px-4 py-2.5 bg-muted/50 border border-border rounded-xl text-sm text-foreground focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-4 px-6 bg-primary hover:bg-primary-hover text-white font-extrabold text-sm sm:text-base rounded-2xl shadow-xl shadow-primary/30 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
            >
              {submitting
                ? language === "bn"
                  ? "আবেদন পোস্ট হচ্ছে..."
                  : "Posting Request..."
                : language === "bn"
                ? "জরুরি আবেদন পোস্ট করুন"
                : "Post Emergency Request Now"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}


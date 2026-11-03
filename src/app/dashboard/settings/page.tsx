"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { BloodBondRepository } from "@/lib/data/repository";
import { UserProfile, DonorProfile } from "@/types/database";
import { Settings, ShieldCheck, Bell, Lock, Save, CheckCircle2 } from "lucide-react";

export default function DashboardSettingsPage() {
  const { language } = useLanguage();

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [occupation, setOccupation] = useState("");
  const [bio, setBio] = useState("");
  const [publicVisible, setPublicVisible] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const curUser = BloodBondRepository.getCurrentUser();
    setFullName(curUser.full_name);
    setPhone(curUser.phone);
    setEmail(curUser.email);
    setOccupation(curUser.occupation || "");
    setBio(curUser.bio || "");
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const curUser = BloodBondRepository.getCurrentUser();
    const updatedUser: UserProfile = {
      ...curUser,
      full_name: fullName,
      phone,
      email,
      occupation,
      bio,
    };
    BloodBondRepository.setCurrentUser(updatedUser);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-foreground">
          {language === "bn" ? "প্রোফাইল ও গোপনীয়তা সেটিংস" : "Profile & Privacy Settings"}
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
          {language === "bn"
            ? "আপনার যোগাযোগের তথ্য এবং জরুরি নোটিফিকেশন অগ্রাধিকার পরিচালনা করুন।"
            : "Manage your contact preferences, public donor visibility and alerts."}
        </p>
      </div>

      {saved && (
        <div className="p-4 rounded-2xl bg-bdgreen-50 text-bdgreen-700 dark:bg-bdgreen-950/30 dark:text-bdgreen-400 border border-bdgreen-300 flex items-center gap-2 text-xs font-bold">
          <CheckCircle2 className="w-4 h-4 text-bdgreen-600" />
          <span>{language === "bn" ? "পরিবর্তনগুলো সফলভাবে সংরক্ষিত হয়েছে!" : "Settings saved successfully!"}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="p-6 sm:p-8 rounded-3xl bg-card border border-border shadow-sm space-y-6">
        <div className="space-y-4">
          <h3 className="font-bold text-sm text-foreground flex items-center gap-2">
            <Settings className="w-4 h-4 text-primary" />
            <span>{language === "bn" ? "ব্যক্তিগত তথ্য" : "Personal Details"}</span>
          </h3>

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase text-muted-foreground">
              {language === "bn" ? "পুরো নাম" : "Full Name"}
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-4 py-2.5 bg-muted/50 border border-border rounded-xl text-sm text-foreground focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase text-muted-foreground">
                {language === "bn" ? "মোবাইল নম্বর" : "Phone"}
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-2.5 bg-muted/50 border border-border rounded-xl text-sm text-foreground focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase text-muted-foreground">
                {language === "bn" ? "পেশা" : "Occupation"}
              </label>
              <input
                type="text"
                value={occupation}
                onChange={(e) => setOccupation(e.target.value)}
                className="w-full px-4 py-2.5 bg-muted/50 border border-border rounded-xl text-sm text-foreground focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase text-muted-foreground">
              {language === "bn" ? "বায়ো / পরিচিতি" : "Short Bio"}
            </label>
            <textarea
              rows={2}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full px-4 py-2.5 bg-muted/50 border border-border rounded-xl text-sm text-foreground focus:outline-none"
            />
          </div>
        </div>

        {/* Privacy Controls */}
        <div className="space-y-4 pt-4 border-t border-border">
          <h3 className="font-bold text-sm text-foreground flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-primary" />
            <span>{language === "bn" ? "গোপনীয়তা ও নিরাপত্তা" : "Privacy & Permissions"}</span>
          </h3>

          <div className="space-y-3">
            <label className="flex items-center justify-between p-3.5 rounded-2xl bg-muted/40 border border-border cursor-pointer">
              <span className="text-xs font-bold text-foreground">
                {language === "bn" ? "সার্চে আমার রক্তদাতা প্রোফাইল প্রদর্শন করুন" : "Publicly Visible in Donor Directory"}
              </span>
              <input
                type="checkbox"
                checked={publicVisible}
                onChange={(e) => setPublicVisible(e.target.checked)}
                className="rounded text-primary focus:ring-primary w-4 h-4"
              />
            </label>

            <label className="flex items-center justify-between p-3.5 rounded-2xl bg-muted/40 border border-border cursor-pointer">
              <span className="text-xs font-bold text-foreground">
                {language === "bn" ? "জরুরি রক্তের এসএমএস অ্যালার্ট গ্রহণ করুন" : "Urgent Blood Emergency SMS Alerts"}
              </span>
              <input
                type="checkbox"
                checked={smsAlerts}
                onChange={(e) => setSmsAlerts(e.target.checked)}
                className="rounded text-primary focus:ring-primary w-4 h-4"
              />
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3.5 bg-primary hover:bg-primary-hover text-white text-xs sm:text-sm font-bold rounded-2xl flex items-center justify-center gap-2 shadow-md shadow-primary/20 transition-all"
        >
          <Save className="w-4 h-4" />
          <span>{language === "bn" ? "পরিবর্তনগুলো সংরক্ষণ করুন" : "Save Changes"}</span>
        </button>
      </form>
    </div>
  );
}


"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { BloodBondRepository } from "@/lib/data/repository";
import { LogIn, Lock, Phone, ShieldCheck, UserCheck, Heart } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { language, t } = useLanguage();

  const [phoneOrEmail, setPhoneOrEmail] = useState("+8801712-345678");
  const [password, setPassword] = useState("password123");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      // Find matching donor profile or default user
      const donors = BloodBondRepository.getDonors();
      const match = donors.find(
        (d) =>
          d.profile.phone.includes(phoneOrEmail) ||
          d.profile.email.includes(phoneOrEmail)
      );

      if (match) {
        BloodBondRepository.setCurrentUser(match.profile);
      }
      setLoading(false);
      router.push("/dashboard");
    }, 600);
  };

  // Quick One-Click Demo Role Switches
  const handleQuickRole = (roleType: "donor" | "admin" | "org") => {
    if (roleType === "admin") {
      BloodBondRepository.setCurrentUser({
        id: "admin-super",
        full_name: "Super Administrator",
        phone: "+8801700-000001",
        email: "admin@bloodbond.bd",
        avatar_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
        date_of_birth: "1985-01-01",
        gender: "male",
        role: "super_admin",
        is_phone_verified: true,
        is_email_verified: true,
        created_at: new Date().toISOString(),
      });
      router.push("/admin");
    } else {
      const donors = BloodBondRepository.getDonors();
      if (donors[0]) {
        BloodBondRepository.setCurrentUser(donors[0].profile);
      }
      router.push("/dashboard");
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-md">
      <div className="p-6 sm:p-8 rounded-3xl bg-card border border-border shadow-xl space-y-6">
        <div className="text-center space-y-2">
          <div className="relative w-14 h-14 mx-auto">
            <Image
              src="/images/bloodbond-logo.png"
              alt="BloodBond Logo"
              fill
              className="object-contain"
            />
          </div>
          <h1 className="text-2xl font-black text-foreground">
            {language === "bn" ? "অ্যাকাউন্টে লগইন করুন" : "Sign In to BloodBond"}
          </h1>
          <p className="text-xs text-muted-foreground">
            {language === "bn"
              ? "আপনার মোবাইল নম্বর ও পাসওয়ার্ড দিয়ে প্রবেশ করুন"
              : "Enter your registered phone number or email to continue"}
          </p>
        </div>

        {/* Demo Quick Login Helper */}
        <div className="p-3 rounded-2xl bg-muted/60 border border-border text-center space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            Instant Demo Access
          </span>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => handleQuickRole("donor")}
              className="py-1.5 px-2 bg-card hover:bg-muted border border-border rounded-xl text-xs font-bold text-primary flex items-center justify-center gap-1 shadow-sm"
            >
              <Heart className="w-3.5 h-3.5" />
              <span>Demo Donor</span>
            </button>
            <button
              onClick={() => handleQuickRole("admin")}
              className="py-1.5 px-2 bg-card hover:bg-muted border border-border rounded-xl text-xs font-bold text-bdgreen-600 flex items-center justify-center gap-1 shadow-sm"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Super Admin</span>
            </button>
          </div>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase text-muted-foreground">
              {language === "bn" ? "ফোন নম্বর বা ইমেইল" : "Phone or Email"}
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-muted-foreground absolute left-3 top-3" />
              <input
                type="text"
                value={phoneOrEmail}
                onChange={(e) => setPhoneOrEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 bg-muted/50 border border-border rounded-xl text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase text-muted-foreground">
                {language === "bn" ? "পাসওয়ার্ড" : "Password"}
              </label>
              <a href="#" className="text-[11px] text-primary hover:underline">
                {language === "bn" ? "পাসওয়ার্ড ভুলে গেছেন?" : "Forgot?"}
              </a>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-muted-foreground absolute left-3 top-3" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 bg-muted/50 border border-border rounded-xl text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-primary hover:bg-primary-hover text-white font-extrabold text-sm rounded-2xl shadow-lg shadow-primary/25 transition-all flex items-center justify-center gap-2"
          >
            <LogIn className="w-4 h-4" />
            <span>{loading ? "Authenticating..." : language === "bn" ? "লগইন করুন" : "Sign In"}</span>
          </button>
        </form>

        <div className="text-center text-xs text-muted-foreground pt-2">
          {language === "bn" ? "এখনও কোনো অ্যাকাউন্ট নেই?" : "Don't have an account yet?"}{" "}
          <Link href="/become-a-donor" className="font-bold text-primary hover:underline">
            {language === "bn" ? "রক্তদাতা হোন" : "Register as Donor"}
          </Link>
        </div>
      </div>
    </div>
  );
}


"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { BloodBondRepository } from "@/lib/data/repository";
import { UserProfile, DonorProfile } from "@/types/database";
import {
  LayoutDashboard,
  CreditCard,
  Heart,
  Droplets,
  Settings,
  Bell,
  LogOut,
  User,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { language, t } = useLanguage();

  const [user, setUser] = useState<UserProfile | null>(null);
  const [donor, setDonor] = useState<DonorProfile | null>(null);

  useEffect(() => {
    const curUser = BloodBondRepository.getCurrentUser();
    setUser(curUser);
    const donors = BloodBondRepository.getDonors();
    const myDonor = donors.find((d) => d.profile_id === curUser.id || d.id === "donor-01");
    if (myDonor) setDonor(myDonor);
  }, []);

  const navItems = [
    { href: "/dashboard", label: language === "bn" ? "ড্যাশবোর্ড ওভারভিউ" : "Dashboard Overview", icon: LayoutDashboard },
    { href: "/dashboard/id-card", label: language === "bn" ? "ডিজিটাল ডোনার কার্ড" : "Digital Donor Card", icon: CreditCard },
    { href: "/dashboard/donations", label: language === "bn" ? "রক্তদান রেকর্ড ও লগ" : "Donation Records", icon: Droplets },
    { href: "/dashboard/requests", label: language === "bn" ? "আমার রক্তের আবেদন" : "My Blood Requests", icon: Heart },
    { href: "/dashboard/settings", label: language === "bn" ? "প্রোফাইল ও সেটিংস" : "Settings & Privacy", icon: Settings },
  ];

  const isActive = (path: string) => {
    if (path === "/dashboard") return pathname === "/dashboard";
    return pathname.startsWith(path);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Sidebar */}
        <aside className="lg:col-span-3 space-y-6">
          {/* User mini card */}
          <div className="p-5 rounded-3xl bg-card border border-border shadow-sm text-center relative overflow-hidden">
            <div className="relative w-20 h-20 rounded-full overflow-hidden mx-auto border-2 border-primary/40 mb-3 shadow-md">
              <Image
                src={user?.avatar_url || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"}
                alt="Avatar"
                fill
                className="object-cover"
              />
            </div>

            <h3 className="font-extrabold text-base text-foreground flex items-center justify-center gap-1">
              <span>{user?.full_name || "Tanvir Ahmed"}</span>
              <CheckCircle2 className="w-4 h-4 text-bdgreen-600 fill-current" />
            </h3>

            {donor && (
              <div className="text-xs font-mono text-muted-foreground mt-0.5">
                {donor.donor_code}
              </div>
            )}

            {donor && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blood-100 dark:bg-blood-900/30 text-primary font-black text-xs mt-2 border border-blood-200 dark:border-blood-800">
                <span>Blood Group: {donor.blood_group}</span>
              </div>
            )}
          </div>

          {/* Navigation Links */}
          <div className="p-3 rounded-3xl bg-card border border-border shadow-sm space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
                    active
                      ? "bg-primary text-white shadow-md shadow-primary/20"
                      : "text-foreground hover:bg-muted"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${active ? "text-white" : "text-primary"}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </aside>

        {/* Main Dashboard Workspace */}
        <main className="lg:col-span-9">{children}</main>
      </div>
    </div>
  );
}


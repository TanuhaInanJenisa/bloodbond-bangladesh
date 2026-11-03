"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { BloodBondRepository } from "@/lib/data/repository";
import { DonorProfile, BloodRequest, DonationRecord } from "@/types/database";
import {
  ShieldCheck,
  Users,
  Droplet,
  Heart,
  Building,
  Calendar,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Clock,
  BarChart3,
  Search,
  Filter,
  ArrowRight,
} from "lucide-react";

export default function AdminDashboardPage() {
  const { language } = useLanguage();

  const [stats, setStats] = useState<any>(null);
  const [donors, setDonors] = useState<DonorProfile[]>([]);
  const [requests, setRequests] = useState<BloodRequest[]>([]);
  const [donations, setDonations] = useState<DonationRecord[]>([]);
  const [activeTab, setActiveTab] = useState<"donors" | "verifications" | "requests">("donors");
  const [donorSearch, setDonorSearch] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const s = BloodBondRepository.getAdminStats();
    setStats(s);
    setDonors(BloodBondRepository.getDonors());
    setRequests(BloodBondRepository.getRequests());
    setDonations(BloodBondRepository.getDonationRecords());
  };

  const handleVerifyDonor = (donorId: string) => {
    const all = BloodBondRepository.getDonors();
    const updated = all.map((d) => {
      if (d.id === donorId) {
        return {
          ...d,
          verification_status: "verified" as const,
        };
      }
      return d;
    });
    localStorage.setItem("bloodbond_donors_v1", JSON.stringify(updated));
    loadData();
  };

  const filteredDonors = donors.filter(
    (d) =>
      d.profile.full_name.toLowerCase().includes(donorSearch.toLowerCase()) ||
      d.donor_code.toLowerCase().includes(donorSearch.toLowerCase()) ||
      d.district_name.toLowerCase().includes(donorSearch.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Admin Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-neutral-900 via-neutral-900 to-neutral-800 text-white shadow-xl">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-bdgreen-600/30 text-bdgreen-400 text-xs font-bold border border-bdgreen-500/30">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Super Admin & Moderation Console</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">
            BloodBond National Operations
          </h1>
          <p className="text-xs text-neutral-400">
            Realtime monitoring of nationwide donors, hospital verifications, and urgent requests.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-xs font-bold rounded-xl border border-neutral-700"
          >
            Donor Portal
          </Link>
          <Link
            href="/"
            className="px-4 py-2 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-xl shadow-md"
          >
            Public Site
          </Link>
        </div>
      </div>

      {/* Analytics KPI Grid */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="p-4 rounded-2xl bg-card border border-border shadow-sm">
            <span className="text-[10px] uppercase font-bold text-muted-foreground block">
              Total Donors
            </span>
            <div className="text-2xl font-black text-foreground mt-1">
              {stats.totalDonors}
            </div>
            <span className="text-[10px] text-bdgreen-600 font-semibold">
              {stats.verifiedDonors} Verified
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-card border border-border shadow-sm">
            <span className="text-[10px] uppercase font-bold text-muted-foreground block">
              Available Now
            </span>
            <div className="text-2xl font-black text-bdgreen-600 mt-1">
              {stats.availableDonors}
            </div>
            <span className="text-[10px] text-muted-foreground font-semibold">
              Ready to respond
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-card border border-border shadow-sm">
            <span className="text-[10px] uppercase font-bold text-muted-foreground block">
              Active Appeals
            </span>
            <div className="text-2xl font-black text-primary mt-1">
              {stats.activeRequests}
            </div>
            <span className="text-[10px] text-muted-foreground font-semibold">
              Emergency queue
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-card border border-border shadow-sm">
            <span className="text-[10px] uppercase font-bold text-muted-foreground block">
              Total Donations
            </span>
            <div className="text-2xl font-black text-foreground mt-1">
              {stats.totalDonations}
            </div>
            <span className="text-[10px] text-muted-foreground font-semibold">
              Hospital logged
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-card border border-border shadow-sm">
            <span className="text-[10px] uppercase font-bold text-muted-foreground block">
              Hospitals
            </span>
            <div className="text-2xl font-black text-foreground mt-1">
              {stats.totalOrganizations}
            </div>
            <span className="text-[10px] text-muted-foreground font-semibold">
              64 Districts
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-card border border-border shadow-sm">
            <span className="text-[10px] uppercase font-bold text-muted-foreground block">
              Campaigns
            </span>
            <div className="text-2xl font-black text-foreground mt-1">
              {stats.totalCampaigns}
            </div>
            <span className="text-[10px] text-muted-foreground font-semibold">
              Active drives
            </span>
          </div>
        </div>
      )}

      {/* Blood Group Inventory Distribution */}
      {stats && (
        <div className="p-6 rounded-3xl bg-card border border-border shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-sm sm:text-base text-foreground flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-primary" />
              <span>Nationwide Blood Group Distribution (Donors)</span>
            </h3>
            <span className="text-xs text-muted-foreground font-mono">
              Realtime Database Statistics
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {Object.entries(stats.bloodGroupCounts).map(([group, count]: any) => (
              <div
                key={group}
                className="p-3 rounded-2xl bg-muted/40 border border-border/80 text-center space-y-1"
              >
                <span className="text-xs font-black text-primary block">{group}</span>
                <span className="text-lg font-black text-foreground block">{count}</span>
                <span className="text-[10px] text-muted-foreground block">
                  {stats.totalDonors > 0
                    ? `${Math.round((count / stats.totalDonors) * 100)}%`
                    : "0%"}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tabs & Management Workspace */}
      <div className="space-y-4">
        {/* Tab Buttons */}
        <div className="flex items-center gap-2 border-b border-border pb-3">
          <button
            onClick={() => setActiveTab("donors")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === "donors"
                ? "bg-primary text-white shadow-sm"
                : "bg-muted text-foreground hover:bg-muted/80"
            }`}
          >
            Donor Directory ({donors.length})
          </button>
          <button
            onClick={() => setActiveTab("verifications")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === "verifications"
                ? "bg-primary text-white shadow-sm"
                : "bg-muted text-foreground hover:bg-muted/80"
            }`}
          >
            Donations Queue ({donations.length})
          </button>
          <button
            onClick={() => setActiveTab("requests")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === "requests"
                ? "bg-primary text-white shadow-sm"
                : "bg-muted text-foreground hover:bg-muted/80"
            }`}
          >
            Emergency Appeals ({requests.length})
          </button>
        </div>

        {/* TAB 1: DONORS TABLE */}
        {activeTab === "donors" && (
          <div className="p-6 rounded-3xl bg-card border border-border shadow-sm space-y-4">
            <div className="flex items-center justify-between gap-4">
              <div className="relative w-full max-w-sm">
                <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="Filter by name, ID or district..."
                  value={donorSearch}
                  onChange={(e) => setDonorSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-muted/50 border border-border rounded-xl text-xs sm:text-sm text-foreground focus:outline-none"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-border text-muted-foreground font-bold uppercase tracking-wider text-[10px]">
                    <th className="py-3 px-3">Donor</th>
                    <th className="py-3 px-3">Donor Code</th>
                    <th className="py-3 px-3">Group</th>
                    <th className="py-3 px-3">Location</th>
                    <th className="py-3 px-3">Donations</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  {filteredDonors.map((d) => (
                    <tr key={d.id} className="hover:bg-muted/30 transition-colors">
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-2.5">
                          <div className="relative w-8 h-8 rounded-full overflow-hidden border border-border flex-shrink-0">
                            <Image
                              src={d.profile.avatar_url || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"}
                              alt={d.profile.full_name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <span className="font-bold text-foreground block">
                              {d.profile.full_name}
                            </span>
                            <span className="text-[10px] text-muted-foreground">
                              {d.profile.phone}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-3 font-mono font-semibold text-primary">
                        {d.donor_code}
                      </td>
                      <td className="py-3 px-3 font-black text-foreground">
                        {d.blood_group}
                      </td>
                      <td className="py-3 px-3 text-muted-foreground">
                        {d.upazila_name}, {d.district_name}
                      </td>
                      <td className="py-3 px-3 font-bold text-foreground">
                        {d.total_verified_donations}
                      </td>
                      <td className="py-3 px-3">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            d.verification_status === "verified"
                              ? "bg-bdgreen-100 text-bdgreen-700"
                              : "bg-amber-100 text-amber-700"
                          }`}
                        >
                          {d.verification_status}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right">
                        <Link
                          href={`/donors/${d.id}`}
                          className="px-2.5 py-1 rounded-lg bg-secondary hover:bg-muted text-foreground text-[11px] font-bold border border-border"
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: DONATION VERIFICATION QUEUE */}
        {activeTab === "verifications" && (
          <div className="p-6 rounded-3xl bg-card border border-border shadow-sm space-y-4">
            <h3 className="font-bold text-sm text-foreground">
              Hospital Slip & Clinical Verification Queue
            </h3>
            <div className="space-y-3">
              {donations.map((rec) => (
                <div
                  key={rec.id}
                  className="p-4 rounded-2xl bg-muted/40 border border-border flex items-center justify-between gap-4"
                >
                  <div className="space-y-0.5">
                    <h4 className="font-bold text-sm text-foreground">
                      {rec.hospital_name}
                    </h4>
                    <span className="text-xs text-muted-foreground">
                      Date: {rec.donation_date} • Type: {rec.donation_type.replace("_", " ")}
                    </span>
                    {rec.notes && (
                      <p className="text-[11px] text-muted-foreground italic">
                        {rec.notes}
                      </p>
                    )}
                  </div>

                  <span className="px-3 py-1 rounded-full bg-bdgreen-100 text-bdgreen-700 text-xs font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Approved & 90D Applied</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: EMERGENCY APPEALS */}
        {activeTab === "requests" && (
          <div className="p-6 rounded-3xl bg-card border border-border shadow-sm space-y-4">
            <h3 className="font-bold text-sm text-foreground">
              Emergency Blood Requests Queue
            </h3>
            <div className="space-y-3">
              {requests.map((req) => (
                <div
                  key={req.id}
                  className="p-4 rounded-2xl bg-muted/40 border border-border flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blood-100 text-primary font-black text-lg flex items-center justify-center">
                      {req.blood_group}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-foreground">
                        {req.patient_name} ({req.bags_required} bags)
                      </h4>
                      <span className="text-xs text-muted-foreground">
                        {req.hospital_name} • {req.upazila_name}, {req.district_name}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-full bg-rose-100 text-rose-700 text-[10px] font-bold uppercase">
                      {req.priority}
                    </span>
                    <a
                      href={`tel:${req.primary_phone}`}
                      className="px-3 py-1.5 bg-primary text-white text-xs font-bold rounded-lg shadow-sm"
                    >
                      Call
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


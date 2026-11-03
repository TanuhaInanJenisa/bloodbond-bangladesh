"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import {
  BANGLADESH_DIVISIONS,
  getDistricts,
  getUpazilas,
} from "@/lib/data/bangladeshGeo";
import { Search, MapPin, Building, Droplets } from "lucide-react";

export const HomeSearchBar: React.FC = () => {
  const router = useRouter();
  const { language, t } = useLanguage();

  const [selectedDivision, setSelectedDivision] = useState<string>("");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");
  const [selectedUpazila, setSelectedUpazila] = useState<string>("");
  const [selectedBloodGroup, setSelectedBloodGroup] = useState<string>("");

  const availableDistricts = getDistricts(selectedDivision || undefined);
  const availableUpazilas = getUpazilas(selectedDistrict || undefined);

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (selectedDivision) params.set("division", selectedDivision);
    if (selectedDistrict) params.set("district", selectedDistrict);
    if (selectedUpazila) params.set("upazila", selectedUpazila);
    if (selectedBloodGroup) params.set("bloodGroup", selectedBloodGroup);

    router.push(`/donors?${params.toString()}`);
  };

  return (
    <div className="w-full bg-white dark:bg-card rounded-2xl shadow-xl border border-border p-4 md:p-6 transition-all">
      <form onSubmit={handleSearch} className="flex flex-col lg:flex-row items-stretch gap-3">
        {/* Title label badge */}
        <div className="flex items-center gap-2 lg:border-r border-border pr-4 min-w-[200px] text-primary">
          <div className="p-2 rounded-xl bg-blood-100 dark:bg-blood-900/30">
            <Search className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="text-sm font-bold leading-tight text-foreground">
              {t("searchTitle")}
            </h3>
            <span className="text-[11px] text-muted-foreground">
              {language === "bn" ? "৬৪ জেলার সকল এলাকা" : "Realtime Verified Donors"}
            </span>
          </div>
        </div>

        {/* Division Selector */}
        <div className="flex-1 min-w-[140px] flex flex-col justify-center px-2 py-1 bg-muted/50 rounded-xl border border-border/60">
          <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1">
            <MapPin className="w-3 h-3 text-primary" />
            {t("division")}
          </label>
          <select
            value={selectedDivision}
            onChange={(e) => {
              setSelectedDivision(e.target.value);
              setSelectedDistrict("");
              setSelectedUpazila("");
            }}
            className="w-full bg-transparent text-sm font-semibold text-foreground focus:outline-none cursor-pointer py-1"
          >
            <option value="">{t("selectDivision")}</option>
            {BANGLADESH_DIVISIONS.map((div) => (
              <option key={div.id} value={div.id}>
                {language === "bn" ? div.bnName : div.name}
              </option>
            ))}
          </select>
        </div>

        {/* District Selector */}
        <div className="flex-1 min-w-[140px] flex flex-col justify-center px-2 py-1 bg-muted/50 rounded-xl border border-border/60">
          <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1">
            <Building className="w-3 h-3 text-primary" />
            {t("district")}
          </label>
          <select
            value={selectedDistrict}
            disabled={!selectedDivision && availableDistricts.length === 0}
            onChange={(e) => {
              setSelectedDistrict(e.target.value);
              setSelectedUpazila("");
            }}
            className="w-full bg-transparent text-sm font-semibold text-foreground focus:outline-none cursor-pointer py-1 disabled:opacity-50"
          >
            <option value="">{t("selectDistrict")}</option>
            {availableDistricts.map((dist) => (
              <option key={dist.id} value={dist.id}>
                {language === "bn" ? dist.bnName : dist.name}
              </option>
            ))}
          </select>
        </div>

        {/* Upazila / Thana Selector */}
        <div className="flex-1 min-w-[140px] flex flex-col justify-center px-2 py-1 bg-muted/50 rounded-xl border border-border/60">
          <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1">
            <MapPin className="w-3 h-3 text-primary" />
            {t("thana")}
          </label>
          <select
            value={selectedUpazila}
            disabled={!selectedDistrict}
            onChange={(e) => setSelectedUpazila(e.target.value)}
            className="w-full bg-transparent text-sm font-semibold text-foreground focus:outline-none cursor-pointer py-1 disabled:opacity-50"
          >
            <option value="">{t("selectThana")}</option>
            {availableUpazilas.map((upa) => (
              <option key={upa.id} value={upa.id}>
                {language === "bn" ? upa.bnName : upa.name}
              </option>
            ))}
          </select>
        </div>

        {/* Blood Group Selector */}
        <div className="flex-1 min-w-[130px] flex flex-col justify-center px-2 py-1 bg-muted/50 rounded-xl border border-border/60">
          <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1">
            <Droplets className="w-3 h-3 text-primary" />
            {t("bloodGroup")}
          </label>
          <select
            value={selectedBloodGroup}
            onChange={(e) => setSelectedBloodGroup(e.target.value)}
            className="w-full bg-transparent text-sm font-bold text-primary focus:outline-none cursor-pointer py-1"
          >
            <option value="">{t("selectBloodGroup")}</option>
            {bloodGroups.map((bg) => (
              <option key={bg} value={bg}>
                {bg}
              </option>
            ))}
          </select>
        </div>

        {/* Search Submit Button */}
        <button
          type="submit"
          className="flex items-center justify-center gap-2 px-6 py-3.5 bg-primary hover:bg-primary-hover text-white rounded-xl font-bold text-sm shadow-lg shadow-primary/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <Search className="w-4 h-4" />
          <span>{t("searchDonorBtn")}</span>
        </button>
      </form>
    </div>
  );
};


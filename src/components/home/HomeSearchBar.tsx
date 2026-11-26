"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import {
  BANGLADESH_DIVISIONS,
  BANGLADESH_DISTRICTS,
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

  // Districts for current division (or all if none selected)
  const availableDistricts = getDistricts(selectedDivision);

  // Upazilas for current selection
  const availableUpazilas = getUpazilas(selectedDistrict, selectedDivision);

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  // When division changes:
  const handleDivisionChange = (divId: string) => {
    setSelectedDivision(divId);
    // If current selected district doesn't belong to the new division, clear it
    if (selectedDistrict) {
      const distObj = BANGLADESH_DISTRICTS.find((d) => d.id === selectedDistrict);
      if (divId && distObj && distObj.divisionId !== divId) {
        setSelectedDistrict("");
        setSelectedUpazila("");
      }
    }
  };

  // When district changes:
  const handleDistrictChange = (distId: string) => {
    setSelectedDistrict(distId);
    setSelectedUpazila(""); // reset thana
    if (distId) {
      const distObj = BANGLADESH_DISTRICTS.find((d) => d.id === distId);
      if (distObj && distObj.divisionId !== selectedDivision) {
        // Auto-select the division this district belongs to
        setSelectedDivision(distObj.divisionId);
      }
    }
  };

  // When thana changes:
  const handleUpazilaChange = (upaId: string) => {
    setSelectedUpazila(upaId);
    if (upaId && !selectedDistrict) {
      const upaList = availableUpazilas.find((u) => u.id === upaId);
      if (upaList) {
        setSelectedDistrict(upaList.districtId);
        const distObj = BANGLADESH_DISTRICTS.find((d) => d.id === upaList.districtId);
        if (distObj && !selectedDivision) {
          setSelectedDivision(distObj.divisionId);
        }
      }
    }
  };

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

        {/* 1. Division Selector (বিভাগ) */}
        <div className="flex-1 min-w-[140px] flex flex-col justify-center px-2 py-1 bg-muted/50 rounded-xl border border-border/60 hover:border-primary/50 transition-colors">
          <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1">
            <MapPin className="w-3 h-3 text-primary" />
            {t("division")}
          </label>
          <select
            value={selectedDivision}
            onChange={(e) => handleDivisionChange(e.target.value)}
            className="w-full bg-transparent text-sm font-semibold text-foreground focus:outline-none cursor-pointer py-1"
          >
            <option value="">
              {language === "bn" ? "সব বিভাগ (বাংলাদেশ)" : "All Divisions"}
            </option>
            {BANGLADESH_DIVISIONS.map((div) => (
              <option key={div.id} value={div.id}>
                {language === "bn" ? div.bnName : div.name}
              </option>
            ))}
          </select>
        </div>

        {/* 2. District Selector (বিভাগের আন্ডারে জেলা) */}
        <div className="flex-1 min-w-[150px] flex flex-col justify-center px-2 py-1 bg-muted/50 rounded-xl border border-border/60 hover:border-primary/50 transition-colors">
          <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1">
            <Building className="w-3 h-3 text-primary" />
            {t("district")}
          </label>
          <select
            value={selectedDistrict}
            onChange={(e) => handleDistrictChange(e.target.value)}
            className="w-full bg-transparent text-sm font-semibold text-foreground focus:outline-none cursor-pointer py-1"
          >
            <option value="">
              {selectedDivision
                ? language === "bn"
                  ? "সকল জেলা (এই বিভাগ)"
                  : "All Districts in Division"
                : language === "bn"
                ? "জেলা নির্বাচন করুন"
                : "Select District"}
            </option>

            {selectedDivision ? (
              // When division is selected: show only districts of that division
              availableDistricts.map((dist) => (
                <option key={dist.id} value={dist.id}>
                  {language === "bn" ? dist.bnName : dist.name}
                </option>
              ))
            ) : (
              // When no division selected: show all districts grouped under each division
              BANGLADESH_DIVISIONS.map((div) => {
                const divDistricts = BANGLADESH_DISTRICTS.filter((d) => d.divisionId === div.id);
                return (
                  <optgroup
                    key={div.id}
                    label={language === "bn" ? `— ${div.bnName} বিভাগ —` : `— ${div.name} Division —`}
                  >
                    {divDistricts.map((dist) => (
                      <option key={dist.id} value={dist.id}>
                        {language === "bn" ? dist.bnName : dist.name}
                      </option>
                    ))}
                  </optgroup>
                );
              })
            )}
          </select>
        </div>

        {/* 3. Upazila / Thana Selector (জেলার আন্ডারে থানা) */}
        <div className="flex-1 min-w-[150px] flex flex-col justify-center px-2 py-1 bg-muted/50 rounded-xl border border-border/60 hover:border-primary/50 transition-colors">
          <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1">
            <MapPin className="w-3 h-3 text-primary" />
            {t("thana")}
          </label>
          <select
            value={selectedUpazila}
            onChange={(e) => handleUpazilaChange(e.target.value)}
            className="w-full bg-transparent text-sm font-semibold text-foreground focus:outline-none cursor-pointer py-1"
          >
            <option value="">
              {selectedDistrict
                ? language === "bn"
                  ? "সকল থানা/উপজেলা"
                  : "All Thanas/Upazilas"
                : selectedDivision
                ? language === "bn"
                  ? "থানা বেছে নিন (বা জেলা বেছে নিন)"
                  : "Select Thana or District"
                : language === "bn"
                ? "প্রথমে জেলা বা বিভাগ বেছে নিন"
                : "Select District First"}
            </option>

            {selectedDistrict ? (
              // If district is selected, show its upazilas
              availableUpazilas.map((upa) => (
                <option key={upa.id} value={upa.id}>
                  {language === "bn" ? upa.bnName : upa.name}
                </option>
              ))
            ) : selectedDivision ? (
              // If division is selected, show upazilas grouped by district
              availableDistricts.map((dist) => {
                const distUpas = getUpazilas(dist.id);
                if (distUpas.length === 0) return null;
                return (
                  <optgroup
                    key={dist.id}
                    label={language === "bn" ? `— ${dist.bnName} জেলা —` : `— ${dist.name} District —`}
                  >
                    {distUpas.map((upa) => (
                      <option key={upa.id} value={upa.id}>
                        {language === "bn" ? upa.bnName : upa.name}
                      </option>
                    ))}
                  </optgroup>
                );
              })
            ) : null}
          </select>
        </div>

        {/* 4. Blood Group Selector */}
        <div className="flex-1 min-w-[130px] flex flex-col justify-center px-2 py-1 bg-muted/50 rounded-xl border border-border/60 hover:border-primary/50 transition-colors">
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

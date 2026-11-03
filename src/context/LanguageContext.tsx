"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type Language = "en" | "bn";

interface Translations {
  [key: string]: {
    en: string;
    bn: string;
  };
}

export const translations: Translations = {
  // Navigation
  home: { en: "Home", bn: "হোম" },
  findDonor: { en: "Find Donor", bn: "রক্তদাতা খুঁজুন" },
  requestBlood: { en: "Request Blood", bn: "রক্তের আবেদন" },
  becomeDonor: { en: "Become Donor", bn: "রক্তদাতা হোন" },
  about: { en: "About", bn: "আমাদের সম্পর্কে" },
  campaigns: { en: "Campaigns", bn: "ক্যাম্পেইন" },
  organizations: { en: "Hospitals", bn: "হাসপাতাল" },
  leaderboard: { en: "Leaderboard", bn: "সেরা রক্তদাতা" },
  awareness: { en: "Awareness", bn: "রক্তদান তথ্য" },
  contact: { en: "Contact", bn: "যোগাযোগ" },
  login: { en: "Login", bn: "লগইন" },
  register: { en: "Register", bn: "নিবন্ধন" },
  dashboard: { en: "Dashboard", bn: "ড্যাশবোর্ড" },
  admin: { en: "Admin", bn: "অ্যাডমিন" },

  // Hero Section
  heroTitle: { en: "BloodBond Bangladesh", bn: "ব্লাডবন্ড বাংলাদেশ" },
  heroSubtitle: { en: "A Nationwide Digital Blood Donation Network", bn: "দেশব্যাপী ডিজিটাল রক্তদান নেটওয়ার্ক" },
  heroSlogan: {
    en: "Your single drop of blood can save a precious human life",
    bn: "আপনার এক ফোঁটা রক্ত বাঁচাতে পারে একটি মূল্যবান জীবন",
  },
  tagline: { en: "Donate Blood, Save Lives.", bn: "রক্ত দিন, জীবন বাঁচান।" },
  districtsBadge: { en: "64 Districts", bn: "৬৪টি জেলা" },
  divisionsBadge: { en: "8 Divisions", bn: "৮টি বিভাগ" },
  trustedBadge: { en: "Trusted Network", bn: "বিশ্বস্ত নেটওয়ার্ক" },
  becomeDonorBtn: { en: "Become a Donor", bn: "রক্তদাতা হোন" },
  findDonorBtn: { en: "Find Donor", bn: "রক্তদাতা খুঁজুন" },

  // Search Bar
  searchTitle: { en: "Find Blood Donor Across Bangladesh", bn: "সারা বাংলাদেশে রক্তদাতা খুঁজুন" },
  division: { en: "Division", bn: "বিভাগ" },
  district: { en: "District", bn: "জেলা" },
  thana: { en: "Thana/Upazila", bn: "থানা/উপজেলা" },
  bloodGroup: { en: "Blood Group", bn: "রক্তের গ্রুপ" },
  searchDonorBtn: { en: "Search Donor", bn: "রক্তদাতা খুঁজুন" },
  selectDivision: { en: "Select Division", bn: "বিভাগ নির্বাচন করুন" },
  selectDistrict: { en: "Select District", bn: "জেলা নির্বাচন করুন" },
  selectThana: { en: "Select Thana", bn: "থানা নির্বাচন করুন" },
  selectBloodGroup: { en: "Select Group", bn: "গ্রুপ নির্বাচন করুন" },

  // Quick Feature Badges
  featureDigitalIdTitle: { en: "Digital Donor ID", bn: "ডিজিটাল ডোনার কার্ড" },
  featureDigitalIdDesc: { en: "Get your unique ID card", bn: "আপনার ইউনিক আইডি কার্ড পান" },
  feature90DaysTitle: { en: "90 Days Rule", bn: "৯০ দিনের নিয়ম" },
  feature90DaysDesc: { en: "Available after 3 months", bn: "৩ মাস পর পরবর্তী রক্তদান" },
  featureReviewTitle: { en: "Rate & Review", bn: "রেটিং ও রিভিউ" },
  featureReviewDesc: { en: "Help others with reviews", bn: "সঠিক মূল্যায়নে সহযোগিতা করুন" },
  featureEmergencyTitle: { en: "Emergency Request", bn: "জরুরি রক্তের আবেদন" },
  featureEmergencyDesc: { en: "Get instant support", bn: "দ্রুততম সময়ে রক্ত পান" },
  featureHistoryTitle: { en: "Track Your History", bn: "রক্তদানের ইতিহাস" },
  featureHistoryDesc: { en: "View donation records", bn: "যাচাইকৃত রেকর্ড দেখুন" },

  // Impact Section
  ourImpact: { en: "Our Impact", bn: "আমাদের সাফল্য" },
  impactSub: { en: "Together for a Healthier Bangladesh", bn: "সুস্থ বাংলাদেশের প্রত্যাশায় একসাথে" },
  registeredDonorsCount: { en: "50K+", bn: "৫০,০০০+" },
  registeredDonorsLabel: { en: "Registered Donors", bn: "নিবন্ধিত রক্তদাতা" },
  donationsCount: { en: "25K+", bn: "২৫,০০০+" },
  donationsLabel: { en: "Verified Donations", bn: "যাচাইকৃত রক্তদান" },
  hospitalsCount: { en: "1K+", bn: "১,০০০+" },
  hospitalsLabel: { en: "Hospitals Connected", bn: "সংযুক্ত হাসপাতাল" },
  ratingCount: { en: "4.8★", bn: "৪.৮★" },
  ratingLabel: { en: "User Rating", bn: "ব্যবহারকারী সন্তুষ্টি" },

  // Emergency Callout
  emergencyHeading: { en: "Emergency? Need Blood?", bn: "জরুরি রক্তের প্রয়োজন?" },
  emergencyText: {
    en: "Post an urgent blood request and connect instantly with nearby verified blood donors.",
    bn: "জরুরি রক্তের আবেদন পোস্ট করুন এবং দ্রুত নিকটস্থ যাচাইকৃত রক্তদাতার সাথে যোগাযোগ করুন।",
  },
  requestBloodNow: { en: "Request Blood Now", bn: "রক্তের আবেদন করুন" },

  // Join Movement
  joinHeading: { en: "Join the Movement", bn: "এই মহৎ উদ্যোগে যুক্ত হোন" },
  joinSub: { en: "Be a donor. Save lives.", bn: "রক্ত দিন, অন্যের জীবন বাঁচান।" },
  registerNow: { en: "Register Now", bn: "নিবন্ধন করুন" },

  // Footer
  aboutUs: { en: "About Us", bn: "আমাদের সম্পর্কে" },
  howItWorks: { en: "How It Works", bn: "কীভাবে কাজ করে" },
  privacyPolicy: { en: "Privacy Policy", bn: "গোপনীয়তা নীতি" },
  termsConditions: { en: "Terms & Conditions", bn: "শর্তাবলী" },
  contactUs: { en: "Contact Us", bn: "যোগাযোগ" },
  madeWithLove: { en: "Made with ❤️ for Bangladesh", bn: "বাংলাদেশের মানুষের জন্য নিবেদিত ❤️" },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  language: "bn",
  setLanguage: () => {},
  t: (key: string) => key,
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>("bn");

  useEffect(() => {
    const saved = localStorage.getItem("bloodbond_lang") as Language;
    if (saved && (saved === "en" || saved === "bn")) {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("bloodbond_lang", lang);
  };

  const t = (key: string): string => {
    if (translations[key]) {
      return translations[key][language] || translations[key].en || key;
    }
    return key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);


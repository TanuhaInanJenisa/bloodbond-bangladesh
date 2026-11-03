"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { Facebook, Youtube, Linkedin, Twitter, Phone, Mail, ShieldAlert, Heart } from "lucide-react";

export const Footer: React.FC = () => {
  const { language, t } = useLanguage();

  return (
    <footer className="w-full bg-[#1A1A1A] text-white border-t border-neutral-800 pt-12 pb-8">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-neutral-800">
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 flex-shrink-0">
                <Image
                  src="/images/bloodbond-logo.png"
                  alt="BloodBond Logo"
                  width={40}
                  height={40}
                  className="w-10 h-10 object-contain"
                />
              </div>
              <span className="font-extrabold text-xl text-white">
                Blood<span className="text-primary">Bond</span>
              </span>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed">
              {language === "bn"
                ? "বাংলাদেশের প্রতিটি প্রান্তে রক্তদাতা এবং গ্রহীতাদের মধ্যে একটি নির্ভরযোগ্য ও দ্রুততম সংযোগ মাধ্যম।"
                : "A modern nationwide digital blood donation and emergency donor management platform connecting all 64 districts of Bangladesh."}
            </p>
            <div className="flex items-center space-x-3 pt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center text-neutral-300 hover:text-white hover:bg-primary transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center text-neutral-300 hover:text-white hover:bg-primary transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center text-neutral-300 hover:text-white hover:bg-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center text-neutral-300 hover:text-white hover:bg-primary transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-neutral-200 mb-4">
              {language === "bn" ? "প্রয়োজনীয় লিঙ্ক" : "Quick Links"}
            </h4>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li>
                <Link href="/donors" className="hover:text-primary transition-colors">
                  {t("findDonor")}
                </Link>
              </li>
              <li>
                <Link href="/emergency-requests" className="hover:text-primary transition-colors">
                  {t("requestBlood")}
                </Link>
              </li>
              <li>
                <Link href="/become-a-donor" className="hover:text-primary transition-colors">
                  {t("becomeDonor")}
                </Link>
              </li>
              <li>
                <Link href="/campaigns" className="hover:text-primary transition-colors">
                  {t("campaigns")}
                </Link>
              </li>
              <li>
                <Link href="/leaderboard" className="hover:text-primary transition-colors">
                  {t("leaderboard")}
                </Link>
              </li>
              <li>
                <Link href="/organizations" className="hover:text-primary transition-colors">
                  {t("organizations")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Guidelines & Safety */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-neutral-200 mb-4">
              {language === "bn" ? "স্বাস্থ্য ও নিরাপত্তা" : "Safety & Guidelines"}
            </h4>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li>
                <Link href="/awareness" className="hover:text-primary transition-colors">
                  {language === "bn" ? "রক্তদান নির্দেশিকা ও যোগ্যতা" : "Eligibility & 90 Days Rule"}
                </Link>
              </li>
              <li>
                <Link href="/awareness#compatibility" className="hover:text-primary transition-colors">
                  {language === "bn" ? "রক্তের গ্রুপ সামঞ্জস্যতা" : "Blood Group Compatibility"}
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-primary transition-colors">
                  {language === "bn" ? "সাধারণ জিজ্ঞাসা (FAQ)" : "Frequently Asked Questions"}
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-primary transition-colors">
                  {t("privacyPolicy")}
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-primary transition-colors">
                  {t("termsConditions")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Emergency Helpline Banner */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 space-y-3">
            <div className="flex items-center gap-2 text-primary font-bold text-sm">
              <ShieldAlert className="w-4 h-4 animate-pulse" />
              <span>{language === "bn" ? "জাতীয় জরুরি সেবা" : "Emergency Helplines"}</span>
            </div>
            <p className="text-xs text-neutral-400">
              {language === "bn"
                ? "জরুরি পরিস্থিতিতে সরাসরি সরকারি সহায়তা ও স্বাস্থ্য সেবায় যোগাযোগ করুন:"
                : "In critical emergency conditions, dial official medical helplines directly:"}
            </p>
            <div className="space-y-1.5 text-xs text-neutral-300">
              <div className="flex items-center justify-between py-1 border-b border-neutral-800">
                <span>National Emergency:</span>
                <span className="font-bold text-primary">999</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-neutral-800">
                <span>Health Call Center:</span>
                <span className="font-bold text-bdgreen-500">16263</span>
              </div>
              <div className="flex items-center justify-between py-1">
                <span>Red Crescent Blood Bank:</span>
                <span className="font-semibold">+880248310188</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar matching mockup */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
            <Link href="/about" className="hover:text-white transition-colors">
              {t("aboutUs")}
            </Link>
            <span>•</span>
            <Link href="/how-it-works" className="hover:text-white transition-colors">
              {t("howItWorks")}
            </Link>
            <span>•</span>
            <Link href="/privacy" className="hover:text-white transition-colors">
              {t("privacyPolicy")}
            </Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-white transition-colors">
              {t("termsConditions")}
            </Link>
            <span>•</span>
            <Link href="/contact" className="hover:text-white transition-colors">
              {t("contactUs")}
            </Link>
          </div>

          <div className="flex items-center gap-1 text-neutral-300 font-medium">
            <span>{t("madeWithLove")}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};


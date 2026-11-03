"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { ChevronDown, HelpCircle } from "lucide-react";

export default function FAQPage() {
  const { language } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: language === "bn" ? "রক্তদান করতে কী কী শারীরিক যোগ্যতা প্রয়োজন?" : "What are the physical eligibility criteria to donate blood?",
      a: language === "bn" ? "বয়স ১৮ থেকে ৬০ বছর, ওজন কমপক্ষে ৫০ কেজি, রক্তচাপ ও পালস স্বাভাবিক এবং গত ৩ মাসের মধ্যে রক্তদান না করা।" : "Age 18 to 60, body weight minimum 50 kg, normal blood pressure/pulse, and at least 90 days since previous whole blood donation.",
    },
    {
      q: language === "bn" ? "ডিজিটাল ডোনার কার্ড কীভাবে পাব?" : "How do I get my Digital Donor Card?",
      a: language === "bn" ? "BloodBond Bangladesh-এ ৪টি ধাপে নিবন্ধন সম্পন্ন করার সাথে সাথে স্বয়ংক্রিয়ভাবে আপনার ইউনিক কিউআর কোডসহ ডিজিটাল আইডি কার্ড তৈরি হয়ে যাবে।" : "Upon completing the multi-step registration, your digital card with dynamic QR code is generated instantly in your dashboard.",
    },
    {
      q: language === "bn" ? "রক্তদাতার ফোন নম্বর কীভাবে সুরক্ষিত থাকে?" : "How is donor phone privacy protected?",
      a: language === "bn" ? "রক্তদাতার ফোন নম্বর সরাসরি উন্মুক্ত থাকে না। জরুরি রক্তের ক্ষেত্রে রোগী বা আত্মীয়ের সম্মতি ঘোষণার পরেই নম্বর প্রকাশের অনুমতি দেওয়া হয়।" : "Contact numbers are never exposed in public search scrapes. They can only be accessed by verified patients agreeing to emergency terms.",
    },
    {
      q: language === "bn" ? "রক্তদানের পর পরবর্তী রক্তদানের সময় কীভাবে গণনা করা হয়?" : "How is the next donation eligibility calculated?",
      a: language === "bn" ? "হাসপাতাল বা ব্লাড ব্যাংকে রক্তদানের স্লিপ আপলোড করার সাথে সাথে সিস্টেম স্বয়ংক্রিয়ভাবে ৯০ দিনের স্বাস্থ্য বিরতি চালু করে।" : "When a hospital donation record is submitted, our automated engine calculates a 90-day whole-blood recovery period.",
    },
  ];

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 max-w-3xl space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-black text-foreground">
          {language === "bn" ? "সাধারণ জিজ্ঞাসা (FAQ)" : "Frequently Asked Questions"}
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground">
          {language === "bn" ? "রক্তদান এবং আমাদের প্ল্যাটফর্ম সম্পর্কিত প্রয়োজনীয় উত্তর" : "Common questions about voluntary blood donation and platform usage"}
        </p>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, i) => (
          <div
            key={i}
            className="p-5 rounded-2xl bg-card border border-border shadow-sm cursor-pointer transition-all"
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
          >
            <div className="flex items-center justify-between gap-4 font-bold text-sm text-foreground">
              <span>{faq.q}</span>
              <ChevronDown
                className={`w-4 h-4 text-primary transition-transform ${
                  openIndex === i ? "rotate-180" : ""
                }`}
              />
            </div>
            {openIndex === i && (
              <p className="text-xs text-muted-foreground mt-3 pt-3 border-t border-border/60 leading-relaxed">
                {faq.a}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}


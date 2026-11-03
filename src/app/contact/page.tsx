"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Phone, Mail, MapPin, Send, CheckCircle2, ShieldAlert } from "lucide-react";

export default function ContactPage() {
  const { language } = useLanguage();
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 max-w-4xl space-y-10">
      <div className="text-center space-y-2">
        <h1 className="text-3xl sm:text-4xl font-black text-foreground">
          {language === "bn" ? "যোগাযোগ ও সহায়তা" : "Contact & Support"}
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground">
          {language === "bn"
            ? "কোনো জিজ্ঞাসা, পরামর্শ বা হাসপাতাল অংশীদারিত্বের জন্য আমাদের সাথে যোগাযোগ করুন।"
            : "Reach out for hospital onboarding, verification assistance or humanitarian inquiries."}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-5 space-y-4">
          <div className="p-6 rounded-3xl bg-card border border-border shadow-sm space-y-4 text-xs">
            <h3 className="font-extrabold text-sm text-foreground">
              BloodBond Bangladesh Secretariat
            </h3>
            <div className="space-y-3 text-muted-foreground">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                <span>Level 7, Red Crescent Bhaban, Moghbazar, Dhaka-1217</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                <span>+880 1712-345678 / +880 2 223381814</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                <span>support@bloodbond.bd</span>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-800 text-xs text-rose-900 dark:text-rose-200 space-y-1">
            <div className="flex items-center gap-1.5 font-bold">
              <ShieldAlert className="w-4 h-4 text-rose-600" />
              <span>National Emergency</span>
            </div>
            <p>For urgent police or ambulance rescue, call 999 directly.</p>
          </div>
        </div>

        <div className="md:col-span-7">
          <div className="p-6 sm:p-8 rounded-3xl bg-card border border-border shadow-sm">
            {sent ? (
              <div className="p-8 text-center space-y-2 bg-bdgreen-50 text-bdgreen-700 rounded-2xl">
                <CheckCircle2 className="w-10 h-10 mx-auto text-bdgreen-600" />
                <h3 className="font-bold text-base">Message Sent Successfully!</h3>
                <p className="text-xs">Our team will get back to you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase text-muted-foreground">Your Name</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-2.5 bg-muted/50 border border-border rounded-xl text-sm text-foreground focus:outline-none"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase text-muted-foreground">Phone</label>
                    <input
                      type="tel"
                      required
                      className="w-full px-4 py-2.5 bg-muted/50 border border-border rounded-xl text-sm text-foreground focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase text-muted-foreground">Email</label>
                    <input
                      type="email"
                      required
                      className="w-full px-4 py-2.5 bg-muted/50 border border-border rounded-xl text-sm text-foreground focus:outline-none"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase text-muted-foreground">Message</label>
                  <textarea
                    rows={4}
                    required
                    className="w-full px-4 py-2.5 bg-muted/50 border border-border rounded-xl text-sm text-foreground focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


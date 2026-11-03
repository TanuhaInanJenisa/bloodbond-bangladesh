"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import {
  HeartHandshake,
  Search,
  Droplet,
  UserPlus,
  Info,
  Calendar,
  PhoneCall,
  LogIn,
  Sun,
  Moon,
  Menu,
  X,
  LayoutDashboard,
  ShieldCheck,
} from "lucide-react";

export const Header: React.FC = () => {
  const pathname = usePathname();
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: t("home"), icon: HeartHandshake },
    { href: "/donors", label: t("findDonor"), icon: Search },
    { href: "/emergency-requests", label: t("requestBlood"), icon: Droplet },
    { href: "/become-a-donor", label: t("becomeDonor"), icon: UserPlus },
    { href: "/campaigns", label: t("campaigns"), icon: Calendar },
    { href: "/awareness", label: t("awareness"), icon: Info },
    { href: "/contact", label: t("contact"), icon: PhoneCall },
  ];

  const isActive = (path: string) => {
    if (path === "/" && pathname !== "/") return false;
    return pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 shadow-sm transition-colors">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 sm:px-6">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-12 h-12 flex-shrink-0 transition-transform group-hover:scale-105">
            <Image
              src="/images/bloodbond-logo.png"
              alt="BloodBond Bangladesh Logo"
              width={48}
              height={48}
              className="w-12 h-12 object-contain"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-xl sm:text-2xl tracking-tight leading-none">
              <span className="text-primary">Blood</span>
              <span className="text-foreground">Bond</span>{" "}
              <span className="text-bdgreen-600">Bangladesh</span>
            </span>
            <span className="text-xs text-muted-foreground font-medium tracking-wide">
              {language === "bn" ? "রক্ত দিন, জীবন বাঁচান" : "Every drop counts..."}
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-sm font-medium transition-all ${
                  active
                    ? "bg-primary text-white shadow-sm"
                    : "text-foreground/80 hover:text-primary hover:bg-blood-100/40 dark:hover:bg-blood-900/20"
                }`}
              >
                <Icon className={`w-4 h-4 ${active ? "text-white" : "text-primary"}`} />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Action Controls & Auth */}
        <div className="hidden md:flex items-center space-x-3">
          {/* Language Switcher */}
          <div className="flex items-center bg-muted rounded-full p-1 border border-border shadow-inner">
            <button
              onClick={() => setLanguage("bn")}
              className={`px-2.5 py-1 text-xs font-bold rounded-full transition-all ${
                language === "bn"
                  ? "bg-primary text-white shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              BN
            </button>
            <button
              onClick={() => setLanguage("en")}
              className={`px-2.5 py-1 text-xs font-bold rounded-full transition-all ${
                language === "en"
                  ? "bg-primary text-white shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              EN
            </button>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="p-2 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
          >
            {theme === "dark" ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
          </button>

          {/* Portal Links */}
          <Link
            href="/dashboard"
            className="hidden xl:flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-secondary hover:bg-muted text-foreground border border-border transition-colors"
          >
            <LayoutDashboard className="w-3.5 h-3.5 text-primary" />
            <span>{t("dashboard")}</span>
          </Link>

          <Link
            href="/admin"
            className="hidden xl:flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-secondary hover:bg-muted text-foreground border border-border transition-colors"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-bdgreen-600" />
            <span>{t("admin")}</span>
          </Link>

          {/* Login & Register Buttons */}
          <Link
            href="/login"
            className="flex items-center gap-1 px-4 py-2 text-xs font-bold text-primary border border-primary/30 rounded-full hover:bg-blood-50 dark:hover:bg-blood-950/30 transition-all shadow-sm"
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>{t("login")}</span>
          </Link>

          <Link
            href="/become-a-donor"
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-primary rounded-full hover:bg-primary-hover transition-all shadow-md shadow-primary/20 hover:scale-105"
          >
            <Droplet className="w-3.5 h-3.5 fill-current" />
            <span>{t("register")}</span>
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center gap-2">
          {/* Quick language toggle for mobile */}
          <button
            onClick={() => setLanguage(language === "bn" ? "en" : "bn")}
            className="px-2 py-1 text-xs font-bold border border-border rounded-md bg-muted text-foreground"
          >
            {language === "bn" ? "English" : "বাংলা"}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-md hover:bg-muted text-foreground"
            aria-label="Open menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-primary" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-border bg-background px-4 py-5 shadow-xl transition-all">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium ${
                    active ? "bg-primary text-white" : "text-foreground hover:bg-muted"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{link.label}</span>
                </Link>
              );
            })}

            <div className="pt-4 border-t border-border flex flex-col gap-2.5">
              <Link
                href="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 py-2.5 rounded-lg bg-secondary text-sm font-semibold"
              >
                <LayoutDashboard className="w-4 h-4 text-primary" />
                <span>{t("dashboard")}</span>
              </Link>
              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 py-2.5 rounded-lg bg-secondary text-sm font-semibold"
              >
                <ShieldCheck className="w-4 h-4 text-bdgreen-600" />
                <span>{t("admin")}</span>
              </Link>
              <div className="grid grid-cols-2 gap-2 pt-2">
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-1.5 py-2.5 rounded-lg border border-primary text-primary text-sm font-bold"
                >
                  <LogIn className="w-4 h-4" />
                  <span>{t("login")}</span>
                </Link>
                <Link
                  href="/become-a-donor"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-1.5 py-2.5 rounded-lg bg-primary text-white text-sm font-bold shadow-md shadow-primary/20"
                >
                  <Droplet className="w-4 h-4 fill-current" />
                  <span>{t("register")}</span>
                </Link>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};


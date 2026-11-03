import type { Metadata, Viewport } from "next";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const viewport: Viewport = {
  themeColor: "#C62828",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://bloodbond.bd"),
  title: "BloodBond Bangladesh | Nationwide Digital Blood Donation Platform",
  description:
    "Donate Blood, Save Lives. BloodBond Bangladesh connects blood donors, patients, hospitals, and volunteer organizations across all 64 districts of Bangladesh.",
  keywords: [
    "Blood donation Bangladesh",
    "Find blood donor Dhaka",
    "Emergency blood request Bangladesh",
    "BloodBond Bangladesh",
    "Rokto Dan Bangladesh",
    "Roktodata",
  ],
  authors: [{ name: "BloodBond Bangladesh Team" }],
  icons: {
    icon: "/images/bloodbond-logo.png",
    apple: "/images/bloodbond-logo.png",
  },
  openGraph: {
    title: "BloodBond Bangladesh - Donate Blood, Save Lives",
    description: "Nationwide Digital Blood Donation & Emergency Donor Network in Bangladesh.",
    url: "https://bloodbond.bd",
    siteName: "BloodBond Bangladesh",
    images: [
      {
        url: "/images/bloodbond-logo.png",
        width: 800,
        height: 600,
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col font-sans bg-background text-foreground antialiased selection:bg-blood-100 selection:text-primary">
        <ThemeProvider>
          <LanguageProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

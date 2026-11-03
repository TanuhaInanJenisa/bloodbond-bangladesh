"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Heart, Activity, Droplet, Sparkles, ShieldCheck } from "lucide-react";

export const HeroHeartPulse: React.FC = () => {
  const { language } = useLanguage();

  return (
    <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-neutral-800 bg-gradient-to-br from-neutral-950 via-[#1a0505] to-[#2a0808] flex items-center justify-center p-6 group">
      {/* Ambient background glow circles */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(198,40,40,0.35)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 sm:w-80 sm:h-80 bg-primary/20 rounded-full blur-3xl animate-pulse pointer-events-none" />

      {/* Floating Badge 1: Live Pulse / BPM */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-white shadow-lg">
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
        </span>
        <span className="text-[11px] font-mono font-bold tracking-wider text-emerald-300">
          LIVE PULSE • 72 BPM
        </span>
      </div>

      {/* Floating Badge 2: 1 Bag = 3 Lives */}
      <div className="absolute top-4 right-4 z-20 hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-white shadow-lg">
        <Droplet className="w-3.5 h-3.5 text-primary fill-current animate-bounce" />
        <span className="text-[11px] font-bold text-white/90">
          {language === "bn" ? "১ ব্যাগ = ৩টি জীবন" : "1 Bag = 3 Lives Saved"}
        </span>
      </div>

      {/* The Central Red Heart with Running White Pulse */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        {/* Heart container with rhythmic heartbeat bounce */}
        <div className="relative w-56 h-56 sm:w-64 sm:h-64 flex items-center justify-center animate-[heartbeat_1.8s_ease-in-out_infinite]">
          {/* Outer glowing aura */}
          <div className="absolute inset-0 rounded-full bg-primary/30 blur-2xl transform scale-110" />

          {/* SVG Red Heart & White Pulse Line */}
          <svg
            viewBox="0 0 200 185"
            className="w-full h-full drop-shadow-[0_15px_35px_rgba(198,40,40,0.6)]"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Deep 3D Red Gradient for Heart */}
              <linearGradient id="heartGrad" x1="20" y1="20" x2="180" y2="180" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#EF4444" />
                <stop offset="35%" stopColor="#C62828" />
                <stop offset="100%" stopColor="#7F1D1D" />
              </linearGradient>

              {/* Heart Inner Radial Highlight */}
              <radialGradient id="heartHighlight" cx="35%" cy="30%" r="60%">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.4" />
                <stop offset="50%" stopColor="#EF4444" stopOpacity="0" />
              </radialGradient>

              {/* White Pulse Glow Filter */}
              <filter id="whiteGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Red Heart Solid Path */}
            <path
              d="M100,165 C100,165 20,115 20,60 C20,28 43,15 68,15 C85,15 95,27 100,35 C105,27 115,15 132,15 C157,15 180,28 180,60 C180,115 100,165 100,165 Z"
              fill="url(#heartGrad)"
              stroke="#B71C1C"
              strokeWidth="2"
            />

            {/* Heart 3D Gloss Overlay */}
            <path
              d="M100,165 C100,165 20,115 20,60 C20,28 43,15 68,15 C85,15 95,27 100,35 C105,27 115,15 132,15 C157,15 180,28 180,60 C180,115 100,165 100,165 Z"
              fill="url(#heartHighlight)"
            />

            {/* Subtle ECG track (dim background line) */}
            <path
              d="M 30,75 L 55,75 L 63,65 L 70,85 L 78,40 L 88,110 L 96,75 L 105,75 L 115,60 L 125,75 L 170,75"
              stroke="rgba(255, 255, 255, 0.2)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* ACTIVE WHITE RUNNING PULSE LINE (Animated stroke) */}
            <path
              d="M 30,75 L 55,75 L 63,65 L 70,85 L 78,40 L 88,110 L 96,75 L 105,75 L 115,60 L 125,75 L 170,75"
              stroke="#FFFFFF"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#whiteGlow)"
              className="pulse-path"
            />

            {/* Leading Pulse Spark/Dot travelling across */}
            <circle r="3.5" fill="#FFFFFF" filter="url(#whiteGlow)">
              <animateMotion
                path="M 30,75 L 55,75 L 63,65 L 70,85 L 78,40 L 88,110 L 96,75 L 105,75 L 115,60 L 125,75 L 170,75"
                dur="1.8s"
                repeatCount="indefinite"
              />
            </circle>
          </svg>
        </div>
      </div>

      {/* Floating Bottom Card: Slogan */}
      <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between p-3 rounded-2xl bg-black/60 backdrop-blur-md border border-white/15 text-white shadow-xl">
        <div className="space-y-0.5">
          <div className="text-xs sm:text-sm font-extrabold text-white flex items-center gap-1.5">
            <Activity className="w-4 h-4 text-primary animate-pulse" />
            <span>Donate Blood, Save Lives</span>
          </div>
          <div className="text-[10px] sm:text-xs text-white/80">
            {language === "bn"
              ? "আপনার রক্তের প্রতি স্পন্দনে বেঁচে থাকে অন্যের জীবন"
              : "Every beat connects a voluntary donor with a patient in need."}
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-xl bg-primary/80 text-[10px] font-bold text-white shadow-md">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Active</span>
        </div>
      </div>

      {/* Embedded CSS for animations */}
      <style jsx>{`
        @keyframes heartbeat {
          0%,
          100% {
            transform: scale(1);
          }
          14% {
            transform: scale(1.07);
          }
          28% {
            transform: scale(1);
          }
          42% {
            transform: scale(1.09);
          }
          70% {
            transform: scale(1);
          }
        }

        .pulse-path {
          stroke-dasharray: 60 180;
          stroke-dashoffset: 240;
          animation: pulseRun 1.8s linear infinite;
        }

        @keyframes pulseRun {
          0% {
            stroke-dashoffset: 240;
          }
          100% {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </div>
  );
};


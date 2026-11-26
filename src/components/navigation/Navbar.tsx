"use client";

import React, { useEffect, useState } from "react";
import { Menu, Calendar } from "lucide-react";
import { PalaceLogo } from "@/components/brand/PalaceLogo";
import { usePalaceScroll } from "@/components/animation/ScrollController";

export type NavTheme = "hero" | "dark" | "light";

interface NavbarProps {
  onOpenMenu: () => void;
  onOpenBooking: () => void;
}

const SECTION_THEMES: { id: string; theme: "dark" | "light" }[] = [
  { id: "arrival", theme: "dark" },
  { id: "palace", theme: "light" },
  { id: "stay", theme: "light" },
  { id: "dining", theme: "dark" },
  { id: "experiences", theme: "light" },
  { id: "departure", theme: "dark" },
];

export function Navbar({ onOpenMenu, onOpenBooking }: NavbarProps) {
  const { scrollToSection } = usePalaceScroll();
  const [navState, setNavState] = useState<NavTheme>("hero");

  useEffect(() => {
    const evaluateTheme = () => {
      const y = window.scrollY;
      if (y < 120) {
        setNavState("hero");
        return;
      }

      const probeY = y + 84;
      let active: "dark" | "light" = "dark";
      for (const sec of SECTION_THEMES) {
        const el = document.getElementById(sec.id);
        if (!el) continue;
        const top = el.offsetTop;
        const bottom = top + el.offsetHeight;
        if (probeY >= top && probeY < bottom) {
          active = sec.theme;
          break;
        }
      }
      setNavState(active);
    };

    evaluateTheme();
    window.addEventListener("scroll", evaluateTheme, { passive: true });
    window.addEventListener("resize", evaluateTheme);
    return () => {
      window.removeEventListener("scroll", evaluateTheme);
      window.removeEventListener("resize", evaluateTheme);
    };
  }, []);

  const isLight = navState === "light";

  const barClasses =
    navState === "hero"
      ? "bg-gradient-to-b from-walnut/80 via-walnut/40 to-transparent text-cream border-b border-transparent"
      : isLight
      ? "bg-cream/90 backdrop-blur-md text-walnut border-b border-sandstone/20 shadow-[0_6px_30px_-12px_rgba(41,37,31,0.12)]"
      : "bg-walnut/88 backdrop-blur-md text-cream border-b border-gold/15 shadow-[0_6px_30px_-12px_rgba(0,0,0,0.45)]";

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ease-out ${barClasses}`}
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-12 h-16 sm:h-20 flex items-center justify-between gap-2">
        {/* Left: Minimal Menu Button + Desktop Quick Links */}
        <div className="flex items-center gap-6 lg:gap-8">
          <button
            type="button"
            onClick={onOpenMenu}
            aria-label="Open palace navigation menu"
            className={`group inline-flex items-center gap-2.5 text-[11px] font-sans font-medium tracking-[0.24em] uppercase transition-colors cursor-pointer ${
              isLight ? "text-walnut hover:text-sandstone" : "text-cream hover:text-gold"
            }`}
          >
            <Menu className="w-4 h-4 stroke-[1.5]" />
            <span>Menu</span>
          </button>

          <nav aria-label="Primary chapters" className="hidden xl:flex items-center gap-6">
            {[
              { label: "The Palace", id: "palace" },
              { label: "Stay", id: "stay" },
              { label: "Dining", id: "dining" },
              { label: "Experiences", id: "experiences" },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToSection(item.id)}
                className={`text-[11px] font-sans tracking-[0.18em] uppercase transition-opacity hover:opacity-100 opacity-75 cursor-pointer ${
                  isLight ? "text-walnut" : "text-ivory"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Center: ABC HOTEL Wordmark + Emblem */}
        <button
          type="button"
          onClick={() => scrollToSection("arrival")}
          aria-label="Return to ABC HOTEL Arrival"
          className="cursor-pointer transition-transform duration-300 hover:opacity-90"
        >
          <PalaceLogo
            layout="inline"
            tone={isLight ? "walnut" : "ivory"}
            showSubtitle={navState !== "hero"}
          />
        </button>

        {/* Right: Contact link (desktop) + Reserve CTA */}
        <div className="flex items-center gap-6">
          <button
            type="button"
            onClick={() => scrollToSection("contact")}
            className={`hidden md:inline-block text-[11px] font-sans tracking-[0.18em] uppercase transition-opacity opacity-75 hover:opacity-100 cursor-pointer ${
              isLight ? "text-walnut" : "text-ivory"
            }`}
          >
            Contact
          </button>

          <button
            type="button"
            onClick={onOpenBooking}
            className={`inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 text-[10px] sm:text-[11px] font-sans font-medium tracking-[0.18em] sm:tracking-[0.2em] uppercase border transition-all duration-300 cursor-pointer shrink-0 ${
              isLight
                ? "border-walnut/70 text-walnut hover:bg-walnut hover:text-cream"
                : "border-gold/65 text-cream hover:bg-gold hover:text-walnut"
            }`}
          >
            <Calendar className="w-3.5 h-3.5 stroke-[1.5]" />
            <span>Reserve</span>
          </button>
        </div>
      </div>
    </header>
  );
}

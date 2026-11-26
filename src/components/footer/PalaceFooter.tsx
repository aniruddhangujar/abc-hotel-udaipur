"use client";

import React from "react";
import { MapPin, Phone, Mail } from "lucide-react";
import { PalaceLogo } from "@/components/brand/PalaceLogo";
import { ArchitecturalDivider } from "@/components/brand/HeritageMotifs";
import { BRAND_INFO } from "@/data/palace";
import { usePalaceScroll } from "@/components/animation/ScrollController";

interface PalaceFooterProps {
  onOpenBooking: () => void;
}

export function PalaceFooter({ onOpenBooking }: PalaceFooterProps) {
  const { scrollToSection } = usePalaceScroll();

  return (
    <footer
      id="contact"
      aria-label="ABC HOTEL Footer & Contact"
      className="relative bg-walnut text-cream border-t border-gold/20 pt-20 pb-12 px-6 sm:px-10 lg:px-16"
    >
      <div className="palace-grain absolute inset-0" />

      <div className="relative z-10 mx-auto max-w-[1360px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-10 pb-16">
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <PalaceLogo layout="inline" tone="ivory" showSubtitle />
            <p className="mt-5 font-display italic text-xl text-ivory">
              {BRAND_INFO.tagline}
            </p>
            <p className="mt-3 font-sans text-xs sm:text-[13px] leading-relaxed text-ivory/70 max-w-sm">
              {BRAND_INFO.foundedNote}. A five-star heritage sanctuary on the quiet western
              shoreline of Lake Pichola, Udaipur.
            </p>
            <p className="mt-4 font-sans text-[11px] tracking-[0.22em] text-gold/80">
              {BRAND_INFO.coordinates}
            </p>
          </div>

          {/* Palace Address & Concierge */}
          <div className="lg:col-span-4 space-y-4">
            <p className="font-sans text-[10px] tracking-[0.28em] uppercase text-gold">
              Palace Sanctuary &amp; Reservations
            </p>

            <div className="flex items-start gap-3 text-xs sm:text-sm font-sans text-ivory/80">
              <MapPin className="w-4 h-4 text-gold shrink-0 mt-0.5" />
              <span>{BRAND_INFO.address}</span>
            </div>

            <div className="flex items-center gap-3 text-xs sm:text-sm font-sans text-ivory/80">
              <Phone className="w-4 h-4 text-gold shrink-0" />
              <a
                href={`tel:${BRAND_INFO.phone.replace(/\s+/g, "")}`}
                className="hover:text-gold transition-colors"
              >
                {BRAND_INFO.phone}
              </a>
            </div>

            <div className="flex items-center gap-3 text-xs sm:text-sm font-sans text-ivory/80">
              <Mail className="w-4 h-4 text-gold shrink-0" />
              <a
                href={`mailto:${BRAND_INFO.conciergeEmail}`}
                className="hover:text-gold transition-colors"
              >
                {BRAND_INFO.conciergeEmail}
              </a>
            </div>
          </div>

          {/* Chapter Navigation */}
          <div className="lg:col-span-2">
            <p className="font-sans text-[10px] tracking-[0.28em] uppercase text-gold mb-4">
              Explore
            </p>
            <ul className="space-y-2.5 font-sans text-xs sm:text-sm text-ivory/80">
              {[
                { label: "The Palace", id: "palace" },
                { label: "Stay", id: "stay" },
                { label: "The Royal Table", id: "dining" },
                { label: "Experiences", id: "experiences" },
                { label: "Departure", id: "departure" },
              ].map((link) => (
                <li key={link.id}>
                  <button
                    type="button"
                    onClick={() => scrollToSection(link.id)}
                    className="hover:text-gold transition-colors cursor-pointer"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Direct Reservations & Social */}
          <div className="lg:col-span-2 flex flex-col justify-between">
            <div>
              <p className="font-sans text-[10px] tracking-[0.28em] uppercase text-gold mb-4">
                Reservations
              </p>
              <button
                type="button"
                onClick={onOpenBooking}
                className="px-5 py-3 border border-gold/65 text-gold font-sans text-[10px] tracking-[0.22em] uppercase hover:bg-gold hover:text-walnut transition-colors cursor-pointer"
              >
                Check Availability
              </button>
            </div>

            <div className="mt-8">
              <p className="font-sans text-[10px] tracking-[0.28em] uppercase text-gold mb-3">
                Dispatches
              </p>
              <div className="flex items-center gap-5 font-sans text-xs text-ivory/75">
                <a href="#contact" className="hover:text-gold transition-colors">
                  Instagram
                </a>
                <a href="#contact" className="hover:text-gold transition-colors">
                  Journal
                </a>
              </div>
            </div>
          </div>
        </div>

        <ArchitecturalDivider tone="ivory" className="mb-8" />

        {/* Legal Strip */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-sans text-[11px] text-ivory/55">
          <p>
            © {new Date().getFullYear()} ABC HOTEL Udaipur. A Fictional Heritage Boutique
            Palace Portfolio Showcase.
          </p>
          <div className="flex flex-wrap gap-6">
            <span>Privacy Policy</span>
            <span>Heritage Conservation</span>
            <span>Guest Terms</span>
          </div>
        </div>
      </div>
    </footer>
  );
}


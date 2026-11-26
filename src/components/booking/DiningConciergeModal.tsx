"use client";

import React, { useEffect, useRef, useState } from "react";
import { X, CheckCircle2, Clock } from "lucide-react";
import { PalaceEmblem } from "@/components/brand/PalaceLogo";

interface DiningConciergeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DiningConciergeModal({ isOpen, onClose }: DiningConciergeModalProps) {
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const [venue, setVenue] = useState("Darbar Rasoi — Candlelit Vaults");
  const [date, setDate] = useState("2026-11-20");
  const [seatingTime, setSeatingTime] = useState("20:00");
  const [guests, setGuests] = useState("2 Guests");
  const [dietary, setDietary] = useState("Chef's Royal Heritage Tasting");
  const [guestName, setGuestName] = useState("");
  const [confirmedRef, setConfirmedRef] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    closeBtnRef.current?.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", handleKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = `ABC-TBL-${Math.floor(1000 + Math.random() * 9000)}`;
    setConfirmedRef(code);
  };

  const resetAndClose = () => {
    setConfirmedRef(null);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="dining-modal-title"
      className="fixed inset-0 z-[85] flex items-center justify-center bg-walnut/85 backdrop-blur-md p-4 sm:p-6"
      onClick={(e) => {
        if (e.target === e.currentTarget) resetAndClose();
      }}
    >
      <div className="relative w-full max-w-xl bg-walnut text-cream border border-gold/35 p-6 sm:p-8 lg:p-10 shadow-2xl max-h-[92vh] overflow-y-auto">
        <div className="flex items-start justify-between gap-4 border-b border-ivory/15 pb-5">
          <div>
            <p className="font-sans text-[10px] tracking-[0.28em] uppercase text-gold">
              The Royal Table · Concierge
            </p>
            <h2 id="dining-modal-title" className="mt-1 font-display text-2xl sm:text-3xl text-cream">
              Reserve a Table
            </h2>
          </div>

          <button
            ref={closeBtnRef}
            type="button"
            onClick={resetAndClose}
            aria-label="Close table reservation dialog"
            className="text-ivory/75 hover:text-gold transition-colors cursor-pointer p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {confirmedRef ? (
          <div className="py-10 text-center flex flex-col items-center">
            <PalaceEmblem size={42} className="text-gold mb-4" />
            <CheckCircle2 className="w-8 h-8 text-gold mb-3" />
            <p className="font-sans text-[10px] tracking-[0.28em] uppercase text-gold">
              Table Reserved · {confirmedRef}
            </p>
            <h3 className="mt-2 font-display text-2xl sm:text-3xl text-cream">
              We look forward to hosting you
              {guestName.trim() ? `, ${guestName.trim()}` : ""}.
            </h3>
            <p className="mt-3 max-w-md font-sans text-sm text-ivory/80 leading-relaxed">
              {venue} · {date} at {seatingTime} for {guests} ({dietary}). Our sommelier
              and kitchen team will welcome you fifteen minutes prior on the veranda.
            </p>
            <button
              type="button"
              onClick={resetAndClose}
              className="mt-8 px-6 py-3 border border-gold text-gold font-sans text-[11px] tracking-[0.22em] uppercase hover:bg-gold hover:text-walnut transition-colors cursor-pointer"
            >
              Return to Dining
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            <div>
              <label
                htmlFor="dining-venue"
                className="block font-sans text-[10px] tracking-[0.24em] uppercase text-gold mb-2"
              >
                Dining Room
              </label>
              <select
                id="dining-venue"
                value={venue}
                onChange={(e) => setVenue(e.target.value)}
                className="w-full bg-charcoal border border-ivory/20 px-4 py-3 text-sm text-cream focus:border-gold focus:outline-none"
              >
                <option>Darbar Rasoi — Candlelit Vaults</option>
                <option>The Chandni Terrace — Lakeside Open Air</option>
                <option>Private Sunset Chhatri (Up to 6 Guests)</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="dining-date"
                  className="block font-sans text-[10px] tracking-[0.24em] uppercase text-gold mb-2"
                >
                  Evening Date
                </label>
                <input
                  id="dining-date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                  className="w-full bg-charcoal border border-ivory/20 px-4 py-3 text-sm text-cream focus:border-gold focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="dining-time"
                  className="block font-sans text-[10px] tracking-[0.24em] uppercase text-gold mb-2"
                >
                  Seating Time
                </label>
                <select
                  id="dining-time"
                  value={seatingTime}
                  onChange={(e) => setSeatingTime(e.target.value)}
                  className="w-full bg-charcoal border border-ivory/20 pl-3.5 pr-9 py-3 text-sm text-cream focus:border-gold focus:outline-none truncate"
                >
                  <option value="13:00">13:00 · Royal Lunch</option>
                  <option value="19:15">19:15 · First Twilight Seating</option>
                  <option value="20:00">20:00 · Candlelit Main Seating</option>
                  <option value="21:15">21:15 · Late Courtyard Seating</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="dining-guests"
                  className="block font-sans text-[10px] tracking-[0.24em] uppercase text-gold mb-2"
                >
                  Party Size
                </label>
                <select
                  id="dining-guests"
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="w-full bg-charcoal border border-ivory/20 px-4 py-3 text-sm text-cream focus:border-gold focus:outline-none"
                >
                  <option>2 Guests</option>
                  <option>4 Guests</option>
                  <option>6 Guests</option>
                  <option>8 Guests (Private Alcove)</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="dining-dietary"
                  className="block font-sans text-[10px] tracking-[0.24em] uppercase text-gold mb-2"
                >
                  Culinary Preference
                </label>
                <select
                  id="dining-dietary"
                  value={dietary}
                  onChange={(e) => setDietary(e.target.value)}
                  className="w-full bg-charcoal border border-ivory/20 px-4 py-3 text-sm text-cream focus:border-gold focus:outline-none"
                >
                  <option>Chef&apos;s Royal Heritage Tasting</option>
                  <option>Vegetarian Mewar Tasting</option>
                  <option>Jain (Root-Free) Tasting</option>
                  <option>À La Carte Selection</option>
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor="dining-name"
                className="block font-sans text-[10px] tracking-[0.24em] uppercase text-gold mb-2"
              >
                Guest Name
              </label>
              <input
                id="dining-name"
                type="text"
                placeholder="Your full name or suite number"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                required
                className="w-full bg-charcoal border border-ivory/20 px-4 py-3 text-sm text-cream placeholder:text-ivory/40 focus:border-gold focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-2 text-xs text-ivory/65 pt-1">
              <Clock className="w-3.5 h-3.5 text-gold shrink-0" />
              <span>Dinner service 19:00 – 23:30 · Dress code: Resort Evening Formal</span>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-gold text-walnut font-sans text-[11px] font-medium tracking-[0.24em] uppercase hover:bg-cream transition-colors cursor-pointer"
            >
              Confirm Table Request
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

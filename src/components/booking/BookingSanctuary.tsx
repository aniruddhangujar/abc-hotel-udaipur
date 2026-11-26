"use client";

import React, { useEffect, useState } from "react";
import { CalendarDays, Users, BedDouble, CheckCircle2, Sparkles } from "lucide-react";
import { ROOM_CATEGORIES } from "@/data/rooms";
import { BRAND_INFO } from "@/data/palace";
import { PalaceEmblem } from "@/components/brand/PalaceLogo";

interface BookingSanctuaryProps {
  preselectedRoomId?: string;
  preselectedExperience?: string | null;
}

/**
 * Interactive Luxury Reservation & Availability Studio embedded in Chapter 06.
 * Allows selecting check-in/out dates, guests, rooms, and category with instant
 * tariff calculation and bespoke concierge itinerary reference generation.
 */
export function BookingSanctuary({
  preselectedRoomId,
  preselectedExperience,
}: BookingSanctuaryProps) {
  const [checkIn, setCheckIn] = useState("2026-12-10");
  const [checkOut, setCheckOut] = useState("2026-12-13");
  const [guests, setGuests] = useState(2);
  const [roomsCount, setRoomsCount] = useState(1);
  const [selectedRoomId, setSelectedRoomId] = useState(
    preselectedRoomId || ROOM_CATEGORIES[0].id
  );
  const [experienceNote, setExperienceNote] = useState(preselectedExperience || "");
  const [guestEmail, setGuestEmail] = useState("");
  const [availabilityChecked, setAvailabilityChecked] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [refCode, setRefCode] = useState<string>("");

  useEffect(() => {
    if (preselectedRoomId) {
      setSelectedRoomId(preselectedRoomId);
      setAvailabilityChecked(false);
    }
  }, [preselectedRoomId]);

  useEffect(() => {
    if (preselectedExperience) {
      setExperienceNote(preselectedExperience);
      setAvailabilityChecked(false);
    }
  }, [preselectedExperience]);

  const activeCategory =
    ROOM_CATEGORIES.find((r) => r.id === selectedRoomId) ?? ROOM_CATEGORIES[0];

  const calculateNights = (): number => {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diff = Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    return diff;
  };

  const nights = Math.max(1, calculateNights());
  const estimatedTotal = activeCategory.startingPriceInr * nights * roomsCount;

  const formatInr = (value: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);

  const handleCheckAvailability = (e: React.FormEvent) => {
    e.preventDefault();
    const diff = calculateNights();
    if (!Number.isFinite(diff) || diff <= 0) {
      setErrorMsg("Check-out date must follow check-in date by at least one night.");
      setAvailabilityChecked(false);
      return;
    }
    setErrorMsg(null);
    setRefCode(`ABC-UDR-${Math.floor(10000 + Math.random() * 89999)}`);
    setAvailabilityChecked(true);
  };

  return (
    <div
      id="reserve"
      className="relative mx-auto max-w-[1160px] bg-cream text-walnut border border-gold/40 p-6 sm:p-10 lg:p-14 shadow-[0_32px_90px_rgba(0,0,0,0.45)]"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-sandstone/25">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-sandstone font-medium">
              Direct Palace Reservations
            </span>
            <span className="text-sandstone/40">·</span>
            <span className="font-devanagari text-xs text-terracotta">आरक्षण</span>
          </div>
          <h3 className="font-display text-3xl sm:text-4xl text-walnut">
            Reserve Your Sanctuary
          </h3>
        </div>

        <p className="font-sans text-xs text-charcoal/75 max-w-sm">
          Direct reservations include private Udaipur airport chauffeur transfer,
          arrival lotus ceremonial welcome, and breakfast in the courtyard.
        </p>
      </div>

      <form onSubmit={handleCheckAvailability} className="mt-8 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Check-in Date */}
          <div>
            <label
              htmlFor="booking-checkin"
              className="flex items-center gap-2 font-sans text-[10px] tracking-[0.22em] uppercase text-sandstone mb-2"
            >
              <CalendarDays className="w-3.5 h-3.5" />
              <span>Check-in Date</span>
            </label>
            <input
              id="booking-checkin"
              type="date"
              value={checkIn}
              onChange={(e) => {
                setCheckIn(e.target.value);
                setAvailabilityChecked(false);
              }}
              required
              className="w-full bg-ivory/60 border border-sandstone/35 px-4 py-3.5 font-sans text-sm text-walnut focus:border-walnut focus:outline-none"
            />
          </div>

          {/* Check-out Date */}
          <div>
            <label
              htmlFor="booking-checkout"
              className="flex items-center gap-2 font-sans text-[10px] tracking-[0.22em] uppercase text-sandstone mb-2"
            >
              <CalendarDays className="w-3.5 h-3.5" />
              <span>Check-out Date</span>
            </label>
            <input
              id="booking-checkout"
              type="date"
              value={checkOut}
              onChange={(e) => {
                setCheckOut(e.target.value);
                setAvailabilityChecked(false);
              }}
              required
              className="w-full bg-ivory/60 border border-sandstone/35 px-4 py-3.5 font-sans text-sm text-walnut focus:border-walnut focus:outline-none"
            />
          </div>

          {/* Number of Guests */}
          <div>
            <label
              htmlFor="booking-guests"
              className="flex items-center gap-2 font-sans text-[10px] tracking-[0.22em] uppercase text-sandstone mb-2"
            >
              <Users className="w-3.5 h-3.5" />
              <span>Number of Guests</span>
            </label>
            <select
              id="booking-guests"
              value={guests}
              onChange={(e) => {
                setGuests(Number(e.target.value));
                setAvailabilityChecked(false);
              }}
              className="w-full bg-ivory/60 border border-sandstone/35 px-4 py-3.5 font-sans text-sm text-walnut focus:border-walnut focus:outline-none"
            >
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <option key={n} value={n}>
                  {n} {n === 1 ? "Guest" : "Guests"}
                </option>
              ))}
            </select>
          </div>

          {/* Number of Rooms */}
          <div>
            <label
              htmlFor="booking-rooms"
              className="flex items-center gap-2 font-sans text-[10px] tracking-[0.22em] uppercase text-sandstone mb-2"
            >
              <BedDouble className="w-3.5 h-3.5" />
              <span>Number of Rooms</span>
            </label>
            <select
              id="booking-rooms"
              value={roomsCount}
              onChange={(e) => {
                setRoomsCount(Number(e.target.value));
                setAvailabilityChecked(false);
              }}
              className="w-full bg-ivory/60 border border-sandstone/35 px-4 py-3.5 font-sans text-sm text-walnut focus:border-walnut focus:outline-none"
            >
              {[1, 2, 3, 4].map((n) => (
                <option key={n} value={n}>
                  {n} {n === 1 ? "Suite / Room" : "Suites / Rooms"}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Suite Category Selection + Optional Concierge Notes */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-end">
          <div className="lg:col-span-5">
            <label
              htmlFor="booking-category"
              className="block font-sans text-[10px] tracking-[0.22em] uppercase text-sandstone mb-2"
            >
              Accommodation Category
            </label>
            <select
              id="booking-category"
              value={selectedRoomId}
              onChange={(e) => {
                setSelectedRoomId(e.target.value);
                setAvailabilityChecked(false);
              }}
              className="w-full bg-ivory/60 border border-sandstone/35 px-4 py-3.5 font-sans text-sm text-walnut focus:border-walnut focus:outline-none"
            >
              {ROOM_CATEGORIES.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name} — {r.priceDisplay} / night
                </option>
              ))}
            </select>
          </div>

          <div className="lg:col-span-4">
            <label
              htmlFor="booking-email"
              className="block font-sans text-[10px] tracking-[0.22em] uppercase text-sandstone mb-2"
            >
              Guest Email (Optional for Dossier)
            </label>
            <input
              id="booking-email"
              type="email"
              placeholder="name@domain.com"
              value={guestEmail}
              onChange={(e) => setGuestEmail(e.target.value)}
              className="w-full bg-ivory/60 border border-sandstone/35 px-4 py-3.5 font-sans text-sm text-walnut placeholder:text-charcoal/45 focus:border-walnut focus:outline-none"
            />
          </div>

          <div className="lg:col-span-3">
            <button
              type="submit"
              className="w-full py-4 px-6 bg-walnut text-cream font-sans text-[11px] font-medium tracking-[0.22em] uppercase hover:bg-terracotta transition-colors cursor-pointer"
            >
              Check Availability
            </button>
          </div>
        </div>

        {experienceNote && (
          <div className="flex items-center justify-between gap-4 px-4 py-3 bg-ivory/80 border border-olive/35 text-xs font-sans text-walnut">
            <span className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-olive shrink-0" />
              <span>
                Bespoke experience request attached:{" "}
                <strong className="font-medium">{experienceNote}</strong>
              </span>
            </span>
            <button
              type="button"
              onClick={() => setExperienceNote("")}
              className="text-terracotta underline cursor-pointer"
            >
              Clear
            </button>
          </div>
        )}

        {errorMsg && (
          <p role="alert" className="font-sans text-xs text-terracotta font-medium">
            {errorMsg}
          </p>
        )}
      </form>

      {/* Availability Confirmation Panel */}
      {availabilityChecked && (
        <div
          role="status"
          aria-live="polite"
          className="mt-8 p-6 sm:p-8 bg-walnut text-cream border border-gold/40 flex flex-col lg:flex-row lg:items-center justify-between gap-6"
        >
          <div className="flex items-start gap-4">
            <PalaceEmblem size={36} className="text-gold shrink-0 mt-1 hidden sm:block" />
            <div>
              <div className="flex items-center gap-2 text-gold font-sans text-[10px] tracking-[0.28em] uppercase">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Sanctuary Available · Reference {refCode}</span>
              </div>
              <h4 className="mt-1.5 font-display text-2xl sm:text-3xl text-cream">
                {roomsCount} × {activeCategory.name}
              </h4>
              <p className="mt-1 font-sans text-xs sm:text-sm text-ivory/80">
                {checkIn} to {checkOut} ({nights}{" "}
                {nights === 1 ? "night" : "nights"}) · {guests}{" "}
                {guests === 1 ? "guest" : "guests"}
                {experienceNote ? ` · Includes ${experienceNote} curation` : ""}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-5 border-t lg:border-t-0 pt-4 lg:pt-0 border-ivory/15">
            <div className="lg:text-right">
              <p className="font-sans text-[10px] tracking-[0.22em] uppercase text-gold/80">
                Estimated Stay Tariff
              </p>
              <p className="font-display text-2xl text-cream">
                {formatInr(estimatedTotal)}
              </p>
              <p className="font-sans text-[11px] text-ivory/60">
                Includes palace breakfast &amp; boat arrival
              </p>
            </div>

            <a
              href={`mailto:${BRAND_INFO.reservationsEmail}?subject=${encodeURIComponent(
                `ABC HOTEL Reservation Request (${refCode})`
              )}&body=${encodeURIComponent(
                `Sanctuary: ${activeCategory.name}\nDates: ${checkIn} to ${checkOut}\nGuests: ${guests}, Rooms: ${roomsCount}\nExperience: ${
                  experienceNote || "Standard Royal Welcome"
                }`
              )}`}
              className="px-6 py-3.5 bg-gold text-walnut font-sans text-[11px] font-medium tracking-[0.22em] uppercase text-center hover:bg-cream transition-colors"
            >
              Hold via Concierge
            </a>
          </div>
        </div>
      )}
    </div>
  );
}


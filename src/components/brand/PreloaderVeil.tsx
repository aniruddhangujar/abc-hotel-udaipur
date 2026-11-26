"use client";

import React, { useEffect, useState } from "react";
import { PalaceEmblem } from "./PalaceLogo";

interface PreloaderVeilProps {
  ready: boolean;
}

export function PreloaderVeil({ ready }: PreloaderVeilProps) {
  const [dismissed, setDismissed] = useState(false);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    // Hard safety timeout so visitors are never blocked beyond 1.6s
    const safetyTimer = window.setTimeout(() => {
      setFading(true);
      window.setTimeout(() => setDismissed(true), 700);
    }, 1600);

    return () => window.clearTimeout(safetyTimer);
  }, []);

  useEffect(() => {
    if (!ready || fading) return;
    const minPaintTimer = window.setTimeout(() => {
      setFading(true);
      window.setTimeout(() => setDismissed(true), 750);
    }, 350);
    return () => window.clearTimeout(minPaintTimer);
  }, [ready, fading]);

  if (dismissed) return null;

  return (
    <div
      aria-hidden={fading}
      className={`fixed inset-0 z-[90] flex flex-col items-center justify-center bg-walnut text-cream transition-opacity duration-700 ease-out ${
        fading ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="palace-grain absolute inset-0" />
      <div className="relative flex flex-col items-center text-center px-6">
        <PalaceEmblem size={46} className="text-gold mb-4 animate-pulse" />
        <p className="font-display text-xl sm:text-2xl tracking-[0.3em] uppercase text-cream pl-[0.3em]">
          ABC HOTEL
        </p>
        <p className="mt-2 font-devanagari text-xs tracking-[0.2em] text-gold/80">
          उदयपुर · राजस्थान
        </p>
        <div className="mt-8 w-36 h-px bg-ivory/15 overflow-hidden">
          <div
            className={`h-full bg-gold transition-all duration-700 ease-out ${
              ready ? "w-full" : "w-2/3"
            }`}
          />
        </div>
        <p className="mt-3 font-sans text-[10px] tracking-[0.28em] uppercase text-ivory/55">
          Where History Welcomes You
        </p>
      </div>
    </div>
  );
}


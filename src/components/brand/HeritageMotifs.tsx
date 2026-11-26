import React from "react";

interface DividerProps {
  tone?: "ivory" | "walnut";
  className?: string;
}

/**
 * Handcrafted architectural rule bisected by a cusped diamond-lotus glyph.
 */
export function ArchitecturalDivider({ tone = "walnut", className = "" }: DividerProps) {
  const lineColor = tone === "walnut" ? "bg-sandstone/35" : "bg-gold/35";
  const glyphColor = tone === "walnut" ? "text-sandstone" : "text-gold";

  return (
    <div className={`flex items-center gap-4 w-full ${className}`} aria-hidden="true">
      <div className={`h-px flex-1 ${lineColor}`} />
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        className={`${glyphColor} shrink-0`}
      >
        <path
          d="M9 1.5L13 9L9 16.5L5 9L9 1.5Z"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinejoin="round"
        />
        <circle cx="9" cy="9" r="1.4" fill="currentColor" />
      </svg>
      <div className={`h-px flex-1 ${lineColor}`} />
    </div>
  );
}

interface CornerFrameProps {
  tone?: "ivory" | "walnut";
  className?: string;
  children: React.ReactNode;
}

/**
 * Subtle jaali-inspired architectural mitered corner hairlines framing primary photography.
 */
export function JaaliCornerFrame({
  tone = "walnut",
  className = "",
  children,
}: CornerFrameProps) {
  const borderTone = tone === "walnut" ? "border-sandstone/45" : "border-gold/50";

  return (
    <div className={`relative ${className}`}>
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute -top-2 -left-2 w-4 h-4 border-t border-l ${borderTone} z-10`}
      />
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute -top-2 -right-2 w-4 h-4 border-t border-r ${borderTone} z-10`}
      />
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute -bottom-2 -left-2 w-4 h-4 border-b border-l ${borderTone} z-10`}
      />
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute -bottom-2 -right-2 w-4 h-4 border-b border-r ${borderTone} z-10`}
      />
      {children}
    </div>
  );
}

/**
 * Quiet architectural jharokha elevation line drawing used strictly as an understated
 * structural watermark in editorial overlays.
 */
export function JharokhaElevationWatermark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 420 520"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Chhatri dome finial & ribbed cupola */}
      <line x1="210" y1="22" x2="210" y2="54" stroke="currentColor" strokeWidth="1" />
      <circle cx="210" cy="40" r="4" stroke="currentColor" strokeWidth="1" />
      <path
        d="M126 140C132 82 174 58 210 54C246 58 288 82 294 140"
        stroke="currentColor"
        strokeWidth="1"
      />
      <path d="M108 148H312" stroke="currentColor" strokeWidth="1" />
      <path d="M116 158H304" stroke="currentColor" strokeWidth="0.75" opacity="0.65" />

      {/* Outer stone frame & pillars */}
      <rect x="86" y="158" width="248" height="318" stroke="currentColor" strokeWidth="1" />
      <line x1="126" y1="158" x2="126" y2="476" stroke="currentColor" strokeWidth="0.8" />
      <line x1="294" y1="158" x2="294" y2="476" stroke="currentColor" strokeWidth="0.8" />

      {/* Cusped triple jharokha arches */}
      <path
        d="M142 350V242C142 228 152 218 162 212C162 198 174 188 186 184C196 172 204 166 210 162C216 166 224 172 234 184C246 188 258 198 258 212C268 218 278 228 278 242V350"
        stroke="currentColor"
        strokeWidth="1"
      />
      <line x1="126" y1="350" x2="294" y2="350" stroke="currentColor" strokeWidth="1" />
      <line x1="126" y1="410" x2="294" y2="410" stroke="currentColor" strokeWidth="0.75" />

      {/* Subtle jaali lattice grid lines inside plinth */}
      <line x1="168" y1="350" x2="168" y2="410" stroke="currentColor" strokeWidth="0.65" opacity="0.55" />
      <line x1="210" y1="350" x2="210" y2="410" stroke="currentColor" strokeWidth="0.65" opacity="0.55" />
      <line x1="252" y1="350" x2="252" y2="410" stroke="currentColor" strokeWidth="0.65" opacity="0.55" />
      <line x1="60" y1="476" x2="360" y2="476" stroke="currentColor" strokeWidth="1.1" />
    </svg>
  );
}


# Implementation Plan: ABC HOTEL — Udaipur Heritage Palace Digital Experience

## Overview
Build a progressive, award-calibre, scroll-driven luxury hospitality web application for **ABC HOTEL** (Udaipur, Rajasthan) using Next.js (App Router), TypeScript, Tailwind CSS, GSAP + ScrollTrigger, Lenis smooth scroll, HTML5 Canvas pre-rendered WebP image sequences, and bespoke generated architectural & culinary imagery.

## Architecture Decisions
- **Framework:** Next.js App Router + TypeScript + Tailwind CSS v4 with `next/font/google` (`Bodoni Moda`, `Noto Serif Devanagari`, `DM Sans`).
- **Pre-Rendered Canvas Image Sequences:** Offline frame-rendering pipeline (`scripts/render-sequences.mjs`) compositing verified generated master architectural plates with true 3D perspective gate rotation, aperture depth lighting, foreground colonnade parallax, floating golden-hour dust, and silk veil parting into desktop (`1600x900`) and mobile (`750x1100`) WebP sequences (`public/sequences/`).
- **Progressive Preloader (`src/lib/sequence-loader.ts`):** Immediate first-frame paint (`frame-001.webp`), prioritized early buffer (first 16 frames), background batch preloading via concurrency queue, memory-safe `ImageBitmap`/image cache, and automatic `prefers-reduced-motion` static-plate fallback.
- **Modular Structure:**
  - `src/components/brand/`: `PalaceLogo.tsx`, `HeritageMotifs.tsx`, `PreloaderVeil.tsx`
  - `src/components/navigation/`: `Navbar.tsx`, `NavigationOverlay.tsx`
  - `src/components/animation/`: `CanvasSequenceStage.tsx`, `ScrollController.tsx`, `RevealText.tsx`
  - `src/components/chapters/`: `ArrivalChapter.tsx`, `PalaceChapter.tsx`, `StayChapter.tsx`, `DiningChapter.tsx`, `ExperiencesChapter.tsx`, `DepartureChapter.tsx`
  - `src/components/booking/`: `SuiteDossierModal.tsx`, `DiningConciergeModal.tsx`, `BookingSanctuary.tsx`
  - `src/components/footer/`: `PalaceFooter.tsx`

## Task List & Phased Execution

### PHASE 1 — Brand Identity, Typography, Colour System & Visual Reference Board
- [x] Establish Brand Identity & Colour/Type Spec (`docs/01-brand-identity.md`)
- [ ] Generate & inspect all core master architectural plates + photography assets
- [ ] Initialize Next.js project + brand design tokens + typography + bespoke SVG wordmark/emblem (`PalaceLogo`)

### PHASE 2 — Complete Homepage Storyboard & Visual Layouts
- [x] Document 6-chapter storyboard (`docs/02-homepage-storyboard.md`)
- [ ] Create structured hotel data & copy modules (`src/data/palace.ts`, `src/data/rooms.ts`, `src/data/dining.ts`, `src/data/experiences.ts`)
- [ ] Verify layout wireframe & scroll architecture

### PHASE 3 — Entrance Gate-Opening Prototype (GSAP + Canvas Image Sequences)
- [ ] Bake `arrival-desktop` (72 WebP frames) and `arrival-mobile` (36 WebP frames) from verified gate + courtyard plates
- [ ] Implement `sequence-loader.ts` & `CanvasSequenceStage.tsx`
- [ ] Build `ArrivalChapter.tsx` (reversible gate opening + forward dolly into courtyard) and verify in Chrome

### PHASE 4 — Courtyard & Lobby Transition
- [ ] Bake `courtyard-desktop` (60 WebP frames) and `courtyard-mobile` (30 WebP frames) from courtyard + colonnade + lobby plates
- [ ] Build `PalaceChapter.tsx` with architectural pillar/curtain transition & editorial copy
- [ ] Verify seamless scroll flow between Chapters 01 and 02 in Chrome

### PHASE 5 — Accommodation, Dining & Experiences Chapters
- [ ] Generate & inspect bespoke photography for 3 accommodations, 4 plated dishes, and Experiences
- [ ] Build `StayChapter.tsx` (asymmetrical editorial composition + `SuiteDossierModal`)
- [ ] Build `DiningChapter.tsx` (scroll-driven dish scale/rotation choreography + `DiningConciergeModal`)
- [ ] Build `ExperiencesChapter.tsx` (interactive 7-experience editorial showcase)

### PHASE 6 — Departure, Booking Interfaces, Navigation & Footer
- [ ] Bake `departure-desktop` (54 WebP frames) and `departure-mobile` (28 WebP frames)
- [ ] Build `DepartureChapter.tsx` + `BookingSanctuary.tsx` (functional check-in/out, guests, rooms, availability check)
- [ ] Build adaptive `Navbar.tsx`, `NavigationOverlay.tsx`, and `PalaceFooter.tsx`

### PHASE 7 — Mobile, Accessibility, Loading & Performance Optimisation
- [ ] Mobile dedicated sequences & responsive breakpoints (`320px`, `768px`, `1024px`, `1440px`)
- [ ] WCAG 2.1 AA keyboard navigation, focus traps, `prefers-reduced-motion`, ARIA attributes
- [ ] Progressive preloader + `PreloaderVeil` + `next/image` optimization + Vercel deployment config

### PHASE 8 — Final Visual Polish & Verification
- [ ] Full production `npm run build`, lint, and TypeScript check (`npx tsc --noEmit`)
- [ ] End-to-end Chrome DevTools visual, console, network & responsive inspection across all 6 chapters


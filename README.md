# ABC HOTEL — Udaipur Heritage Palace Sanctuary

*Where History Welcomes You.*

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Netlify-00C7B7?style=flat&logo=netlify&logoColor=white)](https://abc-hotel-udaipur.netlify.app)
[![Built with Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat&logo=next.js&logoColor=white)](https://nextjs.org/)

An editorial, scroll-driven luxury hospitality digital experience for **ABC HOTEL** in Udaipur, Rajasthan — crafted with Next.js App Router, TypeScript, Tailwind CSS v4, GSAP ScrollTrigger, Lenis smooth scrolling, and responsive HTML5 Canvas WebP image sequences with sub-frame optical crossfade blending.

🔗 **Live Deployment:** [https://abc-hotel-udaipur.netlify.app](https://abc-hotel-udaipur.netlify.app)

---

## Chapters

1. **The Arrival** — Scroll-controlled 3D-perspective palace gate opening and entry across the threshold (`arrival-desktop` 240 frames / `arrival-mobile` 120 frames).
2. **The Palace** — Courtyard colonnade transit past the central lotus water court and parting raw-silk curtains into the reception sanctum (`courtyard-desktop` 180 frames / `courtyard-mobile` 90 frames).
3. **The Art of Staying** — Asymmetrical editorial showcase of *Heritage Room*, *Royal Suite*, and *The Maharaja Residence* with full architectural dossier modal.
4. **The Royal Table** — Scroll-choreographed culinary presentation with scaling/rotating circular dishes, ingredient provenance, and *Reserve a Table* concierge flow.
5. **Experiences** — Interactive editorial showcase across seven curated Mewari lifestyle offerings.
6. **The Departure & Reservations** — Twilight Lake Pichola camera pull-away sequence (`departure-desktop` 160 frames / `departure-mobile` 80 frames), bespoke availability engine, and heritage footer.

---

## Tech Stack & Architecture

- **Framework:** Next.js 15 (App Router, Static Export)
- **Styling:** Tailwind CSS v4 & custom Rajasthani heritage design tokens
- **Typography:** Bodoni Moda (Display), Noto Serif Devanagari (Cultural accents), DM Sans (UI/Body)
- **Animation & Motion:** Lenis smooth scrolling, GSAP ScrollTrigger
- **Sequence Rendering:** Custom HTML5 Canvas engine with sub-frame optical crossfade blending, frame-rate-independent exponential smoothing, and progressive quad-interleaved preloading
- **Image Pipeline:** Sharp-based headless sequence generator baking 870 WebP frames with bilateral filtering and dynamic portal masks

---

## Local Development

```bash
npm install            # Install dependencies
npm run dev            # Run local development server at http://localhost:3000
npm run bake:sequences # Regenerate desktop & mobile WebP sequences from master plates
npm run build          # Production static export verification
npm run lint           # Run ESLint
```


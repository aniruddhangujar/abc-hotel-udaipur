# PHASE 1 — ABC HOTEL Brand Identity & Visual Direction

**Positioning:** *Indian royal heritage reimagined through contemporary digital luxury.*  
**Location:** Udaipur, Rajasthan, India  
**Tagline:** *Where History Welcomes You.*

---

## 1. Colour System & Material Semantics

Every colour corresponds to physical materials found within a centuries-old Mewar lakeside palace:

| Token | Name | Hex | Material Reference | Primary Usage |
|---|---|---|---|---|
| `--color-walnut` | Midnight Walnut | `#29251F` | Aged carved teak & shadowed stone | Dark architectural chapters, primary ink on ivory, evening scenes |
| `--color-ivory` | Royal Ivory | `#E9DDC7` | Aged Makrana marble & hand-pressed paper | Primary editorial light ground, primary ink on walnut |
| `--color-sandstone` | Burnished Sandstone | `#A66F45` | Sunlit Udaipur sandstone carvings | Architectural accents, active focus highlights, subtle structural markers |
| `--color-olive` | Palace Olive | `#78806A` | Courtyard palms, neem foliage, botanicals | Natural elements, wellness/spa accents, tranquil states |
| `--color-gold` | Antique Gold | `#B99A66` | Patinated brass hardware & manuscript ink | Hairline rules, chapter numerals, minimalist filigree (flat matte only) |
| `--color-terracotta` | Terracotta | `#77483A` | Earthen spice vessels & baked clay | Culinary editorial warmth, secondary accents |
| `--color-charcoal` | Muted Charcoal | `#37332E` | Weathered slate & shaded basalt | Elevated dark surface panels, secondary body ink on ivory |
| `--color-cream` | Warm Cream | `#F5EFE4` | Raw Khadi linen & sunlit plaster | High-key editorial paper surfaces, suite dossiers, quiet negative space |

### Accessibility Contrast Guardrails (WCAG AA)
- **On `#E9DDC7` (Royal Ivory) / `#F5EFE4` (Warm Cream):** Use `#29251F` (Midnight Walnut, >11:1) for headlines & primary body; `#37332E` (Muted Charcoal, >8.5:1) for supporting text; `#77483A` (Terracotta, >5.2:1) or `#7D512F` (darkened sandstone for small legible text labels, avoiding low-contrast gold text on ivory!).
- **On `#29251F` (Midnight Walnut) / `#37332E` (Muted Charcoal):** Use `#F5EFE4` (Warm Cream, >12:1) or `#E9DDC7` (Royal Ivory, >10.5:1) for text; `#B99A66` (Antique Gold, ~5.3:1) for decorative labels and chapter indices; `#A66F45` strictly for larger headlines/accents or borders.
- **No metallic gradients or gaudy gold glow:** All antique gold strokes stay flat matte `#B99A66`.

---

## 2. Typographic Architecture

All fonts loaded cleanly via `next/font/google` with explicit subsets, swap display, and CSS custom variables:

1. **Primary Display — `Bodoni Moda` (`--font-bodoni`)**
   - Weights: `400`, `500`, `600` (Normal & Italic)
   - Used exclusively for: Hero statements, oversized chapter numerals & titles, room names, culinary titles, departure headline.
   - Editorial composition: Tight tracking (`-0.025em` to `-0.015em`) on large scale (`clamp(2.5rem, 6vw, 5.75rem)`), `1.05` line-height.
   - **Accent (`Bodoni Moda Italic`):** Poetic sub-phrases, editorial whispers, dish accompaniments, and closing statements.

2. **Cultural Accent — `Noto Serif Devanagari` (`--font-devanagari`)**
   - Weights: `400`, `500`
   - Used sparingly as quiet architectural seals and chapter whispers (never decorative clutter):
     - Arrival Seal: `उदयपुर · मेवाड़`
     - Chapter 02: `राजमहल`
     - Chapter 03: `विश्राम`
     - Chapter 04: `शाही रसोई`
     - Chapter 05: `अनुभव`
     - Chapter 06: `प्रस्थान`

3. **Interface & Editorial Body — `DM Sans` (`--font-dm-sans`)**
   - Weights: `400`, `500`
   - Used for: Editorial paragraphs (`15px–17px`, `1.68` line-height), navigation items (`11px–12px`, uppercase, `0.2em` tracking), booking form controls, room specifications, legal footer.

---

## 3. Logo & Architectural Emblem Direction

**Wordmark:** `ABC HOTEL` set in uppercase `Bodoni Moda`, weight `500`, optical letter-spacing `0.24em`, accompanied by the quiet sub-caption `UDAIPUR` where needed.

**Monogram Emblem (`<PalaceEmblem />`):**
- Built on authentic Mewar architectural geometry — a crisp single-weight (`1.15px`) vector form combining:
  1. An outer **cusped Rajput *Mehraab* (arch)** framing an inverted-arch jharokha silhouette.
  2. An inner **geometric three-petal lotus crest** aligned along the vertical symmetry axis.
  3. A minimal **carved plinth rule** grounding the base.
- Strictly understated, geometric, scalable down to `20px` favicon and up to `96px` chapter centerpiece. Zero crowns, zero noisy mandalas.

---

## 4. Authentic Indian Heritage Design Language

Purposeful restraint governs every ornamental detail:
- **Architectural Brackets:** Subtle 1px jaali-inspired mitered corner hairlines framing primary editorial plates only.
- **Handcrafted Dividers:** Single `1px` antique-gold/sandstone rules bisected by a centered cusped diamond-lotus glyph (`10px`).
- **Tactile Surface Overlay:** Subtle paper/stone micro-grain SVG filter at `2.5%` opacity to anchor digital surfaces in natural sandstone, lime plaster, and cotton paper.
- **Architectural Transitions:** Scenes part through real carved doors, colonnade columns, scalloped arches, and draped raw-silk curtains—never arbitrary spinning overlays.


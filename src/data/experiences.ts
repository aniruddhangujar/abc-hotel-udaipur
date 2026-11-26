export interface ExperienceItem {
  id: string;
  index: string;
  title: string;
  devanagari: string;
  subtitle: string;
  timing: string;
  duration: string;
  description: string;
  highlight: string;
  image: string;
}

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: "royal-spa",
    index: "01",
    title: "The Royal Spa",
    devanagari: "आरोग्य महल",
    subtitle: "Ayurvedic Rituals & Jaali-Lit Marble Baths",
    timing: "09:00 – 21:00 Daily",
    duration: "90 – 150 Mins",
    description:
      "Hidden beneath vaulted sandstone chambers where sunlight filters through carved stone jaalis onto lotus-strewn soaking baths, palace vaidyas compose bespoke Abhyanga and hot-herb poultice therapies.",
    highlight: "Signature 120-Minute Mewar Rose & Vetiver Restoration",
    image: "/images/experiences/royal-spa.jpg",
  },
  {
    id: "courtyard-pool",
    index: "02",
    title: "Courtyard Swimming Pool",
    devanagari: "बावड़ी कुंड",
    subtitle: "Stepwell-Inspired Olive Marble Sanctuary",
    timing: "06:30 – 20:00 Daily",
    duration: "Private Cabanas",
    description:
      "Inspired by Rajasthan's ancient baori stepwells, sandstone stairs descend gently into mineral-rich olive water shaded by mature frangipani trees and a carved chhatri pavilion.",
    highlight: "Chilled Saffron Towel & Fresh Kokum Cooler Service",
    image: "/images/experiences/courtyard-pool.jpg",
  },
  {
    id: "sunset-terrace",
    index: "03",
    title: "Sunset Terrace",
    devanagari: "संध्या झरोखा",
    subtitle: "Lakeside Aperitifs Above the Aravalli Horizon",
    timing: "17:15 – 20:30",
    duration: "Golden Hour",
    description:
      "As amber dusk settles across Lake Pichola, guests gather beneath the upper sandstone chhatris for botanical cocktails infused with desert saffron, kokum, and smoked Darjeeling tea.",
    highlight: "Complimentary Twilight Brass Diya Lighting Ceremony",
    image: "/images/experiences/sunset-terrace.jpg",
  },
  {
    id: "traditional-music",
    index: "04",
    title: "Traditional Music & Performances",
    devanagari: "संगीत संध्या",
    subtitle: "Manganiyar Folk & Classical Santoor Recitals",
    timing: "19:30 – 21:15 Nightly",
    duration: "Evening Recital",
    description:
      "Inside the resonance of the central stone courtyard, hereditary Manganiyar musicians and classical sarangi maestros fill the warm evening air without a single microphone.",
    highlight: "Acoustic Raag Yaman & Desert Folk Ballads",
    image: "/images/experiences/traditional-music.jpg",
  },
  {
    id: "heritage-tours",
    index: "05",
    title: "Heritage Architecture Tours",
    devanagari: "स्थापत्य यात्रा",
    subtitle: "Private Walk with the Palace Resident Historian",
    timing: "08:30 Morning Walk",
    duration: "60 Mins",
    description:
      "Trace four centuries of lime-plaster araish craft, hand-chiseled sandstone brackets, secret subterranean water channels, and original Rajput structural geometry.",
    highlight: "Access to the Restored 1694 Royal Observatory Chhatri",
    image: "/images/experiences/architecture-tours.jpg",
  },
  {
    id: "cultural-experiences",
    index: "06",
    title: "Cultural Experiences",
    devanagari: "लोक कला",
    subtitle: "Pichwai Miniature Painting & Hand-Block Textiles",
    timing: "11:00 – 16:00 by Appointment",
    duration: "2 Hours",
    description:
      "Work privately alongside national-award Udaipur artisans grinding lapis, malachite, and vermilion mineral pigments on hand-burnished vasli paper or teakwood block-printing studios.",
    highlight: "Take Home Your Signed Mineral-Pigment Miniature Study",
    image: "/images/experiences/cultural-experiences.jpg",
  },
  {
    id: "private-celebrations",
    index: "07",
    title: "Private Celebrations",
    devanagari: "उत्सव मंडप",
    subtitle: "Candlelit Courtyard Banquets & Royal Buyouts",
    timing: "Bespoke Timing",
    duration: "Intimate Gatherings · Up to 80 Guests",
    description:
      "From two-guest lakeside proposal verandas draped in fresh jasmine to full-palace milestone buyouts illuminated by three hundred brass diyas, every gathering is staged like royal cinema.",
    highlight: "Private Heritage Barge Procession & Bespoke Tasting Menu",
    image: "/images/experiences/private-celebrations.jpg",
  },
];


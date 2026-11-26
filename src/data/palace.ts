export interface ChapterMeta {
  id: string;
  number: string;
  title: string;
  devanagari: string;
  navLabel: string;
  theme: "dark" | "light";
}

export const BRAND_INFO = {
  name: "ABC HOTEL",
  locationShort: "Udaipur · Rajasthan",
  locationFull: "RAJASTHAN · INDIA",
  tagline: "Where History Welcomes You.",
  address: "West Bank of Lake Pichola, Sisarma Road, Udaipur 313001, Rajasthan, India",
  phone: "+91 294 243 0900",
  conciergeEmail: "concierge@abchoteludaipur.com",
  reservationsEmail: "reservations@abchoteludaipur.com",
  coordinates: "24.5764° N, 73.6795° E",
  foundedNote: "A 17th-Century Mewar Nobles' Haveli Reimagined",
};

export const CHAPTERS: ChapterMeta[] = [
  {
    id: "arrival",
    number: "01",
    title: "The Arrival",
    devanagari: "स्वागतम्",
    navLabel: "The Arrival",
    theme: "dark",
  },
  {
    id: "palace",
    number: "02",
    title: "The Palace",
    devanagari: "राजमहल",
    navLabel: "The Palace",
    theme: "light",
  },
  {
    id: "stay",
    number: "03",
    title: "The Art of Staying",
    devanagari: "विश्राम",
    navLabel: "Stay",
    theme: "light",
  },
  {
    id: "dining",
    number: "04",
    title: "The Royal Table",
    devanagari: "शाही रसोई",
    navLabel: "Dining",
    theme: "dark",
  },
  {
    id: "experiences",
    number: "05",
    title: "Experiences",
    devanagari: "अनुभव",
    navLabel: "Experiences",
    theme: "light",
  },
  {
    id: "departure",
    number: "06",
    title: "The Departure",
    devanagari: "प्रस्थान",
    navLabel: "Contact",
    theme: "dark",
  },
];

export const PALACE_COURTYARD_MARKERS = [
  {
    label: "Chhatri & Jharokha Galleries",
    detail: "Hand-carved golden Mewar sandstone brackets overlooking the central lotus court.",
  },
  {
    label: "The Lotus Water Court",
    detail: "Monolithic marble basin engineered in 1694 to naturally cool the southern breezeways.",
  },
  {
    label: "Swagat Kaksh — The Reception",
    detail: "Raw Chanderi silk drapes part toward hand-frescoed lime alcoves and brass lamps.",
  },
];


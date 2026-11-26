export interface RoomCategory {
  id: string;
  slug: string;
  index: string;
  name: string;
  devanagari: string;
  subtitle: string;
  dimensions: string;
  capacity: string;
  view: string;
  startingPriceInr: number;
  priceDisplay: string;
  image: string;
  imageAspect: "portrait" | "landscape" | "wide";
  shortDescription: string;
  architecturalNotes: string;
  amenities: string[];
  bedding: string;
}

export const ROOM_CATEGORIES: RoomCategory[] = [
  {
    id: "heritage-room",
    slug: "heritage-room",
    index: "I",
    name: "Heritage Room",
    devanagari: "विरासत कक्ष",
    subtitle: "Intimate Courtyard Sanctuary",
    dimensions: "520 sq ft · 48 sq m",
    capacity: "2 Adults",
    view: "Central Lotus Fountain & Frangipani Court",
    startingPriceInr: 34000,
    priceDisplay: "₹34,000",
    image: "/images/rooms/heritage-room.jpg",
    imageAspect: "portrait",
    shortDescription:
      "Hand-plastered lime walls and a deeply recessed sandstone jharokha frame quiet mornings overlooking the lotus courtyard.",
    architecturalNotes:
      "Positioned along the east gallery of the original 17th-century courtyard, featuring Makrana inlaid marble floors, custom Burma teak furnishings, and raw Kota doria sheer draperies.",
    amenities: [
      "Carved Jharokha Window Alcove",
      "Deep-Soak Makrana Marble Bath",
      "Hand-loomed Organic Ivory Linen",
      "Evening Turndown with Mogra Essence",
      "24-Hour Dedicated Palace Khidmatgar",
      "Complimentary Sunset Boat Transfer",
    ],
    bedding: "Bespoke Four-Post King Bed",
  },
  {
    id: "royal-suite",
    slug: "royal-suite",
    index: "II",
    name: "Royal Suite",
    devanagari: "राजसी सुइट",
    subtitle: "Triple-Arched Lakeside Salon",
    dimensions: "890 sq ft · 83 sq m",
    capacity: "3 Adults",
    view: "Lake Pichola & Palace Gardens",
    startingPriceInr: 62000,
    priceDisplay: "₹62,000",
    image: "/images/rooms/royal-suite.jpg",
    imageAspect: "landscape",
    shortDescription:
      "Three scalloped sandstone arches dissolve the threshold between a sunlit teakwood salon and the shimmering breadth of Lake Pichola.",
    architecturalNotes:
      "Once the summer chambers of the royal family, finished with tonal natural-pigment frescoes, carved sandstone jaali screens, and an expansive private colonnade loggia.",
    amenities: [
      "Private Triple-Arched Lake Balcony",
      "Separate Sandstone Lounge & Daybed",
      "Hand-Knotted Jaipur Wool Carpets",
      "Curated Rare Indian Single-Estate Teas",
      "Private In-Suite Morning Yoga Option",
      "Chauffeur Transfer from Udaipur Airport",
    ],
    bedding: "Canopied Teakwood Four-Poster King",
  },
  {
    id: "maharaja-residence",
    slug: "maharaja-residence",
    index: "III",
    name: "The Maharaja Residence",
    devanagari: "महाराजा निवास",
    subtitle: "Private Lakeside Wing & Plunge Court",
    dimensions: "2,400 sq ft · 223 sq m",
    capacity: "4 Adults · 2 Bedrooms",
    view: "Uninterrupted Panoramic Lake Pichola & Aravalli Dusk",
    startingPriceInr: 145000,
    priceDisplay: "₹1,45,000",
    image: "/images/rooms/maharaja-residence.jpg",
    imageAspect: "wide",
    shortDescription:
      "An independent two-bedroom palace wing crowned by a coffered sandstone pavilion, private lakeside plunge pool, and candlelit dining loggia.",
    architecturalNotes:
      "Comprises the western bastion of ABC HOTEL: double-height carved sandstone coffered ceiling, antique Mewar miniature alcoves, private pantry, and direct lakeside jetty access.",
    amenities: [
      "Private Heated Sandstone Plunge Pool",
      "Dedicated Butler & Private Chef Service",
      "Two Primary Suites + Formal Drawing Room",
      "Private Sunset Chhatri Dining Pavilion",
      "Complimentary Royal Spa Ritual for Two",
      "Private Vintage Car & Boat Excursion",
    ],
    bedding: "Two Grand Palace Master Suites",
  },
];


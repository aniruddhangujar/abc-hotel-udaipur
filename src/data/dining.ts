export interface CulinaryDish {
  id: string;
  courseNumber: string;
  category: "Traditional Rajasthani" | "Contemporary Indian" | "Signature Heritage" | "Artisanal Dessert";
  name: string;
  devanagari: string;
  accompaniment: string;
  description: string;
  ingredients: string[];
  dietary: string;
  price: string;
  image: string;
}

export const CULINARY_COURSES: CulinaryDish[] = [
  {
    id: "laal-maas",
    courseNumber: "01",
    category: "Traditional Rajasthani",
    name: "Laal Maas, Smoked Mathania",
    devanagari: "लाल मास",
    accompaniment: "Charred Pearl Onions · Crisp Lotus Root · Bone Marrow Jus",
    description:
      "Slow-braised Aravalli lamb medallions lacquered in stone-ground Mathania chili and smoked clove oil, honoring centuries of Mewar royal hunt kitchens.",
    ingredients: [
      "Sun-dried Mathania Red Chili",
      "Pasture-Raised Lamb",
      "Smoked Black Cardamom",
      "Hand-Churned Kachri",
      "Crisp Lotus Stem",
    ],
    dietary: "Gluten-Free · Chef Signature",
    price: "₹2,850",
    image: "/images/dining/laal-maas.jpg",
  },
  {
    id: "ker-sangri",
    courseNumber: "02",
    category: "Contemporary Indian",
    name: "Ker Sangri & Smoked Millet Tartlet",
    devanagari: "केर सांगरी",
    accompaniment: "Charred Bajra Shell · Spiced Yoghurt Pearls · Marigold",
    description:
      "Foraged desert ker berries and desert beans folded into an heirloom black-millet pastry shell with whipped hung-curd and roasted garlic emulsion.",
    ingredients: [
      "Wild Thar Desert Ker & Sangri",
      "Roasted Bajra Millet",
      "Aged A2 Bilona Ghee",
      "Smoked Hung Curd",
      "Edible Palace Marigold",
    ],
    dietary: "Vegetarian · Jain Option Available",
    price: "₹1,950",
    image: "/images/dining/ker-sangri.jpg",
  },
  {
    id: "dal-baati-churma",
    courseNumber: "03",
    category: "Signature Heritage",
    name: "Dal Baati Churma Reimagined",
    devanagari: "दाल बाटी चूरमा",
    accompaniment: "Five-Lentil Smoke · Wildflower Ghee · Cardamom Churma",
    description:
      "Ember-roasted stone-milled wheat baatis bathed in wildflower ghee, served in hammered antique brass alongside slow-simmered panchmel lentils and jaggery churma.",
    ingredients: [
      "Stone-Milled Khapli Wheat",
      "Panchmel Five Lentils",
      "Rajasthani Wildflower Ghee",
      "Alwar Cardamom & Almond",
      "Pickled Pink Shallots",
    ],
    dietary: "Vegetarian · Traditional Royal Thali",
    price: "₹2,450",
    image: "/images/dining/dal-baati-churma.jpg",
  },
  {
    id: "saffron-ghevar",
    courseNumber: "04",
    category: "Artisanal Dessert",
    name: "Saffron Ghevar Mille-Feuille",
    devanagari: "केसर घेवर",
    accompaniment: "Kesar Malai Rabri · Iranian Pistachio · Silver Vark",
    description:
      "Feather-crisp caramelized honeycomb ghevar layered tableside with chilled Pampore saffron rabri, crushed rose petals, and delicate hand-beaten silver leaf.",
    ingredients: [
      "Pampore Mongra Saffron",
      "Slow-Reduced Malai Rabri",
      "Hand-Pulled Honeycomb Ghevar",
      "Pushkar Damask Rose",
      "Roasted Green Pistachio",
    ],
    dietary: "Vegetarian · Contains Dairy & Nuts",
    price: "₹1,450",
    image: "/images/dining/saffron-ghevar.jpg",
  },
];

export const RESTAURANT_INFO = {
  venues: [
    {
      name: "Darbar Rasoi",
      setting: "Candlelit Sandstone Vaults",
      hours: "Dinner · 19:00 – 23:30",
      tastingPrice: "7-Course Royal Tasting · ₹6,500 per guest",
    },
    {
      name: "The Chandni Terrace",
      setting: "Open-Air Lakeside Veranda",
      hours: "Royal Lunch 12:30 – 15:00 · Sunset Aperitifs 17:30 – 22:30",
      tastingPrice: "Chef's Wine & Spice Pairing · ₹8,200 per guest",
    },
  ],
  dietaryNote:
    "Every menu is thoughtfully curated with dedicated Vegetarian, Jain (root-free), Vegan, and Gluten-Free royal tastings upon request.",
  dressCode: "Resort Evening Formal · Linen & Traditional Heritage Attire Encouraged",
};


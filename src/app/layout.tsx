import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, DM_Sans, Noto_Serif_Devanagari } from "next/font/google";
import "./globals.css";

const bodoniModa = Bodoni_Moda({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-bodoni",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-dm-sans",
  display: "swap",
});

const notoDevanagari = Noto_Serif_Devanagari({
  subsets: ["devanagari"],
  weight: ["400", "500"],
  variable: "--font-noto-devanagari",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ABC HOTEL | Udaipur · Heritage Palace Sanctuary",
  description:
    "Where History Welcomes You. A five-star heritage boutique palace hotel on the quiet western banks of Lake Pichola in Udaipur, Rajasthan.",
  keywords: [
    "ABC HOTEL Udaipur",
    "Luxury Heritage Hotel Rajasthan",
    "Udaipur Palace Hotel",
    "Mewar Hospitality",
    "Lake Pichola Boutique Palace",
  ],
  openGraph: {
    title: "ABC HOTEL — Where History Welcomes You",
    description:
      "Indian royal heritage reimagined through contemporary digital luxury in Udaipur, Rajasthan.",
    type: "website",
    locale: "en_IN",
  },
};

export const viewport: Viewport = {
  themeColor: "#29251F",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bodoniModa.variable} ${dmSans.variable} ${notoDevanagari.variable}`}
    >
      <body className="bg-walnut text-ivory antialiased selection:bg-sandstone/40 selection:text-cream">
        <a href="#main-content" className="skip-link">
          Skip to palace journey
        </a>
        {children}
      </body>
    </html>
  );
}


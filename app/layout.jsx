import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import FixedBrand from "@/components/FixedBrand2";
import Splash from "@/components/Splash";

// Variable fonts — loaded without a fixed weight so the design's fine-grained
// weight axis (320 / 340 / 480 / 540 …) resolves correctly.
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jbmono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jbmono",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://lifeline-book.example"),
  title: "John Donnelly — Lifeline",
  description:
    "Lifeline: The Story of PEPFAR, the Greatest Humanitarian Initiative of Our Time — the new book from journalist John Donnelly. HarperCollins, October 2026.",
  icons: { icon: "/favicon.png" },
  openGraph: {
    title: "John Donnelly — Lifeline",
    description:
      "The riveting story of how the US built PEPFAR and saved more than 26 million lives. By John Donnelly. HarperCollins, October 2026.",
    type: "book",
  },
};

export const viewport = {
  themeColor: "#1b0f3d",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${jbmono.variable}`}>
      <body>
        <div className="imprint" aria-hidden="true" />
        {children}
        <FixedBrand />
        <Splash />
      </body>
    </html>
  );
}

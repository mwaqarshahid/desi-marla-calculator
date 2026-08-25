import type { Metadata, Viewport } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LanguageProvider } from "@/components/LanguageProvider";
import { CalculatorTabProvider } from "@/components/CalculatorTabProvider";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "DMC – Desi Marla Calculator | Pakistan Land Area Converter",
  description:
    "Convert between Normal, Lahori, and Multani Marla. Free Pakistan land area calculator. Normal Marla (272.25 sq ft), Lahori (225 sq ft), Multani (270 sq ft).",
  keywords: [
    "marla calculator",
    "Pakistan land",
    "Lahori marla",
    "Multani marla",
    "Normal marla",
    "square feet",
    "land conversion",
    "property area",
  ],
  authors: [{ name: "DMC" }],
  openGraph: {
    title: "DMC – Desi Marla Calculator | Pakistan Land Area Converter",
    description:
      "Convert between Normal, Lahori, and Multani Marla. Free Pakistan land area calculator.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DMC – Desi Marla Calculator",
    description: "Convert between Normal, Lahori, and Multani Marla.",
  },
  robots: "index, follow",
  metadataBase: new URL("https://desi-marla-calculator.vercel.app"),
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
    { media: "(prefers-color-scheme: dark)", color: "#020617" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`} suppressHydrationWarning>
      <body
        className="font-sans min-h-screen flex flex-col bg-soil-50 dark:bg-soil-950 text-soil-950 dark:text-soil-100 antialiased"
        suppressHydrationWarning
      >
        <ThemeProvider>
          <LanguageProvider>
            <CalculatorTabProvider>
              {children}
            </CalculatorTabProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

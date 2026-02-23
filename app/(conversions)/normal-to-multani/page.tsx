import CalculatorCard from "@/components/CalculatorCard";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MarlaReference from "@/components/MarlaReference";
import QuickLinksNav from "@/components/QuickLinksNav";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Normal to Multani Marla Converter | DMC",
  description:
    "Convert Normal Marla (272.25 sq ft) to Multani Marla (270 sq ft). Pakistan land area calculator.",
  openGraph: {
    title: "Normal to Multani Marla Converter | DMC",
    description: "Convert Normal Marla to Multani Marla. Pakistan land calculator.",
  },
};

export default function NormalToMultaniPage() {
  return (
    <main className="flex-1 flex flex-col">
      <Header subtitleKey="normalToMultani" />
      <div className="flex-1 flex flex-col items-center px-4 py-10 sm:py-12">
        <CalculatorCard defaultSource="normal" defaultTarget="multani" />
        <QuickLinksNav />
        <MarlaReference />
        <Footer />
      </div>
    </main>
  );
}

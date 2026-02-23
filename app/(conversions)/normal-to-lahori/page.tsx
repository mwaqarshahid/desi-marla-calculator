import CalculatorCard from "@/components/CalculatorCard";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MarlaReference from "@/components/MarlaReference";
import QuickLinksNav from "@/components/QuickLinksNav";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Normal to Lahori Marla Converter | DMC",
  description:
    "Convert Normal Marla (272.25 sq ft) to Lahori Marla (225 sq ft). Pakistan land area calculator.",
  openGraph: {
    title: "Normal to Lahori Marla Converter | DMC",
    description: "Convert Normal Marla to Lahori Marla. Pakistan land calculator.",
  },
};

export default function NormalToLahoriPage() {
  return (
    <main className="flex-1 flex flex-col">
      <Header subtitleKey="normalToLahori" />
      <div className="flex-1 flex flex-col items-center px-4 py-10 sm:py-12">
        <CalculatorCard defaultSource="normal" defaultTarget="lahori" />
        <QuickLinksNav />
        <MarlaReference />
        <Footer />
      </div>
    </main>
  );
}

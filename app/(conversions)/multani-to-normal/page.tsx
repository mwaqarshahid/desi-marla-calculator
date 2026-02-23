import CalculatorCard from "@/components/CalculatorCard";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MarlaReference from "@/components/MarlaReference";
import QuickLinksNav from "@/components/QuickLinksNav";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Multani to Normal Marla Converter | DMC",
  description:
    "Convert Multani Marla (270 sq ft) to Normal Marla (272.25 sq ft). Pakistan land area calculator.",
  openGraph: {
    title: "Multani to Normal Marla Converter | DMC",
    description: "Convert Multani Marla to Normal Marla. Pakistan land calculator.",
  },
};

export default function MultaniToNormalPage() {
  return (
    <main className="flex-1 flex flex-col">
      <Header subtitleKey="multaniToNormal" />
      <div className="flex-1 flex flex-col items-center px-4 py-10 sm:py-12">
        <CalculatorCard defaultSource="multani" defaultTarget="normal" />
        <QuickLinksNav />
        <MarlaReference />
        <Footer />
      </div>
    </main>
  );
}

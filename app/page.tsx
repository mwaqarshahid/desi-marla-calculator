import CalculatorCard from "@/components/CalculatorCard";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MarlaReference from "@/components/MarlaReference";
import QuickLinksNav from "@/components/QuickLinksNav";

export default function Home() {
  return (
    <main className="flex-1 flex flex-col">
      <Header subtitleKey="header.subtitle" />

      {/* Centered content */}
      <div className="flex-1 flex flex-col items-center px-4 py-10 sm:py-12">
        <CalculatorCard />
        <QuickLinksNav showBackLink={false} />
        <MarlaReference />
        <Footer />
      </div>
    </main>
  );
}

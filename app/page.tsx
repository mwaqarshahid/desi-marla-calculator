import CalculatorCard from "@/components/CalculatorCard";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MarlaReference from "@/components/MarlaReference";
import PageIntro from "@/components/PageIntro";

export default function Home() {
  return (
    <main className="flex-1 flex flex-col">
      <Header />
      <div className="flex-1 flex flex-col">
        <div className="w-full px-4 sm:px-6 pt-8 sm:pt-10 pb-6 sm:pb-8">
          <div className="max-w-6xl mx-auto">
            <PageIntro />
          </div>
        </div>
        <div className="flex flex-col items-center px-4 pb-10 sm:pb-12">
          <CalculatorCard />
          <MarlaReference />
          <Footer />
        </div>
      </div>
    </main>
  );
}

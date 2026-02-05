import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import Hero from "../components/home/Hero";
import ResearchSection from "../components/home/ResearchSection";
import NewsSection from "../components/home/NewsSection";
import PartnersSection from "../components/home/PartnersSection";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-bg">
      <Header />
      <main className="pb-[80px]">
        <Hero />
        <div className="mx-auto max-w-container px-6 py-16">
          <ResearchSection />
          <NewsSection />
          <PartnersSection />
        </div>
      </main>
      <Footer/>
    </div>
  );
}

import { HomeHeroSection } from "@/components/home/home-hero-section";
import { HomeContentSections } from "@/components/home/home-sections";
import { SiteFooter } from "@/components/shared/site-footer";
import { SiteHeader } from "@/components/shared/site-header";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F3F3F3] pb-10 font-manrope">
      <SiteHeader />
      <main className="mt-12 space-y-24">
        <HomeHeroSection />
        <HomeContentSections />
      </main>
      <SiteFooter />
    </div>
  );
}

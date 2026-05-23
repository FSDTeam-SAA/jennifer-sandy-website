import { AboutSections } from "@/components/about/about-sections";
import { SiteFooter } from "@/components/shared/site-footer";
import { SiteHeader } from "@/components/shared/site-header";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F3F3F3] font-manrope">
      <SiteHeader />
      <AboutSections />
      <SiteFooter />
    </div>
  );
}

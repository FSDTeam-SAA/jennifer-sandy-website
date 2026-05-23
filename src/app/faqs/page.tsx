import { FaqPageContent } from "@/components/faq/faq-page-content";
import { SiteFooter } from "@/components/shared/site-footer";
import { SiteHeader } from "@/components/shared/site-header";

export default function FaqsPage() {
  return (
    <div className="min-h-screen bg-[#F3F3F3] font-manrope">
      <SiteHeader />
      <FaqPageContent />
      <SiteFooter />
    </div>
  );
}

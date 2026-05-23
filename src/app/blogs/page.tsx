import { BlogsPageContent } from "@/components/blog/blogs-page-content";
import { SiteFooter } from "@/components/shared/site-footer";
import { SiteHeader } from "@/components/shared/site-header";

export default function BlogsPage() {
  return (
    <div className="min-h-screen bg-[#F3F3F3] font-manrope">
      <SiteHeader />
      <BlogsPageContent />
      <SiteFooter />
    </div>
  );
}

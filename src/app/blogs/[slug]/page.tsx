import { BlogDetailsPageContent } from "@/components/blog/blog-details-page-content";
import { SiteFooter } from "@/components/shared/site-footer";
import { SiteHeader } from "@/components/shared/site-header";

export default function BlogDetailsPage({
  params,
}: {
  params: { slug: string };
}) {
  return (
    <div className="min-h-screen bg-[#F3F3F3] font-manrope">
      <SiteHeader />
      <BlogDetailsPageContent slug={params.slug} />
      <SiteFooter />
    </div>
  );
}

import Image from "next/image";
import Link from "next/link";
import { ContactCtaSection } from "@/components/shared/contact-cta-section";

const allPosts = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  slug: `living-in-the-media-harbour-guide-${i + 1}`,
  title: "Living in the Media Harbour: The ultimate guide for expats",
  desc: "Discover the best places to live, top-rated restaurants, trendy bars, and exciting leisure activities in Dusseldorf's most modern district.",
  image: "/images/blog.jpg",
}));

export function BlogSharedBottom() {
  return (
    <>
      <ContactCtaSection />

      <section className="container mx-auto px-6 lg:px-10">
        <h2 className="section-title text-center text-[#1672E6]">All Blogs</h2>
        <p className="section-desc mt-1 text-center text-slate-500">Explore all our articles, tips, and stories to stay informed and make the best decisions for your loved ones&apos; care.</p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {allPosts.map((post) => (
            <article key={post.id} className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-[0_1px_0_rgba(15,23,42,0.04)]">
              <div className="relative h-[150px] w-full"><Image src={post.image} alt={post.title} fill className="object-cover" /></div>
              <div className="p-4">
                <Link href={`/blogs/${post.slug}`} className="text-[17px] font-medium leading-[145%] text-slate-800 hover:text-[#1672E6]">{post.title}</Link>
                <p className="mt-2 text-[15px] leading-[150%] text-slate-500">{post.desc}</p>
                <Link href={`/blogs/${post.slug}`} className="mt-2 block text-[15px] font-semibold text-[#1672E6]">Read More</Link>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 flex items-center justify-between text-base text-slate-500">
          <p>Showing 1 to 12 of 95 entries</p>
          <div className="flex items-center gap-2.5">
            <button className="h-9 w-9 rounded border border-slate-300 text-[15px] text-slate-500">&lt;</button>
            <button className="h-9 w-9 rounded border border-[#1672E6] bg-[#1672E6] text-[15px] text-white">1</button>
            <button className="h-9 w-9 rounded border border-slate-300 text-[15px]">2</button>
            <button className="h-9 w-9 rounded border border-slate-300 text-[15px]">3</button>
            <button className="h-9 w-9 rounded border border-slate-300 text-[15px]">4</button>
            <button className="h-9 w-9 rounded border border-slate-300 text-[15px]">5</button>
            <button className="h-9 w-9 rounded border border-slate-300 text-[15px]">&gt;</button>
          </div>
        </div>
      </section>
    </>
  );
}

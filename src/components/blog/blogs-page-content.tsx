import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { BlogSharedBottom } from "@/components/blog/blog-shared-bottom";

const sidePosts = [
  {
    slug: "checklist-moving-to-dusseldorf-made-easy",
    title: "Checklist: Moving to Dusseldorf made easy",
    tag: "Relocation",
    image: "/images/connect-2.jpg",
  },
  {
    slug: "best-cafes-in-pempelfort-for-home-office",
    title: "The best cafes in Pempelfort for home office",
    tag: "Lifestyle",
    image: "/images/connect-3.jpg",
  },
  {
    slug: "furnished-rental-security-deposit-guide",
    title: "Furnished rental: What you need to know about the security deposit",
    tag: "Right",
    image: "/images/service-2.jpg",
  },
];

const categories = ["Relocation", "Lifestyle", "Right", "Neighborhood Guides", "Expat Tips"];

export function BlogsPageContent() {
  return (
    <main className="space-y-24 py-12">
      <section className="container mx-auto px-6 lg:px-10">
        <div className="relative overflow-hidden rounded-[14px]">
          <Image src="/images/about-banner.jpg" alt="Blogs banner" width={1600} height={420} className="h-[230px] w-full object-cover" priority />
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center text-white">
            <h1 className="banner-title">Insights, Tips & Guidance for Families</h1>
            <p className="banner-desc mt-2 max-w-5xl text-white/90">Explore helpful articles, expert advice, and real-life stories designed to guide families in making informed and confident decisions about senior care.</p>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-6 lg:px-10">
        <h2 className="section-title text-slate-800">Recent blog posts</h2>
        <div className="mt-6 grid gap-4 lg:grid-cols-[1.65fr_1fr_0.55fr]">
          <article className="relative overflow-hidden rounded-lg">
            <Image src="/images/properties-3.jpg" alt="Recent featured post" width={950} height={620} className="h-[460px] w-full object-cover" />
            <div className="absolute inset-0 bg-black/45" />
            <div className="absolute inset-x-0 bottom-0 p-5 text-white">
              <span className="inline-flex rounded-full bg-[#1672E6] px-4 py-1 text-xs">Guide</span>
              <h3 className="mt-4 font-serif text-[42px] leading-[130%]">Living in the Media Harbour: The ultimate guide for expats</h3>
              <p className="mt-2 text-sm text-white/90">Discover luxurious living in Dusseldorf&apos;s Media Harbour. From modern loft apartments to the best restaurants and leisure activities for international residents.</p>
              <Link href="/blogs/living-in-the-media-harbour-the-ultimate-guide-for-expats" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#1d86ff]">Read more <ArrowUpRight className="h-4 w-4" /></Link>
            </div>
          </article>

          <div className="divide-y divide-slate-200">
            {sidePosts.map((post) => (
              <Link key={post.title} href={`/blogs/${post.slug}`} className="grid grid-cols-[110px_1fr] gap-3 py-3 first:pt-0">
                <div className="relative h-[110px] overflow-hidden rounded-md"><Image src={post.image} alt={post.title} fill className="object-cover" /></div>
                <div>
                  <h3 className="text-[20px] leading-[145%] text-slate-800">{post.title}</h3>
                  <span className="mt-3 inline-flex rounded-full bg-[#1672E6] px-4 py-1 text-xs text-white">{post.tag}</span>
                </div>
              </Link>
            ))}
          </div>

          <aside className="border-l border-slate-200 pl-4">
            <h3 className="text-[36px] font-medium text-slate-800">Categories</h3>
            <ul className="mt-3 space-y-2">
              {categories.map((cat) => (
                <li key={cat} className="text-[18px] text-slate-500">{cat}</li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      <BlogSharedBottom />
    </main>
  );
}

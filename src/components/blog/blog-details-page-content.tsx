import Image from "next/image";
import { BlogSharedBottom } from "@/components/blog/blog-shared-bottom";

const relatedArticles = [
  { title: "Living in the Media Harbour: The Ultimate Guide for Expats", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit ...", image: "/images/properties-1.jpg" },
  { title: "Living in the Media Harbour: The Ultimate Guide for Expats", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit ...", image: "/images/connect-2.jpg" },
  { title: "Living in the Media Harbour: The Ultimate Guide for Expats", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit ...", image: "/images/properties-3.jpg" },
];

export function BlogDetailsPageContent() {
  return (
    <main className="space-y-24 py-12">
      <section className="container mx-auto px-6 lg:px-10">
        <article className="relative overflow-hidden rounded-[12px]">
          <Image src="/images/properties-3.jpg" alt="Blog details hero" width={1600} height={650} className="h-[360px] w-full object-cover" priority />
          <div className="absolute inset-0 bg-black/50" />
          <div className="absolute inset-x-0 bottom-0 p-6 text-white lg:p-8">
            <span className="inline-flex rounded-full bg-[#1672E6] px-6 py-1.5 text-sm">Guide</span>
            <h1 className="mt-5 max-w-3xl font-serif text-[52px] leading-[130%]">Living in the Media Harbour: Dec The ultimate guide for expats</h1>
            <p className="mt-3 text-sm text-white/90">By the 0211 team | 5-minute read | January 15, 2026</p>
          </div>
        </article>
      </section>

      <section className="container mx-auto px-6 lg:px-10">
        <div className="grid items-start gap-8 lg:grid-cols-[1fr_320px]">
          <article className="space-y-8 pr-2">
            <p className="section-desc text-slate-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim sem un Dusseldorf, Medienhafen aliqua es ea commodo consequat.</p>

            <div className="space-y-4">
              <h2 className="section-title text-[#1672E6]">Why the Media Harbour?</h2>
              <p className="section-desc text-slate-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco allamco laboris ut aliqup ex commodo consequat.</p>
              <p className="section-desc text-slate-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris ut aliqup ex commodo consequat.</p>
            </div>

            <blockquote className="border-l-4 border-[#1672E6] pl-5">
              <p className="text-[42px] font-semibold leading-[140%] text-[#1672E6]">&quot;A unique feeling of life on the Rhine.&quot;</p>
            </blockquote>

            <p className="section-desc text-slate-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco allamco laboris ut aliqup ex commodo consequat.</p>
            <p className="section-desc text-slate-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris ut aliqup ex commodo consequat.</p>
          </article>

          <aside className="space-y-5">
            <div className="rounded-lg bg-white p-5">
              <h3 className="text-[28px] font-semibold text-slate-800">Related Articles</h3>
              <div className="mt-4 space-y-3">
                {relatedArticles.map((item, idx) => (
                  <article key={`${item.title}-${idx}`} className="grid grid-cols-[84px_1fr] gap-3">
                    <div className="relative h-[84px] overflow-hidden rounded-md"><Image src={item.image} alt={item.title} fill className="object-cover" /></div>
                    <div>
                      <h4 className="text-[14px] font-medium leading-[140%] text-slate-800">{item.title}</h4>
                      <p className="mt-1 text-[12px] leading-[140%] text-slate-500">{item.desc}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div className="rounded-lg bg-white p-5">
              <h3 className="text-[28px] font-semibold text-[#1672E6]">Newsletter</h3>
              <p className="mt-2 text-[14px] text-slate-500">Subscribe to Our Updates</p>
              <div className="mt-4 flex gap-2">
                <input type="email" placeholder="E-mail Address" className="h-10 flex-1 rounded border border-slate-300 px-3 text-sm outline-none" />
                <button className="h-10 rounded bg-[#1672E6] px-5 text-sm text-white">Send</button>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <BlogSharedBottom />
    </main>
  );
}

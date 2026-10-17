import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { blogPosts } from "./blog-data";
import { BlogSharedBottom } from "./blog-shared-bottom";

export function BlogsPageContent() {
  const featured = blogPosts[0];
  const sideArticles = blogPosts.slice(1, 4);

  return (
    <main className="space-y-16 py-8 sm:py-12">
      {/* Banner */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-10">
        <div className="rounded-2xl bg-[#f3f1ed] px-6 py-12 text-left sm:px-10 lg:py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-stone-500">
            0211wohnen · Magazin & Ratgeber
          </p>
          <h1 className="banner-title mt-3 !text-left !leading-tight text-stone-900">
            Einblicke & Tipps rund ums Wohnen auf Zeit
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-stone-500">
            Erfahren Sie mehr über die Vorzüge möblierter Designer-Apartments in Düsseldorf,
            begehrte Wohnlagen und praktische Empfehlungen für einen reibungslosen Einzug.
          </p>
        </div>
      </section>

      {/* Featured & Side Articles */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-10">
        <h2 className="section-title text-[#262626]">Aktuelle Beiträge</h2>
        <div className="mt-6 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          {/* Main Featured */}
          <article className="group relative overflow-hidden rounded-xl border border-stone-200 bg-white">
            <div className="relative h-64 w-full sm:h-80">
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                className="object-cover transition duration-300 group-hover:scale-[1.02]"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8">
                <span className="inline-block rounded-full bg-white/20 px-3 py-1 text-xs backdrop-blur-sm">
                  {featured.tag}
                </span>
                <h3 className="mt-3 font-serif text-2xl font-bold leading-snug sm:text-3xl">
                  {featured.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm text-stone-200">
                  {featured.excerpt}
                </p>
                <div className="mt-4 flex items-center gap-4 text-xs text-stone-300">
                  <span>{featured.date}</span>
                  <span>·</span>
                  <span>{featured.readTime}</span>
                </div>
              </div>
            </div>
            <div className="p-4 sm:p-6">
              <Link
                href={`/blogs/${featured.slug}`}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#262626] underline underline-offset-4 hover:text-black"
              >
                Vollständigen Artikel lesen <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </article>

          {/* Side Articles */}
          <div className="flex flex-col gap-4">
            {sideArticles.map((article) => (
              <article
                key={article.slug}
                className="flex gap-4 rounded-xl border border-stone-200 bg-white p-4 transition hover:shadow-sm"
              >
                <div className="relative h-24 w-28 shrink-0 overflow-hidden rounded-lg bg-stone-100 sm:h-28 sm:w-36">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-500">
                      {article.tag}
                    </span>
                    <h4 className="mt-1 line-clamp-2 text-sm font-semibold leading-snug text-stone-800">
                      <Link href={`/blogs/${article.slug}`} className="hover:underline">
                        {article.title}
                      </Link>
                    </h4>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-xs text-stone-500">
                    <span>{article.readTime}</span>
                    <Link
                      href={`/blogs/${article.slug}`}
                      className="font-medium text-[#262626] underline underline-offset-4 hover:text-black"
                    >
                      Lesen →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <BlogSharedBottom />
    </main>
  );
}

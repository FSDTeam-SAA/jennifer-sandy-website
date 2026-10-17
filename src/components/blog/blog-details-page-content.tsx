import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { blogPosts } from "./blog-data";
import { BlogSharedBottom } from "./blog-shared-bottom";

export function BlogDetailsPageContent({ slug }: { slug?: string }) {
  const post = blogPosts.find((p) => p.slug === slug) || blogPosts[0];
  const related = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <main className="space-y-16 py-8 sm:py-12">
      {/* Breadcrumb / Back */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-10">
        <Link
          href="/blogs"
          className="inline-flex items-center gap-2 text-sm text-stone-500 underline underline-offset-4 hover:text-stone-800"
        >
          <ArrowLeft className="h-4 w-4" /> Zurück zum Magazin
        </Link>
      </div>

      {/* Hero Banner */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-10">
        <article className="relative overflow-hidden rounded-2xl bg-white shadow-sm border border-stone-200">
          <div className="relative h-72 w-full sm:h-96 lg:h-[420px]">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-10">
              <span className="inline-block rounded-full bg-white/20 px-3 py-1 text-xs backdrop-blur-sm">
                {post.tag}
              </span>
              <h1 className="mt-4 font-serif text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
                {post.title}
              </h1>
              <p className="mt-3 text-xs text-stone-300 sm:text-sm">
                {post.author} · {post.date} · {post.readTime}
              </p>
            </div>
          </div>
        </article>
      </section>

      {/* Main Content & Sidebar */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid items-start gap-12 lg:grid-cols-[1fr_340px]">
          {/* Article Body */}
          <article className="space-y-8 text-stone-700">
            <p className="text-lg font-medium leading-relaxed text-stone-900">
              {post.content.intro}
            </p>

            {post.content.sections.map((section, idx) => (
              <div key={idx} className="space-y-3">
                <h2 className="section-title text-xl text-stone-900 sm:text-2xl">
                  {section.heading}
                </h2>
                <p className="text-base leading-8 text-stone-600">
                  {section.body}
                </p>
              </div>
            ))}

            {post.content.quote && (
              <blockquote className="my-8 border-l-4 border-[#b5aa9a] pl-6 italic text-stone-800">
                <p className="font-serif text-2xl leading-relaxed sm:text-3xl">
                  &ldquo;{post.content.quote}&rdquo;
                </p>
              </blockquote>
            )}

            <div className="rounded-xl border border-stone-200 bg-[#f7f6f3] p-6">
              <h3 className="text-base font-semibold text-stone-900">
                Sie suchen ein passendes Apartment in Düsseldorf?
              </h3>
              <p className="mt-2 text-sm text-stone-600">
                Entdecken Sie unser aktuelles Angebot an sofort verfügbaren Designer-Apartments
                oder kontaktieren Sie unser Team direkt.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link href="/apartments" className="brand-button text-sm !px-4 !py-2">
                  Apartments ansehen
                </Link>
                <a
                  href="mailto:info@0211wohnen.de"
                  className="rounded-md border border-stone-300 bg-white px-4 py-2 text-sm font-semibold text-stone-800 hover:bg-stone-50"
                >
                  Kontakt aufnehmen
                </a>
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="space-y-6">
            <div className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm">
              <h3 className="font-serif text-xl font-bold text-stone-900">
                Weitere Beiträge
              </h3>
              <div className="mt-4 space-y-4">
                {related.map((item) => (
                  <article key={item.slug} className="flex gap-3">
                    <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-md bg-stone-100">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-stone-500">
                        {item.tag}
                      </span>
                      <h4 className="line-clamp-2 text-xs font-semibold leading-snug text-stone-800">
                        <Link href={`/blogs/${item.slug}`} className="hover:underline">
                          {item.title}
                        </Link>
                      </h4>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-stone-200 bg-[#f7f6f3] p-6 text-center">
              <p className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                0211wohnen Service
              </p>
              <h4 className="mt-2 font-serif text-lg font-bold text-stone-900">
                Haben Sie Fragen?
              </h4>
              <p className="mt-2 text-xs leading-relaxed text-stone-600">
                Wir beraten Sie persönlich bei der Auswahl Ihres Wunsch-Apartments in Düsseldorf.
              </p>
              <a
                href="mailto:info@0211wohnen.de"
                className="mt-4 inline-block text-xs font-semibold underline underline-offset-4"
              >
                info@0211wohnen.de
              </a>
            </div>
          </aside>
        </div>
      </section>

      <BlogSharedBottom />
    </main>
  );
}

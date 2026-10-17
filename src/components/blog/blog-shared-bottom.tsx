import Image from "next/image";
import Link from "next/link";
import { ContactCtaSection } from "@/components/shared/contact-cta-section";
import { blogPosts } from "./blog-data";

export function BlogSharedBottom() {
  return (
    <>
      <section className="container mx-auto px-4 sm:px-6 lg:px-10">
        <h2 className="section-title text-[#262626]">Weitere Artikel & Ratgeber</h2>
        <p className="mt-2 text-sm text-stone-500">
          Wissenswertes rund um möbliertes Wohnen, Stadtteile und Einzug in Düsseldorf.
        </p>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <article
              key={post.slug}
              className="overflow-hidden rounded-xl border border-stone-200 bg-white transition hover:shadow-md"
            >
              <div className="relative h-44 w-full bg-stone-100">
                <Image src={post.image} alt={post.title} fill className="object-cover" />
              </div>
              <div className="p-5">
                <span className="inline-block text-xs font-semibold uppercase tracking-wider text-stone-500">
                  {post.tag}
                </span>
                <h3 className="mt-2 text-base font-semibold leading-snug text-stone-800">
                  <Link href={`/blogs/${post.slug}`} className="hover:text-black">
                    {post.title}
                  </Link>
                </h3>
                <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-stone-500">
                  {post.excerpt}
                </p>
                <div className="mt-4 flex items-center justify-between border-t border-stone-100 pt-3 text-xs text-stone-500">
                  <span>{post.readTime}</span>
                  <Link
                    href={`/blogs/${post.slug}`}
                    className="font-medium text-[#262626] underline underline-offset-4 hover:text-black"
                  >
                    Weiterlesen →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <ContactCtaSection />
    </>
  );
}

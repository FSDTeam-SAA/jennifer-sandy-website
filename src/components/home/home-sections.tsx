"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MinusCircle, PlusCircle } from "lucide-react";
import { PropertyBrowser } from "./property-browser";
import { PropertySliderSection } from "./property-slider-section";
import { blogPosts } from "@/components/blog/blog-data";
import { apiBaseUrl } from "@/lib/estates";

const popularAreas = [
  {
    title: "Medienhafen",
    count: "34 Apartments",
    desc: "Architektur & Lifestyle direkt am Rhein",
    image: "/images/properties-1.jpg",
  },
  {
    title: "Carlstadt",
    count: "1 Apartment",
    desc: "Historischer Charme & Kunstgalerien",
    image: "/images/properties-2.jpg",
  },
  {
    title: "Unterbilk",
    count: "18 Apartments",
    desc: "Urbanes Flair & Lorettoviertel",
    image: "/images/properties-3.jpg",
  },
  {
    title: "Pempelfort",
    count: "13 Apartments",
    desc: "Hofgarten-Nähe & beste Gastronomie",
    image: "/images/properties-4.jpg",
  },
];

const homeFaqs = [
  {
    q: "How does the booking process work?",
    a: "Our booking process is simple and digital. After you submit your request, we review it promptly and coordinate the lease agreement. You receive all move-in details and digital access instructions without unnecessary bureaucracy.",
  },
  {
    q: "What is included in the additional costs (Pauschalmiete)?",
    a: "Our all-inclusive Pauschalmiete covers heating, electricity, water, high-speed Wi-Fi, and building service charges in one fixed monthly rate. No hidden fees or surprising year-end utility recalculations.",
  },
  {
    q: "Can I view the apartment beforehand?",
    a: "Yes! We offer both personal on-site viewings and guided digital video tours so you can comfortably inspect your future home from anywhere in the world.",
  },
  {
    q: "How long is the minimum rental period?",
    a: "Most of our furnished designer apartments can be rented from 1 month up to several years, giving you complete flexibility for temporary assignments or relocations.",
  },
  {
    q: "Do I receive a Wohnungsgeberbestätigung for registration?",
    a: "Yes, immediately upon move-in we issue the official German landlord confirmation (Wohnungsgeberbestätigung) required for your city registration at the Bürgerbüro.",
  },
];

export function HomeContentSections({
  filters,
  onSelectDistrict,
}: {
  filters?: { availableFrom?: string; district?: string; minRooms?: string };
  onSelectDistrict?: (district: string) => void;
}) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [districtCounts, setDistrictCounts] = useState<Record<string, number>>({});
  const featuredBlog = blogPosts[0];

  useEffect(() => {
    fetch(`${apiBaseUrl()}/onoffice/popular-areas`)
      .then((res) => res.json())
      .then((json) => {
        if (Array.isArray(json?.data)) {
          const map: Record<string, number> = {};
          json.data.forEach((item: { district: string; count: number }) => {
            if (item.district) {
              map[item.district.toLowerCase()] = item.count;
            }
          });
          setDistrictCounts(map);
        }
      })
      .catch(() => {});
  }, []);

  const getAreaCount = (title: string, fallback: string) => {
    const key = title.toLowerCase();
    const count = districtCounts[key];
    if (typeof count === "number") {
      return `${count} ${count === 1 ? "Apartment" : "Apartments"}`;
    }
    return fallback;
  };

  const handleAreaClick = (districtName: string) => {
    if (onSelectDistrict) {
      onSelectDistrict(districtName);
    } else {
      const el = document.getElementById("wohnungen");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <div className="space-y-24">
      {/* 1. Main Interactive Property Listing & Map Split View */}
      <PropertyBrowser externalFilters={filters} />

      {/* 2. Popular Areas */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-10">
        <h2 className="section-title text-[#1672E6]">Popular Areas</h2>
        <p className="section-desc mt-2 text-slate-500">
          Move In Ready: Professional Furnished Apartments, Zero Agent Fees
        </p>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {popularAreas.map((area) => (
            <article
              key={area.title}
              onClick={() => handleAreaClick(area.title)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleAreaClick(area.title);
                }
              }}
              className="group cursor-pointer overflow-hidden rounded-2xl bg-[#EEF0F3] shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#1672E6]"
            >
              <div className="relative h-[280px] w-full overflow-hidden">
                <Image
                  src={area.image}
                  alt={area.title}
                  fill
                  className="object-cover transition duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-[#1672E6] group-hover:underline">
                    {area.title}
                  </h3>
                  <div
                    aria-label={`View apartments in ${area.title}`}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#1672E6] shadow-sm transition duration-200 group-hover:bg-[#1672E6] group-hover:text-white"
                  >
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                  </div>
                </div>
                <p className="mt-1 text-xs text-slate-500">{area.desc}</p>
                <p className="mt-3 text-sm font-semibold text-[#1672E6]">
                  {getAreaCount(area.title, area.count)}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 3. Fully Working "Our Properties View" Slider */}
      <PropertySliderSection />

      {/* 4. From Our Blog / Magazine */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-10">
        <h2 className="section-title text-[#1672E6]">From Our Blog</h2>
        <p className="section-desc mt-2 text-slate-500">
          Your Guide to Hassle-Free Renting and Stylish, Fully-Furnished Homes
        </p>

        <article className="mt-8 grid overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm lg:grid-cols-2">
          <div className="relative h-[300px] w-full sm:h-[380px] lg:h-full">
            <Image
              src={featuredBlog.image}
              alt={featuredBlog.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col justify-between p-6 sm:p-8 lg:p-10">
            <div>
              <span className="inline-block rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-[#1672E6]">
                {featuredBlog.tag}
              </span>
              <h3 className="mt-3 font-serif text-2xl font-bold leading-snug text-slate-800 sm:text-3xl">
                {featuredBlog.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-slate-500 sm:text-base">
                {featuredBlog.excerpt}
              </p>
            </div>
            <Link
              href={`/blogs/${featuredBlog.slug}`}
              className="mt-6 inline-flex items-center gap-2 text-base font-bold text-[#1672E6] hover:underline"
            >
              Read more <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </article>
      </section>

      {/* 5. Explore Homes Banner */}
      <section className="container mx-auto px-4 pb-12 sm:px-6 lg:px-10">
        <div className="relative overflow-hidden rounded-[24px] shadow-xl">
          <Image
            src="/images/banner.jpg"
            alt="Explore homes in Duesseldorf"
            width={1600}
            height={650}
            className="h-[380px] w-full object-cover sm:h-[420px]"
          />
          <div className="absolute inset-0 bg-black/45" />
          <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-white">
            <h3 className="font-serif text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
              Find <span className="text-[#6EA8E8]">Your Perfect</span> Home
            </h3>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/90 sm:text-base">
              Easily search, compare, and connect with professionally managed apartments.
              Whether you are looking for a cozy studio or a spacious luxury loft, we provide
              safe, comfortable, and move-in ready homes with zero broker commissions.
            </p>
            <Link
              href="/apartments"
              className="mt-6 rounded-xl bg-[#1672E6] px-8 py-3.5 text-base font-semibold text-white shadow-lg transition hover:bg-[#125ec4]"
            >
              Explore Homes
            </Link>
          </div>
        </div>
      </section>

      {/* 6. Frequently Asked Questions */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-10">
        <div className="text-center">
          <h2 className="section-title text-[#1672E6]">Frequently Asked Questions</h2>
          <p className="section-desc mt-2 text-slate-500">
            Find quick answers to the most common questions about our facilities and services.
          </p>
        </div>

        <div className="mt-10 divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-8">
          {homeFaqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div key={faq.q} className="py-5 first:pt-2 last:pb-2">
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-4 text-left"
                >
                  <h3 className="text-base font-semibold text-slate-800 sm:text-lg">
                    {faq.q}
                  </h3>
                  {isOpen ? (
                    <MinusCircle className="h-5 w-5 shrink-0 text-[#1672E6]" />
                  ) : (
                    <PlusCircle className="h-5 w-5 shrink-0 text-[#1672E6]" />
                  )}
                </button>
                {isOpen && (
                  <p className="mt-3 pr-6 text-sm leading-relaxed text-slate-500 sm:text-base">
                    {faq.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 7. Contact Us CTA */}
      <section id="kontakt" className="container scroll-mt-28 mx-auto px-4 pb-20 sm:px-6 lg:px-10">
        <div className="relative overflow-hidden rounded-[24px] bg-[#EEF1F5] px-6 py-12 text-center sm:py-16 shadow-sm">
          <div className="pointer-events-none absolute -right-8 -top-20 h-[320px] w-[520px] rounded-[50%] border-[6px] border-[#bfdbfe]/50" />
          <div className="pointer-events-none absolute right-40 top-0 h-[280px] w-[420px] rounded-[50%] border-[5px] border-[#bfdbfe]/40" />

          <h3 className="relative z-10 text-3xl font-bold text-[#1672E6] sm:text-4xl">
            Interested? Contact us directly.
          </h3>
          <p className="relative z-10 mt-3 text-sm text-slate-600 sm:text-base">
            Our team is here to provide personalized guidance and support. Reach out anytime.
          </p>
          <div className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="mailto:info@0211wohnen.de"
              className="rounded-xl bg-[#1672E6] px-10 py-3.5 text-base font-semibold text-white shadow-md transition hover:bg-[#125ec4]"
            >
              Contact Us: info@0211wohnen.de
            </a>
            <Link
              href="/apartments"
              className="rounded-xl border border-slate-300 bg-white px-8 py-3.5 text-base font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
            >
              Browse Apartments
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

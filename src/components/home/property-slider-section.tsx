/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  CircleCheck,
  Expand,
  Heart,
  Share2,
  ShieldCheck,
  X,
} from "lucide-react";
import { apiBaseUrl, cleanTitle, Estate, estateAvailability, estatePrice, estateImages } from "@/lib/estates";

const fallbackProperties = [
  {
    image: "/images/properties-1.jpg",
    title: "Luxury Design Apartment Unterbilk",
    priceText: "1.700 €",
    pricePeriod: "per month",
    priceLabel: "Pauschalmiete",
    availability: "Available from 01.05.2026",
    slug: "luxury-design-apartment-unterbilk",
  },
  {
    image: "/images/properties-2.jpg",
    title: "Modern Waterfront Loft Medienhafen",
    priceText: "2.100 €",
    pricePeriod: "per month",
    priceLabel: "Pauschalmiete",
    availability: "Available immediately",
    slug: "modern-waterfront-loft-medienhafen",
  },
  {
    image: "/images/properties-3.jpg",
    title: "Elegant Carlstadt City Residence",
    priceText: "1.950 €",
    pricePeriod: "per month",
    priceLabel: "Pauschalmiete",
    availability: "Available from 15.05.2026",
    slug: "elegant-carlstadt-city-residence",
  },
  {
    image: "/images/properties-4.jpg",
    title: "Stylish Pempelfort Garden Studio",
    priceText: "1.450 €",
    pricePeriod: "per month",
    priceLabel: "Pauschalmiete",
    availability: "Available from 01.06.2026",
    slug: "stylish-pempelfort-garden-studio",
  },
];

export function PropertySliderSection() {
  const [items, setItems] = useState<any[]>(fallbackProperties);
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [liked, setLiked] = useState<Record<number, boolean>>({});
  const [copied, setCopied] = useState(false);

  // Fetch real onOffice properties for the slider
  useEffect(() => {
    fetch(`${apiBaseUrl()}/onoffice/estates?limit=6&vermarktungsart=miete`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (Array.isArray(data?.data) && data.data.length > 0) {
          const mapped = data.data
            .map((estate: Estate) => {
              const images = estateImages(estate);
              const price = estatePrice(estate);
              if (!images.length) return null;
              return {
                image: images[0].url,
                title: cleanTitle(estate.objekttitel),
                priceText: price.text,
                pricePeriod: price.period || "per month",
                priceLabel: price.label || "Pauschalmiete",
                availability: estateAvailability(estate),
                slug: estate.slug || String(estate.onofficeId || estate._id),
              };
            })
            .filter(Boolean);

          if (mapped.length > 0) {
            setItems(mapped);
          }
        }
      })
      .catch(() => {
        // Fallback properties already set
      });
  }, []);

  const total = items.length;

  const nextSlide = useCallback(() => {
    setActiveIndex((current) => (current + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    setActiveIndex((current) => (current - 1 + total) % total);
  }, [total]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "Escape") setLightboxOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide]);

  const current = items[activeIndex] || items[0];

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard?.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section className="container mx-auto px-4 pb-20 sm:px-6 lg:px-10">
      <div className="text-center">
        <h2 className="section-title text-[#1672E6]">Our Properties View</h2>
        <p className="section-desc mt-2 text-slate-500">
          Your Guide to Hassle-Free Renting and Stylish, Fully-Furnished Homes
        </p>
      </div>

      <div className="relative mt-8 overflow-hidden rounded-2xl bg-slate-900 shadow-2xl">
        {/* Main Image Slider with Working Transitions */}
        <div className="relative h-[480px] w-full sm:h-[580px] lg:h-[660px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={current.image}
            alt={current.title}
            className="h-full w-full object-cover transition-opacity duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />

          {/* Top Right Actions */}
          <div className="absolute right-4 top-4 flex items-center gap-2 sm:right-8 sm:top-8 sm:gap-3">
            <button
              type="button"
              onClick={() => setLightboxOpen(true)}
              aria-label="Fullscreen view"
              className="rounded-xl bg-white/90 p-2.5 text-slate-700 shadow-md backdrop-blur-sm transition hover:bg-white sm:p-3"
            >
              <Expand className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={handleShare}
              aria-label="Share property"
              className="relative rounded-xl bg-white/90 p-2.5 text-slate-700 shadow-md backdrop-blur-sm transition hover:bg-white sm:p-3"
            >
              <Share2 className="h-5 w-5" />
              {copied && (
                <span className="absolute -bottom-8 right-0 whitespace-nowrap rounded bg-black/80 px-2 py-1 text-xs text-white">
                  Copied!
                </span>
              )}
            </button>
            <button
              type="button"
              onClick={() => setLiked((l) => ({ ...l, [activeIndex]: !l[activeIndex] }))}
              aria-label="Favorite property"
              className={`rounded-xl p-2.5 shadow-md backdrop-blur-sm transition sm:p-3 ${
                liked[activeIndex]
                  ? "bg-red-500 text-white"
                  : "bg-white/90 text-slate-700 hover:bg-white"
              }`}
            >
              <Heart className={`h-5 w-5 ${liked[activeIndex] ? "fill-white" : ""}`} />
            </button>
          </div>

          {/* Left Arrow Button - FULLY FUNCTIONAL WITH ONCLICK */}
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Previous slide"
            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/85 p-3 text-slate-800 shadow-lg backdrop-blur-sm transition hover:scale-110 hover:bg-white sm:left-6"
          >
            <ChevronLeft className="h-6 w-6 sm:h-7 sm:w-7" />
          </button>

          {/* Right Arrow Button - FULLY FUNCTIONAL WITH ONCLICK */}
          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next slide"
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/85 p-3 text-slate-800 shadow-lg backdrop-blur-sm transition hover:scale-110 hover:bg-white sm:right-6"
          >
            <ChevronRight className="h-6 w-6 sm:h-7 sm:w-7" />
          </button>

          {/* Floating Property Info Card */}
          <div className="absolute bottom-24 right-4 z-10 w-[90%] max-w-[340px] rounded-2xl border border-slate-100 bg-white p-5 text-left shadow-2xl sm:bottom-28 sm:right-12">
            <h3 className="line-clamp-1 text-base font-bold text-slate-800 sm:text-lg">
              {current.title}
            </h3>
            <div className="mt-2">
              <span className="text-2xl font-extrabold text-[#1672E6] sm:text-3xl">
                {current.priceText}
              </span>
              <span className="ml-1 text-sm font-medium text-slate-500">
                / {current.pricePeriod}
              </span>
              <p className="text-xs font-semibold text-slate-400">{current.priceLabel}</p>
            </div>

            <div className="mt-3 flex items-center gap-2 text-xs font-medium text-slate-600">
              <CircleCheck className="h-4 w-4 text-[#22C55E]" />
              <span>{current.availability}</span>
            </div>

            <Link
              href={`/apartments/${encodeURIComponent(current.slug)}`}
              className="mt-4 flex w-full items-center justify-center rounded-xl bg-[#1672E6] py-2.5 text-center text-sm font-semibold text-white shadow-md transition hover:bg-[#125ec4]"
            >
              Enquire Now
            </Link>

            <div className="mt-3 flex items-center justify-center gap-1.5 text-xs text-slate-400">
              <ShieldCheck className="h-4 w-4 text-slate-400" />
              <span>Verified provider</span>
            </div>
          </div>

          {/* Bottom Thumbnails */}
          <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2.5 overflow-x-auto px-4 py-1">
            {items.map((item, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`relative h-14 w-24 shrink-0 overflow-hidden rounded-lg border-2 shadow-md transition sm:h-16 sm:w-28 ${
                  activeIndex === idx
                    ? "border-white ring-2 ring-[#1672E6]"
                    : "border-white/60 opacity-70 hover:opacity-100"
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.image} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm">
          <button
            type="button"
            onClick={() => setLightboxOpen(false)}
            className="absolute right-6 top-6 rounded-full bg-white/20 p-3 text-white transition hover:bg-white/40"
            aria-label="Close fullscreen"
          >
            <X className="h-6 w-6" />
          </button>
          <div className="relative max-h-[85vh] max-w-[90vw]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={current.image}
              alt={current.title}
              className="max-h-[85vh] max-w-[90vw] rounded-xl object-contain shadow-2xl"
            />
            <div className="mt-3 text-center text-sm font-semibold text-white">
              {current.title} · {current.priceText} ({activeIndex + 1} / {total})
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

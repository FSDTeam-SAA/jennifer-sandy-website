"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, CircleCheck, Expand, Heart, MapPin, MinusCircle, PlusCircle, Share2, Shield, ShieldCheck } from "lucide-react";

const popularAreas = [
  { title: "Studio Apartments", count: "08 Apartments", image: "/images/properties-1.jpg" },
  { title: "Old Town Lifestyle", count: "15 Apartments", image: "/images/properties-2.jpg" },
  { title: "1-2 Bedroom Apartments", count: "12 Apartments", image: "/images/properties-3.jpg" },
  { title: "Luxury Apartments", count: "05 Apartments", image: "/images/properties-4.jpg" },
];

const propertyImages = ["/images/properties-2.jpg", "/images/properties-3.jpg", "/images/properties-4.jpg"];

export function HomeContentSections() {
  const [activePropertyImage, setActivePropertyImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setActivePropertyImage((p) => (p + 1) % propertyImages.length), 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <section className="container mx-auto px-6 lg:px-10">
        <div className="mb-6 flex items-center gap-3"><h2 className="section-title text-[#1672E6]">Map View</h2><Shield className="h-9 w-9 text-[#1672E6]" strokeWidth={2.2} /></div>
        <div className="relative h-[300px] overflow-hidden rounded-md bg-[#D8D8D8]">
          <div className="absolute left-0 top-0 h-full w-[23%] bg-[#6ea8e8]" /><div className="absolute right-0 top-0 h-full w-[25%] bg-[#8ecfae]" />
          <div className="absolute left-[21%] top-[20%] h-[65%] w-[60%] rounded-[120px] border-[24px] border-[#f0de23]" />
          <div className="absolute inset-0 opacity-65"><div className="absolute left-[2%] top-[35%] h-[10px] w-[96%] rotate-[8deg] bg-white/80" /><div className="absolute left-[4%] top-[58%] h-[9px] w-[90%] -rotate-[12deg] bg-white/80" /><div className="absolute left-[30%] top-[10%] h-[8px] w-[60%] rotate-[20deg] bg-white/80" /></div>
          <MapPin className="absolute left-[33%] top-[42%] h-12 w-12 fill-red-600 text-red-600" /><MapPin className="absolute left-[73%] top-[25%] h-12 w-12 fill-red-600 text-red-600" />
        </div>
      </section>

      <section className="container mx-auto px-6 lg:px-10">
        <h2 className="section-title text-[#1672E6]">Popular Areas</h2>
        <p className="section-desc mt-2 text-slate-500">Move In Ready: Professional Furnished Apartments, Zero Agent Fees</p>
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {popularAreas.map((area) => (
            <article key={area.title} className="overflow-hidden rounded-lg bg-[#EEF0F3]"><div className="relative h-[320px] w-full"><Image src={area.image} alt={area.title} fill className="object-cover" /></div><div className="flex items-center justify-between px-4 pb-2 pt-4"><h3 className="text-xl text-[#1672E6]">{area.title}</h3><ArrowRight className="h-5 w-5 text-[#1672E6]" /></div><p className="px-4 pb-4 text-sm text-[#6EA8E8]">{area.count}</p></article>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-6 pb-20 lg:px-10">
        <h2 className="section-title text-center text-[#1672E6]">Our Properties View</h2>
        <p className="section-desc mt-2 text-center text-slate-500">Your Guide to Hassle-Free Renting and Stylish, Fully-Furnished Homes</p>
        <div className="relative mt-8 overflow-hidden rounded-[10px]">
          <Image src={propertyImages[activePropertyImage]} alt="Active property view" width={1500} height={850} className="h-[620px] w-full object-cover transition-opacity duration-500" />
          <div className="absolute right-8 top-8 flex items-center gap-3"><button className="rounded-xl bg-white/90 p-3 text-slate-700 shadow-sm"><Expand className="h-6 w-6" /></button><button className="rounded-xl bg-white/90 p-3 text-slate-700 shadow-sm"><Share2 className="h-6 w-6" /></button><button className="rounded-xl bg-white/90 p-3 text-slate-700 shadow-sm"><Heart className="h-6 w-6" /></button></div>
          <button className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/70 p-3 text-slate-700"><ChevronLeft className="h-7 w-7" /></button>
          <button className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/70 p-3 text-slate-700"><ChevronRight className="h-7 w-7" /></button>
          <div className="absolute bottom-[165px] right-16 w-[320px] rounded-xl bg-white p-4 text-center shadow-xl"><h3 className="text-3xl font-semibold text-[#1672E6]">1.800 EUR</h3><p className="text-lg text-slate-600">per month</p><div className="mt-2 flex items-center justify-center gap-2 text-sm text-slate-500"><CircleCheck className="h-5 w-5 text-[#22C55E]" /> Available from 01.05.2026</div><button className="mt-3 w-full rounded-md bg-[#1672E6] py-2.5 text-sm font-medium text-white">Enquire Now</button><div className="mt-3 flex items-center justify-center gap-2 text-sm text-slate-400"><ShieldCheck className="h-4 w-4" />Verified provider</div></div>
          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-4">{propertyImages.map((thumb, index) => (<button key={thumb} type="button" onClick={() => setActivePropertyImage(index)} className={`relative h-[98px] w-[170px] overflow-hidden rounded-lg border transition ${activePropertyImage === index ? "border-white" : "border-white/70"}`}><Image src={thumb} alt="Property thumbnail" fill className="object-cover" /></button>))}</div>
        </div>
      </section>

      <section className="container mx-auto px-6 lg:px-10">
        <h2 className="section-title text-[#1672E6]">From Our Blog</h2>
        <p className="section-desc mt-2 text-slate-500">Your Guide to Hassle-Free Renting and Stylish, Fully-Furnished Homes</p>
        <article className="mt-8 grid overflow-hidden rounded-lg border border-slate-200 bg-white lg:grid-cols-2"><div className="relative h-[330px] w-full lg:h-[420px]"><Image src="/images/blog.jpg" alt="Blog cover" fill className="object-cover" /></div><div className="p-6 lg:p-8"><h3 className="text-2xl font-medium leading-[140%] text-slate-700">Living in the Media Harbour: The ultimate guide for expats</h3><p className="section-desc mt-4 align-middle tracking-normal text-slate-500">Discover the best places to live, top-rated restaurants, trendy bars, and exciting leisure activities in Dusseldorf&apos;s most modern district. From vibrant nightlife to cultural hotspots, art galleries, and scenic waterfront views, we&apos;ll guide you through everything that makes the Media Harbor perfect for expats seeking a dynamic and cosmopolitan lifestyle. Learn insider tips on local living, hidden gems, and community events that will help you feel at home in this bustling urban hub.</p><button className="mt-7 inline-flex items-center gap-2 text-lg font-semibold text-[#1672E6]">Read more <ArrowRight className="h-6 w-6" /></button></div></article>
      </section>

      <section className="container mx-auto px-6 pb-24 lg:px-10">
        <div className="relative overflow-hidden rounded-[20px]"><Image src="/images/banner.jpg" alt="Explore homes banner" width={1600} height={650} className="h-[420px] w-full object-cover" /><div className="absolute inset-0 bg-black/35" /><div className="absolute inset-0 flex flex-col items-center justify-center px-10 text-center text-white"><h3 className="section-title text-white">Find <span className="text-[#1672E6]">Your Perfect</span> Home</h3><p className="banner-desc mt-4 text-white/90">Easily search, compare, and connect with professionally managed apartments and homes. Whether you&apos;re looking for a cozy studio, a family-friendly space, or a stylish city pad, we help you find a safe, comfortable, and move-in ready home without agents or hidden fees.</p><button className="mt-8 rounded-lg bg-[#1672E6] px-8 py-3 text-base font-semibold text-white">Explore Homes</button></div></div>
      </section>

      <section className="container mx-auto px-6 lg:px-10">
        <div className="text-center"><h2 className="section-title text-[#1672E6]">Frequently Asked Questions</h2><p className="section-desc mt-2 text-slate-500">Find quick answers to the most common questions about our facilities and services.</p></div>
        <div className="mt-10 divide-y divide-slate-200 border-y border-slate-200"><div className="py-5"><div className="flex items-center justify-between gap-4"><h3 className="text-xl text-slate-700">How does the booking process work?</h3><MinusCircle className="h-5 w-5 text-[#1672E6]" /></div><p className="mt-2 pr-10 text-base leading-[170%] text-slate-500">Our booking process is simple and digital. After you submit your request, we will review it and send you a digital rental agreement for signature. Attached you will receive all the necessary information for your move-in. We are here to support you every step of the way.</p></div>{["What is included in the additional costs?","Can I view the apartment?","How long is the lease?","How does billing work?","How do I change my account email?"].map((item) => (<div key={item} className="flex items-center justify-between py-5"><h3 className="text-xl text-slate-700">{item}</h3><PlusCircle className="h-5 w-5 text-[#1672E6]" /></div>))}</div>
      </section>

      <section className="container mx-auto px-6 pb-24 lg:px-10">
        <div className="relative overflow-hidden rounded-[18px] bg-[#EEF1F5] px-6 py-10 text-center"><div className="pointer-events-none absolute -right-8 -top-20 h-[320px] w-[520px] rounded-[50%] border-[6px] border-[#bfdbfe]" /><div className="pointer-events-none absolute right-40 top-0 h-[280px] w-[420px] rounded-[50%] border-[5px] border-[#bfdbfe]" /><h3 className="section-title relative z-10 text-[#1672E6]">Interested? Contact us directly.</h3><p className="section-desc relative z-10 mt-2 text-slate-500">Our team is here to provide personalized guidance and support reach out anytime.</p><button className="relative z-10 mt-8 rounded-lg bg-[#1672E6] px-12 py-3 text-base font-semibold text-white">Contact Us</button></div>
      </section>
    </>
  );
}

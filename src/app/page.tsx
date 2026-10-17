"use client";

import { useState } from "react";
import { HomeHeroSection } from "@/components/home/home-hero-section";
import { HomeContentSections } from "@/components/home/home-sections";
import { SiteFooter } from "@/components/shared/site-footer";
import { SiteHeader } from "@/components/shared/site-header";

export default function Home() {
  const [filters, setFilters] = useState<{
    availableFrom?: string;
    district?: string;
  }>();

  const handleSelectDistrict = (district: string) => {
    setFilters((prev) => ({ ...prev, district }));
    const el = document.getElementById("wohnungen");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-10 font-manrope">
      <SiteHeader />
      <main className="mt-6 space-y-20">
        <HomeHeroSection onSearch={(f) => setFilters(f)} />
        <HomeContentSections
          filters={filters}
          onSelectDistrict={handleSelectDistrict}
        />
      </main>
      <SiteFooter />
    </div>
  );
}

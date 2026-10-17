"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { BedDouble, Calendar, CheckCircle2, ChevronDown, MapPin, Minus, Plus, Search } from "lucide-react";
import { apiBaseUrl } from "@/lib/estates";

const districts = [
  { value: "", label: "All Districts" },
  { value: "Medienhafen", label: "Medienhafen" },
  { value: "Carlstadt", label: "Carlstadt" },
  { value: "Unterbilk", label: "Unterbilk" },
  { value: "Pempelfort", label: "Pempelfort" },
  { value: "Friedrichstadt", label: "Friedrichstadt" },
  { value: "Bilk", label: "Bilk" },
  { value: "Stadtmitte", label: "Stadtmitte" },
  { value: "Düsseltal", label: "Düsseltal" },
  { value: "Oberbilk", label: "Oberbilk" },
  { value: "Derendorf", label: "Derendorf" },
  { value: "Golzheim", label: "Golzheim" },
  { value: "Rath", label: "Rath" },
  { value: "Flingern", label: "Flingern" },
];

export function HomeHeroSection({
  onSearch,
}: {
  onSearch?: (filters: { availableFrom: string; district: string; minRooms: string }) => void;
}) {
  const [availableFrom, setAvailableFrom] = useState("");
  const [district, setDistrict] = useState("");
  const [rooms, setRooms] = useState(1);
  const [totalCount, setTotalCount] = useState<number | null>(null);

  useEffect(() => {
    fetch(`${apiBaseUrl()}/onoffice/estates?limit=1`)
      .then((res) => res.json())
      .then((data) => {
        if (typeof data?.meta?.total === "number" && data.meta.total > 0) {
          setTotalCount(data.meta.total);
        }
      })
      .catch(() => {});
  }, []);

  const handleSearch = () => {
    if (onSearch) {
      onSearch({
        availableFrom,
        district,
        minRooms: rooms > 1 ? String(rooms) : "",
      });
    }
    const el = document.getElementById("wohnungen");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-10">
      <div className="relative overflow-hidden rounded-[24px] shadow-2xl">
        <Image
          src="/images/home-banner.jpg"
          alt="Luxury home in Duesseldorf"
          width={1600}
          height={950}
          className="h-[640px] w-full object-cover sm:h-[720px] lg:h-[780px]"
          priority
        />
        <div className="absolute inset-0 bg-black/45" />

        <div className="absolute inset-x-0 top-[18%] sm:top-[22%] flex flex-col items-center px-4 text-center">
          <h1 className="banner-title max-w-4xl text-3xl font-bold leading-tight text-[#E6F2FD] sm:text-5xl lg:text-6xl">
            Your Desire Home in Duesseldorf
          </h1>
          <p className="banner-desc mt-3 max-w-2xl text-sm leading-relaxed text-white/90 sm:text-base lg:text-lg">
            Furnished apartments from professionals. No agents. No fees.
          </p>

          {/* Floating Search Bar matching Image 1 */}
          <div className="mt-8 sm:mt-10 w-full max-w-5xl rounded-2xl bg-white p-3 sm:p-4 shadow-2xl">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-[1.1fr_1.1fr_1.3fr_auto] lg:items-center">
              {/* Column 1: Available From */}
              <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-left lg:border-0 lg:border-r lg:bg-transparent lg:pr-4">
                <Calendar className="h-5 w-5 shrink-0 text-[#1672E6]" />
                <div className="min-w-0 flex-1">
                  <label htmlFor="hero-available" className="block text-xs font-semibold text-slate-700">
                    Available From
                  </label>
                  <input
                    id="hero-available"
                    type="date"
                    value={availableFrom}
                    onChange={(e) => setAvailableFrom(e.target.value)}
                    className="w-full bg-transparent text-sm text-slate-600 outline-none"
                    placeholder="mm/dd/yyyy"
                  />
                </div>
              </div>

              {/* Column 2: District */}
              <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-left lg:border-0 lg:border-r lg:bg-transparent lg:px-4">
                <MapPin className="h-5 w-5 shrink-0 text-[#1672E6]" />
                <div className="min-w-0 flex-1">
                  <label htmlFor="hero-district" className="block text-xs font-semibold text-slate-700">
                    District
                  </label>
                  <div className="relative">
                    <select
                      id="hero-district"
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                      className="w-full cursor-pointer appearance-none bg-transparent pr-5 text-sm text-slate-600 outline-none"
                    >
                      {districts.map((d) => (
                        <option key={d.value} value={d.value}>
                          {d.label}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-0 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
                  </div>
                </div>
              </div>

              {/* Column 3: Room Slider */}
              <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-left lg:border-0 lg:bg-transparent lg:px-4">
                <BedDouble className="h-5 w-5 shrink-0 text-[#1672E6]" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <label htmlFor="hero-rooms" className="text-xs font-semibold text-slate-700">
                      Room
                    </label>
                    <span className="text-xs font-bold text-[#1672E6]">
                      {rooms <= 1 ? "1+ Room" : `${rooms} Rooms`}
                    </span>
                  </div>
                  <div className="mt-1 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setRooms((r) => Math.max(1, r - 1))}
                      className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-300"
                      aria-label="Decrease rooms"
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <input
                      id="hero-rooms"
                      type="range"
                      min={1}
                      max={6}
                      step={1}
                      value={rooms}
                      onChange={(e) => setRooms(Number(e.target.value))}
                      className="h-1.5 w-full cursor-pointer accent-[#1672E6]"
                    />
                    <button
                      type="button"
                      onClick={() => setRooms((r) => Math.min(6, r + 1))}
                      className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-300"
                      aria-label="Increase rooms"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Column 4: Search Button */}
              <button
                type="button"
                onClick={handleSearch}
                className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#1672E6] px-8 text-base font-semibold text-white shadow-md transition hover:bg-[#125ec4] lg:w-auto"
              >
                <Search className="h-5 w-5" />
                <span>Search</span>
              </button>
            </div>
          </div>

          {/* 3 checkmarks matching Image 1 */}
          <div className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-medium text-white sm:text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-[#00E36E] sm:h-5 sm:w-5" />
              <span>{totalCount !== null ? `${totalCount} Apartments` : "138 Apartments"}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-[#00E36E] sm:h-5 sm:w-5" />
              <span>100% Full-Service</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-[#00E36E] sm:h-5 sm:w-5" />
              <span>Only Duesseldorf</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

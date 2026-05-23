import Image from "next/image";
import { BedDouble, Calendar, ChevronDown, CircleCheck, MapPin, Minus, Plus, Search } from "lucide-react";

export function HomeHeroSection() {
  return (
    <section className="container mx-auto px-6 lg:px-10">
      <div className="relative overflow-hidden rounded-[24px]">
        <Image src="/images/home-banner.jpg" alt="Luxury home" width={1600} height={950} className="h-[760px] w-full object-cover" priority />
        <div className="absolute inset-0 bg-black/45" />

        <div className="absolute inset-x-0 top-[30%] flex flex-col items-center px-6 text-center">
          <h1 className="banner-title text-[#E6F2FD]">Your Desire Home in Duesseldorf</h1>
          <p className="banner-desc mt-3 text-white/90">Furnished apartments from professionals. No agents. No fees.</p>

          <div className="mt-10 flex w-full items-center rounded-xl bg-white px-4 py-4 shadow-xl lg:px-6">
            <div className="flex flex-1 items-center gap-3 border-r border-slate-300 pr-4">
              <div className="space-y-1 text-slate-500"><Calendar className="h-5 w-5" /><Calendar className="h-5 w-5" /></div>
              <div className="text-left">
                <p className="text-base font-medium text-slate-700 lg:text-lg">Available From</p>
                <p className="mt-1 text-sm text-slate-500 lg:text-base">mm/dd/yyyy</p>
              </div>
            </div>

            <div className="flex flex-1 items-center gap-3 border-r border-slate-300 px-4">
              <div className="space-y-1 text-slate-500"><MapPin className="h-5 w-5" /><MapPin className="h-5 w-5" /></div>
              <div className="text-left">
                <p className="text-base font-medium text-slate-700 lg:text-lg">District</p>
                <div className="mt-1 flex items-center gap-2 text-sm text-slate-500 lg:text-base"><span>e.g. Media Harbour</span><ChevronDown className="h-4 w-4" /></div>
              </div>
            </div>

            <div className="flex flex-1 items-center gap-3 px-4">
              <BedDouble className="h-5 w-5 text-slate-500" />
              <div className="flex-1 text-left">
                <p className="text-base font-medium text-slate-700 lg:text-lg">Room</p>
                <div className="mt-2 flex items-center gap-3 text-slate-500"><Minus className="h-4 w-4" /><input type="range" min={1} max={6} defaultValue={3} className="h-2 w-full accent-[#1672E6]" /><Plus className="h-4 w-4" /></div>
              </div>
            </div>

            <button className="ml-3 flex h-12 min-w-[150px] items-center justify-center gap-2 rounded-md bg-[#1672E6] px-5 text-base text-white"><Search className="h-5 w-5" /> Search</button>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-8 text-sm text-white lg:text-base">
            <div className="flex items-center gap-2"><CircleCheck className="h-5 w-5 text-[#00E36E]" /><span>120+ Apartments</span></div>
            <div className="flex items-center gap-2"><CircleCheck className="h-5 w-5 text-[#00E36E]" /><span>100% Full-Service</span></div>
            <div className="flex items-center gap-2"><CircleCheck className="h-5 w-5 text-[#00E36E]" /><span>Only Duesseldorf</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}

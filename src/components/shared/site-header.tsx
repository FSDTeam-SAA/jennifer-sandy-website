"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Apartments", href: "#" },
  { label: "Landlords", href: "#" },
  { label: "About Us", href: "/about" },
  { label: "Blogs", href: "/blogs" },
  { label: "FAQs", href: "/faqs" },
  { label: "Contact Us", href: "#" },
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-[#F8F9FA]/95 backdrop-blur">
      <div className="container mx-auto flex h-20 items-center justify-between px-6 lg:px-10">
        <Link href="/" className="font-serif text-[32px] font-bold leading-[150%] text-[#1672E6]">
          o211wohnen
        </Link>

        <nav className="hidden items-center gap-8 font-manrope text-[16px] font-semibold leading-[150%] text-slate-600 lg:flex">
          {navLinks.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href === "/blogs" && pathname.startsWith("/blogs/"));
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`border-b-2 pb-1 text-center align-middle transition-colors ${
                  isActive
                    ? "border-[#1672E6] text-[#1672E6]"
                    : "border-transparent text-slate-600 hover:border-[#1672E6]/60 hover:text-[#1672E6]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <button className="rounded-xl bg-[#1672E6] px-8 py-3 text-base font-semibold text-white">Sign in</button>
      </div>
    </header>
  );
}

import Link from "next/link";
import Image from "next/image";

export function SiteFooter() {
  return (
    <footer className="relative mt-28 bg-[#E6F2FD]">
      <div className="container mx-auto px-6 py-12 lg:px-10">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4 md:items-center md:pr-[260px]">
          <div>
            <h4 className="font-serif text-4xl font-bold text-[#1672E6]">Dusseldorf</h4>
            <p className="mt-3 text-sm leading-6 text-slate-500">
              Your trusted partner for furnished temporary accommodation in Dusseldorf.
            </p>
            <div className="mt-4 flex items-center gap-3">
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-8 w-8 items-center justify-center rounded bg-[#5AA2EC] text-white transition hover:bg-[#1672E6]"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-8 w-8 items-center justify-center rounded bg-[#5AA2EC] text-white transition hover:bg-[#1672E6]"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                  <path d="M6.94 8.5A1.44 1.44 0 1 1 6.93 5.6a1.44 1.44 0 0 1 0 2.9ZM5.75 9.75h2.37v8.65H5.75V9.75Zm3.86 0h2.27v1.18h.03c.32-.6 1.1-1.24 2.27-1.24 2.43 0 2.88 1.6 2.88 3.68v5.03h-2.37V14.1c0-1.03-.02-2.35-1.43-2.35-1.44 0-1.66 1.12-1.66 2.27v4.38H9.61V9.75Z" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h5 className="text-sm font-semibold text-slate-700">For tenants</h5>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li>
                <Link href="/apartments" className="transition hover:text-[#1672E6]">Find apartments</Link>
              </li>
              <li>
                <Link href="/blogs" className="transition hover:text-[#1672E6]">Magazine</Link>
              </li>
              <li>
                <Link href="/faqs" className="transition hover:text-[#1672E6]">FAQs</Link>
              </li>
              <li>
                <Link href="/#kontakt" className="transition hover:text-[#1672E6]">Contact Us</Link>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="text-sm font-semibold text-slate-700">For landlords</h5>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li>
                <Link href="/#kontakt" className="transition hover:text-[#1672E6]">Apartment valuation</Link>
              </li>
              <li>
                <Link href="/#kontakt" className="transition hover:text-[#1672E6]">Landlord Service</Link>
              </li>
              <li>
                <Link href="/about" className="transition hover:text-[#1672E6]">Process</Link>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="text-sm font-semibold text-slate-700">Legal</h5>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li>
                <Link href="/about" className="transition hover:text-[#1672E6]">Legal Notice</Link>
              </li>
              <li>
                <Link href="/about" className="transition hover:text-[#1672E6]">Privacy Policy</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-[#c5ddf7] pt-3 text-xs text-slate-500">
          © {new Date().getFullYear()} Dusseldorf. All rights reserved.
        </div>
      </div>

      <div className="pointer-events-none absolute right-6 -top-[118px] hidden md:block lg:right-12">
        <Image
          src="/images/phone.png"
          alt="Mobile preview"
          width={220}
          height={390}
          className="h-[430px] w-auto object-contain"
        />
      </div>
    </footer>
  );
}

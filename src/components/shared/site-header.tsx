/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { Menu, X, User, LogOut, KeyRound, LayoutDashboard, ChevronDown } from "lucide-react";
import LanguageSwitcher from "@/components/language-switcher";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Apartments", href: "/apartments" },
  { label: "Landlords", href: "/#kontakt" },
  { label: "About Us", href: "/about" },
  { label: "Blogs", href: "/blogs" },
  { label: "FAQs", href: "/faqs" },
  { label: "Contact Us", href: "/#kontakt" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const user = session?.user as any;
  const displayName = user?.fullName || user?.name || user?.firstName || user?.email?.split("@")[0] || "Account";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 sm:px-6 lg:px-10">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2" onClick={() => setMobileOpen(false)}>
          <Image
            src="/images/header-logo.png"
            alt="0211wohnen"
            width={170}
            height={55}
            className="h-12 w-auto object-contain"
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <nav
          aria-label="Main Navigation"
          className="hidden items-center gap-7 font-manrope text-[15px] font-semibold text-slate-600 xl:flex"
        >
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : link.href.startsWith("/#")
                ? false
                : pathname === link.href || (link.href === "/blogs" && pathname.startsWith("/blogs/"));
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`border-b-2 py-1 transition-colors ${
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

        {/* Right side: Language Switcher + User/Sign In */}
        <div className="hidden items-center gap-3.5 sm:flex">
          <LanguageSwitcher />

          {status === "authenticated" && user ? (
            <div ref={profileRef} className="relative">
              <button
                type="button"
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-100"
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1672E6] text-xs font-bold text-white">
                  {displayName.charAt(0).toUpperCase()}
                </div>
                <span className="max-w-[120px] truncate">{displayName}</span>
                <ChevronDown className="h-4 w-4 text-slate-400" />
              </button>

              {profileOpen && (
                <div className="absolute right-0 top-12 z-50 w-52 overflow-hidden rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl">
                  <div className="border-b border-slate-100 px-3 py-2 text-xs text-slate-500">
                    <p className="font-semibold text-slate-800">{displayName}</p>
                    <p className="truncate text-slate-400">{user.email}</p>
                  </div>
                  <Link
                    href="/profile"
                    onClick={() => setProfileOpen(false)}
                    className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-50"
                  >
                    <User className="h-4 w-4 text-slate-500" />
                    <span>Profile</span>
                  </Link>
                  <Link
                    href="/change-password"
                    onClick={() => setProfileOpen(false)}
                    className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-50"
                  >
                    <KeyRound className="h-4 w-4 text-slate-500" />
                    <span>Change Password</span>
                  </Link>
                  {user.role === "admin" && (
                    <a
                      href="http://localhost:3001"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-[#1672E6] transition hover:bg-blue-50"
                    >
                      <LayoutDashboard className="h-4 w-4" />
                      <span>Admin Dashboard</span>
                    </a>
                  )}
                  <div className="my-1 border-t border-slate-100" />
                  <button
                    type="button"
                    onClick={() => {
                      setProfileOpen(false);
                      signOut({ callbackUrl: "/" });
                    }}
                    className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-red-600 transition hover:bg-red-50"
                  >
                    <LogOut className="h-4 w-4 text-red-500" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/login"
              className="flex h-10 items-center justify-center rounded-xl bg-[#1672E6] px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-[#125ec4]"
            >
              Sign in
            </Link>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center gap-2 xl:hidden">
          <LanguageSwitcher />
          <button
            type="button"
            className="rounded-lg p-2 text-slate-700 hover:bg-slate-100"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile nav dropdown */}
      {mobileOpen && (
        <nav
          aria-label="Mobile Navigation"
          className="border-t border-slate-100 bg-white px-6 py-4 shadow-lg xl:hidden"
        >
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="rounded-lg px-3 py-2.5 text-base font-semibold text-slate-700 hover:bg-slate-50"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-3 border-t border-slate-100 pt-3">
              {status === "authenticated" && user ? (
                <>
                  <Link
                    href="/profile"
                    className="flex items-center gap-2 px-3 py-2 text-sm text-slate-700"
                    onClick={() => setMobileOpen(false)}
                  >
                    <User className="h-4 w-4" /> Profile ({displayName})
                  </Link>
                  <Link
                    href="/change-password"
                    className="flex items-center gap-2 px-3 py-2 text-sm text-slate-700"
                    onClick={() => setMobileOpen(false)}
                  >
                    <KeyRound className="h-4 w-4" /> Change Password
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      setMobileOpen(false);
                      signOut({ callbackUrl: "/" });
                    }}
                    className="mt-2 flex w-full items-center gap-2 px-3 py-2 text-sm text-red-600"
                  >
                    <LogOut className="h-4 w-4" /> Sign Out
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  className="flex h-11 w-full items-center justify-center rounded-xl bg-[#1672E6] text-center font-semibold text-white"
                  onClick={() => setMobileOpen(false)}
                >
                  Sign in
                </Link>
              )}
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}

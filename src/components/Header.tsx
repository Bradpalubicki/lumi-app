"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Star, LayoutDashboard } from "lucide-react";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

const nav = [
  { href: "/how-it-works", label: "How It Works" },
  { href: "/safety", label: "Safety" },
  { href: "/pricing", label: "Pricing" },
  { href: "/parents", label: "For Parents" },
  { href: "/blog", label: "Blog" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#0f0a1e]/95 backdrop-blur border-b border-indigo-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center">
              <Star className="w-4 h-4 text-white fill-white" />
            </div>
            <span className="text-xl font-black text-white tracking-tight">Lumi</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {nav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="text-sm font-semibold text-indigo-200 hover:text-white transition-colors"
              >
                {n.label}
              </Link>
            ))}
          </nav>

          {/* CTA / Auth */}
          <div className="hidden md:flex items-center gap-3">
            <SignedOut>
              <Link
                href="/sign-in"
                className="text-sm font-semibold text-indigo-200 hover:text-white transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/app"
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-4 py-2 rounded-lg text-sm transition-colors"
              >
                Try Lumi Free
              </Link>
            </SignedOut>
            <SignedIn>
              <Link
                href="/dashboard"
                className="flex items-center gap-1.5 text-sm font-semibold text-indigo-200 hover:text-white transition-colors"
              >
                <LayoutDashboard className="w-4 h-4" />
                Dashboard
              </Link>
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "w-8 h-8",
                    userButtonPopoverCard: "bg-[#1a1030] border border-indigo-800/40",
                    userButtonPopoverActionButton: "text-indigo-200 hover:text-white",
                  },
                }}
              />
            </SignedIn>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 text-indigo-300"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-[#0f0a1e] border-t border-indigo-900/40 px-4 py-4 flex flex-col gap-3">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className="text-base font-semibold text-indigo-200 hover:text-white py-1"
            >
              {n.label}
            </Link>
          ))}
          <SignedOut>
            <Link
              href="/sign-in"
              onClick={() => setOpen(false)}
              className="mt-2 border border-indigo-700 text-indigo-300 font-bold px-4 py-3 rounded-lg text-center"
            >
              Sign In
            </Link>
            <Link
              href="/app"
              onClick={() => setOpen(false)}
              className="bg-indigo-600 text-white font-bold px-4 py-3 rounded-lg text-center"
            >
              Try Lumi Free
            </Link>
          </SignedOut>
          <SignedIn>
            <Link
              href="/dashboard"
              onClick={() => setOpen(false)}
              className="mt-2 border border-indigo-700 text-indigo-300 font-bold px-4 py-3 rounded-lg text-center flex items-center justify-center gap-2"
            >
              <LayoutDashboard className="w-4 h-4" />
              Dashboard
            </Link>
          </SignedIn>
        </div>
      )}
    </header>
  );
}

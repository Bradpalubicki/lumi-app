import Link from "next/link";
import { Star, Shield } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#080514] border-t border-indigo-900/30 mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center">
                <Star className="w-4 h-4 text-white fill-white" />
              </div>
              <span className="text-xl font-black text-white">Lumi</span>
            </div>
            <p className="text-indigo-300 text-sm leading-relaxed max-w-xs">
              Your child&apos;s AI learning companion — built for their age, powered by the world&apos;s safest AI.
            </p>
            <div className="flex items-center gap-2 mt-4">
              <Shield className="w-4 h-4 text-green-400" />
              <span className="text-xs text-green-400 font-semibold">COPPA Compliant · Parent Controlled · No Ads</span>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-bold mb-3 text-sm">Product</h4>
            <ul className="space-y-2">
              {[
                { href: "/app", label: "Try Lumi" },
                { href: "/how-it-works", label: "How It Works" },
                { href: "/pricing", label: "Pricing" },
                { href: "/parents", label: "For Parents" },
                { href: "/safety", label: "Safety" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-indigo-300 hover:text-white text-sm transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-3 text-sm">Company</h4>
            <ul className="space-y-2">
              {[
                { href: "/blog", label: "Blog" },
                { href: "/privacy", label: "Privacy Policy" },
                { href: "/terms", label: "Terms of Service" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-indigo-300 hover:text-white text-sm transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-indigo-900/30 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-indigo-400 text-xs">
            © {new Date().getFullYear()} Lumi by NuStack Digital Ventures. All rights reserved.
          </p>
          <p className="text-indigo-400 text-xs">
            Powered by Claude AI · Built for curious kids everywhere
          </p>
        </div>
      </div>
    </footer>
  );
}

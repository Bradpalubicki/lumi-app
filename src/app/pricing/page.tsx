import type { Metadata } from "next";
import Link from "next/link";
import { Check, Star, ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Pricing — Lumi AI Learning Companion",
  description: "Start free with 15 conversations per day. Upgrade to Family Plan for $9.99/month — unlimited voice, parent controls, and conversation history. 30-day free trial.",
};

const schema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "Is there a free trial?", acceptedAnswer: { "@type": "Answer", text: "Yes — the Family Plan includes a 30-day free trial. No credit card required to start the free tier." } },
    { "@type": "Question", name: "Can I cancel anytime?", acceptedAnswer: { "@type": "Answer", text: "Yes. Cancel anytime, no questions asked, no fees. Your plan continues until the end of the billing period." } },
    { "@type": "Question", name: "What's included in the free plan?", acceptedAnswer: { "@type": "Answer", text: "15 conversations per day, text mode only, all 3 age modes. No credit card required." } },
  ],
};

export default function PricingPage() {
  return (
    <div className="py-16 px-4">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-black text-white mb-4">Simple, Honest Pricing</h1>
          <p className="text-indigo-300 text-xl">No tricks. No upsells. No ads. Just Lumi.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {/* Free */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-10">
            <div className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-3">Free Forever</div>
            <div className="text-5xl font-black text-white mb-2">$0</div>
            <p className="text-indigo-300 mb-8">For families who want to try Lumi without any commitment.</p>
            <ul className="space-y-4 mb-10">
              {[
                ["15 conversations per day", true],
                ["Text chat mode", true],
                ["All 3 age modes (4-5, 6-8, 9-12)", true],
                ["Safety filters", true],
                ["No credit card required", true],
                ["Voice mode", false],
                ["Parent controls & digest", false],
                ["Conversation history", false],
                ["Unlimited conversations", false],
              ].map(([label, included]) => (
                <li key={String(label)} className={`flex items-center gap-3 text-sm ${included ? "text-indigo-200" : "text-indigo-500 line-through"}`}>
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${included ? "bg-green-700" : "bg-white/5"}`}>
                    {included && <Check className="w-3 h-3 text-white" />}
                  </span>
                  {String(label)}
                </li>
              ))}
            </ul>
            <Link href="/app" className="block text-center border border-indigo-600 hover:border-indigo-500 text-indigo-300 hover:text-white font-bold py-4 rounded-xl transition-colors text-lg">
              Start Free Now
            </Link>
          </div>

          {/* Family Plan */}
          <div className="bg-gradient-to-br from-indigo-600/20 to-violet-600/20 border border-indigo-500/40 rounded-2xl p-10 relative">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-400 text-black text-sm font-black px-5 py-1.5 rounded-full whitespace-nowrap">
              Most Popular — 30-Day Free Trial
            </div>
            <div className="text-xs font-bold text-yellow-400 uppercase tracking-widest mb-3 mt-4">Family Plan</div>
            <div className="text-5xl font-black text-white mb-1">$9.99<span className="text-2xl text-indigo-300">/mo</span></div>
            <p className="text-indigo-400 text-sm mb-1">or $79.99/year (save $40)</p>
            <p className="text-indigo-300 mb-8">Everything in Free, plus the full Lumi experience.</p>
            <ul className="space-y-4 mb-10">
              {[
                "Everything in Free",
                "Unlimited conversations",
                "Real voice mode (speak & listen)",
                "Parent dashboard",
                "Weekly digest email",
                "Topic blocking",
                "Daily conversation limits",
                "Full conversation history",
                "Priority support",
              ].map((label) => (
                <li key={label} className="flex items-center gap-3 text-sm text-indigo-200">
                  <span className="w-5 h-5 rounded-full bg-indigo-600 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-white" />
                  </span>
                  {label}
                </li>
              ))}
            </ul>
            <Link href="/app" className="block text-center bg-indigo-600 hover:bg-indigo-500 text-white font-black py-4 rounded-xl transition-colors text-lg shadow-lg shadow-indigo-600/30">
              Start 30-Day Free Trial
            </Link>
            <p className="text-center text-indigo-400 text-xs mt-3">No credit card required for trial</p>
          </div>
        </div>

        {/* Comparison Table */}
        <section className="mb-20">
          <h2 className="text-3xl font-black text-white text-center mb-8">How We Compare</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left p-4 text-indigo-400 font-semibold text-sm">Feature</th>
                  <th className="p-4 text-center text-white font-black">Lumi</th>
                  <th className="p-4 text-center text-indigo-400 font-semibold text-sm">Other AI Apps</th>
                  <th className="p-4 text-center text-indigo-400 font-semibold text-sm">ChatGPT</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Designed for children", "✅", "Partial", "❌"],
                  ["Real voice conversations", "✅", "❌", "Premium only"],
                  ["3 true age modes", "✅", "❌", "❌"],
                  ["Parent controls built-in", "✅", "Partial", "❌"],
                  ["COPPA compliant", "✅", "Varies", "❌"],
                  ["Weekly parent digest", "✅", "❌", "❌"],
                  ["No ads", "✅", "Varies", "✅"],
                  ["Price", "$0–$9.99/mo", "$5–$30/mo", "$20/mo"],
                ].map(([feature, lumi, other, chatgpt]) => (
                  <tr key={String(feature)} className="border-b border-white/5 hover:bg-white/2">
                    <td className="p-4 text-indigo-200 text-sm">{String(feature)}</td>
                    <td className="p-4 text-center text-sm font-semibold text-green-400">{String(lumi)}</td>
                    <td className="p-4 text-center text-sm text-indigo-400">{String(other)}</td>
                    <td className="p-4 text-center text-sm text-indigo-400">{String(chatgpt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-16">
          <h2 className="text-3xl font-black text-white text-center mb-8">Pricing FAQ</h2>
          <div className="space-y-4">
            {[
              { q: "Is there a free trial?", a: "Yes — the Family Plan includes a 30-day free trial. The free tier is always free with no credit card required." },
              { q: "Can I cancel anytime?", a: "Yes. Cancel anytime, no questions asked. Your plan continues until the end of the billing period." },
              { q: "What happens when free conversations run out?", a: "Lumi lets your child know they've reached the daily limit and will be ready again tomorrow. Always a kind message, never abrupt." },
              { q: "Is the annual plan worth it?", a: "At $79.99/year vs $119.88/year monthly, you save $40 — about 33% off. If you're sure Lumi is a good fit, yearly is the smart choice." },
              { q: "Do you offer family plans for multiple children?", a: "The current Family Plan covers all children in one household. Each child can have their own age setting. Future multi-child management features are on our roadmap." },
            ].map((faq) => (
              <details key={faq.q} className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
                <summary className="flex justify-between items-center p-6 cursor-pointer font-bold text-white text-base">
                  {faq.q}
                  <ChevronRight className="w-5 h-5 text-indigo-400 group-open:rotate-90 transition-transform shrink-0 ml-4" />
                </summary>
                <div className="px-6 pb-6 text-indigo-300 text-sm leading-relaxed">{faq.a}</div>
              </details>
            ))}
          </div>
        </section>

        <div className="text-center">
          <Link href="/app" className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-black px-8 py-4 rounded-2xl text-lg transition-colors">
            <Star className="w-5 h-5 fill-white" />Start Free — No Credit Card
          </Link>
        </div>
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { Shield, Check, Lock, Star } from "lucide-react";

export const metadata: Metadata = {
  title: "Safety & Privacy — How Lumi Protects Your Child",
  description: "Lumi is COPPA compliant, built on Claude AI with Constitutional AI safety, and gives parents full control. Learn how we protect every child who uses Lumi.",
};

export default function SafetyPage() {
  return (
    <div className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <Shield className="w-16 h-16 text-green-400 mx-auto mb-4" />
          <h1 className="text-5xl font-black text-white mb-4">Safety Is Our Foundation</h1>
          <p className="text-indigo-300 text-xl max-w-2xl mx-auto">
            We didn&apos;t bolt safety on at the end. It&apos;s baked into every layer of Lumi — from the AI model to the API to the parent controls.
          </p>
        </div>

        {/* Claude Safety */}
        <section className="mb-16">
          <div className="bg-gradient-to-br from-indigo-900/40 to-violet-900/40 border border-indigo-700/30 rounded-2xl p-8">
            <h2 className="text-2xl font-black text-white mb-2">Built on Anthropic&apos;s Claude</h2>
            <p className="text-indigo-300 mb-6">Claude is one of the most safety-focused AI models ever built. Anthropic uses Constitutional AI — a method that teaches the AI to be helpful, harmless, and honest by design.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                "Trained to refuse harmful requests",
                "Honest about what it doesn't know",
                "Won't generate inappropriate content",
                "Designed to encourage safe behavior",
                "No political manipulation",
                "No adult content — ever",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm text-indigo-200">
                  <Check className="w-4 h-4 text-green-400 shrink-0" />{item}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Three-Layer Safety */}
        <section className="mb-16">
          <h2 className="text-3xl font-black text-white mb-8 text-center">Three Layers of Protection</h2>
          <div className="space-y-4">
            {[
              { num: "1", title: "Age-Matched Input Filter", color: "bg-blue-600", desc: "Before Lumi processes any question, it runs through an age-appropriate content check. Topics and language are evaluated against your child's age band. Anything outside the age-appropriate range is blocked before Lumi even sees it." },
              { num: "2", title: "Claude's Built-In Safety", color: "bg-violet-600", desc: "Claude's Constitutional AI safety runs on every response generation. The model itself refuses to produce inappropriate content — it's trained to decline, not just filtered after the fact. This is the most robust layer." },
              { num: "3", title: "Output Filter + Parent Rules", color: "bg-green-700", desc: "Every response Lumi generates is scanned one more time before reaching your child. On top of that, any topics you've added to your blocked list are enforced here. Three gates, zero gaps." },
            ].map((layer) => (
              <div key={layer.num} className="bg-white/5 border border-white/10 rounded-2xl p-6 flex gap-4">
                <div className={`w-10 h-10 ${layer.color} rounded-xl flex items-center justify-center text-white font-black shrink-0`}>{layer.num}</div>
                <div>
                  <h3 className="font-black text-white mb-2">{layer.title}</h3>
                  <p className="text-indigo-300 text-sm leading-relaxed">{layer.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* COPPA */}
        <section className="mb-16">
          <div className="bg-green-900/20 border border-green-700/30 rounded-2xl p-8">
            <Lock className="w-8 h-8 text-green-400 mb-3" />
            <h2 className="text-2xl font-black text-white mb-4">COPPA Compliance</h2>
            <p className="text-indigo-300 mb-6">The Children&apos;s Online Privacy Protection Act (COPPA) sets strict rules for apps used by children under 13. Lumi is designed from the ground up to comply.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                "No personal data collected from children",
                "No behavioral advertising, ever",
                "Parent consent required for account creation",
                "Data not sold to third parties",
                "Minimal data collection — only what's needed",
                "Conversation data encrypted at rest and in transit",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm text-indigo-200">
                  <Check className="w-4 h-4 text-green-400 shrink-0" />{item}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Parent Controls */}
        <section className="mb-16">
          <h2 className="text-3xl font-black text-white mb-8 text-center">Parent Controls</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { icon: "🚫", title: "Topic Blocking", desc: "Add any topics to a blocked list. Lumi will gracefully redirect when those subjects come up — your child never knows a block is in place." },
              { icon: "⏱️", title: "Daily Time Limits", desc: "Set a maximum number of conversations or total time per day. When the limit is reached, Lumi lets your child know and signs off warmly." },
              { icon: "📖", title: "Full Conversation History", desc: "Every conversation is saved. Read exactly what was discussed anytime — no summaries, full transcripts." },
              { icon: "📧", title: "Weekly Digest Email", desc: "Get a weekly email with what your child explored, top questions asked, and any blocked attempts. Stay informed without hovering." },
            ].map((f) => (
              <div key={f.title} className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <div className="text-3xl mb-3">{f.icon}</div>
                <h3 className="font-black text-white mb-2">{f.title}</h3>
                <p className="text-indigo-300 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Data */}
        <section className="mb-16">
          <h2 className="text-3xl font-black text-white mb-6 text-center">Data & Privacy</h2>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
            <div className="space-y-4">
              {[
                { q: "What data do you store?", a: "Session IDs, conversation history (for parent digest), and parent settings you configure. Nothing else." },
                { q: "Do you sell data?", a: "Never. Your family's data is not and will never be sold, rented, or shared with advertisers." },
                { q: "Is conversation data used to train AI?", a: "No. Your conversations are not used to improve the AI model." },
                { q: "How long is data kept?", a: "Conversation history is kept while your account is active. Delete your account and all data is permanently removed within 30 days." },
                { q: "Who can see conversations?", a: "Only the parent account holder can access conversation history. Lumi staff cannot read individual conversations." },
              ].map((item) => (
                <div key={item.q} className="border-b border-white/10 pb-4 last:border-0 last:pb-0">
                  <h3 className="font-bold text-white text-sm mb-1">{item.q}</h3>
                  <p className="text-indigo-300 text-sm">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="text-center">
          <Link href="/app" className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-black px-8 py-4 rounded-2xl text-lg transition-colors">
            <Star className="w-5 h-5 fill-white" />Try Lumi Free — Completely Safe
          </Link>
        </div>
      </div>
    </div>
  );
}

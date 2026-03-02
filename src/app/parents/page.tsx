import type { Metadata } from "next";
import Link from "next/link";
import { Shield, Star, Check, ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "For Parents — Lumi AI Learning Companion",
  description: "Parent controls, weekly digest emails, topic blocking, and full conversation history. You're always in the loop with Lumi — without hovering over your child.",
};

export default function ParentsPage() {
  return (
    <div className="py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <div className="text-xs font-bold text-yellow-400 uppercase tracking-widest mb-3">For Parents</div>
          <h1 className="text-5xl font-black text-white mb-4">You&apos;re Always in the Loop</h1>
          <p className="text-indigo-300 text-xl max-w-2xl mx-auto">
            Lumi gives your child independence and you full visibility. The best of both worlds.
          </p>
        </div>

        {/* Digest */}
        <section className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <div className="text-xs font-bold text-yellow-400 uppercase tracking-widest mb-3">Weekly Digest</div>
              <h2 className="text-3xl font-black text-white mb-6">Know What Your Child Explored</h2>
              <p className="text-indigo-200 leading-relaxed mb-6">
                Every week, Lumi sends you an email summary of what your child talked about — top questions, learning highlights, and topics they kept coming back to.
              </p>
              <ul className="space-y-3">
                {["Topics explored this week", "Most-asked questions", "Any safety filter activations", "Total conversation time", "Learning highlights & recommendations"].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-indigo-200">
                    <Check className="w-4 h-4 text-green-400 shrink-0" />{item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <div className="text-xs text-indigo-400 font-semibold mb-3 uppercase tracking-widest">Sample Weekly Digest</div>
              <div className="space-y-4 text-sm">
                <div className="border-b border-white/10 pb-4">
                  <div className="font-bold text-white mb-1">📚 This Week&apos;s Top Topics</div>
                  <div className="text-indigo-300 space-y-1">
                    <div>• Space & astronomy (12 conversations)</div>
                    <div>• Why animals hibernate (4 conversations)</div>
                    <div>• How rainbows form (3 conversations)</div>
                  </div>
                </div>
                <div className="border-b border-white/10 pb-4">
                  <div className="font-bold text-white mb-1">⭐ Top Question of the Week</div>
                  <div className="text-indigo-300 italic">&quot;If the sun disappeared, how long until we noticed?&quot;</div>
                  <div className="text-indigo-400 text-xs mt-1">— Your 9-year-old is thinking big!</div>
                </div>
                <div>
                  <div className="font-bold text-white mb-1">🛡️ Safety Report</div>
                  <div className="text-green-400 text-sm">All clear this week · 0 filter activations</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Controls */}
        <section className="mb-20">
          <h2 className="text-3xl font-black text-white text-center mb-10">Parent Control Features</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              {
                icon: "🚫",
                title: "Topic Blocking",
                desc: "Add topics you want Lumi to avoid. Enter anything — \"politics\", \"violence\", \"social media\", \"sports betting\". Lumi will gracefully redirect when these come up.",
                tag: "Family Plan",
              },
              {
                icon: "⏱️",
                title: "Daily Time Limits",
                desc: "Set a daily conversation limit. Choose by number of conversations or total minutes. Lumi wraps up warmly and lets your child know when they've hit their limit.",
                tag: "Family Plan",
              },
              {
                icon: "📖",
                title: "Conversation History",
                desc: "Read every conversation thread, anytime. Full transcripts — not summaries. Search by date, topic, or keyword. Export to PDF if needed.",
                tag: "Family Plan",
              },
              {
                icon: "🎂",
                title: "Age Band Control",
                desc: "Set your child's age band. It can't be changed by the child — only the parent account can modify this setting.",
                tag: "All Plans",
              },
            ].map((f) => (
              <div key={f.title} className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <div className="flex items-start justify-between mb-3">
                  <span className="text-3xl">{f.icon}</span>
                  <span className={`text-xs font-bold px-2 py-1 rounded-full ${f.tag === "Family Plan" ? "bg-indigo-900/60 text-indigo-300" : "bg-green-900/40 text-green-400"}`}>{f.tag}</span>
                </div>
                <h3 className="font-black text-white mb-2">{f.title}</h3>
                <p className="text-indigo-300 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Common Questions */}
        <section className="mb-16">
          <h2 className="text-3xl font-black text-white text-center mb-8">Parent Questions, Answered</h2>
          <div className="space-y-4">
            {[
              { q: "My child is 6 — is Lumi really safe?", a: "Yes. The 4–5 and 6–8 age modes are the most restrictive. Lumi only discusses topics appropriate for that age range, uses simple vocabulary, and will never introduce scary, violent, or adult concepts. If your child asks something outside that range, Lumi gently redirects." },
              { q: "Can my child change their own age band?", a: "No. The age band is set by the parent and can only be changed from the parent settings. Your child can select any age band in the demo, but your parent settings lock it in once configured." },
              { q: "What if Lumi gets something wrong?", a: "Claude is one of the most accurate AI systems available, but no AI is perfect. Lumi is designed to say 'I'm not sure' rather than guess. For important topics like health and safety, always verify with a trusted adult source." },
              { q: "Will Lumi tell my child disturbing things if they ask about the news?", a: "No. Lumi explains current events at an age-appropriate level — the same way a thoughtful parent or teacher would. It avoids graphic details, won't discuss traumatic events directly, and focuses on what children can understand and process." },
              { q: "How do I set up parent controls?", a: "Parent controls are available in the Family Plan. After signing up, you'll access your parent dashboard where you can configure all settings for your child's account." },
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

        {/* CTA */}
        <div className="bg-gradient-to-br from-indigo-900/40 to-violet-900/40 border border-indigo-700/30 rounded-2xl p-10 text-center">
          <Shield className="w-10 h-10 text-green-400 mx-auto mb-4" />
          <h2 className="text-3xl font-black text-white mb-4">Start Free — See for Yourself</h2>
          <p className="text-indigo-300 mb-6 max-w-xl mx-auto">Try Lumi with your child right now, no signup required. When you&apos;re ready for full parent controls, the Family Plan is just $9.99/month.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/app" className="bg-indigo-600 hover:bg-indigo-500 text-white font-black px-6 py-3 rounded-xl transition-colors flex items-center justify-center gap-2">
              <Star className="w-4 h-4 fill-white" />Try Lumi Free
            </Link>
            <Link href="/pricing" className="border border-indigo-600 text-indigo-300 hover:text-white font-bold px-6 py-3 rounded-xl transition-colors">
              View Family Plan
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { Star, ChevronLeft, Check, X } from "lucide-react";

export const metadata: Metadata = {
  title: "Khanmigo vs Lumi — Which AI Tutor Is Right for Your Child?",
  description: "Head-to-head comparison of Khanmigo and Lumi for children's AI learning. Honest look at features, pricing, age-appropriateness, and which fits your family's needs.",
};

export default function Post4() {
  return (
    <article className="py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <Link href="/blog" className="inline-flex items-center gap-1 text-indigo-400 hover:text-white text-sm mb-8 transition-colors">
          <ChevronLeft className="w-4 h-4" />Back to Blog
        </Link>
        <div className="mb-2 flex items-center gap-2">
          <span className="text-xs font-bold px-2 py-1 rounded-full bg-blue-900/50 text-blue-300">Reviews</span>
          <span className="text-indigo-500 text-xs">February 10, 2025 · 7 min read</span>
        </div>
        <h1 className="text-4xl font-black text-white leading-tight mb-8">Khanmigo vs Lumi — Which AI Tutor Is Right for Your Child?</h1>

        <div className="prose prose-invert max-w-none space-y-6 text-indigo-200 leading-relaxed">
          <p>Both Khanmigo and Lumi are designed for children. But they&apos;re built for very different purposes. Here&apos;s the honest comparison so you can choose — or use both.</p>

          <h2 className="text-2xl font-black text-white mt-10 mb-4">Quick Comparison</h2>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left p-3 text-indigo-400">Feature</th>
                  <th className="p-3 text-center text-indigo-300 font-bold">Lumi</th>
                  <th className="p-3 text-center text-indigo-400">Khanmigo</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Ages supported", "4–12", "8+ (best for 10+)"],
                  ["Primary purpose", "Learning companion", "Academic tutoring"],
                  ["Voice mode", "✅ Full voice", "❌ Text only"],
                  ["Age modes", "✅ 3 true modes", "Partial"],
                  ["Parent controls", "✅ Full", "Limited"],
                  ["Weekly digest", "✅", "❌"],
                  ["Topic blocking", "✅", "❌"],
                  ["Free tier", "✅ 15 convos/day", "✅ Teachers free"],
                  ["Paid price", "$9.99/month", "$4/month (students)"],
                  ["Curriculum-aligned", "No", "✅ Khan Academy aligned"],
                  ["General curiosity chat", "✅ Excellent", "Limited"],
                  ["Homework help", "Good", "✅ Excellent"],
                ].map(([feat, lumi, khan]) => (
                  <tr key={String(feat)} className="border-b border-white/5">
                    <td className="p-3 text-indigo-200">{String(feat)}</td>
                    <td className="p-3 text-center text-green-300">{String(lumi)}</td>
                    <td className="p-3 text-center text-indigo-400">{String(khan)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-black text-white mt-10 mb-4">Where Lumi Wins</h2>
          <ul className="space-y-3">
            {[
              { icon: Check, text: "Younger kids (4–8) — Lumi was specifically designed for this age range. Khanmigo works best for 10+." },
              { icon: Check, text: "Voice conversations — Khanmigo is text-only. Lumi has real speech recognition and voice output." },
              { icon: Check, text: "General curiosity — Why do cats purr? Why is the sky blue? Lumi handles open-ended curiosity beautifully; Khanmigo prefers structured academic questions." },
              { icon: Check, text: "Parent controls — Weekly digest, topic blocking, and full conversation history are Lumi-only." },
            ].map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-start gap-2 text-indigo-200">
                <Icon className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />{text}
              </li>
            ))}
          </ul>

          <h2 className="text-2xl font-black text-white mt-10 mb-4">Where Khanmigo Wins</h2>
          <ul className="space-y-3">
            {[
              { icon: Check, text: "Specific academic subjects — Math, science, writing, history aligned to Khan Academy curriculum." },
              { icon: Check, text: "Homework help — Khanmigo excels at walking kids through problems step-by-step." },
              { icon: Check, text: "Price (student plan) — $4/month is cheaper than Lumi's Family Plan." },
              { icon: X, text: "Voice mode — doesn't have it." },
            ].map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-start gap-2 text-indigo-200">
                <Icon className={`w-4 h-4 mt-0.5 shrink-0 ${Icon === Check ? "text-green-400" : "text-red-400"}`} />{text}
              </li>
            ))}
          </ul>

          <h2 className="text-2xl font-black text-white mt-10 mb-4">The Verdict</h2>
          <p>These tools are more complementary than competitive:</p>
          <ul className="space-y-2 pl-4">
            {[
              "Ages 4–7: Lumi only. Khanmigo isn't built for this age group.",
              "Ages 8–12 general curiosity: Lumi.",
              "Ages 8–12 homework help: Khanmigo.",
              "Best setup for ages 8–12: Use both.",
            ].map(item => <li key={item} className="text-indigo-200">• {item}</li>)}
          </ul>
          <p>If you had to pick just one and your child is under 10: Lumi. If they&apos;re 10+ and primarily need academic help: Khanmigo. For the full experience: both.</p>
        </div>

        <div className="mt-12 bg-indigo-900/30 border border-indigo-700/30 rounded-2xl p-6 text-center">
          <Star className="w-8 h-8 text-yellow-400 fill-yellow-400 mx-auto mb-3" />
          <h3 className="text-xl font-black text-white mb-2">See Lumi in Action</h3>
          <p className="text-indigo-300 text-sm mb-4">Try the voice demo right now — no signup required.</p>
          <Link href="/app" className="inline-block bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-6 py-3 rounded-xl transition-colors">Try Lumi Free</Link>
        </div>
      </div>
    </article>
  );
}

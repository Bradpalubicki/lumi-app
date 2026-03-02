import type { Metadata } from "next";
import Link from "next/link";
import { Star, ChevronLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Best AI Apps for Kids in 2025 — What Parents Actually Need to Know",
  description: "A parent's honest guide to the best AI apps for children in 2025. We review safety, age-appropriateness, voice capabilities, and parent controls for every major option.",
};

const schema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Best AI Apps for Kids in 2025 — What Parents Actually Need to Know",
  datePublished: "2025-01-15",
  author: { "@type": "Organization", name: "Lumi" },
  publisher: { "@type": "Organization", name: "Lumi", logo: { "@type": "ImageObject", url: "https://lumi-app.vercel.app/icons/icon-192.svg" } },
};

export default function Post1() {
  return (
    <article className="py-16 px-4">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="max-w-3xl mx-auto">
        <Link href="/blog" className="inline-flex items-center gap-1 text-indigo-400 hover:text-white text-sm mb-8 transition-colors">
          <ChevronLeft className="w-4 h-4" />Back to Blog
        </Link>

        <div className="mb-2 flex items-center gap-2">
          <span className="text-xs font-bold px-2 py-1 rounded-full bg-blue-900/50 text-blue-300">Reviews</span>
          <span className="text-indigo-500 text-xs">January 15, 2025 · 8 min read</span>
        </div>

        <h1 className="text-4xl font-black text-white leading-tight mb-8">Best AI Apps for Kids in 2025 — What Parents Actually Need to Know</h1>

        <div className="prose prose-invert max-w-none space-y-6 text-indigo-200 leading-relaxed">
          <p>AI apps for kids are exploding in 2025 — and so is parent confusion about which ones are actually safe, educationally sound, and worth the money. After testing dozens of options, here&apos;s the honest breakdown.</p>

          <h2 className="text-2xl font-black text-white mt-10 mb-4">What Actually Matters for Kids&apos; AI Apps</h2>
          <p>Most parents focus on one thing: safety. But safety is just the table stakes. The best AI apps for kids need to deliver on four dimensions:</p>
          <ul className="space-y-2 pl-4">
            {["True age-appropriateness (not just a content filter)", "Voice capability (kids don't want to type)", "Parent visibility (digest, controls, history)", "Genuine educational value (not just entertainment)"].map(item => <li key={item} className="text-indigo-200">• {item}</li>)}
          </ul>

          <h2 className="text-2xl font-black text-white mt-10 mb-4">The Top Options in 2025</h2>

          <h3 className="text-xl font-black text-indigo-300 mt-6 mb-3">1. Lumi — Best Overall for Ages 4–12</h3>
          <p>Lumi stands out for having three genuinely different age modes — not just a content filter toggle. A 5-year-old and a 10-year-old get completely different conversation experiences. Add real voice mode (powered by OpenAI Whisper + TTS), parent digest emails, topic blocking, and Claude AI safety, and Lumi is the most complete package available.</p>
          <p><strong className="text-white">Best for:</strong> Families who want the full experience — voice, age modes, parent controls. <strong className="text-white">Price:</strong> Free (15 convos/day) or $9.99/month unlimited.</p>

          <h3 className="text-xl font-black text-indigo-300 mt-6 mb-3">2. Khanmigo — Best for Academic Help</h3>
          <p>Khan Academy&apos;s AI tutor is excellent for older kids (8+) who need help with specific subjects like math, science, and writing. It&apos;s curriculum-aligned and doesn&apos;t try to be a general companion. Strong for focused learning; weak on voice and general curiosity conversations.</p>
          <p><strong className="text-white">Best for:</strong> School-age kids who need subject-specific help. <strong className="text-white">Price:</strong> $4/month for students, free for teachers.</p>

          <h3 className="text-xl font-black text-indigo-300 mt-6 mb-3">3. Magic School AI — Best for Teachers</h3>
          <p>Designed for educators, not children directly. Teachers use it to create lesson plans, quizzes, and differentiated content. Not designed for unsupervised child use.</p>

          <h3 className="text-xl font-black text-indigo-300 mt-6 mb-3">4. Socratic by Google — Best for Homework</h3>
          <p>Strong for visual learners who can photograph their homework. AI explains concepts well. No voice mode, no conversational depth, no parent controls. Think &quot;homework helper&quot; not &quot;learning companion.&quot;</p>

          <h2 className="text-2xl font-black text-white mt-10 mb-4">The Big Red Flags to Watch For</h2>
          <ul className="space-y-2 pl-4">
            {[
              "Single safety setting — apps that just toggle 'safe mode' without age differentiation are inadequate",
              "No parent visibility — if you can't see what your child discussed, walk away",
              "No topic controls — you should be able to block specific subjects",
              "General-purpose AI with a 'kids mode' sticker — that's not real age-appropriateness",
              "Data practices — check if conversations are used for training or shared with third parties",
            ].map(item => <li key={item} className="text-indigo-200">⚠️ {item}</li>)}
          </ul>

          <h2 className="text-2xl font-black text-white mt-10 mb-4">Bottom Line for Parents</h2>
          <p>The best AI app for your child depends on their age and what you&apos;re trying to achieve. For pure learning companionship across all ages with voice and parent controls, Lumi is the strongest option in 2025. For academic subject help with older kids, Khanmigo is worth adding. For homework photo-scanning, Socratic fills a specific gap.</p>
          <p>The biggest mistake? Letting children use general-purpose AI like ChatGPT without guardrails. It&apos;s not designed for kids and the results are unpredictable.</p>
        </div>

        <div className="mt-12 bg-indigo-900/30 border border-indigo-700/30 rounded-2xl p-6 text-center">
          <Star className="w-8 h-8 text-yellow-400 fill-yellow-400 mx-auto mb-3" />
          <h3 className="text-xl font-black text-white mb-2">Try Lumi Free Today</h3>
          <p className="text-indigo-300 text-sm mb-4">No signup required. Just pick your child&apos;s age and start talking.</p>
          <Link href="/app" className="inline-block bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-6 py-3 rounded-xl transition-colors">
            Meet Lumi — It&apos;s Free
          </Link>
        </div>
      </div>
    </article>
  );
}

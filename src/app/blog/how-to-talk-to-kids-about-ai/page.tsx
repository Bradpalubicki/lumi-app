import type { Metadata } from "next";
import Link from "next/link";
import { Star, ChevronLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "How to Talk to Your 5-Year-Old About AI",
  description: "A gentle, honest guide for parents explaining what AI is to young children. Age-appropriate language, concepts, and conversations for ages 4–7.",
};

export default function Post3() {
  return (
    <article className="py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <Link href="/blog" className="inline-flex items-center gap-1 text-indigo-400 hover:text-white text-sm mb-8 transition-colors">
          <ChevronLeft className="w-4 h-4" />Back to Blog
        </Link>
        <div className="mb-2 flex items-center gap-2">
          <span className="text-xs font-bold px-2 py-1 rounded-full bg-pink-900/50 text-pink-300">Parenting</span>
          <span className="text-indigo-500 text-xs">February 1, 2025 · 5 min read</span>
        </div>
        <h1 className="text-4xl font-black text-white leading-tight mb-8">How to Talk to Your 5-Year-Old About AI</h1>

        <div className="prose prose-invert max-w-none space-y-6 text-indigo-200 leading-relaxed">
          <p>Your 5-year-old doesn&apos;t need to understand large language models. They need a framework for interacting with AI safely, honestly, and curiously. Here&apos;s how to give it to them.</p>

          <h2 className="text-2xl font-black text-white mt-10 mb-4">Start with What They Already Know</h2>
          <p>Most 5-year-olds understand that computers do things. Start there:</p>
          <blockquote className="border-l-4 border-indigo-500 pl-4 italic text-indigo-300">&quot;You know how the tablet plays videos when you ask it to? AI is like a helper that lives inside the computer and learned to read and talk by reading millions of books. It can answer questions and have conversations — but it&apos;s not a person.&quot;</blockquote>

          <h2 className="text-2xl font-black text-white mt-10 mb-4">The Three Things They Need to Know</h2>

          <h3 className="text-xl font-black text-indigo-300 mt-6 mb-3">1. &quot;It&apos;s very smart, but it&apos;s not a friend.&quot;</h3>
          <p>AI can feel friendly — and Lumi is designed to be warm and kind. But children need to understand: AI doesn&apos;t have feelings. It doesn&apos;t miss you. It&apos;s not hurt when you close the app. This isn&apos;t to make AI seem cold — it&apos;s to set healthy expectations about relationships.</p>

          <h3 className="text-xl font-black text-indigo-300 mt-6 mb-3">2. &quot;Sometimes it makes mistakes.&quot;</h3>
          <p>AI can say things that sound confident but aren&apos;t true. Teach children early: &quot;If Lumi tells you something surprising, we can check together.&quot; This builds critical thinking that will serve them forever — with AI and everything else.</p>

          <h3 className="text-xl font-black text-indigo-300 mt-6 mb-3">3. &quot;You can always ask me.&quot;</h3>
          <p>If something Lumi says confuses them or upsets them, the door is always open to come to you. Make this explicit. &quot;If you hear something from Lumi that you don&apos;t understand, tell me and we&apos;ll figure it out together.&quot;</p>

          <h2 className="text-2xl font-black text-white mt-10 mb-4">Conversation Starters by Age</h2>

          <h3 className="text-xl font-black text-indigo-300 mt-6 mb-3">Ages 4–5</h3>
          <ul className="space-y-2 pl-4">
            {[
              '"Lumi is a computer helper who learned to talk by reading lots and lots of books!"',
              '"It knows tons of cool stuff — want to ask it something together?"',
              '"It\'s like a very smart talking book."',
            ].map(item => <li key={item} className="text-indigo-200">• {item}</li>)}
          </ul>

          <h3 className="text-xl font-black text-indigo-300 mt-6 mb-3">Ages 6–8</h3>
          <ul className="space-y-2 pl-4">
            {[
              '"AI stands for artificial intelligence — \'artificial\' means made by people."',
              '"It learned by reading billions of words — more than you could read in a thousand lifetimes."',
              '"It doesn\'t actually think the way we do — it predicts what words make sense together."',
            ].map(item => <li key={item} className="text-indigo-200">• {item}</li>)}
          </ul>

          <h2 className="text-2xl font-black text-white mt-10 mb-4">What Not to Say</h2>
          <ul className="space-y-2 pl-4">
            {[
              'Don\'t say it\'s "magic" — it gives AI a mystical quality that makes critical thinking harder later',
              'Don\'t say it "knows everything" — it doesn\'t, and overcorrecting this later is awkward',
              'Don\'t anthropomorphize too much — saying Lumi "loves you" or "is your friend" sets up unhealthy attachment patterns',
            ].map(item => <li key={item} className="text-indigo-200">⚠️ {item}</li>)}
          </ul>

          <h2 className="text-2xl font-black text-white mt-10 mb-4">The Bigger Picture</h2>
          <p>Children who grow up with a healthy, honest understanding of AI will be better equipped for a world where it&apos;s everywhere. Your job isn&apos;t to shield them from AI — it&apos;s to give them the framework to engage with it wisely. Start that conversation early, keep it honest, and use tools like Lumi that support rather than undermine that goal.</p>
        </div>

        <div className="mt-12 bg-indigo-900/30 border border-indigo-700/30 rounded-2xl p-6 text-center">
          <Star className="w-8 h-8 text-yellow-400 fill-yellow-400 mx-auto mb-3" />
          <h3 className="text-xl font-black text-white mb-2">Introduce Your Child to AI — Safely</h3>
          <p className="text-indigo-300 text-sm mb-4">Lumi is designed to be a child&apos;s first AI experience. Warm, honest, age-appropriate.</p>
          <Link href="/app" className="inline-block bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-6 py-3 rounded-xl transition-colors">Try Lumi Free</Link>
        </div>
      </div>
    </article>
  );
}

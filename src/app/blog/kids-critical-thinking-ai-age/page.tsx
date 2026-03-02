import type { Metadata } from "next";
import Link from "next/link";
import { Star, ChevronLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Teaching Kids Critical Thinking in the Age of AI",
  description: "How to raise children who question, evaluate, and think independently — even as AI becomes ubiquitous. Practical strategies for parents of children ages 4–12.",
};

export default function Post5() {
  return (
    <article className="py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <Link href="/blog" className="inline-flex items-center gap-1 text-indigo-400 hover:text-white text-sm mb-8 transition-colors">
          <ChevronLeft className="w-4 h-4" />Back to Blog
        </Link>
        <div className="mb-2 flex items-center gap-2">
          <span className="text-xs font-bold px-2 py-1 rounded-full bg-violet-900/50 text-violet-300">Education</span>
          <span className="text-indigo-500 text-xs">February 20, 2025 · 9 min read</span>
        </div>
        <h1 className="text-4xl font-black text-white leading-tight mb-8">Teaching Kids Critical Thinking in the Age of AI</h1>

        <div className="prose prose-invert max-w-none space-y-6 text-indigo-200 leading-relaxed">
          <p>The biggest risk of AI for children isn&apos;t inappropriate content. It&apos;s intellectual passivity — children who accept AI answers without question, who outsource their thinking, who lose the habit of wondering before looking it up. Here&apos;s how to make sure that doesn&apos;t happen to yours.</p>

          <h2 className="text-2xl font-black text-white mt-10 mb-4">Why Critical Thinking Matters More Than Ever</h2>
          <p>Before AI, a child had to do some cognitive work to find an answer — searching a library, reading multiple sources, asking different people. AI removes that friction entirely. An answer appears in seconds. The question is: what habit does that build?</p>
          <p>If children learn to treat AI answers as facts, they&apos;ll have that habit for life. If they learn to treat AI answers as starting points — useful, impressive, but worth questioning — they&apos;ll be far better equipped for a world where AI is everywhere.</p>

          <h2 className="text-2xl font-black text-white mt-10 mb-4">Strategy 1: Ask the Follow-Up Question Aloud</h2>
          <p>When your child gets an answer from Lumi or any AI, make it a habit to ask out loud together: &quot;How would we check that?&quot; This doesn&apos;t have to be every time — even 20% of the time builds the habit. What you&apos;re teaching isn&apos;t skepticism about Lumi specifically. You&apos;re teaching the general habit of verification.</p>

          <h2 className="text-2xl font-black text-white mt-10 mb-4">Strategy 2: Let Them Be Wrong (and Discover It)</h2>
          <p>When an AI gives a questionable answer, resist the urge to correct it yourself. Instead: &quot;Let&apos;s see if we can find that in a book.&quot; When they discover the discrepancy, it lands differently than being told. They&apos;ve done the work. They&apos;ve built the skill.</p>

          <h2 className="text-2xl font-black text-white mt-10 mb-4">Strategy 3: Value the Question Over the Answer</h2>
          <p>Children who ask great questions will always be valuable — even in an AI world. Celebrate when your child asks something Lumi struggles with. &quot;That&apos;s such a hard question that even Lumi can&apos;t figure it out perfectly — what do YOU think?&quot;</p>
          <p>Lumi is designed to respond to hard questions with curiosity, not just answers. It asks follow-up questions, explores different angles, and says &quot;I&apos;m not sure&quot; when appropriate. That&apos;s modeling critical thinking — not replacing it.</p>

          <h2 className="text-2xl font-black text-white mt-10 mb-4">Strategy 4: Use AI as a Research Starting Point</h2>
          <p>For older children (9–12), establish a norm: AI is where you start a topic, not where you end. &quot;Okay, Lumi says X. Now let&apos;s find two other sources that agree or disagree.&quot; This is exactly how professional researchers, journalists, and scientists use AI — as a first draft, not the final word.</p>

          <h2 className="text-2xl font-black text-white mt-10 mb-4">Strategy 5: Teach the Concept of Confidence Calibration</h2>
          <p>AI sounds confident even when uncertain. This is a known weakness. Teach your children that how confident something sounds has no relationship to whether it&apos;s actually true. &quot;Notice how sure Lumi sounds? Let&apos;s see if that confidence is deserved.&quot;</p>

          <h2 className="text-2xl font-black text-white mt-10 mb-4">How Good AI Apps Support Critical Thinking</h2>
          <p>The best AI apps for children are designed to support critical thinking, not replace it. Lumi is built with this in mind:</p>
          <ul className="space-y-2 pl-4">
            {[
              "Lumi asks follow-up questions rather than just giving answers",
              "Lumi says 'I'm not certain' when uncertain — modeling intellectual honesty",
              "In Discoverer mode (9–12), Lumi uses Socratic questioning",
              "Lumi encourages children to form their own opinions on open questions",
            ].map(item => <li key={item} className="text-indigo-200">• {item}</li>)}
          </ul>

          <h2 className="text-2xl font-black text-white mt-10 mb-4">The Long Game</h2>
          <p>Children who learn to think critically about AI will be the ones who use it most effectively — and most wisely. They&apos;ll know when to trust it, when to verify it, and when to set it aside entirely and think for themselves. That skill is more valuable than any specific knowledge AI can provide.</p>
          <p>Start building it now. Your child&apos;s intellectual independence is worth protecting.</p>
        </div>

        <div className="mt-12 bg-indigo-900/30 border border-indigo-700/30 rounded-2xl p-6 text-center">
          <Star className="w-8 h-8 text-yellow-400 fill-yellow-400 mx-auto mb-3" />
          <h3 className="text-xl font-black text-white mb-2">AI That Encourages Thinking</h3>
          <p className="text-indigo-300 text-sm mb-4">Lumi asks questions, says &quot;I&apos;m not sure,&quot; and encourages curiosity — not dependency.</p>
          <Link href="/app" className="inline-block bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-6 py-3 rounded-xl transition-colors">Try Lumi Free</Link>
        </div>
      </div>
    </article>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { Star, ChevronLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Is ChatGPT Safe for Kids? (And What to Use Instead)",
  description: "The honest answer to 'is ChatGPT safe for children' — and which AI apps are actually designed for kids. A parent's guide to safe AI for ages 4–12.",
};

export default function Post2() {
  return (
    <article className="py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <Link href="/blog" className="inline-flex items-center gap-1 text-indigo-400 hover:text-white text-sm mb-8 transition-colors">
          <ChevronLeft className="w-4 h-4" />Back to Blog
        </Link>
        <div className="mb-2 flex items-center gap-2">
          <span className="text-xs font-bold px-2 py-1 rounded-full bg-green-900/50 text-green-300">Safety</span>
          <span className="text-indigo-500 text-xs">January 20, 2025 · 6 min read</span>
        </div>
        <h1 className="text-4xl font-black text-white leading-tight mb-8">Is ChatGPT Safe for Kids? (And What to Use Instead)</h1>

        <div className="prose prose-invert max-w-none space-y-6 text-indigo-200 leading-relaxed">
          <p>It&apos;s the question in every parent&apos;s group chat. Your kid found out about ChatGPT, they want to use it, and you&apos;re wondering: is it actually safe? Here&apos;s the direct answer parents deserve.</p>

          <h2 className="text-2xl font-black text-white mt-10 mb-4">The Short Answer</h2>
          <p>ChatGPT is <em>not designed for children</em>. OpenAI&apos;s terms of service require users to be 13+ (18+ without parental consent in many jurisdictions). There&apos;s no parental controls, no age-appropriate conversation mode, no parent visibility into chats, and no built-in safeguards against children accessing adult topics.</p>

          <h2 className="text-2xl font-black text-white mt-10 mb-4">What Can Go Wrong</h2>
          <ul className="space-y-2 pl-4">
            {[
              "A curious 8-year-old can ask about drugs, violence, or adult topics and may receive informative responses",
              "No parent can see what their child discussed",
              "No age-appropriate tone or vocabulary — same responses for a 6-year-old and a 60-year-old",
              "No time limits or session controls",
              "Data practices not designed with children in mind",
            ].map(item => <li key={item} className="text-indigo-200">• {item}</li>)}
          </ul>

          <h2 className="text-2xl font-black text-white mt-10 mb-4">What ChatGPT Gets Right</h2>
          <p>To be fair: ChatGPT has general content policies and will decline many explicit requests. It&apos;s also genuinely excellent at explanation and reasoning. But &quot;has content policies&quot; is not the same as &quot;designed for children.&quot; A PG-13 movie has content policies too — you still wouldn&apos;t let your 5-year-old watch it unsupervised.</p>

          <h2 className="text-2xl font-black text-white mt-10 mb-4">The Right Alternatives by Age</h2>

          <h3 className="text-xl font-black text-indigo-300 mt-6 mb-3">Ages 4–8: Lumi</h3>
          <p>Specifically designed for this age range. Vocabulary, topics, and energy are calibrated for young children. Voice mode means early readers can use it without typing. Parents get full visibility and controls. Built on Claude AI — one of the most safety-focused models available.</p>

          <h3 className="text-xl font-black text-indigo-300 mt-6 mb-3">Ages 8–12: Lumi + Khanmigo</h3>
          <p>Lumi handles general curiosity conversations and learning. Khanmigo handles specific academic subjects and homework help. Together, they cover everything a child this age needs from AI.</p>

          <h3 className="text-xl font-black text-indigo-300 mt-6 mb-3">Ages 13+: Supervised ChatGPT is reasonable</h3>
          <p>At 13+, children are old enough to start using general-purpose AI with parental guidance. Have a conversation about how AI works, its limitations, and what kinds of questions are appropriate. Start together, then give independence gradually.</p>

          <h2 className="text-2xl font-black text-white mt-10 mb-4">The Rule of Thumb</h2>
          <p>If an AI app wasn&apos;t specifically designed for children — with age modes, parent controls, and safety systems built in from the ground up — it&apos;s not appropriate for unsupervised child use, no matter how good its general content policies are.</p>
          <p>The difference between a content filter and true age-appropriateness is enormous. Lumi was built with that difference in mind from day one.</p>
        </div>

        <div className="mt-12 bg-indigo-900/30 border border-indigo-700/30 rounded-2xl p-6 text-center">
          <Star className="w-8 h-8 text-yellow-400 fill-yellow-400 mx-auto mb-3" />
          <h3 className="text-xl font-black text-white mb-2">The Safe Alternative to ChatGPT for Kids</h3>
          <p className="text-indigo-300 text-sm mb-4">Designed for children. Parent controlled. Always age-appropriate.</p>
          <Link href="/app" className="inline-block bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-6 py-3 rounded-xl transition-colors">Try Lumi Free</Link>
        </div>
      </div>
    </article>
  );
}

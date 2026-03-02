import type { Metadata } from "next";
import Link from "next/link";
import { Check, Mic, Brain, Shield, Star, ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "How Lumi Works — AI Learning Companion for Kids",
  description: "Learn how Lumi's age-adaptive AI, real voice mode, and parent controls create the safest, most engaging learning experience for kids ages 4–12.",
};

export default function HowItWorksPage() {
  return (
    <div className="py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-black text-white mb-4">How Lumi Works</h1>
          <p className="text-indigo-300 text-xl max-w-2xl mx-auto">Three age modes, real voice AI, and deep parent controls — all working together seamlessly.</p>
        </div>

        {/* Age Modes */}
        <section className="mb-20">
          <h2 className="text-3xl font-black text-white mb-8 text-center">Three True Age Modes</h2>
          <div className="space-y-6">
            {[
              { emoji: "🌟", age: "Ages 4–5", name: "Tiny Talker Mode", color: "from-pink-900/30 to-rose-900/30 border-pink-500/30", items: ["Sentences under 15 words", "Lots of enthusiasm and emojis", "Topics: animals, colors, shapes, simple nature", "Never discusses violence, complex emotions, or adult themes", "Extra patience — asks if child wants to hear more"] },
              { emoji: "🚀", age: "Ages 6–8", name: "Explorer Mode", color: "from-indigo-900/30 to-blue-900/30 border-indigo-500/30", items: ["Clear explanations with real vocabulary", "Topics: science, history, geography, how things work", "Encourages questions and follow-up exploration", "Makes learning feel like an adventure", "Age-appropriate humor and storytelling"] },
              { emoji: "🔬", age: "Ages 9–12", name: "Discoverer Mode", color: "from-violet-900/30 to-purple-900/30 border-violet-500/30", items: ["Deeper explanations with nuance and context", "Homework help that teaches, not just answers", "Critical thinking and logical reasoning support", "Current events explained age-appropriately", "Socratic method — asks questions to spark thinking"] },
            ].map((mode) => (
              <div key={mode.name} className={`bg-gradient-to-br ${mode.color} border rounded-2xl p-8`}>
                <div className="flex items-start gap-4">
                  <div className="text-4xl">{mode.emoji}</div>
                  <div className="flex-1">
                    <div className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-1">{mode.age}</div>
                    <h3 className="text-2xl font-black text-white mb-4">{mode.name}</h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {mode.items.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-indigo-200">
                          <Check className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />{item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Voice */}
        <section className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="text-xs font-bold text-yellow-400 uppercase tracking-widest mb-3">Voice Technology</div>
              <h2 className="text-3xl font-black text-white mb-6">Real Voice, Real Magic</h2>
              <p className="text-indigo-200 leading-relaxed mb-6">Lumi uses OpenAI Whisper for speech recognition — the same technology used in professional settings. It understands children&apos;s speech patterns, accents, and imperfect pronunciation.</p>
              <p className="text-indigo-200 leading-relaxed mb-6">Responses come back as natural, warm voice audio — not a robotic text-to-speech. Kids can have real back-and-forth conversations without ever touching a keyboard.</p>
              <ul className="space-y-3">
                {["Works on iPhone, Android, iPad — any modern device", "No app install needed — runs in your browser", "Hold-to-talk mode works great for early readers", "Auto-plays Lumi's response when voice mode is active"].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-indigo-200">
                    <Mic className="w-4 h-4 text-indigo-400 shrink-0" />{item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center">
              <Mic className="w-16 h-16 text-indigo-400 mx-auto mb-4" />
              <h3 className="text-lg font-black text-white mb-2">How Voice Mode Works</h3>
              <ol className="text-left space-y-3 text-sm text-indigo-300">
                {["Tap the microphone button", "Speak your question naturally", "Lumi transcribes and understands", "Response generated instantly", "Lumi speaks the answer back", "Continue the conversation naturally"].map((step, i) => (
                  <li key={step} className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-indigo-700 text-white text-xs font-bold flex items-center justify-center shrink-0">{i + 1}</span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* AI */}
        <section className="mb-20">
          <div className="text-center mb-10">
            <Brain className="w-12 h-12 text-indigo-400 mx-auto mb-4" />
            <h2 className="text-3xl font-black text-white mb-4">Powered by Claude AI</h2>
            <p className="text-indigo-300 max-w-2xl mx-auto">Lumi is built on Claude, Anthropic&apos;s AI — designed with safety and helpfulness as core principles, not afterthoughts.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { icon: "🧠", title: "Context-Aware", desc: "Lumi remembers the conversation thread — no need to repeat yourself. It builds on what was said." },
              { icon: "🎓", title: "Genuinely Helpful", desc: "Not just safe — actually informative. Lumi gives real answers, not dumbed-down non-answers." },
              { icon: "💚", title: "Honest", desc: "If Lumi doesn't know something, it says so. No hallucinated facts. Teaching children to value truth." },
            ].map((f) => (
              <div key={f.title} className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
                <div className="text-3xl mb-3">{f.icon}</div>
                <h3 className="font-black text-white mb-2">{f.title}</h3>
                <p className="text-indigo-300 text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Safety */}
        <section className="mb-16">
          <div className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 border border-green-700/30 rounded-2xl p-10 text-center">
            <Shield className="w-10 h-10 text-green-400 mx-auto mb-4" />
            <h2 className="text-3xl font-black text-white mb-4">Safety That Never Sleeps</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left mt-8">
              {[
                { title: "Input Filtering", desc: "Before Lumi even processes a question, it&apos;s checked for inappropriate content." },
                { title: "Output Filtering", desc: "Every response is scanned before reaching your child — double protection." },
                { title: "Topic Blocking", desc: "Parents can add custom blocked topics that override everything." },
                { title: "Age Guardrails", desc: "Topics inappropriate for each age band are systematically excluded." },
              ].map((s) => (
                <div key={s.title} className="bg-white/5 rounded-xl p-4">
                  <h3 className="font-bold text-white text-sm mb-1">{s.title}</h3>
                  <p className="text-indigo-300 text-sm" dangerouslySetInnerHTML={{ __html: s.desc }} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <div className="text-center">
          <Link href="/app" className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-black px-8 py-4 rounded-2xl text-lg transition-colors">
            <Star className="w-5 h-5 fill-white" />Try Lumi Now — Free
          </Link>
          <Link href="/safety" className="ml-4 inline-flex items-center gap-2 text-indigo-300 hover:text-white font-bold transition-colors">
            Read Safety Details <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

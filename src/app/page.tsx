import type { Metadata } from "next";
import Link from "next/link";
import { Star, Shield, Mic, Brain, Heart, ChevronRight, Check, Sparkles, Volume2, Users } from "lucide-react";
import { MiniLumiDemo } from "@/components/MiniLumiDemo";

export const metadata: Metadata = {
  title: "Lumi — Safe AI Learning Companion for Kids Ages 4–12",
  description:
    "Meet Lumi, the AI companion that talks, teaches, and grows with your child. Real voice conversations, 3 true age modes, and parent controls built in. Try free today.",
};

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      name: "Lumi",
      applicationCategory: "EducationalApplication",
      operatingSystem: "Web, iOS, Android",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      description: "AI learning companion for kids ages 4–12 with voice, age-adaptive conversations, and parent controls.",
      url: "https://lumi-app.vercel.app",
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        { "@type": "Question", name: "Is Lumi safe for young children?", acceptedAnswer: { "@type": "Answer", text: "Yes. Lumi uses Claude AI with multiple safety layers. Every response is filtered for age-appropriateness, and parents can block topics, set time limits, and review all conversations." } },
        { "@type": "Question", name: "What ages does Lumi support?", acceptedAnswer: { "@type": "Answer", text: "Lumi supports ages 4–5 (Tiny Talkers), 6–8 (Explorers), and 9–12 (Discoverers) with completely different conversation styles, vocabulary, and topics for each age group." } },
        { "@type": "Question", name: "Does Lumi work on phones and tablets?", acceptedAnswer: { "@type": "Answer", text: "Yes. Lumi is a Progressive Web App (PWA) — install it directly from your browser on any iPhone, iPad, Android phone, or tablet. No app store required." } },
        { "@type": "Question", name: "How much does Lumi cost?", acceptedAnswer: { "@type": "Answer", text: "Lumi is free to start with 15 conversations per day. The Family Plan is $9.99/month with unlimited voice, parent controls, and conversation history." } },
      ],
    },
    { "@type": "Organization", name: "Lumi", url: "https://lumi-app.vercel.app" },
  ],
};

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {/* Hero */}
      <section className="relative overflow-hidden pt-16 pb-24 px-4">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px]" />
          <div className="absolute top-32 right-0 w-[400px] h-[400px] bg-yellow-400/10 rounded-full blur-[100px]" />
        </div>
        <div className="relative max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-indigo-900/50 border border-indigo-700/50 rounded-full px-4 py-2 mb-8 text-sm font-semibold text-indigo-200">
            <Sparkles className="w-4 h-4 text-yellow-400" />
            Powered by Claude AI · Built for curious kids
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight tracking-tight mb-6">
            Meet <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">Lumi</span>,<br />
            Your Child&apos;s <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-400">AI Best Friend</span>
          </h1>
          <p className="text-xl sm:text-2xl text-indigo-200 font-medium max-w-2xl mx-auto mb-10 leading-relaxed">
            Safe conversations. Real voice. Built for their exact age. Lumi grows with your child — always curious, always kind, always parent-approved.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link href="/app" className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-500 text-white font-black px-8 py-4 rounded-2xl text-lg flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-600/30">
              <Star className="w-5 h-5 fill-white" />
              Try Lumi Free
            </Link>
            <Link href="/how-it-works" className="w-full sm:w-auto border border-indigo-700 hover:border-indigo-500 text-indigo-200 hover:text-white font-bold px-8 py-4 rounded-2xl text-lg flex items-center justify-center gap-2 transition-all">
              See How It Works <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            {[{ icon: Shield, text: "COPPA Compliant" }, { icon: Brain, text: "Claude AI Safety" }, { icon: Users, text: "Parent Controlled" }, { icon: Heart, text: "No Ads, Ever" }].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10">
                <Icon className="w-4 h-4 text-green-400" />
                <span className="text-indigo-200 font-semibold">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Live demo widget */}
      <section className="py-12 px-4 bg-indigo-950/40">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-6">
            <p className="text-indigo-300 text-sm font-semibold uppercase tracking-wider mb-2">Try it now — free, no signup</p>
            <h2 className="text-3xl font-black text-white">Say hello to Lumi</h2>
          </div>
          <MiniLumiDemo />
        </div>
      </section>

      {/* Social proof bar */}
      <section className="bg-indigo-900/20 border-y border-indigo-800/30 py-6 px-4">
        <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-x-12 gap-y-3 text-sm font-semibold text-indigo-300">
          {["Built on Claude AI", "3 True Age Modes", "Real Voice Conversations", "Weekly Parent Digest", "No App Store Needed"].map((item) => (
            <span key={item} className="flex items-center gap-2"><Check className="w-4 h-4 text-green-400" />{item}</span>
          ))}
        </div>
      </section>

      {/* Age Bands */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-black text-white mb-4">Built for Every Stage of Childhood</h2>
            <p className="text-indigo-300 text-lg max-w-2xl mx-auto">Lumi adapts completely to your child&apos;s age — different words, different topics, different energy.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { emoji: "🌟", age: "Ages 4–5", name: "Tiny Talkers", border: "border-pink-500/30", bg: "bg-pink-500/10", features: ["Simple, fun sentences", "Stories & silly jokes", "Animals, colors, shapes", "Extra patient & gentle"], q: "Why is the sky blue?", a: "Because sunlight plays with tiny air friends! They love bouncing blue light around. Isn't that magical? 🌈" },
              { emoji: "🚀", age: "Ages 6–8", name: "Explorers", border: "border-indigo-500/30", bg: "bg-indigo-500/10", features: ["Questions & real answers", "Science, history, nature", "Stories with adventure", "Encourages curiosity"], q: "How do rockets fly in space?", a: "Rockets push burning gas downward super fast — and that pushes the rocket up! Like a balloon letting go. Want to learn about the ISS? 🚀" },
              { emoji: "🔬", age: "Ages 9–12", name: "Discoverers", border: "border-violet-500/30", bg: "bg-violet-500/10", features: ["Deep dives on any topic", "Critical thinking skills", "Homework helper mode", "Debates & reasoning"], q: "Is AI actually intelligent?", a: "Great question! AI processes patterns statistically — we don't 'think' like you do. But the line between computation and intelligence is genuinely debated. What's your take? 🤔" },
            ].map((band) => (
              <div key={band.name} className={`rounded-2xl border ${band.border} ${band.bg} p-6 flex flex-col`}>
                <div className="text-3xl mb-2">{band.emoji}</div>
                <div className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-1">{band.age}</div>
                <h3 className="text-2xl font-black text-white mb-4">{band.name}</h3>
                <ul className="space-y-2 mb-6">
                  {band.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-indigo-200"><Check className="w-4 h-4 text-green-400 shrink-0" />{f}</li>
                  ))}
                </ul>
                <div className="mt-auto rounded-xl bg-white/5 p-4 space-y-3">
                  <div className="flex justify-end">
                    <div className="bg-indigo-600 rounded-xl rounded-br-sm px-4 py-2 text-sm text-white max-w-[80%]">{band.q}</div>
                  </div>
                  <div className="flex justify-start">
                    <div className="bg-white/10 rounded-xl rounded-bl-sm px-4 py-2 text-sm text-indigo-100 max-w-[85%]">{band.a}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Voice Feature */}
      <section className="py-24 px-4 bg-indigo-900/10">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="text-xs font-bold text-yellow-400 uppercase tracking-widest mb-3">Real Voice AI</div>
              <h2 className="text-4xl font-black text-white mb-6">Lumi Talks Back</h2>
              <p className="text-indigo-200 text-lg leading-relaxed mb-8">Kids don&apos;t want to type — they want to talk. Lumi listens with real speech recognition and responds in a warm, natural voice.</p>
              <ul className="space-y-4">
                {["Hold-to-talk or tap — works on any phone", "Warm, natural AI voice (not robotic!)", "Works hands-free for early readers", "Text mode always available too"].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-indigo-200">
                    <div className="w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center shrink-0"><Check className="w-3 h-3 text-white" /></div>
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/app" className="mt-8 inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-6 py-3 rounded-xl transition-colors">
                <Mic className="w-5 h-5" />Try Voice Mode
              </Link>
            </div>
            <div className="flex justify-center">
              <div className="relative w-64 h-64">
                <div className="absolute inset-0 rounded-full bg-indigo-600/20 animate-ping" style={{ animationDuration: "2s" }} />
                <div className="absolute inset-4 rounded-full bg-indigo-600/30 animate-ping" style={{ animationDuration: "2.5s" }} />
                <div className="relative w-full h-full rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-2xl shadow-indigo-600/40">
                  <Volume2 className="w-24 h-24 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-black text-white mb-4">Up and Running in 60 Seconds</h2>
            <p className="text-indigo-300 text-lg">No app store. No credit card. No setup headaches.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: "1", icon: "🎯", title: "Pick Your Child's Age", desc: "Choose 4–5, 6–8, or 9–12. Lumi instantly adjusts vocabulary, topics, and conversation style." },
              { step: "2", icon: "💬", title: "Start Talking (or Typing)", desc: "Type a message or hold the mic button. Lumi responds in seconds — always safe, always age-right." },
              { step: "3", icon: "📊", title: "Parents Stay in the Loop", desc: "Weekly digest emails show what your child explored. Block topics, set limits, adjust anytime." },
            ].map((s) => (
              <div key={s.step} className="text-center p-6">
                <div className="text-5xl mb-4">{s.icon}</div>
                <div className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-2">Step {s.step}</div>
                <h3 className="text-xl font-black text-white mb-3">{s.title}</h3>
                <p className="text-indigo-300 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Parent Features */}
      <section className="py-24 px-4 bg-indigo-900/10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <div className="text-xs font-bold text-yellow-400 uppercase tracking-widest mb-3">For Parents</div>
            <h2 className="text-4xl font-black text-white mb-4">You&apos;re Always in Control</h2>
            <p className="text-indigo-300 text-lg max-w-2xl mx-auto">Lumi gives you full visibility and control — without killing the magic.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "📧", title: "Weekly Digest", desc: "Email summary of topics explored, questions asked, and learning highlights." },
              { icon: "🚫", title: "Topic Blocker", desc: "Block specific subjects — sports, politics, anything. Lumi redirects gracefully." },
              { icon: "⏱️", title: "Daily Limits", desc: "Set conversation time or message limits per day to keep screen time healthy." },
              { icon: "📖", title: "Full History", desc: "Read every conversation. See exactly what Lumi said and how your child responded." },
            ].map((f) => (
              <div key={f.title} className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
                <div className="text-4xl mb-3">{f.icon}</div>
                <h3 className="text-lg font-black text-white mb-2">{f.title}</h3>
                <p className="text-indigo-300 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Safety */}
      <section className="py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-br from-indigo-900/40 to-violet-900/40 border border-indigo-700/30 rounded-3xl p-10 text-center">
            <Shield className="w-12 h-12 text-green-400 mx-auto mb-4" />
            <h2 className="text-4xl font-black text-white mb-6">The AI That Says No When It Should</h2>
            <p className="text-indigo-200 text-lg max-w-2xl mx-auto mb-8 leading-relaxed">Most AI has one safety setting: on or off. Lumi has three layers — age-matched content filtering, Claude&apos;s built-in safety, and parent-defined topic blocks.</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
              {[
                { title: "Age-Matched Filter", desc: "What's fine for a 12-year-old is filtered for a 5-year-old. Automatically." },
                { title: "Claude AI Safety", desc: "Built on Anthropic's Constitutional AI — one of the safest AI systems ever built." },
                { title: "Parent Override", desc: "Your rules layer on top. Block anything extra. Trust, but verify." },
              ].map((s) => (
                <div key={s.title} className="bg-white/5 rounded-2xl p-5">
                  <Shield className="w-6 h-6 text-green-400 mb-2" />
                  <h3 className="font-black text-white mb-1">{s.title}</h3>
                  <p className="text-indigo-300 text-sm">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 px-4 bg-indigo-900/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-black text-white mb-4">Simple, Fair Pricing</h2>
          <p className="text-indigo-300 text-lg mb-12">Start free. Upgrade when you&apos;re ready.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-left">
              <div className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-2">Free Forever</div>
              <div className="text-4xl font-black text-white mb-1">$0</div>
              <p className="text-indigo-300 text-sm mb-6">Perfect for trying it out</p>
              <ul className="space-y-3 mb-8">
                {["15 conversations/day", "Text chat", "All 3 age modes", "No credit card"].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-indigo-200"><Check className="w-4 h-4 text-green-400" /> {f}</li>
                ))}
              </ul>
              <Link href="/app" className="block text-center border border-indigo-600 text-indigo-300 hover:text-white font-bold py-3 rounded-xl transition-colors">Start Free</Link>
            </div>
            <div className="bg-gradient-to-br from-indigo-600/30 to-violet-600/30 border border-indigo-500/50 rounded-2xl p-8 text-left relative">
              <div className="absolute -top-3 left-8 bg-yellow-400 text-black text-xs font-black px-3 py-1 rounded-full">Most Popular</div>
              <div className="text-xs font-bold text-yellow-400 uppercase tracking-widest mb-2">Family Plan</div>
              <div className="text-4xl font-black text-white mb-1">$9.99<span className="text-lg text-indigo-300">/mo</span></div>
              <p className="text-indigo-300 text-sm mb-6">$79.99/yr — save 33%</p>
              <ul className="space-y-3 mb-8">
                {["Unlimited conversations", "Real voice mode", "Parent controls & digest", "Conversation history", "Topic blocking", "Priority support"].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-indigo-200"><Check className="w-4 h-4 text-yellow-400" /> {f}</li>
                ))}
              </ul>
              <Link href="/pricing" className="block text-center bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-xl transition-colors">Start 30-Day Trial</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-black text-white text-center mb-12">Parents Love Lumi</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: "Sarah M.", role: "Mom of a 7-year-old", text: "My daughter asks Lumi everything now — why stars twinkle, how dinosaurs went extinct, why we dream. It's like giving her a brilliant, patient tutor always available." },
              { name: "James K.", role: "Dad of two kids (5 & 10)", text: "I was skeptical about AI for kids, but the age modes genuinely change everything. My 5-year-old gets simple answers, my 10-year-old gets deep explanations. Both are hooked." },
              { name: "Maria L.", role: "Mom of a 9-year-old", text: "The weekly digest is a game-changer. I learned my son had been asking about black holes for three weeks straight — then I got him a telescope for his birthday. Perfect." },
            ].map((t) => (
              <div key={t.name} className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <div className="flex gap-1 mb-4">
                  {[1,2,3,4,5].map((i) => <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />)}
                </div>
                <p className="text-indigo-200 text-sm leading-relaxed mb-4">&quot;{t.text}&quot;</p>
                <div><div className="text-white font-bold text-sm">{t.name}</div><div className="text-indigo-400 text-xs">{t.role}</div></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-4 bg-indigo-900/10">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-black text-white text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: "Is Lumi safe for young children?", a: "Yes. Lumi uses Claude AI with multiple safety layers. Every response is filtered for age-appropriateness, and parents can block topics, set time limits, and review all conversations." },
              { q: "What ages does Lumi support?", a: "Lumi supports ages 4–5 (Tiny Talkers), 6–8 (Explorers), and 9–12 (Discoverers) with completely different conversation styles, vocabulary, and topics for each age group." },
              { q: "Does Lumi work on phones and tablets?", a: "Yes. Lumi is a Progressive Web App (PWA) — install it directly from your browser on any iPhone, iPad, Android phone, or tablet. No app store required." },
              { q: "How much does Lumi cost?", a: "Lumi is free to start with 15 conversations per day (text only). The Family Plan is $9.99/month and includes unlimited voice conversations, advanced parent controls, and conversation history." },
              { q: "Can Lumi help with homework?", a: "Lumi can explain concepts, answer questions, and help children understand topics — but it encourages kids to think and reason, not just give answers. It's a tutor, not a homework doer." },
              { q: "What data does Lumi collect?", a: "Lumi stores conversation history to power parent digest and memory. We never sell data, never use it for ads, and comply fully with COPPA. See our Privacy Policy for full details." },
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
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="text-5xl mb-6">⭐</div>
          <h2 className="text-5xl font-black text-white mb-6">Start Lumi Free Today</h2>
          <p className="text-indigo-200 text-xl mb-10 leading-relaxed">No credit card. No app store. Just the best AI companion your child has ever had.</p>
          <Link href="/app" className="inline-flex items-center gap-3 bg-indigo-600 hover:bg-indigo-500 text-white font-black px-10 py-5 rounded-2xl text-xl transition-all shadow-xl shadow-indigo-600/30">
            <Star className="w-6 h-6 fill-white" />
            Meet Lumi — It&apos;s Free
          </Link>
          <p className="text-indigo-400 text-sm mt-4">15 free conversations/day · No signup required to try</p>
        </div>
      </section>
    </>
  );
}

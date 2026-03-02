import type { Metadata } from "next";
import { ChatInterface } from "@/components/ChatInterface";
import { Shield, Star, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Try Lumi — Live AI Chat Demo for Kids",
  description: "Talk to Lumi right now — no sign-up required. Pick your child's age and start chatting or use voice mode. Free, safe, and age-appropriate AI for ages 4–12.",
};

export default function AppPage() {
  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-indigo-900/50 border border-indigo-700/50 rounded-full px-4 py-2 mb-4 text-sm font-semibold text-indigo-200">
            <Sparkles className="w-4 h-4 text-yellow-400" />
            Live Demo — No Sign-Up Required
          </div>
          <h1 className="text-3xl font-black text-white mb-2">Chat with Lumi</h1>
          <p className="text-indigo-300">Pick your child&apos;s age group and start exploring together.</p>
        </div>

        {/* Chat */}
        <ChatInterface />

        {/* Trust row */}
        <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs text-indigo-400">
          <span className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5 text-green-400" /> COPPA Compliant</span>
          <span className="flex items-center gap-1.5"><Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" /> Powered by Claude AI</span>
          <span className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5 text-green-400" /> Multi-layer safety</span>
          <span className="flex items-center gap-1.5">🎙️ Real voice mode</span>
        </div>

        {/* Tips */}
        <div className="mt-8 bg-white/5 border border-white/10 rounded-2xl p-6">
          <h2 className="font-black text-white text-sm mb-3">Try asking Lumi...</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              "Why do stars twinkle?",
              "Tell me a funny story about a dinosaur",
              "How does lightning work?",
              "What's the biggest animal ever?",
              "Can you help me understand fractions?",
              "Why do we need to sleep?",
            ].map((q) => (
              <div key={q} className="text-indigo-300 text-sm bg-white/5 rounded-lg px-3 py-2 cursor-pointer hover:bg-white/10 transition-colors border border-white/5">
                &quot;{q}&quot;
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

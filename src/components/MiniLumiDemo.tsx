"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { LumiCharacter } from "@/components/LumiCharacter";
import type { LumiState } from "@/components/LumiCharacter";

const DEMO_LIMIT = 3;

export function MiniLumiDemo() {
  const [messages, setMessages] = useState<{ role: "user" | "assistant"; text: string }[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [lumiState, setLumiState] = useState<LumiState>("idle");
  const [demoCount, setDemoCount] = useState(0);

  const send = async () => {
    if (!input.trim() || busy || demoCount >= DEMO_LIMIT) return;
    const text = input.trim();
    setInput("");
    setMessages((p) => [...p, { role: "user", text }]);
    setBusy(true);
    setLumiState("thinking");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            ...messages.map((m) => ({ role: m.role, content: m.text })),
            { role: "user", content: text },
          ],
          age: "6-8",
          mode: "chat",
          childName: "",
          blockedTopics: [],
          sessionId: "demo",
        }),
      });
      const data = await res.json();
      const reply = data.response || "Wow, great question! I have so much to share — come explore Lumi!";
      setMessages((p) => [...p, { role: "assistant", text: reply }]);
      setLumiState("speaking");
      setDemoCount((c) => c + 1);
      setTimeout(() => setLumiState("idle"), 3000);
    } catch {
      setMessages((p) => [...p, { role: "assistant", text: "I'm having a little hiccup! Try the full app for the best experience 🌟" }]);
      setLumiState("idle");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="bg-gradient-to-b from-sky-400 via-violet-400 to-violet-500 rounded-3xl p-4 shadow-2xl max-w-sm mx-auto">
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <LumiCharacter state={lumiState} size={60} />
        <div>
          <div className="text-white font-black text-sm">Try Lumi right now!</div>
          <div className="text-white/70 text-xs">Free, no signup — {DEMO_LIMIT - demoCount} questions left</div>
        </div>
      </div>

      {/* Messages */}
      <div className="bg-white/10 rounded-2xl p-3 min-h-[120px] max-h-[200px] overflow-y-auto space-y-2 mb-3">
        {messages.length === 0 && (
          <div className="text-white/60 text-sm text-center py-4">
            Ask me anything — I love questions! 🌟
          </div>
        )}
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[85%] px-3 py-2 rounded-xl text-sm ${
              m.role === "user" ? "bg-green-500 text-white" : "bg-white/20 text-white"
            }`}>
              {m.text}
            </div>
          </div>
        ))}
        {busy && (
          <div className="flex gap-1 px-3 py-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-1.5 h-1.5 bg-white/60 rounded-full"
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 0.5, delay: i * 0.15, repeat: Infinity }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Input or upgrade */}
      {demoCount >= DEMO_LIMIT ? (
        <div className="text-center">
          <p className="text-white/80 text-sm mb-2">Want to keep going? It&apos;s free to get started!</p>
          <Link
            href="/app"
            className="block bg-yellow-400 hover:bg-yellow-300 text-black font-black py-3 rounded-2xl text-sm transition-colors"
          >
            🌟 Start with Lumi — Free
          </Link>
        </div>
      ) : (
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="Ask Lumi anything..."
            disabled={busy}
            className="flex-1 bg-white/20 border border-white/30 rounded-xl px-3 py-2 text-white placeholder-white/50 focus:outline-none focus:border-white/60 text-sm"
          />
          <button
            onClick={send}
            disabled={busy || !input.trim()}
            className="bg-green-500 hover:bg-green-400 disabled:opacity-40 text-white font-black px-4 rounded-xl transition-colors"
          >
            →
          </button>
        </div>
      )}
    </div>
  );
}

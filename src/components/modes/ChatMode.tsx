"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Crown } from "lucide-react";
import { converse, sendVoice } from "@/lib/api";
import { VoiceButton } from "@/components/VoiceButton";
import type { LumiState } from "@/components/LumiCharacter";

const FREE_DAILY_LIMIT = 15;
const CONVO_COUNT_KEY = "lumi_convo_count";
const CONVO_DATE_KEY = "lumi_convo_date";

function getCount(): number {
  if (typeof window === "undefined") return 0;
  const date = localStorage.getItem(CONVO_DATE_KEY);
  const today = new Date().toDateString();
  if (date !== today) {
    localStorage.setItem(CONVO_DATE_KEY, today);
    localStorage.setItem(CONVO_COUNT_KEY, "0");
    return 0;
  }
  return parseInt(localStorage.getItem(CONVO_COUNT_KEY) || "0", 10);
}

function incCount() {
  if (typeof window === "undefined") return;
  localStorage.setItem(CONVO_COUNT_KEY, String(getCount() + 1));
}

interface Message {
  id: string;
  role: "user" | "assistant" | "system";
  text: string;
}

interface Props {
  ageBand: string;
  sessionId: string;
  isFamilyPlan: boolean;
  onStateChange: (state: LumiState) => void;
  onSpeak: (text: string) => void;
  onStarsEarned?: (n: number) => void;
  pushToTalk?: boolean;
}

const ACTIVITY_CARDS = [
  { emoji: "🎮", label: "Wanna play a game?" },
  { emoji: "🎵", label: "Sing a song with me!" },
  { emoji: "🤔", label: "Ask me anything!" },
];

export function ChatMode({
  ageBand,
  sessionId,
  isFamilyPlan,
  onStateChange,
  onSpeak,
  pushToTalk = false,
}: Props) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [busy, setBusy] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [showCards, setShowCards] = useState(true);
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [convoCount, setConvoCount] = useState(0);
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setConvoCount(getCount());
  }, []);

  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages]);

  const addMsg = (role: Message["role"], text: string) => {
    const id = Math.random().toString(36).slice(2);
    setMessages((p) => [...p, { id, role, text }]);
    return id;
  };

  const handleText = async (text: string) => {
    if (!isFamilyPlan && convoCount >= FREE_DAILY_LIMIT) {
      setShowUpgrade(true);
      return;
    }
    setShowCards(false);
    setBusy(true);
    addMsg("user", text);
    onStateChange("thinking");
    try {
      const data = await converse(sessionId, text, ageBand);
      addMsg("assistant", data.reply);
      onStateChange("speaking");
      onSpeak(data.reply);
      if (!isFamilyPlan) { incCount(); setConvoCount(getCount()); }
    } catch {
      addMsg("system", "Oops, I had a hiccup! Try again? 🌟");
      onStateChange("idle");
    } finally {
      setBusy(false);
    }
  };

  const handleVoice = async (blob: Blob) => {
    if (!isFamilyPlan && convoCount >= FREE_DAILY_LIMIT) {
      setShowUpgrade(true);
      return;
    }
    setShowCards(false);
    setBusy(true);
    addMsg("user", "🎙️ ...");
    onStateChange("thinking");
    try {
      const data = await sendVoice(blob, sessionId, ageBand);
      setMessages((p) => {
        const msgs = [...p];
        for (let i = msgs.length - 1; i >= 0; i--) {
          if (msgs[i].role === "user") { msgs[i] = { ...msgs[i], text: data.transcript || "🎙️ (voice)" }; break; }
        }
        return msgs;
      });
      addMsg("assistant", data.reply);
      onStateChange("speaking");
      onSpeak(data.reply);
      if (!isFamilyPlan) { incCount(); setConvoCount(getCount()); }
    } catch {
      addMsg("system", "Couldn't hear that — try again!");
      onStateChange("idle");
    } finally {
      setBusy(false);
      setTranscript("");
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Messages */}
      <div ref={chatRef} className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
        {messages.length === 0 && showCards && (
          <motion.div className="flex flex-col items-center gap-3 mt-4">
            {ACTIVITY_CARDS.map((card, i) => (
              <motion.button
                key={card.label}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 + 0.3 }}
                onClick={() => handleText(card.label)}
                className="bg-white/20 hover:bg-white/30 backdrop-blur border border-white/30 rounded-2xl px-6 py-3 text-white font-bold text-lg transition-all hover:scale-105"
              >
                {card.emoji} {card.label}
              </motion.button>
            ))}
          </motion.div>
        )}
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex ${m.role === "user" ? "justify-end" : m.role === "system" ? "justify-center" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] px-4 py-3 rounded-2xl text-xl leading-relaxed ${
                m.role === "user"
                  ? "bg-green-500 text-white rounded-br-sm"
                  : m.role === "system"
                  ? "bg-white/20 text-white/70 text-sm"
                  : "bg-white/20 text-white rounded-bl-sm border border-white/20"
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}
      </div>

      {/* Free tier counter */}
      {!isFamilyPlan && (
        <div className="flex items-center justify-between px-4 pb-1 text-xs text-white/60">
          <span>{convoCount}/{FREE_DAILY_LIMIT} free today</span>
          <Link href="/pricing" className="flex items-center gap-1 text-yellow-300 font-semibold">
            <Crown className="w-3 h-3" />Upgrade
          </Link>
        </div>
      )}

      {/* Voice input */}
      <div className="pb-4 px-4">
        <VoiceButton
          onVoiceInput={handleVoice}
          onTextInput={handleText}
          isProcessing={busy}
          transcript={transcript}
          ageBand={ageBand}
          pushToTalk={pushToTalk}
        />
      </div>

      {/* Upgrade modal */}
      <AnimatePresence>
        {showUpgrade && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm rounded-3xl"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-3xl p-8 max-w-sm mx-4 text-center shadow-2xl"
            >
              <div className="text-5xl mb-4">👑</div>
              <h3 className="text-xl font-black text-violet-700 mb-2">Daily limit reached!</h3>
              <p className="text-gray-500 text-sm mb-6">
                You&apos;ve used your {FREE_DAILY_LIMIT} free conversations today. Upgrade for unlimited Lumi!
              </p>
              <Link
                href="/pricing"
                className="block w-full bg-violet-600 hover:bg-violet-500 text-white font-black py-3 rounded-2xl text-sm mb-3 transition-colors"
              >
                Upgrade to Family Plan
              </Link>
              <button onClick={() => setShowUpgrade(false)} className="text-gray-400 text-sm">
                Maybe tomorrow
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

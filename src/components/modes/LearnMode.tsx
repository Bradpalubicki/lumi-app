"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { VoiceButton } from "@/components/VoiceButton";
import type { LumiState } from "@/components/LumiCharacter";

interface Props {
  ageBand: string;
  childName: string;
  sessionId: string;
  onStateChange: (state: LumiState) => void;
  onSpeak: (text: string) => void;
  onStarsEarned: (n: number) => void;
  pushToTalk?: boolean;
}

const SUB_MODES = [
  { id: "facts", emoji: "🌍", label: "Fun Facts", desc: "Amazing facts about everything!" },
  { id: "word", emoji: "📝", label: "Word of the Day", desc: "Learn a cool new word" },
  { id: "science", emoji: "🔬", label: "Science Lab", desc: "Experiments you can do at home" },
  { id: "history", emoji: "🏛️", label: "History Adventures", desc: "Time travel through history!" },
  { id: "news", emoji: "📰", label: "Current Events", desc: "What's happening in the world" },
  { id: "homework", emoji: "📚", label: "Homework Helper", desc: "I'll help you think it through (ages 6+)" },
  { id: "nature", emoji: "🌿", label: "Nature Explorer", desc: "Animals, oceans, space and more" },
];

const STARTERS: Record<string, string> = {
  facts: "Did you know that a group of flamingos is called a 'flamboyance'? How totally amazing is that! A FLAMBOYANCE of flamingos! 🦩 Want another wild fact, or do you have a topic you want facts about?",
  word: "Today's Word of the Day is: SERENDIPITY! It means when something wonderful happens by happy accident — like finding a dollar in your old jacket. Can you think of a time something serendipitous happened to you?",
  science: "Time for the Science Lab! Here's an experiment you can do RIGHT NOW with stuff from your kitchen: Mix 2 tablespoons of baking soda with half a cup of vinegar in a bowl. What do you think will happen? Make your prediction before you try it!",
  history: "Adventure through time! Today we're visiting Ancient Egypt, around 4,500 years ago. Imagine this: thousands of workers are building the Great Pyramid of Giza — a structure so huge it was the tallest building in the WORLD for nearly 4,000 years! What do YOU think it would feel like to stand next to it?",
  news: "Here's something cool happening in the world: Scientists are working on robots that can help doctors during surgery — the robots can be more precise than human hands! Some people think this is amazing, others have questions about it. What do YOU think about robot doctors?",
  homework: "I'm your Homework Helper! Tell me what subject you're working on and what's tricky about it. I won't just give you the answer — I'll help you figure it out yourself. What are you working on?",
  nature: "Welcome to the Nature Explorer! Today's adventure: the deep ocean. Did you know that more than 80% of Earth's oceans have never been explored? There are creatures down there that glow in the dark, and some are so strange they look like aliens! What ocean creature would you most want to discover?",
};

export function LearnMode({ ageBand, childName, sessionId, onStateChange, onSpeak, onStarsEarned, pushToTalk = false }: Props) {
  const [activeMode, setActiveMode] = useState<string | null>(null);
  const [messages, setMessages] = useState<{ id: string; role: "user" | "assistant"; text: string }[]>([]);
  const [busy, setBusy] = useState(false);

  const addMsg = (role: "user" | "assistant", text: string) => {
    const id = Math.random().toString(36).slice(2);
    setMessages((p) => [...p, { id, role, text }]);
  };

  const startMode = (modeId: string) => {
    if (modeId === "homework" && ageBand === "4-5") return;
    setActiveMode(modeId);
    setMessages([]);
    const starter = STARTERS[modeId];
    addMsg("assistant", starter);
    onStateChange("speaking");
    onSpeak(starter);
  };

  const sendMessage = async (text: string) => {
    if (!activeMode || busy) return;
    setBusy(true);
    addMsg("user", text);
    onStateChange("thinking");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            ...messages.map((m) => ({ role: m.role, content: m.text })),
            { role: "user", content: text },
          ],
          age: ageBand,
          mode: "learn",
          childName,
          sessionId,
          blockedTopics: [],
        }),
      });
      const data = await res.json();
      const reply = data.response || "Great question! Let me think... what do YOU think?";
      addMsg("assistant", reply);
      onStateChange("speaking");
      onSpeak(reply);
      onStarsEarned(1);
    } catch {
      addMsg("assistant", "Oops! Let's try again — what were you asking? 🌟");
      onStateChange("idle");
    } finally {
      setBusy(false);
    }
  };

  const handleVoice = async (blob: Blob) => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://kid-assistant-api-production.up.railway.app";
      const formData = new FormData();
      formData.append("audio", blob, "audio.webm");
      formData.append("sessionId", sessionId);
      formData.append("ageBand", ageBand);
      const res = await fetch(`${apiUrl}/voice`, {
        method: "POST",
        headers: { "X-API-Key": process.env.NEXT_PUBLIC_API_KEY || "" },
        body: formData,
      });
      const data = await res.json();
      if (data.transcript) sendMessage(data.transcript);
    } catch {
      // ignore
    }
  };

  if (!activeMode) {
    return (
      <div className="flex flex-col h-full px-4 py-3 overflow-y-auto">
        <h2 className="text-2xl font-black text-white text-center mb-1">Learn with Lumi! 📚</h2>
        <p className="text-white/70 text-center text-sm mb-4">Pick something to explore</p>
        <div className="space-y-2">
          {SUB_MODES.map((m, i) => {
            const disabled = m.id === "homework" && ageBand === "4-5";
            return (
              <motion.button
                key={m.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                whileTap={{ scale: disabled ? 1 : 0.97 }}
                onClick={() => startMode(m.id)}
                disabled={disabled}
                className={`w-full border border-white/30 rounded-2xl px-4 py-3 flex items-center gap-3 text-left transition-all ${
                  disabled
                    ? "bg-white/5 opacity-40 cursor-not-allowed"
                    : "bg-white/20 hover:bg-white/30"
                }`}
              >
                <span className="text-3xl">{m.emoji}</span>
                <div>
                  <div className="text-white font-black">{m.label}</div>
                  <div className="text-white/60 text-xs">{m.desc}</div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    );
  }

  const modeInfo = SUB_MODES.find((m) => m.id === activeMode);

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-2 px-4 py-2 border-b border-white/20">
        <button onClick={() => { setActiveMode(null); setMessages([]); }} className="text-white/70 hover:text-white text-sm font-bold">
          ← Learn
        </button>
        <span className="text-white font-black text-sm flex-1 text-center">
          {modeInfo?.emoji} {modeInfo?.label}
        </span>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
        {messages.map((m) => (
          <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[85%] px-4 py-3 rounded-2xl text-lg leading-relaxed ${
              m.role === "user" ? "bg-green-500 text-white" : "bg-white/20 text-white border border-white/20"
            }`}>
              {m.text}
            </div>
          </div>
        ))}
      </div>

      <div className="pb-4 px-4">
        <VoiceButton
          onVoiceInput={handleVoice}
          onTextInput={sendMessage}
          isProcessing={busy}
          ageBand={ageBand}
          pushToTalk={pushToTalk}
        />
      </div>
    </div>
  );
}

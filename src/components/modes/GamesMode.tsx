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

const GAMES = [
  { id: "20q", emoji: "🤔", label: "20 Questions", desc: "I think of something, you guess!" },
  { id: "wyr", emoji: "🤷", label: "Would You Rather?", desc: "Tricky choices — which would you pick?" },
  { id: "trivia", emoji: "🏆", label: "Trivia Time!", desc: "How many can you get right?" },
  { id: "story", emoji: "📖", label: "Story Builder", desc: "We take turns building a story!" },
  { id: "riddle", emoji: "🎩", label: "Riddle Me This!", desc: "Can you solve my riddles?" },
  { id: "rhyme", emoji: "🎵", label: "Rhyme Time", desc: "Say a word that rhymes!" },
  { id: "math", emoji: "🔢", label: "Math Blast", desc: "Speed math challenge!" },
  { id: "word", emoji: "✍️", label: "Word Wizard", desc: "Spelling and vocabulary fun!" },
];

const GAME_STARTERS: Record<string, string> = {
  "20q": "I'm thinking of something right now! You get 20 yes-or-no questions to guess what it is. Ready? Go ahead — ask your first question!",
  "wyr": "Would you rather have the ability to fly like a superhero, or be able to breathe underwater like a fish? There's no wrong answer — which one would YOU pick and why?",
  "trivia": "Trivia time! Here's your first question: What is the largest planet in our solar system? Is it A) Earth, B) Jupiter, C) Saturn, or D) Neptune? Take your best guess!",
  "story": "Ooh, story time! I'll start, and then you add what happens next! Here goes: Once upon a time, in a forest where the trees glowed purple at night, a tiny dragon named Pip discovered something strange buried under the oldest oak tree... What was it? You continue!",
  "riddle": "Ready for my first riddle? Here it is: I have hands but I cannot clap. I have a face but I cannot see. What am I? Think carefully!",
  "rhyme": "Rhyme Time! I'll say a word, and you say a word that rhymes with it. Here we go — CAKE! What rhymes with cake?",
  "math": "Math Blast! Ready for some speedy math? Here's your first one: If you have 8 apples and your friend gives you 5 more, how many apples do you have total? Go!",
  "word": "Word Wizard! I'll give you a word and its meaning, then ask you to use it in a sentence. Today's word is: MARVELOUS — it means something that's so wonderful it amazes you. Can you use MARVELOUS in a sentence?",
};

export function GamesMode({ ageBand, childName, sessionId, onStateChange, onSpeak, onStarsEarned, pushToTalk = false }: Props) {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [messages, setMessages] = useState<{ id: string; role: "user" | "assistant"; text: string }[]>([]);
  const [busy, setBusy] = useState(false);
  const [score, setScore] = useState(0);

  const addMsg = (role: "user" | "assistant", text: string) => {
    const id = Math.random().toString(36).slice(2);
    setMessages((p) => [...p, { id, role, text }]);
  };

  const startGame = (gameId: string) => {
    setSelectedGame(gameId);
    setMessages([]);
    const starter = GAME_STARTERS[gameId];
    addMsg("assistant", starter);
    onStateChange("speaking");
    onSpeak(starter);
  };

  const sendMessage = async (text: string) => {
    if (!selectedGame || busy) return;
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
          mode: "games",
          childName,
          sessionId,
          blockedTopics: [],
        }),
      });
      const data = await res.json();
      const reply = data.response || "Great try! What do you want to do next?";
      addMsg("assistant", reply);
      onStateChange("speaking");
      onSpeak(reply);

      // Award stars for engagement
      if (reply.toLowerCase().includes("correct") || reply.toLowerCase().includes("right") || reply.toLowerCase().includes("amazing")) {
        const earned = 2;
        setScore((s) => s + earned);
        onStarsEarned(earned);
      }
    } catch {
      addMsg("assistant", "Oops! Let's try that again — what did you say? 🌟");
      onStateChange("idle");
    } finally {
      setBusy(false);
    }
  };

  const handleVoice = async (blob: Blob) => {
    const formData = new FormData();
    formData.append("audio", blob, "audio.webm");
    formData.append("sessionId", sessionId);
    formData.append("ageBand", ageBand);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://kid-assistant-api-production.up.railway.app";
      const res = await fetch(`${apiUrl}/voice`, {
        method: "POST",
        headers: { "X-API-Key": process.env.NEXT_PUBLIC_API_KEY || "" },
        body: formData,
      });
      const data = await res.json();
      if (data.transcript) sendMessage(data.transcript);
    } catch {
      // ignore voice errors in games
    }
  };

  if (!selectedGame) {
    return (
      <div className="flex flex-col h-full px-4 py-3">
        <h2 className="text-2xl font-black text-white text-center mb-1">Game Time! 🎮</h2>
        <p className="text-white/70 text-center text-sm mb-4">Which game do you want to play?</p>
        <div className="grid grid-cols-2 gap-3 flex-1 overflow-y-auto">
          {GAMES.map((game, i) => (
            <motion.button
              key={game.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => startGame(game.id)}
              className="bg-white/20 hover:bg-white/30 border border-white/30 rounded-2xl p-4 text-left transition-all"
            >
              <div className="text-3xl mb-1">{game.emoji}</div>
              <div className="text-white font-black text-sm">{game.label}</div>
              <div className="text-white/60 text-xs mt-1">{game.desc}</div>
            </motion.button>
          ))}
        </div>
        {score > 0 && (
          <div className="text-center mt-3 text-yellow-300 font-bold text-sm">
            ⭐ {score} stars earned this session!
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-2 px-4 py-2 border-b border-white/20">
        <button onClick={() => setSelectedGame(null)} className="text-white/70 hover:text-white text-sm font-bold">
          ← Games
        </button>
        <span className="text-white font-black text-sm flex-1 text-center">
          {GAMES.find((g) => g.id === selectedGame)?.emoji} {GAMES.find((g) => g.id === selectedGame)?.label}
        </span>
        <span className="text-yellow-300 text-sm font-bold">⭐ {score}</span>
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

"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useUser } from "@clerk/nextjs";
import { LumiCharacter } from "@/components/LumiCharacter";
import { ChatMode } from "@/components/modes/ChatMode";
import { GamesMode } from "@/components/modes/GamesMode";
import { SongsMode } from "@/components/modes/SongsMode";
import { LearnMode } from "@/components/modes/LearnMode";
import { ParentMode } from "@/components/modes/ParentMode";
import { useChildStore } from "@/lib/childStore";
import { getOrCreateSession } from "@/lib/session";
import type { LumiState } from "@/components/LumiCharacter";

type Tab = "chat" | "games" | "songs" | "learn" | "parent";

const TABS: { id: Tab; emoji: string; label: string }[] = [
  { id: "chat", emoji: "💬", label: "Chat" },
  { id: "games", emoji: "🎮", label: "Games" },
  { id: "songs", emoji: "🎵", label: "Songs" },
  { id: "learn", emoji: "📚", label: "Learn" },
  { id: "parent", emoji: "👨‍👩‍👧", label: "Parent" },
];

const GREETINGS: Record<string, string[]> = {
  "4-5": [
    "Hi there! I'm Lumi! 🌟 What's your favorite animal today?",
    "Hello hello! I'm SO happy to see you! Want to play?",
    "Yay you're here! I'm Lumi! What should we do today?",
    "Hi! Hi! Hi! It's me, Lumi! Want to sing a song with me?",
    "Oh wow, you came back! I missed you! What's new today?",
  ],
  "6-8": [
    "Hey! I'm Lumi! Ready for something amazing? Ask me anything or let's play a game!",
    "Whoa, you're here! I was just thinking about you! What do you want to explore today?",
    "Hey explorer! I'm Lumi and I know SO many cool things. What are we getting into?",
    "Hi there! Did you know something incredible happened in space recently? Want to hear?",
    "Welcome back! I've got a great riddle for you — want to try it? Or we can do something else!",
  ],
  "9-12": [
    "Hey! I'm Lumi. I know a ton of cool stuff — science, current events, jokes, games. What are we getting into today?",
    "Hey, you're back! I was wondering — have you ever thought about how black holes actually work? Want to talk about it?",
    "Hey! I just learned something wild. Did you know octopuses have three hearts? What do you want to talk about today?",
    "What's up! Ready to learn something that'll blow your mind, play a game, or just talk? Your call.",
    "Hey! I've got a would-you-rather question that's going to be SO hard. Want to hear it first, or something else?",
  ],
};

const THINKING_MESSAGES = [
  "Hmm, let me think...",
  "My brain is sparkling...",
  "Looking it up in my magical library...",
  "Ooh, great question! One sec...",
  "Let me check my star charts...",
];

const THEME_BG: Record<string, string> = {
  purple: "from-sky-400 via-violet-400 to-amber-200",
  teal: "from-sky-400 via-teal-400 to-emerald-200",
  rose: "from-pink-400 via-rose-400 to-orange-200",
};

export function LumiApp() {
  const { user } = useUser();
  const isFamilyPlan = user?.publicMetadata?.plan === "family";
  const store = useChildStore();

  const [tab, setTab] = useState<Tab>("chat");
  const [lumiState, setLumiState] = useState<LumiState>("idle");
  const [helpOpen, setHelpOpen] = useState(false);
  const [thinkingMsg, setThinkingMsg] = useState(THINKING_MESSAGES[0]);
  const [sessionId] = useState(() => getOrCreateSession());
  const [speechBubble, setSpeechBubble] = useState("");
  const speakingRef = useRef(false);

  // Update streak on mount
  useEffect(() => {
    store.updateStreak();
  }, []);

  // Auto-greet on mount
  useEffect(() => {
    const band = store.ageBand as keyof typeof GREETINGS;
    const greetings = GREETINGS[band] || GREETINGS["6-8"];
    let greeting = greetings[Math.floor(Math.random() * greetings.length)];

    // Return visit memory
    if (store.childName && store.sessionTopics.length > 0) {
      const lastTopic = store.sessionTopics[store.sessionTopics.length - 1];
      greeting = `Hey ${store.childName}! Last time we talked about ${lastTopic} — did you find out anything new? Or want to do something different today?`;
    } else if (store.childName) {
      greeting = greeting.replace("Hi there!", `Hi ${store.childName}!`).replace("Hey!", `Hey ${store.childName}!`);
    }

    const timer = setTimeout(() => {
      speakText(greeting);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const speakText = useCallback((text: string) => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();

    const band = store.ageBand;
    const settings = {
      "4-5": { rate: 0.85, pitch: 1.3 },
      "6-8": { rate: 0.95, pitch: 1.1 },
      "9-12": { rate: 1.0, pitch: 1.0 },
    }[band] || { rate: 0.95, pitch: 1.1 };

    const u = new SpeechSynthesisUtterance(text);
    u.rate = settings.rate;
    u.pitch = settings.pitch;

    const voices = window.speechSynthesis.getVoices();
    const female = voices.find((v) =>
      v.lang.startsWith("en") && /samantha|karen|zoe|victoria|female/i.test(v.name)
    );
    if (female) u.voice = female;

    setSpeechBubble(text.length > 120 ? text.slice(0, 120) + "..." : text);
    setLumiState("speaking");
    speakingRef.current = true;

    u.onend = () => {
      setLumiState("idle");
      setSpeechBubble("");
      speakingRef.current = false;
    };

    window.speechSynthesis.speak(u);
  }, [store.ageBand]);

  const handleStateChange = useCallback((state: LumiState) => {
    setLumiState(state);
    if (state === "thinking") {
      setThinkingMsg(THINKING_MESSAGES[Math.floor(Math.random() * THINKING_MESSAGES.length)]);
    }
  }, []);

  const handleStarsEarned = useCallback((n: number) => {
    store.addStars(n);
    const prev = store.stars;
    const next = prev + n;
    if (prev < 10 && next >= 10) {
      setLumiState("happy");
      speakText("YES! You just earned 10 stars! You are AMAZING! 🎉");
    } else if (prev < 50 && next >= 50) {
      setLumiState("happy");
      speakText("FIFTY STARS! You are absolutely incredible! You've unlocked a new Lumi look! 🌟");
    }
  }, [store, speakText]);

  const handleTabChange = (newTab: Tab) => {
    setTab(newTab);
    if (newTab === "games" && !store.schoolMode) {
      setTimeout(() => speakText("Ooh, game time! Which game do you want to play?"), 300);
    } else if (newTab === "songs" && !store.schoolMode) {
      setTimeout(() => speakText("Song time! Want to sing a classic, or should I make up a song just for you?"), 300);
    } else if (newTab === "learn") {
      setTimeout(() => speakText("Let's learn something amazing! What are we exploring today?"), 300);
    }
  };

  const bgGradient = THEME_BG[store.lumiColorTheme] || THEME_BG.purple;
  const schoolModeBlocked = store.schoolMode && (tab === "games" || tab === "songs");

  return (
    <div className={`relative flex flex-col h-[90vh] max-h-[800px] bg-gradient-to-b ${bgGradient} rounded-3xl overflow-hidden shadow-2xl`}>
      {/* Background particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-white/20 text-xl select-none"
            style={{ left: `${(i * 8.5) % 100}%`, top: `${(i * 13) % 80}%` }}
            animate={{ y: [-10, 10, -10], opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 3 + i * 0.5, repeat: Infinity, delay: i * 0.3 }}
          >
            ✦
          </motion.div>
        ))}
      </div>

      {/* Top bar */}
      <div className="relative z-10 flex items-center justify-between px-4 pt-3 pb-1">
        {/* Streak */}
        <div className="flex items-center gap-1 bg-white/20 rounded-full px-3 py-1">
          <span className="text-sm">🔥</span>
          <span className="text-white font-black text-sm">{store.streak}</span>
        </div>

        {/* Stars */}
        <div className="flex items-center gap-1 bg-white/20 rounded-full px-3 py-1">
          <span className="text-sm">⭐</span>
          <span className="text-white font-black text-sm">{store.stars}</span>
        </div>
      </div>

      {/* Lumi Character — always visible */}
      <div className="relative z-10 flex flex-col items-center pt-2 pb-1">
        <LumiCharacter state={lumiState} size={160} theme={store.lumiColorTheme} />

        {/* Speech bubble */}
        <AnimatePresence>
          {speechBubble && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full z-20 bg-white rounded-2xl rounded-tl-sm shadow-lg px-4 py-3 max-w-[280px] text-sm text-gray-700 font-semibold leading-relaxed"
              style={{ marginTop: 8 }}
            >
              {speechBubble}
            </motion.div>
          )}
          {lumiState === "thinking" && !speechBubble && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="bg-white/80 rounded-2xl px-4 py-2 text-sm text-gray-600 font-semibold mt-1"
            >
              {thinkingMsg}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mode area */}
      <div className="relative z-10 flex-1 overflow-hidden">
        {schoolModeBlocked ? (
          <div className="flex flex-col items-center justify-center h-full gap-3 px-6 text-center">
            <div className="text-5xl">📚</div>
            <h3 className="text-xl font-black text-white">School Mode is ON</h3>
            <p className="text-white/70 text-sm">Games and Songs are paused. Switch to Chat or Learn!</p>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="h-full"
            >
              {tab === "chat" && (
                <ChatMode
                  ageBand={store.ageBand}
                  sessionId={sessionId}
                  isFamilyPlan={isFamilyPlan}
                  onStateChange={handleStateChange}
                  onSpeak={speakText}
                  pushToTalk={store.pushToTalk}
                />
              )}
              {tab === "games" && (
                <GamesMode
                  ageBand={store.ageBand}
                  childName={store.childName}
                  sessionId={sessionId}
                  onStateChange={handleStateChange}
                  onSpeak={speakText}
                  onStarsEarned={handleStarsEarned}
                  pushToTalk={store.pushToTalk}
                />
              )}
              {tab === "songs" && (
                <SongsMode
                  ageBand={store.ageBand}
                  childName={store.childName}
                  onStateChange={handleStateChange}
                  onSpeak={speakText}
                  onStarsEarned={handleStarsEarned}
                />
              )}
              {tab === "learn" && (
                <LearnMode
                  ageBand={store.ageBand}
                  childName={store.childName}
                  sessionId={sessionId}
                  onStateChange={handleStateChange}
                  onSpeak={speakText}
                  onStarsEarned={handleStarsEarned}
                  pushToTalk={store.pushToTalk}
                />
              )}
              {tab === "parent" && <ParentMode />}
            </motion.div>
          </AnimatePresence>
        )}
      </div>

      {/* Bottom tab bar */}
      <div className="relative z-10 bg-white/20 backdrop-blur border-t border-white/30 px-2 py-2 flex justify-around safe-area-bottom">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => handleTabChange(t.id)}
            className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all ${
              tab === t.id ? "bg-white/30 scale-105" : "hover:bg-white/10"
            }`}
          >
            <span className="text-xl">{t.emoji}</span>
            <span className={`text-xs font-bold ${tab === t.id ? "text-white" : "text-white/60"}`}>
              {t.label}
            </span>
          </button>
        ))}
      </div>

      {/* HELP button */}
      <button
        onClick={() => setHelpOpen(true)}
        className="absolute bottom-20 right-3 z-20 bg-blue-500 hover:bg-blue-400 text-white font-black text-xs px-3 py-2 rounded-full shadow-lg"
      >
        HELP
      </button>

      {/* Help modal */}
      <AnimatePresence>
        {helpOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm rounded-3xl"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="bg-white rounded-3xl p-8 max-w-xs mx-4 text-center shadow-2xl"
            >
              <div className="text-5xl mb-4">💙</div>
              <h3 className="text-xl font-black text-gray-800 mb-2">Need help?</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-6">
                Find a grown-up you trust and show them this screen. I&apos;ll be right here when you&apos;re back! 💙
              </p>
              <button
                onClick={() => setHelpOpen(false)}
                className="bg-blue-500 hover:bg-blue-400 text-white font-black px-6 py-3 rounded-2xl transition-colors"
              >
                OK, I&apos;m okay!
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

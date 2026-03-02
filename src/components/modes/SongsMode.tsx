"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, Square } from "lucide-react";
import type { LumiState } from "@/components/LumiCharacter";

interface Props {
  ageBand: string;
  childName: string;
  onStateChange: (state: LumiState) => void;
  onSpeak: (text: string, onWord?: (idx: number) => void) => void;
  onStarsEarned: (n: number) => void;
}

const PRESET_SONGS = [
  {
    id: "twinkle",
    title: "Twinkle Twinkle",
    emoji: "⭐",
    lyrics: [
      "Twinkle twinkle little star",
      "How I wonder what you are",
      "Up above the world so high",
      "Like a diamond in the sky",
      "Twinkle twinkle little star",
      "How I wonder what you are",
    ],
  },
  {
    id: "oldmac",
    title: "Old MacDonald",
    emoji: "🐄",
    lyrics: [
      "Old MacDonald had a farm",
      "E I E I O",
      "And on his farm he had a cow",
      "E I E I O",
      "With a moo moo here and a moo moo there",
      "Here a moo there a moo everywhere a moo moo",
      "Old MacDonald had a farm",
      "E I E I O",
    ],
  },
  {
    id: "wheels",
    title: "Wheels on the Bus",
    emoji: "🚌",
    lyrics: [
      "The wheels on the bus go round and round",
      "Round and round round and round",
      "The wheels on the bus go round and round",
      "All through the town",
      "The wipers on the bus go swish swish swish",
      "Swish swish swish swish swish swish",
      "The wipers on the bus go swish swish swish",
      "All through the town",
    ],
  },
  {
    id: "rowboat",
    title: "Row Row Row Your Boat",
    emoji: "⛵",
    lyrics: [
      "Row row row your boat",
      "Gently down the stream",
      "Merrily merrily merrily merrily",
      "Life is but a dream",
    ],
  },
  {
    id: "abc",
    title: "ABC Song",
    emoji: "🔤",
    lyrics: [
      "A B C D E F G",
      "H I J K L M N O P",
      "Q R S T U V",
      "W X Y and Z",
      "Now I know my ABCs",
      "Next time won't you sing with me",
    ],
  },
];

export function SongsMode({ ageBand, childName, onStateChange, onSpeak, onStarsEarned }: Props) {
  const [view, setView] = useState<"menu" | "preset" | "custom" | "generating">("menu");
  const [activeSong, setActiveSong] = useState<typeof PRESET_SONGS[0] | null>(null);
  const [customLyrics, setCustomLyrics] = useState<string[]>([]);
  const [customTitle, setCustomTitle] = useState("");
  const [customPrompt, setCustomPrompt] = useState("");
  const [currentLine, setCurrentLine] = useState(-1);
  const [isSinging, setIsSinging] = useState(false);
  const [singAlong, setSingAlong] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const speakLine = (line: string, idx: number, onDone?: () => void) => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(line);
    u.rate = 0.8;
    u.pitch = 1.2;
    const voices = window.speechSynthesis.getVoices();
    const female = voices.find((v) => v.lang.startsWith("en") && /female|samantha|karen|zoe|victoria/i.test(v.name));
    if (female) u.voice = female;
    u.onend = () => { if (onDone) onDone(); };
    utteranceRef.current = u;
    window.speechSynthesis.speak(u);
    setCurrentLine(idx);
  };

  const playSong = (lyrics: string[]) => {
    if (isSinging) {
      window.speechSynthesis.cancel();
      setIsSinging(false);
      setCurrentLine(-1);
      return;
    }
    setIsSinging(true);
    onStateChange("speaking");
    let i = 0;
    const playNext = () => {
      if (i >= lyrics.length) {
        setIsSinging(false);
        setCurrentLine(-1);
        onStateChange("happy");
        onStarsEarned(3);
        setTimeout(() => onStateChange("idle"), 2000);
        return;
      }
      speakLine(lyrics[i], i, () => {
        i++;
        setTimeout(playNext, 400);
      });
    };
    playNext();
  };

  const generateSong = async () => {
    if (!customPrompt.trim()) return;
    setView("generating");
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [{
            role: "user",
            content: `Write a fun kids' song about: ${customPrompt}. Use a simple AABB rhyme scheme (every 2 lines rhyme). Keep it 6-8 lines total. Only output the song lyrics, one line per line. No title, no verse labels, just the lines.`,
          }],
          age: ageBand,
          mode: "songs",
          childName,
          blockedTopics: [],
          sessionId: "songs",
        }),
      });
      const data = await res.json();
      const lines = (data.response || "").split("\n").filter((l: string) => l.trim().length > 0);
      setCustomLyrics(lines);
      setCustomTitle(`A Song About ${customPrompt}`);
      setView("custom");
    } catch {
      setCustomLyrics(["Twinkle twinkle little star,", "We had trouble but here we are!", "Try again and you will see,", "A perfect song for you and me!"]);
      setCustomTitle("A Special Song");
      setView("custom");
    }
  };

  const startSingAlong = async () => {
    setSingAlong(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      recorderRef.current = recorder;
      recorder.start();
      setIsRecording(true);
    } catch {
      // mic denied
    }
  };

  const stopSingAlong = () => {
    if (recorderRef.current) {
      recorderRef.current.stop();
      recorderRef.current.stream?.getTracks().forEach((t) => t.stop());
    }
    setSingAlong(false);
    setIsRecording(false);
  };

  const lyrics = activeSong?.lyrics || customLyrics;

  if (view === "menu") {
    return (
      <div className="flex flex-col h-full px-4 py-3 overflow-y-auto">
        <h2 className="text-2xl font-black text-white text-center mb-1">Song Time! 🎵</h2>
        <p className="text-white/70 text-center text-sm mb-4">Pick a song or make one up!</p>

        <div className="space-y-2 mb-4">
          {PRESET_SONGS.map((song, i) => (
            <motion.button
              key={song.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.07 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => { setActiveSong(song); setView("preset"); }}
              className="w-full bg-white/20 hover:bg-white/30 border border-white/30 rounded-2xl px-4 py-3 flex items-center gap-3 transition-all text-left"
            >
              <span className="text-3xl">{song.emoji}</span>
              <span className="text-white font-black">{song.title}</span>
            </motion.button>
          ))}
        </div>

        <div className="bg-white/10 border border-white/30 rounded-2xl p-4">
          <p className="text-white font-black mb-2">🎤 Make a song about...</p>
          <div className="flex gap-2">
            <input
              type="text"
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && generateSong()}
              placeholder="e.g. dinosaurs, pizza, my dog..."
              className="flex-1 bg-white/20 border border-white/30 rounded-xl px-3 py-2 text-white placeholder-white/50 focus:outline-none focus:border-white/60"
            />
            <button
              onClick={generateSong}
              disabled={!customPrompt.trim()}
              className="bg-yellow-400 hover:bg-yellow-300 disabled:opacity-40 text-black font-black px-4 rounded-xl"
            >
              ✨
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (view === "generating") {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="text-6xl"
        >
          🎵
        </motion.div>
        <p className="text-white font-black text-xl">Writing your song...</p>
        <p className="text-white/60 text-sm">This will be amazing! ✨</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-2 px-4 py-2 border-b border-white/20">
        <button onClick={() => { setView("menu"); setActiveSong(null); setCustomLyrics([]); setCurrentLine(-1); window.speechSynthesis?.cancel(); setIsSinging(false); }}
          className="text-white/70 hover:text-white text-sm font-bold">
          ← Songs
        </button>
        <span className="text-white font-black text-sm flex-1 text-center">
          {activeSong?.emoji || "🎵"} {activeSong?.title || customTitle}
        </span>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-2">
        {lyrics.map((line, i) => (
          <motion.div
            key={i}
            animate={{
              scale: currentLine === i ? 1.05 : 1,
              color: currentLine === i ? "#fde047" : "rgba(255,255,255,0.8)",
            }}
            className="text-2xl font-black text-center leading-relaxed"
          >
            {currentLine === i && (
              <motion.span
                className="inline-block mr-2"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 0.3, repeat: Infinity }}
              >
                ♪
              </motion.span>
            )}
            {line}
          </motion.div>
        ))}
      </div>

      <div className="px-4 pb-6 space-y-3">
        <button
          onClick={() => playSong(lyrics)}
          className={`w-full py-4 rounded-2xl font-black text-xl transition-all ${
            isSinging
              ? "bg-red-500 text-white"
              : "bg-yellow-400 hover:bg-yellow-300 text-black"
          }`}
        >
          {isSinging ? "⏹ Stop" : "▶ Sing with Lumi!"}
        </button>

        <button
          onClick={singAlong ? stopSingAlong : startSingAlong}
          className={`w-full py-3 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all border-2 ${
            singAlong
              ? "bg-red-500 border-red-400 text-white"
              : "bg-white/10 border-white/30 text-white hover:bg-white/20"
          }`}
        >
          {singAlong ? <Square className="w-5 h-5 fill-white" /> : <Mic className="w-5 h-5" />}
          {singAlong ? "Stop Singing Along" : "🎤 Sing Along!"}
          {isRecording && (
            <motion.div
              className="w-2 h-2 bg-red-400 rounded-full"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            />
          )}
        </button>
      </div>
    </div>
  );
}

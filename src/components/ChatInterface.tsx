"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Send, Mic, Square, Volume2, Star, Shield } from "lucide-react";
import { converse, checkSafetyInput, synthesize, sendVoice } from "@/lib/api";
import { getOrCreateSession, getAgeBand, setAgeBand } from "@/lib/session";

type Message = {
  id: string;
  role: "user" | "assistant" | "system";
  text: string;
  blocked?: boolean;
};

type AgeBand = "4-5" | "6-8" | "9-12";

const AGE_BANDS: { value: AgeBand; label: string; emoji: string }[] = [
  { value: "4-5", label: "Ages 4–5", emoji: "🌟" },
  { value: "6-8", label: "Ages 6–8", emoji: "🚀" },
  { value: "9-12", label: "Ages 9–12", emoji: "🔬" },
];

function getBestMimeType(): string {
  const types = ["audio/webm;codecs=opus", "audio/webm", "audio/ogg;codecs=opus", "audio/mp4"];
  for (const t of types) {
    if (typeof MediaRecorder !== "undefined" && MediaRecorder.isTypeSupported(t)) return t;
  }
  return "audio/webm";
}

function playBase64Audio(b64: string) {
  try {
    const bytes = atob(b64);
    const arr = new Uint8Array(bytes.length);
    for (let i = 0; i < bytes.length; i++) arr[i] = bytes.charCodeAt(i);
    const blob = new Blob([arr], { type: "audio/wav" });
    const url = URL.createObjectURL(blob);
    const audio = new Audio(url);
    audio.onended = () => URL.revokeObjectURL(url);
    audio.play().catch(() => {});
  } catch {
    // ignore
  }
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [ageBand, setAgeBandState] = useState<AgeBand>("6-8");
  const [mode, setMode] = useState<"text" | "voice">("text");
  const [busy, setBusy] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [lastReply, setLastReply] = useState("");
  const [speakingTts, setSpeakingTts] = useState(false);

  const sessionId = useRef<string>("");
  const chatRef = useRef<HTMLDivElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  useEffect(() => {
    sessionId.current = getOrCreateSession();
    const saved = getAgeBand() as AgeBand;
    setAgeBandState(saved);
    addMsg("system", `Welcome to Lumi! Session ready for ${saved === "4-5" ? "Tiny Talker 🌟" : saved === "6-8" ? "Explorer 🚀" : "Discoverer 🔬"} mode.`);
  }, []);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  const addMsg = useCallback((role: Message["role"], text: string, blocked?: boolean) => {
    const id = Math.random().toString(36).slice(2);
    setMessages((prev) => [...prev, { id, role, text, blocked }]);
    return id;
  }, []);

  const handleSend = async () => {
    const text = input.trim();
    if (!text || busy) return;
    setBusy(true);
    setInput("");
    addMsg("user", text);

    try {
      const safety = await checkSafetyInput(text, ageBand);
      if (safety?.blocked) {
        addMsg("system", `Safety filter: ${safety.reason}`, true);
        if (safety.safe_text) {
          addMsg("assistant", safety.safe_text);
          setLastReply(safety.safe_text);
        }
        return;
      }

      addMsg("assistant", "...");
      const data = await converse(sessionId.current, text, ageBand);
      setMessages((prev) => {
        const msgs = [...prev];
        const last = msgs[msgs.length - 1];
        if (last.text === "...") msgs[msgs.length - 1] = { ...last, text: data.reply };
        return msgs;
      });
      setLastReply(data.reply);
    } catch (e) {
      addMsg("system", `Error: ${e instanceof Error ? e.message : "Something went wrong"}`);
    } finally {
      setBusy(false);
    }
  };

  const handleAgeBandChange = (band: AgeBand) => {
    setAgeBandState(band);
    setAgeBand(band);
    addMsg("system", `Switched to ${band === "4-5" ? "Tiny Talker 🌟" : band === "6-8" ? "Explorer 🚀" : "Discoverer 🔬"} mode.`);
  };

  const startRecording = async () => {
    if (busy) return;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: { sampleRate: 16000, channelCount: 1, echoCancellation: true },
      });
      audioChunksRef.current = [];
      const mimeType = getBestMimeType();
      const recorder = new MediaRecorder(stream, { mimeType });
      mediaRecorderRef.current = recorder;

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data);
      };

      recorder.onstop = async () => {
        const blob = new Blob(audioChunksRef.current, { type: mimeType });
        stream.getTracks().forEach((t) => t.stop());
        await processVoice(blob);
      };

      recorder.start(100);
      setIsRecording(true);
    } catch (e) {
      addMsg("system", `Mic error: ${e instanceof Error ? e.message : "Could not access microphone"}`);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false);
  };

  const processVoice = async (blob: Blob) => {
    setBusy(true);
    addMsg("user", "(voice message)");
    addMsg("assistant", "...");

    try {
      const data = await sendVoice(blob, sessionId.current, ageBand);
      setMessages((prev) => {
        const msgs = [...prev];
        // Update last user msg with transcript if available
        if (data.transcript) {
          for (let i = msgs.length - 1; i >= 0; i--) {
            if (msgs[i].role === "user") { msgs[i] = { ...msgs[i], text: data.transcript }; break; }
          }
        }
        // Update "..." with real reply
        const last = msgs[msgs.length - 1];
        if (last.text === "...") msgs[msgs.length - 1] = { ...last, text: data.reply };
        return msgs;
      });
      setLastReply(data.reply);
      if (data.audio_base64) playBase64Audio(data.audio_base64);
    } catch (e) {
      setMessages((prev) => {
        const msgs = [...prev];
        const last = msgs[msgs.length - 1];
        if (last.text === "...") msgs.splice(msgs.length - 1, 1);
        return msgs;
      });
      addMsg("system", `Voice error: ${e instanceof Error ? e.message : "Failed"}`);
    } finally {
      setBusy(false);
    }
  };

  const speakLast = async () => {
    if (!lastReply || speakingTts) return;
    setSpeakingTts(true);
    try {
      const blob = await synthesize(lastReply, "nova", 1.0);
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      audio.onended = () => { URL.revokeObjectURL(url); setSpeakingTts(false); };
      audio.play().catch(() => setSpeakingTts(false));
    } catch {
      setSpeakingTts(false);
    }
  };

  return (
    <div className="flex flex-col h-[85vh] max-h-[700px] bg-[#0f0a1e] rounded-2xl border border-indigo-800/40 overflow-hidden shadow-2xl">
      {/* Header */}
      <div className="bg-[#1a1030] border-b border-indigo-800/30 px-4 py-3 flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-indigo-500 flex items-center justify-center">
            <Star className="w-3.5 h-3.5 text-white fill-white" />
          </div>
          <span className="font-black text-white text-sm">Lumi</span>
        </div>

        {/* Age selector */}
        <div className="flex gap-1">
          {AGE_BANDS.map((b) => (
            <button
              key={b.value}
              onClick={() => handleAgeBandChange(b.value)}
              className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-colors ${ageBand === b.value ? "bg-indigo-600 text-white" : "bg-white/5 text-indigo-300 hover:bg-white/10"}`}
            >
              {b.emoji} {b.label}
            </button>
          ))}
        </div>

        {/* Mode toggle */}
        <div className="ml-auto flex gap-1 bg-white/5 rounded-lg p-1">
          <button onClick={() => setMode("text")} className={`text-xs font-bold px-3 py-1 rounded transition-colors ${mode === "text" ? "bg-indigo-600 text-white" : "text-indigo-300"}`}>Text</button>
          <button onClick={() => setMode("voice")} className={`text-xs font-bold px-3 py-1 rounded transition-colors ${mode === "voice" ? "bg-indigo-600 text-white" : "text-indigo-300"}`}>Voice</button>
        </div>

        {/* Safety badge */}
        <div className="flex items-center gap-1 text-xs text-green-400">
          <Shield className="w-3 h-3" />
          <span className="hidden sm:inline font-semibold">Safe AI</span>
        </div>
      </div>

      {/* Chat messages */}
      <div ref={chatRef} className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="text-5xl mb-4">🌟</div>
            <p className="text-indigo-300 font-semibold">Hi! I&apos;m Lumi.</p>
            <p className="text-indigo-400 text-sm mt-1">Ask me anything — I&apos;m here to help you learn!</p>
          </div>
        )}
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex ${m.role === "user" ? "justify-end" : m.role === "system" ? "justify-center" : "justify-start"}`}
          >
            {m.role === "assistant" && (
              <div className="w-7 h-7 rounded-full bg-indigo-600 flex items-center justify-center mr-2 mt-1 shrink-0">
                <Star className="w-3.5 h-3.5 text-white fill-white" />
              </div>
            )}
            <div
              className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                m.role === "user"
                  ? "bg-indigo-600 text-white rounded-br-sm"
                  : m.role === "system"
                  ? `${m.blocked ? "bg-red-900/40 border border-red-700/50 text-red-300" : "bg-yellow-900/30 border border-yellow-700/30 text-yellow-300"} text-xs py-1.5 px-3 rounded-xl`
                  : m.text === "..."
                  ? "bg-white/10 text-indigo-300 rounded-bl-sm"
                  : "bg-white/10 text-indigo-100 rounded-bl-sm border border-white/5"
              }`}
            >
              {m.text === "..." ? (
                <span className="inline-flex gap-1">
                  <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </span>
              ) : m.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input area */}
      <div className="bg-[#1a1030] border-t border-indigo-800/30 px-4 py-3">
        {mode === "text" ? (
          <div className="flex gap-2 items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && !busy) handleSend(); }}
              placeholder="Ask Lumi anything..."
              disabled={busy}
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-indigo-400 outline-none focus:border-indigo-500 transition-colors disabled:opacity-50"
            />
            <button
              onClick={speakLast}
              disabled={!lastReply || speakingTts}
              className="w-10 h-10 rounded-xl bg-violet-600 hover:bg-violet-500 flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed transition-colors shrink-0"
              title="Play Lumi's last reply"
            >
              <Volume2 className="w-4 h-4 text-white" />
            </button>
            <button
              onClick={handleSend}
              disabled={busy || !input.trim()}
              className="w-10 h-10 rounded-xl bg-indigo-600 hover:bg-indigo-500 flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed transition-colors shrink-0"
            >
              <Send className="w-4 h-4 text-white" />
            </button>
          </div>
        ) : (
          <div className="flex gap-3 items-center justify-center">
            <button
              onClick={speakLast}
              disabled={!lastReply || speakingTts}
              className="w-12 h-12 rounded-xl bg-violet-600 hover:bg-violet-500 flex items-center justify-center disabled:opacity-40 transition-colors"
              title="Play Lumi's last reply"
            >
              <Volume2 className="w-5 h-5 text-white" />
            </button>
            <button
              onClick={isRecording ? stopRecording : startRecording}
              disabled={busy && !isRecording}
              className={`relative w-20 h-20 rounded-full flex items-center justify-center transition-all shadow-lg ${
                isRecording
                  ? "bg-red-600 hover:bg-red-500 shadow-red-600/40"
                  : "bg-indigo-600 hover:bg-indigo-500 shadow-indigo-600/40"
              } disabled:opacity-40`}
            >
              {isRecording && <span className="absolute inset-0 rounded-full bg-red-500/40 animate-ping" />}
              {isRecording ? <Square className="w-7 h-7 text-white fill-white" /> : <Mic className="w-7 h-7 text-white" />}
            </button>
            <div className="w-12 h-12 flex items-center justify-center">
              {busy && !isRecording && (
                <div className="w-6 h-6 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin" />
              )}
            </div>
          </div>
        )}
        {mode === "voice" && (
          <p className="text-center text-indigo-400 text-xs mt-2">
            {isRecording ? "Recording... tap Stop when done" : "Tap the mic to start talking to Lumi"}
          </p>
        )}
      </div>
    </div>
  );
}

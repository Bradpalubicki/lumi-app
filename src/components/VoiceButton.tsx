"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, Square, Keyboard } from "lucide-react";

interface Props {
  onVoiceInput: (blob: Blob, mimeType: string) => void;
  onTextInput?: (text: string) => void;
  isProcessing: boolean;
  transcript?: string;
  ageBand: string;
  pushToTalk?: boolean;
}

function getBestMime(): string {
  const types = ["audio/webm;codecs=opus", "audio/webm", "audio/ogg;codecs=opus", "audio/mp4"];
  for (const t of types) {
    if (typeof MediaRecorder !== "undefined" && MediaRecorder.isTypeSupported(t)) return t;
  }
  return "audio/webm";
}

export function VoiceButton({
  onVoiceInput,
  onTextInput,
  isProcessing,
  transcript,
  ageBand,
  pushToTalk = false,
}: Props) {
  const [isRecording, setIsRecording] = useState(false);
  const [showText, setShowText] = useState(false);
  const [textInput, setTextInput] = useState("");
  const [waveData, setWaveData] = useState<number[]>(Array(20).fill(10));

  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const animFrameRef = useRef<number>(0);
  const silenceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);

  const stopRecording = useCallback(() => {
    if (recorderRef.current && recorderRef.current.state !== "inactive") {
      recorderRef.current.stop();
    }
    if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
    cancelAnimationFrame(animFrameRef.current);
    setIsRecording(false);
    setWaveData(Array(20).fill(10));
  }, []);

  const startRecording = useCallback(async () => {
    if (isProcessing) return;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: { sampleRate: 16000, channelCount: 1, echoCancellation: true },
      });

      const audioCtx = new AudioContext();
      const source = audioCtx.createMediaStreamSource(stream);
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 64;
      source.connect(analyser);
      analyserRef.current = analyser;

      const dataArr = new Uint8Array(analyser.frequencyBinCount);

      const animate = () => {
        analyser.getByteFrequencyData(dataArr);
        const bars = Array.from(dataArr.slice(0, 20)).map((v) => Math.max(8, (v / 255) * 60));
        setWaveData(bars);

        const avg = dataArr.reduce((a, b) => a + b, 0) / dataArr.length;
        if (avg < 5) {
          if (!silenceTimerRef.current) {
            silenceTimerRef.current = setTimeout(() => {
              stopRecording();
            }, 2000);
          }
        } else {
          if (silenceTimerRef.current) {
            clearTimeout(silenceTimerRef.current);
            silenceTimerRef.current = null;
          }
        }

        animFrameRef.current = requestAnimationFrame(animate);
      };

      chunksRef.current = [];
      const mime = getBestMime();
      const recorder = new MediaRecorder(stream, { mimeType: mime });
      recorderRef.current = recorder;

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      recorder.onstop = () => {
        stream.getTracks().forEach((t) => t.stop());
        audioCtx.close();
        const blob = new Blob(chunksRef.current, { type: mime });
        if (blob.size > 1000) {
          onVoiceInput(blob, mime);
        }
      };

      recorder.start(100);
      setIsRecording(true);
      animFrameRef.current = requestAnimationFrame(animate);
    } catch {
      // Mic access denied — silently fail
    }
  }, [isProcessing, onVoiceInput, stopRecording]);

  const handleMicClick = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const handleTextSubmit = () => {
    if (!textInput.trim() || isProcessing) return;
    onTextInput?.(textInput.trim());
    setTextInput("");
  };

  const showKeyboard = ageBand !== "4-5" && onTextInput;

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      {/* Transcript */}
      <AnimatePresence>
        {transcript && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="bg-white/20 backdrop-blur rounded-2xl px-4 py-2 text-white text-sm max-w-xs text-center"
          >
            {transcript}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Waveform */}
      <AnimatePresence>
        {isRecording && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-end gap-0.5 h-12"
          >
            {waveData.map((h, i) => (
              <motion.div
                key={i}
                className="w-1.5 rounded-full bg-white/70"
                animate={{ height: h }}
                transition={{ duration: 0.05 }}
                style={{ minHeight: 4 }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center gap-4">
        {/* Text input toggle (ages 6+) */}
        {showKeyboard && !showText && (
          <button
            onClick={() => setShowText(true)}
            className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors"
          >
            <Keyboard className="w-5 h-5" />
          </button>
        )}

        {/* Main mic button */}
        <motion.button
          onClick={handleMicClick}
          disabled={isProcessing}
          whileTap={{ scale: 0.92 }}
          className={`relative w-24 h-24 rounded-full flex items-center justify-center shadow-2xl transition-colors ${
            isRecording
              ? "bg-red-500 shadow-red-400/60"
              : isProcessing
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-500 hover:bg-green-400 shadow-green-400/60"
          }`}
        >
          {isRecording && (
            <motion.div
              className="absolute inset-0 rounded-full bg-red-400/40"
              animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          )}
          {isProcessing ? (
            <div className="w-8 h-8 border-3 border-white border-t-transparent rounded-full animate-spin" />
          ) : isRecording ? (
            <Square className="w-8 h-8 text-white fill-white" />
          ) : (
            <Mic className="w-8 h-8 text-white" />
          )}
        </motion.button>

        {/* Spacer for symmetry */}
        {showKeyboard && !showText && <div className="w-12 h-12" />}
      </div>

      <p className="text-white/70 text-sm text-center">
        {isProcessing
          ? "..."
          : isRecording
          ? pushToTalk
            ? "Release to send"
            : "Tap to stop"
          : pushToTalk
          ? "Hold to talk"
          : "Tap to talk to Lumi"}
      </p>

      {/* Text input (ages 6+, toggleable) */}
      <AnimatePresence>
        {showText && showKeyboard && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="flex gap-2 w-full max-w-sm"
          >
            <input
              type="text"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleTextSubmit()}
              placeholder="Type to Lumi..."
              className="flex-1 bg-white/20 border border-white/30 rounded-2xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-white/60 text-lg"
              autoFocus
            />
            <button
              onClick={handleTextSubmit}
              disabled={!textInput.trim() || isProcessing}
              className="bg-green-500 hover:bg-green-400 disabled:opacity-40 text-white font-bold px-4 rounded-2xl"
            >
              →
            </button>
            <button
              onClick={() => setShowText(false)}
              className="text-white/60 hover:text-white px-2"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

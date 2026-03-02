"use client";

import { motion } from "framer-motion";

export type LumiState = "idle" | "listening" | "speaking" | "happy" | "thinking";

interface Props {
  state: LumiState;
  size?: number;
  theme?: "purple" | "teal" | "rose";
}

const themeColors = {
  purple: { body: "#7c3aed", glow: "#a78bfa", accent: "#c4b5fd" },
  teal: { body: "#0d9488", glow: "#2dd4bf", accent: "#99f6e4" },
  rose: { body: "#e11d48", glow: "#fb7185", accent: "#fda4af" },
};

function EyeOpen() {
  return <ellipse cx="0" cy="0" rx="6" ry="7" fill="white" />;
}

function EyeWide() {
  return <ellipse cx="0" cy="0" rx="7" ry="9" fill="white" />;
}

function EyeHappy() {
  return (
    <path d="M -6 2 Q 0 -6 6 2" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" />
  );
}

function Pupil({ x = 0, y = 0 }: { x?: number; y?: number }) {
  return <circle cx={x} cy={y} r="3" fill="#1e1b4b" />;
}

export function LumiCharacter({ state, size = 180, theme = "purple" }: Props) {
  const colors = themeColors[theme];

  const bodyVariants = {
    idle: { y: [0, -8, 0], scale: 1, rotate: 0 },
    listening: { y: -5, scale: 1.05, rotate: 0 },
    speaking: { scale: [1, 1.03, 1], y: 0, rotate: 0 },
    happy: { y: [0, -15, 0, -10, 0], scale: [1, 1.1, 1], rotate: 0 },
    thinking: { y: 0, scale: 1, rotate: -8 },
  };

  const bodyTransitions: Record<LumiState, object> = {
    idle: { duration: 2, repeat: Infinity, ease: "easeInOut" },
    listening: { duration: 0.3 },
    speaking: { duration: 0.4, repeat: Infinity, ease: "easeInOut" },
    happy: { duration: 0.6, repeat: 2, ease: "easeInOut" },
    thinking: { duration: 0.4 },
  };

  const mouthPath = {
    idle: "M -12 0 Q 0 8 12 0",
    listening: "M -10 0 Q 0 6 10 0",
    speaking: "M -14 0 Q 0 14 14 0",
    happy: "M -15 -2 Q 0 16 15 -2",
    thinking: "M -8 4 Q 0 0 8 4",
  };

  const glowOpacity = {
    idle: 0.3,
    listening: 0.6,
    speaking: 0.5,
    happy: 0.8,
    thinking: 0.2,
  };

  return (
    <div style={{ width: size, height: size }} className="relative select-none">
      {/* Sparkles for happy state */}
      {state === "happy" && (
        <>
          {[-40, 40, -50, 50].map((x, i) => (
            <motion.div
              key={i}
              className="absolute top-1/2 left-1/2 text-yellow-400 text-xl"
              initial={{ opacity: 0, x, y: (i % 2 === 0 ? -1 : 1) * 30, scale: 0 }}
              animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 0], y: [(i % 2 === 0 ? -1 : 1) * 30, (i % 2 === 0 ? -1 : 1) * 60] }}
              transition={{ duration: 0.8, delay: i * 0.1, repeat: 2 }}
            >
              ✨
            </motion.div>
          ))}
        </>
      )}

      {/* Pulsing ring for listening */}
      {state === "listening" && (
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{ border: `3px solid ${colors.glow}` }}
          animate={{ scale: [1, 1.3, 1], opacity: [0.8, 0, 0.8] }}
          transition={{ duration: 1.2, repeat: Infinity }}
        />
      )}

      <motion.svg
        viewBox="-60 -70 120 140"
        width={size}
        height={size}
        variants={bodyVariants}
        animate={state}
        transition={bodyTransitions[state]}
      >
        {/* Glow */}
        <motion.ellipse
          cx="0"
          cy="5"
          rx="45"
          ry="45"
          fill={colors.glow}
          animate={{ opacity: glowOpacity[state] }}
          transition={{ duration: 0.5 }}
          style={{ filter: "blur(8px)" }}
        />

        {/* Body */}
        <motion.ellipse cx="0" cy="0" rx="40" ry="42" fill={colors.body} />

        {/* Face highlights */}
        <ellipse cx="-12" cy="-20" rx="8" ry="6" fill={colors.accent} opacity="0.3" />

        {/* Left arm */}
        <motion.path
          d="M -38 10 Q -55 0 -50 -15"
          stroke={colors.body}
          strokeWidth="12"
          strokeLinecap="round"
          fill="none"
          animate={state === "happy" ? { rotate: [-10, 10, -10] } : { rotate: 0 }}
          transition={{ duration: 0.4, repeat: state === "happy" ? 3 : 0 }}
          style={{ transformOrigin: "-38px 10px" }}
        />
        {/* Right arm */}
        <motion.path
          d="M 38 10 Q 55 0 50 -15"
          stroke={colors.body}
          strokeWidth="12"
          strokeLinecap="round"
          fill="none"
          animate={state === "happy" ? { rotate: [10, -10, 10] } : { rotate: 0 }}
          transition={{ duration: 0.4, repeat: state === "happy" ? 3 : 0 }}
          style={{ transformOrigin: "38px 10px" }}
        />

        {/* Eyes */}
        <g transform="translate(-16, -12)">
          {state === "happy" ? <EyeHappy /> : state === "listening" ? <EyeWide /> : <EyeOpen />}
          {(state === "idle" || state === "speaking" || state === "listening") && <Pupil />}
        </g>
        <g transform="translate(16, -12)">
          {state === "happy" ? <EyeHappy /> : state === "listening" ? <EyeWide /> : <EyeOpen />}
          {(state === "idle" || state === "speaking" || state === "listening") && <Pupil />}
        </g>

        {/* Thinking dots */}
        {state === "thinking" && (
          <>
            <motion.circle
              cx="-8" cy="8" r="4" fill="white"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 0.6, repeat: Infinity }}
            />
            <motion.circle
              cx="0" cy="8" r="4" fill="white"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 0.6, delay: 0.2, repeat: Infinity }}
            />
            <motion.circle
              cx="8" cy="8" r="4" fill="white"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 0.6, delay: 0.4, repeat: Infinity }}
            />
          </>
        )}

        {/* Mouth */}
        {state !== "thinking" && (
          <motion.path
            d={mouthPath[state]}
            stroke="white"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            animate={{ d: mouthPath[state] }}
            transition={{ duration: 0.3 }}
          />
        )}

        {/* Cheek blush */}
        <ellipse cx="-28" cy="8" rx="8" ry="5" fill="#f9a8d4" opacity="0.4" />
        <ellipse cx="28" cy="8" rx="8" ry="5" fill="#f9a8d4" opacity="0.4" />
      </motion.svg>
    </div>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronRight, Check } from "lucide-react";
import { useChildStore } from "@/lib/childStore";
import type { AgeBand, Interest } from "@/lib/childStore";

const INTERESTS: { value: Interest; label: string; emoji: string }[] = [
  { value: "animals", label: "Animals", emoji: "🐾" },
  { value: "space", label: "Space", emoji: "🚀" },
  { value: "sports", label: "Sports", emoji: "⚽" },
  { value: "art", label: "Art", emoji: "🎨" },
  { value: "music", label: "Music", emoji: "🎵" },
  { value: "science", label: "Science", emoji: "🔬" },
  { value: "food", label: "Food", emoji: "🍕" },
  { value: "dinosaurs", label: "Dinosaurs", emoji: "🦕" },
  { value: "superheroes", label: "Superheroes", emoji: "🦸" },
  { value: "robots", label: "Robots", emoji: "🤖" },
];

export default function OnboardingPage() {
  const router = useRouter();
  const { completeOnboarding } = useChildStore();

  const [step, setStep] = useState(1);
  const [childName, setChildName] = useState("");
  const [ageBand, setAgeBand] = useState<AgeBand>("6-8");
  const [selectedInterests, setSelectedInterests] = useState<Interest[]>([]);
  const [pin1, setPin1] = useState("");
  const [pin2, setPin2] = useState("");
  const [parentEmail, setParentEmail] = useState("");
  const [pinError, setPinError] = useState("");

  const toggleInterest = (interest: Interest) => {
    setSelectedInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : prev.length < 5
        ? [...prev, interest]
        : prev
    );
  };

  const handleStep1Next = () => {
    if (!childName.trim()) return;
    setStep(2);
  };

  const handleStep2Next = () => {
    if (selectedInterests.length === 0) return;
    setStep(3);
  };

  const handleStep3Submit = () => {
    if (pin1.length !== 4 || !/^\d{4}$/.test(pin1)) {
      setPinError("PIN must be 4 digits");
      return;
    }
    if (pin1 !== pin2) {
      setPinError("PINs don't match");
      return;
    }
    setPinError("");
    completeOnboarding({
      childName: childName.trim(),
      ageBand,
      interests: selectedInterests,
      parentPIN: pin1,
      parentEmail,
    });
    setStep(4);
    setTimeout(() => router.push("/app"), 2500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-400 via-violet-400 to-amber-200 flex items-center justify-center px-4 py-8">
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md"
          >
            <div className="text-center mb-6">
              <div className="text-6xl mb-3">🌟</div>
              <h1 className="text-2xl font-black text-violet-700">Welcome to Lumi!</h1>
              <p className="text-gray-500 text-sm mt-1">Let&apos;s set things up for your child</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Child&apos;s first name</label>
                <input
                  type="text"
                  value={childName}
                  onChange={(e) => setChildName(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleStep1Next()}
                  placeholder="e.g. Emma"
                  className="w-full border-2 border-violet-200 rounded-2xl px-4 py-3 text-lg text-gray-800 focus:outline-none focus:border-violet-500 transition-colors"
                  maxLength={30}
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Child&apos;s age group</label>
                <div className="grid grid-cols-3 gap-2">
                  {(["4-5", "6-8", "9-12"] as AgeBand[]).map((band) => (
                    <button
                      key={band}
                      onClick={() => setAgeBand(band)}
                      className={`py-3 rounded-2xl font-bold text-sm transition-all ${
                        ageBand === band
                          ? "bg-violet-600 text-white shadow-lg scale-105"
                          : "bg-violet-50 text-violet-700 hover:bg-violet-100"
                      }`}
                    >
                      Ages {band}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleStep1Next}
                disabled={!childName.trim()}
                className="w-full bg-violet-600 hover:bg-violet-500 disabled:opacity-40 text-white font-black py-4 rounded-2xl text-lg transition-colors flex items-center justify-center gap-2 mt-2"
              >
                Next <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md"
          >
            <div className="text-center mb-6">
              <div className="text-4xl mb-2">🎯</div>
              <h2 className="text-xl font-black text-violet-700">What does {childName} love?</h2>
              <p className="text-gray-500 text-sm mt-1">Pick up to 5 favorites</p>
            </div>

            <div className="grid grid-cols-2 gap-2 mb-6">
              {INTERESTS.map((interest) => {
                const selected = selectedInterests.includes(interest.value);
                return (
                  <button
                    key={interest.value}
                    onClick={() => toggleInterest(interest.value)}
                    className={`flex items-center gap-2 py-3 px-4 rounded-2xl font-bold text-sm transition-all ${
                      selected
                        ? "bg-violet-600 text-white shadow-md scale-105"
                        : "bg-violet-50 text-violet-700 hover:bg-violet-100"
                    }`}
                  >
                    <span className="text-lg">{interest.emoji}</span>
                    {interest.label}
                    {selected && <Check className="w-4 h-4 ml-auto" />}
                  </button>
                );
              })}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(1)}
                className="flex-1 border-2 border-violet-200 text-violet-600 font-bold py-3 rounded-2xl"
              >
                Back
              </button>
              <button
                onClick={handleStep2Next}
                disabled={selectedInterests.length === 0}
                className="flex-1 bg-violet-600 hover:bg-violet-500 disabled:opacity-40 text-white font-black py-3 rounded-2xl transition-colors flex items-center justify-center gap-2"
              >
                Next <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md"
          >
            <div className="text-center mb-6">
              <div className="text-4xl mb-2">🔒</div>
              <h2 className="text-xl font-black text-violet-700">Parent Setup</h2>
              <p className="text-gray-500 text-sm mt-1">Create a 4-digit PIN to access parent settings</p>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Create PIN (4 digits)</label>
                <input
                  type="password"
                  inputMode="numeric"
                  maxLength={4}
                  value={pin1}
                  onChange={(e) => setPin1(e.target.value.replace(/\D/g, "").slice(0, 4))}
                  placeholder="••••"
                  className="w-full border-2 border-violet-200 rounded-2xl px-4 py-3 text-2xl text-center tracking-widest focus:outline-none focus:border-violet-500"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Confirm PIN</label>
                <input
                  type="password"
                  inputMode="numeric"
                  maxLength={4}
                  value={pin2}
                  onChange={(e) => setPin2(e.target.value.replace(/\D/g, "").slice(0, 4))}
                  placeholder="••••"
                  className="w-full border-2 border-violet-200 rounded-2xl px-4 py-3 text-2xl text-center tracking-widest focus:outline-none focus:border-violet-500"
                />
              </div>
              {pinError && <p className="text-red-500 text-sm text-center">{pinError}</p>}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  Parent email <span className="text-gray-400 font-normal">(optional, for weekly digest)</span>
                </label>
                <input
                  type="email"
                  value={parentEmail}
                  onChange={(e) => setParentEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full border-2 border-violet-200 rounded-2xl px-4 py-3 focus:outline-none focus:border-violet-500"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(2)}
                className="flex-1 border-2 border-violet-200 text-violet-600 font-bold py-3 rounded-2xl"
              >
                Back
              </button>
              <button
                onClick={handleStep3Submit}
                disabled={pin1.length !== 4 || pin2.length !== 4}
                className="flex-1 bg-violet-600 hover:bg-violet-500 disabled:opacity-40 text-white font-black py-3 rounded-2xl transition-colors"
              >
                Meet Lumi! 🌟
              </button>
            </div>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div
            key="step4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <motion.div
              animate={{ y: [0, -20, 0], rotate: [0, 5, -5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-8xl mb-6"
            >
              🌟
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-3xl font-black text-white drop-shadow-lg mb-2">
                Lumi is getting ready to meet {childName}! ✨
              </h2>
              <p className="text-white/80 text-lg">Getting everything set up...</p>
            </motion.div>
            <motion.div className="flex justify-center gap-2 mt-6">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-3 h-3 bg-white rounded-full"
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 0.8, delay: i * 0.2, repeat: Infinity }}
                />
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {step < 4 && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 flex gap-2">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`w-8 h-2 rounded-full transition-colors ${
                step >= s ? "bg-white" : "bg-white/30"
              }`}
            />
          ))}
        </div>
      )}

      <div className="absolute top-4 right-4 flex items-center gap-1 text-white/70">
        <Star className="w-4 h-4 fill-white/70" />
        <span className="text-sm font-bold">Lumi</span>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SignOutButton } from "@clerk/nextjs";
import { useChildStore } from "@/lib/childStore";
import type { AgeBand, Interest } from "@/lib/childStore";

const INTERESTS_LIST: { value: Interest; label: string; emoji: string }[] = [
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

export function ParentMode() {
  const store = useChildStore();
  const [pinInput, setPinInput] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [pinError, setPinError] = useState("");
  const [newTopic, setNewTopic] = useState("");
  const [activeSection, setActiveSection] = useState<"overview" | "child" | "limits" | "topics">("overview");

  const handleUnlock = () => {
    if (pinInput === store.parentPIN) {
      setUnlocked(true);
      setPinError("");
    } else {
      setPinError("Incorrect PIN");
      setPinInput("");
    }
  };

  if (!unlocked) {
    return (
      <div className="flex flex-col items-center justify-center h-full px-6 gap-6">
        <div className="text-6xl">🔒</div>
        <div className="text-center">
          <h2 className="text-2xl font-black text-white">Parent Zone</h2>
          <p className="text-white/60 text-sm mt-1">Enter your 4-digit PIN to continue</p>
        </div>
        <input
          type="password"
          inputMode="numeric"
          maxLength={4}
          value={pinInput}
          onChange={(e) => setPinInput(e.target.value.replace(/\D/g, "").slice(0, 4))}
          onKeyDown={(e) => e.key === "Enter" && handleUnlock()}
          placeholder="••••"
          className="w-40 bg-white/20 border-2 border-white/40 rounded-2xl px-4 py-4 text-3xl text-center tracking-widest text-white placeholder-white/30 focus:outline-none focus:border-white/70"
          autoFocus
        />
        {pinError && <p className="text-red-300 text-sm">{pinError}</p>}
        <button
          onClick={handleUnlock}
          disabled={pinInput.length !== 4}
          className="bg-violet-600 hover:bg-violet-500 disabled:opacity-40 text-white font-black px-8 py-3 rounded-2xl transition-colors"
        >
          Unlock
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-white/5">
      {/* Tab nav */}
      <div className="flex gap-1 px-3 py-2 overflow-x-auto border-b border-white/10">
        {(["overview", "child", "limits", "topics"] as const).map((s) => (
          <button
            key={s}
            onClick={() => setActiveSection(s)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap capitalize transition-colors ${
              activeSection === s ? "bg-violet-600 text-white" : "text-white/60 hover:text-white"
            }`}
          >
            {s === "overview" ? "📊 Overview" : s === "child" ? "👤 Child" : s === "limits" ? "⏱ Limits" : "🚫 Topics"}
          </button>
        ))}
        <div className="ml-auto">
          <SignOutButton>
            <button className="px-3 py-1.5 rounded-xl text-xs font-bold text-red-300 hover:text-red-200 whitespace-nowrap">
              Sign Out
            </button>
          </SignOutButton>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {activeSection === "overview" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <div className="bg-white/10 rounded-2xl p-4">
              <h3 className="text-white font-black mb-3">Today&apos;s Session</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-yellow-400/10 border border-yellow-400/30 rounded-xl p-3 text-center">
                  <div className="text-3xl font-black text-yellow-300">{store.stars}</div>
                  <div className="text-white/60 text-xs mt-1">Stars Earned</div>
                </div>
                <div className="bg-orange-400/10 border border-orange-400/30 rounded-xl p-3 text-center">
                  <div className="text-3xl font-black text-orange-300">🔥 {store.streak}</div>
                  <div className="text-white/60 text-xs mt-1">Day Streak</div>
                </div>
              </div>
            </div>

            {store.sessionTopics.length > 0 && (
              <div className="bg-white/10 rounded-2xl p-4">
                <h3 className="text-white font-black mb-2">Recent Topics</h3>
                <div className="flex flex-wrap gap-2">
                  {store.sessionTopics.map((t, i) => (
                    <span key={i} className="bg-violet-600/40 text-violet-200 text-xs font-bold px-3 py-1 rounded-full">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-white/10 rounded-2xl p-4">
              <h3 className="text-white font-black mb-2">Settings Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-white/70">
                  <span>Child name</span><span className="text-white font-bold">{store.childName || "Not set"}</span>
                </div>
                <div className="flex justify-between text-white/70">
                  <span>Age group</span><span className="text-white font-bold">Ages {store.ageBand}</span>
                </div>
                <div className="flex justify-between text-white/70">
                  <span>School mode</span>
                  <span className={`font-bold ${store.schoolMode ? "text-green-400" : "text-white/40"}`}>
                    {store.schoolMode ? "ON" : "OFF"}
                  </span>
                </div>
                <div className="flex justify-between text-white/70">
                  <span>Daily limit</span>
                  <span className="text-white font-bold">{store.dailyLimit > 0 ? `${store.dailyLimit} min` : "Unlimited"}</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeSection === "child" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <div className="bg-white/10 rounded-2xl p-4">
              <label className="text-white/70 text-xs font-bold uppercase tracking-wider">Child&apos;s Name</label>
              <input
                type="text"
                defaultValue={store.childName}
                onBlur={(e) => useChildStore.setState({ childName: e.target.value })}
                className="w-full bg-white/10 border border-white/20 rounded-xl px-3 py-2 text-white mt-2 focus:outline-none focus:border-white/50"
                maxLength={30}
              />
            </div>

            <div className="bg-white/10 rounded-2xl p-4">
              <label className="text-white/70 text-xs font-bold uppercase tracking-wider">Age Group</label>
              <div className="grid grid-cols-3 gap-2 mt-2">
                {(["4-5", "6-8", "9-12"] as AgeBand[]).map((band) => (
                  <button
                    key={band}
                    onClick={() => store.setAgeBand(band)}
                    className={`py-2 rounded-xl font-bold text-sm transition-all ${
                      store.ageBand === band ? "bg-violet-600 text-white" : "bg-white/10 text-white/70 hover:bg-white/20"
                    }`}
                  >
                    {band}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white/10 rounded-2xl p-4">
              <label className="text-white/70 text-xs font-bold uppercase tracking-wider">Interests (up to 5)</label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {INTERESTS_LIST.map((int) => {
                  const selected = store.interests.includes(int.value);
                  return (
                    <button
                      key={int.value}
                      onClick={() => {
                        const next = selected
                          ? store.interests.filter((i) => i !== int.value)
                          : store.interests.length < 5
                          ? [...store.interests, int.value]
                          : store.interests;
                        useChildStore.setState({ interests: next });
                      }}
                      className={`flex items-center gap-2 py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                        selected ? "bg-violet-600 text-white" : "bg-white/10 text-white/60 hover:bg-white/20"
                      }`}
                    >
                      {int.emoji} {int.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}

        {activeSection === "limits" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <div className="bg-white/10 rounded-2xl p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="text-white font-black">School Mode</h3>
                  <p className="text-white/50 text-xs">Disables Games & Songs tabs</p>
                </div>
                <button
                  onClick={() => store.setSchoolMode(!store.schoolMode)}
                  className={`w-12 h-6 rounded-full transition-colors relative ${store.schoolMode ? "bg-green-500" : "bg-white/20"}`}
                >
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${store.schoolMode ? "left-7" : "left-1"}`} />
                </button>
              </div>
            </div>

            <div className="bg-white/10 rounded-2xl p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="text-white font-black">Push-to-Talk</h3>
                  <p className="text-white/50 text-xs">Hold mic button instead of tap</p>
                </div>
                <button
                  onClick={() => store.setPushToTalk(!store.pushToTalk)}
                  className={`w-12 h-6 rounded-full transition-colors relative ${store.pushToTalk ? "bg-green-500" : "bg-white/20"}`}
                >
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${store.pushToTalk ? "left-7" : "left-1"}`} />
                </button>
              </div>
            </div>

            <div className="bg-white/10 rounded-2xl p-4">
              <h3 className="text-white font-black mb-2">Daily Time Limit</h3>
              <p className="text-white/50 text-xs mb-3">0 = unlimited</p>
              <div className="grid grid-cols-4 gap-2">
                {[0, 15, 30, 60].map((mins) => (
                  <button
                    key={mins}
                    onClick={() => store.setDailyLimit(mins)}
                    className={`py-2 rounded-xl font-bold text-sm transition-all ${
                      store.dailyLimit === mins ? "bg-violet-600 text-white" : "bg-white/10 text-white/70 hover:bg-white/20"
                    }`}
                  >
                    {mins === 0 ? "∞" : `${mins}m`}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white/10 rounded-2xl p-4">
              <h3 className="text-white font-black mb-1">Parent Email</h3>
              <p className="text-white/50 text-xs mb-2">For weekly digest</p>
              <input
                type="email"
                defaultValue={store.parentEmail}
                onBlur={(e) => store.setParentEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full bg-white/10 border border-white/20 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-white/50"
              />
            </div>
          </motion.div>
        )}

        {activeSection === "topics" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <div className="bg-white/10 rounded-2xl p-4">
              <h3 className="text-white font-black mb-2">Blocked Topics</h3>
              <p className="text-white/50 text-xs mb-3">Lumi won&apos;t discuss these topics</p>

              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={newTopic}
                  onChange={(e) => setNewTopic(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && newTopic.trim()) {
                      store.setBlockedTopics([...store.blockedTopics, newTopic.trim().toLowerCase()]);
                      setNewTopic("");
                    }
                  }}
                  placeholder="Add topic to block..."
                  className="flex-1 bg-white/10 border border-white/20 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-white/50 text-sm"
                />
                <button
                  onClick={() => {
                    if (newTopic.trim()) {
                      store.setBlockedTopics([...store.blockedTopics, newTopic.trim().toLowerCase()]);
                      setNewTopic("");
                    }
                  }}
                  className="bg-violet-600 text-white font-bold px-3 rounded-xl"
                >
                  +
                </button>
              </div>

              {store.blockedTopics.length === 0 ? (
                <p className="text-white/40 text-sm text-center py-4">No topics blocked yet</p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {store.blockedTopics.map((t) => (
                    <span
                      key={t}
                      className="bg-red-500/20 border border-red-400/30 text-red-300 text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1"
                    >
                      {t}
                      <button
                        onClick={() => store.setBlockedTopics(store.blockedTopics.filter((bt) => bt !== t))}
                        className="text-red-400 hover:text-red-200 ml-1"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

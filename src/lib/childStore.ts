"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type AgeBand = "4-5" | "6-8" | "9-12";
export type LumiTheme = "purple" | "teal" | "rose";

export type Interest =
  | "animals"
  | "space"
  | "sports"
  | "art"
  | "music"
  | "science"
  | "food"
  | "dinosaurs"
  | "superheroes"
  | "robots";

interface ChildStore {
  // Onboarding
  onboardingDone: boolean;
  childName: string;
  ageBand: AgeBand;
  interests: Interest[];
  parentPIN: string;
  parentEmail: string;

  // Settings
  blockedTopics: string[];
  dailyLimit: number;
  schoolMode: boolean;
  pushToTalk: boolean;

  // Engagement
  stars: number;
  streak: number;
  lastVisitDate: string;
  lumiColorTheme: LumiTheme;
  sessionTopics: string[];

  // Actions
  completeOnboarding: (data: {
    childName: string;
    ageBand: AgeBand;
    interests: Interest[];
    parentPIN: string;
    parentEmail: string;
  }) => void;
  addStars: (n: number) => void;
  updateStreak: () => void;
  addSessionTopic: (topic: string) => void;
  setAgeBand: (band: AgeBand) => void;
  setBlockedTopics: (topics: string[]) => void;
  setDailyLimit: (limit: number) => void;
  setSchoolMode: (enabled: boolean) => void;
  setPushToTalk: (enabled: boolean) => void;
  setParentEmail: (email: string) => void;
  resetOnboarding: () => void;
}

export const useChildStore = create<ChildStore>()(
  persist(
    (set, get) => ({
      onboardingDone: false,
      childName: "",
      ageBand: "6-8",
      interests: [],
      parentPIN: "",
      parentEmail: "",
      blockedTopics: [],
      dailyLimit: 0,
      schoolMode: false,
      pushToTalk: false,
      stars: 0,
      streak: 0,
      lastVisitDate: "",
      lumiColorTheme: "purple",
      sessionTopics: [],

      completeOnboarding: (data) =>
        set({
          onboardingDone: true,
          childName: data.childName,
          ageBand: data.ageBand,
          interests: data.interests,
          parentPIN: data.parentPIN,
          parentEmail: data.parentEmail,
        }),

      addStars: (n) => {
        const prev = get().stars;
        const next = prev + n;
        const theme: LumiTheme =
          next >= 50 ? (prev < 50 ? "teal" : get().lumiColorTheme) : get().lumiColorTheme;
        set({ stars: next, lumiColorTheme: theme });
      },

      updateStreak: () => {
        const today = new Date().toDateString();
        const last = get().lastVisitDate;
        if (last === today) return;
        const yesterday = new Date(Date.now() - 86400000).toDateString();
        const newStreak = last === yesterday ? get().streak + 1 : 1;
        set({ streak: newStreak, lastVisitDate: today });
      },

      addSessionTopic: (topic) => {
        const topics = [...get().sessionTopics, topic].slice(-3);
        set({ sessionTopics: topics });
      },

      setAgeBand: (band) => set({ ageBand: band }),
      setBlockedTopics: (topics) => set({ blockedTopics: topics }),
      setDailyLimit: (limit) => set({ dailyLimit: limit }),
      setSchoolMode: (enabled) => set({ schoolMode: enabled }),
      setPushToTalk: (enabled) => set({ pushToTalk: enabled }),
      setParentEmail: (email) => set({ parentEmail: email }),
      resetOnboarding: () =>
        set({
          onboardingDone: false,
          childName: "",
          ageBand: "6-8",
          interests: [],
          parentPIN: "",
          parentEmail: "",
        }),
    }),
    { name: "lumi-child-store" }
  )
);

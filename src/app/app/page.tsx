"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { LumiApp } from "@/components/LumiApp";
import { useChildStore } from "@/lib/childStore";

export default function AppPage() {
  const router = useRouter();
  const onboardingDone = useChildStore((s) => s.onboardingDone);

  useEffect(() => {
    if (!onboardingDone) {
      router.replace("/app/onboarding");
    }
  }, [onboardingDone, router]);

  if (!onboardingDone) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-violet-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen py-4 px-4 flex items-center justify-center">
      <div className="w-full max-w-sm">
        <LumiApp />
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { useUser, useClerk } from "@clerk/nextjs";
import { Crown, Loader2 } from "lucide-react";

export function PricingCheckoutButton() {
  const { isSignedIn } = useUser();
  const { openSignUp } = useClerk();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleClick = async () => {
    if (!isSignedIn) {
      openSignUp({ afterSignUpUrl: "/pricing" });
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/payments/create-subscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: "monthly" }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        return;
      }

      if (data.url) {
        window.location.href = data.url;
      } else {
        setError("Could not create checkout. Please contact support.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleClick}
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-black py-4 rounded-xl transition-colors text-lg shadow-lg shadow-indigo-600/30"
      >
        {loading ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <Crown className="w-5 h-5 text-yellow-300" />
        )}
        {loading ? "Preparing checkout..." : isSignedIn ? "Start 30-Day Free Trial" : "Sign Up & Start Trial"}
      </button>
      {error && <p className="text-red-400 text-xs text-center mt-2">{error}</p>}
    </div>
  );
}

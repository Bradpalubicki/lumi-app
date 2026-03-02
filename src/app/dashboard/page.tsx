import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Star, Shield, LayoutDashboard, Settings, Crown, MessageSquare, Clock } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Parent Dashboard — Lumi",
  description: "Manage your child's Lumi settings, view conversation history, and control topics.",
};

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ payment?: string }>;
}) {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const user = await currentUser();
  const plan = (user?.publicMetadata?.plan as string) || "free";
  const isFamilyPlan = plan === "family";

  const params = await searchParams;
  const paymentSuccess = params.payment === "success";

  return (
    <div className="min-h-screen py-10 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <LayoutDashboard className="w-7 h-7 text-indigo-400" />
          <div>
            <h1 className="text-2xl font-black text-white">Parent Dashboard</h1>
            <p className="text-indigo-400 text-sm">Welcome back, {user?.firstName || "Parent"}</p>
          </div>
        </div>

        {paymentSuccess && (
          <div className="mb-6 bg-green-900/30 border border-green-600/40 rounded-xl p-4 flex items-center gap-3">
            <Crown className="w-5 h-5 text-yellow-400 shrink-0" />
            <div>
              <p className="text-white font-bold text-sm">Welcome to the Family Plan!</p>
              <p className="text-green-300 text-sm">Your account has been upgraded. Enjoy unlimited voice conversations and all parent controls.</p>
            </div>
          </div>
        )}

        {/* Plan Status */}
        <div className={`rounded-2xl border p-6 mb-6 ${isFamilyPlan ? "bg-gradient-to-br from-indigo-900/40 to-violet-900/40 border-indigo-500/40" : "bg-white/5 border-white/10"}`}>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              {isFamilyPlan ? (
                <Crown className="w-8 h-8 text-yellow-400" />
              ) : (
                <Star className="w-8 h-8 text-indigo-400" />
              )}
              <div>
                <div className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-0.5">
                  {isFamilyPlan ? "Family Plan" : "Free Tier"}
                </div>
                <div className="text-white font-black text-lg">
                  {isFamilyPlan ? "Unlimited access" : "15 conversations/day"}
                </div>
              </div>
            </div>
            {!isFamilyPlan && (
              <UpgradeButton />
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <Link href="/app" className="bg-white/5 border border-white/10 hover:border-indigo-500/40 rounded-xl p-5 transition-all group">
            <MessageSquare className="w-6 h-6 text-indigo-400 mb-3 group-hover:text-indigo-300 transition-colors" />
            <div className="font-black text-white text-sm mb-1">Chat with Lumi</div>
            <div className="text-indigo-400 text-xs">Start or continue a conversation</div>
          </Link>
          <div className="bg-white/5 border border-white/10 rounded-xl p-5 opacity-60">
            <Clock className="w-6 h-6 text-indigo-400 mb-3" />
            <div className="font-black text-white text-sm mb-1">Conversation History</div>
            <div className="text-indigo-400 text-xs">Coming soon — full transcripts</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-5 opacity-60">
            <Settings className="w-6 h-6 text-indigo-400 mb-3" />
            <div className="font-black text-white text-sm mb-1">Topic Controls</div>
            <div className="text-indigo-400 text-xs">Coming soon — block any topic</div>
          </div>
        </div>

        {/* Plan details */}
        {isFamilyPlan ? (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h2 className="font-black text-white mb-4 flex items-center gap-2">
              <Crown className="w-5 h-5 text-yellow-400" /> Family Plan Features
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { icon: "✅", text: "Unlimited conversations" },
                { icon: "🎙️", text: "Real voice mode" },
                { icon: "📧", text: "Weekly digest emails" },
                { icon: "🚫", text: "Topic blocking (coming soon)" },
                { icon: "⏱️", text: "Daily limits (coming soon)" },
                { icon: "📖", text: "Full history (coming soon)" },
              ].map((f) => (
                <div key={f.text} className="flex items-center gap-2 text-sm text-indigo-200">
                  <span>{f.icon}</span> {f.text}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-gradient-to-br from-indigo-900/20 to-violet-900/20 border border-indigo-700/30 rounded-2xl p-6">
            <h2 className="font-black text-white mb-2">Upgrade to Family Plan</h2>
            <p className="text-indigo-300 text-sm mb-4">
              Get unlimited conversations, real voice mode, and full parent controls for $9.99/month.
            </p>
            <UpgradeButton large />
          </div>
        )}

        {/* Safety */}
        <div className="mt-6 flex items-center gap-2 text-xs text-indigo-500">
          <Shield className="w-3.5 h-3.5" />
          All conversations are monitored for safety · COPPA compliant · No ads
        </div>
      </div>
    </div>
  );
}

function UpgradeButton({ large = false }: { large?: boolean }) {
  return (
    <form action="/api/payments/create-subscription" method="POST">
      <button
        type="submit"
        className={`bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-xl transition-colors ${large ? "px-6 py-3 text-base" : "px-4 py-2 text-sm"}`}
      >
        {large ? "Start 30-Day Free Trial — $9.99/mo" : "Upgrade to Family Plan"}
      </button>
    </form>
  );
}

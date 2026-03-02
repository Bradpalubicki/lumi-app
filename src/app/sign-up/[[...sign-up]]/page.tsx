import { SignUp } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Star } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Create Account — Lumi",
  description: "Create your free Lumi parent account. Start exploring with your child today.",
};

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-16 px-4">
      <Link href="/" className="flex items-center gap-2 mb-8">
        <div className="w-9 h-9 rounded-xl bg-indigo-500 flex items-center justify-center">
          <Star className="w-5 h-5 text-white fill-white" />
        </div>
        <span className="text-2xl font-black text-white">Lumi</span>
      </Link>
      <SignUp
        appearance={{
          variables: {
            colorPrimary: "#6366f1",
            colorBackground: "#0f0a1e",
            colorText: "#e2e8f0",
            colorInputBackground: "#1a1030",
            colorInputText: "#e2e8f0",
            borderRadius: "0.75rem",
            fontFamily: "var(--font-nunito), sans-serif",
          },
          elements: {
            card: "bg-[#0f0a1e] border border-indigo-800/40 shadow-2xl shadow-indigo-900/30",
            headerTitle: "text-white font-black",
            headerSubtitle: "text-indigo-300",
            socialButtonsBlockButton: "bg-[#1a1030] border border-indigo-800/40 text-indigo-200 hover:bg-indigo-900/40",
            dividerLine: "bg-indigo-800/30",
            dividerText: "text-indigo-500",
            formFieldLabel: "text-indigo-300",
            formFieldInput: "bg-[#1a1030] border-indigo-700/40 text-white",
            formButtonPrimary: "bg-indigo-600 hover:bg-indigo-500 font-bold",
            footerActionLink: "text-indigo-400 hover:text-indigo-300",
          },
        }}
      />
    </div>
  );
}

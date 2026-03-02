import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog — Lumi AI Learning Companion for Kids",
  description: "Guides for parents navigating AI, screen time, and kids' learning. Expert tips on safe AI use for children ages 4–12.",
};

const posts = [
  { slug: "best-ai-apps-for-kids-2025", title: "Best AI Apps for Kids in 2025 — What Parents Actually Need to Know", date: "2025-01-15", readTime: "8 min", tag: "Reviews" },
  { slug: "is-chatgpt-safe-for-kids", title: "Is ChatGPT Safe for Kids? (And What to Use Instead)", date: "2025-01-20", readTime: "6 min", tag: "Safety" },
  { slug: "how-to-talk-to-kids-about-ai", title: "How to Talk to Your 5-Year-Old About AI", date: "2025-02-01", readTime: "5 min", tag: "Parenting" },
  { slug: "khanmigo-vs-lumi", title: "Khanmigo vs Lumi — Which AI Tutor Is Right for Your Child?", date: "2025-02-10", readTime: "7 min", tag: "Reviews" },
  { slug: "kids-critical-thinking-ai-age", title: "Teaching Kids Critical Thinking in the Age of AI", date: "2025-02-20", readTime: "9 min", tag: "Education" },
];

const tagColors: Record<string, string> = {
  Reviews: "bg-blue-900/50 text-blue-300",
  Safety: "bg-green-900/50 text-green-300",
  Parenting: "bg-pink-900/50 text-pink-300",
  Education: "bg-violet-900/50 text-violet-300",
};

export default function BlogPage() {
  return (
    <div className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-black text-white mb-4">Lumi Blog</h1>
          <p className="text-indigo-300 text-xl">Helping parents navigate AI, learning, and screen time for kids.</p>
        </div>

        <div className="space-y-4">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="block bg-white/5 border border-white/10 hover:border-indigo-500/40 rounded-2xl p-6 transition-all group">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${tagColors[post.tag] || "bg-indigo-900/50 text-indigo-300"}`}>{post.tag}</span>
                    <span className="text-indigo-500 text-xs">{post.date} · {post.readTime} read</span>
                  </div>
                  <h2 className="text-lg font-black text-white group-hover:text-indigo-300 transition-colors">{post.title}</h2>
                </div>
                <ChevronRight className="w-5 h-5 text-indigo-500 group-hover:text-indigo-300 transition-colors shrink-0 mt-1" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

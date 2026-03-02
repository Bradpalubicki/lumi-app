import type { Metadata, Viewport } from "next";
import { Nunito } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://lumi-app.vercel.app"),
  title: {
    default: "Lumi — AI Learning Companion for Kids | Safe, Age-Appropriate AI Chat",
    template: "%s | Lumi",
  },
  description:
    "Lumi is the AI companion that talks, teaches, and grows with your child. Safe AI conversations for ages 4–12, with real voice, 3 age modes, and parent controls. Try free today.",
  keywords: [
    "AI for kids",
    "kids learning app",
    "safe AI chatbot for children",
    "educational AI",
    "voice AI for kids",
    "children learning assistant",
    "Lumi AI",
  ],
  authors: [{ name: "Lumi" }],
  creator: "NuStack Digital Ventures",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://lumi-app.vercel.app",
    siteName: "Lumi",
    title: "Lumi — Safe AI Learning Companion for Kids Ages 4–12",
    description:
      "Real voice AI, age-adaptive conversations, and parent controls. Lumi makes learning magical and safe for every child.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Lumi AI Learning Companion" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lumi — Safe AI for Kids",
    description: "Real voice AI companion for ages 4–12. Parent controlled. Always age-appropriate.",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Lumi",
  },
};

export const viewport: Viewport = {
  themeColor: "#6366f1",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en" className={nunito.variable}>
        <head>
          <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
          <link rel="apple-touch-icon" href="/icons/icon-192.svg" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        </head>
        <body className="bg-[#0f0a1e] text-white antialiased" style={{ fontFamily: "var(--font-nunito), sans-serif" }}>
          <Header />
          <main>{children}</main>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}

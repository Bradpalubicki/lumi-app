import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — Lumi",
  description: "Lumi's privacy policy. COPPA compliant. We explain exactly what data we collect, how we use it, and your rights as a parent.",
};

export default function PrivacyPage() {
  return (
    <div className="py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-black text-white mb-2">Privacy Policy</h1>
        <p className="text-indigo-400 text-sm mb-10">Last updated: January 1, 2025</p>

        <div className="space-y-8 text-indigo-200 leading-relaxed">
          <section>
            <h2 className="text-xl font-black text-white mb-3">Overview</h2>
            <p>Lumi (&quot;we,&quot; &quot;our,&quot; &quot;us&quot;) is committed to protecting the privacy of children and their families. This Privacy Policy explains how we collect, use, and protect information when you use the Lumi service. We comply with the Children&apos;s Online Privacy Protection Act (COPPA) and other applicable privacy laws.</p>
          </section>

          <section>
            <h2 className="text-xl font-black text-white mb-3">Information We Collect</h2>
            <ul className="space-y-2">
              <li><strong className="text-white">Session data:</strong> Anonymous session identifiers to maintain conversation context.</li>
              <li><strong className="text-white">Conversation content:</strong> Messages exchanged with Lumi, stored for parent review and digest features (Family Plan).</li>
              <li><strong className="text-white">Parent account data:</strong> Email address, age band settings, topic blocks, and time limits set by parents.</li>
              <li><strong className="text-white">Usage data:</strong> Aggregate, non-identifiable usage statistics (conversation count, session length).</li>
            </ul>
            <p className="mt-3">We do NOT collect: real names, photos, location data, or any other personally identifiable information from children.</p>
          </section>

          <section>
            <h2 className="text-xl font-black text-white mb-3">COPPA Compliance</h2>
            <p>Lumi is designed for use by children under 13 under parental supervision. We comply with COPPA by:</p>
            <ul className="space-y-1 mt-2">
              {["Requiring parental consent before collecting any data linked to a child", "Providing parents with access to review and delete their child's data", "Not collecting unnecessary personal information from children", "Not using children's data for behavioral advertising", "Not disclosing children's data to third parties except as required for service operation"].map(item => <li key={item} className="text-sm">• {item}</li>)}
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-black text-white mb-3">How We Use Data</h2>
            <ul className="space-y-1">
              {["Providing the Lumi conversation service", "Generating weekly digest emails for parents (Family Plan)", "Enforcing parent-set topic blocks and time limits", "Improving service safety and quality (aggregate, anonymized data only)", "Customer support"].map(item => <li key={item} className="text-sm">• {item}</li>)}
            </ul>
            <p className="mt-3">We do NOT use conversation data to train AI models. We do NOT sell your data.</p>
          </section>

          <section>
            <h2 className="text-xl font-black text-white mb-3">Data Retention & Deletion</h2>
            <p>Conversation history is retained while your account is active. Parents can request deletion of all conversation data at any time. Account deletion results in permanent removal of all associated data within 30 days.</p>
          </section>

          <section>
            <h2 className="text-xl font-black text-white mb-3">Third-Party Services</h2>
            <p>Lumi uses the following services to operate:</p>
            <ul className="space-y-1 mt-2">
              <li className="text-sm">• Anthropic Claude API — AI conversation generation (no data retained by Anthropic for training)</li>
              <li className="text-sm">• OpenAI Whisper — voice transcription (audio processed and not stored)</li>
              <li className="text-sm">• Supabase — secure data storage</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-black text-white mb-3">Contact Us</h2>
            <p>For privacy questions, data requests, or COPPA-related inquiries, contact us at: <strong className="text-white">privacy@heylumi.com</strong></p>
          </section>
        </div>
      </div>
    </div>
  );
}

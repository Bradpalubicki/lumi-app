import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service — Lumi",
  description: "Lumi's terms of service. Clear, plain-language terms for families using the Lumi AI learning companion.",
};

export default function TermsPage() {
  return (
    <div className="py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-black text-white mb-2">Terms of Service</h1>
        <p className="text-indigo-400 text-sm mb-10">Last updated: January 1, 2025</p>

        <div className="space-y-8 text-indigo-200 leading-relaxed">
          <section>
            <h2 className="text-xl font-black text-white mb-3">1. Acceptance of Terms</h2>
            <p>By using Lumi, you agree to these Terms of Service. If you are a parent or guardian allowing your child to use Lumi, you accept these terms on their behalf.</p>
          </section>

          <section>
            <h2 className="text-xl font-black text-white mb-3">2. Age Requirements</h2>
            <p>Lumi is designed for children ages 4–12. A parent or guardian must create any account and is responsible for appropriate use. Children under 13 may not create their own accounts.</p>
          </section>

          <section>
            <h2 className="text-xl font-black text-white mb-3">3. Acceptable Use</h2>
            <p>You agree to use Lumi only for lawful, educational, and personal purposes. You may not attempt to circumvent safety filters, extract inappropriate content, or use Lumi in ways that could harm children.</p>
          </section>

          <section>
            <h2 className="text-xl font-black text-white mb-3">4. Free Tier & Paid Plans</h2>
            <p>The free tier provides 15 conversations per day at no charge. The Family Plan is billed monthly or annually. You may cancel at any time; access continues through the end of your paid period. No refunds for partial periods.</p>
          </section>

          <section>
            <h2 className="text-xl font-black text-white mb-3">5. AI Accuracy Disclaimer</h2>
            <p>Lumi provides AI-generated responses for educational and entertainment purposes. We do not guarantee accuracy. Lumi responses should not be relied upon for medical, legal, financial, or other professional advice. Always verify important information with qualified sources.</p>
          </section>

          <section>
            <h2 className="text-xl font-black text-white mb-3">6. Intellectual Property</h2>
            <p>Lumi and all associated content are the property of NuStack Digital Ventures. You retain rights to conversation content you generate. You grant us a limited license to store and display that content to provide the service.</p>
          </section>

          <section>
            <h2 className="text-xl font-black text-white mb-3">7. Limitation of Liability</h2>
            <p>To the maximum extent permitted by law, Lumi&apos;s liability is limited to the amount you paid in the 12 months preceding any claim. We are not liable for indirect, incidental, or consequential damages.</p>
          </section>

          <section>
            <h2 className="text-xl font-black text-white mb-3">8. Changes to Terms</h2>
            <p>We may update these terms with notice. Continued use after changes constitutes acceptance.</p>
          </section>

          <section>
            <h2 className="text-xl font-black text-white mb-3">9. Contact</h2>
            <p>Questions about these terms: <strong className="text-white">legal@heylumi.com</strong></p>
          </section>
        </div>
      </div>
    </div>
  );
}

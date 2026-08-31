import type { Metadata } from "next";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 pt-40 pb-24 lg:px-12 lg:pt-48">
      <h1 className="font-display text-4xl text-charcoal">Privacy Policy</h1>
      <div className="mt-8 flex flex-col gap-5 text-sm leading-relaxed text-taupe">
        <p>
          A&amp;H Interiors (&quot;we&quot;, &quot;us&quot;) respects your privacy. This policy
          explains what information we collect through this website and how we use it.
        </p>
        <h2 className="mt-4 font-display text-xl text-charcoal">Information We Collect</h2>
        <p>
          When you submit a contact or consultation request, we collect your name, email
          address, phone number and any project details you share with us. We use this
          information solely to respond to your inquiry.
        </p>
        <h2 className="mt-4 font-display text-xl text-charcoal">How We Use Your Information</h2>
        <p>
          We use the information you provide to communicate with you about your project
          and, where relevant, to deliver our services. We do not sell your personal
          information to third parties.
        </p>
        <h2 className="mt-4 font-display text-xl text-charcoal">Contact</h2>
        <p>
          If you have any questions about this policy, please reach out via our{" "}
          contact page.
        </p>
      </div>
    </section>
  );
}

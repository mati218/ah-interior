import type { Metadata } from "next";

export const metadata: Metadata = { title: "Terms of Service" };

export default function TermsPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 pt-40 pb-24 lg:px-12 lg:pt-48">
      <h1 className="font-display text-4xl text-charcoal">Terms of Service</h1>
      <div className="mt-8 flex flex-col gap-5 text-sm leading-relaxed text-taupe">
        <p>
          These terms govern your use of the A&amp;H Interiors website. By using this
          site, you agree to the terms outlined below.
        </p>
        <h2 className="mt-4 font-display text-xl text-charcoal">Use of Content</h2>
        <p>
          All project photography, text and branding on this site are the property of
          A&amp;H Interiors and may not be reproduced without written permission.
        </p>
        <h2 className="mt-4 font-display text-xl text-charcoal">Inquiries</h2>
        <p>
          Submitting a contact form does not constitute a signed agreement for services.
          A formal proposal and contract will follow any consultation.
        </p>
        <h2 className="mt-4 font-display text-xl text-charcoal">Contact</h2>
        <p>Questions about these terms can be sent through our contact page.</p>
      </div>
    </section>
  );
}

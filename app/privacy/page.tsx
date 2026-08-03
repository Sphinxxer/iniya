import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, SectionHeading } from "@/src/components/ui";
import { siteConfig } from "@/src/config/site";
import { createPageMetadata } from "@/src/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Privacy",
  description:
    "How Iniya Fiber uses the details submitted through its textile supply enquiry form.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        title="Privacy for supply enquiries."
        copy="This notice explains how Iniya Fiber handles the details you submit through this website's enquiry form."
      />

      <section className="section">
        <div className="shell">
          <SectionHeading
            title="What we collect."
            copy="When you send an enquiry, we collect the business contact and requirement details you provide, such as your name, company, email address, phone number, country, product, quantity, and specification notes."
          />
        </div>
      </section>

      <section className="section section--line section--paper-deep">
        <div className="shell">
          <div className="policy-grid">
            <article>
              <h2>How the details are used</h2>
              <p>
                We use submitted details to review the requirement, respond to
                the enquiry, and keep an appropriate business record of the
                discussion. We do not sell enquiry details.
              </p>
            </article>
            <article>
              <h2>How long they are kept</h2>
              <p>
                Details are kept only for as long as reasonably necessary to
                respond, follow up on the enquiry, and maintain relevant
                business records.
              </p>
            </article>
            <article>
              <h2>Service providers</h2>
              <p>
                The website uses technical service providers to operate the
                enquiry form and deliver submitted enquiries to Iniya Fiber.
              </p>
            </article>
            <article>
              <h2>Your choices</h2>
              <p>
                You can ask about, correct, or request deletion of the details
                you submitted by contacting Iniya Fiber through the route below.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="section section--line">
        <div className="shell">
          <SectionHeading
            title="Privacy contact."
            copy={
              siteConfig.email
                ? `For privacy questions, contact Iniya Fiber at ${siteConfig.email}.`
                : "For privacy questions or requests about an enquiry, use the contact form and include the email address used in the original submission."
            }
            action={{ href: "/contact", label: "Contact Iniya Fiber" }}
          />
          {siteConfig.email ? (
            <p className="privacy-contact-link">
              <Link href={`mailto:${siteConfig.email}`}>{siteConfig.email}</Link>
            </p>
          ) : null}
        </div>
      </section>
    </>
  );
}

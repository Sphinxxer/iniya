import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/src/config/site";
import { createPageMetadata } from "@/src/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return createPageMetadata({
  title: "Privacy",
  description:
    "How Iniya Fiber uses the details submitted through its textile supply enquiry form.",
  path: "/privacy",
  });
}

const readingColumn: CSSProperties = {
  maxWidth: "48rem",
};

const pageTitle: CSSProperties = {
  maxWidth: "11ch",
  marginBottom: "1.5rem",
  fontSize: "clamp(3rem, 6vw, 6.5rem)",
};

const introduction: CSSProperties = {
  maxWidth: "42rem",
  marginBottom: 0,
  color: "var(--ink-soft)",
  fontSize: "clamp(1.05rem, 1.4vw, 1.3rem)",
};

const policySection: CSSProperties = {
  padding: "clamp(2rem, 4vw, 3.5rem) 0",
  borderBottom: "1px solid var(--line)",
};

const policyHeading: CSSProperties = {
  marginBottom: "1rem",
  fontSize: "clamp(1.6rem, 3vw, 2.6rem)",
};

const policyCopy: CSSProperties = {
  maxWidth: "42rem",
  marginBottom: 0,
  color: "var(--ink-soft)",
};

export default function PrivacyPage() {
  const privacyContactEmail = siteConfig.privacyEmail || siteConfig.email;

  return (
    <>
      <section
        className="section section--line"
        style={{ padding: "clamp(3.75rem, 6vw, 6rem) 0" }}
      >
        <div className="shell">
          <header style={readingColumn}>
            <p className="eyebrow">Privacy</p>
            <h1 style={pageTitle}>Privacy for supply enquiries.</h1>
            <p style={introduction}>
              This notice explains how Iniya Fiber handles details submitted
              through the website enquiry form.
            </p>
            {siteConfig.privacyEffectiveDate ? (
              <p style={{ ...policyCopy, marginTop: "1.5rem" }}>
                Effective date: <strong>{siteConfig.privacyEffectiveDate}</strong>
              </p>
            ) : null}
            {siteConfig.registeredBusinessName ? (
              <p style={{ ...policyCopy, marginTop: "1.5rem" }}>
                Business responsible for the enquiry: {" "}
                <strong>{siteConfig.registeredBusinessName}</strong>.
              </p>
            ) : null}
          </header>
        </div>
      </section>

      <section
        className="section section--line section--paper-deep"
        style={{ padding: "clamp(3.75rem, 6vw, 6rem) 0" }}
      >
        <div className="shell">
          <article style={readingColumn}>
            <section style={{ ...policySection, paddingTop: 0 }}>
              <h2 style={policyHeading}>What we collect</h2>
              <p style={policyCopy}>
                An enquiry includes the name, company, business email, product,
                quantity, requirement notes, and consent you provide. It may
                also include a phone number, country, customer type, and
                product-specific details when you choose to add them.
              </p>
            </section>

            <section style={policySection}>
              <h2 style={policyHeading}>How the details are used</h2>
              <p style={policyCopy}>
                Submitted details are used to review the requirement, respond
                to the enquiry, and maintain an appropriate business record of
                the discussion. Iniya Fiber does not sell enquiry details.
              </p>
            </section>

            {siteConfig.privacyRetentionPeriod ? (
              <section style={policySection}>
                <h2 style={policyHeading}>Retention</h2>
                <p style={policyCopy}>{siteConfig.privacyRetentionPeriod}</p>
              </section>
            ) : null}

            {siteConfig.privacyServiceProviders.length > 0 ? (
              <section style={policySection}>
                <h2 style={policyHeading}>Service providers</h2>
                <p style={policyCopy}>
                  Submitted information may be processed by {" "}
                  {siteConfig.privacyServiceProviders.join(", ")} to operate the
                  enquiry service.
                </p>
              </section>
            ) : null}

            {siteConfig.cookieAnalyticsStatement ? (
              <section style={policySection}>
                <h2 style={policyHeading}>Cookies and analytics</h2>
                <p style={policyCopy}>{siteConfig.cookieAnalyticsStatement}</p>
              </section>
            ) : null}

            <section style={policySection}>
              <h2 style={policyHeading}>Your choices</h2>
              <p style={policyCopy}>
                You can ask about, correct, or request deletion of details you
                submitted. Include the business email used in the original
                enquiry so the request can be identified.
              </p>
            </section>

            <section style={{ ...policySection, borderBottom: 0 }}>
              <h2 style={policyHeading}>Privacy contact</h2>
              {privacyContactEmail ? (
                <p style={policyCopy}>
                  Email {" "}
                  <Link
                    className="text-link"
                    href={`mailto:${privacyContactEmail}`}
                  >
                    {privacyContactEmail}
                  </Link>{" "}
                  for questions or requests about an enquiry.
                </p>
              ) : (
                <p style={policyCopy}>
                  Until a direct business email is configured, use the {" "}
                  <Link className="text-link" href="/contact">
                    enquiry form
                  </Link>{" "}
                  and state that your message is a privacy request.
                </p>
              )}
            </section>
          </article>
        </div>
      </section>
    </>
  );
}

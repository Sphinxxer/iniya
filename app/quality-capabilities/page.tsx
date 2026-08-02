import type { Metadata } from "next";
import {
  CtaSection,
  PageHero,
  ProcessFlow,
  SectionHeading,
} from "@/src/components/ui";
import { createPageMetadata } from "@/src/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Quality control & textile capabilities",
  description:
    "Explore Iniya Fiber's in-house processing, product customisation, and testing laboratory checks for yarn count, hank, and CSP in Tirupur.",
  path: "/quality-capabilities",
});

const inHouseCapabilities = [
  {
    title: "In-house processing",
    copy: "All listed fibre and yarn processes are handled in-house.",
  },
  {
    title: "Specification management",
    copy: "Requirements can be defined by fibre type, blend, colour, yarn count, grade, and quantity.",
  },
  {
    title: "Quality oversight",
    copy: "Laboratory checks and an internal quality-control process support consistent quality.",
  },
  {
    title: "Supply focus",
    copy: "The coordinated process supports Iniya Fiber's focus on competitive pricing and on-time delivery.",
  },
] as const;

const customisationRows = [
  [
    "Fibre type",
    "Define the fibre type required for the selected material.",
  ],
  [
    "Blend",
    "Share the required blend for applicable fibre and yarn products.",
  ],
  [
    "Colour",
    "Specify the required colour for applicable material or yarn products.",
  ],
  [
    "Yarn count",
    "Confirm the required count for applicable yarn products; recycled yarn is available from 6s to 40s count.",
  ],
  ["Grade", "State the grade required for the selected product."],
  [
    "Quantity",
    "Share the required quantity as part of the supply discussion.",
  ],
] as const;

const laboratoryChecks = [
  {
    title: "Own laboratory",
    copy: "Iniya Fiber operates its own testing laboratory as part of the internal quality-control process.",
  },
  {
    title: "Yarn count",
    copy: "Checked as part of the internal yarn quality process.",
  },
  {
    title: "Hank",
    copy: "Measured as part of the company's quality-control process.",
  },
  {
    title: "CSP",
    copy: "Checked to support yarn strength and performance assessment.",
  },
] as const;

const qualityControls = [
  {
    title: "Specification alignment",
    copy: "Applicable fibre type, blend, colour, yarn count, grade, and quantity requirements guide the in-house process.",
  },
  {
    title: "Laboratory checks",
    copy: "Yarn count, hank, and CSP checks form part of the internal yarn quality process.",
  },
  {
    title: "Quality review",
    copy: "An internal quality review supports consistency before supply and dispatch.",
  },
  {
    title: "Supply and dispatch",
    copy: "Following quality review, the requirement moves forward to supply and dispatch.",
  },
] as const;

export default function QualityCapabilitiesPage() {
  return (
    <>
      <PageHero
        title="Controlled processes. Clear specifications. Consistent supply."
        copy="Iniya Fiber combines in-house operations, product customisation, and laboratory checks to support customer-specific textile requirements."
        aside={
          <p className="home-hero__trust">
            Own testing laboratory · Yarn count · Hank · CSP
          </p>
        }
      />

      <section className="section">
        <div className="shell">
          <SectionHeading
            title="Operational control, kept close."
            copy="With all listed processes handled in-house, product requirements, quality checks, and supply planning can be managed within one coordinated operation."
          />
          <div className="capability-grid reveal">
            {inHouseCapabilities.map((capability) => (
              <article className="capability-item" key={capability.title}>
                <h3>{capability.title}</h3>
                <p>{capability.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--line section--paper-deep">
        <div className="shell">
          <SectionHeading
            title="Specifications shaped around the requirement."
            copy="Iniya Fiber supports customer-specific supply across fibre type, blend, colour, yarn count, grade, and quantity. The applicable options depend on the selected fibre or yarn product."
            action={{ href: "/contact", label: "Discuss your specification" }}
          />
          <div className="specification-list reveal">
            {customisationRows.map(([title, copy]) => (
              <div className="specification-row" key={title} tabIndex={0}>
                <strong>{title}</strong>
                <p>{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--line">
        <div className="shell">
          <SectionHeading
            title="Quality checks, carried out in-house."
            copy="Iniya Fiber operates its own testing laboratory to support quality consistency across fibre and yarn requirements."
          />
          <div className="metric-grid reveal">
            {laboratoryChecks.map((check) => (
              <article className="metric" key={check.title}>
                <h3>{check.title}</h3>
                <p>{check.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--line section--paper-deep">
        <div className="shell">
          <SectionHeading
            title="A clear internal path for quality review."
            copy="The internal quality-control process connects customer specifications, in-house operations, laboratory checks, and quality review to support consistent quality."
          />
          <div className="capability-grid reveal">
            {qualityControls.map((control) => (
              <article className="capability-item" key={control.title}>
                <h3>{control.title}</h3>
                <p>{control.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--line">
        <div className="shell">
          <SectionHeading
            title="One coordinated workflow."
            copy="A customer requirement moves through in-house processing, laboratory testing, quality review, and then supply and dispatch."
          />
          <ProcessFlow />
        </div>
      </section>

      <CtaSection
        title="Have a fibre or yarn specification to discuss?"
        copy="Share the product, fibre type, blend, colour, yarn count, grade, and quantity that apply to your requirement."
        primary={{ href: "/contact", label: "Request a quote" }}
        secondary={{ href: "/products", label: "Explore products" }}
      />
    </>
  );
}

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
    "Explore Iniya Fiber's in-house processing, product customisation, and laboratory checks for yarn count, hank, and CSP in Tirupur.",
  path: "/quality-capabilities",
});

const inHouseCapabilities = [
  {
    title: "In-house processing",
    copy: "The listed fibre and yarn processes are managed within one coordinated operation.",
  },
  {
    title: "Requirement review",
    copy: "Product, specification, and quantity details are considered together before the process is planned.",
  },
  {
    title: "Internal quality control",
    copy: "Laboratory checks and an internal review support consistency for the agreed requirement.",
  },
] as const;

const customisationRows = [
  ["Fibre type", "Define the fibre type required for the selected material."],
  ["Blend", "Share the required blend for applicable fibre and yarn products."],
  ["Colour", "Specify the required colour for applicable material or yarn products."],
  [
    "Yarn count",
    "Confirm the required count for applicable yarn products; recycled yarn is available from 6s–40s.",
  ],
  ["Grade", "State the grade required for the selected product."],
  ["Quantity", "Share the required quantity as part of the supply discussion."],
] as const;

const laboratoryChecks = [
  {
    title: "Yarn count",
    copy: "Checked to support alignment with the agreed yarn count specification.",
  },
  {
    title: "Hank",
    copy: "Measured as part of the internal yarn quality-control process.",
  },
  {
    title: "CSP",
    copy: "Checked to support yarn strength and performance assessment.",
  },
] as const;

export default function QualityCapabilitiesPage() {
  return (
    <>
      <PageHero
        title="Quality control that stays close to the material."
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
            title="In-house operational control."
            copy="Keeping the process close allows product requirements, quality checks, and supply planning to be managed as one coordinated operation."
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
            title="Customisation around the requirement."
            copy="Applicable options depend on the selected fibre or yarn product. Share the details that matter to your material and supply requirement."
            action={{ href: "/contact", label: "Discuss your specification" }}
          />
          <div className="specification-list reveal">
            {customisationRows.map(([title, copy]) => (
              <div className="specification-row" key={title}>
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
            title="Laboratory checks."
            copy="Iniya Fiber operates its own testing laboratory as part of the internal quality-control process for applicable yarn requirements."
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
            title="From requirement to supply."
            copy="One clear workflow carries the agreed requirement through processing, testing, review, and dispatch."
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

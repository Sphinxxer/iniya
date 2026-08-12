import type { Metadata } from "next";
import {
  CtaSection,
  IconFeatureGrid,
  PageHero,
  ProcessFlow,
  SectionHeading,
} from "@/src/components/ui";
import { createPageMetadata } from "@/src/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return createPageMetadata({
  title: "Quality control & textile capabilities",
  description:
    "Explore Iniya Fiber's in-house processing, product customisation, and laboratory checks for yarn count, hank, and CSP in Tirupur.",
  path: "/quality-capabilities",
  });
}

const inHouseCapabilities = [
  {
    icon: "processing",
    title: "In-house processing",
    copy: "Applicable fibre and yarn operations stay within one coordinated process.",
  },
  {
    icon: "specification",
    title: "Requirement review",
    copy: "Product, specification, and quantity guide the process plan.",
  },
  {
    icon: "quality",
    title: "Internal quality control",
    copy: "Laboratory checks support the agreed requirement where they apply.",
  },
] as const;

const customisationRows = [
  { icon: "fibreType", title: "Fibre type", copy: "Selected for the required material." },
  { icon: "blend", title: "Blend", copy: "Specified where the product requires it." },
  { icon: "colour", title: "Colour", copy: "Matched to the agreed requirement." },
  { icon: "yarnCount", title: "Yarn count", copy: "Confirmed for applicable yarns, including 6s–40s recycled yarn." },
  { icon: "grade", title: "Grade", copy: "Reviewed against the selected product." },
  { icon: "quantity", title: "Quantity", copy: "Planned with the required unit." },
] as const;

const laboratoryChecks = [
  {
    icon: "yarnCount",
    title: "Yarn count",
    copy: "Checked against the agreed yarn-count specification.",
  },
  {
    icon: "hank",
    title: "Hank",
    copy: "Measured within the internal yarn-control process.",
  },
  {
    icon: "csp",
    title: "CSP",
    copy: "Checked for yarn strength and performance assessment.",
  },
] as const;

export default function QualityCapabilitiesPage() {
  return (
    <>
      <PageHero
        title="In-house quality control for applicable requirements."
        copy="Iniya Fiber combines its own testing laboratory with coordinated processing and specification review."
        aside={
          <p className="home-hero__trust">
            Own testing laboratory · Yarn count · Hank · CSP
          </p>
        }
      />

      <section className="section">
        <div className="shell">
          <SectionHeading
            title="Yarn-specific laboratory checks."
            copy="Yarn count, hank, and CSP are checked in Iniya Fiber’s own laboratory where they apply to the selected yarn requirement."
          />
          <IconFeatureGrid
            items={laboratoryChecks}
            className="metric-grid metric-grid--three"
            iconSize="workflow"
            numbered
          />
        </div>
      </section>

      <section className="section section--line section--paper-deep">
        <div className="shell">
          <SectionHeading
            title="In-house operational control."
            copy="The product requirement, applicable processing, internal review, and supply planning stay within one coordinated operation."
          />
          <IconFeatureGrid
            items={inHouseCapabilities}
            className="capability-grid capability-grid--three"
          />
        </div>
      </section>

      <section className="section section--line">
        <div className="shell">
          <SectionHeading
            title="Customisation around the requirement."
            copy="Available options depend on the selected fibre or yarn product and the material parameters that apply."
            action={{ href: "/contact", label: "Discuss your specification" }}
          />
          <IconFeatureGrid
            items={customisationRows}
            className="customisation-grid"
          />
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

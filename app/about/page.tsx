import type { Metadata } from "next";
import {
  CtaSection,
  IconFeatureGrid,
  PageHero,
  SectionHeading,
} from "@/src/components/ui";
import { createPageMetadata } from "@/src/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return createPageMetadata({
  title: "About Iniya Fiber",
  description:
    "Iniya Fiber is a Tirupur-based manufacturer, supplier, trader, and exporter of recycled textile materials, processed fibres, and yarn solutions.",
  path: "/about",
  });
}

const businessRoles = [
  { icon: "manufacturer", title: "Manufacturer", copy: "Core processing handled in-house." },
  { icon: "supplier", title: "Supplier", copy: "Materials discussed against the brief." },
  { icon: "trader", title: "Trader", copy: "Focused material-sourcing conversations." },
  { icon: "exporter", title: "Exporter", copy: "Clear export-focused supply communication." },
] as const;

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="Textile material supply from Tirupur."
        copy="Iniya Fiber is a manufacturer, supplier, trader, and exporter of recycled textile materials, processed fibres, and yarn solutions."
      />

      <section className="section">
        <div className="shell">
          <SectionHeading
            title="Four business roles, one clear supply conversation."
            copy="The product, applicable material details, quantity, and business requirement guide each discussion."
          />
          <IconFeatureGrid items={businessRoles} className="value-grid" />
        </div>
      </section>

      <section className="section section--paper-deep">
        <div className="shell company-intro__grid reveal">
          <div>
            <h2>Close to textile production in Tirupur.</h2>
          </div>
          <div className="company-intro__copy">
            <p>
              From Tirupur, India, Iniya Fiber coordinates applicable in-house
              processing, product customisation, laboratory checks, and supply
              planning around the buyer’s brief.
            </p>
          </div>
        </div>
      </section>

      <CtaSection
        title="Discuss a fibre or yarn brief."
        copy="Start with the product, applicable material details, quantity, and business information needed for a clear response."
        secondary={{ href: "/industries", label: "Buyers we support" }}
      />
    </>
  );
}

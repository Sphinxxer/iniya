import type { Metadata } from "next";
import { CtaSection, PageHero, SectionHeading } from "@/src/components/ui";
import { createPageMetadata } from "@/src/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Industries Served",
  description:
    "From recycled raw materials to customised yarn supply, Iniya Fiber supports businesses across different stages of textile production.",
  path: "/industries",
});

const industries = [
  [
    "Open-end spinning units",
    "Material and yarn supply developed around spinning requirements.",
  ],
  [
    "Textile manufacturers",
    "Processed fibres and yarn options customised according to production needs.",
  ],
  [
    "Exporters",
    "Clear product communication, custom specifications, and dependable supply for export-focused requirements.",
  ],
] as const;

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        title="Built to support textile businesses."
        copy="From recycled raw materials to customised yarn supply, Iniya Fiber supports businesses across different stages of textile production."
      />

      <section className="section">
        <div className="shell">
          <SectionHeading
            title="Supporting the textile supply chain."
          />
          <div className="industry-grid industry-grid--three reveal">
            {industries.map(([title, copy]) => (
              <article className="industry-item" key={title}>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CtaSection
        title="Tell us what your production requires."
        copy="Share your product, specification, and quantity requirements with the Iniya Fiber team."
        primary={{ href: "/contact", label: "Tell Us What You Need" }}
      />
    </>
  );
}

import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";

export function SectionHeading({
  title,
  copy,
  action,
}: {
  title: string;
  copy?: string;
  action?: { href: string; label: string };
}) {
  return (
    <div className="section-heading reveal">
      <div>
        <h2>{title}</h2>
      </div>
      <div className="section-heading__support">
        {copy ? <p>{copy}</p> : null}
        {action ? (
          <Link className="text-link" href={action.href}>
            {action.label} <span aria-hidden="true">→</span>
          </Link>
        ) : null}
      </div>
    </div>
  );
}

export function PageHero({
  title,
  copy,
  aside,
}: {
  title: string;
  copy: string;
  aside?: ReactNode;
}) {
  return (
    <section className="page-hero">
      <div className="shell page-hero__grid">
        <div>
          <h1>{title}</h1>
        </div>
        <div className="page-hero__support">
          <p>{copy}</p>
          {aside}
        </div>
      </div>
    </section>
  );
}

export function CtaSection({
  title,
  copy,
  primary = { href: "/contact", label: "Request a quote" },
  secondary,
}: {
  title: string;
  copy: string;
  primary?: { href: string; label: string };
  secondary?: { href: string; label: string };
}) {
  return (
    <section className="cta-section">
      <div className="shell cta-section__grid">
        <div>
          <h2>{title}</h2>
          <p>{copy}</p>
          <div className="button-row">
            <Link className="button" href={primary.href}>
              {primary.label} <span aria-hidden="true">→</span>
            </Link>
            {secondary ? (
              <Link className="button button--ghost-dark" href={secondary.href}>
                {secondary.label} <span aria-hidden="true">→</span>
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

export function CapabilityStrip() {
  const text =
    "IN-HOUSE PROCESSING · CUSTOM SPECIFICATIONS · QUALITY TESTING · RECYCLED MATERIALS · SPECIALITY FIBRES";
  return (
    <section className="capability-strip" aria-label="Core capabilities">
      <p className="visually-hidden">
        In-house processing, custom specifications, quality testing, recycled
        materials, and speciality fibres.
      </p>
      <div className="capability-strip__track" aria-hidden="true">
        <span>{text}</span>
        <span>{text}</span>
        <span>{text}</span>
        <span>{text}</span>
      </div>
    </section>
  );
}

export function ProcessFlow({ compact = false }: { compact?: boolean }) {
  const steps = [
    {
      title: "Customer specification",
      copy: "Product, material parameters, and quantity are discussed.",
    },
    {
      title: "In-house processing",
      copy: "Applicable operations are planned and managed internally.",
    },
    {
      title: "Laboratory testing",
      copy: "Yarn checks are completed where they apply to the product.",
    },
    {
      title: "Quality review",
      copy: "The agreed specification is reviewed before release.",
    },
    {
      title: "Supply and dispatch",
      copy: "The order moves forward against the agreed supply details.",
    },
  ];
  return (
    <ol className={`process-flow reveal${compact ? " process-flow--compact" : ""}`}>
      {steps.map((step) => (
        <li key={step.title}>
          <div className="process-flow__content">
            <strong>{step.title}</strong>
            <p>{step.copy}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

export function Breadcrumbs({
  items,
}: {
  items: { label: string; href?: string }[];
}) {
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <ol>
        {items.map((item, index) => (
          <li key={`${item.label}-${index}`}>
            {item.href ? <Link href={item.href}>{item.label}</Link> : item.label}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function ProductVisual({
  alt,
  image,
  large = false,
}: {
  alt: string;
  image: string;
  large?: boolean;
}) {
  return (
    <div className={`product-visual${large ? " product-visual--large" : ""}`}>
      <Image
        className="product-visual__image"
        src={image}
        alt={alt}
        fill
        sizes={
          large
            ? "(max-width: 800px) 100vw, 50vw"
            : "(max-width: 1100px) 100vw, 34vw"
        }
        priority={large}
        unoptimized
      />
    </div>
  );
}

export function ProductCard({
  product,
  featured = false,
}: {
  product: {
    name: string;
    slug: string;
    shortDescription: string;
    image: string;
    imageAlt: string;
    countRange?: string;
  };
  featured?: boolean;
}) {
  return (
    <article className={`product-card reveal${featured ? " is-featured" : ""}`}>
      <Link href={`/products/${product.slug}`} aria-label={`View ${product.name}`}>
        <ProductVisual
          image={product.image}
          alt={product.imageAlt}
        />
      </Link>
      <div className="product-card__body">
        <h3>
          <Link href={`/products/${product.slug}`}>{product.name}</Link>
        </h3>
        <p>{product.shortDescription}</p>
        <div className="product-card__meta">
          <Link href={`/products/${product.slug}`}>
            View <span aria-hidden="true">→</span>
          </Link>
          {product.countRange ? (
            <span className="product-card__badge">{product.countRange}</span>
          ) : null}
        </div>
      </div>
    </article>
  );
}

import Link from "next/link";
import type { ReactNode } from "react";
import {
  FeatureIcon,
  type FeatureIconName,
  type FeatureIconSize,
} from "./feature-icon";

export type IconFeature = {
  icon: FeatureIconName;
  title: string;
  copy: string;
};

export function IconFeatureGrid({
  items,
  className,
  iconSize = "feature",
  numbered = false,
}: {
  items: readonly IconFeature[];
  className: string;
  iconSize?: FeatureIconSize;
  numbered?: boolean;
}) {
  return (
    <div className={`${className} icon-feature-grid reveal`}>
      {items.map((item, index) => (
        <article className="icon-feature-item" key={item.title}>
          {numbered ? (
            <span className="icon-feature-item__number">
              {String(index + 1).padStart(2, "0")}
            </span>
          ) : null}
          <FeatureIcon name={item.icon} size={iconSize} />
          <h3>{item.title}</h3>
          <p>{item.copy}</p>
        </article>
      ))}
    </div>
  );
}

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
  compact = false,
}: {
  title: string;
  copy: string;
  aside?: ReactNode;
  compact?: boolean;
}) {
  return (
    <section className={`page-hero${compact ? " page-hero--compact" : ""}`}>
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
      icon: "specification",
      title: "Customer specification",
      copy: "Discuss the product, applicable parameters, and quantity.",
    },
    {
      icon: "processing",
      title: "In-house processing",
      copy: "Plan and manage the applicable operations internally.",
    },
    {
      icon: "laboratory",
      title: "Laboratory testing",
      copy: "Check relevant yarn parameters where they apply.",
    },
    {
      icon: "review",
      title: "Quality review",
      copy: "Review the agreed specification before release.",
    },
    {
      icon: "dispatch",
      title: "Supply and dispatch",
      copy: "Move the order against the agreed supply details.",
    },
  ] satisfies IconFeature[];
  return (
    <ol className={`process-flow reveal${compact ? " process-flow--compact" : ""}`}>
      {steps.map((step, index) => (
        <li key={step.title}>
          <span className="process-flow__number">
            {String(index + 1).padStart(2, "0")}
          </span>
          <FeatureIcon name={step.icon} size="workflow" />
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
  const responsiveSizes = large
    ? "(max-width: 800px) 100vw, 50vw"
    : "(max-width: 1100px) 100vw, 34vw";
  const imageBase = image.endsWith(".webp") ? image.slice(0, -5) : image;

  return (
    <div className={`product-visual${large ? " product-visual--large" : ""}`}>
      <picture>
        <source
          type="image/webp"
          srcSet={`${imageBase}-640.webp 640w, ${imageBase}-960.webp 960w, ${imageBase}-1440.webp 1440w`}
          sizes={responsiveSizes}
        />
        {/* These product assets are already resized and compressed at build time. */}
        <img
          className="product-visual__image"
          src={image}
          alt={alt}
          width="1600"
          height="1200"
          sizes={responsiveSizes}
          loading={large ? "eager" : "lazy"}
          fetchPriority={large ? "high" : "auto"}
          decoding="async"
        />
      </picture>
    </div>
  );
}

export function ProductCard({
  product,
  featured = false,
  catalogue = false,
}: {
  product: {
    name: string;
    shortDescription: string;
    catalogueDescription: string;
    image: string;
    imageAlt: string;
    countRange?: string;
  };
  featured?: boolean;
  catalogue?: boolean;
}) {
  return (
    <article className={`product-card reveal${featured ? " is-featured" : ""}`}>
      <ProductVisual image={product.image} alt={product.imageAlt} />
      <div className="product-card__body">
        <h3>{product.name}</h3>
        <p>{catalogue ? product.catalogueDescription : product.shortDescription}</p>
        {product.countRange ? (
          <div className="product-card__meta product-card__meta--detail">
            <span className="product-card__badge">{product.countRange}</span>
          </div>
        ) : null}
      </div>
    </article>
  );
}

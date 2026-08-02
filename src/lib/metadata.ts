import type { Metadata } from "next";
import { siteConfig } from "@/src/config/site";

export function getConfiguredSiteUrl() {
  const value = process.env.NEXT_PUBLIC_SITE_URL || siteConfig.siteUrl;
  if (!value) return undefined;
  try {
    return new URL(value);
  } catch {
    return undefined;
  }
}

export function createPageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const base = getConfiguredSiteUrl();
  const url = base ? new URL(path, base).toString() : undefined;

  return {
    title,
    description,
    alternates: { canonical: url ?? path },
    openGraph: {
      title,
      description,
      type: "website",
      siteName: siteConfig.companyName,
      url: url ?? path,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

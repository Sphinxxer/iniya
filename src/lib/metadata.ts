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

export function isVercelPreviewHost(host: string | null | undefined) {
  return Boolean(host?.replace(/:\d+$/, "").endsWith(".vercel.app"));
}

export function getCanonicalUrl(path: string) {
  const base = getConfiguredSiteUrl();
  return base ? new URL(path, base).toString() : undefined;
}

export function createPageMetadata({
  title,
  description,
  path,
  absoluteTitle = false,
}: {
  title: string;
  description: string;
  path: string;
  absoluteTitle?: boolean;
}): Metadata {
  const url = getCanonicalUrl(path);

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: url ? { canonical: url } : undefined,
    openGraph: {
      title,
      description,
      type: "website",
      siteName: siteConfig.companyName,
      url,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

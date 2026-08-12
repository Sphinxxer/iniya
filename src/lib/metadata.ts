import type { Metadata } from "next";
import { headers } from "next/headers";
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

export function isIndexingEnabled() {
  return (
    process.env.SITE_INDEXING_ENABLED?.trim().toLowerCase() === "true" &&
    Boolean(getConfiguredSiteUrl())
  );
}

export function shouldIndexHost(host: string | null | undefined) {
  const configuredSiteUrl = getConfiguredSiteUrl();
  if (!configuredSiteUrl || !isIndexingEnabled() || isVercelPreviewHost(host)) {
    return false;
  }

  const requestHost = host?.replace(/:\d+$/, "").toLowerCase();
  return requestHost === configuredSiteUrl.hostname.toLowerCase();
}

export async function isCurrentRequestIndexable() {
  const requestHeaders = await headers();
  const host =
    requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host");
  return shouldIndexHost(host);
}

export function getCanonicalUrl(path: string) {
  const base = getConfiguredSiteUrl();
  return base && isIndexingEnabled()
    ? new URL(path, base).toString()
    : undefined;
}

export async function createPageMetadata({
  title,
  description,
  path,
  absoluteTitle = false,
}: {
  title: string;
  description: string;
  path: string;
  absoluteTitle?: boolean;
}): Promise<Metadata> {
  const url = (await isCurrentRequestIndexable())
    ? getCanonicalUrl(path)
    : undefined;

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

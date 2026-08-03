import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import { SiteFooter } from "@/src/components/site-footer";
import { SiteHeader } from "@/src/components/site-header";
import { ScrollProgress } from "@/src/components/scroll-progress";
import { StructuredData } from "@/src/components/structured-data";
import { siteConfig } from "@/src/config/site";
import {
  getCanonicalUrl,
  getConfiguredSiteUrl,
  isVercelPreviewHost,
} from "@/src/lib/metadata";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#f7f4ee",
  width: "device-width",
  initialScale: 1,
};

export async function generateMetadata(): Promise<Metadata> {
  const configuredSiteUrl = getConfiguredSiteUrl();
  const requestHeaders = await headers();
  const host =
    requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host");
  const isPreview = isVercelPreviewHost(host);
  const title = "Iniya Fiber | Recycled Fibres & Yarn Manufacturer in Tirupur";
  const description =
    "Iniya Fiber manufactures and supplies recycled textile materials, processed fibres, and customised yarn solutions from Tirupur, India.";
  const socialImage = configuredSiteUrl
    ? new URL("/og.png", configuredSiteUrl).toString()
    : undefined;
  const canonical = getCanonicalUrl("/");

  return {
    metadataBase: configuredSiteUrl,
    title: {
      default: title,
      template: "%s | Iniya Fiber",
    },
    description,
    alternates: canonical ? { canonical } : undefined,
    robots: isPreview ? { index: false, follow: false } : undefined,
    openGraph: {
      type: "website",
      siteName: siteConfig.companyName,
      title,
      description,
      url: canonical,
      images: socialImage
        ? [
            {
              url: socialImage,
              width: 1536,
              height: 1024,
              alt: "Iniya Fiber — Fibres and yarns, made to your specification.",
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: socialImage ? [socialImage] : undefined,
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.companyName,
    ...(siteConfig.registeredBusinessName
      ? { legalName: siteConfig.registeredBusinessName }
      : {}),
    description: siteConfig.description,
    ...(siteConfig.email ? { email: siteConfig.email } : {}),
    ...(siteConfig.phone ? { telephone: siteConfig.phone } : {}),
    address: {
      "@type": "PostalAddress",
      ...(siteConfig.streetAddress
        ? { streetAddress: siteConfig.streetAddress }
        : {}),
      addressLocality: "Tirupur",
      addressCountry: "IN",
    },
    ...(siteConfig.googleMapsUrl ? { hasMap: siteConfig.googleMapsUrl } : {}),
  };
  const websiteData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.companyName,
    description: siteConfig.description,
    ...(getConfiguredSiteUrl()
      ? { url: getConfiguredSiteUrl()?.toString() }
      : {}),
  };

  return (
    <html lang="en">
      <body className={`${inter.variable} ${manrope.variable}`}>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <ScrollProgress />
        <SiteHeader />
        <main id="main-content">{children}</main>
        <SiteFooter />
        <StructuredData data={[organizationData, websiteData]} />
      </body>
    </html>
  );
}

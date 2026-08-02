import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import { SiteFooter } from "@/src/components/site-footer";
import { SiteHeader } from "@/src/components/site-header";
import { ScrollProgress } from "@/src/components/scroll-progress";
import { StructuredData } from "@/src/components/structured-data";
import { siteConfig } from "@/src/config/site";
import { getConfiguredSiteUrl } from "@/src/lib/metadata";

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

async function resolveMetadataBase() {
  const configured = getConfiguredSiteUrl();
  if (configured) return configured;

  const requestHeaders = await headers();
  const host =
    requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host");
  if (!host) return undefined;
  const protocol = requestHeaders.get("x-forwarded-proto") ?? "https";
  try {
    return new URL(`${protocol}://${host}`);
  } catch {
    return undefined;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const metadataBase = await resolveMetadataBase();
  const title = "Iniya Fiber | Fibres and yarns, made to specification";
  const description =
    "Iniya Fiber manufactures and supplies recycled textile materials, processed fibres, and customised yarn solutions from Tirupur, India.";
  const socialImage = metadataBase
    ? new URL("/og.png", metadataBase).toString()
    : undefined;

  return {
    metadataBase,
    title: {
      default: title,
      template: "%s | Iniya Fiber",
    },
    description,
    openGraph: {
      type: "website",
      siteName: siteConfig.companyName,
      title,
      description,
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
    description: siteConfig.description,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Tirupur",
      addressCountry: "IN",
    },
  };
  const websiteData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.companyName,
    description: siteConfig.description,
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

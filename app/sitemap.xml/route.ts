import { productSlugs } from "@/src/data/products";
import {
  getConfiguredSiteUrl,
  isVercelPreviewHost,
} from "@/src/lib/metadata";

function escapeXml(value: string) {
  return value.replace(/[<>&'"]/g, (character) => {
    const entities: Record<string, string> = {
      "<": "&lt;",
      ">": "&gt;",
      "&": "&amp;",
      "'": "&apos;",
      '"': "&quot;",
    };
    return entities[character];
  });
}

export function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const configuredSiteUrl = getConfiguredSiteUrl();
  const isPreview =
    isVercelPreviewHost(requestUrl.hostname) || !configuredSiteUrl;

  if (isPreview || !configuredSiteUrl) {
    return new Response("Sitemap is available on the production domain.", {
      status: 404,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "X-Robots-Tag": "noindex, nofollow",
      },
    });
  }

  const paths = [
    "/",
    "/about",
    "/products",
    ...productSlugs.map((slug) => `/products/${slug}`),
    "/quality-capabilities",
    "/industries",
    "/contact",
    "/privacy",
  ];
  const entries = paths
    .map((path) => {
      const priority = path === "/" ? "1.0" : path === "/products" ? "0.9" : "0.7";
      return `<url><loc>${escapeXml(new URL(path, configuredSiteUrl).toString())}</loc><changefreq>monthly</changefreq><priority>${priority}</priority></url>`;
    })
    .join("");
  const body = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${entries}</urlset>`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}

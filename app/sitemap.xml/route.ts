import { productSlugs } from "@/src/data/products";

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
  const origin = new URL(request.url).origin;
  const paths = [
    "/",
    "/about",
    "/products",
    ...productSlugs.map((slug) => `/products/${slug}`),
    "/quality-capabilities",
    "/industries",
    "/contact",
  ];
  const entries = paths
    .map((path) => {
      const priority = path === "/" ? "1.0" : path === "/products" ? "0.9" : "0.7";
      return `<url><loc>${escapeXml(new URL(path, origin).toString())}</loc><changefreq>monthly</changefreq><priority>${priority}</priority></url>`;
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

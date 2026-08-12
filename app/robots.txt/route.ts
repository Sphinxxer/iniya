import {
  getConfiguredSiteUrl,
  shouldIndexHost,
} from "@/src/lib/metadata";

export function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const configuredSiteUrl = getConfiguredSiteUrl();
  const indexingEnabled = shouldIndexHost(requestUrl.host);
  const body = !indexingEnabled
    ? ["User-agent: *", "Disallow: /", ""].join("\n")
    : [
        "User-agent: *",
        "Allow: /",
        "Disallow: /api/",
        `Sitemap: ${new URL("/sitemap.xml", configuredSiteUrl).toString()}`,
        "",
      ].join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
      "X-Robots-Tag": indexingEnabled ? "all" : "noindex, nofollow",
    },
  });
}

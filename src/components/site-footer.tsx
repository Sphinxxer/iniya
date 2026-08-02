import Link from "next/link";
import { siteConfig } from "@/src/config/site";
import { navigation } from "@/src/data/navigation";
import { products } from "@/src/data/products";
import { Brand } from "./brand";

export function SiteFooter() {
  const year = new Date().getFullYear();
  const contactRows = [
    siteConfig.email
      ? { label: "Email", value: siteConfig.email, href: `mailto:${siteConfig.email}` }
      : null,
    siteConfig.phone
      ? { label: "Phone", value: siteConfig.phone, href: `tel:${siteConfig.phone}` }
      : null,
  ].filter(Boolean) as { label: string; value: string; href: string }[];

  return (
    <footer className="site-footer">
      <div className="shell site-footer__top">
        <div className="site-footer__brand">
          <Brand />
          <p>
            Iniya Fiber manufactures and supplies recycled textile materials,
            processed fibres, and customised yarn solutions from Tirupur, India.
          </p>
          <Link className="button button--small" href="/contact">
            Request a quote <span aria-hidden="true">↗</span>
          </Link>
        </div>

        <div className="site-footer__links">
          <div>
            <p className="eyebrow">Navigate</p>
            <nav aria-label="Footer navigation">
              {navigation.map((item) => (
                <Link key={item.href} href={item.href}>
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          <div>
            <p className="eyebrow">Products</p>
            <nav aria-label="Product navigation">
              {products.map((product) => (
                <Link key={product.slug} href={`/products/${product.slug}`}>
                  {product.name}
                </Link>
              ))}
            </nav>
          </div>
          <div>
            <p className="eyebrow">Location</p>
            <p>{siteConfig.location}</p>
            {contactRows.map((row) => (
              <a key={row.label} href={row.href}>
                {row.value}
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="shell site-footer__bottom">
        <p>© {year} Iniya Fiber. All rights reserved.</p>
        <p>Manufacturer · Supplier · Trader · Exporter</p>
      </div>
    </footer>
  );
}

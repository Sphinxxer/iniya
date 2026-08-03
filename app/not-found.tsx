import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  description: "The requested page could not be found on the Iniya Fiber website.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="not-found">
      <div className="shell not-found__grid">
        <p className="not-found__code">404</p>
        <div>
          <h1>This page is outside the current weave.</h1>
          <p>
            The address may have changed, or the page may no longer be available.
            Continue with the product range or return to the homepage.
          </p>
          <div className="button-row">
            <Link className="button" href="/">
              Return home <span aria-hidden="true">→</span>
            </Link>
            <Link className="button button--ghost" href="/products">
              Explore products <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

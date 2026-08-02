"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { navigation } from "@/src/data/navigation";
import { Brand } from "./brand";

function isCurrentPath(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    const closeButton = panelRef.current?.querySelector<HTMLElement>(
      "[data-mobile-nav-close]",
    );
    document.body.style.overflow = "hidden";
    closeButton?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
        return;
      }

      if (event.key !== "Tab" || !panelRef.current) return;
      const focusable = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled])',
        ),
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  useEffect(() => {
    const desktopNavigation = window.matchMedia("(min-width: 1101px)");
    const onBreakpointChange = (event: MediaQueryListEvent) => {
      if (event.matches) setOpen(false);
    };

    desktopNavigation.addEventListener("change", onBreakpointChange);
    return () =>
      desktopNavigation.removeEventListener("change", onBreakpointChange);
  }, []);

  const closeNavigation = (restoreFocus = true) => {
    setOpen(false);
    if (restoreFocus) {
      window.requestAnimationFrame(() => triggerRef.current?.focus());
    }
  };

  return (
    <>
      <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
        <div className="site-header__inner shell">
          <Brand priority />

          <nav className="desktop-nav" aria-label="Main navigation">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={
                  isCurrentPath(pathname, item.href) ? "is-active" : ""
                }
                aria-current={
                  isCurrentPath(pathname, item.href) ? "page" : undefined
                }
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="site-header__actions">
            <Link className="button button--small desktop-quote" href="/contact">
              Request a quote <span aria-hidden="true">↗</span>
            </Link>
            <button
              ref={triggerRef}
              type="button"
              className="menu-trigger"
              aria-expanded={open}
              aria-controls="mobile-navigation"
              aria-label={open ? "Close navigation" : "Open navigation"}
              onClick={() => setOpen((value) => !value)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      <div
        className={`mobile-nav${open ? " is-open" : ""}`}
        id="mobile-navigation"
        role="dialog"
        aria-modal="true"
        aria-labelledby="mobile-navigation-title"
        aria-hidden={!open}
      >
        <button
          className="mobile-nav__backdrop"
          type="button"
          tabIndex={-1}
          aria-hidden="true"
          onClick={() => closeNavigation()}
        />
        <div ref={panelRef} className="mobile-nav__panel">
          <div className="mobile-nav__top">
            <p className="eyebrow" id="mobile-navigation-title">
              Navigation
            </p>
            <button
              type="button"
              className="mobile-nav__close"
              data-mobile-nav-close
              tabIndex={open ? 0 : -1}
              aria-label="Close navigation"
              onClick={() => closeNavigation()}
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <nav aria-label="Mobile navigation">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                tabIndex={open ? 0 : -1}
                onClick={() => closeNavigation(false)}
                className={
                  isCurrentPath(pathname, item.href) ? "is-active" : ""
                }
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <Link
            className="button mobile-nav__quote"
            href="/contact"
            tabIndex={open ? 0 : -1}
            onClick={() => closeNavigation(false)}
          >
            Request a quote <span aria-hidden="true">↗</span>
          </Link>
          <p className="mobile-nav__location">Tirupur, India</p>
        </div>
      </div>
    </>
  );
}

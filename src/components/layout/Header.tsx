"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { site } from "@/content/site";

const desktopNav = site.nav.filter((item) => item.href !== "/");
const capsuleNav = desktopNav.filter((item) => item.href !== "/contact");
const contactItem = desktopNav.find((item) => item.href === "/contact");

/* Home-section scroll-spy map — section id → nav href. Visual highlighting
   only; aria-current remains strictly route-based so assistive-tech
   semantics are unchanged. */
const SECTION_NAV: Record<string, string> = {
  work: "/work",
  about: "/about",
  experience: "/experience",
  publications: "/publications",
  contact: "/contact",
};
const SECTION_ORDER = Object.keys(SECTION_NAV);

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [sectionHref, setSectionHref] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => { setScrolled(window.scrollY > 24); const height = document.documentElement.scrollHeight - window.innerHeight; setProgress(height > 0 ? window.scrollY / height : 0); };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-aware section highlighting (Home only) — a viewport-middle band
  // decides which section is "in view"; the matching nav link lights up.
  useEffect(() => {
    if (pathname !== "/" || typeof IntersectionObserver === "undefined") return;

    const sections = SECTION_ORDER.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).map((entry) => entry.target.id);
        if (visible.length > 0) {
          // Latest section in document order wins
          const current = [...SECTION_ORDER].reverse().find((id) => visible.includes(id));
          if (current) setSectionHref(SECTION_NAV[current]);
          return;
        }
        // Above the first section (hero) → nothing highlighted
        if (window.scrollY < window.innerHeight * 0.5) setSectionHref(null);
      },
      { rootMargin: "-38% 0px -52% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Escape closes the mobile menu and returns focus to the toggle button
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
  // Route match OR the section currently in view on Home — visual only
  const isHighlighted = (href: string) => isActive(href) || (pathname === "/" && sectionHref === href);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 ${open
        ? // Open state (mobile only). No color transition while open: the bar
          // must be bare immediately, never compositing a surface slab over
          // the hero mid-animation — the floating menu shape owns all color.
          // Scoped with lg overrides so a desktop window (where the toggle
          // cannot exist, e.g. after opening below lg and resizing up) always
          // keeps the closed appearance; desktop also never paints a border.
          `border-b border-transparent bg-transparent ${scrolled
            ? "lg:border-line lg:bg-obsidian/70 lg:backdrop-blur-xl"
            : "lg:border-transparent"
          }`
        : `transition-[background-color,border-color] duration-500 ${scrolled
          ? "border-b border-line bg-obsidian/70 backdrop-blur-xl lg:border-transparent"
          : "border-b border-transparent"
        }`
      }`}
    >
      <span className="pointer-events-none absolute inset-x-0 bottom-0 h-px origin-left bg-champagne" style={{ transform: `scaleX(${progress})` }} />
      {/* Mobile: single-column flow — the pill trigger spans the full row
          between the container's side padding; desktop (lg) reverts to the
          flex justify-between layout with logo + nav only. */}
      <div className="relative mx-auto grid h-16 max-w-6xl grid-cols-[1fr_auto_1fr] items-center px-5 sm:px-8 lg:flex lg:h-20 lg:justify-between">
        {/* Desktop logo mark — links home. Hidden on mobile, where the
            wordmark lives inside the pill trigger below instead. */}
        <Link
          href="/"
          className="relative z-10 hidden justify-self-start transition-opacity duration-300 hover:opacity-80 lg:block"
          aria-label="Yousef Koura — home"
        >
          <Image
            src="/logo-wordmark.png"
            alt=""
            width={1671}
            height={271}
            priority
            className="h-9 w-auto lg:-ml-4"
          />
        </Link>

        {/* Capsule-grouped quiet links + one solid CTA pill */}
        <nav className="hidden items-center gap-3 lg:flex" aria-label="Primary">
          <div className="flex items-center gap-1 rounded-full border border-line bg-surface/70 px-2 py-1.5">
            {capsuleNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={`rounded-full px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] transition-colors duration-300 ${isHighlighted(item.href) ? "bg-raised/80 text-champagne" : "text-muted hover:text-ink"
                  }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
          {contactItem ? (
            <Link
              href={contactItem.href}
              aria-current={isActive(contactItem.href) ? "page" : undefined}
              className={`rounded-full bg-champagne px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-obsidian transition-all duration-300 hover:bg-champagne-light ${isHighlighted(contactItem.href) ? "ring-1 ring-inset ring-champagne-light/60" : ""
                }`}
            >
              {contactItem.label}
            </Link>
          ) : null}
        </nav>

        {/* Mobile single-shape trigger — replaces both the standalone wordmark
            and the hamburger. The OUTER motion.div is the only element that
            owns visuals (one background, one border-radius, one shadow), so
            the open state reads as a single continuous silhouette whose top
            zone holds the brand and bottom zone holds the nav grid, joined by
            a hairline Border-token divider INSIDE the shape. The persistent
            <motion.button> carries only geometry: `layout` morphs it between
            full-width pill content and the compact top-zone chip without
            remounting, so focus-return keeps working; the inner span holds
            the logo at natural size while two glyphs crossfade as the shape's
            background flips ink→surface. The rounded-full/bg-ink/shadow
            classes are a pre-hydration fallback only — Framer's inline
            styles own these properties after mount. */}
        <motion.div
          layout
          initial={false}
          /* Backgrounds mirror the Surface/Ink tokens from globals.css —
             literal values because Framer cannot interpolate between var()
             endpoints; keep in sync with the @theme block. */
          animate={{
            backgroundColor: open ? "#14161a" : "#f3f0e8",
            borderRadius: open ? 16 : 9999,
            boxShadow: open
              ? "0px 2px 10px rgba(0,0,0,0.45), 0px 14px 28px -16px rgba(0,0,0,0.85)"
              : "0px 1px 3px rgba(0,0,0,0.35), 0px 14px 28px -16px rgba(0,0,0,0)",
          }}
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          className={`relative z-10 col-span-full row-start-1 justify-self-stretch rounded-full bg-ink shadow-[0px_1px_3px_rgba(0,0,0,0.35)] lg:hidden ${open ? "self-start" : "self-center"}`}
        >
          <motion.button
            ref={menuButtonRef}
            type="button"
            layout
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className={`flex items-center justify-center ${open
              ? "mx-auto w-fit px-3 py-2"
              : "w-full px-4 py-2.5"
              }`}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.span layout="position" className="relative flex items-center">
              <Image
                src="/logo-wordmark-dark.png"
                alt=""
                width={1665}
                height={266}
                priority
                className={`h-5 w-auto transition-opacity duration-200 sm:h-6 ${open ? "opacity-0" : "opacity-100"}`}
              />
              <Image
                src="/logo-wordmark.png"
                alt=""
                width={1671}
                height={271}
                className={`absolute left-1/2 top-1/2 h-5 w-auto -translate-x-1/2 -translate-y-1/2 transition-opacity duration-200 sm:h-6 ${open ? "opacity-100" : "opacity-0"}`}
              />
            </motion.span>
          </motion.button>

          <AnimatePresence initial={false}>
            {open && (
              /* Height-reveal INSIDE the single shape: the grid is an internal
                 zone, so no independent background/radius/shadow of its own —
                 only the subtle Border-token hairline divider at the join.
                 Slide-free reveal keeps every painted frame fully opaque. */
              <motion.div
                id="mobile-menu"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0, transition: { duration: 0.18, ease: "easeIn" } }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
                style={{ willChange: "transform" }}
              >
                <nav
                  className="grid grid-cols-2 gap-1 border-t border-line p-2.5"
                  aria-label="Mobile"
                >
                  {site.nav.map((item, index) => (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.04 * index, duration: 0.25 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        aria-current={isActive(item.href) ? "page" : undefined}
                        className={`group flex items-center gap-2 whitespace-nowrap rounded-lg px-2.5 py-3 font-mono text-[10px] uppercase tracking-[0.18em] transition-colors duration-300 ${isActive(item.href) ? "text-champagne" : "text-muted hover:text-ink"
                          }`}
                      >
                        <span
                          aria-hidden="true"
                          className={`h-1 w-1 shrink-0 rounded-full transition-colors duration-300 ${isActive(item.href) ? "bg-champagne" : "bg-muted group-hover:bg-champagne"
                            }`}
                        />
                        {item.label}
                      </Link>
                    </motion.div>
                  ))}
                </nav>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </header>
  );
}

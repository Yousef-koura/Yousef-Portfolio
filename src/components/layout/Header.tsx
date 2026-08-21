"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
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
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-500 ${
        scrolled || open ? "border-b border-line bg-obsidian/70 backdrop-blur-xl" : "border-b border-transparent"
      }`}
    >
      <span className="pointer-events-none absolute inset-x-0 bottom-0 h-px origin-left bg-champagne" style={{ transform: `scaleX(${progress})` }} />
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8 lg:h-20">
        {/* Bold display wordmark — the header carries real typographic weight */}
        <Link
          href="/"
          className="font-display text-[17px] font-bold tracking-tight text-ink transition-colors duration-300 hover:text-champagne sm:text-xl lg:text-2xl"
          aria-label="Yousef Koura — home"
        >
          {site.name}
        </Link>

        {/* Capsule-grouped quiet links + one solid CTA pill */}
        <nav className="hidden items-center gap-3 lg:flex" aria-label="Primary">
          <div className="flex items-center gap-1 rounded-full border border-line bg-surface/70 px-2 py-1.5">
            {capsuleNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={`rounded-full px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] transition-colors duration-300 ${
                  isHighlighted(item.href) ? "bg-raised/80 text-champagne" : "text-muted hover:text-ink"
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
              className={`rounded-full bg-champagne px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-obsidian transition-all duration-300 hover:bg-champagne-light ${
                isHighlighted(contactItem.href) ? "ring-1 ring-inset ring-champagne-light/60" : ""
              }`}
            >
              {contactItem.label}
            </Link>
          ) : null}
        </nav>

        <button
          ref={menuButtonRef}
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="flex h-10 w-10 items-center justify-center border border-line text-ink transition-colors hover:border-champagne hover:text-champagne lg:hidden"
        >
          {open ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden border-t border-line bg-obsidian/95 backdrop-blur-xl lg:hidden"
          >
            <nav className="flex flex-col gap-1 px-5 py-6" aria-label="Mobile">
              {site.nav.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * index, duration: 0.25 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={`flex items-center justify-between border-b border-line/60 py-4 font-display text-2xl tracking-tight transition-colors ${
                      isActive(item.href) ? "text-champagne" : "text-ink hover:text-champagne"
                    }`}
                  >
                    {item.label}
                    <span aria-hidden="true" className="font-mono text-xs text-muted">
                      0{index + 1}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

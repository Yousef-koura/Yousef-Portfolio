"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { Moon, Sun, Volume2, VolumeX } from "lucide-react";
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
  const barRef = useRef<HTMLDivElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  // Theme toggle — UI-only stub: the click flips the glyph so the control is
  // ready to wire up later; it deliberately touches no real theming yet.
  const [darkMode, setDarkMode] = useState(true);
  const pathname = usePathname();

  /* Intro audio — user-initiated only (never autoplay). The ended listener
     keeps the toggle state honest when the track finishes; unmount pauses. */
  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    const onEnded = () => setPlaying(false);
    el.addEventListener("ended", onEnded);
    return () => {
      el.removeEventListener("ended", onEnded);
      el.pause();
    };
  }, []);

  const toggleAudio = () => {
    const el = audioRef.current;
    if (!el) return;
    if (playing) {
      el.pause();
      setPlaying(false);
    } else {
      // play() rejects if the browser blocks it — fall back to idle state
      el.play()
        .then(() => setPlaying(true))
        .catch(() => setPlaying(false));
    }
  };

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

  // Click/tap outside the bar or panel also closes the menu. pointerdown is
  // used so touch taps register before any scroll intent; Escape handling,
  // focus-return, and per-link close handlers above are untouched.
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      const t = e.target as Node;
      if (barRef.current?.contains(t) || panelRef.current?.contains(t)) return;
      setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
  // Route match OR the section currently in view on Home — visual only
  const isHighlighted = (href: string) => isActive(href) || (pathname === "/" && sectionHref === href);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 ${open
        ? // Open state (mobile only): the header strip itself stays bare so
          // the floating bar + panel shapes own all color — nothing here
          // transitions mid-animation. Scoped with lg overrides so a desktop
          // window (where the toggle cannot exist, e.g. after opening below
          // lg and resizing up) always keeps the closed appearance; desktop
          // also never paints a border.
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
      {/* Mobile single-column flow — the bar spans the full row between the
          container's side padding while closed and hugs its content when the
          menu is open; desktop (lg) reverts to the flex justify-between
          layout with logo + nav only. */}
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
          {/* Intro audio toggle — quiet round chip matching the capsule's
              height rhythm; champagne only while playing (accent discipline). */}
          <button
            type="button"
            onClick={toggleAudio}
            aria-label={playing ? "Pause intro audio" : "Play intro audio"}
            aria-pressed={playing}
            className={`flex h-7 w-7 items-center justify-center rounded-full border transition-colors duration-300 ${playing ? "border-champagne/50 text-champagne" : "border-line text-muted hover:text-ink"
              }`}
          >
            {playing ? (
              <VolumeX size={14} aria-hidden="true" />
            ) : (
              <Volume2 size={14} aria-hidden="true" />
            )}
          </button>
        </nav>

        {/* Mobile floating shapes — TWO elements share one design language:
            the persistent bar (wordmark + icon-button group) and the dropdown
            panel below it. Both carry the same Ink-token background,
            soft-corner radius, and shadow family. The bar keeps its light
            background in BOTH states — identical to the panel — so there is
            no background interpolation left at all (a color flash is
            impossible) and the wordmark needs no variant crossfade. `layout`
            morphs the bar between the full-width closed geometry and the
            compact open cluster that hugs logo + controls without remounting,
            so focus-return keeps working. The icon group lives INSIDE the
            bar, exactly once per control, reachable with the menu open. The
            rounded/bg/shadow classes are pre-hydration fallbacks only —
            Framer's inline styles own the animated properties after mount. */}
        <motion.div
          ref={barRef}
          layout
          initial={false}
          /* Closed state keeps a transparent twin of the open shadow's second
             layer so the tween interpolates between equal-length lists. */
          animate={{
            boxShadow: open
              ? "0px 2px 10px rgba(0,0,0,0.45), 0px 14px 28px -16px rgba(0,0,0,0.85)"
              : "0px 1px 3px rgba(0,0,0,0.35), 0px 14px 28px -16px rgba(0,0,0,0)",
          }}
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          className={`relative z-10 col-span-full row-start-1 flex items-center self-center gap-2 rounded-2xl bg-ink p-1.5 pl-4 shadow-[0px_1px_3px_rgba(0,0,0,0.35)] lg:hidden ${open ? "justify-self-center" : "justify-self-stretch"}`}
        >
          <motion.button
            ref={menuButtonRef}
            type="button"
            layout
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className={`flex items-center py-2 ${open ? "flex-none px-3" : "min-w-0 flex-1 pr-2"}`}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.span layout="position" className="flex items-center">
              <Image
                src="/logo-wordmark-dark.png"
                alt=""
                width={1665}
                height={266}
                priority
                className="h-5 w-auto sm:h-6"
              />
            </motion.span>
          </motion.button>

          {/* Icon-button group — speaker + theme stub share one sizing/
              spacing/hover/focus convention so they read as a single control
              cluster. Raised surface + hairline border read against any page
              backdrop behind the light bar. */}
          <motion.div layout="position" className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={toggleAudio}
              aria-label={playing ? "Pause intro audio" : "Play intro audio"}
              aria-pressed={playing}
              className={`flex h-9 w-9 items-center justify-center rounded-full border bg-raised transition-colors duration-300 ${playing ? "border-champagne/50 text-champagne" : "border-line text-muted hover:text-ink"
                }`}
            >
              {playing ? (
                <VolumeX size={16} aria-hidden="true" />
              ) : (
                <Volume2 size={16} aria-hidden="true" />
              )}
            </button>
            <button
              type="button"
              onClick={() => setDarkMode((v) => !v)}
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-raised text-muted transition-colors duration-300 hover:text-ink"
            >
              {darkMode ? (
                <Sun size={16} aria-hidden="true" />
              ) : (
                <Moon size={16} aria-hidden="true" />
              )}
            </button>
          </motion.div>
        </motion.div>

        {/* Dropdown panel — its own shape below the bar: same Ink-token
            background as the pill, same radius/shadow language, sized to the
            two-column content and centered under the shrunk bar. Height-reveal
            stays slide-free so every painted frame is fully opaque. On this
            light panel the active item INVERTS to a Surface pill with Ink
            content (16.4:1); inactive items move to Obsidian text (17.7:1 —
            Muted fails contrast on Ink at 2.1:1) with Border-tone dots that
            warm to champagne on hover (accent discipline kept). */}
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              id="mobile-menu"
              ref={panelRef}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0, transition: { duration: 0.18, ease: "easeIn" } }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              style={{ willChange: "transform" }}
              className="col-span-full row-start-2 mt-2 w-[min(100%,20rem)] justify-self-center overflow-hidden rounded-2xl bg-ink shadow-[0px_2px_10px_rgba(0,0,0,0.45),0px_14px_28px_-16px_rgba(0,0,0,0.85)]"
            >
              <nav
                className="grid grid-cols-2 gap-1 p-2.5"
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
                      className={`group flex items-center gap-2 whitespace-nowrap rounded-lg px-2.5 py-3 font-mono text-[10px] uppercase tracking-[0.18em] transition-colors duration-300 ${isActive(item.href) ? "bg-surface text-ink" : "text-obsidian hover:bg-surface/5"
                        }`}
                    >
                      <span
                        aria-hidden="true"
                        className={`h-1 w-1 shrink-0 rounded-full transition-colors duration-300 ${isActive(item.href) ? "bg-champagne" : "bg-line group-hover:bg-champagne"
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
      </div>

      {/* Filename contains a space — keep it URL-encoded in the src. */}
      <audio ref={audioRef} src="/audio/intro%20voice.mp3" preload="none" className="hidden" />
    </header>
  );
}

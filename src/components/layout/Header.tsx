"use client";

import { useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { Moon, Sun, Volume2, VolumeX } from "lucide-react";
import { site } from "@/content/site";
import { applyTheme, readStoredTheme, storeTheme, type Theme } from "@/lib/theme";

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
/* Dropdown overhang beyond each bar edge, px. Applied as explicit width
   (bar width + 2× this) — negative margins on a width-matched centered box
   cancel out geometrically and render zero overhang. 16 matches the mt-4
   bar-panel gap so the pair reads as one spacing rhythm. */
const PANEL_OVERHANG_PX = 16;
/* Scroll delta (px) from open-time position that dismisses the dropdown.
   Large enough to ignore momentum/rubber-band jitter, small enough to feel
   immediate. */
const SCROLL_CLOSE_PX = 8;

/* Theme state reads the applied html attribute itself (single source of
   truth, shared by mobile + desktop chips). The server snapshot is dark —
   the SSR default and brand default; useSyncExternalStore re-renders with
   the real value right after hydration, no mismatch. */
function subscribeToTheme(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => observer.disconnect();
}
const getAppliedTheme = (): Theme =>
  document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
const getServerTheme = (): Theme => "dark";

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
  // Real theming (DECISIONS #40): the layout's init script applies the
  // stored theme before first paint (dark = brand default, no
  // prefers-color-scheme); this component tracks the applied attribute.
  const theme = useSyncExternalStore(subscribeToTheme, getAppliedTheme, getServerTheme);
  /* Live width of the mobile bar's layout box. While open, the dropdown
     panel derives its own width from it (bar + PANEL_OVERHANG_PX per side)
     since the bar hugs logo + controls — a width no fixed value predicts.
     offsetWidth is used — unlike getBoundingClientRect it ignores Framer's
     transient morph transforms and reports the settled box; the observer
     also tracks resizes and the sm wordmark step. Zero widths (bar
     display:none after a below-lg resize-up) are ignored so the CSS
     fallback survives. */
  const [barWidth, setBarWidth] = useState<number | null>(null);
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

  // Theme toggle (mobile chip + desktop chip share this): flips the html
  // attribute the token system responds to and persists the choice; the
  // MutationObserver subscription re-renders the glyphs/labels.
  const toggleTheme = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    applyTheme(next);
    storeTheme(next);
  };

  // Re-apply after React's dev-only Strict Mode remount, which resets <html>
  // attributes it manages from JSX and would drop the script-corrected one.
  useLayoutEffect(() => {
    applyTheme(readStoredTheme() ?? "dark");
  }, []);

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

  // Scrolling the page also closes the menu (Escape and click/tap-outside
  // above are untouched). The listener exists only while the menu is open,
  // measures against the scroll position captured at open time, and needs
  // only a small delta — body scroll is normally locked while open, so this
  // mostly guards browsers where that lock leaks (iOS overscroll/bounce).
  useEffect(() => {
    if (!open) return;
    const startY = window.scrollY;
    const onScroll = () => {
      if (Math.abs(window.scrollY - startY) >= SCROLL_CLOSE_PX) {
        setOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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

  // Track the mobile bar's rendered width for the panel's edge alignment
  useEffect(() => {
    const el = barRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(() => {
      const w = el.offsetWidth;
      setBarWidth(w > 0 ? w : null);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

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
          ? "border-b border-transparent bg-transparent lg:bg-obsidian/70 lg:backdrop-blur-xl"
          : "border-b border-transparent"
        }`
      }`}
    >
      {/* Scroll-progress hairline — desktop only. It reads as the bottom rule
          of the lg-only backgrounded strip, which still exists there; on
          mobile that strip is gone, so the mobile bar hosts its own copy
          (see the span inside the pill below). */}
      <span className="pointer-events-none absolute inset-x-0 bottom-0 hidden h-px origin-left bg-champagne lg:block" style={{ transform: `scaleX(${progress})` }} />
      {/* Mobile single-column flow — plain block flow with NO fixed height:
          each child sizes to its own content, so opening the panel grows
          the header naturally instead of overflowing a strip sized for one
          row (a fixed h-16 grid collapsed both rows flush to y=0 once bar
          + panel exceeded it). pt-3 keeps clear space above the bar in BOTH
          states. Desktop (lg) keeps the fixed h-20 justify-between strip
          pixel-identical to before. */}
      <div className="relative mx-auto flex max-w-6xl flex-col px-5 pt-3 sm:px-8 lg:h-20 lg:flex-row lg:items-center lg:justify-between lg:pt-0">
        {/* Desktop logo mark — links home. Hidden on mobile, where the
            wordmark lives inside the pill trigger below instead. */}
        <Link
          href="/"
          className="relative z-10 hidden justify-self-start transition-opacity duration-300 hover:opacity-80 lg:block"
          aria-label="Yousef Koura — home"
        >
          <Image
            src={theme === "dark" ? "/logo-wordmark.png" : "/logo-wordmark-dark.png"}
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
                className={`rounded-full px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] transition-colors duration-300 ${isHighlighted(item.href) ? "bg-raised/80 text-champagne-strong" : "text-muted-strong hover:text-ink"
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
              className={`rounded-full bg-champagne px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-on-accent transition-all duration-300 ${theme === "dark"
                // Light mode: resting label is a warm near-white (4.9:1 — cream
                // measured 4.37); on hover the pill brightens to champagne-light
                // and the label flips to Ink (8.0:1).
                ? "hover:bg-champagne-light"
                : "hover:bg-champagne-light hover:text-ink"
                } ${isHighlighted(contactItem.href) ? "ring-1 ring-inset ring-champagne-light/60" : ""
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
          {/* Theme toggle — real theming (DECISIONS #40): flips the html
              data-theme attribute and persists the choice. Mirrors the
              mobile pill's control exactly (same state, same labels). */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            className="flex h-7 w-7 items-center justify-center rounded-full border border-line text-muted transition-colors duration-300 hover:text-ink"
          >
            {theme === "dark" ? (
              <Sun size={14} aria-hidden="true" />
            ) : (
              <Moon size={14} aria-hidden="true" />
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
          className={`relative z-10 flex items-center overflow-hidden gap-2 rounded-2xl bg-ink p-1.5 pl-4 shadow-[0px_1px_3px_rgba(0,0,0,0.35)] lg:hidden ${open ? "self-center" : "self-stretch"}`}
        >
          {/* Scroll-progress hairline — anchored to the bar itself. The
              full-width header strip it used to sit on no longer paints on
              mobile, so the line hugs the pill's bottom edge and clips to
              its radius instead, reading as part of the floating bar at
              every width (including the shrunk open state). */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-px origin-left bg-champagne"
            style={{ transform: `scaleX(${progress})` }}
          />

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
            <motion.span
              layout="position"
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center"
            >
              <Image
                src={theme === "dark" ? "/logo-wordmark-dark.png" : "/logo-wordmark.png"}
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
          <motion.div
            layout="position"
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="flex shrink-0 items-center gap-2"
          >
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
              onClick={toggleTheme}
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-raised text-muted transition-colors duration-300 hover:text-ink"
            >
              {theme === "dark" ? (
                <Sun size={16} aria-hidden="true" />
              ) : (
                <Moon size={16} aria-hidden="true" />
              )}
            </button>
          </motion.div>
        </motion.div>

        {/* Dropdown panel — its own shape below the bar: same Ink-token
            background as the pill, same radius/shadow language. Its width is
            computed explicitly as the bar's live measured width plus
            PANEL_OVERHANG_PX per side, so it reads as the wider of the two
            related shapes while staying centered on the bar; the Tailwind
            width class only covers the window before the first measurement
            lands and reserves the same overhang room. The mt-4 gap is real
            rendered spacing now that nothing collapses rows together.
            Height-reveal stays slide-free so every painted frame is fully
            opaque, and being in flow the header grows with it instead of
            clipping. On this light panel the active item INVERTS to a
            Surface pill with Ink content (16.4:1); inactive items move to
            Obsidian text (17.7:1 — Muted fails contrast on Ink at 2.1:1)
            with Border-tone dots that warm to champagne on hover (accent
            discipline kept). */}
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              id="mobile-menu"
              ref={panelRef}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0, transition: { duration: 0.18, ease: "easeIn" } }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              style={{
                willChange: "transform",
                ...(barWidth !== null ? { width: barWidth + PANEL_OVERHANG_PX * 2 } : null),
              }}
              className="mt-4 w-[min(calc(100%_+_2rem),22rem)] self-center overflow-hidden rounded-2xl bg-ink shadow-[0px_2px_10px_rgba(0,0,0,0.45),0px_14px_28px_-16px_rgba(0,0,0,0.85)] lg:hidden"
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

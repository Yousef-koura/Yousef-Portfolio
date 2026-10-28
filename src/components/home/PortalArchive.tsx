"use client";

import Image, { getImageProps } from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { QuietLink } from "@/components/ui/QuietLink";
import { Reveal } from "@/components/ui/Reveal";
import { RevealImage } from "@/components/ui/RevealImage";
import { experience, publication } from "@/content/experience";
import HalftoneBackdrop from "@/components/home/HalftoneBackdrop";

gsap.registerPlugin(ScrollTrigger);

/* Lazy-load the WebGL gallery so it is never part of the initial server
   rendered bundle (canvas / ogl only exist on the client). */
const SelectedWorkGallery = dynamic(
  () =>
    import("@/components/home/SelectedWorkGallery").then(
      (mod) => mod.SelectedWorkGallery,
    ),
  { ssr: false, loading: () => null },
);

/**
 * Art-directed opening portrait (transparent cutouts): the desktop crop
 * serves lg+ viewports, the mobile crop below. Rendered via <picture>.
 * UNCHANGED — hero is byte-identical.
 */
const common = {
  alt: "Yousef Koura",
  sizes: "(max-width: 760px) 74vw, 40vw",
  loading: "eager" as const,
  fetchPriority: "high" as const,
};

const {
  props: { srcSet: portraitDesktopSrcSet, src: portraitDesktopSrc },
} = getImageProps({ ...common, src: "/portrait/personal-image-desktop.png", width: 365, height: 684 });

const {
  props: { srcSet: portraitMobileSrcSet, ...portraitMobileRest },
} = getImageProps({ ...common, src: "/portrait/personal-image-mobile.png", width: 394, height: 634 });

export function PortalArchive() {
  const heroRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const update = () => {
      const hero = heroRef.current;
      if (!hero) return;
      const distance = Math.max(1, hero.offsetHeight - window.innerHeight);
      setProgress(Math.min(1, Math.max(0, -hero.getBoundingClientRect().top / distance)));
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    update(); media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const revealProgress = reducedMotion ? 1 : progress;

  useEffect(() => {
    const targets = [...document.querySelectorAll<HTMLElement>(".portal-home [data-reveal]")];
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.12 },
    );
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="portal-home">
      {/* LCP preloads (Week-7 mobile audit) — the hero portrait is the LCP
          element; media-scoped responsive preloads let the browser start the
          correct crop's fetch at discovery time instead of after CSS parse +
          layout. Media attributes keep desktop from paying for the mobile
          crop and vice versa (same selection as the <picture> below). React
          hoists these into <head>. */}
      <link
        rel="preload"
        as="image"
        href={portraitMobileRest.src}
        imageSrcSet={portraitDesktopSrcSet}
        imageSizes={common.sizes}
        media="(max-width: 760px)"
        fetchPriority="high"
      />
      <link
        rel="preload"
        as="image"
        href={portraitDesktopSrc}
        imageSrcSet={portraitDesktopSrcSet}
        imageSizes={common.sizes}
        media="(min-width: 761px)"
        fetchPriority="high"
      />
      <section ref={heroRef} className="portal-hero" aria-label="Yousef Koura, machine learning engineer">
        <div className="portal-stage">
          <div className="portal-hero__glow" style={{ opacity: revealProgress * .7 }} />
          <div className="portal-portrait-frame">
            <picture>
              <source media="(min-width: 761px)" srcSet={portraitDesktopSrcSet} sizes="(max-width: 760px) 74vw, 40vw" />
              <source media="(max-width: 760px)" srcSet={portraitMobileSrcSet} sizes="(max-width: 760px) 74vw, 40vw" />
              {/* eslint-disable-next-line jsx-a11y/alt-text -- alt arrives via portraitMobileRest */}
              <img {...portraitMobileRest} className="portal-stage__image" />
            </picture>
          </div>
          <div className="portal-panel portal-panel--left" style={{ transform: `translateX(${-revealProgress * 108}%)` }} />
          <div className="portal-panel portal-panel--right" style={{ transform: `translateX(${revealProgress * 108}%)` }} />
          <div className="portal-meta portal-meta--top">PORTFOLIO / 2026<br />MENOUFIA, EGYPT</div>
          <div className="portal-meta portal-meta--bottom">SCROLL TO OPEN</div>
          <h1 className="portal-title" style={{ transform: `scale(${1 + revealProgress * .12})`, letterSpacing: `${.09 - revealProgress * .075}em` }}><span style={{ transform: `translateX(${-revealProgress * 62}%)` }}>YOU</span><span style={{ transform: `translateX(${revealProgress * 62}%)` }}>SEF</span></h1>
        </div>
      </section>

      {/* STATEMENT — title block. The positioning statement is the anchor
          (largest); the role line + descriptor are a compact supporting line.
          Centered, consistent with the sections below. Copy unchanged. */}
      <section className="portal-statement" data-reveal>
        <p className="portal-statement__copy">I build the systems beneath a useful interface: <em>models, data, and decisions</em> brought into the same room.</p>
        <p className="portal-statement__role">AI Engineer</p>
        <p className="portal-statement__descriptor">Applied AI · LLMs/RAG · Computer vision · Machine learning · Data</p>
      </section>

      {/* ABOUT — two-sentence confirmed-facts block + "More about me". */}
      <section id="about" className="portal-about" data-reveal>
        <h2 className="portal-about__head">About me</h2>
        <p className="portal-about__copy">
          Based in Menoufia, Egypt, I hold a B.Sc. in Mechatronics Systems
          Engineering and have worked on ML and AI internships spanning data,
          computer vision, and applied AI. I now build AI-native products —
          most recently Movenue, a live court management and booking platform.
        </p>
        <div className="portal-about__link">
          <QuietLink href="/about" className="portal-ql">More about me</QuietLink>
        </div>
      </section>

      {/* SELECTED WORK — label, heading, All work link, then the OGL WebGL
          curved carousel gallery; active-item caption below; prev/next buttons. */}
      <SelectedWorkGallery />

      {/* JOURNEY — compact rows, timeframe / org / role + Current chip.
          One title only ("Journey"); "Full experience" links to /experience. */}
      <section id="experience" className="portal-journey" data-reveal>
        <div className="portal-journey__head">
          <h2 className="portal-journey__title">Journey</h2>
          <QuietLink href="/experience" className="portal-ql">Full experience</QuietLink>
        </div>
        <ol className="portal-journey__track">
          {experience.map((entry) => {
            const isCurrent = Boolean(entry.current);
            return (
              <li key={`${entry.org}-${entry.role}`} className="portal-journey__step">
                <time className={`portal-journey__time ${isCurrent ? "portal-journey__time--current" : ""}`}>
                  {entry.timeframe}
                </time>
                <div className="portal-journey__body">
                  <div className={`portal-journey__org ${isCurrent ? "portal-journey__org--current" : ""}`}>
                    {entry.org}
                  </div>
                  <div className={`portal-journey__role ${isCurrent ? "portal-journey__role--current" : ""}`}>
                    {entry.role}
                    {isCurrent ? (
                      <span className="portal-current"> · Current</span>
                    ) : null}
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </section>

      {/* PUBLICATION — small certificate thumbnail + title/venue/date + link. */}
      <section id="publications" className="portal-publication" data-reveal>
        <div className="portal-publication__row">
          <Reveal>
            <figure className="portal-publication__figure">
              <RevealImage>
                <Image
                  src="/projects/iugrc-certificate.png"
                  alt="IUGRC 8 publication certificate for the AgRobot paper"
                  width={300}
                  height={207}
                  sizes="(max-width: 760px) 70vw, 300px"
                  className="portal-publication__thumb"
                  loading="lazy"
                  decoding="async"
                />
              </RevealImage>
            </figure>
          </Reveal>
          <div>
            <h3 className="portal-publication__title">{publication.title}</h3>
            <p className="portal-publication__venue">{publication.venue}</p>
            <p className="portal-publication__date">{publication.date}</p>
          </div>
          <Link href="/publications" className="portal-publication__link">
            Read publication <ArrowUpRight size={13} aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* FINAL CTA — connection. Halftone WebGL backdrop inside the section. */}
      <section id="contact" className="portal-close relative" data-reveal>
        <HalftoneBackdrop />
        <div className="portal-halftone__scrim" aria-hidden="true" />
        <div className="portal-close__body portal-close__body--layered">
          <h2 className="portal-close__head">LET&apos;S MAKE<br />THE SIGNAL <em>USEFUL.</em></h2>
          <p className="portal-close__copy">Available for thoughtful AI, data, and product collaborations.</p>
          <div className="portal-close__actions">
            <a className="portal-action" href="mailto:yousefahmed.ae20@gmail.com">EMAIL ME <ArrowUpRight size={15} /></a>
            <Link href="/contact" className="portal-action portal-action--quiet">CONTACT PAGE</Link>
          </div>
        </div>
      </section>
    </div>
  );
}

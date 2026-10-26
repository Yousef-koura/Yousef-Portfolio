"use client";

import Image, { getImageProps } from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { QuietLink } from "@/components/ui/QuietLink";
import { Reveal } from "@/components/ui/Reveal";
import { RevealImage } from "@/components/ui/RevealImage";
import { featuredProject } from "@/content/projects";
import { experience, publication } from "@/content/experience";
import HalftoneBackdrop from "@/components/home/HalftoneBackdrop";

gsap.registerPlugin(ScrollTrigger);

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

      {/* STATEMENT + ABOUT — asymmetric two-column on desktop, single column
          on mobile. Role line reads first at display scale; descriptor is
          quiet support; positioning statement is secondary. */}
      <section className="portal-statement-about" data-reveal>
        <div className="portal-statement-about__grid">
          <div className="portal-statement-about__statement">
            <p className="portal-statement__role">AI Engineer</p>
            <p className="portal-statement__descriptor">Applied AI · LLMs/RAG · Computer vision · Machine learning · Data</p>
            <p className="portal-statement__copy">I build the systems beneath a useful interface: <em>models, data, and decisions</em> brought into the same room.</p>
          </div>
          <div id="about" className="portal-statement-about__about">
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
          </div>
        </div>
      </section>

      {/* PROOF ROW — compact static skimmable evidence, no animation beyond
          the existing reduce-gated reveal. "up to" qualifiers preserved
          verbatim. Champagne on at most one element. */}
      <section className="portal-proof" data-reveal>
        <div className="portal-proof__grid">
          <div className="portal-proof__item">
            <div className="portal-proof__value portal-proof__value--accent">96%</div>
            <p className="portal-proof__kind">accuracy</p>
            <p className="portal-proof__project">Agri-Bot</p>
          </div>
          <div className="portal-proof__item">
            <div className="portal-proof__value">up to 97%</div>
            <p className="portal-proof__kind">F1</p>
            <p className="portal-proof__project">ITI</p>
          </div>
          <div className="portal-proof__item">
            <div className="portal-proof__value">up to 87%</div>
            <p className="portal-proof__kind">R²</p>
            <p className="portal-proof__project">PioPetro</p>
          </div>
          <div className="portal-proof__item">
            <div className="portal-proof__value">0.971 ± 0.030</div>
            <p className="portal-proof__kind">Precision@1000</p>
            <p className="portal-proof__project">Content Opportunity Scoring</p>
          </div>
        </div>
      </section>

      {/* SELECTED WORK — two calm leads of equal prominence, then a compact
          tappable index. One heading only (no duplicate kicker). */}
      <section id="work" className="portal-work-section" data-reveal role="region" aria-label="Selected work">
        <div className="portal-work__head">
          <h2 className="portal-work__title">Selected work</h2>
          <QuietLink href="/work" className="portal-ql">All work</QuietLink>
        </div>
        <div className="portal-work__leads">
          <article className="portal-work__lead">
            <figure className="portal-work__lead__media">
              <Image
                src="/projects/movenue.png"
                alt="Movenue — court management and booking platform"
                width={988}
                height={681}
                sizes="(max-width: 760px) 92vw, 46vw"
                className="portal-work__lead__image"
                loading="lazy"
                decoding="async"
              />
            </figure>
            <div className="portal-work__lead__body">
              <div className="portal-work__lead__status">
                <span
                  aria-hidden="true"
                  className="portal-work__lead__dot"
                />
                {featuredProject.status}
              </div>
              <h3 className="portal-work__lead__name">{featuredProject.name}</h3>
              <p className="portal-work__lead__summary">{featuredProject.summary}</p>
              <p className="portal-work__lead__proof">
                Live product — founder &amp; developer, hardened against concurrent double-booking with an integration test suite.
              </p>
              <a
                href={featuredProject.links[0].href}
                target="_blank"
                rel="noopener noreferrer"
                className="portal-work__lead__link"
              >
                Visit {featuredProject.name}
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </div>
          </article>
          <article className="portal-work__lead">
            <figure className="portal-work__lead__media">
              <Image
                src="/projects/rag-assistant.png"
                alt="Personal RAG Chatbot — grounded question answering over a knowledge base"
                width={1880}
                height={827}
                sizes="(max-width: 760px) 92vw, 46vw"
                className="portal-work__lead__image"
                loading="lazy"
                decoding="async"
              />
            </figure>
            <div className="portal-work__lead__body">
              <div className="portal-work__lead__status">
                <span
                  aria-hidden="true"
                  className="portal-work__lead__dot"
                />
                Completed
              </div>
              <h3 className="portal-work__lead__name">Personal RAG Chatbot</h3>
              <p className="portal-work__lead__summary">
                Grounded Q&amp;A chatbot over a personal knowledge base — LangChain chunking, ChromaDB retrieval, and Groq (Llama 4 Scout) generation behind a FastAPI service.
              </p>
              <p className="portal-work__lead__proof portal-work__lead__proof--stack">
                LangChain · ChromaDB · Groq Llama 4 Scout · FastAPI · May 2026
              </p>
              <a
                href="https://github.com/Yousef-koura/personal-rag-assistant"
                target="_blank"
                rel="noopener noreferrer"
                className="portal-work__lead__link"
              >
                View on GitHub
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </div>
          </article>
        </div>
        <div className="portal-work__index">
          <p className="portal-work__index-head">Also</p>
          <Link
            href="/work/agri-bot"
            className="portal-work__index-row"
          >
            <div className="portal-work__index-row__main">
              <p className="portal-work__index-row__name">Agri-Bot</p>
              <p className="portal-work__index-row__proof">20 FPS · 96% accuracy</p>
            </div>
            <p className="portal-work__index-row__stack">Graduation project · CV · Robotics</p>
            <span className="portal-work__index-row__arrow" aria-hidden="true">→</span>
          </Link>
          <Link
            href="/work/fmcg-pipeline"
            className="portal-work__index-row"
          >
            <div className="portal-work__index-row__main">
              <p className="portal-work__index-row__name">FMCG Data Engineering Pipeline</p>
              <p className="portal-work__index-row__stack portal-work__index-row__stack--inline">Data Engineering · Databricks · PySpark · Delta Lake · Apr 2026</p>
            </div>
            <span className="portal-work__index-row__arrow" aria-hidden="true">→</span>
          </Link>
          <Link
            href="/work/flyrank-content-opportunity-scoring"
            className="portal-work__index-row"
          >
            <div className="portal-work__index-row__main">
              <p className="portal-work__index-row__name">Content Opportunity Scoring</p>
              <p className="portal-work__index-row__proof">Precision@1000 0.971 ± 0.030 vs 0.828 ± 0.119 baseline</p>
            </div>
            <p className="portal-work__index-row__stack">AI ML Capstone · Jul–Sep 2026</p>
            <span className="portal-work__index-row__arrow" aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      {/* EXPERIENCE — compact uniform rows; one short summary line per role
          built from existing highlights data (visible without hover). "Digital
          HUB (D-HUB)" wraps at word boundaries. */}
      <section id="experience" className="portal-journey" data-reveal>
        <div className="portal-journey__head">
          <p className="portal-label">Experience</p>
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
                  <p className="portal-journey__summary">{entry.summary}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </section>

      {/* PUBLICATION — enlarged certificate thumbnail proportionate to text,
          explicit dimensions, lazy-loaded. */}
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
          <p className="portal-close__roles">Open to AI Engineer · ML Engineer · Computer Vision Engineer roles</p>
          <div className="portal-close__actions">
            <a className="portal-action" href="mailto:yousefahmed.ae20@gmail.com">EMAIL ME <ArrowUpRight size={15} /></a>
            <Link href="/contact" className="portal-action portal-action--quiet">CONTACT PAGE</Link>
          </div>
        </div>
      </section>
    </div>
  );
}

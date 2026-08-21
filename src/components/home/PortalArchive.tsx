"use client";

import Image, { getImageProps } from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { experience, publication } from "@/content/experience";

/**
 * Art-directed opening portrait (transparent cutouts): the desktop crop
 * serves lg+ viewports, the mobile crop below. Rendered via <picture>.
 */
const common = {
  alt: "Yousef Koura",
  sizes: "(max-width: 760px) 74vw, 40vw",
  loading: "eager" as const,
  fetchPriority: "high" as const,
};

const {
  props: { srcSet: portraitDesktopSrcSet },
} = getImageProps({ ...common, src: "/portrait/personal-image-desktop.png", width: 365, height: 684 });

const {
  props: { srcSet: portraitMobileSrcSet, ...portraitMobileRest },
} = getImageProps({ ...common, src: "/portrait/personal-image-mobile.png", width: 394, height: 634 });

const cards = [
  { code: "01 / LIVE", title: "Movenue", tag: "SaaS PLATFORM", image: "/projects/movenue.png", href: "https://movenue.vercel.app/", role: "Founder & Developer", evidence: "Live booking product" },
  { code: "02 / RAG", title: "RAG Assistant", tag: "APPLIED AI", image: "/projects/rag-assistant.png", href: "/work", role: "Developer", evidence: "Grounded Q&A system" },
  { code: "03 / CV", title: "AgriBot", tag: "COMPUTER VISION", image: "/projects/agribot.png", href: "/work", role: "Graduation Project", evidence: "20 FPS · 96% accuracy" },
  { code: "04 / DATA", title: "FMCG Intelligence", tag: "ANALYTICS", image: "/projects/fmcg-dashboard.png", href: "/work", role: "Developer", evidence: "Lakehouse pipeline" },
];

export function PortalArchive() {
  const heroRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [active, setActive] = useState(0);
  const drag = useRef({ start: 0, x: 0, active: false });
  const [dragX, setDragX] = useState(0);

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

  useEffect(() => {
    const targets = [...document.querySelectorAll<HTMLElement>(".portal-home [data-reveal]")];
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add("is-revealed"); observer.unobserve(entry.target); } }), { threshold: 0.12 });
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  const advance = (direction: number) => setActive((current) => (current + direction + cards.length) % cards.length);
  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    drag.current = { start: event.clientX, x: 0, active: true };
  };
  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!drag.current.active) return;
    drag.current.x = event.clientX - drag.current.start; setDragX(drag.current.x);
  };
  const onPointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!drag.current.active) return;
    event.currentTarget.releasePointerCapture(event.pointerId);
    const threshold = event.currentTarget.clientWidth * 0.1;
    if (Math.abs(drag.current.x) > threshold) advance(drag.current.x < 0 ? 1 : -1);
    drag.current.active = false; setDragX(0);
  };

  const revealProgress = reducedMotion ? 1 : progress;
  return (
    <div className="portal-home">
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

      <section className="portal-statement" data-reveal>
        <p className="portal-kicker">01 — SIGNAL / INTENT</p>
        {/* Positioning line — user-directed ("Machine Learning Engineer"); still provisional pending the final statement */}
        <div className="portal-statement__body">
          <p className="portal-statement__role">Machine Learning Engineer</p>
          <p className="portal-statement__copy">I build the systems beneath a useful interface: <em>models, data, and decisions</em> brought into the same room.</p>
        </div>
        <span className="portal-index" aria-hidden="true">01</span>
        <Image className="portal-statement__portrait" src="/portrait/personal-image-mobile.png" alt="" width={394} height={634} />
      </section>

      <section className="portal-releases" id="work" data-reveal>
        <div className="portal-releases__intro"><p className="portal-kicker">02 — SELECTED WORK</p><h2>PROJECT<br /><em>ARCHIVE.</em></h2><p>Applied AI, computer vision, and production-minded data products — each made to handle a real-world constraint.</p><div><Link href="/work" className="portal-action">VIEW ALL WORK <ArrowUpRight size={15} /></Link><a href="mailto:yousefahmed.ae20@gmail.com" className="portal-action portal-action--quiet">START A CONVERSATION</a></div></div>
        <div className="deck-wrap"><div className="deck-hint">DRAG / ARROW KEYS TO BROWSE</div><div className="portal-deck" tabIndex={0} role="region" aria-label="Featured projects" onKeyDown={(e) => { if (e.key === "ArrowRight") advance(1); if (e.key === "ArrowLeft") advance(-1); }} onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerUp} onPointerCancel={onPointerUp}>
          {cards.map((card, index) => { const position = (index - active + cards.length) % cards.length; const top = position === 0; return <article key={card.title} className="deck-card" style={{ zIndex: cards.length - position, transform: top ? `translate(${dragX}px, ${Math.abs(dragX) * -.05}px) rotate(${dragX * .045}deg)` : `translate(${position * 12}px, ${position * -9}px) rotate(${position * 2.2}deg) scale(${1 - position * .035})` }}><Image src={card.image} alt="" fill sizes="(max-width: 767px) 85vw, 40vw" /><div className="deck-card__wash" /><div className="deck-card__content"><span>{card.code}</span><h3>{card.title}</h3><small>{card.tag}</small><div className="deck-card__detail"><p>{card.role} · {card.evidence}</p><a href={card.href} target={card.href.startsWith("http") ? "_blank" : undefined} rel={card.href.startsWith("http") ? "noreferrer" : undefined}>OPEN PROJECT <ArrowUpRight size={13} /></a></div></div></article>; })}
        </div><div className="deck-dots">{cards.map((card, index) => <button key={card.title} onClick={() => setActive(index)} aria-label={`Show ${card.title}`} className={index === active ? "is-active" : ""} />)}</div></div>
      </section>

      <section className="portal-roster" data-reveal><p className="portal-kicker">03 — PRACTICE / FOCUS</p><div className="roster-row"><span>01 / SYSTEMS</span><strong>APPLIED AI</strong><i>Model → product</i></div><div className="roster-row"><span>02 / PERCEPTION</span><strong>COMPUTER VISION</strong><i>Vision → workflow</i></div><div className="roster-row"><span>03 / FOUNDATION</span><strong>DATA ENGINEERING</strong><i>Raw → reliable</i></div></section>

      <section className="portal-dates" id="experience" data-reveal><p className="portal-kicker">04 — EXPERIENCE / SELECTED</p><div className="dates-head"><span>PERIOD</span><span>ORGANIZATION</span><span>ROLE / FOCUS</span></div>{experience.map((item) => <div className="date-row" tabIndex={0} key={item.org}><span>{item.timeframe}</span><strong>{item.org}</strong><span>{item.role} · {item.location}<small className="experience-summary">{item.summary}</small></span></div>)}<Link className="portal-text-link" href="/experience">VIEW FULL EXPERIENCE <ArrowUpRight size={14} /></Link></section>

      <section className="portal-publication" id="publications" data-reveal><p className="portal-kicker">05 — PUBLICATION / 2024</p><div><Image className="publication-image" src="/projects/iugrc-certificate.png" alt="IUGRC 8 publication certificate" width={300} height={220} /><div><span className="publication-number">01</span><h2>{publication.title}</h2><p>{publication.venue}</p><p className="publication-date">{publication.date}</p><Link href="/publications" className="portal-action portal-action--quiet">READ PUBLICATION <ArrowUpRight size={15} /></Link></div></div></section>

      <section className="portal-close" id="contact"><p className="portal-kicker">06 — NEXT / CONTACT</p><h2>LET&apos;S MAKE<br />THE SIGNAL <em>USEFUL.</em></h2><p>Available for thoughtful AI, data, and product collaborations.</p><div><a className="portal-action" href="mailto:yousefahmed.ae20@gmail.com">EMAIL ME <ArrowUpRight size={15} /></a><Link href="/contact" className="portal-action portal-action--quiet">CONTACT PAGE</Link></div></section>
    </div>
  );
}

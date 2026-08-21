"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { experience, publication } from "@/content/experience";

const cards = [
  { code: "01 / LIVE", title: "Movenue", tag: "SaaS PLATFORM", image: "/projects/movenue.png", href: "https://movenue.vercel.app/" },
  { code: "02 / RAG", title: "RAG Assistant", tag: "APPLIED AI", image: "/projects/rag-assistant.png", href: "/work" },
  { code: "03 / CV", title: "AgriBot", tag: "COMPUTER VISION", image: "/projects/agribot.png", href: "/work" },
  { code: "04 / DATA", title: "FMCG Intelligence", tag: "ANALYTICS", image: "/projects/fmcg-dashboard.png", href: "/work" },
];

export function PortalArchive() {
  const heroRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
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

  return (
    <div className="portal-home">
      <section ref={heroRef} className="portal-hero" aria-label="Yousef Koura, machine learning engineer">
        <div className="portal-stage">
          <div className="portal-portrait-frame"><Image className="portal-stage__image" src="/portrait/yousef-portrait.jpeg" alt="Yousef Koura" fill priority sizes="(max-width: 760px) 74vw, 40vw" /></div>
          <div className="portal-panel portal-panel--left" style={{ transform: `translateX(${-progress * 108}%)` }} />
          <div className="portal-panel portal-panel--right" style={{ transform: `translateX(${progress * 108}%)` }} />
          <div className="portal-meta portal-meta--top">PORTFOLIO / 2026<br />MENOUFIA, EGYPT</div>
          <div className="portal-meta portal-meta--bottom">SCROLL TO OPEN</div>
          <h1 className="portal-title" style={{ transform: `scale(${1 + progress * .12})`, letterSpacing: `${.09 - progress * .075}em` }}><span style={{ transform: `translateX(${-progress * 62}%)` }}>YOU</span><span style={{ transform: `translateX(${progress * 62}%)` }}>SEF</span></h1>
        </div>
      </section>

      <section className="portal-statement">
        <p className="portal-kicker">01 — SIGNAL / INTENT</p>
        <p className="portal-statement__copy">I build the systems beneath a useful interface: <em>models, data, and decisions</em> brought into the same room.</p>
        <span className="portal-index" aria-hidden="true">01</span>
        <Image className="portal-statement__portrait" src="/portrait/yousef-portrait.jpeg" alt="" width={450} height={450} />
      </section>

      <section className="portal-releases" id="work">
        <div className="portal-releases__intro"><p className="portal-kicker">02 — SELECTED WORK</p><h2>PROJECT<br /><em>ARCHIVE.</em></h2><p>Applied AI, computer vision, and production-minded data products — each made to handle a real-world constraint.</p><div><Link href="/work" className="portal-action">VIEW ALL WORK <ArrowUpRight size={15} /></Link><a href="mailto:yousefahmed.ae20@gmail.com" className="portal-action portal-action--quiet">START A CONVERSATION</a></div></div>
        <div className="deck-wrap"><div className="deck-hint">DRAG / ARROW KEYS TO BROWSE</div><div className="portal-deck" tabIndex={0} role="region" aria-label="Featured projects" onKeyDown={(e) => { if (e.key === "ArrowRight") advance(1); if (e.key === "ArrowLeft") advance(-1); }} onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerUp} onPointerCancel={onPointerUp}>
          {cards.map((card, index) => { const position = (index - active + cards.length) % cards.length; const top = position === 0; return <article key={card.title} className="deck-card" style={{ zIndex: cards.length - position, transform: top ? `translate(${dragX}px, ${Math.abs(dragX) * -.05}px) rotate(${dragX * .045}deg)` : `translate(${position * 12}px, ${position * -9}px) rotate(${position * 2.2}deg) scale(${1 - position * .035})` }}><Image src={card.image} alt="" fill sizes="(max-width: 767px) 85vw, 40vw" /><div className="deck-card__wash" /><div className="deck-card__content"><span>{card.code}</span><h3>{card.title}</h3><small>{card.tag}</small></div></article>; })}
        </div><div className="deck-dots">{cards.map((card, index) => <button key={card.title} onClick={() => setActive(index)} aria-label={`Show ${card.title}`} className={index === active ? "is-active" : ""} />)}</div></div>
      </section>

      <section className="portal-roster"><p className="portal-kicker">03 — PRACTICE / FOCUS</p><div className="roster-row"><span>01 / SYSTEMS</span><strong>APPLIED AI</strong><i>Model → product</i></div><div className="roster-row"><span>02 / PERCEPTION</span><strong>COMPUTER VISION</strong><i>Vision → workflow</i></div><div className="roster-row"><span>03 / FOUNDATION</span><strong>DATA ENGINEERING</strong><i>Raw → reliable</i></div></section>

      <section className="portal-dates" id="experience"><p className="portal-kicker">04 — EXPERIENCE / SELECTED</p><div className="dates-head"><span>PERIOD</span><span>ORGANIZATION</span><span>ROLE / FOCUS</span></div>{experience.map((item) => <div className="date-row" key={item.org}><span>{item.timeframe}</span><strong>{item.org}</strong><span>{item.role} · {item.location}</span></div>)}<Link className="portal-text-link" href="/experience">VIEW FULL EXPERIENCE <ArrowUpRight size={14} /></Link></section>

      <section className="portal-publication" id="publications"><p className="portal-kicker">05 — PUBLICATION / 2024</p><div><span className="publication-number">01</span><h2>{publication.title}</h2><p>{publication.venue}</p><p className="publication-date">{publication.date}</p><Link href="/publications" className="portal-action portal-action--quiet">READ PUBLICATION <ArrowUpRight size={15} /></Link></div></section>

      <section className="portal-close" id="contact"><p className="portal-kicker">06 — NEXT / CONTACT</p><h2>LET&apos;S MAKE<br />THE SIGNAL <em>USEFUL.</em></h2><p>Available for thoughtful AI, data, and product collaborations.</p><div><a className="portal-action" href="mailto:yousefahmed.ae20@gmail.com">EMAIL ME <ArrowUpRight size={15} /></a><Link href="/contact" className="portal-action portal-action--quiet">CONTACT PAGE</Link></div></section>
    </div>
  );
}

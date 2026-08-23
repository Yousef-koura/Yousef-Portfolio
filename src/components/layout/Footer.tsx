import Link from "next/link";
import { ArrowUpRight, Mail, MapPin } from "lucide-react";
import { site } from "@/content/site";

function GithubIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function LinkedinIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4V8h4v2.5" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <div className="grid gap-14 sm:gap-12 lg:grid-cols-[1.4fr_1fr_1fr] lg:gap-12">
          <div>
            <p className="flex items-center gap-2.5 font-display text-2xl tracking-tight text-ink">
              <span aria-hidden="true" className="inline-block h-2 w-2 bg-champagne" />
              {site.name}
            </p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
              Machine Learning Engineer with a Mechatronics Engineering background — computer vision, applied AI, and
              end-to-end data engineering. Currently building Movenue.
            </p>
            <p className="mt-6 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted">
              <MapPin size={14} aria-hidden="true" />
              {site.location}
            </p>
          </div>

          <nav aria-label="Footer">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-champagne-strong">Menu</p>
            <ul className="mt-5 grid grid-cols-2 grid-flow-col grid-rows-3 gap-x-8 gap-y-3">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-muted transition-colors hover:text-champagne-strong">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-champagne-strong">Connect</p>
            <ul className="mt-5 flex flex-col gap-3">
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-champagne-strong"
                >
                  <Mail size={14} aria-hidden="true" />
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={site.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-champagne-strong"
                >
                  <LinkedinIcon />
                  LinkedIn
                  <ArrowUpRight size={12} aria-hidden="true" />
                </a>
              </li>
              <li>
                <a
                  href={site.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-champagne-strong"
                >
                  <GithubIcon />
                  GitHub
                  <ArrowUpRight size={12} aria-hidden="true" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-xs text-muted">© {new Date().getFullYear()} Yousef Koura. All rights reserved.</p>
          <p className="font-mono text-xs text-muted">Built with Next.js, TypeScript &amp; Tailwind CSS.</p>
        </div>
      </div>
    </footer>
  );
}
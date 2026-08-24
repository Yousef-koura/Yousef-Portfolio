import type { ComponentType } from "react";
import { ArrowUpRight, Mail, MapPin } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionFrame } from "@/components/ui/SectionFrame";
import { site } from "@/content/site";

/* Brand marks copied verbatim from the Footer's local icons (kept private
   there) so the contact rows read with the exact same conventions without
   touching the shared layout component. */
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

type Channel = {
  label: string;
  icon: ComponentType<{ size?: number }>;
  value: string;
  href?: string;
  external?: boolean;
};

const channels: Channel[] = [
  { label: "Email", icon: Mail, value: site.email, href: `mailto:${site.email}` },
  { label: "LinkedIn", icon: LinkedinIcon, value: "linkedin.com/in/yousefkoura", href: site.linkedin, external: true },
  { label: "GitHub", icon: GithubIcon, value: "github.com/Yousef-koura", href: site.github, external: true },
  { label: "Location", icon: MapPin, value: site.location },
];

/**
 * CONTACT CHANNELS — the quiet editorial metadata grammar (Publications'
 * hairline dl rows): mono label left, confirmed value right, one hairline
 * between rows. No card wall; links reuse the Footer's interaction language
 * (muted → champagne-strong color transition + ArrowUpRight on externals).
 */
export function ContactChannels() {
  return (
    <SectionFrame label="Channels">
      <dl>
        {channels.map((channel, index) => (
          <Reveal key={channel.label} delay={index * 0.06}>
            <div className="flex flex-col gap-2 border-b border-line py-6 sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:py-7">
              <dt className="font-mono text-xs uppercase tracking-widest text-muted">{channel.label}</dt>
              <dd className="text-sm text-muted sm:text-right">
                {channel.href ? (
                  <a
                    href={channel.href}
                    target={channel.external ? "_blank" : undefined}
                    rel={channel.external ? "noopener noreferrer" : undefined}
                    className="inline-flex items-center gap-2 transition-colors duration-300 hover:text-champagne-strong"
                  >
                    <channel.icon size={14} aria-hidden="true" />
                    {channel.value}
                    <ArrowUpRight size={12} aria-hidden="true" />
                    {channel.external ? <span className="sr-only"> (opens in a new tab)</span> : null}
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-2">
                    <channel.icon size={14} aria-hidden="true" />
                    {channel.value}
                  </span>
                )}
              </dd>
            </div>
          </Reveal>
        ))}
      </dl>
    </SectionFrame>
  );
}

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Eyebrow } from "@/components/ui/Eyebrow";

type PagePlaceholderProps = {
  title: string;
  eyebrow: string;
  description: string;
};

export function PagePlaceholder({ title, eyebrow, description }: PagePlaceholderProps) {
  return (
    <section className="flex min-h-svh items-center pb-24 pt-32">
      <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
        <Eyebrow className="justify-center">{eyebrow}</Eyebrow>
        <h1 className="mt-6 font-display text-5xl leading-[1.02] tracking-tight text-ink sm:text-6xl">{title}</h1>
        <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted">{description}</p>
        <p className="mx-auto mt-6 max-w-xl font-mono text-xs uppercase tracking-widest text-champagne">
          Phase 4A · Home page only — this section is part of a later milestone
        </p>
        <div className="mt-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 font-mono text-xs uppercase tracking-[0.18em] text-ink transition-colors hover:border-champagne hover:text-champagne"
          >
            <ArrowLeft size={14} aria-hidden="true" />
            Back to home
          </Link>
        </div>
      </div>
    </section>
  );
}
import {
  SiApachespark,
  SiDatabricks,
  SiFastapi,
  SiHuggingface,
  SiHtml5,
  SiLangchain,
  SiNextdotjs,
  SiNvidia,
  SiOnnx,
  SiPostgresql,
  SiReact,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
  SiUltralytics,
  SiVitest,
} from "@icons-pack/react-simple-icons";
import {
  ArrowLeftRight,
  Database,
  Layers,
  Network,
  Sparkles,
  Star,
  Workflow,
} from "lucide-react";
import type { TechKey } from "@/content/projects";

/**
 * Tech-stack icon row for WORK detail pages. Brand marks come from
 * @icons-pack/react-simple-icons (tree-shakeable named imports); concepts
 * without a brand mark render a neutral Lucide glyph chip instead. Every
 * entry is a confirmed technology from the project's sourced stack — the
 * map never introduces one.
 */
const brandIcons = {
  nextdotjs: SiNextdotjs,
  typescript: SiTypescript,
  supabase: SiSupabase,
  tailwindcss: SiTailwindcss,
  postgresql: SiPostgresql,
  vitest: SiVitest,
  nvidia: SiNvidia,
  ultralytics: SiUltralytics,
  fastapi: SiFastapi,
  langchain: SiLangchain,
  huggingface: SiHuggingface,
  onnx: SiOnnx,
  react: SiReact,
  databricks: SiDatabricks,
  apachespark: SiApachespark,
  html5: SiHtml5,
} as const;

const glyphIcons = {
  network: Network,
  layers: Layers,
  transfer: ArrowLeftRight,
  database: Database,
  sparkles: Sparkles,
  workflow: Workflow,
  star: Star,
} as const;

export function TechStackRow({
  items,
  className = "",
}: {
  items: readonly { label: string; key: TechKey }[];
  className?: string;
}) {
  return (
    <ul className={`flex flex-wrap gap-x-7 gap-y-4 ${className}`}>
      {items.map((item) => {
        const BrandIcon = brandIcons[item.key as keyof typeof brandIcons];
        const Glyph = glyphIcons[item.key as keyof typeof glyphIcons];

        return (
          <li key={item.label} className="group/tech">
            <span className="inline-flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-full border border-line bg-surface text-muted transition-colors duration-300 group-hover/tech:border-champagne/60 group-hover/tech:text-champagne group-focus-within/tech:border-champagne/60 group-focus-within/tech:text-champagne">
                {BrandIcon ? (
                  <BrandIcon size={16} aria-hidden="true" />
                ) : Glyph ? (
                  <Glyph size={16} strokeWidth={1.5} aria-hidden="true" />
                ) : null}
              </span>
              <span className="font-mono text-[11px] tracking-[0.04em] text-muted transition-colors duration-300 group-hover/tech:text-ink group-focus-within/tech:text-ink">
                {item.label}
              </span>
            </span>
          </li>
        );
      })}
    </ul>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectDetailPage } from "@/components/work/ProjectDetailPage";
import {
  getAdjacentProjects,
  getProjectDetail,
  projectSlugs,
} from "@/content/projects";

/**
 * WORK detail — PHASE 4B: every project gets a page. `generateStaticParams`
 * pre-renders all seven slugs and `dynamicParams = false` rejects anything
 * else at request time; unknown slugs 404 by construction.
 */
export function generateStaticParams() {
  return projectSlugs.map((slug) => ({ slug }));
}

export const dynamicParams = false;

type WorkDetailParams = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: WorkDetailParams): Promise<Metadata> {
  const { slug } = await params;
  const detail = getProjectDetail(slug);
  if (!detail) return {};
  return {
    title: `${detail.name} — Work`,
    description: detail.summary,
  };
}

export default async function WorkDetailPage({ params }: WorkDetailParams) {
  const { slug } = await params;
  const detail = getProjectDetail(slug);
  if (!detail) notFound();

  const { previous, next } = getAdjacentProjects(detail.slug);

  return <ProjectDetailPage detail={detail} previous={previous} next={next} />;
}

import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { FeaturedProjectCard, ProjectCard } from "@/components/cards/ProjectCard";
import { featuredProject, secondaryProjects } from "@/content/projects";

export function SelectedWork() {
  return (
    <Section id="work">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal>
          <SectionHeader
            eyebrow="Selected Work"
            title="Evidence, not adjectives."
            description="A curated look at the work that shows how I build — from production SaaS to computer vision systems and data pipelines."
            action={
              <ButtonLink href="/work" variant="ghost">
                All work
              </ButtonLink>
            }
          />
        </Reveal>

        <Reveal delay={0.05}>
          <FeaturedProjectCard project={featuredProject} />
        </Reveal>

        <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {secondaryProjects.map((project, index) => (
            <Reveal key={project.name} delay={0.05 * (index + 1)}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
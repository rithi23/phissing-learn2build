import { featuredProjects } from "@/lib/data";
import { Badge } from "@/components/ui/badge";

export function FeaturedProjects() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-600">
          Featured Projects
        </p>
        <h2 className="mt-2 text-3xl font-semibold text-slate-950">
          What the community is building
        </h2>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {featuredProjects.map((project) => (
            <article
              key={project.id}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm transition-colors hover:bg-white"
            >
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-lg font-semibold text-slate-950">
                  {project.title}
                </h3>
                <Badge>{project.stage}</Badge>
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                {project.summary}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.stack.map((item) => (
                  <span
                    key={item}
                    className="rounded-full bg-white px-3 py-1 text-xs text-slate-600 ring-1 ring-slate-200"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

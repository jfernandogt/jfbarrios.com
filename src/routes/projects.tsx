import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Proyectos — Alex Carter" },
      {
        name: "description",
        content: "Proyectos seleccionados y experimentos propios de Alex Carter.",
      },
    ],
  }),
  component: ProjectsPage,
});

const projects = [
  {
    title: "Gestor de tareas estilo Linear",
    description:
      "Un gestor de tareas controlado por teclado construido con React, tRPC y Postgres. UI optimista en todas partes.",
    tags: ["React", "tRPC", "Postgres"],
    href: "#",
    accent: "from-cyan-400/20 to-blue-500/20",
  },
  {
    title: "Bot de revisión de código con IA",
    description:
      "Bot de GitHub que revisa PRs usando LLMs, con ventana de contexto inteligente y sugerencias en línea.",
    tags: ["Node", "OpenAI", "GitHub Apps"],
    href: "#",
    accent: "from-fuchsia-400/20 to-purple-500/20",
  },
  {
    title: "Pizarrón colaborativo en tiempo real",
    description:
      "Canvas infinito multijugador con CRDTs, cursores de presencia y sincronización offline-first.",
    tags: ["Yjs", "Canvas", "WebRTC"],
    href: "#",
    accent: "from-emerald-400/20 to-teal-500/20",
  },
  {
    title: "Kit de sistema de diseño",
    description:
      "Una librería de componentes open-source con Tailwind y Radix que alimenta más de 40 aplicaciones.",
    tags: ["Tailwind", "Radix", "TS"],
    href: "#",
    accent: "from-amber-400/20 to-orange-500/20",
  },
];

function ProjectsPage() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <header className="mb-14 max-w-2xl animate-fade-up">
        <p className="font-mono text-xs uppercase tracking-widest text-primary">Proyectos</p>
        <h1 className="mt-3 font-display text-5xl font-bold">Cosas que he construido.</h1>
        <p className="mt-4 text-muted-foreground">
          Algunos proyectos seleccionados de trabajo con clientes y experimentos propios.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((p, i) => (
          <a
            key={p.title}
            href={p.href}
            className="group relative overflow-hidden rounded-2xl border border-border bg-[image:var(--gradient-card)] p-8 hover-lift animate-fade-up"
            style={{ animationDelay: `${i * 90}ms` }}
          >
            <div
              className={`pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-gradient-to-br ${p.accent} blur-2xl transition-transform duration-700 group-hover:scale-150`}
            />
            <div className="relative">
              <div className="flex items-start justify-between">
                <h3 className="font-display text-2xl font-semibold">{p.title}</h3>
                <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-primary" />
              </div>
              <p className="mt-3 text-sm text-muted-foreground">{p.description}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-border px-3 py-1 font-mono text-xs text-muted-foreground"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { Mail } from "lucide-react";
import { GitHubIcon, TwitterXIcon, LinkedInIcon } from "@/components/icons";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contacto — Alex Carter" },
      {
        name: "description",
        content:
          "Contáctame para proyectos, colaboraciones o simplemente para saludar.",
      },
    ],
  }),
  component: ContactPage,
});

const channels = [
  {
    Icon: Mail,
    label: "Email",
    value: "me@jfbarrios.com",
    href: "mailto:me@jfbarrios.com",
  },
  {
    Icon: GitHubIcon,
    label: "GitHub",
    value: "@jfernandogt",
    href: "https://github.com/jfernandogt",
  },
  {
    Icon: TwitterXIcon,
    label: "X",
    value: "@jfergt",
    href: "https://x.com/jfergt",
  },
  {
    Icon: LinkedInIcon,
    label: "LinkedIn",
    value: "in/jfbarrios",
    href: "https://www.linkedin.com/in/jfbarrios/",
  },
];

function ContactPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-24 text-center">
      <div className="animate-fade-up">
        <p className="font-mono text-xs uppercase tracking-widest text-primary">
          Contacto
        </p>
        <h1 className="mt-3 font-display text-5xl font-bold md:text-6xl">
          Construyamos <span className="text-gradient">algo</span> juntos.
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
          Actualmente estoy abierto a trabajo freelance y colaboraciones
          interesantes. Elige tu canal favorito a continuación.
        </p>
      </div>

      <div className="mt-12 grid gap-4 sm:grid-cols-2">
        {channels.map((c, i) => (
          <a
            key={c.label}
            href={c.href}
            target="_blank"
            rel="noreferrer"
            className="group flex items-center gap-4 rounded-2xl border border-border bg-[image:var(--gradient-card)] p-5 text-left hover-lift animate-fade-up"
            style={{ animationDelay: `${i * 90}ms` }}
          >
            <span className="grid h-12 w-12 place-items-center rounded-xl bg-[image:var(--gradient-hero)] text-primary-foreground transition-transform group-hover:scale-110">
              <c.Icon className="h-5 w-5" />
            </span>
            <span>
              <span className="block font-mono text-xs uppercase text-muted-foreground">
                {c.label}
              </span>
              <span className="block font-medium">{c.value}</span>
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}

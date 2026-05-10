import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles } from "lucide-react";
import { GitHubIcon, TwitterXIcon, LinkedInIcon } from "@/components/icons";
import heroBg from "@/assets/hero-bg.webp";
import avatar from "@/assets/avatar.webp";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Fernando Barrios — Software Architect & Full-Stack Engineer" },
      {
        name: "description",
        content:
          "Ingeniero de software con más de 14 años de experiencia diseñando e implementando soluciones Full Stack robustas, escalables y de alto impacto.",
      },
    ],
  }),
  component: HomePage,
});

const stack = [
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "PostgreSQL",
  "Docker",
  "Kubernetes",
  "AWS",
  "GCP",
  "Firebase",
];

function HomePage() {
  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden">
        {/*
         * Performance: this is the Largest Contentful Paint (LCP) element.
         * - fetchpriority="high" tells the browser to load it ASAP.
         * - loading="eager" prevents any lazy-load deferral.
         * - width/height match the actual asset dimensions to avoid CLS.
         * - aria-hidden + alt="" keeps screen readers quiet for decorative images.
         */}
        <img
          src={heroBg}
          alt=""
          aria-hidden
          fetchPriority="high"
          loading="eager"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover opacity-40"
          width={1536}
          height={1024}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background" />

        {/*
         * Performance: blob decorations are animated with transform+scale only
         * (compositor-friendly). will-change: transform promotes them to their
         * own GPU layer so the browser doesn't repaint the page on every frame.
         */}
        <div
          className="absolute -left-20 top-20 h-80 w-80 rounded-full bg-primary/30 blur-3xl animate-blob"
          style={{ willChange: "transform" }}
        />
        <div
          className="absolute right-0 top-40 h-96 w-96 rounded-full bg-accent/30 blur-3xl animate-blob [animation-delay:-4s]"
          style={{ willChange: "transform" }}
        />

        <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-10 px-6 pb-24 pt-24 text-center md:pt-32">
          <div className="animate-scale-in">
            {/*
             * Performance: the avatar floats via CSS animation.
             * will-change: transform keeps it on its own layer so the float
             * animation doesn't trigger main-thread repaints.
             * The image is displayed at 128 × 128 CSS px (h-32 w-32 = 8rem).
             * width/height are set to the display size (128) to hint aspect ratio
             * and avoid layout shifts; the actual asset is larger (768px) and
             * will be served at whatever resolution the browser needs.
             */}
            <div
              className="relative mx-auto h-32 w-32 rounded-full p-1 bg-[image:var(--gradient-hero)] animate-float"
              style={{ willChange: "transform" }}
            >
              <img
                src={avatar}
                alt="Retrato de Fernando Barrios"
                className="h-full w-full rounded-full object-cover"
                width={128}
                height={128}
                loading="eager"
                decoding="async"
              />
            </div>
          </div>

          <div className="space-y-6 animate-fade-up [animation-delay:120ms]">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-1.5 text-xs font-mono text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              Disponible para nuevos proyectos
            </span>
            <h1 className="font-display text-5xl font-bold tracking-tight md:text-7xl">
              Hola, soy Fernando —<br />
              <span className="text-gradient">
                construyo cosas para la web.
              </span>
            </h1>
            <p className="mx-auto max-w-xl text-lg text-muted-foreground">
              Ingeniero de software con más de 14 años de experiencia en diseño,
              arquitectura y liderazgo de soluciones Full Stack. Apasionado por
              la innovación, la mentoría y las buenas prácticas de ingeniería.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 animate-fade-up [animation-delay:240ms]">
            <Link
              to="/projects"
              className="group inline-flex items-center gap-2 rounded-full bg-[image:var(--gradient-hero)] px-6 py-3 text-sm font-medium text-primary-foreground shadow-[var(--shadow-glow)] transition-transform hover:scale-105"
            >
              Ver mi trabajo
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-6 py-3 text-sm font-medium hover-lift"
            >
              Contáctame
            </Link>
          </div>

          <div className="flex gap-4 animate-fade-up [animation-delay:360ms]">
            {[
              {
                href: "https://github.com/jfernandogt",
                Icon: GitHubIcon,
                label: "GitHub",
              },
              {
                href: "https://x.com/jfergt",
                Icon: TwitterXIcon,
                label: "X",
              },
              {
                href: "https://www.linkedin.com/in/jfbarrios/",
                Icon: LinkedInIcon,
                label: "LinkedIn",
              },
            ].map(({ href, Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="grid h-11 w-11 place-items-center rounded-full border border-border bg-card/50 text-muted-foreground transition-all hover:scale-110 hover:border-primary hover:text-primary"
              >
                <Icon className="h-4 w-4" aria-hidden />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* MARQUEE STACK */}
      <section className="border-y border-border/60 bg-card/30 py-6 overflow-hidden">
        {/*
         * Performance: the marquee uses a CSS transform animation (translateX)
         * which runs entirely on the compositor thread — no JS, no layout.
         * will-change: transform keeps it on its own GPU layer.
         */}
        <div
          className="flex animate-marquee gap-12 whitespace-nowrap font-mono text-sm text-muted-foreground"
          style={{ willChange: "transform" }}
          aria-hidden
        >
          {[...stack, ...stack, ...stack].map((s, i) => (
            <span key={i} className="flex items-center gap-12">
              {s}
              <span className="text-primary">●</span>
            </span>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="grid gap-12 md:grid-cols-2">
          <div className="space-y-4 animate-fade-up">
            <p className="font-mono text-xs uppercase tracking-widest text-primary">
              Acerca de
            </p>
            <h2 className="font-display text-4xl font-bold">
              Arquitecto de software, líder técnico, eterno curioso.
            </h2>
          </div>
          <div className="space-y-4 text-muted-foreground animate-fade-up [animation-delay:120ms]">
            <p>
              Con más de 14 años de experiencia Full Stack, he liderado equipos
              y arquitecturas en startups, banca y empresas de salud. Desde
              decisiones de arquitectura hasta gobernanza técnica — me muevo con
              comodidad en toda la pila.
            </p>
            <p>
              Actualmente como Software Architect en Telus.com, impulso la
              adopción de flujos de trabajo con IA, establezco estándares de
              plataforma y alineo la hoja de ruta técnica con los objetivos de
              negocio.
            </p>
            <Link
              to="/projects"
              className="story-link inline-flex text-foreground"
            >
              Ver trabajo seleccionado →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

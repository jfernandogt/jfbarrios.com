import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Proyectos — Fernando Barrios" },
      {
        name: "description",
        content:
          "Proyectos seleccionados y experimentos propios de Fernando Barrios.",
      },
    ],
  }),
  component: ProjectsPage,
});

const projects = [
  {
    title: "Kindle Whispersync",
    description:
      "Herramienta para aprender idiomas que replica la experiencia de Kindle Whispersync: sincroniza un audiolibro con su texto para que puedas leer y escuchar al mismo tiempo. Construida con recursos gratuitos y de dominio público — texto de Project Gutenberg, audio de LibriVox y alineación forzada con Gentle — genera un visor web que resalta cada palabra en tiempo real conforme avanza el audio. Hacer clic en cualquier palabra salta a ese punto del audio, ideal para repetir frases difíciles. Incluye control de velocidad y modo oscuro.",
    tags: ["HTML", "CSS", "JavaScript", "GitHub Pages", "Gentle"],
    href: "https://jfernandogt.github.io/gentler-viewer/",
    accent: "from-cyan-400/20 to-blue-500/20",
  },
  {
    title: "Plataforma de gestión para flota Uber",
    description:
      "Aplicación privada para una empresa con más de 100 vehículos operando en Uber. Centraliza el control de gastos por vehículo y piloto, y se sincroniza con la plataforma de Uber para obtener automáticamente el balance de cada conductor. Reemplazó procesos manuales en hojas de cálculo y dio visibilidad en tiempo real sobre la rentabilidad de la flota.",
    tags: ["React", "Node", "PostgreSQL", "Uber API"],
    href: "#",
    accent: "from-emerald-400/20 to-teal-500/20",
  },
  {
    title: "Seguro de vida digital — Seguros Universales & Vita",
    description:
      "Plataforma web desarrollada para Seguros Universales y Vita Corredores de Seguros que permite adquirir un seguro de vida con coberturas básicas por Q45 al mes. El objetivo principal fue democratizar el acceso a protección de salud para personas que tradicionalmente quedan fuera del sistema de seguros, permitiéndoles contratar de forma completamente digital, sin intermediarios y desde cualquier dispositivo.",
    tags: ["Next.js", "Node.js", "Tailwind"],
    href: "https://www.facebook.com/SegurosGT/",
    accent: "from-rose-400/20 to-pink-500/20",
  },
  {
    title: "Precalificación de tarjeta de crédito — Banco GTC",
    description:
      "Módulo dentro de la app móvil de Banco GTC que permite a nuevos clientes precalificarse para una tarjeta de crédito de forma completamente digital. Antes de este módulo, el proceso obligaba a los interesados a ir a una agencia o llamar a un call center. El flujo recopila la información del solicitante, evalúa su elegibilidad en tiempo real y entrega una respuesta inmediata, todo sin salir de la aplicación.",
    tags: ["Ionic", "Node.js", "Azure"],
    href: "#",
    accent: "from-amber-400/20 to-orange-500/20",
  },
  {
    title: "Shottr para Raycast",
    description:
      "Extensión de Raycast que integra todos los comandos de Shottr directamente desde el launcher. Permite capturar pantalla completa, área, ventana, scroll, scroll inverso y captura diferida con argumento de tiempo; además de OCR, cargar desde portapapeles o archivo, y gestionar uploads, todo sin salir del teclado.",
    tags: ["Raycast", "TypeScript", "Shottr"],
    href: "https://www.raycast.com/fernando_barrios/shottr",
    accent: "from-fuchsia-400/20 to-purple-500/20",
  },
  {
    title: "Fuel iX para Raycast",
    description:
      "Extensión de Raycast para interactuar con Fuel iX, la plataforma enterprise que convierte experimentos de IA fragmentados en un ecosistema de producción escalable y seguro. Permite chatear con cualquier modelo LLM — Claude, ChatGPT y otros — directamente desde la Mac, sin abrir ningún navegador ni cambiar de contexto.",
    tags: ["Raycast", "TypeScript", "Fuel iX", "LLM"],
    href: "https://www.raycast.com/fernando_barrios/fuelix",
    accent: "from-violet-400/20 to-indigo-500/20",
  },
  {
    title: "Sitio web y plataforma e-learning — Laserants",
    description:
      "Sitio web institucional para Laserants que presenta su oferta de cursos y bootcamps de tecnología. Además del sitio principal, integré Moodle como plataforma de aprendizaje en línea, permitiéndoles impartir cursos de forma virtual con gestión de estudiantes, contenido y evaluaciones, todo bajo su propia marca.",
    tags: ["WordPress", "Moodle"],
    href: "https://www.laserants.com/",
    accent: "from-lime-400/20 to-green-500/20",
  },
];

function ProjectsPage() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <header className="mb-14 max-w-2xl animate-fade-up">
        <p className="font-mono text-xs uppercase tracking-widest text-primary">
          Proyectos
        </p>
        <h1 className="mt-3 font-display text-5xl font-bold">
          Cosas que he construido.
        </h1>
        <p className="mt-4 text-muted-foreground">
          Algunos proyectos seleccionados de trabajo con clientes y experimentos
          propios.
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
                <h3 className="font-display text-2xl font-semibold">
                  {p.title}
                </h3>
                <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-primary" />
              </div>
              <p className="mt-3 text-sm text-muted-foreground">
                {p.description}
              </p>
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

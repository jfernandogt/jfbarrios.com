import { Link } from "@tanstack/react-router";
import { Code2 } from "lucide-react";

const links = [
  { to: "/", label: "Inicio" },
  { to: "/projects", label: "Proyectos" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contacto" },
] as const;

export function Header() {
  return (
    <header className="sticky top-0 z-50 glass">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          to="/"
          className="flex items-center gap-2 font-display text-lg font-bold"
        >
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-[image:var(--gradient-hero)] text-primary-foreground shadow-[var(--shadow-glow)]">
            <Code2 className="h-5 w-5" />
          </span>
          <span className="hidden text-gradient sm:inline">jfbarrios.com</span>
        </Link>
        <ul className="flex items-center gap-6 text-sm text-muted-foreground">
          {links.map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                className="story-link transition-colors hover:text-foreground"
                activeProps={{ className: "story-link text-foreground" }}
                activeOptions={{ exact: l.to === "/" }}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

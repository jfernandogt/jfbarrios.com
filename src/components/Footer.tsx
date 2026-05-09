import { Github, Twitter, Linkedin, Mail } from "lucide-react";

const socials = [
  { href: "https://github.com", Icon: Github, label: "GitHub" },
  { href: "https://twitter.com", Icon: Twitter, label: "Twitter" },
  { href: "https://linkedin.com", Icon: Linkedin, label: "LinkedIn" },
  { href: "mailto:hello@alex.dev", Icon: Mail, label: "Email" },
];

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border/60">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Alex Carter. Hecho con cariño.
        </p>
        <div className="flex items-center gap-3">
          {socials.map(({ href, Icon, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className="grid h-10 w-10 place-items-center rounded-full border border-border bg-card/50 text-muted-foreground transition-all hover:scale-110 hover:border-primary hover:text-primary"
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

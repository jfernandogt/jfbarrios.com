import { Mail } from "lucide-react";
import { GitHubIcon, TwitterXIcon, LinkedInIcon } from "@/components/icons";

const socials = [
  { href: "https://github.com/jfernandogt", Icon: GitHubIcon, label: "GitHub" },
  { href: "https://x.com/jfergt", Icon: TwitterXIcon, label: "Twitter" },
  {
    href: "https://www.linkedin.com/in/jfbarrios/",
    Icon: LinkedInIcon,
    label: "LinkedIn",
  },
  { href: "mailto:me@jfbarrios.com", Icon: Mail, label: "Email" },
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

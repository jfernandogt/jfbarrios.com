import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Mail, Send, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { GitHubIcon, TwitterXIcon, LinkedInIcon } from "@/components/icons";
import {
  sendContactEmail,
  contactSchema,
  type ContactFormValues,
} from "@/lib/send-email";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contacto — Fernando Barrios" },
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
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", message: "" },
  });

  const { isSubmitting } = form.formState;

  async function onSubmit(values: ContactFormValues) {
    try {
      await sendContactEmail({ data: values });
      setSubmitted(true);
      form.reset();
      toast.success("¡Mensaje enviado!", {
        description: "Te responderé lo antes posible.",
      });
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Ocurrió un error. Inténtalo de nuevo.";
      toast.error("No se pudo enviar", { description: message });
    }
  }

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

      {/* ── Contact Form ───────────────────────────────────────────── */}
      <div
        className="mt-16 animate-fade-up"
        style={{ animationDelay: "360ms" }}
      >
        <div className="rounded-2xl border border-border bg-[image:var(--gradient-card)] p-8 text-left">
          <h2 className="font-display text-2xl font-bold">
            O envíame un mensaje directo
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Completa el formulario y te responderé a la brevedad.
          </p>

          {submitted ? (
            <div className="mt-8 flex flex-col items-center gap-3 py-8 text-center">
              <span className="grid h-16 w-16 place-items-center rounded-full bg-[image:var(--gradient-hero)] text-primary-foreground">
                <Send className="h-7 w-7" />
              </span>
              <p className="font-medium">¡Mensaje enviado!</p>
              <p className="text-sm text-muted-foreground">
                Revisa tu bandeja de salida —{" "}
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-primary underline-offset-2 hover:underline"
                >
                  enviar otro
                </button>
              </p>
            </div>
          ) : (
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="mt-6 space-y-5"
            >
              {/* Name */}
              <div className="space-y-1.5">
                <Label htmlFor="name">Nombre</Label>
                <Input
                  id="name"
                  placeholder="Tu nombre"
                  autoComplete="name"
                  disabled={isSubmitting}
                  {...form.register("name")}
                />
                {form.formState.errors.name && (
                  <p className="text-xs text-destructive">
                    {form.formState.errors.name.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <Label htmlFor="email">Correo electrónico</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="tu@correo.com"
                  autoComplete="email"
                  disabled={isSubmitting}
                  {...form.register("email")}
                />
                {form.formState.errors.email && (
                  <p className="text-xs text-destructive">
                    {form.formState.errors.email.message}
                  </p>
                )}
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <Label htmlFor="message">Mensaje</Label>
                <Textarea
                  id="message"
                  placeholder="Cuéntame sobre tu proyecto o idea…"
                  rows={5}
                  disabled={isSubmitting}
                  {...form.register("message")}
                />
                {form.formState.errors.message && (
                  <p className="text-xs text-destructive">
                    {form.formState.errors.message.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full gap-2 bg-[image:var(--gradient-hero)] text-primary-foreground"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Enviando…
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Enviar mensaje
                  </>
                )}
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

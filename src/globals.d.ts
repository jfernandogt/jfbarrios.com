/// <reference types="vite/client" />

// ── Google Analytics 4 global types ─────────────────────────────────────────

type GtagCommand = "config" | "event" | "js" | "set";

interface Window {
  gtag: (
    command: GtagCommand,
    target: string | Date,
    params?: Record<string, unknown>
  ) => void;
  dataLayer: unknown[];
}

// ── Vite env variables ───────────────────────────────────────────────────────

interface ImportMetaEnv {
  readonly VITE_SEO_TITLE?: string;
  readonly VITE_SEO_DESCRIPTION?: string;
  readonly VITE_GA_MEASUREMENT_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

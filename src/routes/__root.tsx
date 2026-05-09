import {
  Outlet,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  Link,
} from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { lazy, Suspense } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageTransition } from "@/components/PageTransition";
import { Toaster } from "@/components/ui/sonner";
import { fetchPublicationSeo } from "@/lib/hashnode";
import appCss from "../styles.css?url";
// LCP image preload URL — imported so Vite hashes it correctly in production.
import heroBgUrl from "../assets/hero-bg.jpg?url";

// MouseTrail is a pure cosmetic effect — defer its JS off the critical path.
const MouseTrail = lazy(() =>
  import("@/components/MouseTrail").then((m) => ({ default: m.MouseTrail }))
);

/** Non-blocking Google Fonts loader (media-swap trick, no render-block). */
const FONTS_URL =
  "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap";

const fontsLoaderScript = `
(function(){
  var l=document.createElement('link');
  l.rel='stylesheet';
  l.href='${FONTS_URL}';
  l.media='print';
  l.onload=function(){this.media='all'};
  document.head.appendChild(l);
})();
`;

// ── SEO defaults ────────────────────────────────────────────────────────────
// These are used when Hashnode's publication SEO fields are not set.
// Override them by setting VITE_SEO_TITLE and VITE_SEO_DESCRIPTION in your
// .env file (or the Cloudflare Workers / Wrangler environment variables).

const DEFAULT_SEO_TITLE =
  import.meta.env.VITE_SEO_TITLE ?? "JF Barrios — Desarrollador Full-Stack";
const DEFAULT_SEO_DESCRIPTION =
  import.meta.env.VITE_SEO_DESCRIPTION ??
  "Portafolio, blog y proyectos de JF Barrios — construyendo experiencias web increíbles.";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center animate-fade-up">
        <h1 className="text-7xl font-bold text-gradient">404</h1>
        <h2 className="mt-4 text-xl font-semibold">Página no encontrada</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          La página que buscas no existe o ha sido movida.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex rounded-md bg-[image:var(--gradient-hero)] px-5 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90"
        >
          Ir al inicio
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold">
          Esta página no cargó correctamente
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Intenta recargar la página.
        </p>
        <button
          onClick={() => {
            router.invalidate();
            reset();
          }}
          className="mt-6 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
        >
          Intentar de nuevo
        </button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()(
  {
    /**
     * Fetch publication-level SEO from Hashnode at the root so every page can
     * inherit it.  The fetch is fire-and-forget — if Hashnode is unavailable the
     * loader still resolves with null and we fall back to env / hard-coded values.
     */
    loader: async () => {
      const seo = await fetchPublicationSeo();
      return { seo };
    },
    head: ({ loaderData }) => {
      const title = loaderData?.seo?.title || DEFAULT_SEO_TITLE;
      const description =
        loaderData?.seo?.description || DEFAULT_SEO_DESCRIPTION;

      return {
        meta: [
          { charSet: "utf-8" },
          { name: "viewport", content: "width=device-width, initial-scale=1" },
          { title },
          { name: "description", content: description },
          // Open Graph
          { property: "og:title", content: title },
          { property: "og:description", content: description },
          { property: "og:type", content: "website" },
          // Theme color for mobile browsers (improves Lighthouse PWA/appearance score)
          { name: "theme-color", content: "#161d2b" },
        ],
        links: [
          { rel: "stylesheet", href: appCss },
          // Performance: preload the LCP hero image so the browser fetches it
          // as soon as the HTML is parsed — before the JS bundle runs.
          { rel: "preload", as: "image", href: heroBgUrl },
          // Performance: establish early connections to font CDNs before the
          // async font-loader script fires.
          { rel: "preconnect", href: "https://fonts.googleapis.com" },
          {
            rel: "preconnect",
            href: "https://fonts.gstatic.com",
            crossOrigin: "anonymous",
          },
          // NOTE: We intentionally do NOT add a rel="preload" for the Google
          // Fonts stylesheet here. The font is loaded asynchronously via the
          // inline script below (media="print" trick). A preload hint without a
          // matching synchronous <link> generates a browser warning and wastes
          // a high-priority fetch slot.
        ],
      };
    },
    shellComponent: RootShell,
    component: RootComponent,
    notFoundComponent: NotFoundComponent,
    errorComponent: ErrorComponent,
  }
);

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <HeadContent />
        {/*
         * Performance: load Google Fonts off the render-blocking critical path
         * using the media="print" → onload swap trick. This prevents fonts from
         * delaying First Contentful Paint while still applying as soon as they
         * are available. A <noscript> fallback ensures fonts load without JS.
         */}
        <script dangerouslySetInnerHTML={{ __html: fontsLoaderScript }} />
        <noscript>
          <link rel="stylesheet" href={FONTS_URL} />
        </noscript>
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      {/* Suspense is required for lazy() — MouseTrail renders nothing until loaded */}
      <Suspense fallback={null}>
        <MouseTrail />
      </Suspense>
      <div className="flex min-h-screen flex-col">
        <Header />
        <PageTransition>
          <Outlet />
        </PageTransition>
        <Footer />
      </div>
      <Toaster richColors position="bottom-right" />
    </QueryClientProvider>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { postsQueryOptions } from "@/lib/hashnode";

export const Route = createFileRoute("/blog/")({
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(postsQueryOptions()),
  head: () => ({
    meta: [
      { title: "Blog — Fernando Barrios" },
      {
        name: "description",
        content:
          "Notas extensas sobre ingeniería, diseño y construcción de productos.",
      },
    ],
  }),
  component: BlogPage,
});

function BlogPage() {
  const { data: posts } = useSuspenseQuery(postsQueryOptions());

  return (
    <section className="mx-auto max-w-3xl px-6 py-20">
      <header className="mb-12 animate-fade-up">
        <p className="font-mono text-xs uppercase tracking-widest text-primary">
          Escritura
        </p>
        <h1 className="mt-3 font-display text-5xl font-bold">Blog.</h1>
        <p className="mt-4 text-muted-foreground">
          Notas extensas sobre ingeniería, diseño y construcción de productos.
        </p>
      </header>

      {posts.length === 0 ? (
        <p className="py-12 text-center text-muted-foreground">
          Aún no hay publicaciones.
        </p>
      ) : (
        <ul className="divide-y divide-border/60">
          {posts.map((post, i) => (
            <li
              key={post.slug}
              className="animate-fade-up"
              style={{ animationDelay: `${i * 70}ms` }}
            >
              <Link
                to="/blog/$slug"
                params={{ slug: post.slug }}
                className="group flex flex-col gap-2 rounded-lg px-2 py-6 transition-colors hover:bg-card/30"
              >
                <div className="flex items-center gap-3 font-mono text-xs text-muted-foreground">
                  <time dateTime={post.publishedAt}>
                    {format(new Date(post.publishedAt), "dd MMM yyyy", {
                      locale: es,
                    })}
                  </time>
                  <span>·</span>
                  <span>{post.readTimeInMinutes} min de lectura</span>
                </div>
                <h2 className="font-display text-2xl font-semibold transition-colors group-hover:text-primary">
                  {post.title}
                </h2>
                <p className="text-sm text-muted-foreground">{post.brief}</p>
                {post.tags.length > 0 && (
                  <div className="mt-1 flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag.name}
                        className="rounded-full border border-border bg-card/50 px-2.5 py-0.5 font-mono text-xs text-muted-foreground"
                      >
                        {tag.name}
                      </span>
                    ))}
                  </div>
                )}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

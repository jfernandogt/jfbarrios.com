import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { ArrowLeft } from "lucide-react";
import { postQueryOptions } from "@/lib/hashnode";
// Non-critical CSS: prose styles and hljs syntax highlighting tokens.
// Loaded only when the user navigates to a blog post — not on the home page.
// Vite bundles this as a separate async chunk, keeping it off the critical path.
import "@/styles-blog.css";

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ context: { queryClient }, params: { slug } }) => {
    try {
      return await queryClient.ensureQueryData(postQueryOptions(slug));
    } catch {
      throw notFound();
    }
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          {
            title: `${loaderData.seo?.title ?? loaderData.title} — Fernando Barrios`,
          },
          {
            name: "description",
            content: loaderData.seo?.description ?? loaderData.brief,
          },
          { property: "og:title", content: loaderData.title },
          { property: "og:description", content: loaderData.brief },
          { property: "og:type", content: "article" },
          ...(loaderData.coverImage
            ? [{ property: "og:image", content: loaderData.coverImage.url }]
            : []),
        ]
      : [],
  }),
  component: PostPage,
});

function PostPage() {
  const { slug } = Route.useParams();
  const { data: post } = useSuspenseQuery(postQueryOptions(slug));

  return (
    <article className="mx-auto max-w-3xl px-6 py-20">
      {/* Back link */}
      <Link
        to="/blog"
        className="mb-10 inline-flex items-center gap-2 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Todas las publicaciones
      </Link>

      {/* Cover image */}
      {post.coverImage && (
        <div className="mb-10 overflow-hidden rounded-xl border border-border/60">
          <img
            src={post.coverImage.url}
            alt={post.title}
            className="h-72 w-full object-cover"
            loading="eager"
          />
        </div>
      )}

      {/* Header */}
      <header className="mb-10 animate-fade-up space-y-4">
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
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
        <h1 className="font-display text-4xl font-bold leading-tight md:text-5xl">
          {post.title}
        </h1>
        <div className="flex items-center gap-4">
          {post.author.profilePicture && (
            <img
              src={post.author.profilePicture}
              alt={post.author.name}
              className="h-9 w-9 rounded-full object-cover"
              width={36}
              height={36}
            />
          )}
          <div className="flex items-center gap-3 font-mono text-xs text-muted-foreground">
            <span>{post.author.name}</span>
            <span>·</span>
            <time dateTime={post.publishedAt}>
              {format(new Date(post.publishedAt), "dd MMM yyyy", {
                locale: es,
              })}
            </time>
            <span>·</span>
            <span>{post.readTimeInMinutes} min de lectura</span>
          </div>
        </div>
      </header>

      <hr className="mb-10 border-border/60" />

      {/* Content */}
      <div
        className="prose animate-fade-up [animation-delay:120ms]"
        dangerouslySetInnerHTML={{ __html: post.content.html }}
      />
    </article>
  );
}

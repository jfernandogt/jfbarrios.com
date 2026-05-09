import { queryOptions } from "@tanstack/react-query";

const HASHNODE_GQL = "https://gql.hashnode.com";
export const PUBLICATION_HOST = "jfbarrios.com";

// ── Types ──────────────────────────────────────────────────────────────────

export interface Post {
  id: string;
  title: string;
  slug: string;
  brief: string;
  publishedAt: string;
  readTimeInMinutes: number;
  coverImage: { url: string } | null;
  tags: Array<{ name: string }>;
}

export interface PostDetail extends Post {
  content: { html: string };
  author: { name: string; profilePicture: string };
  seo: { title: string; description: string } | null;
}

export interface PublicationSeo {
  title: string;
  description: string;
}

// ── GraphQL fetcher ────────────────────────────────────────────────────────

async function gql<T>(
  query: string,
  variables: Record<string, unknown>,
): Promise<T> {
  const res = await fetch(HASHNODE_GQL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
  });
  if (!res.ok) throw new Error(`Hashnode request failed: ${res.statusText}`);
  const json = (await res.json()) as {
    data?: T;
    errors?: { message: string }[];
  };
  if (json.errors?.length) throw new Error(json.errors[0].message);
  if (!json.data) throw new Error("No data returned from Hashnode");
  return json.data;
}

// ── Queries ────────────────────────────────────────────────────────────────

const PUBLICATION_SEO_QUERY = /* GraphQL */ `
  query GetPublicationSeo($host: String!) {
    publication(host: $host) {
      seo {
        title
        description
      }
    }
  }
`;

const POSTS_QUERY = /* GraphQL */ `
  query GetPosts($host: String!) {
    publication(host: $host) {
      posts(first: 20) {
        edges {
          node {
            id
            title
            slug
            brief
            publishedAt
            readTimeInMinutes
            coverImage { url }
            tags { name }
          }
        }
      }
    }
  }
`;

const POST_QUERY = /* GraphQL */ `
  query GetPost($host: String!, $slug: String!) {
    publication(host: $host) {
      post(slug: $slug) {
        id
        title
        slug
        brief
        publishedAt
        readTimeInMinutes
        coverImage { url }
        tags { name }
        content { html }
        author { name profilePicture }
        seo { title description }
      }
    }
  }
`;

// ── Fetch functions ────────────────────────────────────────────────────────

type PublicationSeoResponse = {
  publication: { seo: { title: string; description: string } | null } | null;
};

type PostsResponse = {
  publication: { posts: { edges: Array<{ node: Post }> } } | null;
};

type PostResponse = {
  publication: { post: PostDetail | null } | null;
};

/**
 * Fetches the publication-level SEO title and description from Hashnode.
 * Returns null if the publication has no SEO fields set.
 */
export async function fetchPublicationSeo(): Promise<PublicationSeo | null> {
  try {
    const data = await gql<PublicationSeoResponse>(PUBLICATION_SEO_QUERY, {
      host: PUBLICATION_HOST,
    });
    const seo = data.publication?.seo;
    if (!seo?.title && !seo?.description) return null;
    return { title: seo.title ?? "", description: seo.description ?? "" };
  } catch {
    return null;
  }
}

export async function fetchPosts(): Promise<Post[]> {
  const data = await gql<PostsResponse>(POSTS_QUERY, {
    host: PUBLICATION_HOST,
  });
  return data.publication?.posts.edges.map((e) => e.node) ?? [];
}

export async function fetchPost(slug: string): Promise<PostDetail> {
  const data = await gql<PostResponse>(POST_QUERY, {
    host: PUBLICATION_HOST,
    slug,
  });
  const post = data.publication?.post;
  if (!post) throw new Error(`Post not found: ${slug}`);
  return post;
}

// ── Query options ──────────────────────────────────────────────────────────

export const postsQueryOptions = () =>
  queryOptions({
    queryKey: ["hashnode", "posts"],
    queryFn: fetchPosts,
    staleTime: 1000 * 60 * 5,
  });

export const postQueryOptions = (slug: string) =>
  queryOptions({
    queryKey: ["hashnode", "post", slug],
    queryFn: () => fetchPost(slug),
    staleTime: 1000 * 60 * 5,
  });

export const publicationSeoQueryOptions = () =>
  queryOptions({
    queryKey: ["hashnode", "publication", "seo"],
    queryFn: fetchPublicationSeo,
    staleTime: 1000 * 60 * 60, // 1 hour — publication SEO rarely changes
  });

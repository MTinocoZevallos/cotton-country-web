import type { NextConfig } from "next"
import { posts } from "./app/blog/posts"
import { postPath } from "./lib/blog/paths"
import { documentaryBlogAliases } from "./lib/blog/legacy-aliases"

const nextConfig: NextConfig = {
  // Put known blog aliases before trailing-slash normalization, avoiding two hops.
  // The final rule preserves Next's previous no-trailing-slash behavior elsewhere.
  skipTrailingSlashRedirect: true,
  async redirects() {
    return [
      // Match both spellings before general slash normalization: one hop only.
      ...[
        { source: "/confeccion-de-uniformes", destination: "/uniformes", statusCode: 308 },
        { source: "/sizeset", destination: "https://sizeset.com/", statusCode: 308 },
        { source: "/politica-de-privacidad", destination: "/privacidad", statusCode: 308 },
        { source: "/terminos-y-condiciones", destination: "/terminos", statusCode: 308 },
      ].flatMap(rule => [rule.source, `${rule.source}/`].map(source => ({ ...rule, source }))),
      ...Object.entries(documentaryBlogAliases).flatMap(([alias, slug]) =>
        [`/${alias}`, `/${alias}/`, `/blog/${alias}`, `/blog/${alias}/`].map(source => ({
          source, destination: `/${slug}`, permanent: true,
        }))
      ),
      ...posts.flatMap(post => [
        { source: `/blog/${post.slug}`, destination: postPath(post), permanent: true },
        { source: `/blog/${post.slug}/`, destination: postPath(post), permanent: true },
      ]),
      { source: "/:path+/", destination: "/:path+", permanent: true },
    ]
  },
}
export default nextConfig

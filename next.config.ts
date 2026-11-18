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

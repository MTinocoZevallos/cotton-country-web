import type { NextConfig } from "next"
import { posts } from "./app/blog/posts"
import { postPath } from "./lib/blog/paths"

const nextConfig: NextConfig = {
  // Put known blog aliases before trailing-slash normalization, avoiding two hops.
  // The final rule preserves Next's previous no-trailing-slash behavior elsewhere.
  skipTrailingSlashRedirect: true,
  async redirects() {
    return [
      ...posts.flatMap(post => [
        { source: `/blog/${post.slug}`, destination: postPath(post), permanent: true },
        { source: `/blog/${post.slug}/`, destination: postPath(post), permanent: true },
      ]),
      { source: "/:path+/", destination: "/:path+", permanent: true },
    ]
  },
}
export default nextConfig

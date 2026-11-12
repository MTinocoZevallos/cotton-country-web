import { MetadataRoute } from "next"
import { posts } from "./blog/posts"
import { blogCategories } from "@/lib/blog/taxonomy"
import { postPath } from "@/lib/blog/paths"
import { casePath, publishedCases, sectors } from "@/lib/uniforms"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://cottoncountry.com.pe"

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/terminos`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/privacidad`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/derechos-arco`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ]

  const blogPages: MetadataRoute.Sitemap = posts.map(
    (post) => ({
      url: `${baseUrl}${postPath(post)}`,
      ...(post.updatedAt || post.publishedAt ? { lastModified: post.updatedAt ?? post.publishedAt } : {}),
      changeFrequency: "monthly",
      priority: 0.8,
    })
  )

  const uniformPaths = ["/uniformes", "/uniformes/camisas", "/uniformes/blusas", "/uniformes/pantalones-dama", "/uniformes/pantalones-caballero", "/uniformes/casacas", "/uniformes/pantalones", "/uniformes/polos", "/uniformes/chalecos", "/uniformes/sacos", "/uniformes/scrubs", ...sectors.filter(item => item.public).map(item => `/uniformes/${item.id}`), ...publishedCases.map(casePath)]
  const blogCollections: MetadataRoute.Sitemap = ["/blog", ...blogCategories.map(category => `/blog/categoria/${category.slug}`)].map(path => ({ url: `${baseUrl}${path}`, changeFrequency: "monthly", priority: 0.7 }))
  return [...staticPages, ...blogCollections, ...blogPages, ...uniformPaths.map(path => ({ url: `${baseUrl}${path}`, changeFrequency: "monthly" as const, priority: 0.7 }))]
}

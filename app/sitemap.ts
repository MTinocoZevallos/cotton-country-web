import { MetadataRoute } from "next"
import { posts } from "./blog/posts"

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
      url: `${baseUrl}/${post.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    })
  )

  return [...staticPages, ...blogPages]
}
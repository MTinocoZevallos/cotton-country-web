import Image from "next/image"
import Link from "next/link"
import { posts } from "./posts"

const specialImageExtensions: Record<string, string> = {
  "logistica-y-abastecimiento-textil-2022": "png",
  "perumin-2023": "webp",
  "un-tejido-llamado-gaza": "webp",
  "uniformes-de-guerra": "webp",
}

function getPostImage(slug: string) {
  const extension = specialImageExtensions[slug] ?? "jpg"
  return `/blog/${slug}.${extension}`
}

export default function BlogPage() {
  return (
    <main className="max-w-7xl mx-auto px-5 py-12 md:px-6 md:py-20">
      <h1 className="text-3xl font-semibold mb-10">Blog</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...posts].reverse().map((post) => (
          <article
            key={post.slug}
            className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition"
          >
            <Link href={`/blog/${post.slug}`}>
              <Image
                src={getPostImage(post.slug)}
                alt={post.title}
                width={1200}
                height={630}
                className="w-full h-56 object-cover"
              />
            </Link>

            <div className="p-6">
              <h2 className="text-lg md:text-xl font-semibold mb-3 leading-snug text-gray-900">
  <Link
    href={`/blog/${post.slug}`}
    className="hover:text-[#01018B]"
  >
    {post.title}
  </Link>
</h2>

<p className="text-xs uppercase tracking-wide text-gray-500 mb-3">
  Cotton Country
</p>

              <p className="text-gray-700 text-sm leading-relaxed">
                {post.excerpt}
              </p>

              <Link
                href={`/blog/${post.slug}`}
                className="inline-block mt-4 text-[#01018B] font-medium hover:underline"
              >
                Leer artículo →
              </Link>
            </div>
          </article>
        ))}
      </div>
    </main>
  )
}
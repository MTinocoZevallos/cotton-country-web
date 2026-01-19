import Link from "next/link"
import { posts } from "./posts"

export default function BlogPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-20">
      <h1 className="text-3xl font-semibold mb-10">Blog</h1>

      <ul className="space-y-8">
        {posts.map((post) => (
          <li key={post.slug}>
            <h2 className="text-xl font-semibold">
              <Link
                href={`/blog/${post.slug}`}
                className="text-blue-700 hover:underline"
              >
                {post.title}
              </Link>
            </h2>

            <p className="text-gray-600 mt-2">{post.excerpt}</p>
          </li>
        ))}
      </ul>
    </main>
  )
}

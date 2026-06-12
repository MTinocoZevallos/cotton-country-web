import Image from "next/image"
import { Metadata } from "next"
import { notFound } from "next/navigation"
import { posts } from "../posts"

type PageProps = {
  params: Promise<{
    slug: string
  }>
}

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

export async function generateStaticParams() {
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata(
  props: PageProps
): Promise<Metadata> {
  const { slug } = await props.params

  const post = posts.find((p) => p.slug === slug)

  if (!post) {
    return {
      title: "Post no encontrado",
    }
  }

  const image = getPostImage(post.slug)

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: post.canonicalPath ?? `/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [image],
    },
  }
}

export default async function PostPage(
  props: PageProps
) {
  const { slug } = await props.params

  const post = posts.find((p) => p.slug === slug)

  if (!post) {
    notFound()
  }

  const image = getPostImage(post.slug)

  return (
    <main className="max-w-3xl mx-auto px-6 py-20">
      <div className="mb-8 overflow-hidden rounded-xl bg-gray-100">
        <Image
          src={image}
          alt={post.title}
          width={1200}
          height={630}
          priority
          className="w-full h-auto object-cover"
        />
      </div>

      <h1 className="text-3xl font-semibold mb-6">
        {post.title}
      </h1>

      <article className="prose">
        {post.content}
      </article>
    </main>
  )
}
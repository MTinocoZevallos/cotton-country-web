import Image from "next/image"
import Link from "next/link"
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

function formatContent(content: string) {
  return content
    .trim()
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
}

export async function generateStaticParams() {
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
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

export default async function PostPage(props: PageProps) {
  const { slug } = await props.params

  const post = posts.find((p) => p.slug === slug)

  if (!post) {
    notFound()
  }

  const image = getPostImage(post.slug)
  const paragraphs = formatContent(post.content)

  return (
    <main className="max-w-3xl mx-auto px-5 py-12 md:px-6 md:py-20 bg-white text-gray-900">
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

      <p className="text-xs uppercase tracking-wide text-gray-500 mb-3">
        Cotton Country
      </p>

      <h1 className="text-3xl md:text-4xl font-semibold mb-8 leading-tight text-gray-950">
        {post.title}
      </h1>

      <article className="space-y-5 text-base md:text-lg leading-relaxed text-gray-900 [&_a]:text-[#01018B] [&_a]:font-semibold [&_a]:underline">
  {paragraphs.map((paragraph, index) => {
    const isHeading =
      /^\d+\./.test(paragraph) ||
      paragraph.toLowerCase().startsWith("conclusión")

    return isHeading ? (
      <h2
        key={index}
        className="pt-4 text-2xl font-semibold leading-snug text-gray-950"
        dangerouslySetInnerHTML={{ __html: paragraph }}
      />
    ) : (
      <p
        key={index}
        dangerouslySetInnerHTML={{ __html: paragraph }}
      />
    )
  })}
</article>

      <div className="mt-14 rounded-2xl bg-[#01018B] px-6 py-8 text-white">
        <h2 className="text-2xl font-semibold mb-3">
          ¿Necesitas uniformes corporativos para tu empresa?
        </h2>
        <p className="text-white/85 mb-6">
          En Cotton Country desarrollamos uniformes corporativos, institucionales
          e industriales para empresas que buscan calidad, imagen y cumplimiento.
        </p>
        <Link
          href="/#contacto"
          className="inline-flex items-center justify-center rounded-md bg-white px-6 py-3 text-sm font-medium text-[#01018B] hover:bg-gray-100 transition"
        >
          Solicitar propuesta
        </Link>
      </div>
    </main>
  )
}
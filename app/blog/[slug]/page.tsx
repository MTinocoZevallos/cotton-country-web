import type { Metadata } from "next";

type Props = {
  params: { slug: string };
};

const posts: Record<
  string,
  { title: string; description: string; content: string }
> = {
  "telas-inteligentes-en-uniformes": {
    title: "Telas inteligentes en uniformes corporativos",
    description:
      "Cómo las telas inteligentes están transformando la industria de uniformes corporativos e industriales.",
    content:
      "Las telas inteligentes permiten mejorar la seguridad, el confort y la trazabilidad en uniformes corporativos e industriales.",
  },
};

export function generateMetadata({ params }: Props): Metadata {
  const post = posts[params.slug];

  return {
    title: post
      ? post.title
      : "Artículo | Blog Cotton Country",
    description: post
      ? post.description
      : "Contenido especializado en innovación textil y confección industrial.",
  };
}

export default function BlogPost({ params }: Props) {
  const post = posts[params.slug];

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100">
      <article className="max-w-3xl mx-auto px-6 py-24">
        <h1 className="text-4xl font-bold mb-6">
          {post?.title ?? "Artículo en desarrollo"}
        </h1>

        <p className="text-neutral-400 text-lg mb-12">
          {post?.description ??
            "Este artículo será publicado próximamente."}
        </p>

        <div className="prose prose-invert">
          <p>
            {post?.content ??
              "Estamos preparando contenido técnico especializado para empresas e industrias."}
          </p>
        </div>
      </article>
    </main>
  );
}

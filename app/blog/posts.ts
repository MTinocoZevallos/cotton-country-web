export type Post = {
  slug: string
  title: string
  excerpt: string
  content: string
}

export const posts: Post[] = [
  {
    slug: "el-algodon-se-caso-con-el-poliester-en-oxford",
    title: "El algodón se casó con el poliéster en Oxford",
    excerpt:
      "Una mirada técnica y práctica a una de las mezclas textiles más usadas en uniformes corporativos.",
    content: `
El tejido Oxford mezcla algodón y poliéster para lograr
resistencia, buena caída y fácil mantenimiento.

En uniformes corporativos, esta combinación es clave
para lograr durabilidad sin perder presencia.
`,
  },
]

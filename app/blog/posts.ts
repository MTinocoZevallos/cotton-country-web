export type Post = {
  slug: string
  title: string
  excerpt: string
  content: string
  publishedAt?: string
  updatedAt?: string
  canonicalPath?: `/${string}`
}

export const posts: Post[] = [
  {
    slug: "el-algodon-se-caso-con-el-poliester-en-oxford",
    title: "El algodón se casó con el poliéster en Oxford",
    excerpt:
      "Si alguna vez usó una camisa como uniforme, probablemente fue una camisa en tela Oxford. Conozca su historia y evolución.",
    content: `
Si alguna vez usó una camisa como uniforme entonces debe haber vestido una camisa en tela Oxford, con algún bordado en manga corta o manga larga, pero ¿conoce la historia? Si no es así, aquí se la contamos.

## El tejido plano y la camisa en tela Oxford

El tejido plano es como se conoce a las telas que son usadas para camisería o pantalones, si de ropa de trabajo hablamos. Fue alrededor de finales del siglo XIX que, en Escocia, se desarrolló este tipo de tejido.

Si la camisa en tela Oxford se conoce con este nombre, es porque los primeros uniformes de dicha universidad inglesa fueron hechos en este tipo de tela. Antes de continuar, es preciso diferenciar el modelo de camisa de cuello abotonado (button down) de este tipo de tejido, ya que son dos cosas distintas.

## Evolución de la tela Oxford

En principio se elaboraba 100% de algodón (incluso siguen existiendo tejidos que están hechos totalmente en este material), pero con el tiempo la tela Oxford fue necesitando de un complemento ideal que hiciera que su textura suave también fuera duradera. Este lo encontró en el poliéster, un producto derivado del petróleo.

Al unirse lo natural y lo sintético se juntó lo mejor de ambos para darle vida a una de las más emblemáticas telas utilizadas para la confección de uniformes: el tejido Oxford.

Este se encuentra dentro de lo que se llaman tafetas o tafetanes por el tipo de estructura y se caracteriza por una visible textura en punto cruz.

Hay distintos tipos de composición de esta mezcla de tejidos: 50%-50%, 65%-35%, 70%-30%, pero definitivamente su durabilidad y versatilidad han sido en algún momento signo de estatus y diferenciación, aunque también de inclusión.

Gracias a la evolución y usos de la tela Oxford, hoy tenemos un producto textil de calidad superior que será capaz de perdurar en el tiempo.
`,
  },
]

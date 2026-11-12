import { ArrowLeft, ArrowRight } from "lucide-react"
import Link from "next/link"
import styles from "./blog.module.css"
export default function Pagination({ page, pages, path }: { page: number; pages: number; path: string }) {
  if(pages<2)return null
  const href=(n:number)=>`${path}${n>1?`?pagina=${n}`:""}#biblioteca`
  return <nav className={styles.pagination} aria-label="Páginas de artículos">
    {page>1&&<Link prefetch={false} rel="prev" href={href(page-1)}><ArrowLeft size={16} aria-hidden="true"/> Anterior</Link>}
    {Array.from({length:pages},(_,i)=>i+1).map(n=><Link prefetch={false} key={n} href={href(n)} aria-label={`Página ${n}`} aria-current={page===n?"page":undefined}>{n}</Link>)}
    {page<pages&&<Link prefetch={false} rel="next" href={href(page+1)}>Siguiente <ArrowRight size={16} aria-hidden="true"/></Link>}
  </nav>
}

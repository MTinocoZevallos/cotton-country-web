import Link from "next/link"
import { blogCategories, categoryPath, posts } from "@/lib/blog"
import { postCategoryIds } from "@/lib/blog/taxonomy"
import styles from "./blog.module.css"
export default function CategoryNav({ selected }: { selected?: string }) {
  return <nav aria-label="Categorías del blog" className={styles.categories}>
    <Link prefetch={false} href="/blog#biblioteca" aria-current={!selected?"page":undefined}>Todos <span>{posts.length}</span></Link>
    {blogCategories.map(category=><Link prefetch={false} key={category.id} href={categoryPath(category)} aria-current={selected===category.id?"page":undefined}>{category.name} <span>{posts.filter(post=>postCategoryIds[post.slug]===category.id).length}</span></Link>)}
  </nav>
}

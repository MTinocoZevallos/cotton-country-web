import Image from "next/image"
import { Fragment } from "react"
import { getPostImage } from "@/lib/blog/images"
import type { Block, Inline } from "@/lib/blog/content"

export function InlineContent({ nodes }: { nodes: Inline[] }) {
  return nodes.map((node,index)=><Fragment key={index}>{node.type==="text"?node.text:node.type==="link"?<a href={node.href} {...(node.href.startsWith("http")?{rel:"noopener noreferrer"}:{})}><InlineContent nodes={node.children}/></a>:node.type==="strong"?<strong><InlineContent nodes={node.children}/></strong>:<em><InlineContent nodes={node.children}/></em>}</Fragment>)
}
export default function Content({ blocks }: { blocks: Block[] }) {
  return blocks.map((block,index)=>{
    if(block.type==="paragraph") return <p key={index}><InlineContent nodes={block.children}/></p>
    if(block.type==="heading") return block.level===3?<h3 key={block.id} id={block.id}><InlineContent nodes={block.children}/></h3>:<h2 key={block.id} id={block.id}><InlineContent nodes={block.children}/></h2>
    if(block.type==="divider") return <hr key={index}/>
    if(block.type==="image") {
      const slug=block.src.split("/").at(-1)!.replace(/\.[^.]+$/,"")
      const image=getPostImage(slug)
      return <figure key={index}><Image src={image.src} alt={block.alt} width={image.width} height={image.height} sizes="(max-width:900px) 100vw, 760px"/></figure>
    }
    if(block.type==="table") return <div key={index} className="blog-measurement-table" role="region" aria-label={`Tabla de medidas: ${block.headers[1]}`} tabIndex={0}><table><thead><tr>{block.headers.map(header=><th scope="col" key={header}>{header}</th>)}</tr></thead><tbody>{block.rows.map((row,i)=><tr key={i}>{row.map((cell,j)=>j===0?<th scope="row" key={j}>{cell}</th>:<td key={j}>{cell}</td>)}</tr>)}</tbody></table></div>
    const items=block.items.map((item,i)=><li key={i}><InlineContent nodes={item}/></li>)
    return block.ordered?<ol key={index}>{items}</ol>:<ul key={index}>{items}</ul>
  })
}

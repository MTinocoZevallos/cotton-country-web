"use client"

import type { ReactNode } from "react"

export default function ContactLink({ href, children }: { href: string; children: ReactNode }) {
  return <a href={href} className="hover:underline" onClick={() => {
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({
      event: href.startsWith("mailto:") ? "email_click" : "phone_click",
      event_category: "Contacto",
      event_label: "Footer",
      value: 1,
    })
  }}>{children}</a>
}

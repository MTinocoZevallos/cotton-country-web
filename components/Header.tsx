"use client"

import Link from "next/link"
import Image from "next/image"
import { Menu, X, ChevronDown, Mail } from "lucide-react"
import { usePathname } from "next/navigation"
import { useRef, useState } from "react"
import styles from "./chrome.module.css"

declare global {
  interface Window { dataLayer?: Record<string, unknown>[] }
}

const families = [
  { label: "Todos los uniformes", href: "/uniformes" },
  { label: "Camisas", href: "/uniformes/camisas" },
  { label: "Blusas", href: "/uniformes/blusas" },
  { label: "Polos", href: "/uniformes/polos" },
  { label: "Pantalones", href: "/uniformes/pantalones" },
  { label: "Scrubs", href: "/uniformes/scrubs" },
]

export default function Header() {
  const isHome = usePathname() === "/"
  const [open, setOpen] = useState(false)
  const toggle = useRef<HTMLButtonElement>(null)
  const dropdown = useRef<HTMLDetailsElement>(null)
  const close = () => { setOpen(false); dropdown.current?.removeAttribute("open") }
  const handleEmailClick = () => {
    if (typeof window === "undefined") {
      return
    }

    window.dataLayer = window.dataLayer || []

    window.dataLayer.push({
      event: "email_click",
      event_category: "Contacto",
      event_label: "Header",
      value: 1,
    })
  }

  return (
    <header className={styles.header} data-home={isHome || undefined} onKeyDown={event => {
      if (event.key === "Escape") { close(); toggle.current?.focus() }
    }}>
      <a href="#contenido" className={styles.skipLink}>Saltar al contenido</a>
      <div className={styles.headerInner}>
        <Link href="/" aria-label="Cotton Country — Inicio" onClick={close}>
          <Image src="/logo-cotton-blanco.png" alt="Cotton Country" width={166} height={70} className={styles.headerLogo} />
        </Link>
        <button ref={toggle} type="button" className={styles.menuToggle} aria-label={open ? "Cerrar menú" : "Abrir menú"} aria-expanded={open} aria-controls="primary-navigation" onClick={() => setOpen(!open)}>
          {open ? <X aria-hidden="true" size={24} /> : <Menu aria-hidden="true" size={24} />}
        </button>
        <nav id="primary-navigation" aria-label="Navegación principal" className={styles.navigation} data-open={open} onClick={event => {
          if ((event.target as HTMLElement).closest("a")) close()
        }} onBlur={event => {
          if (event.relatedTarget && !event.currentTarget.contains(event.relatedTarget) && !toggle.current?.contains(event.relatedTarget)) close()
        }}>
          <details ref={dropdown} className={styles.navDropdown}>
            <summary>Uniformes <ChevronDown size={15} aria-hidden="true" /></summary>
            <div className={styles.navDropdownLinks}>
              {families.map(item => <Link key={item.href} href={item.href}>{item.label}</Link>)}
            </div>
          </details>
          <Link href="/proveedor-de-uniformes-corporativos" className={styles.navLink}>Soluciones corporativas</Link>
          <Link href="/blog" className={styles.navLink}>Blog</Link>
          <Link href="/#contacto" className={styles.navLink}>Contacto</Link>
          <a href="mailto:info@cottoncountry.com.pe" onClick={handleEmailClick} className={styles.emailLink} aria-label="Enviar correo"><Mail size={20} aria-hidden="true" /></a>
        </nav>
      </div>
    </header>
  )
}

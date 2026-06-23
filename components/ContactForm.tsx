"use client"

import Script from "next/script"
import { useRef, useState } from "react"

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[]
    turnstile?: {
      render: (
        container: HTMLElement,
        options: {
          sitekey: string
          callback: (token: string) => void
          "expired-callback": () => void
          "error-callback": () => void
        }
      ) => string
      reset: (widgetId?: string) => void
    }
  }
}

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement | null>(null)
  const turnstileRef = useRef<HTMLDivElement | null>(null)
  const widgetIdRef = useRef<string | null>(null)

  const [turnstileToken, setTurnstileToken] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formMessage, setFormMessage] = useState("")
  const [isSuccess, setIsSuccess] = useState(false)

  function renderTurnstile() {
  if (!turnstileRef.current || !window.turnstile || widgetIdRef.current) {
    return
  }

  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY

    if (!siteKey) {
    setIsSuccess(false)
    setFormMessage("El captcha no está configurado correctamente.")
    return
  }

  widgetIdRef.current = window.turnstile.render(turnstileRef.current, {
    sitekey: siteKey,
    callback: (token: string) => {
      setTurnstileToken(token)
    },
    "expired-callback": () => {
      setTurnstileToken("")
    },
    "error-callback": () => {
      setTurnstileToken("")
      setIsSuccess(false)
      setFormMessage("No se pudo validar el captcha. Inténtalo nuevamente.")
    },
  })
}

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (isSubmitting) {
      return
    }

    setIsSubmitting(true)
    setIsSuccess(false)
    setFormMessage("")

    if (!turnstileToken) {
      setIsSubmitting(false)
      setFormMessage("Por favor completa la validación de seguridad.")
      return
    }

    try {
      const formData = new FormData(event.currentTarget)

      const payload = {
        name: formData.get("name"),
        phone: formData.get("phone"),
        email: formData.get("email"),
        ruc: formData.get("ruc"),
        message: formData.get("message"),
        turnstileToken,
      }

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      let data: { error?: string; message?: string } = {}

      try {
        data = await response.json()
      } catch {
        data = {}
      }

      if (!response.ok) {
        setIsSuccess(false)
        setFormMessage(data.error ?? "No se pudo enviar la solicitud.")
        return
      }

      formRef.current?.reset()
      setTurnstileToken("")
      window.turnstile?.reset(widgetIdRef.current ?? undefined)

      setIsSuccess(true)
      setFormMessage("Solicitud enviada correctamente. Te contactaremos pronto.")
      window.dataLayer = window.dataLayer || []
      window.dataLayer.push({
        event: "formulario_enviado",
        form_name: "contacto_cotton_country",
      })
    } catch {
      setIsSuccess(false)
      setFormMessage("No se pudo enviar la solicitud. Inténtalo nuevamente.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Script
  src="https://challenges.cloudflare.com/turnstile/v0/api.js"
  strategy="afterInteractive"
  onReady={renderTurnstile}
/>

      <section id="contacto" className="w-full bg-white py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="max-w-3xl mb-14">
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-900">
              Solicita una propuesta personalizada
            </h2>
            <p className="mt-4 text-gray-600 text-base md:text-lg leading-relaxed">
              Cuéntanos sobre tu empresa y el tipo de uniformes que necesitas.
              Nuestro equipo te contactará para coordinar una propuesta adaptada
              a tus requerimientos técnicos y de imagen.
            </p>
          </div>

          <form
            ref={formRef}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            onSubmit={handleSubmit}
          >
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Nombre y Apellido
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#01018B]"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Teléfono
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#01018B]"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Correo corporativo
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="nombre@empresa.com"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#01018B]"
              />
            </div>

            <div>
              <label htmlFor="ruc" className="block text-sm font-medium text-gray-700 mb-1">
                RUC
              </label>
              <input
                id="ruc"
                name="ruc"
                type="text"
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#01018B]"
              />
            </div>

            <div className="md:col-span-2">
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Cuéntanos qué tipo de uniformes necesitas
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                placeholder="Ejemplo: camisas corporativas para equipo administrativo, cantidades aproximadas, fecha requerida, colores, etc."
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#01018B]"
              />
            </div>

            <div className="md:col-span-2">
              <div ref={turnstileRef} />
            </div>

            {formMessage && (
              <div className="md:col-span-2">
                <p className={isSuccess ? "text-sm text-green-700" : "text-sm text-red-700"}>
                  {formMessage}
                </p>
              </div>
            )}

            <div className="md:col-span-2 mt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center rounded-lg bg-[#01018B] px-8 py-4 text-white text-sm font-medium hover:bg-[#0202a8] transition disabled:opacity-60"
              >
                {isSubmitting ? "Enviando..." : "Solicitar propuesta"}
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  )
}
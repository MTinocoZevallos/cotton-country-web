"use client"

import Script from "next/script"
import { useRef, useState } from "react"

declare global {
  interface Window {
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

export default function PrivacyRequestForm() {
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
        email: formData.get("email"),
        company: formData.get("company"),
        requestType: formData.get("requestType"),
        message: formData.get("message"),
        turnstileToken,
      }

      const response = await fetch("/api/privacy-request", {
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
      setFormMessage(
        data.message ?? "Tu solicitud fue enviada correctamente."
      )
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

      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="mt-10 space-y-6"
      >
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Nombre completo
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
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Correo electrónico
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#01018B]"
          />
        </div>

        <div>
          <label
            htmlFor="company"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Empresa
          </label>
          <input
            id="company"
            name="company"
            type="text"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#01018B]"
          />
        </div>

        <div>
          <label
            htmlFor="requestType"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Tipo de solicitud
          </label>
          <select
            id="requestType"
            name="requestType"
            required
            defaultValue=""
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#01018B]"
          >
            <option value="" disabled>
              Selecciona una opción
            </option>
            <option value="access">Acceso a mis datos</option>
            <option value="rectification">Rectificación de mis datos</option>
            <option value="cancellation">Cancelación de mis datos</option>
            <option value="opposition">Oposición al tratamiento</option>
            <option value="unsubscribe">
              Dejar de recibir comunicaciones
            </option>
          </select>
        </div>

        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Detalle de la solicitud
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            placeholder="Puedes añadir información que nos ayude a identificar y atender tu solicitud."
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#01018B]"
          />
        </div>

        <div>
          <div ref={turnstileRef} />
        </div>

        {formMessage && (
          <p
            className={
              isSuccess ? "text-sm text-green-700" : "text-sm text-red-700"
            }
          >
            {formMessage}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center justify-center rounded-lg bg-[#01018B] px-8 py-4 text-sm font-medium text-white hover:bg-[#0202a8] transition disabled:opacity-60"
        >
          {isSubmitting ? "Enviando..." : "Enviar solicitud"}
        </button>
      </form>
    </>
  )
}
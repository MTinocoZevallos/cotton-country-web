import { NextResponse } from "next/server"
import { Resend } from "resend"

const blockedEmailDomains = [
  "gmail.com",
  "hotmail.com",
  "outlook.com",
  "yahoo.com",
  "live.com",
  "icloud.com",
  "aol.com",
  "proton.me",
  "protonmail.com",
]

function isCorporateEmail(email: string) {
  const domain = email.split("@")[1]?.toLowerCase()

  if (!domain) {
    return false
  }

  return !blockedEmailDomains.includes(domain)
}

export async function POST(request: Request) {
  try {
    const resendApiKey = process.env.RESEND_API_KEY
    const turnstileSecretKey = process.env.TURNSTILE_SECRET_KEY

    if (!resendApiKey || !turnstileSecretKey) {
      return NextResponse.json(
        { error: "El formulario no está configurado correctamente." },
        { status: 500 }
      )
    }

    const resend = new Resend(resendApiKey)

    const body = await request.json()

    const {
      name,
      phone,
      email,
      ruc,
      message,
      turnstileToken,
    } = body

    if (!name || !phone || !email || !ruc || !message) {
      return NextResponse.json(
        { error: "Todos los campos son obligatorios." },
        { status: 400 }
      )
    }

    if (!isCorporateEmail(email)) {
      return NextResponse.json(
        { error: "Por favor ingresa un correo corporativo." },
        { status: 400 }
      )
    }

    if (!turnstileToken) {
      return NextResponse.json(
        { error: "No se pudo validar el captcha." },
        { status: 400 }
      )
    }

    const turnstileResponse = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          secret: turnstileSecretKey,
          response: turnstileToken,
        }),
      }
    )

    const turnstileData = await turnstileResponse.json()

    if (!turnstileData.success) {
      return NextResponse.json(
        { error: "La validación de seguridad falló. Inténtalo nuevamente." },
        { status: 400 }
      )
    }

    await resend.emails.send({
      from: "Cotton Country <web@cottoncountry.com.pe>",
      to: ["info@cottoncountry.com.pe"],
      replyTo: email,
      subject: "Nueva solicitud de propuesta desde la web",
      text: `
Nueva solicitud desde la web de Cotton Country

Nombre y Apellido:
${name}

Teléfono:
${phone}

Correo:
${email}

RUC:
${ruc}

Mensaje:
${message}
      `,
    })

    return NextResponse.json({
      success: true,
      message: "Solicitud enviada correctamente.",
    })
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      { error: "No se pudo enviar la solicitud. Inténtalo nuevamente." },
      { status: 500 }
    )
  }
}
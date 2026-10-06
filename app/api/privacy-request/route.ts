import { NextResponse } from "next/server"
import { Resend } from "resend"

const requestTypeLabels: Record<string, string> = {
  access: "Acceso a mis datos",
  rectification: "Rectificación de mis datos",
  cancellation: "Cancelación de mis datos",
  opposition: "Oposición al tratamiento",
  unsubscribe: "Dejar de recibir comunicaciones",
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
      email,
      company,
      requestType,
      message,
      turnstileToken,
    } = body

    if (!name || !email || !requestType) {
      return NextResponse.json(
        { error: "Completa los campos obligatorios." },
        { status: 400 }
      )
    }

    if (!requestTypeLabels[requestType]) {
      return NextResponse.json(
        { error: "El tipo de solicitud no es válido." },
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

    const requestLabel = requestTypeLabels[requestType]

    await resend.emails.send({
      from: "Cotton Country <web@cottoncountry.com.pe>",
      to: ["info@cottoncountry.com.pe"],
      replyTo: email,
      subject: `Solicitud de privacidad - ${requestLabel}`,
      text: `
Nueva solicitud relacionada con datos personales

Nombre:
${name}

Correo:
${email}

Empresa:
${company || "No indicada"}

Tipo de solicitud:
${requestLabel}

Detalle:
${message || "Sin detalle adicional"}
      `,
    })

    return NextResponse.json({
      success: true,
      message: "Tu solicitud fue enviada correctamente.",
    })
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      { error: "No se pudo enviar la solicitud. Inténtalo nuevamente." },
      { status: 500 }
    )
  }
}
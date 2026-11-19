// Preview assets belong to that deployment; canonicals continue pointing to production.
export function socialImageUrl(path: string) {
  const origin = process.env.VERCEL_ENV === "preview" && process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}` : "https://cottoncountry.com.pe"
  return new URL(path, origin).href
}

export function brandSocialImage() {
  return { url: socialImageUrl("/social/cotton-country.png"), width: 1200, height: 630, alt: "Cotton Country — Uniformes que visten tu marca" }
}

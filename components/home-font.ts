import localFont from "next/font/local"

/** Shared by the Hero and editorial headings; scoped to the Home. */
export const editorialSerif = localFont({
  src: "../app/fonts/dm-serif-display-regular.ttf",
  variable: "--font-editorial-serif",
  weight: "400",
  style: "normal",
  display: "swap",
})

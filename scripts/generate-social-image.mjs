// Approved social card. Rebuild deterministically from the original logo and local font.
import fs from 'node:fs/promises'
import { createElement as h } from 'react'
import { ImageResponse } from 'next/og.js'
const root = new URL('../', import.meta.url)
const logo = await fs.readFile(new URL('public/logo-cotton-blanco.png', root))
const font = await fs.readFile(new URL('app/fonts/dm-serif-display-regular.ttf', root))
const image = new ImageResponse(
  h('div', { style: { width: '100%', height: '100%', display: 'flex', flexDirection: 'column', padding: '64px 76px', background: '#01018B', color: '#FFFFFF' } },
    h('img', { src: `data:image/png;base64,${logo.toString('base64')}`, width: 280, height: 118, alt: 'Cotton Country' }),
    h('div', { style: { display: 'flex', flexDirection: 'column', fontFamily: 'Editorial', fontSize: 78, lineHeight: 1.08, letterSpacing: '-1.5px', marginTop: 42 } },
      h('span', null, 'Uniformes que'), h('span', null, 'visten tu marca.')),
    h('div', { style: { display: 'flex', alignItems: 'center', marginTop: 'auto', gap: 24 } },
      h('div', { style: { width: 54, height: 3, background: '#D7FF00' } }),
      h('span', { style: { fontFamily: 'Editorial', fontSize: 25 } }, 'cottoncountry.com.pe'))),
  { width: 1200, height: 630, fonts: [{ name: 'Editorial', data: font, weight: 400, style: 'normal' }] }
)
await fs.writeFile(new URL('public/social/cotton-country.png', root), Buffer.from(await image.arrayBuffer()))
console.log('Social card: public/social/cotton-country.png (1200 × 630)')

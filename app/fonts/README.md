# Local brand fonts

Normal variable Latin WOFF2 subsets from `@fontsource-variable/manrope@5.3.0` and `@fontsource-variable/inter@5.3.0`, obtained from the npm registry. Package SHA-512 integrity was checked before extracting these files. Spanish accented characters are included in the Latin subset. Both original SIL Open Font License files are retained alongside the fonts.

Manrope: weight range 200–800. Inter: 100–900. No italic files are used.

`app/fonts.ts` loads both through `next/font/local` with swap, preload and metric-adjusted Arial fallback. Their CSS variables are attached to the document root so the design tokens resolve on that same element. The fonts are served from the application, with no runtime font provider requests or package dependency additions.

The editorial DM Serif Display is served as `dm-serif-display-regular.woff2` by `components/home-font.ts`. It is a lossless WOFF2 conversion of the retained original TTF, with identical glyph outlines, cmap and horizontal metrics; its original SIL license remains alongside both files. The conversion reduces the uncompressed font from 76,580 to 31,756 bytes without changing typography or making external font requests.

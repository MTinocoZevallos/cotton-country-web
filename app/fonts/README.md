# Local brand fonts

Normal variable Latin WOFF2 subsets from `@fontsource-variable/manrope@5.3.0` and `@fontsource-variable/inter@5.3.0`, obtained from the npm registry. Package SHA-512 integrity was checked before extracting these files. Spanish accented characters are included in the Latin subset. Both original SIL Open Font License files are retained alongside the fonts.

Manrope: weight range 200–800. Inter: 100–900. No italic files are used.

`app/fonts.ts` loads both through `next/font/local` with swap, preload and metric-adjusted Arial fallback. Their CSS variables are attached to the document root so the design tokens resolve on that same element. The fonts are served from the application, with no runtime font provider requests or package dependency additions.

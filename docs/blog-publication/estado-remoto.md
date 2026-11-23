# Control de revisión remota

La rama `publish/blog-54-57` se prepara desde `main` (`de674f99849a82a896f7011898bf2576d65a7c03`), tomando únicamente el blog aprobado de `52f611e2573cfa20abf3cc0f10b15a4a5dfc40fa` y la navegación complementaria autorizada.

La consulta de PR mediante GitHub CLI devolvió exactamente: `Post "https://api.github.com/graphql": Forbidden`. No se dispone de un conector de GitHub ni Vercel en esta sesión. El transporte Git sí permite consultar las referencias remotas. La creación de PR y el estado definitivo del push/Preview se comunicarán con el SHA real en la respuesta final, después del commit.

No se cambia autenticación, permisos, configuración externa ni la rama de producción para superar estas restricciones. Si el acceso al Preview devuelve 403 CONNECT, no se declara revisión visual remota ni deployment Ready sin evidencia.

Para revisión local reproducible: `npm run build`, `npx tsc --noEmit`, `npm run lint`, `node --test tests/*.test.mjs`, `node scripts/audit-blog-publication.mjs`. Las evidencias del navegador local están en `verificacion-local.json`.

No realizar merge ni promover a producción sin autorización final del propietario.

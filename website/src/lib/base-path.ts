/**
 * The site is published to GitHub Pages under a sub-path, so `basePath` cannot
 * be changed without updating every absolute URL in the app.
 *
 * Kept in sync with `next.config.ts`. Notably, Fumadocs' static search client
 * derives its URL from Vite's `import.meta.env.BASE_URL` (always `/` in
 * Next.js), so it does NOT receive Next.js' `basePath` and needs this prefix
 * applied manually.
 */
export const basePath = '/track';

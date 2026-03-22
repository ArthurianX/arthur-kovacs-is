## Arthur.Kovacs.is

This repo is a personal site built with Next.js. The core idea appears to be:

- activity pages for what Arthur is `Working`, `Playing`, `Cooking`, and `Reading`
- markdown-backed posts for each activity
- a small URL shortener that creates links like `/saying/:id`
- an experimental Rust backend deployed as a Vercel function

The git history suggests the project evolved in this order:

1. Build the personal site and post system.
2. Add a Thin Backend-powered URL shortener.
3. Add a Vercel Rust runtime and a minimal lambda as a backend experiment.

The Rust part was not yet connected to the shortener logic. It was left as a separate backend entrypoint.

## Project Layout

- `pages/` contains the Next.js routes.
- `posts/` holds markdown content for each activity.
- `pages/shortening-urls/index.tsx` is the shortener UI.
- `pages/saying/[id].tsx` resolves short links through Thin Backend.
- `api/user.rs` is the Rust Vercel function.

## Local Development

Install JavaScript dependencies and run the site:

```bash
npm install
npm run dev
```

If you want the URL shortener to work, set:

```bash
NEXT_PUBLIC_BACKEND_URL=...
```

That value is used by `thin-backend` in `pages/_app.tsx`.

Run the Rust function checks from `api/`:

```bash
cargo test
```

## Notes

- The current shortener still depends on Thin Backend for persistence and lookup.
- The Rust lambda is now useful as a health/info endpoint, but it is not yet the source of truth for short URLs.
- If you want to finish the migration, the next natural step would be moving short-link create/lookup logic behind Rust endpoints and retiring the direct frontend Thin Backend calls.

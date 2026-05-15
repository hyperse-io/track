# Next.js example

A small storefront demo for [@hyperse/track](https://github.com/hyperse-io/track). It sends page-view and add-to-cart events and surfaces the reported payload in a bottom sheet.

## Stack

- Next.js 16 (App Router)
- Tailwind CSS v4 (`@import "tailwindcss"` + `@tailwindcss/postcss`)
- TypeScript

## Getting started

```bash
yarn install
yarn dev
```

Open [http://localhost:3000](http://localhost:3000), click **Add to cart**, and inspect the report panel.

## Track code

- `track/track.ts` — builder setup
- `track/report-adapter.ts` — sample adapter
- `track/types.ts` — event types

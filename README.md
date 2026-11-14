# bhupha-p.com

Personal website of Bhupha Phanphaeng: portfolio, resume, and the Japan Capstone pages.

Built with [Astro](https://astro.build) (plus one small Vue component), hosted on Cloudflare Workers.

## Run it locally

Needs Node.js 22.23 or newer.

```sh
npm install
npm run dev          # http://localhost:4321, reloads as you edit
npm run build        # outputs the static site to dist/
npm run cf:preview   # runs the built site the way Cloudflare will
```

## Pages

| URL | File |
| --- | --- |
| `/` | `src/pages/index.astro` |
| `/work/japan-capstone/yipeng` | `src/pages/work/japan-capstone/yipeng.astro` |
| `/yipeng` | short link, defined in `public/_redirects` |

## Deploy

Cloudflare builds and deploys every push to `main`:

- Build command: `npm run build`
- Deploy command: `npx wrangler deploy`

Config lives in `wrangler.jsonc`.

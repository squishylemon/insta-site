# Alex Podesta — Scroll Site

A one-page, Apple-style scroll site with absurd IT copy and a deep-scroll easter egg.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

Preview the production build (with `/insta-site/` base path):

```bash
npm run build
npm run preview
```

## Deploy to GitHub Pages

### One-time setup (required)

The deploy job will fail with `404 Not Found` until Pages is enabled:

1. Open **[Settings → Pages](https://github.com/squishylemon/insta-site/settings/pages)** for this repo.
2. Under **Build and deployment**, set **Source** to **GitHub Actions** (not "Deploy from a branch").
3. Re-run the failed workflow: **Actions → Deploy to GitHub Pages → Re-run all jobs**.

After that, every push to `main` deploys automatically.

Live URL: `https://squishylemon.github.io/insta-site/`

### Troubleshooting

| Error | Fix |
|-------|-----|
| `Failed to create deployment (status: 404)` | Pages is not enabled — complete the one-time setup above. |
| Blank page or missing styles locally | Run `npm run preview` (not `npm run dev`) to test the `/insta-site/` base path. |

## Customize

- **Instagram link:** Edit the `href` on the footer link in `index.html`.
- **Car image:** Replace `src/assets/model-x.svg` with your own moody photo (WebP recommended, no license plate visible).

## Stack

- [Vite](https://vitejs.dev/)
- [GSAP ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)
- [Lenis](https://lenis.darkroom.engineering/) smooth scroll

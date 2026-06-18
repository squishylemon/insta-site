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

1. Push this repo to GitHub on the `main` branch.
2. Go to **Settings → Pages → Build and deployment**.
3. Set **Source** to **GitHub Actions**.
4. Push to `main` (or run the workflow manually). The site deploys automatically.

Live URL: `https://<your-github-username>.github.io/insta-site/`

## Customize

- **Instagram link:** Edit the `href` on the footer link in `index.html`.
- **Car image:** Replace `src/assets/model-x.svg` with your own moody photo (WebP recommended, no license plate visible).

## Stack

- [Vite](https://vitejs.dev/)
- [GSAP ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)
- [Lenis](https://lenis.darkroom.engineering/) smooth scroll

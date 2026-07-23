# DLo Esthetics — Website

Static storefront site for DLo Esthetics, a boutique esthetician studio in
Oahu, Hawaii. Plain HTML/CSS/JS, deployed via GitHub Pages.

## Project structure

```
index.html      Home — intro + services teaser linking to services.html
services.html   Full services menu (6 services)
blog.html       Blog — informational posts
contact.html    Contact info + contact form
location.html   Address, embedded map, parking instructions, hours
css/style.css   All site styling
js/script.js    Mobile nav toggle, active-tab highlighting, contact form
404.html        Custom not-found page (used by GitHub Pages automatically)
nginx.conf      Local-only preview config (see below) — not used in production
```

## Deploying to GitHub Pages

1. Push this project to a GitHub repository.
2. In the repo, go to **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to `Deploy from a branch`.
4. Pick the branch (e.g. `main`) and the root folder (`/`), then save.
5. GitHub will publish the site at `https://<username>.github.io/<repo>/`
   (or a custom domain if you configure one).

No build step is required — GitHub Pages serves the HTML/CSS/JS files as-is.
The `.nojekyll` file tells GitHub Pages to skip Jekyll processing so files
and folders starting with `_` (if any are added later) aren't ignored.

**Note:** GitHub Pages serves static files directly; it does not run nginx
(or any server-side process) in production. `nginx.conf` below is only for
previewing the site on your own machine.

## Local preview with nginx

If you have nginx installed locally and want to preview the site the way a
static file server would run it:

```bash
# from the project root
mkdir -p logs
nginx -p . -c nginx.conf

# visit http://localhost:8080

# stop the server
nginx -p . -s stop -c nginx.conf
```

If you don't have nginx installed, any static file server works for local
preview too, e.g. `npx serve .` or Python's `python -m http.server`.

## Wiring up the contact form

GitHub Pages can't run server-side code, so the form in
[contact.html](contact.html) currently just shows a confirmation message
client-side (see [js/script.js](js/script.js)) without actually sending
anything. To make it functional, connect it to a form backend such as
[Formspree](https://formspree.io/) or [Netlify Forms](https://www.netlify.com/products/forms/):
point the `<form>`'s `action` attribute at the service's endpoint and remove
(or adjust) the `preventDefault()` call in `script.js`.

## Adding a new blog post

Blog posts are plain HTML cards in [blog.html](blog.html). Duplicate an
existing `<article class="blog-card">...</article>` block and edit its
emoji, date/category, title, and body text.

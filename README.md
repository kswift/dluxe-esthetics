# D'Luxe Esthetics — Website

Static storefront site for D'Luxe Esthetics, a boutique esthetician studio in
Oahu, Hawaii. Plain HTML/CSS/JS, deployed via GitHub Pages.

## Project structure

```
index.html      Home — intro + services teaser linking to services.html
services.html   Full services menu, add-ons, and Square booking links
blog.html       Blog — informational posts
contact.html    Contact info + contact form
location.html   Address, embedded map, parking instructions, hours
css/style.css   All site styling
js/script.js    Mobile nav toggle, active-tab highlighting, contact form
404.html        Custom not-found page (used by GitHub Pages automatically)
sitemap.xml     Lists all real pages for search engine crawlers
robots.txt      Allows all crawlers, points to sitemap.xml
nginx.conf      Local-only preview config (see below) — not used in production
```

## SEO

- Every real page has a canonical `<link>` tag plus Open Graph/Twitter
  Card meta tags (title, description, image) for search and social sharing.
- `index.html` includes `BeautySalon` structured data (JSON-LD) with the
  business's name, address, phone, hours, and price range — this is what
  can power a rich business card in Google Search results.
- `404.html` is marked `noindex` so error pages don't get indexed.
- To actually get indexed and show up in Google Search: set up
  [Google Search Console](https://search.google.com/search-console) for
  the domain, submit `sitemap.xml`, and request indexing. Also worth
  setting up a [Google Business Profile](https://business.google.com/) —
  that's the single biggest factor for local search visibility, more so
  than anything on-page.

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

## Contact form

The form in [contact.html](contact.html) submits to
[Formspree](https://formspree.io/) (`https://formspree.io/f/mqpknbyk`) via
`fetch` in [js/script.js](js/script.js), which shows an inline confirmation
message instead of redirecting to Formspree's default thank-you page.
Submissions are emailed to whatever address is set as the recipient on that
form in the Formspree dashboard. The free Formspree plan covers 50
submissions/month — see their pricing page if that's ever not enough.

## Adding a new blog post

Blog posts are plain HTML cards in [blog.html](blog.html). Duplicate an
existing `<article class="blog-card">...</article>` block and edit its
emoji, date/category, title, and body text.

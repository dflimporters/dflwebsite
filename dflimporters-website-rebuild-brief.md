# DFL Importers Website Rebuild: Claude Code Brief

## Goal
Rebuild https://dflimporters.com (currently WordPress/Elementor, hosted by Database Technologies) as a modern, visually striking static site. It does not need to match the current look. It should feel premium: scroll effects, smooth motion, strong imagery.

## Constraints
- **Hosting:** GitHub Pages, same pattern as the other DFL sites (cards.dflimporters.com, catalogue.dflimporters.com, dflhq.com).
- **Low maintenance is a priority.** Plain HTML/CSS/JS, **no build step, no framework, no npm dependencies to keep updated.** Load libraries from a CDN with pinned versions.
- **Backend:** Supabase (existing DFL project) for form submissions only. No payments on the site.
- **Domain:** DFL now owns dflimporters.com but the GoDaddy transfer is still completing. Build and preview on a `github.io` URL. Do not assume DNS is ready. A `CNAME` file gets added at go-live.
- **Audience:** Roughly 90% B2B: supermarkets, wholesalers, hotels and restaurants. The site should build trust and make it easy to contact DFL.

## Company facts (confirmed by DFL)
- Family-owned distributor of well-known dry food products and other fast-moving consumer goods since 1976.
- Supplies supermarkets, wholesalers, hotels and restaurants.
- 50,000+ sq ft of storage. Free delivery islandwide across all 14 parishes.
- Stats: 1000+ products, 2000+ clients, 200+ weekly deliveries.
- Tagline on current site: "Home of Brands"
- Phone: 876-622-6718
- Email: info@dflimporters.com
- Address: 71 Molynes Road, Kingston 10, Jamaica, W.I.
- Hours: Monday to Friday, 8:00am to 5:00pm
- Social: Facebook https://www.facebook.com/DFLImporters/ , Instagram https://www.instagram.com/dflimporters/ , LinkedIn https://www.linkedin.com/company/dfl-importers
- Four value pillars: Product Availability, Customer Centric, Island Wide Delivery, Trained Workforce (see live homepage for the exact wording).

## Pages
Keep existing URL slugs where they exist (SEO).

| Page | Slug | Notes |
|---|---|---|
| Home | `/` | Hero, who we are, partners, why choose us, animated stats, brand grid, contact strip, map |
| Our Story | `/about/` | Pull current copy from live site |
| Our Brands | `/brands/` | Brand logo grid |
| Social Responsibility | `/social-responsibility/` | Currently a dead menu link (`#`). Needs content from DFL, or hide it until content exists |
| Careers | `/dfl-careers/` | Pull current copy from live site |
| Products | `/products/` | Pull current copy from live site |
| Hospitality | `/hospitality/` | **One consolidated page** covering tableware, smallwares, cookware, linen, amenities (see below) |
| Contact | `/contact/` | Form, phone, email, address, hours, map |

**Hospitality:** collapse the old sub-pages into sections of this one page: Tableware (dinnerware, glassware, cutlery), Smallwares (kitchen tools, serving utensils, barware), Cookware (pots and pans, cooking utensils), Linen (bed linens, towels), Amenities.

### Redirects for retired URLs
GitHub Pages cannot do server-side redirects. For each old slug that no longer exists, create a stub `index.html` at that path with `<meta http-equiv="refresh">`, a `<link rel="canonical">` and a visible link, pointing to the new page.
- Old hospitality sub-pages → `/hospitality/` (with the matching `#anchor`)
  - `/tableware/`, `/cutlery/`, `/dinnerware/`, `/glassware/`, `/smallwares/`, `/kitchen-tools/`, `/serving-utensils/`, `/barware/`, `/cookware/`, `/pots-pans/`, `/cooking-utensils/`, `/linen/`, `/bed-linens/`, `/towels/`, `/amenities/`
- Add a `404.html` that is on-brand and links home.

## Content gathering (do this first, while the old site is still live)
1. Fetch every live page and extract the text and headings into `/content/*.md`. Keep wording unless it is clearly outdated. Flag anything unclear instead of inventing copy.
2. Product and brand images and logos are supplied by DFL in `/assets/source/`. Do not hotlink anything from the old `wp-content/uploads` path. It will disappear.
3. If an image is missing or too low-res, leave a clearly marked placeholder and list it in `TODO.md`.

## Design direction
- Modern, bold, premium. Large typography, generous whitespace, full-bleed imagery, confident colour use drawn from the DFL logo/brand files.
- Suggested libraries (CDN, pinned versions):
  - **GSAP + ScrollTrigger** for scroll-driven animation, reveals, pinned sections, parallax
  - **Lenis** for smooth scrolling
  - Optional: **Swiper** for brand/partner carousels
- Ideas:
  - Animated hero with parallax
  - Count-up stats (1000+ / 2000+ / 200+)
  - Infinite-scroll brand logo marquee
  - Section reveals and staggered grids
  - An island-wide delivery section (e.g. stylised Jamaica map with the 14 parishes)
  - Sticky header that transitions on scroll
- Fully responsive, mobile first (many visitors will be on phones).
- Accessibility basics: semantic HTML, alt text, sufficient contrast, keyboard-navigable menu, and respect `prefers-reduced-motion` (disable heavy animation).
- Performance: compress and resize images, use WebP/AVIF with fallbacks, `loading="lazy"`, explicit width/height, self-host fonts or use Google Fonts with `font-display: swap`.

## Contact and careers forms
- Static site, so forms POST to **Supabase** (REST insert into a `website_inquiries` table).
- Use the anon key with **RLS: insert only, no select** for anon. No one can read submissions through the public key.
- Add a honeypot field and basic client-side validation. Add rate limiting or a Supabase edge function if spam becomes a problem.
- New submissions should also notify DFL by email. Ask Joel which approach to use (Supabase webhook or edge function, or Power Automate on the M365 side). Pick the simplest option that needs no ongoing monitoring.
- Careers: start with a simple "send us your CV" to a careers email address, or a form without file upload. File uploads need storage and moderation. Confirm with Joel before adding that.

## Copyright and footer
- Footer text: `© <year> DFL Importers. All rights reserved.`
- Render the year with a small inline script so it never goes stale: `document.getElementById('year').textContent = new Date().getFullYear();`
- Optional wording: "Serving Jamaica since 1976."

## SEO and technical
- Unique `<title>` and meta description per page. Keep the current homepage title: "DFL Importers – Wholesale, Hotels and Supermarket Suppliers".
- Open Graph and Twitter card tags with a good share image.
- `sitemap.xml`, `robots.txt`, canonical URLs, and `LocalBusiness` JSON-LD (name, address, phone, hours, social links).
- Favicon set (the current one is `VF011TP`; use the new logo files).
- Analytics: ask Joel whether the current site uses Google Analytics or similar. Carry it over if so, with a cookie-friendly setup.
- Google Maps embed on Contact and Home (71 Molynes Road, Kingston 10).

## Repo structure
```
/
├─ index.html
├─ about/index.html
├─ brands/index.html
├─ social-responsibility/index.html
├─ dfl-careers/index.html
├─ products/index.html
├─ hospitality/index.html
├─ contact/index.html
├─ 404.html
├─ [redirect stubs for old slugs]
├─ css/  js/  assets/ (optimised images, logos, fonts)
├─ assets/source/   (original supplied files; keep out of the deployed path if large)
├─ sitemap.xml  robots.txt
├─ content/  (extracted page text)
└─ TODO.md
```

## Go-live checklist (after GoDaddy transfer completes)
1. Confirm domain and DNS control in GoDaddy.
2. Add `CNAME` file (`dflimporters.com`) to the repo; enable Pages with HTTPS enforced.
3. Set DNS: A records for the apex to GitHub Pages IPs, `www` CNAME to the GitHub Pages host.
4. **Keep the existing subdomain records intact:** `cards.` and `catalogue.` (currently CNAMEs to GitHub Pages) and the **M365 email records** (MX, SPF, DKIM, autodiscover). Breaking these would take down DFL email.
5. Test all pages, forms, redirect stubs, and the sitemap on the live domain. Submit the sitemap to Google Search Console.
6. Once stable, cancel the old WordPress hosting (about JMD 184,736/yr) and keep a final backup of it.

## Open questions for Joel
- Social Responsibility page: what content, or hide it until it's ready?
- Careers: simple email or an application form?
- Form notification method (email routing).
- Existing analytics to carry over?
- Any new photography or video for hero sections?

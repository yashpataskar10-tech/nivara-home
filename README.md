# Nivara Home

A static, responsive D2C e-commerce prototype for **Nivara Home**, a hypothetical
Indian home décor brand, built for a Google Ads performance-marketing project.

Plain HTML, CSS and vanilla JavaScript — no framework, no backend, no paid
services. The cart is stored in the browser via `localStorage`.

## 1. File structure

```
nivara-home/
├── index.html                  Homepage
├── wall-decor.html             Wall Décor category + ads landing page
├── lighting.html                Lighting category + ads landing page
├── home-accessories.html       Home Accessories category + ads landing page
├── soft-furnishings.html       Soft Furnishings category + ads landing page
├── modern-home-decor.html      Broader "modern home decor" landing page
├── search.html                 Client-side search results
├── cart.html                   Cart (localStorage-backed)
├── checkout.html               Prototype checkout + simulated confirmation
├── robots.txt
├── sitemap.xml
├── build-products.js           Node script that generates /products/*.html
├── products/                   Generated — one static page per product
│   └── *.html
├── css/
│   └── style.css               All site styling (design tokens at the top)
├── js/
│   ├── products-data.js        Single source of truth for the product catalogue
│   ├── cart.js                 Cart logic (localStorage, totals, formatting)
│   └── main.js                 Header/footer injection, product cards,
│                                placeholder images, search, tracking stub
├── images/
│   └── products/               Drop real product photos here (see below)
└── README.md
```

Product data, descriptions, specs, benefits and pricing all live in
**`js/products-data.js`** — nothing product-related is duplicated by hand
anywhere else. The 10 individual product pages in `/products/` are
generated from that same file by `build-products.js`, so editing one
product's data and re-running the script keeps every page in sync.

## 2. Running the site locally

No build step is required to browse the site — but the `/products/`
pages are pre-generated and already included, so you can just open it.

**Option A — open directly:**
Double-click `index.html` (or drag it into a browser). Everything
except the generated product pages will work; some browsers block
`fetch`/relative paths under `file://`, so Option B is more reliable.

**Option B — local server (recommended):**
From the `nivara-home` folder, run one of:

```bash
# Python 3
python3 -m http.server 8080

# Node (if you have npx)
npx serve .
```

Then open `http://localhost:8080` in your browser.

**If you change `js/products-data.js`**, regenerate the product pages:

```bash
node build-products.js
```

(Requires only Node.js — no npm install needed.)

## 3. Deploying for free

Any static host works. Two easy options:

**Netlify (drag-and-drop):**
1. Go to [app.netlify.com/drop](https://app.netlify.com/drop)
2. Drag the whole `nivara-home` folder in
3. Netlify gives you a live URL immediately

**GitHub Pages:**
1. Push this folder to a GitHub repository
2. In the repo, go to Settings → Pages
3. Set the source branch to `main` (root folder)
4. Your site will be live at `https://<username>.github.io/<repo>/`

Both are free and support custom domains later, which is worth doing
before running real Google Ads traffic to the site (ads generally
perform and track better on a proper domain).

## 4. Adding real product images

See `images/products/PLACE_IMAGES_HERE.txt` for the exact filenames
expected. Until real photos are added, the site automatically shows a
generated placeholder graphic in the brand's colours for every
product, so nothing looks broken in the meantime.

## 5. Adding Google Analytics / Google Ads conversion tracking later

The JavaScript is already structured around four conversion events —
`view_item`, `add_to_cart`, `begin_checkout` and `purchase` — each
routed through a single function, `trackEvent(eventName, payload)`,
defined in `js/main.js`. Right now it just logs to the console:

```js
function trackEvent(eventName, payload) {
  console.log("[tracking]", eventName, payload);
}
```

To wire up real tracking:

1. Add the Google tag (gtag.js) snippet from Google Ads/Analytics to
   the `<head>` of every HTML page (or, more simply, add it once to a
   shared header include if you templatize the header further).
2. Replace the body of `trackEvent()` with a real call, e.g.:

   ```js
   function trackEvent(eventName, payload) {
     if (typeof gtag === "function") {
       gtag("event", eventName, payload);
     }
   }
   ```

3. That's it — every existing call site (`view_item` on product pages,
   `add_to_cart` on every Add to Cart button, `begin_checkout` on the
   checkout page, `purchase` on order submission) will start sending
   real events without any other code changes.

For Google Ads landing pages specifically, `wall-decor.html`,
`lighting.html`, `home-accessories.html`, `soft-furnishings.html` and
`modern-home-decor.html` are built to match distinct search intents and
are safe to use directly as ad landing page URLs.

## 6. Important note on authenticity

Nivara Home is a fictional brand built for this exercise. The site
deliberately does not include fabricated reviews, ratings, testimonials,
awards, certifications, sales figures or delivery promises — the
checkout flow is clearly labelled as a prototype and does not process
real payments or place real orders.

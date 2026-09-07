/**
 * Nivara Home — Shared site behaviour
 * -----------------------------------------------------------------
 * This file injects the header/footer (so nav markup lives in one
 * place), renders reusable product cards, generates placeholder
 * product imagery until real photography is added, and provides a
 * single trackEvent() stub that every conversion point in the site
 * calls into — wire real analytics up in ONE place later.
 */

/* ----------------------------------------------------------------
   Analytics hook — structured now, connected later.
   Call sites: view_item (product.js), add_to_cart (cart.js),
   begin_checkout (checkout.js), purchase (checkout.js).
   ---------------------------------------------------------------- */
function trackEvent(eventName, payload) {
  // Once Google Analytics / Google Ads conversion tracking is added,
  // this is the only function that needs to change. For example:
  //
  //   gtag('event', eventName, payload);
  //
  // For now we just log to the console so the event flow can be
  // verified during development.
  console.log("[tracking]", eventName, payload);
}

/* ----------------------------------------------------------------
   Header / footer (shared markup, injected on every page)
   ---------------------------------------------------------------- */

const NAV_LINKS = [
  { href: "index.html", label: "Home", key: "home" },
  { href: "wall-decor.html", label: "Wall Décor", key: "wall-decor" },
  { href: "lighting.html", label: "Lighting", key: "lighting" },
  { href: "home-accessories.html", label: "Accessories", key: "home-accessories" },
  { href: "soft-furnishings.html", label: "Soft Furnishings", key: "soft-furnishings" },
];

function renderHeader(activeKey) {
  const mount = document.getElementById("site-header");
  if (!mount) return;

  const navItems = NAV_LINKS.map(
    (link) =>
      `<li><a href="${link.href}" ${link.key === activeKey ? 'aria-current="page"' : ""}>${link.label}</a></li>`
  ).join("");

  mount.innerHTML = `
    <header class="site-header">
      <div class="wrap">
        <a href="index.html" class="logo">Nivara Home</a>
        <nav aria-label="Main">
          <ul class="main-nav" id="main-nav">${navItems}</ul>
        </nav>
        <div class="header-actions">
          <form class="search-bar" action="search.html" method="get" role="search">
            <label class="hidden" for="header-search">Search products</label>
            <input id="header-search" type="text" name="q" placeholder="Search décor..." />
            <button type="submit" aria-label="Search">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            </button>
          </form>
          <a class="icon-btn cart-link" href="cart.html" aria-label="View cart">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
            <span data-cart-count class="cart-count hidden">0</span>
          </a>
          <button class="nav-toggle" id="nav-toggle" aria-label="Toggle menu" aria-expanded="false" aria-controls="main-nav">
            <span></span>
          </button>
        </div>
      </div>
    </header>
  `;

  const toggle = document.getElementById("nav-toggle");
  const nav = document.getElementById("main-nav");
  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  updateCartBadge();
}

function renderFooter() {
  const mount = document.getElementById("site-footer");
  if (!mount) return;

  mount.innerHTML = `
    <footer class="site-footer">
      <div class="wrap footer-grid">
        <div class="footer-brand">
          <a href="index.html" class="logo">Nivara Home</a>
          <p>Thoughtfully designed décor for beautiful everyday spaces. Warm, minimal pieces for renters, couples and new homeowners across India.</p>
        </div>
        <div>
          <h4>Shop</h4>
          <ul>
            <li><a href="wall-decor.html">Wall Décor</a></li>
            <li><a href="lighting.html">Lighting</a></li>
            <li><a href="home-accessories.html">Home Accessories</a></li>
            <li><a href="soft-furnishings.html">Soft Furnishings</a></li>
          </ul>
        </div>
        <div>
          <h4>Help</h4>
          <ul>
            <li><a href="cart.html">Cart</a></li>
            <li><a href="checkout.html">Checkout</a></li>
            <li><a href="search.html">Search</a></li>
          </ul>
        </div>
        <div>
          <h4>About</h4>
          <ul>
            <li><a href="modern-home-decor.html">Modern Home Décor Guide</a></li>
            <li><a href="index.html#newsletter">Newsletter</a></li>
          </ul>
        </div>
      </div>
      <div class="wrap">
        <p class="footer-disclaimer">Nivara Home is a concept brand built as a design and marketing prototype. Product catalogue, pricing and policies shown are for demonstration purposes; no real orders are processed on this site.</p>
      </div>
      <div class="wrap footer-bottom">
        <span>© ${new Date().getFullYear()} Nivara Home. All rights reserved.</span>
        <span>Made for a performance marketing case study.</span>
      </div>
    </footer>
  `;
}

/* ----------------------------------------------------------------
   Placeholder product imagery
   ----------------------------------------------------------------
   Until real product photography is dropped into
   images/products/<file>.jpg, every <img class="product-photo">
   falls back to a generated SVG placeholder in the brand's warm
   palette, labelled with the product name — so the site never shows
   a broken-image icon.
   ---------------------------------------------------------------- */

const PLACEHOLDER_PALETTES = {
  "Wall Décor": ["#e4d9c3", "#a15d33"],
  "Lighting": ["#efe3cf", "#7c4526"],
  "Home Accessories": ["#e6ddc9", "#566052"],
  "Soft Furnishings": ["#ede1cb", "#a15d33"],
};

function placeholderImage(name, category) {
  const [bg, fg] = PLACEHOLDER_PALETTES[category] || ["#e6ddc9", "#7c4526"];
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500">
      <rect width="500" height="500" fill="${bg}"/>
      <circle cx="250" cy="205" r="70" fill="none" stroke="${fg}" stroke-width="2" opacity="0.55"/>
      <rect x="150" y="300" width="200" height="4" fill="${fg}" opacity="0.55"/>
      <text x="250" y="410" font-family="Georgia, serif" font-size="22" fill="${fg}" text-anchor="middle">${name}</text>
      <text x="250" y="440" font-family="Arial, sans-serif" font-size="13" letter-spacing="2" fill="${fg}" text-anchor="middle" opacity="0.7">${category.toUpperCase()}</text>
    </svg>`;
  return "data:image/svg+xml;base64," + btoa(svg);
}

function bindImageFallback(img, name, category) {
  img.addEventListener(
    "error",
    () => {
      img.onerror = null;
      img.src = placeholderImage(name, category);
    },
    { once: true }
  );
}

/* ----------------------------------------------------------------
   Product card component (used on home, category, search, related)
   ---------------------------------------------------------------- */

function productCardHTML(product) {
  return `
    <article class="product-card" data-sku="${product.sku}">
      <a class="thumb" href="products/${product.slug}.html" aria-label="View ${product.name}">
        <img src="${product.image}" alt="${product.name}" loading="lazy" onerror="this.onerror=null;this.src=placeholderImage('${escapeJs(product.name)}','${escapeJs(product.category)}')" />
      </a>
      <div class="card-body">
        <span class="card-category">${product.category}</span>
        <h3 class="card-name"><a href="products/${product.slug}.html">${product.name}</a></h3>
        <span class="card-price">${formatPrice(product.price)}</span>
        <div class="card-actions">
          <button class="btn btn-outline" type="button" onclick="addToCart('${product.sku}', 1); this.textContent='Added'; setTimeout(() => this.textContent='Add to Cart', 1200);">Add to Cart</button>
          <a class="btn btn-primary" href="products/${product.slug}.html">View Product</a>
        </div>
      </div>
    </article>
  `;
}

function escapeJs(str) {
  return String(str).replace(/'/g, "\\'");
}

function renderProductGrid(mountId, products) {
  const mount = document.getElementById(mountId);
  if (!mount) return;
  if (products.length === 0) {
    mount.innerHTML = `<div class="empty-state"><p>No products found.</p></div>`;
    return;
  }
  mount.innerHTML = products.map(productCardHTML).join("");
}

/* ----------------------------------------------------------------
   Client-side search
   ----------------------------------------------------------------
   Matches against product name, category and a small set of
   synonyms so common shopping terms (e.g. "lamp") reach the right
   products even when the word isn't in the product title.
   ---------------------------------------------------------------- */

const SEARCH_SYNONYMS = {
  lamp: ["lighting", "pendant", "light"],
  light: ["lighting", "lamp", "pendant"],
  mirror: ["wall décor", "arch"],
  vase: ["ceramic", "accessories"],
  rug: ["soft furnishings", "carpet"],
  cushion: ["soft furnishings", "pillow"],
  planter: ["accessories", "plant", "pot"],
  art: ["wall décor", "canvas", "painting"],
  candle: ["accessories", "holder"],
};

function searchProducts(query) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const terms = [q, ...(SEARCH_SYNONYMS[q] || [])];

  return PRODUCTS.filter((p) => {
    const haystack = `${p.name} ${p.category} ${p.shortDescription}`.toLowerCase();
    return terms.some((term) => haystack.includes(term)) || q.split(" ").some((word) => word.length > 2 && haystack.includes(word));
  });
}

/* ----------------------------------------------------------------
   Newsletter (front-end only — no backend in this prototype)
   ---------------------------------------------------------------- */

function bindNewsletterForm() {
  const form = document.getElementById("newsletter-form");
  if (!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const note = form.querySelector(".newsletter-note");
    if (note) note.textContent = "Thanks — you're on the list. (Prototype: no email is actually sent.)";
    form.querySelector("input").value = "";
  });
}

document.addEventListener("DOMContentLoaded", bindNewsletterForm);

/* ----------------------------------------------------------------
   Homepage: "Shop by Category" tiles
   ---------------------------------------------------------------- */

const CATEGORIES = [
  { name: "Wall Décor", href: "wall-decor.html" },
  { name: "Lighting", href: "lighting.html" },
  { name: "Home Accessories", href: "home-accessories.html" },
  { name: "Soft Furnishings", href: "soft-furnishings.html" },
];

function renderCategoryTiles(mountId) {
  const mount = document.getElementById(mountId);
  if (!mount) return;
  mount.innerHTML = CATEGORIES.map((cat) => {
    const [bg, fg] = PLACEHOLDER_PALETTES[cat.name] || ["#e6ddc9", "#7c4526"];
    return `
      <a class="category-tile" href="${cat.href}" style="background:${bg}; color:${fg};">
        <span class="tile-label">${cat.name}</span>
      </a>
    `;
  }).join("");
}

/** Returns up to `count` products from a given array of SKUs, in that order. */
function productsBySku(skus) {
  return skus.map((sku) => PRODUCTS.find((p) => p.sku === sku)).filter(Boolean);
}

/* ----------------------------------------------------------------
   Related products (product detail pages)
   ---------------------------------------------------------------- */

function getRelatedProducts(product, count = 4) {
  return PRODUCTS.filter((p) => p.category === product.category && p.sku !== product.sku).slice(0, count);
}

/* ----------------------------------------------------------------
   Category pages: filter by category + simple client-side sort
   ---------------------------------------------------------------- */

function sortProducts(products, sortValue) {
  const sorted = [...products];
  if (sortValue === "price-asc") sorted.sort((a, b) => a.price - b.price);
  else if (sortValue === "price-desc") sorted.sort((a, b) => b.price - a.price);
  else if (sortValue === "name-asc") sorted.sort((a, b) => a.name.localeCompare(b.name));
  return sorted;
}

/** Wires up a category page: renders its grid and binds the sort dropdown. */
function initCategoryPage(categoryName, gridId, sortId, countId) {
  const base = PRODUCTS.filter((p) => p.category === categoryName);

  function render() {
    const sortValue = document.getElementById(sortId)?.value || "featured";
    const list = sortProducts(base, sortValue);
    renderProductGrid(gridId, list);
    const countEl = document.getElementById(countId);
    if (countEl) countEl.textContent = `${list.length} product${list.length === 1 ? "" : "s"}`;
  }

  document.getElementById(sortId)?.addEventListener("change", render);
  render();
}

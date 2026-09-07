/**
 * Nivara Home — Product Page Builder
 * -----------------------------------------------------------------
 * Generates one static HTML file per product into /products/, e.g.
 * products/ceramic-table-lamp.html. This keeps product page URLs
 * clean and crawlable for Google Ads/SEO, while the actual product
 * copy still comes from a single source (js/products-data.js) so
 * nothing has to be typed twice.
 *
 * Run this locally whenever js/products-data.js changes:
 *   node build-products.js
 *
 * Requires only Node.js — no npm packages.
 */

const fs = require("fs");
const path = require("path");
const { PRODUCTS, SHIPPING_INFO, RETURNS_INFO } = require("./js/products-data.js");

const OUT_DIR = path.join(__dirname, "products");
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR);

function specRowsHTML(specs) {
  return specs.map((s) => `<tr><td>${s.label}</td><td>${s.value}</td></tr>`).join("\n");
}

function benefitsHTML(benefits) {
  return benefits.map((b) => `<li>${b}</li>`).join("\n");
}

function pageHTML(product) {
  const metaTitle = `Buy ${product.name} Online — ₹${product.price.toLocaleString("en-IN")} | Nivara Home`;
  const metaDesc = `${product.shortDescription} ₹${product.price.toLocaleString("en-IN")}. Part of the Nivara Home ${product.category} collection.`;

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${metaTitle}</title>
  <meta name="description" content="${metaDesc}" />
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Petrona:wght@500;600;700&family=Work+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../css/style.css" />
</head>
<body>
  <div id="site-header"></div>

  <main>
    <div class="wrap" style="padding-top: 1.5rem;">
      <p class="breadcrumb">
        <a href="../index.html">Home</a> /
        <a href="../${product.categorySlug}.html">${product.category}</a> /
        ${product.name}
      </p>
    </div>

    <section class="section" style="padding-top: 0.5rem;">
      <div class="wrap product-detail">
        <div class="main-image">
          <img id="product-image" src="../${product.image}" alt="${product.name}" />
        </div>

        <div class="product-info">
          <span class="category-tag">${product.category}</span>
          <h1>${product.name}</h1>
          <p class="price">₹${product.price.toLocaleString("en-IN")}</p>
          <p class="short-desc">${product.shortDescription}</p>

          <ul class="benefit-list">
            ${benefitsHTML(product.benefits)}
          </ul>

          <div class="qty-row">
            <div class="qty-selector">
              <button type="button" id="qty-minus" aria-label="Decrease quantity">−</button>
              <input type="text" id="qty-input" value="1" readonly aria-label="Quantity" />
              <button type="button" id="qty-plus" aria-label="Increase quantity">+</button>
            </div>
          </div>

          <div class="product-actions">
            <button class="btn btn-outline" id="add-to-cart-btn" type="button">Add to Cart</button>
            <a class="btn btn-primary" id="buy-now-btn" href="../checkout.html">Buy Now</a>
          </div>

          <div class="info-accordion">
            <details open>
              <summary>Specifications</summary>
              <div class="accordion-body">
                <table class="spec-table">
                  <tbody>
                    ${specRowsHTML(product.specs)}
                  </tbody>
                </table>
              </div>
            </details>
            <details>
              <summary>Shipping Information</summary>
              <div class="accordion-body"><p>${SHIPPING_INFO}</p></div>
            </details>
            <details>
              <summary>Returns Information</summary>
              <div class="accordion-body"><p>${RETURNS_INFO}</p></div>
            </details>
          </div>
        </div>
      </div>
    </section>

    <section class="section section--alt related-products">
      <div class="wrap">
        <div class="section-head">
          <h2>You May Also Like</h2>
          <p>More from the ${product.category} collection.</p>
        </div>
        <div class="product-grid" id="related-grid"></div>
      </div>
    </section>
  </main>

  <div id="site-footer"></div>

  <script src="../js/products-data.js"></script>
  <script src="../js/cart.js"></script>
  <script src="../js/main.js"></script>
  <script>
    renderHeader("${product.categorySlug}");
    renderFooter();

    const SKU = "${product.sku}";
    const product = PRODUCTS.find((p) => p.sku === SKU);

    // Related-product links are rendered one directory up from /products/,
    // so patch the card markup's relative paths for this page.
    function relatedCardHTML(p) {
      return productCardHTML(p)
        .replace(/href="products\\//g, 'href="../products/')
        .replace(/src="images\\//g, 'src="../images/');
    }
    document.getElementById("related-grid").innerHTML = getRelatedProducts(product).map(relatedCardHTML).join("");

    // Product image + fallback placeholder
    const img = document.getElementById("product-image");
    bindImageFallback(img, product.name, product.category);

    // Quantity selector
    const qtyInput = document.getElementById("qty-input");
    document.getElementById("qty-minus").addEventListener("click", () => {
      qtyInput.value = Math.max(1, parseInt(qtyInput.value, 10) - 1);
    });
    document.getElementById("qty-plus").addEventListener("click", () => {
      qtyInput.value = parseInt(qtyInput.value, 10) + 1;
    });

    // Add to cart
    document.getElementById("add-to-cart-btn").addEventListener("click", function () {
      addToCart(SKU, parseInt(qtyInput.value, 10));
      this.textContent = "Added to Cart";
      setTimeout(() => { this.textContent = "Add to Cart"; }, 1200);
    });

    // Buy Now — add to cart, then go straight to checkout
    document.getElementById("buy-now-btn").addEventListener("click", function (e) {
      e.preventDefault();
      addToCart(SKU, parseInt(qtyInput.value, 10));
      window.location.href = "../checkout.html";
    });

    // view_item fires once per page load
    trackEvent("view_item", { sku: product.sku, name: product.name, price: product.price });
  </script>
</body>
</html>
`;
}

PRODUCTS.forEach((product) => {
  const filePath = path.join(OUT_DIR, `${product.slug}.html`);
  fs.writeFileSync(filePath, pageHTML(product), "utf8");
  console.log("Built", filePath);
});

console.log(`\nDone. Generated ${PRODUCTS.length} product pages in /products.`);

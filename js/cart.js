/**
 * Nivara Home — Cart
 * -----------------------------------------------------------------
 * The cart is stored in localStorage under CART_KEY as an array of
 * { sku, qty } objects. Storing only sku + qty (not full product
 * details) keeps the cart small and always in sync with the current
 * product data in products-data.js.
 *
 * Shipping is a flat, clearly-labelled placeholder rate for this
 * prototype — a real store would calculate this from the delivery
 * address at checkout.
 */

const CART_KEY = "nivara_cart";
const FLAT_SHIPPING = 99;
const FREE_SHIPPING_THRESHOLD = 1999;

function getCart() {
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error("Could not read cart from storage", e);
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartBadge();
}

function findProduct(sku) {
  return PRODUCTS.find((p) => p.sku === sku);
}

/** Add a product to the cart, or increase its quantity if already present. */
function addToCart(sku, qty = 1) {
  const cart = getCart();
  const existing = cart.find((item) => item.sku === sku);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ sku, qty });
  }
  saveCart(cart);

  // --- Analytics hook (placeholder) ---------------------------------
  // Wire this up to Google Analytics / Google Ads once tracking is
  // ready. See trackEvent() in main.js for where the call should go.
  trackEvent("add_to_cart", { sku, qty });
}

function updateCartQty(sku, qty) {
  let cart = getCart();
  if (qty <= 0) {
    cart = cart.filter((item) => item.sku !== sku);
  } else {
    const item = cart.find((i) => i.sku === sku);
    if (item) item.qty = qty;
  }
  saveCart(cart);
}

function removeFromCart(sku) {
  const cart = getCart().filter((item) => item.sku !== sku);
  saveCart(cart);
}

function clearCart() {
  saveCart([]);
}

/** Returns cart items merged with their current product details. */
function getCartDetails() {
  return getCart()
    .map((item) => {
      const product = findProduct(item.sku);
      if (!product) return null;
      return { ...product, qty: item.qty, lineTotal: product.price * item.qty };
    })
    .filter(Boolean);
}

function getCartCount() {
  return getCart().reduce((sum, item) => sum + item.qty, 0);
}

function getCartSubtotal() {
  return getCartDetails().reduce((sum, item) => sum + item.lineTotal, 0);
}

function getShippingCost(subtotal) {
  if (subtotal === 0) return 0;
  return subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : FLAT_SHIPPING;
}

function formatPrice(amount) {
  return "₹" + amount.toLocaleString("en-IN");
}

/** Updates the little count bubble on the cart icon in the header, on every page. */
function updateCartBadge() {
  const badge = document.querySelector("[data-cart-count]");
  if (!badge) return;
  const count = getCartCount();
  badge.textContent = count;
  badge.classList.toggle("hidden", count === 0);
}

document.addEventListener("DOMContentLoaded", updateCartBadge);

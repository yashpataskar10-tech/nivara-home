/**
 * Nivara Home — Product Catalogue
 * -----------------------------------------------------------------
 * Single source of truth for every product on the site.
 * Both the browser (category pages, search, cart) and the Node
 * build script (build-products.js, which generates the static
 * /products/*.html pages) read from this same array so product
 * information is never duplicated by hand.
 *
 * `image` points at a real photo you can drop in later at
 * images/products/<file>. Until a real photo exists, main.js
 * renders a generated placeholder instead (see getPlaceholderImage).
 */

const PRODUCTS = [
  {
    sku: "NH-W01",
    slug: "abstract-canvas-wall-art",
    name: "Abstract Canvas Wall Art",
    category: "Wall Décor",
    categorySlug: "wall-decor",
    price: 1499,
    image: "images/products/nh-w01.jpg",
    shortDescription:
      "A hand-painted-style abstract canvas in warm, earthy tones that brings quiet visual interest to any wall without overwhelming the room.",
    benefits: [
      "Adds a focal point to living rooms, entryways or bedrooms",
      "Neutral, warm palette pairs with most existing décor",
      "Lightweight canvas frame — easy to hang, easy to move",
    ],
    specs: [
      { label: "Material", value: "Canvas print on wooden frame" },
      { label: "Dimensions", value: "60cm x 90cm" },
      { label: "Finish", value: "Matte" },
      { label: "Mounting", value: "Ready to hang, hardware included" },
      { label: "Care", value: "Dust with a dry, soft cloth" },
    ],
  },
  {
    sku: "NH-W02",
    slug: "minimalist-arch-mirror",
    name: "Minimalist Arch Mirror",
    category: "Wall Décor",
    categorySlug: "wall-decor",
    price: 2499,
    image: "images/products/nh-w02.jpg",
    shortDescription:
      "A softly arched mirror with a slim frame, designed to open up small spaces and add gentle light to hallways, bedrooms and entryways.",
    benefits: [
      "Arch silhouette softens sharp, boxy interiors",
      "Reflects natural light to make compact rooms feel larger",
      "Slim frame keeps the look understated, not ornate",
    ],
    specs: [
      { label: "Material", value: "Metal frame, tempered glass mirror" },
      { label: "Dimensions", value: "45cm x 70cm" },
      { label: "Frame Colour", value: "Matte black" },
      { label: "Mounting", value: "Wall-mounted, hardware included" },
      { label: "Care", value: "Clean with a soft, dry or slightly damp cloth" },
    ],
  },
  {
    sku: "NH-W03",
    slug: "decorative-3-piece-wall-set",
    name: "Decorative 3-Piece Wall Set",
    category: "Wall Décor",
    categorySlug: "wall-decor",
    price: 1799,
    image: "images/products/nh-w03.jpg",
    shortDescription:
      "A curated set of three complementary wall pieces that let you build a gallery-style arrangement without guessing what goes together.",
    benefits: [
      "Pre-matched set removes the guesswork from wall styling",
      "Works as a single grouping or spread across a room",
      "Suits rented homes — no large single fixture required",
    ],
    specs: [
      { label: "Material", value: "Printed panels on MDF backing" },
      { label: "Set Includes", value: "3 panels, assorted sizes" },
      { label: "Largest Panel", value: "40cm x 50cm" },
      { label: "Mounting", value: "Ready to hang, hardware included" },
      { label: "Care", value: "Dust with a dry, soft cloth" },
    ],
  },
  {
    sku: "NH-L01",
    slug: "ceramic-table-lamp",
    name: "Ceramic Table Lamp",
    category: "Lighting",
    categorySlug: "lighting",
    price: 1899,
    image: "images/products/nh-l01.jpg",
    shortDescription:
      "A rounded ceramic base paired with a natural linen shade, giving off warm, soft light suited to bedside tables and reading corners.",
    benefits: [
      "Warm, diffused light — easy on the eyes in the evening",
      "Ceramic base adds weight and a tactile, handmade feel",
      "Compact footprint suits nightstands and console tables",
    ],
    specs: [
      { label: "Material", value: "Ceramic base, linen-blend shade" },
      { label: "Height", value: "38cm" },
      { label: "Bulb", value: "E27 base, bulb not included" },
      { label: "Cord Length", value: "1.8m with in-line switch" },
      { label: "Care", value: "Wipe base with a dry cloth; spot-clean shade" },
    ],
  },
  {
    sku: "NH-L02",
    slug: "ambient-pendant-light",
    name: "Ambient Pendant Light",
    category: "Lighting",
    categorySlug: "lighting",
    price: 2999,
    image: "images/products/nh-l02.jpg",
    shortDescription:
      "A single-drop pendant with a warm metal finish, built to anchor a dining table or reading nook with soft, directional light.",
    benefits: [
      "Creates a focused, warm glow over dining or work surfaces",
      "Adjustable drop length suits different ceiling heights",
      "Understated metal finish complements most colour schemes",
    ],
    specs: [
      { label: "Material", value: "Metal shade, braided cord" },
      { label: "Shade Diameter", value: "26cm" },
      { label: "Drop Length", value: "Adjustable up to 1.2m" },
      { label: "Bulb", value: "E27 base, bulb not included" },
      { label: "Installation", value: "Ceiling mount, basic tools required" },
    ],
  },
  {
    sku: "NH-A01",
    slug: "textured-ceramic-vase",
    name: "Textured Ceramic Vase",
    category: "Home Accessories",
    categorySlug: "home-accessories",
    price: 899,
    image: "images/products/nh-a01.jpg",
    shortDescription:
      "A hand-textured ceramic vase in an earthy glaze, equally at home holding fresh stems or standing on its own as a shelf accent.",
    benefits: [
      "Textured finish catches light and adds tactile interest",
      "Works with fresh flowers, dried stems, or empty as a sculptural object",
      "Wide base keeps it stable on open shelving",
    ],
    specs: [
      { label: "Material", value: "Glazed ceramic" },
      { label: "Height", value: "24cm" },
      { label: "Opening Diameter", value: "8cm" },
      { label: "Water-safe", value: "Yes" },
      { label: "Care", value: "Hand wash, avoid abrasive scrubbers" },
    ],
  },
  {
    sku: "NH-A02",
    slug: "indoor-planter-set",
    name: "Indoor Planter Set",
    category: "Home Accessories",
    categorySlug: "home-accessories",
    price: 1299,
    image: "images/products/nh-a02.jpg",
    shortDescription:
      "A set of three nesting planters sized for everything from a small succulent to a mid-size leafy plant, with drainage built in.",
    benefits: [
      "Three sizes cover most common indoor plants",
      "Built-in drainage hole protects root health",
      "Nesting shapes group neatly on a windowsill or shelf",
    ],
    specs: [
      { label: "Material", value: "Glazed ceramic" },
      { label: "Set Includes", value: "3 planters — 9cm, 12cm, 15cm diameter" },
      { label: "Drainage", value: "Drainage hole in each planter" },
      { label: "Saucers", value: "Included" },
      { label: "Care", value: "Wipe clean with a damp cloth" },
    ],
  },
  {
    sku: "NH-A03",
    slug: "decorative-candle-holder-set",
    name: "Decorative Candle Holder Set",
    category: "Home Accessories",
    categorySlug: "home-accessories",
    price: 799,
    image: "images/products/nh-a03.jpg",
    shortDescription:
      "A set of two mixed-height candle holders in a warm metal finish, built to add a soft glow to a dinner table or console.",
    benefits: [
      "Mixed heights create visual rhythm on a table or shelf",
      "Warm metal finish pairs with wood and ceramic accents",
      "Compact enough to use daily, not just for occasions",
    ],
    specs: [
      { label: "Material", value: "Iron with brushed metal finish" },
      { label: "Set Includes", value: "2 holders — 12cm and 18cm" },
      { label: "Candle Size", value: "Fits standard taper candles" },
      { label: "Candles Included", value: "No" },
      { label: "Care", value: "Wipe with a dry cloth" },
    ],
  },
  {
    sku: "NH-S01",
    slug: "premium-cushion-cover-set",
    name: "Premium Cushion Cover Set",
    category: "Soft Furnishings",
    categorySlug: "soft-furnishings",
    price: 999,
    image: "images/products/nh-s01.jpg",
    shortDescription:
      "A set of two textured cushion covers in a cotton-linen blend, designed to layer easily onto a sofa or bed for an instant refresh.",
    benefits: [
      "Cotton-linen blend feels substantial, not flimsy",
      "Neutral tones layer with existing cushions and throws",
      "Concealed zip keeps the front clean and uncluttered",
    ],
    specs: [
      { label: "Material", value: "Cotton-linen blend" },
      { label: "Set Includes", value: "2 covers, 45cm x 45cm" },
      { label: "Closure", value: "Concealed zip" },
      { label: "Filling", value: "Not included" },
      { label: "Care", value: "Machine wash cold, line dry" },
    ],
  },
  {
    sku: "NH-S02",
    slug: "handwoven-accent-rug",
    name: "Handwoven Accent Rug",
    category: "Soft Furnishings",
    categorySlug: "soft-furnishings",
    price: 2499,
    image: "images/products/nh-s02.jpg",
    shortDescription:
      "A handwoven accent rug in a subtle geometric pattern, sized to ground a seating area or sit beside a bed.",
    benefits: [
      "Handwoven texture adds warmth underfoot",
      "Subtle pattern grounds a space without competing with décor",
      "Sized for a reading corner, entryway or bedside",
    ],
    specs: [
      { label: "Material", value: "Cotton blend, handwoven" },
      { label: "Dimensions", value: "120cm x 180cm" },
      { label: "Pile", value: "Low pile, flatweave" },
      { label: "Backing", value: "Non-slip backing" },
      { label: "Care", value: "Vacuum regularly, spot-clean spills" },
    ],
  },
];

// Shared generic policy copy used on every product page and in checkout.
const SHIPPING_INFO =
  "Orders are typically dispatched within 2–4 business days. Delivery timelines vary by location and will be confirmed at checkout in a full version of this store.";
const RETURNS_INFO =
  "This is a prototype store — no real orders are processed. In a live version, Nivara Home would offer a standard return window on unused items in original packaging.";

// Make this usable both as a browser global (via <script src="...">)
// and as a Node module (required by build-products.js).
if (typeof module !== "undefined" && module.exports) {
  module.exports = { PRODUCTS, SHIPPING_INFO, RETURNS_INFO };
}

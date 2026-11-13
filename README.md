# KeyForge: Retro Mechanical Keyboard Store

A responsive e-commerce landing page for a fictional mechanical keyboard brand.
Built with **React 18 + Vite**, **Tailwind CSS 3** and **Lucide React**. No Next.js, no state library, no extra dependencies.

## Installation

Requires Node.js 18 or newer.

```bash
npm install
```

## Run the dev server

```bash
npm run dev
```

Open the URL Vite prints (usually http://localhost:5173).

## Other scripts

```bash
npm run build     # production build into dist/
npm run preview   # serve the production build locally
```

## Folder structure

```
keyforge/
├── index.html                  # Google Fonts (Playfair Display, DM Sans), root div
├── package.json
├── vite.config.js
├── tailwind.config.js          # palette, fonts, shadows, animations
├── postcss.config.js
├── public/
│   ├── favicon.svg
│   └── images/                 # Royal Kludge product photos, named after each keyboard
│       ├── rk61-60-wireless.webp
│       ├── l75-75-wireless.webp
│       ├── rk84-75-wired-rgb-limited.webp
│       └── rk87-tkl-wireless.webp
└── src/
    ├── main.jsx                # React entry point
    ├── App.jsx                 # Cart + filter state, page composition
    ├── index.css               # Tailwind layers, smooth scroll, shared classes
    ├── data/
    │   └── products.js         # Product and category data
    ├── utils/
    │   └── format.js           # Peso formatter, email regex
    └── components/
        ├── Navbar.jsx
        ├── Hero.jsx
        ├── Categories.jsx
        ├── ProductSection.jsx
        ├── ProductCard.jsx
        ├── BrandStory.jsx
        ├── Newsletter.jsx
        ├── Footer.jsx
        ├── CartDrawer.jsx
```

## Design tokens

| Token | Value | Tailwind class |
| --- | --- | --- |
| Background | `#F5EFDF` | `bg-cream` |
| Secondary background | `#EEE5D3` | `bg-sand` |
| Primary text / dark sections | `#34291F` | `text-ink`, `bg-ink` |
| Secondary text | `#766958` | `text-muted` |
| Accent | `#BD7045` | `text-accent`, `bg-accent` |


## Major components

**App.jsx** holds all shared state with `useState`: `cartItems` (a list of `{ id, quantity }`), `isCartOpen` and `activeCategory`. It derives the cart count, line items, subtotal and filtered product list on each render, then passes data and handlers down as props. Cart entries only store ids and quantities, and product details are looked up from the catalog, so prices never go stale.

**Navbar.jsx** is a sticky header with the logo, anchor links, a cart button with a live counter badge that animates on change, and a hamburger menu below the `md` breakpoint. It also exports `Logo` and `NAV_LINKS`, which the footer reuses.

**Hero.jsx** contains the headline, copy, both CTAs, a stats row and the featured keyboard on a dotted retro panel with a slowly rotating "Handcrafted" stamp and floating feature tags.

**Categories.jsx** renders three layout cards from `categories`. Clicking a card sets the filter and smooth scrolls to the products. Clicking the active card again clears the filter.

**ProductSection.jsx** shows filter pills (All, 60%, 75%, TKL) and a grid of `ProductCard`s. Pills and category cards share the same state, so they always agree.

**ProductCard.jsx** displays the image, badge, layout and connectivity, name, description, peso price and an Add to Cart button that briefly changes to "Added".

**CartDrawer.jsx** is a slide-in dialog with quantity steppers, remove buttons, a dynamic subtotal and an empty state. It closes on Escape or backdrop click, locks page scroll while open and moves focus to the close button.

**BrandStory.jsx**, **Newsletter.jsx** and **Footer.jsx** cover the remaining sections. The newsletter form validates for empty and malformed addresses and shows an inline error or a success message.

Product photos are referenced by path from `src/data/products.js`. A `.product-photo` class crops the white studio padding and blends it into the panel.

## Typography

| Element | Font | Weight | Size |
| --- | --- | --- | --- |
| Hero heading (`.hero-heading`) | Playfair Display | 700 | 64px |
| Section heading (`.section-heading`) | Playfair Display | 700 | 40px |
| Product name (`.product-name`) | DM Sans | 700 | 20px |
| Body text | DM Sans | 400 | 16px |
| Navigation (`.nav-text`) | DM Sans | 600 | 14px |
| Buttons | DM Sans | 700 | 14px |

Headings step down on small screens (hero 40px, section 30px). Desktop sizes match the table.

## Changing a product photo

Edit the `image` and `imageAlt` fields in `src/data/products.js` and place the file in `public/images/`.

## Adding a product

Append an object to the `products` array in `src/data/products.js`. Use an existing `categoryId` (`'60'`, `'75'` or `'tkl'`) and it appears in the grid, filters and cart with no other code changes.

## Accessibility notes

- Semantic landmarks (`header`, `nav`, `main`, `section`, `footer`) and a single `h1`.
- Every icon-only button has an `aria-label`; filter buttons use `aria-pressed`.
- Cart drawer uses `role="dialog"` with focus handling and Escape to close.
- Visible focus rings, and animations are reduced for users who prefer reduced motion.

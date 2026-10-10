# SKIMART Storefront

A production-quality, responsive grocery-commerce frontend for **SKIMART by Retail NEO LLP** —
a neighbourhood supermarket in Amb, District Una, Himachal Pradesh.

Built with **React 18 + TypeScript + Vite + Tailwind CSS + React Router + Zustand + Lucide**.

> This is the **frontend foundation**. It uses a demonstration catalogue and client-side
> cart/favourites state. There is no backend, authentication, payment, or order placement yet.

## Commands

```bash
npm install       # install dependencies
npm run dev       # start the dev server (http://localhost:5173)
npm run build     # type-check + production build into dist/
npm run preview   # preview the production build
npm run typecheck # tsc project build (no emit)
npm run lint      # eslint
npm run smoke     # end-to-end smoke test (see below)
```

The smoke test uses the locally installed Google Chrome via `playwright-core` (no browser
download). Start the dev server first, then run it against that URL:

```bash
npm run dev -- --port 5199
SMOKE_BASE_URL=http://localhost:5199 npm run smoke
```

It verifies homepage rendering, search, category filtering, add-to-cart, quantity steppers,
favourites, the location dialog, the cart drawer, info pages, 404, and responsive overflow.
Screenshots are written to `scripts/artifacts/` (git-ignored).

## Architecture

```
src/
  components/
    cart/       CartIndicator, CartDrawer
    catalog/    ProductCard, ProductGrid, CategoryCard, CartControls, SortSelect
    home/       HeroBanner, PromotionSection, HomeCategorySection, HomeProductSection, StoreTrustSection
    layout/     SiteHeader, ServiceTrustStrip, SiteFooter
    location/   DeliveryLocationSelector
    search/     SearchBar
    ui/         Button, Modal, Toaster, PriceDisplay, QuantityControl, SmartImage,
                StateMessage, SectionHeading, PageContainer, PageTitle, Breadcrumbs,
                FavouriteButton, AddToCartButton, Logo, DemoNotice
  data/         site config, category + product mock data, asset manifest, info pages
  layouts/      SiteLayout (header + trust strip + main + footer + toaster)
  pages/        Home, Categories, Category, Product, Search, Info, Contact, Login, Account, NotFound
  services/     catalog.ts — single data-access layer (swap for API calls later)
  store/        cartStore, favouritesStore, locationStore, toastStore (Zustand)
  lib/          format (INR), safeStorage (validated localStorage)
  types/        Product, Category, CartItem, SortOption, etc.
  styles/       index.css — brand tokens as CSS variables
```

### Routes

`/`, `/categories`, `/category/:slug`, `/product/:slug`, `/search?q=`, `/about`, `/contact`,
`/faq`, `/delivery-information`, `/privacy-policy`, `/terms-and-conditions`,
`/returns-and-refunds`, `/login`, `/account`, and a `404` catch-all.

## Design system

Brand tokens live in **one place** — `src/styles/index.css` (`:root` CSS variables) — and are
mapped into Tailwind in `tailwind.config.js`. Components reference semantic color names
(`bg-brand-orange`, `text-brand-green`) rather than raw hex codes.

Core palette: brand orange `#F28C28`, deep orange `#E7791D`, forest green `#245C38`,
deep green `#173F28`, leaf green `#3C7948`, pale green `#EEF5E8`, warm cream `#FFF4E4`,
warm orange tint `#FCE7CF`. Green carries trust; orange is reserved for primary actions;
cream/pale-green surfaces mark promotional areas.

## Replacing demo imagery

**All demo photos are placeholders.** They are centralised in `src/data/assets.ts` and served
from Unsplash (free to use). Every URL was validated to resolve.

To use real store photography:

1. Drop your images into `public/images/` (e.g. `public/images/products/amul-milk.jpg`).
2. Update the matching key in `src/data/assets.ts` to a local path:
   ```ts
   // before
   milk: img('photo-1550583724-b2692b85b150'),
   // after
   milk: '/images/products/amul-milk.jpg',
   ```
3. No component changes are required. `SmartImage` automatically falls back to
   `public/images/placeholder-product.svg` if an image is missing or fails to load.

Recommended sizes: hero ~1200px wide, promo banners ~700px, category tiles square (≥400px),
product images square (≥600px). Use `object-cover` for editorial shots and square product shots.

## Data that still needs confirmation

These are clearly flagged in the UI (see the **Demo pricing** badge) and must be replaced before
launch:

- All product names, brands, pack sizes and **prices** in `src/data/products.ts`.
- Category images and descriptions in `src/data/categories.ts`.
- Store **phone number and email** — intentionally omitted from `src/data/site.ts` and the
  contact page until the store provides them. Do not invent them.
- Delivery zones, charges, minimum order values, delivery times (no guarantees are claimed).
- Returns/refunds and privacy/terms policy text — currently honest placeholders.

## State & persistence

Cart and favourites persist to `localStorage` via a validated `safeStorage` wrapper that discards
malformed or stale data. No passwords, payment details, or sensitive information are ever stored.

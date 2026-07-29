# Plan: Hemant Tiles and Building Materials Website

## Business context
- **Name:** Hemant Tiles and Building Materials
- **Location:** Tengdamod, Varanasi
- **Products:** Tiles, marble, washroom appliances
- **Goal:** A professional, working website that shows products and lets customers send inquiries.

## Design decisions
- **Palette:** Slate & Steel — clean, industrial, trustworthy.
- **Typography:** DM Serif Display (headings) + Fira Sans (body).
- **Layout:** Split-screen homepage hero, with a product catalog and dedicated contact page.
- **Theme:** Light default, with a complementary dark mode if the template supports it.

## Pages to build

1. **Home — `/` (split-screen hero)**
   - Left side: company name, tagline, short value proposition, CTAs to products and contact.
   - Right side: generated hero image of a modern tile showroom or tiled interior.
   - Below hero: quick categories (Tiles, Marble, Washroom Appliances) with short descriptions and links.
   - Footer with address, phone placeholder, and business hours.

2. **Products — `/products`**
   - Grid of product cards: Tiles, Marble, Washroom Appliances.
   - Each card shows a generated image, short description, and a "Get quote" CTA that jumps to the contact form with a pre-selected product.
   - Optional: a simple inquiry modal per product.

3. **About — `/about`**
   - Company story, experience, quality promise, and location map placeholder.

4. **Contact — `/contact`**
   - Contact form: name, phone, email, product interest, message.
   - Address: Tengdamod, Varanasi.
   - Working contact form backed by Lovable Cloud (database + server function) so inquiries are actually saved.

## Shared chrome
- **Header:** Logo text + navigation links (Home, Products, About, Contact).
- **Footer:** Business name, address, quick links, copyright.
- **Metadata:** Unique `title`, `description`, `og:title`, `og:description`, and canonical for every route.

## Technical work

1. **Design tokens (src/styles.css)**
   - Map background, foreground, primary, secondary, muted, accent, border, and input to the Slate & Steel palette.
   - Add `font-display` and `font-body` tokens pointing to DM Serif Display and Fira Sans.

2. **Fonts (src/routes/__root.tsx)**
   - Load Google Fonts via `<link>` tags in `head()` (preconnect + CSS link).

3. **Routes**
   - Rewrite `src/routes/index.tsx` for the home page.
   - Create `src/routes/products.tsx`, `src/routes/about.tsx`, and `src/routes/contact.tsx`.
   - Update `__root.tsx` with header, footer, and default metadata (do not put canonical on root).

4. **Images**
   - Generate 3–4 images: hero showroom, ceramic tiles, marble slab, washroom appliances.
   - Save under `src/assets/` and import them directly.

5. **Working inquiry form**
   - Enable Lovable Cloud.
   - Create a `public.inquiries` table with columns: id, name, phone, email, product_interest, message, created_at.
   - Add a `createServerFn` POST handler to insert the inquiry.
   - Wire the contact form to that function with a success state.

6. **Validation**
   - Run the dev build and verify the home, products, about, and contact pages render correctly.
   - Test the inquiry form submission end-to-end.

## Out of scope (unless you ask later)
- Online payment / e-commerce checkout.
- Multi-language support.
- Admin dashboard for viewing inquiries (Lovable Cloud provides the data; a simple admin view can be added later).

## Deliverable
A fully styled, multi-page TanStack Start site with a working inquiry form and generated images, ready for your domain.
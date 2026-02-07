# Typography Documentation - Cleanse Ayurveda

## Font Families

| Type | Variable | Font |
|------|----------|------|
| Headings | `var(--font-heading)` | Caelune Beauty, serif |
| Body | `var(--font-body)` | Lexend, sans-serif |

---

## Global Headings (globals.css)

| Element | Desktop | Mobile (≤480px) |
|---------|---------|-----------------|
| `h1` | `clamp(4rem, 10vw, 10rem)` | `clamp(2.5rem, 10vw, 4rem)` |
| `h2` | `clamp(3.25rem, 8vw, 8rem)` | `clamp(2rem, 8vw, 3.25rem)` |
| `h3` | `clamp(2.5rem, 6.5vw, 5rem)` | `clamp(1.75rem, 6.5vw, 2.5rem)` |
| `h4` | `clamp(2rem, 4.5vw, 4rem)` | `clamp(1.5rem, 4.5vw, 2rem)` |
| `h5` | `clamp(1.25rem, 2vw, 3rem)` | `clamp(1.1rem, 2vw, 1.25rem)` |

---

## Body Text

| Class | Size |
|-------|------|
| Base `p` | `clamp(0.8rem, 0.75vw, 0.85rem)` |
| `.md` | `clamp(1rem, 0.8vw, 1.25rem)` |
| `.lg` | `clamp(1.1rem, 0.85vw, 1.35rem)` |
| `.bodyCopy` | `clamp(1.125rem, 0.75vw, 1.25rem)` |
| `.bodyCopy.md` | `clamp(1.25rem, 0.85vw, 1.35rem)` |
| `.bodyCopy.lg` | `clamp(1.375rem, 0.95vw, 1.45rem)` |

---

## Buttons (Global)

| Type | Size |
|------|------|
| Default Button | `clamp(0.85rem, 1vw, 0.85rem)` |
| Hero Button | `0.875rem` / `0.8rem` mobile |
| Cart Checkout | `clamp(0.8rem, 0.9vw, 0.85rem)` |

---

## Home Page (home.css)

### Promo Bar
| Element | Desktop | Mobile (768px) | Mobile (480px) |
|---------|---------|----------------|----------------|
| Text | `0.75rem` | `0.7rem` | `0.6rem` |

### Hero Section
| Element | Desktop | Mobile (≤480px) |
|---------|---------|-----------------|
| Title `h1` | `clamp(4rem, 8vw, 6rem)` | `clamp(4rem, 16vw, 6rem)` |
| Subtitle | `clamp(1rem, 2vw, 1.25rem)` | `clamp(1.1rem, 4.5vw, 1.35rem)` |
| Button | `0.875rem` | `0.8rem` |

### Formulas Section
| Element | Desktop | Mobile (768px) | Mobile (480px) |
|---------|---------|----------------|----------------|
| Tagline | `clamp(1.25rem, 2vw, 1.75rem)` | `clamp(1rem, 4vw, 1.25rem)` | `clamp(0.8rem, 3.5vw, 1rem)` |
| Box Title | `1.1rem` | — | `0.7rem` |
| Box Text | `0.8rem` | — | `0.55rem` |

---

## Peel Reveal Section (PeelReveal.css)

| Element | Desktop | Mobile (≤480px) |
|---------|---------|-----------------|
| Header `h1` (Ancient Secrets) | `10rem` | `clamp(4.5rem, 16vw, 7rem)` |
| Header container width | `40%` | `90%` |
| Intro Text (Shop Now) | — | `clamp(4rem, 15vw, 5rem)` |

---

## Featured Section (FeaturedSection.css)

| Element | Desktop | Mobile (≤480px) |
|---------|---------|-----------------|
| Section Title | `clamp(2.5rem, 5vw, 4rem)` | — |
| Products Section Title | `clamp(1.75rem, 3vw, 2.5rem)` | — |
| CTA Button | `0.9rem` | — |
| Card Label | `0.75rem` | `0.65rem` |
| Product Card Name | `1.1rem` | `0.8rem` |
| Product Card Overlay | `0.95rem` | `0.7rem` |
| Product Card Button | `0.85rem` | `0.7rem` |
| Bottom Right Title | `clamp(1.75rem, 3vw, 2.5rem)` | `clamp(1.5rem, 5vw, 1.75rem)` |
| Bottom Description | `1rem` | `0.9rem` |
| Benefits List | `0.95rem` | — |
| Learn More Button | `0.9rem` | — |

---

## Blog Section (BlogSection.css)

| Element | Desktop | Mobile (≤480px) |
|---------|---------|-----------------|
| Label | `0.7rem` | `0.55rem` |
| Section Title | `clamp(2.5rem, 5vw, 3.5rem)` | `clamp(2.5rem, 10vw, 3rem)` |
| View All Link | `0.6rem` | `0.5rem` |
| Card Number | `0.65rem` | `0.5rem` |
| Card Category | `0.65rem` | `0.5rem` |
| Card Date | `0.65rem` | `0.5rem` |
| Card Title | `1.15rem` | `0.7rem` |
| Featured Card Title | `1.75rem` | `1rem` |
| Card Excerpt | `0.9rem` | — |
| Read More | `0.7rem` | `0.5rem` |

---

## Testimonials (Testimonials.css)

| Element | Desktop | Mobile (≤480px) |
|---------|---------|-----------------|
| Label | `0.875rem` | — |
| Title `h2` | `clamp(2.5rem, 5vw, 3.5rem)` | `clamp(2.5rem, 10vw, 3rem)` |
| Description | `1rem` | `0.85rem` |
| Number | `0.7rem` | — |
| Info Title | `0.9rem` | — |
| Role | `0.75rem` | — |
| Headline | `1.5rem` | `1.3rem` |
| Image Label | `0.6rem` | — |
| Text | `0.8rem` | — |
| CTA Heading `h3` | `clamp(2rem, 4vw, 2.5rem)` | `clamp(1.5rem, 5vw, 2rem)` |
| CTA Text | `1rem` | — |
| CTA Button | `0.9rem` | — |
| CTA Note Title | `1.25rem` | — |
| CTA Note Text | `0.9rem` | — |

---

## Marquee Banner / Clean Living (MarqueeBanner.css)

| Element | Desktop | Mobile (≤480px) |
|---------|---------|-----------------|
| Tagline | `clamp(3rem, 6vw, 5rem)` | `clamp(3rem, 12vw, 4rem)` |
| Letter Spacing | `0.02em` | `0.03em` |

---

## Menu / Navigation (Menu.css)

| Element | Desktop | Mobile (≤1000px) |
|---------|---------|------------------|
| Logo Image Height | `clamp(1.5rem, 2.5vw, 2rem)` | `clamp(2rem, 6vw, 2.5rem)` |
| Logo Text (fallback) | `clamp(1.5rem, 2vw, 2rem)` | `clamp(1.25rem, 5vw, 1.5rem)` |
| Nav Links | `0.875rem` | — |
| Cart Badge | `0.5rem` | — |
| Overlay Main Link | `1.25rem` | `1rem` |
| Overlay Sub Links | — | `0.8rem` |

---

## Cart Page (cart.css)

| Element | Desktop | Mobile (≤480px) |
|---------|---------|-----------------|
| Hero Label | `clamp(0.75rem, 0.9vw, 0.85rem)` | — |
| Hero Heading | `clamp(4rem, 10vw, 8rem)` | `3.5rem` |
| Hero Count | `clamp(0.9rem, 1vw, 1rem)` | — |
| Empty Heading | `clamp(3rem, 7vw, 5rem)` | — |
| Empty Subtitle | `clamp(0.9rem, 1vw, 1.1rem)` | — |
| Shop Now Button | `clamp(0.8rem, 0.9vw, 0.85rem)` | — |
| Discount Message | `clamp(0.85rem, 1vw, 0.95rem)` | — |
| Tier Price | `clamp(0.65rem, 0.8vw, 0.75rem)` | — |
| Tier Label | `clamp(0.55rem, 0.65vw, 0.62rem)` | — |
| Item Name | `clamp(1rem, 1.2vw, 1.15rem)` | — |
| Item Price | `clamp(1rem, 1.2vw, 1.15rem)` | — |
| Item Unit | `clamp(0.7rem, 0.8vw, 0.78rem)` | — |
| Quantity Value | `0.85rem` | — |
| Remove Button | `clamp(0.7rem, 0.8vw, 0.78rem)` | — |
| Summary Title | `clamp(1.1rem, 1.3vw, 1.25rem)` | — |
| Summary Line | `clamp(0.85rem, 0.95vw, 0.9rem)` | — |
| Summary Total | `clamp(1rem, 1.15vw, 1.1rem)` | — |
| Checkout Button | `clamp(0.8rem, 0.9vw, 0.85rem)` | — |
| Continue Link | `clamp(0.7rem, 0.8vw, 0.78rem)` | — |
| Recommended Label | `clamp(0.7rem, 0.8vw, 0.78rem)` | — |
| Recommended Heading | `clamp(2.5rem, 5vw, 4rem)` | — |
| Rec Card Name | `clamp(0.8rem, 0.9vw, 0.88rem)` | — |
| Rec Card Price | `clamp(0.85rem, 1vw, 0.95rem)` | — |
| Rec Add Button | `clamp(0.65rem, 0.75vw, 0.72rem)` | — |

---

## Profile Page (profile.css)

| Element | Desktop | Mobile (≤480px) |
|---------|---------|-----------------|
| Hero Label | `clamp(0.7rem, 0.85vw, 0.8rem)` | — |
| Hero Heading | `clamp(3.5rem, 8vw, 6rem)` | `3rem` |
| Hero Subtitle | `clamp(0.9rem, 1vw, 1rem)` | — |
| Tab Text | `clamp(0.75rem, 0.85vw, 0.82rem)` | `0.7rem` |
| Empty Title | `clamp(2rem, 4vw, 3rem)` | — |
| Empty Text | `clamp(0.85rem, 0.95vw, 0.92rem)` | — |
| Action Button | `clamp(0.75rem, 0.85vw, 0.8rem)` | — |
| Address Name | `clamp(1rem, 1.1vw, 1.05rem)` | — |
| Address Line | `clamp(0.85rem, 0.95vw, 0.9rem)` | — |
| Address Phone | `clamp(0.78rem, 0.88vw, 0.84rem)` | — |
| Edit/Delete | `clamp(0.7rem, 0.8vw, 0.75rem)` | — |
| Add Address Button | `clamp(0.65rem, 0.75vw, 0.7rem)` | — |
| Settings Title | `clamp(1rem, 1.1vw, 1.05rem)` | — |
| Form Label | `clamp(0.68rem, 0.78vw, 0.74rem)` | — |
| Form Input | `clamp(0.85rem, 0.95vw, 0.9rem)` | — |
| Update Button | `clamp(0.75rem, 0.85vw, 0.8rem)` | — |
| Pref Name | `clamp(0.88rem, 0.98vw, 0.92rem)` | — |
| Pref Description | `clamp(0.75rem, 0.85vw, 0.8rem)` | — |
| Sign Out Button | `clamp(0.75rem, 0.85vw, 0.8rem)` | — |

---

## Wardrobe / Shop Page (wardrobe.css)

| Element | Desktop | Mobile (1000px) | Mobile (600px) |
|---------|---------|-----------------|----------------|
| Hero Label | `0.85rem` | — | — |
| Hero Title | `clamp(3rem, 8vw, 5rem)` | — | — |
| Hero Subtitle | `clamp(1rem, 1.5vw, 1.25rem)` | — | — |
| Category Button | `0.875rem` | `0.75rem` | `0.7rem` |
| Filter Label | `0.6rem` | `0.55rem` | `0.7rem` |
| Filter Select | `0.85rem` | `0.75rem` | `0.7rem` |
| Product Card Name | `0.9rem` | — | — |
| Product Card Desc | `0.75rem` | — | — |
| Product Card Price | `0.9rem` | — | — |
| Quick Add Button | `0.65rem` | — | — |
| Spotlight Label | `0.85rem` | — | — |
| Spotlight Title | `3rem` | — | `1.75rem` |
| Banner Label | `0.85rem` | — | — |
| Banner Title | `3rem` | — | `1.75rem` |
| Banner Text | `1rem` | — | — |

### Face Care Cards (wardrobe.css)
| Element | Desktop | Mobile (≤768px) |
|---------|---------|-----------------|
| Name | `16px` | `14px` |
| Price | `20px` | `18px` |
| View Clinicals | `14px` | `12px` |

---

## Text Reveal Component (TextReveal.css)

| Element | Desktop | Mobile (≤480px) |
|---------|---------|-----------------|
| Paragraph | `clamp(1.5rem, 4vw, 2.75rem)` | `clamp(1.25rem, 5vw, 1.75rem)` |
| Button | `0.9rem` | `0.8rem` |

---

## Footer (Footer.css)

| Element | Desktop | Mobile |
|---------|---------|--------|
| Body Copy | `0.95rem` | `0.75rem` |

---

## Shopping Cart Sidebar (ShoppingCart.css)

| Element | Desktop | Mobile |
|---------|---------|--------|
| Button | `clamp(0.85rem, 1vw, 0.85rem)` | `0.75rem` |
| Header Title | `clamp(1.5rem, 2vw, 2rem)` | `1.5rem` |
| Close Button | `clamp(0.8rem, 0.75vw, 0.85rem)` | — |
| Discount Message | `clamp(0.85rem, 1vw, 0.95rem)` | — |
| Tier Price | `clamp(0.7rem, 0.85vw, 0.8rem)` | — |
| Tier Label | `clamp(0.6rem, 0.7vw, 0.68rem)` | — |
| Item Quantity | `clamp(0.85rem, 1vw, 0.9rem)` | — |
| Remove Button | `clamp(0.75rem, 0.9vw, 0.8rem)` | — |
| Summary Row | `clamp(0.85rem, 1vw, 0.9rem)` | — |
| Discount Row | `clamp(0.78rem, 0.9vw, 0.82rem)` | — |
| Total Row | `clamp(0.9rem, 1.1vw, 1rem)` | — |
| Checkout Button | `clamp(0.85rem, 1vw, 0.85rem)` | — |

---

## Contact Form (ContactForm.css)

| Element | Desktop | Mobile |
|---------|---------|--------|
| Input | Inherit | `0.8rem` |

---

## Breakpoints Reference

| Breakpoint | Usage |
|------------|-------|
| `1000px` | Tablet / Menu collapse |
| `768px` | Tablet portrait |
| `600px` | Large mobile |
| `480px` | Mobile |
| `380px` | Small mobile |

---

## Typography Patterns

1. **Responsive Strategy**: Uses `clamp()` for fluid typography throughout
2. **Heading Hierarchy**: H1-H5 follow a clear size progression with viewport scaling
3. **Body Text**: Base is `0.8-0.85rem` with `.md` and `.lg` variants
4. **Mobile Breakpoints**: Major reductions at 1000px, 768px, 600px, and 480px
5. **Component Consistency**: Uses CSS variables for font families
6. **Button Text**: Consistently smaller (`0.75rem-0.9rem`) across all components

---

*Last updated: February 2026*

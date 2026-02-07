# Cleanse Ayurveda - Typography Guide

## Font Families

| Type | Font | CSS Variable |
|------|------|--------------|
| **Headings** | Caelune Beauty (serif) | `var(--font-heading)` |
| **Body** | Lexend (sans-serif) | `var(--font-body)` |

---

## Mobile Typography (≤480px)

### Section Headings

| Section | Size | CSS |
|---------|------|-----|
| **Hero Title** | Extra Large | `clamp(4.5rem, 18vw, 7rem)` |
| **Clean Living** | Large Accent | `clamp(3rem, 12vw, 4rem)` |
| **Our Featured Products** | Standard | `clamp(2.5rem, 10vw, 3rem)` |
| **Why Your Skin Deserves Best** | Standard | `clamp(2.5rem, 10vw, 3rem)` |
| **Shop By Category** | Standard | `clamp(2.5rem, 10vw, 3rem)` |
| **Stories & Insights** | Standard | `clamp(2.5rem, 10vw, 3rem)` |
| **What Our Customers Say** | Standard | `clamp(2.5rem, 10vw, 3rem)` |

### Body Text

| Element | Size |
|---------|------|
| Hero Subtitle | `clamp(1.1rem, 4.5vw, 1.35rem)` |
| Section Descriptions | `0.85rem - 1rem` |
| Card Titles | `0.7rem - 1rem` |
| Labels & Captions | `0.5rem - 0.7rem` |
| Buttons | `0.65rem - 0.85rem` |

---

## Desktop Typography (>768px)

### Section Headings

| Section | Size | CSS |
|---------|------|-----|
| **Hero Title** | Extra Large | `clamp(4rem, 8vw, 6rem)` |
| **Clean Living** | Large | `clamp(2rem, 5vw, 3.5rem)` |
| **Our Featured Products** | Medium | `clamp(1.75rem, 3vw, 2.5rem)` |
| **Why Your Skin Deserves Best** | Medium | `clamp(1.75rem, 3.5vw, 2.5rem)` |
| **Shop By Category** | Large | `clamp(3rem, 6vw, 5rem)` |
| **Stories & Insights** | Large | `clamp(2.5rem, 5vw, 3.5rem)` |
| **What Our Customers Say** | Large | `clamp(2.5rem, 5vw, 3.5rem)` |

### Body Text

| Element | Size |
|---------|------|
| Hero Subtitle | `clamp(1rem, 2vw, 1.25rem)` |
| Section Descriptions | `1rem` |
| Card Titles | `1.15rem - 1.75rem` |
| Labels & Captions | `0.65rem - 0.875rem` |
| Buttons | `0.85rem - 0.9rem` |

---

## Typography Hierarchy

### Mobile Scale

```
XL    → 4.5rem+  → Hero Title
L+    → 3rem     → Clean Living (accent)
L     → 2.5rem   → Section Headings
M     → 1.5rem   → Sub-headings
S     → 0.8-1rem → Card Titles
XS    → 0.5-0.7rem → Labels
```

### Desktop Scale

```
XL    → 4-6rem   → Hero Title
L     → 2.5-3.5rem → Section Headings
M     → 1.75-2.5rem → Sub-headings
S     → 1.15-1.5rem → Card Titles
XS    → 0.65-0.9rem → Labels
```

---

## Heading Styles

All headings use:
- `font-family: var(--font-heading)`
- `font-weight: 400`
- `text-transform: uppercase`
- `line-height: 0.9 - 1.1`
- `letter-spacing: -0.03em to 0.05em`

---

## Breakpoints

| Name | Width | Usage |
|------|-------|-------|
| Desktop | >1024px | Full layout |
| Tablet | 768px - 1024px | Adjusted grid |
| Large Mobile | 480px - 768px | Single column |
| Mobile | ≤480px | Compact layout |

---

## CSS Files Reference

| Component | File |
|-----------|------|
| Hero | `src/app/home.css` |
| Featured Products | `src/components/FeaturedSection/FeaturedSection.css` |
| Shop By Category | `src/components/ShopByProduct/ShopByProduct.css` |
| Blog/Stories | `src/components/BlogSection/BlogSection.css` |
| Clean Living | `src/components/MarqueeBanner/MarqueeBanner.css` |
| Testimonials | `src/components/Testimonials/Testimonials.css` |
| Global Styles | `src/app/globals.css` |

---

## Quick Reference - Standard Mobile Heading

For new section headings on mobile, use:

```css
@media (max-width: 480px) {
  .your-section-title {
    font-family: var(--font-heading);
    font-size: clamp(2.5rem, 10vw, 3rem);
    font-weight: 400;
    text-transform: uppercase;
    line-height: 1.1;
  }
}
```

---

*Last Updated: February 2026*

# Hero Section Update Plan

## Overview
Update the Hero section with: before/after car hover effect, glassmorphism stat cards with countUp, new scroll indicator, and precise load timing.

---

## Files to Modify

| File | Changes |
|---|---|
| `components/Hero.tsx` | Major rewrite — new car section, stats, scroll indicator, timing |
| `app/globals.css` | New keyframes: `scroll-line`, car glow effect, stat card hover styles |
| `public/images/` | Copy user's PNG files as `car-dirty.png` and `car-clean.png` |

---

## Step 1: Copy Images

Copy user-provided images to `public/images/`:
- `/Users/nazar/Downloads/image.png` → `public/images/car-dirty.png` (dirty car)
- `/Users/nazar/Downloads/image2.png` → `public/images/car-clean.png` (clean car)

---

## Step 2: Update `components/Hero.tsx`

### 2a. New Car Section (replaces current background image approach)

Replace the fullscreen `hero.jpg` background with a centered car component:
- Two `<Image>` layers stacked (dirty bottom, clean top)
- Default: clean car at `opacity: 0`
- On hover: clean car fades to `opacity: 1` (Framer Motion `whileHover` on parent)
- Entry animation: `opacity 0→1`, `scale 0.92→1`, `x: -20→0` over 0.9s with `EASE`, delay `0.9s`
- Blue glow `#00B4D8` under car using a blurred `div` with `radial-gradient`
- Glow brightens on hover (opacity increases)

### 2b. Stat Cards — Glassmorphism + CountUp

Replace the current flat stats bar with individual glassmorphism cards:
- Each card: `glass-card` class + custom top gradient line (transparent → #00B4D8 → transparent)
- **Hover**: card lifts (`y: -6`), border glows blue, number color changes to `#00B4D8`
- **Scroll trigger**: cards appear from bottom with stagger (150ms between each)
- **CountUp**: use `react-countup` (already installed) — animate from 0 to final value
  - Wrap in `IntersectionObserver` via Framer Motion `whileInView`
  - Duration: ~2s per counter
  - For `5.0` with `decimals: 1` — use `decimals={1}` prop

### 2c. Scroll Indicator — "SCROLL" + Animated Line

Replace current scroll indicator:
- Text: "SCROLL" (existing)
- Line below: gradient `#00B4D8` → transparent
- Animation: line grows from top to bottom, fades out, repeats infinitely
- Use CSS `@keyframes` for the line animation

### 2d. Precise Load Timing

Update the `fade()` delays to match the spec:

| Element | Delay |
|---|---|
| Badge "5.0 · Google · Львів" | 0ms (after PageLoader clears ~1.4s) → effective 1.4s |
| Title line 1 | 200ms → 1.6s |
| Title line 2 | 350ms → 1.75s |
| Title line 3 | 500ms → 1.9s |
| Subtitle text | 650ms → 2.05s |
| Buttons | 800ms → 2.2s |
| Car | 900ms → 2.3s |
| Google rating card (right) | 1000ms → 2.4s |
| Address card (right) | 1100ms → 2.5s |

**Important**: The PageLoader runs for ~1.4s. The delays above are "after page load", so actual animation delays = `1.4s + spec_delay`.

### 2e. Updated Imports

```tsx
import CountUp from "react-countup";
import { useInView } from "framer-motion";
```

---

## Step 3: Update `app/globals.css`

### 3a. New Scroll Line Animation

```css
@keyframes scroll-line {
  0% { height: 0; opacity: 1; }
  50% { height: 100%; opacity: 1; }
  80% { height: 100%; opacity: 0; }
  100% { height: 0; opacity: 0; }
}
```

### 3b. Stat Card Gradient Top Line

```css
.stat-card-line {
  background: linear-gradient(90deg, transparent, #00B4D8, transparent);
}
```

### 3c. Reduced Motion Updates

Add new animated classes to the `prefers-reduced-motion: reduce` block.

---

## Step 4: Update `lib/data.ts` (if needed)

The existing `STATS` array structure works well. May need to add `icon` field if desired, but current structure is sufficient for countUp.

---

## Animation Library Decision

**Use Framer Motion** (already installed and used throughout). No need for GSAP.
- `react-countup` for number counting (already installed)
- `IntersectionObserver` via Framer Motion's `whileInView`
- `useReducedMotion` for accessibility

---

## Implementation Order

1. Copy images to `public/images/`
2. Add CSS keyframes to `globals.css`
3. Rewrite `Hero.tsx` with all new features
4. Test and adjust timing

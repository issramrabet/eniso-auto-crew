# ENISo AUTO-Crew — Website

A React + Vite site for the club: carbon black / red / white, a proximity-reveal
car unveil, a swipeable crew carousel, a join form, and a contact section.

## 1. Install & run

You need [Node.js](https://nodejs.org) (LTS, 18+) installed. Then, in this folder:

```bash
npm install
npm run dev
```

This opens the site at `http://localhost:5173`. Edit any file in `src/` and the
page updates live.

To build the final static site (what you'll actually deploy):

```bash
npm run build
```

This creates a `dist/` folder — upload its contents to any static host
(Netlify, Vercel, GitHub Pages, your own server). `npm run preview` lets you
check the build locally first.

## 2. Where to put your images

Everything lives under `public/images/`. Filenames must match exactly
(all lowercase, as below) — the code already references these paths.

| What | Path | Notes |
|---|---|---|
| Club logo (navbar + footer) | `public/images/logo.png` | Transparent background, square-ish |
| Covered car — big hero visual | `public/images/car.png` | **Needs a transparent background** — this now sits directly on the hero, right side, no box/card around it, so a PNG cutout (not a rectangular photo) is what makes that work |
| Club emblem for the reveal | `public/images/crew-logo.png` | Transparent background — this fades in over the car as the cursor gets close |
| ENISo background photo | `public/images/eniso.jpg` | Wide/landscape works best |
| 11 crew member photos | `public/images/crew/<file>.jpg` | See exact filenames below |

The car reveal now lives in the **Hero** (first section), not the About
section — title on the left, big car on the right, `src/components/Hero.jsx`
/ `Hero.css`. If your `car.png` still has a background (not transparent),
cut it out first — otherwise you'll see a rectangle instead of a floating
car.

Crew photo filenames (must match `src/data/crew.js` exactly):

```
mahar-fkih-hassen.jpg
isra-nasr.jpg
sirine-cherni.jpg
ahmed-ben-mechria.jpg
arwa-wardi.jpg
issra-mrabet.jpg
malak-chartaoui.jpg
ahmed-cherif.jpg
edriss-amamou.jpg
houssem-ksibi.jpg
farouk-mastouri.jpg
```

If you'd rather use different filenames or `.png`/`.webp`, just update the
paths in `src/data/crew.js` and the `src/components/*.jsx` files that
reference `logo.png` / `car.jpg` / `crew-logo.png` / `eniso.jpg`.

Until real images are dropped in, those spots will just show as empty/broken
images — everything else (layout, effects, text) works immediately.

## 3. Custom cursor (car icon)

This is wired up in **`src/index.css`**, at the top of the file:

```css
body {
  cursor: url('/images/cursors/car-cursor.png') 0 0, auto;
}

a,
button,
[role='button'] {
  cursor: url('/images/cursors/car-pointer.png') 16 16, pointer;
}
```

Drop your two images here:

```
public/images/cursors/car-cursor.png    ← default cursor (everywhere)
public/images/cursors/car-pointer.png   ← shown over links/buttons
```

### Required dimensions — read this before making the images

Browser cursor images are not like normal `<img>` tags — they have hard
technical limits:

- **Use exactly 32×32px.** This is the one size every browser (Chrome,
  Firefox, Safari, Edge) renders reliably and crisply. Some browsers support
  up to 128×128, but Safari silently falls back to the default arrow above
  32×32, so don't risk it.
- **Format: PNG, with a transparent background.** No white/black square
  behind the car shape.
- **Keep file size tiny** (a few KB) — it has to load instantly.
- **The two numbers after the URL are the "hotspot"** — the exact pixel in
  your image that counts as the click point:
  - `car-cursor.png` uses `0 0`, meaning the very top-left pixel is the
    click point. That's fine for a car graphic where you don't need
    pixel-precise clicking (it's just the default roaming cursor).
  - `car-pointer.png` uses `16 16`, the center of a 32×32 image — better for
    something you'll actually click with, like a steering wheel icon or a
    small flag, since the center is the most intuitive "this is where I'm
    clicking" point.
  - If your design has an obvious "tip" (like a car's front bumper), you can
    set the hotspot to that pixel instead, e.g. `4 16`.

If an image fails to load or isn't square/32×32, the browser just falls back
to `auto`/`pointer` — nothing breaks, it just won't look custom.

## 4. How the effects work

- **Car reveal (`Hero.jsx`)** — tracks the cursor over a padded zone around
  the big car image on the right of the first section. The club emblem
  (`crew-logo.png`) is layered on top of the car, masked by a soft circle
  that follows the cursor and fades in as you get closer to the image's
  center. Move away and it fades back to just the car. No box or background
  sits behind it — it's rendered directly on the hero.
- **Crew carousel (`Crew.jsx`)** — a horizontal track you can drag/swipe
  (mouse or touch) or move with the arrow buttons / dot indicators. Built
  with plain state + `framer-motion`'s spring animation, no extra library.
- **Hero title** — each letter animates in on load (`Hero.jsx`).
- **Contact fan (`Contact.jsx`)** — the four social badges fan out and lift
  on hover, with a lightweight particle canvas (`Particles.jsx`) drifting
  behind them.
- Scroll-in animations across sections use `framer-motion`'s `whileInView`.

## 5. Editing content

- **Club description**: `src/components/About.jsx`
- **ENISo paragraph**: `src/components/EnisoIntro.jsx` (placeholder copy —
  edit freely)
- **Crew members / roles**: `src/data/crew.js`
- **Social links** (Instagram, Facebook, WhatsApp, Email + labels): 
  `src/data/socials.js` — this feeds both the Contact section and the footer,
  so you only need to change URLs in one place
- **Colors / fonts**: CSS variables at the top of `src/index.css`
  (`--carbon`, `--red`, `--white`, `--font-display`, etc.)

## 6. Making the forms actually send something

Right now, the "Join the Crew" form and the "Send a message" form in Contact
are front-end only — they just show a success message locally, they don't
email anyone. To actually receive submissions, wire one of these in:

- [Formspree](https://formspree.io) — easiest, no backend needed, free tier
- [EmailJS](https://www.emailjs.com) — sends straight from the browser
- Your own small backend endpoint, if you have one

Both forms are isolated in `src/components/Join.jsx` and
`src/components/Contact.jsx` — the `handleSubmit`/`handleSend` functions are
where you'd swap the `setTimeout` mock for a real `fetch(...)` call.

## 7. Project structure

```
eniso-auto-crew/
├─ index.html
├─ package.json
├─ vite.config.js
├─ public/
│  └─ images/          ← put your photos here (see table above)
│     └─ crew/
└─ src/
   ├─ main.jsx
   ├─ App.jsx
   ├─ index.css         ← colors, fonts, shared utility classes
   ├─ data/
   │  ├─ crew.js
   │  └─ socials.js
   └─ components/
      ├─ Navbar.jsx / .css
      ├─ Hero.jsx / .css
      ├─ About.jsx / .css        (car reveal)
      ├─ EnisoIntro.jsx / .css
      ├─ Crew.jsx / .css         (carousel)
      ├─ Join.jsx / .css         (registration form)
      ├─ Contact.jsx / .css      (socials fan + message form)
      ├─ Particles.jsx
      ├─ SocialIcons.jsx
      └─ Footer.jsx / .css
```

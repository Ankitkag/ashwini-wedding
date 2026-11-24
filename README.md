# Ashwini ❤ Mayur — The Royal Wedding Experience

A premium, cinematic Indian wedding invitation website built with **pure HTML5 + CSS3 + Vanilla JavaScript**. No frameworks, no build tools — just open `index.html` in a browser.

## Features

- Cinematic loader → animated invitation envelope → palace doors opening sequence
- Golden particle canvas, falling rose petals, floating diyas
- Royal palace hero with parallax scrolling
- Live countdown (Indian Standard Time)
- Wedding events timeline (Haldi, Mandap, Mamera, Engagement, Aashirwad, Shubh Lagna)
- Event visual gallery with hover zoom
- Venue section with Google Maps directions
- Family invitation with copy-to-clipboard
- WhatsApp RSVP form (pre-filled message)
- WhatsApp / copy-link / print-to-PDF sharing
- Background music toggle
- Custom animated cursor (desktop), mobile-friendly navigation
- `prefers-reduced-motion` support and print stylesheet

## Quick Start

**Option 1 — Direct open**
Double-click `index.html`. Everything works offline.

**Option 2 — Local server**
```bash
cd Ashwini-Mayur-Wedding
python -m http.server 8000
# open http://localhost:8000
```

## Configuration (`script.js`)

Edit the `CONFIG` object at the top of `script.js`:

| Key | Purpose |
|---|---|
| `whatsappNumber` | RSVP/share number, digits only with country code (e.g. `919876543210`) |
| `mapsUrl` | Google Maps link for the venue |
| `musicSrc` | Path to background music mp3 |
| `weddingDateTime` | Countdown target with IST offset |
| `images` | Photo paths for bride, groom, and event cards |

## Adding Photos

Drop real images into the matching folders — they are picked up automatically:

- `assets/couple/bride.jpg`, `assets/couple/groom.jpg`
- `assets/events/haldi.jpg`, `mandap.jpg`, `mamera.jpg`, `engagement.jpg`

Until a file exists, an elegant placeholder is shown. Any filename works if you update `CONFIG.images`.

## Hosting (Free)

### GitHub Pages
1. Create a repo, upload this folder's contents.
2. **Settings → Pages → Deploy from branch → `main` / `/ (root)`**.
3. Site live at `https://<username>.github.io/<repo>/`.

### Netlify
1. Drag & drop the `Ashwini-Mayur-Wedding` folder onto [app.netlify.com/drop](https://app.netlify.com/drop).
2. Done — instant live URL, free HTTPS.

## File Structure

```
Ashwini-Mayur-Wedding/
├── index.html      # All sections & content
├── style.css       # Design system & animations
├── script.js       # Interactions, FX, CONFIG
├── assets/
│   ├── images/  couple/  ganesh/  events/  palace/  flowers/  music/
└── README.md
```

## Wedding Details (as supplied)

- **Bride:** Ashwini (अश्विनी), M.Sc. — Daughter of Shri Lokesh Bhandari
- **Groom:** Mayur (मयूर), B.E. Civil — Son of Shri Bharat Singh Kushwah
- **Date:** Wednesday, 2 December 2026 · 8:00 PM (शुभ लग्न)
- **Venue:** Juni Manawar, District Dhar, Madhya Pradesh
- **Families:** Shri Lokesh Ji, Smt. Anita Bhandari, Vijay, Harshita, Shravani एवं समस्त भण्डारी परिवार

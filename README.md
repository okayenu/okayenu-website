# Fitsona

Three.js-powered fashion ecommerce test build with immersive 3D product viewing, a full storefront flow, and AI-assisted shopping features.

**Live demo:** [okayenu.github.io/Fitsona-test-build](https://okayenu.github.io/Fitsona-test-build/)

## Overview

Fitsona is a Next.js fashion commerce prototype that combines editorial storefront design with interactive 3D experiences. Users can browse collections, inspect products in a Three.js viewer, manage cart and checkout flows, and interact with an embedded AI chat widget for recommendations and support.

## Features

- **3D storefront hero** — interactive hoodie model on the homepage via React Three Fiber
- **Product catalog** — categories, listings, product detail pages, and lookbook
- **Commerce flows** — cart, checkout, orders, wishlist, and shipping tracking
- **AI chat widget** — conversational shopping assistant with product context
- **Search overlay** — catalog search with autocomplete-style UX
- **Merchant dashboard** — seller analytics and inventory-oriented views
- **Account area** — auth, profile, and preference management
- **Responsive UI** — Tailwind-based layouts from mobile through desktop

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS, Framer Motion |
| 3D | Three.js, React Three Fiber, Drei |
| State | Zustand |
| Testing | Playwright |

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Install and run

```bash
git clone https://github.com/okayenu/Fitsona-test-build.git
cd Fitsona-test-build
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Other scripts

```bash
npm run build    # production build
npm run start    # start production server
npm run lint     # ESLint
```

## Project Structure

```
Fitsona-test-build/
├── src/
│   ├── app/                 # Next.js App Router pages
│   ├── components/          # UI, layout, cart, chat, search
│   └── lib/                 # store, types, seed data
├── styles/                  # legacy CSS reference files
├── scripts/                 # Playwright screenshot utilities
├── docs/                    # implementation schedule
├── public/                  # static assets and 3D models
└── package.json
```

## Architecture

```
Browser → Next.js App Router → React Components
                              → Zustand store
                              → React Three Fiber / Three.js (3D)
                              → Playwright (screenshots / smoke tests)
```

## Author

[Okayenu](https://github.com/okayenu)

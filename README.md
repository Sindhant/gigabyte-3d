# GIGABYTE 3D Gaming Hardware Website

An independent, frontend-only gaming-hardware showcase inspired by the GIGABYTE and AORUS product ecosystem. Built as a visual concept rather than an official brand site, it combines editorial storytelling, a live Three.js PC illustration, component browsing, and a budget-based PC build planner.

> **Independent concept — not affiliated with or endorsed by GIGABYTE.** The 3D tower and editorial imagery are illustrative, not product-accurate representations. Product names and marks belong to their respective owners.

## Overview

The site guides visitors from a cinematic introduction through the idea of a personalized gaming setup, into an interactive PC concept and component explorer, and finally to a practical sample build planner, product categories, and hardware explainers.

Implemented features include:

- Full-screen editorial hero with a looping, muted Pexels video and locally hosted poster fallback.
- Responsive navigation with a collapsible small-screen menu.
- A custom procedural Three.js gaming-PC concept with RGB fan animation, floating motion, pointer response, drag-to-rotate, rotate/reset controls, responsive rendering, and a WebGL-unavailable message.
- A seven-category component explorer with keyboard navigation, previous/next controls, editorial imagery, animated focus markers, and a desktop scroll-driven presentation. The scroll-pinned presentation is disabled for narrow viewports and when reduced motion is requested.
- Three budget tiers in the build planner. Selecting a tier updates sample component cards, compatibility reminders, shopping-search links, and an estimated INR total. Cards expand to show their fit checks.
- A product-category catalog with official GIGABYTE category links, plus concise educational hardware notes.
- CSS and GSAP transitions, responsive layouts, keyboard focus styling, and reduced-motion handling for major motion effects.

The planner's ranges are illustrative planning estimates, not live quotes or guaranteed current prices. It does not check stock, validate a complete parts list, or calculate compatibility automatically. Verify exact specifications, fit, pricing, and availability with the product makers and retailers before buying.



## Requirements

- Node.js **20.19+** or **22.12+** (the installed Vite/Rolldown toolchain requires one of these supported ranges; the project lockfile pins Vite 8.3.5).
- npm.
- A modern browser with WebGL support for the interactive 3D canvas.
- Internet access for Google Fonts, the remote Pexels hero video, remote component-explorer photos, and outbound GIGABYTE/Amazon links. The hero video includes a local poster image for a visual fallback.

## Install and run

Run these commands from the project root (`gigabyte-3d/`):

```sh
npm ci
npm run dev
```

Vite binds to `127.0.0.1`; open the local URL printed in the terminal (normally `http://127.0.0.1:5173`). Stop the development server with `Ctrl+C`.

Create and serve a production build locally with:

```sh
npm run build
npm run preview
```

The production output is written to `dist/`. `npm run preview` serves that output on the local machine. There are no application environment variables, backend services, database, authentication, checkout, or automated test/lint scripts configured in `package.json`.

## Project structure

```text
gigabyte-3d/
├── index.html                     # Page markup, sections, hero video, 3D canvas mount, app entry
├── package.json                   # Pinned runtime dependencies and Vite commands
├── package-lock.json              # npm lockfile (lockfile version 3)
├── README.md                      # Project and developer documentation
├── public/
│   └── images/
│       ├── hardware-editorial.jpg # Locally served hero poster and editorial background
│       ├── hardware-detail.jpg    # Graphics-card visual reference
│       ├── component-build.jpg    # Hardware/platform editorial reference
│       ├── laptop.jpg             # Local category/editorial asset
│       ├── monitor.jpg            # Local category/editorial asset
│       └── 14203516_3840_2160_25fps.mp4 # Local video asset; the current hero uses remote Pexels sources
└── src/
    ├── css/
    │   └── styles.css             # Design tokens, layout, visual effects, breakpoints, reduced motion
    ├── assets/
    │   └── models/                # Reserved location; no GLB model is currently configured here
    └── js/
        ├── main.js                # Initializes navigation, catalog, explorer, reveals, planner, 3D model
        ├── model.js               # Active Three.js procedural PC renderer and pointer/control behavior
        ├── scene.js               # Separate GLTF-capable scene implementation; not imported by main.js
        ├── scrollAnimations.js    # GSAP ScrollTrigger story helpers; not imported by main.js
        ├── interactions.js        # Catalog, budget planner, component explorer, navigation, reveal behavior
        └── products.js            # Catalog categories, component content, and story data
```

`dist/` is generated by Vite and excluded from version control alongside `node_modules/` in `.gitignore`. The app entry point imports `model.js`; the current page does not initialize the alternate `scene.js`/`scrollAnimations.js` scene path.

## How the app is organized

### Page and startup

`index.html` contains the one-page section structure and stable element IDs used by the JavaScript: hero, manifesto, PC story, component explorer, build planner, editorial feature, technology notes, catalog, final call-to-action, and footer. The JavaScript entry module is `/src/js/main.js`.

On startup, `main.js` initializes the responsive navigation, renders the catalog from `products.js`, sets up the component explorer and reveal effects, renders the planner, and then starts the floating Three.js PC. The site is a static client-side experience; the links open external product/category or shopping-search destinations.

### Three.js PC concept

The active renderer is in `src/js/model.js`. It builds a generic tower, motherboard details, GPU, memory, power components, cooling, lights, and RGB fans from Three.js geometry and materials in code. The canvas responds to pointer movement, supports pointer drag and the on-screen rotation/reset buttons, resizes with its container, and throttles rendering when the visitor has enabled reduced motion. If WebGL initialization fails, the canvas displays a brief unavailable message.

This model is generated geometry, not a supplied GIGABYTE product model. A second, presently unused implementation in `src/js/scene.js` includes an optional GLTF-loading path. To explore that path, configure `MODEL_CONFIG.url` and matching mesh node names in that file and wire `createShowcaseScene()` into the application deliberately; simply adding a GLB file does not activate the alternate renderer. Use only model files for which you have the necessary rights.

### Component explorer and motion

The component data and category links are defined in `src/js/products.js`; `setupComponents()` in `src/js/interactions.js` renders the tabs and updates the associated editorial image, copy, hotspot, and official category link. On wide screens, the explorer can use a pinned scroll sequence; on narrow screens or with `prefers-reduced-motion: reduce`, it remains a regular interactive selector instead. Images are visual references only; some remote images may show other brands.

`src/js/scrollAnimations.js` contains separate GSAP/ScrollTrigger camera-story and interface-animation helpers. It is currently not imported by `main.js`, so those helpers should not be described as the active PC camera experience unless they are wired into the app.

### Build planner

Budget tiers, component rows, compatibility reminders, INR price ranges, and Amazon India category-search URLs live in `src/js/interactions.js`. The planner computes its displayed total by summing the lower and upper bounds of the listed ranges. These are static editorial values; there is no price feed, retailer inventory API, compatibility engine, or purchase flow. Update the tier buttons/options in `index.html` and the corresponding data in `interactions.js` together if adding or renaming tiers.

### Styling and accessibility

`src/css/styles.css` contains the site-wide CSS custom properties near its beginning, followed by component styles and responsive breakpoints. The CSS includes a reduced-motion media query. The mobile navigation exposes `aria-expanded`; the component selector uses tab semantics and arrow-key navigation; relevant controls have accessible labels and visible focus states. Check new interactive controls with keyboard-only navigation and at narrow viewport sizes.

## Dependencies and configuration

Declared direct dependencies (pinned in `package.json`):

| Package | Version | Use |
| --- | ---: | --- |
| [Three.js](https://threejs.org/) | `0.160.0` | Procedural 3D scene, canvas renderer, and GLTF loader in the alternate scene module |
| [GSAP](https://gsap.com/) | `3.12.5` | Component-explorer transitions and the separate ScrollTrigger animation module |
| [Vite](https://vite.dev/) | `8.3.5` | Development server and production bundling |

The app is plain JavaScript and CSS; there is no React/Vue framework, TypeScript configuration, router, Tailwind/PostCSS configuration, ESLint/Prettier configuration, or `.env` template in the project root. Fonts are loaded from Google Fonts in the page head and stylesheet. No separate `vite.config.*` is present; Vite uses its defaults and the scripts in `package.json`.

## Updating content and assets

- **Page sections and hero video sources:** edit `index.html`. The hero currently references two remote Pexels MP4 sources and uses `/images/hardware-editorial.jpg` as its poster. The local MP4 in `public/images/` is not referenced by the current hero markup.
- **Catalog and component explorer data:** edit `src/js/products.js`, including official category destinations and image paths.
- **Planner tiers and prices:** edit `buildPlans`, `categoryLinks`, and the associated renderer in `src/js/interactions.js`; keep the estimate disclaimer accurate.
- **Design tokens, responsive layout, and visual effects:** edit `src/css/styles.css`.
- **Active procedural model:** edit `src/js/model.js`.
- **Alternate GLTF renderer:** edit `MODEL_CONFIG` and model behavior in `src/js/scene.js`; integrate it into `main.js` before expecting it to run.
- **Story camera animations:** edit `src/js/scrollAnimations.js` only if integrating that currently unused module.
- **Local images/videos:** put public URL-addressable files in `public/` and reference them from HTML/data using paths such as `/images/file.jpg`. Respect the source asset's licensing and do not label editorial references as GIGABYTE products.

## Build and verification

```sh
npm ci
npm run build
npm run dev
```

There is no automated test suite configured. For a manual check after changes:

1. Confirm `npm run build` completes.
2. Load the site in a WebGL-capable browser and check the hero poster/video fallback and the 3D model.
3. Drag the model and use rotate/reset controls; confirm resizing and the WebGL fallback if testing an unsupported browser.
4. Navigate the component explorer with mouse and keyboard; check desktop scroll behavior, mobile selector behavior, and reduced-motion preference.
5. Change each planner tier and expand multiple cards; confirm prices, totals, fit-check text, and outbound links match the data.
6. Check desktop and phone widths for horizontal overflow and verify external destinations manually.
7. Inspect the browser console and network panel for failed remote videos, fonts, or editorial images.

The current production build may emit Vite's advisory that the JavaScript chunk exceeds 500 kB after minification. The build can still succeed; consider code splitting or reviewing bundled dependencies if optimizing initial load.

## Deployment notes

This is a static Vite site and can be deployed to a static hosting provider by building with `npm run build` and publishing `dist/`. Hosting configuration is not included in the repository. Check the chosen host's path/base configuration if deploying under a subpath, since current public asset references are root-relative. Confirm rights and availability for all local and remote media, test the remote video sources in the target region, and re-check external links before public release.

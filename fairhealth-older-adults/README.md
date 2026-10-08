# FAIR Health Consumer — Older Adults

Static site for the Older Adults landing page and the Alzheimer's Disease
section. Built with **plain HTML + Bootstrap 5 (Sass)**. No build step is
required to view the pages; only the CSS is compiled from Sass.

## Structure

```
fairhealth-older-adults/
├── index.html                 Landing page (Older Adults)
├── alzheimers/
│   ├── index.html             Alzheimer's main page
│   └── resources.html         Alzheimer's resources page
├── financial-literacy/
│   ├── index.html             Financial Health Literacy Guide
│   ├── get-coverage.html      Get Coverage (filterable options + rail)
│   └── manage-costs.html      Manage Your Costs (filterable, reuses .gc styles)
├── assets/
│   ├── main.css               Compiled stylesheet (generated — do not edit)
│   └── images/                toolbar.png, hero.png, alzheimers.png, tool icons
├── js/
│   ├── landing.js             Landing-page interactions (dropdowns, chips, zip)
│   ├── financial-literacy.js  Financial guide toolkit dropdown
│   ├── get-coverage.js        Get Coverage FLIP-animated card filter
│   └── manage-costs.js        Manage Your Costs FLIP-animated card filter
├── scss/                      Source styles (edit these)
│   ├── main.scss              Entry: Bootstrap overrides → Bootstrap → FH layers
│   ├── abstracts/             _variables (tokens + BS overrides), _mixins
│   ├── base/                  _tokens (CSS custom properties + reset/type)
│   ├── layout/                _layout (container, toolbar, breadcrumb, footer)
│   ├── components/            _components (dropdown, chip, button, toolkit banner)
│   └── pages/                 _landing, _alzheimers-main, _alzheimers-resources,
│                               _financial-literacy, _get-coverage
├── prototype-reference/       Original React prototype (design reference only)
├── package.json
└── .gitignore
```

## Design tokens

All brand values live once in `scss/abstracts/_variables.scss` as Sass
variables (e.g. `$fh-purple`). They are also emitted as CSS custom properties
in `scss/base/_tokens.scss` (e.g. `--purple`), so markup can reference either.
Bootstrap's own variables (`$primary`, `$body-bg`, …) are overridden from the
same FH tokens, so generated Bootstrap utilities inherit the brand.

## Build the CSS

```bash
npm install          # one time — pulls bootstrap + sass
npm run build:css    # compile scss/main.scss -> assets/main.css (compressed)
npm run watch:css    # rebuild on save while developing
```

`main.css` is committed for convenience but is generated output; edit the
`scss/` partials, not the compiled file.

## Single-project linking

All pages live in one project and link with relative paths:

- Landing "More Information" → `alzheimers/index.html`
- Landing "Resources" → `alzheimers/resources.html`
- Landing "Explore the guide" → `financial-literacy/index.html`
- Alzheimer's / Financial pages "Older Adults" breadcrumb → `../index.html`
- Financial "Get Coverage" → `financial-literacy/get-coverage.html`
- Get Coverage breadcrumb → `../index.html` and `index.html` (Financial guide)

## Images (placeholders)

`assets/images/` currently holds placeholder PNGs. Replace with finals,
keeping the filenames:

- `toolbar.png` — 1222×72 navigation bar
- `hero.png` — landing hero photo (any width; cover-cropped to fill height)
- `alzheimers.png` — callout photo (shown at 202px wide on desktop)
- `hero-photo.png`, `tool-medical.png`, `tool-dental.png` — Alzheimer's pages

## Deployment

Static host (Netlify drop, S3, etc.). Upload the project folder minus
`node_modules/`, `scss/`, and `prototype-reference/` — or just run
`npm run build:css` first and deploy everything except `node_modules/`.

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

GameNightGPT marketing website - a static site built with Eleventy 3.x and Tailwind CSS 4.0.

## Common Commands

```bash
# Development
npm start              # Start dev server with live reload (Eleventy + PostCSS watch)
make dev               # Alias for npm start

# Build
make build             # Production build (Eleventy + PostCSS)
npm run build          # Eleventy only
npm run build:css      # PostCSS only

# Test production build locally
make test              # Serves _site on port 8000

# Deployment
make deploy            # Build + create .nojekyll for GitHub Pages

# Other
make clean             # Remove _site directory
make install           # npm ci
```

## Architecture

**Static Site Generator**: Eleventy with Nunjucks templating

**Key directories**:
- `src/_includes/layouts/` - Base layouts (base.njk, post.njk)
- `src/_includes/partials/` - Reusable components (navbar, hero, footer, etc.)
- `src/blog/posts/` - Blog content in Markdown
- `src/_data/site.json` - Global site metadata
- `src/css/main.css` - Tailwind + design system CSS

**Component pattern**: Homepage (`src/index.njk`) is composed entirely of Nunjucks partials. Modify individual partials to update sections.

**CSS processing**: PostCSS processes `src/css/main.css` with Tailwind 4 and autoprefixer, outputs to `_site/css/style.css`.

## Design System

Custom CSS variables defined in `src/css/main.css`:
- `--bg-dark-coffee: #261C15` - Dark backgrounds
- `--bg-paper: #E6DFD0` - Light content areas
- `--accent-gold: #EAD4AA` - Primary accents
- `--accent-orange: #C25E00` - Secondary emphasis

Fonts: Outfit, DM Sans, Fraunces (loaded via Google Fonts in base layout)

Use design system variables instead of hardcoding colors.

## Deployment

GitHub Actions deploys to GitHub Pages on push to `main` branch. The workflow runs `npm ci`, builds, and deploys `_site/`.

## External Integrations

- **Newsletter**: Buttondown API (handled in `src/js/newsletter.js`)
- **Analytics**: Plausible (configured in base layout)

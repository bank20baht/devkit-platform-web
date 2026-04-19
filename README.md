# DevKit Platform Web

Shell host application for the DevKit micro-frontend ecosystem, built with Angular 21 and Native Federation.

**Live:** https://devkit-platform.20baht.com

---

## Overview

DevKit Platform Web is the host shell that provides a unified layout — sidebar, topbar, workspace, and tweaks panel — and dynamically loads remote micro-frontend modules via Native Federation.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Angular 21 |
| Micro-frontends | `@angular-architects/native-federation` |
| Styling | Tailwind CSS 4 |
| Icons | `lucide-angular` |
| Testing | Vitest |
| Package Manager | Bun |
| Deployment | AWS S3 + Cloudflare |

## Project Structure

```
src/app/
├── core/          # Services: theme, tools, tweaks
├── shared/        # Shared utilities and icon helpers
├── components/    # Global components (fallback, 404)
├── modules/
│   ├── shell/     # Layout: sidebar, topbar, workspace, palette
│   └── landing-page/
└── pages/
    └── landing/
```

## Remote Modules

Configured in `federation.config.js`:

| Route | Remote Module |
|---|---|
| `/diff-checker` | `devkit-diff-checker-web` |

## Getting Started

```bash
bun install
bun run start       # Dev server at http://localhost:4200
bun run build       # Production build
bun run test        # Run unit tests
```

## Deployment

```bash
./deploy.sh         # Build and deploy to S3 + Cloudflare
```

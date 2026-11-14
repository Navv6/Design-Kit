> **Legacy milestone notes**: this file contains older proposed scopes and may describe incomplete items as planned. For current Codex priorities use [`V05_BACKLOG.md`](V05_BACKLOG.md) and [`../HANDOFF.md`](../HANDOFF.md).

# Roadmap

## v0.1 — base explorer
- [x] 6 original assets, search, filters, source view and copy
- [x] initial Three.js component, client-side dynamic import

## v0.2 — diversity milestone
- [x] 40 assets in 9 families
- [x] TypeScript source files, category IDs and metadata for all entries
- [x] offline visual catalog + interaction demos + source viewer
- [x] 2 additional R3F scenes and 2 GLSL sources (prototype)
- [x] basic TypeScript syntax transpile and catalog checks
- [ ] Next.js package install, type-check and production build in connected development environment
- [ ] GPU scenes visual QA, reduced-motion and no-WebGL fallback for every scene
- [ ] formal keyboard/a11y audits (modal focus trap, sheet focus trap, tooltip descriptions)
- [ ] component unit tests and performance budgets

## v0.3 — usability and real installations
- [ ] prop control panel for each asset
- [ ] component-scoped CSS and tokens
- [ ] shadcn registry build, public or local distribution endpoint
- [ ] agent-readable query/install API
- [ ] curated compositions gallery and favorites
- [ ] individual assets and variants with visual test baselines

## v0.4+ — a composable design system
- [ ] drag-to-compose section builder
- [ ] presets, style themes and Figma token sync
- [ ] source/license tracking
- [ ] 3D model upload / live material controls

- [x] v0.3: 20 Visual Core presets, 60 assets total.
- [ ] Visual regression tests and detailed style applicability benchmark.


## v0.4 delivered: Composition Lab
- 20 Visual Core presets + 6 recipes, UI/Motion/3D mixing, live preview.
- Export JSON, repository-local TSX recipe, and agent prompt; import validated JSON.
- Offline 2D simulation and dynamic WebGL runtime kept distinct.

## v0.5 candidate improvements
- Freeform layer ordering, props inspector for each asset.
- Add-to-composition from any of the 60 existing catalog assets.
- Capability detection with device-based 3D quality tiers.
- Per-composition snapshot/visual regression and TypeScript CI build.

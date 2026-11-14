# NAVV6 Design Atlas — Codex Agent Rules (v0.4 handoff)

## Mission
Develop **the existing** NAVV6 Design Atlas incrementally. This is an AI-readable design asset catalog and visual Page Composer, not a new website to rebuild from scratch. Keep the existing 60 IDs, 20 Visual Cores, 15 composable block IDs, and JSON schemaVersion 1 functional.

## Read first
1. `HANDOFF.md` — current state, verified results, and known gaps.
2. `docs/V05_BACKLOG.md` — prioritized milestones and acceptance criteria.
3. `docs/CODEX_START_PROMPT.md` — initial Codex assignment.
4. `docs/VALIDATION.md` — what has actually been tested.
5. `docs/DECISIONS.md` — architecture decisions.

## Authoritative source paths (verified against the handoff archive)
- `data/catalog.json` — 60 design assets and stable IDs, intended use, source, dependencies.
- `registry.json` — source-oriented registry, **not yet a remote install service**.
- `data/composer.ts` — `Composition` schema, `BlockId` union, 15 `BLOCK_LIBRARY` entries, serializer, validator, export code.
- `data/composer-manifest.json` — descriptive manifest of the composer block library.
- `data/compositions/*.json` — three example schemaVersion 1 compositions.
- `components/composer/renderer.tsx` — canonical composed-page React renderer, including GPU lazy loading and fallback.
- `components/composer/composer.css` — renderer styles, imported by renderer.
- `components/composer/builder.tsx`, `builder.css` — editor and UI styles.
- `app/builder/page.tsx` — live composer route; `app/page.tsx`, `app/ui.tsx` — 60-asset explorer.
- `components/atlas/*` — source components, including Three.js and shaders.
- `styles/visual-cores/all.css` — Visual Core *catalog preview* CSS; the builder principally applies core palettes and limited per-core overrides via renderer.
- `offline-builder-preview.html` — **offline CSS simulation**; NOT a GPU correctness oracle.

Do not follow stale paths such as `data/compositions.ts`, `components/composer/stage.tsx`, `styles/composer.css`, or `offline-builder.html`; they were incorrect in older notes.

## Design/implementation invariants
- **Existing asset IDs are immutable.** Add new IDs rather than repurposing old ones. Namespaces: `CMP`, `MOT`, `LAY`, `3D`, `SHD`, `TYP`, `DAT`, `BG`, `INT`, `VCR`.
- Prefer matching assets by `useWhen`, `avoidWhen` and actual source file. Preserve provenance. Do not copy offline preview simulations as production code.
- Use `CompositionRenderer` for both live canvas and generated `page.tsx`. Keep JSON import/export compatible with `schemaVersion: 1`; if a future schema is required, add versioned migration and tests.
- Source file is the implementation authority. Keep catalog entry, renderer mapping, dependency metadata, manifest, preview and tests consistent when extending blocks.
- Heavy Three.js/R3F/GLSL components should stay client-only, opt-in, lazy-loaded, with WebGL fallback and reduced-motion support. No unconditional WebGL on library thumbnails. Verify actual GPU behavior before calling it tested.
- Provide semantic UI, keyboard interaction, visible focus, adequate contrast, responsive layouts, and explicit performance/fallback behavior.
- A button demo is not production business logic (`CMP-003`); do not silently claim it performs real actions.
- A generated TSX page is **repository-dependent**, not a standalone export. It needs this repository's renderer, CSS and dependencies.
- Do not expand the component count until P0 compilation/quality gaps are closed and at least a minimal automated quality gate exists.

## Required workflow
1. Inspect the actual files and current scripts; never trust outdated discussion or screenshots over source.
2. Run `npm run check:catalog`, `npm run check:composer`, `npm run check:imports`, `npm run check:compositions`.
3. With dependencies installed: `npm run typecheck`, `npm run build`, then start `npm run dev` and browser-test `/` and `/builder`.
4. Confirm JSON export -> import roundtrip and a generated `page.tsx` applied within this repository. Exercise mobile layout and reduced-motion behavior; evaluate 3D on real WebGL-capable browser if available.
5. Make one small, testable change at a time. Preserve the original visual core catalog and 3D fallback behavior.
6. For each completed work item: update `docs/VALIDATION.md`, `docs/V05_BACKLOG.md` and `docs/FEEDBACK_LOG.md` as applicable; describe files modified, commands run, results, and unresolved risks in final response.

## Verification honesty
- Handoff static checks ran successfully; the full dependency installation, production build, typed React check and actual WebGL rendering have NOT yet been verified in this environment.
- Static checks alone do not prove React runtime correctness. If browser/GPU unavailable, state this explicitly and provide exact manual test steps.
- No publishing/deploy, remote registry endpoint, Figma sync, standalone site exporter, or cloud autosave exists yet.

## First task
Run the P0 baseline from `docs/V05_BACKLOG.md`; do not jump into implementing a new design style before making the current project reliably buildable.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

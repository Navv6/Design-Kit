# Page Composer v0.4 — implementation note

## Scope

- `/builder`: Visual Core (20) selection, accent override, 15 curated blocks from the 60-asset catalog
- Add/remove/reorder sections, edit section labels, headings/descriptions and size
- Mobile/tablet/desktop preview width switch
- Save/edit via browser localStorage; JSON import/export with schema validation
- Export `app/page.tsx` and agent brief. Generated source reuses the actual `CompositionRenderer`; it is **not** a standalone artifact.
- GPU blocks use IntersectionObserver + Next dynamic import + WebGL/reduced-motion fallback.

## Important limitations

- The original 60-asset catalog is unchanged. 15 assets are integrated into the composer; the rest are browse-only.
- The `CompositionRenderer` is the canonical rendering implementation for the v0.4 builder and generated code. The separate offline HTML review is an illustrative fallback with CSS simulations for 3D.
- Some v0.3 assets have hardcoded content. Their block-level heading/description can be edited, but inner props may be fixed until v0.5.
- `CMP-003` button is intentionally a visual demo without a bound business action. Exported application needs to wire this up.
- Full Next.js dependency installation / build and real WebGL interaction have not been exercised if the environment lacks npm registry access.

## Files

- `data/composer.ts`: schema / curated block library / export helpers
- `components/composer/renderer.tsx`: canonical page renderer
- `components/composer/composer.css`: portable page renderer CSS
- `components/composer/builder.tsx`, `builder.css`: editor UI
- `app/builder/page.tsx`: editor route
- `offline-builder-preview.html`: self-contained interactive *visual approximation*, no GPU.

## Future implementation

- Move hardcoded assets to explicit Props schemas and fixtures.
- Add true portable component package export and dependency graph checking.
- Per-asset performance / accessibility checks, history, preview snapshots.
- Drag/drop, visual layering for background effects, recipe versioning, sharing.

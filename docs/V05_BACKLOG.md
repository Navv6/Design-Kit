# v0.5 Development Backlog (Codex)

- [x] 2026-11-20 saved-card transfer INT-012, actual shortlist and nested ASSET flow validated.

- [x] 2026-11-20 Figma 3D Box reference and INT-011 CSS perspective controls, feed flow and independent runtime validation.

- [x] 2026-11-18 daily Riff addition, OTP verification INT-010. Feed media, direct experience, nested source dialog and independent fixture verified.

## Priority P0 — Make the current project demonstrably runnable (first milestone)
- [x] Generate `package-lock.json` with `npm install` and verify a clean Node 22 LTS install with `npm ci`.
- [ ] Commit the lockfile after establishing the intended Git root. The archive is untracked under the drive-level `E:/.git` with no commits.
- [x] `npm run check`, `npm run typecheck`, and `npm run build` pass. See `docs/VALIDATION.md` for results.
- [x] Open `/` and `/builder` on a Next.js dev server. Search, filter, and open the live and source previews for all 60 assets.
- [x] Switch from VCR-006, add CMP-002 and 3D-001, reorder blocks, edit properties and accent, roundtrip JSON, and run the exported `page.tsx` in the same repository.
- [x] Import all 3 sample compositions and capture screenshots of VCR-006, VCR-002, and VCR-016.
- [x] Test responsive widths (375, 768, 1440), keyboard focus and activation, and reduced-motion GPU fallback.
- [x] Render real WebGL 2 scenes and test simulated WebGL-unavailable and WebGL 1-only conditions. Record renderer and console results.
- [x] Fix the reproduced WebGL initialization error and missing favicon. Report remaining coverage in `docs/VALIDATION.md`.

**P0 acceptance:** Reproducible install/build, no broken import paths, source and editor routes work, JSON roundtrip succeeds, and validation evidence is written.

## Priority P1 — Real Props Inspector (second milestone)
- [ ] Choose editable props design for **CMP-002 Glass Card**, **MOT-001 Magnetic Button**, **3D-001 Particle Field** only as first vertical slice.
- [ ] Define typed prop metadata (type, range, defaults, labels, docs, performance constraints) in a single data source. Avoid duplicated editor/render defaults.
- [ ] Add config option compatible with existing `schemaVersion:1` projects; either optional backward-compatible `props` and defaulting, or versioned migration with tests. Never silently discard old fields.
- [ ] Dynamically render controls based on selected component type (color, range, select, toggle). Show values in preview immediately.
- [ ] Apply same values in exported `page.tsx` renderer; import/export roundtrip preserves them.
- [ ] Add unit/schema tests and UI smoke tests for edge values. For 3D apply clamp, reduced motion and low-power fallback.

**P1 acceptance:** 3 controls work in editor AND exported page, old JSON still loads, no broken GPU fallback, tests pass.

## Priority P2 — Layer composition, then portability
- [ ] Introduce `background` vs `content` role, z-index and pointer-events semantics rather than stacking every asset in a vertical section.
- [ ] Support an Aurora/Particles background behind a content block with explicit blend/opacity and contrast rules.
- [ ] Enforce reduced motion and WebGL fallback for layered backgrounds; ensure mobile quality adjustment.
- [ ] Explore portable export bundle (dependencies + CSS + assets) only AFTER matching current repo-local renderer output.

**P2 acceptance:** A style preset + readable hero + optional animated background coexist on desktop/mobile; exporter does not lose dependencies or styles.

## Later — Not first sprint
- [ ] Full 60-asset composer coverage (after API normalization)
- [ ] Remote registry installation / MCP integration / agent search endpoint
- [ ] Figma variable sync, 3D asset upload, visual regression CI
- [ ] Publish/share cloud services, local history/undo-redo, license provenance automation

## Work sequencing
Perform P0 first. Then implement P1 as a small, reviewable vertical slice. Avoid rewriting the catalog or creating a second renderer. For every milestone, update `docs/VALIDATION.md`, `docs/FEEDBACK_LOG.md`, and status checkboxes here.

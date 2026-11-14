# Visual Cores (VCR-001–VCR-020)

Visual Core is a **style preset**, not an interactive UI primitive. The same accessible HTML structure receives its colors, typography, shape, layers and texture from a scoped CSS file.

## Usage

1. Pick a preset from `data/catalog.json` by its useWhen/avoidWhen rules.
2. Import `styles/visual-cores/base.css` and **one** matching `styles/visual-cores/<slug>.css` in the consumer application's root layout (or CSS entry).
3. Import `VisualCorePreview` or apply `data-core="<slug>"` to your own markup using `.vc-*` primitive classes.
4. Keep `prefers-reduced-motion` and responsive checks. The style overrides do not impact other UI elements outside `.vc-stage`.
5. For a standalone page, use shared design tokens in the CSS preset as starting values; adapt them to your own component styles. The preview is illustrative, **not** a full-page generator.

```tsx
import "@/styles/visual-cores/base.css";
import "@/styles/visual-cores/cyber-minimal.css";
import { VisualCorePreview } from "@/components/atlas/visual-core-preview";

export default function Hero() {
  return <VisualCorePreview core="cyber-minimal" />;
}
```

### Curation principles
- 20 **curated web-applicable aesthetics**; not a definitive taxonomy of all internet aesthetics.
- No external fonts, images or WebGL textures required. Font stacks are local fallbacks.
- No GPU overhead is added by these presets; effects use CSS. More immersive 3D treatment is a separate `3D-xxx` or `SHD-xxx` asset.
- The 20 presets are available in the ASSET library. Each includes its base CSS, preset CSS, and example component. The validation log records tested browsers and sizes.
- Registry entries are manifests for agent-oriented reuse; publishing through shadcn CLI requires schema-level validation and a hosting endpoint.


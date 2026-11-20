import { createElement } from "react";
import manifest from "@/data/feed.json";
import { OrbitCardStudio } from "./orbit-card-studio";
import { MagneticDemo } from "@/components/atlas/magnetic-demo";
import { RiffPreview } from "../riff-previews";

const demos = new Map<string, { Demo: React.ComponentType }>([
  ["saved-card-transfer", { Demo: () => createElement(RiffPreview, { id: "INT-012" }) }],
  ["perspective-box", { Demo: () => createElement(RiffPreview, { id: "INT-011" }) }],
  ["otp-verify", { Demo: () => createElement(RiffPreview, { id: "INT-010" }) }],
  ["stack-carousel", { Demo: () => createElement(RiffPreview, { id: "INT-004" }) }],
  ["receipt-printer", { Demo: () => createElement(RiffPreview, { id: "INT-005" }) }],
  ["basket-dropzone", { Demo: () => createElement(RiffPreview, { id: "INT-006" }) }],
  ["liquid-tabs", { Demo: () => createElement(RiffPreview, { id: "INT-007" }) }],
  ["magnifying-dock", { Demo: () => createElement(RiffPreview, { id: "INT-008" }) }],
  ["cursor-trail", { Demo: () => createElement(RiffPreview, { id: "MOT-007" }) }],
  ["profile-expansion", { Demo: () => createElement(RiffPreview, { id: "INT-009" }) }],
  ["kinetic-steps", { Demo: () => createElement(RiffPreview, { id: "MOT-008" }) }],
  ["image-glitch", { Demo: () => createElement(RiffPreview, { id: "MOT-009" }) }],
  ["popcorn-burst", { Demo: () => createElement(RiffPreview, { id: "MOT-010" }) }],
  ["magnetic-player", { Demo: MagneticDemo }],
  ["orbit-card-studio", { Demo: OrbitCardStudio }],
]);

export const feedPosts = manifest.map(post => {
  const demo = demos.get(post.slug);
  if (!demo && post.assetIds.length) throw new Error(`Missing feed demo for ${post.slug}`);
  return { ...post, ...demo };
});

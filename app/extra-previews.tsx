"use client";
import { RiffPreview } from "./riff-previews";
import { MagneticDemo } from "@/components/atlas/magnetic-demo";
import dynamic from "next/dynamic";
import { Checkbox } from "@/components/atlas/checkbox";
import { RadioGroup } from "@/components/atlas/radio-group";
import { SegmentedControl } from "@/components/atlas/segmented-control";
import { ModalDialog } from "@/components/atlas/modal-dialog";
import { BottomSheet } from "@/components/atlas/bottom-sheet";
import { ToastNotice } from "@/components/atlas/toast-notice";
import { Tooltip } from "@/components/atlas/tooltip";
import { FilterChips } from "@/components/atlas/filter-chips";
import { SkeletonLoader } from "@/components/atlas/skeleton-loader";
import { NumberStepper } from "@/components/atlas/number-stepper";
import { RangeSlider } from "@/components/atlas/range-slider";
import { ScrollReveal } from "@/components/atlas/scroll-reveal";
import { TiltCard } from "@/components/atlas/tilt-card";
import { AnimatedCounter } from "@/components/atlas/animated-counter";
import { TextScramble } from "@/components/atlas/text-scramble";
import { OrbitReveal } from "@/components/atlas/orbit-reveal";
import { SplitHero } from "@/components/atlas/split-hero";
import { VerticalTimeline } from "@/components/atlas/vertical-timeline";
import { DashboardShell } from "@/components/atlas/dashboard-shell";
import { MasonryGallery } from "@/components/atlas/masonry-gallery";
import { GradientHeading } from "@/components/atlas/gradient-heading";
import { OutlineTypography } from "@/components/atlas/outline-type";
import { TypewriterTitle } from "@/components/atlas/typewriter-title";
import { SparklineChart } from "@/components/atlas/sparkline-chart";
import { ActivityHeatmap } from "@/components/atlas/activity-heatmap";
import { RadialGauge } from "@/components/atlas/radial-gauge";
import { AuroraBackground } from "@/components/atlas/aurora-background";
import { DotGrid } from "@/components/atlas/dot-grid";
import { MeshGradient } from "@/components/atlas/mesh-gradient";
import { CommandPalette } from "@/components/atlas/command-palette";
import { SpotlightCard } from "@/components/atlas/spotlight-card";
const TorusKnot = dynamic(() => import("@/components/atlas/torus-knot").then(m => m.TorusKnot), { ssr: false, loading: () => <div className="atlas-loading">WebGL scene loading…</div> });
const WireGlobe = dynamic(() => import("@/components/atlas/wire-globe").then(m => m.WireGlobe), { ssr: false, loading: () => <div className="atlas-loading">WebGL scene loading…</div> });
const LiquidShader = dynamic(() => import("@/components/atlas/liquid-shader").then(m => m.LiquidShader), { ssr: false, loading: () => <div className="atlas-loading">WebGL scene loading…</div> });
const WaveGridShader = dynamic(() => import("@/components/atlas/wave-grid-shader").then(m => m.WaveGridShader), { ssr: false, loading: () => <div className="atlas-loading">WebGL scene loading…</div> });

export function ExtraPreview({ id }: { id: string }) {
  switch (id) {
    case "CMP-004": return <Checkbox />;
    case "CMP-005": return <RadioGroup />;
    case "CMP-006": return <SegmentedControl />;
    case "CMP-007": return <ModalDialog />;
    case "CMP-008": return <BottomSheet />;
    case "CMP-009": return <ToastNotice />;
    case "CMP-010": return <Tooltip />;
    case "CMP-011": return <FilterChips />;
    case "CMP-012": return <SkeletonLoader />;
    case "CMP-013": return <NumberStepper />;
    case "CMP-014": return <RangeSlider />;
    case "MOT-002": return <ScrollReveal />;
    case "MOT-003": return <TiltCard />;
    case "MOT-004": return <AnimatedCounter />;
    case "MOT-005": return <TextScramble />;
    case "MOT-006": return <OrbitReveal cards={["01", "02", "03", "04"]} />;
    case "LAY-002": return <SplitHero />;
    case "LAY-003": return <VerticalTimeline />;
    case "LAY-004": return <DashboardShell />;
    case "LAY-005": return <MasonryGallery />;
    case "3D-002": return <TorusKnot />;
    case "3D-003": return <WireGlobe />;
    case "SHD-001": return <LiquidShader />;
    case "SHD-002": return <WaveGridShader />;
    case "TYP-001": return <GradientHeading />;
    case "TYP-002": return <OutlineTypography />;
    case "TYP-003": return <TypewriterTitle />;
    case "DAT-001": return <SparklineChart />;
    case "DAT-002": return <ActivityHeatmap />;
    case "DAT-003": return <RadialGauge />;
    case "BG-001": return <AuroraBackground />;
    case "BG-002": return <DotGrid />;
    case "BG-003": return <MeshGradient />;
    case "INT-001": return <CommandPalette />;
    case "INT-002": return <SpotlightCard />;
    case "INT-003": return <MagneticDemo />;
    case "CMP-015":
    case "INT-004":
    case "INT-005":
    case "INT-006":
    case "INT-007":
    case "INT-008":
    case "MOT-007":
    case "INT-009":
    case "MOT-008":
    case "MOT-009":
    case "MOT-010":
      return <RiffPreview id={id} />;
    default: return <span>미리보기를 찾지 못했습니다.</span>;
  }
}

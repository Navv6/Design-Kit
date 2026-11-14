import type { Composition } from "./composer";
import portfolio from "./compositions/cyber-ai-portfolio.json";
import editorial from "./compositions/editorial-case-study.json";
import studio from "./compositions/neo-brutalist-studio.json";

export const COMPOSITION_SAMPLES: ReadonlyArray<{
  id: string;
  title: string;
  description: string;
  composition: Composition;
}> = [
  {
    id: "editorial-case-study",
    title: "에디토리얼 케이스 스터디",
    description: "프로젝트 소개, 진행 과정, 주요 지표",
    composition: editorial as Composition,
  },
  {
    id: "cyber-ai-portfolio",
    title: "크리에이티브 포트폴리오",
    description: "벤토 그리드와 WebGL 파티클을 담은 포트폴리오",
    composition: portfolio as Composition,
  },
  {
    id: "neo-brutalist-studio",
    title: "크리에이티브 스튜디오",
    description: "굵은 테두리와 강한 대비의 스튜디오 랜딩",
    composition: studio as Composition,
  },
];

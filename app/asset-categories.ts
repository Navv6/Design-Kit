export const filters = [
  { id: "all", label: "전체" },
  { id: "component", label: "컴포넌트" },
  { id: "motion", label: "모션" },
  { id: "layout", label: "레이아웃" },
  { id: "three", label: "3D / WebGL" },
  { id: "shader", label: "셰이더" },
  { id: "typography", label: "타이포그래피" },
  { id: "data", label: "데이터 시각화" },
  { id: "background", label: "배경" },
  { id: "interaction", label: "인터랙션" },
  { id: "visual-core", label: "스타일 프리셋" },
];

export const categoryGroups = [
  { label: "인터페이스", ids: ["component", "layout", "typography", "data", "interaction"] },
  { label: "모션과 효과", ids: ["motion", "three", "shader", "background"] },
  { label: "스타일", ids: ["visual-core"] },
];

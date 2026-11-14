"use client";

import { useRef, useState } from "react";
import { CarouselNavigation } from "@/components/atlas/carousel-navigation";
import { StackCarousel } from "@/components/atlas/stack-carousel";
import { ReceiptPrinter } from "@/components/atlas/receipt-printer";
import { BasketDropzone } from "@/components/atlas/basket-dropzone";
import { LiquidTabs } from "@/components/atlas/liquid-tabs";
import { MagnifyingDock } from "@/components/atlas/magnifying-dock";
import { CursorTrail } from "@/components/atlas/cursor-trail";
import { ProfileExpansion } from "@/components/atlas/profile-expansion";
import { KineticSteps } from "@/components/atlas/kinetic-steps";
import { ImageGlitch } from "@/components/atlas/image-glitch";
import { PopcornBurst } from "@/components/atlas/popcorn-burst";

function CarouselNavigationPreview() {
  const [index, setIndex] = useState(0);
  return <CarouselNavigation index={index} count={3} onMove={step => setIndex(current => (current + step + 3) % 3)} onSelect={setIndex} />;
}

function ReceiptPreview() {
  const fail = useRef(false);
  return <div className="riff-sample">
    <label><input type="checkbox" onChange={event => { fail.current = event.currentTarget.checked; }} /> 요청 실패 시뮬레이션</label>
    <ReceiptPrinter onConfirm={async () => {
      await new Promise<void>(resolve => window.setTimeout(resolve, 500));
      if (fail.current) throw new Error("Simulated checkout failure");
    }} />
  </div>;
}

function BookmarkPreview() {
  const fail = useRef(false);
  return <div className="riff-sample">
    <label><input type="checkbox" onChange={event => { fail.current = event.currentTarget.checked; }} /> 저장 실패 시뮬레이션</label>
    <PopcornBurst label="북마크" doneLabel="북마크됨" onChange={async () => {
      await new Promise<void>(resolve => window.setTimeout(resolve, 250));
      if (fail.current) throw new Error("Simulated bookmark failure");
    }} />
  </div>;
}

const riffPreviews: Partial<Record<string, () => React.JSX.Element>> = {
  "CMP-015": CarouselNavigationPreview,
  "INT-004": () => <StackCarousel slides={[<><h3>북쪽 해안</h3><p>바다를 따라 이어지는 산책길</p></>, <><h3>숲의 입구</h3><p>나무 사이로 이어지는 오솔길</p></>, <><h3>노을 전망대</h3><p>하루를 마무리하는 전망</p></>]} />,
  "INT-005": ReceiptPreview,
  "INT-006": () => <BasketDropzone />,
  "INT-007": () => <LiquidTabs tabs={[{ label: "탐색", content: <><h3>추천 경로</h3><p>해안 산책로 · 2.4 km</p></> }, { label: "저장", content: <><h3>저장한 장소</h3><p>노을 전망대</p></> }, { label: "일정", content: <><h3>오늘의 일정</h3><p>오후 5시 · 해안 산책</p></> }]} />,
  "INT-008": () => <MagnifyingDock tools={[{ label: "메모", icon: "✎", content: <><h3>메모</h3><p>촬영할 장소 세 곳을 골라보세요.</p></> }, { label: "갤러리", icon: "▧", content: <><h3>갤러리</h3><p>저장한 풍경 이미지가 여기에 표시됩니다.</p></> }, { label: "일정", icon: "◷", content: <><h3>일정</h3><p>오후 5시 · 마지막 촬영</p></> }]} />,
  "MOT-007": () => <CursorTrail images={["/compositions/editorial-case-study.jpg", "/compositions/neo-brutalist-studio.jpg", "/compositions/cyber-ai-portfolio.jpg"]} />,
  "INT-009": () => <ProfileExpansion name="윤서" role="비주얼 디자이너" children={<p>인터랙션과 타이포그래피를 중심으로 작업합니다. 이 프로필 카드는 소개와 작업 분야를 제자리에서 확인하는 예시입니다.</p>} />,
  "MOT-008": () => <KineticSteps steps={[{ title: "관찰", description: "사용자가 실제로 어떻게 탐색하는지 확인합니다." }, { title: "구상", description: "발견한 문제를 화면의 흐름으로 풀어냅니다." }, { title: "검증", description: "사용자가 직접 조작해 보고, 막히는 지점을 고칩니다." }]} />,
  "MOT-009": () => <ImageGlitch images={[{ src: "/compositions/neo-brutalist-studio.jpg", alt: "네오 브루탈리즘 스튜디오 포스터" }, { src: "/compositions/cyber-ai-portfolio.jpg", alt: "사이버 포트폴리오 포스터" }]} />,
  "MOT-010": BookmarkPreview,
};

export function RiffPreview({ id }: { id: string }) {
  const Demo = riffPreviews[id];
  return Demo ? <Demo /> : null;
}

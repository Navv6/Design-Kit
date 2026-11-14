import { Suspense } from "react";
import { BuilderEntry } from "./entry";

export const metadata = { title: "Page Composer · NAVV6 Design Atlas" };

export default function BuilderPage() {
  return <Suspense fallback={<p>페이지 빌더를 불러오는 중입니다.</p>}><BuilderEntry /></Suspense>;
}

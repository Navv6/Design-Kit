# Usage Feedback / Improvement Backlog

실제 사용 후 발견한 문제와 개선 우선순위를 축적하는 곳.

| 날짜 | 사용 프로젝트 | 자산 ID | 문제 / 관찰 | 영향도 | 제안 / 처리 |
|---|---|---|---|---|---|
| 2026-11-13 | Atlas MVP | 3D-001 | 모바일 WebGL 지원/성능 실측 필요 | 중 | 기기별 FPS 측정 및 폴백 추가 |
| 2026-11-13 | Atlas MVP | ALL | CSS 클래스가 공통 globals.css에 모여 있어 패키지 재사용 시 누락 위험 | 높음 | 컴포넌트 스타일 동봉/토큰화 |
| 2026-11-14 | Atlas P0 | 3D-002, 3D-003, SHD-001, SHD-002 | WebGL을 비활성화한 Edge에서 카탈로그의 3D-002를 열면 Three.js 컨텍스트 생성 오류 | 높음 | WebGL 2와 모션 설정을 확인한 뒤 로드. 카탈로그 5종 및 빌더 3종의 정적 폴백 재검증 |
| 2026-11-14 | Atlas UI | ALL | 영문 조작 UI, 10–11px 글자, 어두운 보라색 작업 화면, 미리보기 잘림 | 높음 | 한국어 UI와 밝은 배경 적용. 미리보기 높이와 캔버스 폭 기준 배치 수정. Chrome에서 375·768·1440px 확인 |

## 실사용 점검 질문
- 컴포넌트를 찾는 데 얼마나 걸렸나?
- 에이전트가 적절한 ID를 선택했나?
- 복사한 코드가 프로젝트에 그대로 동작했나?
- 외부 의존성이 추가로 필요했나?
- 모바일 및 저사양 기기에서 문제가 있었나?

## v0.1 미리보기 자체 점검
- Chromium 기반 오프라인 HTML 미리보기 검사 통과: 6개 자산 렌더링, 카테고리 필터, 토글 상호작용, CTA 클릭, 2D 파티클 모사, 코드 탭, 테마 전환.
- Next.js 의존성 설치와 빌드는 네트워크 제한으로 아직 실행 검증되지 않음. 실제 PC에서 `npm install && npm run build` 수행 필요.

## v0.2 expansion (2026-11-13)
- Request: more varied components including Three.js and advanced visual effects.
- Decision: 9 families / 40 total entries. The 34 additions remain `prototype` until full runtime QA.
- Checked: offline HTML displays 40 cards, filtering/search/code viewer, steppers, modal open/close, mobile horizontal overflow (none), and syntax transpilation of 45 TSX files.
- Not checked: actual Next.js build and real GPU runtime of new scenes.
- Next use case: assemble a portfolio hero, then record which assets require theme/props/registry improvements.
## 2026-11-18 · Daily Riff expansion

Added an OTP form with local error/success states and a server-verification callback. Original typography and exact spring timing remain visually different from the source. Verification evidence is in docs/VALIDATION.md.

## 2026-11-20 · Perspective Box

Added manual X/Y rotation, reset and surface color controls with the original Figma 3D Box media. The six-face CSS interpretation differs from the original material preset and automatic animation; this is shown in the demo.

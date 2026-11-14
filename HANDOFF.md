# NAVV6 Design Atlas — Codex Handoff

> Updated: 2026-11-14 · Baseline: existing v0.4 with handoff-only fixes and validation helpers.  
> 목적: Codex가 **새 프로젝트를 만들지 않고** v0.4를 이어받아 v0.5를 안정적으로 개발하도록 한다.

## 1. 제품 비전
사용자가 디자인을 매번 처음부터 만들지 않도록, UI 컴포넌트·레이아웃·모션·타이포그래피·비주얼 코어·배경·Three.js/GLSL·데이터 시각화 등을 **고유 ID + 라이브 프리뷰 + 실제 코드 + 메타데이터 + AI 적용 규칙**으로 축적하는 개인 디자인 자산 플랫폼.

장기 목표는 “디자인 자산을 검색/선택/조합하고 Codex 같은 에이전트가 실제 앱에 적용하는 엔진”. 단기 목표는 **실행 가능한 아틀라스와 신뢰할 수 있는 편집/내보내기 경험**.

## 2. 실제 구현된 범위
- `/`: 60개 자산 카탈로그 (10개 범주), 코드 보기 및 미리보기.
- Visual Core: 20개 스타일 프리셋 (`VCR-001`~`VCR-020`).
- `/builder`: 60개 중 선별된 **15개 블록**을 조합하는 Composer.
- 사용자 제어: 블록 추가/삭제/위치 이동, 이름·텍스트·라벨·섹션 크기·Visual Core·강조색 편집, 디바이스별 캔버스 폭.
- 상태: 브라우저 localStorage 자동 저장, JSON import/export (`schemaVersion: 1`, 최대 40개 블록).
- 출력: 에이전트 지시문 및 repository-local `app/page.tsx` 생성. 독립 배포형 사이트가 아님.
- 3D: 실제 React Three Fiber 구현은 Next.js 소스에 있음. Composer는 IntersectionObserver + `next/dynamic({ssr:false})` + WebGL/모션 감소 폴백을 사용. 오프라인 HTML은 3D의 CSS 모사만 제공.
- 3개 시작 JSON: `data/compositions/`.

## 3. 진짜 소스 기준의 아키텍처
```text
app/page.tsx                      60-asset catalog server route
app/ui.tsx                        catalog interaction UI
app/builder/page.tsx              editor route
components/atlas/*               shared UI/motion/WebGL components
components/composer/builder.tsx  live editor logic
components/composer/renderer.tsx shared page renderer / GPU fallback
components/composer/{builder,composer}.css
styles/visual-cores/all.css       style gallery presets
data/catalog.json                asset metadata (60)
data/composer.ts                  schema + 15 blocks + exports
data/composer-manifest.json       descriptive builder manifest
data/compositions/*.json         3 sample configurations
registry.json                    source registry, not installer
scripts/check-*.mjs              static consistency checks
```

## 4. 중요 설계 규칙
1. 고유 자산 ID는 변경/재사용 금지; 기존 JSON schemaVersion 1 호환 유지.
2. 코드 기준: 렌더러/컴포넌트 실제 소스. 오프라인 HTML은 실제 코드의 대체물이 아니다.
3. Composer 미리보기와 내보낸 TSX는 `CompositionRenderer`를 공유한다.
4. 3D·셰이더는 선택형·지연 로드·모션 감소 지원·GPU 폴백이 기본.
5. Visual Core 20종은 **완벽한 전체 테마 변환을 제공하지 않는다**. 현재 Builder는 팔레트와 일부 CSS 오버라이드에 주로 연결됨.
6. `CMP-003` 등의 시연용 버튼은 실제 비즈니스 액션 미연결.
7. 에이전트도 `useWhen/avoidWhen`, source 경로, 라이선스 및 의존성을 확인하고 재사용해야 함.

## 5. 발견된 코드·문서 이슈와 조치
- **수정 완료 (handoff):** `app/layout.tsx`의 존재하지 않는 `../styles/composer.css` import 제거. 실제 CSS는 `components/composer/renderer.tsx`에서 `./composer.css`로 import한다.
- **수정 완료 (handoff):** 오래된 `AGENTS.md`의 잘못된 경로(`data/compositions.ts`, `stage.tsx` 등) 전면 교정.
- **추가 (handoff):** 경로/샘플 JSON 검증 스크립트 및 일괄 정적 검사 명령.
- **미검증:** npm 의존성 설치, 타입 체크, production build, 실제 GPU 렌더링, 전체 접근성, 외부 앱으로의 독립 export.
- **기술 부채:** 일부 기존 컴포넌트 props 하드코딩, 일부 테마가 palette 수준에만 반영, 별도 코드 저장소에 옮길 때 CSS/의존성 관리가 수동, `registry.json`은 설치 서비스 아님.

## 6. Codex 시작 절차
```bash
# 압축 해제 후 NAVV6_Design_Atlas_v0.4 폴더에서
node -v                    # 권장 Node.js 22 LTS
npm install                # package-lock이 없다면 생성; 생성된 lock 커밋
npm run check              # 외부 의존성 없이 4개 정적 검사
npm run typecheck           # npm install 이후
npm run build               # npm install 이후
npm run dev                 # http://localhost:3000, /builder
```

`npm install`, `typecheck`, `build`는 Codex 환경에서 새로 실행하고 출력에 근거해 판단할 것. 이 패키지에서 확인된 것은 **4개 정적 검사의 통과**뿐.

## 7. 첫 번째 개발 우선순위
- **P0: 실행 기준선 확립.** clean install + typecheck + build, `/`, `/builder`, JSON 왕복, 모바일/키보드/모션 감소, 실GPU 동작 검증. 실제 오류부터 수정하고 증거를 남기기.
- **P1: 실사용 Props inspector.** 먼저 `CMP-002`, `MOT-001`, `3D-001` 3개 자산에 schema-driven editor 도입. 렌더러와 export 동일성 보장. 기존 JSON은 마이그레이션 없이 열려야 함.
- **P2: 배경/이펙트 레이어 결합 + 코드 내보내기 개선.** 배경 자산을 섹션 콘텐츠 뒤에 배치, z-index/pointer-events 정책, reduced motion/low GPU 폴백. 차후 독립 배포형 export 검토.
- **P3: 나머지 60개 자산 Composer 등록 확대, 라이선스·성능·접근성 검증 자동화, Registry 배포.** 초반에 무작정 카운트 확대하지 않음.

수락 기준과 상세 작업 순서는 `docs/V05_BACKLOG.md` 참조.

## 8. 전달 산출물
- 프로젝트 전체 소스 + 세 가지 샘플 구성 JSON
- `AGENTS.md` (Codex가 자동으로 읽어야 할 규칙)
- `docs/CODEX_START_PROMPT.md` (첫 세션용 붙여넣기 프롬프트)
- `docs/VALIDATION.md` (실제 검사 결과/미검증 영역)
- `docs/V05_BACKLOG.md` (단계별 완료 조건)
- `docs/FEEDBACK_LOG.md` (실사용 이슈 기록)

Codex는 첫 세션에서 **`HANDOFF.md` → `AGENTS.md` → P0 확인** 후 작업을 시작할 것.

# Design Decisions

## ADR-001: Code is source of truth (v0.1)
- 이유: 미리보기와 실제 적용 코드의 괴리를 최소화한다.
- 결정: `components/atlas/*`를 구현의 원본으로 취급한다.
- 상세 코드는 `app/page.tsx` 서버에서 소스 파일을 읽어 Inspector에 제공한다.
- 주의: 이 개발 전용 구조는 추후 공개 배포 시 소스 노출 정책을 별도로 검토한다.

## ADR-002: 3D assets opt-in
- 일반 갤러리 썸네일에서는 WebGL을 구동하지 않는다.
- 선택한 항목 상세 미리보기에서만 `ParticleField`를 지연 로드한다.
- 모션 감소 환경에는 정적인 화면을 제공한다.

## ADR-003: ID is immutable
- 기존 ID 재사용 금지; 이름/분류가 바뀌어도 ID를 유지한다.

## ADR-004: shadcn source registry is a starting point
- `registry.json`은 설치 패키지를 빌드하기 위한 *소스 레지스트리*다.
- 현재 버전은 레지스트리의 원격 배포/자동 설치를 제공하지 않는다.
- 공통 CSS 의존성을 포함한 실제 분리 배포 패키지는 후속 버전에서 도입한다.

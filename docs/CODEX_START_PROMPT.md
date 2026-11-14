# First Codex Prompt — copy below into Codex

너는 NAVV6 Design Atlas 프로젝트의 후속 개발 담당 엔지니어야. 현재 폴더는 v0.4 인수인계 패키지이며, **기존 소스와 카탈로그/ID를 보존한 채 v0.5를 점진적으로 개발**하는 것이 목표야.

우선 `HANDOFF.md`, `AGENTS.md`, `docs/V05_BACKLOG.md`, `docs/VALIDATION.md`, `docs/DECISIONS.md`를 읽고 실제 파일 구조를 확인해. 오래된 설명보다 실제 코드를 우선해. 전체 프로젝트를 처음부터 재작성하지 마.

첫 작업은 `P0: 빌드/실행 기준선 확립`으로 제한해.

1. Node/npm 버전과 저장소 상태를 확인하고 `npm install`하여 lockfile을 생성해.
2. `npm run check`, `npm run typecheck`, `npm run build`를 실행해. 실패하면 오류를 근본 원인별로 분류하고 **최소 변경**으로 해결해.
3. `/` 카탈로그와 `/builder`를 실제 서버로 실행하여 기존 자산 60개, Visual Core 20종, 조합 자산 15개가 정상 작동하는지 확인해.
4. 빌더에서 Visual Core 전환 → CMP-002/3D-001 추가 → 속성/순서 변경 → JSON 저장/불러오기 → `page.tsx` 내보내기를 검증해. GPU 테스트가 가능하면 3D 정상/폴백을 확인하고, 불가능하면 명시해.
5. 화면 375/768/1440px, 키보드 인터랙션, prefers-reduced-motion을 확인해.
6. 결과를 `docs/VALIDATION.md`에 실제 실행 명령, 성공/실패, 남은 오류와 함께 기록하고, 필요시 `docs/V05_BACKLOG.md` 체크박스를 갱신해.

**작업 원칙**
- 기존 `data/catalog.json`의 ID나 `schemaVersion:1` JSON 호환성을 깨지 마.
- 같은 `CompositionRenderer`를 편집기와 출력 코드가 공유하도록 유지해.
- Three.js/WebGL은 lazy load와 접근성/저성능 fallback을 유지해.
- 먼저 현재 프로젝트가 실제로 컴파일되는지 확인하고, 신규 컴포넌트 대량 추가나 대규모 리팩터링은 이번 세션에서 하지 마.
- 검증되지 않은 내용을 성공이라고 보고하지 마.

최종적으로 **실행/테스트 결과 표, 수정 파일 목록, 해결한 문제, 남은 위험, 다음 P1 시작을 위한 구체적인 권고**를 반환해.

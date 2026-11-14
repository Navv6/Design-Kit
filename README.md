# NAVV6 Design Atlas

웹 UI, 모션, 비주얼 스타일을 직접 체험하고 프로젝트에 재사용할 수 있는 Next.js 디자인 라이브러리입니다.

| 화면 | 기능 |
| --- | --- |
| `/` ASSET | 73개 자산과 20개 Visual Core를 탐색하고, 미리보기·TSX·CSS·AI 적용 지시문을 확인합니다. |
| `/feed` 피드 · 준비 중 | 12개 작품의 원본 미리보기, 직접 체험, 작품에 사용된 ASSET을 연결합니다. |
| `/builder` 페이지 빌더 · 준비 중 | 15개 블록을 조합하고 순서와 속성을 편집한 뒤 JSON과 React 페이지 코드로 내보냅니다. |

## 로컬 실행

Node.js 22와 npm을 사용합니다.

```bash
npm ci
npm run dev
```

브라우저에서 [localhost:3000](http://localhost:3000)을 엽니다.

```bash
npm run check
npm run typecheck
npm run build
```

## 자산 재사용

라이브러리에서 자산을 클릭하면 필요한 소스와 CSS를 볼 수 있습니다. `registry.json`에 자산별 파일 경로가 등록되어 있습니다. 적용 지시문을 AI 채팅에 붙여넣을 때는 저장소에 대한 접근 권한이나 해당 소스 파일도 함께 제공하세요.

페이지 빌더는 `schemaVersion: 1` JSON을 사용합니다. 내보낸 React 페이지는 이 저장소의 `CompositionRenderer`와 관련 스타일을 사용합니다.

피드의 Figma 커뮤니티 미리보기에는 원작자와 원본 링크가 연결되어 있습니다. 미디어 출처는 [피드 데이터](data/feed.json)에 기록합니다.

## 프로젝트 문서

- [개발 인수인계](HANDOFF.md)와 [작업 지침](AGENTS.md)
- [페이지 빌더](docs/COMPOSER.md)와 [Visual Core](docs/VISUAL_CORES.md)
- [검증 기록](docs/VALIDATION.md)과 [개발 백로그](docs/V05_BACKLOG.md)

import "./riff-interactions.css";

export function CarouselNavigation({ index, count, onMove, onSelect, controls }: {
  index: number;
  count: number;
  onMove: (step: -1 | 1) => void;
  onSelect?: (index: number) => void;
  controls?: string;
}) {
  if (count < 1) return null;
  return <div className="riff-carousel-nav" role="group" aria-label="페이지 탐색">
    <button type="button" disabled={count < 2} aria-controls={controls} onClick={() => onMove(-1)}>이전</button>
    <span role="status">{index + 1} / {count}</span>
    {onSelect && count > 1 && count <= 12 && <div className="riff-page-points" aria-label="페이지 바로 이동" role="group">
      {Array.from({ length: count }, (_, page) => <button type="button" key={page} aria-current={page === index ? "page" : undefined}
        aria-label={`${page + 1}페이지`} aria-controls={controls} onClick={() => onSelect(page)} />)}
    </div>}
    <button type="button" disabled={count < 2} aria-controls={controls} onClick={() => onMove(1)}>다음</button>
  </div>;
}

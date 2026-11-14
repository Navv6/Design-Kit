"use client";

import { useId, useState, type CSSProperties } from "react";
import "./magnetic-demo.css";

const labels = ["FEEL THE FREQUENCY", "NIGHT DRIVE", "AFTER HOURS", "MOVE WITH THE SOUND", "PLAY IT LOUD", "SIDE A", "ON REPEAT"];

export function MagneticDemo() {
  const [hovered, setHovered] = useState(false);
  const [pinned, setPinned] = useState(false);
  const [playing, setPlaying] = useState(true);
  const [active, setActive] = useState(0);
  const cardsId = useId();
  const expanded = hovered || pinned;
  return <div className="magnetic-demo">
    <div className="magnetic-stage" data-expanded={expanded} data-playing={playing}
      onPointerEnter={event => { if (event.pointerType === "mouse") setHovered(true); }}
      onPointerLeave={() => setHovered(false)}>
      <div className="magnetic-cards" id={cardsId} inert={!expanded} aria-hidden={!expanded}>
        {labels.map((text, index) => (
          <button type="button" className={`magnetic-tile magnetic-tile-${index}`} key={text} aria-pressed={active === index}
            onClick={() => { setActive(index); setPinned(true); }}
            style={{ "--angle": `${index * 360 / 7 - 90}deg`, "--counter-angle": `${90 - index * 360 / 7}deg`, "--tilt": `${index % 2 ? 9 : -9}deg` } as CSSProperties}>
            {text}
          </button>
        ))}
      </div>
      <button className="magnetic-center" type="button" aria-label="카드 펼침 고정" aria-controls={cardsId} aria-pressed={pinned} onClick={() => setPinned(value => !value)}>
        <span className="magnetic-wave" aria-hidden="true">{[16,34,64,42,86,54,30,18].map((height,index)=><i key={index} style={{height:`${Math.max(12, height - active * ((index % 3) - 1) * 6)}%`,animationDelay:`${index * -0.13}s`}} />)}</span>
      </button>
    </div>
    <div className="magnetic-controls">
      <span role="status">선택한 트랙 · {labels[active]}</span>
      <button type="button" aria-pressed={!playing} onClick={() => setPlaying(value => !value)}>{playing ? "파형 멈추기" : "파형 재생"}</button>
    </div>
    <p className="magnetic-note">Atlas 시범 구현 · 원본의 사진·로고·가사는 그래픽과 문구로 대체했습니다. 파형은 시각 효과이며 음원은 재생되지 않습니다.</p>
  </div>;
}

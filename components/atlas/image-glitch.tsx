"use client";

import { useState } from "react";
import "./riff-interactions.css";

export function ImageGlitch({ images }: { images: readonly { src: string; alt: string }[] }) {
  const [index, setIndex] = useState(0);
  if (!images.length) return null;
  const active = index % images.length;
  const image = images[active];
  return <div className="riff-sample">
    <div className="sample-glitch" key={active} data-transition={index > 0}>
      <img src={image.src} alt={image.alt} />
      {index > 0 && <div className="sample-glitch-layers" aria-hidden="true">
        <img src={image.src} alt="" />
        <img src={image.src} alt="" />
      </div>}
    </div>
    <div className="sample-actions"><span role="status">{active + 1} / {images.length}</span>
      <button type="button" disabled={images.length < 2} onClick={() => setIndex(value => value + 1)}>이미지 전환</button>
    </div>
  </div>;
}

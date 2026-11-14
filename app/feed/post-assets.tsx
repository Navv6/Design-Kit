"use client";

import { useRef, useState } from "react";
import { AssetDetails, type Asset } from "../asset-details";

export function PostAssets({ assets }: { assets: Asset[] }) {
  const [selected, setSelected] = useState<Asset | null>(null);
  const opener = useRef<HTMLButtonElement | null>(null);

  return <>
    <ul className="atlas-feed-assets">
      {assets.map(asset => (
        <li key={asset.id}>
          <button type="button" aria-haspopup="dialog" onClick={event => {
            opener.current = event.currentTarget;
            setSelected(asset);
          }}>
            {asset.nameKo} · {asset.id}
          </button>
          {asset.guide && <p className="atlas-feed-asset-role">{asset.description}</p>}
        </li>
      ))}
    </ul>
    {selected && <AssetDetails key={selected.id} asset={selected} onClose={() => {
      setSelected(null);
      opener.current?.focus({ preventScroll: true });
    }} />}
  </>;
}

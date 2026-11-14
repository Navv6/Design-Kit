"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ExtraThumbnail } from "./extra-thumbnails";
import { VisualCorePreview } from "@/components/atlas/visual-core-preview";
import { filters } from "./asset-categories";
import { useAssetFilters } from "./atlas-shell";
import { AssetDetails, type Asset } from "./asset-details";

function AssetThumbnail({ item }: { item: Asset }) {
  if (item.category === "visual-core") return <VisualCorePreview core={item.slug} compact />;
  if (item.id === "CMP-001") return <div className="thumb-switch"><span /></div>;
  if (item.id === "CMP-002") return <div className="thumb-glass">SHAPE<br /><strong>MEETS</strong><br />FUNCTION</div>;
  if (item.id === "CMP-003") return <div className="thumb-cta">Explore <span>↗</span></div>;
  if (item.id === "MOT-001") return <div className="thumb-magnetic">↗<i /><i /></div>;
  if (item.id === "LAY-001") return <div className="thumb-bento"><span /><span /><span /></div>;
  if (item.id === "3D-001") return <div className="thumb-particles"><span className="thumb-particles-core" />✦　·　⋆　·　✦</div>;
  return <ExtraThumbnail id={item.id} />;
}

export function AtlasExplorer({ catalog }: { catalog: Asset[] }) {
  const { category, setCategory, query, setQuery } = useAssetFilters();
  const [selected, setSelected] = useState<Asset | null>(null);
  const filtered = useMemo(() => {
    const search = query.trim().toLowerCase();
    return catalog.filter(item => {
      const haystack = `${item.id} ${item.name} ${item.nameKo} ${item.description} ${item.tags.join(" ")}`.toLowerCase();
      return (category === "all" || item.category === category) && haystack.includes(search);
    });
  }, [catalog, category, query]);
  const categoryLabel = filters.find(filter => filter.id === category)?.label;
  const opener = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    function openLinkedAsset() {
      const id = window.location.hash.slice(1);
      const asset = catalog.find(item => item.id === id);
      if (!asset) return;
      setCategory("all");
      setQuery("");
      setSelected(asset);
    }
    openLinkedAsset();
    window.addEventListener("hashchange", openLinkedAsset);
    return () => window.removeEventListener("hashchange", openLinkedAsset);
  }, [catalog, setCategory, setQuery]);

  if (!catalog.length) return <p>등록된 컴포넌트가 없습니다.</p>;
  return (
    <>
        <section className="atlas-catalog" id="atlas-assets" aria-labelledby="atlas-assets-title">
          <header className="atlas-catalog-intro">
            <h1 id="atlas-assets-title">ASSET 라이브러리</h1>
            <p>컴포넌트, 모션, 스타일을 살펴보고 프로젝트에 적용하세요.</p>
          </header>
          <div className="atlas-catalog-results">
              <div className="atlas-catalog-header">
                <h2>{category === "all" ? "전체 ASSET" : categoryLabel} <span aria-live="polite">{filtered.length}개</span></h2>
                <label className="atlas-search">
                  <span aria-hidden="true">⌕</span>
                  <input value={query} onChange={e => setQuery(e.target.value)} placeholder="이름, ID, 태그 검색" aria-label="ASSET 검색" />
                </label>
              </div>
              <div className="atlas-asset-grid">
                {filtered.map(item => (
                  <button
                    type="button"
                    key={item.id}
                    id={item.id}
                    className="atlas-asset-card"
                    aria-haspopup="dialog"
                    aria-label={`${item.nameKo} · ${item.id}`}
                    onClick={event => { opener.current = event.currentTarget; setSelected(item); }}
                  >
                    <div className={`atlas-thumbnail thumb-${item.category}`} aria-hidden="true"><AssetThumbnail item={item} /></div>
                    <div className="atlas-card-caption">
                      <div className="atlas-asset-title">{item.nameKo}</div>
                      <div className="atlas-asset-meta">
                        <span>{item.id}</span>
                        <span>{filters.find(filter => filter.id === item.category)?.label}</span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
              {filtered.length === 0 && (
                <div className="atlas-empty">
                  <p>조건에 맞는 ASSET이 없습니다.</p>
                  <button type="button" onClick={() => { setQuery(""); setCategory("all"); }}>필터 초기화</button>
                </div>
              )}
          </div>
        </section>
      {selected && (
        <AssetDetails
          key={selected.id}
          asset={selected}
          onClose={() => {
            setSelected(null);
            if (window.location.hash === `#${selected.id}`) {
              window.history.replaceState(null, "", window.location.pathname + window.location.search);
            }
            const trigger = opener.current ?? document.getElementById(selected.id);
            trigger?.focus({ preventScroll: true });
            opener.current = null;
          }}
        />
      )}
    </>
  );
}

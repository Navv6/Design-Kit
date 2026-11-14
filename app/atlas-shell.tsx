"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { categoryGroups, filters } from "./asset-categories";

const categoryLabels = new Map(filters.map(({ id, label }) => [id, label]));

const AssetFilters = createContext<{
  category: string;
  setCategory: (category: string) => void;
  query: string;
  setQuery: (query: string) => void;
} | null>(null);

export function useAssetFilters() {
  const value = useContext(AssetFilters);
  if (!value) throw new Error("The ASSET explorer requires the Atlas layout.");
  return value;
}

export function AtlasShell({ children, counts }: { children: ReactNode; counts: Record<string, number> }) {
  const pathname = usePathname();
  const isCatalog = pathname === "/";
  const isFeed = pathname === "/feed" || pathname.startsWith("/feed/");
  const isLab = pathname === "/lab" || pathname === "/lab/";
  const [category, setCategory] = useState("all");
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [compact, setCompact] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("light");
  const menuToggle = useRef<HTMLButtonElement>(null);
  const sidebar = useRef<HTMLElement>(null);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 901px)");
    const sync = () => {
      setCompact(!desktop.matches);
      setMenuOpen(desktop.matches);
    };
    sync();
    desktop.addEventListener("change", sync);
    return () => desktop.removeEventListener("change", sync);
  }, []);

  function closeCompactMenu() {
    if (!compact) return;
    setMenuOpen(false);
    menuToggle.current?.focus({ preventScroll: true });
  }

  useEffect(() => {
    if (!menuOpen || !compact) return;
    sidebar.current?.querySelector("a")?.focus({ preventScroll: true });
    function escape(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      setMenuOpen(false);
      menuToggle.current?.focus({ preventScroll: true });
    }
    window.addEventListener("keydown", escape);
    return () => window.removeEventListener("keydown", escape);
  }, [compact, menuOpen]);

  if (!isCatalog && !isFeed && !isLab) return children;

  const themeLabel = theme === "dark" ? "밝은 테마로 전환" : "어두운 테마로 전환";
  return (
    <div className="atlas-app" data-theme={theme}>
      <aside className="atlas-sidebar" id="atlas-sidebar" ref={sidebar} hidden={!menuOpen}>
        <div className="atlas-sidebar-head">
          <Link className="atlas-brand atlas-sidebar-brand" href="/" onNavigate={closeCompactMenu}><span>Design Atlas</span></Link>
          <button type="button" className="atlas-theme-btn" onClick={() => setTheme(value => value === "dark" ? "light" : "dark")} aria-label={themeLabel} title={themeLabel}>
            <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              {theme === "dark" ? (
                <><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5" /></>
              ) : (
                <path d="M20.9 13.2A9 9 0 0 1 10.8 3.1a9 9 0 1 0 10.1 10.1Z" />
              )}
            </svg>
          </button>
        </div>
        <nav className="atlas-workspace-nav" aria-label="주 메뉴">
          <Link href="/" aria-current={isCatalog ? "page" : undefined} onNavigate={event => {
            closeCompactMenu();
            if (isCatalog) {
              event.preventDefault();
              setCategory("all");
              document.getElementById("atlas-assets")?.scrollIntoView();
            }
          }}>ASSET</Link>
          <Link href="/feed" aria-current={isFeed ? "page" : undefined} onNavigate={closeCompactMenu}>
            <span>피드</span>
            <span className="atlas-nav-status">준비 중</span>
          </Link>
          <Link href="/builder" onNavigate={closeCompactMenu}>
            <span>페이지 빌더 <span aria-hidden="true">↗</span></span>
            <span className="atlas-nav-status">준비 중</span>
          </Link>
          <Link href="/lab" aria-current={isLab ? "page" : undefined} onNavigate={closeCompactMenu}>컬러·타입 실험실</Link>
          <div className="atlas-category-nav" hidden={!isCatalog}>
            {categoryGroups.map(group => {
              const options = group.ids.filter(id => counts[id]);
              if (!options.length) return null;
              return (
                <details className="atlas-category-group" key={group.label} open>
                  <summary>{group.label}<span className="atlas-menu-indicator" aria-hidden="true" /></summary>
                  <div className="atlas-category-items">
                    {options.map(id => (
                      <button type="button" key={id} aria-pressed={category === id} onClick={() => {
                        setCategory(id);
                        closeCompactMenu();
                        document.getElementById("atlas-assets")?.scrollIntoView();
                      }}>
                        <span>{categoryLabels.get(id) ?? id}</span><span className="atlas-category-count" aria-hidden="true">{counts[id]}</span>
                      </button>
                    ))}
                  </div>
                </details>
              );
            })}
          </div>
        </nav>
      </aside>
      {menuOpen && <div className="atlas-sidebar-scrim" onClick={closeCompactMenu} aria-hidden="true" />}
      <div className="atlas-workspace" id="atlas-top">
        <header className="atlas-topbar">
          <div className="atlas-nav-content">
            <button ref={menuToggle} className="atlas-sidebar-toggle" type="button" role="switch" aria-controls="atlas-sidebar" aria-checked={menuOpen} aria-label="탐색 메뉴" title={menuOpen ? "탐색 메뉴 접기" : "탐색 메뉴 펼치기"} onClick={() => setMenuOpen(open => !open)}>
              <span aria-hidden="true" className="atlas-sidebar-switch-track" />
            </button>
            <Link className="atlas-brand" href="/" aria-label="디자인 아틀라스" onNavigate={closeCompactMenu}> <span>Design Atlas</span></Link>
          </div>
        </header>
        <main className="atlas-main" inert={compact && menuOpen ? true : undefined}>
          <AssetFilters.Provider value={{ category, setCategory, query, setQuery }}>{children}</AssetFilters.Provider>
          <footer className="atlas-footer"><span>NAVV6 © 2026</span></footer>
        </main>
      </div>
    </div>
  );
}

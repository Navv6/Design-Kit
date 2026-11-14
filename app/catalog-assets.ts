import { readFileSync } from "node:fs";
import { join } from "node:path";
import catalog from "@/data/catalog.json";
import registry from "@/registry.json";
import type { Asset } from "./asset-details";

const readyAssets = catalog.filter(item => item.status === "ready");

export function loadCatalogAssets(ids?: readonly string[]): Asset[] {
  const items = ids ? ids.map(id => {
    const asset = readyAssets.find(item => item.id === id);
    if (!asset) throw new Error(`Unknown ready ASSET: ${id}`);
    return asset;
  }) : readyAssets;

  const sources = new Map<string, string>();
  return items.map(item => {
    const entry = registry.items.find(entry => entry.files[0]?.path === item.source)
      ?? registry.items.find(entry => entry.files.some(file => file.path === item.source));
    const paths = new Set([item.source, ...(entry?.files.map(file => file.path) ?? [])]);
    const files = Array.from(paths, path => {
      let code = sources.get(path);
      if (code === undefined) {
        code = readFileSync(join(process.cwd(), path), "utf-8");
        sources.set(path, code);
      }
      return { path, code };
    });
    return { ...item, files };
  });
}

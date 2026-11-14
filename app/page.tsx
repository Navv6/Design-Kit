import { loadCatalogAssets } from "./catalog-assets";
import { AtlasExplorer } from "./ui";

export default function Home() {
  return <AtlasExplorer catalog={loadCatalogAssets()} />;
}

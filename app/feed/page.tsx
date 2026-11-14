import { feedPosts } from "./posts";
import { RiffCard } from "./riff-card";
import { loadCatalogAssets } from "../catalog-assets";

export default function FeedPage() {
  return <>
    <header className="atlas-catalog-intro"><h1>디자인 피드</h1><p>작품을 감상하고, 움직임을 직접 체험하세요.</p></header>
    <div className="riff-grid">
      {feedPosts.map(post => <RiffCard key={post.slug} title={post.sourceTitle} description={post.description}
        image={post.previewImage} sourceUrl={post.sourceUrl} assets={loadCatalogAssets(post.assetIds)} video={post.previewVideo}>
        {post.Demo ? <post.Demo /> : <img src={post.previewImage} alt={post.sourceTitle} />}
      </RiffCard>)}
    </div>
  </>;
}

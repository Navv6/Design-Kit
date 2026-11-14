import Link from "next/link";
import { notFound } from "next/navigation";
import { loadCatalogAssets } from "../../catalog-assets";
import { PostAssets } from "../post-assets";
import { feedPosts } from "../posts";

export const dynamicParams = false;

export function generateStaticParams() {
  return feedPosts.filter(post => post.Demo).map(({ slug }) => ({ slug }));
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = feedPosts.find(item => item.slug === slug);
  if (!post?.Demo) notFound();
  const { Demo } = post;

  return <article className="atlas-feed-detail">
    <Link href="/feed">← 피드로 돌아가기</Link>
    <header className="atlas-catalog-intro">
      <h1>{post.title}</h1>
      <p>{post.demoDescription ?? post.description}</p>
    </header>
    <Demo />
    <h2>사용한 ASSET</h2>
    <PostAssets assets={loadCatalogAssets(post.assetIds)} />
    <p>Figma 원본 <a href={post.sourceUrl}>{post.sourceTitle}</a></p>
  </article>;
}

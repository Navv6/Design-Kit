import { readFileSync, existsSync } from "node:fs";
import { dirname, join, normalize } from "node:path";
import { exit } from "node:process";
const root = process.cwd();
const catalog = JSON.parse(readFileSync(join(root, "data/catalog.json"), "utf8"));
const registry = JSON.parse(readFileSync(join(root, "registry.json"), "utf8"));
const feed = JSON.parse(readFileSync(join(root, "data/feed.json"), "utf8"));
const required = ["id", "slug", "name", "nameKo", "category", "description", "tags", "useWhen", "avoidWhen", "dependencies", "source", "complexity", "status"];
const seen = new Set();
let ready = 0;
let errors = 0;
for (const item of catalog) {
  for (const key of required) if (!(key in item)) { console.error(`${item.id ?? "unknown"}: missing ${key}`); errors++; }
  if (seen.has(item.id)) { console.error(`Duplicate ID: ${item.id}`); errors++; }
  seen.add(item.id);
  if (!/^(CMP|MOT|LAY|3D|SHD|TYP|DAT|BG|INT|VCR)-\d{3}$/.test(item.id)) { console.error(`Invalid ID: ${item.id}`); errors++; }
  if (!existsSync(join(root, item.source))) { console.error(`Missing source: ${item.source}`); errors++; }
  if (!Array.isArray(item.dependencies)) { console.error(`Invalid dependencies: ${item.id}`); errors++; }
  if (!Array.isArray(item.useWhen) || !item.useWhen.length) { console.error(`Missing useWhen: ${item.id}`); errors++; }
  if (!Array.isArray(item.avoidWhen) || !item.avoidWhen.length) { console.error(`Missing avoidWhen: ${item.id}`); errors++; }
  const entry = registry.items.find(r => r.files?.[0]?.path === item.source)
    ?? registry.items.find(r => r.files?.some(f => f.path === item.source));
  if (!entry) {
    console.error(`Missing registry entry: ${item.id}`);
    errors++;
  } else {
    const files = new Set(entry.files.map(file => file.path));
    if (item.visualCore && !files.has(item.visualCore.base)) {
      console.error(`${item.id}: registry is missing the preset base CSS`);
      errors++;
    }
    for (const file of files) {
      const path = join(root, file);
      if (!existsSync(path)) { console.error(`${item.id}: missing registry file ${file}`); errors++; continue; }
      if (!/\.[jt]sx?$/.test(file)) continue;
      const source = readFileSync(path, "utf8");
      for (const [, specifier] of source.matchAll(/\b(?:from\s+|import\s+)["'](\.[^"']+)["']/g)) {
        const base = normalize(join(dirname(file), specifier)).replaceAll("\\", "/");
        if (!["", ".ts", ".tsx", ".js", ".jsx"].some(extension => files.has(base + extension))) {
          console.error(`${item.id}: registry is missing ${specifier} imported by ${file}`);
          errors++;
        }
      }
    }
  }
  if (item.status === "ready") ready++;
  else if (item.status !== "prototype") { console.error(`${item.id}: expected ready or prototype status`); errors++; }
}
if (!catalog.length) { console.error("No assets registered."); errors++; }
const readyIds = new Set(catalog.filter(item => item.status === "ready").map(item => item.id));
const postSlugs = new Set();
const postSources = new Set();
for (const post of feed) {
  const { slug, sourceUrl, assetIds } = post;
  if (typeof slug !== "string" || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) || postSlugs.has(slug)) {
    console.error(`Invalid or duplicate feed slug: ${slug}`);
    errors++;
  }
  postSlugs.add(slug);
  if (!URL.canParse(sourceUrl) || new URL(sourceUrl).protocol !== "https:" || postSources.has(sourceUrl)) {
    console.error(`Invalid or duplicate source URL for ${slug}: ${sourceUrl}`);
    errors++;
  }
  postSources.add(sourceUrl);
  if (!URL.canParse(post.sourceImage) || new URL(post.sourceImage).protocol !== "https:") {
    console.error(`Invalid public preview image URL for ${slug}`);
    errors++;
  }
  if (typeof post.previewImage !== "string" || !/^\/feed\/[a-z0-9-]+\.(?:png|jpe?g|webp)$/.test(post.previewImage) || !existsSync(join(root, "public", post.previewImage.slice(1)))) {
    console.error(`Missing preview image file for ${slug}`);
    errors++;
  }
  if (post.previewVideo !== undefined && (typeof post.previewVideo !== "string" ||
      !/^\/feed\/[a-z0-9-]+\.(?:webm|mp4)$/.test(post.previewVideo) ||
      !existsSync(join(root, "public", post.previewVideo.slice(1))))) {
    console.error(`Missing preview video file for ${slug}`);
    errors++;
  }
  if (!Array.isArray(assetIds) || new Set(assetIds).size !== assetIds.length || assetIds.some(id => !readyIds.has(id))) {
    console.error(`Post ${slug} must reference distinct ready assets`);
    errors++;
  }
}
console.log(`${feed.length} feed posts checked.`);
console.log(`${catalog.length} assets checked (${ready} ready for the public catalog). ${errors} errors.`);
if (errors) exit(1);

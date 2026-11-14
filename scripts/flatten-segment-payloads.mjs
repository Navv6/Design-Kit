/**
 * Static-export helper for GitHub Pages.
 *
 * Next 16 writes per-segment RSC prefetch payloads as nested folders
 * (`feed/__next.feed/__PAGE__.txt`), while the client router requests the
 * flattened name (`feed/__next.feed.__PAGE__.txt`). Static hosts have no
 * rewrite layer, so we copy each nested payload to its flattened path.
 * Originals are kept. Usage: node scripts/flatten-segment-payloads.mjs [outDir]
 */
import { copyFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";

const outDir = process.argv[2] ?? "out";
if (!existsSync(outDir)) {
  console.error(`flatten-segment-payloads: "${outDir}" not found; run the export build first.`);
  process.exit(1);
}

let copied = 0;

function walkFiles(dir, visit) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) walkFiles(full, visit);
    else visit(full);
  }
}

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (!statSync(full).isDirectory()) continue;
    if (name.startsWith("__next.")) {
      walkFiles(full, file => {
        const flat = join(dir, [name, ...relative(full, file).split(sep)].join("."));
        if (!existsSync(flat)) { copyFileSync(file, flat); copied++; }
      });
    } else {
      walk(full);
    }
  }
}

walk(outDir);
console.log(`flatten-segment-payloads: ${copied} payload file(s) flattened in ${outDir}.`);

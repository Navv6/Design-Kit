/** Check local imports without installed dependencies. Not a substitute for tsc/build. */
import { readdirSync, existsSync, readFileSync } from 'node:fs';
import { join, resolve, dirname, extname } from 'node:path';
const root = process.cwd();
const sourceExts = new Set(['.ts', '.tsx', '.js', '.jsx', '.css']);
const skip = new Set(['node_modules', '.next', '.git']);
const sourceFiles = [];
function walk(dir) {
  for (const item of readdirSync(dir, {withFileTypes: true})) {
    if (item.isDirectory()) {
      const child = join(dir, item.name);
      if (!skip.has(item.name) && child !== join(root, 'output', 'playwright')) walk(child);
    }
    else if (item.name !== 'next-env.d.ts' && sourceExts.has(extname(item.name))) sourceFiles.push(join(dir, item.name));
  }
}
walk(root);
// Static regular/dynamic imports and re-exports. Source parsing is intentionally lightweight.
const re = /(?:\b(?:import|export)\s+(?:[\s\S]*?\s+from\s*)?|\bimport\s*\()\s*['"]([^'"\n]+)['"]/g;
let count = 0, errors = 0;
for (const file of sourceFiles) {
  const src = readFileSync(file, 'utf8');
  for (const match of src.matchAll(re)) {
    const spec = match[1];
    if (!(spec.startsWith('@/') || spec.startsWith('.'))) continue;
    const raw = spec.startsWith('@/') ? resolve(root, spec.slice(2)) : resolve(dirname(file), spec);
    const candidates = [raw, raw+'.tsx', raw+'.ts', raw+'.jsx', raw+'.js', raw+'.css', join(raw,'index.ts'), join(raw,'index.tsx'), join(raw,'index.js')];
    count++;
    if (!candidates.some(existsSync)) { console.error(`Unresolved local import in ${file.slice(root.length+1)}: ${spec}`); errors++; }
  }
}
console.log(`Local import check: ${count} references across ${sourceFiles.length} files; ${errors} unresolved.`);
if (errors) process.exit(1);

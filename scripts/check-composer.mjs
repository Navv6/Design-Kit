import {readFileSync,existsSync} from 'node:fs';
const root=process.cwd();
const cat=JSON.parse(readFileSync('data/catalog.json','utf-8'));
const library=readFileSync('data/composer.ts','utf8');
const pattern=/\{id:'((?:CMP|MOT|LAY|TYP|DAT|BG|3D|SHD)-\d{3})',name:/g;
const matches=[...library.matchAll(pattern)].map(x=>x[1]);
let fail=0;
for(const id of matches){if(!cat.some(x=>x.id===id)){console.error('Missing catalog asset',id);fail++}}
for(const path of ['components/composer/renderer.tsx','components/composer/composer.css','components/composer/builder.tsx','components/composer/builder.css','app/builder/page.tsx']){if(!existsSync(path)){console.error('Missing composer file',path);fail++}}
if(new Set(matches).size!==matches.length){console.error('Duplicate composer block ID');fail++}
if(matches.length!==15){console.error(`Expected 15 compositor blocks, got ${matches.length}`);fail++}
const cores=cat.filter(item=>item.category==='visual-core');if(cores.length!==20){console.error(`Expected 20 cores, got ${cores.length}`);fail++}
console.log(`Composer checks: ${matches.length} curated blocks, ${cores.length} Visual Cores; ${fail} error(s).`);
if(fail)process.exit(1);

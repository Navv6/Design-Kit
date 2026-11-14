import {readFileSync,readdirSync} from 'node:fs';
import {join} from 'node:path';
const catalog=JSON.parse(readFileSync('data/catalog.json','utf8'));
const coreIds=new Set(catalog.filter(x=>x.category==='visual-core').map(x=>x.id));
const composer=readFileSync('data/composer.ts','utf8');
const blockIds=new Set([...composer.matchAll(/\{id:'((?:CMP|MOT|LAY|TYP|DAT|BG|3D|SHD)-\d{3})',name:/g)].map(x=>x[1]));
const samples=readdirSync('data/compositions').filter(f=>f.endsWith('.json'));
let errors=0;
for(const file of samples){
 const d=JSON.parse(readFileSync(join('data/compositions',file),'utf8'));
 if(d.schemaVersion!==1||!coreIds.has(d.visualCoreId)||!Array.isArray(d.blocks)||d.blocks.length>40){console.error(`Invalid composition header in ${file}`);errors++;continue;}
 const ids=new Set();
 for(const b of d.blocks){
  if(!blockIds.has(b.assetId)||typeof b.instanceId!=='string'||ids.has(b.instanceId)||!['compact','normal','large'].includes(b.size)||['title','description','label'].some(k=>typeof b[k]!=='string')){
   console.error(`Invalid block in ${file}: ${b.assetId}`);errors++;
  }
  ids.add(b.instanceId);
 }
}
if(samples.length!==3){console.error(`Expected 3 sample compositions, found ${samples.length}`);errors++;}
console.log(`Sample composition check: ${samples.length} JSON files, ${blockIds.size} allowed block IDs, ${coreIds.size} cores; ${errors} errors.`);
if(errors)process.exit(1);

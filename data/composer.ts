/** Shared configuration and serializer for the v0.4 page composer.
 * The JSON schema is independent of the visual editor UI.
 */
export type BlockId = 'LAY-002'|'CMP-002'|'LAY-001'|'TYP-001'|'MOT-001'|'CMP-003'|'MOT-002'|'MOT-003'|'MOT-004'|'DAT-001'|'BG-001'|'LAY-003'|'3D-001'|'3D-002'|'SHD-001';
export type BlockGroup = 'Sections'|'UI'|'Motion'|'Data'|'3D & FX';
export type ComposerBlock = { instanceId:string; assetId:BlockId; title:string; description:string; label:string; size:'compact'|'normal'|'large'; };
export type Composition = { schemaVersion:1; name:string; visualCoreId:string; accentOverride:string|null; blocks:ComposerBlock[] };
export const BLOCK_LIBRARY: {id:BlockId;name:string;group:BlockGroup;description:string;heavy?:boolean;defaults:{title:string;description:string;label:string;size:ComposerBlock['size']}}[] = [
{id:'LAY-002',name:'Split Hero',group:'Sections',description:'메인 헤드라인과 콜투액션',defaults:{title:'Design beyond the ordinary.',description:'Human-centered interfaces, meaningful interactions, and ambitious ideas.',label:'Explore work',size:'large'}},
{id:'CMP-002',name:'Glass Card',group:'UI',description:'반투명 프로젝트 소개 카드',defaults:{title:'Built to feel different.',description:'A reusable component that adapts to your chosen Visual Core.',label:'FEATURED PROJECT',size:'normal'}},
{id:'LAY-001',name:'Bento Grid',group:'Sections',description:'정보 중심의 벤토 그리드',defaults:{title:'Selected work',description:'AI applications · Systems · Interfaces',label:'EXPLORE',size:'large'}},
{id:'TYP-001',name:'Gradient Heading',group:'UI',description:'그라디언트 헤드라인',defaults:{title:'Ideas into experiences.',description:'Impactful typography with a careful visual hierarchy.',label:'TYPOGRAPHY',size:'normal'}},
{id:'MOT-001',name:'Magnetic Button',group:'Motion',description:'커서 추적 버튼',defaults:{title:'Explore project',description:'Hover to feel the response.',label:'Explore project',size:'compact'}},
{id:'CMP-003',name:'Gradient Action',group:'UI',description:'메인 CTA 버튼',defaults:{title:'Let’s connect',description:'A focused action for a clear next step.',label:'Get in touch',size:'compact'}},
{id:'MOT-002',name:'Scroll Reveal',group:'Motion',description:'스크롤 진입 등장',defaults:{title:'Reveal on entry',description:'An animated section that appears as you scroll.',label:'SCROLL',size:'normal'}},
{id:'MOT-003',name:'Tilt Card',group:'Motion',description:'포인터 3D 틸트',defaults:{title:'Tilt to explore',description:'Move the pointer over the card.',label:'INTERACTION',size:'normal'}},
{id:'MOT-004',name:'Animated Counter',group:'Data',description:'숫자 카운터 애니메이션',defaults:{title:'Real-world impact',description:'Animated metrics for key achievements.',label:'DATA',size:'normal'}},
{id:'DAT-001',name:'Sparkline Chart',group:'Data',description:'트렌드 라인 차트',defaults:{title:'Growth overview',description:'Small chart for a quick metric read.',label:'ANALYTICS',size:'normal'}},
{id:'BG-001',name:'Aurora Background',group:'3D & FX',description:'움직이는 오로라 배경',defaults:{title:'Beyond the surface',description:'An atmospheric background layer.',label:'BACKGROUND',size:'large'}},
{id:'LAY-003',name:'Vertical Timeline',group:'Sections',description:'경력·프로세스 타임라인',defaults:{title:'The journey',description:'Milestones, progress and lessons.',label:'TIMELINE',size:'normal'}},
{id:'3D-001',name:'Particle Field',group:'3D & FX',description:'Three.js 파티클 장면',heavy:true,defaults:{title:'Particle universe',description:'An interactive R3F scene; loaded only when in view.',label:'WEBGL',size:'large'}},
{id:'3D-002',name:'Torus Knot',group:'3D & FX',description:'3D 회전 토러스 모델',heavy:true,defaults:{title:'Form in motion',description:'Drag to rotate the rendered object.',label:'3D OBJECT',size:'large'}},
{id:'SHD-001',name:'Liquid Shader',group:'3D & FX',description:'GLSL 컬러 셰이더',heavy:true,defaults:{title:'Liquid light',description:'GPU shader experiment with soft flowing color.',label:'GLSL',size:'large'}},
];
export const DEFAULT_COMPOSITION:Composition = {schemaVersion:1,name:'새 디자인 페이지',visualCoreId:'VCR-002',accentOverride:null,blocks:[
{instanceId:'section-hero',assetId:'LAY-002',title:'작업을 소개합니다',description:'디자인 시스템과 인터랙션을 담은 포트폴리오입니다.',label:'작업 둘러보기',size:'large'},
{instanceId:'section-bento',assetId:'LAY-001',title:'주요 작업',description:'인터페이스 디자인과 웹 프로젝트를 모았습니다.',label:'포트폴리오',size:'large'},
{instanceId:'section-visual',assetId:'3D-001',title:'움직이는 파티클',description:'Three.js와 React Three Fiber로 구현한 파티클 장면입니다.',label:'WEBGL',size:'large'},
]};
export const COMPOSER_GROUPS:BlockGroup[] = ['Sections','UI','Motion','Data','3D & FX'];
export function newBlock(assetId:BlockId):ComposerBlock{
 const asset=BLOCK_LIBRARY.find(item=>item.id===assetId);if(!asset)throw new Error(`Unsupported asset: ${assetId}`);
 return {instanceId:`block-${Math.random().toString(36).slice(2,10)}`,assetId,...asset.defaults};
}
export function parseComposition(value:unknown,allowedCores:string[]):Composition{
 if(!value||typeof value!=='object')throw new Error('JSON object required');
 const data=value as Partial<Composition>;
 if(data.schemaVersion!==1)throw new Error('지원되지 않는 schemaVersion');
 if(!allowedCores.includes(String(data.visualCoreId)))throw new Error('등록되지 않은 Visual Core');
 if(!Array.isArray(data.blocks)||data.blocks.length>40)throw new Error('블록 수는 최대 40개');
 const ids=new Set<string>();
 const blocks=data.blocks.map((entry,i)=>{
  if(!entry||!BLOCK_LIBRARY.some(item=>item.id===entry.assetId))throw new Error(`지원하지 않는 블록: ${i+1}`);
  const id=String(entry.instanceId||`import-${i}`).slice(0,64);
  if(ids.has(id))throw new Error('중복된 instanceId');ids.add(id);
  const compact=(s:unknown,n:number)=>String(s||'').slice(0,n);
  return {instanceId:id,assetId:entry.assetId,title:compact(entry.title,150),description:compact(entry.description,500),label:compact(entry.label,100),size:['compact','normal','large'].includes(entry.size)?entry.size:'normal'} as ComposerBlock;
 });
 const color=typeof data.accentOverride==='string'&&/^#[0-9a-fA-F]{6}$/.test(data.accentOverride)?data.accentOverride:null;
 return {schemaVersion:1,name:String(data.name||'Untitled composition').slice(0,90),visualCoreId:String(data.visualCoreId),accentOverride:color,blocks};
}
export function generatePageSource(config:Composition){
 // This export deliberately reuses the *same renderer* the builder uses. No mismatched demo JSX.
 const literal=JSON.stringify(config,null,2);
 return `// app/page.tsx — generated by NAVV6 Design Atlas v0.4\n// Paste into a project containing components/composer/renderer.tsx and composer.css.\nimport { CompositionRenderer } from "@/components/composer/renderer";\nimport type { Composition } from "@/data/composer";\n\nconst composition: Composition = ${literal};\n\nexport default function Page() {\n  return <CompositionRenderer config={composition} />;\n}\n`;
}
export function generateAgentPrompt(config:Composition){
 return `NAVV6 Design Atlas v0.4의 composition을 프로젝트에 적용해줘.\nVisual Core: ${config.visualCoreId}\n컴포넌트 ID: ${config.blocks.map(x=>x.assetId).join(', ')||'(empty)'}\n\n적용 규칙:\n1. data/catalog.json에서 각 ID의 useWhen/avoidWhen/source를 확인한다.\n2. components/composer/renderer.tsx 및 composer.css를 재사용한다.\n3. Three.js / R3F는 viewport 진입 시에만 lazy load하고 WebGL과 reduced-motion fallback을 유지한다.\n4. 디자인 토큰은 Visual Core 팔레트로 통일하고, 키보드 및 모바일 테스트를 수행한다.\n5. 아래 설정을 data/사용할파일.json으로 저장하고 CompositionRenderer에 전달한다.\n\n${JSON.stringify(config,null,2)}`;
}

"use client";
import { publicPath } from "@/app/public-path";
export function ExtraThumbnail({id}:{id:string}){
 const t=(s:string)=><span className="mini-txt">{s}</span>;
 switch(id){
 case 'INT-012': return <img className="atlas-riff-thumb" src={publicPath("/feed/saved-card-transfer.png")} alt="" loading="lazy" />;
 case 'INT-011': return <div className="mini-tilt">BOX</div>;
 case 'INT-010': return <img className="atlas-riff-thumb" src={publicPath("/feed/otp-verify.png")} alt="" loading="lazy" />;
 case 'CMP-015': return <div className="riff-carousel-nav"><span>‹</span><span>1 / 3</span><span>›</span></div>;
 case 'INT-004': return <img className="atlas-riff-thumb" src={publicPath("/feed/stack-carousel.png")} alt="" loading="lazy" />;
 case 'INT-005': return <img className="atlas-riff-thumb" src={publicPath("/feed/receipt-printer.png")} alt="" loading="lazy" />;
 case 'INT-006': return <img className="atlas-riff-thumb" src={publicPath("/feed/basket-dropzone.png")} alt="" loading="lazy" />;
 case 'INT-007': return <img className="atlas-riff-thumb" src={publicPath("/feed/liquid-tabs.png")} alt="" loading="lazy" />;
 case 'INT-008': return <img className="atlas-riff-thumb" src={publicPath("/feed/magnifying-dock.png")} alt="" loading="lazy" />;
 case 'MOT-007': return <img className="atlas-riff-thumb" src={publicPath("/feed/cursor-trail.png")} alt="" loading="lazy" />;
 case 'INT-009': return <img className="atlas-riff-thumb" src={publicPath("/feed/profile-expansion.png")} alt="" loading="lazy" />;
 case 'MOT-008': return <img className="atlas-riff-thumb" src={publicPath("/feed/kinetic-steps.png")} alt="" loading="lazy" />;
 case 'MOT-009': return <img className="atlas-riff-thumb" src={publicPath("/feed/image-glitch.png")} alt="" loading="lazy" />;
 case 'MOT-010': return <img className="atlas-riff-thumb" src={publicPath("/feed/popcorn-burst.png")} alt="" loading="lazy" />;
 case 'CMP-004': return <div className="mini-mini"><span className="mini-check">✓</span>{t('Notifications enabled')}</div>;
 case 'CMP-005': return <div className="mini-mini mini-row"><span className="mini-radio on"/><span className="mini-radio"/><span className="mini-radio"/></div>;
 case 'CMP-006': return <div className="mini-segment"><span>Grid</span><span>List</span><span>Board</span></div>;
 case 'CMP-007': return <div className="mini-modal"><b>Confirm action</b><small>Make changes visible?</small><div><i/><i/></div></div>;
 case 'CMP-008': return <div className="mini-sheet"><i/><b>Quick actions</b><small>Share　 Duplicate　 →</small></div>;
 case 'CMP-009': return <div className="mini-toast">✓ &nbsp;Changes saved successfully</div>;
 case 'CMP-010': return <div className="mini-tooltip"><span>Helpful information</span><b>ⓘ</b></div>;
 case 'CMP-011': return <div className="mini-mini mini-row"><span className="mini-chip">✓ React</span><span className="mini-chip">+ Three</span></div>;
 case 'CMP-012': return <div className="mini-skeleton"><b/><span><i/><i/><i/></span></div>;
 case 'CMP-013': return <div className="mini-step"><span>−</span><b>03</b><span>+</span></div>;
 case 'CMP-014': return <div className="mini-slide"><b>68%</b><span><i/></span></div>;
 case 'MOT-002': return <div className="mini-visual-words">REVEAL<span>↗</span></div>;
 case 'MOT-003': return <div className="mini-tilt">TILT <small>↗</small></div>;
 case 'MOT-004': return <div className="mini-counter">1,248<span>↗ +18%</span></div>;
 case 'MOT-005': return <div className="mini-scramble">{t('DΞS1GN_↗')}<small>SCRAMBLE</small></div>;
 case 'MOT-006': return <div className="atlas-orbit-thumb"><i/><i/><i/><i/></div>;
 case 'LAY-002': return <div className="mini-hero"><b>DESIGN<br/>BEYOND.</b><span/></div>;
 case 'LAY-003': return <div className="mini-timeline"><b>2024</b><i/><b>2025</b><i/><b>2026</b></div>;
 case 'LAY-004': return <div className="mini-dashboard"><span/><span/><span/><i/></div>;
 case 'LAY-005': return <div className="mini-gallery">{[1,2,3,4,5,6].map(x=><span key={x}/>)}</div>;
 case '3D-002': return <div className="mini-knot"><span>◎</span></div>;
 case '3D-003': return <div className="mini-globe"><span>◎</span><i/><i/></div>;
 case 'SHD-001': return <div className="mini-shader"/>;
 case 'SHD-002': return <div className="mini-wave">〰〰〰<br/>〰〰〰</div>;
 case 'TYP-001': return <div className="mini-type-gradient">FLUID<br/>TYPE.</div>;
 case 'TYP-002': return <div className="mini-type-outline">MAKE<br/><span>MORE.</span></div>;
 case 'TYP-003': return <div className="mini-scramble">build_the_future<span>▌</span></div>;
 case 'DAT-001': return <div className="mini-chart"><b>24.8K</b><svg viewBox="0 0 160 45"><polyline points="0,39 15,30 30,34 46,13 62,24 77,14 90,24 110,5 128,11 146,4 160,1" fill="none" stroke="#9da8ff" strokeWidth="3"/></svg></div>;
 case 'DAT-002': return <div className="mini-heat">{Array.from({length:50},(_,i)=><i key={i} style={{opacity:.15+((i*i*7+12)%9)/10}}/>)}</div>;
 case 'DAT-003': return <div className="mini-gauge"><b>76%</b></div>;
 case 'BG-001': return <div className="mini-aurora">AURORA</div>;
 case 'BG-002': return <div className="mini-dotgrid">GRID / DOTS</div>;
 case 'BG-003': return <div className="mini-mesh">MESH</div>;
 case 'INT-001': return <div className="mini-command"><b>⌕ Search anything</b><small>⌘ K　 Open command</small></div>;
 case 'INT-002': return <div className="mini-spotlight">✳<span>SPOTLIGHT</span></div>;
 case 'INT-003': return <div className="atlas-orbit-thumb"><i/><i/><i/><i/></div>;
 default: return <div>{id}</div>
 }
}

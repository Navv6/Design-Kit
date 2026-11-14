'use client';
import {useId} from 'react';
export function Tooltip(){const id=useId();
 return <div style={{position:'relative',display:'inline-block'}} className="ad-tooltip-wrap"><button aria-describedby={id} style={{border:'1px solid #56617c',borderRadius:'50%',height:42,width:42,background:'#252d43',color:'#eff2ff',fontSize:19}}>?</button><div role="tooltip" id={id} className="ad-tooltip">실시간으로 저장됩니다</div><style>{`.ad-tooltip{position:absolute;bottom:calc(100% + 12px);left:50%;transform:translate(-50%,5px);width:max-content;max-width:230px;color:white;background:#30374d;padding:9px 12px;border-radius:7px;font-size:12px;opacity:0;visibility:hidden;pointer-events:none;transition:.16s}.ad-tooltip-wrap:hover .ad-tooltip,.ad-tooltip-wrap:focus-within .ad-tooltip{opacity:1;visibility:visible;transform:translate(-50%,0)}`}</style></div>;
}

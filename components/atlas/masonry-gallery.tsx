'use client';
export function MasonryGallery(){
 return <div style={{display:'grid',gridTemplateColumns:'repeat(3,minmax(0,1fr))',gap:9,width:'min(520px,100%)',alignItems:'start'}}>{[[130,'#6b5cc0'],[90,'#2e81a3'],[155,'#ad5c92'],[125,'#485dbb'],[105,'#ae815a'],[135,'#407f7b']].map(([h,c],i)=><div key={i} style={{height:h,background:`linear-gradient(145deg,${c},#151c36)`,border:'1px solid #ffffff25',borderRadius:12,gridRow:i%3===1?'span 1':undefined,display:'grid',placeItems:'center',fontSize:27,color:'#ffffffb0'}}>✦</div>)}</div>;
}

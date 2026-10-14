// Pure, deterministic rules. No DOM, no animation, no AI dependency.
export const has=(c,k)=>c.t.includes(k);
export const questionsFor=(chars,Q)=>{const s=new Set(chars.flatMap(c=>c.t));return Object.keys(Q).filter(k=>s.has(k))};
export const resolve=(secret,k)=>has(secret,k);
export const filter=(chars,cand,k,ans)=>cand.filter(i=>has(chars[i],k)===ans);
/** Questions that split `cand`, best (closest to half) first. */
export const rank=(chars,cand,asked,keys)=>keys.filter(k=>!asked.includes(k))
 .map(k=>({k,n:cand.filter(i=>has(chars[i],k)).length})).filter(o=>o.n>0&&o.n<cand.length)
 .sort((a,b)=>Math.abs(a.n-cand.length/2)-Math.abs(b.n-cand.length/2));
/** Presentation events for an answered question. Never reads the secret. */
export const reactionEvents=(chars,k)=>chars.map((c,i)=>({i,match:has(c,k)}));
/** Pre-game checks: size, duplicate trait sets (unsolvable), solvability. */
export function validatePack(chars,keys){
 const issues=[],seen={};
 if(chars.length<4)issues.push("Pick at least 4 characters.");
 for(const c of chars){const s=[...c.t].sort().join();(seen[s]??=[]).push(c.n)}
 for(const g of Object.values(seen))if(g.length>1)issues.push(`Identical traits: ${g.join(", ")}`);
 if(!keys.length)issues.push("No usable questions.");
 return issues;
}

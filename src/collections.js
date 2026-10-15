// Validates untrusted collection data (localStorage or imported files).
import {Q} from "./data.js";
const clean=(s,n=60)=>String(s??"").slice(0,n);
const slug=s=>clean(s).toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
const IMG=/^data:image\/(jpeg|png|webp);base64,[A-Za-z0-9+/=]+$/;
export function sanitizeCollection(o){
 const q={};
 for(const [k,v] of Object.entries(o&&typeof o.q==="object"&&o.q||{}))if(/^c-[a-z0-9-]{1,30}$/.test(k)&&clean(v).trim())q[k]=clean(v);
 const known=k=>Object.hasOwn(Q,k)||Object.hasOwn(q,k),seen=new Set(),chars=[];
 for(const c of (Array.isArray(o?.chars)?o.chars:[]).slice(0,200)){
  const n=clean(c?.n).trim()||"Unnamed",id="people-"+(slug(n)||"x"+chars.length);if(seen.has(id))continue;seen.add(id);
  chars.push({id,pack:"people",n,e:clean(c?.e,8)||"🙂",img:typeof c?.img==="string"&&c.img.length<150000&&IMG.test(c.img)?c.img:"",
   t:[...new Set((Array.isArray(c?.t)?c.t:[]).map(String).filter(known))]});
 }
 return {title:clean(o?.title)||"Our People",q,chars};
}

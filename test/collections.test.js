import test from "node:test";import assert from "node:assert/strict";
import {sanitizeCollection as s} from "../src/collections.js";
test("empty or junk input gives an empty collection",()=>{for(const x of [null,5,"x",{chars:"no"}])assert.deepEqual(s(x).chars,[])});
test("unknown traits, bad images and duplicate names are dropped",()=>{
 const r=s({q:{"c-ok":"Does it love pizza?",bad:"x"},chars:[{n:"Ann",t:["hat","c-ok","nope","constructor"],img:"javascript:alert(1)"},{n:"Ann"},{n:"Bo",img:"data:image/jpeg;base64,AAAA"}]});
 assert.deepEqual(Object.keys(r.q),["c-ok"]);assert.equal(r.chars.length,2);
 assert.deepEqual(r.chars[0].t,["hat","c-ok"]);assert.equal(r.chars[0].img,"");assert.equal(r.chars[1].img,"data:image/jpeg;base64,AAAA");
});
test("text is length-capped",()=>assert.equal(s({chars:[{n:"x".repeat(500)}]}).chars[0].n.length,60));

/*

import Maybe exposing (Just, Nothing)

*/


// NOBLE/CURVES BUNDLE (https://github.com/paulmillr/noble-curves, MIT License)
// Embedded: @noble/curves 2.0.1 - secp256k1, ed25519, x25519, P-256

var _Crypto_noble=(()=>{var ie=Object.defineProperty;var Nn=Object.getOwnPropertyDescriptor;var Dn=Object.getOwnPropertyNames;var Zn=Object.prototype.hasOwnProperty;var Cn=(e,t)=>{for(var r in t)ie(e,r,{get:t[r],enumerable:!0})},Vn=(e,t,r,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let o of Dn(t))!Zn.call(e,o)&&o!==r&&ie(e,o,{get:()=>t[o],enumerable:!(n=Nn(t,o))||n.enumerable});return e};var Mn=e=>Vn(ie({},"__esModule",{value:!0}),e);var Er={};Cn(Er,{bytesToHex:()=>nt,ed25519:()=>Ln,hexToBytes:()=>rt,p256:()=>qn,secp256k1:()=>Sn,x25519:()=>Un});function wt(e){return e instanceof Uint8Array||ArrayBuffer.isView(e)&&e.constructor.name==="Uint8Array"}function ot(e,t=""){if(!Number.isSafeInteger(e)||e<0){let r=t&&`"${t}" `;throw new Error(`${r}expected integer >= 0, got ${e}`)}}function N(e,t,r=""){let n=wt(e),o=e?.length,f=t!==void 0;if(!n||f&&o!==t){let i=r&&`"${r}" `,c=f?` of length ${t}`:"",s=n?`length=${o}`:`type=${typeof e}`;throw new Error(i+"expected Uint8Array"+c+", got "+s)}return e}function Wt(e){if(typeof e!="function"||typeof e.create!="function")throw new Error("Hash must wrapped by utils.createHasher");ot(e.outputLen),ot(e.blockLen)}function Rt(e,t=!0){if(e.destroyed)throw new Error("Hash instance has been destroyed");if(t&&e.finished)throw new Error("Hash#digest() has already been called")}function Ve(e,t){N(e,void 0,"digestInto() output");let r=t.outputLen;if(e.length<r)throw new Error('"digestInto() output" expected to be of length >='+r)}function at(...e){for(let t=0;t<e.length;t++)e[t].fill(0)}function $t(e){return new DataView(e.buffer,e.byteOffset,e.byteLength)}function et(e,t){return e<<32-t|e>>>t}var Me=typeof Uint8Array.from([]).toHex=="function"&&typeof Uint8Array.fromHex=="function",kn=Array.from({length:256},(e,t)=>t.toString(16).padStart(2,"0"));function nt(e){if(N(e),Me)return e.toHex();let t="";for(let r=0;r<e.length;r++)t+=kn[e[r]];return t}var ct={_0:48,_9:57,A:65,F:70,a:97,f:102};function Ce(e){if(e>=ct._0&&e<=ct._9)return e-ct._0;if(e>=ct.A&&e<=ct.F)return e-(ct.A-10);if(e>=ct.a&&e<=ct.f)return e-(ct.a-10)}function rt(e){if(typeof e!="string")throw new Error("hex string expected, got "+typeof e);if(Me)return Uint8Array.fromHex(e);let t=e.length,r=t/2;if(t%2)throw new Error("hex string expected, got unpadded hex of length "+t);let n=new Uint8Array(r);for(let o=0,f=0;o<r;o++,f+=2){let i=Ce(e.charCodeAt(f)),c=Ce(e.charCodeAt(f+1));if(i===void 0||c===void 0){let s=e[f]+e[f+1];throw new Error('hex string expected, got non-hex character "'+s+'" at index '+f)}n[o]=i*16+c}return n}function tt(...e){let t=0;for(let n=0;n<e.length;n++){let o=e[n];N(o),t+=o.length}let r=new Uint8Array(t);for(let n=0,o=0;n<e.length;n++){let f=e[n];r.set(f,o),o+=f.length}return r}function ce(e,t={}){let r=(o,f)=>e(f).update(o).digest(),n=e(void 0);return r.outputLen=n.outputLen,r.blockLen=n.blockLen,r.create=o=>e(o),Object.assign(r,t),Object.freeze(r)}function ht(e=32){let t=typeof globalThis=="object"?globalThis.crypto:null;if(typeof t?.getRandomValues!="function")throw new Error("crypto.getRandomValues must be defined");return t.getRandomValues(new Uint8Array(e))}var ae=e=>({oid:Uint8Array.from([6,9,96,134,72,1,101,3,4,2,e])});function ke(e,t,r){return e&t^~e&r}function Ye(e,t,r){return e&t^e&r^t&r}var Ct=class{blockLen;outputLen;padOffset;isLE;buffer;view;finished=!1;length=0;pos=0;destroyed=!1;constructor(t,r,n,o){this.blockLen=t,this.outputLen=r,this.padOffset=n,this.isLE=o,this.buffer=new Uint8Array(t),this.view=$t(this.buffer)}update(t){Rt(this),N(t);let{view:r,buffer:n,blockLen:o}=this,f=t.length;for(let i=0;i<f;){let c=Math.min(o-this.pos,f-i);if(c===o){let s=$t(t);for(;o<=f-i;i+=o)this.process(s,i);continue}n.set(t.subarray(i,i+c),this.pos),this.pos+=c,i+=c,this.pos===o&&(this.process(r,0),this.pos=0)}return this.length+=t.length,this.roundClean(),this}digestInto(t){Rt(this),Ve(t,this),this.finished=!0;let{buffer:r,view:n,blockLen:o,isLE:f}=this,{pos:i}=this;r[i++]=128,at(this.buffer.subarray(i)),this.padOffset>o-i&&(this.process(n,0),i=0);for(let x=i;x<o;x++)r[x]=0;n.setBigUint64(o-8,BigInt(this.length*8),f),this.process(n,0);let c=$t(t),s=this.outputLen;if(s%4)throw new Error("_sha2: outputLen must be aligned to 32bit");let l=s/4,h=this.get();if(l>h.length)throw new Error("_sha2: outputLen bigger than state");for(let x=0;x<l;x++)c.setUint32(4*x,h[x],f)}digest(){let{buffer:t,outputLen:r}=this;this.digestInto(t);let n=t.slice(0,r);return this.destroy(),n}_cloneInto(t){t||=new this.constructor,t.set(...this.get());let{blockLen:r,buffer:n,length:o,finished:f,destroyed:i,pos:c}=this;return t.destroyed=i,t.finished=f,t.length=o,t.pos=c,o%r&&t.buffer.set(n),t}clone(){return this._cloneInto()}},dt=Uint32Array.from([1779033703,3144134277,1013904242,2773480762,1359893119,2600822924,528734635,1541459225]);var Q=Uint32Array.from([1779033703,4089235720,3144134277,2227873595,1013904242,4271175723,2773480762,1595750129,1359893119,2917565137,2600822924,725511199,528734635,4215389547,1541459225,327033209]);var Pt=BigInt(4294967295),Xe=BigInt(32);function Yn(e,t=!1){return t?{h:Number(e&Pt),l:Number(e>>Xe&Pt)}:{h:Number(e>>Xe&Pt)|0,l:Number(e&Pt)|0}}function Ge(e,t=!1){let r=e.length,n=new Uint32Array(r),o=new Uint32Array(r);for(let f=0;f<r;f++){let{h:i,l:c}=Yn(e[f],t);[n[f],o[f]]=[i,c]}return[n,o]}var de=(e,t,r)=>e>>>r,ue=(e,t,r)=>e<<32-r|t>>>r,Bt=(e,t,r)=>e>>>r|t<<32-r,Et=(e,t,r)=>e<<32-r|t>>>r,Vt=(e,t,r)=>e<<64-r|t>>>r-32,Mt=(e,t,r)=>e>>>r-32|t<<64-r;function ft(e,t,r,n){let o=(t>>>0)+(n>>>0);return{h:e+r+(o/2**32|0)|0,l:o|0}}var Ke=(e,t,r)=>(e>>>0)+(t>>>0)+(r>>>0),je=(e,t,r,n)=>t+r+n+(e/2**32|0)|0,ze=(e,t,r,n)=>(e>>>0)+(t>>>0)+(r>>>0)+(n>>>0),We=(e,t,r,n,o)=>t+r+n+o+(e/2**32|0)|0,$e=(e,t,r,n,o)=>(e>>>0)+(t>>>0)+(r>>>0)+(n>>>0)+(o>>>0),Pe=(e,t,r,n,o,f)=>t+r+n+o+f+(e/2**32|0)|0;var Gn=Uint32Array.from([1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298]),bt=new Uint32Array(64),le=class extends Ct{constructor(t){super(64,t,8,!1)}get(){let{A:t,B:r,C:n,D:o,E:f,F:i,G:c,H:s}=this;return[t,r,n,o,f,i,c,s]}set(t,r,n,o,f,i,c,s){this.A=t|0,this.B=r|0,this.C=n|0,this.D=o|0,this.E=f|0,this.F=i|0,this.G=c|0,this.H=s|0}process(t,r){for(let x=0;x<16;x++,r+=4)bt[x]=t.getUint32(r,!1);for(let x=16;x<64;x++){let v=bt[x-15],E=bt[x-2],w=et(v,7)^et(v,18)^v>>>3,L=et(E,17)^et(E,19)^E>>>10;bt[x]=L+bt[x-7]+w+bt[x-16]|0}let{A:n,B:o,C:f,D:i,E:c,F:s,G:l,H:h}=this;for(let x=0;x<64;x++){let v=et(c,6)^et(c,11)^et(c,25),E=h+v+ke(c,s,l)+Gn[x]+bt[x]|0,L=(et(n,2)^et(n,13)^et(n,22))+Ye(n,o,f)|0;h=l,l=s,s=c,c=i+E|0,i=f,f=o,o=n,n=E+L|0}n=n+this.A|0,o=o+this.B|0,f=f+this.C|0,i=i+this.D|0,c=c+this.E|0,s=s+this.F|0,l=l+this.G|0,h=h+this.H|0,this.set(n,o,f,i,c,s,l,h)}roundClean(){at(bt)}destroy(){this.set(0,0,0,0,0,0,0,0),at(this.buffer)}},he=class extends le{A=dt[0]|0;B=dt[1]|0;C=dt[2]|0;D=dt[3]|0;E=dt[4]|0;F=dt[5]|0;G=dt[6]|0;H=dt[7]|0;constructor(){super(32)}};var Qe=Ge(["0x428a2f98d728ae22","0x7137449123ef65cd","0xb5c0fbcfec4d3b2f","0xe9b5dba58189dbbc","0x3956c25bf348b538","0x59f111f1b605d019","0x923f82a4af194f9b","0xab1c5ed5da6d8118","0xd807aa98a3030242","0x12835b0145706fbe","0x243185be4ee4b28c","0x550c7dc3d5ffb4e2","0x72be5d74f27b896f","0x80deb1fe3b1696b1","0x9bdc06a725c71235","0xc19bf174cf692694","0xe49b69c19ef14ad2","0xefbe4786384f25e3","0x0fc19dc68b8cd5b5","0x240ca1cc77ac9c65","0x2de92c6f592b0275","0x4a7484aa6ea6e483","0x5cb0a9dcbd41fbd4","0x76f988da831153b5","0x983e5152ee66dfab","0xa831c66d2db43210","0xb00327c898fb213f","0xbf597fc7beef0ee4","0xc6e00bf33da88fc2","0xd5a79147930aa725","0x06ca6351e003826f","0x142929670a0e6e70","0x27b70a8546d22ffc","0x2e1b21385c26c926","0x4d2c6dfc5ac42aed","0x53380d139d95b3df","0x650a73548baf63de","0x766a0abb3c77b2a8","0x81c2c92e47edaee6","0x92722c851482353b","0xa2bfe8a14cf10364","0xa81a664bbc423001","0xc24b8b70d0f89791","0xc76c51a30654be30","0xd192e819d6ef5218","0xd69906245565a910","0xf40e35855771202a","0x106aa07032bbd1b8","0x19a4c116b8d2d0c8","0x1e376c085141ab53","0x2748774cdf8eeb99","0x34b0bcb5e19b48a8","0x391c0cb3c5c95a63","0x4ed8aa4ae3418acb","0x5b9cca4f7763e373","0x682e6ff3d6b2b8a3","0x748f82ee5defb2fc","0x78a5636f43172f60","0x84c87814a1f0ab72","0x8cc702081a6439ec","0x90befffa23631e28","0xa4506cebde82bde9","0xbef9a3f7b2c67915","0xc67178f2e372532b","0xca273eceea26619c","0xd186b8c721c0c207","0xeada7dd6cde0eb1e","0xf57d4f7fee6ed178","0x06f067aa72176fba","0x0a637dc5a2c898a6","0x113f9804bef90dae","0x1b710b35131c471b","0x28db77f523047d84","0x32caab7b40c72493","0x3c9ebe0a15c9bebc","0x431d67c49c100d4c","0x4cc5d4becb3e42b6","0x597f299cfc657e2a","0x5fcb6fab3ad6faec","0x6c44198c4a475817"].map(e=>BigInt(e))),Kn=Qe[0],jn=Qe[1],xt=new Uint32Array(80),mt=new Uint32Array(80),be=class extends Ct{constructor(t){super(128,t,16,!1)}get(){let{Ah:t,Al:r,Bh:n,Bl:o,Ch:f,Cl:i,Dh:c,Dl:s,Eh:l,El:h,Fh:x,Fl:v,Gh:E,Gl:w,Hh:L,Hl:y}=this;return[t,r,n,o,f,i,c,s,l,h,x,v,E,w,L,y]}set(t,r,n,o,f,i,c,s,l,h,x,v,E,w,L,y){this.Ah=t|0,this.Al=r|0,this.Bh=n|0,this.Bl=o|0,this.Ch=f|0,this.Cl=i|0,this.Dh=c|0,this.Dl=s|0,this.Eh=l|0,this.El=h|0,this.Fh=x|0,this.Fl=v|0,this.Gh=E|0,this.Gl=w|0,this.Hh=L|0,this.Hl=y|0}process(t,r){for(let p=0;p<16;p++,r+=4)xt[p]=t.getUint32(r),mt[p]=t.getUint32(r+=4);for(let p=16;p<80;p++){let T=xt[p-15]|0,D=mt[p-15]|0,V=Bt(T,D,1)^Bt(T,D,8)^de(T,D,7),k=Et(T,D,1)^Et(T,D,8)^ue(T,D,7),B=xt[p-2]|0,b=mt[p-2]|0,q=Bt(B,b,19)^Vt(B,b,61)^de(B,b,6),Z=Et(B,b,19)^Mt(B,b,61)^ue(B,b,6),O=ze(k,Z,mt[p-7],mt[p-16]),u=We(O,V,q,xt[p-7],xt[p-16]);xt[p]=u|0,mt[p]=O|0}let{Ah:n,Al:o,Bh:f,Bl:i,Ch:c,Cl:s,Dh:l,Dl:h,Eh:x,El:v,Fh:E,Fl:w,Gh:L,Gl:y,Hh:g,Hl:R}=this;for(let p=0;p<80;p++){let T=Bt(x,v,14)^Bt(x,v,18)^Vt(x,v,41),D=Et(x,v,14)^Et(x,v,18)^Mt(x,v,41),V=x&E^~x&L,k=v&w^~v&y,B=$e(R,D,k,jn[p],mt[p]),b=Pe(B,g,T,V,Kn[p],xt[p]),q=B|0,Z=Bt(n,o,28)^Vt(n,o,34)^Vt(n,o,39),O=Et(n,o,28)^Mt(n,o,34)^Mt(n,o,39),u=n&f^n&c^f&c,a=o&i^o&s^i&s;g=L|0,R=y|0,L=E|0,y=w|0,E=x|0,w=v|0,{h:x,l:v}=ft(l|0,h|0,b|0,q|0),l=c|0,h=s|0,c=f|0,s=i|0,f=n|0,i=o|0;let d=Ke(q,O,a);n=je(d,b,Z,u),o=d|0}({h:n,l:o}=ft(this.Ah|0,this.Al|0,n|0,o|0)),{h:f,l:i}=ft(this.Bh|0,this.Bl|0,f|0,i|0),{h:c,l:s}=ft(this.Ch|0,this.Cl|0,c|0,s|0),{h:l,l:h}=ft(this.Dh|0,this.Dl|0,l|0,h|0),{h:x,l:v}=ft(this.Eh|0,this.El|0,x|0,v|0),{h:E,l:w}=ft(this.Fh|0,this.Fl|0,E|0,w|0),{h:L,l:y}=ft(this.Gh|0,this.Gl|0,L|0,y|0),{h:g,l:R}=ft(this.Hh|0,this.Hl|0,g|0,R|0),this.set(n,o,f,i,c,s,l,h,x,v,E,w,L,y,g,R)}roundClean(){at(xt,mt)}destroy(){at(this.buffer),this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0)}},xe=class extends be{Ah=Q[0]|0;Al=Q[1]|0;Bh=Q[2]|0;Bl=Q[3]|0;Ch=Q[4]|0;Cl=Q[5]|0;Dh=Q[6]|0;Dl=Q[7]|0;Eh=Q[8]|0;El=Q[9]|0;Fh=Q[10]|0;Fl=Q[11]|0;Gh=Q[12]|0;Gl=Q[13]|0;Hh=Q[14]|0;Hl=Q[15]|0;constructor(){super(64)}};var Qt=ce(()=>new he,ae(1));var me=ce(()=>new xe,ae(3));var pe=BigInt(0),ge=BigInt(1);function ut(e,t=""){if(typeof e!="boolean"){let r=t&&`"${t}" `;throw new Error(r+"expected boolean, got type="+typeof e)}return e}function Je(e){if(typeof e=="bigint"){if(!Jt(e))throw new Error("positive bigint expected, got "+e)}else ot(e);return e}function kt(e){let t=Je(e).toString(16);return t.length&1?"0"+t:t}function Fe(e){if(typeof e!="string")throw new Error("hex string expected, got "+typeof e);return e===""?pe:BigInt("0x"+e)}function Ot(e){return Fe(nt(e))}function st(e){return Fe(nt(vt(N(e)).reverse()))}function Ft(e,t){ot(t),e=Je(e);let r=rt(e.toString(16).padStart(t*2,"0"));if(r.length!==t)throw new Error("number too large");return r}function Yt(e,t){return Ft(e,t).reverse()}function vt(e){return Uint8Array.from(e)}var Jt=e=>typeof e=="bigint"&&pe<=e;function zn(e,t,r){return Jt(e)&&Jt(t)&&Jt(r)&&t<=e&&e<r}function gt(e,t,r,n){if(!zn(t,r,n))throw new Error("expected valid "+e+": "+r+" <= n < "+n+", got "+t)}function ye(e){let t;for(t=0;e>pe;e>>=ge,t+=1);return t}var Xt=e=>(ge<<BigInt(e))-ge;function tn(e,t,r){if(ot(e,"hashLen"),ot(t,"qByteLen"),typeof r!="function")throw new Error("hmacFn must be a function");let n=y=>new Uint8Array(y),o=Uint8Array.of(),f=Uint8Array.of(0),i=Uint8Array.of(1),c=1e3,s=n(e),l=n(e),h=0,x=()=>{s.fill(1),l.fill(0),h=0},v=(...y)=>r(l,tt(s,...y)),E=(y=o)=>{l=v(f,y),s=v(),y.length!==0&&(l=v(i,y),s=v())},w=()=>{if(h++>=c)throw new Error("drbg: tried max amount of iterations");let y=0,g=[];for(;y<t;){s=v();let R=s.slice();g.push(R),y+=s.length}return tt(...g)};return(y,g)=>{x(),E(y);let R;for(;!(R=g(w()));)E();return x(),R}}function it(e,t={},r={}){if(!e||typeof e!="object")throw new Error("expected valid options object");function n(f,i,c){let s=e[f];if(c&&s===void 0)return;let l=typeof s;if(l!==i||s===null)throw new Error(`param "${f}" is invalid: expected ${i}, got ${l}`)}let o=(f,i)=>Object.entries(f).forEach(([c,s])=>n(c,s,i));o(t,!1),o(r,!0)}function Ht(e){let t=new WeakMap;return(r,...n)=>{let o=t.get(r);if(o!==void 0)return o;let f=e(r,...n);return t.set(r,f),f}}var J=BigInt(0),$=BigInt(1),St=BigInt(2),rn=BigInt(3),on=BigInt(4),fn=BigInt(5),Wn=BigInt(7),sn=BigInt(8),$n=BigInt(9),cn=BigInt(16);function j(e,t){let r=e%t;return r>=J?r:t+r}function G(e,t,r){let n=e;for(;t-- >J;)n*=n,n%=r;return n}function en(e,t){if(e===J)throw new Error("invert: expected non-zero number");if(t<=J)throw new Error("invert: expected positive modulus, got "+t);let r=j(e,t),n=t,o=J,f=$,i=$,c=J;for(;r!==J;){let l=n/r,h=n%r,x=o-i*l,v=f-c*l;n=r,r=h,o=i,f=c,i=x,c=v}if(n!==$)throw new Error("invert: does not exist");return j(o,t)}function Be(e,t,r){if(!e.eql(e.sqr(t),r))throw new Error("Cannot find square root")}function an(e,t){let r=(e.ORDER+$)/on,n=e.pow(t,r);return Be(e,n,t),n}function Pn(e,t){let r=(e.ORDER-fn)/sn,n=e.mul(t,St),o=e.pow(n,r),f=e.mul(t,o),i=e.mul(e.mul(f,St),o),c=e.mul(f,e.sub(i,e.ONE));return Be(e,c,t),c}function Qn(e){let t=Tt(e),r=dn(e),n=r(t,t.neg(t.ONE)),o=r(t,n),f=r(t,t.neg(n)),i=(e+Wn)/cn;return(c,s)=>{let l=c.pow(s,i),h=c.mul(l,n),x=c.mul(l,o),v=c.mul(l,f),E=c.eql(c.sqr(h),s),w=c.eql(c.sqr(x),s);l=c.cmov(l,h,E),h=c.cmov(v,x,w);let L=c.eql(c.sqr(h),s),y=c.cmov(l,h,L);return Be(c,y,s),y}}function dn(e){if(e<rn)throw new Error("sqrt is not defined for small field");let t=e-$,r=0;for(;t%St===J;)t/=St,r++;let n=St,o=Tt(e);for(;nn(o,n)===1;)if(n++>1e3)throw new Error("Cannot find square root: probably non-prime P");if(r===1)return an;let f=o.pow(n,t),i=(t+$)/St;return function(s,l){if(s.is0(l))return l;if(nn(s,l)!==1)throw new Error("Cannot find square root");let h=r,x=s.mul(s.ONE,f),v=s.pow(l,t),E=s.pow(l,i);for(;!s.eql(v,s.ONE);){if(s.is0(v))return s.ZERO;let w=1,L=s.sqr(v);for(;!s.eql(L,s.ONE);)if(w++,L=s.sqr(L),w===h)throw new Error("Cannot find square root");let y=$<<BigInt(h-w-1),g=s.pow(x,y);h=w,x=s.sqr(g),v=s.mul(v,x),E=s.mul(E,g)}return E}}function Jn(e){return e%on===rn?an:e%sn===fn?Pn:e%cn===$n?Qn(e):dn(e)}var un=(e,t)=>(j(e,t)&$)===$,Fn=["create","isValid","is0","neg","inv","sqrt","sqr","eql","add","sub","mul","pow","div","addN","subN","mulN","sqrN"];function Ee(e){let t={ORDER:"bigint",BYTES:"number",BITS:"number"},r=Fn.reduce((n,o)=>(n[o]="function",n),t);return it(e,r),e}function tr(e,t,r){if(r<J)throw new Error("invalid exponent, negatives unsupported");if(r===J)return e.ONE;if(r===$)return t;let n=e.ONE,o=t;for(;r>J;)r&$&&(n=e.mul(n,o)),o=e.sqr(o),r>>=$;return n}function Gt(e,t,r=!1){let n=new Array(t.length).fill(r?e.ZERO:void 0),o=t.reduce((i,c,s)=>e.is0(c)?i:(n[s]=i,e.mul(i,c)),e.ONE),f=e.inv(o);return t.reduceRight((i,c,s)=>e.is0(c)?i:(n[s]=e.mul(i,n[s]),e.mul(i,c)),f),n}function nn(e,t){let r=(e.ORDER-$)/St,n=e.pow(t,r),o=e.eql(n,e.ONE),f=e.eql(n,e.ZERO),i=e.eql(n,e.neg(e.ONE));if(!o&&!f&&!i)throw new Error("invalid Legendre symbol result");return o?1:f?0:-1}function er(e,t){t!==void 0&&ot(t);let r=t!==void 0?t:e.toString(2).length,n=Math.ceil(r/8);return{nBitLength:r,nByteLength:n}}var we=class{ORDER;BITS;BYTES;isLE;ZERO=J;ONE=$;_lengths;_sqrt;_mod;constructor(t,r={}){if(t<=J)throw new Error("invalid field: expected ORDER > 0, got "+t);let n;this.isLE=!1,r!=null&&typeof r=="object"&&(typeof r.BITS=="number"&&(n=r.BITS),typeof r.sqrt=="function"&&(this.sqrt=r.sqrt),typeof r.isLE=="boolean"&&(this.isLE=r.isLE),r.allowedLengths&&(this._lengths=r.allowedLengths?.slice()),typeof r.modFromBytes=="boolean"&&(this._mod=r.modFromBytes));let{nBitLength:o,nByteLength:f}=er(t,n);if(f>2048)throw new Error("invalid field: expected ORDER of <= 2048 bytes");this.ORDER=t,this.BITS=o,this.BYTES=f,this._sqrt=void 0,Object.preventExtensions(this)}create(t){return j(t,this.ORDER)}isValid(t){if(typeof t!="bigint")throw new Error("invalid field element: expected bigint, got "+typeof t);return J<=t&&t<this.ORDER}is0(t){return t===J}isValidNot0(t){return!this.is0(t)&&this.isValid(t)}isOdd(t){return(t&$)===$}neg(t){return j(-t,this.ORDER)}eql(t,r){return t===r}sqr(t){return j(t*t,this.ORDER)}add(t,r){return j(t+r,this.ORDER)}sub(t,r){return j(t-r,this.ORDER)}mul(t,r){return j(t*r,this.ORDER)}pow(t,r){return tr(this,t,r)}div(t,r){return j(t*en(r,this.ORDER),this.ORDER)}sqrN(t){return t*t}addN(t,r){return t+r}subN(t,r){return t-r}mulN(t,r){return t*r}inv(t){return en(t,this.ORDER)}sqrt(t){return this._sqrt||(this._sqrt=Jn(this.ORDER)),this._sqrt(this,t)}toBytes(t){return this.isLE?Yt(t,this.BYTES):Ft(t,this.BYTES)}fromBytes(t,r=!1){N(t);let{_lengths:n,BYTES:o,isLE:f,ORDER:i,_mod:c}=this;if(n){if(!n.includes(t.length)||t.length>o)throw new Error("Field.fromBytes: expected "+n+" bytes, got "+t.length);let l=new Uint8Array(o);l.set(t,f?0:l.length-t.length),t=l}if(t.length!==o)throw new Error("Field.fromBytes: expected "+o+" bytes, got "+t.length);let s=f?st(t):Ot(t);if(c&&(s=j(s,i)),!r&&!this.isValid(s))throw new Error("invalid field element: outside of range 0..ORDER");return s}invertBatch(t){return Gt(this,t)}cmov(t,r,n){return n?r:t}};function Tt(e,t={}){return new we(e,t)}function ln(e){if(typeof e!="bigint")throw new Error("field order must be bigint");let t=e.toString(2).length;return Math.ceil(t/8)}function ve(e){let t=ln(e);return t+Math.ceil(t/2)}function Se(e,t,r=!1){N(e);let n=e.length,o=ln(t),f=ve(t);if(n<16||n<f||n>1024)throw new Error("expected "+f+"-1024 bytes of input, got "+n);let i=r?st(e):Ot(e),c=j(i,t-$)+$;return r?Yt(c,o):Ft(c,o)}var Lt=BigInt(0),_t=BigInt(1);function Kt(e,t){let r=t.negate();return e?r:t}function It(e,t){let r=Gt(e.Fp,t.map(n=>n.Z));return t.map((n,o)=>e.fromAffine(n.toAffine(r[o])))}function mn(e,t){if(!Number.isSafeInteger(e)||e<=0||e>t)throw new Error("invalid window size, expected [1.."+t+"], got W="+e)}function _e(e,t){mn(e,t);let r=Math.ceil(t/e)+1,n=2**(e-1),o=2**e,f=Xt(e),i=BigInt(e);return{windows:r,windowSize:n,mask:f,maxNumber:o,shiftBy:i}}function hn(e,t,r){let{windowSize:n,mask:o,maxNumber:f,shiftBy:i}=r,c=Number(e&o),s=e>>i;c>n&&(c-=f,s+=_t);let l=t*n,h=l+Math.abs(c)-1,x=c===0,v=c<0,E=t%2!==0;return{nextN:s,offset:h,isZero:x,isNeg:v,isNegF:E,offsetF:l}}var Ie=new WeakMap,gn=new WeakMap;function Ae(e){return gn.get(e)||1}function bn(e){if(e!==Lt)throw new Error("invalid wNAF")}var Ut=class{BASE;ZERO;Fn;bits;constructor(t,r){this.BASE=t.BASE,this.ZERO=t.ZERO,this.Fn=t.Fn,this.bits=r}_unsafeLadder(t,r,n=this.ZERO){let o=t;for(;r>Lt;)r&_t&&(n=n.add(o)),o=o.double(),r>>=_t;return n}precomputeWindow(t,r){let{windows:n,windowSize:o}=_e(r,this.bits),f=[],i=t,c=i;for(let s=0;s<n;s++){c=i,f.push(c);for(let l=1;l<o;l++)c=c.add(i),f.push(c);i=c.double()}return f}wNAF(t,r,n){if(!this.Fn.isValid(n))throw new Error("invalid scalar");let o=this.ZERO,f=this.BASE,i=_e(t,this.bits);for(let c=0;c<i.windows;c++){let{nextN:s,offset:l,isZero:h,isNeg:x,isNegF:v,offsetF:E}=hn(n,c,i);n=s,h?f=f.add(Kt(v,r[E])):o=o.add(Kt(x,r[l]))}return bn(n),{p:o,f}}wNAFUnsafe(t,r,n,o=this.ZERO){let f=_e(t,this.bits);for(let i=0;i<f.windows&&n!==Lt;i++){let{nextN:c,offset:s,isZero:l,isNeg:h}=hn(n,i,f);if(n=c,!l){let x=r[s];o=o.add(h?x.negate():x)}}return bn(n),o}getPrecomputes(t,r,n){let o=Ie.get(r);return o||(o=this.precomputeWindow(r,t),t!==1&&(typeof n=="function"&&(o=n(o)),Ie.set(r,o))),o}cached(t,r,n){let o=Ae(t);return this.wNAF(o,this.getPrecomputes(o,t,n),r)}unsafe(t,r,n,o){let f=Ae(t);return f===1?this._unsafeLadder(t,r,o):this.wNAFUnsafe(f,this.getPrecomputes(f,t,n),r,o)}createCache(t,r){mn(r,this.bits),gn.set(t,r),Ie.delete(t)}hasCache(t){return Ae(t)!==1}};function pn(e,t,r,n){let o=t,f=e.ZERO,i=e.ZERO;for(;r>Lt||n>Lt;)r&_t&&(f=f.add(o)),n&_t&&(i=i.add(o)),o=o.double(),r>>=_t,n>>=_t;return{p1:f,p2:i}}function xn(e,t,r){if(t){if(t.ORDER!==e)throw new Error("Field.ORDER must match order: Fp == p, Fn == n");return Ee(t),t}else return Tt(e,{isLE:r})}function te(e,t,r={},n){if(n===void 0&&(n=e==="edwards"),!t||typeof t!="object")throw new Error(`expected valid ${e} CURVE object`);for(let s of["p","n","h"]){let l=t[s];if(!(typeof l=="bigint"&&l>Lt))throw new Error(`CURVE.${s} must be positive bigint`)}let o=xn(t.p,r.Fp,n),f=xn(t.n,r.Fn,n),c=["Gx","Gy","a",e==="weierstrass"?"b":"d"];for(let s of c)if(!o.isValid(t[s]))throw new Error(`CURVE.${s} must be valid field element of CURVE.Fp`);return t=Object.freeze(Object.assign({},t)),{CURVE:t,Fp:o,Fn:f}}function qt(e,t){return function(n){let o=e(n);return{secretKey:o,publicKey:t(o)}}}var ee=class{oHash;iHash;blockLen;outputLen;finished=!1;destroyed=!1;constructor(t,r){if(Wt(t),N(r,void 0,"key"),this.iHash=t.create(),typeof this.iHash.update!="function")throw new Error("Expected instance of class which extends utils.Hash");this.blockLen=this.iHash.blockLen,this.outputLen=this.iHash.outputLen;let n=this.blockLen,o=new Uint8Array(n);o.set(r.length>n?t.create().update(r).digest():r);for(let f=0;f<o.length;f++)o[f]^=54;this.iHash.update(o),this.oHash=t.create();for(let f=0;f<o.length;f++)o[f]^=106;this.oHash.update(o),at(o)}update(t){return Rt(this),this.iHash.update(t),this}digestInto(t){Rt(this),N(t,this.outputLen,"output"),this.finished=!0,this.iHash.digestInto(t),this.oHash.update(t),this.oHash.digestInto(t),this.destroy()}digest(){let t=new Uint8Array(this.oHash.outputLen);return this.digestInto(t),t}_cloneInto(t){t||=Object.create(Object.getPrototypeOf(this),{});let{oHash:r,iHash:n,finished:o,destroyed:f,blockLen:i,outputLen:c}=this;return t=t,t.finished=o,t.destroyed=f,t.blockLen=i,t.outputLen=c,t.oHash=r._cloneInto(t.oHash),t.iHash=n._cloneInto(t.iHash),t}clone(){return this._cloneInto()}destroy(){this.destroyed=!0,this.oHash.destroy(),this.iHash.destroy()}},Re=(e,t,r)=>new ee(e,t).update(r).digest();Re.create=(e,t)=>new ee(e,t);var yn=(e,t)=>(e+(e>=0?t:-t)/wn)/t;function nr(e,t,r){let[[n,o],[f,i]]=t,c=yn(i*e,r),s=yn(-o*e,r),l=e-c*n-s*f,h=-c*o-s*i,x=l<lt,v=h<lt;x&&(l=-l),v&&(h=-h);let E=Xt(Math.ceil(ye(r)/2))+Nt;if(l<lt||l>=E||h<lt||h>=E)throw new Error("splitScalar (endomorphism): failed, k="+e);return{k1neg:x,k1:l,k2neg:v,k2:h}}function He(e){if(!["compact","recovered","der"].includes(e))throw new Error('Signature format must be "compact", "recovered", or "der"');return e}function Oe(e,t){let r={};for(let n of Object.keys(t))r[n]=e[n]===void 0?t[n]:e[n];return ut(r.lowS,"lowS"),ut(r.prehash,"prehash"),r.format!==void 0&&He(r.format),r}var Te=class extends Error{constructor(t=""){super(t)}},pt={Err:Te,_tlv:{encode:(e,t)=>{let{Err:r}=pt;if(e<0||e>256)throw new r("tlv.encode: wrong tag");if(t.length&1)throw new r("tlv.encode: unpadded data");let n=t.length/2,o=kt(n);if(o.length/2&128)throw new r("tlv.encode: long form length too big");let f=n>127?kt(o.length/2|128):"";return kt(e)+f+o+t},decode(e,t){let{Err:r}=pt,n=0;if(e<0||e>256)throw new r("tlv.encode: wrong tag");if(t.length<2||t[n++]!==e)throw new r("tlv.decode: wrong tlv");let o=t[n++],f=!!(o&128),i=0;if(!f)i=o;else{let s=o&127;if(!s)throw new r("tlv.decode(long): indefinite length not supported");if(s>4)throw new r("tlv.decode(long): byte length is too big");let l=t.subarray(n,n+s);if(l.length!==s)throw new r("tlv.decode: length bytes not complete");if(l[0]===0)throw new r("tlv.decode(long): zero leftmost byte");for(let h of l)i=i<<8|h;if(n+=s,i<128)throw new r("tlv.decode(long): not minimal encoding")}let c=t.subarray(n,n+i);if(c.length!==i)throw new r("tlv.decode: wrong value length");return{v:c,l:t.subarray(n+i)}}},_int:{encode(e){let{Err:t}=pt;if(e<lt)throw new t("integer: negative integers are not allowed");let r=kt(e);if(Number.parseInt(r[0],16)&8&&(r="00"+r),r.length&1)throw new t("unexpected DER parsing assertion: unpadded hex");return r},decode(e){let{Err:t}=pt;if(e[0]&128)throw new t("invalid signature integer: negative");if(e[0]===0&&!(e[1]&128))throw new t("invalid signature integer: unnecessary leading zero");return Ot(e)}},toSig(e){let{Err:t,_int:r,_tlv:n}=pt,o=N(e,void 0,"signature"),{v:f,l:i}=n.decode(48,o);if(i.length)throw new t("invalid signature: left bytes after parsing");let{v:c,l:s}=n.decode(2,f),{v:l,l:h}=n.decode(2,s);if(h.length)throw new t("invalid signature: left bytes after parsing");return{r:r.decode(c),s:r.decode(l)}},hexFromSig(e){let{_tlv:t,_int:r}=pt,n=t.encode(2,r.encode(e.r)),o=t.encode(2,r.encode(e.s)),f=n+o;return t.encode(48,f)}},lt=BigInt(0),Nt=BigInt(1),wn=BigInt(2),ne=BigInt(3),rr=BigInt(4);function re(e,t={}){let r=te("weierstrass",e,t),{Fp:n,Fn:o}=r,f=r.CURVE,{h:i,n:c}=f;it(t,{},{allowInfinityPoint:"boolean",clearCofactor:"function",isTorsionFree:"function",fromBytes:"function",toBytes:"function",endo:"object"});let{endo:s}=t;if(s&&(!n.is0(f.a)||typeof s.beta!="bigint"||!Array.isArray(s.basises)))throw new Error('invalid endo: expected "beta": bigint and "basises": array');let l=En(n,o);function h(){if(!n.isOdd)throw new Error("compression is not supported: Field does not have .isOdd()")}function x(O,u,a){let{x:d,y:m}=u.toAffine(),I=n.toBytes(d);if(ut(a,"isCompressed"),a){h();let S=!n.isOdd(m);return tt(Bn(S),I)}else return tt(Uint8Array.of(4),I,n.toBytes(m))}function v(O){N(O,void 0,"Point");let{publicKey:u,publicKeyUncompressed:a}=l,d=O.length,m=O[0],I=O.subarray(1);if(d===u&&(m===2||m===3)){let S=n.fromBytes(I);if(!n.isValid(S))throw new Error("bad point: is not on curve, wrong x");let A=L(S),_;try{_=n.sqrt(A)}catch(K){let M=K instanceof Error?": "+K.message:"";throw new Error("bad point: is not on curve, sqrt error"+M)}h();let H=n.isOdd(_);return(m&1)===1!==H&&(_=n.neg(_)),{x:S,y:_}}else if(d===a&&m===4){let S=n.BYTES,A=n.fromBytes(I.subarray(0,S)),_=n.fromBytes(I.subarray(S,S*2));if(!y(A,_))throw new Error("bad point: is not on curve");return{x:A,y:_}}else throw new Error(`bad point: got length ${d}, expected compressed=${u} or uncompressed=${a}`)}let E=t.toBytes||x,w=t.fromBytes||v;function L(O){let u=n.sqr(O),a=n.mul(u,O);return n.add(n.add(a,n.mul(O,f.a)),f.b)}function y(O,u){let a=n.sqr(u),d=L(O);return n.eql(a,d)}if(!y(f.Gx,f.Gy))throw new Error("bad curve params: generator point");let g=n.mul(n.pow(f.a,ne),rr),R=n.mul(n.sqr(f.b),BigInt(27));if(n.is0(n.add(g,R)))throw new Error("bad curve params: a or b");function p(O,u,a=!1){if(!n.isValid(u)||a&&n.is0(u))throw new Error(`bad point coordinate ${O}`);return u}function T(O){if(!(O instanceof b))throw new Error("Weierstrass Point expected")}function D(O){if(!s||!s.basises)throw new Error("no endo");return nr(O,s.basises,o.ORDER)}let V=Ht((O,u)=>{let{X:a,Y:d,Z:m}=O;if(n.eql(m,n.ONE))return{x:a,y:d};let I=O.is0();u==null&&(u=I?n.ONE:n.inv(m));let S=n.mul(a,u),A=n.mul(d,u),_=n.mul(m,u);if(I)return{x:n.ZERO,y:n.ZERO};if(!n.eql(_,n.ONE))throw new Error("invZ was invalid");return{x:S,y:A}}),k=Ht(O=>{if(O.is0()){if(t.allowInfinityPoint&&!n.is0(O.Y))return;throw new Error("bad point: ZERO")}let{x:u,y:a}=O.toAffine();if(!n.isValid(u)||!n.isValid(a))throw new Error("bad point: x or y not field elements");if(!y(u,a))throw new Error("bad point: equation left != right");if(!O.isTorsionFree())throw new Error("bad point: not in prime-order subgroup");return!0});function B(O,u,a,d,m){return a=new b(n.mul(a.X,O),a.Y,a.Z),u=Kt(d,u),a=Kt(m,a),u.add(a)}class b{static BASE=new b(f.Gx,f.Gy,n.ONE);static ZERO=new b(n.ZERO,n.ONE,n.ZERO);static Fp=n;static Fn=o;X;Y;Z;constructor(u,a,d){this.X=p("x",u),this.Y=p("y",a,!0),this.Z=p("z",d),Object.freeze(this)}static CURVE(){return f}static fromAffine(u){let{x:a,y:d}=u||{};if(!u||!n.isValid(a)||!n.isValid(d))throw new Error("invalid affine point");if(u instanceof b)throw new Error("projective point not allowed");return n.is0(a)&&n.is0(d)?b.ZERO:new b(a,d,n.ONE)}static fromBytes(u){let a=b.fromAffine(w(N(u,void 0,"point")));return a.assertValidity(),a}static fromHex(u){return b.fromBytes(rt(u))}get x(){return this.toAffine().x}get y(){return this.toAffine().y}precompute(u=8,a=!0){return Z.createCache(this,u),a||this.multiply(ne),this}assertValidity(){k(this)}hasEvenY(){let{y:u}=this.toAffine();if(!n.isOdd)throw new Error("Field doesn't support isOdd");return!n.isOdd(u)}equals(u){T(u);let{X:a,Y:d,Z:m}=this,{X:I,Y:S,Z:A}=u,_=n.eql(n.mul(a,A),n.mul(I,m)),H=n.eql(n.mul(d,A),n.mul(S,m));return _&&H}negate(){return new b(this.X,n.neg(this.Y),this.Z)}double(){let{a:u,b:a}=f,d=n.mul(a,ne),{X:m,Y:I,Z:S}=this,A=n.ZERO,_=n.ZERO,H=n.ZERO,U=n.mul(m,m),K=n.mul(I,I),M=n.mul(S,S),C=n.mul(m,I);return C=n.add(C,C),H=n.mul(m,S),H=n.add(H,H),A=n.mul(u,H),_=n.mul(d,M),_=n.add(A,_),A=n.sub(K,_),_=n.add(K,_),_=n.mul(A,_),A=n.mul(C,A),H=n.mul(d,H),M=n.mul(u,M),C=n.sub(U,M),C=n.mul(u,C),C=n.add(C,H),H=n.add(U,U),U=n.add(H,U),U=n.add(U,M),U=n.mul(U,C),_=n.add(_,U),M=n.mul(I,S),M=n.add(M,M),U=n.mul(M,C),A=n.sub(A,U),H=n.mul(M,K),H=n.add(H,H),H=n.add(H,H),new b(A,_,H)}add(u){T(u);let{X:a,Y:d,Z:m}=this,{X:I,Y:S,Z:A}=u,_=n.ZERO,H=n.ZERO,U=n.ZERO,K=f.a,M=n.mul(f.b,ne),C=n.mul(a,I),Y=n.mul(d,S),z=n.mul(m,A),F=n.add(a,d),X=n.add(I,S);F=n.mul(F,X),X=n.add(C,Y),F=n.sub(F,X),X=n.add(a,m);let W=n.add(I,A);return X=n.mul(X,W),W=n.add(C,z),X=n.sub(X,W),W=n.add(d,m),_=n.add(S,A),W=n.mul(W,_),_=n.add(Y,z),W=n.sub(W,_),U=n.mul(K,X),_=n.mul(M,z),U=n.add(_,U),_=n.sub(Y,U),U=n.add(Y,U),H=n.mul(_,U),Y=n.add(C,C),Y=n.add(Y,C),z=n.mul(K,z),X=n.mul(M,X),Y=n.add(Y,z),z=n.sub(C,z),z=n.mul(K,z),X=n.add(X,z),C=n.mul(Y,X),H=n.add(H,C),C=n.mul(W,X),_=n.mul(F,_),_=n.sub(_,C),C=n.mul(F,Y),U=n.mul(W,U),U=n.add(U,C),new b(_,H,U)}subtract(u){return this.add(u.negate())}is0(){return this.equals(b.ZERO)}multiply(u){let{endo:a}=t;if(!o.isValidNot0(u))throw new Error("invalid scalar: out of range");let d,m,I=S=>Z.cached(this,S,A=>It(b,A));if(a){let{k1neg:S,k1:A,k2neg:_,k2:H}=D(u),{p:U,f:K}=I(A),{p:M,f:C}=I(H);m=K.add(C),d=B(a.beta,U,M,S,_)}else{let{p:S,f:A}=I(u);d=S,m=A}return It(b,[d,m])[0]}multiplyUnsafe(u){let{endo:a}=t,d=this;if(!o.isValid(u))throw new Error("invalid scalar: out of range");if(u===lt||d.is0())return b.ZERO;if(u===Nt)return d;if(Z.hasCache(this))return this.multiply(u);if(a){let{k1neg:m,k1:I,k2neg:S,k2:A}=D(u),{p1:_,p2:H}=pn(b,d,I,A);return B(a.beta,_,H,m,S)}else return Z.unsafe(d,u)}toAffine(u){return V(this,u)}isTorsionFree(){let{isTorsionFree:u}=t;return i===Nt?!0:u?u(b,this):Z.unsafe(this,c).is0()}clearCofactor(){let{clearCofactor:u}=t;return i===Nt?this:u?u(b,this):this.multiplyUnsafe(i)}isSmallOrder(){return this.multiplyUnsafe(i).is0()}toBytes(u=!0){return ut(u,"isCompressed"),this.assertValidity(),E(b,this,u)}toHex(u=!0){return nt(this.toBytes(u))}toString(){return`<Point ${this.is0()?"ZERO":this.toHex()}>`}}let q=o.BITS,Z=new Ut(b,t.endo?Math.ceil(q/2):q);return b.BASE.precompute(8),b}function Bn(e){return Uint8Array.of(e?2:3)}function En(e,t){return{secretKey:t.BYTES,publicKey:1+e.BYTES,publicKeyUncompressed:1+2*e.BYTES,publicKeyHasPrefix:!0,signature:2*t.BYTES}}function or(e,t={}){let{Fn:r}=e,n=t.randomBytes||ht,o=Object.assign(En(e.Fp,r),{seed:ve(r.ORDER)});function f(E){try{let w=r.fromBytes(E);return r.isValidNot0(w)}catch{return!1}}function i(E,w){let{publicKey:L,publicKeyUncompressed:y}=o;try{let g=E.length;return w===!0&&g!==L||w===!1&&g!==y?!1:!!e.fromBytes(E)}catch{return!1}}function c(E=n(o.seed)){return Se(N(E,o.seed,"seed"),r.ORDER)}function s(E,w=!0){return e.BASE.multiply(r.fromBytes(E)).toBytes(w)}function l(E){let{secretKey:w,publicKey:L,publicKeyUncompressed:y}=o;if(!wt(E)||"_lengths"in r&&r._lengths||w===L)return;let g=N(E,void 0,"key").length;return g===L||g===y}function h(E,w,L=!0){if(l(E)===!0)throw new Error("first arg must be private key");if(l(w)===!1)throw new Error("second arg must be public key");let y=r.fromBytes(E);return e.fromBytes(w).multiply(y).toBytes(L)}let x={isValidSecretKey:f,isValidPublicKey:i,randomSecretKey:c},v=qt(c,s);return Object.freeze({getPublicKey:s,getSharedSecret:h,keygen:v,Point:e,utils:x,lengths:o})}function oe(e,t,r={}){Wt(t),it(r,{},{hmac:"function",lowS:"boolean",randomBytes:"function",bits2int:"function",bits2int_modN:"function"}),r=Object.assign({},r);let n=r.randomBytes||ht,o=r.hmac||((a,d)=>Re(t,a,d)),{Fp:f,Fn:i}=e,{ORDER:c,BITS:s}=i,{keygen:l,getPublicKey:h,getSharedSecret:x,utils:v,lengths:E}=or(e,r),w={prehash:!0,lowS:typeof r.lowS=="boolean"?r.lowS:!0,format:"compact",extraEntropy:!1},L=c*wn<f.ORDER;function y(a){let d=c>>Nt;return a>d}function g(a,d){if(!i.isValidNot0(d))throw new Error(`invalid signature ${a}: out of range 1..Point.Fn.ORDER`);return d}function R(){if(L)throw new Error('"recovered" sig type is not supported for cofactor >2 curves')}function p(a,d){He(d);let m=E.signature,I=d==="compact"?m:d==="recovered"?m+1:void 0;return N(a,I)}class T{r;s;recovery;constructor(d,m,I){if(this.r=g("r",d),this.s=g("s",m),I!=null){if(R(),![0,1,2,3].includes(I))throw new Error("invalid recovery id");this.recovery=I}Object.freeze(this)}static fromBytes(d,m=w.format){p(d,m);let I;if(m==="der"){let{r:H,s:U}=pt.toSig(N(d));return new T(H,U)}m==="recovered"&&(I=d[0],m="compact",d=d.subarray(1));let S=E.signature/2,A=d.subarray(0,S),_=d.subarray(S,S*2);return new T(i.fromBytes(A),i.fromBytes(_),I)}static fromHex(d,m){return this.fromBytes(rt(d),m)}assertRecovery(){let{recovery:d}=this;if(d==null)throw new Error("invalid recovery id: must be present");return d}addRecoveryBit(d){return new T(this.r,this.s,d)}recoverPublicKey(d){let{r:m,s:I}=this,S=this.assertRecovery(),A=S===2||S===3?m+c:m;if(!f.isValid(A))throw new Error("invalid recovery id: sig.r+curve.n != R.x");let _=f.toBytes(A),H=e.fromBytes(tt(Bn((S&1)===0),_)),U=i.inv(A),K=V(N(d,void 0,"msgHash")),M=i.create(-K*U),C=i.create(I*U),Y=e.BASE.multiplyUnsafe(M).add(H.multiplyUnsafe(C));if(Y.is0())throw new Error("invalid recovery: point at infinify");return Y.assertValidity(),Y}hasHighS(){return y(this.s)}toBytes(d=w.format){if(He(d),d==="der")return rt(pt.hexFromSig(this));let{r:m,s:I}=this,S=i.toBytes(m),A=i.toBytes(I);return d==="recovered"?(R(),tt(Uint8Array.of(this.assertRecovery()),S,A)):tt(S,A)}toHex(d){return nt(this.toBytes(d))}}let D=r.bits2int||function(d){if(d.length>8192)throw new Error("input is too large");let m=Ot(d),I=d.length*8-s;return I>0?m>>BigInt(I):m},V=r.bits2int_modN||function(d){return i.create(D(d))},k=Xt(s);function B(a){return gt("num < 2^"+s,a,lt,k),i.toBytes(a)}function b(a,d){return N(a,void 0,"message"),d?N(t(a),void 0,"prehashed message"):a}function q(a,d,m){let{lowS:I,prehash:S,extraEntropy:A}=Oe(m,w);a=b(a,S);let _=V(a),H=i.fromBytes(d);if(!i.isValidNot0(H))throw new Error("invalid private key");let U=[B(H),B(_)];if(A!=null&&A!==!1){let Y=A===!0?n(E.secretKey):A;U.push(N(Y,void 0,"extraEntropy"))}let K=tt(...U),M=_;function C(Y){let z=D(Y);if(!i.isValidNot0(z))return;let F=i.inv(z),X=e.BASE.multiply(z).toAffine(),W=i.create(X.x);if(W===lt)return;let At=i.create(F*i.create(M+W*H));if(At===lt)return;let zt=(X.x===W?0:2)|Number(X.y&Nt),Zt=At;return I&&y(At)&&(Zt=i.neg(At),zt^=1),new T(W,Zt,L?void 0:zt)}return{seed:K,k2sig:C}}function Z(a,d,m={}){let{seed:I,k2sig:S}=q(a,d,m);return tn(t.outputLen,i.BYTES,o)(I,S).toBytes(m.format)}function O(a,d,m,I={}){let{lowS:S,prehash:A,format:_}=Oe(I,w);if(m=N(m,void 0,"publicKey"),d=b(d,A),!wt(a)){let H=a instanceof T?", use sig.toBytes()":"";throw new Error("verify expects Uint8Array signature"+H)}p(a,_);try{let H=T.fromBytes(a,_),U=e.fromBytes(m);if(S&&H.hasHighS())return!1;let{r:K,s:M}=H,C=V(d),Y=i.inv(M),z=i.create(C*Y),F=i.create(K*Y),X=e.BASE.multiplyUnsafe(z).add(U.multiplyUnsafe(F));return X.is0()?!1:i.create(X.x)===K}catch{return!1}}function u(a,d,m={}){let{prehash:I}=Oe(m,w);return d=b(d,I),T.fromBytes(a,"recovered").recoverPublicKey(d).toBytes()}return Object.freeze({keygen:l,getPublicKey:h,getSharedSecret:x,utils:v,lengths:E,Point:e,sign:Z,verify:O,recoverPublicKey:u,Signature:T,hash:t})}var Ue={p:BigInt("0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f"),n:BigInt("0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141"),h:BigInt(1),a:BigInt(0),b:BigInt(7),Gx:BigInt("0x79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798"),Gy:BigInt("0x483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8")},sr={beta:BigInt("0x7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee"),basises:[[BigInt("0x3086d221a7d46bcde86c90e49284eb15"),-BigInt("0xe4437ed6010e88286f547fa90abfe4c3")],[BigInt("0x114ca50f7a8e2f3f657c1108d9d44cfd8"),BigInt("0x3086d221a7d46bcde86c90e49284eb15")]]};var vn=BigInt(2);function ir(e){let t=Ue.p,r=BigInt(3),n=BigInt(6),o=BigInt(11),f=BigInt(22),i=BigInt(23),c=BigInt(44),s=BigInt(88),l=e*e*e%t,h=l*l*e%t,x=G(h,r,t)*h%t,v=G(x,r,t)*h%t,E=G(v,vn,t)*l%t,w=G(E,o,t)*E%t,L=G(w,f,t)*w%t,y=G(L,c,t)*L%t,g=G(y,s,t)*y%t,R=G(g,c,t)*L%t,p=G(R,r,t)*h%t,T=G(p,i,t)*w%t,D=G(T,n,t)*l%t,V=G(D,vn,t);if(!Le.eql(Le.sqr(V),e))throw new Error("Cannot find square root");return V}var Le=Tt(Ue.p,{sqrt:ir}),cr=re(Ue,{Fp:Le,endo:sr}),Sn=oe(cr,Qt);var yt=BigInt(0),P=BigInt(1),qe=BigInt(2),ar=BigInt(8);function dr(e,t,r,n){let o=e.sqr(r),f=e.sqr(n),i=e.add(e.mul(t.a,o),f),c=e.add(e.ONE,e.mul(t.d,e.mul(o,f)));return e.eql(i,c)}function _n(e,t={}){let r=te("edwards",e,t,t.FpFnLE),{Fp:n,Fn:o}=r,f=r.CURVE,{h:i}=f;it(t,{},{uvRatio:"function"});let c=qe<<BigInt(o.BYTES*8)-P,s=y=>n.create(y),l=t.uvRatio||((y,g)=>{try{return{isValid:!0,value:n.sqrt(n.div(y,g))}}catch{return{isValid:!1,value:yt}}});if(!dr(n,f,f.Gx,f.Gy))throw new Error("bad curve params: generator point");function h(y,g,R=!1){let p=R?P:yt;return gt("coordinate "+y,g,p,c),g}function x(y){if(!(y instanceof w))throw new Error("EdwardsPoint expected")}let v=Ht((y,g)=>{let{X:R,Y:p,Z:T}=y,D=y.is0();g==null&&(g=D?ar:n.inv(T));let V=s(R*g),k=s(p*g),B=n.mul(T,g);if(D)return{x:yt,y:P};if(B!==P)throw new Error("invZ was invalid");return{x:V,y:k}}),E=Ht(y=>{let{a:g,d:R}=f;if(y.is0())throw new Error("bad point: ZERO");let{X:p,Y:T,Z:D,T:V}=y,k=s(p*p),B=s(T*T),b=s(D*D),q=s(b*b),Z=s(k*g),O=s(b*s(Z+B)),u=s(q+s(R*s(k*B)));if(O!==u)throw new Error("bad point: equation left != right (1)");let a=s(p*T),d=s(D*V);if(a!==d)throw new Error("bad point: equation left != right (2)");return!0});class w{static BASE=new w(f.Gx,f.Gy,P,s(f.Gx*f.Gy));static ZERO=new w(yt,P,P,yt);static Fp=n;static Fn=o;X;Y;Z;T;constructor(g,R,p,T){this.X=h("x",g),this.Y=h("y",R),this.Z=h("z",p,!0),this.T=h("t",T),Object.freeze(this)}static CURVE(){return f}static fromAffine(g){if(g instanceof w)throw new Error("extended point not allowed");let{x:R,y:p}=g||{};return h("x",R),h("y",p),new w(R,p,P,s(R*p))}static fromBytes(g,R=!1){let p=n.BYTES,{a:T,d:D}=f;g=vt(N(g,p,"point")),ut(R,"zip215");let V=vt(g),k=g[p-1];V[p-1]=k&-129;let B=st(V),b=R?c:n.ORDER;gt("point.y",B,yt,b);let q=s(B*B),Z=s(q-P),O=s(D*q-T),{isValid:u,value:a}=l(Z,O);if(!u)throw new Error("bad point: invalid y coordinate");let d=(a&P)===P,m=(k&128)!==0;if(!R&&a===yt&&m)throw new Error("bad point: x=0 and x_0=1");return m!==d&&(a=s(-a)),w.fromAffine({x:a,y:B})}static fromHex(g,R=!1){return w.fromBytes(rt(g),R)}get x(){return this.toAffine().x}get y(){return this.toAffine().y}precompute(g=8,R=!0){return L.createCache(this,g),R||this.multiply(qe),this}assertValidity(){E(this)}equals(g){x(g);let{X:R,Y:p,Z:T}=this,{X:D,Y:V,Z:k}=g,B=s(R*k),b=s(D*T),q=s(p*k),Z=s(V*T);return B===b&&q===Z}is0(){return this.equals(w.ZERO)}negate(){return new w(s(-this.X),this.Y,this.Z,s(-this.T))}double(){let{a:g}=f,{X:R,Y:p,Z:T}=this,D=s(R*R),V=s(p*p),k=s(qe*s(T*T)),B=s(g*D),b=R+p,q=s(s(b*b)-D-V),Z=B+V,O=Z-k,u=B-V,a=s(q*O),d=s(Z*u),m=s(q*u),I=s(O*Z);return new w(a,d,I,m)}add(g){x(g);let{a:R,d:p}=f,{X:T,Y:D,Z:V,T:k}=this,{X:B,Y:b,Z:q,T:Z}=g,O=s(T*B),u=s(D*b),a=s(k*p*Z),d=s(V*q),m=s((T+D)*(B+b)-O-u),I=d-a,S=d+a,A=s(u-R*O),_=s(m*I),H=s(S*A),U=s(m*A),K=s(I*S);return new w(_,H,K,U)}subtract(g){return this.add(g.negate())}multiply(g){if(!o.isValidNot0(g))throw new Error("invalid scalar: expected 1 <= sc < curve.n");let{p:R,f:p}=L.cached(this,g,T=>It(w,T));return It(w,[R,p])[0]}multiplyUnsafe(g,R=w.ZERO){if(!o.isValid(g))throw new Error("invalid scalar: expected 0 <= sc < curve.n");return g===yt?w.ZERO:this.is0()||g===P?this:L.unsafe(this,g,p=>It(w,p),R)}isSmallOrder(){return this.multiplyUnsafe(i).is0()}isTorsionFree(){return L.unsafe(this,f.n).is0()}toAffine(g){return v(this,g)}clearCofactor(){return i===P?this:this.multiplyUnsafe(i)}toBytes(){let{x:g,y:R}=this.toAffine(),p=n.toBytes(R);return p[p.length-1]|=g&P?128:0,p}toHex(){return nt(this.toBytes())}toString(){return`<Point ${this.is0()?"ZERO":this.toHex()}>`}}let L=new Ut(w,o.BITS);return w.BASE.precompute(8),w}function In(e,t,r={}){if(typeof t!="function")throw new Error('"hash" function param is required');it(r,{},{adjustScalarBytes:"function",randomBytes:"function",domain:"function",prehash:"function",mapToCurve:"function"});let{prehash:n}=r,{BASE:o,Fp:f,Fn:i}=e,c=r.randomBytes||ht,s=r.adjustScalarBytes||(B=>B),l=r.domain||((B,b,q)=>{if(ut(q,"phflag"),b.length||q)throw new Error("Contexts/pre-hash are not supported");return B});function h(B){return i.create(st(B))}function x(B){let b=p.secretKey;N(B,p.secretKey,"secretKey");let q=N(t(B),2*b,"hashedSecretKey"),Z=s(q.slice(0,b)),O=q.slice(b,2*b),u=h(Z);return{head:Z,prefix:O,scalar:u}}function v(B){let{head:b,prefix:q,scalar:Z}=x(B),O=o.multiply(Z),u=O.toBytes();return{head:b,prefix:q,scalar:Z,point:O,pointBytes:u}}function E(B){return v(B).pointBytes}function w(B=Uint8Array.of(),...b){let q=tt(...b);return h(t(l(q,N(B,void 0,"context"),!!n)))}function L(B,b,q={}){B=N(B,void 0,"message"),n&&(B=n(B));let{prefix:Z,scalar:O,pointBytes:u}=v(b),a=w(q.context,Z,B),d=o.multiply(a).toBytes(),m=w(q.context,d,u,B),I=i.create(a+m*O);if(!i.isValid(I))throw new Error("sign failed: invalid s");let S=tt(d,i.toBytes(I));return N(S,p.signature,"result")}let y={zip215:!0};function g(B,b,q,Z=y){let{context:O,zip215:u}=Z,a=p.signature;B=N(B,a,"signature"),b=N(b,void 0,"message"),q=N(q,p.publicKey,"publicKey"),u!==void 0&&ut(u,"zip215"),n&&(b=n(b));let d=a/2,m=B.subarray(0,d),I=st(B.subarray(d,a)),S,A,_;try{S=e.fromBytes(q,u),A=e.fromBytes(m,u),_=o.multiplyUnsafe(I)}catch{return!1}if(!u&&S.isSmallOrder())return!1;let H=w(O,A.toBytes(),S.toBytes(),b);return A.add(S.multiplyUnsafe(H)).subtract(_).clearCofactor().is0()}let R=f.BYTES,p={secretKey:R,publicKey:R,signature:2*R,seed:R};function T(B=c(p.seed)){return N(B,p.seed,"seed")}function D(B){return wt(B)&&B.length===i.BYTES}function V(B,b){try{return!!e.fromBytes(B,b)}catch{return!1}}let k={getExtendedPublicKey:v,randomSecretKey:T,isValidSecretKey:D,isValidPublicKey:V,toMontgomery(B){let{y:b}=e.fromBytes(B),q=p.publicKey,Z=q===32;if(!Z&&q!==57)throw new Error("only defined for 25519 and 448");let O=Z?f.div(P+b,P-b):f.div(b-P,b+P);return f.toBytes(O)},toMontgomerySecret(B){let b=p.secretKey;N(B,b);let q=t(B.subarray(0,b));return s(q).subarray(0,b)}};return Object.freeze({keygen:qt(T,E),getPublicKey:E,sign:L,verify:g,utils:k,Point:e,lengths:p})}var jt=BigInt(0),Dt=BigInt(1),fe=BigInt(2);function ur(e){return it(e,{adjustScalarBytes:"function",powPminus2:"function"}),Object.freeze({...e})}function An(e){let t=ur(e),{P:r,type:n,adjustScalarBytes:o,powPminus2:f,randomBytes:i}=t,c=n==="x25519";if(!c&&n!=="x448")throw new Error("invalid type");let s=i||ht,l=c?255:448,h=c?32:56,x=BigInt(c?9:5),v=BigInt(c?121665:39081),E=c?fe**BigInt(254):fe**BigInt(447),w=c?BigInt(8)*fe**BigInt(251)-Dt:BigInt(4)*fe**BigInt(445)-Dt,L=E+w+Dt,y=a=>j(a,r),g=R(x);function R(a){return Yt(y(a),h)}function p(a){let d=vt(N(a,h,"uCoordinate"));return c&&(d[31]&=127),y(st(d))}function T(a){return st(o(vt(N(a,h,"scalar"))))}function D(a,d){let m=q(p(d),T(a));if(m===jt)throw new Error("invalid private or public key received");return R(m)}function V(a){return D(a,g)}let k=V,B=D;function b(a,d,m){let I=y(a*(d-m));return d=y(d-I),m=y(m+I),{x_2:d,x_3:m}}function q(a,d){gt("u",a,jt,r),gt("scalar",d,E,L);let m=d,I=a,S=Dt,A=jt,_=a,H=Dt,U=jt;for(let M=BigInt(l-1);M>=jt;M--){let C=m>>M&Dt;U^=C,{x_2:S,x_3:_}=b(U,S,_),{x_2:A,x_3:H}=b(U,A,H),U=C;let Y=S+A,z=y(Y*Y),F=S-A,X=y(F*F),W=z-X,At=_+H,zt=_-H,Zt=y(zt*Y),Ne=y(At*F),De=Zt+Ne,Ze=Zt-Ne;_=y(De*De),H=y(I*y(Ze*Ze)),S=y(z*X),A=y(W*(z+y(v*W)))}({x_2:S,x_3:_}=b(U,S,_)),{x_2:A,x_3:H}=b(U,A,H);let K=f(A);return y(S*K)}let Z={secretKey:h,publicKey:h,seed:h},O=(a=s(h))=>(N(a,Z.seed,"seed"),a),u={randomSecretKey:O};return Object.freeze({keygen:qt(O,k),getSharedSecret:B,getPublicKey:k,scalarMult:D,scalarMultBase:V,utils:u,GuBytes:g.slice(),lengths:Z})}var lr=BigInt(1),Rn=BigInt(2),hr=BigInt(3),br=BigInt(5),xr=BigInt(8),se=BigInt("0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffed"),mr={p:se,n:BigInt("0x1000000000000000000000000000000014def9dea2f79cd65812631a5cf5d3ed"),h:xr,a:BigInt("0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffec"),d:BigInt("0x52036cee2b6ffe738cc740797779e89800700a4d4141d8ab75eb4dca135978a3"),Gx:BigInt("0x216936d3cd6e53fec0a4e231fdd6dc5c692cc7609525a7b2c9562d608f25d51a"),Gy:BigInt("0x6666666666666666666666666666666666666666666666666666666666666658")};function Hn(e){let t=BigInt(10),r=BigInt(20),n=BigInt(40),o=BigInt(80),f=se,c=e*e%f*e%f,s=G(c,Rn,f)*c%f,l=G(s,lr,f)*e%f,h=G(l,br,f)*l%f,x=G(h,t,f)*h%f,v=G(x,r,f)*x%f,E=G(v,n,f)*v%f,w=G(E,o,f)*E%f,L=G(w,o,f)*E%f,y=G(L,t,f)*h%f;return{pow_p_5_8:G(y,Rn,f)*e%f,b2:c}}function Tn(e){return e[0]&=248,e[31]&=127,e[31]|=64,e}var On=BigInt("19681161376707505956807079304988542015446066515923890162744021073123829784752");function gr(e,t){let r=se,n=j(t*t*t,r),o=j(n*n*t,r),f=Hn(e*o).pow_p_5_8,i=j(e*n*f,r),c=j(t*i*i,r),s=i,l=j(i*On,r),h=c===e,x=c===j(-e,r),v=c===j(-e*On,r);return h&&(i=s),(x||v)&&(i=l),un(i,r)&&(i=j(-i,r)),{isValid:h||x,value:i}}var pr=_n(mr,{uvRatio:gr});function yr(e){return In(pr,me,Object.assign({adjustScalarBytes:Tn},e))}var Ln=yr({});var Un=(()=>{let e=se;return An({P:e,type:"x25519",powPminus2:t=>{let{pow_p_5_8:r,b2:n}=Hn(t);return j(G(r,hr,e)*n,e)},adjustScalarBytes:Tn})})();var wr={p:BigInt("0xffffffff00000001000000000000000000000000ffffffffffffffffffffffff"),n:BigInt("0xffffffff00000000ffffffffffffffffbce6faada7179e84f3b9cac2fc632551"),h:BigInt(1),a:BigInt("0xffffffff00000001000000000000000000000000fffffffffffffffffffffffc"),b:BigInt("0x5ac635d8aa3a93e7b3ebbd55769886bc651d06b0cc53b0f63bce3c3e27d2604b"),Gx:BigInt("0x6b17d1f2e12c4247f8bce6e563a440f277037d812deb33a0f4a13945d898c296"),Gy:BigInt("0x4fe342e2fe1a7f9b8ee7eb4a7c0f9e162bce33576b315ececbb6406837bf51f5")};var Br=re(wr),qn=oe(Br,Qt);return Mn(Er);})();
/*! Bundled license information:

@noble/hashes/utils.js:
  (*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) *)

@noble/curves/utils.js:
@noble/curves/abstract/modular.js:
@noble/curves/abstract/curve.js:
@noble/curves/abstract/weierstrass.js:
@noble/curves/secp256k1.js:
@noble/curves/abstract/edwards.js:
@noble/curves/abstract/montgomery.js:
@noble/curves/ed25519.js:
@noble/curves/nist.js:
  (*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) *)
*/
/*! Bundled license information:

@noble/hashes/utils.js:
  (*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) *)

@noble/curves/utils.js:
@noble/curves/abstract/modular.js:
@noble/curves/abstract/curve.js:
@noble/curves/abstract/weierstrass.js:
@noble/curves/secp256k1.js:
@noble/curves/abstract/edwards.js:
@noble/curves/ed25519.js:
@noble/curves/nist.js:
  (*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) *)
*/


// UTILS

var _Crypto_toHex = _Crypto_noble.bytesToHex;
var _Crypto_fromHex = _Crypto_noble.hexToBytes;


// DER CODEC (for ECDSA signatures: secp256k1, P-256)

function _Crypto_bigintToBytes(n, len)
{
	var hex = n.toString(16);
	if (hex.length % 2) { hex = '0' + hex; }
	while (hex.length < len * 2) { hex = '00' + hex; }
	return _Crypto_fromHex(hex);
}

function _Crypto_bytesToBigint(bytes)
{
	return BigInt('0x' + _Crypto_toHex(bytes));
}

function _Crypto_compactToDer(compactHex, byteLen)
{
	var bytes = _Crypto_fromHex(compactHex);
	var r = bytes.slice(0, byteLen);
	var s = bytes.slice(byteLen);
	function encodeInt(b) {
		// Strip leading zeros, then add back if high bit set
		var i = 0;
		while (i < b.length - 1 && b[i] === 0) { i++; }
		b = b.slice(i);
		if (b[0] & 0x80) {
			var padded = new Uint8Array(b.length + 1);
			padded[0] = 0;
			padded.set(b, 1);
			b = padded;
		}
		return b;
	}
	var rEnc = encodeInt(r);
	var sEnc = encodeInt(s);
	var totalLen = 2 + rEnc.length + 2 + sEnc.length;
	var der = new Uint8Array(2 + totalLen);
	var pos = 0;
	der[pos++] = 0x30;
	der[pos++] = totalLen;
	der[pos++] = 0x02;
	der[pos++] = rEnc.length;
	der.set(rEnc, pos); pos += rEnc.length;
	der[pos++] = 0x02;
	der[pos++] = sEnc.length;
	der.set(sEnc, pos);
	return _Crypto_toHex(der);
}

function _Crypto_derToCompact(derHex, byteLen)
{
	var der = _Crypto_fromHex(derHex);
	if (der[0] !== 0x30) { return null; }
	var pos = 2;
	if (der[pos] !== 0x02) { return null; }
	var rLen = der[pos + 1]; pos += 2;
	var rBytes = der.slice(pos, pos + rLen); pos += rLen;
	if (der[pos] !== 0x02) { return null; }
	var sLen = der[pos + 1]; pos += 2;
	var sBytes = der.slice(pos, pos + sLen);
	// Remove leading zero padding
	while (rBytes.length > byteLen) { rBytes = rBytes.slice(1); }
	while (sBytes.length > byteLen) { sBytes = sBytes.slice(1); }
	// Pad to fixed width
	var r = new Uint8Array(byteLen);
	var s = new Uint8Array(byteLen);
	r.set(rBytes, byteLen - rBytes.length);
	s.set(sBytes, byteLen - sBytes.length);
	var compact = new Uint8Array(byteLen * 2);
	compact.set(r, 0);
	compact.set(s, byteLen);
	return _Crypto_toHex(compact);
}


// SECP256K1

function _Crypto_secp256k1PrivateKeyFromHex(hex)
{
	try {
		_Crypto_noble.secp256k1.getPublicKey(_Crypto_fromHex(hex));
		return __Maybe_Just(hex);
	} catch (e) {
		return __Maybe_Nothing;
	}
}

function _Crypto_secp256k1PrivateKeyToHex(key)
{
	return key;
}

function _Crypto_secp256k1PublicKeyFromHex(hex)
{
	try {
		_Crypto_noble.secp256k1.Point.fromHex(hex);
		return __Maybe_Just(hex);
	} catch (e) {
		return __Maybe_Nothing;
	}
}

function _Crypto_secp256k1PublicKeyToHex(key)
{
	return key;
}

function _Crypto_secp256k1SignatureFromCompactHex(hex)
{
	try {
		var bytes = _Crypto_fromHex(hex);
		if (bytes.length !== 64) { return __Maybe_Nothing; }
		_Crypto_noble.secp256k1.Signature.fromHex(hex);
		return __Maybe_Just(hex);
	} catch (e) {
		return __Maybe_Nothing;
	}
}

function _Crypto_secp256k1SignatureFromDerHex(hex)
{
	try {
		var compact = _Crypto_derToCompact(hex, 32);
		if (!compact) { return __Maybe_Nothing; }
		_Crypto_noble.secp256k1.Signature.fromHex(compact);
		return __Maybe_Just(compact);
	} catch (e) {
		return __Maybe_Nothing;
	}
}

function _Crypto_secp256k1SignatureToCompactHex(sig)
{
	return sig;
}

function _Crypto_secp256k1SignatureToDerHex(compactHex)
{
	return _Crypto_compactToDer(compactHex, 32);
}

function _Crypto_secp256k1GetPublicKey(privKey)
{
	return _Crypto_toHex(_Crypto_noble.secp256k1.getPublicKey(_Crypto_fromHex(privKey)));
}

var _Crypto_secp256k1Sign = F2(function(msgHash, privKey)
{
	var sig = _Crypto_noble.secp256k1.sign(_Crypto_fromHex(msgHash), _Crypto_fromHex(privKey));
	return _Crypto_toHex(sig);
});

var _Crypto_secp256k1Verify = F3(function(sig, msgHash, pubKey)
{
	try {
		return _Crypto_noble.secp256k1.verify(
			_Crypto_fromHex(sig),
			_Crypto_fromHex(msgHash),
			_Crypto_fromHex(pubKey)
		);
	} catch (e) {
		return false;
	}
});

var _Crypto_secp256k1GetSharedSecret = F2(function(privKey, pubKey)
{
	return _Crypto_toHex(_Crypto_noble.secp256k1.getSharedSecret(_Crypto_fromHex(privKey), _Crypto_fromHex(pubKey)));
});


// ED25519

function _Crypto_ed25519PrivateKeyFromHex(hex)
{
	try {
		_Crypto_noble.ed25519.getPublicKey(_Crypto_fromHex(hex));
		return __Maybe_Just(hex);
	} catch (e) {
		return __Maybe_Nothing;
	}
}

function _Crypto_ed25519PrivateKeyToHex(key)
{
	return key;
}

function _Crypto_ed25519PublicKeyFromHex(hex)
{
	try {
		_Crypto_noble.ed25519.Point.fromHex(hex);
		return __Maybe_Just(hex);
	} catch (e) {
		return __Maybe_Nothing;
	}
}

function _Crypto_ed25519PublicKeyToHex(key)
{
	return key;
}

function _Crypto_ed25519SignatureFromHex(hex)
{
	try {
		var bytes = _Crypto_fromHex(hex);
		if (bytes.length !== 64) { return __Maybe_Nothing; }
		return __Maybe_Just(hex);
	} catch (e) {
		return __Maybe_Nothing;
	}
}

function _Crypto_ed25519SignatureToHex(sig)
{
	return sig;
}

function _Crypto_ed25519GetPublicKey(privKey)
{
	return _Crypto_toHex(_Crypto_noble.ed25519.getPublicKey(_Crypto_fromHex(privKey)));
}

var _Crypto_ed25519Sign = F2(function(msg, privKey)
{
	return _Crypto_toHex(_Crypto_noble.ed25519.sign(_Crypto_fromHex(msg), _Crypto_fromHex(privKey)));
});

var _Crypto_ed25519Verify = F3(function(sig, msg, pubKey)
{
	try {
		return _Crypto_noble.ed25519.verify(
			_Crypto_fromHex(sig),
			_Crypto_fromHex(msg),
			_Crypto_fromHex(pubKey)
		);
	} catch (e) {
		return false;
	}
});


// X25519 (Diffie-Hellman)

function _Crypto_x25519PrivateKeyFromHex(hex)
{
	try {
		var bytes = _Crypto_fromHex(hex);
		if (bytes.length !== 32) { return __Maybe_Nothing; }
		_Crypto_noble.x25519.getPublicKey(bytes);
		return __Maybe_Just(hex);
	} catch (e) {
		return __Maybe_Nothing;
	}
}

function _Crypto_x25519PrivateKeyToHex(key)
{
	return key;
}

function _Crypto_x25519PublicKeyFromHex(hex)
{
	try {
		var bytes = _Crypto_fromHex(hex);
		if (bytes.length !== 32) { return __Maybe_Nothing; }
		return __Maybe_Just(hex);
	} catch (e) {
		return __Maybe_Nothing;
	}
}

function _Crypto_x25519PublicKeyToHex(key)
{
	return key;
}

function _Crypto_x25519GetPublicKey(privKey)
{
	return _Crypto_toHex(_Crypto_noble.x25519.getPublicKey(_Crypto_fromHex(privKey)));
}

var _Crypto_x25519GetSharedSecret = F2(function(privKey, pubKey)
{
	return _Crypto_toHex(_Crypto_noble.x25519.getSharedSecret(_Crypto_fromHex(privKey), _Crypto_fromHex(pubKey)));
});


// P-256 (secp256r1)

function _Crypto_p256PrivateKeyFromHex(hex)
{
	try {
		_Crypto_noble.p256.getPublicKey(_Crypto_fromHex(hex));
		return __Maybe_Just(hex);
	} catch (e) {
		return __Maybe_Nothing;
	}
}

function _Crypto_p256PrivateKeyToHex(key)
{
	return key;
}

function _Crypto_p256PublicKeyFromHex(hex)
{
	try {
		_Crypto_noble.p256.Point.fromHex(hex);
		return __Maybe_Just(hex);
	} catch (e) {
		return __Maybe_Nothing;
	}
}

function _Crypto_p256PublicKeyToHex(key)
{
	return key;
}

function _Crypto_p256SignatureFromCompactHex(hex)
{
	try {
		var bytes = _Crypto_fromHex(hex);
		if (bytes.length !== 64) { return __Maybe_Nothing; }
		_Crypto_noble.p256.Signature.fromHex(hex);
		return __Maybe_Just(hex);
	} catch (e) {
		return __Maybe_Nothing;
	}
}

function _Crypto_p256SignatureFromDerHex(hex)
{
	try {
		var compact = _Crypto_derToCompact(hex, 32);
		if (!compact) { return __Maybe_Nothing; }
		_Crypto_noble.p256.Signature.fromHex(compact);
		return __Maybe_Just(compact);
	} catch (e) {
		return __Maybe_Nothing;
	}
}

function _Crypto_p256SignatureToCompactHex(sig)
{
	return sig;
}

function _Crypto_p256SignatureToDerHex(compactHex)
{
	return _Crypto_compactToDer(compactHex, 32);
}

function _Crypto_p256GetPublicKey(privKey)
{
	return _Crypto_toHex(_Crypto_noble.p256.getPublicKey(_Crypto_fromHex(privKey)));
}

var _Crypto_p256Sign = F2(function(msgHash, privKey)
{
	var sig = _Crypto_noble.p256.sign(_Crypto_fromHex(msgHash), _Crypto_fromHex(privKey));
	return _Crypto_toHex(sig);
});

var _Crypto_p256Verify = F3(function(sig, msgHash, pubKey)
{
	try {
		return _Crypto_noble.p256.verify(
			_Crypto_fromHex(sig),
			_Crypto_fromHex(msgHash),
			_Crypto_fromHex(pubKey)
		);
	} catch (e) {
		return false;
	}
});

var _Crypto_p256GetSharedSecret = F2(function(privKey, pubKey)
{
	return _Crypto_toHex(_Crypto_noble.p256.getSharedSecret(_Crypto_fromHex(privKey), _Crypto_fromHex(pubKey)));
});


// NOBLE/CIPHERS BUNDLE (https://github.com/paulmillr/noble-ciphers, MIT License)
// Embedded: @noble/ciphers - AES-GCM, ChaCha20-Poly1305, XChaCha20-Poly1305

var _Crypto_ciphers =(()=>{var _t=Object.defineProperty;var de=Object.getOwnPropertyDescriptor;var we=Object.getOwnPropertyNames;var be=Object.prototype.hasOwnProperty;var xe=(e,t)=>{for(var n in t)_t(e,n,{get:t[n],enumerable:!0})},me=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let o of we(t))!be.call(e,o)&&o!==n&&_t(e,o,{get:()=>t[o],enumerable:!(r=de(t,o))||r.enumerable});return e};var Le=e=>me(_t({},"_"+"_esModule",{value:!0}),e);var Ge={};xe(Ge,{cbc:()=>ne,cfb:()=>re,chacha20poly1305:()=>pe,ctr:()=>Gt,ecb:()=>ee,gcm:()=>oe,managedNonce:()=>Vt,randomBytes:()=>xt,siv:()=>se,xchacha20poly1305:()=>ye});function Ee(e){return e instanceof Uint8Array||ArrayBuffer.isView(e)&&e.constructor.name==="Uint8Array"}function yt(e){if(typeof e!="boolean")throw new Error(`boolean expected, not ${e}`)}function ht(e){if(!Number.isSafeInteger(e)||e<0)throw new Error("positive integer expected, got "+e)}function E(e,t,n=""){let r=Ee(e),o=e?.length,s=t!==void 0;if(!r||s&&o!==t){let i=n&&`"${n}" `,c=s?` of length ${t}`:"",f=r?`length=${o}`:`type=${typeof e}`;throw new Error(i+"expected Uint8Array"+c+", got "+f)}return e}function et(e,t=!0){if(e.destroyed)throw new Error("Hash instance has been destroyed");if(t&&e.finished)throw new Error("Hash#digest() has already been called")}function gt(e,t){E(e,void 0,"output");let n=t.outputLen;if(e.length<n)throw new Error("digestInto() expects output buffer of length at least "+n)}function dt(e){return new Uint8Array(e.buffer,e.byteOffset,e.byteLength)}function A(e){return new Uint32Array(e.buffer,e.byteOffset,Math.floor(e.byteLength/4))}function B(...e){for(let t=0;t<e.length;t++)e[t].fill(0)}function at(e){return new DataView(e.buffer,e.byteOffset,e.byteLength)}var Ue=new Uint8Array(new Uint32Array([287454020]).buffer)[0]===68;function vt(e,t){return e.buffer===t.buffer&&e.byteOffset<t.byteOffset+t.byteLength&&t.byteOffset<e.byteOffset+e.byteLength}function pt(e,t){if(vt(e,t)&&e.byteOffset<t.byteOffset)throw new Error("complex overlap of input and output is not supported")}function Ct(...e){let t=0;for(let r=0;r<e.length;r++){let o=e[r];E(o),t+=o.length}let n=new Uint8Array(t);for(let r=0,o=0;r<e.length;r++){let s=e[r];n.set(s,o),o+=s.length}return n}function jt(e,t){if(t==null||typeof t!="object")throw new Error("options must be defined");return Object.assign(e,t)}function wt(e,t){if(e.length!==t.length)return!1;let n=0;for(let r=0;r<e.length;r++)n|=e[r]^t[r];return n===0}var D=(e,t)=>{function n(r,...o){if(E(r,void 0,"key"),!Ue)throw new Error("Non little-endian hardware is not yet supported");if(e.nonceLength!==void 0){let h=o[0];E(h,e.varSizeNonce?void 0:e.nonceLength,"nonce")}let s=e.tagLength;s&&o[1]!==void 0&&E(o[1],void 0,"AAD");let i=t(r,...o),c=(h,a)=>{if(a!==void 0){if(h!==2)throw new Error("cipher output not supported");E(a,void 0,"output")}},f=!1;return{encrypt(h,a){if(f)throw new Error("cannot encrypt() twice with same key + nonce");return f=!0,E(h),c(i.encrypt.length,a),i.encrypt(h,a)},decrypt(h,a){if(E(h),s&&h.length<s)throw new Error('"ciphertext" expected length bigger than tagLength='+s);return c(i.decrypt.length,a),i.decrypt(h,a)}}}return Object.assign(n,e),n};function Q(e,t,n=!0){if(t===void 0)return new Uint8Array(e);if(t.length!==e)throw new Error('"output" expected Uint8Array of length '+e+", got: "+t.length);if(n&&!Z(t))throw new Error("invalid output, must be aligned");return t}function bt(e,t,n){yt(n);let r=new Uint8Array(16),o=at(r);return o.setBigUint64(0,BigInt(t),n),o.setBigUint64(8,BigInt(e),n),r}function Z(e){return e.byteOffset%4===0}function z(e){return Uint8Array.from(e)}function xt(e=32){let t=typeof globalThis=="object"?globalThis.crypto:null;if(typeof t?.getRandomValues!="function")throw new Error("crypto.getRandomValues must be defined");return t.getRandomValues(new Uint8Array(e))}function Vt(e,t=xt){let{nonceLength:n}=e;ht(n);let r=(o,s)=>{let i=Ct(o,s);return s.fill(0),i};return((o,...s)=>({encrypt(i){E(i);let c=t(n),f=e(o,c,...s).encrypt(i);return f instanceof Promise?f.then(l=>r(c,l)):r(c,f)},decrypt(i){E(i);let c=i.subarray(0,n),f=i.subarray(n);return e(o,c,...s).decrypt(f)}}))}var tt=16,Tt=new Uint8Array(16),G=A(Tt),Ae=225,Be=(e,t,n,r)=>{let o=r&1;return{s3:n<<31|r>>>1,s2:t<<31|n>>>1,s1:e<<31|t>>>1,s0:e>>>1^Ae<<24&-(o&1)}},F=e=>(e>>>0&255)<<24|(e>>>8&255)<<16|(e>>>16&255)<<8|e>>>24&255|0;function _e(e){e.reverse();let t=e[15]&1,n=0;for(let r=0;r<e.length;r++){let o=e[r];e[r]=o>>>1|n,n=(o&1)<<7}return e[0]^=-t&225,e}var ve=e=>e>64*1024?8:e>1024?4:2,mt=class{blockLen=tt;outputLen=tt;s0=0;s1=0;s2=0;s3=0;finished=!1;t;W;windowSize;constructor(t,n){E(t,16,"key"),t=z(t);let r=at(t),o=r.getUint32(0,!1),s=r.getUint32(4,!1),i=r.getUint32(8,!1),c=r.getUint32(12,!1),f=[];for(let u=0;u<128;u++)f.push({s0:F(o),s1:F(s),s2:F(i),s3:F(c)}),{s0:o,s1:s,s2:i,s3:c}=Be(o,s,i,c);let l=ve(n||1024);if(![1,2,4,8].includes(l))throw new Error("ghash: invalid window size, expected 2, 4 or 8");this.W=l;let a=128/l,p=this.windowSize=2**l,g=[];for(let u=0;u<a;u++)for(let y=0;y<p;y++){let d=0,w=0,b=0,U=0;for(let L=0;L<l;L++){if(!(y>>>l-L-1&1))continue;let{s0:v,s1:j,s2:V,s3:_}=f[l*u+L];d^=v,w^=j,b^=V,U^=_}g.push({s0:d,s1:w,s2:b,s3:U})}this.t=g}_updateBlock(t,n,r,o){t^=this.s0,n^=this.s1,r^=this.s2,o^=this.s3;let{W:s,t:i,windowSize:c}=this,f=0,l=0,h=0,a=0,p=(1<<s)-1,g=0;for(let u of[t,n,r,o])for(let y=0;y<4;y++){let d=u>>>8*y&255;for(let w=8/s-1;w>=0;w--){let b=d>>>s*w&p,{s0:U,s1:L,s2:C,s3:v}=i[g*c+b];f^=U,l^=L,h^=C,a^=v,g+=1}}this.s0=f,this.s1=l,this.s2=h,this.s3=a}update(t){et(this),E(t),t=z(t);let n=A(t),r=Math.floor(t.length/tt),o=t.length%tt;for(let s=0;s<r;s++)this._updateBlock(n[s*4+0],n[s*4+1],n[s*4+2],n[s*4+3]);return o&&(Tt.set(t.subarray(r*tt)),this._updateBlock(G[0],G[1],G[2],G[3]),B(G)),this}destroy(){let{t}=this;for(let n of t)n.s0=0,n.s1=0,n.s2=0,n.s3=0}digestInto(t){et(this),gt(t,this),this.finished=!0;let{s0:n,s1:r,s2:o,s3:s}=this,i=A(t);return i[0]=n,i[1]=r,i[2]=o,i[3]=s,t}digest(){let t=new Uint8Array(tt);return this.digestInto(t),this.destroy(),t}},St=class extends mt{constructor(t,n){E(t);let r=_e(z(t));super(r,n),B(r)}update(t){et(this),E(t),t=z(t);let n=A(t),r=t.length%tt,o=Math.floor(t.length/tt);for(let s=0;s<o;s++)this._updateBlock(F(n[s*4+3]),F(n[s*4+2]),F(n[s*4+1]),F(n[s*4+0]));return r&&(Tt.set(t.subarray(o*tt)),this._updateBlock(F(G[3]),F(G[2]),F(G[1]),F(G[0])),B(G)),this}digestInto(t){et(this),gt(t,this),this.finished=!0;let{s0:n,s1:r,s2:o,s3:s}=this,i=A(t);return i[0]=n,i[1]=r,i[2]=o,i[3]=s,t.reverse()}};function Ht(e){let t=(r,o)=>e(o,r.length).update(r).digest(),n=e(new Uint8Array(16),0);return t.outputLen=n.outputLen,t.blockLen=n.blockLen,t.create=(r,o)=>e(r,o),t}var It=Ht((e,t)=>new mt(e,t)),Ce=Ht((e,t)=>new St(e,t));var R=16,Nt=4,Lt=new Uint8Array(R);var Se=283;function $t(e){if(![16,24,32].includes(e.length))throw new Error('"aes key" expected Uint8Array of length 16/24/32, got length='+e.length)}function Mt(e){return e<<1^Se&-(e>>7)}function ut(e,t){let n=0;for(;t>0;t>>=1)n^=e&-(t&1),e=Mt(e);return n}var Te=(e,t,n=1)=>{if(!Number.isSafeInteger(n))throw new Error("incBytes: wrong carry "+n);E(e);for(let r=0;r<e.length;r++){let o=t?r:e.length-1-r;n=n+(e[o]&255)|0,e[o]=n&255,n>>>=8}},kt=(()=>{let e=new Uint8Array(256);for(let n=0,r=1;n<256;n++,r^=Mt(r))e[n]=r;let t=new Uint8Array(256);t[0]=99;for(let n=0;n<255;n++){let r=e[255-n];r|=r<<8,t[e[n]]=(r^r>>4^r>>5^r>>6^r>>7^99)&255}return B(e),t})(),Ie=kt.map((e,t)=>kt.indexOf(t)),Ke=e=>e<<24|e>>>8,Kt=e=>e<<8|e>>>24;function Zt(e,t){if(e.length!==256)throw new Error("Wrong sbox length");let n=new Uint32Array(256).map((l,h)=>t(e[h])),r=n.map(Kt),o=r.map(Kt),s=o.map(Kt),i=new Uint32Array(256*256),c=new Uint32Array(256*256),f=new Uint16Array(256*256);for(let l=0;l<256;l++)for(let h=0;h<256;h++){let a=l*256+h;i[a]=n[l]^r[h],c[a]=o[l]^s[h],f[a]=e[l]<<8|e[h]}return{sbox:e,sbox2:f,T0:n,T1:r,T2:o,T3:s,T01:i,T23:c}}var Pt=Zt(kt,e=>ut(e,3)<<24|e<<16|e<<8|ut(e,2)),Ft=Zt(Ie,e=>ut(e,11)<<24|ut(e,13)<<16|ut(e,9)<<8|ut(e,14)),Oe=(()=>{let e=new Uint8Array(16);for(let t=0,n=1;t<16;t++,n=Mt(n))e[t]=n;return e})();function rt(e){E(e);let t=e.length;$t(e);let{sbox2:n}=Pt,r=[];Z(e)||r.push(e=z(e));let o=A(e),s=o.length,i=f=>J(n,f,f,f,f),c=new Uint32Array(t+28);c.set(o);for(let f=s;f<c.length;f++){let l=c[f-1];f%s===0?l=i(Ke(l))^Oe[f/s-1]:s>6&&f%s===4&&(l=i(l)),c[f]=c[f-s]^l}return B(...r),c}function Yt(e){let t=rt(e),n=t.slice(),r=t.length,{sbox2:o}=Pt,{T0:s,T1:i,T2:c,T3:f}=Ft;for(let l=0;l<r;l+=4)for(let h=0;h<4;h++)n[l+h]=t[r-l-4+h];B(t);for(let l=4;l<r-4;l++){let h=n[l],a=J(o,h,h,h,h);n[l]=s[a&255]^i[a>>>8&255]^c[a>>>16&255]^f[a>>>24]}return n}function nt(e,t,n,r,o,s){return e[n<<8&65280|r>>>8&255]^t[o>>>8&65280|s>>>24&255]}function J(e,t,n,r,o){return e[t&255|n&65280]|e[r>>>16&255|o>>>16&65280]<<16}function Y(e,t,n,r,o){let{sbox2:s,T01:i,T23:c}=Pt,f=0;t^=e[f++],n^=e[f++],r^=e[f++],o^=e[f++];let l=e.length/4-2;for(let u=0;u<l;u++){let y=e[f++]^nt(i,c,t,n,r,o),d=e[f++]^nt(i,c,n,r,o,t),w=e[f++]^nt(i,c,r,o,t,n),b=e[f++]^nt(i,c,o,t,n,r);t=y,n=d,r=w,o=b}let h=e[f++]^J(s,t,n,r,o),a=e[f++]^J(s,n,r,o,t),p=e[f++]^J(s,r,o,t,n),g=e[f++]^J(s,o,t,n,r);return{s0:h,s1:a,s2:p,s3:g}}function Qt(e,t,n,r,o){let{sbox2:s,T01:i,T23:c}=Ft,f=0;t^=e[f++],n^=e[f++],r^=e[f++],o^=e[f++];let l=e.length/4-2;for(let u=0;u<l;u++){let y=e[f++]^nt(i,c,t,o,r,n),d=e[f++]^nt(i,c,n,t,o,r),w=e[f++]^nt(i,c,r,n,t,o),b=e[f++]^nt(i,c,o,r,n,t);t=y,n=d,r=w,o=b}let h=e[f++]^J(s,t,o,r,n),a=e[f++]^J(s,n,t,o,r),p=e[f++]^J(s,r,n,t,o),g=e[f++]^J(s,o,r,n,t);return{s0:h,s1:a,s2:p,s3:g}}function ke(e,t,n,r){E(t,R,"nonce"),E(n);let o=n.length;r=Q(o,r),pt(n,r);let s=t,i=A(s),{s0:c,s1:f,s2:l,s3:h}=Y(e,i[0],i[1],i[2],i[3]),a=A(n),p=A(r);for(let u=0;u+4<=a.length;u+=4)p[u+0]=a[u+0]^c,p[u+1]=a[u+1]^f,p[u+2]=a[u+2]^l,p[u+3]=a[u+3]^h,Te(s,!1,1),{s0:c,s1:f,s2:l,s3:h}=Y(e,i[0],i[1],i[2],i[3]);let g=R*Math.floor(a.length/Nt);if(g<o){let u=new Uint32Array([c,f,l,h]),y=dt(u);for(let d=g,w=0;d<o;d++,w++)r[d]=n[d]^y[w];B(u)}return r}function Et(e,t,n,r,o){E(n,R,"nonce"),E(r),o=Q(r.length,o);let s=n,i=A(s),c=at(s),f=A(r),l=A(o),h=t?0:12,a=r.length,p=c.getUint32(h,t),{s0:g,s1:u,s2:y,s3:d}=Y(e,i[0],i[1],i[2],i[3]);for(let b=0;b+4<=f.length;b+=4)l[b+0]=f[b+0]^g,l[b+1]=f[b+1]^u,l[b+2]=f[b+2]^y,l[b+3]=f[b+3]^d,p=p+1>>>0,c.setUint32(h,p,t),{s0:g,s1:u,s2:y,s3:d}=Y(e,i[0],i[1],i[2],i[3]);let w=R*Math.floor(f.length/Nt);if(w<a){let b=new Uint32Array([g,u,y,d]),U=dt(b);for(let L=w,C=0;L<a;L++,C++)o[L]=r[L]^U[C];B(b)}return o}var Gt=D({blockSize:16,nonceLength:16},function(t,n){function r(o,s){if(E(o),s!==void 0&&(E(s),!Z(s)))throw new Error("unaligned destination");let i=rt(t),c=z(n),f=[i,c];Z(o)||f.push(o=z(o));let l=ke(i,c,o,s);return B(...f),l}return{encrypt:(o,s)=>r(o,s),decrypt:(o,s)=>r(o,s)}});function Jt(e){if(E(e),e.length%R!==0)throw new Error("aes-(cbc/ecb).decrypt ciphertext should consist of blocks with size "+R)}function Xt(e,t,n){E(e);let r=e.length,o=r%R;if(!t&&o!==0)throw new Error("aec/(cbc-ecb): unpadded plaintext with disabled padding");Z(e)||(e=z(e));let s=A(e);if(t){let c=R-o;c||(c=R),r=r+c}n=Q(r,n),pt(e,n);let i=A(n);return{b:s,o:i,out:n}}function Dt(e,t){if(!t)return e;let n=e.length;if(!n)throw new Error("aes/pcks5: empty ciphertext not allowed");let r=e[n-1];if(r<=0||r>16)throw new Error("aes/pcks5: wrong padding");let o=e.subarray(0,-r);for(let s=0;s<r;s++)if(e[n-s-1]!==r)throw new Error("aes/pcks5: wrong padding");return o}function te(e){let t=new Uint8Array(16),n=A(t);t.set(e);let r=R-e.length;for(let o=R-r;o<R;o++)t[o]=r;return n}var ee=D({blockSize:16},function(t,n={}){let r=!n.disablePadding;return{encrypt(o,s){let{b:i,o:c,out:f}=Xt(o,r,s),l=rt(t),h=0;for(;h+4<=i.length;){let{s0:a,s1:p,s2:g,s3:u}=Y(l,i[h+0],i[h+1],i[h+2],i[h+3]);c[h++]=a,c[h++]=p,c[h++]=g,c[h++]=u}if(r){let a=te(o.subarray(h*4)),{s0:p,s1:g,s2:u,s3:y}=Y(l,a[0],a[1],a[2],a[3]);c[h++]=p,c[h++]=g,c[h++]=u,c[h++]=y}return B(l),f},decrypt(o,s){Jt(o);let i=Yt(t);s=Q(o.length,s);let c=[i];Z(o)||c.push(o=z(o)),pt(o,s);let f=A(o),l=A(s);for(let h=0;h+4<=f.length;){let{s0:a,s1:p,s2:g,s3:u}=Qt(i,f[h+0],f[h+1],f[h+2],f[h+3]);l[h++]=a,l[h++]=p,l[h++]=g,l[h++]=u}return B(...c),Dt(s,r)}}}),ne=D({blockSize:16,nonceLength:16},function(t,n,r={}){let o=!r.disablePadding;return{encrypt(s,i){let c=rt(t),{b:f,o:l,out:h}=Xt(s,o,i),a=n,p=[c];Z(a)||p.push(a=z(a));let g=A(a),u=g[0],y=g[1],d=g[2],w=g[3],b=0;for(;b+4<=f.length;)u^=f[b+0],y^=f[b+1],d^=f[b+2],w^=f[b+3],{s0:u,s1:y,s2:d,s3:w}=Y(c,u,y,d,w),l[b++]=u,l[b++]=y,l[b++]=d,l[b++]=w;if(o){let U=te(s.subarray(b*4));u^=U[0],y^=U[1],d^=U[2],w^=U[3],{s0:u,s1:y,s2:d,s3:w}=Y(c,u,y,d,w),l[b++]=u,l[b++]=y,l[b++]=d,l[b++]=w}return B(...p),h},decrypt(s,i){Jt(s);let c=Yt(t),f=n,l=[c];Z(f)||l.push(f=z(f));let h=A(f);i=Q(s.length,i),Z(s)||l.push(s=z(s)),pt(s,i);let a=A(s),p=A(i),g=h[0],u=h[1],y=h[2],d=h[3];for(let w=0;w+4<=a.length;){let b=g,U=u,L=y,C=d;g=a[w+0],u=a[w+1],y=a[w+2],d=a[w+3];let{s0:v,s1:j,s2:V,s3:_}=Qt(c,g,u,y,d);p[w++]=v^b,p[w++]=j^U,p[w++]=V^L,p[w++]=_^C}return B(...l),Dt(i,o)}}}),re=D({blockSize:16,nonceLength:16},function(t,n){function r(o,s,i){E(o);let c=o.length;if(i=Q(c,i),vt(o,i))throw new Error("overlapping src and dst not supported.");let f=rt(t),l=n,h=[f];Z(l)||h.push(l=z(l)),Z(o)||h.push(o=z(o));let a=A(o),p=A(i),g=s?p:a,u=A(l),y=u[0],d=u[1],w=u[2],b=u[3];for(let L=0;L+4<=a.length;){let{s0:C,s1:v,s2:j,s3:V}=Y(f,y,d,w,b);p[L+0]=a[L+0]^C,p[L+1]=a[L+1]^v,p[L+2]=a[L+2]^j,p[L+3]=a[L+3]^V,y=g[L++],d=g[L++],w=g[L++],b=g[L++]}let U=R*Math.floor(a.length/Nt);if(U<c){({s0:y,s1:d,s2:w,s3:b}=Y(f,y,d,w,b));let L=dt(new Uint32Array([y,d,w,b]));for(let C=U,v=0;C<c;C++,v++)i[C]=o[C]^L[v];B(L)}return B(...h),i}return{encrypt:(o,s)=>r(o,!0,s),decrypt:(o,s)=>r(o,!1,s)}});function Ne(e,t,n,r,o){let s=o?o.length:0,i=e.create(n,r.length+s);o&&i.update(o);let c=bt(8*r.length,8*s,t);i.update(r),i.update(c);let f=i.digest();return B(c),f}var oe=D({blockSize:16,nonceLength:12,tagLength:16,varSizeNonce:!0},function(t,n,r){if(n.length<8)throw new Error("aes/gcm: invalid nonce length");let o=16;function s(c,f,l){let h=Ne(It,!1,c,l,r);for(let a=0;a<f.length;a++)h[a]^=f[a];return h}function i(){let c=rt(t),f=Lt.slice(),l=Lt.slice();if(Et(c,!1,l,l,f),n.length===12)l.set(n);else{let a=Lt.slice();at(a).setBigUint64(8,BigInt(n.length*8),!1);let g=It.create(f).update(n).update(a);g.digestInto(l),g.destroy()}let h=Et(c,!1,l,Lt);return{xk:c,authKey:f,counter:l,tagMask:h}}return{encrypt(c){let{xk:f,authKey:l,counter:h,tagMask:a}=i(),p=new Uint8Array(c.length+o),g=[f,l,h,a];Z(c)||g.push(c=z(c)),Et(f,!1,h,c,p.subarray(0,c.length));let u=s(l,a,p.subarray(0,p.length-o));return g.push(u),p.set(u,c.length),B(...g),p},decrypt(c){let{xk:f,authKey:l,counter:h,tagMask:a}=i(),p=[f,l,a,h];Z(c)||p.push(c=z(c));let g=c.subarray(0,-o),u=c.subarray(-o),y=s(l,a,g);if(p.push(y),!wt(y,u))throw new Error("aes/gcm: invalid ghash tag");let d=Et(f,!1,h,g);return B(...p),d}}});function Me(e){return e instanceof Uint32Array||ArrayBuffer.isView(e)&&e.constructor.name==="Uint32Array"}function Ot(e,t){if(E(t,16,"block"),!Me(e))throw new Error("_encryptBlock accepts result of expandKeyLE");let n=A(t),{s0:r,s1:o,s2:s,s3:i}=Y(e,n[0],n[1],n[2],n[3]);return n[0]=r,n[1]=o,n[2]=s,n[3]=i,t}function qt(e){let t=0;for(let n=R-1;n>=0;n--){let r=(e[n]&128)>>>7;e[n]=e[n]<<1|t,t=r}return t&&(e[R-1]^=135),e}function Ut(e,t){if(e.length!==t.length)throw new Error("xorBlock: blocks must have same length");for(let n=0;n<e.length;n++)e[n]=e[n]^t[n];return e}var At=class{buffer;destroyed;k1;k2;xk;constructor(t){E(t),$t(t),this.xk=rt(t),this.buffer=new Uint8Array(0),this.destroyed=!1;let n=new Uint8Array(R);Ot(this.xk,n),this.k1=qt(n),this.k2=qt(new Uint8Array(this.k1))}update(t){let{destroyed:n,buffer:r}=this;if(n)throw new Error("CMAC instance was destroyed");E(t);let o=new Uint8Array(r.length+t.length);return o.set(r),o.set(t,r.length),this.buffer=o,this}digest(){if(this.destroyed)throw new Error("CMAC instance was destroyed");let{buffer:t}=this,n=t.length,r=Math.ceil(n/R),o;r===0?(r=1,o=!1):o=n%R===0;let s=(r-1)*R,i=t.subarray(s),c;if(o)c=Ut(new Uint8Array(i),this.k1);else{let l=new Uint8Array(R);l.set(i),l[i.length]=128,c=Ut(l,this.k2)}let f=new Uint8Array(R);for(let l=0;l<r-1;l++){let h=t.subarray(l*R,(l+1)*R);Ut(f,h),Ot(this.xk,f)}return Ut(f,c),Ot(this.xk,f),B(c),f}destroy(){let{buffer:t,destroyed:n,xk:r,k1:o,k2:s}=this;n||(this.destroyed=!0,B(t,r,o,s))}},Pe=(e,t)=>new At(e).update(t).digest();Pe.create=e=>new At(e);var se=()=>{throw new Error('"siv" from v1 is now "gcmsiv"')};var ie=e=>Uint8Array.from(e.split(""),t=>t.charCodeAt(0)),ze=ie("expand 16-byte k"),Re=ie("expand 32-byte k"),We=A(ze),je=A(Re);function x(e,t){return e<<t|e>>>32-t}function zt(e){return e.byteOffset%4===0}var Bt=64,Ve=16,fe=2**32-1,ce=Uint32Array.of();function He(e,t,n,r,o,s,i,c){let f=o.length,l=new Uint8Array(Bt),h=A(l),a=zt(o)&&zt(s),p=a?A(o):ce,g=a?A(s):ce;for(let u=0;u<f;i++){if(e(t,n,r,h,i,c),i>=fe)throw new Error("arx: counter overflow");let y=Math.min(Bt,f-u);if(a&&y===Bt){let d=u/4;if(u%4!==0)throw new Error("arx: invalid block position");for(let w=0,b;w<Ve;w++)b=d+w,g[b]=p[b]^h[w];u+=Bt;continue}for(let d=0,w;d<y;d++)w=u+d,s[w]=o[w]^l[d];u+=y}}function Rt(e,t){let{allowShortKeys:n,extendNonceFn:r,counterLength:o,counterRight:s,rounds:i}=jt({allowShortKeys:!1,counterLength:8,counterRight:!1,rounds:20},t);if(typeof e!="function")throw new Error("core must be a function");return ht(o),ht(i),yt(s),yt(n),(c,f,l,h,a=0)=>{E(c,void 0,"key"),E(f,void 0,"nonce"),E(l,void 0,"data");let p=l.length;if(h===void 0&&(h=new Uint8Array(p)),E(h,void 0,"output"),ht(a),a<0||a>=fe)throw new Error("arx: counter overflow");if(h.length<p)throw new Error(`arx: output (${h.length}) is shorter than data (${p})`);let g=[],u=c.length,y,d;if(u===32)g.push(y=z(c)),d=je;else if(u===16&&n)y=new Uint8Array(32),y.set(c),y.set(c,16),d=We,g.push(y);else throw E(c,32,"arx key"),new Error("invalid key size");zt(f)||g.push(f=z(f));let w=A(y);if(r){if(f.length!==24)throw new Error("arx: extended nonce must be 24 bytes");r(d,w,A(f.subarray(0,16)),w),f=f.subarray(16)}let b=16-o;if(b!==f.length)throw new Error(`arx: nonce must be ${b} or 16 bytes`);if(b!==12){let L=new Uint8Array(12);L.set(f,s?0:12-f.length),f=L,g.push(f)}let U=A(f);return He(e,d,w,U,l,h,a,i),B(...g),h}}function $(e,t){return e[t++]&255|(e[t++]&255)<<8}var Wt=class{blockLen=16;outputLen=16;buffer=new Uint8Array(16);r=new Uint16Array(10);h=new Uint16Array(10);pad=new Uint16Array(8);pos=0;finished=!1;constructor(t){t=z(E(t,32,"key"));let n=$(t,0),r=$(t,2),o=$(t,4),s=$(t,6),i=$(t,8),c=$(t,10),f=$(t,12),l=$(t,14);this.r[0]=n&8191,this.r[1]=(n>>>13|r<<3)&8191,this.r[2]=(r>>>10|o<<6)&7939,this.r[3]=(o>>>7|s<<9)&8191,this.r[4]=(s>>>4|i<<12)&255,this.r[5]=i>>>1&8190,this.r[6]=(i>>>14|c<<2)&8191,this.r[7]=(c>>>11|f<<5)&8065,this.r[8]=(f>>>8|l<<8)&8191,this.r[9]=l>>>5&127;for(let h=0;h<8;h++)this.pad[h]=$(t,16+2*h)}process(t,n,r=!1){let o=r?0:2048,{h:s,r:i}=this,c=i[0],f=i[1],l=i[2],h=i[3],a=i[4],p=i[5],g=i[6],u=i[7],y=i[8],d=i[9],w=$(t,n+0),b=$(t,n+2),U=$(t,n+4),L=$(t,n+6),C=$(t,n+8),v=$(t,n+10),j=$(t,n+12),V=$(t,n+14),_=s[0]+(w&8191),S=s[1]+((w>>>13|b<<3)&8191),T=s[2]+((b>>>10|U<<6)&8191),I=s[3]+((U>>>7|L<<9)&8191),K=s[4]+((L>>>4|C<<12)&8191),O=s[5]+(C>>>1&8191),k=s[6]+((C>>>14|v<<2)&8191),N=s[7]+((v>>>11|j<<5)&8191),M=s[8]+((j>>>8|V<<8)&8191),P=s[9]+(V>>>5|o),m=0,H=m+_*c+S*(5*d)+T*(5*y)+I*(5*u)+K*(5*g);m=H>>>13,H&=8191,H+=O*(5*p)+k*(5*a)+N*(5*h)+M*(5*l)+P*(5*f),m+=H>>>13,H&=8191;let q=m+_*f+S*c+T*(5*d)+I*(5*y)+K*(5*u);m=q>>>13,q&=8191,q+=O*(5*g)+k*(5*p)+N*(5*a)+M*(5*h)+P*(5*l),m+=q>>>13,q&=8191;let W=m+_*l+S*f+T*c+I*(5*d)+K*(5*y);m=W>>>13,W&=8191,W+=O*(5*u)+k*(5*g)+N*(5*p)+M*(5*a)+P*(5*h),m+=W>>>13,W&=8191;let X=m+_*h+S*l+T*f+I*c+K*(5*d);m=X>>>13,X&=8191,X+=O*(5*y)+k*(5*u)+N*(5*g)+M*(5*p)+P*(5*a),m+=X>>>13,X&=8191;let ot=m+_*a+S*h+T*l+I*f+K*c;m=ot>>>13,ot&=8191,ot+=O*(5*d)+k*(5*y)+N*(5*u)+M*(5*g)+P*(5*p),m+=ot>>>13,ot&=8191;let st=m+_*p+S*a+T*h+I*l+K*f;m=st>>>13,st&=8191,st+=O*c+k*(5*d)+N*(5*y)+M*(5*u)+P*(5*g),m+=st>>>13,st&=8191;let ct=m+_*g+S*p+T*a+I*h+K*l;m=ct>>>13,ct&=8191,ct+=O*f+k*c+N*(5*d)+M*(5*y)+P*(5*u),m+=ct>>>13,ct&=8191;let it=m+_*u+S*g+T*p+I*a+K*h;m=it>>>13,it&=8191,it+=O*l+k*f+N*c+M*(5*d)+P*(5*y),m+=it>>>13,it&=8191;let ft=m+_*y+S*u+T*g+I*p+K*a;m=ft>>>13,ft&=8191,ft+=O*h+k*l+N*f+M*c+P*(5*d),m+=ft>>>13,ft&=8191;let lt=m+_*d+S*y+T*u+I*g+K*p;m=lt>>>13,lt&=8191,lt+=O*a+k*h+N*l+M*f+P*c,m+=lt>>>13,lt&=8191,m=(m<<2)+m|0,m=m+H|0,H=m&8191,m=m>>>13,q+=m,s[0]=H,s[1]=q,s[2]=W,s[3]=X,s[4]=ot,s[5]=st,s[6]=ct,s[7]=it,s[8]=ft,s[9]=lt}finalize(){let{h:t,pad:n}=this,r=new Uint16Array(10),o=t[1]>>>13;t[1]&=8191;for(let c=2;c<10;c++)t[c]+=o,o=t[c]>>>13,t[c]&=8191;t[0]+=o*5,o=t[0]>>>13,t[0]&=8191,t[1]+=o,o=t[1]>>>13,t[1]&=8191,t[2]+=o,r[0]=t[0]+5,o=r[0]>>>13,r[0]&=8191;for(let c=1;c<10;c++)r[c]=t[c]+o,o=r[c]>>>13,r[c]&=8191;r[9]-=8192;let s=(o^1)-1;for(let c=0;c<10;c++)r[c]&=s;s=~s;for(let c=0;c<10;c++)t[c]=t[c]&s|r[c];t[0]=(t[0]|t[1]<<13)&65535,t[1]=(t[1]>>>3|t[2]<<10)&65535,t[2]=(t[2]>>>6|t[3]<<7)&65535,t[3]=(t[3]>>>9|t[4]<<4)&65535,t[4]=(t[4]>>>12|t[5]<<1|t[6]<<14)&65535,t[5]=(t[6]>>>2|t[7]<<11)&65535,t[6]=(t[7]>>>5|t[8]<<8)&65535,t[7]=(t[8]>>>8|t[9]<<5)&65535;let i=t[0]+n[0];t[0]=i&65535;for(let c=1;c<8;c++)i=(t[c]+n[c]|0)+(i>>>16)|0,t[c]=i&65535;B(r)}update(t){et(this),E(t),t=z(t);let{buffer:n,blockLen:r}=this,o=t.length;for(let s=0;s<o;){let i=Math.min(r-this.pos,o-s);if(i===r){for(;r<=o-s;s+=r)this.process(t,s);continue}n.set(t.subarray(s,s+i),this.pos),this.pos+=i,s+=i,this.pos===r&&(this.process(n,0,!1),this.pos=0)}return this}destroy(){B(this.h,this.r,this.buffer,this.pad)}digestInto(t){et(this),gt(t,this),this.finished=!0;let{buffer:n,h:r}=this,{pos:o}=this;if(o){for(n[o++]=1;o<16;o++)n[o]=0;this.process(n,0,!0)}this.finalize();let s=0;for(let i=0;i<8;i++)t[s++]=r[i]>>>0,t[s++]=r[i]>>>8;return t}digest(){let{buffer:t,outputLen:n}=this;this.digestInto(t);let r=t.slice(0,n);return this.destroy(),r}};function qe(e){let t=(r,o)=>e(o).update(r).digest(),n=e(new Uint8Array(32));return t.outputLen=n.outputLen,t.blockLen=n.blockLen,t.create=r=>e(r),t}var le=qe(e=>new Wt(e));function ue(e,t,n,r,o,s=20){let i=e[0],c=e[1],f=e[2],l=e[3],h=t[0],a=t[1],p=t[2],g=t[3],u=t[4],y=t[5],d=t[6],w=t[7],b=o,U=n[0],L=n[1],C=n[2],v=i,j=c,V=f,_=l,S=h,T=a,I=p,K=g,O=u,k=y,N=d,M=w,P=b,m=U,H=L,q=C;for(let X=0;X<s;X+=2)v=v+S|0,P=x(P^v,16),O=O+P|0,S=x(S^O,12),v=v+S|0,P=x(P^v,8),O=O+P|0,S=x(S^O,7),j=j+T|0,m=x(m^j,16),k=k+m|0,T=x(T^k,12),j=j+T|0,m=x(m^j,8),k=k+m|0,T=x(T^k,7),V=V+I|0,H=x(H^V,16),N=N+H|0,I=x(I^N,12),V=V+I|0,H=x(H^V,8),N=N+H|0,I=x(I^N,7),_=_+K|0,q=x(q^_,16),M=M+q|0,K=x(K^M,12),_=_+K|0,q=x(q^_,8),M=M+q|0,K=x(K^M,7),v=v+T|0,q=x(q^v,16),N=N+q|0,T=x(T^N,12),v=v+T|0,q=x(q^v,8),N=N+q|0,T=x(T^N,7),j=j+I|0,P=x(P^j,16),M=M+P|0,I=x(I^M,12),j=j+I|0,P=x(P^j,8),M=M+P|0,I=x(I^M,7),V=V+K|0,m=x(m^V,16),O=O+m|0,K=x(K^O,12),V=V+K|0,m=x(m^V,8),O=O+m|0,K=x(K^O,7),_=_+S|0,H=x(H^_,16),k=k+H|0,S=x(S^k,12),_=_+S|0,H=x(H^_,8),k=k+H|0,S=x(S^k,7);let W=0;r[W++]=i+v|0,r[W++]=c+j|0,r[W++]=f+V|0,r[W++]=l+_|0,r[W++]=h+S|0,r[W++]=a+T|0,r[W++]=p+I|0,r[W++]=g+K|0,r[W++]=u+O|0,r[W++]=y+k|0,r[W++]=d+N|0,r[W++]=w+M|0,r[W++]=b+P|0,r[W++]=U+m|0,r[W++]=L+H|0,r[W++]=C+q|0}function $e(e,t,n,r){let o=e[0],s=e[1],i=e[2],c=e[3],f=t[0],l=t[1],h=t[2],a=t[3],p=t[4],g=t[5],u=t[6],y=t[7],d=n[0],w=n[1],b=n[2],U=n[3];for(let C=0;C<20;C+=2)o=o+f|0,d=x(d^o,16),p=p+d|0,f=x(f^p,12),o=o+f|0,d=x(d^o,8),p=p+d|0,f=x(f^p,7),s=s+l|0,w=x(w^s,16),g=g+w|0,l=x(l^g,12),s=s+l|0,w=x(w^s,8),g=g+w|0,l=x(l^g,7),i=i+h|0,b=x(b^i,16),u=u+b|0,h=x(h^u,12),i=i+h|0,b=x(b^i,8),u=u+b|0,h=x(h^u,7),c=c+a|0,U=x(U^c,16),y=y+U|0,a=x(a^y,12),c=c+a|0,U=x(U^c,8),y=y+U|0,a=x(a^y,7),o=o+l|0,U=x(U^o,16),u=u+U|0,l=x(l^u,12),o=o+l|0,U=x(U^o,8),u=u+U|0,l=x(l^u,7),s=s+h|0,d=x(d^s,16),y=y+d|0,h=x(h^y,12),s=s+h|0,d=x(d^s,8),y=y+d|0,h=x(h^y,7),i=i+a|0,w=x(w^i,16),p=p+w|0,a=x(a^p,12),i=i+a|0,w=x(w^i,8),p=p+w|0,a=x(a^p,7),c=c+f|0,b=x(b^c,16),g=g+b|0,f=x(f^g,12),c=c+f|0,b=x(b^c,8),g=g+b|0,f=x(f^g,7);let L=0;r[L++]=o,r[L++]=s,r[L++]=i,r[L++]=c,r[L++]=d,r[L++]=w,r[L++]=b,r[L++]=U}var Ze=Rt(ue,{counterRight:!1,counterLength:4,allowShortKeys:!1}),Fe=Rt(ue,{counterRight:!1,counterLength:8,extendNonceFn:$e,allowShortKeys:!1});var Ye=new Uint8Array(16),he=(e,t)=>{e.update(t);let n=t.length%16;n&&e.update(Ye.subarray(n))},Qe=new Uint8Array(32);function ae(e,t,n,r,o){o!==void 0&&E(o,void 0,"AAD");let s=e(t,n,Qe),i=bt(r.length,o?o.length:0,!0),c=le.create(s);o&&he(c,o),he(c,r),c.update(i);let f=c.digest();return B(s,i),f}var ge=e=>(t,n,r)=>({encrypt(s,i){let c=s.length;i=Q(c+16,i,!1),i.set(s);let f=i.subarray(0,-16);e(t,n,f,f,1);let l=ae(e,t,n,f,r);return i.set(l,c),B(l),i},decrypt(s,i){i=Q(s.length-16,i,!1);let c=s.subarray(0,-16),f=s.subarray(-16),l=ae(e,t,n,c,r);if(!wt(f,l))throw new Error("invalid tag");return i.set(s.subarray(0,-16)),e(t,n,i,i,1),B(l),i}}),pe=D({blockSize:64,nonceLength:12,tagLength:16},ge(Ze)),ye=D({blockSize:64,nonceLength:24,tagLength:16},ge(Fe));return Le(Ge);})();
/*! Bundled license information:

@noble/ciphers/utils.js:
  (*! noble-ciphers - MIT License (c) 2023 Paul Miller (paulmillr.com) *)
*/


// CIPHER FUNCTIONS

function _Crypto_cipherKeyFromHex(hex)
{
	try {
		var bytes = _Crypto_fromHex(hex);
		if (bytes.length !== 32) { return __Maybe_Nothing; }
		return __Maybe_Just(hex);
	} catch (e) {
		return __Maybe_Nothing;
	}
}

function _Crypto_cipherKeyToHex(key)
{
	return key;
}

function _Crypto_cipherNonce12FromHex(hex)
{
	try {
		var bytes = _Crypto_fromHex(hex);
		if (bytes.length !== 12) { return __Maybe_Nothing; }
		return __Maybe_Just(hex);
	} catch (e) {
		return __Maybe_Nothing;
	}
}

function _Crypto_cipherNonce12ToHex(nonce)
{
	return nonce;
}

function _Crypto_cipherNonce24FromHex(hex)
{
	try {
		var bytes = _Crypto_fromHex(hex);
		if (bytes.length !== 24) { return __Maybe_Nothing; }
		return __Maybe_Just(hex);
	} catch (e) {
		return __Maybe_Nothing;
	}
}

function _Crypto_cipherNonce24ToHex(nonce)
{
	return nonce;
}


// AES-256-GCM

var _Crypto_aesGcmEncrypt = F3(function(key, nonce, plaintext)
{
	var cipher = _Crypto_ciphers.gcm(_Crypto_fromHex(key), _Crypto_fromHex(nonce));
	return _Crypto_toHex(cipher.encrypt(_Crypto_fromHex(plaintext)));
});

var _Crypto_aesGcmDecrypt = F3(function(key, nonce, ciphertext)
{
	try {
		var cipher = _Crypto_ciphers.gcm(_Crypto_fromHex(key), _Crypto_fromHex(nonce));
		return __Maybe_Just(_Crypto_toHex(cipher.decrypt(_Crypto_fromHex(ciphertext))));
	} catch (e) {
		return __Maybe_Nothing;
	}
});


// CHACHA20-POLY1305

var _Crypto_chacha20Encrypt = F3(function(key, nonce, plaintext)
{
	var cipher = _Crypto_ciphers.chacha20poly1305(_Crypto_fromHex(key), _Crypto_fromHex(nonce));
	return _Crypto_toHex(cipher.encrypt(_Crypto_fromHex(plaintext)));
});

var _Crypto_chacha20Decrypt = F3(function(key, nonce, ciphertext)
{
	try {
		var cipher = _Crypto_ciphers.chacha20poly1305(_Crypto_fromHex(key), _Crypto_fromHex(nonce));
		return __Maybe_Just(_Crypto_toHex(cipher.decrypt(_Crypto_fromHex(ciphertext))));
	} catch (e) {
		return __Maybe_Nothing;
	}
});


// XCHACHA20-POLY1305

var _Crypto_xchacha20Encrypt = F3(function(key, nonce, plaintext)
{
	var cipher = _Crypto_ciphers.xchacha20poly1305(_Crypto_fromHex(key), _Crypto_fromHex(nonce));
	return _Crypto_toHex(cipher.encrypt(_Crypto_fromHex(plaintext)));
});

var _Crypto_xchacha20Decrypt = F3(function(key, nonce, ciphertext)
{
	try {
		var cipher = _Crypto_ciphers.xchacha20poly1305(_Crypto_fromHex(key), _Crypto_fromHex(nonce));
		return __Maybe_Just(_Crypto_toHex(cipher.decrypt(_Crypto_fromHex(ciphertext))));
	} catch (e) {
		return __Maybe_Nothing;
	}
});

/*

import Maybe exposing (Just, Nothing)

*/


// NOBLE/CURVES BUNDLE (https://github.com/paulmillr/noble-curves, MIT License)
// Embedded: @noble/curves 2.0.1 - secp256k1, ed25519, P-256

var _Crypto_noble =(()=>{var te=Object.defineProperty;var _n=Object.getOwnPropertyDescriptor;var In=Object.getOwnPropertyNames;var An=Object.prototype.hasOwnProperty;var Rn=(e,t)=>{for(var r in t)te(e,r,{get:t[r],enumerable:!0})},On=(e,t,r,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let o of In(t))!An.call(e,o)&&o!==r&&te(e,o,{get:()=>t[o],enumerable:!(n=_n(t,o))||n.enumerable});return e};var Hn=e=>On(te({},"_"+"_esModule",{value:!0}),e);var lr={};Rn(lr,{bytesToHex:()=>et,ed25519:()=>vn,hexToBytes:()=>nt,p256:()=>Sn,secp256k1:()=>gn});function pt(e){return e instanceof Uint8Array||ArrayBuffer.isView(e)&&e.constructor.name==="Uint8Array"}function ot(e,t=""){if(!Number.isSafeInteger(e)||e<0){let r=t&&`"${t}" `;throw new Error(`${r}expected integer >= 0, got ${e}`)}}function N(e,t,r=""){let n=pt(e),o=e?.length,f=t!==void 0;if(!n||f&&o!==t){let i=r&&`"${r}" `,c=f?` of length ${t}`:"",s=n?`length=${o}`:`type=${typeof e}`;throw new Error(i+"expected Uint8Array"+c+", got "+s)}return e}function Yt(e){if(typeof e!="function"||typeof e.create!="function")throw new Error("Hash must wrapped by utils.createHasher");ot(e.outputLen),ot(e.blockLen)}function St(e,t=!0){if(e.destroyed)throw new Error("Hash instance has been destroyed");if(t&&e.finished)throw new Error("Hash#digest() has already been called")}function qe(e,t){N(e,void 0,"digestInto() output");let r=t.outputLen;if(e.length<r)throw new Error('"digestInto() output" expected to be of length >='+r)}function it(...e){for(let t=0;t<e.length;t++)e[t].fill(0)}function kt(e){return new DataView(e.buffer,e.byteOffset,e.byteLength)}function tt(e,t){return e<<32-t|e>>>t}var Ue=typeof Uint8Array.from([]).toHex=="function"&&typeof Uint8Array.fromHex=="function",Tn=Array.from({length:256},(e,t)=>t.toString(16).padStart(2,"0"));function et(e){if(N(e),Ue)return e.toHex();let t="";for(let r=0;r<e.length;r++)t+=Tn[e[r]];return t}var st={_0:48,_9:57,A:65,F:70,a:97,f:102};function Le(e){if(e>=st._0&&e<=st._9)return e-st._0;if(e>=st.A&&e<=st.F)return e-(st.A-10);if(e>=st.a&&e<=st.f)return e-(st.a-10)}function nt(e){if(typeof e!="string")throw new Error("hex string expected, got "+typeof e);if(Ue)return Uint8Array.fromHex(e);let t=e.length,r=t/2;if(t%2)throw new Error("hex string expected, got unpadded hex of length "+t);let n=new Uint8Array(r);for(let o=0,f=0;o<r;o++,f+=2){let i=Le(e.charCodeAt(f)),c=Le(e.charCodeAt(f+1));if(i===void 0||c===void 0){let s=e[f]+e[f+1];throw new Error('hex string expected, got non-hex character "'+s+'" at index '+f)}n[o]=i*16+c}return n}function F(...e){let t=0;for(let n=0;n<e.length;n++){let o=e[n];N(o),t+=o.length}let r=new Uint8Array(t);for(let n=0,o=0;n<e.length;n++){let f=e[n];r.set(f,o),o+=f.length}return r}function ee(e,t={}){let r=(o,f)=>e(f).update(o).digest(),n=e(void 0);return r.outputLen=n.outputLen,r.blockLen=n.blockLen,r.create=o=>e(o),Object.assign(r,t),Object.freeze(r)}function _t(e=32){let t=typeof globalThis=="object"?globalThis.crypto:null;if(typeof t?.getRandomValues!="function")throw new Error("crypto.getRandomValues must be defined");return t.getRandomValues(new Uint8Array(e))}var ne=e=>({oid:Uint8Array.from([6,9,96,134,72,1,101,3,4,2,e])});function Ne(e,t,r){return e&t^~e&r}function De(e,t,r){return e&t^e&r^t&r}var Lt=class{blockLen;outputLen;padOffset;isLE;buffer;view;finished=!1;length=0;pos=0;destroyed=!1;constructor(t,r,n,o){this.blockLen=t,this.outputLen=r,this.padOffset=n,this.isLE=o,this.buffer=new Uint8Array(t),this.view=kt(this.buffer)}update(t){St(this),N(t);let{view:r,buffer:n,blockLen:o}=this,f=t.length;for(let i=0;i<f;){let c=Math.min(o-this.pos,f-i);if(c===o){let s=kt(t);for(;o<=f-i;i+=o)this.process(s,i);continue}n.set(t.subarray(i,i+c),this.pos),this.pos+=c,i+=c,this.pos===o&&(this.process(r,0),this.pos=0)}return this.length+=t.length,this.roundClean(),this}digestInto(t){St(this),qe(t,this),this.finished=!0;let{buffer:r,view:n,blockLen:o,isLE:f}=this,{pos:i}=this;r[i++]=128,it(this.buffer.subarray(i)),this.padOffset>o-i&&(this.process(n,0),i=0);for(let h=i;h<o;h++)r[h]=0;n.setBigUint64(o-8,BigInt(this.length*8),f),this.process(n,0);let c=kt(t),s=this.outputLen;if(s%4)throw new Error("_sha2: outputLen must be aligned to 32bit");let l=s/4,m=this.get();if(l>m.length)throw new Error("_sha2: outputLen bigger than state");for(let h=0;h<l;h++)c.setUint32(4*h,m[h],f)}digest(){let{buffer:t,outputLen:r}=this;this.digestInto(t);let n=t.slice(0,r);return this.destroy(),n}_cloneInto(t){t||=new this.constructor,t.set(...this.get());let{blockLen:r,buffer:n,length:o,finished:f,destroyed:i,pos:c}=this;return t.destroyed=i,t.finished=f,t.length=o,t.pos=c,o%r&&t.buffer.set(n),t}clone(){return this._cloneInto()}},ct=Uint32Array.from([1779033703,3144134277,1013904242,2773480762,1359893119,2600822924,528734635,1541459225]);var P=Uint32Array.from([1779033703,4089235720,3144134277,2227873595,1013904242,4271175723,2773480762,1595750129,1359893119,2917565137,2600822924,725511199,528734635,4215389547,1541459225,327033209]);var Xt=BigInt(4294967295),Ze=BigInt(32);function Ln(e,t=!1){return t?{h:Number(e&Xt),l:Number(e>>Ze&Xt)}:{h:Number(e>>Ze&Xt)|0,l:Number(e&Xt)|0}}function Ce(e,t=!1){let r=e.length,n=new Uint32Array(r),o=new Uint32Array(r);for(let f=0;f<r;f++){let{h:i,l:c}=Ln(e[f],t);[n[f],o[f]]=[i,c]}return[n,o]}var re=(e,t,r)=>e>>>r,oe=(e,t,r)=>e<<32-r|t>>>r,gt=(e,t,r)=>e>>>r|t<<32-r,yt=(e,t,r)=>e<<32-r|t>>>r,qt=(e,t,r)=>e<<64-r|t>>>r-32,Ut=(e,t,r)=>e>>>r-32|t<<64-r;function ft(e,t,r,n){let o=(t>>>0)+(n>>>0);return{h:e+r+(o/2**32|0)|0,l:o|0}}var Ve=(e,t,r)=>(e>>>0)+(t>>>0)+(r>>>0),Me=(e,t,r,n)=>t+r+n+(e/2**32|0)|0,Ye=(e,t,r,n)=>(e>>>0)+(t>>>0)+(r>>>0)+(n>>>0),ke=(e,t,r,n,o)=>t+r+n+o+(e/2**32|0)|0,Xe=(e,t,r,n,o)=>(e>>>0)+(t>>>0)+(r>>>0)+(n>>>0)+(o>>>0),Ge=(e,t,r,n,o,f)=>t+r+n+o+f+(e/2**32|0)|0;var Un=Uint32Array.from([1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298]),ut=new Uint32Array(64),fe=class extends Lt{constructor(t){super(64,t,8,!1)}get(){let{A:t,B:r,C:n,D:o,E:f,F:i,G:c,H:s}=this;return[t,r,n,o,f,i,c,s]}set(t,r,n,o,f,i,c,s){this.A=t|0,this.B=r|0,this.C=n|0,this.D=o|0,this.E=f|0,this.F=i|0,this.G=c|0,this.H=s|0}process(t,r){for(let h=0;h<16;h++,r+=4)ut[h]=t.getUint32(r,!1);for(let h=16;h<64;h++){let B=ut[h-15],E=ut[h-2],g=tt(B,7)^tt(B,18)^B>>>3,L=tt(E,17)^tt(E,19)^E>>>10;ut[h]=L+ut[h-7]+g+ut[h-16]|0}let{A:n,B:o,C:f,D:i,E:c,F:s,G:l,H:m}=this;for(let h=0;h<64;h++){let B=tt(c,6)^tt(c,11)^tt(c,25),E=m+B+Ne(c,s,l)+Un[h]+ut[h]|0,L=(tt(n,2)^tt(n,13)^tt(n,22))+De(n,o,f)|0;m=l,l=s,s=c,c=i+E|0,i=f,f=o,o=n,n=E+L|0}n=n+this.A|0,o=o+this.B|0,f=f+this.C|0,i=i+this.D|0,c=c+this.E|0,s=s+this.F|0,l=l+this.G|0,m=m+this.H|0,this.set(n,o,f,i,c,s,l,m)}roundClean(){it(ut)}destroy(){this.set(0,0,0,0,0,0,0,0),it(this.buffer)}},se=class extends fe{A=ct[0]|0;B=ct[1]|0;C=ct[2]|0;D=ct[3]|0;E=ct[4]|0;F=ct[5]|0;G=ct[6]|0;H=ct[7]|0;constructor(){super(32)}};var Ke=Ce(["0x428a2f98d728ae22","0x7137449123ef65cd","0xb5c0fbcfec4d3b2f","0xe9b5dba58189dbbc","0x3956c25bf348b538","0x59f111f1b605d019","0x923f82a4af194f9b","0xab1c5ed5da6d8118","0xd807aa98a3030242","0x12835b0145706fbe","0x243185be4ee4b28c","0x550c7dc3d5ffb4e2","0x72be5d74f27b896f","0x80deb1fe3b1696b1","0x9bdc06a725c71235","0xc19bf174cf692694","0xe49b69c19ef14ad2","0xefbe4786384f25e3","0x0fc19dc68b8cd5b5","0x240ca1cc77ac9c65","0x2de92c6f592b0275","0x4a7484aa6ea6e483","0x5cb0a9dcbd41fbd4","0x76f988da831153b5","0x983e5152ee66dfab","0xa831c66d2db43210","0xb00327c898fb213f","0xbf597fc7beef0ee4","0xc6e00bf33da88fc2","0xd5a79147930aa725","0x06ca6351e003826f","0x142929670a0e6e70","0x27b70a8546d22ffc","0x2e1b21385c26c926","0x4d2c6dfc5ac42aed","0x53380d139d95b3df","0x650a73548baf63de","0x766a0abb3c77b2a8","0x81c2c92e47edaee6","0x92722c851482353b","0xa2bfe8a14cf10364","0xa81a664bbc423001","0xc24b8b70d0f89791","0xc76c51a30654be30","0xd192e819d6ef5218","0xd69906245565a910","0xf40e35855771202a","0x106aa07032bbd1b8","0x19a4c116b8d2d0c8","0x1e376c085141ab53","0x2748774cdf8eeb99","0x34b0bcb5e19b48a8","0x391c0cb3c5c95a63","0x4ed8aa4ae3418acb","0x5b9cca4f7763e373","0x682e6ff3d6b2b8a3","0x748f82ee5defb2fc","0x78a5636f43172f60","0x84c87814a1f0ab72","0x8cc702081a6439ec","0x90befffa23631e28","0xa4506cebde82bde9","0xbef9a3f7b2c67915","0xc67178f2e372532b","0xca273eceea26619c","0xd186b8c721c0c207","0xeada7dd6cde0eb1e","0xf57d4f7fee6ed178","0x06f067aa72176fba","0x0a637dc5a2c898a6","0x113f9804bef90dae","0x1b710b35131c471b","0x28db77f523047d84","0x32caab7b40c72493","0x3c9ebe0a15c9bebc","0x431d67c49c100d4c","0x4cc5d4becb3e42b6","0x597f299cfc657e2a","0x5fcb6fab3ad6faec","0x6c44198c4a475817"].map(e=>BigInt(e))),Nn=Ke[0],Dn=Ke[1],lt=new Uint32Array(80),ht=new Uint32Array(80),ie=class extends Lt{constructor(t){super(128,t,16,!1)}get(){let{Ah:t,Al:r,Bh:n,Bl:o,Ch:f,Cl:i,Dh:c,Dl:s,Eh:l,El:m,Fh:h,Fl:B,Gh:E,Gl:g,Hh:L,Hl:v}=this;return[t,r,n,o,f,i,c,s,l,m,h,B,E,g,L,v]}set(t,r,n,o,f,i,c,s,l,m,h,B,E,g,L,v){this.Ah=t|0,this.Al=r|0,this.Bh=n|0,this.Bl=o|0,this.Ch=f|0,this.Cl=i|0,this.Dh=c|0,this.Dl=s|0,this.Eh=l|0,this.El=m|0,this.Fh=h|0,this.Fl=B|0,this.Gh=E|0,this.Gl=g|0,this.Hh=L|0,this.Hl=v|0}process(t,r){for(let p=0;p<16;p++,r+=4)lt[p]=t.getUint32(r),ht[p]=t.getUint32(r+=4);for(let p=16;p<80;p++){let T=lt[p-15]|0,Z=ht[p-15]|0,V=gt(T,Z,1)^gt(T,Z,8)^re(T,Z,7),M=yt(T,Z,1)^yt(T,Z,8)^oe(T,Z,7),w=lt[p-2]|0,b=ht[p-2]|0,q=gt(w,b,19)^qt(w,b,61)^re(w,b,6),D=yt(w,b,19)^Ut(w,b,61)^oe(w,b,6),R=Ye(M,D,ht[p-7],ht[p-16]),d=ke(R,V,q,lt[p-7],lt[p-16]);lt[p]=d|0,ht[p]=R|0}let{Ah:n,Al:o,Bh:f,Bl:i,Ch:c,Cl:s,Dh:l,Dl:m,Eh:h,El:B,Fh:E,Fl:g,Gh:L,Gl:v,Hh:x,Hl:I}=this;for(let p=0;p<80;p++){let T=gt(h,B,14)^gt(h,B,18)^qt(h,B,41),Z=yt(h,B,14)^yt(h,B,18)^Ut(h,B,41),V=h&E^~h&L,M=B&g^~B&v,w=Xe(I,Z,M,Dn[p],ht[p]),b=Ge(w,x,T,V,Nn[p],lt[p]),q=w|0,D=gt(n,o,28)^qt(n,o,34)^qt(n,o,39),R=yt(n,o,28)^Ut(n,o,34)^Ut(n,o,39),d=n&f^n&c^f&c,u=o&i^o&s^i&s;x=L|0,I=v|0,L=E|0,v=g|0,E=h|0,g=B|0,{h,l:B}=ft(l|0,m|0,b|0,q|0),l=c|0,m=s|0,c=f|0,s=i|0,f=n|0,i=o|0;let a=Ve(q,R,u);n=Me(a,b,D,d),o=a|0}({h:n,l:o}=ft(this.Ah|0,this.Al|0,n|0,o|0)),{h:f,l:i}=ft(this.Bh|0,this.Bl|0,f|0,i|0),{h:c,l:s}=ft(this.Ch|0,this.Cl|0,c|0,s|0),{h:l,l:m}=ft(this.Dh|0,this.Dl|0,l|0,m|0),{h,l:B}=ft(this.Eh|0,this.El|0,h|0,B|0),{h:E,l:g}=ft(this.Fh|0,this.Fl|0,E|0,g|0),{h:L,l:v}=ft(this.Gh|0,this.Gl|0,L|0,v|0),{h:x,l:I}=ft(this.Hh|0,this.Hl|0,x|0,I|0),this.set(n,o,f,i,c,s,l,m,h,B,E,g,L,v,x,I)}roundClean(){it(lt,ht)}destroy(){it(this.buffer),this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0)}},ce=class extends ie{Ah=P[0]|0;Al=P[1]|0;Bh=P[2]|0;Bl=P[3]|0;Ch=P[4]|0;Cl=P[5]|0;Dh=P[6]|0;Dl=P[7]|0;Eh=P[8]|0;El=P[9]|0;Fh=P[10]|0;Fl=P[11]|0;Gh=P[12]|0;Gl=P[13]|0;Hh=P[14]|0;Hl=P[15]|0;constructor(){super(64)}};var Gt=ee(()=>new se,ne(1));var ae=ee(()=>new ce,ne(3));var ue=BigInt(0),de=BigInt(1);function at(e,t=""){if(typeof e!="boolean"){let r=t&&`"${t}" `;throw new Error(r+"expected boolean, got type="+typeof e)}return e}function je(e){if(typeof e=="bigint"){if(!Kt(e))throw new Error("positive bigint expected, got "+e)}else ot(e);return e}function Nt(e){let t=je(e).toString(16);return t.length&1?"0"+t:t}function We(e){if(typeof e!="string")throw new Error("hex string expected, got "+typeof e);return e===""?ue:BigInt("0x"+e)}function It(e){return We(et(e))}function wt(e){return We(et(Wt(N(e)).reverse()))}function jt(e,t){ot(t),e=je(e);let r=nt(e.toString(16).padStart(t*2,"0"));if(r.length!==t)throw new Error("number too large");return r}function le(e,t){return jt(e,t).reverse()}function Wt(e){return Uint8Array.from(e)}var Kt=e=>typeof e=="bigint"&&ue<=e;function Zn(e,t,r){return Kt(e)&&Kt(t)&&Kt(r)&&t<=e&&e<r}function Dt(e,t,r,n){if(!Zn(t,r,n))throw new Error("expected valid "+e+": "+r+" <= n < "+n+", got "+t)}function he(e){let t;for(t=0;e>ue;e>>=de,t+=1);return t}var Zt=e=>(de<<BigInt(e))-de;function ze(e,t,r){if(ot(e,"hashLen"),ot(t,"qByteLen"),typeof r!="function")throw new Error("hmacFn must be a function");let n=v=>new Uint8Array(v),o=Uint8Array.of(),f=Uint8Array.of(0),i=Uint8Array.of(1),c=1e3,s=n(e),l=n(e),m=0,h=()=>{s.fill(1),l.fill(0),m=0},B=(...v)=>r(l,F(s,...v)),E=(v=o)=>{l=B(f,v),s=B(),v.length!==0&&(l=B(i,v),s=B())},g=()=>{if(m++>=c)throw new Error("drbg: tried max amount of iterations");let v=0,x=[];for(;v<t;){s=B();let I=s.slice();x.push(I),v+=s.length}return F(...x)};return(v,x)=>{h(),E(v);let I;for(;!(I=x(g()));)E();return h(),I}}function bt(e,t={},r={}){if(!e||typeof e!="object")throw new Error("expected valid options object");function n(f,i,c){let s=e[f];if(c&&s===void 0)return;let l=typeof s;if(l!==i||s===null)throw new Error(`param "${f}" is invalid: expected ${i}, got ${l}`)}let o=(f,i)=>Object.entries(f).forEach(([c,s])=>n(c,s,i));o(t,!1),o(r,!0)}function At(e){let t=new WeakMap;return(r,...n)=>{let o=t.get(r);if(o!==void 0)return o;let f=e(r,...n);return t.set(r,f),f}}var J=BigInt(0),W=BigInt(1),Et=BigInt(2),Qe=BigInt(3),Je=BigInt(4),Fe=BigInt(5),Cn=BigInt(7),tn=BigInt(8),Vn=BigInt(9),en=BigInt(16);function j(e,t){let r=e%t;return r>=J?r:t+r}function k(e,t,r){let n=e;for(;t-- >J;)n*=n,n%=r;return n}function $e(e,t){if(e===J)throw new Error("invert: expected non-zero number");if(t<=J)throw new Error("invert: expected positive modulus, got "+t);let r=j(e,t),n=t,o=J,f=W,i=W,c=J;for(;r!==J;){let l=n/r,m=n%r,h=o-i*l,B=f-c*l;n=r,r=m,o=i,f=c,i=h,c=B}if(n!==W)throw new Error("invert: does not exist");return j(o,t)}function xe(e,t,r){if(!e.eql(e.sqr(t),r))throw new Error("Cannot find square root")}function nn(e,t){let r=(e.ORDER+W)/Je,n=e.pow(t,r);return xe(e,n,t),n}function Mn(e,t){let r=(e.ORDER-Fe)/tn,n=e.mul(t,Et),o=e.pow(n,r),f=e.mul(t,o),i=e.mul(e.mul(f,Et),o),c=e.mul(f,e.sub(i,e.ONE));return xe(e,c,t),c}function Yn(e){let t=Rt(e),r=rn(e),n=r(t,t.neg(t.ONE)),o=r(t,n),f=r(t,t.neg(n)),i=(e+Cn)/en;return(c,s)=>{let l=c.pow(s,i),m=c.mul(l,n),h=c.mul(l,o),B=c.mul(l,f),E=c.eql(c.sqr(m),s),g=c.eql(c.sqr(h),s);l=c.cmov(l,m,E),m=c.cmov(B,h,g);let L=c.eql(c.sqr(m),s),v=c.cmov(l,m,L);return xe(c,v,s),v}}function rn(e){if(e<Qe)throw new Error("sqrt is not defined for small field");let t=e-W,r=0;for(;t%Et===J;)t/=Et,r++;let n=Et,o=Rt(e);for(;Pe(o,n)===1;)if(n++>1e3)throw new Error("Cannot find square root: probably non-prime P");if(r===1)return nn;let f=o.pow(n,t),i=(t+W)/Et;return function(s,l){if(s.is0(l))return l;if(Pe(s,l)!==1)throw new Error("Cannot find square root");let m=r,h=s.mul(s.ONE,f),B=s.pow(l,t),E=s.pow(l,i);for(;!s.eql(B,s.ONE);){if(s.is0(B))return s.ZERO;let g=1,L=s.sqr(B);for(;!s.eql(L,s.ONE);)if(g++,L=s.sqr(L),g===m)throw new Error("Cannot find square root");let v=W<<BigInt(m-g-1),x=s.pow(h,v);m=g,h=s.sqr(x),B=s.mul(B,h),E=s.mul(E,x)}return E}}function kn(e){return e%Je===Qe?nn:e%tn===Fe?Mn:e%en===Vn?Yn(e):rn(e)}var on=(e,t)=>(j(e,t)&W)===W,Xn=["create","isValid","is0","neg","inv","sqrt","sqr","eql","add","sub","mul","pow","div","addN","subN","mulN","sqrN"];function me(e){let t={ORDER:"bigint",BYTES:"number",BITS:"number"},r=Xn.reduce((n,o)=>(n[o]="function",n),t);return bt(e,r),e}function Gn(e,t,r){if(r<J)throw new Error("invalid exponent, negatives unsupported");if(r===J)return e.ONE;if(r===W)return t;let n=e.ONE,o=t;for(;r>J;)r&W&&(n=e.mul(n,o)),o=e.sqr(o),r>>=W;return n}function Ct(e,t,r=!1){let n=new Array(t.length).fill(r?e.ZERO:void 0),o=t.reduce((i,c,s)=>e.is0(c)?i:(n[s]=i,e.mul(i,c)),e.ONE),f=e.inv(o);return t.reduceRight((i,c,s)=>e.is0(c)?i:(n[s]=e.mul(i,n[s]),e.mul(i,c)),f),n}function Pe(e,t){let r=(e.ORDER-W)/Et,n=e.pow(t,r),o=e.eql(n,e.ONE),f=e.eql(n,e.ZERO),i=e.eql(n,e.neg(e.ONE));if(!o&&!f&&!i)throw new Error("invalid Legendre symbol result");return o?1:f?0:-1}function Kn(e,t){t!==void 0&&ot(t);let r=t!==void 0?t:e.toString(2).length,n=Math.ceil(r/8);return{nBitLength:r,nByteLength:n}}var be=class{ORDER;BITS;BYTES;isLE;ZERO=J;ONE=W;_lengths;_sqrt;_mod;constructor(t,r={}){if(t<=J)throw new Error("invalid field: expected ORDER > 0, got "+t);let n;this.isLE=!1,r!=null&&typeof r=="object"&&(typeof r.BITS=="number"&&(n=r.BITS),typeof r.sqrt=="function"&&(this.sqrt=r.sqrt),typeof r.isLE=="boolean"&&(this.isLE=r.isLE),r.allowedLengths&&(this._lengths=r.allowedLengths?.slice()),typeof r.modFromBytes=="boolean"&&(this._mod=r.modFromBytes));let{nBitLength:o,nByteLength:f}=Kn(t,n);if(f>2048)throw new Error("invalid field: expected ORDER of <= 2048 bytes");this.ORDER=t,this.BITS=o,this.BYTES=f,this._sqrt=void 0,Object.preventExtensions(this)}create(t){return j(t,this.ORDER)}isValid(t){if(typeof t!="bigint")throw new Error("invalid field element: expected bigint, got "+typeof t);return J<=t&&t<this.ORDER}is0(t){return t===J}isValidNot0(t){return!this.is0(t)&&this.isValid(t)}isOdd(t){return(t&W)===W}neg(t){return j(-t,this.ORDER)}eql(t,r){return t===r}sqr(t){return j(t*t,this.ORDER)}add(t,r){return j(t+r,this.ORDER)}sub(t,r){return j(t-r,this.ORDER)}mul(t,r){return j(t*r,this.ORDER)}pow(t,r){return Gn(this,t,r)}div(t,r){return j(t*$e(r,this.ORDER),this.ORDER)}sqrN(t){return t*t}addN(t,r){return t+r}subN(t,r){return t-r}mulN(t,r){return t*r}inv(t){return $e(t,this.ORDER)}sqrt(t){return this._sqrt||(this._sqrt=kn(this.ORDER)),this._sqrt(this,t)}toBytes(t){return this.isLE?le(t,this.BYTES):jt(t,this.BYTES)}fromBytes(t,r=!1){N(t);let{_lengths:n,BYTES:o,isLE:f,ORDER:i,_mod:c}=this;if(n){if(!n.includes(t.length)||t.length>o)throw new Error("Field.fromBytes: expected "+n+" bytes, got "+t.length);let l=new Uint8Array(o);l.set(t,f?0:l.length-t.length),t=l}if(t.length!==o)throw new Error("Field.fromBytes: expected "+o+" bytes, got "+t.length);let s=f?wt(t):It(t);if(c&&(s=j(s,i)),!r&&!this.isValid(s))throw new Error("invalid field element: outside of range 0..ORDER");return s}invertBatch(t){return Ct(this,t)}cmov(t,r,n){return n?r:t}};function Rt(e,t={}){return new be(e,t)}function fn(e){if(typeof e!="bigint")throw new Error("field order must be bigint");let t=e.toString(2).length;return Math.ceil(t/8)}function pe(e){let t=fn(e);return t+Math.ceil(t/2)}function ge(e,t,r=!1){N(e);let n=e.length,o=fn(t),f=pe(t);if(n<16||n<f||n>1024)throw new Error("expected "+f+"-1024 bytes of input, got "+n);let i=r?wt(e):It(e),c=j(i,t-W)+W;return r?le(c,o):jt(c,o)}var Ot=BigInt(0),Bt=BigInt(1);function Vt(e,t){let r=t.negate();return e?r:t}function vt(e,t){let r=Ct(e.Fp,t.map(n=>n.Z));return t.map((n,o)=>e.fromAffine(n.toAffine(r[o])))}function dn(e,t){if(!Number.isSafeInteger(e)||e<=0||e>t)throw new Error("invalid window size, expected [1.."+t+"], got W="+e)}function ye(e,t){dn(e,t);let r=Math.ceil(t/e)+1,n=2**(e-1),o=2**e,f=Zt(e),i=BigInt(e);return{windows:r,windowSize:n,mask:f,maxNumber:o,shiftBy:i}}function sn(e,t,r){let{windowSize:n,mask:o,maxNumber:f,shiftBy:i}=r,c=Number(e&o),s=e>>i;c>n&&(c-=f,s+=Bt);let l=t*n,m=l+Math.abs(c)-1,h=c===0,B=c<0,E=t%2!==0;return{nextN:s,offset:m,isZero:h,isNeg:B,isNegF:E,offsetF:l}}var we=new WeakMap,un=new WeakMap;function Ee(e){return un.get(e)||1}function cn(e){if(e!==Ot)throw new Error("invalid wNAF")}var Ht=class{BASE;ZERO;Fn;bits;constructor(t,r){this.BASE=t.BASE,this.ZERO=t.ZERO,this.Fn=t.Fn,this.bits=r}_unsafeLadder(t,r,n=this.ZERO){let o=t;for(;r>Ot;)r&Bt&&(n=n.add(o)),o=o.double(),r>>=Bt;return n}precomputeWindow(t,r){let{windows:n,windowSize:o}=ye(r,this.bits),f=[],i=t,c=i;for(let s=0;s<n;s++){c=i,f.push(c);for(let l=1;l<o;l++)c=c.add(i),f.push(c);i=c.double()}return f}wNAF(t,r,n){if(!this.Fn.isValid(n))throw new Error("invalid scalar");let o=this.ZERO,f=this.BASE,i=ye(t,this.bits);for(let c=0;c<i.windows;c++){let{nextN:s,offset:l,isZero:m,isNeg:h,isNegF:B,offsetF:E}=sn(n,c,i);n=s,m?f=f.add(Vt(B,r[E])):o=o.add(Vt(h,r[l]))}return cn(n),{p:o,f}}wNAFUnsafe(t,r,n,o=this.ZERO){let f=ye(t,this.bits);for(let i=0;i<f.windows&&n!==Ot;i++){let{nextN:c,offset:s,isZero:l,isNeg:m}=sn(n,i,f);if(n=c,!l){let h=r[s];o=o.add(m?h.negate():h)}}return cn(n),o}getPrecomputes(t,r,n){let o=we.get(r);return o||(o=this.precomputeWindow(r,t),t!==1&&(typeof n=="function"&&(o=n(o)),we.set(r,o))),o}cached(t,r,n){let o=Ee(t);return this.wNAF(o,this.getPrecomputes(o,t,n),r)}unsafe(t,r,n,o){let f=Ee(t);return f===1?this._unsafeLadder(t,r,o):this.wNAFUnsafe(f,this.getPrecomputes(f,t,n),r,o)}createCache(t,r){dn(r,this.bits),un.set(t,r),we.delete(t)}hasCache(t){return Ee(t)!==1}};function ln(e,t,r,n){let o=t,f=e.ZERO,i=e.ZERO;for(;r>Ot||n>Ot;)r&Bt&&(f=f.add(o)),n&Bt&&(i=i.add(o)),o=o.double(),r>>=Bt,n>>=Bt;return{p1:f,p2:i}}function an(e,t,r){if(t){if(t.ORDER!==e)throw new Error("Field.ORDER must match order: Fp == p, Fn == n");return me(t),t}else return Rt(e,{isLE:r})}function zt(e,t,r={},n){if(n===void 0&&(n=e==="edwards"),!t||typeof t!="object")throw new Error(`expected valid ${e} CURVE object`);for(let s of["p","n","h"]){let l=t[s];if(!(typeof l=="bigint"&&l>Ot))throw new Error(`CURVE.${s} must be positive bigint`)}let o=an(t.p,r.Fp,n),f=an(t.n,r.Fn,n),c=["Gx","Gy","a",e==="weierstrass"?"b":"d"];for(let s of c)if(!o.isValid(t[s]))throw new Error(`CURVE.${s} must be valid field element of CURVE.Fp`);return t=Object.freeze(Object.assign({},t)),{CURVE:t,Fp:o,Fn:f}}function $t(e,t){return function(n){let o=e(n);return{secretKey:o,publicKey:t(o)}}}var Pt=class{oHash;iHash;blockLen;outputLen;finished=!1;destroyed=!1;constructor(t,r){if(Yt(t),N(r,void 0,"key"),this.iHash=t.create(),typeof this.iHash.update!="function")throw new Error("Expected instance of class which extends utils.Hash");this.blockLen=this.iHash.blockLen,this.outputLen=this.iHash.outputLen;let n=this.blockLen,o=new Uint8Array(n);o.set(r.length>n?t.create().update(r).digest():r);for(let f=0;f<o.length;f++)o[f]^=54;this.iHash.update(o),this.oHash=t.create();for(let f=0;f<o.length;f++)o[f]^=106;this.oHash.update(o),it(o)}update(t){return St(this),this.iHash.update(t),this}digestInto(t){St(this),N(t,this.outputLen,"output"),this.finished=!0,this.iHash.digestInto(t),this.oHash.update(t),this.oHash.digestInto(t),this.destroy()}digest(){let t=new Uint8Array(this.oHash.outputLen);return this.digestInto(t),t}_cloneInto(t){t||=Object.create(Object.getPrototypeOf(this),{});let{oHash:r,iHash:n,finished:o,destroyed:f,blockLen:i,outputLen:c}=this;return t=t,t.finished=o,t.destroyed=f,t.blockLen=i,t.outputLen=c,t.oHash=r._cloneInto(t.oHash),t.iHash=n._cloneInto(t.iHash),t}clone(){return this._cloneInto()}destroy(){this.destroyed=!0,this.oHash.destroy(),this.iHash.destroy()}},Be=(e,t,r)=>new Pt(e,t).update(r).digest();Be.create=(e,t)=>new Pt(e,t);var hn=(e,t)=>(e+(e>=0?t:-t)/bn)/t;function jn(e,t,r){let[[n,o],[f,i]]=t,c=hn(i*e,r),s=hn(-o*e,r),l=e-c*n-s*f,m=-c*o-s*i,h=l<dt,B=m<dt;h&&(l=-l),B&&(m=-m);let E=Zt(Math.ceil(he(r)/2))+Tt;if(l<dt||l>=E||m<dt||m>=E)throw new Error("splitScalar (endomorphism): failed, k="+e);return{k1neg:h,k1:l,k2neg:B,k2:m}}function Se(e){if(!["compact","recovered","der"].includes(e))throw new Error('Signature format must be "compact", "recovered", or "der"');return e}function ve(e,t){let r={};for(let n of Object.keys(t))r[n]=e[n]===void 0?t[n]:e[n];return at(r.lowS,"lowS"),at(r.prehash,"prehash"),r.format!==void 0&&Se(r.format),r}var _e=class extends Error{constructor(t=""){super(t)}},xt={Err:_e,_tlv:{encode:(e,t)=>{let{Err:r}=xt;if(e<0||e>256)throw new r("tlv.encode: wrong tag");if(t.length&1)throw new r("tlv.encode: unpadded data");let n=t.length/2,o=Nt(n);if(o.length/2&128)throw new r("tlv.encode: long form length too big");let f=n>127?Nt(o.length/2|128):"";return Nt(e)+f+o+t},decode(e,t){let{Err:r}=xt,n=0;if(e<0||e>256)throw new r("tlv.encode: wrong tag");if(t.length<2||t[n++]!==e)throw new r("tlv.decode: wrong tlv");let o=t[n++],f=!!(o&128),i=0;if(!f)i=o;else{let s=o&127;if(!s)throw new r("tlv.decode(long): indefinite length not supported");if(s>4)throw new r("tlv.decode(long): byte length is too big");let l=t.subarray(n,n+s);if(l.length!==s)throw new r("tlv.decode: length bytes not complete");if(l[0]===0)throw new r("tlv.decode(long): zero leftmost byte");for(let m of l)i=i<<8|m;if(n+=s,i<128)throw new r("tlv.decode(long): not minimal encoding")}let c=t.subarray(n,n+i);if(c.length!==i)throw new r("tlv.decode: wrong value length");return{v:c,l:t.subarray(n+i)}}},_int:{encode(e){let{Err:t}=xt;if(e<dt)throw new t("integer: negative integers are not allowed");let r=Nt(e);if(Number.parseInt(r[0],16)&8&&(r="00"+r),r.length&1)throw new t("unexpected DER parsing assertion: unpadded hex");return r},decode(e){let{Err:t}=xt;if(e[0]&128)throw new t("invalid signature integer: negative");if(e[0]===0&&!(e[1]&128))throw new t("invalid signature integer: unnecessary leading zero");return It(e)}},toSig(e){let{Err:t,_int:r,_tlv:n}=xt,o=N(e,void 0,"signature"),{v:f,l:i}=n.decode(48,o);if(i.length)throw new t("invalid signature: left bytes after parsing");let{v:c,l:s}=n.decode(2,f),{v:l,l:m}=n.decode(2,s);if(m.length)throw new t("invalid signature: left bytes after parsing");return{r:r.decode(c),s:r.decode(l)}},hexFromSig(e){let{_tlv:t,_int:r}=xt,n=t.encode(2,r.encode(e.r)),o=t.encode(2,r.encode(e.s)),f=n+o;return t.encode(48,f)}},dt=BigInt(0),Tt=BigInt(1),bn=BigInt(2),Qt=BigInt(3),Wn=BigInt(4);function Jt(e,t={}){let r=zt("weierstrass",e,t),{Fp:n,Fn:o}=r,f=r.CURVE,{h:i,n:c}=f;bt(t,{},{allowInfinityPoint:"boolean",clearCofactor:"function",isTorsionFree:"function",fromBytes:"function",toBytes:"function",endo:"object"});let{endo:s}=t;if(s&&(!n.is0(f.a)||typeof s.beta!="bigint"||!Array.isArray(s.basises)))throw new Error('invalid endo: expected "beta": bigint and "basises": array');let l=mn(n,o);function m(){if(!n.isOdd)throw new Error("compression is not supported: Field does not have .isOdd()")}function h(R,d,u){let{x:a,y}=d.toAffine(),S=n.toBytes(a);if(at(u,"isCompressed"),u){m();let A=!n.isOdd(y);return F(xn(A),S)}else return F(Uint8Array.of(4),S,n.toBytes(y))}function B(R){N(R,void 0,"Point");let{publicKey:d,publicKeyUncompressed:u}=l,a=R.length,y=R[0],S=R.subarray(1);if(a===d&&(y===2||y===3)){let A=n.fromBytes(S);if(!n.isValid(A))throw new Error("bad point: is not on curve, wrong x");let O=L(A),_;try{_=n.sqrt(O)}catch(X){let Y=X instanceof Error?": "+X.message:"";throw new Error("bad point: is not on curve, sqrt error"+Y)}m();let H=n.isOdd(_);return(y&1)===1!==H&&(_=n.neg(_)),{x:A,y:_}}else if(a===u&&y===4){let A=n.BYTES,O=n.fromBytes(S.subarray(0,A)),_=n.fromBytes(S.subarray(A,A*2));if(!v(O,_))throw new Error("bad point: is not on curve");return{x:O,y:_}}else throw new Error(`bad point: got length ${a}, expected compressed=${d} or uncompressed=${u}`)}let E=t.toBytes||h,g=t.fromBytes||B;function L(R){let d=n.sqr(R),u=n.mul(d,R);return n.add(n.add(u,n.mul(R,f.a)),f.b)}function v(R,d){let u=n.sqr(d),a=L(R);return n.eql(u,a)}if(!v(f.Gx,f.Gy))throw new Error("bad curve params: generator point");let x=n.mul(n.pow(f.a,Qt),Wn),I=n.mul(n.sqr(f.b),BigInt(27));if(n.is0(n.add(x,I)))throw new Error("bad curve params: a or b");function p(R,d,u=!1){if(!n.isValid(d)||u&&n.is0(d))throw new Error(`bad point coordinate ${R}`);return d}function T(R){if(!(R instanceof b))throw new Error("Weierstrass Point expected")}function Z(R){if(!s||!s.basises)throw new Error("no endo");return jn(R,s.basises,o.ORDER)}let V=At((R,d)=>{let{X:u,Y:a,Z:y}=R;if(n.eql(y,n.ONE))return{x:u,y:a};let S=R.is0();d==null&&(d=S?n.ONE:n.inv(y));let A=n.mul(u,d),O=n.mul(a,d),_=n.mul(y,d);if(S)return{x:n.ZERO,y:n.ZERO};if(!n.eql(_,n.ONE))throw new Error("invZ was invalid");return{x:A,y:O}}),M=At(R=>{if(R.is0()){if(t.allowInfinityPoint&&!n.is0(R.Y))return;throw new Error("bad point: ZERO")}let{x:d,y:u}=R.toAffine();if(!n.isValid(d)||!n.isValid(u))throw new Error("bad point: x or y not field elements");if(!v(d,u))throw new Error("bad point: equation left != right");if(!R.isTorsionFree())throw new Error("bad point: not in prime-order subgroup");return!0});function w(R,d,u,a,y){return u=new b(n.mul(u.X,R),u.Y,u.Z),d=Vt(a,d),u=Vt(y,u),d.add(u)}class b{static BASE=new b(f.Gx,f.Gy,n.ONE);static ZERO=new b(n.ZERO,n.ONE,n.ZERO);static Fp=n;static Fn=o;X;Y;Z;constructor(d,u,a){this.X=p("x",d),this.Y=p("y",u,!0),this.Z=p("z",a),Object.freeze(this)}static CURVE(){return f}static fromAffine(d){let{x:u,y:a}=d||{};if(!d||!n.isValid(u)||!n.isValid(a))throw new Error("invalid affine point");if(d instanceof b)throw new Error("projective point not allowed");return n.is0(u)&&n.is0(a)?b.ZERO:new b(u,a,n.ONE)}static fromBytes(d){let u=b.fromAffine(g(N(d,void 0,"point")));return u.assertValidity(),u}static fromHex(d){return b.fromBytes(nt(d))}get x(){return this.toAffine().x}get y(){return this.toAffine().y}precompute(d=8,u=!0){return D.createCache(this,d),u||this.multiply(Qt),this}assertValidity(){M(this)}hasEvenY(){let{y:d}=this.toAffine();if(!n.isOdd)throw new Error("Field doesn't support isOdd");return!n.isOdd(d)}equals(d){T(d);let{X:u,Y:a,Z:y}=this,{X:S,Y:A,Z:O}=d,_=n.eql(n.mul(u,O),n.mul(S,y)),H=n.eql(n.mul(a,O),n.mul(A,y));return _&&H}negate(){return new b(this.X,n.neg(this.Y),this.Z)}double(){let{a:d,b:u}=f,a=n.mul(u,Qt),{X:y,Y:S,Z:A}=this,O=n.ZERO,_=n.ZERO,H=n.ZERO,U=n.mul(y,y),X=n.mul(S,S),Y=n.mul(A,A),C=n.mul(y,S);return C=n.add(C,C),H=n.mul(y,A),H=n.add(H,H),O=n.mul(d,H),_=n.mul(a,Y),_=n.add(O,_),O=n.sub(X,_),_=n.add(X,_),_=n.mul(O,_),O=n.mul(C,O),H=n.mul(a,H),Y=n.mul(d,Y),C=n.sub(U,Y),C=n.mul(d,C),C=n.add(C,H),H=n.add(U,U),U=n.add(H,U),U=n.add(U,Y),U=n.mul(U,C),_=n.add(_,U),Y=n.mul(S,A),Y=n.add(Y,Y),U=n.mul(Y,C),O=n.sub(O,U),H=n.mul(Y,X),H=n.add(H,H),H=n.add(H,H),new b(O,_,H)}add(d){T(d);let{X:u,Y:a,Z:y}=this,{X:S,Y:A,Z:O}=d,_=n.ZERO,H=n.ZERO,U=n.ZERO,X=f.a,Y=n.mul(f.b,Qt),C=n.mul(u,S),G=n.mul(a,A),$=n.mul(y,O),rt=n.add(u,a),K=n.add(S,A);rt=n.mul(rt,K),K=n.add(C,G),rt=n.sub(rt,K),K=n.add(u,y);let Q=n.add(S,O);return K=n.mul(K,Q),Q=n.add(C,$),K=n.sub(K,Q),Q=n.add(a,y),_=n.add(A,O),Q=n.mul(Q,_),_=n.add(G,$),Q=n.sub(Q,_),U=n.mul(X,K),_=n.mul(Y,$),U=n.add(_,U),_=n.sub(G,U),U=n.add(G,U),H=n.mul(_,U),G=n.add(C,C),G=n.add(G,C),$=n.mul(X,$),K=n.mul(Y,K),G=n.add(G,$),$=n.sub(C,$),$=n.mul(X,$),K=n.add(K,$),C=n.mul(G,K),H=n.add(H,C),C=n.mul(Q,K),_=n.mul(rt,_),_=n.sub(_,C),C=n.mul(rt,G),U=n.mul(Q,U),U=n.add(U,C),new b(_,H,U)}subtract(d){return this.add(d.negate())}is0(){return this.equals(b.ZERO)}multiply(d){let{endo:u}=t;if(!o.isValidNot0(d))throw new Error("invalid scalar: out of range");let a,y,S=A=>D.cached(this,A,O=>vt(b,O));if(u){let{k1neg:A,k1:O,k2neg:_,k2:H}=Z(d),{p:U,f:X}=S(O),{p:Y,f:C}=S(H);y=X.add(C),a=w(u.beta,U,Y,A,_)}else{let{p:A,f:O}=S(d);a=A,y=O}return vt(b,[a,y])[0]}multiplyUnsafe(d){let{endo:u}=t,a=this;if(!o.isValid(d))throw new Error("invalid scalar: out of range");if(d===dt||a.is0())return b.ZERO;if(d===Tt)return a;if(D.hasCache(this))return this.multiply(d);if(u){let{k1neg:y,k1:S,k2neg:A,k2:O}=Z(d),{p1:_,p2:H}=ln(b,a,S,O);return w(u.beta,_,H,y,A)}else return D.unsafe(a,d)}toAffine(d){return V(this,d)}isTorsionFree(){let{isTorsionFree:d}=t;return i===Tt?!0:d?d(b,this):D.unsafe(this,c).is0()}clearCofactor(){let{clearCofactor:d}=t;return i===Tt?this:d?d(b,this):this.multiplyUnsafe(i)}isSmallOrder(){return this.multiplyUnsafe(i).is0()}toBytes(d=!0){return at(d,"isCompressed"),this.assertValidity(),E(b,this,d)}toHex(d=!0){return et(this.toBytes(d))}toString(){return`<Point ${this.is0()?"ZERO":this.toHex()}>`}}let q=o.BITS,D=new Ht(b,t.endo?Math.ceil(q/2):q);return b.BASE.precompute(8),b}function xn(e){return Uint8Array.of(e?2:3)}function mn(e,t){return{secretKey:t.BYTES,publicKey:1+e.BYTES,publicKeyUncompressed:1+2*e.BYTES,publicKeyHasPrefix:!0,signature:2*t.BYTES}}function zn(e,t={}){let{Fn:r}=e,n=t.randomBytes||_t,o=Object.assign(mn(e.Fp,r),{seed:pe(r.ORDER)});function f(E){try{let g=r.fromBytes(E);return r.isValidNot0(g)}catch{return!1}}function i(E,g){let{publicKey:L,publicKeyUncompressed:v}=o;try{let x=E.length;return g===!0&&x!==L||g===!1&&x!==v?!1:!!e.fromBytes(E)}catch{return!1}}function c(E=n(o.seed)){return ge(N(E,o.seed,"seed"),r.ORDER)}function s(E,g=!0){return e.BASE.multiply(r.fromBytes(E)).toBytes(g)}function l(E){let{secretKey:g,publicKey:L,publicKeyUncompressed:v}=o;if(!pt(E)||"_lengths"in r&&r._lengths||g===L)return;let x=N(E,void 0,"key").length;return x===L||x===v}function m(E,g,L=!0){if(l(E)===!0)throw new Error("first arg must be private key");if(l(g)===!1)throw new Error("second arg must be public key");let v=r.fromBytes(E);return e.fromBytes(g).multiply(v).toBytes(L)}let h={isValidSecretKey:f,isValidPublicKey:i,randomSecretKey:c},B=$t(c,s);return Object.freeze({getPublicKey:s,getSharedSecret:m,keygen:B,Point:e,utils:h,lengths:o})}function Ft(e,t,r={}){Yt(t),bt(r,{},{hmac:"function",lowS:"boolean",randomBytes:"function",bits2int:"function",bits2int_modN:"function"}),r=Object.assign({},r);let n=r.randomBytes||_t,o=r.hmac||((u,a)=>Be(t,u,a)),{Fp:f,Fn:i}=e,{ORDER:c,BITS:s}=i,{keygen:l,getPublicKey:m,getSharedSecret:h,utils:B,lengths:E}=zn(e,r),g={prehash:!0,lowS:typeof r.lowS=="boolean"?r.lowS:!0,format:"compact",extraEntropy:!1},L=c*bn<f.ORDER;function v(u){let a=c>>Tt;return u>a}function x(u,a){if(!i.isValidNot0(a))throw new Error(`invalid signature ${u}: out of range 1..Point.Fn.ORDER`);return a}function I(){if(L)throw new Error('"recovered" sig type is not supported for cofactor >2 curves')}function p(u,a){Se(a);let y=E.signature,S=a==="compact"?y:a==="recovered"?y+1:void 0;return N(u,S)}class T{r;s;recovery;constructor(a,y,S){if(this.r=x("r",a),this.s=x("s",y),S!=null){if(I(),![0,1,2,3].includes(S))throw new Error("invalid recovery id");this.recovery=S}Object.freeze(this)}static fromBytes(a,y=g.format){p(a,y);let S;if(y==="der"){let{r:H,s:U}=xt.toSig(N(a));return new T(H,U)}y==="recovered"&&(S=a[0],y="compact",a=a.subarray(1));let A=E.signature/2,O=a.subarray(0,A),_=a.subarray(A,A*2);return new T(i.fromBytes(O),i.fromBytes(_),S)}static fromHex(a,y){return this.fromBytes(nt(a),y)}assertRecovery(){let{recovery:a}=this;if(a==null)throw new Error("invalid recovery id: must be present");return a}addRecoveryBit(a){return new T(this.r,this.s,a)}recoverPublicKey(a){let{r:y,s:S}=this,A=this.assertRecovery(),O=A===2||A===3?y+c:y;if(!f.isValid(O))throw new Error("invalid recovery id: sig.r+curve.n != R.x");let _=f.toBytes(O),H=e.fromBytes(F(xn((A&1)===0),_)),U=i.inv(O),X=V(N(a,void 0,"msgHash")),Y=i.create(-X*U),C=i.create(S*U),G=e.BASE.multiplyUnsafe(Y).add(H.multiplyUnsafe(C));if(G.is0())throw new Error("invalid recovery: point at infinify");return G.assertValidity(),G}hasHighS(){return v(this.s)}toBytes(a=g.format){if(Se(a),a==="der")return nt(xt.hexFromSig(this));let{r:y,s:S}=this,A=i.toBytes(y),O=i.toBytes(S);return a==="recovered"?(I(),F(Uint8Array.of(this.assertRecovery()),A,O)):F(A,O)}toHex(a){return et(this.toBytes(a))}}let Z=r.bits2int||function(a){if(a.length>8192)throw new Error("input is too large");let y=It(a),S=a.length*8-s;return S>0?y>>BigInt(S):y},V=r.bits2int_modN||function(a){return i.create(Z(a))},M=Zt(s);function w(u){return Dt("num < 2^"+s,u,dt,M),i.toBytes(u)}function b(u,a){return N(u,void 0,"message"),a?N(t(u),void 0,"prehashed message"):u}function q(u,a,y){let{lowS:S,prehash:A,extraEntropy:O}=ve(y,g);u=b(u,A);let _=V(u),H=i.fromBytes(a);if(!i.isValidNot0(H))throw new Error("invalid private key");let U=[w(H),w(_)];if(O!=null&&O!==!1){let G=O===!0?n(E.secretKey):O;U.push(N(G,void 0,"extraEntropy"))}let X=F(...U),Y=_;function C(G){let $=Z(G);if(!i.isValidNot0($))return;let rt=i.inv($),K=e.BASE.multiply($).toAffine(),Q=i.create(K.x);if(Q===dt)return;let Mt=i.create(rt*i.create(Y+Q*H));if(Mt===dt)return;let He=(K.x===Q?0:2)|Number(K.y&Tt),Te=Mt;return S&&v(Mt)&&(Te=i.neg(Mt),He^=1),new T(Q,Te,L?void 0:He)}return{seed:X,k2sig:C}}function D(u,a,y={}){let{seed:S,k2sig:A}=q(u,a,y);return ze(t.outputLen,i.BYTES,o)(S,A).toBytes(y.format)}function R(u,a,y,S={}){let{lowS:A,prehash:O,format:_}=ve(S,g);if(y=N(y,void 0,"publicKey"),a=b(a,O),!pt(u)){let H=u instanceof T?", use sig.toBytes()":"";throw new Error("verify expects Uint8Array signature"+H)}p(u,_);try{let H=T.fromBytes(u,_),U=e.fromBytes(y);if(A&&H.hasHighS())return!1;let{r:X,s:Y}=H,C=V(a),G=i.inv(Y),$=i.create(C*G),rt=i.create(X*G),K=e.BASE.multiplyUnsafe($).add(U.multiplyUnsafe(rt));return K.is0()?!1:i.create(K.x)===X}catch{return!1}}function d(u,a,y={}){let{prehash:S}=ve(y,g);return a=b(a,S),T.fromBytes(u,"recovered").recoverPublicKey(a).toBytes()}return Object.freeze({keygen:l,getPublicKey:m,getSharedSecret:h,utils:B,lengths:E,Point:e,sign:D,verify:R,recoverPublicKey:d,Signature:T,hash:t})}var Ae={p:BigInt("0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f"),n:BigInt("0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141"),h:BigInt(1),a:BigInt(0),b:BigInt(7),Gx:BigInt("0x79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798"),Gy:BigInt("0x483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8")},Pn={beta:BigInt("0x7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee"),basises:[[BigInt("0x3086d221a7d46bcde86c90e49284eb15"),-BigInt("0xe4437ed6010e88286f547fa90abfe4c3")],[BigInt("0x114ca50f7a8e2f3f657c1108d9d44cfd8"),BigInt("0x3086d221a7d46bcde86c90e49284eb15")]]};var pn=BigInt(2);function Qn(e){let t=Ae.p,r=BigInt(3),n=BigInt(6),o=BigInt(11),f=BigInt(22),i=BigInt(23),c=BigInt(44),s=BigInt(88),l=e*e*e%t,m=l*l*e%t,h=k(m,r,t)*m%t,B=k(h,r,t)*m%t,E=k(B,pn,t)*l%t,g=k(E,o,t)*E%t,L=k(g,f,t)*g%t,v=k(L,c,t)*L%t,x=k(v,s,t)*v%t,I=k(x,c,t)*L%t,p=k(I,r,t)*m%t,T=k(p,i,t)*g%t,Z=k(T,n,t)*l%t,V=k(Z,pn,t);if(!Ie.eql(Ie.sqr(V),e))throw new Error("Cannot find square root");return V}var Ie=Rt(Ae.p,{sqrt:Qn}),Jn=Jt(Ae,{Fp:Ie,endo:Pn}),gn=Ft(Jn,Gt);var mt=BigInt(0),z=BigInt(1),Re=BigInt(2),Fn=BigInt(8);function tr(e,t,r,n){let o=e.sqr(r),f=e.sqr(n),i=e.add(e.mul(t.a,o),f),c=e.add(e.ONE,e.mul(t.d,e.mul(o,f)));return e.eql(i,c)}function yn(e,t={}){let r=zt("edwards",e,t,t.FpFnLE),{Fp:n,Fn:o}=r,f=r.CURVE,{h:i}=f;bt(t,{},{uvRatio:"function"});let c=Re<<BigInt(o.BYTES*8)-z,s=v=>n.create(v),l=t.uvRatio||((v,x)=>{try{return{isValid:!0,value:n.sqrt(n.div(v,x))}}catch{return{isValid:!1,value:mt}}});if(!tr(n,f,f.Gx,f.Gy))throw new Error("bad curve params: generator point");function m(v,x,I=!1){let p=I?z:mt;return Dt("coordinate "+v,x,p,c),x}function h(v){if(!(v instanceof g))throw new Error("EdwardsPoint expected")}let B=At((v,x)=>{let{X:I,Y:p,Z:T}=v,Z=v.is0();x==null&&(x=Z?Fn:n.inv(T));let V=s(I*x),M=s(p*x),w=n.mul(T,x);if(Z)return{x:mt,y:z};if(w!==z)throw new Error("invZ was invalid");return{x:V,y:M}}),E=At(v=>{let{a:x,d:I}=f;if(v.is0())throw new Error("bad point: ZERO");let{X:p,Y:T,Z,T:V}=v,M=s(p*p),w=s(T*T),b=s(Z*Z),q=s(b*b),D=s(M*x),R=s(b*s(D+w)),d=s(q+s(I*s(M*w)));if(R!==d)throw new Error("bad point: equation left != right (1)");let u=s(p*T),a=s(Z*V);if(u!==a)throw new Error("bad point: equation left != right (2)");return!0});class g{static BASE=new g(f.Gx,f.Gy,z,s(f.Gx*f.Gy));static ZERO=new g(mt,z,z,mt);static Fp=n;static Fn=o;X;Y;Z;T;constructor(x,I,p,T){this.X=m("x",x),this.Y=m("y",I),this.Z=m("z",p,!0),this.T=m("t",T),Object.freeze(this)}static CURVE(){return f}static fromAffine(x){if(x instanceof g)throw new Error("extended point not allowed");let{x:I,y:p}=x||{};return m("x",I),m("y",p),new g(I,p,z,s(I*p))}static fromBytes(x,I=!1){let p=n.BYTES,{a:T,d:Z}=f;x=Wt(N(x,p,"point")),at(I,"zip215");let V=Wt(x),M=x[p-1];V[p-1]=M&-129;let w=wt(V),b=I?c:n.ORDER;Dt("point.y",w,mt,b);let q=s(w*w),D=s(q-z),R=s(Z*q-T),{isValid:d,value:u}=l(D,R);if(!d)throw new Error("bad point: invalid y coordinate");let a=(u&z)===z,y=(M&128)!==0;if(!I&&u===mt&&y)throw new Error("bad point: x=0 and x_0=1");return y!==a&&(u=s(-u)),g.fromAffine({x:u,y:w})}static fromHex(x,I=!1){return g.fromBytes(nt(x),I)}get x(){return this.toAffine().x}get y(){return this.toAffine().y}precompute(x=8,I=!0){return L.createCache(this,x),I||this.multiply(Re),this}assertValidity(){E(this)}equals(x){h(x);let{X:I,Y:p,Z:T}=this,{X:Z,Y:V,Z:M}=x,w=s(I*M),b=s(Z*T),q=s(p*M),D=s(V*T);return w===b&&q===D}is0(){return this.equals(g.ZERO)}negate(){return new g(s(-this.X),this.Y,this.Z,s(-this.T))}double(){let{a:x}=f,{X:I,Y:p,Z:T}=this,Z=s(I*I),V=s(p*p),M=s(Re*s(T*T)),w=s(x*Z),b=I+p,q=s(s(b*b)-Z-V),D=w+V,R=D-M,d=w-V,u=s(q*R),a=s(D*d),y=s(q*d),S=s(R*D);return new g(u,a,S,y)}add(x){h(x);let{a:I,d:p}=f,{X:T,Y:Z,Z:V,T:M}=this,{X:w,Y:b,Z:q,T:D}=x,R=s(T*w),d=s(Z*b),u=s(M*p*D),a=s(V*q),y=s((T+Z)*(w+b)-R-d),S=a-u,A=a+u,O=s(d-I*R),_=s(y*S),H=s(A*O),U=s(y*O),X=s(S*A);return new g(_,H,X,U)}subtract(x){return this.add(x.negate())}multiply(x){if(!o.isValidNot0(x))throw new Error("invalid scalar: expected 1 <= sc < curve.n");let{p:I,f:p}=L.cached(this,x,T=>vt(g,T));return vt(g,[I,p])[0]}multiplyUnsafe(x,I=g.ZERO){if(!o.isValid(x))throw new Error("invalid scalar: expected 0 <= sc < curve.n");return x===mt?g.ZERO:this.is0()||x===z?this:L.unsafe(this,x,p=>vt(g,p),I)}isSmallOrder(){return this.multiplyUnsafe(i).is0()}isTorsionFree(){return L.unsafe(this,f.n).is0()}toAffine(x){return B(this,x)}clearCofactor(){return i===z?this:this.multiplyUnsafe(i)}toBytes(){let{x,y:I}=this.toAffine(),p=n.toBytes(I);return p[p.length-1]|=x&z?128:0,p}toHex(){return et(this.toBytes())}toString(){return`<Point ${this.is0()?"ZERO":this.toHex()}>`}}let L=new Ht(g,o.BITS);return g.BASE.precompute(8),g}function wn(e,t,r={}){if(typeof t!="function")throw new Error('"hash" function param is required');bt(r,{},{adjustScalarBytes:"function",randomBytes:"function",domain:"function",prehash:"function",mapToCurve:"function"});let{prehash:n}=r,{BASE:o,Fp:f,Fn:i}=e,c=r.randomBytes||_t,s=r.adjustScalarBytes||(w=>w),l=r.domain||((w,b,q)=>{if(at(q,"phflag"),b.length||q)throw new Error("Contexts/pre-hash are not supported");return w});function m(w){return i.create(wt(w))}function h(w){let b=p.secretKey;N(w,p.secretKey,"secretKey");let q=N(t(w),2*b,"hashedSecretKey"),D=s(q.slice(0,b)),R=q.slice(b,2*b),d=m(D);return{head:D,prefix:R,scalar:d}}function B(w){let{head:b,prefix:q,scalar:D}=h(w),R=o.multiply(D),d=R.toBytes();return{head:b,prefix:q,scalar:D,point:R,pointBytes:d}}function E(w){return B(w).pointBytes}function g(w=Uint8Array.of(),...b){let q=F(...b);return m(t(l(q,N(w,void 0,"context"),!!n)))}function L(w,b,q={}){w=N(w,void 0,"message"),n&&(w=n(w));let{prefix:D,scalar:R,pointBytes:d}=B(b),u=g(q.context,D,w),a=o.multiply(u).toBytes(),y=g(q.context,a,d,w),S=i.create(u+y*R);if(!i.isValid(S))throw new Error("sign failed: invalid s");let A=F(a,i.toBytes(S));return N(A,p.signature,"result")}let v={zip215:!0};function x(w,b,q,D=v){let{context:R,zip215:d}=D,u=p.signature;w=N(w,u,"signature"),b=N(b,void 0,"message"),q=N(q,p.publicKey,"publicKey"),d!==void 0&&at(d,"zip215"),n&&(b=n(b));let a=u/2,y=w.subarray(0,a),S=wt(w.subarray(a,u)),A,O,_;try{A=e.fromBytes(q,d),O=e.fromBytes(y,d),_=o.multiplyUnsafe(S)}catch{return!1}if(!d&&A.isSmallOrder())return!1;let H=g(R,O.toBytes(),A.toBytes(),b);return O.add(A.multiplyUnsafe(H)).subtract(_).clearCofactor().is0()}let I=f.BYTES,p={secretKey:I,publicKey:I,signature:2*I,seed:I};function T(w=c(p.seed)){return N(w,p.seed,"seed")}function Z(w){return pt(w)&&w.length===i.BYTES}function V(w,b){try{return!!e.fromBytes(w,b)}catch{return!1}}let M={getExtendedPublicKey:B,randomSecretKey:T,isValidSecretKey:Z,isValidPublicKey:V,toMontgomery(w){let{y:b}=e.fromBytes(w),q=p.publicKey,D=q===32;if(!D&&q!==57)throw new Error("only defined for 25519 and 448");let R=D?f.div(z+b,z-b):f.div(b-z,b+z);return f.toBytes(R)},toMontgomerySecret(w){let b=p.secretKey;N(w,b);let q=t(w.subarray(0,b));return s(q).subarray(0,b)}};return Object.freeze({keygen:$t(T,E),getPublicKey:E,sign:L,verify:x,utils:M,Point:e,lengths:p})}var er=BigInt(1),En=BigInt(2);var nr=BigInt(5),rr=BigInt(8),Oe=BigInt("0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffed"),or={p:Oe,n:BigInt("0x1000000000000000000000000000000014def9dea2f79cd65812631a5cf5d3ed"),h:rr,a:BigInt("0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffec"),d:BigInt("0x52036cee2b6ffe738cc740797779e89800700a4d4141d8ab75eb4dca135978a3"),Gx:BigInt("0x216936d3cd6e53fec0a4e231fdd6dc5c692cc7609525a7b2c9562d608f25d51a"),Gy:BigInt("0x6666666666666666666666666666666666666666666666666666666666666658")};function fr(e){let t=BigInt(10),r=BigInt(20),n=BigInt(40),o=BigInt(80),f=Oe,c=e*e%f*e%f,s=k(c,En,f)*c%f,l=k(s,er,f)*e%f,m=k(l,nr,f)*l%f,h=k(m,t,f)*m%f,B=k(h,r,f)*h%f,E=k(B,n,f)*B%f,g=k(E,o,f)*E%f,L=k(g,o,f)*E%f,v=k(L,t,f)*m%f;return{pow_p_5_8:k(v,En,f)*e%f,b2:c}}function sr(e){return e[0]&=248,e[31]&=127,e[31]|=64,e}var Bn=BigInt("19681161376707505956807079304988542015446066515923890162744021073123829784752");function ir(e,t){let r=Oe,n=j(t*t*t,r),o=j(n*n*t,r),f=fr(e*o).pow_p_5_8,i=j(e*n*f,r),c=j(t*i*i,r),s=i,l=j(i*Bn,r),m=c===e,h=c===j(-e,r),B=c===j(-e*Bn,r);return m&&(i=s),(h||B)&&(i=l),on(i,r)&&(i=j(-i,r)),{isValid:m||h,value:i}}var cr=yn(or,{uvRatio:ir});function ar(e){return wn(cr,ae,Object.assign({adjustScalarBytes:sr},e))}var vn=ar({});var dr={p:BigInt("0xffffffff00000001000000000000000000000000ffffffffffffffffffffffff"),n:BigInt("0xffffffff00000000ffffffffffffffffbce6faada7179e84f3b9cac2fc632551"),h:BigInt(1),a:BigInt("0xffffffff00000001000000000000000000000000fffffffffffffffffffffffc"),b:BigInt("0x5ac635d8aa3a93e7b3ebbd55769886bc651d06b0cc53b0f63bce3c3e27d2604b"),Gx:BigInt("0x6b17d1f2e12c4247f8bce6e563a440f277037d812deb33a0f4a13945d898c296"),Gy:BigInt("0x4fe342e2fe1a7f9b8ee7eb4a7c0f9e162bce33576b315ececbb6406837bf51f5")};var ur=Jt(dr),Sn=Ft(ur,Gt);return Hn(lr);})();
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

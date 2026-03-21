/*

import Maybe exposing (Just, Nothing)

*/


// NOBLE/CURVES BUNDLE (https://github.com/paulmillr/noble-curves, MIT License)
// Embedded: @noble/curves 2.0.1 - secp256k1, ed25519, P-256

var xn=Object.defineProperty;var Bn=(ir,or,Er)=>or in ir?xn(ir,or,{enumerable:!0,configurable:!0,writable:!0,value:Er}):ir[or]=Er;var y=(ir,or,Er)=>Bn(ir,typeof or!="symbol"?or+"":or,Er);var _Crypto_noble=(()=>{var ir=Object.defineProperty,or=Object.getOwnPropertyDescriptor,Er=Object.getOwnPropertyNames,fe=Object.prototype.hasOwnProperty,se=(r,t)=>{for(var n in t)ir(r,n,{get:t[n],enumerable:!0})},ue=(r,t,n,e)=>{if(t&&typeof t=="object"||typeof t=="function"){var o=function(a){!fe.call(r,a)&&a!==n&&ir(r,a,{get:()=>t[a],enumerable:!(e=or(t,a))||e.enumerable})};for(var i of Er(t))o(i)}return r},ce=r=>ue(ir({},"__esModule",{value:!0}),r),vt={};se(vt,{bytesToHex:()=>Br,ed25519:()=>bn,hexToBytes:()=>Ir,p256:()=>mn,secp256k1:()=>rn,x25519:()=>yn});function kr(r){return r instanceof Uint8Array||ArrayBuffer.isView(r)&&r.constructor.name==="Uint8Array"}function gr(r,t=""){if(!Number.isSafeInteger(r)||r<0){var n=t&&`"${t}" `;throw new Error(`${n}expected integer >= 0, got ${r}`)}}function j(r,t,n=""){var e=kr(r),o=r==null?void 0:r.length,i=t!==void 0;if(!e||i&&o!==t){var a=n&&`"${n}" `,u=i?` of length ${t}`:"",f=e?`length=${o}`:`type=${typeof r}`;throw new Error(a+"expected Uint8Array"+u+", got "+f)}return r}function gt(r){if(typeof r!="function"||typeof r.create!="function")throw new Error("Hash must wrapped by utils.createHasher");gr(r.outputLen),gr(r.blockLen)}function Cr(r,t=!0){if(r.destroyed)throw new Error("Hash instance has been destroyed");if(t&&r.finished)throw new Error("Hash#digest() has already been called")}function de(r,t){j(r,void 0,"digestInto() output");var n=t.outputLen;if(r.length<n)throw new Error('"digestInto() output" expected to be of length >='+n)}function xr(...r){for(var t=0;t<r.length;t++)r[t].fill(0)}function Qr(r){return new DataView(r.buffer,r.byteOffset,r.byteLength)}function er(r,t){return r<<32-t|r>>>t}var bt=typeof Uint8Array.from([]).toHex=="function"&&typeof Uint8Array.fromHex=="function",he=Array.from({length:256},(r,t)=>t.toString(16).padStart(2,"0"));function Br(r){if(j(r),bt)return r.toHex();for(var t="",n=0;n<r.length;n++)t+=he[r[n]];return t}var ar={_0:48,_9:57,A:65,F:70,a:97,f:102};function yt(r){if(r>=ar._0&&r<=ar._9)return r-ar._0;if(r>=ar.A&&r<=ar.F)return r-(ar.A-10);if(r>=ar.a&&r<=ar.f)return r-(ar.a-10)}function Ir(r){if(typeof r!="string")throw new Error("hex string expected, got "+typeof r);if(bt)return Uint8Array.fromHex(r);var t=r.length,n=t/2;if(t%2)throw new Error("hex string expected, got unpadded hex of length "+t);for(var e=new Uint8Array(n),o=0,i=0;o<n;o++,i+=2){var a=yt(r.charCodeAt(i)),u=yt(r.charCodeAt(i+1));if(a===void 0||u===void 0){var f=r[i]+r[i+1];throw new Error('hex string expected, got non-hex character "'+f+'" at index '+i)}e[o]=a*16+u}return e}function nr(...r){for(var t=0,n=0;n<r.length;n++){var e=r[n];j(e),t+=e.length}for(var o=new Uint8Array(t),i=0,a=0;i<r.length;i++){var u=r[i];o.set(u,a),a+=u.length}return o}function pt(r,t={}){var n=(o,i)=>r(i).update(o).digest(),e=r(void 0);return n.outputLen=e.outputLen,n.blockLen=e.blockLen,n.create=o=>r(o),Object.assign(n,t),Object.freeze(n)}function Dr(r=32){var t=typeof globalThis=="object"?globalThis.crypto:null;if(typeof(t==null?void 0:t.getRandomValues)!="function")throw new Error("crypto.getRandomValues must be defined");return t.getRandomValues(new Uint8Array(r))}var wt=r=>({oid:Uint8Array.from([6,9,96,134,72,1,101,3,4,2,r])});function le(r,t,n){return r&t^~r&n}function ve(r,t,n){return r&t^r&n^t&n}var mt=class{constructor(r,t,n,e){y(this,"blockLen");y(this,"outputLen");y(this,"padOffset");y(this,"isLE");y(this,"buffer");y(this,"view");y(this,"finished",!1);y(this,"length",0);y(this,"pos",0);y(this,"destroyed",!1);this.blockLen=r,this.outputLen=t,this.padOffset=n,this.isLE=e,this.buffer=new Uint8Array(r),this.view=Qr(this.buffer)}update(r){Cr(this),j(r);for(var{view:t,buffer:n,blockLen:e}=this,o=r.length,i=0;i<o;){var a=Math.min(e-this.pos,o-i);if(a===e){for(var u=Qr(r);e<=o-i;i+=e)this.process(u,i);continue}n.set(r.subarray(i,i+a),this.pos),this.pos+=a,i+=a,this.pos===e&&(this.process(t,0),this.pos=0)}return this.length+=r.length,this.roundClean(),this}digestInto(r){Cr(this),de(r,this),this.finished=!0;var{buffer:t,view:n,blockLen:e,isLE:o}=this,{pos:i}=this;t[i++]=128,xr(this.buffer.subarray(i)),this.padOffset>e-i&&(this.process(n,0),i=0);for(var a=i;a<e;a++)t[a]=0;n.setBigUint64(e-8,BigInt(this.length*8),o),this.process(n,0);var u=Qr(r),f=this.outputLen;if(f%4)throw new Error("_sha2: outputLen must be aligned to 32bit");var h=f/4,l=this.get();if(h>l.length)throw new Error("_sha2: outputLen bigger than state");for(var S=0;S<h;S++)u.setUint32(4*S,l[S],o)}digest(){var{buffer:r,outputLen:t}=this;this.digestInto(r);var n=r.slice(0,t);return this.destroy(),n}_cloneInto(r){r||(r=new this.constructor),r.set(...this.get());var{blockLen:t,buffer:n,length:e,finished:o,destroyed:i,pos:a}=this;return r.destroyed=i,r.finished=o,r.length=e,r.pos=a,e%t&&r.buffer.set(n),r}clone(){return this._cloneInto()}},ur=Uint32Array.from([1779033703,3144134277,1013904242,2773480762,1359893119,2600822924,528734635,1541459225]),_=Uint32Array.from([1779033703,4089235720,3144134277,2227873595,1013904242,4271175723,2773480762,1595750129,1359893119,2917565137,2600822924,725511199,528734635,4215389547,1541459225,327033209]),Kr=BigInt(4294967295),Et=BigInt(32);function ge(r,t=!1){return t?{h:Number(r&Kr),l:Number(r>>Et&Kr)}:{h:Number(r>>Et&Kr)|0,l:Number(r&Kr)|0}}function be(r,t=!1){for(var n=r.length,e=new Uint32Array(n),o=new Uint32Array(n),i=0;i<n;i++){var{h:a,l:u}=ge(r[i],t);[e[i],o[i]]=[a,u]}return[e,o]}var xt=(r,t,n)=>r>>>n,Bt=(r,t,n)=>r<<32-n|t>>>n,Rr=(r,t,n)=>r>>>n|t<<32-n,Or=(r,t,n)=>r<<32-n|t>>>n,Tr=(r,t,n)=>r<<64-n|t>>>n-32,jr=(r,t,n)=>r>>>n-32|t<<64-n;function fr(r,t,n,e){var o=(t>>>0)+(e>>>0);return{h:r+n+(o/4294967296|0)|0,l:o|0}}var ye=(r,t,n)=>(r>>>0)+(t>>>0)+(n>>>0),pe=(r,t,n,e)=>t+n+e+(r/2**32|0)|0,we=(r,t,n,e)=>(r>>>0)+(t>>>0)+(n>>>0)+(e>>>0),me=(r,t,n,e,o)=>t+n+e+o+(r/2**32|0)|0,Ee=(r,t,n,e,o)=>(r>>>0)+(t>>>0)+(n>>>0)+(e>>>0)+(o>>>0),xe=(r,t,n,e,o,i)=>t+n+e+o+i+(r/2**32|0)|0,Be=Uint32Array.from([1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298]),cr=new Uint32Array(64),Ie=class extends mt{constructor(r){super(64,r,8,!1)}get(){var{A:r,B:t,C:n,D:e,E:o,F:i,G:a,H:u}=this;return[r,t,n,e,o,i,a,u]}set(r,t,n,e,o,i,a,u){this.A=r|0,this.B=t|0,this.C=n|0,this.D=e|0,this.E=o|0,this.F=i|0,this.G=a|0,this.H=u|0}process(r,t){for(var n=0;n<16;n++,t+=4)cr[n]=r.getUint32(t,!1);for(var e=16;e<64;e++){var o=cr[e-15],i=cr[e-2],a=er(o,7)^er(o,18)^o>>>3,u=er(i,17)^er(i,19)^i>>>10;cr[e]=u+cr[e-7]+a+cr[e-16]|0}for(var{A:f,B:h,C:l,D:S,E:F,F:R,G:p,H:m}=this,v=0;v<64;v++){var V=er(F,6)^er(F,11)^er(F,25),g=m+V+le(F,R,p)+Be[v]+cr[v]|0,x=(er(f,2)^er(f,13)^er(f,22))+ve(f,h,l)|0;m=p,p=R,R=F,F=S+g|0,S=l,l=h,h=f,f=g+x|0}f=f+this.A|0,h=h+this.B|0,l=l+this.C|0,S=S+this.D|0,F=F+this.E|0,R=R+this.F|0,p=p+this.G|0,m=m+this.H|0,this.set(f,h,l,S,F,R,p,m)}roundClean(){xr(cr)}destroy(){this.set(0,0,0,0,0,0,0,0),xr(this.buffer)}},Re=class extends Ie{constructor(){super(32);y(this,"A",ur[0]|0);y(this,"B",ur[1]|0);y(this,"C",ur[2]|0);y(this,"D",ur[3]|0);y(this,"E",ur[4]|0);y(this,"F",ur[5]|0);y(this,"G",ur[6]|0);y(this,"H",ur[7]|0)}},It=be(["0x428a2f98d728ae22","0x7137449123ef65cd","0xb5c0fbcfec4d3b2f","0xe9b5dba58189dbbc","0x3956c25bf348b538","0x59f111f1b605d019","0x923f82a4af194f9b","0xab1c5ed5da6d8118","0xd807aa98a3030242","0x12835b0145706fbe","0x243185be4ee4b28c","0x550c7dc3d5ffb4e2","0x72be5d74f27b896f","0x80deb1fe3b1696b1","0x9bdc06a725c71235","0xc19bf174cf692694","0xe49b69c19ef14ad2","0xefbe4786384f25e3","0x0fc19dc68b8cd5b5","0x240ca1cc77ac9c65","0x2de92c6f592b0275","0x4a7484aa6ea6e483","0x5cb0a9dcbd41fbd4","0x76f988da831153b5","0x983e5152ee66dfab","0xa831c66d2db43210","0xb00327c898fb213f","0xbf597fc7beef0ee4","0xc6e00bf33da88fc2","0xd5a79147930aa725","0x06ca6351e003826f","0x142929670a0e6e70","0x27b70a8546d22ffc","0x2e1b21385c26c926","0x4d2c6dfc5ac42aed","0x53380d139d95b3df","0x650a73548baf63de","0x766a0abb3c77b2a8","0x81c2c92e47edaee6","0x92722c851482353b","0xa2bfe8a14cf10364","0xa81a664bbc423001","0xc24b8b70d0f89791","0xc76c51a30654be30","0xd192e819d6ef5218","0xd69906245565a910","0xf40e35855771202a","0x106aa07032bbd1b8","0x19a4c116b8d2d0c8","0x1e376c085141ab53","0x2748774cdf8eeb99","0x34b0bcb5e19b48a8","0x391c0cb3c5c95a63","0x4ed8aa4ae3418acb","0x5b9cca4f7763e373","0x682e6ff3d6b2b8a3","0x748f82ee5defb2fc","0x78a5636f43172f60","0x84c87814a1f0ab72","0x8cc702081a6439ec","0x90befffa23631e28","0xa4506cebde82bde9","0xbef9a3f7b2c67915","0xc67178f2e372532b","0xca273eceea26619c","0xd186b8c721c0c207","0xeada7dd6cde0eb1e","0xf57d4f7fee6ed178","0x06f067aa72176fba","0x0a637dc5a2c898a6","0x113f9804bef90dae","0x1b710b35131c471b","0x28db77f523047d84","0x32caab7b40c72493","0x3c9ebe0a15c9bebc","0x431d67c49c100d4c","0x4cc5d4becb3e42b6","0x597f299cfc657e2a","0x5fcb6fab3ad6faec","0x6c44198c4a475817"].map(r=>BigInt(r))),Oe=It[0],Ae=It[1],dr=new Uint32Array(80),hr=new Uint32Array(80),Se=class extends mt{constructor(r){super(128,r,16,!1)}get(){var{Ah:r,Al:t,Bh:n,Bl:e,Ch:o,Cl:i,Dh:a,Dl:u,Eh:f,El:h,Fh:l,Fl:S,Gh:F,Gl:R,Hh:p,Hl:m}=this;return[r,t,n,e,o,i,a,u,f,h,l,S,F,R,p,m]}set(r,t,n,e,o,i,a,u,f,h,l,S,F,R,p,m){this.Ah=r|0,this.Al=t|0,this.Bh=n|0,this.Bl=e|0,this.Ch=o|0,this.Cl=i|0,this.Dh=a|0,this.Dl=u|0,this.Eh=f|0,this.El=h|0,this.Fh=l|0,this.Fl=S|0,this.Gh=F|0,this.Gl=R|0,this.Hh=p|0,this.Hl=m|0}process(r,t){for(var n=0;n<16;n++,t+=4)dr[n]=r.getUint32(t),hr[n]=r.getUint32(t+=4);for(var e=16;e<80;e++){var o=dr[e-15]|0,i=hr[e-15]|0,a=Rr(o,i,1)^Rr(o,i,8)^xt(o,i,7),u=Or(o,i,1)^Or(o,i,8)^Bt(o,i,7),f=dr[e-2]|0,h=hr[e-2]|0,l=Rr(f,h,19)^Tr(f,h,61)^xt(f,h,6),S=Or(f,h,19)^jr(f,h,61)^Bt(f,h,6),F=we(u,S,hr[e-7],hr[e-16]),R=me(F,a,l,dr[e-7],dr[e-16]);dr[e]=R|0,hr[e]=F|0}for(var{Ah:p,Al:m,Bh:v,Bl:V,Ch:g,Cl:x,Dh:O,Dl:K,Eh:N,El:T,Fh:E,Fl:w,Gh:H,Gl:D,Hh:q,Hl:A}=this,s=0;s<80;s++){var c=Rr(N,T,14)^Rr(N,T,18)^Tr(N,T,41),d=Or(N,T,14)^Or(N,T,18)^jr(N,T,41),b=N&E^~N&H,B=T&w^~T&D,U=Ee(A,d,B,Ae[s],hr[s]),Z=xe(U,q,c,b,Oe[s],dr[s]),I=U|0,L=Rr(p,m,28)^Tr(p,m,34)^Tr(p,m,39),C=Or(p,m,28)^jr(p,m,34)^jr(p,m,39),Y=p&v^p&g^v&g,P=m&V^m&x^V&x;q=H|0,A=D|0,H=E|0,D=w|0,E=N|0,w=T|0,{h:N,l:T}=fr(O|0,K|0,Z|0,I|0),O=g|0,K=x|0,g=v|0,x=V|0,v=p|0,V=m|0;var k=ye(I,C,P);p=pe(k,Z,L,Y),m=k|0}({h:p,l:m}=fr(this.Ah|0,this.Al|0,p|0,m|0)),{h:v,l:V}=fr(this.Bh|0,this.Bl|0,v|0,V|0),{h:g,l:x}=fr(this.Ch|0,this.Cl|0,g|0,x|0),{h:O,l:K}=fr(this.Dh|0,this.Dl|0,O|0,K|0),{h:N,l:T}=fr(this.Eh|0,this.El|0,N|0,T|0),{h:E,l:w}=fr(this.Fh|0,this.Fl|0,E|0,w|0),{h:H,l:D}=fr(this.Gh|0,this.Gl|0,H|0,D|0),{h:q,l:A}=fr(this.Hh|0,this.Hl|0,q|0,A|0),this.set(p,m,v,V,g,x,O,K,N,T,E,w,H,D,q,A)}roundClean(){xr(dr,hr)}destroy(){xr(this.buffer),this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0)}},qe=class extends Se{constructor(){super(64);y(this,"Ah",_[0]|0);y(this,"Al",_[1]|0);y(this,"Bh",_[2]|0);y(this,"Bl",_[3]|0);y(this,"Ch",_[4]|0);y(this,"Cl",_[5]|0);y(this,"Dh",_[6]|0);y(this,"Dl",_[7]|0);y(this,"Eh",_[8]|0);y(this,"El",_[9]|0);y(this,"Fh",_[10]|0);y(this,"Fl",_[11]|0);y(this,"Gh",_[12]|0);y(this,"Gl",_[13]|0);y(this,"Hh",_[14]|0);y(this,"Hl",_[15]|0)}},Rt=pt(()=>new Re,wt(1)),Fe=pt(()=>new qe,wt(3)),_r=BigInt(0),rt=BigInt(1);function br(r,t=""){if(typeof r!="boolean"){var n=t&&`"${t}" `;throw new Error(n+"expected boolean, got type="+typeof r)}return r}function Ot(r){if(typeof r=="bigint"){if(!Gr(r))throw new Error("positive bigint expected, got "+r)}else gr(r);return r}function Pr(r){var t=Ot(r).toString(16);return t.length&1?"0"+t:t}function At(r){if(typeof r!="string")throw new Error("hex string expected, got "+typeof r);return r===""?_r:BigInt("0x"+r)}function Yr(r){return At(Br(r))}function yr(r){return At(Br(Ur(j(r)).reverse()))}function tt(r,t){gr(t),r=Ot(r);var n=Ir(r.toString(16).padStart(t*2,"0"));if(n.length!==t)throw new Error("number too large");return n}function et(r,t){return tt(r,t).reverse()}function Ur(r){return Uint8Array.from(r)}var Gr=r=>typeof r=="bigint"&&_r<=r;function Ue(r,t,n){return Gr(r)&&Gr(t)&&Gr(n)&&t<=r&&r<n}function Zr(r,t,n,e){if(!Ue(t,n,e))throw new Error("expected valid "+r+": "+n+" <= n < "+e+", got "+t)}function Ze(r){var t;for(t=0;r>_r;r>>=rt,t+=1);return t}var nt=r=>(rt<<BigInt(r))-rt;function Le(r,t,n){if(gr(r,"hashLen"),gr(t,"qByteLen"),typeof n!="function")throw new Error("hmacFn must be a function");var e=m=>new Uint8Array(m),o=Uint8Array.of(),i=Uint8Array.of(0),a=Uint8Array.of(1),u=1e3,f=e(r),h=e(r),l=0,S=()=>{f.fill(1),h.fill(0),l=0},F=(...m)=>n(h,nr(f,...m)),R=(m=o)=>{h=F(i,m),f=F(),m.length!==0&&(h=F(a,m),f=F())},p=()=>{if(l++>=u)throw new Error("drbg: tried max amount of iterations");for(var m=0,v=[];m<t;){f=F();var V=f.slice();v.push(V),m+=f.length}return nr(...v)};return(m,v)=>{S(),R(m);for(var V;!(V=v(p()));)R();return S(),V}}function Ar(r,t={},n={}){if(!r||typeof r!="object")throw new Error("expected valid options object");function e(i,a,u){var f=r[i];if(!(u&&f===void 0)){var h=typeof f;if(h!==a||f===null)throw new Error(`param "${i}" is invalid: expected ${a}, got ${h}`)}}var o=(i,a)=>Object.entries(i).forEach(([u,f])=>e(u,f,a));o(t,!1),o(n,!0)}function zr(r){var t=new WeakMap;return(n,...e)=>{var o=t.get(n);if(o!==void 0)return o;var i=r(n,...e);return t.set(n,i),i}}var rr=BigInt(0),W=BigInt(1),pr=BigInt(2),St=BigInt(3),qt=BigInt(4),Ft=BigInt(5),He=BigInt(7),Ut=BigInt(8),Ve=BigInt(9),Zt=BigInt(16);function X(r,t){var n=r%t;return n>=rr?n:t+n}function $(r,t,n){for(var e=r;t-- >rr;)e*=e,e%=n;return e}function Lt(r,t){if(r===rr)throw new Error("invert: expected non-zero number");if(t<=rr)throw new Error("invert: expected positive modulus, got "+t);for(var n=X(r,t),e=t,o=rr,i=W,a=W,u=rr;n!==rr;){var f=e/n,h=e%n,l=o-a*f,S=i-u*f;e=n,n=h,o=a,i=u,a=l,u=S}if(e!==W)throw new Error("invert: does not exist");return X(o,t)}function it(r,t,n){if(!r.eql(r.sqr(t),n))throw new Error("Cannot find square root")}function Ht(r,t){var n=(r.ORDER+W)/qt,e=r.pow(t,n);return it(r,e,t),e}function Ne(r,t){var n=(r.ORDER-Ft)/Ut,e=r.mul(t,pr),o=r.pow(e,n),i=r.mul(t,o),a=r.mul(r.mul(i,pr),o),u=r.mul(i,r.sub(a,r.ONE));return it(r,u,t),u}function ke(r){var t=$r(r),n=Vt(r),e=n(t,t.neg(t.ONE)),o=n(t,e),i=n(t,t.neg(e)),a=(r+He)/Zt;return(u,f)=>{var h=u.pow(f,a),l=u.mul(h,e),S=u.mul(h,o),F=u.mul(h,i),R=u.eql(u.sqr(l),f),p=u.eql(u.sqr(S),f);h=u.cmov(h,l,R),l=u.cmov(F,S,p);var m=u.eql(u.sqr(l),f),v=u.cmov(h,l,m);return it(u,v,f),v}}function Vt(r){if(r<St)throw new Error("sqrt is not defined for small field");for(var t=r-W,n=0;t%pr===rr;)t/=pr,n++;for(var e=pr,o=$r(r);kt(o,e)===1;)if(e++>1e3)throw new Error("Cannot find square root: probably non-prime P");if(n===1)return Ht;var i=o.pow(e,t),a=(t+W)/pr;return function(u,f){if(u.is0(f))return f;if(kt(u,f)!==1)throw new Error("Cannot find square root");for(var h=n,l=u.mul(u.ONE,i),S=u.pow(f,t),F=u.pow(f,a);!u.eql(S,u.ONE);){if(u.is0(S))return u.ZERO;for(var R=1,p=u.sqr(S);!u.eql(p,u.ONE);)if(R++,p=u.sqr(p),R===h)throw new Error("Cannot find square root");var m=W<<BigInt(h-R-1),v=u.pow(l,m);h=R,l=u.sqr(v),S=u.mul(S,l),F=u.mul(F,v)}return F}}function Ce(r){return r%qt===St?Ht:r%Ut===Ft?Ne:r%Zt===Ve?ke(r):Vt(r)}var De=(r,t)=>(X(r,t)&W)===W,Ke=["create","isValid","is0","neg","inv","sqrt","sqr","eql","add","sub","mul","pow","div","addN","subN","mulN","sqrN"];function Te(r){var t={ORDER:"bigint",BYTES:"number",BITS:"number"},n=Ke.reduce((e,o)=>(e[o]="function",e),t);return Ar(r,n),r}function je(r,t,n){if(n<rr)throw new Error("invalid exponent, negatives unsupported");if(n===rr)return r.ONE;if(n===W)return t;for(var e=r.ONE,o=t;n>rr;)n&W&&(e=r.mul(e,o)),o=r.sqr(o),n>>=W;return e}function Nt(r,t,n=!1){var e=new Array(t.length).fill(n?r.ZERO:void 0),o=t.reduce((a,u,f)=>r.is0(u)?a:(e[f]=a,r.mul(a,u)),r.ONE),i=r.inv(o);return t.reduceRight((a,u,f)=>r.is0(u)?a:(e[f]=r.mul(a,e[f]),r.mul(a,u)),i),e}function kt(r,t){var n=(r.ORDER-W)/pr,e=r.pow(t,n),o=r.eql(e,r.ONE),i=r.eql(e,r.ZERO),a=r.eql(e,r.neg(r.ONE));if(!o&&!i&&!a)throw new Error("invalid Legendre symbol result");return o?1:i?0:-1}function Pe(r,t){t!==void 0&&gr(t);var n=t!==void 0?t:r.toString(2).length,e=Math.ceil(n/8);return{nBitLength:n,nByteLength:e}}var Ye=class{constructor(r,t={}){y(this,"ORDER");y(this,"BITS");y(this,"BYTES");y(this,"isLE");y(this,"ZERO",rr);y(this,"ONE",W);y(this,"_lengths");y(this,"_sqrt");y(this,"_mod");var n;if(r<=rr)throw new Error("invalid field: expected ORDER > 0, got "+r);var e;this.isLE=!1,t!=null&&typeof t=="object"&&(typeof t.BITS=="number"&&(e=t.BITS),typeof t.sqrt=="function"&&(this.sqrt=t.sqrt),typeof t.isLE=="boolean"&&(this.isLE=t.isLE),t.allowedLengths&&(this._lengths=(n=t.allowedLengths)===null||n===void 0?void 0:n.slice()),typeof t.modFromBytes=="boolean"&&(this._mod=t.modFromBytes));var{nBitLength:o,nByteLength:i}=Pe(r,e);if(i>2048)throw new Error("invalid field: expected ORDER of <= 2048 bytes");this.ORDER=r,this.BITS=o,this.BYTES=i,this._sqrt=void 0,Object.preventExtensions(this)}create(r){return X(r,this.ORDER)}isValid(r){if(typeof r!="bigint")throw new Error("invalid field element: expected bigint, got "+typeof r);return rr<=r&&r<this.ORDER}is0(r){return r===rr}isValidNot0(r){return!this.is0(r)&&this.isValid(r)}isOdd(r){return(r&W)===W}neg(r){return X(-r,this.ORDER)}eql(r,t){return r===t}sqr(r){return X(r*r,this.ORDER)}add(r,t){return X(r+t,this.ORDER)}sub(r,t){return X(r-t,this.ORDER)}mul(r,t){return X(r*t,this.ORDER)}pow(r,t){return je(this,r,t)}div(r,t){return X(r*Lt(t,this.ORDER),this.ORDER)}sqrN(r){return r*r}addN(r,t){return r+t}subN(r,t){return r-t}mulN(r,t){return r*t}inv(r){return Lt(r,this.ORDER)}sqrt(r){return this._sqrt||(this._sqrt=Ce(this.ORDER)),this._sqrt(this,r)}toBytes(r){return this.isLE?et(r,this.BYTES):tt(r,this.BYTES)}fromBytes(r,t=!1){j(r);var{_lengths:n,BYTES:e,isLE:o,ORDER:i,_mod:a}=this;if(n){if(!n.includes(r.length)||r.length>e)throw new Error("Field.fromBytes: expected "+n+" bytes, got "+r.length);var u=new Uint8Array(e);u.set(r,o?0:u.length-r.length),r=u}if(r.length!==e)throw new Error("Field.fromBytes: expected "+e+" bytes, got "+r.length);var f=o?yr(r):Yr(r);if(a&&(f=X(f,i)),!t&&!this.isValid(f))throw new Error("invalid field element: outside of range 0..ORDER");return f}invertBatch(r){return Nt(this,r)}cmov(r,t,n){return n?t:r}};function $r(r,t={}){return new Ye(r,t)}function Ct(r){if(typeof r!="bigint")throw new Error("field order must be bigint");var t=r.toString(2).length;return Math.ceil(t/8)}function Dt(r){var t=Ct(r);return t+Math.ceil(t/2)}function Ge(r,t,n=!1){j(r);var e=r.length,o=Ct(t),i=Dt(t);if(e<16||e<i||e>1024)throw new Error("expected "+i+"-1024 bytes of input, got "+e);var a=n?yr(r):Yr(r),u=X(a,t-W)+W;return n?et(u,o):tt(u,o)}var Sr=BigInt(0),wr=BigInt(1);function Xr(r,t){var n=t.negate();return r?n:t}function Lr(r,t){var n=Nt(r.Fp,t.map(e=>e.Z));return t.map((e,o)=>r.fromAffine(e.toAffine(n[o])))}function Kt(r,t){if(!Number.isSafeInteger(r)||r<=0||r>t)throw new Error("invalid window size, expected [1.."+t+"], got W="+r)}function ot(r,t){Kt(r,t);var n=Math.ceil(t/r)+1,e=2**(r-1),o=2**r,i=nt(r),a=BigInt(r);return{windows:n,windowSize:e,mask:i,maxNumber:o,shiftBy:a}}function Tt(r,t,n){var{windowSize:e,mask:o,maxNumber:i,shiftBy:a}=n,u=Number(r&o),f=r>>a;u>e&&(u-=i,f+=wr);var h=t*e,l=h+Math.abs(u)-1,S=u===0,F=u<0,R=t%2!==0;return{nextN:f,offset:l,isZero:S,isNeg:F,isNegF:R,offsetF:h}}var at=new WeakMap,jt=new WeakMap;function ft(r){return jt.get(r)||1}function Pt(r){if(r!==Sr)throw new Error("invalid wNAF")}var Yt=class{constructor(r,t){y(this,"BASE");y(this,"ZERO");y(this,"Fn");y(this,"bits");this.BASE=r.BASE,this.ZERO=r.ZERO,this.Fn=r.Fn,this.bits=t}_unsafeLadder(r,t,n=this.ZERO){for(var e=r;t>Sr;)t&wr&&(n=n.add(e)),e=e.double(),t>>=wr;return n}precomputeWindow(r,t){for(var{windows:n,windowSize:e}=ot(t,this.bits),o=[],i=r,a=i,u=0;u<n;u++){a=i,o.push(a);for(var f=1;f<e;f++)a=a.add(i),o.push(a);i=a.double()}return o}wNAF(r,t,n){if(!this.Fn.isValid(n))throw new Error("invalid scalar");for(var e=this.ZERO,o=this.BASE,i=ot(r,this.bits),a=0;a<i.windows;a++){var{nextN:u,offset:f,isZero:h,isNeg:l,isNegF:S,offsetF:F}=Tt(n,a,i);n=u,h?o=o.add(Xr(S,t[F])):e=e.add(Xr(l,t[f]))}return Pt(n),{p:e,f:o}}wNAFUnsafe(r,t,n,e=this.ZERO){for(var o=ot(r,this.bits),i=0;i<o.windows&&n!==Sr;i++){var{nextN:a,offset:u,isZero:f,isNeg:h}=Tt(n,i,o);if(n=a,!f){var l=t[u];e=e.add(h?l.negate():l)}}return Pt(n),e}getPrecomputes(r,t,n){var e=at.get(t);return e||(e=this.precomputeWindow(t,r),r!==1&&(typeof n=="function"&&(e=n(e)),at.set(t,e))),e}cached(r,t,n){var e=ft(r);return this.wNAF(e,this.getPrecomputes(e,r,n),t)}unsafe(r,t,n,e){var o=ft(r);return o===1?this._unsafeLadder(r,t,e):this.wNAFUnsafe(o,this.getPrecomputes(o,r,n),t,e)}createCache(r,t){Kt(t,this.bits),jt.set(r,t),at.delete(r)}hasCache(r){return ft(r)!==1}};function ze(r,t,n,e){for(var o=t,i=r.ZERO,a=r.ZERO;n>Sr||e>Sr;)n&wr&&(i=i.add(o)),e&wr&&(a=a.add(o)),o=o.double(),n>>=wr,e>>=wr;return{p1:i,p2:a}}function Gt(r,t,n){if(t){if(t.ORDER!==r)throw new Error("Field.ORDER must match order: Fp == p, Fn == n");return Te(t),t}else return $r(r,{isLE:n})}function zt(r,t,n={},e){if(e===void 0&&(e=r==="edwards"),!t||typeof t!="object")throw new Error(`expected valid ${r} CURVE object`);for(var o of["p","n","h"]){var i=t[o];if(!(typeof i=="bigint"&&i>Sr))throw new Error(`CURVE.${o} must be positive bigint`)}var a=Gt(t.p,n.Fp,e),u=Gt(t.n,n.Fn,e),f=["Gx","Gy","a",r==="weierstrass"?"b":"d"];for(var h of f)if(!a.isValid(t[h]))throw new Error(`CURVE.${h} must be valid field element of CURVE.Fp`);return t=Object.freeze(Object.assign({},t)),{CURVE:t,Fp:a,Fn:u}}function st(r,t){return function(n){var e=r(n);return{secretKey:e,publicKey:t(e)}}}var $t=class{constructor(r,t){y(this,"oHash");y(this,"iHash");y(this,"blockLen");y(this,"outputLen");y(this,"finished",!1);y(this,"destroyed",!1);if(gt(r),j(t,void 0,"key"),this.iHash=r.create(),typeof this.iHash.update!="function")throw new Error("Expected instance of class which extends utils.Hash");this.blockLen=this.iHash.blockLen,this.outputLen=this.iHash.outputLen;var n=this.blockLen,e=new Uint8Array(n);e.set(t.length>n?r.create().update(t).digest():t);for(var o=0;o<e.length;o++)e[o]^=54;this.iHash.update(e),this.oHash=r.create();for(var i=0;i<e.length;i++)e[i]^=106;this.oHash.update(e),xr(e)}update(r){return Cr(this),this.iHash.update(r),this}digestInto(r){Cr(this),j(r,this.outputLen,"output"),this.finished=!0,this.iHash.digestInto(r),this.oHash.update(r),this.oHash.digestInto(r),this.destroy()}digest(){var r=new Uint8Array(this.oHash.outputLen);return this.digestInto(r),r}_cloneInto(r){r||(r=Object.create(Object.getPrototypeOf(this),{}));var{oHash:t,iHash:n,finished:e,destroyed:o,blockLen:i,outputLen:a}=this;return r=r,r.finished=e,r.destroyed=o,r.blockLen=i,r.outputLen=a,r.oHash=t._cloneInto(r.oHash),r.iHash=n._cloneInto(r.iHash),r}clone(){return this._cloneInto()}destroy(){this.destroyed=!0,this.oHash.destroy(),this.iHash.destroy()}},Xt=(r,t,n)=>new $t(r,t).update(n).digest();Xt.create=(r,t)=>new $t(r,t);var Mt=(r,t)=>(r+(r>=0?t:-t)/Wt)/t;function $e(r,t,n){var[[e,o],[i,a]]=t,u=Mt(a*r,n),f=Mt(-o*r,n),h=r-u*e-f*i,l=-u*o-f*a,S=h<sr,F=l<sr;S&&(h=-h),F&&(l=-l);var R=nt(Math.ceil(Ze(n)/2))+qr;if(h<sr||h>=R||l<sr||l>=R)throw new Error("splitScalar (endomorphism): failed, k="+r);return{k1neg:S,k1:h,k2neg:F,k2:l}}function ut(r){if(!["compact","recovered","der"].includes(r))throw new Error('Signature format must be "compact", "recovered", or "der"');return r}function ct(r,t){var n={};for(var e of Object.keys(t))n[e]=r[e]===void 0?t[e]:r[e];return br(n.lowS,"lowS"),br(n.prehash,"prehash"),n.format!==void 0&&ut(n.format),n}var Xe=class extends Error{constructor(r=""){super(r)}},lr={Err:Xe,_tlv:{encode:(r,t)=>{var{Err:n}=lr;if(r<0||r>256)throw new n("tlv.encode: wrong tag");if(t.length&1)throw new n("tlv.encode: unpadded data");var e=t.length/2,o=Pr(e);if(o.length/2&128)throw new n("tlv.encode: long form length too big");var i=e>127?Pr(o.length/2|128):"";return Pr(r)+i+o+t},decode(r,t){var{Err:n}=lr,e=0;if(r<0||r>256)throw new n("tlv.encode: wrong tag");if(t.length<2||t[e++]!==r)throw new n("tlv.decode: wrong tlv");var o=t[e++],i=!!(o&128),a=0;if(!i)a=o;else{var u=o&127;if(!u)throw new n("tlv.decode(long): indefinite length not supported");if(u>4)throw new n("tlv.decode(long): byte length is too big");var f=t.subarray(e,e+u);if(f.length!==u)throw new n("tlv.decode: length bytes not complete");if(f[0]===0)throw new n("tlv.decode(long): zero leftmost byte");for(var h of f)a=a<<8|h;if(e+=u,a<128)throw new n("tlv.decode(long): not minimal encoding")}var l=t.subarray(e,e+a);if(l.length!==a)throw new n("tlv.decode: wrong value length");return{v:l,l:t.subarray(e+a)}}},_int:{encode(r){var{Err:t}=lr;if(r<sr)throw new t("integer: negative integers are not allowed");var n=Pr(r);if(Number.parseInt(n[0],16)&8&&(n="00"+n),n.length&1)throw new t("unexpected DER parsing assertion: unpadded hex");return n},decode(r){var{Err:t}=lr;if(r[0]&128)throw new t("invalid signature integer: negative");if(r[0]===0&&!(r[1]&128))throw new t("invalid signature integer: unnecessary leading zero");return Yr(r)}},toSig(r){var{Err:t,_int:n,_tlv:e}=lr,o=j(r,void 0,"signature"),{v:i,l:a}=e.decode(48,o);if(a.length)throw new t("invalid signature: left bytes after parsing");var{v:u,l:f}=e.decode(2,i),{v:h,l}=e.decode(2,f);if(l.length)throw new t("invalid signature: left bytes after parsing");return{r:n.decode(u),s:n.decode(h)}},hexFromSig(r){var{_tlv:t,_int:n}=lr,e=t.encode(2,n.encode(r.r)),o=t.encode(2,n.encode(r.s)),i=e+o;return t.encode(48,i)}},sr=BigInt(0),qr=BigInt(1),Wt=BigInt(2),Mr=BigInt(3),Me=BigInt(4);function Jt(r,t={}){var n=zt("weierstrass",r,t),{Fp:e,Fn:o}=n,i=n.CURVE,{h:a,n:u}=i;Ar(t,{},{allowInfinityPoint:"boolean",clearCofactor:"function",isTorsionFree:"function",fromBytes:"function",toBytes:"function",endo:"object"});var{endo:f}=t;if(f&&(!e.is0(i.a)||typeof f.beta!="bigint"||!Array.isArray(f.basises)))throw new Error('invalid endo: expected "beta": bigint and "basises": array');var h=_t(e,o);function l(){if(!e.isOdd)throw new Error("compression is not supported: Field does not have .isOdd()")}function S(A,s,c){var{x:d,y:b}=s.toAffine(),B=e.toBytes(d);if(br(c,"isCompressed"),c){l();var U=!e.isOdd(b);return nr(Qt(U),B)}else return nr(Uint8Array.of(4),B,e.toBytes(b))}function F(A){j(A,void 0,"Point");var{publicKey:s,publicKeyUncompressed:c}=h,d=A.length,b=A[0],B=A.subarray(1);if(d===s&&(b===2||b===3)){var U=e.fromBytes(B);if(!e.isValid(U))throw new Error("bad point: is not on curve, wrong x");var Z=m(U),I;try{I=e.sqrt(Z)}catch(z){var L=z instanceof Error?": "+z.message:"";throw new Error("bad point: is not on curve, sqrt error"+L)}l();var C=e.isOdd(I);return(b&1)===1!==C&&(I=e.neg(I)),{x:U,y:I}}else if(d===c&&b===4){var Y=e.BYTES,P=e.fromBytes(B.subarray(0,Y)),k=e.fromBytes(B.subarray(Y,Y*2));if(!v(P,k))throw new Error("bad point: is not on curve");return{x:P,y:k}}else throw new Error(`bad point: got length ${d}, expected compressed=${s} or uncompressed=${c}`)}var R=t.toBytes||S,p=t.fromBytes||F;function m(A){var s=e.sqr(A),c=e.mul(s,A);return e.add(e.add(c,e.mul(A,i.a)),i.b)}function v(A,s){var c=e.sqr(s),d=m(A);return e.eql(c,d)}if(!v(i.Gx,i.Gy))throw new Error("bad curve params: generator point");var V=e.mul(e.pow(i.a,Mr),Me),g=e.mul(e.sqr(i.b),BigInt(27));if(e.is0(e.add(V,g)))throw new Error("bad curve params: a or b");function x(A,s,c=!1){if(!e.isValid(s)||c&&e.is0(s))throw new Error(`bad point coordinate ${A}`);return s}function O(A){if(!(A instanceof w))throw new Error("Weierstrass Point expected")}function K(A){if(!f||!f.basises)throw new Error("no endo");return $e(A,f.basises,o.ORDER)}var N=zr((A,s)=>{var{X:c,Y:d,Z:b}=A;if(e.eql(b,e.ONE))return{x:c,y:d};var B=A.is0();s==null&&(s=B?e.ONE:e.inv(b));var U=e.mul(c,s),Z=e.mul(d,s),I=e.mul(b,s);if(B)return{x:e.ZERO,y:e.ZERO};if(!e.eql(I,e.ONE))throw new Error("invZ was invalid");return{x:U,y:Z}}),T=zr(A=>{if(A.is0()){if(t.allowInfinityPoint&&!e.is0(A.Y))return;throw new Error("bad point: ZERO")}var{x:s,y:c}=A.toAffine();if(!e.isValid(s)||!e.isValid(c))throw new Error("bad point: x or y not field elements");if(!v(s,c))throw new Error("bad point: equation left != right");if(!A.isTorsionFree())throw new Error("bad point: not in prime-order subgroup");return!0});function E(A,s,c,d,b){return c=new w(e.mul(c.X,A),c.Y,c.Z),s=Xr(d,s),c=Xr(b,c),s.add(c)}var q=class q{constructor(s,c,d){y(this,"X");y(this,"Y");y(this,"Z");this.X=x("x",s),this.Y=x("y",c,!0),this.Z=x("z",d),Object.freeze(this)}static CURVE(){return i}static fromAffine(s){var{x:c,y:d}=s||{};if(!s||!e.isValid(c)||!e.isValid(d))throw new Error("invalid affine point");if(s instanceof q)throw new Error("projective point not allowed");return e.is0(c)&&e.is0(d)?q.ZERO:new q(c,d,e.ONE)}static fromBytes(s){var c=q.fromAffine(p(j(s,void 0,"point")));return c.assertValidity(),c}static fromHex(s){return q.fromBytes(Ir(s))}get x(){return this.toAffine().x}get y(){return this.toAffine().y}precompute(s=8,c=!0){return D.createCache(this,s),c||this.multiply(Mr),this}assertValidity(){T(this)}hasEvenY(){var{y:s}=this.toAffine();if(!e.isOdd)throw new Error("Field doesn't support isOdd");return!e.isOdd(s)}equals(s){O(s);var{X:c,Y:d,Z:b}=this,{X:B,Y:U,Z}=s,I=e.eql(e.mul(c,Z),e.mul(B,b)),L=e.eql(e.mul(d,Z),e.mul(U,b));return I&&L}negate(){return new q(this.X,e.neg(this.Y),this.Z)}double(){var{a:s,b:c}=i,d=e.mul(c,Mr),{X:b,Y:B,Z:U}=this,Z=e.ZERO,I=e.ZERO,L=e.ZERO,C=e.mul(b,b),Y=e.mul(B,B),P=e.mul(U,U),k=e.mul(b,B);return k=e.add(k,k),L=e.mul(b,U),L=e.add(L,L),Z=e.mul(s,L),I=e.mul(d,P),I=e.add(Z,I),Z=e.sub(Y,I),I=e.add(Y,I),I=e.mul(Z,I),Z=e.mul(k,Z),L=e.mul(d,L),P=e.mul(s,P),k=e.sub(C,P),k=e.mul(s,k),k=e.add(k,L),L=e.add(C,C),C=e.add(L,C),C=e.add(C,P),C=e.mul(C,k),I=e.add(I,C),P=e.mul(B,U),P=e.add(P,P),C=e.mul(P,k),Z=e.sub(Z,C),L=e.mul(P,Y),L=e.add(L,L),L=e.add(L,L),new q(Z,I,L)}add(s){O(s);var{X:c,Y:d,Z:b}=this,{X:B,Y:U,Z}=s,I=e.ZERO,L=e.ZERO,C=e.ZERO,Y=i.a,P=e.mul(i.b,Mr),k=e.mul(c,B),z=e.mul(d,U),M=e.mul(b,Z),tr=e.add(c,d),G=e.add(B,U);tr=e.mul(tr,G),G=e.add(k,z),tr=e.sub(tr,G),G=e.add(c,b);var Q=e.add(B,Z);return G=e.mul(G,Q),Q=e.add(k,M),G=e.sub(G,Q),Q=e.add(d,b),I=e.add(U,Z),Q=e.mul(Q,I),I=e.add(z,M),Q=e.sub(Q,I),C=e.mul(Y,G),I=e.mul(P,M),C=e.add(I,C),I=e.sub(z,C),C=e.add(z,C),L=e.mul(I,C),z=e.add(k,k),z=e.add(z,k),M=e.mul(Y,M),G=e.mul(P,G),z=e.add(z,M),M=e.sub(k,M),M=e.mul(Y,M),G=e.add(G,M),k=e.mul(z,G),L=e.add(L,k),k=e.mul(Q,G),I=e.mul(tr,I),I=e.sub(I,k),k=e.mul(tr,z),C=e.mul(Q,C),C=e.add(C,k),new q(I,L,C)}subtract(s){return this.add(s.negate())}is0(){return this.equals(q.ZERO)}multiply(s){var{endo:c}=t;if(!o.isValidNot0(s))throw new Error("invalid scalar: out of range");var d,b,B=tr=>D.cached(this,tr,G=>Lr(q,G));if(c){var{k1neg:U,k1:Z,k2neg:I,k2:L}=K(s),{p:C,f:Y}=B(Z),{p:P,f:k}=B(L);b=Y.add(k),d=E(c.beta,C,P,U,I)}else{var{p:z,f:M}=B(s);d=z,b=M}return Lr(q,[d,b])[0]}multiplyUnsafe(s){var{endo:c}=t,d=this;if(!o.isValid(s))throw new Error("invalid scalar: out of range");if(s===sr||d.is0())return q.ZERO;if(s===qr)return d;if(D.hasCache(this))return this.multiply(s);if(c){var{k1neg:b,k1:B,k2neg:U,k2:Z}=K(s),{p1:I,p2:L}=ze(q,d,B,Z);return E(c.beta,I,L,b,U)}else return D.unsafe(d,s)}toAffine(s){return N(this,s)}isTorsionFree(){var{isTorsionFree:s}=t;return a===qr?!0:s?s(q,this):D.unsafe(this,u).is0()}clearCofactor(){var{clearCofactor:s}=t;return a===qr?this:s?s(q,this):this.multiplyUnsafe(a)}isSmallOrder(){return this.multiplyUnsafe(a).is0()}toBytes(s=!0){return br(s,"isCompressed"),this.assertValidity(),R(q,this,s)}toHex(s=!0){return Br(this.toBytes(s))}toString(){return`<Point ${this.is0()?"ZERO":this.toHex()}>`}};y(q,"BASE",new q(i.Gx,i.Gy,e.ONE)),y(q,"ZERO",new q(e.ZERO,e.ONE,e.ZERO)),y(q,"Fp",e),y(q,"Fn",o);var w=q;var H=o.BITS,D=new Yt(w,t.endo?Math.ceil(H/2):H);return w.BASE.precompute(8),w}function Qt(r){return Uint8Array.of(r?2:3)}function _t(r,t){return{secretKey:t.BYTES,publicKey:1+r.BYTES,publicKeyUncompressed:1+2*r.BYTES,publicKeyHasPrefix:!0,signature:2*t.BYTES}}function We(r,t={}){var{Fn:n}=r,e=t.randomBytes||Dr,o=Object.assign(_t(r.Fp,n),{seed:Dt(n.ORDER)});function i(R){try{var p=n.fromBytes(R);return n.isValidNot0(p)}catch{return!1}}function a(R,p){var{publicKey:m,publicKeyUncompressed:v}=o;try{var V=R.length;return p===!0&&V!==m||p===!1&&V!==v?!1:!!r.fromBytes(R)}catch{return!1}}function u(R=e(o.seed)){return Ge(j(R,o.seed,"seed"),n.ORDER)}function f(R,p=!0){return r.BASE.multiply(n.fromBytes(R)).toBytes(p)}function h(R){var{secretKey:p,publicKey:m,publicKeyUncompressed:v}=o;if(!(!kr(R)||"_lengths"in n&&n._lengths||p===m)){var V=j(R,void 0,"key").length;return V===m||V===v}}function l(R,p,m=!0){if(h(R)===!0)throw new Error("first arg must be private key");if(h(p)===!1)throw new Error("second arg must be public key");var v=n.fromBytes(R);return r.fromBytes(p).multiply(v).toBytes(m)}var S={isValidSecretKey:i,isValidPublicKey:a,randomSecretKey:u},F=st(u,f);return Object.freeze({getPublicKey:f,getSharedSecret:l,keygen:F,Point:r,utils:S,lengths:o})}function re(r,t,n={}){gt(t),Ar(n,{},{hmac:"function",lowS:"boolean",randomBytes:"function",bits2int:"function",bits2int_modN:"function"}),n=Object.assign({},n);var e=n.randomBytes||Dr,o=n.hmac||((s,c)=>Xt(t,s,c)),{Fp:i,Fn:a}=r,{ORDER:u,BITS:f}=a,{keygen:h,getPublicKey:l,getSharedSecret:S,utils:F,lengths:R}=We(r,n),p={prehash:!0,lowS:typeof n.lowS=="boolean"?n.lowS:!0,format:"compact",extraEntropy:!1},m=u*Wt<i.ORDER;function v(s){var c=u>>qr;return s>c}function V(s,c){if(!a.isValidNot0(c))throw new Error(`invalid signature ${s}: out of range 1..Point.Fn.ORDER`);return c}function g(){if(m)throw new Error('"recovered" sig type is not supported for cofactor >2 curves')}function x(s,c){ut(c);var d=R.signature,b=c==="compact"?d:c==="recovered"?d+1:void 0;return j(s,b)}class O{constructor(c,d,b){y(this,"r");y(this,"s");y(this,"recovery");if(this.r=V("r",c),this.s=V("s",d),b!=null){if(g(),![0,1,2,3].includes(b))throw new Error("invalid recovery id");this.recovery=b}Object.freeze(this)}static fromBytes(c,d=p.format){x(c,d);var b;if(d==="der"){var{r:B,s:U}=lr.toSig(j(c));return new O(B,U)}d==="recovered"&&(b=c[0],d="compact",c=c.subarray(1));var Z=R.signature/2,I=c.subarray(0,Z),L=c.subarray(Z,Z*2);return new O(a.fromBytes(I),a.fromBytes(L),b)}static fromHex(c,d){return this.fromBytes(Ir(c),d)}assertRecovery(){var{recovery:c}=this;if(c==null)throw new Error("invalid recovery id: must be present");return c}addRecoveryBit(c){return new O(this.r,this.s,c)}recoverPublicKey(c){var{r:d,s:b}=this,B=this.assertRecovery(),U=B===2||B===3?d+u:d;if(!i.isValid(U))throw new Error("invalid recovery id: sig.r+curve.n != R.x");var Z=i.toBytes(U),I=r.fromBytes(nr(Qt((B&1)===0),Z)),L=a.inv(U),C=N(j(c,void 0,"msgHash")),Y=a.create(-C*L),P=a.create(b*L),k=r.BASE.multiplyUnsafe(Y).add(I.multiplyUnsafe(P));if(k.is0())throw new Error("invalid recovery: point at infinify");return k.assertValidity(),k}hasHighS(){return v(this.s)}toBytes(c=p.format){if(ut(c),c==="der")return Ir(lr.hexFromSig(this));var{r:d,s:b}=this,B=a.toBytes(d),U=a.toBytes(b);return c==="recovered"?(g(),nr(Uint8Array.of(this.assertRecovery()),B,U)):nr(B,U)}toHex(c){return Br(this.toBytes(c))}}var K=n.bits2int||function(s){if(s.length>8192)throw new Error("input is too large");var c=Yr(s),d=s.length*8-f;return d>0?c>>BigInt(d):c},N=n.bits2int_modN||function(s){return a.create(K(s))},T=nt(f);function E(s){return Zr("num < 2^"+f,s,sr,T),a.toBytes(s)}function w(s,c){return j(s,void 0,"message"),c?j(t(s),void 0,"prehashed message"):s}function H(s,c,d){var{lowS:b,prehash:B,extraEntropy:U}=ct(d,p);s=w(s,B);var Z=N(s),I=a.fromBytes(c);if(!a.isValidNot0(I))throw new Error("invalid private key");var L=[E(I),E(Z)];if(U!=null&&U!==!1){var C=U===!0?e(R.secretKey):U;L.push(j(C,void 0,"extraEntropy"))}var Y=nr(...L),P=Z;function k(z){var M=K(z);if(a.isValidNot0(M)){var tr=a.inv(M),G=r.BASE.multiply(M).toAffine(),Q=a.create(G.x);if(Q!==sr){var mr=a.create(tr*a.create(P+Q*I));if(mr!==sr){var Vr=(G.x===Q?0:2)|Number(G.y&qr),Nr=mr;return b&&v(mr)&&(Nr=a.neg(mr),Vr^=1),new O(Q,Nr,m?void 0:Vr)}}}}return{seed:Y,k2sig:k}}function D(s,c,d={}){var{seed:b,k2sig:B}=H(s,c,d);return Le(t.outputLen,a.BYTES,o)(b,B).toBytes(d.format)}function q(s,c,d,b={}){var{lowS:B,prehash:U,format:Z}=ct(b,p);if(d=j(d,void 0,"publicKey"),c=w(c,U),!kr(s)){var I=s instanceof O?", use sig.toBytes()":"";throw new Error("verify expects Uint8Array signature"+I)}x(s,Z);try{var L=O.fromBytes(s,Z),C=r.fromBytes(d);if(B&&L.hasHighS())return!1;var{r:Y,s:P}=L,k=N(c),z=a.inv(P),M=a.create(k*z),tr=a.create(Y*z),G=r.BASE.multiplyUnsafe(M).add(C.multiplyUnsafe(tr));return G.is0()?!1:a.create(G.x)===Y}catch{return!1}}function A(s,c,d={}){var{prehash:b}=ct(d,p);return c=w(c,b),O.fromBytes(s,"recovered").recoverPublicKey(c).toBytes()}return Object.freeze({keygen:h,getPublicKey:l,getSharedSecret:S,utils:F,lengths:R,Point:r,sign:D,verify:q,recoverPublicKey:A,Signature:O,hash:t})}var dt={p:BigInt("0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f"),n:BigInt("0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141"),h:BigInt(1),a:BigInt(0),b:BigInt(7),Gx:BigInt("0x79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798"),Gy:BigInt("0x483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8")},Je={beta:BigInt("0x7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee"),basises:[[BigInt("0x3086d221a7d46bcde86c90e49284eb15"),-BigInt("0xe4437ed6010e88286f547fa90abfe4c3")],[BigInt("0x114ca50f7a8e2f3f657c1108d9d44cfd8"),BigInt("0x3086d221a7d46bcde86c90e49284eb15")]]},te=BigInt(2);function Qe(r){var t=dt.p,n=BigInt(3),e=BigInt(6),o=BigInt(11),i=BigInt(22),a=BigInt(23),u=BigInt(44),f=BigInt(88),h=r*r*r%t,l=h*h*r%t,S=$(l,n,t)*l%t,F=$(S,n,t)*l%t,R=$(F,te,t)*h%t,p=$(R,o,t)*R%t,m=$(p,i,t)*p%t,v=$(m,u,t)*m%t,V=$(v,f,t)*v%t,g=$(V,u,t)*m%t,x=$(g,n,t)*l%t,O=$(x,a,t)*p%t,K=$(O,e,t)*h%t,N=$(K,te,t);if(!ht.eql(ht.sqr(N),r))throw new Error("Cannot find square root");return N}var ht=$r(dt.p,{sqrt:Qe}),_e=Jt(dt,{Fp:ht,endo:Je}),rn=re(_e,Rt),vr=BigInt(0),J=BigInt(1),lt=BigInt(2),tn=BigInt(8);function en(r,t,n,e){var o=r.sqr(n),i=r.sqr(e),a=r.add(r.mul(t.a,o),i),u=r.add(r.ONE,r.mul(t.d,r.mul(o,i)));return r.eql(a,u)}function nn(r,t={}){var n=zt("edwards",r,t,t.FpFnLE),{Fp:e,Fn:o}=n,i=n.CURVE,{h:a}=i;Ar(t,{},{uvRatio:"function"});var u=lt<<BigInt(o.BYTES*8)-J,f=V=>e.create(V),h=t.uvRatio||((V,g)=>{try{return{isValid:!0,value:e.sqrt(e.div(V,g))}}catch{return{isValid:!1,value:vr}}});if(!en(e,i,i.Gx,i.Gy))throw new Error("bad curve params: generator point");function l(V,g,x=!1){var O=x?J:vr;return Zr("coordinate "+V,g,O,u),g}function S(V){if(!(V instanceof p))throw new Error("EdwardsPoint expected")}var F=zr((V,g)=>{var{X:x,Y:O,Z:K}=V,N=V.is0();g==null&&(g=N?tn:e.inv(K));var T=f(x*g),E=f(O*g),w=e.mul(K,g);if(N)return{x:vr,y:J};if(w!==J)throw new Error("invZ was invalid");return{x:T,y:E}}),R=zr(V=>{var{a:g,d:x}=i;if(V.is0())throw new Error("bad point: ZERO");var{X:O,Y:K,Z:N,T}=V,E=f(O*O),w=f(K*K),H=f(N*N),D=f(H*H),q=f(E*g),A=f(H*f(q+w)),s=f(D+f(x*f(E*w)));if(A!==s)throw new Error("bad point: equation left != right (1)");var c=f(O*K),d=f(N*T);if(c!==d)throw new Error("bad point: equation left != right (2)");return!0});var v=class v{constructor(g,x,O,K){y(this,"X");y(this,"Y");y(this,"Z");y(this,"T");this.X=l("x",g),this.Y=l("y",x),this.Z=l("z",O,!0),this.T=l("t",K),Object.freeze(this)}static CURVE(){return i}static fromAffine(g){if(g instanceof v)throw new Error("extended point not allowed");var{x,y:O}=g||{};return l("x",x),l("y",O),new v(x,O,J,f(x*O))}static fromBytes(g,x=!1){var O=e.BYTES,{a:K,d:N}=i;g=Ur(j(g,O,"point")),br(x,"zip215");var T=Ur(g),E=g[O-1];T[O-1]=E&-129;var w=yr(T),H=x?u:e.ORDER;Zr("point.y",w,vr,H);var D=f(w*w),q=f(D-J),A=f(N*D-K),{isValid:s,value:c}=h(q,A);if(!s)throw new Error("bad point: invalid y coordinate");var d=(c&J)===J,b=(E&128)!==0;if(!x&&c===vr&&b)throw new Error("bad point: x=0 and x_0=1");return b!==d&&(c=f(-c)),v.fromAffine({x:c,y:w})}static fromHex(g,x=!1){return v.fromBytes(Ir(g),x)}get x(){return this.toAffine().x}get y(){return this.toAffine().y}precompute(g=8,x=!0){return m.createCache(this,g),x||this.multiply(lt),this}assertValidity(){R(this)}equals(g){S(g);var{X:x,Y:O,Z:K}=this,{X:N,Y:T,Z:E}=g,w=f(x*E),H=f(N*K),D=f(O*E),q=f(T*K);return w===H&&D===q}is0(){return this.equals(v.ZERO)}negate(){return new v(f(-this.X),this.Y,this.Z,f(-this.T))}double(){var{a:g}=i,{X:x,Y:O,Z:K}=this,N=f(x*x),T=f(O*O),E=f(lt*f(K*K)),w=f(g*N),H=x+O,D=f(f(H*H)-N-T),q=w+T,A=q-E,s=w-T,c=f(D*A),d=f(q*s),b=f(D*s),B=f(A*q);return new v(c,d,B,b)}add(g){S(g);var{a:x,d:O}=i,{X:K,Y:N,Z:T,T:E}=this,{X:w,Y:H,Z:D,T:q}=g,A=f(K*w),s=f(N*H),c=f(E*O*q),d=f(T*D),b=f((K+N)*(w+H)-A-s),B=d-c,U=d+c,Z=f(s-x*A),I=f(b*B),L=f(U*Z),C=f(b*Z),Y=f(B*U);return new v(I,L,Y,C)}subtract(g){return this.add(g.negate())}multiply(g){if(!o.isValidNot0(g))throw new Error("invalid scalar: expected 1 <= sc < curve.n");var{p:x,f:O}=m.cached(this,g,K=>Lr(v,K));return Lr(v,[x,O])[0]}multiplyUnsafe(g,x=v.ZERO){if(!o.isValid(g))throw new Error("invalid scalar: expected 0 <= sc < curve.n");return g===vr?v.ZERO:this.is0()||g===J?this:m.unsafe(this,g,O=>Lr(v,O),x)}isSmallOrder(){return this.multiplyUnsafe(a).is0()}isTorsionFree(){return m.unsafe(this,i.n).is0()}toAffine(g){return F(this,g)}clearCofactor(){return a===J?this:this.multiplyUnsafe(a)}toBytes(){var{x:g,y:x}=this.toAffine(),O=e.toBytes(x);return O[O.length-1]|=g&J?128:0,O}toHex(){return Br(this.toBytes())}toString(){return`<Point ${this.is0()?"ZERO":this.toHex()}>`}};y(v,"BASE",new v(i.Gx,i.Gy,J,f(i.Gx*i.Gy))),y(v,"ZERO",new v(vr,J,J,vr)),y(v,"Fp",e),y(v,"Fn",o);var p=v;var m=new Yt(p,o.BITS);return p.BASE.precompute(8),p}function on(r,t,n={}){if(typeof t!="function")throw new Error('"hash" function param is required');Ar(n,{},{adjustScalarBytes:"function",randomBytes:"function",domain:"function",prehash:"function",mapToCurve:"function"});var{prehash:e}=n,{BASE:o,Fp:i,Fn:a}=r,u=n.randomBytes||Dr,f=n.adjustScalarBytes||(E=>E),h=n.domain||((E,w,H)=>{if(br(H,"phflag"),w.length||H)throw new Error("Contexts/pre-hash are not supported");return E});function l(E){return a.create(yr(E))}function S(E){var w=x.secretKey;j(E,x.secretKey,"secretKey");var H=j(t(E),2*w,"hashedSecretKey"),D=f(H.slice(0,w)),q=H.slice(w,2*w),A=l(D);return{head:D,prefix:q,scalar:A}}function F(E){var{head:w,prefix:H,scalar:D}=S(E),q=o.multiply(D),A=q.toBytes();return{head:w,prefix:H,scalar:D,point:q,pointBytes:A}}function R(E){return F(E).pointBytes}function p(E=Uint8Array.of(),...w){var H=nr(...w);return l(t(h(H,j(E,void 0,"context"),!!e)))}function m(E,w,H={}){E=j(E,void 0,"message"),e&&(E=e(E));var{prefix:D,scalar:q,pointBytes:A}=F(w),s=p(H.context,D,E),c=o.multiply(s).toBytes(),d=p(H.context,c,A,E),b=a.create(s+d*q);if(!a.isValid(b))throw new Error("sign failed: invalid s");var B=nr(c,a.toBytes(b));return j(B,x.signature,"result")}var v={zip215:!0};function V(E,w,H,D=v){var{context:q,zip215:A}=D,s=x.signature;E=j(E,s,"signature"),w=j(w,void 0,"message"),H=j(H,x.publicKey,"publicKey"),A!==void 0&&br(A,"zip215"),e&&(w=e(w));var c=s/2,d=E.subarray(0,c),b=yr(E.subarray(c,s)),B,U,Z;try{B=r.fromBytes(H,A),U=r.fromBytes(d,A),Z=o.multiplyUnsafe(b)}catch{return!1}if(!A&&B.isSmallOrder())return!1;var I=p(q,U.toBytes(),B.toBytes(),w);return U.add(B.multiplyUnsafe(I)).subtract(Z).clearCofactor().is0()}var g=i.BYTES,x={secretKey:g,publicKey:g,signature:2*g,seed:g};function O(E=u(x.seed)){return j(E,x.seed,"seed")}function K(E){return kr(E)&&E.length===a.BYTES}function N(E,w){try{return!!r.fromBytes(E,w)}catch{return!1}}var T={getExtendedPublicKey:F,randomSecretKey:O,isValidSecretKey:K,isValidPublicKey:N,toMontgomery(E){var{y:w}=r.fromBytes(E),H=x.publicKey,D=H===32;if(!D&&H!==57)throw new Error("only defined for 25519 and 448");var q=D?i.div(J+w,J-w):i.div(w-J,w+J);return i.toBytes(q)},toMontgomerySecret(E){var w=x.secretKey;j(E,w);var H=t(E.subarray(0,w));return f(H).subarray(0,w)}};return Object.freeze({keygen:st(O,R),getPublicKey:R,sign:m,verify:V,utils:T,Point:r,lengths:x})}var Hr=BigInt(0),Fr=BigInt(1),Wr=BigInt(2);function an(r){return Ar(r,{adjustScalarBytes:"function",powPminus2:"function"}),Object.freeze({...r})}function fn(r){var t=an(r),{P:n,type:e,adjustScalarBytes:o,powPminus2:i,randomBytes:a}=t,u=e==="x25519";if(!u&&e!=="x448")throw new Error("invalid type");var f=a||Dr,h=u?255:448,l=u?32:56,S=BigInt(u?9:5),F=BigInt(u?121665:39081),R=u?Wr**BigInt(254):Wr**BigInt(447),p=u?BigInt(8)*Wr**BigInt(251)-Fr:BigInt(4)*Wr**BigInt(445)-Fr,m=R+p+Fr,v=s=>X(s,n),V=g(S);function g(s){return et(v(s),l)}function x(s){var c=Ur(j(s,l,"uCoordinate"));return u&&(c[31]&=127),v(yr(c))}function O(s){return yr(o(Ur(j(s,l,"scalar"))))}function K(s,c){var d=H(x(c),O(s));if(d===Hr)throw new Error("invalid private or public key received");return g(d)}function N(s){return K(s,V)}var T=N,E=K;function w(s,c,d){var b=v(s*(c-d));return c=v(c-b),d=v(d+b),{x_2:c,x_3:d}}function H(s,c){Zr("u",s,Hr,n),Zr("scalar",c,R,m);for(var d=c,b=s,B=Fr,U=Hr,Z=s,I=Fr,L=Hr,C=BigInt(h-1);C>=Hr;C--){var Y=d>>C&Fr;L^=Y,{x_2:B,x_3:Z}=w(L,B,Z),{x_2:U,x_3:I}=w(L,U,I),L=Y;var P=B+U,k=v(P*P),z=B-U,M=v(z*z),tr=k-M,G=Z+I,Q=Z-I,mr=v(Q*P),Vr=v(G*z),Nr=mr+Vr,ae=mr-Vr;Z=v(Nr*Nr),I=v(b*v(ae*ae)),B=v(k*M),U=v(tr*(k+v(F*tr)))}({x_2:B,x_3:Z}=w(L,B,Z)),{x_2:U,x_3:I}=w(L,U,I);var En=i(U);return v(B*En)}var D={secretKey:l,publicKey:l,seed:l},q=(s=f(l))=>(j(s,D.seed,"seed"),s),A={randomSecretKey:q};return Object.freeze({keygen:st(q,T),getSharedSecret:E,getPublicKey:T,scalarMult:K,scalarMultBase:N,utils:A,GuBytes:V.slice(),lengths:D})}var sn=BigInt(1),ee=BigInt(2),un=BigInt(3),cn=BigInt(5),dn=BigInt(8),Jr=BigInt("0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffed"),hn={p:Jr,n:BigInt("0x1000000000000000000000000000000014def9dea2f79cd65812631a5cf5d3ed"),h:dn,a:BigInt("0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffec"),d:BigInt("0x52036cee2b6ffe738cc740797779e89800700a4d4141d8ab75eb4dca135978a3"),Gx:BigInt("0x216936d3cd6e53fec0a4e231fdd6dc5c692cc7609525a7b2c9562d608f25d51a"),Gy:BigInt("0x6666666666666666666666666666666666666666666666666666666666666658")};function ne(r){var t=BigInt(10),n=BigInt(20),e=BigInt(40),o=BigInt(80),i=Jr,a=r*r%i*r%i,u=$(a,ee,i)*a%i,f=$(u,sn,i)*r%i,h=$(f,cn,i)*f%i,l=$(h,t,i)*h%i,S=$(l,n,i)*l%i,F=$(S,e,i)*S%i,R=$(F,o,i)*F%i,p=$(R,o,i)*F%i,m=$(p,t,i)*h%i;return{pow_p_5_8:$(m,ee,i)*r%i,b2:a}}function ie(r){return r[0]&=248,r[31]&=127,r[31]|=64,r}var oe=BigInt("19681161376707505956807079304988542015446066515923890162744021073123829784752");function ln(r,t){var n=Jr,e=X(t*t*t,n),o=X(e*e*t,n),i=ne(r*o).pow_p_5_8,a=X(r*e*i,n),u=X(t*a*a,n),f=a,h=X(a*oe,n),l=u===r,S=u===X(-r,n),F=u===X(-r*oe,n);return l&&(a=f),(S||F)&&(a=h),De(a,n)&&(a=X(-a,n)),{isValid:l||S,value:a}}var vn=nn(hn,{uvRatio:ln});function gn(r){return on(vn,Fe,Object.assign({adjustScalarBytes:ie},r))}var bn=gn({}),yn=(()=>{var r=Jr;return fn({P:r,type:"x25519",powPminus2:t=>{var{pow_p_5_8:n,b2:e}=ne(t);return X($(n,un,r)*e,r)},adjustScalarBytes:ie})})(),pn={p:BigInt("0xffffffff00000001000000000000000000000000ffffffffffffffffffffffff"),n:BigInt("0xffffffff00000000ffffffffffffffffbce6faada7179e84f3b9cac2fc632551"),h:BigInt(1),a:BigInt("0xffffffff00000001000000000000000000000000fffffffffffffffffffffffc"),b:BigInt("0x5ac635d8aa3a93e7b3ebbd55769886bc651d06b0cc53b0f63bce3c3e27d2604b"),Gx:BigInt("0x6b17d1f2e12c4247f8bce6e563a440f277037d812deb33a0f4a13945d898c296"),Gy:BigInt("0x4fe342e2fe1a7f9b8ee7eb4a7c0f9e162bce33576b315ececbb6406837bf51f5")},wn=Jt(pn),mn=re(wn,Rt);return ce(vt)})();
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

var Zt=Object.defineProperty;var Jt=(X,_,or)=>_ in X?Zt(X,_,{enumerable:!0,configurable:!0,writable:!0,value:or}):X[_]=or;var R=(X,_,or)=>Jt(X,typeof _!="symbol"?_+"":_,or);var _Crypto_ciphers=(()=>{var X=Object.defineProperty,_=Object.getOwnPropertyDescriptor,or=Object.getOwnPropertyNames,it=Object.prototype.hasOwnProperty,ot=(r,t)=>{for(var a in t)X(r,a,{get:t[a],enumerable:!0})},st=(r,t,a,e)=>{if(t&&typeof t=="object"||typeof t=="function"){var n=function(s){!it.call(r,s)&&s!==a&&X(r,s,{get:()=>t[s],enumerable:!(e=_(t,s))||e.enumerable})};for(var i of or(t))n(i)}return r},ut=r=>st(X({},"__esModule",{value:!0}),r),Mr={};ot(Mr,{cbc:()=>Lt,cfb:()=>St,chacha20poly1305:()=>Qt,ctr:()=>mt,ecb:()=>Ot,gcm:()=>Bt,managedNonce:()=>gt,randomBytes:()=>Kr,siv:()=>It,xchacha20poly1305:()=>Yt});function ht(r){return r instanceof Uint8Array||ArrayBuffer.isView(r)&&r.constructor.name==="Uint8Array"}function Ur(r){if(typeof r!="boolean")throw new Error(`boolean expected, not ${r}`)}function lr(r){if(!Number.isSafeInteger(r)||r<0)throw new Error("positive integer expected, got "+r)}function k(r,t,a=""){var e=ht(r),n=r==null?void 0:r.length,i=t!==void 0;if(!e||i&&n!==t){var s=a&&`"${a}" `,u=i?` of length ${t}`:"",o=e?`length=${n}`:`type=${typeof r}`;throw new Error(s+"expected Uint8Array"+u+", got "+o)}return r}function sr(r,t=!0){if(r.destroyed)throw new Error("Hash instance has been destroyed");if(t&&r.finished)throw new Error("Hash#digest() has already been called")}function kr(r,t){k(r,void 0,"output");var a=t.outputLen;if(r.length<a)throw new Error("digestInto() expects output buffer of length at least "+a)}function xr(r){return new Uint8Array(r.buffer,r.byteOffset,r.byteLength)}function x(r){return new Uint32Array(r.buffer,r.byteOffset,Math.floor(r.byteLength/4))}function S(...r){for(var t=0;t<r.length;t++)r[t].fill(0)}function dr(r){return new DataView(r.buffer,r.byteOffset,r.byteLength)}var ft=new Uint8Array(new Uint32Array([287454020]).buffer)[0]===68;function Ir(r,t){return r.buffer===t.buffer&&r.byteOffset<t.byteOffset+t.byteLength&&t.byteOffset<r.byteOffset+r.byteLength}function yr(r,t){if(Ir(r,t)&&r.byteOffset<t.byteOffset)throw new Error("complex overlap of input and output is not supported")}function vt(...r){for(var t=0,a=0;a<r.length;a++){var e=r[a];k(e),t+=e.length}for(var n=new Uint8Array(t),i=0,s=0;i<r.length;i++){var u=r[i];n.set(u,s),s+=u.length}return n}function ct(r,t){if(t==null||typeof t!="object")throw new Error("options must be defined");return Object.assign(r,t)}function jr(r,t){if(r.length!==t.length)return!1;for(var a=0,e=0;e<r.length;e++)a|=r[e]^t[e];return a===0}var ar=(r,t)=>{function a(e,...n){if(k(e,void 0,"key"),!ft)throw new Error("Non little-endian hardware is not yet supported");if(r.nonceLength!==void 0){var i=n[0];k(i,r.varSizeNonce?void 0:r.nonceLength,"nonce")}var s=r.tagLength;s&&n[1]!==void 0&&k(n[1],void 0,"AAD");var u=t(e,...n),o=(f,v)=>{if(v!==void 0){if(f!==2)throw new Error("cipher output not supported");k(v,void 0,"output")}},h=!1;return{encrypt(f,v){if(h)throw new Error("cannot encrypt() twice with same key + nonce");return h=!0,k(f),o(u.encrypt.length,v),u.encrypt(f,v)},decrypt(f,v){if(k(f),s&&f.length<s)throw new Error('"ciphertext" expected length bigger than tagLength='+s);return o(u.decrypt.length,v),u.decrypt(f,v)}}}return Object.assign(a,r),a};function er(r,t,a=!0){if(t===void 0)return new Uint8Array(r);if(t.length!==r)throw new Error('"output" expected Uint8Array of length '+r+", got: "+t.length);if(a&&!G(t))throw new Error("invalid output, must be aligned");return t}function Nr(r,t,a){Ur(a);var e=new Uint8Array(16),n=dr(e);return n.setBigUint64(0,BigInt(t),a),n.setBigUint64(8,BigInt(r),a),e}function G(r){return r.byteOffset%4===0}function C(r){return Uint8Array.from(r)}function Kr(r=32){var t=typeof globalThis=="object"?globalThis.crypto:null;if(typeof(t==null?void 0:t.getRandomValues)!="function")throw new Error("crypto.getRandomValues must be defined");return t.getRandomValues(new Uint8Array(r))}function gt(r,t=Kr){var{nonceLength:a}=r;lr(a);var e=(n,i)=>{var s=vt(n,i);return i.fill(0),s};return(n,...i)=>({encrypt(s){k(s);var u=t(a),o=r(n,u,...i).encrypt(s);return o instanceof Promise?o.then(h=>e(u,h)):e(u,o)},decrypt(s){k(s);var u=s.subarray(0,a),o=s.subarray(a);return r(n,u,...i).decrypt(o)}})}var rr=16,Er=new Uint8Array(16),Z=x(Er),lt=225,dt=(r,t,a,e)=>{var n=e&1;return{s3:a<<31|e>>>1,s2:t<<31|a>>>1,s1:r<<31|t>>>1,s0:r>>>1^lt<<24&-(n&1)}},Q=r=>(r>>>0&255)<<24|(r>>>8&255)<<16|(r>>>16&255)<<8|r>>>24&255|0;function yt(r){r.reverse();for(var t=r[15]&1,a=0,e=0;e<r.length;e++){var n=r[e];r[e]=n>>>1|a,a=(n&1)<<7}return r[0]^=-t&225,r}var pt=r=>r>64*1024?8:r>1024?4:2,Pr=class{constructor(r,t){R(this,"blockLen",rr);R(this,"outputLen",rr);R(this,"s0",0);R(this,"s1",0);R(this,"s2",0);R(this,"s3",0);R(this,"finished",!1);R(this,"t");R(this,"W");R(this,"windowSize");k(r,16,"key"),r=C(r);for(var a=dr(r),e=a.getUint32(0,!1),n=a.getUint32(4,!1),i=a.getUint32(8,!1),s=a.getUint32(12,!1),u=[],o=0;o<128;o++)u.push({s0:Q(e),s1:Q(n),s2:Q(i),s3:Q(s)}),{s0:e,s1:n,s2:i,s3:s}=dt(e,n,i,s);var h=pt(t||1024);if(![1,2,4,8].includes(h))throw new Error("ghash: invalid window size, expected 2, 4 or 8");this.W=h;for(var f=128/h,v=this.windowSize=2**h,l=[],c=0;c<f;c++)for(var g=0;g<v;g++){for(var y=0,p=0,d=0,w=0,U=0;U<h;U++)if(g>>>h-U-1&1){var{s0:z,s1:O,s2:B,s3:V}=u[h*c+U];y^=z,p^=O,d^=B,w^=V}l.push({s0:y,s1:p,s2:d,s3:w})}this.t=l}_updateBlock(r,t,a,e){r^=this.s0,t^=this.s1,a^=this.s2,e^=this.s3;var{W:n,t:i,windowSize:s}=this,u=0,o=0,h=0,f=0,v=(1<<n)-1,l=0;for(var c of[r,t,a,e])for(var g=0;g<4;g++)for(var y=c>>>8*g&255,p=8/n-1;p>=0;p--){var d=y>>>n*p&v,{s0:w,s1:U,s2:z,s3:O}=i[l*s+d];u^=w,o^=U,h^=z,f^=O,l+=1}this.s0=u,this.s1=o,this.s2=h,this.s3=f}update(r){sr(this),k(r),r=C(r);for(var t=x(r),a=Math.floor(r.length/rr),e=r.length%rr,n=0;n<a;n++)this._updateBlock(t[n*4+0],t[n*4+1],t[n*4+2],t[n*4+3]);return e&&(Er.set(r.subarray(a*rr)),this._updateBlock(Z[0],Z[1],Z[2],Z[3]),S(Z)),this}destroy(){var{t:r}=this;for(var t of r)t.s0=0,t.s1=0,t.s2=0,t.s3=0}digestInto(r){sr(this),kr(r,this),this.finished=!0;var{s0:t,s1:a,s2:e,s3:n}=this,i=x(r);return i[0]=t,i[1]=a,i[2]=e,i[3]=n,r}digest(){var r=new Uint8Array(rr);return this.digestInto(r),this.destroy(),r}},wt=class extends Pr{constructor(r,t){k(r);var a=yt(C(r));super(a,t),S(a)}update(r){sr(this),k(r),r=C(r);for(var t=x(r),a=r.length%rr,e=Math.floor(r.length/rr),n=0;n<e;n++)this._updateBlock(Q(t[n*4+3]),Q(t[n*4+2]),Q(t[n*4+1]),Q(t[n*4+0]));return a&&(Er.set(r.subarray(e*rr)),this._updateBlock(Q(Z[3]),Q(Z[2]),Q(Z[1]),Q(Z[0])),S(Z)),this}digestInto(r){sr(this),kr(r,this),this.finished=!0;var{s0:t,s1:a,s2:e,s3:n}=this,i=x(r);return i[0]=t,i[1]=a,i[2]=e,i[3]=n,r.reverse()}};function $r(r){var t=(e,n)=>r(n,e.length).update(e).digest(),a=r(new Uint8Array(16),0);return t.outputLen=a.outputLen,t.blockLen=a.blockLen,t.create=(e,n)=>r(e,n),t}var Rr=$r((r,t)=>new Pr(r,t)),Xt=$r((r,t)=>new wt(r,t)),T=16,mr=4,pr=new Uint8Array(T),bt=283;function Vr(r){if(![16,24,32].includes(r.length))throw new Error('"aes key" expected Uint8Array of length 16/24/32, got length='+r.length)}function Or(r){return r<<1^bt&-(r>>7)}function ur(r,t){for(var a=0;t>0;t>>=1)a^=r&-(t&1),r=Or(r);return a}var At=(r,t,a=1)=>{if(!Number.isSafeInteger(a))throw new Error("incBytes: wrong carry "+a);k(r);for(var e=0;e<r.length;e++){var n=t?e:r.length-1-e;a=a+(r[n]&255)|0,r[n]=a&255,a>>>=8}},Lr=(()=>{for(var r=new Uint8Array(256),t=0,a=1;t<256;t++,a^=Or(a))r[t]=a;var e=new Uint8Array(256);e[0]=99;for(var n=0;n<255;n++){var i=r[255-n];i|=i<<8,e[r[n]]=(i^i>>4^i>>5^i>>6^i>>7^99)&255}return S(r),e})(),Ut=Lr.map((r,t)=>Lr.indexOf(t)),kt=r=>r<<24|r>>>8,Sr=r=>r<<8|r>>>24;function Wr(r,t){if(r.length!==256)throw new Error("Wrong sbox length");for(var a=new Uint32Array(256).map((l,c)=>t(r[c])),e=a.map(Sr),n=e.map(Sr),i=n.map(Sr),s=new Uint32Array(256*256),u=new Uint32Array(256*256),o=new Uint16Array(256*256),h=0;h<256;h++)for(var f=0;f<256;f++){var v=h*256+f;s[v]=a[h]^e[f],u[v]=n[h]^i[f],o[v]=r[h]<<8|r[f]}return{sbox:r,sbox2:o,T0:a,T1:e,T2:n,T3:i,T01:s,T23:u}}var zr=Wr(Lr,r=>ur(r,3)<<24|r<<16|r<<8|ur(r,2)),Dr=Wr(Ut,r=>ur(r,11)<<24|ur(r,13)<<16|ur(r,9)<<8|ur(r,14)),xt=(()=>{for(var r=new Uint8Array(16),t=0,a=1;t<16;t++,a=Or(a))r[t]=a;return r})();function ir(r){k(r);var t=r.length;Vr(r);var{sbox2:a}=zr,e=[];G(r)||e.push(r=C(r));var n=x(r),i=n.length,s=f=>J(a,f,f,f,f),u=new Uint32Array(t+28);u.set(n);for(var o=i;o<u.length;o++){var h=u[o-1];o%i===0?h=s(kt(h))^xt[o/i-1]:i>6&&o%i===4&&(h=s(h)),u[o]=u[o-i]^h}return S(...e),u}function Hr(r){for(var t=ir(r),a=t.slice(),e=t.length,{sbox2:n}=zr,{T0:i,T1:s,T2:u,T3:o}=Dr,h=0;h<e;h+=4)for(var f=0;f<4;f++)a[h+f]=t[e-h-4+f];S(t);for(var v=4;v<e-4;v++){var l=a[v],c=J(n,l,l,l,l);a[v]=i[c&255]^s[c>>>8&255]^u[c>>>16&255]^o[c>>>24]}return a}function nr(r,t,a,e,n,i){return r[a<<8&65280|e>>>8&255]^t[n>>>8&65280|i>>>24&255]}function J(r,t,a,e,n){return r[t&255|a&65280]|r[e>>>16&255|n>>>16&65280]<<16}function Y(r,t,a,e,n){var{sbox2:i,T01:s,T23:u}=zr,o=0;t^=r[o++],a^=r[o++],e^=r[o++],n^=r[o++];for(var h=r.length/4-2,f=0;f<h;f++){var v=r[o++]^nr(s,u,t,a,e,n),l=r[o++]^nr(s,u,a,e,n,t),c=r[o++]^nr(s,u,e,n,t,a),g=r[o++]^nr(s,u,n,t,a,e);t=v,a=l,e=c,n=g}var y=r[o++]^J(i,t,a,e,n),p=r[o++]^J(i,a,e,n,t),d=r[o++]^J(i,e,n,t,a),w=r[o++]^J(i,n,t,a,e);return{s0:y,s1:p,s2:d,s3:w}}function Cr(r,t,a,e,n){var{sbox2:i,T01:s,T23:u}=Dr,o=0;t^=r[o++],a^=r[o++],e^=r[o++],n^=r[o++];for(var h=r.length/4-2,f=0;f<h;f++){var v=r[o++]^nr(s,u,t,n,e,a),l=r[o++]^nr(s,u,a,t,n,e),c=r[o++]^nr(s,u,e,a,t,n),g=r[o++]^nr(s,u,n,e,a,t);t=v,a=l,e=c,n=g}var y=r[o++]^J(i,t,n,e,a),p=r[o++]^J(i,a,t,n,e),d=r[o++]^J(i,e,a,t,n),w=r[o++]^J(i,n,e,a,t);return{s0:y,s1:p,s2:d,s3:w}}function Et(r,t,a,e){k(t,T,"nonce"),k(a);var n=a.length;e=er(n,e),yr(a,e);for(var i=t,s=x(i),{s0:u,s1:o,s2:h,s3:f}=Y(r,s[0],s[1],s[2],s[3]),v=x(a),l=x(e),c=0;c+4<=v.length;c+=4)l[c+0]=v[c+0]^u,l[c+1]=v[c+1]^o,l[c+2]=v[c+2]^h,l[c+3]=v[c+3]^f,At(i,!1,1),{s0:u,s1:o,s2:h,s3:f}=Y(r,s[0],s[1],s[2],s[3]);var g=T*Math.floor(v.length/mr);if(g<n){for(var y=new Uint32Array([u,o,h,f]),p=xr(y),d=g,w=0;d<n;d++,w++)e[d]=a[d]^p[w];S(y)}return e}function wr(r,t,a,e,n){k(a,T,"nonce"),k(e),n=er(e.length,n);for(var i=a,s=x(i),u=dr(i),o=x(e),h=x(n),f=t?0:12,v=e.length,l=u.getUint32(f,t),{s0:c,s1:g,s2:y,s3:p}=Y(r,s[0],s[1],s[2],s[3]),d=0;d+4<=o.length;d+=4)h[d+0]=o[d+0]^c,h[d+1]=o[d+1]^g,h[d+2]=o[d+2]^y,h[d+3]=o[d+3]^p,l=l+1>>>0,u.setUint32(f,l,t),{s0:c,s1:g,s2:y,s3:p}=Y(r,s[0],s[1],s[2],s[3]);var w=T*Math.floor(o.length/mr);if(w<v){for(var U=new Uint32Array([c,g,y,p]),z=xr(U),O=w,B=0;O<v;O++,B++)n[O]=e[O]^z[B];S(U)}return n}var mt=ar({blockSize:16,nonceLength:16},function(r,t){function a(e,n){if(k(e),n!==void 0&&(k(n),!G(n)))throw new Error("unaligned destination");var i=ir(r),s=C(t),u=[i,s];G(e)||u.push(e=C(e));var o=Et(i,s,e,n);return S(...u),o}return{encrypt:(e,n)=>a(e,n),decrypt:(e,n)=>a(e,n)}});function Fr(r){if(k(r),r.length%T!==0)throw new Error("aes-(cbc/ecb).decrypt ciphertext should consist of blocks with size "+T)}function qr(r,t,a){k(r);var e=r.length,n=e%T;if(!t&&n!==0)throw new Error("aec/(cbc-ecb): unpadded plaintext with disabled padding");G(r)||(r=C(r));var i=x(r);if(t){var s=T-n;s||(s=T),e=e+s}a=er(e,a),yr(r,a);var u=x(a);return{b:i,o:u,out:a}}function Gr(r,t){if(!t)return r;var a=r.length;if(!a)throw new Error("aes/pcks5: empty ciphertext not allowed");var e=r[a-1];if(e<=0||e>16)throw new Error("aes/pcks5: wrong padding");for(var n=r.subarray(0,-e),i=0;i<e;i++)if(r[a-i-1]!==e)throw new Error("aes/pcks5: wrong padding");return n}function Qr(r){var t=new Uint8Array(16),a=x(t);t.set(r);for(var e=T-r.length,n=T-e;n<T;n++)t[n]=e;return a}var Ot=ar({blockSize:16},function(r,t={}){var a=!t.disablePadding;return{encrypt(e,n){for(var{b:i,o:s,out:u}=qr(e,a,n),o=ir(r),h=0;h+4<=i.length;){var{s0:f,s1:v,s2:l,s3:c}=Y(o,i[h+0],i[h+1],i[h+2],i[h+3]);s[h++]=f,s[h++]=v,s[h++]=l,s[h++]=c}if(a){var g=Qr(e.subarray(h*4)),{s0:y,s1:p,s2:d,s3:w}=Y(o,g[0],g[1],g[2],g[3]);s[h++]=y,s[h++]=p,s[h++]=d,s[h++]=w}return S(o),u},decrypt(e,n){Fr(e);var i=Hr(r);n=er(e.length,n);var s=[i];G(e)||s.push(e=C(e)),yr(e,n);for(var u=x(e),o=x(n),h=0;h+4<=u.length;){var{s0:f,s1:v,s2:l,s3:c}=Cr(i,u[h+0],u[h+1],u[h+2],u[h+3]);o[h++]=f,o[h++]=v,o[h++]=l,o[h++]=c}return S(...s),Gr(n,a)}}}),Lt=ar({blockSize:16,nonceLength:16},function(r,t,a={}){var e=!a.disablePadding;return{encrypt(n,i){var s=ir(r),{b:u,o,out:h}=qr(n,e,i),f=t,v=[s];G(f)||v.push(f=C(f));for(var l=x(f),c=l[0],g=l[1],y=l[2],p=l[3],d=0;d+4<=u.length;)c^=u[d+0],g^=u[d+1],y^=u[d+2],p^=u[d+3],{s0:c,s1:g,s2:y,s3:p}=Y(s,c,g,y,p),o[d++]=c,o[d++]=g,o[d++]=y,o[d++]=p;if(e){var w=Qr(n.subarray(d*4));c^=w[0],g^=w[1],y^=w[2],p^=w[3],{s0:c,s1:g,s2:y,s3:p}=Y(s,c,g,y,p),o[d++]=c,o[d++]=g,o[d++]=y,o[d++]=p}return S(...v),h},decrypt(n,i){Fr(n);var s=Hr(r),u=t,o=[s];G(u)||o.push(u=C(u));var h=x(u);i=er(n.length,i),G(n)||o.push(n=C(n)),yr(n,i);for(var f=x(n),v=x(i),l=h[0],c=h[1],g=h[2],y=h[3],p=0;p+4<=f.length;){var d=l,w=c,U=g,z=y;l=f[p+0],c=f[p+1],g=f[p+2],y=f[p+3];var{s0:O,s1:B,s2:V,s3:E}=Cr(s,l,c,g,y);v[p++]=O^d,v[p++]=B^w,v[p++]=V^U,v[p++]=E^z}return S(...o),Gr(i,e)}}}),St=ar({blockSize:16,nonceLength:16},function(r,t){function a(e,n,i){k(e);var s=e.length;if(i=er(s,i),Ir(e,i))throw new Error("overlapping src and dst not supported.");var u=ir(r),o=t,h=[u];G(o)||h.push(o=C(o)),G(e)||h.push(e=C(e));for(var f=x(e),v=x(i),l=n?v:f,c=x(o),g=c[0],y=c[1],p=c[2],d=c[3],w=0;w+4<=f.length;){var{s0:U,s1:z,s2:O,s3:B}=Y(u,g,y,p,d);v[w+0]=f[w+0]^U,v[w+1]=f[w+1]^z,v[w+2]=f[w+2]^O,v[w+3]=f[w+3]^B,g=l[w++],y=l[w++],p=l[w++],d=l[w++]}var V=T*Math.floor(f.length/mr);if(V<s){({s0:g,s1:y,s2:p,s3:d}=Y(u,g,y,p,d));for(var E=xr(new Uint32Array([g,y,p,d])),m=V,L=0;m<s;m++,L++)i[m]=e[m]^E[L];S(E)}return S(...h),i}return{encrypt:(e,n)=>a(e,!0,n),decrypt:(e,n)=>a(e,!1,n)}});function zt(r,t,a,e,n){var i=n?n.length:0,s=r.create(a,e.length+i);n&&s.update(n);var u=Nr(8*e.length,8*i,t);s.update(e),s.update(u);var o=s.digest();return S(u),o}var Bt=ar({blockSize:16,nonceLength:12,tagLength:16,varSizeNonce:!0},function(r,t,a){if(t.length<8)throw new Error("aes/gcm: invalid nonce length");var e=16;function n(s,u,o){for(var h=zt(Rr,!1,s,o,a),f=0;f<u.length;f++)h[f]^=u[f];return h}function i(){var s=ir(r),u=pr.slice(),o=pr.slice();if(wr(s,!1,o,o,u),t.length===12)o.set(t);else{var h=pr.slice();dr(h).setBigUint64(8,BigInt(t.length*8),!1);var f=Rr.create(u).update(t).update(h);f.digestInto(o),f.destroy()}var v=wr(s,!1,o,pr);return{xk:s,authKey:u,counter:o,tagMask:v}}return{encrypt(s){var{xk:u,authKey:o,counter:h,tagMask:f}=i(),v=new Uint8Array(s.length+e),l=[u,o,h,f];G(s)||l.push(s=C(s)),wr(u,!1,h,s,v.subarray(0,s.length));var c=n(o,f,v.subarray(0,v.length-e));return l.push(c),v.set(c,s.length),S(...l),v},decrypt(s){var{xk:u,authKey:o,counter:h,tagMask:f}=i(),v=[u,o,f,h];G(s)||v.push(s=C(s));var l=s.subarray(0,-e),c=s.subarray(-e),g=n(o,f,l);if(v.push(g),!jr(g,c))throw new Error("aes/gcm: invalid ghash tag");var y=wr(u,!1,h,l);return S(...v),y}}});function Tt(r){return r instanceof Uint32Array||ArrayBuffer.isView(r)&&r.constructor.name==="Uint32Array"}function Br(r,t){if(k(t,16,"block"),!Tt(r))throw new Error("_encryptBlock accepts result of expandKeyLE");var a=x(t),{s0:e,s1:n,s2:i,s3:s}=Y(r,a[0],a[1],a[2],a[3]);return a[0]=e,a[1]=n,a[2]=i,a[3]=s,t}function Yr(r){for(var t=0,a=T-1;a>=0;a--){var e=(r[a]&128)>>>7;r[a]=r[a]<<1|t,t=e}return t&&(r[T-1]^=135),r}function br(r,t){if(r.length!==t.length)throw new Error("xorBlock: blocks must have same length");for(var a=0;a<r.length;a++)r[a]=r[a]^t[a];return r}var Zr=class{constructor(r){R(this,"buffer");R(this,"destroyed");R(this,"k1");R(this,"k2");R(this,"xk");k(r),Vr(r),this.xk=ir(r),this.buffer=new Uint8Array(0),this.destroyed=!1;var t=new Uint8Array(T);Br(this.xk,t),this.k1=Yr(t),this.k2=Yr(new Uint8Array(this.k1))}update(r){var{destroyed:t,buffer:a}=this;if(t)throw new Error("CMAC instance was destroyed");k(r);var e=new Uint8Array(a.length+r.length);return e.set(a),e.set(r,a.length),this.buffer=e,this}digest(){if(this.destroyed)throw new Error("CMAC instance was destroyed");var{buffer:r}=this,t=r.length,a=Math.ceil(t/T),e;a===0?(a=1,e=!1):e=t%T===0;var n=(a-1)*T,i=r.subarray(n),s;if(e)s=br(new Uint8Array(i),this.k1);else{var u=new Uint8Array(T);u.set(i),u[i.length]=128,s=br(u,this.k2)}for(var o=new Uint8Array(T),h=0;h<a-1;h++){var f=r.subarray(h*T,(h+1)*T);br(o,f),Br(this.xk,o)}return br(o,s),Br(this.xk,o),S(s),o}destroy(){var{buffer:r,destroyed:t,xk:a,k1:e,k2:n}=this;t||(this.destroyed=!0,S(r,a,e,n))}},Mt=(r,t)=>new Zr(r).update(t).digest();Mt.create=r=>new Zr(r);var It=()=>{throw new Error('"siv" from v1 is now "gcmsiv"')},Jr=r=>Uint8Array.from(r.split(""),t=>t.charCodeAt(0)),jt=Jr("expand 16-byte k"),Nt=Jr("expand 32-byte k"),Kt=x(jt),Pt=x(Nt);function b(r,t){return r<<t|r>>>32-t}function Tr(r){return r.byteOffset%4===0}var Ar=64,$t=16,Xr=2**32-1,_r=Uint32Array.of();function Rt(r,t,a,e,n,i,s,u){for(var o=n.length,h=new Uint8Array(Ar),f=x(h),v=Tr(n)&&Tr(i),l=v?x(n):_r,c=v?x(i):_r,g=0;g<o;s++){if(r(t,a,e,f,s,u),s>=Xr)throw new Error("arx: counter overflow");var y=Math.min(Ar,o-g);if(v&&y===Ar){var p=g/4;if(g%4!==0)throw new Error("arx: invalid block position");for(var d=0,w;d<$t;d++)w=p+d,c[w]=l[w]^f[d];g+=Ar;continue}for(var U=0,z;U<y;U++)z=g+U,i[z]=n[z]^h[U];g+=y}}function rt(r,t){var{allowShortKeys:a,extendNonceFn:e,counterLength:n,counterRight:i,rounds:s}=ct({allowShortKeys:!1,counterLength:8,counterRight:!1,rounds:20},t);if(typeof r!="function")throw new Error("core must be a function");return lr(n),lr(s),Ur(i),Ur(a),(u,o,h,f,v=0)=>{k(u,void 0,"key"),k(o,void 0,"nonce"),k(h,void 0,"data");var l=h.length;if(f===void 0&&(f=new Uint8Array(l)),k(f,void 0,"output"),lr(v),v<0||v>=Xr)throw new Error("arx: counter overflow");if(f.length<l)throw new Error(`arx: output (${f.length}) is shorter than data (${l})`);var c=[],g=u.length,y,p;if(g===32)c.push(y=C(u)),p=Pt;else if(g===16&&a)y=new Uint8Array(32),y.set(u),y.set(u,16),p=Kt,c.push(y);else throw k(u,32,"arx key"),new Error("invalid key size");Tr(o)||c.push(o=C(o));var d=x(y);if(e){if(o.length!==24)throw new Error("arx: extended nonce must be 24 bytes");e(p,d,x(o.subarray(0,16)),d),o=o.subarray(16)}var w=16-n;if(w!==o.length)throw new Error(`arx: nonce must be ${w} or 16 bytes`);if(w!==12){var U=new Uint8Array(12);U.set(o,i?0:12-o.length),o=U,c.push(o)}var z=x(o);return Rt(r,p,d,z,h,f,v,s),S(...c),f}}function q(r,t){return r[t++]&255|(r[t++]&255)<<8}var Vt=class{constructor(r){R(this,"blockLen",16);R(this,"outputLen",16);R(this,"buffer",new Uint8Array(16));R(this,"r",new Uint16Array(10));R(this,"h",new Uint16Array(10));R(this,"pad",new Uint16Array(8));R(this,"pos",0);R(this,"finished",!1);r=C(k(r,32,"key"));var t=q(r,0),a=q(r,2),e=q(r,4),n=q(r,6),i=q(r,8),s=q(r,10),u=q(r,12),o=q(r,14);this.r[0]=t&8191,this.r[1]=(t>>>13|a<<3)&8191,this.r[2]=(a>>>10|e<<6)&7939,this.r[3]=(e>>>7|n<<9)&8191,this.r[4]=(n>>>4|i<<12)&255,this.r[5]=i>>>1&8190,this.r[6]=(i>>>14|s<<2)&8191,this.r[7]=(s>>>11|u<<5)&8065,this.r[8]=(u>>>8|o<<8)&8191,this.r[9]=o>>>5&127;for(var h=0;h<8;h++)this.pad[h]=q(r,16+2*h)}process(r,t,a=!1){var e=a?0:2048,{h:n,r:i}=this,s=i[0],u=i[1],o=i[2],h=i[3],f=i[4],v=i[5],l=i[6],c=i[7],g=i[8],y=i[9],p=q(r,t+0),d=q(r,t+2),w=q(r,t+4),U=q(r,t+6),z=q(r,t+8),O=q(r,t+10),B=q(r,t+12),V=q(r,t+14),E=n[0]+(p&8191),m=n[1]+((p>>>13|d<<3)&8191),L=n[2]+((d>>>10|w<<6)&8191),M=n[3]+((w>>>7|U<<9)&8191),I=n[4]+((U>>>4|z<<12)&8191),j=n[5]+(z>>>1&8191),N=n[6]+((z>>>14|O<<2)&8191),K=n[7]+((O>>>11|B<<5)&8191),P=n[8]+((B>>>8|V<<8)&8191),$=n[9]+(V>>>5|e),A=0,D=A+E*s+m*(5*y)+L*(5*g)+M*(5*c)+I*(5*l);A=D>>>13,D&=8191,D+=j*(5*v)+N*(5*f)+K*(5*h)+P*(5*o)+$*(5*u),A+=D>>>13,D&=8191;var H=A+E*u+m*s+L*(5*y)+M*(5*g)+I*(5*c);A=H>>>13,H&=8191,H+=j*(5*l)+N*(5*v)+K*(5*f)+P*(5*h)+$*(5*o),A+=H>>>13,H&=8191;var F=A+E*o+m*u+L*s+M*(5*y)+I*(5*g);A=F>>>13,F&=8191,F+=j*(5*c)+N*(5*l)+K*(5*v)+P*(5*f)+$*(5*h),A+=F>>>13,F&=8191;var tr=A+E*h+m*o+L*u+M*s+I*(5*y);A=tr>>>13,tr&=8191,tr+=j*(5*g)+N*(5*c)+K*(5*l)+P*(5*v)+$*(5*f),A+=tr>>>13,tr&=8191;var W=A+E*f+m*h+L*o+M*u+I*s;A=W>>>13,W&=8191,W+=j*(5*y)+N*(5*g)+K*(5*c)+P*(5*l)+$*(5*v),A+=W>>>13,W&=8191;var hr=A+E*v+m*f+L*h+M*o+I*u;A=hr>>>13,hr&=8191,hr+=j*s+N*(5*y)+K*(5*g)+P*(5*c)+$*(5*l),A+=hr>>>13,hr&=8191;var fr=A+E*l+m*v+L*f+M*h+I*o;A=fr>>>13,fr&=8191,fr+=j*u+N*s+K*(5*y)+P*(5*g)+$*(5*c),A+=fr>>>13,fr&=8191;var vr=A+E*c+m*l+L*v+M*f+I*h;A=vr>>>13,vr&=8191,vr+=j*o+N*u+K*s+P*(5*y)+$*(5*g),A+=vr>>>13,vr&=8191;var cr=A+E*g+m*c+L*l+M*v+I*f;A=cr>>>13,cr&=8191,cr+=j*h+N*o+K*u+P*s+$*(5*y),A+=cr>>>13,cr&=8191;var gr=A+E*y+m*g+L*c+M*l+I*v;A=gr>>>13,gr&=8191,gr+=j*f+N*h+K*o+P*u+$*s,A+=gr>>>13,gr&=8191,A=(A<<2)+A|0,A=A+D|0,D=A&8191,A=A>>>13,H+=A,n[0]=D,n[1]=H,n[2]=F,n[3]=tr,n[4]=W,n[5]=hr,n[6]=fr,n[7]=vr,n[8]=cr,n[9]=gr}finalize(){var{h:r,pad:t}=this,a=new Uint16Array(10),e=r[1]>>>13;r[1]&=8191;for(var n=2;n<10;n++)r[n]+=e,e=r[n]>>>13,r[n]&=8191;r[0]+=e*5,e=r[0]>>>13,r[0]&=8191,r[1]+=e,e=r[1]>>>13,r[1]&=8191,r[2]+=e,a[0]=r[0]+5,e=a[0]>>>13,a[0]&=8191;for(var i=1;i<10;i++)a[i]=r[i]+e,e=a[i]>>>13,a[i]&=8191;a[9]-=8192;for(var s=(e^1)-1,u=0;u<10;u++)a[u]&=s;s=~s;for(var o=0;o<10;o++)r[o]=r[o]&s|a[o];r[0]=(r[0]|r[1]<<13)&65535,r[1]=(r[1]>>>3|r[2]<<10)&65535,r[2]=(r[2]>>>6|r[3]<<7)&65535,r[3]=(r[3]>>>9|r[4]<<4)&65535,r[4]=(r[4]>>>12|r[5]<<1|r[6]<<14)&65535,r[5]=(r[6]>>>2|r[7]<<11)&65535,r[6]=(r[7]>>>5|r[8]<<8)&65535,r[7]=(r[8]>>>8|r[9]<<5)&65535;var h=r[0]+t[0];r[0]=h&65535;for(var f=1;f<8;f++)h=(r[f]+t[f]|0)+(h>>>16)|0,r[f]=h&65535;S(a)}update(r){sr(this),k(r),r=C(r);for(var{buffer:t,blockLen:a}=this,e=r.length,n=0;n<e;){var i=Math.min(a-this.pos,e-n);if(i===a){for(;a<=e-n;n+=a)this.process(r,n);continue}t.set(r.subarray(n,n+i),this.pos),this.pos+=i,n+=i,this.pos===a&&(this.process(t,0,!1),this.pos=0)}return this}destroy(){S(this.h,this.r,this.buffer,this.pad)}digestInto(r){sr(this),kr(r,this),this.finished=!0;var{buffer:t,h:a}=this,{pos:e}=this;if(e){for(t[e++]=1;e<16;e++)t[e]=0;this.process(t,0,!0)}this.finalize();for(var n=0,i=0;i<8;i++)r[n++]=a[i]>>>0,r[n++]=a[i]>>>8;return r}digest(){var{buffer:r,outputLen:t}=this;this.digestInto(r);var a=r.slice(0,t);return this.destroy(),a}};function Wt(r){var t=(e,n)=>r(n).update(e).digest(),a=r(new Uint8Array(32));return t.outputLen=a.outputLen,t.blockLen=a.blockLen,t.create=e=>r(e),t}var Dt=Wt(r=>new Vt(r));function tt(r,t,a,e,n,i=20){for(var s=r[0],u=r[1],o=r[2],h=r[3],f=t[0],v=t[1],l=t[2],c=t[3],g=t[4],y=t[5],p=t[6],d=t[7],w=n,U=a[0],z=a[1],O=a[2],B=s,V=u,E=o,m=h,L=f,M=v,I=l,j=c,N=g,K=y,P=p,$=d,A=w,D=U,H=z,F=O,tr=0;tr<i;tr+=2)B=B+L|0,A=b(A^B,16),N=N+A|0,L=b(L^N,12),B=B+L|0,A=b(A^B,8),N=N+A|0,L=b(L^N,7),V=V+M|0,D=b(D^V,16),K=K+D|0,M=b(M^K,12),V=V+M|0,D=b(D^V,8),K=K+D|0,M=b(M^K,7),E=E+I|0,H=b(H^E,16),P=P+H|0,I=b(I^P,12),E=E+I|0,H=b(H^E,8),P=P+H|0,I=b(I^P,7),m=m+j|0,F=b(F^m,16),$=$+F|0,j=b(j^$,12),m=m+j|0,F=b(F^m,8),$=$+F|0,j=b(j^$,7),B=B+M|0,F=b(F^B,16),P=P+F|0,M=b(M^P,12),B=B+M|0,F=b(F^B,8),P=P+F|0,M=b(M^P,7),V=V+I|0,A=b(A^V,16),$=$+A|0,I=b(I^$,12),V=V+I|0,A=b(A^V,8),$=$+A|0,I=b(I^$,7),E=E+j|0,D=b(D^E,16),N=N+D|0,j=b(j^N,12),E=E+j|0,D=b(D^E,8),N=N+D|0,j=b(j^N,7),m=m+L|0,H=b(H^m,16),K=K+H|0,L=b(L^K,12),m=m+L|0,H=b(H^m,8),K=K+H|0,L=b(L^K,7);var W=0;e[W++]=s+B|0,e[W++]=u+V|0,e[W++]=o+E|0,e[W++]=h+m|0,e[W++]=f+L|0,e[W++]=v+M|0,e[W++]=l+I|0,e[W++]=c+j|0,e[W++]=g+N|0,e[W++]=y+K|0,e[W++]=p+P|0,e[W++]=d+$|0,e[W++]=w+A|0,e[W++]=U+D|0,e[W++]=z+H|0,e[W++]=O+F|0}function Ht(r,t,a,e){for(var n=r[0],i=r[1],s=r[2],u=r[3],o=t[0],h=t[1],f=t[2],v=t[3],l=t[4],c=t[5],g=t[6],y=t[7],p=a[0],d=a[1],w=a[2],U=a[3],z=0;z<20;z+=2)n=n+o|0,p=b(p^n,16),l=l+p|0,o=b(o^l,12),n=n+o|0,p=b(p^n,8),l=l+p|0,o=b(o^l,7),i=i+h|0,d=b(d^i,16),c=c+d|0,h=b(h^c,12),i=i+h|0,d=b(d^i,8),c=c+d|0,h=b(h^c,7),s=s+f|0,w=b(w^s,16),g=g+w|0,f=b(f^g,12),s=s+f|0,w=b(w^s,8),g=g+w|0,f=b(f^g,7),u=u+v|0,U=b(U^u,16),y=y+U|0,v=b(v^y,12),u=u+v|0,U=b(U^u,8),y=y+U|0,v=b(v^y,7),n=n+h|0,U=b(U^n,16),g=g+U|0,h=b(h^g,12),n=n+h|0,U=b(U^n,8),g=g+U|0,h=b(h^g,7),i=i+f|0,p=b(p^i,16),y=y+p|0,f=b(f^y,12),i=i+f|0,p=b(p^i,8),y=y+p|0,f=b(f^y,7),s=s+v|0,d=b(d^s,16),l=l+d|0,v=b(v^l,12),s=s+v|0,d=b(d^s,8),l=l+d|0,v=b(v^l,7),u=u+o|0,w=b(w^u,16),c=c+w|0,o=b(o^c,12),u=u+o|0,w=b(w^u,8),c=c+w|0,o=b(o^c,7);var O=0;e[O++]=n,e[O++]=i,e[O++]=s,e[O++]=u,e[O++]=p,e[O++]=d,e[O++]=w,e[O++]=U}var Ct=rt(tt,{counterRight:!1,counterLength:4,allowShortKeys:!1}),Ft=rt(tt,{counterRight:!1,counterLength:8,extendNonceFn:Ht,allowShortKeys:!1}),qt=new Uint8Array(16),et=(r,t)=>{r.update(t);var a=t.length%16;a&&r.update(qt.subarray(a))},Gt=new Uint8Array(32);function nt(r,t,a,e,n){n!==void 0&&k(n,void 0,"AAD");var i=r(t,a,Gt),s=Nr(e.length,n?n.length:0,!0),u=Dt.create(i);n&&et(u,n),et(u,e),u.update(s);var o=u.digest();return S(i,s),o}var at=r=>(t,a,e)=>({encrypt(n,i){var s=n.length;i=er(s+16,i,!1),i.set(n);var u=i.subarray(0,-16);r(t,a,u,u,1);var o=nt(r,t,a,u,e);return i.set(o,s),S(o),i},decrypt(n,i){i=er(n.length-16,i,!1);var s=n.subarray(0,-16),u=n.subarray(-16),o=nt(r,t,a,s,e);if(!jr(u,o))throw new Error("invalid tag");return i.set(n.subarray(0,-16)),r(t,a,i,i,1),S(o),i}}),Qt=ar({blockSize:64,nonceLength:12,tagLength:16},at(Ct)),Yt=ar({blockSize:64,nonceLength:24,tagLength:16},at(Ft));return ut(Mr)})();
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

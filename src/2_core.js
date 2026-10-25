/* ================= utils ================= */
const $=s=>document.querySelector(s);
const app=$("#app");
const esc=s=>String(s==null?"":s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const cap1=s=>s.charAt(0).toUpperCase()+s.slice(1);
function fmt(n){n=Math.floor(n);if(n<1000)return String(n);const u=n<1e6?[1e3,"K"]:n<1e9?[1e6,"M"]:[1e9,"B"];let v=n/u[0];v=v<100?Math.floor(v*10)/10:Math.floor(v);return String(v).replace(/\.0$/,"")+u[1];}
const fmtX=n=>Math.floor(n).toLocaleString("en-US");
function hashStr(str){let h=1779033703^str.length;for(let i=0;i<str.length;i++){h=Math.imul(h^str.charCodeAt(i),3432918353);h=h<<13|h>>>19;}h=Math.imul(h^h>>>16,2246822507);h=Math.imul(h^h>>>13,3266489909);return (h^h>>>16)>>>0;}
function R(key){let a=hashStr(String(key));const f=()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};
  return{f,int:(x,y)=>x+Math.floor(f()*(y-x+1)),pick:a=>a[Math.floor(f()*a.length)],ch:p=>f()<p,log:(x,y)=>Math.exp(Math.log(x)+f()*(Math.log(y)-Math.log(x)))};}
function el(html){const t=document.createElement("template");t.innerHTML=html.trim();return t.content.firstElementChild;}
const toastEl=$("#toast");let toastT;
function toast(m){toastEl.textContent=m;toastEl.classList.add("on");clearTimeout(toastT);toastT=setTimeout(()=>toastEl.classList.remove("on"),1900);}
const dayKey=Math.floor(Date.now()/864e5);
function relT(at){const s=Math.max(0,(Date.now()-at)/1000|0);return s<10?"now":s<60?s+"s":s<3600?Math.floor(s/60)+"m":s<86400?Math.floor(s/3600)+"h":Math.floor(s/86400)+"d";}
const ICON={
 heart:'<svg viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>',
 cmt:'<svg viewBox="0 0 24 24"><path d="M12 3C6.5 3 2 6.8 2 11.5c0 2.6 1.4 4.9 3.6 6.5L5 22l4.3-2.4c.9.2 1.8.3 2.7.3 5.5 0 10-3.8 10-8.4S17.5 3 12 3zM7.5 13a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm4.5 0a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm4.5 0a1.5 1.5 0 110-3 1.5 1.5 0 010 3z"/></svg>',
 save:'<svg viewBox="0 0 24 24"><path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z"/></svg>',
 share:'<svg viewBox="0 0 24 24"><path d="M14 4.5l8 7.5-8 7.5V15c-5.5 0-9 1.8-12 6 1.2-6 4.5-11.5 12-12.5V4.5z"/></svg>',
 play:'<svg viewBox="0 0 24 24" width="13" height="13" fill="#fff"><path d="M7 4v16l13-8z"/></svg>',
 bigplay:'<svg viewBox="0 0 24 24"><path d="M7 4v16l13-8z"/></svg>',
 back:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M15 4l-8 8 8 8"/></svg>',
 grid:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z"/></svg>',
 repost:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 2l3 3-3 3M4 11V9a4 4 0 014-4h12M7 22l-3-3 3-3M20 13v2a4 4 0 01-4 4H4"/></svg>',
 heartO:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20.5l-1.2-1.1C6 15 3 12.3 3 8.9 3 6.2 5.1 4 7.8 4c1.6 0 3.1.8 4.2 2 1.1-1.2 2.6-2 4.2-2C18.9 4 21 6.2 21 8.9c0 3.4-3 6.1-7.8 10.5L12 20.5z"/></svg>',
 bmO:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M6 3h12v18l-6-3.5L6 21z"/></svg>',
 sndOn:'<svg viewBox="0 0 24 24"><path d="M4 9h4l5-4v14l-5-4H4z" fill="#fff"/><path d="M16 8.5a5 5 0 010 7M18.5 6a8.5 8.5 0 010 12" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round"/></svg>',
 sndOff:'<svg viewBox="0 0 24 24"><path d="M4 9h4l5-4v14l-5-4H4z" fill="#fff"/><path d="M16 9l5 6M21 9l-5 6" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round"/></svg>',
 chart:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M5 20V11M11 20V5M17 20v-6M3 20h18"/></svg>',
 menu:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M4 6h16M4 12h16M4 18h16"/></svg>',
 dots:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M5 12h.01M12 12h.01M19 12h.01"/></svg>',
 send:'<svg viewBox="0 0 24 24"><path d="M3 11.5L21 3l-8.5 18-2-7.5z" fill="currentColor"/></svg>'
};


/* ================= icon library ================= */
const IP={
 eye:'<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
 heart:'<path d="M12 20.5l-1.2-1.1C6 15 3 12.3 3 8.9 3 6.2 5.1 4 7.8 4c1.6 0 3.1.8 4.2 2 1.1-1.2 2.6-2 4.2-2C18.9 4 21 6.2 21 8.9c0 3.4-3 6.1-7.8 10.5L12 20.5z"/>',
 gem:'<path d="M6 3h12l4 6-10 12L2 9z"/><path d="M2 9h20M12 21L8 9l4-6 4 6z"/>',
 trophy:'<path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 01-10 0z"/><path d="M17 5h3a3 3 0 01-3 4M7 5H4a3 3 0 003 4"/>',
 coin:'<circle cx="12" cy="12" r="9"/><path d="M12 6.5v11M14.8 9.2c-.4-.9-1.5-1.4-2.8-1.4-1.6 0-2.7.8-2.7 2s1.2 1.6 2.7 2 2.8.9 2.8 2.1-1.2 2-2.8 2c-1.4 0-2.5-.6-2.9-1.5"/>',
 gift:'<rect x="3" y="8" width="18" height="4" rx="1"/><path d="M5 12v9h14v-9M12 8v13M12 8S10.5 3 8 3a2.5 2.5 0 000 5zM12 8s1.5-5 4-5a2.5 2.5 0 010 5z"/>',
 share:'<path d="M14 4.5l7 7-7 7V15c-5 0-8.5 1.6-11 5 1-5.5 4.3-10 11-11z"/>',
 plus:'<path d="M12 5v14M5 12h14"/>',
 upload:'<path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12"/>',
 sparkle:'<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/><path d="M19 3v4M17 5h4"/>',
 trash:'<path d="M3 6h18M8 6V4h8v2M6 6l1 15h10l1-15M10 11v6M14 11v6"/>',
 link:'<path d="M10 13a5 5 0 007.5.5l3-3a5 5 0 00-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 00-7.5-.5l-3 3a5 5 0 007 7l1.7-1.7"/>',
 camera:'<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5h.01"/>',
 playbox:'<rect x="2" y="5" width="20" height="14" rx="4"/><path d="M10 9l5 3-5 3z"/>',
 play:'<path d="M7 4v16l13-8z"/>',
 repost:'<path d="M17 2l3 3-3 3M4 11V9a4 4 0 014-4h12M7 22l-3-3 3-3M20 13v2a4 4 0 01-4 4H4"/>',
 duet:'<rect x="3" y="4" width="8" height="16" rx="2"/><rect x="13" y="4" width="8" height="16" rx="2"/>',
 download:'<path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/>',
 star:'<path d="M12 2.8l2.8 5.8 6.4.9-4.6 4.5 1.1 6.3L12 17.3l-5.7 3 1.1-6.3L2.8 9.5l6.4-.9z"/>',
 broken:'<path d="M12 6c-1.1-1.2-2.6-2-4.2-2C5.1 4 3 6.2 3 8.9c0 3.4 3 6.1 7.8 10.5L12 20.5l-1.5-3 2-3-3-2.5 2.5-3zM13 20c4.8-4.4 8-7.7 8-11.1C21 6.2 18.9 4 16.2 4c-1.4 0-2.7.6-3.7 1.5"/>',
 flag:'<path d="M5 21V4M5 4h11l-2 4 2 4H5"/>',
 live:'<circle cx="12" cy="12" r="2.5"/><path d="M7.8 7.8a6 6 0 000 8.4M16.2 7.8a6 6 0 010 8.4M5 5a10 10 0 000 14M19 5a10 10 0 010 14"/>',
 moon:'<path d="M20 14.5A8.5 8.5 0 019.5 4 8.5 8.5 0 1020 14.5z"/>',
 sound:'<path d="M4 9h4l5-4v14l-5-4H4z"/><path d="M16 8.5a5 5 0 010 7M18.5 6a8.5 8.5 0 010 12"/>',
 bell:'<path d="M6 8a6 6 0 0112 0c0 7 3 8 3 8H3s3-1 3-8M10 20a2 2 0 004 0"/>',
 chart:'<path d="M5 20V11M11 20V5M17 20v-6M3 20h18"/>',
 edit:'<path d="M4 20h4L19 9l-4-4L4 16z"/><path d="M14 6l4 4"/>',
 brief:'<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2M3 13h18"/>',
 flame:'<path d="M12 22c4 0 7-3 7-7 0-3-2-5-3-7-1 2-2 3-3 3 0-3-1-6-4-9 0 4-4 6-4 12 0 4 3 8 7 8z"/>',
 lock:'<rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 018 0v4"/>',
 music:'<path d="M9 18V5l11-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="17" cy="16" r="3"/>',
 folder:'<path d="M3 6a2 2 0 012-2h4l2 2h8a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>',
 check:'<path d="M5 12l5 5 9-10"/>',x:'<path d="M6 6l12 12M18 6L6 18"/>',refresh:'<path d="M20 11a8 8 0 10-2.3 5.7M20 4v7h-7"/>',
 down:'<path d="M6 9l6 6 6-6"/>',chevR:'<path d="M9 6l6 6-6 6"/>',trend:'<path d="M3 17l6-6 4 4 8-8M15 7h6v6"/>',
 video:'<rect x="2" y="6" width="14" height="12" rx="2"/><path d="M16 10l6-3v10l-6-3z"/>',
 smile:'<circle cx="12" cy="12" r="9"/><path d="M8 14a5 5 0 008 0M9 9.5h.01M15 9.5h.01"/>',
 laugh:'<circle cx="12" cy="12" r="9"/><path d="M7.5 13h9a4.5 4.5 0 01-9 0zM8 9l2 1M16 9l-2 1"/>',
 plane:'<path d="M22 2L11 13M22 2l-7 20-4-9-9-4z"/>',
 utensils:'<path d="M7 2v20M4 2v6a3 3 0 006 0V2M17 22V2c-2 2-3 5-3 8h3"/>',
 gamepad:'<rect x="2" y="7" width="20" height="11" rx="5"/><path d="M7 11v4M5 13h4M15.5 12h.01M18 14h.01"/>',
 cup:'<path d="M4 8h13v6a5 5 0 01-5 5H9a5 5 0 01-5-5zM17 10h1.5a2.5 2.5 0 010 5H17M8 2v3M12 2v3"/>',
 dumbbell:'<path d="M6 7v10M3 9v6M18 7v10M21 9v6M6 12h12"/>',
 paw:'<circle cx="6.5" cy="10" r="1.8"/><circle cx="17.5" cy="10" r="1.8"/><circle cx="9.5" cy="5.5" r="1.8"/><circle cx="14.5" cy="5.5" r="1.8"/><path d="M12 12c-3 0-5.5 3.5-5.5 6 0 1.5 1.2 2 2.5 2 1.2 0 2-.6 3-.6s1.8.6 3 .6c1.3 0 2.5-.5 2.5-2 0-2.5-2.5-6-5.5-6z"/>',
 book:'<path d="M4 4h6a2 2 0 012 2v14a2 2 0 00-2-2H4zM20 4h-6a2 2 0 00-2 2v14a2 2 0 012-2h6z"/>',
 palette:'<path d="M12 3a9 9 0 100 18c1 0 1.5-.8 1.5-1.6 0-1.4-1.3-1.6-1.3-2.9 0-.9.7-1.5 1.6-1.5H16a5 5 0 005-5c0-3.9-4-7-9-7z"/><path d="M7.5 11h.01M10 7h.01M15 7.5h.01"/>',
 building:'<rect x="4" y="3" width="10" height="18"/><path d="M14 9h6v12h-6M7 7h1M10 7h1M7 11h1M10 11h1M7 15h1M10 15h1"/>',
 cloud:'<path d="M7 18a4.5 4.5 0 01-.5-9A6 6 0 0118 9.5a4 4 0 01-1 8.5z"/>',
 sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
 bolt:'<path d="M13 2L4 14h7l-1 8 9-12h-7z"/>',
 crown:'<path d="M3 8l4.5 4L12 5l4.5 7L21 8l-2 11H5z"/>',
 rocket:'<path d="M12 2c4 2 6 6 6 11l-3 3H9l-3-3c0-5 2-9 6-11z"/><circle cx="12" cy="10" r="2"/><path d="M9 16l-2 5 3-2M15 16l2 5-3-2"/>',
 planet:'<circle cx="12" cy="12" r="6"/><path d="M4.5 15.5c-2 2.2 1.4 3 7.5 1.2s10-5.2 9.5-7.4c-.3-1.1-2-1.4-4.5-1"/>',
 rose:'<path d="M12 13c3 0 5-2 5-5 0-2-1-3-2-4-1 1-2 1.5-3 1.5S10 5 9 4C8 5 7 6 7 8c0 3 2 5 5 5zM12 13v9M12 19c-1.5-2-4-2.5-5.5-1.5 1.5 2 4 2.5 5.5 1.5zM12 18c1.5-2 4-2.5 5.5-1.5-1.5 2-4 2.5-5.5 1.5z"/>',
 drop:'<path d="M12 2.5S5 10 5 14.5a7 7 0 0014 0C19 10 12 2.5 12 2.5z"/>',
 headphones:'<path d="M3 18v-6a9 9 0 0118 0v6"/><path d="M21 19a2 2 0 01-2 2h-1v-6h3zM3 19a2 2 0 002 2h1v-6H3z"/>',
 leaf:'<path d="M5 21c0-9 5-15 16-16-1 11-7 16-16 16zM5 21l8-8"/>',
 eyes:'<circle cx="7.5" cy="12" r="4"/><circle cx="16.5" cy="12" r="4"/><path d="M8.5 12h.01M17.5 12h.01"/>',
 users:'<circle cx="9" cy="8" r="3.5"/><path d="M2 20c0-3.5 3-6 7-6s7 2.5 7 6M16 4.5a3.5 3.5 0 010 7M22 20c0-3-2-5-5-5.5"/>',
 film:'<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M7 3v18M17 3v18M3 8h4M3 16h4M17 8h4M17 16h4M3 12h18"/>'
};
function ic(n,o={}){const col=o.color||"currentColor",f=o.fill?(o.fill===true?col:o.fill):"none";
  return `<svg class="ic ${o.cls||""}" viewBox="0 0 24 24" fill="${f}" stroke="${col}" stroke-width="${o.sw||2}" stroke-linecap="round" stroke-linejoin="round"${o.size?` style="width:${o.size}px;height:${o.size}px"`:""}>${IP[n]||IP.sparkle}</svg>`;}
const SVGIMG={};
function svgImg(n,col){const k=n+col;if(SVGIMG[k])return SVGIMG[k];const im=new Image();im.src="data:image/svg+xml;charset=utf-8,"+encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="96" height="96" fill="${col}" stroke="${col}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${IP[n]||IP.sparkle}</svg>`);return SVGIMG[k]=im;}
const AVI=["moon","star","heart","flame","bolt","music","leaf","sun","cloud","gem","crown","paw","smile","rocket","planet","sparkle","headphones","drop"];
const STK=["flame","sparkle","heart","star","bolt","crown","music","smile","rocket","eyes"];
const STKC={flame:"#ff7a1a",sparkle:"#ffd23c",heart:"#ff3b6b",star:"#ffc531",bolt:"#ffe14a",crown:"#ffb020",music:"#7b5cff",smile:"#ffd23c",rocket:"#20d5ec",eyes:"#ffffff"};
const stkName=s=>STK.includes(s)?s:"sparkle";

/* ================= state ================= */
const LS="naymo_v2";
const DEF={profile:{name:"Nay",username:"nay",bio:"welcome to my world ✦\nnew videos every day\nbusiness: check inbox",hue:330,icon:"moon",link:"naymo.link/nay",ig:"nay",yt:"nay"},
  set:{followers:168e6,likes:19.8e9,following:948,fps:4,speed:"viral",dark:false,sound:true,popups:true,badge:true,real:true,film:true},
  posts:[],uc:{},liked:{},likedC:{},saved:{},follow:{},notifs:[],seen:0,reposts:{},stories:[],seenStories:{},dms:null,coins:5000,diamonds:0,earnings:0,favTags:{},hidden:{},fStart:Date.now()};
let ST=JSON.parse(JSON.stringify(DEF));
try{const s=JSON.parse(localStorage.getItem(LS)||"null");if(s){ST=Object.assign(ST,s);ST.set=Object.assign({},DEF.set,s.set||{});ST.profile=Object.assign({},DEF.profile,s.profile||{});}}catch(e){}
if(!ST.profile.icon)ST.profile.icon=ST.profile.emoji?"moon":null;
function save(){try{localStorage.setItem(LS,JSON.stringify(ST));}catch(e){}}
const T0=Date.now();
const SPEED={chill:{m:.3,tau:6e5},normal:{m:.7,tau:3e5},viral:{m:1,tau:1.8e5},insane:{m:3,tau:4.5e4}};

/* ================= media store (IndexedDB) ================= */
const IDB={db:null,
  open(){return new Promise(res=>{try{const r=indexedDB.open("naymo",1);r.onupgradeneeded=()=>r.result.createObjectStore("m");r.onsuccess=()=>{this.db=r.result;res();};r.onerror=()=>res();}catch(e){res();}setTimeout(res,2500);});},
  put(k,v){return new Promise(res=>{try{const t=this.db.transaction("m","readwrite");t.objectStore("m").put(v,k);t.oncomplete=()=>res(true);t.onerror=()=>res(false);}catch(e){res(false);}});},
  get(k){return new Promise(res=>{try{const q=this.db.transaction("m").objectStore("m").get(k);q.onsuccess=()=>res(q.result);q.onerror=()=>res(null);}catch(e){res(null);}});},
  del(k){try{this.db.transaction("m","readwrite").objectStore("m").delete(k);}catch(e){}}};
const MEDIA={};
async function loadMedia(){await IDB.open();if(!IDB.db)return;
  for(const x of [...ST.posts,...ST.stories,...(ST.lib||[]).map(l=>Object.assign({media:1},l))]){if(x.media&&!MEDIA[x.id]){const b=await IDB.get(x.id);if(b)MEDIA[x.id]=URL.createObjectURL(b);}}}

/* ================= audio engine ================= */
const AU={ctx:null,master:null,nb:null,key:null,seed:null,next:0,i:0,bed:null,pat:null};
function auInit(){if(AU.ctx){if(AU.ctx.state==="suspended")AU.ctx.resume();return;}
  try{const C=window.AudioContext||window.webkitAudioContext;AU.ctx=new C();AU.master=AU.ctx.createGain();AU.master.gain.value=ST.set.sound?.45:0;AU.master.connect(AU.ctx.destination);
    const n=AU.ctx.createBuffer(1,AU.ctx.sampleRate*2,AU.ctx.sampleRate),d=n.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=Math.random()*2-1;AU.nb=n;}catch(e){AU.ctx=null;}}
document.addEventListener("pointerdown",auInit,true);document.addEventListener("keydown",auInit,true);
const SCALES={maj:[0,2,4,5,7,9,11],min:[0,2,3,5,7,8,10],pent:[0,2,4,7,9]};
const PRE={sunset:{bpm:88,dr:1,bass:"sine",lead:"triangle",pad:1,sc:"maj",root:55},city:{bpm:82,dr:1,bass:"sine",lead:"sine",pad:1,sc:"min",root:52,bed:"vinyl"},
 ocean:{bpm:70,dr:0,lead:"sine",pad:1,sc:"pent",root:57,bed:"waves"},space:{bpm:72,dr:0,bass:"sine",lead:"sine",pad:1,sc:"min",root:50},
 neon:{bpm:108,dr:2,bass:"sawtooth",lead:"square",pad:1,sc:"min",root:45},aurora:{bpm:66,dr:0,lead:"triangle",pad:1,sc:"pent",root:62,bed:"wind"},
 fireworks:{bpm:120,dr:2,bass:"sawtooth",lead:"square",sc:"maj",root:48,bed:"pops"},lava:{bpm:70,dr:0,bass:"sine",pad:1,sc:"min",root:48},
 snow:{bpm:72,dr:1,lead:"triangle",pad:1,sc:"maj",root:60,bed:"crackle"},ramen:{bpm:84,dr:1,bass:"sine",lead:"triangle",pad:1,sc:"pent",root:53},
 gaming:{bpm:140,dr:3,bass:"square",lead:"square",sc:"maj",root:48},music:{bpm:126,dr:2,bass:"sawtooth",lead:"sawtooth",pad:1,sc:"min",root:45},
 rain:{bpm:76,dr:1,bass:"sine",lead:"sine",pad:1,sc:"min",root:50,bed:"rain"},coffee:{bpm:80,dr:1,bass:"sine",lead:"triangle",pad:1,sc:"maj",root:53,bed:"vinyl"},
 dance:{bpm:122,dr:2,bass:"sawtooth",lead:"square",sc:"min",root:45},cook:{bpm:100,dr:1,bass:"sine",lead:"triangle",sc:"maj",root:55,bed:"sizzle"},
 grwm:{bpm:98,dr:2,bass:"sine",lead:"triangle",pad:1,sc:"maj",root:57},pet:{bpm:110,dr:1,bass:"triangle",lead:"triangle",sc:"pent",root:60},
 gym:{bpm:140,dr:3,bass:"sawtooth",sc:"min",root:40},story:{bpm:74,dr:0,bass:"sine",lead:"triangle",pad:1,sc:"maj",root:57},
 live:{bpm:118,dr:2,bass:"sine",lead:"triangle",pad:1,sc:"maj",root:50}};
const mtof=m=>440*Math.pow(2,(m-69)/12);
function env(g,t,a,p,d){g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(p,t+a);g.gain.exponentialRampToValueAtTime(.0001,t+a+d);}
function tone(t,m,type,v,d,cut){const c=AU.ctx,o=c.createOscillator(),g=c.createGain();o.type=type;o.frequency.value=mtof(m);let n=o;if(cut){const f=c.createBiquadFilter();f.type="lowpass";f.frequency.value=cut;o.connect(f);n=f;}env(g,t,.01,v,d);n.connect(g).connect(AU.master);o.start(t);o.stop(t+d+.05);}
function nz(t,type,fq,v,d){const c=AU.ctx,s=c.createBufferSource();s.buffer=AU.nb;const f=c.createBiquadFilter();f.type=type;f.frequency.value=fq;const g=c.createGain();env(g,t,.002,v,d);s.connect(f).connect(g).connect(AU.master);s.start(t,Math.random());s.stop(t+d+.05);}
function kick(t,v){const c=AU.ctx,o=c.createOscillator(),g=c.createGain();o.frequency.setValueAtTime(150,t);o.frequency.exponentialRampToValueAtTime(42,t+.12);env(g,t,.002,v,.2);o.connect(g).connect(AU.master);o.start(t);o.stop(t+.3);}
function stopBed(){if(AU.bed){try{AU.bed.s.stop();if(AU.bed.l)AU.bed.l.stop();}catch(e){}AU.bed=null;}}
function startBed(type){const c=AU.ctx,s=c.createBufferSource();s.buffer=AU.nb;s.loop=true;const f=c.createBiquadFilter(),g=c.createGain();let l=null;
  if(type==="rain"){f.type="highpass";f.frequency.value=1200;g.gain.value=.06;}
  else if(type==="waves"){f.type="lowpass";f.frequency.value=500;g.gain.value=.05;l=c.createOscillator();const lg=c.createGain();l.frequency.value=.12;lg.gain.value=.05;l.connect(lg).connect(g.gain);l.start();}
  else if(type==="wind"){f.type="bandpass";f.frequency.value=400;g.gain.value=.03;}
  else if(type==="sizzle"){f.type="highpass";f.frequency.value=4000;g.gain.value=.05;}
  else{f.type="highpass";f.frequency.value=2500;g.gain.value=.012;}
  s.connect(f).connect(g).connect(AU.master);s.start();AU.bed={s,l};}
function setMusic(key,seed){if(!AU.ctx)return;if(key===AU.key&&seed===AU.seed)return;AU.key=key;AU.seed=seed;stopBed();
  if(!key){AU.pat=null;return;}
  const P=PRE[key]||PRE.lava,r=R("mus"+key+seed),sc=SCALES[P.sc];
  AU.pat={P,sc,mel:Array.from({length:16},()=>r.ch(.55)?r.int(0,sc.length*2-1):-1),prog:P.sc==="min"?[0,5,3,6]:[0,5,3,4],root:P.root+r.int(-2,2)};
  AU.i=0;AU.next=AU.ctx.currentTime+.05;if(P.bed)startBed(P.bed);}
function stepMusic(t){const{P,sc,mel,prog,root}=AU.pat,i=AU.i,s=i%16,deg=prog[Math.floor(i/16)%4];
  const note=d=>root+sc[((d%sc.length)+sc.length)%sc.length]+12*Math.floor(d/sc.length);
  if(P.dr===1){if(s===0||s===10)kick(t,.5);if(s===4||s===12)nz(t,"bandpass",1500,.12,.1);if(s%4===2)nz(t,"highpass",7000,.05,.03);}
  if(P.dr===2){if(s%4===0)kick(t,.8);if(s===4||s===12)nz(t,"bandpass",1800,.3,.12);if(s%4===2)nz(t,"highpass",7000,.12,.04);}
  if(P.dr===3){if(s===0||s===6||s===10)kick(t,.9);if(s===4||s===12)nz(t,"bandpass",2000,.35,.14);if(s%2===0)nz(t,"highpass",8000,.08,.025);}
  if(P.bass&&s%4===0)tone(t,note(deg)-12,P.bass,P.bass==="sine"?.35:.15,.28,900);
  if(P.pad&&s===0)[0,2,4].forEach(k=>tone(t,note(deg+k),"sine",.05,60/P.bpm*3.6));
  if(P.lead&&mel[s]>=0&&(i>=16||!P.dr))tone(t,note(mel[s]+deg)+12,P.lead,P.lead==="square"||P.lead==="sawtooth"?.04:.08,60/P.bpm*.5,3500);
  if(P.bed==="pops"&&Math.random()<.08)nz(t,"lowpass",800,.4,.3);
  if(P.bed==="crackle"&&Math.random()<.3)nz(t,"highpass",3000,.05,.01);}
function musicTick(){if(!AU.ctx||!AU.pat)return;const c=AU.ctx;if(AU.next<c.currentTime-.3)AU.next=c.currentTime+.02;const spb=60/AU.pat.P.bpm/4;
  while(AU.next<c.currentTime+.12){stepMusic(AU.next);AU.next+=spb;AU.i++;}}
function sfx(kind){if(!AU.ctx||!ST.set.sound)return;const t=AU.ctx.currentTime;
  if(kind==="gift")[72,76,79,84].forEach((n,i)=>tone(t+i*.07,n,"triangle",.12,.25));
  if(kind==="pop")tone(t,88,"sine",.1,.08);
  if(kind==="msg"){tone(t,84,"sine",.12,.1);tone(t+.08,91,"sine",.1,.12);}}

/* ================= content pools ================= */
const FN="mia kai zoe liam ava noah luna eli ivy leo maya jay nina omar sofia dev aria theo jade sam priya diego yuki amara finn lena rio isla mateo zara ezra chloe malik hana jules ruby andre nova felix aisha ken layla oscar tess bilal sienna marco noor eden remy tyler bella jordan kiara milo sasha dante rosa ari cole gigi nico tara hugo daisy".split(" ");
const SN="rivers chen park moon lane cruz stone kim vale diaz gray nguyen reyes fox west patel bloom king ortiz shaw rose vega wells hart lowe baker silva james hill".split(" ");
const WD="moon daily vibes eats clips films studio core world pov diaries sky wave pixel kitchen travels plays beats fit cafe dreams lab tv zone".split(" ");
const DEMO=["✨","🌙","🦋","🍓","☁️","🌸","🔥","🎧","🌊","⭐","🫶","🍒"];
const BIOS=["just vibes ✨","{t} enthusiast","📍 somewhere online","dog mom 🐶","posting every day until it works","coffee addict ☕","film student 🎬","gym · food · repeat","not a professional anything","nursing student 🩺","dm for collabs","be kind 🫶","pizza > everything","learning one video at a time","{t} content daily","travel diaries ✈️","always sleepy","living my best life","small creator, big dreams","{t} · music · chaos",""];
const T_=(n,th,cap,ov,tg,q,a,tp,tc)=>({n,th,cap,ov,tg,q,a,tp,tc});
const TOP={
sunset:T_("travel",["the sun","those mountains","the colors","the sky"],["golden hour hits different up here","drove 4 hours for this sunset and it was worth it","no filter. this is just what the sky did today"],["POV: you finally take the trip","this view > everything","tell me this isn't real"],["sunset","travel","goldenhour","roadtrip","nature"],["where is this??","what time was this?","is this edited?"],["coast road, about 2 hrs north","like 7:40pm","no filter fr"],["the gradient in the sky is insane","that sun looks fake in the best way","i need to go here asap"],["the colors look a bit oversaturated ngl","seen this spot a million times on here"]),
city:T_("city",["the lights","that skyline","the rain"],["3am city walks hit different","rainy night drive through downtown"],["POV: you moved to the city alone","main character walk at 3am","the city at night >>>"],["citylights","nightdrive","aesthetic","vlog"],["what city is this?","what lens??"],["downtown, near the river","just my phone + a cheap ND filter"],["the window lights flickering is so satisfying","this is literally my lockscreen now"],["too dark to see anything on my phone","the rain looks fake ngl"]),
ocean:T_("beach",["the moon","the waves","that reflection"],["the ocean at midnight is a different kind of quiet","sat here for an hour and forgot about everything"],["sound on (it's just waves)","when the moon hits the water like this"],["ocean","moon","beach","calm","asmr"],["which beach?","was it cold?"],["a small one up north, no crowds","freezing lol"],["the moon reflection is unreal","instant calm"],["wish it was longer","kinda blurry on the edges"]),
space:T_("space",["the planet","the rings","those stars"],["reminder: you are made of star stuff","the universe is so big it's actually scary"],["this is what warp speed would look like","POV: you're leaving the solar system"],["space","astronomy","facts","universe"],["is this real footage?","what software made this?"],["it's an animation, not real footage","blender + a lot of patience"],["space content at 2am hits different","the ring detail 😮"],["this isn't scientifically accurate tho"]),
neon:T_("synthwave",["the grid","that sun","the colors"],["made this loop while listening to 80s music for 6 hours","retro future is the only aesthetic"],["born in the wrong decade","POV: driving into 1986"],["synthwave","retro","80s","edit"],["song name??","can i use this as a wallpaper?"],["original sound, it's mine 🙂","yes go for it!"],["this is giving outrun","the grid moving is so smooth"],["seen this aesthetic a lot lately"]),
aurora:T_("aurora",["the lights","the aurora","the stars"],["waited 4 nights in the cold for this","the northern lights finally showed up"],["bucket list: ✅","nature is showing off"],["aurora","northernlights","travel"],["where was this?","is it this bright in person?"],["way up north, near the arctic circle","a bit less bright, the camera picks up more"],["crying this is so beautiful","adding this to my bucket list rn"],["the camera exaggerates it a lot tho"]),
fireworks:T_("fireworks",["the fireworks","that purple one","the skyline"],["best fireworks i've ever seen","new year's from the rooftop"],["wait for the purple one","sound on 🎆"],["fireworks","newyear","celebration"],["where did you watch from?"],["a friend's rooftop"],["the timing at the end 😭","goosebumps"],["poor dogs tho 😢"]),
lava:T_("aesthetic",["the colors","the blobs","the blend"],["stare at this for 10 seconds and relax","the most satisfying loop i've made"],["your brain needs this","the colors are moving 🫠"],["satisfying","aesthetic","asmr","loop"],["how is this made?"],["code, just gradients moving around"],["so relaxing","i've been staring for 5 minutes"],["bit boring tbh"]),
snow:T_("cabin",["the cabin","the snow","the trees"],["spent the weekend in a cabin with no wifi","cozy season is here"],["POV: no wifi, just snow","imagine waking up here"],["cozy","winter","cabin","snow"],["can i rent this?","how cold was it?"],["yes it's on a rental site, link in bio","like -15°"],["the light in the window 🥺","this is my dream life"],["looks lonely ngl"]),
ramen:T_("ramen",["the egg","the broth","those noodles"],["homemade ramen that took me 12 hours","tonkotsu at home, worth every minute"],["12 hour ramen 🍜","POV: you finally nailed the egg"],["ramen","food","cooking","recipe"],["recipe??","how do you get the egg like that?"],["recipe is in my bio","6.5 min boil then ice bath"],["the egg is perfect","i'm so hungry now"],["too much work for one bowl","i'd add chili oil tbh"]),
gaming:T_("gaming",["the coins","that jump","the pixel art"],["made my own retro game, what should i add next?","day 30 of making a game"],["day 30 of making my own game","rate my pixel art 1-10"],["gamedev","pixelart","indiegame","gaming"],["when is it releasing?","can i playtest??"],["hopefully this year!","dm me 👀"],["this looks so polished","i'd buy this"],["the jump looks floaty"]),
music:T_("music",["the beat","the drop","that bass"],["made this beat in 10 minutes","which version is better?"],["wait for the drop","turn your volume up"],["music","producer","beats","edm"],["song name?","is this on streaming?"],["it's unreleased 👀","dropping it friday"],["this goes so hard","the visualizer is so clean"],["the drop was kinda weak"]),
rain:T_("rainy day",["the rain","the lights","the drops"],["study with me on a rainy night","rain + lofi = productivity"],["study with me 🌧️","rainy night vibes"],["rain","study","lofi","cozy"],["is there a longer version?"],["1 hour version on my page"],["the bokeh is so pretty","perfect for sleeping"],["makes me sleepy not productive 😭"]),
coffee:T_("coffee",["the latte art","that heart","the foam"],["latte art progress: day 100","finally got the heart right"],["day 100 of latte art","barista life ☕"],["coffee","latteart","barista","cafe"],["what milk do you use?","tips for beginners?"],["oat milk!","go slow, pour from close"],["so clean","i need a coffee now"],["it's a bit lopsided"]),
dance:T_("dance",["the moves","that footwork","the lights"],["learned this in 20 minutes don't judge","new dance trend, who's next?"],["tried the new trend 🕺","rate my dancing 1-10"],["dance","trend","dancechallenge","party"],["tutorial pls??","what's the dance called?"],["tutorial on my page!","it's the new trend going around"],["the footwork is clean","the confidence 😭"],["offbeat at the end ngl"]),
cook:T_("cooking",["the garlic","that sizzle","the sauce"],["15 minute dinner that tastes like takeout","easiest stir fry ever"],["15 min dinner hack 🍳","step by step 👇"],["cooking","easyrecipe","dinner","foodtok"],["can i use chicken instead?","measurements??"],["yes!! works great","recipe in my bio"],["the sizzle sound 🤤","making this tonight"],["way too much oil"]),
grwm:T_("grwm",["the glow","that blush","the lighting"],["get ready with me for the event tonight","5 minute makeup for lazy days"],["get ready with me ✨","5 min makeup challenge"],["grwm","makeup","skincare","getreadywithme"],["what blush is that?","what ring light?"],["a cream blush, linked in bio","a cheap one from online lol"],["the glow is unreal","the mirror lights 😍"],["too much highlighter imo"]),
pet:T_("pet",["the tail","those eyes","the sleepy face"],["my cat thinks this pillow is hers","she does this every single morning"],["my cat at 6am:","rate my pet 1-10"],["cat","pets","cute","catlife"],["what breed is that?","name??"],["a rescue! no idea tbh","mochi 🍡"],["the tail wag 😭","protect at all costs"],["needs a bigger pillow"]),
gym:T_("gym",["the form","that PR","the reps"],["new PR today 🏋️","leg day is my favorite day (lie)"],["new PR 🔥","day 100 of the gym"],["gym","fitness","workout","gymtok"],["how much is that?","program??"],["120kg!","linked my program in bio"],["form is perfect","motivation fr"],["go deeper on the squat"]),
story:T_("storytime",["the story","the ending","that plot twist"],["storytime that still haunts me","this actually happened 😭"],["storytime 😭","you won't believe this"],["storytime","funny","relatable","pov"],["is this real??","part 2??"],["100% real 😭","part 2 tonight"],["i'm crying 😭","the ending 💀"],["this is so fake lol"])
};
const TK=Object.keys(TOP);
const GEN_TAGS=["fyp","foryou","naymo","viral","trending"];
const LANG=[["esto es increíble 😍","this is incredible 😍"],["que vídeo lindo demais","what a beautiful video"],["c'est magnifique 🥹","it's magnificent 🥹"],["keren banget sumpah","so cool i swear"],["das ist so schön","this is so beautiful"],["ang ganda nito grabe","this is so pretty, wow"],["bellissimo 😭","beautiful 😭"],["すごすぎる！","this is amazing!"],["это так красиво","this is so beautiful"]];
const C={
 pos:["ok this is actually so good","how do you always post bangers","the editing on this 😭","this deserves more views (it has {views} 💀)","saving this forever","obsessed with your page","you never miss fr","i come back to this every day","this is my comfort account","{thing} is so pretty omg","best account on this app no debate"],
 joke:["me watching this at 3am instead of sleeping","the way i replayed this 9 times","my screen time is crying","not me sending this to every group chat","this is the sign i needed to go outside","me pretending i'll do this tomorrow","me with 6% battery still watching this"],
 crit:["kinda mid compared to your older stuff ngl","why is it so short 😐","the music is too loud over everything","unpopular opinion but the last one was better","the text is covering the best part"],
 off:["first","who's here after it hit the for you page","commenting so i come back for part 2","anyone else hear the background noise at 0:0{sec}?","POV: you read the comments before watching","early squad where you at"],
 q:["what song is this?","part 2??","how long did this take you","what app do you edit with"],
 a:["it's an original sound, tap the disc","they said part 2 soon","prob like a whole day","they said capcut in another comment"],
 agree:["so real for this","couldn't agree more","you get it","right?? 😭","this is it","said it better than me","facts","100% this","yes!!","louder for the people in the back","peak comment","no notes","exactly this","period.","mhm 💯","fr","real","literally","no bc same","this comment >>","agreed 100%","exactly what i was gonna say","THIS","the accuracy"],
 laugh:["i'm wheezing","crying at this","LMAO stop","not this 😭😭","help 💀","dead 💀","why did this get me","ok this is funny","hahaha i can't","bro 😂😂","the way i choked","😂😂😂","😭😭😭","LMAOOO","stop i'm crying","why is this so accurate","the way i'm doing this rn","💀💀💀","i felt this in my soul","HAHAHA"],
 qsame:["need to know too","asking the real questions","same question 😭","bump"],
 defend:["then scroll??","why are you even here then 😭","it's free content relax","respectfully disagree","ok hater","nah this one is better","be so fr right now"],
 agcrit:["nah they kinda right","i was thinking the same tbh","valid but still good","lowkey yeah"],
 arg:["i'm allowed to have an opinion","nobody said you weren't","you started it 😭","calm down it's a comment section","ok and?","why are you so pressed lol"],
 meta:["y'all fighting in the comments of a {topic} video 💀","this thread is wild","grabbing popcorn 🍿","not the comment section beef","the replies are better than the video"],
 offr:["first to what 😭","nobody cares","same here","the algorithm knows me","we're early!!"],
 tagback:["omg we NEED to go","LMAO why'd you send me this","ok i'm obsessed","saw it already 😭","sending this to the group chat"],
 typo:["this is so beautifull omg","how do u even do thsi","i cant stop wacthing","teh {thing} 😭","bro this is insaneee","ur so talnted fr","wait waht 😭"],
 caps:["this is so good","why is nobody talking about this","i screamed","ok but {thing}","part 2 right now","no because this is everything"],
 long:["ok i don't usually comment but i've been following you since you had like 2k followers and seeing how far you've come is genuinely inspiring. you posted something like this years ago and it got me through a really rough semester. anyway this is beautiful, never stop 🫶","not to be dramatic but this video fixed my entire week. had the worst day at work, came home, opened the app and this was the first thing on my fyp. sometimes the algorithm just knows","the amount of effort in these is so underrated. people think it's a quick video but the lighting, the timing, the text, the sound... it all fits. this is art and i will not be taking questions"],
 troll:["this is so fake lol","who even watches this","overrated account tbh","i could make this in 5 minutes"],
 drag:["then make it 💀","bro has 3 followers and talking","ratio","who asked though","the jealousy is loud","go touch grass","168M people disagree with you"],
 trollback:["whatever","y'all are so sensitive","ok ok i'm leaving","it was a joke 😭"],
 celeb:["this is so good omg 😭","ok we NEED to collab","obsessed with this fr","saving this for inspo 🔥","teach me your ways 🙏"],
 celebr:["WAIT {celeb} IS HERE??","the crossover we didn't know we needed","{celeb} and {me} in the same comment section i'm screaming","COLLAB COLLAB COLLAB","celebrities watch {me} too 😭","this needs to be pinned"],
 cre_celeb:["omg thank you!! let's do it 🫶","check your dms 👀","ahh you're the best 😭"],
 sfan:["i've been here since 10k and i'm still not over this 🥹","{me} notice me day {d} 😤","first again, i have notifications on for a reason","the {me} defense squad reporting for duty 🫡","been here since day one and you deserve every single follower","day {d} of commenting until {me} replies"],
 cre_pos:["thank you 🫶","you're the best fr","🥹🥹🥹","this means so much","love you guys"],
 cre_q:["{a} !!","good question, {a}","{a} 🙂"],
 cre_crit:["noted, next one will be better 🙏","fair lol","appreciate the honesty"],
 cre_joke:["HAHAHA","why is this me too","😭😭 caught"],
 pin:["part 2 is coming tomorrow 👀","thank you for {fol} 🥹 i read every comment","which one should i do next? 👇","yes this is real, no filter"],
 me_r:["omg {me} commented 😭","{me} is everywhere lmao","notification squad 🫡","hi {me}!! 🥹","framing this comment","you're so real for this","the way {me} actually reads the comments","ok but when collab","{me} please notice me","the creator energy in this comment 😭"],
 me_tgt:["OMG {me} REPLIED TO ME","i'm actually shaking rn","no way you saw this 😭😭","screenshotting this forever","THANK YOUUU 🫶","mom come look {me} replied"],
 me_kid:["ur so lucky","bro got noticed 😭","jealous fr","same 😭","LMAO","{me} reply to me too 🥺"]
};
const TIMES=["2m","14m","38m","1h","3h","7h","12h","1d","2d","3d","5d","1w","2w","4w"];

/* ================= users ================= */
const NU=3000,UC={};
const CELEB=[["zaravale","Zara Vale","singer · new album out now 🎤",2.1e8,"music"],["marcoblaze","Marco Blaze","actor 🎬 · stunts are real",9.5e7,"city"],["djnovaray","DJ Nova Ray","world tour 🌍",7.2e7,"music"],["chefremy","Chef Remy Laurent","cooking for the world 🍳",4.8e7,"cook"],["kikimoon","Kiki Moon","model · creative ✨",1.3e8,"grwm"]];
const SFAN=["since10k.club","notif.squad","day1.lily","the.real.supporter","biggestfan.jay"];
const BRANDS={b0:["glowberry.skin","Glowberry Skincare","drop",340],b1:["voltfizz","Voltfizz Energy","bolt",50],b2:["nimbus.audio","Nimbus Audio","headphones",200]};
function getUser(id){
  if(id==="me")return meUser();
  if(UC[id])return UC[id];
  if(typeof id==="string"&&BRANDS[id]){const b=BRANDS[id];return UC[id]={id,username:b[0],name:b[1],avatar:{hue:b[3],icon:b[2]},followers:Math.floor(R(id).log(2e5,3e6)),following:12,likes:Math.floor(R(id).log(1e6,4e7)),verified:true,topics:["lava","lava"],postCount:0,bio:"Official account ✔️ · partnerships@"+b[0].replace(".","")+".co",brand:true};}
  const r=R("user"+id),f=r.pick(FN),s=r.pick(SN),w=r.pick(WD),n=r.int(1,99);
  const pats=[()=>`${f}.${s}`,()=>`${f}${s}`,()=>`${f}_${n}`,()=>`its${f}`,()=>`${f}.${w}`,()=>`${w}${f}`,()=>`${f}xo`,()=>`not${f}`,()=>`${f}${f.slice(-1)}${f.slice(-1)}`,()=>`${f}.${s}${n}`,()=>`${w}.${s}`,()=>`_${f}${s}_`,()=>`${f}${r.int(1990,2009)}`,()=>`${f}${w}`];
  const big=id<60;
  let username=r.pick(pats)()+(id>=60&&r.ch(.25)?String(r.int(1,9)):"");
  let name=r.ch(.5)?cap1(f)+(r.ch(.5)?" "+cap1(s):""):r.ch(.5)?username:cap1(f)+" "+r.pick(DEMO);
  let followers=Math.floor(big?r.log(8e5,9e7):r.ch(.1)?r.log(5e4,3e6):r.log(20,2e4));
  let topics=[r.pick(TK),r.pick(TK)],bio=r.pick(BIOS).replace("{t}",TOP[topics[0]].n),verified=followers>2e6||(big&&r.ch(.5)),postCount=big?r.int(18,60):r.int(2,14);
  if(id<5){const c=CELEB[id];username=c[0];name=c[1];bio=c[2];followers=c[3];topics=[c[4],c[4]];verified=true;postCount=40;}
  else if(id<10){username=SFAN[id-5];name=cap1(f)+" 🫶";followers=r.int(800,40000);bio="#1 fan of @"+ST.profile.username+" since day one 🫶";verified=false;postCount=r.int(3,8);}
  const u={id,username,name,avatar:{hue:r.int(0,359),icon:r.ch(.3)?r.pick(AVI):null},followers,likes:Math.floor(followers*(2+r.f()*12))+r.int(0,500),
    following:big?r.int(40,900):r.int(20,2500),verified,topics,postCount,bio,celeb:id<5};
  return UC[id]=u;
}
const elapsedS=()=>(Date.now()-ST.fStart)/1000;
function meUser(){const p=ST.profile;return{id:"me",username:p.username,name:p.name,avatar:{hue:p.hue,icon:p.icon},followers:ST.set.followers+Math.floor(elapsedS()*ST.set.fps),likes:ST.set.likes+Math.floor(elapsedS()*ST.set.fps*30),following:followingCount(),verified:true,bio:p.bio,postCount:846+ST.posts.length};}
const baseFollow=id=>typeof id==="number"&&id<948;
function isFollowing(id){if(id==="me")return false;return id in ST.follow?ST.follow[id]:baseFollow(id);}
function followingCount(){let c=ST.set.following;for(const k in ST.follow){const id=/^\d+$/.test(k)?+k:k;if(ST.follow[k]&&!baseFollow(id))c++;if(!ST.follow[k]&&baseFollow(id))c--;}return Math.max(0,c);}
function avHTML(u,cls=""){const a=u.avatar;const bg=`linear-gradient(135deg,hsl(${a.hue},75%,62%),hsl(${(a.hue+50)%360},80%,45%))`;return `<span class="av ${cls}" style="background:${bg}">${a.icon?ic(a.icon,{color:"#fff",sw:2.2,cls:"avi"}):esc((u.name||u.username).replace(/[^a-z0-9]/gi,"").charAt(0)||"?")}</span>`;}
const ADMIN='<span class="adm" title="Admin"><svg viewBox="0 0 24 24"><path d="M12 1.8l8.5 3.2v6.1c0 5.3-3.6 9.9-8.5 11.6-4.9-1.7-8.5-6.3-8.5-11.6V5z" fill="#7b5cff"/><path d="M12 1.8l8.5 3.2v6.1c0 5.3-3.6 9.9-8.5 11.6z" fill="#ff3b6b"/><path d="M12 6.3l1.7 3.5 3.8.5-2.8 2.7.7 3.8L12 15l-3.4 1.8.7-3.8-2.8-2.7 3.8-.5z" fill="#fff"/></svg></span>';
const verHTML=u=>(u.verified?'<span class="ver">✓</span>':"")+(u.id==="me"?ADMIN:"");
/* swipe-to-dismiss helper */
function swipeable(node,{dir,th=80,onDone,handle}){const h=handle||node;let sx=0,sy=0,dx=0,dy=0,on=false;
  h.addEventListener("pointerdown",e=>{if(e.button>0)return;on=true;sx=e.clientX;sy=e.clientY;dx=dy=0;node.style.transition="none";try{h.setPointerCapture(e.pointerId);}catch(_){}});
  h.addEventListener("pointermove",e=>{if(!on)return;dx=e.clientX-sx;dy=e.clientY-sy;
    if(dir==="down")node.style.transform=`translateY(${Math.max(0,dy)}px)`;
    else if(dir==="up")node.style.transform=`translate(${dx}px,${Math.min(0,dy)}px)`;
    else if(dir==="left")node.style.transform=`translateX(${Math.min(0,dx)}px)`;
    else if(dir==="right")node.style.transform=`translateX(${Math.max(0,dx)}px)`;});
  const end=()=>{if(!on)return;on=false;node.style.transition="transform .22s ease-out";
    const done=dir==="down"?dy>th:dir==="up"?(dy<-th*.4||Math.abs(dx)>th):dir==="left"?dx<-th:dx>th;
    if(done){node.style.transform=dir==="down"?"translateY(110%)":dir==="up"?(Math.abs(dx)>th?`translateX(${dx>0?120:-120}%)`:"translateY(-160%)"):dir==="left"?"translateX(-110%)":"translateX(110%)";setTimeout(onDone,200);}
    else node.style.transform="";};
  h.addEventListener("pointerup",end);h.addEventListener("pointercancel",end);h.addEventListener("lostpointercapture",end);
  return()=>Math.abs(dx)>8||Math.abs(dy)>8;}

/* ================= posts ================= */
const PC={};
function mkPost(id,uid,r,topic,likes,age){
  const T=TOP[topic];const tags=[];const pool=T.tg.slice();
  for(let i=0;i<2;i++)tags.push(pool.splice(Math.floor(r.f()*pool.length),1)[0]);
  tags.push(r.pick(GEN_TAGS));if(r.ch(.5))tags.push(r.pick(GEN_TAGS));
  const p={id,uid,topic,scene:topic,seed:r.int(1,9999),hue:r.int(0,359),cap:r.pick(T.cap),ov:r.ch(.85)?r.pick(T.ov):"",ovs:r.int(0,2),
    fx:r.ch(.35)?"pop":"static",stk:r.ch(.25)?[...new Set([r.pick(STK),r.pick(STK)])]:[],
    tags:[...new Set(tags.filter(Boolean))],likes:Math.floor(likes),vr:4+r.f()*9,cr:.004+r.f()*.01,sr:.03+r.f()*.1,shr:.008+r.f()*.04,dur:r.int(9,58),age};
  p.rate=uid==="me"?Math.min(400,Math.max(.3,p.likes/((age+1)*86400)*4)):0;
  return PC[id]=p;
}
function getMyPost(j){const id="m"+j;if(PC[id])return PC[id];const r=R(id);const t=r.pick(TK);
  return mkPost(id,"me",r,t,j<3?r.log(8e7,2.1e8):r.log(4e6,6e7),j<3?r.int(30,400):Math.floor(j*.9)+r.int(0,1));}
function getUserPost(uid,j){const id=`u${uid}_${j}`;if(PC[id])return PC[id];const u=getUser(uid),r=R(id);
  let l=Math.max(3,u.followers*r.log(.005,.4));if(r.ch(.05))l*=20;return mkPost(id,uid,r,r.pick(u.topics),l,j*r.int(1,6)+r.int(0,3));}
function newPostObj(np){if(PC[np.id])return PC[np.id];const r=R(np.id);const p=mkPost(np.id,"me",r,np.topic,np.tgt,0);
  Object.assign(p,{cap:np.cap||"",ov:np.ov||"",ovs:np.ovs||0,fx:np.fx||"static",stk:(np.stk||[]).map(stkName),tags:np.tags||[],isNew:true,created:np.created,tgt:np.tgt,media:np.media||null,thumb:np.thumb||null,duetOf:np.duetOf||null});
  if(p.media&&!MEDIA[p.id])p.media=null;return p;}
function getPost(id){if(!id)return null;if(PC[id])return PC[id];if(id[0]==="m")return getMyPost(+id.slice(1));
  if(id[0]==="u"){const m=id.match(/^u(\d+)_(\d+)$/);if(m)return getUserPost(+m[1],+m[2]);}
  const np=ST.posts.find(x=>x.id===id);return np?newPostObj(np):null;}
const PINNED=3;
function myPostAt(k){const n=ST.posts.length;if(k<PINNED)return getMyPost(k);if(k<PINNED+n)return newPostObj(ST.posts[n-1-(k-PINNED)]);return getMyPost(k-n);}
function userPostAt(uid,k){return uid==="me"?myPostAt(k):getUserPost(uid,k);}
function userPostCount(uid){return uid==="me"?846+ST.posts.length:getUser(uid).postCount;}
function pLikes(p){const now=Date.now();let v;
  if(p.isNew){const S=SPEED[ST.set.speed]||SPEED.viral;v=p.tgt*S.m*(1-Math.exp(-(now-p.created)/S.tau));}
  else v=p.likes+(p.uid==="me"?(now-T0)/1000*p.rate:0);
  return Math.floor(v)+(ST.liked[p.id]?1:0);}
const pViews=p=>Math.floor(pLikes(p)*p.vr)+(p.isNew?Math.floor((Date.now()-p.created)/1000*3):0);
const pComments=p=>Math.floor(pLikes(p)*p.cr)+extrasFor(p.id).filter(c=>c.at<=Date.now()).length;
const pSaves=p=>Math.floor(pLikes(p)*p.sr)+(ST.saved[p.id]?1:0);
const pShares=p=>Math.floor(pLikes(p)*p.shr)+(ST.reposts[p.id]?1:0);
function ageStr(p){if(p.isNew){const m=Math.floor((Date.now()-p.created)/60000);return m<1?"just now":m<60?m+"m ago":m<1440?Math.floor(m/60)+"h ago":Math.floor(m/1440)+"d ago";}
  const d=p.age;return d<1?"12h ago":d<7?d+"d ago":d<30?Math.floor(d/7)+"w ago":d<365?Math.floor(d/30)+"mo ago":Math.floor(d/365)+"y ago";}

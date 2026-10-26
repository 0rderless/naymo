
/* ================= cloud sync (Firebase Realtime Database over REST) ================= */
const FB={url:"https://mingchat-e8a29-default-rtdb.firebaseio.com",key:"AIzaSyCf1_uelYRFLSW8e652hHBppFUwmegkJE0"};
let cloudT=null,cloudStatus="Not synced yet",fbToken=null;
const syncKey=()=>String(ST.set.syncId||"default").trim().replace(/[.#$\[\]\/\s]/g,"_")||"default";
async function fbAuth(){try{const c=JSON.parse(sessionStorage.getItem("naymo_fbt")||"null");if(c&&c.exp>Date.now())return c.t;}catch(e){}
  const r=await fetch("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key="+FB.key,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({returnSecureToken:true})});
  if(!r.ok)return null;const j=await r.json();try{sessionStorage.setItem("naymo_fbt",JSON.stringify({t:j.idToken,exp:Date.now()+50*60e3}));}catch(e){}return j.idToken;}
async function fbFetch(method,body){const u=`${FB.url}/naymo/${encodeURIComponent(syncKey())}.json`;
  let r=await fetch(u+(fbToken?"?auth="+fbToken:""),{method,body});
  if((r.status===401||r.status===403)&&!fbToken){fbToken=await fbAuth();if(fbToken)r=await fetch(u+"?auth="+fbToken,{method,body});}
  return r;}
function cloudSave(now){if(!ST.set.cloud)return;clearTimeout(cloudT);cloudT=setTimeout(async()=>{
  try{const r=await fbFetch("PUT",JSON.stringify({savedAt:ST.savedAt||Date.now(),state:JSON.stringify(ST)}));
    cloudStatus=r.ok?"Backed up "+new Date().toLocaleTimeString([], {hour:"numeric",minute:"2-digit"}):r.status===401||r.status===403?"Database refused access (check its rules)":"Cloud error "+r.status;}
  catch(e){cloudStatus="Offline — will back up when you're online";}
  const s=document.getElementById("s_cst");if(s)s.textContent=cloudStatus;},now?10:4000);}
async function cloudLoad(force){if(!ST.set.cloud&&!force)return false;
  try{const r=await fbFetch("GET");if(!r.ok){cloudStatus=r.status===401||r.status===403?"Database refused access (check its rules)":"Cloud error "+r.status;return false;}
    const j=await r.json();if(!j||!j.state){cloudStatus="Nothing in the cloud yet";return false;}
    if(!force&&(j.savedAt||0)<=(ST.savedAt||0)){cloudStatus="Up to date";return false;}
    const s=JSON.parse(j.state);ST=Object.assign(JSON.parse(JSON.stringify(DEF)),s);ST.set=Object.assign({},DEF.set,s.set||{});ST.profile=Object.assign({},DEF.profile,s.profile||{});
    try{localStorage.setItem(LS,JSON.stringify(ST));}catch(e){}cloudStatus="Restored from cloud";return true;}
  catch(e){cloudStatus="Couldn't reach the cloud";return false;}}

/* ================= clips folder in the GitHub repo (no API key) ================= */
const REPO={owner:"0rderless",name:"naymo"};let REPOCLIPS=[];
const CLIPKW={pet:["cat","dog","pet","puppy","kitten"],cook:["cook","kitchen","recipe","food"],ramen:["ramen","noodle"],coffee:["coffee","latte","cafe"],gym:["gym","workout","fitness","lift"],dance:["dance","dancing"],
  city:["city","street","night","downtown"],ocean:["ocean","beach","sea","wave"],sunset:["sunset","travel","road","drive"],music:["music","dj","concert","party"],rain:["rain"],snow:["snow","winter"],grwm:["makeup","beauty","grwm","mirror"],
  gaming:["game","gaming"],space:["space","stars","sky","galaxy"],aurora:["aurora"],fireworks:["firework"],story:["talk","vlog","story"]};
async function loadRepoClips(){try{const c=JSON.parse(localStorage.getItem("naymo_repoclips")||"null");if(c&&Date.now()-c.at<36e5){REPOCLIPS=c.list;return;}}catch(e){}
  try{const r=await fetch(`https://api.github.com/repos/${REPO.owner}/${REPO.name}/contents/clips`);if(!r.ok)return;const j=await r.json();
    const local=location.hostname.endsWith("github.io");
    REPOCLIPS=(Array.isArray(j)?j:[]).filter(f=>/\.(mp4|webm|mov|m4v|jpe?g|png|webp)$/i.test(f.name)).map(f=>({name:f.name.toLowerCase(),kind:/\.(jpe?g|png|webp)$/i.test(f.name)?"image":"video",src:local?"clips/"+encodeURIComponent(f.name):f.download_url}));
    try{localStorage.setItem("naymo_repoclips",JSON.stringify({at:Date.now(),list:REPOCLIPS}));}catch(e){}}catch(e){}}
function clipPool(topic){const lib=libList().map(x=>({src:MEDIA[x.id],kind:x.kind,poster:x.thumb,name:""})),all=lib.concat(REPOCLIPS);
  const kw=CLIPKW[topic]||[];const m=all.filter(c=>kw.some(k=>c.name.includes(k)));return m.length?m:all;}

/* ================= post management (edit / pin / private / comments / delete) ================= */
function applyEdit(p){const e=(ST.edits||{})[p.id];if(e){if(e.cap!=null)p.cap=e.cap;if(e.tags)p.tags=e.tags;p.priv=!!e.priv;p.noCm=!!e.noCm;}return p;}
function setEdit(p,ch){ST.edits=ST.edits||{};ST.edits[p.id]=Object.assign(ST.edits[p.id]||{},ch);applyEdit(p);save();
  document.querySelectorAll(`.vid[data-pid="${p.id}"]`).forEach(v=>{v.querySelector(".cap").innerHTML=capHTML(p);const cs=v.querySelector(".cmb span");if(cs)cs.textContent=p.noCm?"Off":fmt(pComments(p));});}
function manageHTML(p){const pin=(ST.pins||[]).includes(p.id);return `<div class="sec" style="padding:4px 2px 8px">Manage your video</div><div class="acts" style="padding-top:0;border-bottom:1px solid var(--line);padding-bottom:14px">
  <button data-m="edit"><i>${ic("edit")}</i>Edit caption</button><button data-m="pin" class="${pin?"on":""}"><i>${ic("star",{fill:pin})}</i>${pin?"Unpin":"Pin"}</button>
  <button data-m="priv" class="${p.priv?"on":""}"><i>${ic("lock")}</i>${p.priv?"Make public":"Make private"}</button><button data-m="cm" class="${p.noCm?"on":""}"><i>${ic("cmt")}</i>${p.noCm?"Comments on":"Comments off"}</button>
  <button data-m="del"><i>${ic("trash",{color:"#ef4444"})}</i>Delete</button></div>`;}
IP.cmt='<path d="M21 11.5a8.4 8.4 0 01-12.2 7.5L3 21l2-5.3A8.4 8.4 0 1121 11.5z"/>';
function manageAction(p,a,it){
  if(a==="edit"){const{L,body}=mkLayer("Edit caption");const cur=p.cap+" "+p.tags.map(t=>"#"+t).join(" ");
    body.innerHTML=`<div class="form"><label>Caption<textarea id="ec" maxlength="220">${esc(cur.trim())}</textarea></label><button class="go">Save</button></div>`;
    body.querySelector(".go").onclick=()=>{const raw=body.querySelector("#ec").value.trim(),tags=(raw.match(/#[\w]+/g)||[]).map(t=>t.slice(1).toLowerCase());setEdit(p,{cap:raw.replace(/#[\w]+/g,"").trim(),tags});closeLayer(L);toast("Caption updated");if(curPage==="me")renderMe();};}
  else if(a==="pin"){ST.pins=ST.pins||[];const i=ST.pins.indexOf(p.id);if(i>=0)ST.pins.splice(i,1);else{if(ST.pins.length>=3){toast("You can pin up to 3 videos — unpin one first");return;}ST.pins.unshift(p.id);}resetOrder();save();toast(i>=0?"Unpinned":"Pinned to your profile");if(curPage==="me")renderMe();}
  else if(a==="priv"){setEdit(p,{priv:!p.priv});toast(p.priv?"Only you can see this video now":"Video is public again");}
  else if(a==="cm"){setEdit(p,{noCm:!p.noCm});toast(p.noCm?"Comments turned off":"Comments turned on");}
  else if(a==="del"){if(!confirm("Delete this video? This can't be undone."))return;ST.deleted=ST.deleted||{};ST.deleted[p.id]=1;
    const np=ST.posts.findIndex(x=>x.id===p.id);if(np>=0){if(ST.posts[np].media)IDB.del(p.id);ST.posts.splice(np,1);}
    ST.pins=(ST.pins||[]).filter(x=>x!==p.id);resetOrder();save();document.querySelectorAll(`.vid[data-pid="${p.id}"]`).forEach(v=>v.remove());
    if(it&&stack.length&&stack[stack.length-1]._feed)closeLayer(stack[stack.length-1]);toast("Video deleted");if(curPage==="me")renderMe();}}

/* ================= keep comments arriving on your posts ================= */
G.postCore=["this is so good","how is this free content","ok this one's my favorite","the {topic} content never misses","rewatching this for the 5th time","you outdid yourself","{topic} king/queen behavior","the editing on this one 😭","why does this make me so happy","saving this","i showed this to my whole family","how long did this take","this deserves 100M views","the vibe is immaculate","need a part 2 asap","this popped up at the perfect time","i feel like i was there","the quality keeps getting better","tutorial when??","this is art","i'm obsessed with the colors","what song is this","you never disappoint","the ending got me","this is the one","i didn't expect that","sent this to my best friend","peak content","the {topic} era is real","first time here and i'm following","ok i'm hooked","my favorite creator for a reason","this made my day better","how are you so consistent","the attention to detail","who's watching at 3am","this hit different today","ok but the lighting","you should teach a class","this belongs in a museum"];
function trickle(){setTimeout(trickle,22000+Math.random()*26000);if(document.hidden)return;
  const cand=[...ST.posts.slice(-4).map(x=>x.id),"m0","m1","m2","m3","m4"].filter(id=>!(ST.deleted||{})[id]);if(!cand.length)return;
  const r=R("tr"+Date.now()),id=r.ch(.6)&&ST.posts.length?ST.posts[ST.posts.length-1-r.int(0,Math.min(3,ST.posts.length-1))].id:r.pick(cand),p=getPost(id);if(!p||p.noCm)return;
  const list=ST.uc[p.id]||(ST.uc[p.id]=[]),used=new Set(list.map(x=>(x.text||"").toLowerCase())),now=Date.now(),uid=r.int(60,NU-1);
  const text=genUnique("post",p,used),cid="tc"+now.toString(36)+r.int(0,999);
  list.push({id:cid,parent:null,uid,text,at:now,tgt:r.int(40,40000),tau:3e5,type:"trickle"});
  if(r.ch(.35))list.push({id:cid+"r",parent:cid,uid:r.int(60,NU-1),text:genUnique("kid",p,used,{u:getUser(uid).username}),at:now+r.int(4000,15000),tgt:r.int(5,900),tau:3e5,type:"fan"});
  const tr=list.filter(x=>x.type==="trickle");if(tr.length>80){const old=tr[0].id;ST.uc[p.id]=list.filter(x=>x.id!==old&&x.parent!==old);}
  addNotif({at:now,type:"comment",uid,pid:p.id,text});save();updBadge();
  if(ST.set.popups&&!sheetCtx)showPop(getUser(uid),"NEW COMMENT",`<b>${esc(getUser(uid).username)}</b>: ${esc(text)}`,()=>{openViewer(i=>i?null:p);setTimeout(()=>openComments(p),250);});}

/* ================= games ================= */
const GBOT=["zippy.jumps","cube.queen","no_lag_leo","dash.daisy","spikeproof","jumpman.k","orbit.ivy","gravity.gus","polygon.pro","tiny.tess","run.remy","neon.noor"];
function gameBest(){let b={1:0,2:0,3:100};try{Object.assign(b,JSON.parse(localStorage.getItem("polydash_best")||"{}"));}catch(e){}return b;}
function openGames(){const{L,body}=mkLayer("Games");
  const render=()=>{const b=gameBest(),r=R("gb"+dayKey);const rows=GBOT.map(n=>({n,v:r.int(14,100),m:r.int(1,2)}));rows.push({n:ST.profile.username,v:Math.max(b[1],b[2]),me:1});rows.sort((a,c)=>c.v-a.v);
    body.innerHTML=`<div class="gamecard"><div class="gcart"><canvas width="600" height="300"></canvas></div><div class="gcb"><b>Polygon Dash</b><small>Jump, fly and dodge spikes · 3 modes</small><button class="go gr" data-a="play">${ic("play",{fill:true})} Play</button></div></div>
     <div class="card" style="margin:12px 14px"><h4>Your best <small>saved on this device</small></h4><div class="hbar"><span>Normal</span><div><i style="width:${b[1]}%"></i></div><b>${b[1]}%</b></div><div class="hbar"><span>Fly only</span><div><i style="width:${b[2]}%"></i></div><b>${b[2]}%</b></div></div>
     <div class="card" style="margin:12px 14px"><h4>Leaderboard <small>today</small></h4>${rows.map((x,i)=>`<div class="lbrow ${x.me?"me":""}"><span class="rk r${i+1}">${i+1}</span>${x.me?avHTML(meUser()):avHTML(getUser(60+hashStr(x.n)%2900))}<div class="i"><b>${esc(x.n)}${x.me?ADMIN:""}</b><div>${x.me?"you":x.m===1?"Normal":"Fly only"}</div></div><span class="val">${x.v}%</span></div>`).join("")}</div>`;
    body.querySelector('[data-a="play"]').onclick=()=>openGame(render);
    const cv=body.querySelector("canvas"),c=cv.getContext("2d");const g=c.createLinearGradient(0,0,600,300);g.addColorStop(0,"#2b1a6b");g.addColorStop(1,"#a3195b");c.fillStyle=g;c.fillRect(0,0,600,300);
    c.fillStyle="#140b2e";c.fillRect(0,230,600,70);c.fillStyle="#fff";c.fillRect(0,229,600,2);
    [[300,230],[340,230],[470,230]].forEach(([x,y])=>{c.beginPath();c.moveTo(x,y);c.lineTo(x+20,y-36);c.lineTo(x+40,y);c.fillStyle="#000";c.fill();c.strokeStyle="#fff";c.lineWidth=2;c.stroke();});
    c.save();c.translate(150,160);c.rotate(.3);c.fillStyle="#ffd23c";c.fillRect(-28,-28,56,56);c.strokeStyle="#000";c.lineWidth=4;c.strokeRect(-28,-28,56,56);c.fillStyle="#3cf";c.fillRect(-16,-16,32,32);c.restore();
    c.fillStyle="#fff";c.font="900 44px sans-serif";c.fillText("POLYGON DASH",230,110);};
  render();}
function openGame(onClose){const L=el(`<div class="layer dark"><iframe src="games/polygon-dash.html" style="position:absolute;inset:0;width:100%;height:100%;border:0" allow="autoplay"></iframe><button class="back fback" style="top:62px">${ICON.back}</button></div>`);
  L.querySelector(".back").onclick=()=>closeLayer(L);L._onClose=()=>{onClose&&onClose();};L._audio=()=>null;pushLayer(L);}

/* ================= profile share card ================= */
function loadImg(src){return new Promise(res=>{if(!src){res(null);return;}const im=new Image();im.onload=()=>res(im);im.onerror=()=>res(null);im.src=src;});}
const svgURL=(inner,fill,stroke)=>"data:image/svg+xml;charset=utf-8,"+encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="96" height="96" fill="${fill}" stroke="${stroke}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${inner}</svg>`);
async function drawCard(cv){const c=cv.getContext("2d"),W=1080,H=1350,u=meUser(),hue=u.avatar.hue;cv.width=W;cv.height=H;
  const g=c.createLinearGradient(0,0,W,H);g.addColorStop(0,`hsl(${hue},70%,22%)`);g.addColorStop(.55,"#12081f");g.addColorStop(1,`hsl(${(hue+60)%360},70%,25%)`);c.fillStyle=g;c.fillRect(0,0,W,H);
  for(let i=0;i<14;i++){c.fillStyle=`hsla(${(hue+i*25)%360},90%,60%,.07)`;circ(c,R("cd"+i).f()*W,R("ce"+i).f()*H,80+R("cf"+i).f()*160);c.fill();}
  c.fillStyle="rgba(255,255,255,.07)";rr(c,70,150,W-140,H-300,48);c.fill();c.strokeStyle="rgba(255,255,255,.14)";c.lineWidth=2;rr(c,70,150,W-140,H-300,48);c.stroke();
  const ag=c.createLinearGradient(400,210,680,490);ag.addColorStop(0,`hsl(${hue},75%,62%)`);ag.addColorStop(1,`hsl(${(hue+50)%360},80%,45%)`);
  c.fillStyle="#fff";circ(c,540,350,148);c.fill();c.fillStyle=ag;circ(c,540,350,138);c.fill();
  if(u.avatar.icon){const im=await loadImg(svgURL(IP[u.avatar.icon],"none","#fff"));if(im)c.drawImage(im,540-80,350-80,160,160);}
  else{c.fillStyle="#fff";c.font="800 130px sans-serif";c.textAlign="center";c.fillText((u.name||"?").charAt(0).toUpperCase(),540,395);}
  c.textAlign="center";c.fillStyle="#fff";c.font="800 64px sans-serif";c.fillText(u.name,540,580);
  c.font="600 40px sans-serif";c.fillStyle="rgba(255,255,255,.75)";const un="@"+u.username,tw=c.measureText(un).width;c.fillText(un,540-40,645);
  c.fillStyle="#20d5ec";circ(c,540-40+tw/2+28,632,18);c.fill();c.strokeStyle="#fff";c.lineWidth=5;c.beginPath();c.moveTo(540-40+tw/2+19,632);c.lineTo(540-40+tw/2+26,639);c.lineTo(540-40+tw/2+38,624);c.stroke();
  const adm=await loadImg("data:image/svg+xml;charset=utf-8,"+encodeURIComponent(ADMIN.replace(/^<span[^>]*>/,"").replace(/<\/span>$/,"").replace("<svg ",'<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" ')));if(adm)c.drawImage(adm,540-40+tw/2+54,612,40,40);
  if(ST.set.badge){c.font="700 30px sans-serif";const bt="Top creator · Naymo",bw=c.measureText(bt).width+56;c.fillStyle="rgba(255,59,107,.22)";rr(c,540-bw/2,680,bw,52,26);c.fill();c.fillStyle="#ffb3c6";c.fillText(bt,540,716);}
  const st=[[fmt(u.following),"Following"],[fmt(u.followers),"Followers"],[fmt(u.likes),"Likes"]];st.forEach(([v,l],i)=>{const x=250+i*290;c.fillStyle="#fff";c.font="800 64px sans-serif";c.fillText(v,x,840);c.font="500 32px sans-serif";c.fillStyle="rgba(255,255,255,.6)";c.fillText(l,x,885);});
  const ps=[0,1,2].map(i=>myPostAt(i)).filter(Boolean);const ims=await Promise.all(ps.map(p=>loadImg(thumb(p))));
  ims.forEach((im,i)=>{const x=150+i*270,y=930,w=240,h=300;c.save();rr(c,x,y,w,h,24);c.clip();if(im){const s=Math.max(w/im.width,h/im.height);c.drawImage(im,x+(w-im.width*s)/2,y+(h-im.height*s)/2,im.width*s,im.height*s);}else{c.fillStyle="#222";c.fillRect(x,y,w,h);}c.restore();
    c.fillStyle="#fff";c.font="700 28px sans-serif";c.textAlign="left";c.fillText("▶ "+fmt(pViews(ps[i])),x+16,y+h-18);c.textAlign="center";});
  const lg=c.createLinearGradient(380,0,700,0);lg.addColorStop(0,"#a993ff");lg.addColorStop(1,"#ff7aa0");c.fillStyle=lg;c.font="900 72px sans-serif";c.fillText("naymo",540,105);
  c.fillStyle="rgba(255,255,255,.7)";c.font="600 32px sans-serif";c.fillText(location.hostname.endsWith("github.io")?location.host+location.pathname.replace(/index\.html$/,""):"naymo.app/@"+u.username,540,1300);}
function openShareCard(){const{L,body}=mkLayer("Share profile");
  body.innerHTML=`<div class="form"><canvas class="scard" style="width:100%;max-width:420px;margin:0 auto;border-radius:16px;box-shadow:0 10px 30px rgba(0,0,0,.3)"></canvas>
   <div class="hbtns" style="padding:0"><button class="go2" data-a="dl">${ic("download")} Save image</button><button class="go" data-a="sh">${ic("share")} Share</button></div>
   <button class="go2" data-a="cp">${ic("link")} Copy profile link</button></div>`;
  const cv=body.querySelector("canvas");drawCard(cv);
  const blob=()=>new Promise(res=>cv.toBlob(res,"image/png"));
  body.querySelector('[data-a="dl"]').onclick=async()=>{const b=await blob();const a=document.createElement("a");a.href=URL.createObjectURL(b);a.download="naymo-"+ST.profile.username+".png";document.body.appendChild(a);a.click();a.remove();toast("Image saved");};
  body.querySelector('[data-a="sh"]').onclick=async()=>{const b=await blob();const f=new File([b],"naymo-"+ST.profile.username+".png",{type:"image/png"});
    if(navigator.canShare&&navigator.canShare({files:[f]})){try{await navigator.share({files:[f],title:"My Naymo"});}catch(e){}}else body.querySelector('[data-a="dl"]').click();};
  body.querySelector('[data-a="cp"]').onclick=()=>{try{navigator.clipboard.writeText(location.href.split("#")[0]);}catch(e){}toast("Link copied");};}

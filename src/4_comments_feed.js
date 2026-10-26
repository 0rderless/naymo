
/* ================= comments ================= */
const CMAP={},USED={};
function fillT(s,p,x={}){const T=TOP[p.topic]||TOP.lava;const r=R(s+p.id);const me="@"+ST.profile.username;
  return s.replace(/\{thing\}/g,r.pick(T.th)).replace("{views}",fmt(pViews(p))).replace("{sec}",String(r.int(3,9))).replace("{topic}",T.n)
   .replace("{a}",x.a||r.pick(T.a)).replace(/\{me\}/g,me).replace(/\{celeb\}/g,x.celeb||"").replace(/\{d\}/g,x.d||r.int(100,900)).replace("{fol}",fmt(meUser().followers));}
function pickType(r){const x=r.f();return x<.22?"pos":x<.3?"tp":x<.43?"joke":x<.54?"q":x<.61?"crit":x<.68?"off":x<.73?"tag":x<.79?"typo":x<.84?"caps":x<.9?"lang":x<.94?"long":"troll";}
function replyType(pt,r){switch(pt){case"pos":case"tp":case"typo":case"caps":case"long":case"lang":case"sfan":return r.ch(.75)?"agree":"laugh";
  case"joke":return r.ch(.8)?"laugh":"agree";case"q":return r.ch(.65)?"ans":"qsame";case"crit":return r.ch(.6)?"defend":"agcrit";
  case"defend":return r.ch(.7)?"arg":"laugh";case"agcrit":return r.ch(.6)?"defend":"agree";case"arg":return r.ch(.6)?"meta":"arg";
  case"off":return"offr";case"tag":return"tagback";case"troll":return"drag";case"drag":return r.ch(.4)?"trollback":"laugh";case"trollback":return r.ch(.5)?"drag":"meta";
  case"celeb":return"celebr";default:return r.ch(.5)?"laugh":"agree";}}
function textFor(type,r,p,parent){const T=TOP[p.topic]||TOP.lava;
  switch(type){case"pos":return fillT(r.pick(C.pos),p);case"tp":return r.pick(T.tp);case"crit":return r.ch(.5)?r.pick(T.tc):r.pick(C.crit);
   case"q":return r.ch(.65)?r.pick(T.q):r.pick(C.q);case"caps":return fillT(r.pick(C.caps),p).toUpperCase();
   case"ans":{if(parent){const qi=T.q.indexOf(parent.text);if(qi>=0&&T.a[qi])return T.a[qi];const gi=C.q.indexOf(parent.text);if(gi>=0)return C.a[gi];}return r.pick(T.a);}
   case"cre_q":{let a=r.pick(T.a);if(parent){const qi=T.q.indexOf(parent.text);if(qi>=0&&T.a[qi])a=T.a[qi];}return fillT(r.pick(C.cre_q),p,{a});}
   case"celebr":return fillT(r.pick(C.celebr),p,{celeb:parent?getUser(parent.uid).name:""});
   default:return fillT(r.pick(C[type]||C.agree),p);}}
function genComment(p,r,parent,depth,id){
  let type=parent?replyType(parent.type,r):pickType(r);
  let uid=r.ch(.04)?r.int(10,59):r.int(60,NU-1);if(uid===p.uid)uid=r.int(60,NU-1);
  if(parent&&parent.type==="tag"&&parent.tagUid!=null)uid=parent.tagUid;
  if(parent&&parent.type==="trollback")uid=parent.replyTo??uid;
  if(parent&&depth===1&&parent.uid!==p.uid&&["pos","tp","q","crit","joke","celeb","long","sfan"].includes(parent.type)&&r.ch(parent.type==="celeb"?.6:.13)){
    uid=p.uid;type="cre_"+({tp:"pos",long:"pos",sfan:"pos"}[parent.type]||parent.type);}
  const used=USED[p.id]||(USED[p.id]=new Set());
  let text=textFor(type,r,p,parent),tagUid=null,tr=null;
  if(type!=="tag"&&type!=="lang"){for(let k=0;k<12&&used.has(text.toLowerCase());k++){if(k>2){if(uid===p.uid)type=r.pick(["cre_pos","cre_joke"]);else type=parent?r.pick(["agree","laugh","pos","joke","typo"]):pickType(r);}text=textFor(type,r,p,parent);}
    if(used.has(text.toLowerCase()))return null;}
  if(type==="tag"){tagUid=r.int(60,NU-1);text="@"+getUser(tagUid).username+" "+r.pick(["look at this 😭","we're doing this","this is so us","come here"]);}
  if(type==="lang"){const L=r.pick(LANG);text=L[0];tr=L[1];if(used.has(text))return null;}
  used.add(text.toLowerCase());
  const likes=depth===0?Math.floor(pLikesBase(p)*.012*Math.pow(r.f(),3.2))+r.int(0,60):Math.floor((parent.likes||10)*.18*Math.pow(r.f(),2))+r.int(0,25);
  const c={id,uid,type,text,tr,likes,time:depth===0?r.pick(TIMES):r.pick(TIMES.slice(0,9)),depth,replyTo:parent?parent.uid:null,replies:[],creatorLiked:r.ch(depth?.05:.12),tagUid,parent:parent?parent.id:null};
  CMAP[id]=c;
  let n=0;if(depth===0)n=r.ch(.55)?r.int(1,6):0;else if(depth<4)n=r.ch(depth===1?.4:.3)?r.int(1,depth===1?3:2):0;
  if(type.startsWith("cre_"))n=r.ch(.5)?r.int(1,3):0;
  if(["crit","defend","troll","drag"].includes(type)&&depth<5)n=Math.max(n,r.int(1,3));
  if(type==="celebr"&&depth>1)n=0;
  for(let k=0;k<n;k++){const ch=genComment(p,r,c,depth+1,id+"."+k);if(ch)c.replies.push(ch);}
  return c;}
const pLikesBase=p=>p.isNew?p.tgt:p.likes;
function mkC(p,r,type,uid,text,likes,id,n){const c={id,uid,type,text,likes,time:r.pick(TIMES.slice(3,10)),depth:0,replies:[],replyTo:null,parent:null};CMAP[id]=c;(USED[p.id]||(USED[p.id]=new Set())).add(text.toLowerCase());for(let k=0;k<n;k++){const ch=genComment(p,r,c,1,id+"."+k);if(ch)c.replies.push(ch);}return c;}
const CPC={};
function commentPage(p,pg){const key=p.id+"#"+pg;if(CPC[key])return CPC[key];const r=R(key);const list=[];
  for(let i=0;i<(pg?12:16);i++){const c=genComment(p,r,null,0,`${p.id}~${pg}~${i}`);if(c)list.push(c);}
  if(pg===0){list.sort((a,b)=>b.likes-a.likes);
    if(p.uid==="me"){const ex=[];
      if(r.ch(.6))ex.push(Object.assign(mkC(p,r,"cre_pos","me",fillT(r.pick(C.pin),p),Math.floor(pLikesBase(p)*.015),p.id+"~pin",0),{pinned:true}));
      if(r.ch(.4)){const cu=r.int(0,4);ex.push(mkC(p,r,"celeb",cu,r.pick(C.celeb),Math.floor(pLikesBase(p)*.03),p.id+"~cel",r.int(3,6)));}
      const d=Math.max(1,1200-(p.age||0));for(let k=0;k<r.int(1,2);k++)ex.push(mkC(p,r,"sfan",5+r.int(0,4),fillT(r.pick(C.sfan),p,{d}),Math.floor(pLikesBase(p)*.006*(1+r.f())),p.id+"~sf"+k,r.int(0,3)));
      list.unshift(...ex);}
    else if(typeof p.uid==="number"&&r.ch(.12)){list.unshift(mkC(p,r,"celeb",(p.uid+1+r.int(0,3))%5,r.pick(C.celeb),Math.floor(pLikesBase(p)*.03),p.id+"~cel",r.int(3,6)));}}
  return CPC[key]=list;}
function extrasFor(pid,parent){const a=ST.uc[pid]||[];return parent===undefined?a:a.filter(c=>c.parent===parent);}
const extraLikes=c=>Math.floor(c.tgt*(1-Math.exp(-(Date.now()-c.at)/c.tau)));
function cLikes(c){return (c.tgt!=null?extraLikes(c):c.likes)+(ST.likedC[c.id]?1:0);}
function kidsOf(p,c){const now=Date.now();return (c.replies||[]).concat(extrasFor(p.id,c.id).filter(x=>x.at<=now));}
function countAll(p,c){let n=0;for(const k of kidsOf(p,c))n+=1+countAll(p,k);return n;}
function addNotif(n){ST.notifs.push(n);}
function addUserComment(p,parent,text){
  const now=Date.now(),own=p.uid==="me",id="uc"+now.toString(36)+Math.floor(Math.random()*1e4),r=R(id);
  const list=ST.uc[p.id]||(ST.uc[p.id]=[]);const par=parent?(CMAP[parent]||list.find(x=>x.id===parent)):null;
  const mine={id,parent,uid:"me",text,at:now,tgt:own?r.int(2e4,4e5):r.int(5e3,1.5e5),tau:own?60000:90000,type:"mine",replyTo:par?par.uid:null};
  list.push(mine);
  const usedR=new Set(list.filter(x=>x.parent===id||x.uid!=="me").map(x=>x.text));const pk=a=>{const f=a.filter(x=>!usedR.has(fillT(x,p)));const t=r.pick(f.length?f:a);usedR.add(fillT(t,p));return t;};
  let d=2500;const push=(uid,txt,par2,ty)=>{const fid=id+"r"+list.length;const o={id:fid,parent:par2,uid,text:fillT(txt,p),at:now+d,tgt:r.int(40,9000),tau:120000,type:ty||"fan",replyTo:par2===id?"me":(list.find(x=>x.id===par2)||{}).uid};list.push(o);addNotif({at:now+d,type:par2===id?"reply":"thread",uid,text:o.text,pid:p.id});d+=r.int(1500,6000);return o;};
  if(par&&par.uid!=="me"&&!(typeof par.uid==="string"))push(par.uid,par.uid<5?pk(C.cre_celeb):genUnique("tgt",p,usedR),id,"tgt");
  const n=r.int(2,5);
  for(let k=0;k<n;k++){const f=push(r.int(60,NU-1),genUnique("fan",p,usedR),id);if(r.ch(.45))push(r.int(60,NU-1),genUnique("kid",p,usedR,{u:getUser(f.uid).username}),f.id);}
  addNotif({at:now+9000,type:"clike",uid:r.int(60,NU-1),text,pid:p.id,n:Math.floor(mine.tgt*.3)});
  save();return mine;}

/* ================= layers / nav ================= */
const layersEl=$("#layers");const stack=[];
function pushLayer(el){el.style.zIndex=30+stack.length*2;layersEl.appendChild(el);stack.push(el);
  if(el.classList.contains("sheetbg")){const sh=el.querySelector(".sheet");if(sh)swipeable(sh,{dir:"down",th:90,handle:sh.querySelector(".sh"),onDone:()=>closeLayer(el)});}
  else if(!el.classList.contains("live")&&!el.classList.contains("story")){const edge=document.createElement("div");edge.style.cssText="position:absolute;left:0;top:60px;bottom:0;width:24px;z-index:50;touch-action:none";el.appendChild(edge);swipeable(el,{dir:"right",th:90,handle:edge,onDone:()=>closeLayer(el)});}}
function popLayer(){const el=stack.pop();if(!el)return;if(el._onClose)el._onClose();el.remove();}
function closeLayer(el){const i=stack.indexOf(el);if(i<0)return;stack.splice(i,1);if(el._onClose)el._onClose();el.remove();}
function mkLayer(title,right=""){const L=el(`<div class="layer"><div class="lwrap"><div class="lhead"><button class="back">${ICON.back}</button><span class="lt">${title}</span><span class="lr">${right}</span></div><div class="scroll lbody"></div></div></div>`);
  L.querySelector(".back").onclick=()=>closeLayer(L);pushLayer(L);return{L,body:L.querySelector(".lbody"),right:L.querySelector(".lr"),head:L.querySelector(".lt")};}
function mkSheet(title,cls=""){const bg=el(`<div class="sheetbg"><div class="sheet ${cls}"><div class="sh">${title}<button class="x">${ic("x")}</button></div><div class="sbody"></div></div></div>`);
  bg.addEventListener("click",e=>{if(e.target===bg)closeLayer(bg);});bg.querySelector(".x").onclick=()=>closeLayer(bg);pushLayer(bg);return{bg,body:bg.querySelector(".sbody")};}
let curPage="home";
function showPage(p){
  if(p==="create"){openCreate({record:true});return;}
  while(stack.length)popLayer();
  curPage=p;document.querySelectorAll(".page").forEach(x=>x.classList.remove("on"));$("#pg-"+p).classList.add("on");
  document.querySelectorAll("#nav button").forEach(b=>b.classList.toggle("on",b.dataset.p===p));
  $("#nav").classList.toggle("lightnav",p!=="home");
  if(p==="me")renderMe();if(p==="inbox")renderInbox();if(p==="disc")renderDisc();
}
document.querySelectorAll("#nav button").forEach(b=>b.onclick=()=>showPage(b.dataset.p));
function refreshFollowUI(id){document.querySelectorAll(`[data-fol="${id}"]`).forEach(e=>{if(isFollowing(id))e.remove();});
  document.querySelectorAll(`[data-fb="${id}"]`).forEach(b=>{const on=isFollowing(id);b.classList.toggle("ing",on);b.textContent=on?"Following":"Follow";});updLive();}
function setFollow(id,v){ST.follow[id]=v;save();refreshFollowUI(id);}

/* ================= feed ================= */
const feeds=[];
function makeFeed(elm,gen,opts={}){
  const f={el:elm,gen,items:[],n:0,active:null,opts,swiped:0};
  const io=new IntersectionObserver(es=>{for(const e of es){if(e.isIntersecting&&e.intersectionRatio>=.6){f.active=e.target;sizeCanvas(e.target);if(f.items.indexOf(e.target)>f.items.length-3)more(3);}}},{root:elm,threshold:[.6]});
  function more(k){for(let j=0;j<k;j++){let p=null,tries=0;while(tries++<8){p=gen(f.n);if(!p)return;f.n++;if(!ST.hidden[p.id]&&!(ST.deleted||{})[p.id]&&!(p.priv&&!opts.start))break;p=null;}if(!p)return;const it=buildVid(p,f);elm.appendChild(it);f.items.push(it);io.observe(it);}}
  f.more=more;more(opts.start?2:4);feeds.push(f);
  let sx=0,sy=0,st=0;const down=(x,y)=>{sx=x;sy=y;st=Date.now();},up=(x,y)=>{const dx=x-sx,dy=y-sy;if(dx<-70&&Math.abs(dy)<60&&Date.now()-st<700&&f.active){f.swiped=Date.now();openProfile(f.active._p.uid);}};
  elm.addEventListener("touchstart",e=>down(e.touches[0].clientX,e.touches[0].clientY),{passive:true});
  elm.addEventListener("touchend",e=>up(e.changedTouches[0].clientX,e.changedTouches[0].clientY),{passive:true});
  elm.addEventListener("mousedown",e=>down(e.clientX,e.clientY));elm.addEventListener("mouseup",e=>up(e.clientX,e.clientY));
  return f;}
function sizeCanvas(it){const cv=it.querySelector("canvas"),dpr=Math.min(1.5,window.devicePixelRatio||1),w=it.clientWidth,h=it.clientHeight;if(w&&cv.width!==Math.round(w*dpr)){cv.width=Math.round(w*dpr);cv.height=Math.round(h*dpr);}}
function capHTML(p){return esc(p.cap)+" "+p.tags.map(t=>`<b data-tag="${esc(t)}">#${esc(t)}</b>`).join(" ");}
function ovHTML(p){if(!p.ov)return"";return `<div class="ovt s${p.ovs} ${p.fx==="pop"?"pop":""}">${p.ov.split(/\s+/).map(w=>`<span class="w">${esc(w)}</span>`).join(" ")}</div>`;}
function stkHTML(p){const r=R("stk"+p.id);return (p.stk||[]).map((e,i)=>{e=stkName(e);return `<span class="stk" style="left:${10+r.int(0,60)}%;top:${12+r.int(0,40)}%;animation-delay:${i*.4}s">${ic(e,{fill:STKC[e],color:STKC[e],sw:1.5})}</span>`;}).join("");}
function buildVid(p,f){
  const u=getUser(p.uid),it=document.createElement("div");it.className="vid";it.dataset.pid=p.id;it._p=p;it._t=(p.seed%7);
  const fol=p.uid!=="me"&&!isFollowing(p.uid);const vs=vidSrc(p),murl=vs&&vs.src;
  const med=murl?(vs.kind==="video"?`<video class="media" src="${murl}" ${vs.poster?`poster="${vs.poster}"`:""} loop playsinline muted preload="${vs.own?"auto":"metadata"}"></video>`:`<img class="media kb" src="${murl}">`):"";
  const orig=p.duetOf?getPost(p.duetOf):null;
  it.innerHTML=`<canvas></canvas>${med}<div class="tshade"></div><div class="shade"></div>${ovHTML(p)}${stkHTML(p)}<div class="pz">${ICON.bigplay}</div>
  <div class="rail"><div class="ava" data-u="1">${avHTML(u)}${fol?`<div class="fol" data-fol="${p.uid}">+</div>`:""}</div>
  <button class="act lk ${ST.liked[p.id]?"liked":""}">${ICON.heart}<span data-live="pl:${p.id}">${fmt(pLikes(p))}</span></button>
  <button class="act cmb">${ICON.cmt}<span data-live="pc:${p.id}">${p.noCm?"Off":fmt(pComments(p))}</span></button>
  <button class="act sv ${ST.saved[p.id]?"saved":""}">${ICON.save}<span data-live="ps:${p.id}">${fmt(pSaves(p))}</span></button>
  <button class="act sh">${ICON.share}<span data-live="psh:${p.id}">${fmt(pShares(p))}</span></button>
  <div class="disc">${avHTML(u)}</div></div>
  <div class="meta"><div class="un" data-u="1">${esc(u.username)} ${verHTML(u)} <span class="ago">· ${ageStr(p)}</span></div>
  ${ST.reposts[p.id]?'<div class="duet">'+ic("repost")+' You reposted</div>':""}${orig?`<div class="duet">${ic("duet")} Duet with @${esc(getUser(orig.uid).username)}</div>`:""}
  <div class="cap">${capHTML(p)}</div>
  <div class="snd">${ic("music")} <span>original sound - ${esc(u.username)} &nbsp;&nbsp;&nbsp; original sound - ${esc(u.username)}</span></div></div><div class="prog"><i></i></div><div class="scrub"></div><div class="x2 hide">2x ${ic("play",{fill:true})}${ic("play",{fill:true})}</div><div class="stime hide"></div>${p.priv?`<div class="privtag">${ic("lock")} Private</div>`:""}`;
  if(murl)it.querySelector("canvas").style.display="none";
  let lastTap=0,tapT=null,holdT=null,held=false;
  const x2=it.querySelector(".x2");
  it.addEventListener("pointerdown",e=>{if(e.target.closest(".rail,.meta,.scrub"))return;held=false;holdT=setTimeout(()=>{held=true;it._fast=true;x2.classList.remove("hide");},380);});
  const endHold=()=>{clearTimeout(holdT);if(it._fast){it._fast=false;x2.classList.add("hide");}};
  it.addEventListener("pointerup",endHold);it.addEventListener("pointercancel",endHold);it.addEventListener("pointerleave",endHold);
  const sc=it.querySelector(".scrub"),stime=it.querySelector(".stime");let scr=false;
  const scrubTo=e=>{const rc=sc.getBoundingClientRect(),fr2=Math.max(0,Math.min(1,(e.clientX-rc.left)/rc.width)),v=it.querySelector("video.media");
    let dur=p.dur;if(v&&v.duration){dur=v.duration;v.currentTime=fr2*dur;}else it._t=fr2*dur;it.querySelector(".prog i").style.width=fr2*100+"%";
    const fm=s=>Math.floor(s/60)+":"+String(Math.floor(s%60)).padStart(2,"0");stime.textContent=fm(fr2*dur)+" / "+fm(dur);};
  sc.addEventListener("pointerdown",e=>{e.stopPropagation();scr=true;try{sc.setPointerCapture(e.pointerId);}catch(_){}it.classList.add("scrubbing");stime.classList.remove("hide");scrubTo(e);});
  sc.addEventListener("pointermove",e=>{if(scr)scrubTo(e);});
  const sEnd=()=>{if(!scr)return;scr=false;it.classList.remove("scrubbing");stime.classList.add("hide");};sc.addEventListener("pointerup",sEnd);sc.addEventListener("pointercancel",sEnd);
  sc.addEventListener("click",e=>e.stopPropagation());
  it.addEventListener("click",e=>{
    if(held){held=false;return;}
    if(Date.now()-f.swiped<500)return;
    const tg=e.target;
    if(tg.closest(".fol")){e.stopPropagation();setFollow(p.uid,true);toast("Following @"+u.username);return;}
    if(tg.closest(".disc")||tg.closest(".snd")){openSound(p);return;}
    if(tg.closest("[data-u]")){openProfile(p.uid);return;}
    if(tg.closest(".lk")){toggleLike(p);return;}
    if(tg.closest(".cmb")){if(p.noCm&&p.uid!=="me"){toast("Comments are turned off for this video");return;}openComments(p);return;}
    if(tg.closest(".sv")){toggleSave(p);return;}
    if(tg.closest(".sh")){openShare(p,it);return;}
    if(tg.closest("[data-tag]")){openTag(tg.closest("[data-tag]").dataset.tag);return;}
    if(tg.closest(".cap")){tg.closest(".cap").classList.toggle("open");return;}
    const now=Date.now();
    if(now-lastTap<300){clearTimeout(tapT);lastTap=0;const rc=it.getBoundingClientRect();heartBurst(it,e.clientX-rc.left,e.clientY-rc.top);if(!ST.liked[p.id])toggleLike(p);}
    else{lastTap=now;tapT=setTimeout(()=>it.classList.toggle("paused"),300);}
  });
  return it;}
function heartBurst(it,x,y){const b=document.createElement("div");b.className="burst";b.style.left=x+"px";b.style.top=y+"px";b.innerHTML=ICON.heart;it.appendChild(b);setTimeout(()=>b.remove(),850);}
function toggleLike(p){if(ST.liked[p.id])delete ST.liked[p.id];else ST.liked[p.id]=Date.now();save();sfx("pop");
  document.querySelectorAll(`.vid[data-pid="${p.id}"] .lk`).forEach(b=>{b.classList.toggle("liked",!!ST.liked[p.id]);b.classList.remove("pop");void b.offsetWidth;b.classList.add("pop");});updLive();}
function toggleSave(p){if(ST.saved[p.id])delete ST.saved[p.id];else ST.saved[p.id]=Date.now();save();
  document.querySelectorAll(`.vid[data-pid="${p.id}"] .sv`).forEach(b=>b.classList.toggle("saved",!!ST.saved[p.id]));updLive();toast(ST.saved[p.id]?"Added to Favorites":"Removed from Favorites");}
let sessSeed=Date.now()%100000;
function fyGen(i){const r=R("fy"+sessSeed+"_"+i);
  if(i===1&&ST.posts.length)return newPostObj(ST.posts[ST.posts.length-1]);
  if(i%4===2)return getMyPost(r.ch(.3)?r.int(0,2):r.int(3,845));
  const uid=r.ch(.7)?r.int(0,59):r.int(60,NU-1);return getUserPost(uid,r.int(0,Math.max(0,getUser(uid).postCount-1)));}
function flGen(i){const r=R("fl"+sessSeed+"_"+i);let uid=r.int(0,947);for(let k=0;k<8&&!isFollowing(uid);k++)uid=r.int(0,NU-1);const u=getUser(uid);return getUserPost(uid,r.int(0,Math.min(3,Math.max(0,u.postCount-1))));}
let fyFeed=null,flFeed=null,homeTab="fy";
document.querySelectorAll(".vtop .tab").forEach(t=>t.onclick=()=>{document.querySelectorAll(".vtop .tab").forEach(x=>x.classList.toggle("on",x===t));
  const fl=t.dataset.t==="fl";$("#fyFeed").classList.toggle("hide",fl);$("#flFeed").classList.toggle("hide",!fl);if(fl&&!flFeed)flFeed=makeFeed($("#flFeed"),flGen);homeTab=fl?"fl":"fy";});
$("#hsrch").onclick=()=>{showPage("disc");setTimeout(()=>$("#q").focus(),50);};
function updSoundBtn(){$("#sndBtn").innerHTML=ST.set.sound?ICON.sndOn:ICON.sndOff;}
$("#sndBtn").onclick=()=>{setSound(!ST.set.sound);toast(ST.set.sound?"Sound on":"Sound off");};
function setSound(on){ST.set.sound=on;save();if(AU.master)AU.master.gain.value=on?.45:0;if(!on)setMusic(null);updSoundBtn();}
function topCtx(){for(let i=stack.length-1;i>=0;i--){if(stack[i].classList.contains("sheetbg"))continue;return stack[i];}return null;}
function curFeed(){const L=topCtx();if(L)return L._feed||null;if(curPage!=="home")return null;return homeTab==="fl"?flFeed:fyFeed;}
function openViewer(gen){const L=el(`<div class="layer dark"><div class="feed"></div><button class="back fback">${ICON.back}</button></div>`);
  L.querySelector(".back").onclick=()=>closeLayer(L);pushLayer(L);L._feed=makeFeed(L.querySelector(".feed"),gen,{start:1});}

/* ================= share sheet ================= */
function openShare(p,it){const{bg,body}=mkSheet(p.uid==="me"?"Your video":"Share to","auto");
  const contacts=[...Object.keys(ST.dms||{}).slice(0,6).map(k=>/^\d+$/.test(k)?+k:k),...[101,140,233,377,412,598]].slice(0,10);
  body.innerHTML=(p.uid==="me"?manageHTML(p):"")+`<div class="contacts">${contacts.map(id=>{const u=getUser(id);return `<button data-c="${id}">${avHTML(u)}<span>${esc(u.name)}</span></button>`;}).join("")}</div>
  <div class="acts">
   <button data-a="repost" class="${ST.reposts[p.id]?"on":""}"><i>${ic("repost")}</i>${ST.reposts[p.id]?"Reposted":"Repost"}</button>
   <button data-a="duet"><i>${ic("duet")}</i>Duet</button><button data-a="copy"><i>${ic("link")}</i>Copy link</button><button data-a="dl"><i>${ic("download")}</i>Save video</button>
   <button data-a="fav"><i>${ic("star",{fill:!!ST.saved[p.id]})}</i>Favorites</button><button data-a="story"><i>${ic("plus")}</i>Add to story</button>
   <button data-a="ni"><i>${ic("broken")}</i>Not interested</button><button data-a="rep"><i>${ic("flag")}</i>Report</button></div>`;
  body.querySelectorAll("[data-m]").forEach(b=>b.onclick=()=>{closeLayer(bg);manageAction(p,b.dataset.m,it);});
  body.querySelectorAll("[data-c]").forEach(b=>b.onclick=()=>{const id=/^\d+$/.test(b.dataset.c)?+b.dataset.c:b.dataset.c;sendDM(id,{type:"video",pid:p.id});closeLayer(bg);toast("Sent to "+getUser(id).name);});
  body.querySelectorAll("[data-a]").forEach(b=>b.onclick=()=>{const a=b.dataset.a;closeLayer(bg);
    if(a==="repost"){if(ST.reposts[p.id])delete ST.reposts[p.id];else ST.reposts[p.id]=Date.now();save();updLive();toast(ST.reposts[p.id]?"Reposted — shows on your profile":"Repost removed");}
    else if(a==="duet")openCreate({duet:p});
    else if(a==="copy"){try{navigator.clipboard&&navigator.clipboard.writeText("https://naymo.app/@"+getUser(p.uid).username+"/video/"+p.id);}catch(_){}toast("Link copied");}
    else if(a==="dl")downloadPost(p);
    else if(a==="fav")toggleSave(p);
    else if(a==="story"){ST.stories.push({id:"s"+Date.now().toString(36),scene:p.scene,seed:p.seed,hue:p.hue,text:p.ov||"",created:Date.now()});save();toast("Added to your story");}
    else if(a==="ni"){ST.hidden[p.id]=1;save();if(it){it.style.transition="opacity .3s";it.style.opacity="0";setTimeout(()=>it.remove(),300);}toast("We'll show you fewer videos like this");}
    else toast("Thanks for reporting");});}
function downloadPost(p){const a=document.createElement("a");
  if(p.media&&MEDIA[p.id]){a.href=MEDIA[p.id];a.download="naymo_"+p.id+(p.media.kind==="video"?".mp4":".jpg");}
  else{const cv=document.createElement("canvas");cv.width=720;cv.height=1280;const c=cv.getContext("2d");drawFull(p,c,720,1280,3);
    if(p.ov){c.font="bold 52px sans-serif";c.textAlign="center";c.lineWidth=8;c.strokeStyle="rgba(0,0,0,.7)";c.fillStyle="#fff";wrapText(c,p.ov,360,420,620,62);}
    c.font="bold 34px sans-serif";c.textAlign="left";c.fillStyle="rgba(255,255,255,.85)";c.fillText("naymo  @"+getUser(p.uid).username,30,1230);a.href=cv.toDataURL("image/png");a.download="naymo_"+p.id+".png";}
  document.body.appendChild(a);a.click();a.remove();toast("Saved to device");}

/* ================= comments sheet ================= */
let sheetCtx=null;
function openComments(p){
  const bg=el(`<div class="sheetbg"><div class="sheet"><div class="sh"><span data-live="pch:${p.id}">${fmt(pComments(p))}</span>&nbsp;comments<button class="x">${ic("x")}</button></div>
  <div class="csort"><button class="on" data-s="top">Top</button><button data-s="new">Newest</button></div><div class="clist"></div>
  <div class="cbar"><div class="rtag hide"><span></span><button>${ic("x")}</button></div><div class="emos">${[["laugh","😂","#f5b400"],["heart","😍","#ff3b6b"],["smile","🥰","#ff8a3d"],["flame","🔥","#ff7a1a"],["sparkle","✨","#e5b000"],["star","⭐","#ffb020"],["eyes","👀","#7b5cff"],["crown","👑","#e0a100"]].map(([n,v,c])=>`<button data-v="${v}">${ic(n,{color:c,size:24})}</button>`).join("")}</div>
  <div class="cin">${avHTML(meUser())}<div class="box"><input placeholder="Add comment..." maxlength="150" enterkeyhint="send"><button class="send" disabled>${ICON.send}</button></div></div></div></div></div>`);
  const list=bg.querySelector(".clist"),inp=bg.querySelector("input"),send=bg.querySelector(".send"),rtag=bg.querySelector(".rtag");
  const ctx={p,bg,list,pages:1,open:new Set(),target:null,sort:"top",seen:visibleExtrasCount(p),tr:new Set()};sheetCtx=ctx;
  bg.addEventListener("click",e=>{if(e.target===bg)closeLayer(bg);});bg.querySelector(".x").onclick=()=>closeLayer(bg);
  bg._onClose=()=>{sheetCtx=null;};
  bg.querySelectorAll(".csort button").forEach(b=>b.onclick=()=>{bg.querySelectorAll(".csort button").forEach(x=>x.classList.toggle("on",x===b));ctx.sort=b.dataset.s;list.scrollTop=0;renderCList(ctx);});
  bg.querySelectorAll(".emos button").forEach(b=>b.onclick=()=>{inp.value+=b.dataset.v;send.disabled=false;inp.focus();});
  inp.oninput=()=>send.disabled=!inp.value.trim();
  const setTarget=c=>{ctx.target=c;if(c){const u=getUser(c.uid);rtag.classList.remove("hide");rtag.querySelector("span").textContent="Replying to @"+u.username;inp.placeholder="Reply to @"+u.username;inp.focus();}else{rtag.classList.add("hide");inp.placeholder="Add comment...";}};
  rtag.querySelector("button").onclick=()=>setTarget(null);ctx.setTarget=setTarget;
  const submit=()=>{const v=inp.value.trim();if(!v)return;const parent=ctx.target?ctx.target.id:null;const c=addUserComment(p,parent,v);inp.value="";send.disabled=true;
    if(parent){let x=parent;while(x){ctx.open.add(x);const o=CMAP[x]||extrasFor(p.id).find(e=>e.id===x);x=o?o.parent:null;}}
    ctx.newId=c.id;setTarget(null);renderCList(ctx);if(!parent)list.scrollTop=0;else{const e2=list.querySelector(`[data-cid="${c.id}"]`);e2&&e2.scrollIntoView({block:"center"});}
    ctx.seen=visibleExtrasCount(p);updLive();toast("Comment posted");};
  send.onclick=submit;inp.onkeydown=e=>{if(e.key==="Enter")submit();};
  pushLayer(bg);renderCList(ctx);}
const visibleExtrasCount=p=>extrasFor(p.id).filter(c=>c.at<=Date.now()).length;
function renderCList(ctx){const{p,list}=ctx;const st=list.scrollTop;list.innerHTML="";
  const now=Date.now();const mine=extrasFor(p.id,null).filter(c=>c.at<=now).slice().reverse();
  let gen=[];for(let pg=0;pg<ctx.pages;pg++)gen=gen.concat(commentPage(p,pg));
  if(ctx.sort==="new")gen=gen.slice().sort((a,b)=>TIMES.indexOf(a.time)-TIMES.indexOf(b.time));
  let top=null;if(ctx.sort==="top")for(const c of gen)if(!c.pinned&&(!top||c.likes>top.likes))top=c;ctx.topId=top&&top.id;
  for(const c of mine)list.appendChild(cEl(ctx,c,0));
  for(const c of gen)list.appendChild(cEl(ctx,c,0));
  if(ctx.pages<8){const b=document.createElement("button");b.className="more";b.innerHTML="View more comments "+ic("down");b.onclick=()=>{ctx.pages++;renderCList(ctx);};list.appendChild(b);}
  list.scrollTop=st;}
function richText(t){return esc(t).replace(/@([\w.]+)/g,"<b>@$1</b>");}
function cEl(ctx,c,depth){const p=ctx.p,u=getUser(c.uid);const d=document.createElement("div");d.className="cm"+(depth?" r":"")+(ctx.newId===c.id?" new":"");d.dataset.cid=c.id;
  const isCre=c.uid===p.uid,liked=!!ST.likedC[c.id],crLiked=c.uid!==p.uid&&(c.creatorLiked||(p.uid==="me"&&liked));
  const rto=depth>=2&&c.replyTo!=null?`<span class="rto">${ic("chevR")}${esc(getUser(c.replyTo).username)}</span>`:"";
  const showTr=ctx.tr.has(c.id);
  d.innerHTML=`${avHTML(u)}<div class="cb"><div class="cn">${esc(u.username)}${verHTML(u)}${isCre?'<span class="ctag">Creator</span>':""}${ctx.topId===c.id?'<span class="mtag">'+ic("flame")+' Most liked</span>':""}${c.pinned?'<span class="pin">· Pinned</span>':""}</div>
   <div class="ct">${rto}${richText(showTr&&c.tr?c.tr:c.text)}</div>${c.tr?`<button class="trb">${showTr?"See original":"See translation"}</button>`:""}
   <div class="cmeta"><span data-rel="${c.at||""}">${c.at?relT(c.at):c.time}</span><button class="rp">Reply</button>${crLiked?'<span class="clk">'+ic("heart",{fill:true})+' Liked by creator</span>':""}</div><div class="kids"></div></div>
   <div class="cl ${liked?"on":""}">${ICON.heart}<span data-live="cl:${p.id}:${c.id}">${fmt(cLikes(c))}</span></div>`;
  d.querySelector(".av").onclick=()=>openProfile(c.uid);d.querySelector(".cn").onclick=()=>openProfile(c.uid);
  d.querySelector(".rp").onclick=()=>ctx.setTarget(c);
  const tb=d.querySelector(".trb");if(tb)tb.onclick=()=>{showTr?ctx.tr.delete(c.id):ctx.tr.add(c.id);renderCList(ctx);};
  const cl=d.querySelector(".cl");cl.onclick=()=>{if(ST.likedC[c.id])delete ST.likedC[c.id];else ST.likedC[c.id]=1;save();sfx("pop");cl.classList.toggle("on");cl.classList.remove("pop");void cl.offsetWidth;cl.classList.add("pop");cl.querySelector("span").textContent=fmt(cLikes(c));
    if(p.uid==="me"&&c.uid!=="me"){const cb=d.querySelector(".cmeta");let s=cb.querySelector(".clk");if(ST.likedC[c.id]&&!s){s=document.createElement("span");s.className="clk";s.innerHTML=ic("heart",{fill:true})+" Liked by creator";cb.appendChild(s);}else if(!ST.likedC[c.id]&&s&&!c.creatorLiked)s.remove();}};
  const kids=kidsOf(p,c),box=d.querySelector(".kids");
  if(kids.length){if(ctx.open.has(c.id)){for(const k of kids)box.appendChild(cEl(ctx,k,depth+1));const h=document.createElement("button");h.className="vr";h.textContent="Hide";h.onclick=()=>{ctx.open.delete(c.id);renderCList(ctx);};box.appendChild(h);}
    else{const n=countAll(p,c);const b=document.createElement("button");b.className="vr";b.innerHTML=`View ${n} ${n===1?"reply":"replies"} ${ic("down")}`;b.onclick=()=>{ctx.open.add(c.id);renderCList(ctx);};box.appendChild(b);}}
  return d;}

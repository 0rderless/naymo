
/* ================= create (post / story / duet) ================= */
function makeThumb(url,kind){return new Promise(res=>{const cv=document.createElement("canvas");cv.width=180;cv.height=240;const c=cv.getContext("2d");
  const done=src=>{try{const sw=src.videoWidth||src.naturalWidth,sh=src.videoHeight||src.naturalHeight,sc=Math.max(180/sw,240/sh);c.drawImage(src,(180-sw*sc)/2,(240-sh*sc)/2,sw*sc,sh*sc);res(cv.toDataURL("image/jpeg",.7));}catch(e){res(null);}};
  if(kind==="image"){const im=new Image();im.onload=()=>done(im);im.onerror=()=>res(null);im.src=url;}
  else{const v=document.createElement("video");v.muted=true;v.playsInline=true;v.preload="auto";v.src=url;v.onloadeddata=()=>{v.currentTime=Math.min(.5,(v.duration||1)/2);};v.onseeked=()=>done(v);v.onerror=()=>res(null);setTimeout(()=>res(null),6000);}});}
function openCreate(opt={}){const mode=opt.story?"story":opt.duet?"duet":"post";
  const{L,body}=mkLayer(mode==="story"?"Add to story":mode==="duet"?"Duet":"New post");
  let sel=opt.topic||(opt.duet?opt.duet.topic:TK[0]),media=null,fx="static";const stk=new Set();
  body.innerHTML=`<div class="form"><div class="prev"><canvas width="240" height="427"></canvas><img class="pm hide"><video class="pm hide" playsinline muted loop autoplay></video></div>
   ${mode!=="duet"?`<div class="upl"><button class="ubtn recb" type="button">${ic("video")} Record</button><label class="ubtn">${ic("upload")} Upload<input type="file" accept="image/*,video/*" hidden></label><button class="ubtn rm hide" type="button">${ic("x")} Remove</button></div>`:`<div class="fl">Left: @${esc(getUser(opt.duet.uid).username)}'s video · Right: you</div>`}
   <div class="fl"><span class="stl">Video style</span><div class="scenes">${TK.map(k=>`<button data-k="${k}" class="${k===sel?"on":""}"><img><span>${TOP[k].n}</span></button>`).join("")}</div></div>
   <label>Text on video<input id="cov" maxlength="60" placeholder="POV: ..."></label>
   ${mode!=="story"?`<div class="fl">Caption effect<div class="seg" id="cfx"><button class="on" data-v="static">Static</button><button data-v="pop">${ic("sparkle")} Word pop</button></div></div>
   <div class="fl">Stickers<div class="stks">${STK.map(e=>`<button data-s="${e}">${ic(e,{fill:STKC[e],color:STKC[e]==="#ffffff"?"#888":STKC[e],sw:1.5,size:26})}</button>`).join("")}</div></div>
   <label>Caption<textarea id="ccap" maxlength="200" placeholder="Describe your video... #hashtags">${opt.tag?"#"+esc(opt.tag)+" ":""}</textarea></label>`:""}
   <button class="go gr">${mode==="story"?"Share to story":"Post"}</button></div>`;
  body.querySelectorAll(".scenes button").forEach(b=>{const k=b.dataset.k;b.querySelector("img").src=thumb(mkPost("prev_"+k,"me",R("prev"+k),k,0,0));
    b.onclick=()=>{sel=k;body.querySelectorAll(".scenes button").forEach(x=>x.classList.toggle("on",x===b));};});
  body.querySelectorAll("#cfx button").forEach(b=>b.onclick=()=>{fx=b.dataset.v;body.querySelectorAll("#cfx button").forEach(x=>x.classList.toggle("on",x===b));});
  body.querySelectorAll(".stks button").forEach(b=>b.onclick=()=>{const e=b.dataset.s;if(stk.has(e))stk.delete(e);else if(stk.size<3)stk.add(e);b.classList.toggle("on",stk.has(e));});
  const pimg=body.querySelector("img.pm"),pvid=body.querySelector("video.pm"),rm=body.querySelector(".rm"),fin=body.querySelector("input[type=file]");
  const showMedia=()=>{pimg.classList.add("hide");pvid.classList.add("hide");if(media){(media.kind==="image"?pimg:pvid).src=media.url;(media.kind==="image"?pimg:pvid).classList.remove("hide");if(media.kind==="video")pvid.play().catch(()=>{});}
    if(rm)rm.classList.toggle("hide",!media);body.querySelector(".stl").textContent=media?"Category (for comments)":"Video style";};
  if(fin)fin.onchange=async()=>{const f=fin.files[0];if(!f)return;const kind=f.type.startsWith("video")?"video":"image";const url=URL.createObjectURL(f);toast("Processing…");media={file:f,kind,url,thumb:await makeThumb(url,kind)};showMedia();};
  const rb=body.querySelector(".recb");if(rb)rb.onclick=()=>openRecorder(m=>{media=m;showMedia();});
  if(opt.record&&rb)setTimeout(()=>rb.click(),50);
  if(rm)rm.onclick=()=>{media=null;fin.value="";showMedia();};
  const pc=body.querySelector("canvas").getContext("2d");
  addAnim(L,()=>{const t=performance.now()/1000,ov=body.querySelector("#cov").value;
    if(mode==="duet")drawFull({duetOf:opt.duet.id,scene:sel,seed:42,hue:200},pc,240,427,t);else drawPost({scene:sel,seed:hashStr(sel)%1000,hue:200},pc,240,427,t);
    if(ov&&!media){pc.font="bold 18px sans-serif";pc.textAlign="center";pc.lineWidth=4;pc.strokeStyle="rgba(0,0,0,.7)";pc.fillStyle="#fff";
      const ws=ov.split(" "),n=fx==="pop"?Math.min(ws.length,Math.floor(t*2.2)%(ws.length+5)):ws.length;wrapText(pc,ws.slice(0,n).join(" "),120,150,210,22);}
    if(stk.size){[...stk].forEach((e,i)=>pc.drawImage(svgImg(e,STKC[e]),30+i*70,230+Math.sin(t*3+i)*8,44,44));}});
  body.querySelector(".go").onclick=async()=>{const ov=body.querySelector("#cov").value.trim(),r=R("np"+Date.now()),id=(mode==="story"?"s":"n")+Date.now().toString(36);
    if(media){MEDIA[id]=media.url;await IDB.put(id,media.file);}
    if(mode==="story"){ST.stories.push({id,scene:sel,seed:r.int(1,999),hue:r.int(0,359),text:ov,created:Date.now(),media:media?media.kind:null});save();closeLayer(L);toast("Added to your story");openStories(["me"],0);return;}
    const capRaw=body.querySelector("#ccap").value.trim(),tags=(capRaw.match(/#[\w]+/g)||[]).map(t=>t.slice(1).toLowerCase());
    const np={id,topic:sel,cap:capRaw.replace(/#[\w]+/g,"").trim()||(media?"":TOP[sel].cap[0]),ov,ovs:r.int(0,2),fx,stk:[...stk],tags:tags.length?tags:[TOP[sel].tg[0],"fyp","naymo"],created:Date.now(),tgt:Math.floor(r.log(3e6,4e7)),
      media:media?{kind:media.kind}:null,thumb:media?media.thumb:null,duetOf:opt.duet?opt.duet.id:null};
    ST.posts.push(np);save();closeLayer(L);showPage("me");toast("Posted! It's taking off");
    [[20000,"milestone","Your new video just passed 1M views"],[60000,"milestone","Your new video is trending #1 on For You"]].forEach(([d,t,x])=>addNotif({at:Date.now()+d,type:t,uid:"me",text:x,pid:id}));save();};}

/* ================= edit profile ================= */
function openEdit(){const p=ST.profile;const{L,body}=mkLayer("Edit profile");
  body.innerHTML=`<div class="form"><div style="text-align:center" class="eav"></div>
   <label>Name<input id="en" maxlength="30" value="${esc(p.name)}"></label><label>Username<input id="eu" maxlength="24" value="${esc(p.username)}"></label>
   <label>Bio<textarea id="eb" maxlength="160">${esc(p.bio)}</textarea></label><label>Link in bio<input id="el" maxlength="40" value="${esc(p.link)}"></label>
   <label>Instagram<input id="ei" maxlength="30" value="${esc(p.ig)}"></label><label>YouTube<input id="ey" maxlength="30" value="${esc(p.yt)}"></label>
   <div class="fl">Avatar icon<div class="stks" id="eic"><button data-i="" class="${p.icon?"":"on"}" style="font-weight:800;font-size:15px">Aa</button>${AVI.map(n=>`<button data-i="${n}" class="${p.icon===n?"on":""}">${ic(n,{size:22})}</button>`).join("")}</div></div><label>Avatar color<input id="eh" type="range" min="0" max="359" value="${p.hue}"></label>
   <button class="go">Save</button></div>`;
  const q=s=>body.querySelector(s);let icn=p.icon||null;const prev=()=>{q(".eav").innerHTML=`<span class="pav">${avHTML({name:q("#en").value||"?",avatar:{hue:+q("#eh").value,icon:icn}})}</span>`;};
  body.querySelectorAll("#eic button").forEach(b=>b.onclick=()=>{icn=b.dataset.i||null;body.querySelectorAll("#eic button").forEach(x=>x.classList.toggle("on",x===b));prev();});
  prev();body.querySelectorAll("input").forEach(i=>i.oninput=prev);
  q(".go").onclick=()=>{p.name=q("#en").value.trim()||"Nay";p.username=(q("#eu").value.trim().toLowerCase().replace(/[^a-z0-9._]/g,"")||"nay");p.bio=q("#eb").value;
    p.link=q("#el").value.trim();p.ig=q("#ei").value.trim();p.yt=q("#ey").value.trim();p.icon=icn;p.hue=+q("#eh").value;save();closeLayer(L);renderMe();toast("Profile updated");};}

/* ================= settings ================= */
function applyDark(){app.classList.toggle("dk",!!ST.set.dark);}
function openSettings(){const{L,body}=mkLayer("Settings");const s=ST.set;
  const tg=(k,l)=>`<div class="srow"><span>${l}</span><button class="sw ${s[k]?"on":""}" data-k="${k}"></button></div>`;
  body.innerHTML=`<div class="sgroup"><div class="sgt">Your numbers</div>
    <label class="srow">Followers<input type="number" id="s_f" value="${s.followers}"></label><label class="srow">Total likes<input type="number" id="s_l" value="${s.likes}"></label>
    <label class="srow">Following<input type="number" id="s_fo" value="${s.following}"></label><label class="srow">Follower gain / sec<input type="number" id="s_fps" value="${s.fps}"></label>
    <div class="srow">New post blow-up<div class="sseg" id="s_sp">${Object.keys(SPEED).map(k=>`<button data-v="${k}" class="${s.speed===k?"on":""}">${k}</button>`).join("")}</div></div>
    <div class="srow"><button class="go" id="s_save">Save numbers</button></div></div>
   <div class="sgroup"><div class="sgt">Cloud backup</div><div class="srow"><span>${ic("cloud")} Back up to my database</span><button class="sw ${s.cloud?"on":""}" data-k="cloud"></button></div>
    <label class="srow">Sync ID<input id="s_sid" value="${esc(s.syncId||"")}" placeholder="any name"></label>
    <div class="srow" style="display:block;font-size:13px;color:var(--mut);line-height:1.5"><span id="s_cst">${esc(cloudStatus)}</span><br>Use the same Sync ID on another phone to load your Naymo there. Uploaded videos stay on the device they came from.</div>
    <div class="srow" style="gap:8px"><button class="go" id="s_cup">${ic("upload")} Back up now</button><button class="go2" id="s_cdn">${ic("download")} Restore</button></div></div>
   <div class="sgroup"><div class="sgt">Real videos</div><div class="srow"><span>${ic("video")} Use my clips in the feed</span><button class="sw ${s.real!==false?"on":""}" data-k="real"></button></div>
    <div class="srow"><span>${ic("sparkle")} Camera look on drawn videos</span><button class="sw ${s.film!==false?"on":""}" data-k="film"></button></div>
    <div class="srow" style="display:block;font-size:13px;color:var(--mut);line-height:1.5"><span id="s_lc">${libList().length} clips in your library.</span> Add real videos or photos from your phone and they'll play across the whole feed as other people's posts (with all the likes and comments).</div>
    <div class="srow" style="gap:8px"><label class="go" style="text-align:center;cursor:pointer">${ic("upload")} Add clips<input id="s_lib" type="file" accept="video/*,image/*" multiple hidden></label><button class="go2" id="s_libc" style="width:auto;padding:12px 14px">Clear</button></div></div>
   <div class="sgroup"><div class="sgt">Display & sound</div>${tg("dark",ic("moon")+" Dark mode")}${tg("sound",ic("sound")+" Video sounds")}${tg("popups",ic("bell")+" Pop-up notifications")}${tg("badge",ic("trophy")+" Top creator badge")}</div>
   <div class="sgroup"><div class="sgt">Wallet</div><div class="srow"><span>${ic("coin")} Coins</span><span class="v" id="s_c">${fmtX(ST.coins)}</span></div><div class="srow"><span>${ic("gem")} Diamonds earned</span><span class="v">${fmtX(ST.diamonds)}</span></div>
    <div class="srow"><span>${ic("brief")} Brand deal earnings</span><span class="v">$${fmtX(ST.earnings)}</span></div><div class="srow"><button class="go2" id="s_coins">Get 10,000 coins</button></div></div>
   <div class="sgroup"><div class="sgt">Creator tools</div><div class="srow lnk" data-go="an"><span>${ic("chart")} Analytics</span><span class="v">›</span></div><div class="srow lnk" data-go="board"><span>${ic("trophy")} LIVE leaderboards & history</span><span class="v">›</span></div><div class="srow lnk" data-go="live"><span>${ic("live")} Go LIVE</span><span class="v">›</span></div><div class="srow lnk" data-go="edit"><span>${ic("edit")} Edit profile</span><span class="v">›</span></div></div>
   <div class="sgroup"><button class="danger" id="s_reset">Reset all Naymo data</button></div><div class="empty" style="padding:20px"><span class="gtext" style="font-weight:900;font-size:20px">naymo</span><br>v2.0</div>`;
  body.querySelectorAll(".sw").forEach(b=>b.onclick=()=>{const k=b.dataset.k;if(k==="sound"){setSound(!s.sound);}else{s[k]=!s[k];save();}b.classList.toggle("on",!!s[k]);if(k==="dark")applyDark();if(k==="real")refreshFeeds();});
  body.querySelectorAll("#s_sp button").forEach(b=>b.onclick=()=>{s.speed=b.dataset.v;save();body.querySelectorAll("#s_sp button").forEach(x=>x.classList.toggle("on",x===b));});
  body.querySelector("#s_save").onclick=()=>{const n=id=>Math.max(0,Math.floor(+body.querySelector(id).value||0));s.followers=n("#s_f");s.likes=n("#s_l");s.following=n("#s_fo");s.fps=n("#s_fps");ST.fStart=Date.now();save();updLive();toast("Numbers updated");};
  body.querySelector("#s_lib").onchange=async e=>{const fs=[...e.target.files];if(!fs.length)return;toast("Adding "+fs.length+" clips…");const n=await addToLibrary(fs);body.querySelector("#s_lc").textContent=libList().length+" clips in your library.";toast(n+" clips added to your feed");refreshFeeds();};
  body.querySelector("#s_libc").onclick=()=>{if(!libList().length)return;if(!confirm("Remove all clips from your library?"))return;clearLibrary();body.querySelector("#s_lc").textContent="0 clips in your library.";refreshFeeds();toast("Library cleared");};
  body.querySelector("#s_sid").onchange=e=>{s.syncId=e.target.value.trim()||"default";save();};
  body.querySelector("#s_cup").onclick=()=>{s.syncId=body.querySelector("#s_sid").value.trim()||"default";save();body.querySelector("#s_cst").textContent="Backing up…";cloudSave(true);};
  body.querySelector("#s_cdn").onclick=async()=>{s.syncId=body.querySelector("#s_sid").value.trim()||"default";const st=body.querySelector("#s_cst");st.textContent="Restoring…";const ok=await cloudLoad(true);st.textContent=cloudStatus;if(ok){toast("Restored — reloading");setTimeout(()=>location.reload(),900);}};
  body.querySelector("#s_coins").onclick=()=>{ST.coins+=10000;save();body.querySelector("#s_c").textContent=fmtX(ST.coins);toast("+10,000 coins");};
  body.querySelectorAll("[data-go]").forEach(r2=>r2.onclick=()=>({an:openAnalytics,live:openGoLive,edit:openEdit,board:()=>openBoard(null,"me",true,"mine")})[r2.dataset.go]());
  body.querySelector("#s_reset").onclick=()=>{if(!confirm("Delete all your Naymo posts, comments, messages and settings?"))return;try{localStorage.removeItem(LS);indexedDB.deleteDatabase("naymo");}catch(e){}location.reload();};}

/* ================= analytics ================= */
function svgArea(data,col){const w=300,h=110,mx=Math.max(...data),mn=Math.min(...data)*.85,pts=data.map((v,i)=>[i/(data.length-1)*w,h-8-(v-mn)/(mx-mn||1)*(h-20)]);
  const d=pts.map((p,i)=>(i?"L":"M")+p[0].toFixed(1)+","+p[1].toFixed(1)).join(" "),gid="g"+Math.random().toString(36).slice(2);
  return `<svg viewBox="0 0 ${w} ${h}" width="100%" height="${h}" preserveAspectRatio="none"><defs><linearGradient id="${gid}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${col}" stop-opacity=".35"/><stop offset="1" stop-color="${col}" stop-opacity="0"/></linearGradient></defs><path d="${d} L${w},${h} L0,${h} Z" fill="url(#${gid})"/><path d="${d}" fill="none" stroke="${col}" stroke-width="2.5" vector-effect="non-scaling-stroke" stroke-linejoin="round"/></svg>`;}
function openAnalytics(){const{L,body}=mkLayer("Analytics");let range=7;
  function render(){const views=[],fol=[];for(let i=0;i<range;i++){const r=R("av"+(dayKey-i));views.unshift(2.6e8+r.f()*2.2e8+(r.ch(.12)?4e8:0));fol.unshift(6e4+R("af"+(dayKey-i)).f()*1.2e5);}
    const tv=views.reduce((a,b)=>a+b,0),tf=fol.reduce((a,b)=>a+b,0),likes=tv*.09,pv=tv*.018;
    const top=[0,1,2,...Array.from({length:60},(_,i)=>i+3)].map(getMyPost).sort((a,b)=>b.likes-a.likes).slice(0,5);
    const hours=Array.from({length:24},(_,h)=>.25+.75*Math.exp(-Math.pow((h-20)/3.5,2))+.2*Math.exp(-Math.pow((h-13)/2,2)));const pk=hours.indexOf(Math.max(...hours));
    body.innerHTML=`<div class="an"><div style="display:flex;justify-content:center;margin-top:12px"><div class="seg">${[7,28,60].map(d=>`<button data-r="${d}" class="${d===range?"on":""}">${d} days</button>`).join("")}</div></div>
     <div class="kpis"><div class="kpi"><small>Video views</small><b>${fmt(tv)}</b><i>${ic("trend")} ${R("k1"+range).int(8,40)}%</i></div><div class="kpi"><small>Profile views</small><b>${fmt(pv)}</b><i>${ic("trend")} ${R("k2"+range).int(5,30)}%</i></div>
      <div class="kpi"><small>Likes</small><b>${fmt(likes)}</b><i>${ic("trend")} ${R("k3"+range).int(4,25)}%</i></div><div class="kpi"><small>Comments</small><b>${fmt(likes*.008)}</b><i>${ic("trend")} ${R("k4"+range).int(3,20)}%</i></div>
      <div class="kpi"><small>Shares</small><b>${fmt(likes*.03)}</b><i>${ic("trend")} ${R("k5"+range).int(6,35)}%</i></div><div class="kpi"><small>Est. rewards</small><b>$${fmt(tv/1000*.45)}</b><i>${ic("trend")} ${R("k6"+range).int(5,30)}%</i></div></div>
     <div class="card"><h4>Video views <small>last ${range} days</small></h4>${svgArea(views,"#ff3b6b")}</div>
     <div class="card"><h4>Followers <small>live</small></h4><div class="big" data-live="fexact">${fmtX(meUser().followers)}</div><div style="color:#16a34a;font-weight:700;font-size:13px;margin:4px 0 8px">+${fmt(tf)} in the last ${range} days</div>${svgArea(fol.map((v,i)=>fol.slice(0,i+1).reduce((a,b)=>a+b,0)),"#7b5cff")}</div>
     <div class="card"><h4>Top territories</h4>${[["United States",31],["Brazil",12],["Philippines",9],["Indonesia",8],["Mexico",7],["United Kingdom",6],["Others",27]].map(([n,v])=>`<div class="hbar"><span>${n}</span><div><i style="width:${v/31*100}%"></i></div><b>${v}%</b></div>`).join("")}</div>
     <div class="card"><h4>Audience</h4>${[["Female",58],["Male",39],["Other",3]].map(([n,v])=>`<div class="hbar"><span>${n}</span><div><i style="width:${v}%"></i></div><b>${v}%</b></div>`).join("")}<div style="height:8px"></div>${[["18-24",41],["25-34",33],["35-44",15],["45-54",7],["55+",4]].map(([n,v])=>`<div class="hbar"><span>${n}</span><div><i style="width:${v/41*100}%"></i></div><b>${v}%</b></div>`).join("")}</div>
     <div class="card"><h4>Most active times <small>peak ${pk}:00</small></h4><div class="hours">${hours.map((v,i)=>`<i class="${i===pk?"pk":""}" style="height:${v*100}%"></i>`).join("")}</div><div style="display:flex;justify-content:space-between;color:var(--mut);font-size:11px;margin-top:4px"><span>0h</span><span>6h</span><span>12h</span><span>18h</span><span>23h</span></div></div>
     <div class="card"><h4>Top posts</h4>${top.map(p=>`<div class="tp" data-p="${p.id}"><img src="${thumb(p)}"><div>${esc(p.cap)}<br><small>${ic("play")} ${fmt(pViews(p))} · ${ic("heart")} ${fmt(pLikes(p))}</small></div></div>`).join("")}</div>
     <div class="card"><h4>LIVE <small>${(ST.lives||[]).length} streams</small></h4><button class="go2" data-a="lb">${ic("trophy")} Leaderboards & LIVE history</button></div><div class="card"><h4>Wallet</h4><div class="hbar"><span>${ic("gem")} Diamonds</span><b style="width:auto">${fmtX(ST.diamonds)}</b></div><div class="hbar"><span>${ic("brief")} Brand deals</span><b style="width:auto">$${fmtX(ST.earnings)}</b></div><div class="hbar"><span>${ic("coin")} Coins</span><b style="width:auto">${fmtX(ST.coins)}</b></div></div></div>`;
    body.querySelectorAll("[data-r]").forEach(b=>b.onclick=()=>{range=+b.dataset.r;render();});const lb=body.querySelector("[data-a=lb]");if(lb)lb.onclick=()=>openBoard(null,"me",true,"mine");
    body.querySelectorAll("[data-p]").forEach(d=>d.onclick=()=>{const p=getPost(d.dataset.p);openViewer(i=>i?null:p);});}
  render();}

/* ================= popups ================= */
const popEl=$("#pop");let popT;
const popMoved=swipeable(popEl,{dir:"up",th:70,onDone:()=>{popEl.style.transition="none";popEl.classList.remove("on");popEl.style.transform="";requestAnimationFrame(()=>popEl.style.transition="");}});
function showPop(u,label,text,onClick){popEl.innerHTML=`${avHTML(u)}<div class="i"><small>${label}</small>${text}</div>`;popEl.onclick=()=>{if(popMoved())return;popEl.classList.remove("on");onClick&&onClick();};
  popEl.classList.add("on");sfx("msg");clearTimeout(popT);popT=setTimeout(()=>popEl.classList.remove("on"),3800);}
function randomPop(){setTimeout(randomPop,14000+Math.random()*12000);if(!ST.set.popups||document.hidden)return;
  const r=R("pop"+Date.now()),uid=r.int(60,NU-1),u=getUser(uid),p=getMyPost(r.int(0,20)),x=r.f();
  if(x<.3){const n=r.int(800,9000);showPop(u,"NAYMO",`<b>${esc(u.username)}</b> and ${fmtX(n)} others liked your video`,()=>openViewer(i=>i?null:p));addNotif({at:Date.now(),type:"like",uid,pid:p.id,n});}
  else if(x<.5){const n=r.int(4000,30000);showPop(meUser(),"NAYMO",`${ic("trend")} +${fmtX(n)} new followers in the last hour`,()=>showPage("me"));}
  else if(x<.7){const c=r.pick(C.me_r).replace(/\{me\}/g,"@"+ST.profile.username);showPop(u,"NEW COMMENT",`<b>${esc(u.username)}</b>: ${esc(c)}`,()=>{openViewer(i=>i?null:p);setTimeout(()=>openComments(p),250);});addNotif({at:Date.now(),type:"comment",uid,pid:p.id,text:c});}
  else if(x<.85){const n=r.int(200,5000);showPop(u,"NAYMO",`<b>${esc(u.username)}</b> and ${fmtX(n)} others liked your comment`,()=>{inboxTab="act";showPage("inbox");});addNotif({at:Date.now(),type:"clike",uid,pid:p.id,n,text:"love you guys 🫶"});}
  else{initDMs();const fid=r.int(300,2999),t=ST.dms[fid]||(ST.dms[fid]={uid:fid,kind:"fan",msgs:[],unread:true});const m=r.pick(["hi!! i love your videos so much 🥹","can you follow me back pls 🙏","you inspired me to start posting!!","ok your last video had me crying 😭"]);
    t.msgs.push({f:"t",at:Date.now(),x:m});t.unread=true;save();showPop(getUser(fid),"NEW MESSAGE",`<b>${esc(getUser(fid).username)}</b>: ${esc(m)}`,()=>openThread(fid));}
  updBadge();save();}

/* ================= live ticker + main loop ================= */
function updLive(){document.querySelectorAll("[data-live]").forEach(e=>{const v0=e.dataset.live;if(!v0)return;const [k,a,b]=v0.split(":");let v=null;
  if(k==="following"){e.textContent=fmt(followingCount());return;}if(k==="mefol"){e.textContent=fmt(meUser().followers);return;}if(k==="melikes"){e.textContent=fmt(meUser().likes);return;}
  if(k==="fexact"){e.textContent=fmtX(meUser().followers);return;}if(k==="fgain"){e.textContent=fmtX(Math.floor(((Date.now()-new Date().setHours(0,0,0,0))/1000)*ST.set.fps*1.4));return;}
  const p=a&&getPost(a);if(!p)return;
  if(k==="pl")v=pLikes(p);else if(k==="pc"||k==="pch")v=pComments(p);else if(k==="ps")v=pSaves(p);else if(k==="psh")v=pShares(p);else if(k==="pv")v=pViews(p);
  else if(k==="cl"){const cc=CMAP[b]||extrasFor(a).find(x=>x.id===b);if(cc)v=cLikes(cc);}
  if(v!=null){const s=fmt(v);if(e.textContent!==s)e.textContent=s;}});
  document.querySelectorAll("[data-rel]").forEach(e=>{if(e.dataset.rel)e.textContent=relT(+e.dataset.rel);});}
let lastNotif=0;
setInterval(()=>{updLive();updBadge();
  if(sheetCtx){const n=visibleExtrasCount(sheetCtx.p);if(n!==sheetCtx.seen){sheetCtx.seen=n;sheetCtx.newId=null;renderCList(sheetCtx);}}
  if(threadCtx)renderThread(threadCtx,false);
  const due=ST.notifs.filter(n=>n.at<=Date.now()).length;if(due>lastNotif&&lastNotif&&curPage!=="inbox"&&ST.set.popups){const n=ST.notifs.filter(x=>x.at<=Date.now()).slice(-1)[0];
    if(n&&["reply","thread","deal","milestone"].includes(n.type)&&Date.now()-n.at<3000){const u=getUser(n.uid);showPop(u,n.type==="deal"?"BRAND DEAL":n.type==="milestone"?"MILESTONE":"NEW REPLY",n.type==="reply"||n.type==="thread"?`<b>${esc(u.username)}</b>: ${esc(n.text)}`:esc(n.text),()=>{const p=getPost(n.pid);if(p&&(n.type==="reply"||n.type==="thread")){openViewer(i=>i?null:p);setTimeout(()=>openComments(p),250);}else{inboxTab="act";showPage("inbox");}});}}
  lastNotif=due;},1000);
let last=performance.now(),lastAct=null,lastVid=null;
function frame(now){const dt=Math.min(.05,(now-last)/1000);last=now;const f=curFeed(),act=f&&f.active;
  if(act!==lastAct){if(lastVid)lastVid.pause();lastAct=act;lastVid=act?act.querySelector("video.media"):null;}
  if(act){const p=act._p,paused=act.classList.contains("paused");
    if(!paused){act._t+=dt*(act._fast?2:1);if(!act.querySelector(".media")){const cv=act.querySelector("canvas");if(cv.width<2)sizeCanvas(act);drawFull(p,cv.getContext("2d"),cv.width,cv.height,act._t);}
      act.querySelector(".prog i").style.width=((lastVid&&lastVid.duration?lastVid.currentTime/lastVid.duration:(act._t%p.dur)/p.dur)*100)+"%";
      if(p.fx==="pop"){const ws=act.querySelectorAll(".ovt.pop .w"),k=Math.floor(act._t*2.2)%(ws.length+6);ws.forEach((w,i)=>w.classList.toggle("on",i<k));}}
    if(lastVid){lastVid.muted=!ST.set.sound;lastVid.playbackRate=act._fast?2:1;if(act.classList.contains("scrubbing"))lastVid.pause();else if(paused&&!lastVid.paused)lastVid.pause();if(!paused&&lastVid.paused)lastVid.play().catch(()=>{});}}
  const top=topCtx();for(const a of ANIMS){if(!a.el.isConnected){ANIMS.delete(a);continue;}if(!top||top===a.el)a.draw(dt);}
  if(AU.ctx&&ST.set.sound){let at=null;if(top&&top._audio)at=top._audio();else if(act&&!act.classList.contains("paused")&&!(act._p.media&&MEDIA[act._p.id]&&act._p.media.kind==="video"))at={key:act._p.scene,seed:act._p.seed};
    if(at)setMusic(at.key,at.seed);else setMusic(null);musicTick();}
  requestAnimationFrame(frame);}
window.addEventListener("resize",()=>feeds.forEach(f=>f.active&&sizeCanvas(f.active)));
document.addEventListener("visibilitychange",()=>{if(document.hidden&&AU.ctx)setMusic(null);});

/* ================= init ================= */
function refreshFeeds(){sessSeed++;for(const id of ["#fyFeed","#flFeed"]){const e=$(id);e.innerHTML="";}feeds.length=0;fyFeed=makeFeed($("#fyFeed"),fyGen);flFeed=null;if(homeTab==="fl")flFeed=makeFeed($("#flFeed"),flGen);for(const k in THC)delete THC[k];}
$("#gamesBtn").innerHTML=ic("gamepad",{color:"#fff"});$("#gamesBtn").onclick=openGames;
function updCC(){$("#ccBtn").innerHTML=`<span class="cc ${ST.set.cc?"":"off"}">CC</span>`;app.classList.toggle("nocc",!ST.set.cc);}
$("#ccBtn").onclick=()=>{ST.set.cc=!ST.set.cc;save();updCC();toast(ST.set.cc?"Captions on":"Captions off");};
(async()=>{const t0=Date.now();if(await Promise.race([cloudLoad(false),new Promise(r=>setTimeout(()=>r(false),3500))]))setTimeout(()=>toast("Synced from the cloud"),1300);
  applyDark();updSoundBtn();updCC();await loadMedia();initDMs();await Promise.race([loadRepoClips(),new Promise(r=>setTimeout(r,2500))]);

  lastNotif=ST.notifs.filter(n=>n.at<=Date.now()).length;
  fyFeed=makeFeed($("#fyFeed"),fyGen);requestAnimationFrame(frame);
  setTimeout(()=>{const s=$("#splash");s.style.opacity="0";setTimeout(()=>s.remove(),500);},Math.max(0,1100-(Date.now()-t0)));
  setTimeout(randomPop,9000);setTimeout(trickle,15000);updBadge();})();
window.__naymo={get ST(){return ST},openGames,openShareCard,manageAction,openBoard,getUser,getPost,openLive,openStories,openThread,openAnalytics,openSettings,openCreate,openShare,openTag,openSound};
})();
</script>
</body>
</html>


/* ================= stories data ================= */
const STXT=["good morning ☀️","guess where i am 👀","new video tonight!!","rate my outfit 1-10","studio day 🎧","can't sleep 🌙","this view tho","coffee first ☕","we're so back","plot twist incoming"];
function storyUsers(){const l=[];for(let i=0;i<60&&l.length<16;i++)if(i<5||R("hs"+i+dayKey).ch(.35))l.push(i);return l;}
function liveUsers(){const l=[];for(let i=0;i<60&&l.length<6;i++)if(R("lv"+i+dayKey).ch(.2))l.push(i);if(l.length<3)l.push(1,3,12);return [...new Set(l)];}
const SCACHE={};
function genStory(uid){if(SCACHE[uid])return SCACHE[uid];const u=getUser(uid),r=R("story"+uid+dayKey);const n=r.int(1,3),fr2=[];
  for(let i=0;i<n;i++)fr2.push({id:"st"+uid+"_"+i,scene:r.pick(u.topics),seed:r.int(1,999),hue:r.int(0,359),text:r.pick(STXT),t:r.int(1,20)+"h"});return SCACHE[uid]=fr2;}
const myStories=()=>ST.stories.filter(s=>Date.now()-s.created<864e5);
const hasStory=uid=>uid==="me"?myStories().length>0:storyUsers().includes(uid);
function storyBar(){const lv=liveUsers(),me=meUser();
  const wrap=el(`<div class="sbar"></div>`);
  const mine=el(`<div class="si">${hasStory("me")?`<span class="ring">${avHTML(me)}</span>`:avHTML(me)}${hasStory("me")?"":'<span class="pl">+</span>'}<span>Your story</span></div>`);
  mine.onclick=()=>hasStory("me")?openStories(["me"],0):openCreate({story:true});wrap.appendChild(mine);
  lv.slice(0,3).forEach(id=>{const u=getUser(id);const d=el(`<div class="si"><span class="ring">${avHTML(u)}</span><span class="lv">LIVE</span><span>${esc(u.username)}</span></div>`);d.onclick=()=>openLive(id,false);wrap.appendChild(d);});
  const su=storyUsers();su.forEach((id,i)=>{const u=getUser(id);const d=el(`<div class="si"><span class="ring ${ST.seenStories[id]?"seen":""}">${avHTML(u)}</span><span>${esc(u.username)}</span></div>`);d.onclick=()=>openStories(su,i);wrap.appendChild(d);});
  return wrap;}

/* ================= profile ================= */
const PLN={sunset:["plane","Travel diaries"],ramen:["utensils","Cooking at home"],cook:["utensils","15 min dinners"],gaming:["gamepad","Game dev log"],music:["headphones","Beats"],coffee:["cup","Latte art"],pet:["paw","Mochi"],gym:["dumbbell","Gym diaries"],grwm:["palette","GRWM"],dance:["music","Dances"],story:["book","Storytimes"],city:["building","City nights"],rain:["cloud","Study with me"],space:["planet","Space"],ocean:["drop","Beach nights"]};
let PLCACHE=null;
function playlists(){if(PLCACHE)return PLCACHE;const m={};for(let j=0;j<240;j++){const p=getMyPost(j);(m[p.topic]=m[p.topic]||[]).push(p);}
  return PLCACHE=Object.entries(m).sort((a,b)=>b[1].length-a[1].length).slice(0,6).map(([t,ps])=>({name:ic((PLN[t]||["folder"])[0])+" "+(PLN[t]?PLN[t][1]:cap1(TOP[t].n)),ps}));}
function openProfile(uid){if(uid==="me"&&curPage==="me"&&!stack.length)return;const L=el(`<div class="layer"><div class="scroll"></div></div>`);pushLayer(L);renderProfile(L.querySelector(".scroll"),uid,L);}
function renderMe(){renderProfile($("#meScroll"),"me",null);}
function renderProfile(sc,uid,layer){
  const u=getUser(uid),me=uid==="me",st=hasStory(uid);
  const gain=Math.floor(((Date.now()-new Date().setHours(0,0,0,0))/1000)*ST.set.fps*1.4);
  sc.innerHTML=`<div class="prof"><div class="cover" style="background:linear-gradient(180deg,hsl(${u.avatar.hue},80%,60%),transparent)"></div>
   <div class="ptop">${layer?`<button class="back l">${ICON.back}</button>`:""}${esc(me?u.name:u.username)} ${verHTML(u)}
    <span class="r">${me?`<button data-a="an">${ICON.chart}</button><button data-a="set">${ICON.menu}</button>`:`<button data-a="more">${ICON.dots}</button>`}</span></div>
   <div class="pav" data-a="av">${st?`<span class="ring ${!me&&ST.seenStories[uid]?"seen":""}">${avHTML(u)}</span>`:avHTML(u)}${me&&!st?'<span class="addst">+</span>':""}</div>
   <div class="h">@${esc(u.username)} ${verHTML(u)}</div>${me?(ST.set.badge?'<div class="tbadge">'+ic("trophy")+' Top creator · Naymo</div>':""):`<div class="h2">${esc(u.name)}</div>`}${u.celeb?'<div class="tbadge">'+ic("star")+' Public figure</div>':""}
   <div class="stats"><div data-a="following"><b data-live="${me?"following":""}">${fmt(u.following)}</b><span>Following</span></div><div data-a="followers"><b data-live="${me?"mefol":""}">${fmt(u.followers)}</b><span>Followers</span></div><div><b data-live="${me?"melikes":""}">${fmt(u.likes)}</b><span>Likes</span></div></div>
   ${me?`<div class="fgain">${ic("trend")} <span data-live="fgain">${fmtX(gain)}</span> new followers today</div>`:""}
   <div class="pbtns">${me?`<button data-a="edit">Edit profile</button><button data-a="share">Share profile</button><button data-a="create">${ic("plus")}</button>`:u.brand?`<button class="red" data-a="msg">Message</button>`:`<button class="fbtn red ${isFollowing(uid)?"ing":""}" data-fb="${uid}">${isFollowing(uid)?"Following":"Follow"}</button><button data-a="msg">Message</button>`}</div>
   <div class="bio">${esc(u.bio||"No bio yet.")}</div>
   ${me?`<div class="links">${ST.profile.link?`<span>${ic("link")} ${esc(ST.profile.link)}</span>`:""}${ST.profile.ig?`<span>${ic("camera")} Instagram · ${esc(ST.profile.ig)}</span>`:""}${ST.profile.yt?`<span>${ic("playbox")} YouTube · ${esc(ST.profile.yt)}</span>`:""}</div>`:""}
   ${me?`<div class="plist"><button data-a="games" class="gchip">${ic("gamepad")} Polygon Dash<small>best ${Math.max(gameBest()[1],gameBest()[2])}%</small></button>${playlists().map((pl,i)=>`<button data-pl="${i}">${pl.name}<small>${pl.ps.length} videos</small></button>`).join("")}</div>`:""}</div>
   <div class="ptabs"><button class="on" data-tab="posts">${ICON.grid}</button><button data-tab="reposts">${ICON.repost}</button><button data-tab="liked">${ICON.heartO}</button>${me?`<button data-tab="saved">${ICON.bmO}</button>`:""}</div><div class="gwrap"></div>`;
  const bk=sc.querySelector(".back");if(bk)bk.onclick=()=>closeLayer(layer);
  sc.querySelectorAll("[data-a]").forEach(b=>b.onclick=()=>{const a=b.dataset.a;
    if(a==="edit")openEdit();else if(a==="share"){if(me)openShareCard();else{try{navigator.clipboard&&navigator.clipboard.writeText("https://naymo.app/@"+u.username);}catch(_){}toast("Profile link copied");}}
    else if(a==="create")openCreate();else if(a==="msg")openThread(uid);else if(a==="set")openSettings();else if(a==="an")openAnalytics();
    else if(a==="more")toast("Blocked users: none");else if(a==="games")openGames();
    else if(a==="av"){if(st)openStories([uid],0);else if(me)openCreate({story:true});}
    else if(a==="following"||a==="followers")openUserList(uid,a);});
  const fb=sc.querySelector("[data-fb]");if(fb)fb.onclick=()=>setFollow(uid,!isFollowing(uid));
  sc.querySelectorAll("[data-pl]").forEach(b=>b.onclick=()=>{const ps=playlists()[+b.dataset.pl].ps;openViewer(i=>ps[i]||null);});
  const gw=sc.querySelector(".gwrap"),tabs=sc.querySelectorAll(".ptabs button");
  tabs.forEach(t=>t.onclick=()=>{tabs.forEach(x=>x.classList.toggle("on",x===t));showTab(t.dataset.tab);});
  function showTab(tab){
    if(tab==="posts"){if(!userPostCount(uid)){gw.innerHTML=`<div class="empty">No videos yet</div>`;return;}buildGrid(gw,i=>i<userPostCount(uid)?userPostAt(uid,i):null,sc,{pinned:true});}
    else if(tab==="reposts"){let ps;if(me)ps=Object.keys(ST.reposts).reverse().map(getPost).filter(Boolean);else{const r=R("rp"+uid);ps=Array.from({length:r.int(3,9)},()=>{const o=r.int(0,59);return getUserPost(o,r.int(0,Math.max(0,getUser(o).postCount-1)));});}
      if(!ps.length){gw.innerHTML=`<div class="empty">${ic("repost",{size:40})}<br>Videos you repost will show up here.<br>Tap share, then Repost, on any video.</div>`;return;}buildGrid(gw,i=>ps[i]||null,sc,{});}
    else if(!me){gw.innerHTML=`<div class="empty">${ic("lock",{size:40})}<br>This user's liked videos are private</div>`;}
    else{const ids=Object.keys(tab==="liked"?ST.liked:ST.saved).reverse();if(!ids.length){gw.innerHTML=`<div class="empty">${tab==="liked"?"Videos you like will show up here":"Save videos to see them here"}</div>`;return;}
      const ps=ids.map(getPost).filter(Boolean);buildGrid(gw,i=>ps[i]||null,sc,{});}}
  showTab("posts");}
function buildGrid(wrap,gen,scrollEl,opts){
  wrap.innerHTML='<div class="grid"></div><div class="sent" style="height:40px"></div>';const g=wrap.firstChild,sent=wrap.lastChild;let n=0;
  const imgIO=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){const im=e.target;im.src=thumb(getPost(im.dataset.pid));imgIO.unobserve(im);}}),{root:scrollEl,rootMargin:"300px"});
  function more(){for(let k=0;k<18;k++){const p=gen(n);if(!p){io.disconnect();return;}const idx=n++;const d=document.createElement("div");d.className="gi";
    d.innerHTML=`<img data-pid="${p.id}" alt="">${opts.pinned&&p.uid==="me"&&(ST.pins||[]).includes(p.id)?'<span class="pnd">Pinned</span>':""}${p.priv?`<span class="nw" style="background:#111;color:#fff">${ic("lock")}</span>`:""}${p.isNew?'<span class="nw">NEW</span>':""}<span class="vc">${ICON.play}<span data-live="pv:${p.id}">${fmt(pViews(p))}</span></span>`;
    d.onclick=()=>openViewer(i=>gen(idx+i));g.appendChild(d);imgIO.observe(d.firstChild);}}
  const io=new IntersectionObserver(es=>{if(es[0].isIntersecting)more();},{root:scrollEl,rootMargin:"400px"});more();io.observe(sent);}
function openUserList(uid,kind){const u=getUser(uid);const{L,body}=mkLayer("@"+esc(u.username)+" · "+(kind==="following"?fmt(u.following)+" Following":fmt(u.followers)+" Followers"));
  body.innerHTML=`<div class="ul"></div><div class="sent" style="height:30px"></div>`;const ul=body.querySelector(".ul");let i=0,count=0;const max=kind==="following"?u.following:1e9,r=R("ul"+uid+kind);
  function next(){if(uid==="me"&&kind==="following"){while(i<NU){const id=i++;if(isFollowing(id))return id;}return null;}if(count>=max)return null;return r.int(0,NU-1);}
  function more(){for(let k=0;k<30;k++){const id=next();if(id==null)return;count++;ul.appendChild(urow(id));}}
  more();new IntersectionObserver(es=>{if(es[0].isIntersecting)more();},{root:body}).observe(body.querySelector(".sent"));}
function urow(id){const u=getUser(id),d=document.createElement("div");d.className="urow";
  d.innerHTML=`${avHTML(u)}<div class="i"><b>${esc(u.username)} ${verHTML(u)}</b><div>${esc(u.name)} · ${fmt(u.followers)} followers</div></div>${id==="me"?"":`<button class="fbtn ${isFollowing(id)?"ing":""}" data-fb="${id}">${isFollowing(id)?"Following":"Follow"}</button>`}`;
  d.onclick=e=>{if(e.target.closest("[data-fb]")){e.stopPropagation();setFollow(id,!isFollowing(id));return;}openProfile(id);};return d;}

/* ================= tag / sound pages ================= */
function findVideos(q){q=q.toLowerCase().replace(/^#/,"");const vids=[],match=p=>p.tags.some(t=>t.includes(q))||p.cap.toLowerCase().includes(q)||(p.ov||"").toLowerCase().includes(q)||TOP[p.topic].n.includes(q);
  ST.posts.forEach(np=>{const p=newPostObj(np);if(match(p))vids.push(p);});
  for(let j=0;j<160&&vids.length<36;j++){const p=getMyPost(j);if(match(p))vids.push(p);}
  for(let i=0;i<60&&vids.length<80;i++){const u=getUser(i);for(let j=0;j<Math.min(8,u.postCount);j++){const p=getUserPost(i,j);if(match(p))vids.push(p);}}
  return vids.sort((a,b)=>b.likes-a.likes);}
function openTag(tag){const{body}=mkLayer("#"+esc(tag));const r=R("tag"+tag);const fav=!!ST.favTags[tag];
  body.innerHTML=`<div class="hero"><div class="ic gtext" style="background:var(--chip);-webkit-text-fill-color:initial">#</div><div><h2>#${esc(tag)}</h2><p>${fmt(r.log(2e8,8e10))} views · ${fmt(r.log(1e5,4e7))} videos</p></div></div>
   <div class="hbtns"><button class="go2" data-a="fav">${fav?ic("star",{fill:true})+" In Favorites":ic("star")+" Add to Favorites"}</button><button class="go" data-a="use">Use hashtag</button></div><div class="gv"></div>`;
  body.querySelector('[data-a="fav"]').onclick=e=>{ST.favTags[tag]=!ST.favTags[tag];if(!ST.favTags[tag])delete ST.favTags[tag];save();e.currentTarget.innerHTML=ST.favTags[tag]?ic("star",{fill:true})+" In Favorites":ic("star")+" Add to Favorites";};
  body.querySelector('[data-a="use"]').onclick=()=>openCreate({tag});
  const v=findVideos(tag);buildGrid(body.querySelector(".gv"),i=>v[i]||null,body,{});}
function openSound(p){const u=getUser(p.uid);const{body}=mkLayer("Sound");const r=R("snd"+p.id);
  body.innerHTML=`<div class="hero"><div class="ic dsc">${avHTML(u)}</div><div><h2>original sound</h2><p>@${esc(u.username)}</p><p>${fmt(r.log(1e4,4e6))} videos</p></div></div>
   <div class="hbtns"><button class="go2" data-a="fav">${ic("star")} Add to Favorites</button><button class="go" data-a="use">${ic("music")} Use this sound</button></div><div class="gv"></div>`;
  body.querySelector('[data-a="fav"]').onclick=e=>{e.currentTarget.innerHTML=ic("star",{fill:true})+" In Favorites";toast("Sound saved");};
  body.querySelector('[data-a="use"]').onclick=()=>openCreate({topic:p.topic});
  const v=[p];for(let i=0;i<60&&v.length<30;i++){const uu=getUser(i);for(let j=0;j<Math.min(6,uu.postCount);j++){const q=getUserPost(i,j);if(q.topic===p.topic&&q.id!==p.id)v.push(q);}}
  buildGrid(body.querySelector(".gv"),i=>v[i]||null,body,{});}

/* ================= discover ================= */
function renderDisc(){if($("#q").value.trim())return doSearch($("#q").value);const d=$("#dres");d.innerHTML="";
  d.appendChild(storyBar());
  const gc=el(`<div class="gamebanner">${ic("gamepad",{size:30})}<div><b>Polygon Dash</b><small>Play the Naymo game · your best ${Math.max(gameBest()[1],gameBest()[2])}%</small></div>${ic("chevR")}</div>`);gc.onclick=openGames;d.appendChild(gc);
  const lv=liveUsers();d.appendChild(el(`<div class="sec"><span>${ic("live",{color:"#ff3b6b"})} LIVE now</span> <small>${lv.length} creators</small></div>`));
  const lc=el(`<div class="lcards"></div>`);lv.forEach(id=>{const u=getUser(id),p=getUserPost(id,0);const c=el(`<div class="lcard"><img src="${thumb(p)}"><span class="lt">LIVE</span><div class="lb">${esc(u.username)}<small>${ic("eye")} ${fmt(u.followers*.004+R("lvv"+id).int(500,9000))}</small></div></div>`);c.onclick=()=>openLive(id,false);lc.appendChild(c);});d.appendChild(lc);
  const tags=[];TK.forEach(k=>TOP[k].tg.forEach(t=>tags.push(t)));const r=R("trend");
  d.appendChild(el(`<div><div class="chips">${["fyp","sunset","ramen","dance","grwm","cat","gym","storytime","latteart"].map(t=>`<button data-q="${t}">#${t}</button>`).join("")}</div>
   <div class="sec">Trending hashtags</div>${tags.slice(0,12).map(t=>`<div class="tagrow" data-q="${t}"><div class="hs">#</div><div class="i"><b>${t}</b><span>${fmt(r.log(2e8,6e10))} views</span></div><span style="color:var(--mut)">›</span></div>`).join("")}
   <div class="sec">Suggested accounts</div><div class="sug"></div></div>`));
  const sug=d.querySelector(".sug");for(let i=0;i<20;i++)sug.appendChild(urow(i*3%60));
  d.querySelectorAll("[data-q]").forEach(b=>b.onclick=()=>openTag(b.dataset.q));}
let sT;$("#q").addEventListener("input",e=>{clearTimeout(sT);sT=setTimeout(()=>{e.target.value.trim()?doSearch(e.target.value):renderDisc();},200);});
function doSearch(raw){const q=raw.trim().toLowerCase().replace(/^@/,""),tq=q.replace(/^#/,""),d=$("#dres");
  const users=[];const me=meUser();if((me.username+" "+me.name).toLowerCase().includes(tq))users.push("me");
  if(!q.startsWith("#"))for(let i=0;i<NU&&users.length<60;i++){const u=getUser(i);if(u.username.toLowerCase().includes(tq)||u.name.toLowerCase().includes(tq))users.push(i);}
  Object.keys(BRANDS).forEach(b=>{const u=getUser(b);if((u.username+u.name).toLowerCase().includes(tq))users.push(b);});
  users.sort((a,b)=>getUser(b).followers-getUser(a).followers);const vids=findVideos(tq);
  d.innerHTML=`${q.startsWith("#")?`<div class="tagrow" data-t="1"><div class="hs">#</div><div class="i"><b>#${esc(tq)}</b><span>Open hashtag page</span></div></div>`:""}${users.length?`<div class="sec">Users</div><div class="us"></div>`:""}${vids.length?`<div class="sec">Videos <small>${vids.length}</small></div><div class="gv"></div>`:""}${!users.length&&!vids.length?`<div class="empty">No results for "${esc(raw)}"</div>`:""}`;
  const tg=d.querySelector("[data-t]");if(tg)tg.onclick=()=>openTag(tq);
  const us=d.querySelector(".us");if(us)users.slice(0,12).forEach(id=>us.appendChild(urow(id)));
  const gv=d.querySelector(".gv");if(gv)buildGrid(gv,i=>vids[i]||null,$("#discScroll"),{});}

/* ================= inbox ================= */
let inboxTab="act";
function genNotifs(){const r=R("notif");const out=[],kinds=["like","follow","comment","like","clike","mention","follow","like"];
  for(let i=0;i<45;i++){const k=kinds[i%kinds.length],uid=r.int(60,NU-1),p=getMyPost(r.int(0,40)),ago=Math.floor(r.f()*3+i*2.5);
    const o={type:k,uid,pid:p.id,t:ago<60?ago+"m":Math.floor(ago/60)+"h"};
    if(k==="like")o.n=r.log(1e3,9e5);if(k==="clike")o.n=r.log(100,8e4);
    if(k==="comment"){const c=commentPage(p,0)[r.int(2,9)];o.text=c?c.text:"love this";}
    if(k==="mention")o.text="@"+ST.profile.username+" "+r.pick(["you need to see this 😭","collab when??","this reminded me of you","this is your vibe fr"]);
    if(k==="clike")o.text=r.pick(["thank you 🫶","part 2 tomorrow 👀","love you guys"]);out.push(o);}return out;}
const unreadDMs=()=>Object.values(ST.dms||{}).filter(t=>t.unread&&t.msgs.some(m=>m.at<=Date.now())).length;
function renderInbox(){const sc=$("#inboxScroll"),now=Date.now();const nd=unreadDMs();
  sc.innerHTML=`<div class="ihead"><div class="seg"><button data-t="act" class="${inboxTab==="act"?"on":""}">Activity</button><button data-t="msg" class="${inboxTab==="msg"?"on":""}">Messages${nd?`<span class="badge">${nd}</span>`:""}</button></div></div><div class="ib"></div>`;
  sc.querySelectorAll(".seg button").forEach(b=>b.onclick=()=>{inboxTab=b.dataset.t;renderInbox();});
  const ib=sc.querySelector(".ib");
  if(inboxTab==="msg"){ib.appendChild(storyBar());renderThreads(ib);return;}
  const live=ST.notifs.filter(n=>n.at<=now).slice().reverse();ST.seen=ST.notifs.filter(n=>n.at<=now).length;save();updBadge();
  const row=(n,fresh)=>{const u=getUser(n.uid),p=getPost(n.pid),d=document.createElement("div");d.className="nrow"+(fresh?" fresh":"");const U=`<b>${esc(u.username)}</b>`,Q=`<span class="q">${esc(n.text)}</span>`;
    const txt={like:`${U} and ${fmt(n.n||0)} others liked your video.`,follow:`${U} started following you.`,comment:`${U} commented: ${Q}`,mention:`${U} mentioned you: ${Q}`,
      clike:`${U}${n.n?` and ${fmt(n.n)} others`:""} liked your comment: ${Q}`,reply:`${U} replied to your comment: ${Q}`,thread:`${U} replied in your thread: ${Q}`,
      gift:`${U} ${esc(n.text)}`,deal:`${ic("brief")} ${esc(n.text)}`,live:`${ic("live",{color:"#ff3b6b"})} ${esc(n.text)}`,milestone:`${ic("sparkle")} ${esc(n.text)}`}[n.type]||esc(n.text);
    d.innerHTML=`${avHTML(u)}<div class="i">${txt} <span class="t">${n.at?relT(n.at):n.t}</span></div>${n.type==="follow"?`<button class="fbtn ${isFollowing(n.uid)?"ing":""}" data-fb="${n.uid}">${isFollowing(n.uid)?"Friends":"Follow back"}</button>`:p?`<img src="${thumb(p)}">`:""}`;
    d.querySelector(".av").onclick=()=>openProfile(n.uid);const im=d.querySelector("img");if(im)im.onclick=()=>{openViewer(i=>i?null:p);if(["reply","thread","clike","comment","mention"].includes(n.type))setTimeout(()=>openComments(p),250);};
    const fb=d.querySelector("[data-fb]");if(fb)fb.onclick=()=>{setFollow(n.uid,!isFollowing(n.uid));fb.textContent=isFollowing(n.uid)?"Friends":"Follow back";};return d;};
  ib.appendChild(el(`<div class="sec">New</div>`));live.forEach(n=>ib.appendChild(row(n,true)));
  ib.appendChild(el(`<div class="sec">Earlier</div>`));genNotifs().forEach(n=>ib.appendChild(row(n,false)));}
function updBadge(){const n=Math.max(0,ST.notifs.filter(x=>x.at<=Date.now()).length-ST.seen)+unreadDMs(),b=$("#ibadge");b.textContent=n>99?"99+":n;b.classList.toggle("hide",n<=0||curPage==="inbox");}

/* ================= DMs ================= */
const id2=k=>/^\d+$/.test(k)?+k:k;
function initDMs(){if(ST.dms)return;const now=Date.now(),H=36e5;ST.dms={};
  const add=(uid,kind,msgs)=>{ST.dms[uid]={uid,kind,msgs:msgs.map((m,i)=>Object.assign({f:"t",at:now-m.ago*H+i*1000},m)),unread:true};};
  add("b1","brand",[{ago:2,x:"Hi! We're the partnerships team at Voltfizz Energy ⚡ We love your content and would like to offer you a paid campaign."},{ago:2,type:"offer",amt:240000,del:"3 videos + 1 story",st:"p"}]);
  add(0,"celeb",[{ago:3,x:"ok your last video was insane 😭 collab soon?? 👀"}]);
  add("b0","brand",[{ago:5,x:"Hey! Glowberry Skincare here 🍓 Would you be open to a sponsored GRWM video?"},{ago:5,type:"offer",amt:85000,del:"1 video",st:"p"}]);
  add(214,"fan",[{ago:6,x:"i know you probably won't see this but your videos got me through a really hard year 🥹 thank you"}]);
  add(101,"friend",[{ago:7,x:"bro you're literally on every single fyp 😭"}]);
  add(377,"fan",[{ago:9,x:"can you say happy birthday to my sister?? she's your biggest fan 🎂"}]);
  add("b2","brand",[{ago:20,x:"Nimbus Audio 🎧 — we'd love to send you our new headphones + a paid feature."},{ago:20,type:"offer",amt:150000,del:"1 dedicated video",st:"p"}]);
  add(140,"friend",[{ago:26,x:"dinner tonight still on?"}]);
  add(598,"fan",[{ago:30,x:"HOW DO YOU EDIT YOUR VIDEOS 😭 tutorial pls"}]);
  save();}
function lastMsg(t){const vis=t.msgs.filter(m=>m.at<=Date.now());return vis[vis.length-1]||t.msgs[0];}
function renderThreads(ib){const ts=Object.values(ST.dms).sort((a,b)=>lastMsg(b).at-lastMsg(a).at);
  ib.appendChild(el(`<div class="sec">Messages</div>`));
  ts.forEach(t=>{const u=getUser(t.uid),m=lastMsg(t),un=t.unread&&m.at<=Date.now();
    const pv=m.type==="offer"?`${ic("brief")} Offer: $${fmtX(m.amt)}`:m.type==="video"?ic("video")+" Shared a video":esc((m.f==="m"?"You: ":"")+m.x);
    const d=el(`<div class="trow ${un?"un":""}">${avHTML(u)}<div class="i"><b>${esc(u.name)} ${verHTML(u)} ${t.kind==="brand"?'<span class="kindtag">Brand deal</span>':""}</b><div>${pv}</div></div><div style="display:flex;flex-direction:column;align-items:flex-end;gap:6px"><span class="tm">${relT(m.at)}</span>${un?'<span class="dot"></span>':""}</div></div>`);
    const moved=swipeable(d,{dir:"left",th:90,onDone:()=>{delete ST.dms[t.uid];save();d.remove();updBadge();toast("Conversation deleted");}});
    d.onclick=()=>{if(!moved())openThread(t.uid);};ib.appendChild(d);});
  if(ts.length)ib.appendChild(el(`<div class="empty" style="padding:14px">Swipe a chat left to delete it</div>`));}
function sendDM(uid,msg){initDMs();const t=ST.dms[uid]||(ST.dms[uid]={uid,kind:typeof uid==="string"&&BRANDS[uid]?"brand":uid<5?"celeb":uid<300?"friend":"fan",msgs:[],unread:false});
  t.msgs.push(Object.assign({f:"m",at:Date.now()},msg));scheduleReply(t,msg);save();}
const RP={fan1:["OMG YOU REPLIED 😭😭😭","i'm literally shaking","no way. NO WAY.","screenshotting this forever","thank you so much 🥹🫶"],fan2:["you're the best fr","ok i'll stop fangirling now lol","have the best day!!","my friends won't believe this 😭"],
  friend:["lmaooo","fr","bet","say less","😂😂","ok mr famous 🙄","omw","yeah for sure"],celeb:["haha yes!! let's plan it 🎬","you're so talented fr","i'll have my team reach out 👀","can't wait 🫶"],
  brand:["Thanks for getting back to us! Feel free to review the offer above 🙌","Our team is super excited to work with you!","Let us know if you have any questions about the brief."],
  video:["LMAO","omg i love this","why is this so accurate 😭","sending this to everyone","ok this is so good"]};
function scheduleReply(t,msg){const r=R("rp"+Date.now()),now=Date.now(),txt=(msg.x||"").toLowerCase();let d=r.int(1500,3500);const push=(m)=>{t.msgs.push(Object.assign({f:"t",at:now+d},m));t.unread=true;d+=r.int(1200,2500);};
  if(msg.type==="video"){push({x:r.pick(RP.video)});return;}
  if(t.kind==="brand"){const off=[...t.msgs].reverse().find(m=>m.type==="offer"&&m.st==="p");
    if(off&&/\b(yes|deal|accept|sure|ok|okay|let'?s do it|sounds good)\b/.test(txt)){acceptOffer(t,off,true);return;}
    if(off&&/(more|higher|\$|rate|budget|increase)/.test(txt)){push({x:"We hear you! We can stretch the budget a bit 👀"});push({type:"offer",amt:Math.round(off.amt*1.25/1000)*1000,del:off.del,st:"p"});off.st="x";return;}
    if(/\b(no|pass|decline)\b/.test(txt)){push({x:"No worries at all! Let us know if you change your mind 🙏"});if(off)off.st="d";return;}
    push({x:r.pick(RP.brand)});return;}
  if(t.kind==="fan"){const mine=t.msgs.filter(m=>m.f==="m").length;push({x:gen(mine<=1?"tgt":"fan",null)});if(mine<=1&&r.ch(.6))push({x:gen("tgt",null)});return;}
  if(t.kind==="celeb"){push({x:r.pick(RP.celeb)});return;}
  push({x:txt.includes("?")?r.pick(["yeah for sure","idk lol you tell me","100%"]):r.pick(RP.friend)});}
function acceptOffer(t,off,viaText){off.st="a";ST.earnings+=off.amt;const now=Date.now();
  t.msgs.push({f:"t",at:now+(viaText?2000:1500),x:"Amazing!! 🎉 Contract + payment details are on the way 📄 $"+fmtX(off.amt)+" will be paid out after posting."});
  addNotif({at:now+2500,type:"deal",uid:t.uid,text:getUser(t.uid).name+" deal accepted · +$"+fmtX(off.amt)});save();}
let threadCtx=null;
function openThread(uid){initDMs();const t=ST.dms[uid]||(ST.dms[uid]={uid,kind:typeof uid==="string"&&BRANDS[uid]?"brand":uid<5?"celeb":uid<300?"friend":"fan",msgs:[],unread:false});
  const u=getUser(uid);const{L,body,head}=mkLayer(`${avHTML(u)}<span>${esc(u.name)}</span>${verHTML(u)}`);head.querySelector(".av").style.cssText="width:30px;height:30px;font-size:12px";
  head.style.cursor="pointer";head.onclick=()=>{if(!u.brand)openProfile(uid);};
  body.classList.remove("scroll");body.style.cssText="display:flex;flex-direction:column;overflow:hidden";
  body.innerHTML=`<div class="dmlist"></div><div class="cbar"><div class="cin"><div class="box"><input placeholder="Message..." enterkeyhint="send"><button class="send">${ICON.send}</button></div></div></div>`;
  const list=body.querySelector(".dmlist"),inp=body.querySelector("input");
  const ctx={t,list,count:-1};threadCtx=ctx;L._onClose=()=>{threadCtx=null;};
  const send=()=>{const v=inp.value.trim();if(!v)return;inp.value="";sendDM(uid,{x:v});renderThread(ctx,true);};
  body.querySelector(".send").onclick=send;inp.onkeydown=e=>{if(e.key==="Enter")send();};
  renderThread(ctx,true);}
function renderThread(ctx,force){const{t,list}=ctx,now=Date.now();const vis=t.msgs.filter(m=>m.at<=now),pending=t.msgs.some(m=>m.at>now);
  const sig=vis.length+":"+pending+":"+vis.map(m=>m.st||"").join("");if(!force&&sig===ctx.sig)return;
  if(ctx.sig&&vis.length>ctx.n&&vis[vis.length-1].f==="t")sfx("msg");ctx.sig=sig;ctx.n=vis.length;
  t.unread=false;save();updBadge();list.innerHTML="";let lastT=0;
  vis.forEach(m=>{if(m.at-lastT>36e5)list.appendChild(el(`<div class="dmt">${new Date(m.at).toLocaleString([], {weekday:"short",hour:"numeric",minute:"2-digit"})}</div>`));lastT=m.at;
    if(m.type==="offer"){const o=el(`<div class="offer"><div class="oh"><small>PAID PARTNERSHIP OFFER</small><b>$${fmtX(m.amt)}</b></div><div class="ob">Deliverables: ${esc(m.del)}<br>Usage: 30 days · Payment: within 14 days</div>
      ${m.st==="p"?`<div class="oa"><button data-d="1">Decline</button><button class="ac" data-a="1">Accept</button></div>`:`<div class="st">${m.st==="a"?ic("check",{color:"#16a34a"})+" Accepted":m.st==="d"?ic("x",{color:"#ef4444"})+" Declined":ic("refresh")+" Replaced by a new offer"}</div>`}</div>`);
      const ab=o.querySelector("[data-a]");if(ab){ab.onclick=()=>{acceptOffer(t,m,false);renderThread(ctx,true);toast("Deal accepted +$"+fmtX(m.amt));};o.querySelector("[data-d]").onclick=()=>{m.st="d";t.msgs.push({f:"t",at:Date.now()+1500,x:"No worries at all! Let us know if you change your mind 🙏"});save();renderThread(ctx,true);};}
      list.appendChild(o);}
    else if(m.type==="video"){const p=getPost(m.pid);if(!p)return;const v=el(`<div class="vcard ${m.f}"><img src="${thumb(p)}"><span>${ic("play",{fill:true})} ${fmt(pViews(p))}</span></div>`);v.onclick=()=>openViewer(i=>i?null:p);list.appendChild(v);}
    else list.appendChild(el(`<div class="msg ${m.f}">${esc(m.x)}</div>`));});
  if(pending)list.appendChild(el(`<div class="typing"><i></i><i></i><i></i></div>`));
  list.scrollTop=list.scrollHeight;}

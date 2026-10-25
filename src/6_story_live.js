
/* ================= anim registry ================= */
const ANIMS=new Set();
function addAnim(elm,draw){const a={el:elm,draw};ANIMS.add(a);return a;}

/* ================= story viewer ================= */
function openStories(uids,idx){
  const L=el(`<div class="layer dark story"><canvas></canvas><img class="pm hide"><video class="pm hide" playsinline loop></video><div class="stxt"></div><div class="sbars"></div>
   <div class="shead"></div><div class="stap" style="left:0;width:33%"></div><div class="stap" style="right:0;width:67%"></div><div class="sfoot"></div></div>`);
  pushLayer(L);const cv=L.querySelector("canvas"),c=cv.getContext("2d"),img=L.querySelector("img"),vid=L.querySelector("video");
  let ui=idx,fi=0,frames=[],el2=0,paused=false;const DUR=5;
  cv.width=Math.round(L.clientWidth*1.2)||400;cv.height=Math.round(L.clientHeight*1.2)||700;
  function load(last){const uid=uids[ui];frames=uid==="me"?myStories():genStory(uid);if(!frames.length){closeLayer(L);return;}fi=last?frames.length-1:0;
    if(uid!=="me"){ST.seenStories[uid]=1;save();}const u=getUser(uid);
    L.querySelector(".shead").innerHTML=`${avHTML(u)}<div>${esc(u.username)} ${verHTML(u)}<br><small class="stt"></small></div><button class="x">${ic("x")}</button>`;
    L.querySelector(".shead .x").onclick=()=>closeLayer(L);L.querySelector(".shead .av").onclick=()=>{closeLayer(L);openProfile(uid);};
    const ft=L.querySelector(".sfoot");
    if(uid==="me"){ft.innerHTML=`<span class="vw">${ic("eye")} <span class="svw"></span> viewers</span><button class="go2" style="width:auto;padding:8px 14px" data-a="add">${ic("plus")} Add</button><button class="go2" style="width:auto;padding:8px 14px" data-a="del">${ic("trash")}</button>`;
      ft.querySelector('[data-a="add"]').onclick=()=>{closeLayer(L);openCreate({story:true});};
      ft.querySelector('[data-a="del"]').onclick=()=>{const f=frames[fi];ST.stories=ST.stories.filter(s=>s.id!==f.id);IDB.del(f.id);save();toast("Story deleted");frames=myStories();if(!frames.length)closeLayer(L);else{fi=Math.min(fi,frames.length-1);show();}};}
    else{ft.innerHTML=`<div class="box"><input placeholder="Reply to ${esc(u.username)}..."><button class="send">${ICON.send}</button></div>${[["heart","😍","#ff3b6b"],["laugh","😂","#ffd23c"],["flame","🔥","#ff7a1a"]].map(([n,v,c])=>`<button class="rx" data-v="${v}">${ic(n,{color:c})}</button>`).join("")}`;
      const inp=ft.querySelector("input");inp.onfocus=()=>paused=true;inp.onblur=()=>paused=false;
      const sendR=v=>{if(!v)return;sendDM(uid,{x:"replied to your story: "+v});inp.value="";toast("Reply sent to "+u.name);};
      ft.querySelector(".send").onclick=()=>sendR(inp.value.trim());inp.onkeydown=e=>{if(e.key==="Enter")sendR(inp.value.trim());};
      ft.querySelectorAll(".rx").forEach(b=>b.onclick=()=>sendR(b.dataset.v));}
    show();}
  function show(){const f=frames[fi];el2=0;
    L.querySelector(".sbars").innerHTML=frames.map((_,i)=>`<i><b style="width:${i<fi?100:0}%"></b></i>`).join("");
    L.querySelector(".stxt").textContent=f.text||"";const tt=L.querySelector(".stt");if(tt)tt.textContent=f.created?relT(f.created):f.t;
    const sv=L.querySelector(".svw");if(sv)sv.textContent=fmt(R("sv"+f.id).log(8e5,6e6)*Math.min(1,(Date.now()-f.created)/36e5+.2));
    const url=f.media&&MEDIA[f.id];img.classList.add("hide");vid.classList.add("hide");vid.pause();
    if(url&&f.media==="image"){img.src=url;img.classList.remove("hide");}else if(url&&f.media==="video"){vid.src=url;vid.muted=!ST.set.sound;vid.classList.remove("hide");vid.play().catch(()=>{});}}
  function next(){if(fi<frames.length-1){fi++;show();}else if(ui<uids.length-1){ui++;load();}else closeLayer(L);}
  function prev(){if(fi>0){fi--;show();}else if(ui>0){ui--;load(true);}else show();}
  const taps=L.querySelectorAll(".stap");let downAt=0;
  taps.forEach((tp,i)=>{tp.onpointerdown=()=>{downAt=Date.now();paused=true;};tp.onpointerup=()=>{paused=false;if(Date.now()-downAt<250)(i?next:prev)();};});
  L._audio=()=>frames[fi]&&!(frames[fi].media)?{key:frames[fi].scene,seed:frames[fi].seed}:null;
  L._onClose=()=>{vid.pause();};
  addAnim(L,dt=>{if(!frames.length)return;if(!paused)el2+=dt;const f=frames[fi];if(!f.media)drawPost(f,c,cv.width,cv.height,el2+1);
    const b=L.querySelectorAll(".sbars b")[fi];if(b)b.style.width=Math.min(100,el2/DUR*100)+"%";if(el2>DUR)next();});
  load();}


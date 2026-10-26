/* ================= LIVE ================= */
const GIFTS=[{n:"Rose",i:"rose",k:"#ff3b6b",c:1},{n:"Heart",i:"heart",k:"#ff5c8a",c:5},{n:"Star",i:"star",k:"#ffc531",c:99},{n:"Crown",i:"crown",k:"#ffb020",c:299},{n:"Rocket",i:"rocket",k:"#7b5cff",c:1999},{n:"Galaxy",i:"planet",k:"#20d5ec",c:9999}];
const gIc=(g,s)=>ic(g.i,{fill:g.k,color:g.k,sw:1.4,size:s});
const LT={
 qa:{name:"Q&A",scene:"lava",title:["ask me anything","Q&A + chill","answering your questions","late night Q&A"],
  chat:["what's your favorite food?","how did you get started?","best advice for new creators?","what's your morning routine?","coffee or tea?","what's next for you?","favorite city you've visited?","do you read the comments?","what app do you edit with?","how many hours do you sleep lol","fav movie?","cats or dogs?","what's your zodiac sign","would you ever do a meet and greet?","what was your first viral video?","biggest fear?","dream collab?","how do you deal with hate comments?"],
  host:["ok next question!","ooh good one","honestly? no idea lol","keep them coming","love that question","ok that one's personal 😂","i'll answer that in a video soon"]},
 gaming:{name:"Gaming",scene:"gaming",title:["ranked grind","road to top 100","chill games w/ chat","new game first look"],
  chat:["gg","no way that clutch","that was insane","which game is this?","run it back","bro is cracked","lag?","play ranked next","what's your sens?","clip that!!","W","1v3 incoming","the aim today 🔥","how is this real","play with viewers pls","that jump though","nooo so close","speedrun when"],
  host:["chat did you see that??","ok ok i'm locked in","one more round","that was so lucky lol","who wants to play next?","we're climbing today"]},
 cook:{name:"Cooking",scene:"cook",title:["cooking dinner live","15 min recipe live","cook with me"],
  chat:["what are you making?","smells good through the screen lol","add more garlic","is that butter??","recipe pls","the sizzle tho","how long does it cook","i'm making this tonight","chef mode activated","salt!!","can i use chicken instead","that knife work","save me a plate","what oil is that"],
  host:["ok garlic goes in now","don't tell anyone how much butter that was","taste test time","recipe is going on my page later","this is my comfort meal"]},
 dj:{name:"DJ set",scene:"music",title:["friday night DJ set","house music live","taking song requests"],
  chat:["this beat goes crazy","drop it!!","song id?","turn it up","that transition was clean","we're dancing over here","play the remix","bass going crazy","this is a vibe","encore","play something old school","my neighbors hate me now lol","party in chat","request: something chill"],
  host:["this next one is a banger","hands up chat!","requests open in chat","ok slowing it down a bit","volume up for this one"]},
 study:{name:"Study with me",scene:"rain",title:["study with me · pomodoro","finals week study live","quiet study session"],
  chat:["studying for finals rn","pomodoro gang","what are you studying?","break time?","focus mode on","4 more pages to go","this keeps me productive","lofi + rain = perfect","quiet chat pls lol","we got this","drink water everyone","chem is killing me","day 3 of studying here","just finished my essay!!"],
  host:["25 minutes, phones down","break in 5!","you're all doing amazing","what's everyone working on?","ok back to focus"]},
 workout:{name:"Workout",scene:"gym",title:["leg day live","workout with me","morning gym session"],
  chat:["how many sets left","form looks clean","i'm doing it with you rn","legs are shaking","10 more!!","what's the program","no excuses today","sweating just watching","PR incoming","that's heavy","rest day? never","motivation 100","what pre workout","teach me deadlifts"],
  host:["last set, let's go","chat count my reps","water break","we don't skip leg day","who's working out with me?"]},
 grwm:{name:"GRWM",scene:"grwm",title:["get ready with me","GRWM for tonight","makeup + chit chat"],
  chat:["what foundation is that","the glow!!","where are you going tonight","outfit check!!","what lip shade?","skin is glowing","blend blend blend","link the brush pls","this is so relaxing to watch","going out tonight too","blush tutorial pls","the lighting is perfect","what skincare do you use"],
  host:["ok highlighter time","should i do a bold lip?","products are linked on my page","outfit reveal soon","rate the look 1-10"]},
 pet:{name:"Pet cam",scene:"pet",title:["pet cam · say hi to mochi","sleepy cat live","mochi live"],
  chat:["CUTE","what's their name?","awww","the tail!!","give them a treat from me","can we see the paws","how old?","sleepy baby","so fluffy","pet tax paid","the yawn omg","she's judging us lol","protect at all costs"],
  host:["say hi everyone","she's about to fall asleep","treat time!","she loves the chat","ok she's ignoring us now lol"]},
 story:{name:"Storytime",scene:"city",title:["storytime live","spilling the tea","you won't believe this"],
  chat:["no way that happened","then what??","LMAO","i'm crying","plot twist","wait go back","better than netflix","say that again","tell the other one","the drama","nooo","i would've left","part 2 tonight??","the way i gasped"],
  host:["ok so then...","wait it gets worse","i swear this is real","you're not ready for this part","chat be honest, would you have left?"]},
 travel:{name:"IRL",scene:"sunset",title:["exploring the city","sunset walk live","IRL stream"],
  chat:["where are you rn?","the view!!","is it cold there?","show us around","what's the food like","take me with you","what time is it there","that sunset tho","street food check","so jealous","try the local snacks","is it safe there?","the sky is unreal"],
  host:["look at this view chat","ok where should we go next?","trying the street food now","the weather is perfect","i love this city"]},
 dance:{name:"Dance",scene:"dance",title:["dance requests live","learning trends live","dance party"],
  chat:["do the new trend!!","that footwork","teach us","the energy","again again","request: the old one","you ate that","i'm trying it at home","my legs could never","the lights are cool"],
  host:["ok request accepted","this one's hard lol","teach you after this one","chat pick the next song"]}
};
const LTK=Object.keys(LT);
const TOPIC2LT={sunset:"travel",city:"travel",ocean:"travel",space:"qa",neon:"dj",aurora:"travel",fireworks:"dj",lava:"qa",snow:"study",ramen:"cook",gaming:"gaming",music:"dj",rain:"study",coffee:"qa",dance:"dance",cook:"cook",grwm:"grwm",pet:"pet",gym:"workout",story:"story"};
const GREET=["hi","hey","yo","hiii","hello from {place}","good morning from {place}","good night from {place}","first time here","been here since the start","just got here","back again","hi chat","late but here","hello everyone","greetings from {place}"];
const REACT=["love this","so fun","this is the best live","yesss","omg","LOL","haha","W","❤️❤️","🔥🔥","so chill","vibes","this is cozy","i'm staying all night","lets gooo"];
const ME_LIVE=["{me} you're so real","hi {me} from {place}","{me} notice me pls","been here since 10k {me}","{me} say my name!!","{me} wave at the camera","{me} what's your fav {thing}?","{me} you look happy today","{me} read my comment pls","{me} is the best live on this app","{me} hi from my lunch break","{me} remember me from the last live?"];
const JOIN_ME=["wait {me} is in here??","{me} JOINED","{me} in the chat 😭","no way {me} is watching","the {me} effect","{host} look who joined!!","{me} hiiii","we're in the same live as {me}","{me} pls say hi","everyone act normal, {me} is here"];
const PK_CHAT=["tap tap tap we need points","we're winning!!","send roses team","don't let them win","comeback incoming","last 30 seconds!!","defend defend","GG","we got this","team {host} 🔥","who's sending the galaxy lol","they're catching up!!"];
function liveTypeOf(host){if(host==="me")return"qa";const u=getUser(host),r=R("lt"+host+dayKey);return TOPIC2LT[r.pick(u.topics)]||r.pick(LTK);}
const isPK=host=>host!=="me"&&R("pk"+host+dayKey).ch(.3);
function openLiveHub(){const{bg,body}=mkSheet("LIVE","auto lhub");
  body.innerHTML=`<button class="gol">${ic("live")} Go LIVE</button><div class="sec" style="padding-left:0">Live now</div><div class="ll"></div>`;
  body.querySelector(".gol").onclick=()=>{closeLayer(bg);openGoLive();};
  liveUsers().forEach(id=>{const u=getUser(id);const d=urow(id);d.querySelector(".i div").innerHTML=ic("live",{color:"#ff3b6b"})+` ${isPK(id)?"PK battle":LT[liveTypeOf(id)].name} · `+ic("eye")+" "+fmt(Math.max(800,u.followers*.004)+R("lvv"+id).int(500,9000))+" watching";const fb=d.querySelector(".fbtn");if(fb)fb.remove();d.onclick=()=>{closeLayer(bg);openLive(id,false);};body.querySelector(".ll").appendChild(d);});}
$("#liveBtn").onclick=openLiveHub;
function openGoLive(){const{L,body}=mkLayer("Go LIVE");let type="qa",sel=LT.qa.scene,cam=false,pk=false;
  body.innerHTML=`<div class="form"><div class="prev"><canvas width="240" height="427"></canvas></div>
   <div class="fl">LIVE type<div class="stks ltypes">${LTK.map(k=>`<button data-t="${k}" class="${k===type?"on":""}" style="width:auto;padding:0 12px;font-size:13px;font-weight:700">${LT[k].name}</button>`).join("")}</div></div>
   <label>LIVE title<input id="lt" maxlength="40" value="${LT.qa.title[0]}"></label>
   <div class="srow" style="border:1px solid var(--line);border-radius:10px"><span>${ic("users")} Start with a PK battle</span><button class="sw" id="lpk"></button></div>
   <div class="srow" style="border:1px solid var(--line);border-radius:10px"><span>${ic("camera")} Use camera</span><button class="sw" id="lcam"></button></div>
   <button class="go gr">${ic("live")} Go LIVE</button></div>`;
  const pc=body.querySelector("canvas").getContext("2d");addAnim(L,()=>drawPost({scene:sel,seed:7,hue:300},pc,240,427,performance.now()/1000));
  body.querySelectorAll(".ltypes button").forEach(b=>b.onclick=()=>{type=b.dataset.t;sel=LT[type].scene;body.querySelector("#lt").value=LT[type].title[0];body.querySelectorAll(".ltypes button").forEach(x=>x.classList.toggle("on",x===b));});
  body.querySelector("#lcam").onclick=e=>{cam=!cam;e.currentTarget.classList.toggle("on",cam);};
  body.querySelector("#lpk").onclick=e=>{pk=!pk;e.currentTarget.classList.toggle("on",pk);};
  body.querySelector(".go").onclick=()=>{const title=body.querySelector("#lt").value.trim();closeLayer(L);openLive("me",true,{title,type,cam,pk});};}

function openLive(host,isMe,opt={}){
  const u=getUser(host),r=R("live"+host+Date.now()),me=meUser(),type=opt.type||liveTypeOf(host),T=LT[type],scene=T.scene;
  const title=opt.title||(!isMe?r.pick(T.title):"");
  const L=el(`<div class="layer dark live"><canvas></canvas><video class="lbgv hide" playsinline muted autoplay loop></video><video class="lbgv2 hide" playsinline muted autoplay loop></video><video class="lcam hide" playsinline muted autoplay></video><div class="ldim"></div>
   <div class="ltop"><div class="lhost">${avHTML(u)}<div><b>${esc(u.username)}${host==="me"?ADMIN:""}</b><span>${ic("heart",{fill:true})} <span class="llk">0</span></span></div>${!isMe&&!isFollowing(host)?'<button class="lf">Follow</button>':""}</div>
    <div class="lg3"></div><div class="lview">${ic("eye")} <span class="lv">0</span></div><button class="lx">${ic("x")}</button></div>
   <div class="lsub"><span class="lp">LIVE</span><span class="lt2">${T.name}</span><button class="lrank">${ic("trophy")} <span class="lrk">Weekly #—</span></button><span class="ldi">${ic("gem")} 0</span></div>
   ${title?`<div class="ltitle">${esc(title)}</div>`:""}<div class="pk hide"><div class="pkbar"><i class="pl"></i><i class="pr"></i></div><div class="pkn"><b class="pkl">0</b><span class="pkt">1:30</span><b class="pkr">0</b></div><div class="pkres hide"></div></div>
   <div class="lgifts"></div><div class="lchat"></div><div class="lhearts"></div><div class="lbig"></div>
   <div class="lbar"><div class="box"><input placeholder="Say something..." maxlength="80"><button class="send">${ICON.send}</button></div>${isMe?`<button class="lb lpkb">${ic("users")}</button>`:'<button class="lb lg">'+ic("gift")+'</button>'}<button class="lb lboard">${ic("trophy")}</button><button class="lb lht">${ic("heart",{fill:"#ff3b6b",color:"#ff3b6b"})}</button></div></div>`);
  pushLayer(L);const cv=L.querySelector("canvas"),c=cv.getContext("2d");cv.width=Math.round(L.clientWidth)||400;cv.height=Math.round(L.clientHeight)||700;
  const S={start:Date.now(),viewers:0,peak:0,target:isMe?r.log(1.5e5,9e5):Math.max(800,u.followers*.004)*(u.celeb?3:1),likes:0,dia:0,newF:0,gifts:{},t:0,
    baseRank:isMe?r.int(8,25):r.int(1,40),pk:null,lastHost:Date.now()};
  const chat=L.querySelector(".lchat"),giftsEl=L.querySelector(".lgifts"),hearts=L.querySelector(".lhearts"),big=L.querySelector(".lbig");
  const fill=s=>s.replace(/\{me\}/g,"@"+me.username).replace(/\{host\}/g,"@"+u.username).replace(/\{place\}/g,r.pick(G.places)).replace(/\{thing\}/g,r.pick(["food","song","movie","color","snack","city"]));
  const rankOf=uid=>{const top=Object.entries(S.gifts).sort((a,b)=>b[1]-a[1]).slice(0,3).map(x=>x[0]);const i=top.indexOf(String(uid));return i;};
  const lvl=uid=>uid==="me"?50:1+(hashStr("lvl"+uid)%42);
  function say(uid,text,cls=""){const uu=getUser(uid),rk=rankOf(uid);const badge=rk>=0?`<span class="gr g${rk+1}">#${rk+1}</span>`:`<span class="lvl">Lv.${lvl(uid)}</span>`;
    const d=el(`<div class="lc ${cls}">${uid===host?'<span class="ht">Host</span>':badge}<b>${esc(uu.username)}${uid==="me"?ADMIN:""}</b>${esc(text)}</div>`);chat.appendChild(d);while(chat.children.length>40)chat.firstChild.remove();}
  function chatLine(){const x=r.f();let s;if(S.pk&&!S.pk.done&&x<.35)s=r.pick(PK_CHAT);else if(isMe&&x<.28)s=r.pick(ME_LIVE);else if(x<.5)s=r.pick(GREET);else if(x<.85)s=r.pick(T.chat);else s=r.pick(REACT);
    s=fill(s);if(r.ch(.3))s+=r.pick(G.end);if(r.ch(.05))s=s.toUpperCase();return s.trim();}
  function heart(){const k=["#ff3b6b","#ff5ca8","#a77bff","#ff8fb1","#ff9f43"][Math.floor(Math.random()*5)];const h=el(`<i style="--dx:${(Math.random()-.5)*60}px;right:${Math.random()*20}px">${ic("heart",{fill:k,color:k,size:28})}</i>`);hearts.appendChild(h);setTimeout(()=>h.remove(),2200);}
  function updTop(){const top=Object.entries(S.gifts).sort((a,b)=>b[1]-a[1]).slice(0,3);L.querySelector(".lg3").innerHTML=top.map(([id],i)=>`<span class="g${i+1}">${avHTML(getUser(/^\d+$/.test(id)?+id:id))}</span>`).join("");
    const rk=Math.max(1,S.baseRank-Math.floor(S.dia/(isMe?20000:8000)));L.querySelector(".lrk").textContent="Weekly #"+rk;S.rank=rk;}
  function gift(uid,g,n,side){const uu=getUser(uid),v=g.c*n;sfx("gift");
    if(side==="opp"){S.pk.r+=v;}else{S.dia+=v;S.gifts[uid]=(S.gifts[uid]||0)+v;if(S.pk&&!S.pk.done)S.pk.l+=v;updTop();}
    const b=el(`<div class="gb">${avHTML(uu)}<div><b>${esc(uu.username)}</b>sent ${g.n}${side==="opp"?" (other team)":""}</div><em>${gIc(g,28)}</em><strong>x${n}</strong></div>`);giftsEl.appendChild(b);while(giftsEl.children.length>2)giftsEl.firstChild.remove();setTimeout(()=>b.remove(),3500);
    if(g.c>=299&&side!=="opp"){big.innerHTML=`<div class="bg">${gIc(g,160)}</div><div class="bt">${esc(uu.username)} sent ${g.n}!</div>`;setTimeout(()=>{big.innerHTML="";},2400);}
    if(side!=="opp")say(uid,`sent ${g.n} x${n}`,"j");}
  const pickG=()=>{const x=r.f();return GIFTS[x<.55?0:x<.75?1:x<.88?2:x<.96?3:x<.99?4:5];};
  // backgrounds: real video when available, otherwise drawn scene
  const bgv=L.querySelector(".lbgv"),bgv2=L.querySelector(".lbgv2");const realBg=t=>{if(!realOn())return null;const l=clipPool(t).filter(x=>x.kind==="video");return l.length?{src:l[hashStr(host+"bg"+t)%l.length].src}:null;};
  function setBg(){const a=realBg(scene);bgv.classList.toggle("hide",!a);bgv.classList.toggle("half",!!S.pk);if(a&&bgv.src!==a.src){bgv.src=a.src;bgv.play().catch(()=>{});}
    const b=S.pk?realBg(S.pk.scene):null;bgv2.classList.toggle("hide",!b);if(b&&bgv2.src!==b.src){bgv2.src=b.src;bgv2.play().catch(()=>{});}}
  setBg();
  function startPK(){if(S.pk&&!S.pk.done)return;const opp=r.int(10,59);const ou=getUser(opp);S.pk={opp,scene:LT[liveTypeOf(opp)].scene,l:0,r:0,end:Date.now()+90000,done:false};
    L.querySelector(".pk").classList.remove("hide");L.querySelector(".pkres").classList.add("hide");setBg();say(host,fill(`PK battle vs @${ou.username} starting!! send gifts team`));}
  function pkTick(){const P=S.pk;if(!P)return;const left=Math.max(0,P.end-Date.now());const tot=P.l+P.r||1;
    L.querySelector(".pl").style.width=(P.l/tot*100)+"%";L.querySelector(".pr").style.width=(P.r/tot*100)+"%";L.querySelector(".pkl").textContent=fmtX(P.l);L.querySelector(".pkr").textContent=fmtX(P.r);
    L.querySelector(".pkt").textContent=P.done?"Done":Math.floor(left/60000)+":"+String(Math.floor(left/1000)%60).padStart(2,"0");
    if(!P.done&&left<=0){P.done=true;const win=P.l>=P.r;const rs=L.querySelector(".pkres");rs.innerHTML=`<b class="${win?"w":"l"}">${win?"WIN":"LOSE"}</b><small>${fmtX(P.l)} vs ${fmtX(P.r)}</small>`;rs.classList.remove("hide");
      say(host,win?"WE WON!! thank you all 😭":"we lost but you're all the best","");if(win){for(let i=0;i<4;i++)setTimeout(()=>L.isConnected&&say(r.int(60,NU-1),r.pick(["GG!!","WE DID IT","W team","told you we'd win","MVP chat"])),300+i*300);}
      setTimeout(()=>{if(!L.isConnected)return;S.pk=null;L.querySelector(".pk").classList.add("hide");setBg();if(!isMe&&isPK(host))setTimeout(()=>L.isConnected&&startPK(),6000);},9000);}}
  if(isMe){say(host,"welcome everyone!! 💖");addNotif({at:Date.now(),type:"live",uid:"me",text:"You went LIVE"+(title?": "+title:"")});}
  else{say(host,fill(r.pick(T.host)));setTimeout(()=>{if(!L.isConnected)return;const used=new Set();for(let i=0;i<4;i++)setTimeout(()=>{if(!L.isConnected)return;let s;do{s=r.pick(JOIN_ME);}while(used.has(s)&&used.size<JOIN_ME.length);used.add(s);say(r.int(60,NU-1),fill(s));},i*450);
    setTimeout(()=>L.isConnected&&say(host,fill(r.pick(["omg {me} hiii thank you for coming 😭","wait {me} is here?? hi!!","everyone say hi to {me}","{me} welcome welcome"]))),2000);},900);}
  if(opt.pk||(!isMe&&isPK(host)))setTimeout(()=>L.isConnected&&startPK(),isMe?3500:1200);
  const tick=setInterval(()=>{if(!L.isConnected){clearInterval(tick);return;}const el2=(Date.now()-S.start)/1000;
    S.viewers=Math.floor(S.target*(1-Math.exp(-el2/(isMe?40:4)))*(1+(Math.random()-.5)*.02));S.peak=Math.max(S.peak,S.viewers);
    S.likes+=Math.floor(S.viewers*.002*(.5+Math.random()));if(isMe)S.newF+=Math.floor(S.viewers*.0003*Math.random());
    L.querySelector(".lv").textContent=fmt(S.viewers);L.querySelector(".llk").textContent=fmt(S.likes);L.querySelector(".ldi").innerHTML=ic("gem")+" "+fmt(S.dia);
    if(Math.random()<Math.min(.95,.35+S.viewers/8e5))say(r.int(60,NU-1),chatLine());
    if(Math.random()<.1)say(r.int(60,NU-1),"joined","j");
    if(Math.random()<.5)heart();
    if(Date.now()-S.lastHost>9000&&!isMe){S.lastHost=Date.now();say(host,fill(r.pick(T.host)));}
    const pkOn=S.pk&&!S.pk.done;
    if(Math.random()<(isMe?.07:.04)*(pkOn?2.2:1)){const g=pickG();gift(r.int(10,NU-1),g,g.c<10?r.int(1,10):1);}
    if(pkOn&&Math.random()<.16){const g=pickG();gift(r.int(60,NU-1),g,g.c<10?r.int(1,10):1,"opp");}
    pkTick();},400);
  L.addEventListener("click",e=>{if(e.target===L||e.target.classList.contains("ldim")||e.target===cv){for(let i=0;i<3;i++)setTimeout(heart,i*80);S.likes+=3;}});
  const inp=L.querySelector("input");const send=()=>{const v=inp.value.trim();if(!v)return;inp.value="";say(isMe?host:"me",v,"me");
    if(isMe)setTimeout(()=>L.isConnected&&say(r.int(60,NU-1),fill(r.pick(["{me} said that 😭","REAL","❤️❤️❤️","omg {me} answered","LMAO","{me} read my mind","exactly","the host has spoken","facts {me}"]))),900);
    else if(r.ch(.6))setTimeout(()=>L.isConnected&&say(host,fill(r.pick(["{me} omg thank you 😭","{me} of course!!","love you {me} 💖","{me} we need to collab fr","{me} you're too nice","good question {me}!","{me} haha yes"]))),1800);};
  L.querySelector(".send").onclick=send;inp.onkeydown=e=>{if(e.key==="Enter")send();};
  L.querySelector(".lht").onclick=()=>{for(let i=0;i<5;i++)setTimeout(heart,i*70);S.likes+=5;};
  L.querySelector(".lboard").onclick=()=>openBoard(S,host,isMe);L.querySelector(".lrank").onclick=()=>openBoard(S,host,isMe,"week");L.querySelector(".lg3").onclick=()=>openBoard(S,host,isMe);
  const pkb=L.querySelector(".lpkb");if(pkb)pkb.onclick=()=>{if(S.pk&&!S.pk.done){toast("PK battle already running");return;}startPK();};
  const lf=L.querySelector(".lf");if(lf)lf.onclick=()=>{setFollow(host,true);lf.remove();say("me","followed the host","j");};
  const gb=L.querySelector(".lg");if(gb)gb.onclick=()=>openGiftPanel();
  function openGiftPanel(){const gp=el(`<div class="gpanel"><div class="gh"><span>${ic("coin",{color:"#ffd166"})} <span class="cb">${fmtX(ST.coins)}</span> coins</span><button>+ Recharge</button></div><div class="ggrid">${GIFTS.map((g,i)=>`<button data-g="${i}"><em>${gIc(g,34)}</em>${g.n}<small>${ic("coin")} ${fmtX(g.c)}</small></button>`).join("")}</div><button class="go2" style="margin-top:10px;background:#24242a;color:#fff">Close</button></div>`);
    L.appendChild(gp);gp.querySelector(".gh button").onclick=()=>{ST.coins+=10000;save();gp.querySelector(".cb").textContent=fmtX(ST.coins);toast("+10,000 coins");};
    gp.querySelector(".go2").onclick=()=>gp.remove();
    gp.querySelectorAll("[data-g]").forEach(b=>b.onclick=()=>{const g=GIFTS[+b.dataset.g];if(ST.coins<g.c){toast("Not enough coins — tap Recharge");return;}ST.coins-=g.c;save();gp.querySelector(".cb").textContent=fmtX(ST.coins);gift("me",g,1);
      setTimeout(()=>{if(!L.isConnected)return;say(host,fill(`THANK YOU {me} FOR THE ${g.n.toUpperCase()} 😭😭`));for(let i=0;i<3;i++)setTimeout(()=>L.isConnected&&say(r.int(60,NU-1),fill(r.pick(["{me} is so generous 😭","W {me}","the {me} effect","{me} carrying the live fr","{me} top gifter now??","can't compete with {me} lol","{me} said take my money"]))),400+i*400);},1200);});}
  let stream=null;
  if(opt.cam&&navigator.mediaDevices&&navigator.mediaDevices.getUserMedia){navigator.mediaDevices.getUserMedia({video:{facingMode:"user"},audio:false}).then(s=>{if(!L.isConnected){s.getTracks().forEach(t=>t.stop());return;}stream=s;const v=L.querySelector(".lcam");v.srcObject=s;v.classList.remove("hide");}).catch(()=>toast("Camera unavailable — using background"));}
  L._audio=()=>stream?null:{key:isMe?"live":(scene||"music"),seed:3};
  L._onClose=()=>{clearInterval(tick);if(stream)stream.getTracks().forEach(t=>t.stop());};
  addAnim(L,dt=>{S.t+=dt;const w=cv.width,h=cv.height;
    if(S.pk){c.save();c.beginPath();c.rect(0,0,w/2,h);c.clip();drawPost({scene,seed:11,hue:isMe?300:u.avatar.hue},c,w/2,h,S.t);c.restore();
      c.save();c.translate(w/2,0);c.beginPath();c.rect(0,0,w/2,h);c.clip();drawPost({scene:S.pk.scene,seed:19,hue:getUser(S.pk.opp).avatar.hue},c,w/2,h,S.t);c.restore();c.fillStyle="#000";c.fillRect(w/2-1,0,2,h);}
    else drawPost({scene,seed:11,hue:isMe?300:u.avatar.hue},c,w,h,S.t);});
  L.querySelector(".lx").onclick=()=>{if(!isMe){closeLayer(L);return;}clearInterval(tick);
    const dur=Math.floor((Date.now()-S.start)/1000),mm=String(Math.floor(dur/60)).padStart(2,"0")+":"+String(dur%60).padStart(2,"0");
    ST.diamonds+=S.dia;ST.set.followers+=S.newF;ST.gifters=ST.gifters||{};for(const [k,v] of Object.entries(S.gifts))ST.gifters[k]=(ST.gifters[k]||0)+v;
    ST.lives=ST.lives||[];ST.lives.unshift({at:S.start,dur,peak:S.peak,dia:S.dia,likes:S.likes,newF:S.newF,type,title,rank:S.rank||S.baseRank,top:Object.entries(S.gifts).sort((a,b)=>b[1]-a[1]).slice(0,3).map(x=>x[0])});ST.lives=ST.lives.slice(0,50);save();
    addNotif({at:Date.now(),type:"live",uid:"me",text:`LIVE ended · ${fmt(S.peak)} peak viewers · ${fmtX(S.dia)} diamonds`});
    const sm=el(`<div class="lsum"><div class="cd"><h3>LIVE ended</h3><p style="color:var(--mut);font-size:13px;margin-top:4px">Great stream! Here's how it went</p><div class="sg">
      <div><b>${mm}</b><small>Duration</small></div><div><b>${fmt(S.peak)}</b><small>Peak viewers</small></div><div><b>${fmt(S.likes)}</b><small>Likes</small></div>
      <div><b>${ic("gem")} ${fmtX(S.dia)}</b><small>Diamonds</small></div><div><b>+${fmtX(S.newF)}</b><small>New followers</small></div><div><b>#${S.rank||S.baseRank}</b><small>Weekly rank</small></div></div>
      <button class="go2" style="margin-bottom:8px">${ic("trophy")} Leaderboards</button><button class="go">Done</button></div></div>`);
    L.appendChild(sm);sm.querySelector(".go2").onclick=()=>openBoard(S,host,true,"mine");sm.querySelector(".go").onclick=()=>closeLayer(L);};
  const cd=el(`<div class="cdown">3</div>`);if(isMe){L.appendChild(cd);let n=3;const iv=setInterval(()=>{n--;if(n<=0){clearInterval(iv);cd.remove();}else cd.textContent=n;},700);}
  updTop();}

/* ================= LIVE leaderboards ================= */
function openBoard(S,host,isMe,tab){const{bg,body}=mkSheet("Leaderboards");const tabs=[["live","This LIVE"],["week","Weekly"],["hour","Hourly"]];if(isMe||!S)tabs.push(["fans","All-time fans"],["mine","My LIVEs"]);
  if(!S)tabs.splice(0,1);let cur=tab||tabs[0][0];
  const id2u=k=>getUser(/^\d+$/.test(k)?+k:k);
  const row=(rank,u,val,sub,hl)=>`<div class="lbrow ${hl?"me":""}"><span class="rk r${rank}">${rank}</span>${avHTML(u)}<div class="i"><b>${esc(u.username)}${u.id==="me"?ADMIN:""} ${verHTML(u).replace(ADMIN,"")}</b><div>${sub||""}</div></div><span class="val">${val}</span></div>`;
  function render(){body.innerHTML=`<div class="seg lbseg">${tabs.map(([k,n])=>`<button data-k="${k}" class="${k===cur?"on":""}">${n}</button>`).join("")}</div><div class="lbl"></div>`;
    body.querySelectorAll(".lbseg button").forEach(b=>b.onclick=()=>{cur=b.dataset.k;render();});const l=body.querySelector(".lbl");
    if(cur==="live"){const e=Object.entries(S.gifts).sort((a,b)=>b[1]-a[1]);l.innerHTML=e.length?`<div class="lbh">${ic("gem")} ${fmtX(S.dia)} diamonds this LIVE · ${e.length} gifters</div>`+e.slice(0,50).map(([k,v],i)=>row(i+1,id2u(k),`${ic("gem")} ${fmtX(v)}`,i<3?"Top gifter":"Lv."+(1+(hashStr("lvl"+k)%42)),k==="me")).join(""):`<div class="empty">No gifts yet — be the first!</div>`;}
    else if(cur==="week"||cur==="hour"){const rr=R("wk"+cur+dayKey+(cur==="hour"?new Date().getHours():""));const list=[];for(let i=0;i<30;i++){const id=rr.int(0,59);if(!list.some(x=>x.id===id))list.push({id,v:Math.floor(rr.log(cur==="week"?2e5:8e3,cur==="week"?9e6:4e5))});}
      list.sort((a,b)=>b.v-a.v);const hk=S?(isMe?"me":host):"me",hv=S?S.dia+(cur==="week"?Math.floor(R("hv"+hk).log(2e5,3e6)):Math.floor(R("hh"+hk).log(5e3,1e5))):Math.floor(R("hv"+hk).log(2e5,3e6));
      const fl=list.filter(x=>x.id!==hk);fl.push({id:hk,v:hv});fl.sort((a,b)=>b.v-a.v);
      l.innerHTML=`<div class="lbh">${cur==="week"?"Weekly":"This hour's"} creator ranking · by diamonds</div>`+fl.slice(0,30).map((x,i)=>row(i+1,getUser(x.id),`${ic("gem")} ${fmt(x.v)}`,x.id===hk?(S?"LIVE now":"you"):LT[liveTypeOf(x.id==="me"?0:x.id)].name+" creator",x.id===hk)).join("");}
    else if(cur==="fans"){const all=Object.assign({},ST.gifters||{});if(S&&isMe)for(const [k,v] of Object.entries(S.gifts))all[k]=(all[k]||0)+v;const e=Object.entries(all).sort((a,b)=>b[1]-a[1]);
      l.innerHTML=e.length?`<div class="lbh">Your biggest supporters across all LIVEs</div>`+e.slice(0,50).map(([k,v],i)=>row(i+1,id2u(k),`${ic("gem")} ${fmtX(v)}`,i===0?"#1 fan":i<3?"Top fan":"Supporter")).join(""):`<div class="empty">Go LIVE to start building your fan leaderboard</div>`;}
    else if(cur==="mine"){const ls=ST.lives||[];const tot=ls.reduce((a,x)=>({dia:a.dia+x.dia,peak:Math.max(a.peak,x.peak),likes:a.likes+x.likes,f:a.f+x.newF}),{dia:0,peak:0,likes:0,f:0});
      l.innerHTML=ls.length?`<div class="kpis" style="margin:4px 0 10px"><div class="kpi"><small>LIVEs</small><b>${ls.length}</b></div><div class="kpi"><small>Diamonds</small><b>${fmt(tot.dia)}</b></div><div class="kpi"><small>Best peak</small><b>${fmt(tot.peak)}</b></div><div class="kpi"><small>New followers</small><b>${fmt(tot.f)}</b></div></div>`+
        ls.map(x=>`<div class="lbrow"><span class="rk">${ic("live",{color:"#ff3b6b"})}</span><div class="i"><b>${esc(x.title||LT[x.type]?.name||"LIVE")}</b><div>${new Date(x.at).toLocaleDateString([], {month:"short",day:"numeric"})} · ${Math.floor(x.dur/60)}m · ${fmt(x.peak)} peak · rank #${x.rank}</div></div><span class="val">${ic("gem")} ${fmt(x.dia)}</span></div>`).join(""):`<div class="empty">Your past LIVEs will show up here</div>`;}}
  render();}

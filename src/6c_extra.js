
/* ================= text generator (thousands of unique variations) ================= */
const G={
 open:["","","","ok but ","wait ","no because ","bro ","lowkey ","ngl ","honestly ","the way ","i swear ","not gonna lie ","yo ","hold on ","ayo ","literally ","be so fr, ","real talk ","icl "],
 end:["","","",""," fr"," lol"," 😭"," 💀"," no cap"," istg"," 🫶"," fr fr"," ngl"," 😂"," ✨","!!"," (respectfully)"," icl"," 🙏"," lmao"],
 places:["brazil","the philippines","mexico","london","texas","toronto","jakarta","manila","lagos","paris","sydney","chicago","berlin","nyc","la","dubai","madrid","seoul","cairo","miami"],
 fanCore:["{me} really out here replying to everyone","this comment got more likes than my whole account","{me} is the type to read every single comment","imagine being this famous and still this nice","a wild {me} comment appeared","i was literally just watching your {topic} video","you replying here is crazy","this is why i keep notifs on","{me} pls come to {place}","when's the {topic} part 2 dropping","this thread is blessed now","i've never been this early to anything","screenshot taken, shared, framed","your comments are funnier than half the videos here","how do you have time to comment on everything","been watching since the old days","my mom knows who you are now","{me} just made my whole week","told my friends you'd show up one day","you and {celeb} need to collab","the {topic} content is unmatched","who else came from the notification","how is this the same person with {fol} followers","most humble creator on here","i'd pay to see you react to this","the algorithm sent me here for a reason","not you being the main character of every comment section","you're everywhere and i'm not complaining","you should go live tonight","pls do a Q&A soon","still thinking about your last live","you made {topic} cool again","drop the playlist pls","what camera do you use for real","day {d} of asking for a meet and greet","someone pin this","the replies are about to be wild","i was not ready for you to be here","your comment > my entire feed today","we stan a creator who actually interacts","this is peak internet","{me} commenting at this hour is wild","i refreshed and you were here","the comment section just got 10x better","i need you to know you're my comfort creator","{me} the only reason i open this app","not me liking this in 0.2 seconds","you said that so casually","the confidence in this comment","{me} came to bless the thread","how are you this consistent","the way i ran here","this is going in my notes app","my fyp has been you all week","you're the reason i started posting","teach me how to be this unbothered","{me} always shows up when it matters","ok this made me laugh out loud in public","your energy is unmatched","rare {me} sighting","this deserves its own video","you should do a {topic} series","i can hear this comment in your voice","how did you see this so fast","the {topic} era is the best era","we need a merch drop","you've never missed and you know it","quietly obsessed with your page","you're literally everyone's favorite","what time is it where you are lol","nah this is too wholesome","the {topic} community is eating today","{me} supremacy","pls never stop posting","waiting for your next upload like","i was having a bad day until this"],
 tgtCore:["you actually replied to me??","i'm telling my grandkids about this","not me screaming in class rn","ok i'm framing this","my hands are literally shaking","i didn't think you'd see this","best day of my life, no exaggeration","pinch me","everyone look, {me} replied to ME","i've been commenting for 2 years for this moment","you just made my entire year","i need to lie down","notification popped up and i dropped my phone","i'm crying on the bus rn","this reply is going on my wall","wait hi?? hi!!","ok now i can die happy","sending this to the group chat immediately","you remembered my username??","ahh thank you sm","my heart just stopped","i read this 40 times","screaming crying throwing up","this is not a drill","my sister is not going to believe this","you're even nicer than i thought","ok i'm the main character now","printing this out","i'll never financially recover from this","thank you thank you thank you","just woke up to this, what a day"],
 kidCore:["you're so lucky","jealous fr","{u} got blessed today","not {u} getting noticed before me","congrats on the reply lol","you won the internet today","pls share the luck","ok but same","i'd be screaming too","{u} we're so proud of you","main character moment for {u}","my turn next","the luck you have","framing your comment too","lmaooo the excitement","{u} is officially famous now","how do i get this lucky","this made me happy for you","{u} remember us when you're famous","the way {u} is freaking out 😂","ok but how did you get noticed","sending good vibes your way","you deserve it fr","this is so wholesome","manifesting this for me next","{u} won, everyone else go home","i'm screenshotting your joy","not jealous at all (i am)","the reply heard around the world","you'll never be the same","congrats bestie"]
};
const genCache={};
function gen(kind,p,x={}){const r=R(kind+Date.now()+Math.random()),core=r.pick(G[kind+"Core"]);let s=r.pick(G.open)+core+r.pick(G.end);
  s=s.replace(/\{me\}/g,"@"+ST.profile.username).replace(/\{topic\}/g,p?(TOP[p.topic]||TOP.lava).n:"").replace(/\{place\}/g,r.pick(G.places)).replace(/\{celeb\}/g,CELEB[r.int(0,4)][1])
   .replace(/\{fol\}/g,fmt(meUser().followers)).replace(/\{d\}/g,r.int(40,900)).replace(/\{u\}/g,x.u?"@"+x.u:"they");
  if(r.ch(.08))s=s.toUpperCase();else if(r.ch(.6))s=s.charAt(0).toLowerCase()+s.slice(1);
  if(r.ch(.06))s=s.replace(/(\w)(\w)(\w*)$/,(m,a,b,c)=>a+b+b+c);
  return s.replace(/\s+/g," ").trim();}
function genUnique(kind,p,used,x){for(let i=0;i<20;i++){const s=gen(kind,p,x);if(!used.has(s.toLowerCase())){used.add(s.toLowerCase());return s;}}return gen(kind,p,x);}

/* ================= real clip library (your own clips used across the feed) ================= */
function libList(){return (ST.lib||[]).filter(x=>MEDIA[x.id]);}
const realOn=()=>ST.set.real!==false&&(libList().length>0||(typeof REPOCLIPS!=="undefined"&&REPOCLIPS.length>0));
function realOf(p){if(ST.set.real===false||p.media||p.duetOf||p.isNew)return null;const pool=clipPool(p.topic);if(!pool.length)return null;const x=pool[hashStr(p.id)%pool.length];return {src:x.src,poster:x.poster,kind:x.kind};}
const vidSrc=p=>(p.media&&MEDIA[p.id])?{src:MEDIA[p.id],kind:p.media.kind,own:true}:(r=>r?{src:r.src,kind:r.kind,poster:r.poster,own:false}:null)(realOf(p));
async function addToLibrary(files){ST.lib=ST.lib||[];let n=0;for(const f of files){const kind=f.type.startsWith("video")?"video":f.type.startsWith("image")?"image":null;if(!kind)continue;
  const id="L"+Date.now().toString(36)+Math.floor(Math.random()*1e4),url=URL.createObjectURL(f);MEDIA[id]=url;await IDB.put(id,f);ST.lib.push({id,kind,thumb:await makeThumb(url,kind)});n++;}save();return n;}
function clearLibrary(){(ST.lib||[]).forEach(x=>{IDB.del(x.id);delete MEDIA[x.id];});ST.lib=[];save();}
/* camera look for drawn videos: grain + handheld shake + vignette */
let GRAIN=null;function grain(){if(GRAIN)return GRAIN;const g=document.createElement("canvas");g.width=g.height=160;const x=g.getContext("2d"),d=x.createImageData(160,160);for(let i=0;i<d.data.length;i+=4){const v=Math.random()*255;d.data[i]=d.data[i+1]=d.data[i+2]=v;d.data[i+3]=40;}x.putImageData(d,0,0);return GRAIN=g;}
function filmLook(c,w,h,t,draw){if(ST.set.film===false){draw();return;}
  const sx=Math.sin(t*1.7)*w*.004+Math.sin(t*4.3)*w*.0015,sy=Math.cos(t*1.3)*h*.003+Math.sin(t*3.7)*h*.001,z=1.025+Math.sin(t*.4)*.006;
  c.save();c.translate(w/2+sx,h/2+sy);c.scale(z,z);c.rotate(Math.sin(t*.9)*.004);c.translate(-w/2,-h/2);draw();c.restore();
  const ex=.03*Math.sin(t*2.1)+.02*Math.sin(t*5.3);if(ex>0){c.fillStyle=`rgba(255,240,220,${ex})`;c.fillRect(0,0,w,h);}else{c.fillStyle=`rgba(0,0,0,${-ex})`;c.fillRect(0,0,w,h);}
  const g=c.createRadialGradient(w/2,h/2,Math.min(w,h)*.35,w/2,h/2,Math.max(w,h)*.75);g.addColorStop(0,"rgba(0,0,0,0)");g.addColorStop(1,"rgba(0,0,0,.45)");c.fillStyle=g;c.fillRect(0,0,w,h);
  const pat=c.createPattern(grain(),"repeat");c.save();c.globalAlpha=.55;c.translate(Math.random()*160,Math.random()*160);c.fillStyle=pat;c.fillRect(-160,-160,w+320,h+320);c.restore();}

/* ================= in-app camera ================= */
const FILTERS=[["Normal","none"],["Warm","sepia(.25) saturate(1.35) brightness(1.05)"],["Cool","hue-rotate(-12deg) saturate(1.2) brightness(1.04)"],["B&W","grayscale(1) contrast(1.15)"],["Vivid","saturate(1.7) contrast(1.1)"],["Vintage","sepia(.5) contrast(.95) brightness(1.08)"],["Glow","brightness(1.15) contrast(.92) saturate(1.2)"],["Moody","contrast(1.25) brightness(.85) saturate(.85)"]];
function openRecorder(onDone){
  const L=el(`<div class="layer dark rec"><video class="rv" playsinline muted autoplay></video><canvas class="rc hide"></canvas>
   <div class="rtop"><button class="rx">${ic("x",{size:26})}</button><div class="rlen">${["15s","60s","3m"].map((l,i)=>`<button data-l="${[15,60,180][i]}" class="${i===1?"on":""}">${l}</button>`).join("")}</div><span style="width:40px"></span></div>
   <div class="rtools"><button data-t="flip">${ic("refresh",{size:26})}<span>Flip</span></button><button data-t="timer">${ic("bell",{size:26})}<span class="tl">Timer</span></button><button data-t="filter">${ic("sparkle",{size:26})}<span>Filters</span></button></div>
   <div class="rfil hide">${FILTERS.map((f,i)=>`<button data-f="${i}" class="${i?"":"on"}">${f[0]}</button>`).join("")}</div>
   <div class="rtime hide">0:00</div><div class="rcd hide"></div>
   <div class="rbot"><label class="rup">${ic("upload",{size:24})}<input type="file" accept="video/*,image/*" hidden></label><button class="rbtn"><svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="46" class="rbg"/><circle cx="50" cy="50" r="46" class="rpr"/></svg><i></i></button><span style="width:44px"></span></div>
   <div class="rmsg hide"></div></div>`);
  pushLayer(L);const v=L.querySelector(".rv"),cv=L.querySelector(".rc"),c=cv.getContext("2d"),msg=L.querySelector(".rmsg");
  let stream=null,facing="user",maxLen=60,timer=0,fil=0,rec=null,chunks=[],t0=0,raf=null;
  const say=t=>{msg.textContent=t;msg.classList.remove("hide");};
  async function start(){if(stream)stream.getTracks().forEach(t=>t.stop());
    if(!navigator.mediaDevices||!navigator.mediaDevices.getUserMedia){say("Camera isn't available here. Open Naymo from an https:// link (not a saved file) to film.");return;}
    try{stream=await navigator.mediaDevices.getUserMedia({video:{facingMode:facing,width:{ideal:1080},height:{ideal:1920}},audio:true});}
    catch(e){try{stream=await navigator.mediaDevices.getUserMedia({video:{facingMode:facing},audio:false});}catch(e2){say("Camera permission was blocked. Allow camera access for this site in your browser settings, then try again.");return;}}
    msg.classList.add("hide");v.srcObject=stream;v.style.transform=facing==="user"?"scaleX(-1)":"none";v.play().catch(()=>{});}
  start();
  const applyF=()=>{v.style.filter=FILTERS[fil][1];};
  L.querySelector(".rx").onclick=()=>closeLayer(L);
  L.querySelectorAll(".rlen button").forEach(b=>b.onclick=()=>{if(rec)return;maxLen=+b.dataset.l;L.querySelectorAll(".rlen button").forEach(x=>x.classList.toggle("on",x===b));});
  L.querySelectorAll(".rtools button").forEach(b=>b.onclick=()=>{const t=b.dataset.t;if(rec)return;
    if(t==="flip"){facing=facing==="user"?"environment":"user";start();}
    if(t==="timer"){timer=timer===0?3:timer===3?10:0;L.querySelector(".tl").textContent=timer?timer+"s":"Timer";}
    if(t==="filter")L.querySelector(".rfil").classList.toggle("hide");});
  L.querySelectorAll(".rfil button").forEach(b=>b.onclick=()=>{fil=+b.dataset.f;L.querySelectorAll(".rfil button").forEach(x=>x.classList.toggle("on",x===b));applyF();});
  const up=L.querySelector(".rup input");up.onchange=async()=>{const f=up.files[0];if(!f)return;const kind=f.type.startsWith("video")?"video":"image";const url=URL.createObjectURL(f);const th=await makeThumb(url,kind);closeLayer(L);onDone({file:f,kind,url,thumb:th});};
  const btn=L.querySelector(".rbtn"),pr=L.querySelector(".rpr"),tm=L.querySelector(".rtime");
  function pickMime(){for(const m of ["video/mp4;codecs=avc1","video/mp4","video/webm;codecs=vp9,opus","video/webm"])if(window.MediaRecorder&&MediaRecorder.isTypeSupported&&MediaRecorder.isTypeSupported(m))return m;return "";}
  function begin(){if(!stream){say("Camera isn't on yet.");return;}
    let out=stream;const canFilter=fil&&cv.captureStream&&("filter" in c);
    if(canFilter){cv.width=v.videoWidth||720;cv.height=v.videoHeight||1280;const draw=()=>{c.filter=FILTERS[fil][1];c.save();if(facing==="user"){c.translate(cv.width,0);c.scale(-1,1);}c.drawImage(v,0,0,cv.width,cv.height);c.restore();raf=requestAnimationFrame(draw);};draw();
      out=new MediaStream([...cv.captureStream(30).getVideoTracks(),...stream.getAudioTracks()]);}
    const mime=pickMime();try{rec=new MediaRecorder(out,mime?{mimeType:mime}:undefined);}catch(e){say("Recording isn't supported in this browser.");return;}
    chunks=[];rec.ondataavailable=e=>{if(e.data&&e.data.size)chunks.push(e.data);};
    rec.onstop=async()=>{cancelAnimationFrame(raf);const type=(rec.mimeType||mime||"video/webm").split(";")[0];const blob=new Blob(chunks,{type});rec=null;btn.classList.remove("on");
      if(!blob.size){say("Nothing was recorded, try again.");return;}const url=URL.createObjectURL(blob);const th=await makeThumb(url,"video");closeLayer(L);onDone({file:blob,kind:"video",url,thumb:th});};
    rec.start(250);t0=Date.now();btn.classList.add("on");tm.classList.remove("hide");
    const tick=()=>{if(!rec)return;const s=(Date.now()-t0)/1000;pr.style.strokeDashoffset=289*(1-Math.min(1,s/maxLen));tm.textContent=Math.floor(s/60)+":"+String(Math.floor(s%60)).padStart(2,"0");if(s>=maxLen)rec.stop();else setTimeout(tick,100);};tick();}
  btn.onclick=()=>{if(rec){rec.stop();return;}if(timer){const cd=L.querySelector(".rcd");let n=timer;cd.textContent=n;cd.classList.remove("hide");const iv=setInterval(()=>{n--;if(n<=0){clearInterval(iv);cd.classList.add("hide");begin();}else cd.textContent=n;},1000);}else begin();};
  L._onClose=()=>{try{if(rec&&rec.state!=="inactive")rec.stop();}catch(e){}cancelAnimationFrame(raf);if(stream)stream.getTracks().forEach(t=>t.stop());};}

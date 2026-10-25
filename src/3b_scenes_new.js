dance(c,w,h,t,s,hu){const N=NZ(s),beat=Math.pow(Math.abs(Math.sin(t*Math.PI*2)),4);
  c.fillStyle=lg(c,0,h,["#0b0420",`hsl(${hu+270},60%,15%)`]);c.fillRect(0,0,w,h);
  c.globalCompositeOperation="lighter";for(let i=0;i<3;i++){const a=Math.sin(t*.8+i*2)*.5,x0=w*(.2+i*.3);c.fillStyle=`hsla(${hu+i*90},100%,60%,.13)`;c.beginPath();c.moveTo(x0,0);c.lineTo(x0+Math.sin(a)*h-w*.15,h*.8);c.lineTo(x0+Math.sin(a)*h+w*.15,h*.8);c.fill();}c.globalCompositeOperation="source-over";
  const fy=h*.66;for(let j=0;j<6;j++)for(let i=-6;i<6;i++){const y0=fy+(h-fy)*Math.pow(j/6,1.6),y1=fy+(h-fy)*Math.pow((j+1)/6,1.6),s0=.4+j/6*.9,s1=.4+(j+1)/6*.9,tw=w*.16;
    const on=N(i*7+j*13+Math.floor(t*2))>.5;c.fillStyle=on?`hsl(${hu+(i+j)*40},90%,${45+beat*20}%)`:`hsl(${hu+260},40%,14%)`;c.beginPath();c.moveTo(w/2+i*tw*s0,y0);c.lineTo(w/2+(i+1)*tw*s0,y0);c.lineTo(w/2+(i+1)*tw*s1,y1);c.lineTo(w/2+i*tw*s1,y1);c.fill();}
  const bx=w/2,by=h*.1,br=w*.08;c.strokeStyle="#aaa";c.lineWidth=2;c.beginPath();c.moveTo(bx,0);c.lineTo(bx,by-br);c.stroke();const bg=c.createRadialGradient(bx-br*.3,by-br*.3,1,bx,by,br);bg.addColorStop(0,"#fff");bg.addColorStop(1,"#777");c.fillStyle=bg;circ(c,bx,by,br);c.fill();
  for(let i=0;i<24;i++){const a=i/24*6.28+t;c.fillStyle=`hsla(${hu+i*18},100%,75%,${.5+.5*Math.sin(t*5+i)})`;c.fillRect(bx+Math.cos(a)*w*.45*N(i),by+Math.abs(Math.sin(a))*h*.5*N(i+3),3,3);}
  const cx=w/2+Math.sin(t*Math.PI)*w*.06,cy=h*.6-Math.abs(Math.sin(t*Math.PI*2))*h*.02,R=w*.12,col=`hsl(${hu+190},80%,60%)`;
  c.lineCap="round";c.lineWidth=R*.28;c.strokeStyle=col;const lk=Math.sin(t*Math.PI*2)*R*.5;
  c.beginPath();c.moveTo(cx-R*.35,cy+R*.6);c.lineTo(cx-R*.5-lk*.3,cy+R*1.45);c.moveTo(cx+R*.35,cy+R*.6);c.lineTo(cx+R*.5+lk*.3,cy+R*1.45);c.stroke();
  const a1=Math.sin(t*Math.PI*2)*1.2,a2=Math.cos(t*Math.PI*2)*1.2;c.beginPath();c.moveTo(cx-R*.8,cy);c.lineTo(cx-R*.8-Math.cos(a1)*R*.9,cy-Math.sin(a1)*R*.9-R*.2);c.moveTo(cx+R*.8,cy);c.lineTo(cx+R*.8+Math.cos(a2)*R*.9,cy-Math.sin(a2)*R*.9-R*.2);c.stroke();
  c.fillStyle=col;c.beginPath();c.ellipse(cx,cy,R*.9,R,0,0,7);c.fill();
  c.fillStyle="#fff";circ(c,cx-R*.3,cy-R*.25,R*.18);c.fill();circ(c,cx+R*.3,cy-R*.25,R*.18);c.fill();c.fillStyle="#111";circ(c,cx-R*.28,cy-R*.22,R*.08);c.fill();circ(c,cx+R*.32,cy-R*.22,R*.08);c.fill();
  c.strokeStyle="#111";c.lineWidth=R*.08;c.beginPath();c.arc(cx,cy+R*.1,R*.3,.2,Math.PI-.2);c.stroke();
  c.fillStyle=`hsl(${hu+330},85%,60%)`;c.beginPath();c.ellipse(cx,cy-R*.85,R*.6,R*.25,0,Math.PI,0);c.fill();c.fillRect(cx,cy-R*.88,R*.8,R*.12);c.lineCap="butt";
},
cook(c,w,h,t,s,hu){const N=NZ(s),step=Math.floor(t/3)%5;
  c.fillStyle="#e9e2d8";c.fillRect(0,0,w,h);c.fillStyle="#d8cfc3";for(let i=0;i<8;i++)for(let j=0;j<5;j++)if((i+j)%2)c.fillRect(i*w/8,j*h*.06,w/8,h*.06);
  c.fillStyle="#3a3f47";c.fillRect(0,h*.3,w,h*.7);
  const cx=w/2,cy=h*.58,R=w*.36;const gl=c.createRadialGradient(cx,cy,R*.8,cx,cy,R*1.3);gl.addColorStop(0,"rgba(255,90,30,.35)");gl.addColorStop(1,"rgba(255,90,30,0)");c.fillStyle=gl;c.fillRect(0,0,w,h);
  c.fillStyle="#222";rr(c,cx+R*.9,cy-R*.08,R*.9,R*.16,R*.08);c.fill();
  c.fillStyle="#2b2b2e";circ(c,cx,cy,R);c.fill();c.fillStyle="#3a3a3e";circ(c,cx,cy,R*.88);c.fill();
  c.fillStyle=`rgba(255,200,60,${.15+.05*Math.sin(t*4)})`;circ(c,cx,cy,R*.8);c.fill();
  c.save();c.translate(cx,cy);c.rotate(Math.sin(t*1.5)*.08);
  if(step>=1){c.fillStyle="#f6f0dc";for(let i=0;i<14;i++){circ(c,(N(i)-.5)*R*1.2,(N(i+20)-.5)*R*1.2,R*.04);c.fill();}}
  if(step>=2){for(let i=0;i<18;i++){c.fillStyle=i%3?"#3fae4a":"#e24a3b";c.save();c.translate((N(i+40)-.5)*R*1.3,(N(i+60)-.5)*R*1.3);c.rotate(N(i)*6);c.fillRect(-R*.07,-R*.03,R*.14,R*.06);c.restore();}}
  if(step>=3){c.strokeStyle="#f3d27a";c.lineWidth=3;for(let i=0;i<20;i++){c.beginPath();c.arc((N(i+80)-.5)*R*.6,(N(i+90)-.5)*R*.6,R*(.2+N(i)*.3),N(i)*6,N(i)*6+1.5);c.stroke();}}
  if(step>=4){c.fillStyle="rgba(140,60,20,.45)";circ(c,0,0,R*.7);c.fill();}
  c.restore();
  for(let i=0;i<25;i++){const a=N(i+100)*6.28,d=R*.75*N(i+101),ph=fr(t*1.5+N(i));c.strokeStyle=`rgba(255,255,255,${.4*(1-ph)})`;c.lineWidth=1;circ(c,cx+Math.cos(a)*d,cy+Math.sin(a)*d,2+ph*4);c.stroke();}
  steam(c,cx,cy,R,h,t);
  const L=["Step 1: heat the oil","Step 2: add garlic","Step 3: add the veggies","Step 4: noodles in","Step 5: sauce & toss"][step];
  c.font=`bold ${Math.round(w*.05)}px sans-serif`;const tw=c.measureText(L).width;c.fillStyle="rgba(0,0,0,.6)";rr(c,w/2-tw/2-12,h*.12,tw+24,w*.09,10);c.fill();c.fillStyle="#fff";c.textAlign="center";c.fillText(L,w/2,h*.12+w*.063);c.textAlign="left";
},
grwm(c,w,h,t,s,hu){const N=NZ(s);
  c.fillStyle=lg(c,0,h,[`hsl(${hu%40+330},60%,88%)`,`hsl(${hu%40+340},50%,78%)`]);c.fillRect(0,0,w,h);
  const mx=w*.15,my=h*.12,mw=w*.7,mh=h*.5;
  c.fillStyle="#f6e9d7";rr(c,mx-12,my-12,mw+24,mh+24,24);c.fill();
  const mg=c.createLinearGradient(mx,my,mx+mw,my+mh);mg.addColorStop(0,"#dfe9f3");mg.addColorStop(.5,"#ffffff");mg.addColorStop(1,"#c9d6e3");c.fillStyle=mg;rr(c,mx,my,mw,mh,18);c.fill();
  c.fillStyle=`hsla(${hu+20},30%,60%,.35)`;circ(c,w/2,my+mh*.42,mw*.18);c.fill();c.beginPath();c.ellipse(w/2,my+mh,mw*.32,mh*.35,0,Math.PI,0);c.fill();
  c.save();rr(c,mx,my,mw,mh,18);c.clip();c.fillStyle="rgba(255,255,255,.55)";c.translate(fr(t*.15)*mw*2-mw*.5,0);c.rotate(.4);c.fillRect(mx,my-mh,mw*.12,mh*3);c.restore();
  for(let i=0;i<8;i++)for(const y of [my-12,my+mh+12]){const x=mx-12+(mw+24)*i/7;const g=c.createRadialGradient(x,y,0,x,y,16);g.addColorStop(0,"rgba(255,245,200,1)");g.addColorStop(1,"rgba(255,245,200,0)");c.fillStyle=g;c.fillRect(x-16,y-16,32,32);c.fillStyle="#fffbe8";circ(c,x,y,5);c.fill();}
  c.fillStyle="#fff";c.fillRect(0,h*.72,w,h*.28);c.fillStyle="rgba(0,0,0,.06)";c.fillRect(0,h*.72,w,6);
  c.fillStyle="#222";rr(c,w*.08,h*.78,w*.44,h*.1,8);c.fill();const pc=["#f2b5a7","#e88a7a","#c9705f","#f7d1ba","#b4637a","#e7b07c","#d77b9b","#a85b4a"];
  for(let i=0;i<8;i++){c.fillStyle=pc[i];circ(c,w*.13+(i%4)*w*.11,h*.805+Math.floor(i/4)*h*.048,w*.035);c.fill();}
  c.fillStyle="#c9a24a";c.fillRect(w*.62,h*.8,w*.07,h*.1);c.fillStyle="#d1335a";rr(c,w*.625,h*.755,w*.06,h*.05,4);c.fill();
  c.save();c.translate(w*.82,h*.84);c.rotate(-.6+Math.sin(t*2)*.1);c.fillStyle="#333";c.fillRect(-3,0,6,h*.1);c.fillStyle="#e7c3b5";c.beginPath();c.ellipse(0,-6,10,16,0,0,7);c.fill();c.restore();
  for(let i=0;i<10;i++){const x=N(i)*w,y=N(i+5)*h*.7,z=4+6*Math.abs(Math.sin(t*2+i));c.fillStyle="rgba(255,255,255,.95)";c.beginPath();c.moveTo(x,y-z);c.lineTo(x+z*.25,y);c.lineTo(x,y+z);c.lineTo(x-z*.25,y);c.fill();c.beginPath();c.moveTo(x-z,y);c.lineTo(x,y+z*.25);c.lineTo(x+z,y);c.lineTo(x,y-z*.25);c.fill();}
},
pet(c,w,h,t,s,hu){
  c.fillStyle=lg(c,0,h,["#fbe9d0","#f3d3b0"]);c.fillRect(0,0,w,h);
  c.fillStyle="#bfe3ff";rr(c,w*.55,h*.08,w*.38,h*.25,10);c.fill();c.fillStyle="#fff";c.fillRect(w*.735,h*.08,5,h*.25);c.fillRect(w*.55,h*.2,w*.38,5);
  c.fillStyle="rgba(255,240,180,.35)";c.beginPath();c.moveTo(w*.55,h*.33);c.lineTo(w*.93,h*.33);c.lineTo(w*.7,h*.85);c.lineTo(w*.2,h*.85);c.fill();
  c.fillStyle="#c89c72";c.fillRect(0,h*.78,w,h*.22);
  const cx=w*.48,cy=h*.72;c.fillStyle=`hsl(${hu},55%,60%)`;c.beginPath();c.ellipse(cx,cy,w*.38,h*.07,0,0,7);c.fill();c.fillStyle=`hsl(${hu},55%,68%)`;c.beginPath();c.ellipse(cx,cy-h*.015,w*.34,h*.05,0,0,7);c.fill();
  const br=1+Math.sin(t*2)*.02,R=w*.2,by=cy-h*.07,fur="#f6e0bf";
  c.strokeStyle="#f0d5b0";c.lineWidth=R*.25;c.lineCap="round";c.beginPath();c.moveTo(cx+R*.8,by+R*.3);c.quadraticCurveTo(cx+R*1.5,by+R*.2+Math.sin(t*3)*R*.3,cx+R*1.3,by-R*.4+Math.sin(t*3)*R*.4);c.stroke();c.lineCap="butt";
  c.fillStyle=fur;c.beginPath();c.ellipse(cx,by,R*br,R*.75*br,0,0,7);c.fill();
  const hx=cx-R*.55,hy=by-R*.45;c.fillStyle=fur;
  for(const k of [-1,1]){c.beginPath();c.moveTo(hx+k*R*.45,hy-R*.2);c.lineTo(hx+k*R*.38,hy-R*.75);c.lineTo(hx+k*R*.05,hy-R*.4);c.fill();}
  c.fillStyle="#f9c0c0";for(const k of [-1,1]){c.beginPath();c.moveTo(hx+k*R*.36,hy-R*.3);c.lineTo(hx+k*R*.33,hy-R*.6);c.lineTo(hx+k*R*.15,hy-R*.4);c.fill();}
  c.fillStyle=fur;circ(c,hx,hy,R*.5);c.fill();
  c.strokeStyle="#e2b98a";c.lineWidth=3;for(let i=-1;i<=1;i++){c.beginPath();c.moveTo(hx+i*R*.12,hy-R*.45);c.lineTo(hx+i*R*.1,hy-R*.3);c.stroke();}
  const blink=(t%4)<.18;c.strokeStyle="#3a2a1a";c.fillStyle="#3a2a1a";c.lineWidth=3;
  for(const k of [-1,1]){if(blink){c.beginPath();c.arc(hx+k*R*.18,hy-R*.02,R*.08,0,Math.PI);c.stroke();}else{c.fillStyle="#3a2a1a";circ(c,hx+k*R*.18,hy-R*.02,R*.075);c.fill();c.fillStyle="#fff";circ(c,hx+k*R*.18+R*.025,hy-R*.05,R*.025);c.fill();}}
  c.fillStyle="#f28c8c";c.beginPath();c.moveTo(hx-R*.05,hy+R*.12);c.lineTo(hx+R*.05,hy+R*.12);c.lineTo(hx,hy+R*.18);c.fill();
  c.strokeStyle="#3a2a1a";c.lineWidth=2;c.beginPath();c.arc(hx-R*.06,hy+R*.2,R*.06,0,Math.PI);c.stroke();c.beginPath();c.arc(hx+R*.06,hy+R*.2,R*.06,0,Math.PI);c.stroke();
  c.strokeStyle="rgba(80,60,40,.6)";c.lineWidth=1.2;for(const k of [-1,1])for(let j=0;j<2;j++){c.beginPath();c.moveTo(hx+k*R*.2,hy+R*.15+j*R*.06);c.lineTo(hx+k*R*.62,hy+R*.1+j*R*.12);c.stroke();}
  c.fillStyle="rgba(255,150,150,.35)";circ(c,hx-R*.3,hy+R*.12,R*.08);c.fill();circ(c,hx+R*.3,hy+R*.12,R*.08);c.fill();
  c.font=`bold ${Math.round(w*.06)}px sans-serif`;for(let i=0;i<4;i++){const ph=fr(t*.3+i*.25),x=hx+R*.4+Math.sin(ph*6+i)*R*.2,y=hy-R*.6-ph*h*.2,z=w*.06;c.globalAlpha=1-ph;if(i%2){c.drawImage(svgImg("heart","#ff6b9a"),x-z*.2,y-z,z,z);}else{c.fillStyle="#7a8fb8";c.fillText("Z",x,y);}}c.globalAlpha=1;
},
gym(c,w,h,t,s,hu){
  c.fillStyle=lg(c,0,h,["#1d1f24","#2b2e35"]);c.fillRect(0,0,w,h);
  for(let i=0;i<4;i++){c.fillStyle="rgba(255,255,255,.05)";c.fillRect(i*w/4+6,h*.08,w/4-12,h*.45);}
  c.fillStyle=`hsl(${hu},90%,55%)`;c.font=`900 ${Math.round(w*.11)}px sans-serif`;c.globalAlpha=.16;c.textAlign="center";c.fillText("NO DAYS OFF",w/2,h*.3);c.globalAlpha=1;
  c.fillStyle="#111";c.fillRect(0,h*.8,w,h*.2);c.fillStyle="#2a2a2a";for(let i=0;i<6;i++)c.fillRect(i*w/6,h*.8,2,h*.2);
  c.fillStyle="#555";c.fillRect(w*.12,h*.25,w*.04,h*.55);c.fillRect(w*.84,h*.25,w*.04,h*.55);
  const ph=(Math.sin(t*1.6)+1)/2,rep=Math.floor((t*1.6+Math.PI/2)/(Math.PI*2))%12+1,hip=h*(.5+ph*.12),sh=hip-h*.16,cx=w/2,skin="#f1c9a5";
  c.lineCap="round";c.strokeStyle=skin;c.lineWidth=w*.035;c.beginPath();c.moveTo(cx,hip);c.lineTo(cx+w*.08*ph+w*.02,hip+h*.1);c.lineTo(cx,h*.79);c.stroke();
  c.strokeStyle=`hsl(${hu+200},70%,55%)`;c.lineWidth=w*.08;c.beginPath();c.moveTo(cx,hip);c.lineTo(cx,sh);c.stroke();
  c.fillStyle=skin;circ(c,cx,sh-h*.045,w*.05);c.fill();c.fillStyle="#222";c.beginPath();c.arc(cx,sh-h*.05,w*.052,Math.PI,0);c.fill();
  c.strokeStyle="#bbb";c.lineWidth=5;c.beginPath();c.moveTo(w*.08,sh);c.lineTo(w*.92,sh);c.stroke();
  [[.12,`hsl(${hu},80%,50%)`],[.17,"#222"],[.83,"#222"],[.88,`hsl(${hu},80%,50%)`]].forEach(([x,cl])=>{c.fillStyle=cl;rr(c,w*x-w*.025,sh-h*.07,w*.05,h*.14,4);c.fill();});
  c.strokeStyle=skin;c.lineWidth=w*.03;c.beginPath();c.moveTo(cx,sh+h*.01);c.lineTo(cx-w*.12,sh);c.moveTo(cx,sh+h*.01);c.lineTo(cx+w*.12,sh);c.stroke();c.lineCap="butt";
  c.fillStyle="rgba(0,0,0,.55)";rr(c,w*.06,h*.86,w*.3,h*.08,10);c.fill();c.fillStyle="#fff";c.font=`bold ${Math.round(w*.06)}px sans-serif`;c.textAlign="left";c.fillText("REP "+rep,w*.1,h*.915);
  c.fillStyle=`hsl(${hu},90%,60%)`;c.fillText("120kg",w*.7,h*.915);
},
story(c,w,h,t,s,hu){const lines=STORYS[s%STORYS.length];
  c.fillStyle=lg(c,0,h,[`hsl(${hu+220},40%,16%)`,`hsl(${hu+260},40%,8%)`]);c.fillRect(0,0,w,h);
  const per=1.7,cyc=lines.length*per+3,tt=t%cyc,n=Math.min(lines.length,Math.floor(tt/per)+1),fs=Math.max(11,Math.round(w*.045));
  c.font=`600 ${fs}px sans-serif`;const mw=w*.6,lh=fs*1.3,bs=[];
  for(let i=0;i<n;i++){const ls=wrapLines(c,lines[i],mw);const bw=Math.max(...ls.map(l=>c.measureText(l).width))+fs*1.2,bh=ls.length*lh+fs*.8;bs.push({ls,bw,bh,right:i%3===1});}
  let total=bs.reduce((a,b)=>a+b.bh+fs*.6,0)+(n<lines.length?fs*2.4:0),y=Math.min(h*.2,h*.82-total);
  for(const b of bs){const x=b.right?w*.92-b.bw:w*.08;c.fillStyle=b.right?`hsl(${hu+330},85%,58%)`:"rgba(255,255,255,.14)";rr(c,x,y,b.bw,b.bh,fs*.8);c.fill();c.fillStyle="#fff";b.ls.forEach((l,k)=>c.fillText(l,x+fs*.6,y+fs*.4+lh*(k+.78)));y+=b.bh+fs*.6;}
  if(n<lines.length){c.fillStyle="rgba(255,255,255,.14)";rr(c,w*.08,y,fs*3.4,fs*1.8,fs*.9);c.fill();for(let k=0;k<3;k++){c.fillStyle=`rgba(255,255,255,${.4+.6*Math.abs(Math.sin(t*5+k))})`;circ(c,w*.08+fs*(.9+k*.8),y+fs*.9,fs*.18);c.fill();}}
}};
const STORYS=[["so this happened today 😭","i ordered coffee and the barista wrote my name as 'Nae-Moe'","then they called it out like 5 times","i didn't answer bc i didn't know it was me","the whole line was staring","i just left. no coffee. 💀"],
["storytime: my neighbor's parrot","it learned my ringtone","so every morning at 6am i think someone's calling","i've missed real calls because of this","the parrot is winning"],
["first day at my new job","walked in super confidently","straight into the supply closet","the door locked behind me","my manager found me 20 min later","i'm employee of the month now somehow"]];
function wrapLines(c,txt,mw){const out=[];let line="";for(const wd of txt.split(" ")){const t=line?line+" "+wd:wd;if(c.measureText(t).width>mw&&line){out.push(line);line=wd;}else line=t;}out.push(line);return out;}
function rr(c,x,y,w,h,r){r=Math.min(r,w/2,h/2);c.beginPath();c.moveTo(x+r,y);c.arcTo(x+w,y,x+w,y+h,r);c.arcTo(x+w,y+h,x,y+h,r);c.arcTo(x,y+h,x,y,r);c.arcTo(x,y,x+w,y,r);c.closePath();}
function drawPost(p,c,w,h,t){const f=SC[p.scene]||SC.lava,vw=w>h*.8?h*.6:w;if(vw<w-2){c.fillStyle="#000";c.fillRect(0,0,w,h);c.save();c.translate((w-vw)/2,0);c.beginPath();c.rect(0,0,vw,h);c.clip();f(c,vw,h,t,p.seed%1000,p.hue);c.restore();}else f(c,w,h,t,p.seed%1000,p.hue);}
function drawFull(p,c,w,h,t){filmLook(c,w,h,t,()=>drawFull0(p,c,w,h,t));}
function drawFull0(p,c,w,h,t){
  if(p.duetOf){const o=getPost(p.duetOf);c.save();c.beginPath();c.rect(0,0,w/2,h);c.clip();if(o)drawPost(o,c,w/2,h,t);c.restore();
    c.save();c.translate(w/2,0);c.beginPath();c.rect(0,0,w/2,h);c.clip();drawPost(p,c,w/2,h,t);c.restore();c.fillStyle="#000";c.fillRect(w/2-1,0,2,h);}
  else drawPost(p,c,w,h,t);}
const THC={};
function thumb(p){if(!p)return"";if(p.thumb&&p.media)return p.thumb;const rv=realOf(p);if(rv&&rv.poster)return rv.poster;if(THC[p.id])return THC[p.id];const cv=document.createElement("canvas");cv.width=180;cv.height=240;const c=cv.getContext("2d");
  drawFull(p,c,180,240,2+(p.seed%5));
  if(p.ov){c.font="bold 15px sans-serif";c.textAlign="center";c.lineWidth=3;c.strokeStyle="rgba(0,0,0,.7)";c.fillStyle="#fff";wrapText(c,p.ov,90,95,160,18);}
  return THC[p.id]=cv.toDataURL("image/jpeg",.72);}
function wrapText(c,txt,x,y,mw,lh){wrapLines(c,txt,mw).forEach((l,i)=>{c.strokeText(l,x,y+i*lh);c.fillText(l,x,y+i*lh);});}

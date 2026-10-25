const fr=x=>x-Math.floor(x);
const NZ=s=>i=>fr(Math.sin(i*127.1+s*311.7)*43758.5453);
function lg(c,y0,y1,st){const g=c.createLinearGradient(0,y0,0,y1);st.forEach((s,i)=>g.addColorStop(i/(st.length-1),s));return g;}
function circ(c,x,y,r){c.beginPath();c.arc(x,y,Math.max(0,r),0,Math.PI*2);}
function steam(c,cx,cy,R,h,t){c.strokeStyle="rgba(255,255,255,.22)";c.lineWidth=Math.max(3,R*.05);c.lineCap="round";
  for(let i=0;i<4;i++){c.beginPath();const bx=cx-R*.4+i*R*.27,o=(t*.25+i*.27)%1;for(let k=0;k<24;k++){const p=k/24,y=cy-R*.1-(p*.5+o*.3)*h*.45,x=bx+Math.sin(p*6+t*1.5+i)*R*.08;k?c.lineTo(x,y):c.moveTo(x,y);}c.stroke();}c.lineCap="butt";}
const SC={
sunset(c,w,h,t,s,hu){const N=NZ(s);
  c.fillStyle=lg(c,0,h,[`hsl(${hu+250},55%,20%)`,`hsl(${hu+320},70%,45%)`,`hsl(${hu+15},95%,62%)`,`hsl(${hu+35},95%,70%)`]);c.fillRect(0,0,w,h);
  const sy=h*.58,r=w*.22;const gl=c.createRadialGradient(w/2,sy,r*.5,w/2,sy,r*3);gl.addColorStop(0,"rgba(255,230,160,.55)");gl.addColorStop(1,"rgba(255,200,150,0)");c.fillStyle=gl;c.fillRect(0,0,w,h);
  c.fillStyle=lg(c,sy-r,sy+r,["#fff6b0",`hsl(${hu+345},95%,65%)`]);circ(c,w/2,sy+Math.sin(t*.4)*3,r);c.fill();
  for(let i=0;i<6;i++){const x=fr(N(i)+t*(.008+N(i+9)*.012))*w*1.6-w*.3,y=h*(.1+N(i+3)*.35),cw=w*(.25+N(i+5)*.3);c.fillStyle="rgba(255,215,225,.22)";c.beginPath();c.ellipse(x,y,cw,cw*.12,0,0,7);c.fill();}
  for(let L=0;L<3;L++){c.fillStyle=`hsl(${hu+265},35%,${22-L*7}%)`;c.beginPath();c.moveTo(0,h);const base=h*(.6+L*.08),off=t*(6+L*16);
    for(let x=0;x<=w+6;x+=6){const X=x+off;c.lineTo(x,base-(Math.sin(X*.011+s+L)*.5+Math.sin(X*.027+L*2)*.35+1)*h*.06*(1.5-L*.3));}c.lineTo(w,h);c.fill();}
  c.strokeStyle="rgba(20,10,30,.7)";c.lineWidth=2;for(let i=0;i<4;i++){const bx=fr(N(i+20)+t*.03)*w*1.3-w*.15,by=h*(.25+N(i+21)*.15)+Math.sin(t*2+i)*4,bs=6+N(i)*5,f=Math.sin(t*8+i)*bs*.5;c.beginPath();c.moveTo(bx-bs,by-f);c.lineTo(bx,by);c.lineTo(bx+bs,by-f);c.stroke();}
},
city(c,w,h,t,s,hu){const N=NZ(s);
  c.fillStyle=lg(c,0,h,["#070b22",`hsl(${hu+260},50%,18%)`,`hsl(${hu+300},60%,28%)`]);c.fillRect(0,0,w,h);
  c.fillStyle="rgba(255,255,230,.9)";circ(c,w*.78,h*.14,w*.07);c.fill();
  for(let L=0;L<2;L++){const cw=w*(L?.22:.16),o=t*(4+L*8),k0=Math.floor(o/cw);
    for(let k=k0;k<k0+w/cw+2;k++){const x=k*cw-o,bw=cw*(.75+N(k*3+L*50)*.25),bh=h*(.25+N(k*5+L*70)*(.38-L*.1)),top=h*.82-bh;
      c.fillStyle=L?"#0b0d1c":"#1d1e3e";c.fillRect(x,top,bw,bh+h);
      if(L){const cols=Math.max(2,bw/10|0),rows=bh/13|0;for(let i=0;i<cols;i++)for(let j=0;j<rows;j++){const q=N(k*97+i*13+j*7);if(q>.5&&N(k*7+i+j*3+Math.floor(t*.7))<.985){c.fillStyle=q>.85?"#ffd98a":"rgba(255,220,140,.7)";c.fillRect(x+4+i*((bw-8)/cols),top+6+j*13,3.5,5);}}}}}
  const gl=c.createLinearGradient(0,h*.8,0,h);gl.addColorStop(0,`hsla(${hu+320},80%,55%,.35)`);gl.addColorStop(1,"rgba(0,0,0,.9)");c.fillStyle=gl;c.fillRect(0,h*.82,w,h*.18);
  for(let i=0;i<6;i++){const x=fr(N(i+40)+t*(.05+N(i)*.05)*(i%2?1:-1))*w;c.fillStyle=i%2?"rgba(255,60,60,.9)":"rgba(255,250,220,.95)";c.fillRect(x,h*.86+(i%2)*8,10,3);}
  c.strokeStyle="rgba(180,200,255,.35)";c.lineWidth=1;c.beginPath();for(let i=0;i<90;i++){const x=fr(N(i)+t*.02)*w,y=fr(N(i+100)+t*.9*(.8+N(i+3)*.4))*h;c.moveTo(x,y);c.lineTo(x-3,y+14);}c.stroke();
},
ocean(c,w,h,t,s,hu){const N=NZ(s);
  c.fillStyle=lg(c,0,h*.55,["#030516",`hsl(${hu%60+220},60%,16%)`,`hsl(${hu%60+240},55%,30%)`]);c.fillRect(0,0,w,h);
  for(let i=0;i<70;i++){c.fillStyle=`rgba(255,255,255,${.3+.7*fr(N(i)+t*.2*N(i+1))})`;c.fillRect(N(i+5)*w,N(i+9)*h*.5,1.6,1.6);}
  const mx=w*.5,my=h*.24,mr=w*.1;const g=c.createRadialGradient(mx,my,mr*.5,mx,my,mr*4);g.addColorStop(0,"rgba(220,230,255,.5)");g.addColorStop(1,"rgba(220,230,255,0)");c.fillStyle=g;c.fillRect(0,0,w,h);c.fillStyle="#eef2ff";circ(c,mx,my,mr);c.fill();
  for(let L=0;L<6;L++){const base=h*(.55+L*.075);c.fillStyle=`hsl(${hu%60+215},60%,${24-L*3}%)`;c.beginPath();c.moveTo(0,h);
    for(let x=0;x<=w+5;x+=5)c.lineTo(x,base+Math.sin(x*.02+t*(1+L*.3)+L)*h*.008*(L+1)+Math.sin(x*.05-t*1.7)*2);c.lineTo(w,h);c.fill();
    c.fillStyle="rgba(230,240,255,.5)";for(let k=0;k<4;k++){const ww=w*.08*(1-k*.15)*(.6+.4*Math.sin(t*3+L+k));c.fillRect(mx-ww/2+Math.sin(t*2+k+L)*6,base+5+k*6,ww,1.5);}}
},
space(c,w,h,t,s,hu){const N=NZ(s);c.fillStyle="#02020a";c.fillRect(0,0,w,h);
  const nb=c.createRadialGradient(w*.7,h*.3,0,w*.7,h*.3,w*.9);nb.addColorStop(0,`hsla(${hu+260},80%,40%,.45)`);nb.addColorStop(1,"rgba(0,0,0,0)");c.fillStyle=nb;c.fillRect(0,0,w,h);
  for(let i=0;i<170;i++){const z=fr(N(i)-t*.08)+.02,x=w/2+(N(i+300)-.5)*w*.6/z,y=h/2+(N(i+600)-.5)*h*.6/z;if(x<0||x>w||y<0||y>h)continue;const sz=Math.min(3,.6/z);c.fillStyle=`rgba(255,255,255,${Math.min(1,(1-z)*1.5)})`;c.fillRect(x,y,sz,sz);}
  const px=w*.3,py=h*.78,pr=w*.33;const ring=(a,b)=>{c.save();c.translate(px,py);c.rotate(-.35);c.strokeStyle=`hsla(${hu+40},70%,75%,.8)`;c.lineWidth=pr*.08;c.beginPath();c.ellipse(0,0,pr*1.7,pr*.35,0,a,b);c.stroke();c.restore();};
  ring(Math.PI,Math.PI*2);const pg=c.createRadialGradient(px-pr*.4,py-pr*.4,pr*.1,px,py,pr);pg.addColorStop(0,`hsl(${hu+20},80%,70%)`);pg.addColorStop(1,`hsl(${hu},60%,18%)`);c.fillStyle=pg;circ(c,px,py,pr);c.fill();ring(0,Math.PI);
},
neon(c,w,h,t,s,hu){const hz=h*.58;const sky=lg(c,0,hz,["#12002b",`hsl(${hu%40+290},80%,30%)`,`hsl(${hu%40+320},90%,55%)`]);c.fillStyle=sky;c.fillRect(0,0,w,hz);
  const r=w*.3,cy=hz-r*.35;c.fillStyle=lg(c,cy-r,cy+r,["#ffe66b","#ff3c8e"]);circ(c,w/2,cy,r);c.fill();
  c.fillStyle=sky;for(let i=0;i<7;i++){const y=cy+r*(.05+i*.14)+(t*8)%(r*.14);c.fillRect(0,y,w,2+i*1.6);}
  c.fillStyle=lg(c,hz,h,["#1a0033","#05000f"]);c.fillRect(0,hz,w,h-hz);
  c.fillStyle="#2a0750";c.beginPath();c.moveTo(0,hz);for(let x=0;x<=w;x+=w/16)c.lineTo(x,hz-Math.abs(Math.sin(x*.02+s))*h*.07);c.lineTo(w,hz);c.fill();
  c.strokeStyle="#ff3cf0";c.shadowColor="#ff3cf0";c.shadowBlur=8;c.lineWidth=1.5;c.beginPath();
  for(let i=-12;i<=12;i++){c.moveTo(w/2+i*w*.02,hz);c.lineTo(w/2+i*w*.25,h);}
  const ph=(t*.8)%1;for(let k=0;k<14;k++){const d=(k+ph)/14,y=hz+(h-hz)*d*d;c.moveTo(0,y);c.lineTo(w,y);}c.stroke();c.shadowBlur=0;
},
aurora(c,w,h,t,s,hu){const N=NZ(s);c.fillStyle=lg(c,0,h,["#020617","#06203a","#0b3550"]);c.fillRect(0,0,w,h);
  for(let i=0;i<90;i++){c.fillStyle=`rgba(255,255,255,${.4+.6*fr(N(i)+t*.3)})`;c.fillRect(N(i+3)*w,N(i+7)*h*.6,1.5,1.5);}
  c.globalCompositeOperation="lighter";const cols=[`hsla(${140+hu%40},90%,60%,`,`hsla(${175+hu%40},90%,60%,`,"hsla(290,80%,65%,"];
  for(let r=0;r<3;r++)for(let x=0;x<w;x+=3){const y=h*(.18+r*.09)+Math.sin(x*.008+t*.5+r*2+s)*h*.07+Math.sin(x*.023-t*.4+r)*h*.025,len=h*(.18+.08*Math.sin(x*.03+t+r)),a=.1+.08*Math.sin(x*.05+t*2+r);c.fillStyle=cols[r]+a+")";c.fillRect(x,y,3,len);c.fillStyle=cols[r]+a*.7+")";c.fillRect(x,y+len*.1,3,len*.45);}
  c.globalCompositeOperation="source-over";
  c.fillStyle="#dbe7f5";c.beginPath();c.moveTo(0,h);for(let x=0;x<=w;x+=8)c.lineTo(x,h*.78+Math.sin(x*.012+s)*h*.03);c.lineTo(w,h);c.fill();
  c.fillStyle="#04121e";for(let i=0;i<12;i++){const x=N(i+50)*w,b=h*.8+N(i+60)*h*.08,th=h*(.08+N(i+70)*.08),tw=th*.35;c.beginPath();c.moveTo(x,b-th);c.lineTo(x-tw,b);c.lineTo(x+tw,b);c.fill();}
},
fireworks(c,w,h,t,s,hu){const N=NZ(s);c.fillStyle=lg(c,0,h,["#05030f","#140a2a","#2a1240"]);c.fillRect(0,0,w,h);
  c.globalCompositeOperation="lighter";
  for(let k=0;k<5;k++){const P=2.6,ph=(t+k*.53)/P,cyc=Math.floor(ph),age=(ph-cyc)*P,cx=w*(.15+N(k*17+cyc)*.7),cy=h*(.15+N(k*23+cyc)*.35),hh=N(k*31+cyc)*360|0;
    if(age<.5){const y=h*.85-(h*.85-cy)*(age/.5);c.fillStyle=`hsla(${hh},100%,80%,.9)`;c.fillRect(cx-1,y,2,10);continue;}
    const a=age-.5,al=Math.max(0,1-a/2),e=1-Math.exp(-a*2.5);
    for(let i=0;i<48;i++){const an=i/48*Math.PI*2+N(i+k),v=(.7+.3*N(i+k*7))*w*.22;c.fillStyle=`hsla(${hh+N(i)*30},100%,65%,${al})`;circ(c,cx+Math.cos(an)*v*e,cy+Math.sin(an)*v*e+a*a*h*.03,2.2*al+.5);c.fill();}}
  c.globalCompositeOperation="source-over";c.fillStyle="#030208";for(let i=0;i<14;i++){const bw=w/14,bh=h*(.06+N(i+90)*.12);c.fillRect(i*bw,h-bh-h*.05,bw+1,bh+h*.05);}
},
lava(c,w,h,t,s,hu){const N=NZ(s);c.fillStyle=lg(c,0,h,[`hsl(${hu+280},60%,12%)`,`hsl(${hu+320},60%,20%)`]);c.fillRect(0,0,w,h);c.globalCompositeOperation="lighter";
  for(let i=0;i<8;i++){const x=w*(.5+.38*Math.sin(t*.25*(1+N(i))+i*1.7)),y=h*(.5+.42*Math.sin(t*.18*(1+N(i+5))+i*2.3)),r=w*(.3+.18*N(i+9));const g=c.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,`hsla(${hu+i*25},95%,60%,.75)`);g.addColorStop(1,`hsla(${hu+i*25},95%,50%,0)`);c.fillStyle=g;c.fillRect(x-r,y-r,r*2,r*2);}
  c.globalCompositeOperation="source-over";
},
snow(c,w,h,t,s,hu){const N=NZ(s);c.fillStyle=lg(c,0,h,["#1b2a4a","#3d5a80","#8fa9c9"]);c.fillRect(0,0,w,h);
  c.fillStyle="rgba(255,255,240,.9)";circ(c,w*.2,h*.15,w*.06);c.fill();
  for(let L=0;L<2;L++){c.fillStyle=L?"#eef4fb":"#c9d8ea";c.beginPath();c.moveTo(0,h);for(let x=0;x<=w;x+=8)c.lineTo(x,h*(.7+L*.08)+Math.sin(x*.01+L*3+s)*h*.03);c.lineTo(w,h);c.fill();
    for(let i=0;i<8;i++){const x=N(i+L*40)*w,b=h*(.74+L*.09)+N(i+L*44)*h*.03,th=h*(.1+N(i+L*48)*.08)*(L?1.2:.8),tw=th*.32;
      for(let k=0;k<3;k++){const yy=b-th*k*.28;c.fillStyle=L?"#123524":"#2a4d3e";c.beginPath();c.moveTo(x,yy-th*.5);c.lineTo(x-tw*(1-k*.2),yy);c.lineTo(x+tw*(1-k*.2),yy);c.fill();c.fillStyle="rgba(255,255,255,.85)";c.beginPath();c.moveTo(x,yy-th*.5);c.lineTo(x-tw*.3,yy-th*.34);c.lineTo(x+tw*.3,yy-th*.34);c.fill();}}}
  const cx=w*.55,cy=h*.86;c.fillStyle="#4a2c1a";c.fillRect(cx,cy-h*.07,w*.24,h*.07);c.fillStyle="#f4f8fc";c.beginPath();c.moveTo(cx-8,cy-h*.07);c.lineTo(cx+w*.12,cy-h*.125);c.lineTo(cx+w*.24+8,cy-h*.07);c.fill();
  const fl=.85+.15*Math.sin(t*6);c.fillStyle=`rgba(255,190,90,${fl})`;c.fillRect(cx+w*.04,cy-h*.05,w*.05,h*.025);c.fillRect(cx+w*.15,cy-h*.05,w*.05,h*.025);
  const gl=c.createRadialGradient(cx+w*.12,cy-h*.04,0,cx+w*.12,cy-h*.04,w*.3);gl.addColorStop(0,"rgba(255,190,90,.3)");gl.addColorStop(1,"rgba(255,190,90,0)");c.fillStyle=gl;c.fillRect(cx-w*.2,cy-h*.25,w*.65,h*.35);
  c.fillStyle="#fff";for(let i=0;i<140;i++){const z=.4+N(i)*.6,x=fr(N(i+200)+t*.01*z)*w+Math.sin(t+i)*4,y=fr(N(i+400)+t*.06*z)*h;circ(c,x,y,z*2.2);c.fill();}
},
ramen(c,w,h,t,s,hu){const N=NZ(s);c.fillStyle="#6b4226";c.fillRect(0,0,w,h);c.strokeStyle="rgba(40,20,10,.35)";c.lineWidth=2;
  for(let i=0;i<18;i++){c.beginPath();const y=i*h/18;c.moveTo(0,y);for(let x=0;x<=w;x+=20)c.lineTo(x,y+Math.sin(x*.02+i)*4);c.stroke();}
  const cx=w/2,cy=h*.52,R=w*.44;c.fillStyle="rgba(0,0,0,.35)";circ(c,cx+8,cy+12,R);c.fill();c.fillStyle="#1d1d22";circ(c,cx,cy,R);c.fill();
  c.strokeStyle="#b8322a";c.lineWidth=R*.05;circ(c,cx,cy,R*.93);c.stroke();
  const br=c.createRadialGradient(cx,cy,0,cx,cy,R*.85);br.addColorStop(0,"#f2c27a");br.addColorStop(1,"#c9873e");c.fillStyle=br;circ(c,cx,cy,R*.85);c.fill();
  c.save();c.translate(cx,cy);c.rotate(t*.06);c.strokeStyle="#ffe6a0";c.lineWidth=3;
  for(let i=0;i<34;i++){const a=N(i)*6.28,rr=R*(.15+N(i+1)*.55);c.beginPath();c.arc(Math.cos(a)*rr*.3,Math.sin(a)*rr*.3,rr*.6,a,a+1.2+N(i+2));c.stroke();}
  for(let k=0;k<2;k++){c.save();c.translate(R*.35,-R*.15+k*R*.34);c.rotate(.4+k*.5);c.fillStyle="#fffaf0";c.beginPath();c.ellipse(0,0,R*.17,R*.13,0,0,7);c.fill();const yg=c.createRadialGradient(0,0,0,0,0,R*.08);yg.addColorStop(0,"#ff8a00");yg.addColorStop(1,"#f5b400");c.fillStyle=yg;circ(c,0,0,R*.08);c.fill();c.restore();}
  for(let k=0;k<2;k++){const x=-R*.35,y=-R*.22+k*R*.4;c.fillStyle="#e8a99a";circ(c,x,y,R*.17);c.fill();c.strokeStyle="#9c5b48";c.lineWidth=2;c.beginPath();c.arc(x,y,R*.1,0,5);c.stroke();}
  c.fillStyle="#16301c";c.fillRect(-R*.05,-R*.78,R*.3,R*.36);c.strokeStyle="#5cbf4a";c.lineWidth=2;for(let i=0;i<14;i++){circ(c,(N(i+30)-.5)*R*.9,(N(i+40)-.5)*R*.9,3);c.stroke();}
  c.restore();c.strokeStyle="#d8b57a";c.lineWidth=6;c.lineCap="round";c.beginPath();c.moveTo(w*.85,h*.1);c.lineTo(w*.5,h*.4);c.moveTo(w*.93,h*.14);c.lineTo(w*.56,h*.44);c.stroke();c.lineCap="butt";
  steam(c,cx,cy,R,h,t);
},
gaming(c,w,h,t,s,hu){const N=NZ(s),px=Math.max(3,w/60|0),o=t*w*.25,gy=h*.72;
  c.fillStyle=lg(c,0,h,[`hsl(${hu%40+190},80%,60%)`,`hsl(${hu%40+200},80%,82%)`]);c.fillRect(0,0,w,h);
  const wrap=(x,m)=>((x%m)+m)%m;
  c.fillStyle="#fff";for(let i=0;i<5;i++){const x=wrap(N(i)*w*2-o*.3,w*2)-w*.3,y=h*(.1+N(i+5)*.3);c.fillRect(x,y,px*10,px*3);c.fillRect(x+px*2,y-px*2,px*5,px*2);}
  c.fillStyle="#3fa34d";for(let i=0;i<4;i++){const x=wrap(i*w*.45-o*.5,w*1.8)-w*.3;circ(c,x,gy,w*.22);c.fill();}
  const ts=px*8,off=o%ts;for(let x=-off;x<w;x+=ts){c.fillStyle="#c46a2b";c.fillRect(x,gy,ts+1,h-gy);c.fillStyle="#5ad04a";c.fillRect(x,gy,ts+1,px*2);c.fillStyle="#8f4a1c";c.fillRect(x+px,gy+px*4,px*2,px*2);c.fillRect(x+px*5,gy+px*7,px*2,px*2);}
  for(let i=0;i<6;i++){const x=wrap(i*w*.35-o,w*2.1),y=gy-h*(.12+(i%3)*.06)+Math.sin(t*3+i)*4,cw=Math.abs(Math.cos(t*4+i))*px*3+1;c.fillStyle="#ffd43b";c.beginPath();c.ellipse(x,y,cw,px*3,0,0,7);c.fill();}
  const jump=Math.abs(Math.sin(t*2.6))*h*.14,hx=w*.3,hy=gy-jump;const leg=Math.floor(t*8)%2;
  const S=["..rrrrr.",".rrrrrrrr","..ssesse.",".sssssss.","..bbbbb..",".bbbbbbb.",leg?"bb.....bb":".bb...bb.",leg?"s.......s":".ss...ss."];
  const col={r:"#7b5cff",s:"#ffd9b8",e:"#222",b:"#ff8a3d"};
  S.forEach((row,j)=>[...row].forEach((ch,i)=>{if(col[ch]){c.fillStyle=col[ch];c.fillRect(hx+i*px,hy-(S.length-j)*px,px,px);}}));
  c.fillStyle="#fff";c.font=`bold ${px*4}px monospace`;c.fillText("SCORE "+String(Math.floor(t*37)%1e6).padStart(6,"0"),px*3,px*9);c.fillStyle="#ffd43b";circ(c,w-px*20,px*7.6,px*1.6);c.fill();c.fillStyle="#fff";c.fillText("x"+(Math.floor(t*1.3)%100),w-px*17,px*9);
},
music(c,w,h,t,s,hu){const N=NZ(s);const g=c.createRadialGradient(w/2,h/2,0,w/2,h/2,h*.7);g.addColorStop(0,`hsl(${hu+260},60%,20%)`);g.addColorStop(1,"#05010d");c.fillStyle=g;c.fillRect(0,0,w,h);
  const cx=w/2,cy=h*.45,R=w*.25,beat=Math.pow(Math.abs(Math.sin(t*Math.PI*1.05)),6);
  for(let i=0;i<40;i++){c.fillStyle=`hsla(${hu+i*9},90%,70%,.5)`;circ(c,N(i)*w,fr(N(i+50)-t*.05*(1+N(i)))*h,1+N(i+9)*2);c.fill();}
  c.lineWidth=Math.max(2,w/110);c.lineCap="round";
  for(let i=0;i<72;i++){const a=i/72*Math.PI*2-Math.PI/2,v=.25+.75*Math.abs(Math.sin(t*3+i*.45)*Math.sin(t*1.7+i*.13))+beat*.3,r1=R*(1+beat*.06),r2=r1+R*.6*v;c.strokeStyle=`hsl(${hu+i*5},90%,62%)`;c.beginPath();c.moveTo(cx+Math.cos(a)*r1,cy+Math.sin(a)*r1);c.lineTo(cx+Math.cos(a)*r2,cy+Math.sin(a)*r2);c.stroke();}c.lineCap="butt";
  const cg=c.createRadialGradient(cx,cy,0,cx,cy,R);cg.addColorStop(0,`hsl(${hu+300},90%,70%)`);cg.addColorStop(1,`hsl(${hu+240},80%,30%)`);c.fillStyle=cg;circ(c,cx,cy,R*(.9+beat*.08));c.fill();
  c.strokeStyle="rgba(0,0,0,.2)";c.lineWidth=1;for(let k=1;k<5;k++){circ(c,cx,cy,R*.18*k);c.stroke();}
  for(let i=0;i<24;i++){const bh=h*.12*(.2+.8*Math.abs(Math.sin(t*4+i*.7)))+beat*h*.03;c.fillStyle=`hsla(${hu+i*8},90%,60%,.8)`;c.fillRect(i*w/24+2,h*.92-bh,w/24-4,bh);}
},
rain(c,w,h,t,s,hu){const N=NZ(s);c.fillStyle=lg(c,0,h,["#0d1424","#1c2338","#2b2033"]);c.fillRect(0,0,w,h);c.globalCompositeOperation="lighter";
  for(let i=0;i<28;i++){const x=N(i)*w+Math.sin(t*.2+i)*6,y=h*(.3+N(i+30)*.6),r=w*(.04+N(i+60)*.08),hh=[30,45,200,320,10][i%5]+hu%30;const g=c.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,`hsla(${hh},90%,60%,.35)`);g.addColorStop(.7,`hsla(${hh},90%,60%,.15)`);g.addColorStop(1,`hsla(${hh},90%,60%,0)`);c.fillStyle=g;c.fillRect(x-r,y-r,2*r,2*r);}
  c.globalCompositeOperation="source-over";
  for(let i=0;i<90;i++){const x=N(i+100)*w,y=N(i+200)*h,r=1+N(i+300)*3.5;c.fillStyle="rgba(200,220,255,.18)";circ(c,x,y,r);c.fill();c.fillStyle="rgba(255,255,255,.5)";circ(c,x-r*.3,y-r*.3,r*.3);c.fill();}
  for(let i=0;i<10;i++){const x=N(i+400)*w,y=fr(N(i+420)+t*(.08+N(i+410)*.12))*h*1.2-h*.1,r=3+N(i+430)*3;c.strokeStyle="rgba(200,220,255,.22)";c.lineWidth=r*.8;c.beginPath();c.moveTo(x,y-h*.15);c.lineTo(x+Math.sin(y*.05)*2,y);c.stroke();c.fillStyle="rgba(220,235,255,.45)";circ(c,x,y,r);c.fill();}
  c.fillStyle="#0a0a12";c.fillRect(w*.5-3,0,6,h);c.fillRect(0,h*.45-3,w,6);
},
coffee(c,w,h,t,s,hu){const N=NZ(s);c.fillStyle=lg(c,0,h,["#d9b99b","#a97f5d"]);c.fillRect(0,0,w,h);
  c.strokeStyle="rgba(90,60,40,.15)";c.lineWidth=2;for(let i=0;i<14;i++){c.beginPath();c.moveTo(0,i*h/14);c.lineTo(w,i*h/14+Math.sin(i)*10);c.stroke();}
  for(let i=0;i<9;i++){const x=N(i)*w,y=N(i+9)*h;if(Math.hypot(x-w/2,y-h*.48)<w*.5)continue;c.save();c.translate(x,y);c.rotate(N(i+3)*6);c.fillStyle="#3b2414";c.beginPath();c.ellipse(0,0,9,6,0,0,7);c.fill();c.strokeStyle="#1d1009";c.beginPath();c.moveTo(-7,0);c.quadraticCurveTo(0,3,7,0);c.stroke();c.restore();}
  const cx=w*.5,cy=h*.48,R=w*.33;c.fillStyle="rgba(0,0,0,.18)";circ(c,cx+10,cy+14,R*1.38);c.fill();c.fillStyle="#f4efe9";circ(c,cx,cy,R*1.35);c.fill();c.strokeStyle="#e2d9cf";c.lineWidth=3;circ(c,cx,cy,R*1.12);c.stroke();
  c.fillStyle="#fff";c.fillRect(cx+R*.85,cy-R*.14,R*.5,R*.28);circ(c,cx,cy,R);c.fill();
  const cg=c.createRadialGradient(cx,cy,0,cx,cy,R*.82);cg.addColorStop(0,"#c08a5b");cg.addColorStop(1,"#5e3519");c.fillStyle=cg;circ(c,cx,cy,R*.82);c.fill();
  c.save();c.translate(cx,cy+R*.05);c.rotate(Math.sin(t*.4)*.25);const k=R*.55;c.fillStyle="rgba(250,240,225,.95)";c.beginPath();c.moveTo(0,k*.75);c.bezierCurveTo(-k*1.3,-k*.1,-k*.6,-k*1.05,0,-k*.35);c.bezierCurveTo(k*.6,-k*1.05,k*1.3,-k*.1,0,k*.75);c.fill();
  c.strokeStyle="rgba(120,70,40,.5)";c.lineWidth=2;for(let i=1;i<4;i++){c.beginPath();c.ellipse(0,-k*.2,k*.2*i,k*.13*i,0,0,7);c.stroke();}c.restore();
  steam(c,cx,cy,R,h,t);
},

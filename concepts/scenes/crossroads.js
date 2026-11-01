/* Concept A - The Crossroads (refined). The paladin stands at the fork; a ruined gate on the hill frames the highlight reel.
   Signposts = sections. Click the paladin for the character sheet. */
PF.init({
  theme:'crossroads',
  reel:{x:624,y:190,w:352,h:198},
  flavor:{
    games:{name:'Quest Log',sub:'Games, jams and shipped titles'},
    docs:{name:'Tome Shelf',sub:'Fan GDDs and systems logs'},
    art:{name:'Workshop',sub:'3D models you can rotate'},
    about:{name:'Character Sheet',sub:'About me, experience, education'},
    contact:{name:'Send a Raven',sub:'Email, CV and message form'}
  },
  draw:function(svg,P){
    var el=P.el,rnd=P.rnd;
    P.defs(
      '<linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0a1620"/><stop offset=".55" stop-color="#1d3030"/><stop offset=".82" stop-color="#6e5a2e"/><stop offset="1" stop-color="#d9a441"/></linearGradient>'+
      '<radialGradient id="halo"><stop offset="0" stop-color="#ffd88a" stop-opacity=".55"/><stop offset="1" stop-color="#c8922a" stop-opacity="0"/></radialGradient>'+
      '<radialGradient id="lantern"><stop offset="0" stop-color="#ffd27a" stop-opacity=".95"/><stop offset="1" stop-color="#ffb347" stop-opacity="0"/></radialGradient>'+
      '<linearGradient id="ground" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1c3022"/><stop offset="1" stop-color="#08120c"/></linearGradient>'+
      '<linearGradient id="road" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8a7248"/><stop offset="1" stop-color="#4c3f2b"/></linearGradient>'+
      '<linearGradient id="stone" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#4a5159"/><stop offset=".5" stop-color="#6c747c"/><stop offset="1" stop-color="#3a4046"/></linearGradient>'+
      '<linearGradient id="steel" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#9aa4b0"/><stop offset="1" stop-color="#4a525c"/></linearGradient>'+
      '<linearGradient id="cape" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9a2e36"/><stop offset="1" stop-color="#5c1a20"/></linearGradient>'+
      '<linearGradient id="mist" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e8b85a" stop-opacity="0"/><stop offset=".5" stop-color="#e8b85a" stop-opacity=".16"/><stop offset="1" stop-color="#e8b85a" stop-opacity="0"/></linearGradient>'+
      '<radialGradient id="vig" cx=".5" cy=".5" r=".75"><stop offset=".6" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".62"/></radialGradient>'
    );
    function pine(g,x,base,h,wf,fill){
      var w=h*wf,y=function(f){return base-h*f};
      var R=[[.30,.66],[.16,.66],[.46,.36],[.26,.36],[.62,.08]];
      var right=R.map(function(r){return [x+w*r[0],y(r[1])]});
      var left=R.map(function(r){return [x-w*r[0],y(r[1])]}).reverse();
      var pts=[[x,y(1)]].concat(right,[[x+w*.08,base],[x-w*.08,base]],left);
      el('polygon',{points:pts.map(function(p){return p.join(',')}).join(' '),fill:fill},g);
    }
    function ribbon(p0,p1,p2,w0,w1){
      var n=24,L=[],R=[];
      for(var i=0;i<=n;i++){
        var t=i/n,u=1-t;
        var x=u*u*p0[0]+2*u*t*p1[0]+t*t*p2[0],y=u*u*p0[1]+2*u*t*p1[1]+t*t*p2[1];
        var dx=2*u*(p1[0]-p0[0])+2*t*(p2[0]-p1[0]),dy=2*u*(p1[1]-p0[1])+2*t*(p2[1]-p1[1]);
        var len=Math.hypot(dx,dy)||1,nx=-dy/len,ny=dx/len,w=(w0+(w1-w0)*t)/2;
        L.push([x+nx*w,y+ny*w*.45]);R.push([x-nx*w,y-ny*w*.45]);
      }
      return 'M'+L.map(function(p){return p.join(' ')}).join('L')+'L'+R.reverse().map(function(p){return p.join(' ')}).join('L')+'Z';
    }

    /* sky + glow behind the gate */
    var sky=P.layer(.2);
    el('rect',{x:-200,y:-200,width:2000,height:760,fill:'url(#sky)'},sky);
    for(var s=0;s<40;s++)el('circle',{cx:rnd()*1600,cy:rnd()*260,r:.8+rnd()*1.2,fill:'#fff',opacity:.25+rnd()*.5},sky);
    el('ellipse',{cx:800,cy:300,rx:520,ry:300,fill:'url(#halo)'},sky);

    /* far + mid forest */
    var far=P.layer(.5);
    el('path',{d:'M-200 470 L0 380 L180 440 L380 320 L600 450 L800 400 L1000 450 L1220 330 L1420 440 L1600 390 L1800 450 L1800 520 L-200 520Z',fill:'#16302d',opacity:.9},far);
    for(var x=-100;x<1700;x+=36)pine(far,x+rnd()*14,470,70+rnd()*60,.2,'#0f241f');
    var mid=P.layer(.9);
    for(var x2=-120;x2<1720;x2+=66){if(x2>470&&x2<1130)continue;pine(mid,x2+rnd()*20,490,150+rnd()*120,.22,'#0b1c17')}

    /* the gate (static so the reel stays aligned) */
    var gate=el('g',{},svg);
    el('ellipse',{cx:800,cy:462,rx:360,ry:56,fill:'#0d1d17'},gate);
    el('ellipse',{cx:800,cy:454,rx:330,ry:40,fill:'#142a20'},gate);
    /* steps */
    el('rect',{x:600,y:396,width:400,height:20,fill:'#4b535b'},gate);
    el('rect',{x:580,y:416,width:440,height:20,fill:'#3d444b'},gate);
    el('rect',{x:560,y:436,width:480,height:20,fill:'#30363c'},gate);
    /* pillars */
    function pillar(x,broken){
      var g=el('g',{},gate);
      el('rect',{x:x,y:broken?170:150,width:76,height:broken?232:252,fill:'url(#stone)',stroke:'#23282d','stroke-width':2},g);
      for(var i=0;i<6;i++)el('line',{x1:x,y1:(broken?190:170)+i*38,x2:x+76,y2:(broken?190:170)+i*38,stroke:'#2a3036','stroke-width':2,opacity:.7},g);
      el('rect',{x:x-8,y:394,width:92,height:14,fill:'#5b636b',stroke:'#23282d'},g);
      /* rune lights */
      [0,1,2].forEach(function(i){var c=el('circle',{class:'flicker',cx:x+38,cy:232+i*54,r:5,fill:'#f0bf5a'},g);c.style.animationDelay=(-i*.7)+'s'});
      return g;
    }
    pillar(548,false);pillar(976,true);
    /* lintel */
    el('path',{d:'M524 128 L1076 128 L1076 150 L1050 190 L550 190 L524 150Z',fill:'url(#stone)',stroke:'#23282d','stroke-width':2},gate);
    el('path',{d:'M790 128 l-8 22 l12 12 l-6 28',fill:'none',stroke:'#23282d','stroke-width':2},gate);
    el('circle',{cx:800,cy:158,r:14,fill:'none',stroke:'#f0bf5a','stroke-width':2.5},gate);
    el('path',{d:'M800 148 l6 10 -6 10 -6 -10z',fill:'#f0bf5a'},gate);
    /* vines */
    el('path',{d:'M552 190 q-14 40 6 80 q-16 30 -4 70',fill:'none',stroke:'#2e5a3a','stroke-width':5,'stroke-linecap':'round'},gate);
    el('path',{d:'M1040 190 q14 36 -6 70 q16 40 2 90',fill:'none',stroke:'#2e5a3a','stroke-width':5,'stroke-linecap':'round'},gate);
    /* reel inner shadow ring */
    el('rect',{x:622,y:188,width:356,height:202,fill:'none',stroke:'#0a0d10','stroke-width':4,rx:2},gate);

    /* ground, mist, roads */
    var gr=P.layer(1.4);
    el('path',{d:'M-300 478 Q 400 450 800 468 T 1900 478 L1900 1000 L-300 1000Z',fill:'url(#ground)'},gr);
    el('rect',{x:-300,y:440,width:2200,height:100,fill:'url(#mist)'},gr);
    var roads=el('g',{},gr);
    var road=function(d){return el('path',{d:d,fill:'url(#road)',stroke:'#2d2418','stroke-width':2},roads)};
    road(ribbon([800,930],[800,780],[800,596],520,100));
    road(ribbon([796,602],[600,600],[330,664],96,30));
    road(ribbon([798,600],[720,556],[590,540],70,18));
    road(ribbon([802,600],[880,556],[1010,540],70,18));
    road(ribbon([804,602],[1000,600],[1270,664],96,30));
    el('ellipse',{cx:800,cy:604,rx:70,ry:18,fill:'#7a6540'},roads);
    for(var k=0;k<26;k++)el('ellipse',{cx:560+rnd()*480,cy:640+rnd()*220,rx:3+rnd()*5,ry:1.5+rnd()*2,fill:'#3a3022',opacity:.6},roads);

    function sign(key,x,y,s,icon,label){
      var g=el('g',{transform:'translate('+x+','+y+') scale('+s+')'},gr);
      var a=el('g',{class:'hot-art'},g);
      el('ellipse',{cx:0,cy:3,rx:26,ry:6,fill:'#000',opacity:.38},a);
      el('rect',{x:-6,y:-120,width:12,height:120,rx:2,fill:'#5a4125',stroke:'#2d1f10','stroke-width':1.5},a);
      el('circle',{cx:0,cy:-124,r:22,fill:'#1a1208',stroke:'#C8922A','stroke-width':2.5},a);
      P.icon(a,icon,0,-124,26,'#f0bf5a');
      el('path',{d:'M6 -110 H30',stroke:'#2d1f10','stroke-width':3},a);
      el('circle',{class:'flicker',cx:34,cy:-100,r:34,fill:'url(#lantern)'},a);
      el('rect',{x:29,y:-110,width:10,height:16,rx:2,fill:'#ffd27a'},a);
      P.tag(a,label,0,-72);
      P.hot(key,g,{box:[-90,-150,180,160],ping:[0,-124,36]});
    }
    sign('games',330,664,1,'sword','Quest Log');
    sign('docs',590,540,.82,'scroll','Tome Shelf');
    sign('art',1010,540,.82,'gem','Workshop');
    sign('contact',1270,664,1,'feather','Send a Raven');

    /* paladin (seen from behind) = character sheet */
    var pal=P.layer(1.8);
    var pg=el('g',{transform:'translate(800,812) scale(1.05)'},pal);
    var pa=el('g',{class:'hot-art'},pg);
    el('ellipse',{cx:0,cy:2,rx:46,ry:8,fill:'#000',opacity:.4},pa);
    var b=el('g',{class:'breathe'},pa);
    el('path',{d:'M-28 -114 L28 -114 L46 -6 Q0 8 -46 -6Z',fill:'url(#cape)'},b);
    el('path',{d:'M-46 -6 Q0 8 46 -6',fill:'none',stroke:'#C8922A','stroke-width':3},b);
    el('path',{d:'M0 -112 L0 -8',stroke:'#3d1015','stroke-width':2,opacity:.6},b);
    el('rect',{x:-48,y:-104,width:12,height:56,rx:6,fill:'url(#steel)',stroke:'#C8922A','stroke-width':1.5},b);
    el('ellipse',{cx:-30,cy:-112,rx:16,ry:11,fill:'url(#steel)',stroke:'#C8922A','stroke-width':1.5},b);
    el('ellipse',{cx:30,cy:-112,rx:16,ry:11,fill:'url(#steel)',stroke:'#C8922A','stroke-width':1.5},b);
    el('ellipse',{cx:0,cy:-138,rx:18,ry:22,fill:'url(#steel)',stroke:'#C8922A','stroke-width':1.5},b);
    el('path',{d:'M-3 -158 Q 20 -184 6 -200 Q -6 -180 -12 -158Z',fill:'#b3282d'},b);
    el('line',{x1:34,y1:-62,x2:44,y2:-26,stroke:'#cdbf9e','stroke-width':4,'stroke-linecap':'round'},b);
    el('line',{x1:28,y1:-58,x2:46,y2:-64,stroke:'#C8922A','stroke-width':4,'stroke-linecap':'round'},b);
    P.tag(pa,'Character Sheet',0,-232);
    P.hot('about',pg,{box:[-70,-250,140,262],ping:[0,-140,70]});

    /* framing trees, fireflies, vignette */
    var near=P.layer(3.2);
    [-60,50,170].forEach(function(x,i){pine(near,x,930,820-i*120,.2,'#050d0a')});
    [1660,1550,1430].forEach(function(x,i){pine(near,x,930,820-i*120,.2,'#050d0a')});
    P.motes(svg,20,{x0:100,x1:1500,y0:420,y1:800,color:'#ffd27a'});
    el('rect',{x:0,y:0,width:1600,height:900,fill:'url(#vig)','pointer-events':'none'},svg);
  }
});

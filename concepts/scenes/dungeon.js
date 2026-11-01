/* Concept C - The Dungeon. One-point-perspective hall; the arched portal at the far end plays the highlight reel.
   Treasure chest = games, chained tome = documents, forge = 3D art, hero's banner = about, raven = contact. */
PF.init({
  theme:'dungeon',
  reel:{x:610,y:215,w:380,h:240,r:'50% 50% 3px 3px / 42% 42% 3px 3px'},
  flavor:{
    games:{name:'Treasure Chest',sub:'Games, jams and shipped titles'},
    docs:{name:'Chained Tome',sub:'Fan GDDs and systems logs'},
    art:{name:'The Forge',sub:'3D models you can rotate'},
    about:{name:"Hero's Banner",sub:'Character sheet, experience, education'},
    contact:{name:'The Raven',sub:'Email, CV and message form'}
  },
  draw:function(svg,P){
    var el=P.el,rnd=P.rnd,VX=800,VY=310;
    P.defs(
      '<clipPath id="cl"><polygon points="0,0 520,120 520,500 0,900"/></clipPath>'+
      '<clipPath id="cr"><polygon points="1600,0 1080,120 1080,500 1600,900"/></clipPath>'+
      '<clipPath id="cf"><polygon points="0,900 1600,900 1080,500 520,500"/></clipPath>'+
      '<clipPath id="cc"><polygon points="0,0 1600,0 1080,120 520,120"/></clipPath>'+
      '<linearGradient id="wl" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#241f1a"/><stop offset="1" stop-color="#3a332a"/></linearGradient>'+
      '<linearGradient id="wr" x1="1" y1="0" x2="0" y2="0"><stop offset="0" stop-color="#241f1a"/><stop offset="1" stop-color="#3a332a"/></linearGradient>'+
      '<linearGradient id="fl" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#2f2923"/><stop offset="1" stop-color="#171310"/></linearGradient>'+
      '<linearGradient id="fw" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2a261f"/><stop offset="1" stop-color="#16130f"/></linearGradient>'+
      '<radialGradient id="torch"><stop offset="0" stop-color="#ffb347" stop-opacity=".65"/><stop offset=".5" stop-color="#e0742a" stop-opacity=".2"/><stop offset="1" stop-color="#e0742a" stop-opacity="0"/></radialGradient>'+
      '<radialGradient id="fire"><stop offset="0" stop-color="#fff2b8"/><stop offset=".4" stop-color="#ffa24f"/><stop offset="1" stop-color="#e0742a" stop-opacity="0"/></radialGradient>'+
      '<radialGradient id="portal"><stop offset="0" stop-color="#8ff0dc" stop-opacity=".5"/><stop offset="1" stop-color="#2a8f8a" stop-opacity="0"/></radialGradient>'+
      '<radialGradient id="gold"><stop offset="0" stop-color="#ffe08a" stop-opacity=".9"/><stop offset="1" stop-color="#ffb347" stop-opacity="0"/></radialGradient>'+
      '<linearGradient id="iron" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#6b6f75"/><stop offset="1" stop-color="#2a2d31"/></linearGradient>'+
      '<radialGradient id="vig" cx=".5" cy=".5" r=".75"><stop offset=".45" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".8"/></radialGradient>'
    );
    /* ---- static hall structure ---- */
    var hall=el('g',{},svg);
    el('rect',{x:0,y:0,width:1600,height:900,fill:'#0d0b09'},hall);
    el('rect',{x:520,y:120,width:560,height:380,fill:'url(#fw)'},hall);
    for(var ry=0;ry<8;ry++)for(var rx=0;rx<12;rx++){
      el('rect',{x:520+rx*47+(ry%2?-23:0),y:120+ry*48,width:46,height:47,fill:'none',stroke:'#0f0d0a','stroke-width':1.5,opacity:.8},hall);
    }
    var lw=el('g',{'clip-path':'url(#cl)'},hall),rw=el('g',{'clip-path':'url(#cr)'},hall),fl=el('g',{'clip-path':'url(#cf)'},hall),cc=el('g',{'clip-path':'url(#cc)'},hall);
    el('rect',{x:0,y:0,width:520,height:900,fill:'url(#wl)'},lw);
    el('rect',{x:1080,y:0,width:520,height:900,fill:'url(#wr)'},rw);
    el('rect',{x:0,y:500,width:1600,height:400,fill:'url(#fl)'},fl);
    el('rect',{x:0,y:0,width:1600,height:120,fill:'#16130f'},cc);
    /* walls: horizontal courses */
    for(var yf=120;yf<=500;yf+=38){
      var yn=VY+(yf-VY)*2.857;
      el('line',{x1:520,y1:yf,x2:0,y2:yn,stroke:'#0f0d0a','stroke-width':2,opacity:.8},lw);
      el('line',{x1:1080,y1:yf,x2:1600,y2:yn,stroke:'#0f0d0a','stroke-width':2,opacity:.8},rw);
    }
    for(var k=0,sk=1;k<9;k++,sk*=1.14){
      var xl=VX-280*sk;
      el('line',{x1:xl,y1:VY-190*sk,x2:xl,y2:VY+190*sk,stroke:'#0f0d0a','stroke-width':2,opacity:.7},lw);
      el('line',{x1:1600-xl,y1:VY-190*sk,x2:1600-xl,y2:VY+190*sk,stroke:'#0f0d0a','stroke-width':2,opacity:.7},rw);
    }
    /* floor tiles */
    for(var i=1;i<=12;i++){var yy=500+400*Math.pow(i/12,1.7);el('line',{x1:0,y1:yy,x2:1600,y2:yy,stroke:'#0c0a08','stroke-width':2,opacity:.85},fl)}
    for(var xb=-1200;xb<=2800;xb+=200){el('line',{x1:xb,y1:900,x2:VX+(xb-VX)*.322,y2:500,stroke:'#0c0a08','stroke-width':2,opacity:.85},fl)}
    /* carpet */
    el('polygon',{points:'772,500 828,500 1010,900 590,900',fill:'#5a1a1a',stroke:'#c8922a','stroke-width':3,opacity:.92},fl);
    el('polygon',{points:'780,500 820,500 940,900 660,900',fill:'none',stroke:'#c8922a','stroke-width':2,opacity:.55},fl);
    /* ceiling beams */
    for(var b=1;b<4;b++){var yb=120*(1-b*.22);el('line',{x1:0,y1:yb*0,x2:1600,y2:yb*0,stroke:'none'},cc)}
    /* portal glow on floor + frame */
    el('ellipse',{cx:800,cy:520,rx:330,ry:60,fill:'url(#portal)'},hall);
    el('path',{d:'M590 470 V311 A210 108 0 0 1 1010 311 V470Z',fill:'#08141a',stroke:'#40382d','stroke-width':26,'stroke-linejoin':'round'},hall);
    el('path',{d:'M590 470 V311 A210 108 0 0 1 1010 311 V470',fill:'none',stroke:'#7a6e5a','stroke-width':4,transform:'translate(0,0)'},hall);
    el('path',{d:'M586 470 V311 A214 111 0 0 1 1014 311 V470',fill:'none',stroke:'#e0742a','stroke-width':2,opacity:.8},hall);
    for(var g=0;g<9;g++){var ang=Math.PI*(0.12+g*0.095);var ax=800-Math.cos(ang)*212,ay=311-Math.sin(ang)*110;
      var c=el('circle',{class:'flicker',cx:ax,cy:ay,r:3.5,fill:'#8ff0dc'},hall);c.style.animationDelay=(-g*.3)+'s'}
    el('rect',{x:560,y:470,width:480,height:16,fill:'#4a4238',stroke:'#1a1612'},hall);
    el('rect',{x:540,y:486,width:520,height:14,fill:'#3a342b',stroke:'#1a1612'},hall);
    el('path',{d:'M800 110 l10 18 -10 18 -10 -18z',fill:'#e0742a'},hall);

    /* ---- wall torches ---- */
    var tl=P.layer(.3);
    function torch(x,y,s){
      var g=el('g',{transform:'translate('+x+','+y+') scale('+s+')'},tl);
      el('circle',{cx:0,cy:-20,r:150,fill:'url(#torch)'},g);
      el('rect',{x:-5,y:-2,width:10,height:56,rx:3,fill:'url(#iron)'},g);
      el('path',{d:'M-16 -4 h32 l-6 16 h-20z',fill:'#2a2d31',stroke:'#0c0c0c'},g);
      var f=el('g',{class:'flicker'},g);
      el('path',{d:'M0 -58 q22 22 12 42 q-6 8 -12 8 q-18 -6 -12 -26 q4 -10 12 -24z',fill:'url(#fire)'},f);
      el('path',{d:'M0 -36 q8 10 4 20 q-4 4 -8 0 q-4 -10 4 -20z',fill:'#fff2b8'},f);
      f.style.animationDelay=(-rnd()*2)+'s';
    }
    torch(412,300,.7);torch(1188,300,.7);torch(120,280,1.1);torch(1350,300,1.1);torch(640,330,.45);torch(960,330,.45);

    var ob=P.layer(.6);
    /* forge = art (left wall) */
    var fg=el('g',{transform:'translate(240,700)'},ob),fa=el('g',{class:'hot-art'},fg);
    el('ellipse',{cx:0,cy:14,rx:190,ry:20,fill:'#000',opacity:.45},fa);
    el('rect',{x:-110,y:-210,width:220,height:214,fill:'#3a352d',stroke:'#14110d','stroke-width':3},fa);
    for(var br=0;br<5;br++)el('line',{x1:-110,y1:-210+br*43,x2:110,y2:-210+br*43,stroke:'#14110d','stroke-width':2},fa);
    el('rect',{x:-40,y:-300,width:80,height:94,fill:'#2f2a23',stroke:'#14110d','stroke-width':3},fa);
    el('path',{d:'M-62 4 V-96 Q-62 -140 0 -140 Q62 -140 62 -96 V4Z',fill:'#14080a',stroke:'#14110d','stroke-width':4},fa);
    el('ellipse',{cx:0,cy:-40,rx:110,ry:90,fill:'url(#torch)',class:'pulse'},fa);
    var ff=el('g',{class:'flicker'},fa);
    el('path',{d:'M-46 4 q-8 -60 14 -80 q4 26 16 30 q4 -36 24 -48 q6 40 22 56 q14 20 8 42z',fill:'url(#fire)'},ff);
    el('path',{d:'M-22 4 q-4 -30 8 -44 q6 14 14 16 q6 -18 14 -26 q6 24 6 54z',fill:'#fff2b8',opacity:.9},ff);
    var an=el('g',{transform:'translate(-160,0)'},fa);
    el('path',{d:'M-46 -52 h100 q-6 18 -30 20 v14 h20 v22 h-70 v-22 h20 v-14 q-24 -2 -40 -20z',fill:'url(#iron)',stroke:'#0c0c0c','stroke-width':2},an);
    el('line',{x1:20,y1:-52,x2:-20,y2:-96,stroke:'#5a3b22','stroke-width':9,'stroke-linecap':'round',transform:'translate(0,0)'},an);
    el('rect',{x:-36,y:-112,width:34,height:18,rx:3,fill:'url(#iron)',stroke:'#0c0c0c','stroke-width':2,transform:'rotate(-28 -20 -100)'},an);
    P.tag(fa,'The Forge',0,-336);
    P.hot('art',fg,{box:[-225,-325,350,345],ping:[0,-60,100]});

    /* treasure chest = games */
    var ch=el('g',{transform:'translate(470,800)'},ob),ca=el('g',{class:'hot-art'},ch);
    el('ellipse',{cx:0,cy:12,rx:140,ry:18,fill:'#000',opacity:.45},ca);
    el('circle',{cx:0,cy:-70,r:150,fill:'url(#gold)',class:'pulse'},ca);
    el('rect',{x:-100,y:-70,width:200,height:76,rx:6,fill:'#6a3f1e',stroke:'#1f1208','stroke-width':3},ca);
    for(var pl=1;pl<4;pl++)el('line',{x1:-100,y1:-70+pl*19,x2:100,y2:-70+pl*19,stroke:'#3a2210','stroke-width':2},ca);
    el('rect',{x:-100,y:-70,width:200,height:14,fill:'#8a6420'},ca);
    el('rect',{x:-100,y:-4,width:200,height:10,fill:'#8a6420'},ca);
    [-70,70].forEach(function(x){el('rect',{x:x-8,y:-70,width:16,height:76,fill:'#8a6420',stroke:'#3a2a0a','stroke-width':2},ca)});
    el('path',{d:'M-100 -70 L-90 -128 Q0 -158 90 -128 L100 -70Z',fill:'#7a4a24',stroke:'#1f1208','stroke-width':3,transform:'translate(0,-20) rotate(0)'},ca);
    el('path',{d:'M-92 -150 Q0 -178 92 -150',fill:'none',stroke:'#c8922a','stroke-width':8},ca);
    [[-60,-92],[-20,-102],[24,-94],[62,-88],[0,-80],[-40,-78],[40,-78]].forEach(function(c,i){
      el('ellipse',{cx:c[0],cy:c[1],rx:14,ry:7,fill:['#f0bf5a','#ffe08a','#c8922a'][i%3],stroke:'#8a6420','stroke-width':1.5},ca)});
    el('path',{d:'M-30 -112 l6 -10 6 10 -6 8z',fill:'#7fd6c4',stroke:'#2a8f8a'},ca);
    el('path',{d:'M44 -108 l8 -10 8 10 -8 10z',fill:'#e0587a',stroke:'#7a1a3a'},ca);
    el('rect',{x:-12,y:-60,width:24,height:26,rx:3,fill:'#c8922a',stroke:'#3a2a0a','stroke-width':2},ca);
    el('circle',{cx:0,cy:-47,r:4,fill:'#1a1208'},ca);
    P.tag(ca,'Treasure Chest',0,-210);
    P.hot('games',ch,{box:[-130,-230,260,250],ping:[0,-80,84]});

    /* chained tome = docs */
    var tm=el('g',{transform:'translate(1160,790)'},ob),ta=el('g',{class:'hot-art'},tm);
    el('ellipse',{cx:0,cy:12,rx:130,ry:16,fill:'#000',opacity:.45},ta);
    el('path',{d:'M-60 6 L-46 -150 H46 L60 6Z',fill:'#4a4238',stroke:'#14110d','stroke-width':3},ta);
    el('rect',{x:-80,y:-14,width:160,height:20,fill:'#3a342b',stroke:'#14110d','stroke-width':2},ta);
    el('path',{d:'M-100 -150 L100 -150 L84 -170 L-84 -170Z',fill:'#5a5246',stroke:'#14110d','stroke-width':3},ta);
    el('ellipse',{cx:0,cy:-190,rx:130,ry:70,fill:'url(#gold)',class:'pulse'},ta);
    el('path',{d:'M-96 -170 Q-48 -190 0 -172 V-124 Q-48 -140 -96 -126Z',fill:'#efe3c2',stroke:'#8a7248','stroke-width':2.5},ta);
    el('path',{d:'M96 -170 Q48 -190 0 -172 V-124 Q48 -140 96 -126Z',fill:'#e8dab4',stroke:'#8a7248','stroke-width':2.5},ta);
    el('path',{d:'M-84 -162 q36 -12 72 0M-84 -150 q36 -12 72 0M-84 -138 q36 -12 62 0M12 -162 q36 -12 72 0M12 -150 q36 -12 72 0M12 -138 q36 -12 62 0',stroke:'#8a7248','stroke-width':2,fill:'none'},ta);
    el('path',{d:'M-100 -124 Q-48 -140 0 -124 Q48 -140 100 -124 V-114 Q48 -130 0 -114 Q-48 -130 -100 -114Z',fill:'#6b2d3a',stroke:'#2a0f16','stroke-width':2},ta);
    var ch1='M-100 -122 q-34 30 -40 80 q-6 30 -20 40';
    el('path',{d:ch1,fill:'none',stroke:'#8b95a1','stroke-width':6,'stroke-dasharray':'12 6','stroke-linecap':'round'},ta);
    el('path',{d:'M100 -122 q34 30 40 80 q6 30 20 40',fill:'none',stroke:'#8b95a1','stroke-width':6,'stroke-dasharray':'12 6','stroke-linecap':'round'},ta);
    el('circle',{cx:-160,cy:-2,r:9,fill:'none',stroke:'#8b95a1','stroke-width':5},ta);el('circle',{cx:160,cy:-2,r:9,fill:'none',stroke:'#8b95a1','stroke-width':5},ta);
    P.tag(ta,'Chained Tome',0,-250);
    P.hot('docs',tm,{box:[-170,-270,340,290],ping:[0,-150,90]});

    /* hero's banner = about (right wall) */
    var bn=el('g',{transform:'translate(1380,150)'},ob),ba=el('g',{class:'hot-art'},bn);
    el('rect',{x:-70,y:0,width:140,height:10,rx:5,fill:'url(#iron)'},ba);
    el('circle',{cx:-70,cy:5,r:8,fill:'#c8922a'},ba);el('circle',{cx:70,cy:5,r:8,fill:'#c8922a'},ba);
    el('path',{d:'M-58 10 H58 V210 L0 250 L-58 210Z',fill:'#7a1a22',stroke:'#2a0a0e','stroke-width':3},ba);
    el('path',{d:'M-46 22 H46 V204 L0 236 L-46 204Z',fill:'none',stroke:'#c8922a','stroke-width':3},ba);
    el('path',{d:'M0 60 L22 72 V112 Q22 140 0 150 Q-22 140 -22 112 V72Z',fill:'#c8922a'},ba);
    el('path',{d:'M0 78 V138M-12 100 H12',stroke:'#7a1a22','stroke-width':5,'stroke-linecap':'round'},ba);
    el('path',{d:'M-34 190 l8 -16 8 16 M-8 190 l8 -16 8 16 M18 190 l8 -16 8 16',stroke:'#c8922a','stroke-width':3,fill:'none'},ba);
    P.tag(ba,"Hero's Banner",0,284);
    P.hot('about',bn,{box:[-80,-10,160,320],ping:[0,120,90]});

    /* raven = contact (right, on a stone ledge) */
    var rv=el('g',{transform:'translate(1440,690)'},ob),ra=el('g',{class:'hot-art'},rv);
    el('ellipse',{cx:0,cy:10,rx:110,ry:14,fill:'#000',opacity:.45},ra);
    el('rect',{x:-80,y:-30,width:160,height:36,fill:'#4a4238',stroke:'#14110d','stroke-width':3},ra);
    el('rect',{x:-90,y:-44,width:180,height:16,fill:'#5a5246',stroke:'#14110d','stroke-width':3},ra);
    var rb=el('g',{class:'bob'},ra);
    el('ellipse',{cx:0,cy:-86,rx:30,ry:40,fill:'#15121e',stroke:'#05040a','stroke-width':2},rb);
    el('path',{d:'M-20 -70 Q-56 -52 -62 -20 Q-34 -40 -14 -52z',fill:'#0c0a14'},rb);
    el('path',{d:'M-10 -52 l-10 28 8 -2 6 -22z M0 -52 l-2 28 8 -4z',fill:'#0c0a14'},rb);
    el('circle',{cx:14,cy:-118,r:19,fill:'#15121e',stroke:'#05040a','stroke-width':2},rb);
    el('path',{d:'M28 -122 L56 -112 L28 -106z',fill:'#3a3340'},rb);
    el('circle',{cx:18,cy:-122,r:4,fill:'#ffd27a'},rb);
    el('circle',{cx:19,cy:-122,r:1.8,fill:'#000'},rb);
    el('path',{d:'M-8 -52 l-2 12 M4 -52 l2 12',stroke:'#3a3340','stroke-width':3,'stroke-linecap':'round'},rb);
    el('rect',{x:30,y:-112,width:26,height:16,rx:2,fill:'#efe3c2',stroke:'#8a7248',transform:'rotate(10 40 -100)'},rb);
    el('circle',{cx:44,cy:-100,r:5,fill:'#a8321f'},rb);
    P.tag(ra,'The Raven',0,-190);
    P.hot('contact',rv,{box:[-100,-220,200,240],ping:[0,-90,70]});

    P.motes(svg,30,{x0:100,x1:1500,y0:200,y1:880,color:'#ffa24f',dy:60,dx:20,r:1.6,rv:1.4});
    el('rect',{x:0,y:0,width:1600,height:900,fill:'url(#vig)','pointer-events':'none'},svg);
  }
});

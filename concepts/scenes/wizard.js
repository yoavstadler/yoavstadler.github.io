/* Concept B - The Wizard's Table. A workbench in a tower study; the crystal ball plays the highlight reel.
   Wand + dice = games, papers + books = documents, the owl familiar = 3D art, robe + hat = about, wax-sealed letter = contact. */
PF.init({
  theme:'wizard',
  reel:{x:630,y:195,w:340,h:340,shape:'circle'},
  flavor:{
    games:{name:'Wand & Dice',sub:'Games, jams and shipped titles'},
    docs:{name:'Scrolls & Tomes',sub:'Fan GDDs and systems logs'},
    art:{name:'The Familiar',sub:'3D models you can rotate'},
    about:{name:'Robe & Hat',sub:'Character sheet, experience, education'},
    contact:{name:'Sealed Letter',sub:'Email, CV and message form'}
  },
  draw:function(svg,P){
    var el=P.el,rnd=P.rnd;
    P.defs(
      '<linearGradient id="wall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#150d2b"/><stop offset="1" stop-color="#2d1d4e"/></linearGradient>'+
      '<linearGradient id="wood" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2e1d12"/><stop offset=".5" stop-color="#4a2f1b"/><stop offset="1" stop-color="#6a4426"/></linearGradient>'+
      '<linearGradient id="cloth" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a1f66"/><stop offset="1" stop-color="#26114a"/></linearGradient>'+
      '<radialGradient id="ballhalo"><stop offset="0" stop-color="#b48cff" stop-opacity=".75"/><stop offset=".5" stop-color="#7b3fe0" stop-opacity=".25"/><stop offset="1" stop-color="#5b2fc0" stop-opacity="0"/></radialGradient>'+
      '<radialGradient id="flame"><stop offset="0" stop-color="#fff2b8"/><stop offset="1" stop-color="#ffb347" stop-opacity="0"/></radialGradient>'+
      '<radialGradient id="warm"><stop offset="0" stop-color="#ffd27a" stop-opacity=".7"/><stop offset="1" stop-color="#ffb347" stop-opacity="0"/></radialGradient>'+
      '<linearGradient id="brass" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#e8c36a"/><stop offset="1" stop-color="#8a6420"/></linearGradient>'+
      '<radialGradient id="vig" cx=".5" cy=".5" r=".78"><stop offset=".6" stop-color="#0a0418" stop-opacity="0"/><stop offset="1" stop-color="#0a0418" stop-opacity=".65"/></radialGradient>'
    );
    function candle(parent,x,y,s,float){
      var g=el('g',{transform:'translate('+x+','+y+') scale('+(s||1)+')'},parent);
      var b=el('g',{class:float?'bob':''},g);
      if(float)b.style.animationDelay=(-rnd()*4)+'s';
      el('circle',{cx:0,cy:-22,r:34,fill:'url(#warm)'},b);
      el('rect',{x:-7,y:-12,width:14,height:34,rx:2,fill:'#efe3c2'},b);
      el('path',{d:'M-7 -4 q3 8 0 14',fill:'none',stroke:'#cdbf9e','stroke-width':2},b);
      var f=el('path',{class:'flicker',d:'M0 -34 q9 10 0 22 q-9 -12 0 -22z',fill:'url(#flame)'},b);
      return g;
    }

    /* back wall */
    var wall=P.layer(.25);
    el('rect',{x:-100,y:-100,width:1800,height:620,fill:'url(#wall)'},wall);
    for(var r=0;r<9;r++)for(var c=0;c<14;c++){
      var off=r%2?60:0;
      el('rect',{x:c*130-off,y:r*58,width:126,height:54,rx:3,fill:'none',stroke:'#3a2a63','stroke-width':1.5,opacity:.4},wall);
    }
    /* window */
    var win=P.layer(.35);
    el('path',{d:'M110 420 V210 Q110 90 225 90 Q340 90 340 210 V420Z',fill:'#07102a',stroke:'#4b3d73','stroke-width':10},win);
    for(var s=0;s<30;s++)el('circle',{cx:125+rnd()*200,cy:110+rnd()*300,r:.7+rnd()*1.3,fill:'#fff',opacity:.4+rnd()*.5},win);
    el('circle',{cx:270,cy:190,r:34,fill:'#f3ecd0'},win);
    el('circle',{cx:282,cy:182,r:30,fill:'#07102a'},win);
    el('path',{d:'M225 90 V420M110 250 H340',stroke:'#4b3d73','stroke-width':6},win);
    el('rect',{x:96,y:420,width:258,height:16,fill:'#4b3d73'},win);
    /* shelf */
    var shelf=P.layer(.4);
    [140,235,330].forEach(function(y){
      el('rect',{x:1070,y:y,width:230,height:10,fill:'#3b2616'},shelf);
      var x=1078;
      while(x<1285){
        var w=10+rnd()*14,hh=40+rnd()*40,col=['#6b2d3a','#2d4a6b','#3d5a2d','#7a5a1e','#4a2d6b'][Math.floor(rnd()*5)];
        if(rnd()<.18){el('rect',{x:x,y:y-34,width:20,height:34,rx:5,fill:rnd()<.5?'#3fa88a':'#c24a8a',opacity:.85},shelf);x+=24}
        else{el('rect',{x:x,y:y-hh,width:w,height:hh,fill:col,stroke:'#120a1e'},shelf);x+=w+1}
      }
    });
    el('rect',{x:1062,y:60,width:8,height:300,fill:'#3b2616'},shelf);el('rect',{x:1300,y:60,width:8,height:300,fill:'#3b2616'},shelf);
    /* hanging herbs */
    [400,440,480].forEach(function(x,i){
      el('line',{x1:x,y1:0,x2:x,y2:60+i*14,stroke:'#6b5538','stroke-width':2},shelf);
      el('path',{d:'M'+x+' '+(60+i*14)+' q-14 18 -6 40 q6 -10 6 -14 q6 14 12 -4 q4 -14 -12 -22z',fill:['#3d6a3d','#5a7a3a','#7a5a8a'][i]},shelf);
    });

    /* robe + hat = about (wall, right) */
    var rb=el('g',{transform:'translate(1440,0)'},P.layer(.45));
    var ra=el('g',{class:'hot-art'},rb);
    el('rect',{x:-70,y:70,width:140,height:10,rx:4,fill:'#5a3b22'},ra);
    el('path',{d:'M-46 80 Q-60 210 -70 360 Q0 376 70 360 Q60 210 46 80Z',fill:'#4a2a8a',stroke:'#2a1450','stroke-width':3},ra);
    el('path',{d:'M-46 80 Q0 120 46 80',fill:'none',stroke:'#2a1450','stroke-width':3},ra);
    el('path',{d:'M-70 360 Q0 376 70 360',fill:'none',stroke:'#e8c36a','stroke-width':4},ra);
    [[-20,200],[16,250],[-6,310],[28,170]].forEach(function(p){el('path',{d:'M'+p[0]+' '+p[1]+' l3 7 7 1 -5 5 1 7 -6 -4 -6 4 1 -7 -5 -5 7 -1z',fill:'#e8c36a'},ra)});
    el('path',{d:'M-52 70 Q-48 10 10 -50 Q30 -20 52 70Z',fill:'#3a1f7a',stroke:'#2a1450','stroke-width':3},ra);
    el('path',{d:'M10 -50 Q40 -70 56 -40',fill:'none',stroke:'#3a1f7a','stroke-width':14,'stroke-linecap':'round'},ra);
    el('ellipse',{cx:0,cy:72,rx:86,ry:14,fill:'#3a1f7a',stroke:'#2a1450','stroke-width':3},ra);
    el('path',{d:'M-52 62 Q0 76 52 62',fill:'none',stroke:'#e8c36a','stroke-width':4},ra);
    el('path',{d:'M-8 10 l3 7 7 1 -5 5 1 7 -6 -4 -6 4 1 -7 -5 -5 7 -1z',fill:'#e8c36a'},ra);
    P.tag(ra,'Robe & Hat',0,402);
    P.hot('about',rb,{box:[-100,-80,200,500],ping:[0,200,90]});

    /* table */
    var tb=P.layer(.6);
    el('rect',{x:-100,y:448,width:1800,height:600,fill:'url(#wood)'},tb);
    for(var p=0;p<16;p++){var x0=800+(p-7.5)*80;el('line',{x1:x0*0.55+360,y1:448,x2:(p-7.5)*190+800,y2:1000,stroke:'#1f130b','stroke-width':2,opacity:.55},tb)}
    el('rect',{x:-100,y:440,width:1800,height:14,fill:'#7a5632'},tb);
    el('path',{d:'M470 452 H1130 L1250 640 H350Z',fill:'url(#cloth)',stroke:'#e8c36a','stroke-width':3,opacity:.95},tb);
    el('ellipse',{cx:800,cy:545,rx:170,ry:26,fill:'none',stroke:'#e8c36a','stroke-width':2,opacity:.55},tb);
    el('ellipse',{cx:800,cy:545,rx:120,ry:16,fill:'none',stroke:'#e8c36a','stroke-width':1.5,opacity:.4},tb);

    /* crystal ball glow + stand (static so it lines up with the reel) */
    var ballG=el('g',{},svg);
    el('circle',{cx:800,cy:365,r:300,class:'pulse',fill:'url(#ballhalo)'},ballG);
    el('path',{d:'M690 548 Q700 520 740 512 H860 Q900 520 910 548 Q860 560 800 560 Q740 560 690 548Z',fill:'url(#brass)',stroke:'#5a3f10','stroke-width':2},ballG);
    [-1,1].forEach(function(d){el('path',{d:'M'+(800+d*120)+' 538 q'+(d*30)+' -30 '+(d*-8)+' -66',fill:'none',stroke:'url(#brass)','stroke-width':10,'stroke-linecap':'round'},ballG)});
    el('circle',{cx:800,cy:365,r:176,fill:'none',stroke:'url(#brass)','stroke-width':8},ballG);

    /* floating candles */
    var fc=P.layer(.8);
    [[520,170,1],[660,100,.9],[940,96,.9],[1080,180,1],[420,320,.8],[1190,420,.8]].forEach(function(c){candle(fc,c[0],c[1],c[2],true)});

    /* objects on the table */
    var ob=P.layer(.9);

    /* wand & dice = games */
    var wd=el('g',{transform:'translate(430,720)'},ob),wa=el('g',{class:'hot-art'},wd);
    el('ellipse',{cx:0,cy:46,rx:150,ry:20,fill:'#000',opacity:.3},wa);
    el('line',{x1:-130,y1:44,x2:60,y2:-36,stroke:'#2a1a0e','stroke-width':12,'stroke-linecap':'round'},wa);
    el('line',{x1:-130,y1:44,x2:60,y2:-36,stroke:'#7a5632','stroke-width':8,'stroke-linecap':'round'},wa);
    el('circle',{cx:66,cy:-39,r:36,fill:'url(#flame)',class:'pulse'},wa);
    el('path',{d:'M66 -56 l5 12 12 2 -9 8 3 12 -11 -7 -11 7 3 -12 -9 -8 12 -2z',fill:'#fff2b8'},wa);
    var d20=el('g',{transform:'translate(-10,20)'},wa);
    el('polygon',{points:'0,-46 40,-23 40,23 0,46 -40,23 -40,-23',fill:'#7b3fa6',stroke:'#e8c36a','stroke-width':3},d20);
    el('polygon',{points:'0,-24 22,12 -22,12',fill:'#9a62c8',stroke:'#e8c36a','stroke-width':2},d20);
    el('path',{d:'M0 -46 V-24M40 -23 L22 12M-40 -23 L-22 12M0 46 L22 12M0 46 L-22 12M40 23 L22 12M-40 23 L-22 12',stroke:'#e8c36a','stroke-width':2,fill:'none'},d20);
    var t=el('text',{x:0,y:8,'text-anchor':'middle',fill:'#fff','font-size':15,'font-weight':700},d20);t.textContent='20';
    var d6=el('g',{transform:'translate(90,52) rotate(14)'},wa);
    el('rect',{x:-22,y:-22,width:44,height:44,rx:8,fill:'#efe3c2',stroke:'#8a6420','stroke-width':2},d6);
    [[-10,-10],[10,-10],[0,0],[-10,10],[10,10]].forEach(function(q){el('circle',{cx:q[0],cy:q[1],r:3.5,fill:'#3a1f66'},d6)});
    P.tag(wa,'Wand & Dice',0,-92);
    P.hot('games',wd,{box:[-160,-120,330,200],ping:[10,10,70]});

    /* papers + books = documents */
    var sc=el('g',{transform:'translate(1160,690)'},ob),sa=el('g',{class:'hot-art'},sc);
    el('ellipse',{cx:10,cy:34,rx:150,ry:18,fill:'#000',opacity:.3},sa);
    el('rect',{x:-80,y:-4,width:160,height:34,rx:4,fill:'#6b2d3a',stroke:'#2a0f16','stroke-width':2},sa);
    el('rect',{x:-80,y:6,width:160,height:5,fill:'#e8c36a'},sa);
    el('rect',{x:-68,y:-36,width:140,height:32,rx:4,fill:'#2d4a6b',stroke:'#10202e','stroke-width':2,transform:'rotate(-3 0 -20)'},sa);
    el('rect',{x:-70,y:-70,width:140,height:32,rx:4,fill:'#3d5a2d',stroke:'#16240f','stroke-width':2,transform:'rotate(2 0 -54)'},sa);
    [[-5,-76,-5],[3,-82,3],[-1,-88,0]].forEach(function(q,i){
      el('rect',{x:q[0]-52,y:q[1],width:108,height:8,fill:['#efe3c2','#f6ecd0','#e8dab4'][i],stroke:'#8a7248','stroke-width':1.5,transform:'rotate('+q[2]+' '+q[0]+' '+q[1]+')'},sa)});
    el('path',{d:'M-30 -92 h60 M-30 -97 h44',stroke:'#8a7248','stroke-width':1.5,opacity:.8},sa);
    el('rect',{x:98,y:-2,width:100,height:30,rx:15,fill:'#efe3c2',stroke:'#8a7248','stroke-width':2},sa);
    el('circle',{cx:198,cy:13,r:15,fill:'#e8dab4',stroke:'#8a7248','stroke-width':2},sa);
    el('circle',{cx:198,cy:13,r:6,fill:'none',stroke:'#8a7248','stroke-width':2},sa);
    el('rect',{x:140,y:-4,width:10,height:34,fill:'#a8321f'},sa);
    el('path',{d:'M-140 30 l-6 -40 h24 l-4 40z',fill:'#1a1030',stroke:'#e8c36a','stroke-width':2},sa);
    el('path',{d:'M-134 -10 q20 -60 50 -80 q-6 30 -14 80z',fill:'#efe3c2',stroke:'#8a7248','stroke-width':2},sa);
    P.tag(sa,'Scrolls & Tomes',10,-132);
    P.hot('docs',sc,{box:[-160,-160,380,210],ping:[10,-30,80]});

    /* owl familiar = 3D art */
    var ow=el('g',{transform:'translate(1440,716)'},ob),oa=el('g',{class:'hot-art'},ow);
    el('ellipse',{cx:0,cy:24,rx:70,ry:12,fill:'#000',opacity:.3},oa);
    el('rect',{x:-8,y:-20,width:16,height:44,fill:'#5a3b22'},oa);
    el('ellipse',{cx:0,cy:24,rx:40,ry:8,fill:'#5a3b22'},oa);
    el('rect',{x:-48,y:-24,width:96,height:10,rx:5,fill:'#7a5632'},oa);
    var ob2=el('g',{class:'breathe'},oa);
    el('ellipse',{cx:0,cy:-74,rx:36,ry:52,fill:'#7a6a58',stroke:'#3a2f24','stroke-width':2},ob2);
    el('ellipse',{cx:0,cy:-64,rx:22,ry:36,fill:'#d6c7a8'},ob2);
    for(var f=0;f<4;f++)el('path',{d:'M-10 '+(-84+f*14)+' q10 6 20 0',fill:'none',stroke:'#7a6a58','stroke-width':2.5},ob2);
    el('path',{d:'M-36 -90 Q-58 -60 -34 -30 Q-26 -60 -30 -90z',fill:'#5a4c3c'},ob2);
    el('path',{d:'M36 -90 Q58 -60 34 -30 Q26 -60 30 -90z',fill:'#5a4c3c'},ob2);
    el('circle',{cx:0,cy:-122,r:32,fill:'#7a6a58',stroke:'#3a2f24','stroke-width':2},ob2);
    el('path',{d:'M-26 -142 l-10 -22 22 10z M26 -142 l10 -22 -22 10z',fill:'#5a4c3c'},ob2);
    [-14,14].forEach(function(x){
      el('circle',{cx:x,cy:-122,r:13,fill:'#efe3c2'},ob2);
      var e=el('g',{class:'blink'},ob2);
      el('circle',{cx:x,cy:-122,r:9,fill:'#f0bf5a'},e);el('circle',{cx:x,cy:-122,r:4.5,fill:'#120a1e'},e);
    });
    el('path',{d:'M-5 -112 L5 -112 L0 -100z',fill:'#e08a2a'},ob2);
    el('path',{d:'M-14 -2 l-4 8 M-6 -2 l-2 8 M6 -2 l2 8 M14 -2 l4 8',stroke:'#e08a2a','stroke-width':3,'stroke-linecap':'round'},oa);
    var gem=el('g',{transform:'translate(0,-230)'},oa),gb=el('g',{class:'bob'},gem);
    el('circle',{cx:0,cy:0,r:44,fill:'url(#ballhalo)'},gb);
    var gs=el('g',{class:'spin'},gb);
    el('polygon',{points:'0,-34 26,0 0,34 -26,0',fill:'rgba(160,120,255,.25)',stroke:'#c8a8ff','stroke-width':2.5},gs);
    el('path',{d:'M0 -34 V34M-26 0 H26M-13 -17 L13 17M13 -17 L-13 17',stroke:'#c8a8ff','stroke-width':1.5,fill:'none'},gs);
    P.tag(oa,'The Familiar',0,70);
    P.hot('art',ow,{box:[-80,-290,160,390],ping:[0,-110,76]});

    /* sealed letter + candle = contact */
    var lt=el('g',{transform:'translate(940,770)'},ob),la=el('g',{class:'hot-art'},lt);
    el('ellipse',{cx:10,cy:36,rx:110,ry:14,fill:'#000',opacity:.3},la);
    var env=el('g',{transform:'rotate(-7)'},la);
    el('rect',{x:-76,y:-46,width:152,height:92,rx:5,fill:'#efe3c2',stroke:'#8a7248','stroke-width':2.5},env);
    el('path',{d:'M-76 -46 L0 8 L76 -46',fill:'#e4d5ae',stroke:'#8a7248','stroke-width':2.5},env);
    el('path',{d:'M-76 46 L-22 -4M76 46 L22 -4',fill:'none',stroke:'#8a7248','stroke-width':2},env);
    el('circle',{cx:0,cy:8,r:19,fill:'#a8321f',stroke:'#5c140a','stroke-width':2.5},env);
    el('path',{d:'M0 -2 l4 8 9 1 -7 6 2 9 -8 -5 -8 5 2 -9 -7 -6 9 -1z',fill:'#d4553a'},env);
    candle(la,-120,30,1.15,false);
    el('path',{d:'M-92 28 q30 -60 70 -84 q-4 36 -34 80z',fill:'#efe3c2',stroke:'#8a7248','stroke-width':2,opacity:.0},la);
    P.tag(la,'Sealed Letter',-30,-92);
    P.hot('contact',lt,{box:[-110,-120,260,170],ping:[0,0,64]});

    P.motes(svg,26,{x0:200,x1:1400,y0:60,y1:700,color:'#c8a8ff',dy:60});
    el('rect',{x:0,y:0,width:1600,height:900,fill:'url(#vig)','pointer-events':'none'},svg);
  }
});

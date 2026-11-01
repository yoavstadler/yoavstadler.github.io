/* Concept D - The Guild Hall (my own idea). A big quest board; the highlight reel is the guild's "great notice" in the middle.
   Notices on the left = games, adventurer's license on the right = about, bookshelf = documents,
   workshop bench = 3D art, raven post = contact. */
PF.init({
  theme:'guild',
  reel:{x:560,y:160,w:480,h:270},
  flavor:{
    games:{name:'Quest Board',sub:'Games, jams and shipped titles'},
    docs:{name:'Tomes',sub:'Fan GDDs and systems logs'},
    art:{name:'Workshop',sub:'3D models you can rotate'},
    about:{name:'Adventurer License',sub:'Character sheet, experience, education'},
    contact:{name:'Raven Post',sub:'Email, CV and message form'}
  },
  draw:function(svg,P){
    var el=P.el,rnd=P.rnd;
    P.defs(
      '<linearGradient id="wall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2a1a10"/><stop offset="1" stop-color="#4a2f1b"/></linearGradient>'+
      '<linearGradient id="cork" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#a1804f"/><stop offset="1" stop-color="#85673c"/></linearGradient>'+
      '<linearGradient id="oak" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6a4426"/><stop offset="1" stop-color="#3a2414"/></linearGradient>'+
      '<linearGradient id="top" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4a2f1b"/><stop offset="1" stop-color="#8a5f36"/></linearGradient>'+
      '<linearGradient id="counter" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7a5230"/><stop offset=".08" stop-color="#5a3b22"/><stop offset="1" stop-color="#2a180c"/></linearGradient>'+
      '<linearGradient id="brass" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#e8c36a"/><stop offset="1" stop-color="#8a6420"/></linearGradient>'+
      '<radialGradient id="lantern"><stop offset="0" stop-color="#ffd27a" stop-opacity=".85"/><stop offset="1" stop-color="#ffb347" stop-opacity="0"/></radialGradient>'+
      '<radialGradient id="flame"><stop offset="0" stop-color="#fff2b8"/><stop offset="1" stop-color="#ffb347" stop-opacity="0"/></radialGradient>'+
      '<radialGradient id="vig" cx=".5" cy=".5" r=".78"><stop offset=".6" stop-color="#140a04" stop-opacity="0"/><stop offset="1" stop-color="#140a04" stop-opacity=".6"/></radialGradient>'
    );
    function note(parent,x,y,w,h,rot,lines,sub,col){
      var g=el('g',{transform:'translate('+x+','+y+') rotate('+rot+')'},parent);
      el('rect',{x:3,y:5,width:w,height:h,fill:'#000',opacity:.28},g);
      el('rect',{x:0,y:0,width:w,height:h,fill:col||'#ead9ae',stroke:'#8a7248','stroke-width':1.5},g);
      el('path',{d:'M8 '+(h-10)+' H'+(w-8),stroke:'#8a7248','stroke-width':1,opacity:.6},g);
      lines.forEach(function(l,i){var t=el('text',{x:w/2,y:34+i*16,'text-anchor':'middle',fill:'#3a2a14','font-family':'Georgia,serif','font-weight':700,'font-size':13},g);t.textContent=l});
      if(sub){var s=el('text',{x:w/2,y:h-16,'text-anchor':'middle',fill:'#6b5237','font-family':'Georgia,serif','font-size':9.5,'letter-spacing':.5},g);s.textContent=sub}
      el('circle',{cx:w/2,cy:9,r:5,fill:'#a8321f',stroke:'#4a1208'},g);
      return g;
    }

    /* hall wall + beams + lanterns */
    var wall=P.layer(.2);
    el('rect',{x:-100,y:-100,width:1800,height:1100,fill:'url(#wall)'},wall);
    for(var x=-100;x<1700;x+=96)el('line',{x1:x,y1:0,x2:x,y2:700,stroke:'#1a0f08','stroke-width':3,opacity:.55},wall);
    el('rect',{x:-100,y:0,width:1800,height:54,fill:'#24140a'},wall);
    el('rect',{x:-100,y:54,width:1800,height:8,fill:'#6a4426'},wall);
    [[190,150],[1410,150],[800,60]].forEach(function(c,i){
      var g=el('g',{transform:'translate('+c[0]+','+c[1]+')'},wall);
      el('line',{x1:0,y1:-c[1]+50,x2:0,y2:-20,stroke:'#2a2d31','stroke-width':3},g);
      el('circle',{cx:0,cy:10,r:90,fill:'url(#lantern)',class:'pulse'},g);
      el('rect',{x:-14,y:-18,width:28,height:42,rx:5,fill:'#2a2d31',stroke:'#0c0c0c','stroke-width':2},g);
      el('rect',{x:-9,y:-12,width:18,height:30,rx:3,fill:'#ffd27a'},g);
      el('path',{class:'flicker',d:'M0 -8 q7 8 0 18 q-7 -10 0 -18z',fill:'url(#flame)'},g);
    });

    /* armour stand (decor) */
    var ar=P.layer(.5),ag=el('g',{transform:'translate(130,690)'},ar);
    el('ellipse',{cx:0,cy:6,rx:60,ry:10,fill:'#000',opacity:.4},ag);
    el('rect',{x:-5,y:-120,width:10,height:120,fill:'#3a2414'},ag);
    el('path',{d:'M-34 -300 Q0 -320 34 -300 L40 -230 Q0 -214 -40 -230Z',fill:'#7b8591',stroke:'#2a2d31','stroke-width':3},ag);
    el('path',{d:'M-30 -226 Q0 -210 30 -226 L26 -150 Q0 -138 -26 -150Z',fill:'#6a737e',stroke:'#2a2d31','stroke-width':3},ag);
    el('ellipse',{cx:-44,cy:-290,rx:20,ry:14,fill:'#7b8591',stroke:'#2a2d31','stroke-width':3},ag);
    el('ellipse',{cx:44,cy:-290,rx:20,ry:14,fill:'#7b8591',stroke:'#2a2d31','stroke-width':3},ag);
    el('path',{d:'M0 -366 Q-24 -366 -24 -330 V-318 H24 V-330 Q24 -366 0 -366Z',fill:'#8b95a1',stroke:'#2a2d31','stroke-width':3},ag);
    el('path',{d:'M-16 -338 H16',stroke:'#14110d','stroke-width':5},ag);
    el('path',{d:'M0 -366 q8 -34 -4 -50 q14 6 12 30z',fill:'#a8321f'},ag);

    /* quest board (static, so the reel stays aligned) */
    var bd=el('g',{},svg);
    el('rect',{x:288,y:68,width:1024,height:536,rx:10,fill:'url(#oak)',stroke:'#1a0f08','stroke-width':4},bd);
    el('rect',{x:310,y:90,width:980,height:492,rx:4,fill:'url(#cork)',stroke:'#3a2414','stroke-width':3},bd);
    for(var i=0;i<140;i++)el('circle',{cx:316+rnd()*968,cy:96+rnd()*480,r:.8+rnd()*1.6,fill:rnd()<.5?'#6a4f2c':'#b8975e',opacity:.5},bd);
    [[298,78],[1302,78],[298,594],[1302,594]].forEach(function(c){el('circle',{cx:c[0],cy:c[1],r:8,fill:'url(#brass)',stroke:'#4a3410','stroke-width':1.5},bd)});
    /* reel frame */
    el('rect',{x:538,y:138,width:524,height:316,rx:6,fill:'#2a180c',stroke:'url(#brass)','stroke-width':8},bd);
    el('rect',{x:550,y:150,width:500,height:292,fill:'#000'},bd);
    [[546,146],[1054,146],[546,446],[1054,446]].forEach(function(c){el('circle',{cx:c[0],cy:c[1],r:7,fill:'url(#brass)',stroke:'#4a3410'},bd)});
    el('rect',{x:640,y:462,width:320,height:30,rx:4,fill:'url(#brass)',stroke:'#4a3410','stroke-width':2},bd);
    var pt=el('text',{x:800,y:483,'text-anchor':'middle',fill:'#2a180c','font-family':'Georgia,serif','font-weight':700,'font-size':16,'letter-spacing':3},bd);pt.textContent='HIGHLIGHTS';
    /* decor map below the reel */
    var map=el('g',{transform:'translate(620,510) rotate(-1.5)'},bd);
    el('rect',{x:3,y:4,width:360,height:62,fill:'#000',opacity:.25},map);
    el('rect',{x:0,y:0,width:360,height:62,fill:'#e4d3a4',stroke:'#8a7248','stroke-width':1.5},map);
    el('path',{d:'M18 44 Q60 12 110 38 T200 26 T290 40 L338 16',fill:'none',stroke:'#a8321f','stroke-width':2,'stroke-dasharray':'5 5'},map);
    el('path',{d:'M330 8 l16 16 M346 8 l-16 16',stroke:'#a8321f','stroke-width':3},map);
    el('path',{d:'M60 50 l10 -18 10 18z M240 48 l14 -22 14 22z',fill:'#b8a272',stroke:'#8a7248'},map);
    el('circle',{cx:180,cy:6,r:5,fill:'#a8321f'},map);

    /* games = notices on the left */
    var ob=P.layer(.5);
    var qb=el('g',{},ob),qa=el('g',{class:'hot-art'},qb);
    note(qa,330,112,100,118,-4,['BIG RED,','LITTLE RED'],'JAM - 2 DAYS');
    note(qa,442,122,94,106,3,['CLOCK','OUT'],'STEALTH PUZZLE');
    note(qa,326,250,102,116,2,['BUMPING','MAYHEM'],'WAVE DEFENSE');
    note(qa,440,248,98,122,-3,['WARPED'],'GRAVITY POWERS');
    var big=note(qa,336,392,194,168,-1,['8 SHIPPED','MOBILE GAMES'],'APPCENTRAL - APP STORE','#f1e2b6');
    P.icon(big,'sword',97,100,46,'#a8321f',2.4);
    P.tag(qa,'Quest Board',432,64);
    P.hot('games',qb,{box:[318,90,236,486],ping:[432,330,120]});

    /* about = adventurer license on the right */
    var lc=el('g',{},ob),la=el('g',{class:'hot-art'},lc);
    var card=el('g',{transform:'translate(1088,170) rotate(2)'},la);
    el('rect',{x:4,y:6,width:178,height:236,fill:'#000',opacity:.28},card);
    el('rect',{x:0,y:0,width:178,height:236,fill:'#f1e2b6',stroke:'#c8922a','stroke-width':4},card);
    el('rect',{x:8,y:8,width:162,height:220,fill:'none',stroke:'#8a7248','stroke-width':1.2},card);
    var hd=el('text',{x:89,y:32,'text-anchor':'middle',fill:'#a8321f','font-family':'Georgia,serif','font-weight':700,'font-size':13,'letter-spacing':2},card);hd.textContent='ADVENTURER';
    el('rect',{x:54,y:44,width:70,height:76,fill:'#cdbb8a',stroke:'#8a7248','stroke-width':2},card);
    el('circle',{cx:89,cy:72,r:15,fill:'#6b5237'},card);
    el('path',{d:'M58 120 Q58 94 89 94 Q120 94 120 120Z',fill:'#6b5237'},card);
    [['YOAV STADLER',148,15,700],['Class: Game · Systems Designer',170,9.5,400],['Guild: Howest DAE',186,9.5,400],['Former rank: Product Manager',202,9.5,400]].forEach(function(r){
      var t=el('text',{x:89,y:r[1],'text-anchor':'middle',fill:'#3a2a14','font-family':'Georgia,serif','font-weight':r[3],'font-size':r[2]},card);t.textContent=r[0]});
    el('circle',{cx:89,cy:8,r:6,fill:'#a8321f',stroke:'#4a1208'},card);
    el('circle',{cx:150,cy:104,r:16,fill:'#a8321f',stroke:'#5c140a','stroke-width':2},card);
    P.icon(card,'shield',150,104,18,'#f1e2b6',2);
    P.tag(la,'Adventurer License',1180,128);
    P.hot('about',lc,{box:[1074,100,214,300],ping:[1180,290,110]});

    /* bookshelf = docs (right wall) */
    var bs=el('g',{transform:'translate(1450,0)'},ob),ba=el('g',{class:'hot-art'},bs);
    el('rect',{x:-100,y:120,width:200,height:520,fill:'#3a2414',stroke:'#1a0f08','stroke-width':3},ba);
    el('rect',{x:-90,y:130,width:180,height:500,fill:'#1d1108'},ba);
    for(var sh=0;sh<5;sh++){
      var sy=130+sh*100;
      el('rect',{x:-90,y:sy+90,width:180,height:10,fill:'#5a3b22'},ba);
      var bx=-84;
      while(bx<78){
        var bw=9+rnd()*13,bh=52+rnd()*34;
        if(sh===1&&bx>-10&&bx<60){ el('rect',{x:bx,y:sy+64,width:44,height:26,rx:13,fill:'#efe3c2',stroke:'#8a7248'},ba); el('rect',{x:bx+16,y:sy+64,width:6,height:26,fill:'#a8321f'},ba); bx+=50;continue}
        el('rect',{x:bx,y:sy+90-bh,width:bw,height:bh,fill:['#6b2d3a','#2d4a6b','#3d5a2d','#7a5a1e','#4a2d6b','#8a3a2a'][Math.floor(rnd()*6)],stroke:'#0c0804'},ba);
        el('line',{x1:bx+2,y1:sy+90-bh+10,x2:bx+bw-2,y2:sy+90-bh+10,stroke:'#e8c36a','stroke-width':1.5},ba);
        bx+=bw+1;
      }
    }
    P.tag(ba,'Tomes',0,96);
    P.hot('docs',bs,{box:[-100,70,200,570],ping:[0,380,90]});

    /* counter */
    var ct=P.layer(.7);
    el('rect',{x:-100,y:632,width:1800,height:100,fill:'url(#top)'},ct);
    for(var pl=-100;pl<1700;pl+=210)el('line',{x1:pl,y1:632,x2:pl-60,y2:728,stroke:'#2a180c','stroke-width':2,opacity:.45},ct);
    el('rect',{x:-100,y:728,width:1800,height:400,fill:'url(#counter)'},ct);
    el('rect',{x:-100,y:722,width:1800,height:10,fill:'#a77646'},ct);
    for(var px=-100;px<1700;px+=140)el('line',{x1:px,y1:740,x2:px,y2:1000,stroke:'#1a0f08','stroke-width':3,opacity:.6},ct);

    /* workshop = 3D art (counter, left) */
    var ws=el('g',{transform:'translate(420,712)'},ct),wa=el('g',{class:'hot-art'},ws);
    el('ellipse',{cx:0,cy:8,rx:130,ry:14,fill:'#000',opacity:.35},wa);
    el('rect',{x:-40,y:-30,width:80,height:34,rx:3,fill:'#8b95a1',stroke:'#2a2d31','stroke-width':3},wa);
    el('rect',{x:-30,y:-44,width:60,height:16,rx:3,fill:'#a7b0ba',stroke:'#2a2d31','stroke-width':3},wa);
    el('circle',{cx:0,cy:-100,r:64,class:'pulse',fill:'url(#lantern)'},wa);
    var gw=el('g',{transform:'translate(0,-60) scale(.72)'},wa),gb=el('g',{class:'bob'},gw),gs=el('g',{class:'spin'},gb);
    el('polygon',{points:'0,-78 44,-14 0,50 -44,-14',fill:'rgba(127,214,196,.28)',stroke:'#7fd6c4','stroke-width':3.5},gs);
    el('path',{d:'M0 -78 V50M-44 -14 H44M-22 -46 L22 22M22 -46 L-22 22',stroke:'#7fd6c4','stroke-width':2,fill:'none'},gs);
    el('line',{x1:70,y1:-6,x2:118,y2:-28,stroke:'#5a3b22','stroke-width':10,'stroke-linecap':'round'},wa);
    el('rect',{x:104,y:-48,width:34,height:20,rx:3,fill:'url(#brass)',stroke:'#4a3410','stroke-width':2,transform:'rotate(-24 120 -38)'},wa);
    el('line',{x1:-120,y1:-2,x2:-76,y2:-16,stroke:'#8b95a1','stroke-width':8,'stroke-linecap':'round'},wa);
    el('line',{x1:-124,y1:0,x2:-114,y2:-4,stroke:'#5a3b22','stroke-width':11,'stroke-linecap':'round'},wa);
    P.tag(wa,'Workshop',0,58);
    P.hot('art',ws,{box:[-135,-150,280,215],ping:[0,-30,80]});

    /* raven post = contact (counter, right) */
    var rp=el('g',{transform:'translate(1130,716)'},ct),ra=el('g',{class:'hot-art'},rp);
    el('ellipse',{cx:0,cy:8,rx:130,ry:14,fill:'#000',opacity:.35},ra);
    el('rect',{x:-90,y:-112,width:180,height:114,fill:'#4a2f1b',stroke:'#1a0f08','stroke-width':3},ra);
    for(var rr=0;rr<2;rr++)for(var cc=0;cc<3;cc++){
      var bx2=-84+cc*58,by2=-106+rr*54;
      el('rect',{x:bx2,y:by2,width:52,height:48,fill:'#1d1108',stroke:'#6a4426','stroke-width':2},ra);
      if((rr+cc)%2===0){el('rect',{x:bx2+6,y:by2+14,width:40,height:30,fill:'#efe3c2',stroke:'#8a7248',transform:'rotate('+(cc*4-4)+' '+(bx2+26)+' '+(by2+30)+')'},ra);el('circle',{cx:bx2+26,cy:by2+30,r:5,fill:'#a8321f'},ra)}
    }
    var rb=el('g',{class:'bob'},ra);
    el('ellipse',{cx:0,cy:-146,rx:24,ry:32,fill:'#15121e',stroke:'#05040a','stroke-width':2},rb);
    el('path',{d:'M-16 -134 Q-46 -116 -50 -90 Q-28 -106 -10 -118z',fill:'#0c0a14'},rb);
    el('circle',{cx:12,cy:-176,r:16,fill:'#15121e',stroke:'#05040a','stroke-width':2},rb);
    el('path',{d:'M24 -180 L48 -172 L24 -166z',fill:'#3a3340'},rb);
    el('circle',{cx:16,cy:-180,r:3.5,fill:'#ffd27a'},rb);
    el('path',{d:'M-6 -116 l-2 8 M6 -116 l2 8',stroke:'#3a3340','stroke-width':3,'stroke-linecap':'round'},rb);
    P.tag(ra,'Raven Post',0,58);
    P.hot('contact',rp,{box:[-100,-200,200,270],ping:[0,-60,80]});

    P.motes(svg,22,{x0:150,x1:1450,y0:100,y1:700,color:'#ffd27a',dy:50,r:1.6});
    el('rect',{x:0,y:0,width:1600,height:900,fill:'url(#vig)','pointer-events':'none'},svg);
  }
});

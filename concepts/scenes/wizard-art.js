/* Concept B (painted) - The Wizard's Table with the real art.
   Background = art/wizard-scene.jpg (generated scene). The oval frame in the middle is the highlight reel.
   Invisible hotspots sit over the painted objects; the cut-out art is used as icons in the panels and menu.
   To swap art: replace the images in concepts/art/ and adjust the regions below (image pixels, 1672 x 941). */
PF.init({
  theme:'wizard',
  reel:{x:487,y:165,w:624,h:449,shape:'oval'},
  icons:{games:'art/wand.png',docs:'art/books.png',art:'art/owl.png',about:'art/robe.png',contact:'art/letter.png'},
  flavor:{
    games:{name:'Wand & Dice',sub:'Games, jams and shipped titles'},
    docs:{name:'Scrolls & Tomes',sub:'Fan GDDs and systems logs'},
    art:{name:'The Familiar',sub:'3D models you can rotate'},
    about:{name:'Robe & Hat',sub:'Character sheet, experience, education'},
    contact:{name:'Sealed Letter',sub:'Email, CV and message form'}
  },
  draw:function(svg,P){
    var el=P.el,K=1600/1672;                      /* image px -> scene units */
    P.defs(
      '<radialGradient id="hg"><stop offset="0" stop-color="#ffd27a" stop-opacity=".32"/><stop offset=".65" stop-color="#ff9a3c" stop-opacity=".12"/><stop offset="1" stop-color="#ff9a3c" stop-opacity="0"/></radialGradient>'+
      '<radialGradient id="spark"><stop offset="0" stop-color="#ffe9a0" stop-opacity=".9"/><stop offset="1" stop-color="#ffb347" stop-opacity="0"/></radialGradient>'+
      '<radialGradient id="flameg"><stop offset="0" stop-color="#fff2b8" stop-opacity=".9"/><stop offset="1" stop-color="#ff9a3c" stop-opacity="0"/></radialGradient>'+
      '<radialGradient id="crys"><stop offset="0" stop-color="#c8a0ff" stop-opacity=".7"/><stop offset="1" stop-color="#7b3fe0" stop-opacity="0"/></radialGradient>'+
      '<radialGradient id="vig" cx=".5" cy=".5" r=".8"><stop offset=".65" stop-color="#0a0418" stop-opacity="0"/><stop offset="1" stop-color="#0a0418" stop-opacity=".5"/></radialGradient>'
    );
    var bg=el('image',{x:0,y:0,width:1600,height:900,preserveAspectRatio:'xMidYMid slice'},svg);
    bg.setAttribute('href','art/wizard-scene.jpg');

    /* ambient life: candle flame, crystal, lantern */
    function at(x,y){return 'translate('+(x*K)+','+(y*K)+')'}
    var amb=el('g',{'pointer-events':'none'},svg);
    function glow(x,y,cls,attrs){var o=el('g',{transform:at(x,y)},amb);attrs.cx=0;attrs.cy=0;attrs.class=cls;el(attrs.rx?'ellipse':'circle',attrs,o)}
    glow(113,300,'flicker',{rx:46,ry:70,fill:'url(#flameg)'});
    glow(305,250,'pulse',{r:80,fill:'url(#crys)'});
    glow(1612,205,'pulse',{r:95,fill:'url(#flameg)',opacity:.7});

    /* hotspot helper: ellipse glow + hit box + hover tag + sparkle */
    function spot(key,cx,cy,rx,ry,frame,spk){
      var g=el('g',{class:'flat'},svg);
      el('ellipse',{class:'hglow',cx:cx*K,cy:cy*K,rx:rx*K,ry:ry*K,fill:'url(#hg)'},g);
      P.sparkle(g,spk[0]*K,spk[1]*K,15);
      P.hot(key,g,{box:[(cx-rx)*K,(cy-ry)*K,rx*2*K,ry*2*K],frame:[frame[0]*K,frame[1]*K,(frame[2]-frame[0])*K,(frame[3]-frame[1])*K]});
      return g;
    }
    spot('games',335,725,325,125,[30,580,645,865],[505,765]);
    spot('docs',1405,650,215,108,[1190,540,1625,770],[1392,592]);
    spot('art',290,345,125,190,[185,190,415,530],[305,250]);
    spot('about',1330,290,175,275,[1165,70,1490,565],[1330,255]);
    spot('contact',1310,792,150,58,[1170,735,1455,855],[1395,785]);

    P.motes(svg,22,{x0:150,x1:1450,y0:150,y1:850,color:'#ffcf70',dy:60,dx:20,r:1.5,rv:1.4});
    el('rect',{x:0,y:0,width:1600,height:900,fill:'url(#vig)','pointer-events':'none'},svg);
  }
});

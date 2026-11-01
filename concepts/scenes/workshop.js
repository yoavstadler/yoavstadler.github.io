/* Concept E - The Workshop (hand-drawn layered art).
   Layers: art2/plate.webp (empty room, transparent frame interior) + one transparent cut-out per object (raven, construct, books, kit, disc).
   All art coordinates below are in source-image pixels (1024 x 572); K converts them to scene units.
   Hover = a pre-baked gold outline image (NAME-ring.png) that fades in: no CSS filters, no per-frame JS, so it stays smooth.
   To swap art: replace the PNGs in concepts/art2/ (same canvas position) and adjust the numbers here. */
PF.init({
  theme:'workshop',
  reel:{x:562.9,y:281.6,w:476.6,h:315.4,shape:'rect'},   /* = frame interior (art2/reel-mask.png trims it to the stone edges) */
  reelBehind:true,   /* the video plays UNDER the room image, visible through its transparent frame */
  hint:'Click any object &middot; or press 1-5',
  icons:{games:'art2/icon-games.png',docs:'art2/icon-docs.png',art:'art2/icon-art.png',about:'art2/icon-about.png',contact:'art2/icon-contact.png'},
  flavor:{
    games:{name:'Games',sub:'Shipped titles, student games and jams'},
    docs:{name:'Documents',sub:'Fan GDDs and systems design logs'},
    art:{name:'3D Art',sub:'Models you can rotate'},
    about:{name:'About',sub:'Character sheet, experience, education'},
    contact:{name:'Contact',sub:'Email, CV and message form'}
  },
  draw:function(svg,P){
    var el=P.el,K=900/572,OX=(1600-1024*K)/2,T='translate('+OX+',0) scale('+K+')';
    var CUT={raven:{x:81.89,y:122.91,w:198.36,h:132.86},construct:{x:773.57,y:49.32,w:203.53,h:222.75},books:{x:46.51,y:334.93,w:237.71,h:195.71},about:{x:333.52,y:359.19,w:376.84,h:192.52},disc:{x:704.8,y:280.83,w:254.01,h:257.36}};
    P.defs(
      '<radialGradient id="shd"><stop offset="0" stop-color="#050302" stop-opacity=".6"/><stop offset=".6" stop-color="#050302" stop-opacity=".25"/><stop offset="1" stop-color="#050302" stop-opacity="0"/></radialGradient>'+
      '<radialGradient id="vig" cx=".5" cy=".5" r=".78"><stop offset=".62" stop-color="#0a0604" stop-opacity="0"/><stop offset="1" stop-color="#0a0604" stop-opacity=".5"/></radialGradient>'
    );
    function grp(parent,attrs){return el('g',attrs||{},parent)}
    function img(parent,name,box){var i=el('image',{x:box.x,y:box.y,width:box.w,height:box.h,'pointer-events':'none'},parent);i.setAttribute('href','art2/'+name+'.png');return i}

    /* 1 - empty room */
    var bg=el('image',{x:OX,y:0,width:1024*K,height:900,preserveAspectRatio:'none','pointer-events':'none'},svg);
    bg.setAttribute('href','art2/plate.webp');

    /* 2 - soft contact shadows + candle light (under the objects) */
    var world=grp(svg,{transform:T,'pointer-events':'none'});
    [[165,520,128,14],[520,538,190,13],[832,530,108,12],[882,262,72,7],[170,250,70,6]].forEach(function(s){
      el('ellipse',{cx:s[0],cy:s[1],rx:s[2],ry:s[3],fill:'url(#shd)'},world)});

    /* 4 - cut-out objects as clickable layers */
    function tag(parent,text,cx,cy,stringTop){
      var w=text.length*8.4+24,g=grp(parent,{class:'wtag'});
      el('path',{d:'M'+(cx-13)+' '+(cy-14)+' L'+cx+' '+stringTop+' L'+(cx+13)+' '+(cy-14)},g);
      el('circle',{cx:cx,cy:stringTop,r:2.2},g);
      el('rect',{x:cx-w/2,y:cy-14,width:w,height:28,rx:3},g);
      var t=el('text',{x:cx,y:cy+1},g);t.textContent=text;return g}
    function object(key,name,hit,label){
      var g=el('g',{class:'cut'},svg),w=grp(g,{transform:T}),PAD=10,c=CUT[name];
      var ring=el('image',{class:'ring',x:c.x-PAD,y:c.y-PAD,width:c.w+2*PAD,height:c.h+2*PAD,'pointer-events':'none'},w);ring.setAttribute('href','art2/'+name+'-ring.png');
      img(w,name,c);
      var tg=grp(w,{});tag(tg,label[0],label[1],label[2],label[3]);
      /* hit box + brackets are in scene units */
      var b=[OX+hit[0]*K,hit[1]*K,(hit[2]-hit[0])*K,(hit[3]-hit[1])*K];
      P.hot(key,g,{box:b,frame:b});
      var br=g.querySelector('.hbr');if(br)br.remove();   /* no frames: the tag + hover outline are the cue */
      return {g:g};
    }
    object('contact','raven',[62,32,266,314],['Contact',163,292,262]);
    object('art','construct',[772,46,990,274],['3D Art',962,292,266]);
    object('docs','books',[38,330,292,566],['Documents',173,545,525]);
    object('about','about',[338,392,698,568],['About',519,550,534]);
    object('games','disc',[702,282,962,566],['Games',833,549,528]);



    el('rect',{x:0,y:0,width:1600,height:900,fill:'url(#vig)','pointer-events':'none'},svg);
  }
});

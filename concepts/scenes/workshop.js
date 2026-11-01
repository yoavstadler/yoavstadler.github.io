/* Concept E - The Workshop (hand-drawn layered art).
   Layers: art2/plate.jpg (empty room) + one transparent cut-out per object (raven, construct, books, kit, disc).
   All art coordinates below are in source-image pixels (1024 x 572); K converts them to scene units.
   Hover = a pre-baked gold outline image (NAME-ring.png) that fades in: no CSS filters, no per-frame JS, so it stays smooth.
   To swap art: replace the PNGs in concepts/art2/ (same canvas position) and adjust the numbers here. */
PF.init({
  theme:'workshop',
  reel:{x:575,y:295,w:448,h:283,shape:'rect'},
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
    var CUT={raven:{x:82,y:123,w:198,h:132},construct:{x:774,y:50,w:203,h:222},books:{x:47,y:335,w:237,h:195},about:{x:334,y:359,w:376,h:192},disc:{x:705,y:280,w:254,h:257}};
    P.defs(
      '<radialGradient id="shd"><stop offset="0" stop-color="#050302" stop-opacity=".6"/><stop offset=".6" stop-color="#050302" stop-opacity=".25"/><stop offset="1" stop-color="#050302" stop-opacity="0"/></radialGradient>'+
      '<radialGradient id="cdl"><stop offset="0" stop-color="#ffcf70" stop-opacity=".5"/><stop offset=".5" stop-color="#ff9a3c" stop-opacity=".16"/><stop offset="1" stop-color="#ff9a3c" stop-opacity="0"/></radialGradient>'+
      '<radialGradient id="vig" cx=".5" cy=".5" r=".78"><stop offset=".62" stop-color="#0a0604" stop-opacity="0"/><stop offset="1" stop-color="#0a0604" stop-opacity=".5"/></radialGradient>'
    );
    function grp(parent,attrs){return el('g',attrs||{},parent)}
    function img(parent,name,box){var i=el('image',{x:box.x,y:box.y,width:box.w,height:box.h,'pointer-events':'none'},parent);i.setAttribute('href','art2/'+name+'.png');return i}

    /* 1 - empty room */
    var bg=el('image',{x:OX,y:0,width:1024*K,height:900,preserveAspectRatio:'none'},svg);
    bg.setAttribute('href','art2/plate.jpg');

    /* 2 - soft contact shadows + candle light (under the objects) */
    var world=grp(svg,{transform:T,'pointer-events':'none'});
    [[165,520,128,14],[520,538,190,13],[832,530,108,12],[882,262,72,7],[170,250,70,6]].forEach(function(s){
      el('ellipse',{cx:s[0],cy:s[1],rx:s[2],ry:s[3],fill:'url(#shd)'},world)});
    el('circle',{cx:968,cy:492,r:96,fill:'url(#cdl)'},world);

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
      /* dark under-stroke so the gold brackets read on light stone (no filters) */
      [].forEach.call(g.querySelectorAll('.hbr path'),function(pth){
        var u=pth.cloneNode();u.setAttribute('style','stroke:#1a0f08;stroke-width:7.5;opacity:.6;animation:none;filter:none');pth.parentNode.insertBefore(u,pth)});
      return {g:g};
    }
    object('contact','raven',[62,32,266,314],['Contact',163,292,262]);
    object('art','construct',[772,46,990,274],['3D Art',962,292,266]);
    object('docs','books',[38,330,292,566],['Documents',173,545,525]);
    object('about','about',[338,392,698,568],['About',519,550,534]);
    var disc=object('games','disc',[702,282,962,566],['Games',833,549,528]);
    /* round brackets for the round object: four arcs instead of square corners */
    (function(){
      var old=disc.g.querySelector('.hbr');if(old)old.remove();
      var br=el('g',{class:'hbr','pointer-events':'none'},disc.g);br.style.setProperty('--dl','1.9s');
      var cx=OX+832*K,cy=408*K,r=136*K;
      [45,135,225,315].forEach(function(a){
        var p=function(d){var t=(a+d)*Math.PI/180;return (cx+r*Math.cos(t)).toFixed(1)+' '+(cy+r*Math.sin(t)).toFixed(1)};
        var d='M'+p(-17)+' A'+r.toFixed(1)+' '+r.toFixed(1)+' 0 0 1 '+p(17);
        el('path',{d:d,style:'stroke:#1a0f08;stroke-width:7.5;opacity:.6;animation:none;filter:none'},br);
        el('path',{d:d},br)});
    })();


    /* 5 - candle flame (the candle is part of the empty room, so the flame sits on top) */
    var fl=grp(svg,{transform:T,'pointer-events':'none'}),f1=grp(fl,{transform:'translate(968,486)'}),f2=grp(f1,{class:'wflame'});
    el('path',{d:'M0 -27 C8 -15 10 -6 0 3 C-10 -6 -8 -15 0 -27Z',fill:'#ffc04a'},f2);
    el('path',{d:'M0 -15 C4 -10 5 -5 0 0 C-5 -5 -4 -10 0 -15Z',fill:'#fff1bd'},f2);

    el('rect',{x:0,y:0,width:1600,height:900,fill:'url(#vig)','pointer-events':'none'},svg);
  }
});

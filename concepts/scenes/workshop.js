/* Concept E - The Workshop (hand-drawn layered art, v12 art round).
   Layers: art3/plate.webp (the room, transparent where the video shows) + one transparent cut-out per object (raven/window, construct, books, about, disc).
   Window, books and construct also have a NAME-hover.webp patch (a second pose) that fades in on hover; every object has a gold outline ring.
   All art coordinates below are in source-image units (1024 x 572); K converts them to scene units. Images are stored at the master's resolution, 2.5 px per unit (WebP). The gold ring follows the HOVER pose.
   Hover = opacity fades only: no CSS filters, no per-frame JS, so it stays smooth.
   To swap art: replace the WebP files in concepts/art3/ (same canvas position) and adjust the numbers here. */
PF.init({
  theme:'workshop',
  reel:{x:577.3,y:290.8,w:452.8,h:295.2,shape:'rect'},   /* = the transparent frame interior of plate.webp */
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
    var CUT={raven:{x:49.69,y:19.48,w:233.34,h:296.94},construct:{x:769.19,y:48.10,w:254.81,h:273.09},books:{x:50.09,y:331.93,w:234.93,h:239.70},about:{x:333.52,y:358.96,w:377.24,h:212.67},disc:{x:680.94,y:278.26,w:278.66,h:293.37}};
    var HOV={raven:{x:159.40,y:96.99,w:189.22,h:129.59},books:{x:69.96,y:242.09,w:212.27,h:166.16},construct:{x:747.73,y:49.69,w:206.31,h:209.89}};
    var RING={raven:{x:41.74,y:11.53,w:314.83,h:312.84},construct:{x:739.78,y:40.15,w:284.22,h:288.99},books:{x:42.14,y:234.14,w:250.83,h:337.49},about:{x:333.52,y:358.96,w:377.24,h:212.67},disc:{x:680.94,y:278.26,w:278.66,h:293.37}};
    var SIGN={raven:[123,276,75,29],books:[129,531,90,30],construct:[909,284,71,26],about:[479,536,79,30],disc:[794,536,78,27]};
    P.defs(
      '<radialGradient id="vig" cx=".5" cy=".5" r=".78"><stop offset=".62" stop-color="#0a0604" stop-opacity="0"/><stop offset="1" stop-color="#0a0604" stop-opacity=".5"/></radialGradient>'
    );
    function grp(parent,attrs){return el('g',attrs||{},parent)}
    function pic(parent,file,box,cls){var i=el('image',{x:box.x,y:box.y,width:box.w,height:box.h,'pointer-events':'none'},parent);if(cls)i.setAttribute('class',cls);i.setAttribute('href','art3/'+file+'.webp');return i}

    /* 1 - the room (transparent frame interior: the highlight reel plays behind it) */
    var bg=el('image',{x:OX,y:0,width:1024*K,height:900,preserveAspectRatio:'none','pointer-events':'none'},svg);
    bg.setAttribute('href','art3/plate.webp');

    /* 2 - cut-out objects as clickable layers */
    function object(key,name,hit,label){
      var g=el('g',{class:'cut'},svg),w=grp(g,{transform:T}),c=CUT[name];
      pic(w,name+'-ring',RING[name],'ring');
      pic(w,name,c);
      if(HOV[name])pic(w,name+'-hover',HOV[name],'hov');
      var s=SIGN[name],tg=grp(w,{class:'wtag'});
      el('rect',{x:s[0],y:s[1],width:s[2],height:s[3],rx:2},tg);
      var t=el('text',{x:s[0]+s[2]/2,y:s[1]+s[3]/2+.5},tg);t.textContent=label;
      var b=[OX+hit[0]*K,hit[1]*K,(hit[2]-hit[0])*K,(hit[3]-hit[1])*K];
      P.hot(key,g,{box:b,frame:b});
      var br=g.querySelector('.hbr');if(br)br.remove();   /* no frames: the sign + hover outline are the cue */
      return {g:g};
    }
    object('contact','raven',[52,24,282,316],'Contact');
    object('art','construct',[750,46,1024,322],'3D Art');
    object('docs','books',[50,334,286,570],'Documents');
    object('about','about',[336,360,710,570],'About');
    object('games','disc',[684,280,960,570],'Games');

    el('rect',{x:0,y:0,width:1600,height:900,fill:'url(#vig)','pointer-events':'none'},svg);
  }
});

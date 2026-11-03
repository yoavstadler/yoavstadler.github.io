/* Shared landing engine.
   A concept page calls PF.init({theme, reel, flavor, draw}). The engine builds the stage, the highlight reel,
   the quick menu, the in-place single-scroll panels (deep links like #games/clockout) and parallax. */
(function(){
  var NS='http://www.w3.org/2000/svg',KEYS=['games','docs','art','about','contact'];
  var seed=5;
  function rnd(){seed=(seed*16807)%2147483647;return (seed-1)/2147483646}
  function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
  function svgEl(n,a,p){var e=document.createElementNS(NS,n);for(var k in a)e.setAttribute(k,a[k]);if(p)p.appendChild(e);return e}
  function h(tag,cls,html){var e=document.createElement(tag);if(cls)e.className=cls;if(html!=null)e.innerHTML=html;return e}

  window.PF={init:function(cfg){
    var D=window.PF_DATA.sections,F=cfg.flavor;
    document.body.setAttribute('data-theme',cfg.theme);
    var root=document.getElementById('pf');

    var skip=h('a','pf-skip','Skip to sections');skip.href='#pf-menu';skip.onclick=function(e){e.preventDefault();var b=document.querySelector('.pf-menu button');if(b)b.focus()};root.appendChild(skip);
    /* top bar */
    var bar=h('div','pf-bar','<b>Yoav Stadler<span>Game &middot; Systems Designer</span></b><nav><a href="'+window.PF_DATA.cv+'" target="_blank" rel="noopener">CV</a><a href="../index.html">Classic site</a><a href="index.html">All concepts</a></nav>');
    root.appendChild(bar);

    /* stage + svg */
    var stage=h('div','pf-stage'+(cfg.reelBehind?' behind':''));root.appendChild(stage);
    var svg=svgEl('svg',{class:'pf-svg',viewBox:'0 0 1600 900',preserveAspectRatio:'xMidYMid slice','aria-hidden':'false'});
    stage.appendChild(svg);

    var layers=[],hots={};
    var tip=h('div','pf-tip');document.body.appendChild(tip);

    var P={W:1600,H:900,el:svgEl,rnd:rnd,esc:esc,svg:svg,hots:hots,
      defs:function(html){var d=svg.querySelector('defs')||svgEl('defs',{},svg);d.insertAdjacentHTML('beforeend',html)},
      layer:function(depth,id){var g=svgEl('g',{'data-d':depth},svg);if(id)g.id=id;layers.push(g);return g},
      tag:function(parent,text,x,y){
        var w=text.length*11.6+30,g=svgEl('g',{class:'plq',transform:'translate('+x+','+y+')'},parent);
        svgEl('rect',{x:-w/2,y:-18,width:w,height:36,rx:9},g);
        var t=svgEl('text',{x:0,y:1},g);t.textContent=text;return g},
      sparkle:function(parent,x,y,size){
        var o=svgEl('g',{transform:'translate('+x+','+y+')','pointer-events':'none'},parent),g=svgEl('g',{class:'twinkle'},o);
        svgEl('circle',{r:size*1.5,fill:'url(#spark)'},g);
        svgEl('path',{d:'M0 '+(-size)+' Q'+(size*.18)+' '+(-size*.18)+' '+size+' 0 Q'+(size*.18)+' '+(size*.18)+' 0 '+size+' Q'+(-size*.18)+' '+(size*.18)+' '+(-size)+' 0 Q'+(-size*.18)+' '+(-size*.18)+' 0 '+(-size)+'Z',fill:'#fff2c0'},g);
        return o},
      icon:function(parent,type,x,y,size,color,sw){
        var ICONS={
          sword:'M4 20L16 8M13 5h6v6M20 20L8 8M11 5H5v6',
          scroll:'M6 4h12v14a2 2 0 0 0 2 2H8a2 2 0 0 1-2-2zM6 4a2 2 0 0 0-2 2v2h2M10 9h6M10 13h6',
          gem:'M6 4h12l4 6-10 11L2 10zM2 10h20M9 4l-2 6 5 11 5-11-2-6',
          shield:'M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z',
          feather:'M20 4C10 4 5 10 5 18l-1 2M5 18c8 0 13-5 15-14M9 14l5-5',
          book:'M5 4h12a2 2 0 0 1 2 2v14H7a2 2 0 0 1-2-2zM5 18a2 2 0 0 1 2-2h12M9 8h6',
          wand:'M4 20L16 8M15 3v4M13 5h4M20 9v3M18.5 10.5h3',
          hammer:'M13 4l7 7-3 3-7-7zM12 9L4 17l3 3 8-8',
          mail:'M3 6h18v12H3zM3 7l9 7 9-7'
        };
        var g=svgEl('g',{transform:'translate('+(x-size/2)+','+(y-size/2)+') scale('+(size/24)+')',fill:'none',stroke:color||'#f0bf5a','stroke-width':sw||2,'stroke-linecap':'round','stroke-linejoin':'round','pointer-events':'none'},parent);
        svgEl('path',{d:ICONS[type]||ICONS.gem},g);return g},
      motes:function(parent,n,o){
        o=o||{};for(var i=0;i<n;i++){
          var c=svgEl('circle',{class:'mote',cx:(o.x0||0)+rnd()*((o.x1||1600)-(o.x0||0)),cy:(o.y0||0)+rnd()*((o.y1||900)-(o.y0||0)),r:(o.r||2)+rnd()*(o.rv||1.6),fill:o.color||'#ffd27a'},parent);
          c.style.setProperty('--t',(5+rnd()*7).toFixed(1)+'s');
          c.style.setProperty('--dx',((o.dx||30)*(rnd()*2-1)).toFixed(0)+'px');
          c.style.setProperty('--dy',(-(o.dy||40)*(.3+rnd())).toFixed(0)+'px');
          c.style.animationDelay=(-rnd()*8).toFixed(1)+'s'}},
      /* mark a drawn group as the clickable object for a section */
      hot:function(key,g,o){
        o=o||{};var f=F[key];
        g.setAttribute('class',(g.getAttribute('class')||'')+' hot');
        g.setAttribute('tabindex','0');g.setAttribute('role','button');g.setAttribute('aria-label',f.name+' - '+f.sub);
        if(o.box)svgEl('rect',{x:o.box[0],y:o.box[1],width:o.box[2],height:o.box[3],fill:'transparent'},g);
        if(o.box){
          var fr=o.frame||o.box,bx=fr[0],by=fr[1],bw=fr[2],bh=fr[3],L=Math.max(14,Math.min(34,Math.min(bw,bh)*.2)),br=svgEl('g',{class:'hbr','pointer-events':'none'},g);
          br.style.setProperty('--dl',(1.2+Object.keys(hots).length*.35).toFixed(2)+'s');
          [[bx,by,1,1],[bx+bw,by,-1,1],[bx,by+bh,1,-1],[bx+bw,by+bh,-1,-1]].forEach(function(c){
            svgEl('path',{d:'M'+c[0]+' '+(c[1]+c[3]*L)+' V'+c[1]+' H'+(c[0]+c[2]*L)},br)});
        }
        if(o.ping)svgEl('circle',{class:'ping',cx:o.ping[0],cy:o.ping[1],r:o.ping[2]||60},g);
        hots[key]=g;
        g.addEventListener('click',function(e){e.stopPropagation();go(key)});
        g.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();go(key)}});
        g.addEventListener('pointerenter',function(e){spotOn(key);showTip(key,e.clientX,e.clientY)});
        g.addEventListener('pointermove',function(e){moveTip(e.clientX,e.clientY)});
        g.addEventListener('pointerleave',function(){spotOff();hideTip()});
        g.addEventListener('focus',function(){if(!kbd)return;spotOn(key);var r=g.getBoundingClientRect();showTip(key,r.left+r.width/2,r.top+r.height/2)});   /* keyboard focus only: a mouse click must never leave an object stuck in its hover look */
        g.addEventListener('blur',function(){spotOff();hideTip()});
        return g}
    };
    var kbd=false;   /* true while the last input was the keyboard */
    document.addEventListener('keydown',function(e){if(e.key==='Tab'||e.key==='Enter'||e.key===' '||e.key.indexOf('Arrow')===0)kbd=true},true);
    document.addEventListener('pointerdown',function(){kbd=false},true);
    function spotOn(k){stage.classList.add('spot');Object.keys(hots).forEach(function(j){hots[j].classList.toggle('on',j===k)})}
    function spotOff(){stage.classList.remove('spot');Object.keys(hots).forEach(function(j){hots[j].classList.remove('on')})}
    /* the tooltip follows the pointer, a little below and to the right of it; it flips sideways/upwards near the screen edges */
    function showTip(key,x,y){var f=F[key];tip.innerHTML='<b>'+esc(f.name)+'</b>'+esc(f.sub);tip.classList.add('on');moveTip(x,y)}
    function moveTip(x,y){var w=tip.offsetWidth,hh=tip.offsetHeight,vw=window.innerWidth,vh=window.innerHeight,tx=x+22,ty=y+26;
      if(tx+w>vw-8)tx=x-22-w;if(ty+hh>vh-8)ty=y-18-hh;
      tip.style.left=Math.max(8,tx)+'px';tip.style.top=Math.max(8,ty)+'px'}
    function hideTip(){tip.classList.remove('on')}

    cfg.draw(svg,P);
    if(document.body.getAttribute('data-theme')==='workshop')setTimeout(function(){['frame','plaque','btn','btn-hot','chip','close-red','close-red-hot','div-l','div-m','div-r','bullet','thumb','track'].forEach(function(n){var i=new Image();i.decoding='async';i.src='ui/'+n+'.png';if(i.decode)i.decode().catch(function(){})})},250);

    /* highlight reel */
    var R=cfg.reel,reel=h('div','pf-reel'+(R.shape==='circle'?' circle':R.shape==='oval'?' oval':R.shape==='rect'?' rect':''));
    reel.style.left=(R.x/16)+'%';reel.style.top=(R.y/9)+'%';reel.style.width=(R.w/16)+'%';reel.style.height=(R.h/9)+'%';
    if(R.tf){reel.style.transform=R.tf}
    if(R.r){reel.style.borderRadius=R.r}
    reel.innerHTML='<div class="pf-ph"><div><strong>Highlight reel</strong><small>drop your video in assets/reel.mp4</small></div></div>';
    var vid=document.createElement('video');
    vid.muted=true;vid.defaultMuted=true;vid.loop=true;vid.autoplay=true;vid.playsInline=true;vid.preload='auto';vid.setAttribute('playsinline','');vid.setAttribute('muted','');
    vid.poster=cfg.reelPoster||'../assets/reel-poster.jpg';
    vid.src=cfg.reelSrc||'../assets/reel.mp4';
    vid.addEventListener('loadeddata',function(){reel.classList.add('live')});
    vid.addEventListener('error',function(){reel.classList.remove('live')});
    reel.insertBefore(vid,reel.firstChild);
    var snd=h('button','pf-snd','<svg viewBox="0 0 24 24"><path d="M4 9v6h4l5 4V5L8 9z"/><path class="on" d="M16 9a4 4 0 0 1 0 6M18.5 6.5a8 8 0 0 1 0 11"/><path class="off" d="M17 9l5 6M22 9l-5 6"/></svg>');
    snd.type='button';snd.setAttribute('aria-label','Toggle sound');
    snd.onclick=function(e){e.stopPropagation();vid.muted=!vid.muted;snd.classList.toggle('unmuted',!vid.muted)};
    reel.appendChild(snd);
    stage.appendChild(reel);
    var pp=vid.play();if(pp&&pp.catch)pp.catch(function(){});

    /* quick menu + hint */
    var menu=h('nav','pf-menu');menu.id='pf-menu';menu.setAttribute('aria-label','Sections');
    KEYS.forEach(function(k,i){
      var b=h('button','','<kbd>'+(i+1)+'</kbd>'+(cfg.icons&&cfg.icons[k]?'<img class="pf-mi" src="'+cfg.icons[k]+'" alt="">':'')+esc(F[k].name));b.type='button';
      b.onclick=function(){go(k)};
      b.addEventListener('mouseenter',function(){spotOn(k)});
      b.addEventListener('mouseleave',spotOff);
      b.addEventListener('focus',function(){if(kbd)spotOn(k)});
      b.addEventListener('blur',spotOff);
      menu.appendChild(b)});
    stage.appendChild(menu);
    var hint=h('div','pf-hint',cfg.hint||'Click any framed object &middot; or press 1-5');
    stage.appendChild(hint);
    setTimeout(function(){hint.classList.add('gone')},9000);

    /* panel */
    var over=h('div','pf-over');over.setAttribute('role','dialog');over.setAttribute('aria-modal','true');
    document.body.appendChild(over);
    var cur=null,lastFocus=null;
    function frame(sec){
      var f=F[sec],S=D[sec];
      over.innerHTML='<div class="pf-frame" role="document"><i class="c c1"></i><i class="c c2"></i><i class="c c3"></i><i class="c c4"></i>'+
        '<div class="pf-head"><div class="ttl"><small>'+esc(f.name)+'</small><h2>'+esc(S.title)+'</h2></div>'+(cfg.icons&&cfg.icons[sec]?'<img class="pf-icon" src="'+cfg.icons[sec]+'" alt="">':'')+'<button class="pf-x" type="button" aria-label="Close">&times;</button></div>'+
        (S.tabs?'<div class="pf-tabs" role="tablist" aria-label="'+esc(S.title)+' categories">'+S.tabs.map(function(t){return '<button type="button" role="tab" class="pf-tab" data-tab="'+t.id+'" aria-selected="false">'+esc(t.name)+'</button>'}).join('')+'</div>':'')+
        '<div class="pf-body" tabindex="0"></div>'+
        '<div class="pf-foot"><span>'+esc(S.blurb)+'</span><span>'+S.more.map(function(m){return '<a href="'+m.u+'">'+esc(m.t)+' &rarr;</a>'}).join(' &nbsp; ')+'</span></div></div>';
      over.querySelector('.pf-x').onclick=function(){setHash('')};
    }
    function tabOf(S,id){
      if(!S.tabs)return null;
      for(var i=0;i<S.tabs.length;i++){var t=S.tabs[i];if(t.id===id||t.ids.indexOf(id)>-1)return t}
      return S.tabs[0]}
    /* click-to-load: third-party iframes become a thumbnail + button until the visitor asks for them */
    function lazify(html){
      var tpl=document.createElement('template');tpl.innerHTML=html;
      tpl.content.querySelectorAll('iframe').forEach(function(f){
        var src=f.getAttribute('src')||'';
        if(!/youtube|vimeo|sketchfab|drive\.google/.test(src))return;   /* the itch.io widget is a small card, so it loads in place (lazily) - no extra click */
        var b=document.createElement('button');b.type='button';
        b.className='pf-lazy '+(f.className||'');
        b.setAttribute('data-src',src);if(f.title)b.setAttribute('data-title',f.title);
        if(f.getAttribute('allow'))b.setAttribute('data-allow',f.getAttribute('allow'));
        if(f.hasAttribute('allowfullscreen'))b.setAttribute('data-fs','1');
        var m=src.match(/youtube\.com\/embed\/([\w-]+)/);
        if(m)b.style.backgroundImage='url(https://img.youtube.com/vi/'+m[1]+'/hqdefault.jpg)';
        var dm=src.match(/drive\.google\.com\/file\/d\/([\w-]+)/);
        if(dm)b.style.backgroundImage='url(https://drive.google.com/thumbnail?id='+dm[1]+'&sz=w1000)';
        var what=/sketchfab/.test(src)?'3D model':/itch/.test(src)?'game':'video';
        b.setAttribute('aria-label','Load '+what+(f.title?': '+f.title:''));
        b.innerHTML='<span><i></i>'+(what==='game'?'Load playable page':what==='3D model'?'Load 3D model':'Play video')+'</span>';
        f.replaceWith(b)});
      return tpl.innerHTML}
    /* projects in a tab that are already within about 12% of each other get the same minimum height (the tallest one), so the sections read as equal-sized blocks; re-measured when pictures load or the window changes */
    function eqItems(body){
      var its=body.querySelectorAll('.pf-item:not(.card)');if(its.length<2)return;
      its.forEach(function(e){e.style.minHeight=''});var m=0;
      var lo=1e9;its.forEach(function(e){m=Math.max(m,e.offsetHeight);lo=Math.min(lo,e.offsetHeight)});
      if((m-lo)/m<=0.12)its.forEach(function(e){e.style.minHeight=m+'px'});   /* only when they are already close: a big gap would just be empty space */
      if(!body._eq){body._eq=1;body.addEventListener('load',function(){clearTimeout(body._eqT);body._eqT=setTimeout(function(){eqItems(body)},80)},true);window.addEventListener('resize',function(){eqItems(body)})}
    }
    function select(sec,id){
      var S=D[sec],body=over.querySelector('.pf-body'),it=S.items[0];
      S.items.forEach(function(x){if(x.id===id)it=x});
      var tab=tabOf(S,id),list=tab?S.items.filter(function(x){return tab.ids.indexOf(x.id)>-1}):S.items;
      var key=tab?tab.id:'all';
      if(body.getAttribute('data-tab')!==key){
        body.setAttribute('data-tab',key);
        var multi=S.items.length>1;
        var cards=!!(tab&&tab.cards);
        body.innerHTML=(tab&&tab.intro?tab.intro:'')+(cards?'<div class="pf-cards">':'')+list.map(function(x){
          var html=lazify(x.render()).replace(/<iframe(?![^>]*loading=)/g,'<iframe loading="lazy"');
          return '<section class="pf-item'+(cards?' card':'')+'" data-id="'+x.id+'">'+(multi&&!cards?'<header class="pf-ih"><h3 class="pf-it">'+esc(x.name)+'</h3>'+(x.tag?'<span class="pf-itag">'+esc(x.tag)+'</span>':'')+'<button type="button" class="pf-copy" title="Copy a link to this project" data-copy="'+sec+'/'+x.id+'">Copy link</button></header>':'')+html+'</section>'}).join('')+(cards?'</div>':'');
        over.querySelectorAll('.pf-tab').forEach(function(b){var on=b.getAttribute('data-tab')===key;b.classList.toggle('on',on);b.setAttribute('aria-selected',on?'true':'false');b.tabIndex=on?0:-1});
      }
      eqItems(body);
      cur.item=it.id;
      var t=(id&&id!==key)?body.querySelector('[data-id="'+it.id+'"]'):null;
      body.scrollTop=t?Math.max(0,t.getBoundingClientRect().top-body.getBoundingClientRect().top+body.scrollTop-4):0;
    }
    function itemIndex(){
      var body=over.querySelector('.pf-body'),items=D[cur.sec].items,i=-1,top=body.getBoundingClientRect().top;
      items.forEach(function(x,k){var e=body.querySelector('[data-id="'+x.id+'"]');if(!e)return;if(i<0||e.getBoundingClientRect().top-top<=24)i=k});
      return Math.max(i,0)}
    function open(sec,id){
      if(!D[sec])return;
      if(!cur||cur.sec!==sec){
        lastFocus=document.activeElement;frame(sec);cur={sec:sec};
        over.classList.add('open');vid.pause();hideTip();
        Object.keys(hots).forEach(function(k){hots[k].classList.toggle('peek',k===sec)});
      }
      select(sec,id);
      if(!id||true){var x=over.querySelector('.pf-x');if(x&&document.activeElement===document.body||!over.contains(document.activeElement))x.focus({preventScroll:true})}
    }
    function close(){
      if(!cur)return;cur=null;over.classList.remove('open');over.innerHTML='';
      Object.keys(hots).forEach(function(k){hots[k].classList.remove('peek')});
      var p=vid.play();if(p&&p.catch)p.catch(function(){});
      if(lastFocus&&lastFocus.focus)try{lastFocus.focus({preventScroll:true});if(!kbd&&lastFocus.blur)lastFocus.blur()}catch(e){}
      spotOff();hideTip();
    }
    function setHash(v){
      if(v)location.hash=v;
      else{ if(location.hash){history.pushState('',document.title,location.pathname+location.search)} route()}
    }
    function go(sec){setHash(sec)}
    function route(){
      var m=location.hash.replace(/^#\/?/,'').split('/');
      if(m[0]&&D[m[0]])open(m[0],m[1]);else close();
    }
    window.addEventListener('hashchange',route);

    /* clicks inside panel: read-here embeds, in-page links, contact form */
    over.addEventListener('click',function(e){
      if(e.target===over){setHash('');return}
      var tb=e.target.closest('.pf-tab');
      if(tb){setHash(cur.sec+'/'+tb.getAttribute('data-tab'));return}
      var cp=e.target.closest('.pf-copy');
      if(cp){var u=location.href.split('#')[0]+'#'+cp.getAttribute('data-copy');
        var done=function(){cp.textContent='Link copied';cp.classList.add('ok');setTimeout(function(){cp.textContent='Copy link';cp.classList.remove('ok')},1800)};
        if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(u).then(done,function(){prompt('Copy this link',u)});else{prompt('Copy this link',u)}
        return}
      var lz=e.target.closest('.pf-lazy');
      if(lz){var fr=document.createElement('iframe');fr.className=lz.className.replace(/\bpf-lazy\b/,'').trim();
        var s=lz.getAttribute('data-src');
        if(/youtube|vimeo/.test(s)&&!/autoplay/.test(s))s+=(s.indexOf('?')>-1?'&':'?')+'autoplay=1';
        if(/sketchfab/.test(s)&&!/autostart/.test(s))s+=(s.indexOf('?')>-1?'&':'?')+'autostart=1&preload=1';
        fr.src=s;fr.title=lz.getAttribute('data-title')||'Embedded content';
        fr.setAttribute('allow',(lz.getAttribute('data-allow')||'')+'; autoplay; fullscreen');
        if(lz.getAttribute('data-fs'))fr.setAttribute('allowfullscreen','');
        lz.replaceWith(fr);fr.focus();return}
      var b=e.target.closest('[data-embed]');
      if(b){var slot=(b.closest('.pf-item')||over).querySelector('[data-slot]');
        var it0=b.closest('.pf-item');if(it0)it0.classList.add('open');
        slot.innerHTML='<iframe class="pf-read" src="'+b.getAttribute('data-embed')+'" title="Document preview" allow="fullscreen"></iframe>';
        b.textContent='Reading...';b.disabled=true;slot.scrollIntoView({behavior:'smooth',block:'nearest'})}
    });
    /* keep every screenshot/GIF in its own proportions: vertical ones stay vertical, nothing is cropped */
    over.addEventListener('load',function(e){var im=e.target;
      if(!im||im.tagName!=='IMG'||!im.closest('.pf-shots')||!im.naturalWidth)return;
      var r=im.naturalWidth/im.naturalHeight,fg=im.closest('figure');
      if(r<0.95&&fg)fg.classList.add('tall');else if(r>=0.95)im.style.aspectRatio=r.toFixed(3)},true);
    over.addEventListener('submit',function(e){
      var f=e.target.closest('form[data-mailto]');if(!f)return;e.preventDefault();
      var d=new FormData(f),name=(d.get('first')+' '+d.get('last')).trim();
      var body=d.get('comment')+'\n\n- '+name+' ('+d.get('email')+')';
      location.href='mailto:'+f.getAttribute('data-mailto')+'?subject='+encodeURIComponent('Portfolio message from '+name)+'&body='+encodeURIComponent(body);
    });
    document.addEventListener('error',function(e){if(e.target&&e.target.tagName==='IMG')e.target.classList.add('broken')},true);

    /* keyboard */
    document.addEventListener('keydown',function(e){
      var t=e.target,typing=t&&(t.tagName==='INPUT'||t.tagName==='TEXTAREA');
      if(e.key==='Escape'&&cur){setHash('');return}
      if(cur&&e.key==='Tab'){
        var fs=[].slice.call(over.querySelectorAll('a[href],button:not([disabled]),input,textarea,select,iframe,[tabindex="0"]')).filter(function(n){return n.offsetParent!==null&&n.tabIndex>=0});
        if(fs.length){var first=fs[0],last=fs[fs.length-1];
          if(!over.contains(document.activeElement)){first.focus();e.preventDefault()}
          else if(e.shiftKey&&document.activeElement===first){last.focus();e.preventDefault()}
          else if(!e.shiftKey&&document.activeElement===last){first.focus();e.preventDefault()}}
        return}
      if(cur&&e.target&&e.target.classList&&e.target.classList.contains('pf-tab')&&(e.key==='ArrowRight'||e.key==='ArrowLeft')){
        var tabs=D[cur.sec].tabs,ci=0;tabs.forEach(function(t,n){if(t.id===over.querySelector('.pf-body').getAttribute('data-tab'))ci=n});
        ci=(ci+(e.key==='ArrowRight'?1:-1)+tabs.length)%tabs.length;setHash(cur.sec+'/'+tabs[ci].id);
        setTimeout(function(){var t=over.querySelector('.pf-tab.on');if(t)t.focus()},0);e.preventDefault();return}
      if(typing||e.metaKey||e.ctrlKey||e.altKey)return;
      if(/^[1-5]$/.test(e.key)){go(KEYS[+e.key-1]);return}
      if(cur&&(e.key==='ArrowRight'||e.key==='ArrowLeft')){
        var items=D[cur.sec].items,i=itemIndex();
        i=(i+(e.key==='ArrowRight'?1:-1)+items.length)%items.length;
        setHash(cur.sec+'/'+items[i].id);e.preventDefault()}
    });

    /* parallax */
    if(!matchMedia('(prefers-reduced-motion: reduce)').matches){
      var cx=0,cy=0,tx=0,ty=0,hover=false;
      stage.addEventListener('pointermove',function(e){var r=stage.getBoundingClientRect();tx=((e.clientX-r.left)/r.width-.5)*2;ty=((e.clientY-r.top)/r.height-.5)*2;hover=true});
      stage.addEventListener('pointerleave',function(){hover=false});
      (function tick(t){
        if(!hover){tx=Math.sin(t/2800)*.3;ty=0}
        cx+=(tx-cx)*.06;cy+=(ty-cy)*.06;
        layers.forEach(function(l){var d=+l.getAttribute('data-d');l.style.transform='translate('+(-cx*d*10).toFixed(2)+'px,'+(-cy*d*4).toFixed(2)+'px)'});
        requestAnimationFrame(tick)})(0);
    }
    route();
  }};
})();

/* v39: ?dbg=1 shows switches for finding what draws the pale box on button hover */
(function(){try{if(!/[?&]dbg=1/.test(location.search))return}catch(e){return}
var items=[['art','hover frame art -> resting art'],['text','hide the label text'],['shadow','no label outline'],['lift','no 1px lift (transform)'],['back','no backing colour'],['frame','no panel pop animation'],['sel','no text selection'],['stage','ignore scene mouse (parallax)'],['ease','easing ON (.12s)']];
var b=document.createElement('div');b.className='dbg-box';b.innerHTML='<b>Hover test: tick one, then hover a button</b>'+items.map(function(i){return '<label><input type="checkbox" data-k="'+i[0]+'"> '+i[1]+'</label>'}).join('')+'<label style="margin-top:6px;opacity:.7">tell me which tick makes the box vanish</label>';
b.addEventListener('change',function(e){var k=e.target.getAttribute('data-k');if(k)document.documentElement.classList.toggle('d-'+k,e.target.checked)});
document.body.appendChild(b)})();

/* Landing scene: a paladin at a fork in the forest road. Everything is drawn in SVG here, so no image files are needed.
   Swap the art later by replacing the shapes, or put your own render behind the signposts.
   To change what a signpost links to, edit SECTIONS. A section with "to" goes straight to that page; one with "links" opens a small panel. */
(function(){
  var SECTIONS=[
    {id:'games',label:'Games',x:340,y:446,s:1.0,blurb:'Shipped mobile titles, student projects and game jams.',
     links:[{t:'Shipped Games',u:'shipped-games.html'},{t:'Student Games',u:'student-games.html'},{t:'Game Jams',u:'game-jams.html'}]},
    {id:'docs',label:'Design Documents',x:655,y:380,s:0.8,blurb:'Fan GDDs and systems design write-ups.',
     links:[{t:'Fan GDD Series',u:'fan-gdd-series.html'},{t:'Systems Documents',u:'system-documents.html'}]},
    {id:'art',label:'3D Art',x:945,y:380,s:0.8,to:'3d-art.html'},
    {id:'contact',label:'Contact',x:1260,y:446,s:1.0,to:'contact.html'}
  ];

  var NS='http://www.w3.org/2000/svg';
  var $=function(id){return document.getElementById(id)};
  var host=$('scene'); if(!host) return;
  function el(n,a,p){var e=document.createElementNS(NS,n);for(var k in a)e.setAttribute(k,a[k]);if(p)p.appendChild(e);return e}
  var seed=11;function rnd(){seed=(seed*16807)%2147483647;return (seed-1)/2147483646}

  var svg=$('svg');
  svg.innerHTML=
  '<defs>'+
  '<linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0a1620"/><stop offset=".6" stop-color="#1d3030"/><stop offset=".85" stop-color="#7a6330"/><stop offset=".96" stop-color="#d9a441"/><stop offset="1" stop-color="#c8922a"/></linearGradient>'+
  '<radialGradient id="sun"><stop offset="0" stop-color="#ffd88a" stop-opacity=".9"/><stop offset="1" stop-color="#c8922a" stop-opacity="0"/></radialGradient>'+
  '<radialGradient id="lantern"><stop offset="0" stop-color="#ffd27a" stop-opacity=".95"/><stop offset="1" stop-color="#ffb347" stop-opacity="0"/></radialGradient>'+
  '<linearGradient id="roadGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7b6644"/><stop offset="1" stop-color="#4c3f2b"/></linearGradient>'+
  '<linearGradient id="roadLit" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#b8975a"/><stop offset="1" stop-color="#7a6439"/></linearGradient>'+
  '<linearGradient id="ground" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1c3022"/><stop offset="1" stop-color="#08120c"/></linearGradient>'+
  '<linearGradient id="mist" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e8b85a" stop-opacity="0"/><stop offset=".5" stop-color="#e8b85a" stop-opacity=".16"/><stop offset="1" stop-color="#e8b85a" stop-opacity="0"/></linearGradient>'+
  '<linearGradient id="steel" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#8b95a1"/><stop offset="1" stop-color="#4a525c"/></linearGradient>'+
  '<linearGradient id="cape" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9a2e36"/><stop offset="1" stop-color="#5c1a20"/></linearGradient>'+
  '<radialGradient id="vig" cx=".5" cy=".55" r=".75"><stop offset=".6" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".6"/></radialGradient>'+
  '</defs>'+
  '<g data-d="0.2"><rect x="-300" y="-300" width="2200" height="700" fill="url(#sky)"/><ellipse cx="800" cy="352" rx="640" ry="240" fill="url(#sun)"/></g>'+
  '<g data-d="0.5" id="far"></g><g data-d="0.9" id="mid"></g>'+
  '<g data-d="1.4" id="ground"><path d="M-300 354 Q 400 332 800 347 T 1900 354 L1900 900 L-300 900Z" fill="url(#ground)"/>'+
  '<rect x="-300" y="318" width="2200" height="90" fill="url(#mist)"/><g id="roads"></g><g id="signs"></g></g>'+
  '<g data-d="1.8" id="paladin"></g><g data-d="3.2" id="near"></g><g id="flies"></g>'+
  '<rect x="-300" y="-300" width="2200" height="1200" fill="url(#vig)" pointer-events="none"/>';

  function pine(g,x,base,h,wf,fill){
    var w=h*wf,y=function(f){return base-h*f};
    var R=[[.30,.66],[.16,.66],[.46,.36],[.26,.36],[.62,.08]];
    var right=R.map(function(r){return [x+w*r[0],y(r[1])]});
    var left=R.map(function(r){return [x-w*r[0],y(r[1])]}).reverse();
    var pts=[[x,y(1)]].concat(right,[[x+w*.08,base],[x-w*.08,base]],left);
    el('polygon',{points:pts.map(function(p){return p.join(',')}).join(' '),fill:fill},g);
  }
  function ribbon(p0,p1,p2,w0,w1,n){
    n=n||24;var L=[],R=[];
    for(var i=0;i<=n;i++){
      var t=i/n,u=1-t;
      var x=u*u*p0[0]+2*u*t*p1[0]+t*t*p2[0],y=u*u*p0[1]+2*u*t*p1[1]+t*t*p2[1];
      var dx=2*u*(p1[0]-p0[0])+2*t*(p2[0]-p1[0]),dy=2*u*(p1[1]-p0[1])+2*t*(p2[1]-p1[1]);
      var len=Math.hypot(dx,dy)||1,nx=-dy/len,ny=dx/len,w=(w0+(w1-w0)*t)/2;
      L.push([x+nx*w,y+ny*w*.45]);R.push([x-nx*w,y-ny*w*.45]);
    }
    return 'M'+L.map(function(p){return p.join(' ')}).join('L')+'L'+R.reverse().map(function(p){return p.join(' ')}).join('L')+'Z';
  }

  /* far + mid layers */
  var far=$('far');
  el('path',{d:'M-300 360 L-60 270 L120 320 L330 210 L560 322 L760 250 L1000 330 L1230 225 L1460 315 L1700 255 L1900 300 L1900 380 L-300 380Z',fill:'#16302d',opacity:.85},far);
  el('path',{d:'M-300 372 L40 300 L250 345 L500 270 L720 350 L900 300 L1120 352 L1380 280 L1650 345 L1900 310 L1900 390 L-300 390Z',fill:'#102622'},far);
  for(var x=-200;x<1800;x+=34)pine(far,x+rnd()*14,356,60+rnd()*60,.2,'#0f241f');
  var mid=$('mid');
  for(var x2=-220;x2<1820;x2+=64){if(x2>560&&x2<1040)continue;pine(mid,x2+rnd()*20,378,130+rnd()*110,.22,'#0b1c17')}

  /* roads */
  var roads=$('roads');
  el('path',{d:ribbon([800,830],[800,640],[800,478],620,120),class:'road'},roads);
  var branches=[
    ribbon([796,482],[560,480],[340,446],110,26),
    ribbon([798,480],[742,424],[655,382],84,16),
    ribbon([802,480],[858,424],[945,382],84,16),
    ribbon([804,482],[1040,480],[1260,446],110,26)
  ];
  var roadEls=branches.map(function(d){return el('path',{d:d,class:'road'},roads)});
  el('ellipse',{cx:800,cy:486,rx:74,ry:20,fill:'#6f5c3d'},roads);

  /* panel + mobile buttons */
  var panel=$('panel'),mnav=$('mnav');
  function esc(s){return s.replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
  function closePanel(){panel.classList.remove('open');SECTIONS.forEach(function(o){o.node.classList.remove('active');o.road.classList.remove('lit')})}
  function openSection(s){
    SECTIONS.forEach(function(o){o.node.classList.toggle('active',o===s);o.road.classList.toggle('lit',o===s)});
    var links=s.links.map(function(l){return '<a href="'+esc(l.u)+'">'+esc(l.t)+'</a>'}).join('');
    panel.innerHTML='<button class="x" aria-label="Close">&times;</button><h2>'+esc(s.label)+'</h2><p>'+esc(s.blurb)+'</p><div class="links">'+links+'</div>';
    panel.classList.add('open');panel.querySelector('.x').onclick=closePanel;
  }

  /* signposts */
  var signs=$('signs');
  SECTIONS.forEach(function(s,i){
    var g=s.to?el('a',{href:s.to,class:'sign','aria-label':s.label},signs):el('g',{class:'sign',tabindex:0,role:'button','aria-label':s.label+' (opens a menu)'},signs);
    g.setAttribute('transform','translate('+s.x+','+s.y+') scale('+s.s+')');
    var w=s.label.length*11.5+36;
    el('ellipse',{cx:0,cy:2,rx:22,ry:6,fill:'#000',opacity:.35},g);
    el('rect',{class:'post',x:-5,y:-84,width:10,height:84,rx:2},g);
    el('circle',{class:'glow',cx:0,cy:-132,r:42,fill:'url(#lantern)'},g);
    el('circle',{cx:0,cy:-132,r:7,fill:'#ffd27a'},g);
    el('rect',{class:'plaque',x:-w/2,y:-112,width:w,height:40,rx:8},g);
    var t=el('text',{x:0,y:-85},g);t.textContent=s.label;
    el('rect',{x:-w/2-10,y:-160,width:w+20,height:170,fill:'transparent'},g);
    s.node=g;s.road=roadEls[i];
    g.addEventListener('pointerenter',function(){s.road.classList.add('lit')});
    g.addEventListener('pointerleave',function(){if(!g.classList.contains('active'))s.road.classList.remove('lit')});
    g.addEventListener('focus',function(){s.road.classList.add('lit')});
    g.addEventListener('blur',function(){if(!g.classList.contains('active'))s.road.classList.remove('lit')});
    if(!s.to){
      g.addEventListener('click',function(e){e.stopPropagation();openSection(s)});
      g.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();openSection(s)}});
    }
    var b=document.createElement(s.to?'a':'button');b.textContent=s.label;
    if(s.to)b.href=s.to;else b.onclick=function(){openSection(s)};
    mnav.appendChild(b);
  });
  host.addEventListener('click',function(e){if(!e.target.closest('.panel')&&!e.target.closest('.sign'))closePanel()});
  document.addEventListener('keydown',function(e){if(e.key==='Escape')closePanel()});

  /* paladin (placeholder art, seen from behind) */
  var pal=el('g',{transform:'translate(800,778) scale(1.3)'},$('paladin'));
  el('ellipse',{cx:0,cy:2,rx:46,ry:8,fill:'#000',opacity:.4},pal);
  var b=el('g',{class:'breathe'},pal);
  el('path',{d:'M-28 -114 L28 -114 L46 -6 Q0 8 -46 -6Z',fill:'url(#cape)'},b);
  el('path',{d:'M-46 -6 Q0 8 46 -6',fill:'none',stroke:'#C8922A','stroke-width':3},b);
  el('path',{d:'M0 -112 L0 -8',stroke:'#3d1015','stroke-width':2,opacity:.6},b);
  el('rect',{x:-48,y:-104,width:12,height:56,rx:6,fill:'url(#steel)',stroke:'#C8922A','stroke-width':1.5,'stroke-opacity':.7},b);
  el('ellipse',{cx:-30,cy:-112,rx:16,ry:11,fill:'url(#steel)',stroke:'#C8922A','stroke-width':1.5,'stroke-opacity':.7},b);
  el('ellipse',{cx:30,cy:-112,rx:16,ry:11,fill:'url(#steel)',stroke:'#C8922A','stroke-width':1.5,'stroke-opacity':.7},b);
  el('ellipse',{cx:0,cy:-138,rx:18,ry:22,fill:'url(#steel)',stroke:'#C8922A','stroke-width':1.5,'stroke-opacity':.7},b);
  el('path',{d:'M-3 -158 Q 20 -184 6 -200 Q -6 -180 -12 -158Z',fill:'#b3282d'},b);
  el('line',{x1:34,y1:-62,x2:44,y2:-26,stroke:'#cdbf9e','stroke-width':4,'stroke-linecap':'round'},b);
  el('line',{x1:28,y1:-58,x2:46,y2:-64,stroke:'#C8922A','stroke-width':4,'stroke-linecap':'round'},b);

  /* framing trees + fireflies */
  var near=$('near');
  [-60,40,150].forEach(function(x,i){pine(near,x,830,780-i*120,.2,'#050d0a')});
  [1660,1560,1450].forEach(function(x,i){pine(near,x,830,780-i*120,.2,'#050d0a')});
  var flies=$('flies');
  for(var i=0;i<16;i++){
    var c=el('circle',{class:'ff',cx:100+rnd()*1400,cy:380+rnd()*330,r:2+rnd()*1.8},flies);
    c.style.setProperty('--t',(6+rnd()*7).toFixed(1)+'s');
    c.style.setProperty('--dx',(rnd()*60-30).toFixed(0)+'px');
    c.style.setProperty('--dy',(-10-rnd()*40).toFixed(0)+'px');
    c.style.animationDelay=(-rnd()*8).toFixed(1)+'s';
  }

  /* parallax */
  var layers=[].slice.call(svg.querySelectorAll('[data-d]'));
  if(!matchMedia('(prefers-reduced-motion: reduce)').matches){
    var cx=0,cy=0,tx=0,ty=0,hover=false;
    host.addEventListener('pointermove',function(e){var r=host.getBoundingClientRect();tx=((e.clientX-r.left)/r.width-.5)*2;ty=((e.clientY-r.top)/r.height-.5)*2;hover=true});
    host.addEventListener('pointerleave',function(){hover=false});
    (function tick(t){
      if(!hover){tx=Math.sin(t/2600)*.35;ty=0}
      cx+=(tx-cx)*.06;cy+=(ty-cy)*.06;
      layers.forEach(function(l){var d=+l.getAttribute('data-d');l.style.transform='translate('+(-cx*d*10).toFixed(2)+'px,'+(-cy*d*4).toFixed(2)+'px)'});
      requestAnimationFrame(tick);
    })(0);
  }
})();

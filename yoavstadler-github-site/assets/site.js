/* Shared behaviour: header + footer, dropdown menus, featured slider, reveal-on-scroll, contact form.
   Edit NAV below to change the menu on every page at once. */
(function(){
  var NAV=[
    {t:'Home',u:'index.html',key:'home'},
    {t:'Games',u:'shipped-games.html',key:'games',sub:[
      {t:'Shipped Games',u:'shipped-games.html'},
      {t:'Student Games',u:'student-games.html'},
      {t:'Game Jams',u:'game-jams.html'}]},
    {t:'Design Documents',u:'fan-gdd-series.html',key:'docs',sub:[
      {t:'Fan GDD Series',u:'fan-gdd-series.html'},
      {t:'Systems Documents',u:'system-documents.html'}]},
    {t:'3D Art',u:'3d-art.html',key:'art'},
    {t:'Contact',u:'contact.html',key:'contact'}
  ];
  var LINKS={email:'mailto:yoav.stadler@gmail.com',linkedin:'https://www.linkedin.com/in/yoav-stadler',sketchfab:'https://sketchfab.com/Yoav_Stadler'};

  var file=(location.pathname.split('/').pop()||'index.html');
  var page=document.body.getAttribute('data-page')||'';

  /* header */
  var hdr=document.getElementById('site-header');
  if(hdr){
    var li=NAV.map(function(n){
      var cur=(n.u===file||(n.sub&&n.sub.some(function(s){return s.u===file})))?' aria-current="page"':'';
      var own=n.u===file?' aria-current="page"':'';
      var sub=n.sub?'<ul class="sub">'+n.sub.map(function(s){return '<li><a href="'+s.u+'"'+(s.u===file?' aria-current="page"':'')+'>'+s.t+'</a></li>'}).join('')+'</ul>':'';
      return '<li class="'+(n.sub?'has-sub':'')+(n.key===page?' on':'')+'"><a href="'+n.u+'"'+(n.sub?'':own)+(n.sub&&cur?' aria-haspopup="true"':'')+'>'+n.t+'</a>'+sub+'</li>';
    }).join('');
    hdr.innerHTML='<div class="bar"><a class="brand" href="index.html">YOAV STADLER</a>'+
      '<button class="burger" aria-label="Menu" aria-expanded="false" aria-controls="nav"><span></span></button>'+
      '<nav id="nav" aria-label="Main"><ul>'+li+'</ul></nav></div>';
    var burger=hdr.querySelector('.burger'),nav=hdr.querySelector('nav');
    burger.addEventListener('click',function(){var o=nav.classList.toggle('open');burger.setAttribute('aria-expanded',o)});
    document.addEventListener('keydown',function(e){if(e.key==='Escape'){nav.classList.remove('open');burger.setAttribute('aria-expanded','false')}});
  }

  /* footer */
  var ft=document.getElementById('site-footer');
  if(ft){
    ft.className='site-footer';
    ft.innerHTML='<div class="wrap"><span>Yoav Stadler &middot; Game &middot; Systems Designer</span><span>'+
      '<a href="'+LINKS.email+'">Email</a><a href="'+LINKS.linkedin+'" target="_blank" rel="noopener">LinkedIn</a><a href="'+LINKS.sketchfab+'" target="_blank" rel="noopener">Sketchfab</a></span></div>';
  }

  /* reveal on scroll */
  var rv=[].slice.call(document.querySelectorAll('.reveal'));
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.08});
    rv.forEach(function(el){io.observe(el)});
  }else{rv.forEach(function(el){el.classList.add('in')})}

  /* featured slider */
  var s=document.querySelector('[data-slider]');
  if(s){
    var track=s.querySelector('.track'),slides=[].slice.call(track.children),dotsEl=s.querySelector('.dots'),i=0,timer=null;
    slides.forEach(function(_,n){var b=document.createElement('button');b.setAttribute('aria-label','Slide '+(n+1));b.addEventListener('click',function(){go(n,true)});dotsEl.appendChild(b)});
    var dots=[].slice.call(dotsEl.children);
    function go(n,user){
      i=(n+slides.length)%slides.length;
      track.style.transform='translateX(-'+(i*100)+'%)';
      dots.forEach(function(d,k){d.setAttribute('aria-current',k===i)});
      slides.forEach(function(sl,k){sl.tabIndex=k===i?0:-1;sl.setAttribute('aria-hidden',k===i?'false':'true')});
      if(user)restart();
    }
    function restart(){clearInterval(timer);if(!matchMedia('(prefers-reduced-motion: reduce)').matches)timer=setInterval(function(){go(i+1)},5000)}
    s.querySelector('.prev').addEventListener('click',function(){go(i-1,true)});
    s.querySelector('.next').addEventListener('click',function(){go(i+1,true)});
    s.addEventListener('mouseenter',function(){clearInterval(timer)});
    s.addEventListener('mouseleave',restart);
    s.addEventListener('focusin',function(){clearInterval(timer)});
    var x0=null;
    s.addEventListener('touchstart',function(e){x0=e.touches[0].clientX},{passive:true});
    s.addEventListener('touchend',function(e){if(x0===null)return;var dx=e.changedTouches[0].clientX-x0;if(Math.abs(dx)>40)go(i+(dx<0?1:-1),true);x0=null});
    // slide images that fail to load fall back to the gradient behind them
    s.querySelectorAll('img').forEach(function(im){im.addEventListener('error',function(){im.style.display='none'})});
    go(0);restart();
  }

  /* images that fail to load fall back gracefully */
  document.querySelectorAll('img[data-fallback]').forEach(function(im){im.addEventListener('error',function(){im.style.display='none'})});

  /* contact form: opens the visitor's email app with the message filled in */
  var f=document.getElementById('contact-form');
  if(f){
    f.addEventListener('submit',function(e){
      e.preventDefault();
      var d=new FormData(f),name=((d.get('first')||'')+' '+(d.get('last')||'')).trim();
      var body='Name: '+name+'\nEmail: '+(d.get('email')||'')+'\n\n'+(d.get('comment')||'');
      location.href='mailto:yoav.stadler@gmail.com?subject='+encodeURIComponent('Portfolio message from '+(name||'a visitor'))+'&body='+encodeURIComponent(body);
    });
  }
})();

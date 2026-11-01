/* All portfolio content for the landing concepts, in one place.
   Edit text, links and ids here and every concept updates. Each section has items (shown as tabs). */
(function(){
  function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
  var IMG=function(id,w){return 'https://lh3.googleusercontent.com/d/'+id+'=w'+(w||900)};
  var PREV=function(id){return 'https://drive.google.com/file/d/'+id+'/preview'};
  var DL=function(id){return 'https://drive.google.com/uc?export=download&id='+id};
  var WEEBLY='https://yoavstadler.weebly.com/uploads/1/5/3/9/153988856/';
  var CV='https://drive.google.com/file/d/1gcEmQcEfi3NBi9tTSo0CpcGJJECU0DMk/view?usp=sharing';

  function badges(a){return '<div class="pf-badges">'+a.map(function(b,i){return '<span class="pf-badge'+(i?' ghost':'')+'">'+esc(b)+'</span>'}).join('')+'</div>'}
  function meta(a){return '<dl class="pf-meta">'+a.map(function(m){return '<div><dt>'+esc(m[0])+'</dt><dd>'+esc(m[1])+'</dd></div>'}).join('')+'</dl>'}
  function shots(ids,alt){return '<div class="pf-shots'+(ids.length===1?' one':'')+'">'+ids.map(function(id,i){return '<img src="'+IMG(id,1000)+'" alt="'+esc(alt)+' screenshot '+(i+1)+'" loading="lazy">'}).join('')+'</div>'}
  function yt(id,t){return '<div class="pf-video"><iframe src="https://www.youtube-nocookie.com/embed/'+id+'?rel=0" title="'+esc(t)+'" loading="lazy" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowfullscreen></iframe></div>'}
  function itch(id,t){return '<iframe class="pf-embed" src="https://itch.io/embed/'+id+'" title="'+esc(t)+' on itch.io" loading="lazy"></iframe>'}
  function did(a){return '<div class="pf-did"><h4>What I did</h4><ul>'+a.map(function(x){return '<li>'+x+'</li>'}).join('')+'</ul></div>'}
  function callout(t){return '<div class="pf-callout"><b>Design decision:</b> '+t+'</div>'}
  function btns(a){return '<div class="pf-btns">'+a.map(function(b){
    if(b.q)return '<a class="pf-quiet" href="'+b.u+'">'+b.t+'</a>';
    return '<a class="pf-btn'+(b.g?' ghost':'')+'" href="'+b.u+'"'+(b.go?'':' target="_blank" rel="noopener"')+'>'+b.t+'</a>'}).join('')+'</div>'}
  function paras(a){return a.map(function(p){return '<p>'+p+'</p>'}).join('')}

  function project(o){
    var media=(o.shots||'')+(o.video||'')+(o.itch||'');
    var left=o.media?o.media:media;
    return badges(o.badges)+meta(o.meta)+
      '<div class="pf-split"><div>'+left+'</div><div>'+paras(o.text)+(o.callout?callout(o.callout):'')+did(o.did)+btns(o.btns)+'</div></div>';
  }

  /* ---------- games ---------- */
  var shipped=[
    ['Ice Cream Roll!','I',1659269562,'us','ice-cream-roll','Competitive arena - roll your scoop to grow it, build a bridge to the next zone, and knock rivals off theirs.'],
    ['Cop or Con','C',1603808802,'us','cop-or-con','Endless runner with a morality system - every item collected visibly transforms your character toward cop or criminal.'],
    ['The Last Warrior!','T',6444162261,'us','the-last-warrior','Co-op survival shooter - defend your garden against waves of evil plants, managing stamina and firepower as enemies escalate.'],
    ['Balls Release','B',1661557974,'us','balls-release','Physics puzzle - pull pins in the right order to release balls using momentum and timing so they reach their target without spilling.'],
    ['Sketch and Smash','S',6458546475,'be','sketch-and-smash','Drawing puzzle - sketch lines and shapes to smash the bad eggs while protecting the good ones. Strategy disguised as doodling.'],
    ['Find & Seek','F',6450957903,'us','find-seek','Hidden-object puzzle with a hint system and daily challenges - built around a relaxing spot-the-difference loop.'],
    ['Pass the Road','P',6453941910,'us','pass-the-road','Hyper-casual road-crosser - dodge traffic and collect cosmetic characters as pace and obstacle density ramp up.'],
    ['Wavy Grow','W',6451112737,'us','wavy-grow','3D endless runner - navigate winding paths, dodge obstacles, and grow stronger as you race to the finish line.']
  ];

  var games=[
    {id:'bigred',name:'Big Red, Little Red',tag:'Jam',render:function(){return project({
      badges:['Game jam - Mini Jame Gam #59','Play in browser'],
      meta:[['Type','Game jam'],['Role','Systems Designer, Programmer & 3D Artist'],['Team','4'],['Engine','Unity'],['Duration','2 days']],
      shots:shots(['1G99_ngCOning-J6H5561b0wFGgvAKZ2x','1BR0VVQ95qs8ur8oBbvy_2dtG7S3VsW-N'],'Big Red, Little Red'),itch:itch(5032761,'Big Red, Little Red'),
      text:['A 2-player local co-op action game where two tomatoes battle an army of vegetables together, combining dash, shooting, and grenade abilities to survive increasingly difficult waves. Made in 2 days with three friends.','Between rounds, each player picks from their own separate upgrade pool, so the two characters specialize into distinct playstyles over a run. The core design focus was local co-op feel, responsive controls, and a wave-based difficulty curve - the Systems Design Log shows how that curve was iterated on.'],
      did:['Designed the game\'s core systems and mechanics','Balanced each player\'s separate upgrade pool','Designed, balanced and programmed the enemies and their wave-difficulty curve (documented in the Systems Design Log)','Programmed Little Red, the second player character, end to end'],
      btns:[{t:'Play on itch.io &rarr;',u:'https://yoavstad.itch.io/big-red-little-red'},{t:'Read the Systems Design Log &rarr;',u:'#docs/log',g:1,go:1}]})}},
    {id:'clockout',name:'Clock Out',tag:'Jam',render:function(){return project({
      badges:['Game jam - The Game Design','Trailer','Play in browser'],
      meta:[['Type','University game jam'],['Role','Game & Systems Designer'],['Team','3'],['Engine','Unity'],['Duration','1.5 days']],
      shots:shots(['1CZ8GjQKbTirdsfptHpZVP5m4vfZV26nh','1xwWIXmhYsRz9NBhzXKqd8RibEf8sR8SG'],'Clock Out'),video:yt('Fz5CbVEgtMs','Clock Out trailer'),itch:itch(5095025,'Clock Out'),
      text:['A top-down stealth puzzle game about sneaking out of the office early using the one tool on your desk nobody suspects - an old rotary phone. Dial a desk, make it ring, and watch coworkers walk over to answer it, clearing your path. Made with tijmenDC and bronzenkid.'],
      did:['Designed the desk-calling mechanic: dial a desk on the rotary phone to pull coworkers away from your escape route','Designed and balanced the Manager, who calls to micromanage you every 30 seconds and comes running if you don\'t answer','Designed the phone-hand mechanic, used both to answer the Manager\'s calls and to clear a mistaken dial','Designed and balanced the level layout'],
      btns:[{t:'Play on itch.io &rarr;',u:'https://tijmendc.itch.io/clock-out'}]})}},
    {id:'bumping',name:'Bumping Mayhem',tag:'School',render:function(){return project({
      badges:['Student game - Howest DAE','Play in browser'],
      meta:[['Type','School project'],['School','Howest DAE'],['Role','Game Lead & Lead Designer'],['Team','3'],['Engine','Unity'],['Duration','2 months']],
      shots:shots(['1AsEbUBOVsja8Wmj0-5rCtkG-BVxo-x7C','1UsaBKk6b7_20Iw0m-1j8E7yuuFORdBO4','1J9fH4AffV7VEFz1lLiqzcrKRfYnJvXuU','1MKKQKztNOTZgvJAlO44G2FOj2ETKmyxJ'],'Bumping Mayhem'),itch:itch(5128382,'Bumping Mayhem'),
      text:['A vehicular wave-defense game where the player rams, tricks, and power-ups their way through escalating enemy hordes to protect and repair a central objective. Power-ups are tuned to scale exponentially, meaning specialization beats generalism: a deliberate risk/reward design.'],
      callout:'Playtesting revealed a core feel problem: enemies clustering on the objective meant the player kept accidentally hitting it when trying to ram enemies, killing momentum and punishing aggression. My solution was a one-way bubble shield. Enemies push against it from outside, but the player drives through freely. This separated the collision domains cleanly and made aggressive play feel satisfying rather than frustrating.',
      did:['Designed the exponential power-up system','Tuned enemy waves on a sine-wave difficulty curve, alternating pressure with breathing room'],
      btns:[{t:'Play on itch.io &rarr;',u:'https://morose-interactive.itch.io/bumping-mayham'}]})}},
    {id:'warped',name:'Warped',tag:'School',render:function(){return project({
      badges:['Student game - The Open University','Trailer'],
      meta:[['Type','School project'],['School','The Open University'],['Role','Game Lead & Lead Designer'],['Team','6'],['Engine','Unity'],['Duration','3 months']],
      video:yt('nLN4PbjdHUc','Warped trailer'),
      text:['A first-person sci-fi puzzle-action game built around physics-based powers: telekinesis, black hole projection, and gravity inversion.'],
      callout:'The gravity inversion power was my concept, designed specifically as a puzzle-solving tool rather than a combat ability. Each level was built around teaching the player a new spatial logic: what happens to enemies, objects, and the player themselves when &ldquo;down&rdquo; becomes &ldquo;up.&rdquo; That single design decision shaped the entire level design language of the game.',
      did:['Owned the design of all core systems, mechanics and level layouts','Programmed the player\'s three powers: telekinesis, black hole and gravity inversion'],
      btns:[{t:'Watch on YouTube &rarr;',u:'https://www.youtube.com/watch?v=nLN4PbjdHUc'}]})}},
    {id:'worldly',name:'Worldly Adventures',tag:'School',render:function(){return project({
      badges:['Student game - The Open University','Trailer'],
      meta:[['Type','School project'],['School','The Open University'],['Role','Game Designer & Level Designer'],['Team','5'],['Engine','Unity'],['Duration','3 months']],
      video:yt('E2PpPdDbcW8','Worldly Adventures trailer'),
      text:['A mobile arcade game with themed worlds (jungle, toy world, and more), combining vertical platformer and endless runner mechanics across 10-12 levels.'],
      callout:'I designed the character power system as a 2D matrix: each character has a unique ability per game mode, so the sloth\'s runner power and platformer power are completely different, as are every other character\'s. This meant every character-mode combination felt distinct without requiring separate content pipelines, giving the game replayability while keeping production manageable for a student team.',
      did:['Built every level in the game','Balanced how each power-up plays across the levels and modes','Wrote the game\'s narrative design'],
      btns:[{t:'Watch on YouTube &rarr;',u:'https://www.youtube.com/watch?v=E2PpPdDbcW8'}]})}},
    {id:'shipped',name:'8 Shipped Games',tag:'AppCentral',render:function(){
      return badges(['AppCentral - March 2023 - July 2024','App Store'])+
      '<p class="lead">Eight hyper-casual mobile titles shipped to the App Store during my time as Product Manager &amp; Game Designer at AppCentral. In a small startup team, PM meant owning level design, balancing, and feature decisions alongside roadmap and metrics.</p>'+
      '<div class="pf-grid">'+shipped.map(function(g){
        return '<div class="pf-card game"><div class="pf-tile" data-letter="'+g[1]+'"><img src="https://unavatar.io/apple-store/'+g[2]+'" alt="'+esc(g[0])+' icon" loading="lazy"></div><div><h5>'+esc(g[0])+'</h5><p>'+esc(g[5])+'</p><a class="pf-store" href="https://apps.apple.com/'+g[3]+'/app/'+g[4]+'/id'+g[2]+'" target="_blank" rel="noopener">App Store &rarr;</a></div></div>'}).join('')+'</div>'}}
  ];

  /* ---------- design documents ---------- */
  function gdd(id,name,pid,lead,text){
    return {id:id,name:name,tag:lead?'Lead':'GDD',render:function(){
      return badges(lead?['Fan GDD - lead document']:['Fan GDD'])+
      '<div class="pf-gdd"><div class="cover">'+(name.charAt(0))+'<img src="'+IMG(pid,700)+'" alt="'+esc(name)+' Fan GDD cover" loading="lazy" style="position:absolute;inset:0"></div>'+
      '<div><h3>'+esc(name)+'</h3><p>'+text+'</p>'+
      '<p class="pf-sub">Why fan GDDs? Design breakdowns of games I did not build - reverse-engineering their systems, pacing and mechanics.</p>'+
      '<div class="pf-btns"><button class="pf-btn" data-embed="'+PREV(pid)+'">Read it here</button><a class="pf-btn ghost" href="'+PREV(pid)+'" target="_blank" rel="noopener">Open in new tab</a><a class="pf-quiet" href="'+DL(pid)+'">Download PDF</a></div></div></div><div data-slot></div>'}}
  }
  var docs=[
    gdd('hollow','Hollow Knight','1Jzdpa451eeeXNj9yLJJbzz2695zXMsPu',1,'A full teardown of Hollow Knight\'s ability progression, map design, and difficulty pacing - my most in-depth fan GDD, written as the flagship piece of this series.'),
    gdd('hades','Hades','1QEM6i9MJinDy4t_NXPgBnSwASEnRjw1m',0,'A breakdown of Hades\' roguelike loop, boon/weapon systems, and floor structure - with a critique of how the game handles player motivation and build variety once the main story wraps.'),
    gdd('bg3','Baldur\'s Gate 3','1mcRdM21FC7fCzPmsKI8qOn1NJiQn2k3I',0,'A design breakdown of BG3\'s reactivity systems and companion approval mechanics - how choice actually threads through dialogue, combat, and world state.'),
    gdd('ghost','Ghost of Tsushima','1TDUVp_bGZNORnopUGrpM63jzl7VNxIdf',0,'An analysis of Jin Sakai\'s dual combat identity - samurai stances vs. Ghost techniques - and how progression, exploration, and boss design reinforce that core theme.'),
    gdd('ori','Ori and the Blind Forest','1LLErxldXnlgehhlK-cm-bwJY7BZpXmKp',0,'An analysis of Ori\'s traversal ability gating and how movement upgrades double as narrative beats and Metroidvania backtracking hooks.'),
    gdd('days','Days Gone','11GNXQctTGn6p1hL-D6_8vaD6fG78RJOY',0,'A look at Days Gone\'s survival loop - camps, trust, bike upgrades, and horde encounters - and where its pacing and mission variety hold the experience back.'),
    {id:'log',name:'Wave Spawning Log',tag:'Systems',render:function(){
      var pid='17ti0blt8rceYqNd_v5MBtP4S3-yf9eCy';
      return badges(['Game jam log - Big Red, Little Red'])+'<h3>Wave Spawning Difficulty</h3>'+
      '<div class="pf-split"><div><div class="pf-shots one"><img src="'+IMG('1jxdDPaQliZUuwLIDZW1k0y6ua3gUFzin',1400)+'" alt="Wave difficulty curve chart - enemy load vs. felt difficulty across 9 waves" loading="lazy"></div></div><div>'+
      '<p>An iteration log tracking a broken difficulty curve during the jam - early waves that punished new players and late waves that had gone slack, plus the real numbers behind fixing both.</p>'+
      '<ul class="pf-ul"><li>Moving from a linear difficulty ramp to a sine-based curve to give players breathing room after spikes</li><li>Retuning enemy-type introductions so new enemies teach their behavior before punishing mistakes</li><li>The actual tuning values: Big Red\'s dash duration, Little Red\'s grenade cooldown, and per-wave enemy counts</li><li>What playtesting revealed - including a compounding-upgrade problem that wasn\'t fully solved by the jam\'s end</li></ul>'+
      '<div class="pf-btns"><button class="pf-btn" data-embed="'+PREV(pid)+'">Read the full log here</button><a class="pf-btn ghost" href="'+PREV(pid)+'" target="_blank" rel="noopener">Open in new tab</a><a class="pf-quiet" href="'+DL(pid)+'">Download PDF</a><a class="pf-quiet" href="#games/bigred">See the game &rarr;</a></div></div></div><div data-slot></div>'}}
  ];

  /* ---------- 3D art ---------- */
  function model(id,name,uid,text,extra){
    return {id:id,name:name,tag:'3D',render:function(){
      return badges(['Blender','Substance Painter'].concat(extra?['Unity']:[]))+'<h3>'+esc(name)+'</h3>'+
      '<div class="pf-3d"><iframe title="'+esc(name)+' - 3D model" src="https://sketchfab.com/models/'+uid+'/embed" allow="autoplay; fullscreen; xr-spatial-tracking" allowfullscreen></iframe></div>'+
      '<p>'+text+'</p>'+(extra||'')+
      '<div class="pf-btns"><a class="pf-btn ghost" href="https://sketchfab.com/3d-models/'+uid+'" target="_blank" rel="noopener">Open on Sketchfab &rarr;</a></div>'}}
  }
  var art=[
    model('risen','The Risen','32d7c5aa69764cd2ae5448291b02e1d6','An RTS building of an artificial sun built for the Solthari - a light-worshipping faction whose elemental magic depends on sunlight, and whose power is fading as an encroaching cloud layer cuts off their mountain peak from the sun. The structure represents an engineered replacement light source, built to sustain their fading civilization. Designed to fit the assignment\'s faction visual brief (Art Nouveau and Greek-inspired architecture, pastel greens/yellows/aquamarines, gold and crystal materials), modeled and animated in Blender, textured in Substance Painter, and assembled, lit, and rendered in Unity - including building and upgrade animations across three growth stages.',
      '<p class="pf-sub">Animation preview</p><div class="pf-video"><iframe src="https://player.vimeo.com/video/1229128149?title=0&byline=0&portrait=0&playsinline=1" title="The Risen - animation preview" allow="fullscreen; picture-in-picture" allowfullscreen></iframe></div>'),
    model('artisan','Artisan\'s Desk','cc616b54e5d6402aaf18d8e93a4bf591','A low-poly prop set built from a randomized assignment prompt - profession: noble jeweler. Framed as a workspace for a jeweler in service of the Medici family, crafting the ornate, poisoned jewelry the family was rumored to use against political rivals. Modeled in Blender, textured in Substance Painter. Fully rotatable model above.'),
    model('shrine','Sukuna\'s Malevolent Shrine','4ff07e3f657f48d69266234b3b9cd504','A fan reinterpretation of Sukuna\'s domain expansion from Jujutsu Kaisen - built to explore mood, silhouette, and scale rather than a 1:1 recreation. Modeled in Blender, textured in Substance Painter. Fully rotatable model above.'),
    model('diorama','Forest Loner Diorama','05b1d069e8114ab1af736deaf7051116','A full narrative environment diorama - an isolated hunting cabin in an autumn forest, populated with wildlife, vehicles, and scattered storytelling props. Modeled in Blender, textured in Substance Painter. Fully rotatable model above.')
  ];

  /* ---------- about ---------- */
  var about=[
    {id:'sheet',name:'Character Sheet',tag:'Me',render:function(){
      return '<div class="pf-sheet"><div><div class="pf-portrait">Y<img src="'+WEEBLY+'background-images/79829628.png" alt="Yoav Stadler" loading="lazy"></div></div><div>'+
      '<h3>Yoav Stadler</h3>'+
      '<dl class="pf-stats"><dt>Class</dt><dd>Game &middot; Systems Designer</dd><dt>Guild</dt><dd>Howest DAE - Independent Game Production (2025 - now)</dd><dt>Quests cleared</dt><dd>8 shipped mobile titles, 5 student games and jam entries</dd><dt>Former role</dt><dd>Product Manager &amp; Game Designer, AppCentral</dd></dl>'+
      '<h4>Abilities</h4><div class="pf-chips"><span>Systems design</span><span>Balancing</span><span>Level design</span><span>GDD documentation</span><span>Playtesting</span><span>Retention analysis</span></div>'+
      '<h4>Equipment</h4><div class="pf-chips"><span>Unity</span><span>C#</span><span>MonoGame</span><span>Blender</span><span>Substance Painter</span><span>Photoshop</span></div>'+
      '<h4>Introduction</h4><p class="lead">Hi, I\'m Yoav Stadler, a game designer who thinks in systems first.</p>'+
      '<p>At AppCentral, I shipped 8 mobile titles as Product Manager, a role that meant owning level design, balancing and player retention, not just the product roadmap.</p>'+
      '<p>These days, Howest Digital Arts &amp; Entertainment is where I\'m sharpening that craft, building out my coding, 3D art and design fundamentals.</p>'+
      '<p>My design process starts with how players actually behave. The systems come after, not the other way around.</p>'+
      '<blockquote class="pf-quote">Today might be the chance to let your talent bloom.<br>Maybe tomorrow, the day after, or next year...<br>...But if you think it will never come, it probably never will.</blockquote>'+
      '<div class="pf-btns"><a class="pf-btn" href="'+CV+'" target="_blank" rel="noopener">View CV (PDF)</a><a class="pf-btn ghost" href="#contact">Send a message</a></div></div></div>'}},
    {id:'journey',name:'Experience',tag:'Quest log',render:function(){
      return badges(['AppCentral','Mar 2023 - Jul 2024'])+'<h3>Product Manager &amp; Game Designer</h3>'+
      '<p>That philosophy started taking shape at AppCentral:</p>'+
      '<ul class="pf-ul pf-xp"><li><b>Designed &amp; balanced core game systems</b><em>Tuned mechanics and progression loops to optimize playtime and retention.</em></li>'+
      '<li><b>Bridged design and engineering</b><em>Worked cross-functionally with developers and UI/UX to ship mechanics smoothly.</em></li>'+
      '<li><b>Owned GDD documentation</b><em>Kept design specs clear and current across teams.</em></li>'+
      '<li><b>Ran playtesting &amp; balance passes</b><em>Surfaced issues early and iterated on fixes with the team.</em></li>'+
      '<li><b>Analyzed player data to drive retention</b><em>Used KPIs to refine mechanics and improve player satisfaction.</em></li></ul>'+
      '<div class="pf-btns"><a class="pf-btn" href="#games/shipped">See the 8 shipped games &rarr;</a></div>'}},
    {id:'school',name:'Education',tag:'Training',render:function(){
      return '<div class="pf-grid" style="grid-template-columns:repeat(auto-fit,minmax(300px,1fr))">'+
      '<div class="pf-card"><h3>Howest - Digital Arts &amp; Entertainment</h3><p class="pf-sub">Bachelor\'s degree - Independent Game Production &middot; 2025 - current</p><p>Further development of existing skills and acquisition of additional knowledge in:</p><ul class="pf-ul"><li>Game Design</li><li>Coding (Unity, C#, MonoGame)</li><li>3D Art (Blender, Graphic fundamentals)</li></ul></div>'+
      '<div class="pf-card"><h3>The Open University</h3><p class="pf-sub">AAS - Associate of Applied Science &middot; 2021 - 2022</p><ul class="pf-ul"><li>Developed a multi-level casual mobile game with unique mechanics, showcasing creativity and adaptability under pressure.</li><li>Researched gaming market trends, players\' incentives, and gameplay loops to optimize game design.</li><li>Led a team in developing a final project game, managing gameplay mechanics, UX/UI, technical implementation, designing game economy and itemization systems, and balancing loot drops and player rewards.</li><li>Hands-on experience with Unity, Adobe Photoshop, and game balancing tools.</li></ul></div></div>'}}
  ];

  /* ---------- contact ---------- */
  var contact=[
    {id:'raven',name:'Get in touch',tag:'',render:function(){
      return '<div class="pf-contact"><div class="pf-links"><h3>Get In Touch</h3>'+
      '<p><span class="k">Email</span><a href="mailto:yoav.stadler@gmail.com">yoav.stadler@gmail.com</a></p>'+
      '<p><span class="k">Phone</span><a href="tel:+32472502852">+32-472-50-28-52</a></p>'+
      '<p><span class="k">LinkedIn</span><a href="https://www.linkedin.com/in/yoav-stadler" target="_blank" rel="noopener">linkedin.com/in/yoav-stadler</a></p>'+
      '<p><span class="k">Sketchfab</span><a href="https://sketchfab.com/Yoav_Stadler" target="_blank" rel="noopener">sketchfab.com/Yoav_Stadler</a></p>'+
      '<div class="pf-btns"><a class="pf-btn" href="'+CV+'" target="_blank" rel="noopener">Download CV (PDF)</a></div></div>'+
      '<form data-mailto="yoav.stadler@gmail.com"><div class="row"><div><label for="pf-first">First name *</label><input id="pf-first" name="first" required autocomplete="given-name"></div><div><label for="pf-last">Last name *</label><input id="pf-last" name="last" required autocomplete="family-name"></div></div>'+
      '<label for="pf-email">Email *</label><input id="pf-email" name="email" type="email" required autocomplete="email">'+
      '<label for="pf-comment">Comment *</label><textarea id="pf-comment" name="comment" required></textarea>'+
      '<div class="pf-btns"><button class="pf-btn" type="submit">Send</button></div><p class="pf-sub" style="text-transform:none;letter-spacing:0">Sending opens your email app with the message ready to go.</p></form></div>'}}
  ];

  window.PF_DATA={
    cv:CV,
    sections:{
      games:{title:'Games',blurb:'Shipped mobile titles, student games and jam entries',items:games,
        more:[{t:'Shipped Games page',u:'../shipped-games.html'},{t:'Student Games page',u:'../student-games.html'},{t:'Game Jams page',u:'../game-jams.html'}]},
      docs:{title:'Design Documents',blurb:'Fan GDDs and systems design logs',items:docs,
        more:[{t:'Fan GDD page',u:'../fan-gdd-series.html'},{t:'Systems Documents page',u:'../system-documents.html'}]},
      art:{title:'3D Art',blurb:'Blender, Substance Painter and Unity',items:art,more:[{t:'3D Art page',u:'../3d-art.html'}]},
      about:{title:'About Me',blurb:'Character sheet, experience and education',items:about,more:[{t:'Full home page',u:'../index.html'}]},
      contact:{title:'Contact',blurb:'Email, phone, CV and a message form',items:contact,more:[{t:'Contact page',u:'../contact.html'}]}
    }
  };
})();

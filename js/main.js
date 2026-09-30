(function(){
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var root = document.documentElement;

  // Theme toggle
  try { var saved = localStorage.getItem('theme'); if (saved) root.setAttribute('data-theme', saved); } catch(e){}
  document.getElementById('theme-btn').addEventListener('click', function(){
    var current = root.getAttribute('data-theme') ||
      (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    var next = current === 'light' ? 'dark' : 'light';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch(e){}
  });

  // Mobile menu
  var menuBtn = document.getElementById('menu-btn'), links = document.getElementById('nav-links');
  menuBtn.addEventListener('click', function(){
    var open = links.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', open);
  });
  links.addEventListener('click', function(e){ if (e.target.tagName === 'A') { links.classList.remove('open'); menuBtn.setAttribute('aria-expanded', false); } });

  // Nav border on scroll
  var nav = document.getElementById('top-nav');
  window.addEventListener('scroll', function(){ nav.classList.toggle('scrolled', window.scrollY > 10); }, {passive:true});

  document.getElementById('year').textContent = new Date().getFullYear();

  // Name reveal
  var nameEl = document.getElementById('hero-name');
  if (!reduce) {
    var text = nameEl.textContent; nameEl.setAttribute('aria-label', text); nameEl.textContent = '';
    text.split('').forEach(function(c, i){
      var s = document.createElement('span'); s.className = 'ch'; s.setAttribute('aria-hidden','true');
      s.textContent = c === ' ' ? '\u00A0' : c; s.style.animationDelay = (i * 35) + 'ms';
      nameEl.appendChild(s);
    });
  }

  // Rotating role
  var roles = ['AI Engineer', 'Data Engineer', 'ML Engineer', 'Power BI Developer'];
  var roleEl = document.getElementById('role-word'), idx = 0;
  if (!reduce) setInterval(function(){
    roleEl.classList.add('out');
    setTimeout(function(){
      idx = (idx + 1) % roles.length;
      roleEl.textContent = roles[idx];
      roleEl.classList.remove('out');
    }, 350);
  }, 2600);

  // Hero data-flow canvas: sources on the left feed a model node, which answers on the right
  var cv = document.getElementById('flow'), ctx = cv.getContext('2d');
  var W, H, dpr, paths = [], dots = [];
  function color(name){ return getComputedStyle(root).getPropertyValue(name).trim(); }
  function layout(){
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = cv.clientWidth; H = cv.clientHeight;
    cv.width = W * dpr; cv.height = H * dpr; ctx.setTransform(dpr,0,0,dpr,0,0);
    var narrow = W < 820;
    var hubX = narrow ? W * 0.78 : W * 0.72, hubY = narrow ? H * 0.2 : H * 0.48;
    var startX = narrow ? W * 0.45 : W * 0.5;
    var outX = W + 20;
    paths = [];
    var n = 6;
    for (var i = 0; i < n; i++) {
      var sy = hubY + (i - (n-1)/2) * (narrow ? 24 : 58);
      paths.push({ from:[startX, sy], to:[hubX, hubY], kind:'in' });
    }
    paths.push({ from:[hubX, hubY], to:[outX, hubY - (narrow?20:60)], kind:'out' });
    paths.push({ from:[hubX, hubY], to:[outX, hubY + (narrow?20:60)], kind:'out' });
    paths.hub = [hubX, hubY];
  }
  function point(p, t){
    var x0=p.from[0], y0=p.from[1], x1=p.to[0], y1=p.to[1], mx=(x0+x1)/2;
    var u=1-t;
    return [u*u*u*x0 + 3*u*u*t*mx + 3*u*t*t*mx + t*t*t*x1, u*u*u*y0 + 3*u*u*t*y0 + 3*u*t*t*y1 + t*t*t*y1];
  }
  function spawn(){
    var p = paths[Math.floor(Math.random() * paths.length)];
    dots.push({ p:p, t:0, v: 0.0035 + Math.random()*0.004 });
  }
  function draw(){
    ctx.clearRect(0,0,W,H);
    var line = color('--line'), accent = color('--accent'), cool = color('--cool');
    ctx.lineWidth = 1.2;
    paths.forEach(function(p){
      ctx.strokeStyle = line; ctx.globalAlpha = .8; ctx.beginPath();
      for (var t = 0; t <= 1.001; t += 0.04) { var q = point(p, t); t === 0 ? ctx.moveTo(q[0], q[1]) : ctx.lineTo(q[0], q[1]); }
      ctx.stroke();
      if (p.kind === 'in') { ctx.globalAlpha = .9; ctx.fillStyle = line; ctx.beginPath(); ctx.arc(p.from[0], p.from[1], 4, 0, 7); ctx.fill(); }
    });
    ctx.globalAlpha = 1;
    dots.forEach(function(d){
      var q = point(d.p, d.t);
      ctx.fillStyle = d.p.kind === 'in' ? cool : accent;
      ctx.globalAlpha = Math.sin(d.t * Math.PI) * .9 + .1;
      ctx.beginPath(); ctx.arc(q[0], q[1], d.p.kind === 'in' ? 2.4 : 3, 0, 7); ctx.fill();
    });
    ctx.globalAlpha = 1;
    var h = paths.hub;
    ctx.fillStyle = color('--bg'); ctx.strokeStyle = accent; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(h[0], h[1], 16, 0, 7); ctx.fill(); ctx.stroke();
    ctx.fillStyle = accent; ctx.beginPath(); ctx.arc(h[0], h[1], 6, 0, 7); ctx.fill();
  }
  function tick(){
    if (Math.random() < 0.18) spawn();
    dots.forEach(function(d){ d.t += d.v; });
    dots = dots.filter(function(d){ return d.t < 1; });
    draw();
    requestAnimationFrame(tick);
  }
  layout();
  window.addEventListener('resize', function(){ layout(); if (reduce) draw(); });
  if (reduce) { draw(); } else { for (var i = 0; i < 20; i++) { spawn(); dots[dots.length-1].t = Math.random(); } tick(); }
  window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', function(){ if (reduce) draw(); });
})();

(function () {
  var header = document.querySelector('.site-header');
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('nav');

  // Sombra del header al hacer scroll
  function onScroll() {
    header.classList.toggle('scrolled', window.scrollY > 8);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Menú móvil
  function setMenu(open) {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    nav.classList.toggle('open', open);
  }
  toggle.addEventListener('click', function () {
    setMenu(toggle.getAttribute('aria-expanded') !== 'true');
  });
  nav.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') setMenu(false);
  });

  // Revelado al hacer scroll
  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('in'); });
  }
})();

/* =========================================================
   Interacción dinámica
   ========================================================= */
(function () {
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Barra de progreso de lectura
  // Se mide el alto del documento solo al cargar o cambiar de tamaño (evita reflow en cada scroll)
  var bar = document.querySelector('.progress span');
  var maxScroll = 0, ticking = false;
  function measure() {
    var h = document.documentElement;
    maxScroll = h.scrollHeight - h.clientHeight;
  }
  function paint() {
    ticking = false;
    var p = maxScroll > 0 ? Math.min(window.scrollY / maxScroll, 1) : 0;
    if (bar) bar.style.transform = 'scaleX(' + p.toFixed(4) + ')';
  }
  function onProgress() {
    if (!ticking) { ticking = true; requestAnimationFrame(paint); }
  }
  window.addEventListener('scroll', onProgress, { passive: true });
  window.addEventListener('resize', function () { measure(); onProgress(); });
  window.addEventListener('load', function () { measure(); onProgress(); });
  if ('ResizeObserver' in window) {
    new ResizeObserver(function () { measure(); onProgress(); }).observe(document.body);
  }
  requestAnimationFrame(function () { measure(); paint(); });

  // Palabra rotativa del hero
  var words = document.querySelectorAll('.rot-word');
  if (words.length > 1 && !reduce) {
    var idx = 0;
    setInterval(function () {
      words[idx].classList.remove('is-on');
      words[idx].classList.add('is-out');
      var prev = idx;
      idx = (idx + 1) % words.length;
      setTimeout(function () { words[prev].classList.remove('is-out'); }, 500);
      words[idx].classList.add('is-on');
    }, 2600);
  }

  // Contadores
  function countUp(el) {
    var to = parseInt(el.getAttribute('data-to'), 10) || 0;
    if (reduce) { el.textContent = to.toLocaleString('es-CR'); return; }
    var start = null, dur = 1600;
    function step(ts) {
      if (!start) start = ts;
      var t = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - t, 3);
      el.textContent = Math.round(to * eased).toLocaleString('es-CR');
      if (t < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  var counters = document.querySelectorAll('.count');
  if ('IntersectionObserver' in window) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { countUp(e.target); cio.unobserve(e.target); }
      });
    }, { threshold: 0.5 });
    counters.forEach(function (c) { cio.observe(c); });
  } else {
    counters.forEach(countUp);
  }

  // Mapa de conocimiento: texto informativo al pasar el cursor o tocar
  var info = document.querySelector('.kg-info');
  var nodes = document.querySelectorAll('.kg-node');
  function show(node) {
    nodes.forEach(function (n) { n.classList.remove('active'); });
    node.classList.add('active');
    if (info) info.textContent = node.getAttribute('data-info');
  }
  nodes.forEach(function (n) {
    n.setAttribute('tabindex', '0');
    n.setAttribute('role', 'button');
    n.addEventListener('mouseenter', function () { show(n); });
    n.addEventListener('click', function () { show(n); });
    n.addEventListener('focus', function () { show(n); });
    n.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); show(n); }
    });
  });
})();


/* Inclinación 3D de la foto (solo con puntero fino y sin reducir movimiento) */
(function () {
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = window.matchMedia && window.matchMedia('(pointer: fine)').matches;
  var img = document.querySelector('.hero-photo img');
  if (!img || reduce || !fine) return;
  var frame = null;
  function onMove(e) {
    var r = img.getBoundingClientRect();
    var x = (e.clientX - r.left) / r.width - 0.5;
    var y = (e.clientY - r.top) / r.height - 0.5;
    if (frame) cancelAnimationFrame(frame);
    frame = requestAnimationFrame(function () {
      img.style.setProperty('--ry', (x * 10).toFixed(2) + 'deg');
      img.style.setProperty('--rx', (-y * 10).toFixed(2) + 'deg');
    });
  }
  function reset() {
    img.style.setProperty('--rx', '0deg');
    img.style.setProperty('--ry', '0deg');
  }
  img.addEventListener('pointermove', onMove);
  img.addEventListener('pointerleave', reset);
})();


/* Efecto de luz que sigue el cursor en tarjetas (.spot) */
(function () {
  var fine = window.matchMedia && window.matchMedia('(pointer: fine)').matches;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!fine || reduce) return;
  document.querySelectorAll('.spot').forEach(function (el) {
    el.addEventListener('pointermove', function (e) {
      var r = el.getBoundingClientRect();
      el.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      el.style.setProperty('--my', (e.clientY - r.top) + 'px');
    });
  });
})();

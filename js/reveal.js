/* Revela os blocos com desfoque ao rolar a página.
   Cada bloco começa transparente, um pouco mais baixo e desfocado,
   e fica nítido quando entra na tela. Sem JavaScript, nada fica escondido. */
(function () {
  if (!('IntersectionObserver' in window)) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  document.documentElement.classList.add('rv');

  function mostra(el) {
    io.unobserve(el);
    el.setAttribute('data-rv-in', '');
    // depois da animação, tira os atributos para não interferir em nada
    setTimeout(function () { el.removeAttribute('data-rv'); el.removeAttribute('data-rv-in'); el.style.removeProperty('--rv-d'); }, 1600);
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      mostra(e.target);
    });
  }, { rootMargin: '0px 0px -6% 0px', threshold: 0.08 });

  // no fim da página, revela o que sobrou (o rodapé pode não entrar na área de detecção)
  window.addEventListener('scroll', function () {
    if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 40) {
      document.querySelectorAll('[data-rv]:not([data-rv-in])').forEach(mostra);
    }
  }, { passive: true });

  function temFixo(el) {
    var all = el.querySelectorAll('*');
    for (var i = 0; i < all.length && i < 4000; i++) {
      var p = getComputedStyle(all[i]).position;
      if (p === 'sticky' || p === 'fixed') return true;
    }
    return false;
  }

  function marca(el, i) {
    if (el.hasAttribute('data-rv') || el.hasAttribute('data-rv-ok')) return;
    var cs = getComputedStyle(el);
    if (cs.position === 'fixed' || cs.position === 'sticky' || cs.display === 'none') return;
    if (el.getBoundingClientRect().height < 8) return;
    if (temFixo(el)) return;
    el.setAttribute('data-rv-ok', '');
    el.setAttribute('data-rv', '');
    el.style.setProperty('--rv-d', Math.min(i * 0.08, 0.4).toFixed(2) + 's');
    io.observe(el);
  }

  function blocos(sec) {
    var wraps = sec.querySelectorAll(':scope > .wrap, :scope > div > .wrap');
    var raiz = wraps.length ? Array.prototype.slice.call(wraps) : [sec];
    raiz.forEach(function (w) {
      Array.prototype.forEach.call(w.children, function (b, i) {
        var filhos = Array.prototype.filter.call(b.children, function (c) { return c.getBoundingClientRect().height > 8; });
        var d = getComputedStyle(b).display;
        if (filhos.length >= 3 && (d === 'grid' || d === 'flex') && !temFixo(b)) {
          filhos.forEach(function (c, j) { marca(c, j); });
        } else {
          marca(b, i);
        }
      });
    });
  }

  function varre() {
    var secs = document.querySelectorAll('main section, body section, footer.rod');
    Array.prototype.forEach.call(secs, function (s) {
      if (s.id === 'inicio') return; // topo já aparece com a página
      blocos(s);
    });
  }
  // espera o site terminar de montar e varre duas vezes (algumas partes aparecem um pouco depois)
  var tentativas = 0;
  (function espera() {
    var root = document.getElementById('dc-root');
    if (root && root.querySelector('section')) { setTimeout(varre, 150); setTimeout(varre, 1500); return; }
    if (++tentativas < 100) setTimeout(espera, 100);
  })();
})();

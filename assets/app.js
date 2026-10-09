(() => {
'use strict';

const { SITE, CATEGORIES, GAMES } = window;
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const catById = Object.fromEntries(CATEGORIES.map(c => [c.id, c]));
const gameById = Object.fromEntries(GAMES.map(g => [g.id, g]));
const isLive = g => g.status === 'live';
const byLiveFirst = (a, b) => isLive(b) - isLive(a);
const firstLive = GAMES.find(isLive);
const page = document.body.dataset.page;
const isTouch = window.matchMedia('(pointer: coarse)').matches;

const esc = s => String(s).replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
// Tìm kiếm không phân biệt dấu: "dua xe" khớp "Đua Xe"
const norm = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/gi, 'd').toLowerCase();

const store = {
  get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* ignore */ } },
};
const recent = {
  list: () => store.get('choivui.recent', []).filter(id => gameById[id]),
  add(id) { store.set('choivui.recent', [id, ...recent.list().filter(x => x !== id)].slice(0, 12)); },
};

// ================= Templates =================
const catNames = g => g.cats.map(c => catById[c].name).join(' · ');

function thumbHTML(g) {
  return g.thumb
    ? `<img src="${g.thumb}" alt="" loading="lazy">`
    : `<div class="art" style="--c1:${g.colors[0]};--c2:${g.colors[1]}"><span>${g.emoji}</span></div>`;
}
function badgeHTML(g) {
  if (!isLive(g)) return '<span class="badge soon">SẮP RA MẮT</span>';
  if (g.badge === 'hot') return '<span class="badge hot">HOT</span>';
  if (g.badge === 'new') return '<span class="badge new">MỚI</span>';
  return '';
}
function cardHTML(g, variant = '') {
  const live = isLive(g);
  return `<a class="card ${variant} ${live ? '' : 'is-dev'}" href="game.html?id=${g.id}" data-id="${g.id}">
    <div class="thumb">${thumbHTML(g)}${badgeHTML(g)}
      <span class="hover">${live ? '<span class="playbtn">▶</span>' : '<span class="soon-txt">🚧 Đang phát triển</span>'}</span>
    </div>
    <div class="meta"><b>${esc(g.title)}</b><small>${esc(catNames(g))}</small></div>
  </a>`;
}
function chipsHTML(active) {
  return `<div class="chips"><a class="chip ${active ? '' : 'active'}" href="index.html">Tất cả</a>${
    CATEGORIES.map(c => `<a class="chip ${c.id === active ? 'active' : ''}" href="index.html?cat=${c.id}">${c.icon} ${c.name}</a>`).join('')}</div>`;
}
function sectionHTML(title, games, o = {}) {
  const head = o.more ? `<a class="more" href="${o.more}">Xem tất cả →</a>` : o.count ? `<span class="count">${o.count}</span>` : '';
  const body = games.length
    ? `<div class="grid ${o.row ? 'row' : ''}">${games.map(g => cardHTML(g)).join('')}</div>`
    : `<div class="empty"><div class="big">${o.emptyIcon || '🙈'}</div><p>${o.empty || 'Chưa có game nào.'}</p>
       ${firstLive ? `<a class="btn primary" href="game.html?id=${firstLive.id}">▶ Chơi ${esc(firstLive.title)}</a>` : ''}</div>`;
  return `<section class="section"><div class="section-head"><h2>${title}</h2>${head}</div>${o.extra || ''}${body}</section>`;
}
function heroHTML(g) {
  return `<section class="hero">
    ${g.hero || g.thumb ? `<div class="hero-bg" style="background-image:url('${g.hero || g.thumb}')"></div>` : ''}
    <div class="hero-content">
      <span class="pill">🔥 GAME NỔI BẬT</span>
      <h1>${esc(g.title)}</h1>
      <p>${esc(g.desc)}</p>
      <div class="btns left">
        <a class="btn primary big" href="game.html?id=${g.id}">▶ Chơi ngay</a>
        ${g.cats.map(c => `<a class="chip" href="index.html?cat=${c}">${catById[c].icon} ${catById[c].name}</a>`).join('')}
      </div>
    </div>
  </section>`;
}

// ================= Shell (header, sidebar, modal, footer) =================
const NAV = [
  { key: 'home', href: 'index.html', icon: '🏠', label: 'Trang chủ' },
  { key: 'recent', href: 'index.html?cat=recent', icon: '🕘', label: 'Chơi gần đây' },
  { key: 'hot', href: 'index.html?cat=hot', icon: '🔥', label: 'Game hot' },
  { key: 'new', href: 'index.html?cat=new', icon: '✨', label: 'Game mới' },
];
const SPECIAL = {
  recent: { title: '🕘 Chơi gần đây', list: () => recent.list().map(id => gameById[id]),
    empty: 'Bạn chưa chơi game nào. Thử ngay một game nhé!', emptyIcon: '🕹️' },
  hot: { title: '🔥 Game hot', list: () => GAMES.filter(g => g.badge === 'hot').sort(byLiveFirst) },
  new: { title: '✨ Game mới', list: () => [...GAMES].sort((a, b) => (b.added || '').localeCompare(a.added || '')) },
};

function renderShell() {
  document.body.insertAdjacentHTML('afterbegin', `
  <header class="topbar">
    <button class="menu-btn" id="menuBtn" aria-label="Mở danh mục" aria-expanded="false">☰</button>
    <a class="logo" href="index.html"><span class="logo-mark">🎮</span><span class="logo-text">${esc(SITE.name.split(' ')[0])} <em>${esc(SITE.name.split(' ').slice(1).join(' '))}</em></span></a>
    <form class="search" id="searchForm" action="index.html" role="search">
      <span aria-hidden="true">🔍</span>
      <input id="searchInput" name="q" type="search" placeholder="Tìm game: đua xe, cờ caro..." autocomplete="off" aria-label="Tìm game">
    </form>
    <button class="btn-random" id="randomBtn" title="Chọn một game ngẫu nhiên">🎲 <span>Ngẫu nhiên</span></button>
  </header>`);

  const count = id => GAMES.filter(g => g.cats.includes(id)).length;
  $('.layout').insertAdjacentHTML('afterbegin', `
  <nav class="sidebar nav" id="sidebar" aria-label="Danh mục game">
    ${NAV.map(n => `<a href="${n.href}" data-key="${n.key}"><span class="ico">${n.icon}</span>${n.label}</a>`).join('')}
    <div class="nav-title">THỂ LOẠI</div>
    ${CATEGORIES.map(c => `<a href="index.html?cat=${c.id}" data-key="${c.id}"><span class="ico">${c.icon}</span>${c.name}<span class="count">${count(c.id)}</span></a>`).join('')}
  </nav>
  <div class="backdrop" id="backdrop"></div>`);

  $('#footer').innerHTML = `<span>© ${new Date().getFullYear()} ${esc(SITE.name)} · ${esc(SITE.tagline)}</span>
    <span>${GAMES.filter(isLive).length} game chơi được · ${GAMES.filter(g => !isLive(g)).length} game sắp ra mắt</span>`;

  document.body.insertAdjacentHTML('beforeend', `
  <div class="modal" id="devModal" hidden>
    <div class="modal-card" role="dialog" aria-modal="true" aria-labelledby="devTitle">
      <button class="modal-close" data-close aria-label="Đóng">✕</button>
      <div class="modal-art" id="devArt"></div>
      <div class="modal-body">
        <span class="status">🚧 ĐANG PHÁT TRIỂN</span>
        <h3 id="devTitle"></h3>
        <p id="devDesc"></p>
        <p class="note">Trò chơi này đang được hoàn thiện và sẽ sớm ra mắt. Trong lúc chờ, bạn thử game khác nhé!</p>
        <div class="btns">
          ${firstLive ? `<a class="btn primary" href="game.html?id=${firstLive.id}">▶ Chơi ${esc(firstLive.title)}</a>` : ''}
          <button class="btn ghost" data-close>Đóng</button>
        </div>
      </div>
    </div>
  </div>`);
}

function setActive(key) {
  $$('#sidebar a').forEach(a => a.classList.toggle('active', a.dataset.key === key));
}
function setNav(open) {
  document.body.classList.toggle('nav-open', open);
  $('#menuBtn').setAttribute('aria-expanded', String(open));
}

let lastFocus = null;
function openDevModal(g) {
  $('#devArt').innerHTML = thumbHTML(g);
  $('#devTitle').textContent = g.title;
  $('#devDesc').textContent = g.desc;
  lastFocus = document.activeElement;
  $('#devModal').hidden = false;
  $('#devModal .modal-close').focus();
}
function closeDevModal() {
  if ($('#devModal').hidden) return;
  $('#devModal').hidden = true;
  if (lastFocus && lastFocus.focus) lastFocus.focus();
}

function wireShell() {
  $('#menuBtn').addEventListener('click', () => setNav(!document.body.classList.contains('nav-open')));
  $('#backdrop').addEventListener('click', () => setNav(false));

  $('#randomBtn').addEventListener('click', () => {
    const g = GAMES[Math.floor(Math.random() * GAMES.length)];
    if (isLive(g)) location.href = `game.html?id=${g.id}`;
    else openDevModal(g);
  });

  $('#devModal').addEventListener('click', e => {
    if (e.target === e.currentTarget || e.target.closest('[data-close]')) closeDevModal();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') { closeDevModal(); setNav(false); }
  });

  document.addEventListener('click', e => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;
    // Game đang phát triển → hiện thông báo thay vì mở trang
    const dev = e.target.closest('.card.is-dev');
    if (dev) { e.preventDefault(); openDevModal(gameById[dev.dataset.id]); return; }
    // Trên trang chủ: chuyển danh mục ngay không cần tải lại trang
    const a = e.target.closest('a[href^="index.html"]');
    if (a && page === 'home') { e.preventDefault(); go(a.getAttribute('href')); }
  });

  const form = $('#searchForm'), input = $('#searchInput');
  form.addEventListener('submit', e => {
    const q = input.value.trim();
    if (page === 'home') { e.preventDefault(); go(q ? `index.html?q=${encodeURIComponent(q)}` : 'index.html'); }
    else if (!q) { e.preventDefault(); location.href = 'index.html'; }
  });
  if (page === 'home') {
    let t = 0;
    input.addEventListener('input', () => {
      clearTimeout(t);
      t = setTimeout(() => {
        const q = input.value.trim();
        history.replaceState(null, '', q ? `index.html?q=${encodeURIComponent(q)}` : 'index.html');
        renderHome();
      }, 150);
    });
  }
}

// ================= Home page =================
function go(href) {
  history.pushState(null, '', href);
  renderHome();
  window.scrollTo(0, 0);
  setNav(false);
}

function renderHome() {
  const p = new URLSearchParams(location.search);
  const cat = p.get('cat') || '', q = (p.get('q') || '').trim();
  const input = $('#searchInput');
  if (document.activeElement !== input) input.value = q;
  let html, title = `${SITE.name} - ${SITE.tagline}`;

  if (q) {
    setActive('');
    const nq = norm(q);
    const res = GAMES.filter(g => norm([g.title, ...g.cats.map(c => catById[c].name)].join(' ')).includes(nq)).sort(byLiveFirst);
    html = sectionHTML(`Kết quả cho “${esc(q)}”`, res, { count: `${res.length} game`, empty: 'Không tìm thấy game phù hợp. Thử từ khóa khác nhé!', emptyIcon: '🔍' });
    title = `Tìm "${q}" - ${SITE.name}`;
  } else if (SPECIAL[cat]) {
    setActive(cat);
    const s = SPECIAL[cat], list = s.list();
    html = sectionHTML(s.title, list, { count: `${list.length} game`, empty: s.empty, emptyIcon: s.emptyIcon });
    title = `${s.title.replace(/^\S+\s/, '')} - ${SITE.name}`;
  } else if (catById[cat]) {
    setActive(cat);
    const c = catById[cat], list = GAMES.filter(g => g.cats.includes(cat)).sort(byLiveFirst);
    html = sectionHTML(`${c.icon} Game ${c.name}`, list, { count: `${list.length} game`, extra: chipsHTML(cat) });
    title = `Game ${c.name} - ${SITE.name}`;
  } else {
    setActive('home');
    const featured = GAMES.find(g => g.featured) || GAMES[0];
    const rec = recent.list().map(id => gameById[id]).slice(0, 6);
    html = heroHTML(featured)
      + (rec.length ? sectionHTML('🕘 Chơi gần đây', rec, { more: 'index.html?cat=recent', row: true }) : '')
      + sectionHTML('🔥 Game hot', SPECIAL.hot.list().slice(0, 10), { more: 'index.html?cat=hot', row: true })
      + sectionHTML('✨ Game mới', SPECIAL.new.list().slice(0, 10), { more: 'index.html?cat=new', row: true })
      + sectionHTML('🎮 Tất cả game', [...GAMES].sort(byLiveFirst), { extra: chipsHTML('') });
  }
  $('#content').innerHTML = html;
  document.title = title;
}

// ================= Game page =================
function coverHTML(g) {
  const live = isLive(g);
  return `<div class="cover">
    <div class="cover-bg">${thumbHTML(g)}</div>
    <div class="cover-inner">
      <div class="cover-thumb">${thumbHTML(g)}</div>
      <h1>${esc(g.title)}</h1>
      ${live
        ? `<button class="btn primary big" id="playBtn">▶ CHƠI NGAY</button>
           <p class="cover-hint">${isTouch ? 'Nên xoay ngang điện thoại để chơi tốt hơn' : 'Miễn phí · Không cần tải · Chơi ngay trên trình duyệt'}</p>`
        : `<span class="status">🚧 GAME ĐANG PHÁT TRIỂN</span>
           <p class="cover-hint">Trò chơi này sẽ sớm ra mắt. Quay lại sau nhé!</p>
           ${firstLive ? `<a class="btn ghost" href="game.html?id=${firstLive.id}">▶ Chơi ${esc(firstLive.title)}</a>` : ''}`}
    </div>
  </div>`;
}

function renderGame() {
  const g = gameById[new URLSearchParams(location.search).get('id')];
  const content = $('#content');
  if (!g) {
    setActive('');
    content.innerHTML = `<div class="empty"><div class="big">🕹️</div><h2>Không tìm thấy game</h2>
      <p>Game này không tồn tại hoặc đã bị gỡ.</p><a class="btn primary" href="index.html">Về trang chủ</a></div>`;
    return;
  }
  const live = isLive(g), cat = catById[g.cats[0]];
  document.title = `${g.title} - Chơi miễn phí | ${SITE.name}`;
  setActive(cat.id);

  const related = GAMES.filter(x => x.id !== g.id)
    .map(x => ({ x, score: (x.cats.some(c => g.cats.includes(c)) ? 2 : 0) + (isLive(x) ? 1 : 0) }))
    .sort((a, b) => b.score - a.score).slice(0, 6).map(r => r.x);

  content.innerHTML = `
  <nav class="crumbs" aria-label="Đường dẫn">
    <a href="index.html">Trang chủ</a><span>›</span>
    <a href="index.html?cat=${cat.id}">${cat.icon} ${cat.name}</a><span>›</span>
    <span class="cur">${esc(g.title)}</span>
  </nav>
  <div class="player" id="player">${coverHTML(g)}</div>
  <div class="player-bar">
    <div class="pb-thumb">${thumbHTML(g)}</div>
    <div class="pb-title"><b>${esc(g.title)}</b><small>${esc(catNames(g))}${live ? '' : ' · Sắp ra mắt'}</small></div>
    <div class="pb-actions">
      <button class="tool" id="btnRestart" ${live ? '' : 'disabled'}>↻ Chơi lại</button>
      <button class="tool" id="btnFull" ${live ? '' : 'disabled'}>⛶ Toàn màn hình</button>
    </div>
  </div>
  <div class="info">
    <section class="panel">
      <h2>Giới thiệu</h2>
      <p>${esc(g.desc)}</p>${g.longDesc ? `<p>${esc(g.longDesc)}</p>` : ''}
      ${g.controls ? `<h2>Cách chơi</h2><ul class="keys">${g.controls.map(([k, t]) =>
        `<li>${k.split(' / ').map(x => `<kbd>${esc(x)}</kbd>`).join('')}<span>${esc(t)}</span></li>`).join('')}</ul>` : ''}
      <h2>Thể loại</h2>
      <div class="chips">${g.cats.map(c => `<a class="chip" href="index.html?cat=${c}">${catById[c].icon} ${catById[c].name}</a>`).join('')}</div>
    </section>
    <aside class="panel">
      <h2>Game tương tự</h2>
      <div class="mini-list">${related.map(r => cardHTML(r, 'mini')).join('')}</div>
    </aside>
  </div>`;

  if (!live) return;
  const player = $('#player');
  const frame = () => player.querySelector('iframe');

  function startGame() {
    recent.add(g.id);
    // Trên điện thoại: mở game toàn trang cho dễ chơi
    if (isTouch) { location.href = g.url; return; }
    player.innerHTML = `<iframe src="${g.url}" title="${esc(g.title)}" allow="autoplay; fullscreen; gamepad" allowfullscreen></iframe>`;
    const f = frame();
    f.addEventListener('load', () => { try { f.contentWindow.focus(); } catch (e) { f.focus(); } });
    f.focus();
  }
  $('#playBtn').addEventListener('click', startGame);
  $('#btnRestart').addEventListener('click', () => {
    const f = frame();
    if (f) { f.src = g.url; f.focus(); } else startGame();
  });
  $('#btnFull').addEventListener('click', () => {
    if (isTouch) { recent.add(g.id); location.href = g.url; return; }
    if (!frame()) startGame();
    const req = player.requestFullscreen || player.webkitRequestFullscreen;
    if (!req) { location.href = g.url; return; }
    const r = req.call(player);
    if (r && r.catch) r.catch(() => { location.href = g.url; });
    setTimeout(() => { const f = frame(); if (f) f.focus(); }, 200);
  });
}

// ================= Boot =================
renderShell();
wireShell();
if (page === 'home') {
  renderHome();
  window.addEventListener('popstate', renderHome);
} else {
  renderGame();
}
})();

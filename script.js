/* ====== НАСТРОЙКИ САЙТА — правь тут ====== */
const SITE = {
  discord: { name: 'BlackArch Discord', url: 'https://discord.gg/XXXXXXX' },   // вставь свою ссылку-приглашение
  clients: [
    { name: 'Vestige', ver: 'v3', desc: 'Основной клиент. Скачай архив и следуй инструкции установки.', url: 'vestige-v3.zip', file: true },
    { name: 'Atani', ver: 'LOADER', desc: 'Страница загрузки Atani.', url: 'download-atani.html' },
    { name: 'Myj2c', ver: 'TOOL', desc: 'Дополнительный инструмент.', url: 'myj2c-thingy.html' }
  ],
  cfgs: [
    { name: 'Legit', desc: 'Аккуратный конфиг для обычных серверов', text: 'вставь сюда текст конфига' },
    { name: 'Rage', desc: 'Максимальные настройки для тестов', text: 'вставь сюда текст конфига' }
  ],
  steps: [
    ['Скачай клиент', 'Во вкладке Clients нажми «Скачать» у нужного клиента.'],
    ['Распакуй архив', 'Распакуй zip в отдельную папку (WinRAR / 7-Zip / встроенный проводник).'],
    ['Запусти', 'Открой файл запуска из папки и следуй README внутри архива.'],
    ['Загрузи конфиг', 'Во вкладке CFG скопируй нужный конфиг и импортируй в клиент.']
  ],
  /* id ролика с YouTube — это часть после v= в ссылке. Пока пусто — карточка ведёт на поиск */
  videos: [
    { title: 'Как установить Vestige', desc: 'Пошаговая установка', id: '', q: 'vestige client install' },
    { title: 'Настройка конфигов', desc: 'Импорт и экспорт CFG', id: '', q: 'minecraft client config import tutorial' },
    { title: 'Установка Java и Minecraft', desc: 'Что нужно перед запуском', id: '', q: 'how to install java minecraft launcher' }
  ]
};

const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const toast = t => { const e = $('#toast'); e.textContent = t; e.classList.add('show'); setTimeout(() => e.classList.remove('show'), 2200); };

/* ====== рендер вкладок ====== */
$('#clientGrid').innerHTML = SITE.clients.map(c => `<article class="card"><span class="tag">${c.ver}</span><h3>${c.name}</h3><p>${c.desc}</p><a class="btn" href="${c.url}" ${c.file ? 'download' : ''}>Скачать ↓</a></article>`).join('');
$('#cfgList').innerHTML = SITE.cfgs.map((c, i) => `<div class="row"><i>${String(i + 1).padStart(2, '0')}</i><div><h3>${c.name}</h3><p>${c.desc}</p></div><button class="btn" data-copy="${i}">Копировать</button></div>`).join('');
$$('[data-copy]').forEach(b => b.onclick = () => navigator.clipboard.writeText(SITE.cfgs[b.dataset.copy].text).then(() => toast('Конфиг скопирован ✓')));
$('#steps').innerHTML = SITE.steps.map((s, i) => `<li style="animation-delay:${i * .08}s"><div><b>${s[0]}</b><span>${s[1]}</span></div></li>`).join('');
$('#vidGrid').innerHTML = SITE.videos.map(v => `<article class="card vid">
  <div class="frame" ${v.id ? `data-id="${v.id}"` : ''}>${v.id ? `<img loading="lazy" src="https://i.ytimg.com/vi/${v.id}/hqdefault.jpg" alt=""><span class="play"></span>` : `<a class="btn ghost" style="margin:0" target="_blank" rel="noopener" href="https://www.youtube.com/results?search_query=${encodeURIComponent(v.q)}">Найти на YouTube ↗</a>`}</div>
  <div class="info"><h3>${v.title}</h3><p>${v.desc}</p></div></article>`).join('');
$$('.frame[data-id]').forEach(f => f.onclick = () => f.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${f.dataset.id}?autoplay=1&rel=0" allow="autoplay;encrypted-media;picture-in-picture" allowfullscreen></iframe>`);
$('#discordCard').innerHTML = `<h2>${SITE.discord.name}</h2><p>Обновления, поддержка, конфиги от комьюнити и новости о релизах. Заходи, пока не закрыли инвайт.</p><a class="btn" target="_blank" rel="noopener" href="${SITE.discord.url}">Войти на сервер ↗</a>`;

/* ====== вкладки ====== */
function show(id) {
  if (!$('#' + id)) id = 'clients';
  $$('.panel').forEach(p => p.classList.toggle('on', p.id === id));
  $$('#tabs button').forEach(b => b.classList.toggle('on', b.dataset.tab === id));
  history.replaceState(null, '', '#' + id); scrollTo(0, 0);
}
$$('#tabs button').forEach(b => b.onclick = () => show(b.dataset.tab));
show(location.hash.slice(1));

/* подсветка карточек за курсором */
document.addEventListener('mousemove', e => { const c = e.target.closest?.('.card'); if (!c) return; const r = c.getBoundingClientRect(); c.style.setProperty('--mx', e.clientX - r.left + 'px'); c.style.setProperty('--my', e.clientY - r.top + 'px'); });

/* ====== начальная загрузка ====== */
(function boot() {
  const fx = $('#bootfx'), g = fx.getContext('2d'); let W, H, cols, drops;
  const fit = () => { W = fx.width = innerWidth; H = fx.height = innerHeight; cols = Math.ceil(W / 18); drops = Array.from({ length: cols }, () => Math.random() * -50); }; fit();
  let alive = true;
  (function rain() { if (!alive) return; g.fillStyle = 'rgba(5,4,10,.12)'; g.fillRect(0, 0, W, H); g.font = '14px monospace';
    drops.forEach((y, i) => { g.fillStyle = Math.random() > .9 ? '#22d3ee' : '#8b5cf6'; g.fillText(String.fromCharCode(0x30A0 + Math.random() * 60), i * 18, y * 18); drops[i] = y * 18 > H && Math.random() > .975 ? 0 : y + 1; });
    requestAnimationFrame(rain); })();
  const lines = ['Инициализация ядра', 'Проверка соединения', 'Загрузка клиентов', 'Синхронизация конфигов', 'Подготовка интерфейса'];
  const log = $('#bootlog'), bar = $('#bootbar'), pct = $('#bootpct'); let p = 0, li = 0;
  const t = setInterval(() => {
    p = Math.min(100, p + 1 + Math.random() * 5);
    bar.style.width = p + '%'; pct.textContent = Math.floor(p) + '%';
    if (p > li * 20 && li < lines.length) { log.innerHTML += `<div><b>[ OK ]</b> ${lines[li++]}</div>`; }
    if (p >= 100) { clearInterval(t); setTimeout(() => { $('#boot').classList.add('done'); setTimeout(() => { alive = false; $('#boot').remove(); }, 1500); }, 350); }
  }, 55);
})();

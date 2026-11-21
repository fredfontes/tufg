/* TUFG service worker: app shell offline, código network-first, assets pesados cache-first sob demanda. */
const V = 'tufg-v1';
const SHELL = `${V}-shell`, ASSETS = `${V}-assets`;
const PRECACHE = ['/', '/index.html', '/vehicles.js', '/tracks.js', '/ads.js', '/music.js', '/manifest.json',
  '/assets/imgs/icon-192.png', '/assets/imgs/icon-512.png', '/assets/imgs/icon-maskable-512.png', '/assets/imgs/apple-touch-icon.png',
  'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js',
  'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/loaders/GLTFLoader.js'];
const CODE = /\.(?:html|js|json)$|\/$/;

self.addEventListener('install', e => {
  e.waitUntil(caches.open(SHELL).then(c => Promise.allSettled(PRECACHE.map(u => c.add(u)))).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => !k.startsWith(V)).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('message', e => {
  if (e.data && e.data.type === 'precache' && Array.isArray(e.data.urls)) {
    e.waitUntil((async () => {
      const c = await caches.open(ASSETS); let done = 0;
      for (const u of e.data.urls) {
        try { if (!(await c.match(u))) { const r = await fetch(u); if (r.ok) await c.put(u, r); } } catch (_) {}
        done++; const cl = await self.clients.matchAll(); cl.forEach(x => x.postMessage({ type: 'precache-progress', done, total: e.data.urls.length }));
      }
    })());
  }
});

async function rangeFrom(resp, req) {   // <audio> pede Range; o cache guarda resposta inteira
  const m = /bytes=(\d+)-(\d*)/.exec(req.headers.get('range') || '');
  if (!m) return resp;
  const buf = await resp.arrayBuffer(), s = +m[1], e = m[2] ? Math.min(+m[2], buf.byteLength - 1) : buf.byteLength - 1;
  return new Response(buf.slice(s, e + 1), { status: 206, statusText: 'Partial Content', headers: {
    'Content-Type': resp.headers.get('Content-Type') || 'audio/mpeg', 'Content-Range': `bytes ${s}-${e}/${buf.byteLength}`, 'Content-Length': String(e - s + 1), 'Accept-Ranges': 'bytes' } });
}

self.addEventListener('fetch', e => {
  const req = e.request; if (req.method !== 'GET') return;
  const url = new URL(req.url), same = url.origin === location.origin;
  if (same && CODE.test(url.pathname)) {            // código: rede primeiro, cache se offline
    e.respondWith(fetch(req).then(r => { if (r.ok) { const cp = r.clone(); caches.open(SHELL).then(c => c.put(req, cp)); } return r; })
      .catch(() => caches.match(req, { ignoreSearch: true }).then(r => r || caches.match('/index.html'))));
    return;
  }
  if (same && url.pathname.startsWith('/assets/')) { // glb/imagens/mp3: cache primeiro
    e.respondWith((async () => {
      const c = await caches.open(ASSETS); let hit = await c.match(req.url);
      if (hit) return rangeFrom(hit, req);
      const r = await fetch(new Request(req.url));   // busca inteira (sem Range) para poder guardar
      if (r.ok && r.status === 200) { c.put(req.url, r.clone()); return rangeFrom(r, req); }
      return r;
    })().catch(() => fetch(req)));
    return;
  }
  if (!same) {                                        // CDNs e fontes: cache primeiro
    e.respondWith(caches.match(req).then(h => h || fetch(req).then(r => { if (r.ok || r.type === 'opaque') { const cp = r.clone(); caches.open(SHELL).then(c => c.put(req, cp)); } return r; })));
  }
});

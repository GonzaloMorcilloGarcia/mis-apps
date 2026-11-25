// Service worker: permite abrir la app sin conexión.
// Estrategia "red primero": siempre la última versión si hay conexión,
// y la copia guardada cuando no la hay.
// Si cambias archivos y quieres forzar la actualización, sube el número de versión.

const PREFIX = 'godpole-';
const VERSION = PREFIX + 'v11';
const ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './css/app.css',
  './js/theme.js',
  './js/app.bundle.js',
  './icons/apple-touch-icon.png',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/favicon.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(VERSION).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      // Solo borra cachés antiguas de GodPole: si GymTrack y Roney se publican en la misma web,
      // comparten el almacén de cachés y no hay que tocar las suyas.
      .then((keys) => Promise.all(keys.filter((k) => k.startsWith(PREFIX) && k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return; // el evangelio lo gestiona la app (caché propia)

  // Red primero (con límite de 3 s) para recibir siempre la última versión;
  // si no hay conexión, se usa la copia guardada.
  event.respondWith(
    caches.open(VERSION).then(async (cache) => {
      // 'no-cache': siempre pregunta al servidor si hay versión nueva (evita copias antiguas)
      const network = fetch(req, { cache: 'no-cache' })
        .then((res) => {
          if (res && res.ok) cache.put(req, res.clone());
          return res;
        })
        .catch(() => null);
      const timeout = new Promise((resolve) => setTimeout(() => resolve(null), 3000));
      const res = await Promise.race([network, timeout]);
      if (res) return res;
      const cached = await cache.match(req, { ignoreSearch: true });
      if (cached) return cached;
      if (req.mode === 'navigate') {
        const shell = await cache.match('./index.html');
        if (shell) return shell;
      }
      return (await network) || new Response('', { status: 504 });
    }),
  );
});

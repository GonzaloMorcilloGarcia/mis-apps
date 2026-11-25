/* Service worker de Roney: cachea el "app shell" para que la app abra
   incluso sin conexión, tras la primera visita. No cachea datos (esos
   viven en localStorage, no aquí).

   Estrategia:
   - Página (index.html): primero red, si falla, caché. Así, con conexión,
     el iPhone recibe la versión nueva en cuanto se suben los archivos, en
     vez de quedarse con la antigua hasta que cambie CACHE_NAME (problema de
     la estrategia cache-first anterior). Sin conexión se usa la copia.
   - Resto (iconos, manifest): primero caché, son estáticos.
   Aun así, SUBE CACHE_NAME en cada cambio de index.html/manifest/iconos:
   es lo que fuerza a renovar iconos y manifest y a limpiar cachés viejas. */
const PREFIX = "roney-";
const CACHE_NAME = PREFIX + "shell-v5";
const ASSETS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icons/icon-32.png",
  "./icons/icon-180.png",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      // Solo cachés antiguas de Roney: si GodPole y GymTrack están en la misma web,
      // comparten el almacén de cachés y no hay que borrar las suyas.
      Promise.all(keys.filter((k) => k.startsWith(PREFIX) && k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  // Solo GET del propio origen; lo demás (no debería haber nada) pasa tal cual.
  if (req.method !== "GET" || new URL(req.url).origin !== self.location.origin) return;

  if (req.mode === "navigate") {
    // Red con límite de 3 s: con cobertura mala (no nula) se usa la copia guardada en vez de esperar.
    const timeout = new Promise((_, reject) => setTimeout(() => reject(new Error("timeout")), 3000));
    e.respondWith(
      Promise.race([fetch(req), timeout])
        .then((res) => {
          // Guarda la versión recién descargada para el uso sin conexión,
          // pero solo si es la propia app (no, p. ej., tests/browser.html,
          // que acabaría sirviéndose como si fuera Roney sin conexión).
          const path = new URL(req.url).pathname;
          const isApp = path.endsWith("/") || path.endsWith("/index.html");
          if (res.ok && isApp) {
            const copy = res.clone();
            caches.open(CACHE_NAME).then((c) => c.put("./index.html", copy));
          }
          return res;
        })
        // Sin copia guardada (primera visita), se espera a la red aunque tarde.
        .catch(() => caches.match("./index.html").then((r) => r || caches.match("./")).then((r) => r || fetch(req)))
    );
    return;
  }

  e.respondWith(caches.match(req).then((cached) => cached || fetch(req)));
});

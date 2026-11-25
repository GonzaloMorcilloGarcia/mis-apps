/* Service worker de GymTrack: guarda la app en el iPhone para que abra SIN CONEXIÓN.
   No guarda tus datos (esos viven en localStorage); solo los archivos de la app.

   Estrategia:
   - Página: primero la red (máx. 3 s) para recibir siempre la última versión si hay conexión;
     sin conexión, o si la red tarda, se usa la copia guardada.
   - Iconos y manifest: primero la copia guardada (no cambian).
   Si cambias index.html, sube VERSION: así se renuevan los archivos guardados. */
const PREFIX = "gymtrack-";
const VERSION = PREFIX + "v1";
const ASSETS = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./assets/icon-180.png",
  "./assets/icon-192.png",
  "./assets/icon-512.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(VERSION).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      // Solo borra cachés antiguas de GymTrack: si GodPole y Roney están en la misma web,
      // comparten el almacén de cachés y no hay que tocar las suyas.
      .then((keys) => Promise.all(keys.filter((k) => k.startsWith(PREFIX) && k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return; // GymTrack no usa nada externo

  if (req.mode === "navigate") {
    event.respondWith((async () => {
      const cache = await caches.open(VERSION);
      const network = fetch(req, { cache: "no-cache" }).then((res) => {
        // Solo se guarda la propia app (no, p. ej., tests/run.html)
        const isApp = url.pathname.endsWith("/") || url.pathname.endsWith("/index.html");
        if (res.ok && isApp) cache.put("./index.html", res.clone());
        return res;
      }).catch(() => null);
      const timeout = new Promise((r) => setTimeout(() => r(null), 3000));
      const res = await Promise.race([network, timeout]);
      if (res) return res;
      return (await cache.match("./index.html")) || (await network) || new Response("Sin conexión", { status: 503 });
    })());
    return;
  }

  event.respondWith(caches.match(req, { ignoreSearch: true }).then((hit) => hit || fetch(req)));
});

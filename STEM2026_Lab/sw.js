const CACHE = "stem2026-lab-v2";
const ASSETS = [
  "./",
  "./index.html",
  "./lab.css",
  "./lab.js",
  "./manifest.webmanifest",
  "./icons/icon.svg",
  "./cuestionario/index.html",
  "./cuestionario/css/estilo.css",
  "./cuestionario/js/preguntas.js",
  "./cuestionario/js/almacen.js",
  "./cuestionario/js/render-hoja.js",
  "./simulador/index.html",
  "./simulador/css/estilo.css",
  "./simulador/js/circuit_model.js",
  "./simulador/js/dibujo.js",
  "./simulador/js/app.js",
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(ASSETS).catch(() => {})));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});

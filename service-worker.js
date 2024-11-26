self.addEventListener('install', (event) => {
  console.log('Service Worker instalado');
  event.waitUntil(
    caches.open('cache-v1').then((cache) => {
      return cache.addAll([
        '/',                          // Página de inicio
        '/index.html',                // HTML principal
        '/manifest.json',             // Manifesto
        '/static/js/main.js',         // JS compilado
        '/static/css/main.css',       // CSS compilado
      ])
      .catch((error) => {
        console.error('Error al almacenar en caché: ', error);
      });
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});

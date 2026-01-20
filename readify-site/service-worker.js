const CACHE_NAME = 'readify-cache-v1';
const ASSETS = [
  'index.html',
  'explorer.html',
  'tracker.html',
  'recommender.html',
  'flow.html',
  'feedback.html',
  'css/base.css',
  'css/navbar.css',
  'css/footer.css',
  'css/home.css',
  'css/explorer.css',
  'css/tracker.css',
  'css/recommender.css',
  'css/flow.css',
  'css/feedback.css',
  'js/utils.js',
  'js/data.js',
  'js/navbar.js',
  'js/home.js',
  'js/explorer.js',
  'js/tracker.js',
  'js/recommender.js',
  'js/flow.js',
  'js/feedback.js',
  'manifest.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))
    )
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});

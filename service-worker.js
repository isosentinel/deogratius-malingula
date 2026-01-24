const CACHE_NAME = 'isosentinel-cache-v2';
const urlsToCache = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js',
  '/backmusic.mp3',
  '/logo.png',
  '/profile.jpg',
  '/docs/cyber.pdf',
  '/docs/encryption.pdf',
  '/images/cyber.png',
  '/manifest.json',
  '/icons/icon-192.png',
  '/icons/icon-512.png'
];

// INSTALL EVENT
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Caching files...');
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting();
});

// ACTIVATE EVENT
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(
        keyList.map(key => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      );
    })
  );
  self.clients.claim();
});

// FETCH EVENT
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    }).catch(err => {
      console.error('Fetch failed:', event.request.url, err);
      if(event.request.destination === 'document') {
        return caches.match('/index.html');
      }
    })
  );
});

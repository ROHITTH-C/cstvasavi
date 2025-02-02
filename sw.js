self.addEventListener('install', (event) => {
    event.waitUntil(
      caches.open('my-cache').then((cache) => {
        return cache.addAll([
          '/',
          '/index.html',
          '/styles.css',
          '/script.js'
        ]).catch((error) => {
          console.error('Cache error:', error);
        });
      })
    );
  });
  
  self.addEventListener('fetch', (event) => {
    event.respondWith(
      caches.match(event.request).then((response) => {
        if (response) {
          return response;  // Return cached response if available
        } else {
          return fetch(event.request).catch((error) => {
            console.error('Fetch error:', error);
          });
        }
      })
    );
  });
  
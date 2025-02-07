const CACHE_NAME = 'my-cache-v2'; // Update version

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll([
                // Add your files to cache here
            ]);
        })
    );
    self.skipWaiting(); // Force new worker activation immediately
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        (async () => {
            // Unregister service worker
            const registrations = await navigator.serviceWorker.getRegistrations();
            for (const registration of registrations) {
                await registration.unregister();
            }

            // Delete all caches
            const cacheNames = await caches.keys();
            await Promise.all(
                cacheNames.map((name) => caches.delete(name))
            );

            // Clear site data (localStorage, sessionStorage, IndexedDB)
            localStorage.clear();
            sessionStorage.clear();
            const dbs = await indexedDB.databases();
            dbs.forEach((db) => indexedDB.deleteDatabase(db.name));

            // Notify clients to reload
            const clients = await self.clients.matchAll({ type: 'window' });
            clients.forEach(client => client.postMessage({ action: 'reload' }));

            // Take control of open pages immediately
            await self.clients.claim();
        })()
    );
});

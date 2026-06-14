// Service Worker Minimalis untuk Syarat PWA Terinstall di Browser
const CACHE_NAME = 'ksmart-pwa-v1';
const assets = ['index.html', 'manifest.json'];

self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(assets);
        })
    );
});

self.addEventListener('fetch', e => {
    // Iframe request harus dilewatkan langsung ke network tanpa cache intercept eksternal
    if (e.request.mode === 'navigate' || e.request.url.includes('script.google.com')) {
        return;
    }
    e.respondWith(
        caches.match(e.request).then(response => {
            return response || fetch(e.request);
        })
    );
});
// TODO: should version this
const CACHE = 'immediate-claim';
self.addEventListener('install', function (evt) {
    console.log('The service worker is being installed.');
    evt.waitUntil(precache().then(function () {
        console.log('Immediate claim');
        return self.skipWaiting();
    }));
});

self.addEventListener('fetch', function (evt) {
    console.log('The service worker is serving the asset.');
    evt.respondWith(fromCache(evt.request));
    evt.waitUntil(update(evt.request));
});


async function update(request) {
    const cache = await caches.open(CACHE);
    const hasMatch = await cache.match(request);
    if (hasMatch) return cache;
    const response = await fetch(request)
    if (response) {
        return cache.put(request, response);
    }
}

async function fromCache(request) {
    const cache = await caches.open(CACHE);
    const hasMatch = await cache.match(request)
    if (hasMatch) {
        return hasMatch
    }
    return cache
}

async function precache() {
    const cache = await caches.open(CACHE);
    return cache.addAll([
        '/',
        './create.html',
        './edit.html',
        '/js/deps.js',
        '/js/index.js',
        '/js/modules/ToDoList.js',
        '/styles/index.css',
    ]);
}
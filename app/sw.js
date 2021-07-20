// TODO: should version this
const CACHE = "immediate-claim";
self.addEventListener("install", function (evt) {
  console.log("The service worker is being installed.");
  evt.waitUntil(
    precache().then(function () {
      console.log("Immediate claim");
      return self.skipWaiting();
    }),
  );
});

self.addEventListener("fetch", function (evt) {
  console.log("The service worker is serving the asset.");
  evt.respondWith(fromCache(evt.request));
  evt.waitUntil(update(evt.request));
});

async function update(request) {
  const cache = await caches.open(CACHE);
  const hasMatch = await cache.match(request);
  if (hasMatch) return cache;
  const response = await fetch(request);
  if (response) {
    await cache.put(request, response.clone());
    return response;
  }
}

async function fromCache(request) {
  const cache = await caches.open(CACHE);
  const hasMatch = await cache.match(request);
  if (hasMatch) {
    return hasMatch;
  }
  return cache;
}

async function precache() {
  const cache = await caches.open(CACHE);
  return cache.addAll([
    "/",
    "/manifest.json",
    "/favicon-32x32.png",
    "/create",
    "/edit",
    "/js/db.js",
    "/js/utils.js",
    "/js/modules/ToDoList.js",
    "/styles/index.css",
    "https://cdn.skypack.dev/pin/dexie@v3.0.3-c3n0iJSdyDHeMevyDHVi/mode=imports,min/optimized/dexie.js",
    "https://cdn.skypack.dev/-/dexie@v3.0.3-c3n0iJSdyDHeMevyDHVi/dist=es2020,mode=imports,min/optimized/dexie.js",
    "https://cdn.skypack.dev/pin/lit-element@v2.5.1-kJPqOtXnmU3W5UnUzeF9/mode=imports,min/optimized/lit-element.js",
    "https://cdn.skypack.dev/-/lit-element@v2.5.1-kJPqOtXnmU3W5UnUzeF9/dist=es2020,mode=imports,min/optimized/lit-element.js",
    "https://cdn.skypack.dev/-/lit-html@v1.4.1-oent33n0grd4QLhM138d/dist=es2020,mode=imports,min/optimized/lit-html.js",
    "https://cdn.skypack.dev/-/lit-html@v1.4.1-oent33n0grd4QLhM138d/dist=es2020,mode=imports,min/optimized/lit-html/lit-html.js",
  ]);
}

// the cache version gets updated every time there is a new deployment
const CACHE_VERSION = 10;
const CURRENT_CACHE = `hornb2b-cache-${CACHE_VERSION}`;
const staticAssets = [
  '/',
  '/factories/',
  '/logoApp.png',
  "/static/css/2.7da611e7.chunk.css.map",
  "/index.html",
  "/static/js/2.6f459573.chunk.js.map",
  "/static/js/2.6f459573.chunk.js",
  "/static/css/2.7da611e7.chunk.css",
  "/static/js/runtime-main.1fbb1ac2.js.map",
  "/static/js/runtime-main.1fbb1ac2.js",
  "/static/js/main.7525b180.chunk.js.map",
  "/static/js/main.7525b180.chunk.js",
  "/static/css/main.ecca78af.chunk.css",
  "/static/css/main.ecca78af.chunk.css.map",
  "/static/js/2.6f459573.chunk.js.LICENSE.txt",
  "/static/media/1.78da39f0.png",
  "/static/media/1.e5e2c04b.png",
  "/static/media/2.7fdcf4af.png",
  "/static/media/2.c131bce2.png",
  "/static/media/3.adc39c0b.png",
  "/static/media/3.ef666c6f.png",
  "/static/media/4.101907b2.png",
  "/static/media/4.cdbb92ff.png",
  "/static/media/5.2eef46e3.png",
  "/static/media/5.a7dad5ca.png",
  "/static/media/6.0910c749.png",
  "/static/media/6.7e9198a0.png",
  "/static/media/7.14de8dad.png",
  "/static/media/7.881fdb22.png",
  "/static/media/zw.f5ceeff7.svg",
  "/static/media/appleStore.98621923.svg",
  "/static/media/factoriezTopSectionBg.3c714f91.png",
  "/static/media/googlePlay.692a430c.svg",
  "/static/media/logisticsBannerXs-en.c3219aa1.png",
  "/static/media/sideNavBg.3e5d0971.png",
  "/static/media/logoXs.442754c6.png",
  "/static/media/requestListBg.7a3913a0.png",
  "/static/media/shipProductsBannerXs.54c890a6.png",
  "/static/media/statsBg.3a8b2173.jpg",
  '/manifest.webmanifest'
];

self.addEventListener('install', async event => {
  const cache = await caches.open(CURRENT_CACHE);
  await cache.addAll(staticAssets);
  return self.skipWaiting();
});

self.addEventListener('activate', event => {
  self.clients.claim();
});

self.addEventListener('fetch', async event => {

  const req = event.request;

  const url = new URL(req.url);

  if (url.origin === location.origin) {
    event.respondWith(cacheFirst(req));
  } else {
    event.respondWith(networkAndCache(req));
  }
});

async function cacheFirst(req) {
  const cache = await caches.open(CURRENT_CACHE);
  const cached = await cache.match(req);
  return cached || fetch(req);
}

async function networkAndCache(req) {
  const cache = await caches.open(CURRENT_CACHE);
  try {
    const fresh = await fetch(req);
    await cache.put(req, fresh.clone());
    return fresh;
  } catch (error) {
    const cached = await cache.match(req);
    return cached;
  }
}
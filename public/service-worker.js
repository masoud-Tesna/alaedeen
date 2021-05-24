// the cache version gets updated every time there is a new deployment
const CACHE_VERSION = 10;
const CURRENT_CACHE = `hornb2b-cache-${CACHE_VERSION}`;
const staticAssets = [
  '/',
  '/home/',
  '/factories/',
  './home/logoApp.png',
  "/home/static/css/2.7da611e7.chunk.css.map",
  "/home/index.html",
  "/home/static/js/2.6f459573.chunk.js.map",
  "/home/static/js/2.6f459573.chunk.js",
  "/home/static/css/2.7da611e7.chunk.css",
  "/home/static/js/runtime-main.1fbb1ac2.js.map",
  "/home/static/js/runtime-main.1fbb1ac2.js",
  "/home/static/js/main.7525b180.chunk.js.map",
  "/home/static/js/main.7525b180.chunk.js",
  "/home/static/css/main.ecca78af.chunk.css",
  "/home/static/css/main.ecca78af.chunk.css.map",
  "/home/static/js/2.6f459573.chunk.js.LICENSE.txt",
  "/home/static/media/1.78da39f0.png",
  "/home/static/media/1.e5e2c04b.png",
  "/home/static/media/2.7fdcf4af.png",
  "/home/static/media/2.c131bce2.png",
  "/home/static/media/3.adc39c0b.png",
  "/home/static/media/3.ef666c6f.png",
  "/home/static/media/4.101907b2.png",
  "/home/static/media/4.cdbb92ff.png",
  "/home/static/media/5.2eef46e3.png",
  "/home/static/media/5.a7dad5ca.png",
  "/home/static/media/6.0910c749.png",
  "/home/static/media/6.7e9198a0.png",
  "/home/static/media/7.14de8dad.png",
  "/home/static/media/7.881fdb22.png",
  "/home/static/media/zw.f5ceeff7.svg",
  "/home/static/media/appleStore.98621923.svg",
  "/home/static/media/factoriezTopSectionBg.3c714f91.png",
  "/home/static/media/googlePlay.692a430c.svg",
  "/home/static/media/logisticsBannerXs-en.c3219aa1.png",
  "/home/static/media/sideNavBg.3e5d0971.png",
  "/home/static/media/logoXs.442754c6.png",
  "/home/static/media/requestListBg.7a3913a0.png",
  "/home/static/media/shipProductsBannerXs.54c890a6.png",
  "/home/static/media/statsBg.3a8b2173.jpg",
  './home/manifest.webmanifest'
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
'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "assets/AssetManifest.json": "3140db514d387bd6981b4c8bb7c53aaf",
"assets/assets/fonts/GeneralSans-Bold.otf": "398fa49258135c6cefe9383eb0cb19e7",
"assets/assets/fonts/GeneralSans-Medium.otf": "543e455dde358b0724b7b27e5e9abcce",
"assets/assets/fonts/GeneralSans-Regular.otf": "95afa0447815d0498c2ed4c828cdd92a",
"assets/assets/fonts/GeneralSans-Semibold.otf": "858d81205b791170eaf0bc30c2ec7bc5",
"assets/assets/icons/appdev.png": "63165e7daf282989ee05fbc6aeb1f76a",
"assets/assets/icons/appstore.png": "23f70a19889b4e7e9b924a8ca501bf08",
"assets/assets/icons/appstore.svg": "38259e918bfe687372c4587cbba5457a",
"assets/assets/icons/arte_logo-02.png": "1873761f8c2a96762d5754242bbcd808",
"assets/assets/icons/btq.png": "16161aa7cd17a3e2412b67f0d0e4f155",
"assets/assets/icons/cv.pdf": "11ba83ec4095048e56c254710c1009a4",
"assets/assets/icons/facebook.png": "1b0a6fff69af40ef627c1836098c3975",
"assets/assets/icons/facebook.svg": "af9d1a70d8f4eaa1c8e6d3d1213feaac",
"assets/assets/icons/github.png": "7eda4122726c83fadc211ab84c4af347",
"assets/assets/icons/github.svg": "e7819703e5f8ae3eab00cf1e40471cf3",
"assets/assets/icons/link.png": "5748dabc0e9468fa51c1b658a8df8711",
"assets/assets/icons/link.svg": "27a150ba30aa7882afeae19d1357f05f",
"assets/assets/icons/livein.png": "2e8c50b81dd32c3d430857a94c4f8909",
"assets/assets/icons/livein.svg": "4d4be39f55b805dc387dada9eec7295f",
"assets/assets/icons/menu.png": "dc197f48bcedb38faff39c944d433371",
"assets/assets/icons/mobile.png": "b15b982158fc716bcec660a7c6e6a775",
"assets/assets/icons/mobile.svg": "3f445d88bce160e4ac5d3e9400a75f6a",
"assets/assets/icons/pets.png": "fa84f21fbca5150ce8406b5a2b7a7468",
"assets/assets/icons/playstore.png": "040f126472a18be9bb100116ae2bbeba",
"assets/assets/icons/playstore.svg": "927c67397c84d7dba52f690dfdc39ef7",
"assets/assets/icons/shopal.png": "6b94d390bc728bc7100674a941b33707",
"assets/assets/icons/tel.png": "3b56ced0c52d6336bff5091402c78051",
"assets/assets/icons/tel.svg": "9b787b47a6a88113023ccd6f5c3312f7",
"assets/assets/icons/uiux.png": "99461020bdb8ac539a788078293ba7e9",
"assets/assets/icons/wib.png": "f67efcc667ce436555ea88949293d0ab",
"assets/FontManifest.json": "d026626a0f0be648ac4a58d8adf4c80a",
"assets/fonts/MaterialIcons-Regular.otf": "e7069dfd19b331be16bed984668fe080",
"assets/NOTICES": "8cb5692c3124f1a07cfe0a02effd410c",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"canvaskit/canvaskit.js": "97937cb4c2c2073c968525a3e08c86a3",
"canvaskit/canvaskit.wasm": "3de12d898ec208a5f31362cc00f09b9e",
"canvaskit/profiling/canvaskit.js": "c21852696bc1cc82e8894d851c01921a",
"canvaskit/profiling/canvaskit.wasm": "371bc4e204443b0d5e774d64a046eb99",
"favicon.png": "ba6a65c96e266689203da75b07dffde0",
"flutter.js": "a85fcf6324d3c4d3ae3be1ae4931e9c5",
"icons/Icon-192.png": "4e7082dbe83d579cc5cc75fc8b4dc426",
"icons/Icon-512.png": "659ca6e273d429936103f66e58a9b79d",
"icons/Icon-maskable-192.png": "4e7082dbe83d579cc5cc75fc8b4dc426",
"icons/Icon-maskable-512.png": "659ca6e273d429936103f66e58a9b79d",
"index.html": "a20e12225699dcf93e176243adbaa0a3",
"/": "a20e12225699dcf93e176243adbaa0a3",
"main.dart.js": "fb7df6112b3b2ba2e76f5b88ef66cbe3",
"manifest.json": "3c00bfb5fa6c03e5efff656e896ed43c",
"version.json": "009c9e65172e010890f7f65fde438006"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}

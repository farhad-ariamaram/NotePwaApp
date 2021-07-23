const STATIC_CACHE_VERSION = 'static_1'

const STATIC_ASSESTS = [
    '/',
    '/Index',
    '/View',
    '/Insert',
    '/Edit',
    '/Delete',
    '/Recovery',
    '/css/site.css',
    '/js/ApiRepository.js',
    '/js/db.js',
    '/js/site.js',
    '/lib/jquery/dist/jquery.min.js',
    '/lib/bootstrap/dist/css/bootstrap.min.css',
    '/lib/bootstrap/dist/js/bootstrap.bundle.min.js',
    '/lib/idb/idb.js',
    '/lib/sweetAlert2/sweetalert2@11.js',
    '/lib/FontAwesome/fonts/font-awesome.min.css',
    '/lib/FontAwesome/fonts/fontawesome-webfont.ttf',
    '/lib/FontAwesome/fonts/fontawesome-webfont.woff',
    '/lib/FontAwesome/fonts/fontawesome-webfont.woff2',
    '/lib/FontAwesome/fonts/fontawesome-webfont.woff2?v=4.7.0',
    '/images/icons/icon-144x144.png',
    '/images/icons/icon-168x168.png',
    '/images/icons/icon-192x192.png',
    '/images/icons/icon-256x256.png',
    '/images/icons/icon-384x384.png',
    '/images/icons/icon-48x48.png',
    '/images/icons/icon-512x512.png',
    '/images/icons/icon-72x72.png',
    '/images/icons/icon-96x96.png',
    '/images/placeholder.png',
    '/manifest.json',
    '/favicon.ico',
    '/offline.html',
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(STATIC_CACHE_VERSION).then(function (cache) {
            return cache.addAll(STATIC_ASSESTS);
        })
    )
});

self.addEventListener('activate', (event) => {

    //remove old caches from browser
    event.waitUntil(
        caches.keys()
            .then((keys) => {
                return Promise.all(keys.map((key) => {
                    if (key !== STATIC_CACHE_VERSION) {
                        console.log('[SW] Remove Old Cache ', key);
                        return caches.delete(key);
                    }
                }));
            }));
    return self.clients.claim();
});

self.addEventListener('fetch', (event) => {
    const request = event.request;

    event.respondWith(
        fetch(request)
            .then((res) => {
                return res.clone();
            })
            .catch(err => caches.match(request))
    );

    //event.respondWith(

    //    //search in cache
    //    fetch(request).then(function () {

    //    }).catch(function () {
    //        caches.match(request)
    //            .then((response) => {
    //                return response
    //    }).catch((err) => {

    //                    //not in cache and no internet connection
    //                    return caches.open(STATIC_CACHE_VERSION)
    //                        .then(function (cache) {

    //                            //if wants go to a page that not cached, bring him to offline.html
    //                            if (request.headers.get('accept').includes('text/html')) {
    //                                return cache.match('/offline.html');
    //                                //note: '/offline.html' should cache in statics => const STATIC_ASSESTS
    //                            }

    //                            //if request a pic that not cached display default pic (placeholder.png)
    //                            if (request.url.match(/\.(jpe?g|png|gif|svg)$/)) {
    //                                return cache.match('/images/placeholder.png');
    //                                //note: '/images/placeholder.png' should cache in statics => const STATIC_ASSESTS
    //                            }

    //                        });
    //                });
    //        })
    //        .catch(console.error)
    //);

});
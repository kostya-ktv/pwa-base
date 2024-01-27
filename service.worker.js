// V12 --> important line (way to call service worker update cache)

const assets = [
    "/",
    "styles.css",
    "app.js",
    "sw-register.js",
    "https://fonts.gstatic.com/s/materialicons/v67/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2"
]

console.log('Start: Service worker')

self.addEventListener('install', event => {
    console.log('install listener')

    event.waitUntil(
        caches.open("assets").then(cache => {
            cache.addAll(assets)
        })
    )
    
})

// self.addEventListener('fetch', event => {
//     if (event.request.url.includes('fake')) {   
//         const response = new Response(`"Fake page" ${event.request.url}`)
//         event.respondWith(response)
//     } else {
//         event.respondWith(
//                 caches.open('assets').then(cache => {
//                 cache.match(event.request).then(cachedResponse => {
//                     if (cachedResponse) {
//                         // Cache founded
//                         return cachedResponse
//                     } else {
//                         // Cache not founded
//                         return fetch(event.request)
//                     }
//                 })
//             })     
//         )
        
//     }
// })

// Cache first strategy
self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request)  // searching in the cache
            .then( response => {
                if (response) {
                    // The request is in the cache 
                    return response; // cache hit
                } else {
                    // We need to go to the network  
                    return fetch(event.request);  // cache miss
                }
            })
    );
});

// State while revalidate strategy
// self.addEventListener('fetch', event => {
//     event.respondWith(
//         caches.match(event.request)
//             .then( cachedResponse => {
//                 // Even if the response is in the cache, we fetch it
//                 // and update the cache for future usage
//                 const fetchPromise = fetch(event.request).then(
//                      networkResponse => {
//                         caches.open("assets").then( cache => {
//                             cache.put(event.request, networkResponse.clone());
//                             return networkResponse;
//                         });
//                     });
//                 // We use the currently cached version if it's there
//                 return cachedResponse || fetchPromise; // cached or a network fetch
//             })
//         );
//     }); 

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

self.addEventListener('fetch', event => {
    if (event.request.url.includes('fake')) {   
        const response = new Response(`"Fake page" ${event.request.url}`)
        event.respondWith(response)
    } else {
        event.respondWith(
                caches.open('assets').then(cache => {
                cache.match(event.request).then(cachedResponse => {
                    if (cachedResponse) {
                        // Cache founded
                        return cachedResponse
                    } else {
                        // Cache not founded
                        return fetch(event.request)
                    }
                })
            })     
        )
        
    }
})
const addToCache = async (resources) => {
    const cache = await caches.open("v1");
    try {
        await cache.addAll(resources);
    } catch (error) {
        console.log("Error loading assets to cache");
    }
};

self.addEventListener("install", (event) => {
    event.waitUntil(
        addToCache([
            "sw.js",
            "index.html",
            "style.css",
            "js/sw-opener.js",
            "user.json",
            "android-chrome-192x192.png",
            "android-chrome-512x512.png",
            "img/person.svg",
            "img/location.svg",
            "img/C++-Alt.svg",
            "img/C-Alt.svg",
            "img/CSS3-Alt.svg",
            "img/HTML5-Alt.svg",
            "img/JS-Alt.svg",
            "img/PHP-Alt.svg",
            "img/Python-Alt.svg"
        ])
    );
});

const putInCache = async (request, response) => {
    const cache = await caches.open("v1");
    await cache.put(request, response);
};

const networkFirst = async ({request, fallbackUrl}) => {
    try {
        const responseFromNetwork = await fetch(request);
        return responseFromNetwork;
    } catch (error) {
        const responseFromCache = await fetch(fallbackUrl);
        if(responseFromCache){
            return responseFromCache;
        }
        return new Response("Data Error", {
            status: 408,
            headers: {"Content-Type": "text/plain"},
        });
    }   
};

const cacheFirst = async ({ request, fallbackUrl }) => {
    const responseFromCache = await caches.match(request);
    if(responseFromCache)
    {
        return responseFromCache;
    }
    try {
        const responseFromNetwork = await fetch(request);
        putInCache(request, responseFromNetwork.clone());
        return responseFromNetwork;
    } catch (error) {
        const fallbackResponse = await caches.match(fallbackUrl);
        if(fallbackResponse)
        {
            return fallbackResponse;
        }
        return new Response("Network error", {
            status: 408,
            headers: {"Content-Type": "text/plain"},
        });
    }
};

self.addEventListener("fetch", (event) => {
    event.respondWith(
        networkFirst({
            request: event.request,
            fallbackUrl: "./user.json",
        })
    );
});
const version = "v1:";
const sw_caches = {
    assets: {
        name: `${version}assets`
    },
    images: {
        name: `${version}images`
    },
    pages: {
        name: `${version}pages`
    }
};
const offline_page = "offline.html";
const preinstall = [
    offline_page,
    "index.html",
    "sw.js",
    "style.css",
    "user.json",
    "favicon.ico"
];

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
/* Instalacion alternativa
self.addEventListener("install", function(event) {
    event.waitUntil(
        caches.open(sw_caches.assets.name)
        .then(function(cache){
            return cache.addAll(preinstall);
        })
    );
});*/

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

    if(event.request.method !== "POST")
    {
        event.respondWith(
        networkFirst({
            request: event.request,
            fallbackUrl: "./user.json",
            })
        );
        return;
    }

    event.respondWith(async () => {
        const form_data = await event.request.formData();
        const reader = new FileReader();
        reader.readAsText(form_data.get("users"));/** <----- Modificar users si no es la etiqueta */
        const link = form_data.get("link") || "";
        reader.onload = () => {
            /** Colocar los datos en cache */
            putInCache("share_user", reader.result);
        }
        cacheFirst({request: "share_user", fallbackUrl: "user.json"});
        //return Response.redirect("index.html", 303);
    });

    /*event.respondWith(
        networkFirst({
            request: event.request,
            fallbackUrl: "./user.json",
        })
    );*/
});
self.addEventListener("activate", (event) => {
    /** Remove old cache */
    /*event.waitUntil(
        caches.keys()
            .then((keys) => {
                return Promise.all(
                    keys.filter((key) => {
                        return ! key.startsWith(version);
                    })
                    .map((key) => {
                        return caches.delete(key);
                    })
                );
            })
            .then(() => {
                clients.claim();
            })
    );*/
    clients.claim();
});
self.addEventListener('sync', (event) => {
    if(event.tag === "sync-post")
    {
        console.log("From Sync");
        event.waitUntil(() => {
            new Response("From sw sync",{
                status: 200,
                headers: {"Content-Type": "text/plain"}
            })
        });
    }
});


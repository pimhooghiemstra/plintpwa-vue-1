// service-worker.js
console.log('*** Our own service worker! ***');

if (workbox) {
    // adjust log level for displaying workbox logs
    workbox.core.setLogLevel(workbox.core.LOG_LEVELS.debug)

    // apply precaching. In the built version, the precacheManifest will
    // be imported using importScripts (as is workbox itself) and we can 
    // precache this. This is all we need for precaching
    workbox.precaching.precacheAndRoute(self.__precacheManifest);
}

// Listen to Push
self.addEventListener('push', (e) => {
    let data
    if (e.data) {
        data = e.data.json()
    }

    console.log('data for notification', data);

    const options = {
        body: data.body,
        icon: '/img/icons/android-chrome-192x192.png',
        image: '/img/autumn-forest.png',
        vibrate: [300, 200, 300],
        badge: '/img/icons/plint-badge-96x96.png',
    }

    console.log('options passed to Notification', options);

    e.waitUntil(self.registration.showNotification(data.title, options))
})

console.log('*** End of our own service worker! ***');

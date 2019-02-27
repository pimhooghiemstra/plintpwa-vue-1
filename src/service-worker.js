// service-worker.js
console.log('*** Our own service worker! ***');

if (workbox) {
    // adjust log level for displaying workbox logs
    workbox.core.setLogLevel(workbox.core.LOG_LEVELS.debug)

    // apply precaching. In the built version, the precacheManifest will
    // be imported using importScripts (as is workbox itself) and we can 
    // precache this. This is all we need for precaching
    workbox.precaching.precacheAndRoute(self.__precacheManifest);

    // Make sure to return a specific response for all navigation requests.
    // Since we have a SPA here, this should be index.html always.
    // https://stackoverflow.com/questions/49963982/vue-router-history-mode-with-pwa-in-offline-mode
    workbox.routing.registerNavigationRoute('/index.html')
}

// This code listens for the user's confirmation to update the app.
self.addEventListener('message', (e) => {
    console.log('message', e)
    if (!e.data) {
        return;
    }

    console.log('message data', e.data)
  
    switch (e.data) {
        case 'skipWaiting':
            console.log('Received message: SW updated, activate it now by skipWaiting')
            self.skipWaiting();
            break;
        default:
            // NOOP
            break;
    }
})

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

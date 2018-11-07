// service-worker.js
console.log('Our own service worker file!');

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

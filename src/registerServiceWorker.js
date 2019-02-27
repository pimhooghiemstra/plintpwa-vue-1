/* eslint-disable no-console */

import { register } from 'register-service-worker'

if (process.env.NODE_ENV === 'production') {
    register(`${process.env.BASE_URL}service-worker.js`, {
        ready () {
            console.log(
                'App is being served from cache by a service worker.\n' +
                'For more details, visit https://goo.gl/AFskqB'
            )
        },
        cached () {
            console.log('Content has been cached for offline use.')
        },
        updated (registration) {
            // console.log('New content is available; we\'ll make sure the updated SW will be activated now. However, user still needs to refresh the UI')
            // registration.waiting.postMessage('skipWaiting')

            console.log('New content is available! We\'ll show a refresh button for the user to click on and refresh')
            document.dispatchEvent(new CustomEvent('swUpdated', {detail: registration}))
        },
        offline () {
            console.log('No internet connection found. App is running in offline mode.')
        },
        error (error) {
            console.error('Error during service worker registration:', error)
        }
    })
}

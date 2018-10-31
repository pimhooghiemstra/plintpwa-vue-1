<template>
    <div class="home">
        <img alt="Vue logo" src="../assets/logo.png">
        <br>
        <button v-if="notificationsSupported" @click="toggleSubscription" :disabled="buttonDisabled">{{ (notificationsEnabled ? 'Disable' : 'Enable') }} notifications ></button>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'home',
    data() {
        return {
            notificationsSupported: false,
            notificationsEnabled: false,
            buttonDisabled: true,
            serviceWorkerRegistation: null,
            subscription: null,
        }
    },
    methods: {
        toggleSubscription() {
            if (this.notificationsSupported) {

                // Find out if we need to create a subscription or delete it
                if (!this.notificationsEnabled) {
                    // Ask permission and when granted, create new subscription
                    Notification.requestPermission()
                    .then(result => {
                        // if granted, create new subscription
                        if (result === 'granted') {
                            this.createSubscription()
                            .then(sub => {
                                console.log('subscription created on the client', sub);
                                this.subscription = sub

                                // create a user, then save username in localStorage
                                return axios.post(`${process.env.VUE_APP_API_PATH}/user`)
                            })
                            .then(user => {
                                console.log('user created on the server', user);
                                localStorage.setItem('username', user.name)

                                // store new subscription on the server
                                return axios.post(`${process.env.VUE_APP_API_PATH}/subscription`, {
                                    subscription: this.subscription,
                                    user
                                })
                            })
                            .then(() => this.showNotification())
                        } else {
                            console.log('User did not granted permission')
                        }
                    })
                } else {
                    // Destroy subscription
                }
            }
        },
        createSubscription() {
            console.log('ask for active service worker registration');
            if (this.serviceWorkerRegistation === null) {
                return navigator.serviceWorker.ready // returns a Promise, the active SW registration
                .then(swreg => {
                    this.serviceWorkerRegistation = swreg
                    return this.subscribe(this.serviceWorkerRegistation)
                })
            } else {
                return this.subscribe(this.serviceWorkerRegistation)
            }
        },
        subscribe(swreg) {
            console.log('create new subscription for this browser on this device');
            // create new subscription for this browser on this device
            const vapidPublicKey = process.env.VUE_APP_VAPID_PUBLIC_KEY
            const convertedVapidPublicKey = this.urlBase64ToUint8Array(vapidPublicKey)
            // return the subscription promise, we chain another then where we can send it to the server
            return swreg.pushManager.subscribe({
                userVisibleOnly: true,
                // This is for security. On the backend, we need to do something with the VAPID_PRIVATE_KEY
                // that you can find in .env to make this work in the end
                applicationServerKey: convertedVapidPublicKey
            })
        },
        showNotification() {
            this.serviceWorkerRegistation.showNotification('Notifications granted', {
                body: 'Here is a first notification',
                icon: '/img/icons/android-chrome-192x192.png',
                image: '/img/autumn-forest.png',
                vibrate: [300, 200, 300],
                badge: '/img/icons/plint-badge-96x96.png',
                // actions: [
                //     { action: 'confirm', title: 'Okay', icon: '/img/icons/android-chrome-192x192.png'},
                //     { action: 'cancel', title: 'Cancel', icon: '/img/icons/android-chrome-192x192.png'}
                // ],
            })
        },
        findSubscription() {
            // check if this user + device has a subscription going
            // return either the subscription or null

            // return null // becomes a Promise later on
            return new Promise(resolve => resolve(null))
        },
        urlBase64ToUint8Array(base64String) {
            const padding = '='.repeat((4 - base64String.length % 4) % 4);
            const base64 = (base64String + padding)
                .replace(/\-/g, '+')
                .replace(/_/g, '/');

            const rawData = window.atob(base64);
            let outputArray = new Uint8Array(rawData.length);

            for (let i = 0; i < rawData.length; ++i) {
                outputArray[i] = rawData.charCodeAt(i);
            }
            return outputArray;
        },
    },
    created() {
        if ('Notification' in window && 'serviceWorker' in navigator) {
            this.notificationsSupported = true

            // Find out if the user has a subscription at the moment.
            // If so, update the enabled flag in data
            this.findSubscription()
            .then(sub => {
                if (sub === null) {
                    this.buttonDisabled = false
                } else {
                    // retrieve user info from API
                    this.buttonDisabled = true
                    this.notificationsEnabled = true
                }
            })


            // // Since we don't have authentication, we check for the random
            // // username in LocalStorage. If it is there, we can try to find
            // // a user/ subscription using the API
            // const userName = localStorage.getItem('username');
            // if (userName !== null) {

            // }
        }
    },
}
</script>

<style scoped lang="less">
    button {
        background: #1da025;
        color: #fff;
        padding: 10px 20px;
        font-size: 18px;
        margin-top: 20px;

        &:focus {
            outline: none;
        }

        &:disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }
    }
</style>

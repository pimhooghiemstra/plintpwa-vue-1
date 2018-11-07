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
            buttonDisabled: false,
            serviceWorkerRegistation: null,
            subscription: null,
        }
    },
    methods: {
        toggleSubscription() {
            if (this.notificationsSupported) {
                this.buttonDisabled = true
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

                                // get new (or existing user) from backend
                                return axios.post(`${process.env.VUE_APP_API_PATH}/user`, {username: localStorage.getItem('username')})
                            })
                            .then(({data}) => {
                                const { user } = data
                                console.log('user created on the server', user);
                                localStorage.setItem('username', user.name)

                                // store new subscription on the server
                                return axios.post(`${process.env.VUE_APP_API_PATH}/subscription`, {
                                    subscription: this.subscription,
                                    userId: user.id,
                                })
                            })
                            .then(() => {
                                this.showNotification()
                                this.buttonDisabled = false
                                this.notificationsEnabled = true
                            })
                        } else {
                            console.log('User did not granted permission')
                        }
                    })
                } else {
                    // Destroy subscription
                    console.log('Disable subscription');
                    if (this.subscription !== null) {
                        // destroy on the server
                        return axios.post(`${process.env.VUE_APP_API_PATH}/subscription/delete`, {
                            endpoint: this.subscription.endpoint,
                        })
                        // unsubscribe on the client
                        .then(() => this.subscription.unsubscribe())
                        .then(() => {
                            // update the data
                            this.notificationsEnabled = false
                            this.buttonDisabled = false
                            this.subscription = null
                        })
                    }
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
        getSubscription(swreg) {
            console.log('ask for available subscription');
            return swreg.pushManager.getSubscription()
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
            console.log('get active service worker registration');
            return navigator.serviceWorker.ready
            .then(swreg => {
                console.log('haal active subscription op');
                this.serviceWorkerRegistation = swreg
                return this.getSubscription(this.serviceWorkerRegistation)
            })
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
        }
    },
    mounted() {
        // Find out if the user has a subscription at the moment.
        // If so, update the enabled flag in data
        this.findSubscription()
        .then(sub => {
            if (sub === null) {
                console.log('no active subscription found on the client', sub);
                this.buttonDisabled = false
                this.notificationsEnabled = false
            } else {
                console.log('Active subscription found', sub);
                // retrieve user info from API
                this.buttonDisabled = false
                this.notificationsEnabled = true
                this.subscription = sub
            }
        })
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

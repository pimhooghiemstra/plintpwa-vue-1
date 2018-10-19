<template>
    <div class="home">
        <img alt="Vue logo" src="../assets/logo.png">
        <br>
        <button v-if="notificationsSupported" @click="askPermission">Enable notifications ></button>
    </div>
</template>

<script>
export default {
    name: 'home',
    data() {
        return {
            notificationsSupported: false,
        }
    },
    methods: {
        askPermission() {
            if (this.notificationsSupported) {
                Notification.requestPermission(result => {
                    console.log('result from permission question', result);
                        if (result !== 'granted') {
                        alert('You probably do not like notifications?!');
                    } else {
                        console.log('A notification will be send from the service worker => This only works in production');
                        this.showNotification()
                    }
                })
            }
        },
        showNotification() {
            if ('serviceWorker' in navigator) {
                navigator.serviceWorker.ready // returns a Promise, the active SW registration
                    .then(swreg => swreg.showNotification('Notifications granted', {
                        body: 'Here is a first notification',
                        icon: '/img/icons/android-chrome-192x192.png',
                        image: '/img/autumn-forest.png',
                        vibrate: [300, 200, 300],
                        badge: '/img/icons/plint-badge-96x96.png',
                        // actions: [
                        //     { action: 'confirm', title: 'Okay', icon: '/img/icons/android-chrome-192x192.png'},
                        //     { action: 'cancel', title: 'Cancel', icon: '/img/icons/android-chrome-192x192.png'}
                        // ],
                    }))
            }
        },
    },
    created() {
        if ('Notification' in window && 'serviceWorker' in navigator) {
            this.notificationsSupported = true
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
    }
</style>

<template>
    <div id="app">
        <div id="nav">
            <router-link to="/">Home</router-link> |
            <router-link to="/about">About</router-link>
        </div>
        <button id="refresh-button" v-if="updateExists" @click="refreshApp">Click to update!</button>
        <p v-show="showMessage" id="notification">
            This demo reflects the code from <a href="https://github.com/pimhooghiemstra/plintpwa-vue-1/" target="_blank">this repository</a>. 
            The corresponding post will be available on our blog soon.
            <br>
            Please clear your application's storage (using the devTools) if you have played around with this demo before.
            <button type="button" @click="hideMessage">&times;</button>
        </p>
        <router-view/>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                showMessage: true,
                blogPost: 'https://www.blog.plint-sites.nl/how-to-add-push-notifications-to-a-progressive-web-app/',
                // refresh variables
                refreshing: false,
                registration: null,
                updateExists: false,
            };
        },
        methods: {
            hideMessage() {
                this.showMessage = false
            },
            showRefreshUI(e) {
                this.registration = e.detail
                this.updateExists = true  
            },
            refreshApp() {
                this.updateExists = false
                if (!this.registration || !this.registration.waiting) return
                // send message to SW to skip the waiting and activate the new SW
                this.registration.waiting.postMessage('skipWaiting')
            },
        },
        created() {
            // --- 
            // Custom code to let user update the app
            // when a new service worker is available
            // --- 
            document.addEventListener('swUpdated', this.showRefreshUI, {once: true})
                                       
            navigator.serviceWorker.addEventListener('controllerchange', () => {
                if (this.refreshing) return
                this.refreshing = true
                // Here the actual reload of the page occurs
                window.location.reload()
            })
        },
    };
</script>

<style lang="less">
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
#nav {
    padding: 30px;
    a {
        font-weight: bold;
        color: #2c3e50;
        &.router-link-exact-active {
            color: #42b983;
        }
    }
}
p#notification {
    position: relative;
    width: 300px;
    margin-left: auto;
    margin-right: auto;
    font-size: 12px;

    a {
        color: #42b983;
    }

    button {
        position: absolute;
        top: -20px;
        right: -20px;
        padding: 0 5px 2px;
        background: #1da025;
        color: #fff;
        font-size: 16px;

        &:hover {
            cursor: pointer;
        }
    }
}
button#refresh-button {
    width: 240px;
    background: #a0251d;
    color: #fff;
    padding: 10px 20px;
    font-size: 18px;
    margin-bottom: 30px;

    &:focus {
        outline: none;
    }

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
}
</style>

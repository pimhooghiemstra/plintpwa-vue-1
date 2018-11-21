<template>
    <div id="app">
        <div id="nav">
            <router-link to="/">Home</router-link> |
            <router-link to="/about">About</router-link>
        </div>
        <p v-show="showMessage" id="notification">
            This demo reflects the code from <a href="https://github.com/pimhooghiemstra/plintpwa-vue-1/releases/tag/v0.2" target="_blank">this repository</a>. The corresponding post will be on our blog shortly.
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
            };
        },
        methods: {
            hideMessage() {
                this.showMessage = false
            },
        }
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
</style>

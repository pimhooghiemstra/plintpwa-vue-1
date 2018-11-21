<template>
    <div id="app">
        <div id="nav">
            <router-link to="/">Home</router-link> |
            <router-link to="/about">About</router-link>
        </div>
        <p id="notification">This demo reflects the code from <a href="https://github.com/pimhooghiemstra/plintpwa-vue-1/releases/tag/v0.2" target="_blank">this repository</a>. The corresponding post will be on our blog shortly.</p>
        <router-view/>
    </div>
</template>

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
    width: 300px;
    margin-left: auto;
    margin-right: auto;
    font-size: 12px;

    a {
        color: #42b983;
    }
}
</style>

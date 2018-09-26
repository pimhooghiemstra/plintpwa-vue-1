<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <br>
    <button @click="notify">Enable notifications ></button>
  </div>
</template>

<script>

export default {
  name: 'home',
  methods: {
    notify() {
        alert('You just clicked the notification button')
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

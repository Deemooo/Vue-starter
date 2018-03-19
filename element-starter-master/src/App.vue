<template>
  <div id="app">
    <img src="src/assets/logo.png">
    <router-link to="/">Home</router-link>
      <router-link to="/counter">counter</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
export default {

}
</script>

<style>
#app {
  font-family: Helvetica, sans-serif;
  text-align: center;
}
</style>

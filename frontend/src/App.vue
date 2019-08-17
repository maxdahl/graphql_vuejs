<template>
  <div id="app">
    <app-header />
    <!-- <div v-if="user != null">
      <router-link :to="{name: 'home'}">Home</router-link>
    </div>
    <div v-else>
      <router-link :to="{name: 'login'}">Login</router-link>
      <router-link :to="{name: 'register'}">register</router-link>
    </div>-->
    <router-view></router-view>
  </div>
</template>

<script>
import Header from "./components/header";
export default {
  components: {
    appHeader: Header
  }
};
</script>

<style>
</style> 

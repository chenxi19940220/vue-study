<template>
  <div id="app">
    <left-Nav></left-Nav>
    <div class="main">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import leftNav from './components/common/leftNav'

export default {
  name: 'App',
  components: {
    leftNav
  }
}
</script>

<style>
.main {
  float: left;
  background: #fff;
  width: 94%;
  height: 100%;
}
</style>

<template>
  <div id="app">
    <Header class="container"/>
    <router-view class="container"></router-view>
  </div>
</template>

<script>
import Header from './components/Header'
export default {
  name: 'App',
  components: {
    Header
  }
}
</script>
<script setup la
  components: { Messages },{ Nav },ng="ts">
import Nav from './components/Nav.vue'

</script>

<template>
  <Nav />

  <div class="container">
       <router-view />
  </div>


</template>
<style>
</style>

<script setup la
  components: { Messages },{ Nav },ng="ts">
import Nav from './components/Nav.vue';
import Messages from './pages/Messages.vue';

</script>

<template>
  <Nav />

 <div class="container">
        <section class="section">
            <h1 class="title">
                Praying Ukraine - Somthing Something
            </h1>
            <Messages />            
        </section>
    </div>


</template>
<style>
</style>

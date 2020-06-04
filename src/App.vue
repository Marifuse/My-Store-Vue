<template>
  <div id="app">
    <navbar :brand="'My Store'"/>
    <router-view/>
    <!-- Cierre o Footer -->
    <footer class="footer-container">
      <div class="container">
        <h6 class="title-footer">Todos los derechos reservados®</h6>
      </div>
    </footer>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'

export default {
  components: {
    Navbar,
  },
}
</script>


<style lang="scss">
  body {
    background-color: #000000;
  }
  // Footer
  .footer-container {
    background-color: rgb(190, 0, 79);
    color: #FFFFFF;
    text-align: center;
    padding: 1em;
    margin-top: 2em;
  }
</style>

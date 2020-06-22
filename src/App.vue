<template>
  <div id="app">
    <navbar :brand="'Sakura Store'"/>
    <!-- Modal del Progres que aparece mientras carga la página -->
    <div class="modal" :class="{'is-active': load}">
      <div class="modal-background"></div>
      <div class="modal-content">
        <progress class="progress is-danger" max="100">60%</progress>
      </div>
    </div>
    <router-view/>
    <Footer/>
  </div>
</template>

<script>
// Importación del componente navbar
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import { mapState } from 'vuex'

export default {
  components: {
    Navbar,
    Footer
  },
  computed: {
    ...mapState(['load'])
  }
}
</script>

<style lang="scss">
  body {
    background-color: #000000;
  }
</style>

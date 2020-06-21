<template>
  <div class="container-not-found">
    <div class="columns">
      <div class="column is-one-third"></div>
      <img class="error404" src="error-404.jpg">
      <div class="column is-one-third"></div>
    </div>  
    <div class="columns">
      <div class="column is-one-third"></div>
      <!-- Boton que permite volver al Home o vista principal -->
      <div class="btn-home">
        <router-link to="/home" class="button is-danger is-rounded">
          Volver a Home
        </router-link>
      </div>
      <div class="column is-one-third"></div>
    </div> 
  </div>
</template>

<script>
export default {
  
}
</script>

<style>
.container-not-found {
  padding: 4.5em;
}
.error404 {
  width: 25em;
}
.btn-home {
  margin: auto;
}
  
</style>
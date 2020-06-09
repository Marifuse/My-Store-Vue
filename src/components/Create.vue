<template>
  <div>
      <section class="section-form">
          <div class="form-create">
            <h2 class="title-form">Agrega un Nuevo Producto</h2>
            <input class="inp-item" type="text" v-model="name" placeholder="Ingrese Producto">
            <br><br>
            <input class="inp-item" type="number" v-model="price" placeholder="Ingrese el Valor">
            <br><br>
            <input class="inp-item" type="text" v-model="picture" placeholder="Ingrese Imagen">
            <br><br>
            <button class="button is-danger btn-input" @click="createProduct">Añadir</button>
          </div>
      </section> 
  </div>
</template>

<script>

import axios from 'axios'

export default {
    data() {
        return {
            name: '',
            picture: '',
            price: ''
        }
    },
    methods: {
        createProduct() {
            let result = {
                name: this.name,
                picture: this.picture,
                price: this.price
            }
            console.log(result)
            axios.post('https://us-central1-tddg3-b2b86.cloudfunctions.net/products/product', result)
            .then((response) => {
                console.log(response);
                this.$router.push('/home')
            })
            .catch(function(error) {
                console.log(error);
            });
        }
    },
}
</script>

<style>
.section-form {
    padding: 3em;
}
.form-create {
    width: 20em;
    background-color: #FFFFFF;
    text-align: center;
    padding: 3em;
    border-radius: 2em;
    margin: auto;
    margin-top: 2.5em;
}
.title-form {
    font-weight: bold;
    font-size: 1.5em;
    margin-bottom: 1em;
}
.inp-item {
    width: 15em;
    text-align: center;
    padding: 0.5em;
    border-color: currentColor;
    border-radius: 1em;
}
.btn-input {
    width: 8em;
}
</style>
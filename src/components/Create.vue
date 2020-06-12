<template>
  <div>
    <div class="columns">
      <div class="column is-one-third"></div>
        <section class="section-form">
            <div class="form-create">
              <h2 class="title-form">Agrega un Nuevo Producto</h2>
              <input class="input inp-form" type="text" v-model="name" placeholder="Ingrese Nombre del Producto">
              <br><br>
              <input class="input inp-form" type="number" v-model="price" placeholder="Ingrese el Precio">
              <br><br>
              <input class="input inp-form" type="text" v-model="picture" placeholder="Ingrese Imagen del Producto">
              <br><br>
              <button class="button is-danger btn-input" @click="createProduct">Añadir</button>
              <button class="button is-dark btn-input" v-if="edit" @click="updateProduct(id)">Actualizar</button>
            </div>
        </section>    
      <div class="column is-one-third"></div>
    </div>
    <div class="columns">
      <div class="column is-one-two"></div>  
      <section class="table-section column is-one-two">
        <h1 class="title-listPro">Listado de Productos Agregados Recientemente</h1>
        <table class="table table-striped t-products">
          <thead>
            <tr>
              <th>Nombre Producto</th>
              <th>Precio</th>
              <th>Imagen</th>
              <th colspan="2" class="action">Acción</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="p in computedProductList" :key="p.id">
              <td>{{ p.data.name }}</td>
              <td>{{ p.data.price }}</td>
              <td><img :src="p.data.picture"></td> 
              <td>
                <button class="button is-danger" @click="editProduct(p.id)">
                  <span class="icon is-small is-left b-icon">
                    <i class="mdi mdi-pencil-outline"></i>
                  </span>Editar</button>
                  <!-- @click="editItem(p['.key'])"  -->
                <div class="is-clearfix"></div>
              </td>
              <td>
                <button class="button is-black" @click="deleteProduct(p.id)">
                  <span class="icon is-small is-left b-icon">
                    <i class="mdi mdi-delete-forever"></i>
                  </span>Borrar</button>
                  <!-- @click="deleteItem(p['.key'])" -->
                <div class="is-clearfix"></div>
              </td>
            </tr>
          </tbody>
        </table>
        <router-link to="/home" class="button is-light">
          Volver a Home
        </router-link>
      </section>
      <div class="column is-one-two"></div>
    </div>  
  </div>
</template>

<script>
import axios from 'axios'
import { mapState, mapActions } from 'vuex'

export default {
    data() {
        return {
            name: '',
            picture: '',
            price: '',
            id: undefined
        }
    },
    methods: {
        ...mapActions(['updateEdit']),
        createProduct() {
            let result = {
                name: this.name,
                picture: this.picture,
                price: this.price
            }
            console.log(result)
            axios.post('https://us-central1-tddg3-b2b86.cloudfunctions.net/products/product', result, 
            {headers:{'content-type':'application/json'}})
            .then((response) => {
                console.log(response);
                this.$store.dispatch('getProducts')
            })
            .catch(function(error) {
                console.log(error);
            });
        },
        deleteProduct(id) {
          let confirmation = confirm('¿Estás Seguro?')
          if(confirmation) {
            axios.delete(`https://us-central1-tddg3-b2b86.cloudfunctions.net/products/product/${id}`, 
            {headers:{'content-type':'application/json'}})
            .then(() => {
              alert('Producto Eliminado Exitosamente')
              this.$store.dispatch('getProducts')
            })
          }
        },
        editProduct(id) {
          this.updateEdit()
          this.findProduct(id)
        },
        findProduct(id) {
          axios.get(`https://us-central1-tddg3-b2b86.cloudfunctions.net/products/product/${id}`, 
          {headers:{'content-type':'application/json'}})
          .then((response) => {
            this.name = response.data.name
            this.picture = response.data.picture
            this.price = response.data.price
            this.id = id
          })
        },
        updateProduct(id) {
          let result = {
                name: this.name,
                picture: this.picture,
                price: this.price
            }
            console.log(result)
            axios.put(`https://us-central1-tddg3-b2b86.cloudfunctions.net/products/product/${id}`,result, 
            {headers:{'content-type':'application/json'}})
            .then(() => {
                this.name = ""
                this.picture = ""
                this.price = ""
                this.id = ""
                this.$store.dispatch('getProducts')
            })
            .catch(function(error) {
                console.log(error);
            });
        }      
    },
    computed: {
      ...mapState(['products', 'edit']),
      computedProductList() {
        return this.products
      }
    },
    mounted() {
      this.$store.dispatch('getProducts')
    },
}
</script>

<style>
.section-form {
    padding: 3em;
}
.form-create {
    width: 22em;
    background-color: #FFFFFF;
    text-align: center;
    padding: 3em;
    border-radius: 2em;
    margin: auto;
    margin-top: 4em;
}
.title-form {
    font-weight: bold;
    font-size: 1.5em;
    margin-bottom: 1em;
}
.inp-form {
  text-align: center;
  border: 1px solid grey !important;
}
.btn-input {
    margin: 0.5em;
}
.table-section {
    text-align: center;
    margin-bottom: 2em;
}
.title-listPro {
    color: #FFFFFF;
    font-size: 1.5em;
    margin-top: 1em;
    margin-bottom: 1em;
}
.t-products {
    border-radius: 1em;
}
.b-icon {
   padding-right: 0.5em;
}
</style>
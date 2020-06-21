<template>
  <div class="container">
    <!-- Cabecera del la Pagina -->
    <section class="hero is-primary is-bold">
      <div class="hero-body">
        <div class="container">
          <div style="display: inline-block;">
            <h1 class="title">
              Nuestros Productos Anime
            </h1>
            <h2 class="subtitle">
              Elige lo que tú quieras 🌸 
            </h2>
          </div>
          <div class="is-pulled-right" style="display: inline-block;">
            <div class="field">
              <br>
              <p class="control has-icons-left">
                <input class="input" type="text" placeholder="Escribe aquí" v-model="search">
                <span class="icon is-small is-left">
                  <i class="mdi mdi-magnify"></i>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- Sección de las cards -->
    <div class="columns is-multiline">
      <div class="column is-4 cards-container" v-for="p in computedProductList" :key="p.id">
        <!-- Item -->
        <div class="card has-equal-height">
          <div class="image-card">
            <!-- Imagen del producto -->
            <div class="image has-spacing image is-16by9">
              <img alt="product" :src="p.data.picture">
            </div>
          </div>
          <div class="card-content">
            <div class="content">
              <h3 class="title">{{ p.data.name }}</h3>
              <p class="subtitle">$ {{ parseInt(p.data.price * p.qty) }}</p>
              <!-- Argumento del producto -->
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quis lorem ut libero malesuada feugiat. Donec rutrum congue leo eget malesuada. Donec rutrum congue leo eget malesuada.</p>
              <!-- Agrega y quita valor/precio del producto -->
              <div class="counter">
                <button @click="decrQty(p.id)" :disabled="p.qty === 1"><i class="mdi mdi-minus"></i></button>
                {{ p.qty }}
                <button @click="incrQty(p.id)"><i class="mdi mdi-plus"></i></button>
              </div>
              <!-- Boton para agregar al carro de compras -->
              <button @click="addToCart(p)" class="button is-pulled-right is-danger">
                <i class="mdi mdi-cart"></i>
              </button>
              <div class="is-clearfix"></div>
            </div>
          </div>
        </div>
      </div> 
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  components: {},
  props: {},
  data() {
    return {
      search: '',
    }
  },
  methods: {
    // Metodo de incremento
    incrQty(id) {
      let idx = this.products.map(p => p.id).indexOf(id)
      this.products[idx].qty++
    },
    // Metodo de disminucion
    decrQty(id) {
      let idx = this.products.map(p => p.id).indexOf(id)
      // console.log('decr on ', this.products[idx])
      if(this.products[idx].qty > 1) {
        this.products[idx].qty--
      }
    },
    // Agregar al carro
    addToCart(product) {
      // push a copy of product to the cart
      let p = JSON.parse(JSON.stringify(product))
      this.$store.dispatch('addToCart', p)
      // reset qty
      product.qty = 1
    }
  },
  computed: {
    ...mapState(['products']),
    computedProductList() {
      console.log(this.products)
      return this.products.filter(p => {
        return p.data.name.toLowerCase().includes(this.search.toLowerCase())
      })
    }
  },
  watch: {},
  created() {
    this.$store.dispatch('getProducts')
  },
  mounted() {}
}
</script>

<style lang="scss" scoped>
// Header
.hero-body {
  background-color: #51005D !important;
  margin-top: 2.5em;
}
// Botón de compra
.counter {
  display: inline-block;
  button {
    text-align: center;
    border-radius: 50%;
    height: 2rem;
    width: 2rem;
    cursor: pointer;
  }
}
// Sección cartas 
.cards-container {
  margin-top: 1em;
}
</style>
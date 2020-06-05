<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="container">
    <!-- Brand -->
    <div class="navbar-brand">
      <router-link to="/" class="navbar-item">
        {{ brand }}
      </router-link>
      <a role="button"
      class="navbar-burger burger" aria-label="menu" aria-expanded="false"
      data-target="navbarMenu"
      @click="displayMenu = !displayMenu">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>
    <!--  -->
    <div id="navbarMenu" class="navbar-menu" :style="displayMenuStyle">
        <div class="navbar-start">
          <!--
          <a class="navbar-item">
            Home
          </a>
          -->
        </div>

        <div class="navbar-end">
          <a data-testId="cart" class="navbar-item1" @click="showCart">
            <span class="icon">
              <i class="mdi mdi-32px mdi-cart"></i>
              <span
              class="tag is-dark"
              v-if="$store.getters.shoppingCart.list.length > 0">
                {{ $store.getters.shoppingCart.list.length }}
              </span>
            </span>
          </a>
          <router-link v-if="!isLoggedIn" to="/login" class="navbar-item">
            Login
          </router-link>
          <div v-else class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link">
                <span class="icon">
                  <i class="mdi mdi-32px mdi-account"></i>
                </span>
                Usuario
            </a>

            <div class="navbar-dropdown">
              <a class="navbar-item">
                Preferencias
              </a>
              <a class="navbar-item" @click="showCart">
                Ver Carrito
              </a>
              <hr class="navbar-divider">
              <a class="navbar-item" @click="logout">
                Cerrar Sesión
              </a>
            </div>
          </div>
        </div>
      </div>
    <!--  -->
    </div> <!-- container -->
  </nav>
</template>

<script>
export default {
  name: '',
  components: {},
  props: {
    brand: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      displayMenu: false,
    }
  },
  methods: {
    showCart(event) {
      event.preventDefault();
      this.$store.dispatch('updateShowCart', true)
    },
    logout() {
      this.$store.dispatch('updateUser', undefined)
      this.$router.push('/')
    }
  },
  computed: {
    displayMenuStyle() {
      return { display: this.displayMenu ? 'block' : 'none' }
    },
    isLoggedIn() {
      return this.$store.getters.isLoggedIn
    }
  },
  watch: {},
  created() {},
  mounted() {}
}
</script>

<style lang="scss" scoped>
nav {
  width: 100%;
  height: 3.25rem;
  font-size: 1.5em;
  font-weight: 700;
  background-color: rgb(190, 0, 79);
  position: fixed;
}
a {
  color: rgb(255, 167, 233) !important;
  transition: .3s;
}
a:visited {
  color: rgb(255, 167, 233) !important;
}
a:hover {
  background-color: #FFFFFF !important;
  color: #51005D !important;
}
.navbar-item1 {
  width: 2.5em;
  padding-top: 0.4em;
}
.mdi-cart {
  padding-left: 1.3em;
}
</style>
// Apartado donde se importan vue, axios y vuex (CRUD)
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex) //uso de vuex

// Funciones globales que seran llamados en las acciones
function setInStorage(key, obj) {
  localStorage.setItem(key, JSON.stringify(obj)) //enviar producto al carrito
}
function getFromStorage(key) {
  return JSON.parse(localStorage.getItem(key)) //mostrar items carrito
}
function getCartTotal(productsList) { //obtener total (cuando en la card se va sumando o restando los productos)
  let price = 0.0
  productsList.forEach(p => {
    price += p.data.price * p.qty
  })
  return price
}
function newCart() { //Limpia el carrito
  return {
    list: [],
    total: 0.0,
  }
}

export default new Vuex.Store({
  // Estados: son la fuente de datos de los componentes
  state: {
    products: [],
    loading: false,
    // User
    currentUser: getFromStorage('user') || undefined,
    // Cart
    shoppingCart: getFromStorage('cart') || newCart(),
    showCart: false,
    edit: false,
    load: false
  },
  // Mutations: son funciones que, básicamente, modifican estados. (Cumple una función igual a los methods)
  mutations: {
    // Si va agregando productos, se debe ir renderizando la vista con los productos que se agregan o que se quitan
    LOADING_PRODUCTS(state) {
      state.loading = !state.loading
    },
    // Va agregando o quitando productos según el quantity
    GET_PRODUCTS(state, products) {
      state.products = []
      products.forEach((prod) => {
        prod['qty'] = 1
        state.products.push(prod)
      })
      state.loading = false
    },
    // Metación que ve el overlay de la página
    SET_LOADING(state) { state.load = true },
    UNSET_LOADING(state) { state.load = false },
    // User
    UPDATE_CURR_USER(state, user) {
      state.currentUser = user
      setInStorage('user', user)
    },
    // Cart
    // agrega productos al carro
    ADD_TO_CART(state, product) {
      // add def qty if not defined
      if (product.qty === undefined ) { product['qty'] = 1 }
      // increase qty if exists, else add to cart as new
      let pidx = state.shoppingCart.list.map(p => p.id).indexOf(product.id)
      if (pidx >= 0) {
        state.shoppingCart.list[pidx].qty++
      } else {
        state.shoppingCart.list.push(product)
      }
      // update total price
      state.shoppingCart.total = getCartTotal(state.shoppingCart.list)
      // update in storage
      setInStorage('cart', state.shoppingCart)
    },
    // Remueve productos del carro
    REMOVE_FROM_CART(state, product_id) {
      let pidx = state.shoppingCart.list.map(p => p.id).indexOf(product_id)
      if (pidx >= 0) {
        state.shoppingCart.list.splice(pidx, 1)
        // update total price
        state.shoppingCart.total = getCartTotal(state.shoppingCart.list)
        // update in storage
        setInStorage('cart', state.shoppingCart)
      } else {
        throw new Error("Product not found in cart")
      }
    },
    // Limpia el carrito
    CLEAR_CART(state) {
      state.shoppingCart = newCart()
      // update in storage
      setInStorage('cart', state.shoppingCart)
    },
    // Evento que permite agregar productos al carrito
    UPDATE_SHOW_CART(state, value) {
      state.showCart = value
    },
    // Permite editar
    UPDATE_EDIT(state) {
      state.edit = !state.edit
    }
  },
  // Actions: son como las mutations, pero se diferencian en que éstas se encargan de realizar operaciones asíncronas.
  actions: {
    /*Una Promise (promesa en castellano) es un objeto que representa la terminación o el fracaso de una operación asíncrona.
    Generalmente se caracteriza por tener un resolve que muestra el resultado de la conexión a la API, y un reject que muentra
    un resultado fallido (No poder conectarse con la API). El try muestra el resolve (si tiene conexión con la API, que
    renderice la información). En cambio el catch muestra el reject (si no logra conectar con la API, muestre un error)*/

    // User
    updateUser ({commit}, user) {
      return new Promise((resolve, reject) => {
        try{ 
          commit('UPDATE_CURR_USER', user)
          resolve(user)
        } catch(e) { reject(e) }
      })
    },
    // Acción para agregar al carrito
    addToCart ({commit}, product) {
      return new Promise((resolve, reject) => {
        try {
          commit('ADD_TO_CART', product)
          resolve(true)
        } catch(e) { reject(e) }
      })
    },
    // Acción para remover productos del carrito
    removeFromCart ({commit}, product_id) {
      return new Promise((resolve, reject) => {
        try {
          commit('REMOVE_FROM_CART', product_id)
          resolve(true)
        } catch(e) { reject(e) }
      })
    },
    // Acción para limpiar productos del carrito
    clearCart ({commit}) {
      return new Promise((resolve, reject) => {
        try {
          commit('CLEAR_CART')
          resolve(true)
        } catch(e) { reject(e) }
      })
    },
    // Acción que agrega productos al carrito con sus valores segun corresponda
    updateShowCart({commit}, val) {
      console.log('setting showCart to ', val)
      return new Promise((resolve, reject) => {
        try {
          commit('UPDATE_SHOW_CART', !!val) // !! double-negation for Boolen casting
          resolve(true)
        } catch(e) { reject(e) }
      })
    },
    // Acción que permite mostrar los productos y genera el overlay mientras recarga la vista
    getProducts({commit}) {
      commit('SET_LOADING')
      commit('LOADING_PRODUCTS')
      axios.get('https://us-central1-tddg3-b2b86.cloudfunctions.net/products/products', 
      { headers: { "Content-type": "text/plain"}}).then((accept) => {
        let data = accept.data;
        commit('GET_PRODUCTS', data)
      }).finally(() => {
        commit('UNSET_LOADING')
      }) 
    },
    updateEdit({commit}) {
      commit('UPDATE_EDIT')
    }
  },
  /*Getters: al igual que los estados, los getters son fuente de datos, pero procesados. Es decir, 
  datos modificados para entregarse en un formato deseado.*/
  getters: {
    // User (Si el usuario se conecta, logra entrar a otras opciones que un usuario corriente no)
    isLoggedIn: state => !!state.currentUser,
    currentUser: state => state.currentUser,
    // Cart
    shoppingCart: state => state.shoppingCart,
    showCart: state => state.showCart,
  }
})

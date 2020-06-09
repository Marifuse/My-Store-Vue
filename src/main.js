import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Firebase from 'firebase';
import firebaseConfig from '@/firebase';

Firebase.initializeApp(firebaseConfig);

Vue.config.productionTip = false

// Main Styles
import './assets/scss/main.scss'

// Material Icons
// import 'material-icons/iconfont/material-icons.css'
// import '@mdi/font/css/materialdesignicons.css'

let app = ''
Firebase.auth().onAuthStateChanged(() => {
  if(!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')    
  }
})

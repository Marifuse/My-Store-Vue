// Para que Vue Router funcione, se debe inportar los componentes a utilizar (Tambien se pueden importar vistas principales)
import Vue from 'vue'
import Router from 'vue-router'
import Firebase from 'firebase'
import Home from './views/Home.vue'
import Create from './components/Create.vue'

Vue.use(Router) //(Uso de Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  // En esta parte de definen las rutas a usar (pueden contener vistas Lazy)
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/about', // Paht es la partición que redirecciona a una vista
      name: 'about', // el nombre de la vista
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue') // Componente Lazy que se llama sólo si se necesita
    },
    {
      path: '/home',
      name: 'home',
      component: Home, // El component llama al componente importado
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ './views/Login.vue')
    },
    {
      path: '/create',
      name: 'Create',
      component: Create,
      meta: {
        requireLogin: true // El meta tiene relación con la función guardia (se representa con una respuesta booleana)
      }
    },
    {
      path: '*', // Este tipo de path con asterisco se usa para generar un not found o error 404
      name: 'NotFound',
      component: () => import(/* webpackChunkName: "not found" */ './views/NotFound')
    }
  ]
}) //Tambien las rutas pueden contener hijos contenidos en las vistas para cargar componentes (vistas normales o lazy)

/* Guard que pide autenticación para entrar a lugares que no son públicos. Si no se está logeado, no tiene acceso a
los sitios con privilegios de administrador o usuario */
router.beforeEach((to, from, next) => {
    let user = Firebase.auth().currentUser;
    let authRequired = to.matched.some(route => route.meta.requireLogin)
    if(!user && authRequired) {
      next('home') 
    } else {
      next()
    }
})

export default router;

import Vue from 'vue'
import Router from 'vue-router'
import Firebase from 'firebase'
import Home from './views/Home.vue'
import Create from './components/Create.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/about',
      name: 'about',
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
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
        requireLogin: true
      }
    },
    {
      path: '*',
      name: 'NotFound',
      component: () => import(/* webpackChunkName: "not found" */ './views/NotFound')
    }
  ]
})

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

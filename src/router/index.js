import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from 'firebase/app'

Vue.use(VueRouter)

const routes = [
  {
    path: '/register',
    name: 'Register',
    meta: {layout: 'empty'},
    component: () => import('../views/Register')
  },
  {
    path: '/login',
    name: 'Login',
    meta: {layout: 'empty'},
    component: () => import('../views/Login')
  },
  {
    path: '/',
    name: 'Home',
    meta: {layout: 'main', auth: true},
    component: () => import('../views/Home')
  },
  {
    path: '/categories',
    name: 'Categories',
    meta: {layout: 'main', auth: true},
    component: () => import('../views/Categories')
  },
  {
    path: '/history',
    name: 'History',
    meta: {layout: 'main', auth: true},
    component: () => import('../views/History')
  },
  {
    path: '/note',
    name: 'Note',
    meta: {layout: 'main', auth: true},
    component: () => import('../views/Note')
  },
  {
    path: '/detail/:id',
    name: 'Detail',
    meta: {layout: 'main', auth: true},
    component: () => import('../views/Detail')
  },
  {
    path: '/planning',
    name: 'Planning',
    meta: {layout: 'main', auth: true},
    component: () => import('../views/Planning')
  },
  {
    path: '/profile',
    name: 'Profile',
    meta: {layout: 'main', auth: true},
    component: () => import('../views/Profile')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser
  const requireAuth = to.matched.some(note => note.meta.auth)
  if (requireAuth && !currentUser) {
    next('/login?message=login')
  } else {
    next()
  }
})

export default router

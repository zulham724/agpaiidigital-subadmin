import Vue from 'vue'
import store from "./../store";
import VueRouter from 'vue-router'
import multiguard from 'vue-router-multiguard';

//import Home from '../views/Home.vue'

Vue.use(VueRouter)


// cek auth apakah sudah login atau belum
const auth = function(to, from, next) {
  let isLoggedIn = store.getters["Auth/isLoggedIn"];
  //alert(isLoggedIn)
  if (isLoggedIn) {
      next();
  } else {
      next("/login");
  }
};

const routes = [
  {
    path: '/',
    name: 'Main',
    beforeEnter: multiguard([auth]),
    component: () => import('../components/MainLayout.vue'),
    children:[
      {
        path:'',
        name:'Home',
        component:() => import('../components/Home.vue')
      },
      {
        path:'/test',
        name:'test',
        component:() => import('../components/HelloWorld.vue')
      }
    ]
    // children:[
    //   path: '',
    //   name: 'Home',
    //   beforeEnter: multiguard([auth]),
    //   component: () => import('../components/MainLayout.vue'),
    // ]
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  }
]

const router = new VueRouter({
  //mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

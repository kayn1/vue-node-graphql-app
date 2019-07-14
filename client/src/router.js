import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/Home.vue'
import AddPost from './components/posts/AddPost'
import Posts from './components/posts/Posts'
import SignIn from './components/auth/SignIn'
import SignUp from './components/auth/SignUp'
import Profile  from './components/auth/Profile'

import AuthGuard from './AuthGuard'


Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/signin',
      name: 'SignIn',
      component: SignIn
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      beforeEnter: AuthGuard
    },
    {
      path: '/posts',
      name: 'Posts',
      component: Posts
    },
    {
      path: '/add_post',
      name: 'AddPost',
      component: AddPost
    }
  ]
})

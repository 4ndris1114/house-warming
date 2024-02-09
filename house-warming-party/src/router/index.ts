import { createRouter, createWebHistory } from 'vue-router'
import Signup from '../views/Signup.vue'
import PasswordGame from '@/views/PasswordGame.vue'
import HomeView from "@/views/HomeView.vue"
import Playlist from '@/views/Playlist.vue'
import PageNotFound from '@/views/PageNotFound.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup
    },
    {
      path: '/password-game',
      name: 'passwordgame',
      component: PasswordGame
    },
    {
      path: '/playlist',
      name: 'playlist',
      component: Playlist
    },
    {
      path: '/:pathMatch(.*)*', 
      name: 'pagenotfound',
      component: PageNotFound,
    },
  ]
})

export default router

import { createRouter, createWebHistory } from 'vue-router'
import Signup from '../views/Signup.vue'
import PasswordGame from '@/views/PasswordGame.vue'
import Playlist from '@/views/Playlist.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/signup',
      name: 'signup',
      component: Signup
    },
    {
      path: '/password-game',
      name: 'passwordGame',
      component: PasswordGame
    },
    {
      path: '/playlist',
      name: 'playlist',
      component: Playlist
    },
  ]
})

export default router

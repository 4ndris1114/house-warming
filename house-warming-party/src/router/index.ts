import { createRouter, createWebHistory } from 'vue-router';
import Signup from '../views/Signup.vue';
import PasswordGame from '@/views/PasswordGame.vue';
import HomeView from "@/views/HomeView.vue";
import Playlist from '@/views/Playlist.vue';
import PageNotFound from '@/views/PageNotFound.vue';
import Login from "@/views/Login.vue";
import LoginSignup from "@/views/LoginSignup.vue";
import {useGuestsStore} from "@/stores/guestsStore";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login-signup',
      name: 'login-signup',
      component: LoginSignup
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup
    },
    {
      path: '/login',
      name: 'login',
      component: Login
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
});

router.beforeEach(async (to, from, next) => {

  const guestsStore = useGuestsStore();
  await guestsStore.$state.loaded;

  console.log("Logged in as: ", guestsStore.loggedInGuest);
  
  if (guestsStore.loggedInGuest !== null && guestsStore.loggedInGuest !== undefined) {
    next();
  } else {
    // If the user is not logged in and the requested route is NOT the login/signup route,
    // redirect to the login/signup route to prevent infinite redirection loop
    if (to.path !== '/login-signup') {
      next('/login-signup');
    } else {
      // If the requested route is already the login/signup route, allow navigation
      next();
    }
  }
});

export default router

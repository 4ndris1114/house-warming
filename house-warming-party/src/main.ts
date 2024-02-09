import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { useGuestsStore } from './stores/guestsStore'

const app = createApp(App)

app.use(createPinia())
app.use(router)

const store = useGuestsStore();
const loggedInUserString = localStorage.getItem('loggedInUser');
if (loggedInUserString !== null) {
    const loggedInUser = JSON.parse(loggedInUserString);
    store.setLoggedInGuest(loggedInUser);
}

app.mount('#app')

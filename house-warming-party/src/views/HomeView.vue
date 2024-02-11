<template>
  <div>
    <div v-if="isDefaultRoute" class="countdown-frame">
      <!-- Login Panel -->
      <div class="countdown">
        <h1>Countdown Timer</h1>
        <p v-if="remainingTime > 0" style="color: white;">Time Remaining: {{ remainingTimeString }}</p>
        <p v-else>The countdown has ended!</p>
      </div>
      <div class="menu">
        <RouterLink to="/guest-list" class="cool-button">Guest list</RouterLink>
        <router-link to="/information" class="cool-button">Information</router-link>
        <router-link to="/requirements" class="cool-button">Requirements</router-link>
        <router-link to="/playlist" class="cool-button">Playlist</router-link>
        <router-link to="/password-game" class="cool-button">Change password</router-link>
        <!-- <router-link to="/your-information" class="cool-button">Your information</router-link> -->
      </div>
    </div>   
    <div class="loginPanel">
      <div v-if="loggedInUser" class="logged-in-info">
        Logged in as: {{ loggedInUser.email }}
      </div>
      <button v-if="loggedInUser" @click="logout" class="logout-button">Log out</button>
    </div>
  </div>
  <img src="@/assets/kvetináč.png" alt="Small Picture" class="small-picture">
  <router-view />

</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed } from 'vue';
import { RouterLink, RouterView, useRoute } from 'vue-router';
import { useGuestsStore } from '../stores/guestsStore';

//-----------login--------------
const guestsStore = useGuestsStore();

const loggedInUser = guestsStore.loggedInGuest;

const logout = () => {
  // Call the logout action in the auth store
  guestsStore.logout();
  window.location.href = "/login";
};

//-----------countdown-----------

const endDateTime = new Date('2024-02-17T16:00:00').getTime(); // End date and time in milliseconds
const remainingTime = ref(0);
let timer: ReturnType<typeof setInterval> | null = null;

const calculateRemainingTime = () => {
  const currentTime = new Date().getTime(); // Current time in milliseconds
  remainingTime.value = Math.max(Math.floor((endDateTime - currentTime) / 1000), 0); // Calculate remaining time in seconds
};

const startCountdown = () => {
  timer = setInterval(() => {
    if (remainingTime.value > 0) {
      remainingTime.value--;
    } else {
      clearInterval(timer!);
    }
  }, 1000);
};

onMounted(() => {
  calculateRemainingTime();
  startCountdown();
});

onBeforeUnmount(() => {
  if (timer) clearInterval(timer);
});

const route = useRoute();
const isDefaultRoute = computed(() => route.path === '/');

const remainingTimeString = computed(() => {
  const days = Math.floor(remainingTime.value / (60 * 60 * 24));
  const hours = Math.floor((remainingTime.value % (60 * 60 * 24)) / (60 * 60));
  const minutes = Math.floor((remainingTime.value % (60 * 60)) / 60);
  const seconds = remainingTime.value % 60;
  return `${days} days ${hours} hours ${minutes} minutes ${seconds} seconds`;
});
</script>

<style scoped>
.countdown-frame {
  padding: 1vw;
  background-color: #004b6b;
  border: 1.25rem solid #BE3455;
  border-radius: 2rem;
  margin-top: 20px;
  text-align: center;
  position: relative; /* Ensure relative positioning for the absolute positioned child */
}

.countdown {
  margin-bottom: 2vw;
}

.menu {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.menu a {
  margin: 1vw; /* Use 1vw for margin */
  padding: 1vw 2vw; /* Use 1vw for vertical padding and 2vw for horizontal padding */
  /* Adjust button padding */
  font-size: 1.5vw; /* Use 1.5vw for font size */
  font-weight: 800;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  border: 0.25vw solid #BE3455;
  color: #BE3455;
  background-color: #ffffff;
  border-radius: 5vw;
  width:15vw;
  transition: background-color 0.3s, color 0.3s, border-color 0.3s;
}

.menu a:hover {
  background-color: #BE3455;
  color: white;
}

/* LOGIN INFO */
.loginPanel {
  margin-top: -2.25rem;
  padding: 0.3rem;
  background-color: #ffffff;
  border-top: 0.5rem solid #BE3455;
  border-bottom: 1.25rem solid #BE3455;
  border-left: 1.25rem solid #BE3455;
  border-right: 1.25rem solid #BE3455;
  border-bottom-left-radius: 2rem;
  border-bottom-right-radius: 2rem;
  text-align: center;
}

.logged-in-info {
  margin-top: 0.8rem;
  font-size: 0.8rem;
  margin-bottom: 0.2rem;
}

.logout-button {
  margin-top: 0.2rem;
  margin-bottom: 0.5rem;
  padding: 0.4rem 0.8rem;
  font-size: 0.7rem;
  font-weight: bold;
  text-transform: uppercase;
  background-color: #004b6b;
  color: #ffffff;
  border: none;
  border-radius: 1rem;
  cursor: pointer;
  transition: background-color 0.5s, color 0.5s;
}

.logout-button:hover {
  background-color: #ffffff;
  color: #BE3455;
}

.small-picture {
  width: 40vw;
  height: auto;
  position: fixed;
  left: -10vw;
  bottom: 4vw;
  z-index: 9999;
}
</style>

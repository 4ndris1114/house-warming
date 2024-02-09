<template>
  <header>
    <div v-if="isDefaultRoute" class="countdown-frame">
      <div class="countdown">
        <h1>Countdown Timer</h1>
        <p v-if="remainingTime > 0" style="color: white;">Time Remaining: {{ remainingTimeString }}</p>
        <p v-else>The countdown has ended!</p>
      </div>
    
      <div class="menu">
        <RouterLink to="/guest-list" class="cool-button">Guest list</RouterLink>
        <router-link to="/requirements" class="cool-button">Requirements</router-link>
        <router-link to="/playlist" class="cool-button">Playlist</router-link>
        <router-link to="/password-game" class="cool-button">Change password</router-link>
        <router-link to="/map" class="cool-button">Address</router-link>
        <!-- <router-link to="/your-information" class="cool-button">Your information</router-link> -->
      </div>
    </div>
  </header>
  <router-view />
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed } from 'vue';
import { RouterLink, RouterView, useRoute } from 'vue-router';

const endDateTime = new Date('2024-02-17T17:00:00').getTime(); // End date and time in milliseconds
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
  border: 2vw solid #BE3455;
  border-radius: 5vw;
  text-align: center;
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
  width:10vw; /* Set width to auto */
  transition: background-color 0.3s, color 0.3s, border-color 0.3s;
}

.menu a:hover {
  background-color: #BE3455;
  color: white;
}

a.cool-button {
  font-weight: 900;
}
</style>

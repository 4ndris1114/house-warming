<template>
  <header>
    <div class="countdown" v-if="isDefaultRoute">
      <h1>Countdown Timer</h1>
      <p v-if="remainingTime > 0">Time Remaining: {{ remainingTimeString }}</p>
      <p v-else>The countdown has ended!</p>
    </div>
    <!-- <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav> -->
  </header>
  <RouterView />
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
.countdown {
  text-align: center;
  margin-top: 50px;
}
</style>

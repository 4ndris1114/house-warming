<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
<<<<<<< Updated upstream
      <!-- <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav> -->
=======
    <div v-if="isDefaultRoute" class="countdown-frame">
      <div class="countdown">
        <h1>Countdown Timer</h1>
        <p v-if="remainingTime > 0">Time Remaining: {{ remainingTimeString }}</p>
        <p v-else>The countdown has ended!</p>
      </div>
    </div>
    <div class="menu">
      <router-link to="/guest-list" class="cool-button">Guest list</router-link>
      <router-link to="/requirements" class="cool-button">Requirements</router-link>
      <router-link to="/playlist" class="cool-button">Playlist</router-link>
      <router-link to="/password-game" class="cool-button">Change password</router-link>
      <router-link to="/map" class="cool-button">Address</router-link>
    </div>
>>>>>>> Stashed changes
  </header>
  <router-view />
</template>

<style scoped>
<<<<<<< Updated upstream

=======
.countdown-frame {
  padding: 20px;
  background-color: #f0f0f0;
  border-radius: 5px;
  margin-top: 20px;
  text-align: center; /* Center the content horizontally */
}

.countdown {
  margin-bottom: 20px;
}

.menu {
  display: flex;
  flex-direction: column; /* Stack buttons vertically */
  align-items: center; /* Center the buttons horizontally */
}

.menu a {
  margin: 10px;
  padding: 12px 24px; /* Adjust button padding */
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  border: 2px solid #26BB98; /* Add black border */
  color: #26BB98;
  background-color: #ffffff;
  border-radius: 5px;
  transition: background-color 0.3s, color 0.3s, border-color 0.3s;
}

.menu a:hover {
  background-color: #26BB98;
  color: white;
  border-color: white;
}
>>>>>>> Stashed changes
</style>

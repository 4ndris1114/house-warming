<template>
    <div class="container">
      <h2 class="title">You've made it...and we're so proud of you!</h2>
      <h4 class="subtitle">You've conquered the password puzzle with style. Your digital dexterity is unmatched!</h4>

      <h4 class="thanks">Thank you for playing our little password game, we hope you didn't go crazy while fulfilling our stupid rules. 
        From now on, you can log in with this password. Sooooo...</h4>
      <p class="save-text">It might be a good idea to save it for later by</p>

      <button @click="downloadTextFile()" class="download-button">Clicking me!</button>
    </div>
</template>

<script setup lang="ts">
import { useGuestsStore } from "../stores/guestsStore";

const props = defineProps({
    password: {
        type: String,
        required: true
    }
})

const guestsStore = useGuestsStore();

const toBeUpdatedGuest = guestsStore.loggedInGuest;
toBeUpdatedGuest.password = props.password;
guestsStore.updateGuest(toBeUpdatedGuest);

const downloadTextFile = () => {
    const textContent = props.password;

    const blob = new Blob([textContent], { type: "text/plain" });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "super_safe_password_housewarmingesbjerg.txt";

    document.body.appendChild(link);
    link.click();

    URL.revokeObjectURL(url);
    document.body.removeChild(link);
}
</script>

<style>

.container {
  max-width: 40rem;
  margin: 0 auto;
  text-align: center;
  padding: 2.5rem;
}

.title {
    margin-top: -2.5rem;
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 1.5rem;
}

.subtitle {
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 30px;
}

.thanks {
  font-size: 1.1rem;
  color: #444;
  margin-bottom: 20px;
}

.save-text {
  font-size: 0.9rem;
  color: #888;
  margin-top: 5rem;
  margin-bottom: 0.5rem;
}

.download-button {
  padding: 12px 24px;
  font-size: 1rem;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.download-button:hover {
  background-color: #45a049;
}

</style>
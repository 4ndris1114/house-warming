<template>
    <div class="error-page">
        <h1 class="title">404 - Oops! Looks Like This Page is Still Unpacking!</h1>
        <img class="image" src="../assets/doormat.jpg">
        <p class="text">Oops! We Got Lost While Moving!</p>
        <p class="text">Looks like we took a wrong turn somewhere in the digital neighborhood and ended up at a party
            without a map! But fear not, we're on a mission to take you back to your objective: To warm up our house!</p>
        <button class="button" @click="navigateBack">Navigate Me Back to the Party!</button>
        <footer class="footer">Yeeeeehaw🎈🏠 
        <br>
            <div class="joke">Why did the scarecrow win an award? <br> 
            <p v-if="!showJoke" @click="revealJoke">Click here to find out</p>
            <p v-else>Because he was outstanding in his field! 🌾🏆</p>
            </div>
    </footer>
    </div>
</template>

<script setup lang="ts">
    import { ref } from "vue";

    const showJoke = ref(false);

    const revealJoke = () => {
        showJoke.value = true;
    }
    
    const navigateBack = () => {
        window.location.href = '/';
    }
</script>

<style scoped>
.error-page {
    text-align: center;
    padding: 50px;
}

.title {
    font-size: 36px;
    margin-bottom: 20px;
}

.image {
    max-width: 100%;
    margin-bottom: 20px;
}

.text {
    font-size: 18px;
    margin-bottom: 20px;
}
.button {
  display: inline-block;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  border: 2px solid #26BB98;
  color: #26BB98;
  background-color: #ffffff;
  border-radius: 5px;
  transition: background-color 0.3s, color 0.3s, border-color 0.3s;
}

.button:hover {
  background-color: #26BB98;
  color: #ffffff;
  border-color: #ffffff;
}

.footer {
    font-size: 14px;
    margin-top: 20px;
}</style>

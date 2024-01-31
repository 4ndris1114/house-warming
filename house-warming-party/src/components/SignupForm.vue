<template>
    <div class="signup-form">
        <h2>Sign Up</h2>
        <div>
            <input v-model="newGuest.name" type="text" name="name" placeholder="Your Name" required>
            <input v-model="newGuest.email" type="email" name="email" placeholder="Your Email" required>
            <input v-model="newGuest.isSleepingHere" type="checkbox" name="isSleepingHere"> I would like to sleep there!
            <button @click="registerGuest()">Sign Up</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useGuestStore } from '@/stores/guestStore';
import { ref } from 'vue';

const guestStore = useGuestStore();

const newGuest = { name: '', email: '', isSleepingHere: false };
const name = ref("");

const registerGuest = () => {
    console.log("Calling GuestStore to add guest: ", newGuest);
    //ADD VALIDATION
    guestStore.addGuest(newGuest);
}
</script>

<style>
body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f4f4f4;
}

.signup-form {
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    padding: 20px;
    width: 300px;
}

.signup-form h2 {
    margin-bottom: 20px;
    text-align: center;
}

.signup-form input[type="text"],
.signup-form input[type="email"],
.signup-form input[type="password"] {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
}

.signup-form button {
    width: 100%;
    padding: 10px;
    border: none;
    border-radius: 4px;
    background-color: #007bff;
    color: #fff;
    cursor: pointer;
}

.signup-form button:hover {
    background-color: #0056b3;
}
</style>
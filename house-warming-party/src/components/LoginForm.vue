<template>
    <div class="login-form">
        <h2>Login</h2>
        <div class="form-group">
            <label for="email">Email:</label>
            <input v-model="guest.email" type="email" id="email" name="email" placeholder="Your Email" required>
        </div>
        <div class="form-group">
            <label for="password">Password:</label>
            <input v-model="guest.password" type="password" id="password" name="password" placeholder="Your Password" required>
        </div>
        <div class="button-container">
            <button @click="login" class="cool-button">Login</button>
            <div v-if="loginAttempted && !isLoginValid" class="error-message">Invalid email or password</div>
        </div>

    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import {useGuestsStore} from '@/stores/guestsStore';
import type { Guest } from '@/types/Guest';

onMounted(() => {
    guestsStore.fetchGuests();
});

const guestsStore = useGuestsStore();

const guest = ref({ email: '', password: ''});
const loggedInGuest = ref(null);

const loginAttempted = ref(false);

const guestList = computed(() => {
    return guestsStore.guests;
});

const isLoginValid = () => {
    let isValid = false;
    guestList.value.forEach((guestFromList: any) => {
        if (guestFromList.email === guest.value.email && guestFromList.password === guest.value.password) {
            loggedInGuest.value = guestFromList;
            isValid = true;
        }
    });
    
    return isValid;
}

const login = async () => {
    loginAttempted.value = true;
    if (isLoginValid()) {
        console.log('Login successful');
        await guestsStore.setLoggedInGuest(loggedInGuest.value);
        console.log('Logged in user:', guestsStore.loggedInGuest);
        if (loggedInGuest.value !== null && (loggedInGuest.value as Guest).password === "banana") {
            if (confirm("You are now logged in...Although, your password isn't too secure, right?\nMight be a good idea to change it?")) {
                window.alert("Wise choice...Go ahead and do it!😇");
                window.location.href = "/";
            } else {
                window.alert("So you have chosen to resist😡 Try again!");
                guestsStore.logout();
                window.location.href = "/login";
            }
        } else {
            window.location.href = "/";
        }
        
    } else {
        console.log('Login failed');
    }
}
</script>

<style>
body {
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

.login-form {
    background-color: #fff;
    border-radius: 0.5rem;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    padding: 1.25rem;
    width: 20rem;
}

.login-form h2 {
    margin-bottom: 1.25rem;
    text-align: center;
}

.form-group {
    margin-bottom: 10px;
}

label {
    display: block;
}

input[type="email"],
input[type="password"] {
    width: 100%;
    padding: 0.9rem;
    margin-top: 0.5rem;
    border: 0.0625rem  solid #ccc; /* 1px */
    border-radius: 0.5rem;
    box-sizing: border-box;
}

.button-container {
    display: flex;
    justify-content: center;
}

.error-message {
    color: red;
    font-size: 0.8rem;
    margin-top: 0.5rem;
}
</style>
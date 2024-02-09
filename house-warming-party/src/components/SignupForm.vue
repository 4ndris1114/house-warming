<template>
    <div class="signup-form">
        <h2>Sign Up</h2>
        <div>
            <input v-model="newGuest.name" type="text" name="name" placeholder="Your Name" required
                :class="{ 'invalid': !isNameValid && registerAttempted }">
            <span v-if="!isNameValid && registerAttempted" class="error-message">Invalid name!</span>

            <input v-model="newGuest.email" type="email" name="email" placeholder="Your Email" required
                :class="{ 'invalid': !isEmailValid && registerAttempted }">
            <span v-if="!isEmailValid && registerAttempted" class="error-message">Please enter a valid email address!</span>

            <div class="checkbox-container">

                <div class="custom-checkbox" :class="{ 'checked': newGuest.isSleepingHere }"
                    @click="newGuest.isSleepingHere = !newGuest.isSleepingHere">
                </div>

                <label for="isSleepingHere" class="checkbox-label">I would like to sleep there!</label>
            </div>

            <button @click="registerGuest">Register</button>
        </div>
    </div>
</template> 

<script setup lang="ts">
import { useGuestsStore } from '@/stores/guestsStore';
import { computed, ref } from 'vue';

const guestsStore = useGuestsStore();

const newGuest = ref({ name: '', email: '', isSleepingHere: false });
const isNameValid = computed(() => {
    return newGuest.value.name.trim() !== '' && newGuest.value.name.trim().length > 5;
})
const isEmailValid = computed(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(newGuest.value.email);
})
const registerAttempted = ref(false);

const registerGuest = () => {
    registerAttempted.value = true;
    
    if (isNameValid.value && isEmailValid.value) {
        console.log("Calling GuestStore to add guest: ", newGuest);
        guestsStore.addGuest(newGuest.value);
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
.signup-form input[type="email"]{
    width: 100%;
    padding: 0.9rem;
    margin-bottom: 0.9rem;
    border: 0.0625rem  solid #ccc; /* 1px */
    border-radius: 0.5rem;
    box-sizing: border-box;
}

.error-message-name {
    margin-bottom: 10rem;
}

.signup-form button {
    width: 100%;
    padding: 0.9rem;
    border: none;
    border-radius: 0.5rem;
    background-color: #007bff;
    color: #fff;
    cursor: pointer;
    font-weight: bolder;
}

.signup-form button:hover {
    background-color: #0056b3;
}

.error-message {
    color: red;
    font-size: 0.8rem;
    margin-top: -0.5rem;
    display: block;
    margin-bottom: 0.5rem;
}

.signup-form input .invalid {
    border: 0.0625rem solid red;
  }

/* checkbox */
  .checkbox-container {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
  }

  .custom-checkbox {
    width: 1.2rem;
    height: 1.2rem;
    border: 0.0625rem solid #000; /* 1 px */
    border-radius: 3px;
    margin-right: 0.5rem;
    cursor: pointer;
    display: inline-block;
    position: relative;
  }

  .custom-checkbox.checked:before {
    content: '\2713';
    font-size: 1rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .checkbox-label {
    font-size: 1rem;
    color: #000;
    cursor: pointer;
  }
</style>
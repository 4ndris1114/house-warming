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
            <label class="animalSelect" for="animalSelect">Select an animal you fancy the most!</label>
            <select class="animalSelect" v-model="selectedAnimal" required>
                <option disabled value="">Please select an animal</option>
                <option v-for="animal in animals" :key="animal">{{ animal }}</option>
            </select>
            <div class="button-container">
                <button @click="registerGuest" class="cool-button">Register</button>
                <div v-if="registerAttempted && !isEmailUnique && isEmailValid && isNameValid && selectedAnimal !== ''" class="error-message">You are already registered! <a href="/login">Go to login</a></div>
            </div>
        </div>
    </div>
</template> 

<script setup lang="ts">
import { useGuestsStore } from '@/stores/guestsStore';
import { computed, onMounted, ref } from 'vue';

onMounted(() => {
    guestsStore.fetchGuests();
});

const guestsStore = useGuestsStore();
const guestList = computed(() => {
    return guestsStore.guests;
});

const newGuest = ref({ name: '', email: '', isSleepingHere: false, animalRef: '' });
const isNameValid = computed(() => {
    return newGuest.value.name.trim() !== '' && newGuest.value.name.trim().length > 5;
});
const isEmailValid = computed(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(newGuest.value.email);
});
const isEmailUnique = computed(() => {
    return !guestList.value.some(guest => guest.email === newGuest.value.email);
});
const registerAttempted = ref(false);

const selectedAnimal = ref('');
const animals: string[] = [
    'Alpaca', 'Cat', 'Chimpanzee', 'Deer', 'Dog',
    'Eagle', 'Elephant', 'Flamingo', 'Giraffe',
    'Goat', 'Hen', 'Horse', 'Lion', 'Owl', 'Parrot',
    'Rabbit', 'Rhinoceros', 'Squirrel', 'Tiger'
];

const getAnimalImageUrl = (animal: string) => {
    return `./assets/animals/${animal.toLowerCase()}.jpg`;
}

const registerGuest = () => {
    registerAttempted.value = true;
    console.log(newGuest.value);
    
    if (isNameValid.value && isEmailValid.value) {
        if (!isEmailUnique.value){
            return;
        }
        if (selectedAnimal.value !== ''){
            newGuest.value.animalRef = getAnimalImageUrl(selectedAnimal.value);
        }

        console.log("Calling GuestStore to add guest: ", newGuest);
        guestsStore.addGuest(newGuest.value);
        window.alert("You're now registered!\nYour initial password is: banana");
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
    border-radius: 0.5rem;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    padding: 1.25rem;
    width: 20rem;
}

.signup-form h2 {
    margin-bottom: 1.25rem;
    text-align: center;
}

.signup-form input[type="text"],
.signup-form input[type="email"]{
    width: 100%;
    padding: 0.9rem;
    margin-top: 0.5rem;
    border: 0.0625rem  solid #ccc; /* 1px */
    border-radius: 0.5rem;
    box-sizing: border-box;
}

.error-message {
    color: red;
    font-size: 0.8rem;
    display: block;
    margin-top: 2rem;
}

.signup-form input .invalid {
    border: 0.0625rem solid red;
}

.button-container {
    display: flex;
    justify-content: center;
}

.animalSelect {
    margin-top: 0.5rem;
}

.cool-button {
    margin-top: 1rem;
}

/* checkbox */
  .checkbox-container {
    display: flex;
    align-items: center;
    margin-top: 1rem;
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
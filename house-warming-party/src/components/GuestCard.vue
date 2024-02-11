<template>
    <div :key="props.guest.uid" class="card">
        <div v-if="props.guest.email === loggedInGuest.email" class="dropdown-container">
            Change picture: 
            <select v-model="selectedAnimal" @change="changePicture()">
                <option v-for="(picture, index) in animals" :key="index" :value="picture">
                  {{ picture }}
                </option>
              </select>
        </div>
        <img :src="imageSrc" alt="Guest Picture" class="guest-picture">
        <div class="guest-info">
          <div v-if="props.guest.password !== 'banana'" class="guest-details">
            <h3>{{ props.guest.name }}🔓</h3>
            <p >Completed the password game!</p>
          </div>
          <div v-else>
            <h3>{{ props.guest.name }}🔒</h3>
          </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Guest } from '@/types/Guest';
import { defineProps, onMounted, ref, watch } from 'vue';
import { useGuestsStore } from '../stores/guestsStore';
import { animals, getAnimalImageUrl } from "@/lists/TheList";

const guestsStore = useGuestsStore();
const loggedInGuest = guestsStore.loggedInGuest;

const props = defineProps({
    guest: {
        type: Guest,
        required: true,
    }
});

const selectedAnimal = ref('');
const imageSrc = ref('');

onMounted(async () => {
    try {
        imageSrc.value = props.guest.animalRef;
    } catch (error) {
        console.error('Error loading image:', error);
    }
});


watch(selectedAnimal, async (newValue, oldValue) => {
    if (newValue !== oldValue) {
        try {
            if (selectedAnimal.value !== ''){
                imageSrc.value = getAnimalImageUrl(selectedAnimal.value);
                console.log(imageSrc.value);
                
            }
        } catch (error) {
            console.error('Error loading image:', error);
        }
    }
});

const updatePicture = async () => {
    // Logic to update the picture source
    if (selectedAnimal.value !== '') {
        imageSrc.value = getAnimalImageUrl(selectedAnimal.value);
    }
}

const changePicture = () => {
    const toBeUpdatedGuest: Guest = guestsStore.loggedInGuest;
    toBeUpdatedGuest.animalRef = getAnimalImageUrl(selectedAnimal.value);
    guestsStore.updateGuest(toBeUpdatedGuest as Guest);
    updatePicture();
}
</script>

<style scoped>
.card {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1.25rem;
    border: 0.0625rem solid #ccc;
    border-radius: 0.5rem;
    box-shadow: 0 0.12rem 0.25rem rgba(0, 0, 0, 0.1);
    width: 15rem;
}

.dropdown-container {
  position: absolute;
  top: 0;
  right: 0;
  padding: 0.2rem;
}

.guest-picture {
    width: 15rem;
    height: 20rem;
    max-width: 15rem;
    object-fit: cover;
    border-radius: 50%;
    margin-bottom: 0.6rem;
}

.guest-info {
  display: flex;
  align-items: center;
}

.guest-details {
  flex: 1;
}
</style>
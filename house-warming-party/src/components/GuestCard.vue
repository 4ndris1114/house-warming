<template>
    <div :key="props.guest.uid" class="card">
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
import { defineProps, onMounted, ref } from 'vue';

const props = defineProps({
    guest: {
        type: Guest,
        required: true,
    }
});

const imageSrc = ref('');

onMounted(async () => {
    try {
        const { default: image } = await import(/* @vite-ignore */ props.guest.animalRef); 
        imageSrc.value = image;
    } catch (error) {
        console.error('Error loading image:', error);
    }
});

</script>

<style scoped>
.card {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1.25rem;
    border: 0.0625rem solid #ccc;
    border-radius: 0.5rem;
    box-shadow: 0 0.12rem 0.25rem rgba(0, 0, 0, 0.1);
    width: 15rem;
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
<template>
    <div class="card-container">
        <div v-if="guests.length === 0" class="no-guests-message">No guests available.</div>
        <div class="cards-wrapper" v-else>
            <GuestCard v-for="guest in guests" :key="guest.uid" :guest="guest" class="card"></GuestCard>
        </div>
    </div>
</template>

<script setup lang="ts">
import GuestCard from '../components/GuestCard.vue';
import { useGuestsStore } from "@/stores/guestsStore";  
import { computed, onMounted } from 'vue';

const guestsStore = useGuestsStore();
onMounted(() => {
    guestsStore.fetchGuests();
})

const guests = computed(() => {
    return guestsStore.guests;
});
</script>

<style scoped>
.card-container {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    padding-top: 10rem; /* Add padding to accommodate the first card */
    gap: 1.25rem;
}

.cards-wrapper {
    display: flex;
    flex-wrap: wrap;
}

.card {
    flex: 1 0 10rem;
    margin: 0.6rem;
}

/* Additional styles for mobile view */
@media (max-width: 910px) {
    .card-container {
        flex-direction: column;
        align-items: center;
        padding-top: 70rem;
    }

    .card {
        width: 100%;
        max-width: 20rem;
        margin-bottom: 1.25rem;
    }

    .card:not(:first-child) {
        margin-top: 1rem;
    }
}

.no-guests {
  font-style: italic;
  color: #888;
  width: 100%;
  text-align: center;
}
</style>
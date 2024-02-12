<template>
    <div class="card-container" :style="{ paddingTop: containerPadding }">
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

// Computed property to calculate the container padding
const containerPadding = computed(() => {
    const numGuests = guestsStore.guests.length;
    const basePadding = 15;
    const minPadding = 3;
    const maxPadding = 150;
    return `max(${minPadding}rem, min(${maxPadding}rem, ${basePadding * (numGuests/3)}rem))`;
});
</script>

<style scoped>
.card-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 3rem;
}

.cards-wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1.25rem;
}

.card {
    flex: 1 1 20rem;
    max-width: 20rem;
    margin: 0.6rem;
}

/* Additional styles for mobile view */
@media (max-width: 500px) {
    .card-wrapper {
        padding-top: 50rem;
        /* Adjust padding for smaller screens */
    }

    .card {
        flex: 1 1 calc(50% - 1.25rem);
        /* Display two cards per row on smaller screens */
    }
}

.no-guests-message {
    font-style: italic;
    color: #888;
    width: 100%;
    text-align: center;
}</style>
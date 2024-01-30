<script setup lang="ts">
import { useGuestStore } from '@/stores/guestStore';
import { computed, onMounted } from 'vue';

const guestStore = useGuestStore();


// Fetch guests after the component is mounted
onMounted(async () => {
  await guestStore.fetchGuests();
});
guestStore.fetchGuests();
const guests = computed(() => guestStore.guests || []);
console.log('From view:', guests.value);

</script>

<template>
  <main>
    <div v-if="guests.length > 0">
      <li v-for="guest in guests" :key="guest.uid">{{ guest.name }}</li>
    </div>
  </main>
</template>

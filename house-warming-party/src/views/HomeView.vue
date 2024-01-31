<script setup lang="ts">
import { useGuestStore } from '@/stores/guestStore';
import type { Guest } from '@/types/Guest';

import { type  ComputedRef, onMounted, computed } from 'vue';

import SignupForm from '@/components/SignupForm.vue';

const guestStore = useGuestStore();


// Fetch guests after the component is mounted
onMounted(async () => {
  await guestStore.fetchGuests();
});

const guests: ComputedRef<Guest[]> = computed(() => guestStore.guests || []);

</script>

<template>
  <main>
    <SignupForm />
    <div>
      <li v-for="guest in guests" :key="guest.uid">{{ guest.name }}</li>
    </div>
  </main>
</template>

<style>

</style>

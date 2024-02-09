<script setup lang="ts">
import { useGuestsStore } from '@/stores/guestsStore';
import type { Guest } from '@/types/Guest';

import { type  ComputedRef, onMounted, computed, ref } from 'vue';

import SignupForm from '@/components/SignupForm.vue';

const guestStore = useGuestsStore();


// Fetch guests after the component is mounted
onMounted(async () => {
  
});


</script>

<template>
  <main>
    <SignupForm />
  </main>
</template>


<style>

</style>

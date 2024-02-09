<script setup lang="ts">
import { useGuestsStore } from '@/stores/guestsStore';
import type { Guest } from '@/types/Guest';

import { onMounted } from 'vue';

import LoginForm from '@/components/LoginForm.vue';

const guestStore = useGuestsStore();


// Fetch guests after the component is mounted
onMounted(async () => {

});


</script>

<template>
    <main>
        <LoginForm />
    </main>
</template>


<style></style>

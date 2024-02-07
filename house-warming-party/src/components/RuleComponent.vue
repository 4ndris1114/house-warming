<template>
    <div>
        <p :class="{'fulfilled': rule.isFulfilled, 'notFulfilled': !rule.isFulfilled}">Rule {{ props.rule.index }}</p>
        <div class="condition">{{ props.rule.condition }}</div>
    </div>
</template>

<script setup lang="ts">
import { Rule } from '@/types/Rule';


const props = defineProps({
    rule: {
        type: Rule,
        required: true
    }
})
</script>

<style scoped>
div {
    display: flex;
    flex-direction: column;
    text-align: center;
    vertical-align: middle;
    border-style: solid;
    border-width: 0.01rem;
    border-radius: 0.5rem;
    height: 4rem;
}
.condition {
    width: 40rem;
    background-color: rgb(255, 255, 255);
    border-style: none;
    margin-top: -1rem;
    font-weight: 500;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-top-right-radius: 0rem;
    border-top-left-radius: 0rem;
}

.fulfilled {
    width: 40rem;
    margin-top: 0px;
    font-weight: bold;
    text-align: center;
    background-color: #27ae60;
    border-top-right-radius: 0.5rem;
    border-top-left-radius: 0.5rem;
}

.notFulfilled {
    width: 40rem;
    background-color: red;
    margin-top: 0px;
    font-weight: bold;
    text-align: center;
    border-top-right-radius: 0.5rem;
    border-top-left-radius: 0.5rem;
}

</style>
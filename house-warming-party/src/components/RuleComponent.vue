<template>
    <div>
        <p :class="{'fulfilled': rule.isFulfilled, 'notFulfilled': !rule.isFulfilled}">Rule {{ props.rule.index }}</p>
        {{ props.rule.condition }}
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

console.log(props.rule);


</script>

<style scoped>
div {
    display: flex;
    flex-direction: column;
    text-align: center;
    vertical-align: middle;
    border-style: ridge;
    margin-top: 0rem;
    height: 4rem;
}
p {
    width: 40rem;
    background-color: red;
    margin-top: 0px;
    font-weight: bold;
    text-align: center;
}

.fulfilled {
    background-color: green;
}

.notFulfilled {
    background-color: red;
}

</style>
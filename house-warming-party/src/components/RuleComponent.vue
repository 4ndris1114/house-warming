<template>
    <div>
        <p>Rule {{ props.ruleIndex }}</p>
        {{ props.message }}
    </div>
</template>

<script setup lang="ts">

const props = defineProps({
    message: String,
    ruleIndex: Number,
})

</script>

<style scoped>
div {
    border-style: ridge;
    margin-top: 0px;
}
p {
    background-color: red;
    margin-top: 0px;
    font-weight: bold;
    text-align: center;
}

</style>
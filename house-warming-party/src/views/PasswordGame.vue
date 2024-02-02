<template>
    <div>
        <div>
            <label>Choose a password</label>
            <input @input="checkOne()" @click="unlockFirst()" v-model="password" type="text">
            <hr>
        </div>
        <div v-for="rule in rules" :key="rule.uid">
            <RuleComponent v-if="rule.isUnlocked" :message="rule.condition" :ruleIndex="rule.index"></RuleComponent>
        </div>
    </div>
</template>

<script setup lang="ts">
import RuleComponent from "@/components/RuleComponent.vue"
import type Rule from '@/types/Rule.vue';
import {useRulesStore} from "@/stores/rulesStore"
import { computed, type ComputedRef, onMounted, ref } from 'vue';

    const rulesStore = useRulesStore();

    onMounted(() => {
        rulesStore.fetchRules();
    })

    const password = ref('');
    const rules: ComputedRef<Rule[]> = computed(() => {
        console.log(rules.value);
        return rulesStore.rules || []
    });

    const unlockFirst = () => {
        rules.value[0].isUnlocked = true;
    }

    const checkOne = () => {

        let ruleIndex = -1;
        rules.value.forEach((rule) => {
            if (rule.isUnlocked === true) {
                ruleIndex = rule.index;
            }
        });

        console.log('rule index: ',ruleIndex);
        const nextIndex = ruleIndex + 1;
        
        switch (ruleIndex) {
            case 1: 
                checkFirst();
                break;
            case 2:
                checkSecond();
                break;
            default: 
                break;
        }
    }

    const checkFirst = () => {
        const currentRule = rules.value[0];
        const nextRule = rules.value[1];
        
        if (password.value.length >= 7){
            currentRule.isFulfilled = true;
            console.log('Rule '+ currentRule.index+'`s fulfillment status: '+ currentRule.isFulfilled);
            //unlock next index
            nextRule.isUnlocked = true;
        }
    }

    const checkSecond = () => {
        const currentRule = rules.value[1];
        const nextRule = rules.value[2];
        
        if (/[A-Z]/.test(password.value)) {
            currentRule.isFulfilled = true;
            console.log('Rule ' + currentRule.index + '`s fulfillment status: ' + currentRule.isFulfilled);
            //unlock next index
            nextRule.isUnlocked = true;
        }
    }

</script>

<style>

</style>
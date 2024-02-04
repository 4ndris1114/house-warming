<template>
    <div>
        <div>
            <label>Choose a password</label>
            <input @input="checkPassword()" @click="unlockFirst()" v-model="password" type="text">
            <hr>
        </div>
        <div v-for="(rule, index) in rules" :key="rule.uid">
            <RuleComponent v-if="index === 0 && rule.isUnlocked" :rule="rules[0]"></RuleComponent>
            <RuleComponent v-else-if="rule.isUnlocked" :rule="rule"></RuleComponent>
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

    const slovakSpecialLettersRegex = /[áäčďéíĺľňóôŕšťúýžÁÄČĎÉÍĹĽŇÓÔŔŠŤÚÝŽ]/;
    const specialCharacterRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
    const hungarianAnthem = [
    "Isten,álddmegamagyart",
    "Jó kedvvel,bőséggel,",
    "Nyújtsfeléjevédőkart,",
    "Haküzdellenséggel;",
    "Balsorsakitrégentép,",
    "Hozzrávígesztendőt,",
    "Megbünhödtemárenép",
    "Amultatsjövendőt!"
    ];
    const ruleChecks = [
    (password: string) => password.length >= 7,
    (password: string) => /[A-Z]/.test(password),
    (password: string) => /\d/.test(password),
    (password: string) => specialCharacterRegex.test(password),
    (password: string) => slovakSpecialLettersRegex.test(password),
    (password: string) => hungarianAnthem.some(line => password.includes(line))
    ];


    const checkPassword = () => {
    rules.value.forEach((rule, index) => {
        if (rule.isUnlocked) {
            if (ruleChecks[index](password.value)) {
                console.log('Rule ' + (index + 1) + ' is satisfied!');
                rules.value[index].isFulfilled = true; // Set isFulfilled to true for conditional formatting
                unlockRule(index + 1); // Unlock the rule
            } else {
                for (let i = index; i < rules.value.length; i++) {
                    rules.value[i].isFulfilled = false;
                }
            }
        }
    });
}

    const unlockRule = (index) => {
        rules.value[index].isUnlocked = true;
    }
</script>

<style>

</style>
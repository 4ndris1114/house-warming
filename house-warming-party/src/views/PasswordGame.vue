<template>
    <div>
        <div>
            <label>Choose a password</label>
            <input @input="checkPassword()" @click="unlockFirst()" v-model="password" type="text">
            <hr>
        </div>
        <div v-if="newlyUnlockedRule" :key="newlyUnlockedRule.uid">
          <RuleComponent :rule="newlyUnlockedRule"></RuleComponent>
        </div>
        <div v-for="(rule, index) in unlocked" :key="rule.uid">
          <RuleComponent v-if="index !== 0 && rule.isUnlocked" :rule="rule"></RuleComponent>
        </div>
        <div v-for="(rule, index) in unlockedFulfilled" :key="rule.uid">
              <RuleComponent v-if="index !== 0 && rule.isUnlocked" :rule="rule"></RuleComponent>
        </div>
    </div>
</template>

<script setup lang="ts">
import RuleComponent from "@/components/RuleComponent.vue"
import type Rule from '@/types/Rule.vue';
import {useRulesStore} from "@/stores/rulesStore"
import { computed, type ComputedRef, onMounted, ref, type  Ref } from 'vue';

    const rulesStore = useRulesStore();

    onMounted(() => {
        rulesStore.fetchRules();
    })

    const password = ref('');
    const rules: ComputedRef<Rule[]> = computed(() => {
        console.log('Rules fetched in the component: ', rules.value);

        return rulesStore.rules || []
    });
    const unlocked: ComputedRef<Rule[]> = computed(() => {
        let dummy = rules.value.filter(rule => rule !== newlyUnlockedRule.value && !rule.isFulfilled);
        if (rules.value.length !== 0){
            dummy.push(rules.value[0]);
        }
        return dummy.reverse();
    });
    const unlockedFulfilled: ComputedRef<Rule[]> = computed(() => {
    let dummy = rules.value.filter(rule => rule !== newlyUnlockedRule.value && rule.isFulfilled);
    if (rules.value.length !== 0) {
        dummy.push(rules.value[0]);
    }
    return dummy.reverse();
});
    
    const newlyUnlockedRule: Rule = ref(null);

    const unlockFirst = () => {
        if (!rules.value[0].isUnlocked) { //is not unlocked already
            rules.value[0].isUnlocked = true;
            newlyUnlockedRule.value = rules.value[0];
        }
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
        const newlyUnlockedRuleValue = rules.value[index];
        newlyUnlockedRule.value = newlyUnlockedRuleValue;
        newlyUnlockedRuleValue.isUnlocked = true;
        //rules.value[index].isUnlocked = true;
    }
</script>

<style scoped>
    label {
        font-weight: bold;
    }
    div {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 39.9rem;
    }
</style>
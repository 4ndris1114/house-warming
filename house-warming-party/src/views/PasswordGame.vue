<template>
    <div class="wrapper">
        <div class="passwordInput">
            <label>Choose a password</label>
            <textarea @input="checkPassword()" @click="unlockFirst()" v-model="password" type="text"> </textarea>
        </div>
        <div class="rulesContainer">
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
    </div>
</template>

<script setup lang="ts">
import RuleComponent from "@/components/RuleComponent.vue"
import type Rule from '@/types/Rule.vue';
import {useRulesStore} from "@/stores/rulesStore"
import { computed, type ComputedRef, onMounted, ref } from 'vue';

import {capitals} from "@/lists/TheList";
import {hungarianAnthem} from "@/lists/TheList";
import {planets} from "@/lists/TheList"

    const rulesStore = useRulesStore();

    onMounted(() => {
        rulesStore.fetchRules();
    });

    const password = ref('');

    const rules: ComputedRef<Rule[]> = computed(() => {
        console.log('Rules fetched in the component: ', rules.value);

        return rulesStore.rules || []
    });
    const unlocked: ComputedRef<Rule[]> = computed(() => {
        let dummy = rules.value.filter(rule => rule !== newlyUnlockedRule.value && !rule.isFulfilled && rule.isUnlocked);
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
    const todaysDate = new Date().toLocaleDateString();
    
    const ruleChecks = [
    (password: string) => password.length >= 7,
    (password: string) => /[A-Z]/.test(password),
    (password: string) => /\d/.test(password),
    (password: string) => specialCharacterRegex.test(password),
    (password: string) => slovakSpecialLettersRegex.test(password),
    (password: string) => hungarianAnthem.some((line: string) => password.includes(line)),
    (password: string) => password.includes(todaysDate),
    (password: string) => capitals.some((cityName: string) => password.includes(cityName)),
    (password: string) => sumDigits(password) === 30,
    (password: string) => planets.some((planetName: string) => password.includes(planetName)),
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
    const textarea = document.querySelector('.passwordInput textarea') as HTMLTextAreaElement | null;
    if (textarea) {
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight / 18 + 'rem';
    }
    }

    const unlockRule = (index: number) => {
        const newlyUnlockedRuleValue = rules.value[index];
        newlyUnlockedRule.value = newlyUnlockedRuleValue;
        newlyUnlockedRuleValue.isUnlocked = true;
    }

    const sumDigits = (password: string): number => {
        const numbersInPassword: number[] = [];
        for (let i = 0; i < password.length; i++) {
            if (parseInt(password[i])) {
                numbersInPassword.push(parseInt(password[i]));
            }
        }
        let sumOfNumbersInPassword: number = numbersInPassword.reduce((acc, curr) => acc + curr, 0);

        console.log(sumOfNumbersInPassword);
        
        return sumOfNumbersInPassword;
    }
</script>

<style scoped>
    label {
        font-weight: bold;
    }
    .wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        border: 0.1rem solid #ccc;
        border-radius: 1rem;
        padding: 1.5rem;
        width: 50rem;
        border-color: #000000;
    }

    .rulesContainer > div {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 39.9rem;
        margin: 0.06rem;
    }

    .passwordInput {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 1.5rem;
    }

    .passwordInput label {
        font-weight: bold;
        margin-bottom: 0.5rem;
    }

    .passwordInput textarea {
        width: 20rem;
        height: auto; /* allow the textarea to grow vertically */
        padding: 1rem;
        border: 0.1rem solid #ccc;
        border-radius: 0.5rem;
        font-size: 1.2rem;
        resize: none;
        overflow-y: hidden;
    }

    .passwordInput textarea::-webkit-scrollbar {
    display: none; /* Hide the scrollbar */
    }

    .passwordInput textarea:focus {
        outline: none;
        border-color: #007bff;
        box-shadow: 0 0 0.4rem rgba(0, 123, 255, 0.5);
    }



</style>
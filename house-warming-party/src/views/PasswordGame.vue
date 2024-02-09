<template>
    <div class="page">
        <div class="content">
            <div class="wrapper">
                <div v-if="!gameEnded" class="passwordInput">
                    <label>Choose a password</label>
                    <textarea @input="checkPassword()" @click="unlockFirst()" v-model="password" type="text"> </textarea>
                </div>
                <div v-else class="gameEnded-box">
                    <PasswordEndGame :password="password"></PasswordEndGame>
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
        </div>
    </div>
</template>

<script setup lang="ts">
import RuleComponent from "@/components/RuleComponent.vue";
import PasswordEndGame from "@/components/PasswordEndGame.vue";
import type Rule from '@/types/Rule.vue';
import {useRulesStore} from "@/stores/rulesStore"
import { computed, type ComputedRef, onMounted, ref } from 'vue';
import axios from 'axios'

import {capitals} from "@/lists/TheList";
import {hungarianAnthem} from "@/lists/TheList";
import {planets} from "@/lists/TheList"

    const rulesStore = useRulesStore();

    onMounted(() => {
        rulesStore.fetchRules();
    });

    const password = ref('');
    const gameEnded = ref(false);

    const rules: ComputedRef<Rule[]> = computed(() => {
        return rulesStore.rules || [];
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
    const todaysDate = new Date();

    const todaysDateString = new Date().getDate() + "/" + (todaysDate.getMonth()+1) + "/" + todaysDate.getFullYear();
    console.log(todaysDateString);
    
    
    const ruleChecks = [
    (password: string) => password.length >= 7,
    (password: string) => /[A-Z]/.test(password),
    (password: string) => /\d/.test(password),
    (password: string) => specialCharacterRegex.test(password),
    (password: string) => slovakSpecialLettersRegex.test(password),
    (password: string) => hungarianAnthem.some((line: string) => password.includes(line)),
    (password: string) => password.includes(todaysDateString),
    (password: string) => capitals.some((cityName: string) => password.includes(cityName)),
    (password: string) => sumDigits(password) === 40,
    (password: string) => planets.some((planetName: string) => password.includes(planetName)),
    (password: string) => password.includes("hangar") || password.includes("Hangar"),
    (password: string) => password.includes("6700"),
    (password: string) => password.includes("a^2 + b^2 = c^2") || password.includes("a^2+b^2=c^2") || password.includes("a2+b2=c2") || password.includes("a2 + b2 = c2"),
    (password: string) => {
        const count = (password.match(/\|/g) || []).length;
        return count > 1;
    },
    async () => {
        const response = await validatePalindrome();
        return response === 200;
    },
    (password: string) => password.includes("Andras") && password.includes("Katie")
    ];

    const validatePalindrome = async (): Promise<number> => {
    const pipeIndex = password.value.indexOf('|');
    const substring = password.value.substring(pipeIndex + 1, password.value.lastIndexOf('|'));
        if (substring.length >= 5) {
            const response = await isPalindrome(substring);
            if (response === 200){
                return 200;
            }
        }
        return 400;
    }

    const validateEnglishWord = async (): Promise<boolean> => {
        const pipeIndex = password.value.indexOf('|');
        const substring = password.value.substring(pipeIndex + 1, password.value.lastIndexOf('|'));
        if (substring.length >= 5) {
            const response = await checkWordExistance(substring);
            return response === 200;
        }
        return false;
    }

    const checkPassword = () => {
    rules.value.forEach(async (rule, index) => {
        if (rule.isUnlocked) {
            if (ruleChecks[index](password.value)) {
                rules.value[index].isFulfilled = true;
                if (index === 14) { // Rule 15 index
                    // Rule 15 should only be fulfilled if Rule 14 and the API call return true
                    const isValidPalindrome = await validatePalindrome();
                    const isValidWord = await validateEnglishWord();
                    if (!isValidPalindrome || !isValidWord) {
                        // Either the substring is not a valid palindrome or not an English word
                        rules.value[index].isFulfilled = false;
                    }
                }
                if (rules.value[15].isFulfilled === true) {
                    gameEnded.value = true;
                }
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
        
        return sumOfNumbersInPassword;
    }

    const isPalindrome = async (str: string) => {
        console.log('Checking if '+str+' is polindrome...');
        
        if (str.length >= 5) {
            console.log('Checking if '+str+' is an existing English word...');
            
            const response = await checkWordExistance(str);
            console.log(str+' was checked, response code: '+response);
            
            return response;
        } else {
            return 400;
        }
    }

    const checkWordExistance = async (word: string) => {
    try {
        const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        return response.status;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
    
    
};
</script>

<style>
@import '@/assets/main.css';

.page {
  display: flex;
  flex-direction: column;
  height: 35rem;
}
.content {
  flex-grow: 1; /* Allow the content to take up the remaining vertical space */
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
        overflow-y: auto; /* Enable vertical scrolling */
    }

    .gameEnded-box {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 1.5rem;
        width: 40rem;
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
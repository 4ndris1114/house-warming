import { db } from "@/firebase/firebase";
import { defineStore } from 'pinia'
import { collection, getDocs, type CollectionReference, addDoc, orderBy, query } from 'firebase/firestore';
import { Rule } from "@/types/Rule"

export const useRulesStore = defineStore('rules', {
    state: (): any => ({
        rules: [],
    }),
    getters: {
        rulesRef(): CollectionReference | null {
            return collection(db, "rules");
        }
    },
    actions: {
        async fetchRules() {
            console.log("Starting to fetch rules list...");
            const rulesQuery = query(this.rulesRef, orderBy("index", "asc"));
            const rulesSnap = await getDocs(rulesQuery);
            const rules: Rule[] = rulesSnap.docs.map((doc) => Rule.fromDocumentSnapshot(doc));
            // console.log("Fetched rules: ", rules);

            this.rules = rules;
            console.log("Storing rules fetched from database...");
        }
    }
})
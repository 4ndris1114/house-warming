import { ref, computed } from 'vue'
import { db } from "@/firebase/firebase";
import { defineStore } from 'pinia'
import { collection, getDocs, type CollectionReference, DocumentSnapshot } from 'firebase/firestore';
import { Guest } from '@/types/Guest';

export const useGuestStore = defineStore('guest', {
    state: (): any => ({
        guests: [],
    }),
    getters: {
        guestsRef(): CollectionReference | null {
            return collection(db, "guests");
        }
    },
    actions: {
        async fetchGuests() {
            console.log("Starting to fetch guest list...");
            const guestSnap = await getDocs(this.guestsRef);
            const guests: Guest[] = guestSnap.docs.map((doc) => Guest.fromDocumentSnapshot(doc));
            console.log("Fetched guests: ", guests);
            
            this.guests = guests;
            console.log('store guests: ', this.guests);
            
        }
    }
})

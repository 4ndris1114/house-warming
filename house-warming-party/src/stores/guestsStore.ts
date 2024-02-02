import { ref, computed } from 'vue'
import { db } from "@/firebase/firebase";
import { defineStore } from 'pinia'
import { collection, getDocs, type CollectionReference, addDoc } from 'firebase/firestore';
import { Guest } from '@/types/Guest';

export const useGuestsStore = defineStore('guests', {
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
            console.log("Storing guests fetched from database...");
        },
        async addGuest(guest: Guest){
            try {
                const guestsCollection = this.guestsRef;
                if (guestsCollection){
                    console.log(guest);
                    
                    const guestDocContent = guest; //this should be guest.toJson() ???
                    const addedGuestRef = await addDoc(guestsCollection, guestDocContent);
                    console.log("Added guest doc id: ", addedGuestRef.id);
                    guest.uid = addedGuestRef.id;
                    console.log("Added guest: ", JSON.stringify(guest));
                    this.guests.push(guest);
                }
            } catch (error) {
                console.log("Error adding guest: ",error.message);
            }
        }
    }
})
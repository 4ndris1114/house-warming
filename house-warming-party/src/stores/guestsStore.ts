import { ref, computed } from 'vue'
import { db } from "@/firebase/firebase";
import { defineStore } from 'pinia'
import { collection, getDocs, type CollectionReference, addDoc, doc, updateDoc } from 'firebase/firestore';
import { Guest } from '@/types/Guest';

export const useGuestsStore = defineStore('guests', {
    state: (): any => ({
        loggedInGuest: null,
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
        },
        async updateGuest(updatedGuest: Guest) {
            try {
                const guestId = updatedGuest.uid;
                const guestDocRef = doc(this.guestsRef, guestId);

                // Update the guest document with the new data
                await updateDoc(guestDocRef, updatedGuest);

                // Update the guest in the local state
                const index = this.guests.findIndex(guest => guest.uid === guestId);
                if (index !== -1) {
                    this.guests[index] = updatedGuest;
                } else {
                    console.error("Guest not found in local state.");
                }

                console.log("Guest updated successfully:", updatedGuest);
            } catch (error) {
                console.error("Error updating guest:", error.message);
            }
        },
        async setLoggedInGuest(guest: Guest) {
            this.loggedInGuest = guest;
            localStorage.setItem('loggedInUser', JSON.stringify(guest));
            
            return this.loggedInGuest;
        },
        async logout(){
            localStorage.setItem('loggedInUser', JSON.stringify(null));
            this.setLoggedInGuest(null);
            
        }
    }
})
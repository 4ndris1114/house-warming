import { db } from "@/firebase/firebase";
import { defineStore } from 'pinia'
import { collection, getDocs, type CollectionReference, addDoc, orderBy, query } from 'firebase/firestore';
import { Requirement } from "../types/Requirement";

export const useRequirementsStore = defineStore('requirements', {
    state: (): any => ({
        requirements: [],
    }),
    getters: {
        requirementsRef(): CollectionReference | null {
            return collection(db, "requirements");
        }
    },
    actions: {
        async fetchRequirements() {
            console.log("Starting to fetch requirements list...");
                const requirementsSnap = await getDocs(this.requirementsRef);
                const requirements: Requirement[] = requirementsSnap.docs.map((doc) => Requirement.fromDocumentSnapshot(doc));
                console.log("Fetched requirements: ", requirements);
                
                this.requirements = requirements;
                console.log("Storing requirements fetched from database...");
            },
            async addRequirement(requirement: Requirement){
                try {
                    const requirementsCollection = this.requirementsRef;
                    if (requirementsCollection){
                        console.log(requirement);
                        
                        const requirementDocContent = requirement; //this should be guest.toJson() ???
                        const addedRequirementRef = await addDoc(requirementsCollection, requirementDocContent);
                        console.log("Added requirement doc id: ", addedRequirementRef.id);
                        requirement.uid = addedRequirementRef.id;
                        console.log("Added requirement: ", JSON.stringify(requirement));
                        this.requirements.push(requirement);
                    }
                } catch (error) {
                    console.log("Error adding requirement: ",error.message);
                }
            },
        }
})

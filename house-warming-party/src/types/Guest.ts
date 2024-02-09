export class Guest {
    uid: string = '';
    name: string;
    email: string;
    animalRef: string;
    isSleepingHere: boolean;

    constructor(name: string, email: string, isSleepingHere: boolean, animalRef: string){
        this.name = name;
        this.email = email;
        this.animalRef = animalRef;
        this.isSleepingHere = isSleepingHere;
    }

    static fromDocumentSnapshot(doc: any): Guest {
        const guest = new Guest(doc.data().name, doc.data().email, doc.data().animalRef, doc.data().isSleepingHere);
        guest.uid = doc.id;
        return guest;
    }

    toJson() {
        const json: any = {
            name: this.name,
            email: this.email,
            animalRef: this.animalRef,
            isSleepingHere: this.isSleepingHere,
        }
        return json;
    }
}
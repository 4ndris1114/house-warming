export class Guest {
    uid: string = '';
    name: string;
    email: string;
    password: string;
    animalRef: string;
    isSleepingHere: boolean;

    constructor(name: string, email: string, isSleepingHere: boolean, animalRef: string, password: string){
        this.name = name;
        this.email = email;
        this.password = password;
        this.animalRef = animalRef;
        this.isSleepingHere = isSleepingHere;
    }

    static fromDocumentSnapshot(doc: any): Guest {
        const guest = new Guest(doc.data().name, doc.data().email, doc.data().isSleepingHere, doc.data().animalRef, doc.data().password);
        guest.uid = doc.id;
        return guest;
    }

    public toJson() {
        const json: any = {
            name: this.name,
            email: this.email,
            password: this.password,
            animalRef: this.animalRef,
            isSleepingHere: this.isSleepingHere,
        }
        return json;
    }
}
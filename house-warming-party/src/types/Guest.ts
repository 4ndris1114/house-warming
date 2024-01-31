export class Guest {
    uid: string = '';
    name: string;
    email: string;
    isSleepingHere: boolean;

    constructor(name: string, email: string, isSleepingHere: boolean){
        this.name = name;
        this.email = email;
        this.isSleepingHere = isSleepingHere
    }

    static fromDocumentSnapshot(doc: any): Guest {
        const guest = new Guest(doc.data().name, doc.data().email, doc.data().isSleepingHere);
        guest.uid = doc.id;
        return guest;
    }

    toJson() {
        const json: any = {
            name: this.name,
            email: this.email,
            isSleepingHere: this.isSleepingHere,
        }
        return json;
    }
}
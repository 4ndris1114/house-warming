export class Guest {
    uid: string = '';
    name: string;

    constructor(name: string){
        this.name = name;
    }

    static fromDocumentSnapshot(doc: any): Guest {
        const guest = new Guest(doc.data().name);
        guest.uid = doc.id;
        return guest;
    }
}
export class Requirement {
    uid: string = '';
    index: number;
    text: string;
 
    constructor(index: number, text: string){
        this.index = index;
        this.text = text;
    }

    static fromDocumentSnapshot(doc: any): Requirement {
        const requirement = new Requirement(doc.data().index, doc.data().text);
        requirement.uid = doc.id;
        return requirement;
    }
    
    toJson() {
        const json: any = {
            index: this.index,
            text: this.text
        }
        return json;
    }
}
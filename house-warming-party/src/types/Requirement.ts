export class Requirement {
    uid: string = '';
    text: string;
 
    constructor(text: string){
        this.text = text;
    }

    static fromDocumentSnapshot(doc: any): Requirement {
        const requirement = new Requirement(doc.data().text);
        requirement.uid = doc.id;
        return requirement;
    }
    
    toJson() {
        const json: any = {
            text: this.text
        }
        return json;
    }
}
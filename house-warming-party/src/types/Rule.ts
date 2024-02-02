export class Rule {
    uid: string = '';
    index: Number;
    condition: string;
    isFulfilled: boolean;
    isUnlocked: boolean;

    constructor(index: Number, condition: string, isFulfilled: boolean, isUnlocked: boolean) {
        this.index = index;
        this.condition = condition;
        this.isFulfilled = isFulfilled
        this.isUnlocked = isUnlocked;
    }

    static fromDocumentSnapshot(doc: any): Rule {
        const rule = new Rule(doc.data().index, doc.data().condition, doc.data().isFulfilled, doc.data().isUnlocked);
        rule.uid = doc.id;
        return rule;
    }

    toJson() {
        const json: any = {
            index: this.index,
            condition: this.condition,
            isFulfilled: this.isFulfilled,
            isUnlocked: this.isUnlocked,
        }
        return json;
    }
}
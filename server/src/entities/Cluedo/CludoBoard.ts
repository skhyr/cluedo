export default class CludoBoard{
    private fields: number[][][];

    constructor(){
        this.fields = [];
        for(let i = 0; i < 25; i++)
            this.fields.push([]);
    }

    getBoard(){
        return this.fields;
    }
}
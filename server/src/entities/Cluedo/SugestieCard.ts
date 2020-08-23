export default class SugestieCard{
    type: 'character'|'weapon'|'room';
    nr: number;

    constructor(type: 'character'|'weapon'|'room', nr: number){
        this.type = type;
        this.nr = nr;
    }
}
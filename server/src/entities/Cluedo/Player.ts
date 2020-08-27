import SugestieCard from "./SugestieCard";

export default class Player{
    sugestie: SugestieCard[];
    public id: string;
    public position: {x:number, y:number};
    public ready: boolean;
    lost: boolean;

    constructor(id: string){
        this.sugestie = [];
        this.id = id;
        this.position = {x: -1, y:-1};
        this.ready = false;
        this.lost = false;
    }

    setPosition(to: {x:number, y: number}){
        this.position = to; 
    }

    setReady(state: boolean){
        this.ready = state;
    }
}
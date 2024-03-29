import { CludoGame } from "./Cluedo/CludeoGame";
import { v4 as uuidv4 } from 'uuid';

export default class GameRoomService{
    private games: CludoGame[];


    constructor(){
        this.games = [];
    }

    getGames(){
        return this.games;
    }

    newGame(callback: (eventType:string, game: string, data?:any)=>void){
        let id = uuidv4();
        let newGame = new CludoGame(id, (eventType: string, data?:any) => callback(eventType, id, data) );
        this.games.push(newGame);
        return newGame;
    }

    getGame(id: string){
        return this.games.find(game=> game.id === id);
    }
}
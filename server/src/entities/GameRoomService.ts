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

    newGame(){
        let id = uuidv4();
        let newGame = new CludoGame(id);
        this.games.push(newGame);
        return newGame;
    }

    getGame(id: string){
        return this.games.find(game=> game.id === id);
    }
}
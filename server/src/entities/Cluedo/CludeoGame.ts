import CludoBoard from "./CludoBoard";
import IntrygiiCard from "./IntrygiiCard";
import SugestieCard from './SugestieCard';
import Player from './Player';

import shuffle from '../../utils/shuffle';

export class CludoGame{
    board: CludoBoard;
    players: Player[];
    turn: number;
    id: string;

    constructor(id: string){
        this.board = new CludoBoard();
        this.players = [];
        this.turn = -1;
        this.id = id;
    }

    joinPlayer(player: Player){
        this.players.push(player);
    }

    startGame(){
        if( [0, 1, 5].includes(this.players.length) ) return;
        this.dealCards;
        this.turn = 0;
    }

    nextTurn(){
        this.turn = (this.turn+1)%this.players.length;
    }

    dealCards(){
        let deck:SugestieCard[] = [];
        for(let i = 0; i < 6; i++){
            deck.push( new SugestieCard('character', i) );
        }
        for(let i = 0; i < 9; i++){
            deck.push( new SugestieCard('weapon', i) );
            deck.push( new SugestieCard('room', i) );
        }
        deck = shuffle(deck);

        while(deck.length !== 0){
            this.players.forEach(player=>{
                let currentCard = deck.pop();
                if(!currentCard) return;
                player.sugestie.push( currentCard );
            });
        }
    }

    move(playerId: string, to: {x:number, y:number}){
        this.players.find(player=>player.id===playerId)
            ?.setPosition(to);
    }

    getCardsofPlayer(playerId: string){
        return this.players.find(player=> player.id === playerId)
                    ?.sugestie;
    }
}
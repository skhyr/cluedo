import CludoBoard from "./CludoBoard";
import IntrygiiCard from "./IntrygiiCard";
import SugestieCard from './SugestieCard';
import Player from './Player';
import shuffle from '../../utils/shuffle';
import rand from "../../utils/rand";

export class CludoGame{
    board: CludoBoard;
    players: Player[];
    turn: number;
    id: string;
    truthSource: SugestieCard[];
    callback: (eventType: string)=>void;

    constructor(id: string, callback: (eventType: string)=>void){
        this.board = new CludoBoard();
        this.players = [];
        this.turn = -1;
        this.id = id;
        this.callback = callback;
        this.truthSource = [];
    }

    joinPlayer(player: Player){
        this.players.push(player);
        this.callback('newPlayer');
        return true;
    }

    startGame(){
        if( [0, 1, 5].includes(this.players.length) ) return;
        this.dealCards();
        this.turn = 0;
        this.callback('StartingGame');
    }

    nextTurn(){
        this.turn = (this.turn+1)%this.players.length;
    }

    dealCards(){
        let deck:SugestieCard[] = [];
        for(let i = 0; i < 9; i++){
            deck.push( new SugestieCard('character', i) );
            deck.push( new SugestieCard('weapon', i) );
            deck.push( new SugestieCard('room', i) );
        }

        const choosen = [rand(0, 8), rand(0, 8), rand(0, 8)];
        deck = deck.filter((card)=>{
            if(
                card.nr === choosen[0] && card.type === 'character' ||
                card.nr === choosen[1] && card.type === 'weapon' ||
                card.nr === choosen[2] && card.type === 'room'
            ) return false;
            else return true;
        });
        this.truthSource.push(
            new SugestieCard('character', choosen[0]),
            new SugestieCard('weapon', choosen[1]),
            new SugestieCard('room', choosen[2])
        );

        console.log(this.truthSource);

        deck = shuffle(deck);

        while(deck.length !== 0){
            this.players.forEach(player=>{
                let currentCard = deck.pop();
                if(!currentCard) return;
                player.sugestie.push( currentCard );
            });
        }
    }

    setPawns(){
        const starts = [{x: 1, y: 7},{x: 1, y: 17},
                        {x: 8, y: 25},{x: 25, y: 19},
                        {x: 25, y: 7},{x: 15, y: 1},]
        this.players.forEach((player, index)=>{
            player.position = starts[index];
        })
    }

    move(playerId: string, to: {x:number, y:number}){
        this.players.find(player=>player.id===playerId)
            ?.setPosition(to);
    }

    getCardsofPlayer(playerId: string){
        return this.players.find(player=> player.id === playerId)
                    ?.sugestie;
    }

    countReady(){
        return this.players.reduce((prev, curr)=>{
            return curr.ready ? prev+1 : prev;
        }, 0);
    }
}
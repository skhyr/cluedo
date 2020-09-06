import CludoBoard from "./CludoBoard";
import IntrygiiCard from "./IntrygiiCard";
import SugestieCard from './SugestieCard';
import Player from './Player';
import shuffle from '../../utils/shuffle';
import rand from "../../utils/rand";
import inRoom from "../../utils/inRoom";

export class CludoGame{
    board: CludoBoard;
    players: Player[];
    turn: number;
    id: string;
    dice: number;
    truthSource: SugestieCard[];
    callback: (eventType: string, data?:any)=>void;
    turnCheckList:{
        dice: boolean,
        move: boolean,
        guess: boolean
    };
    shouldShowSugestie: number;

    constructor(id: string, callback: (eventType: string, data?:any)=>void){
        this.board = new CludoBoard();
        this.players = [];
        this.turn = -1;
        this.id = id;
        this.callback = callback;
        this.truthSource = [];
        this.dice = 0;
        this.turnCheckList = {
            dice: false,
            move: false,
            guess: false
        }
        this.shouldShowSugestie = 0;
    }

    joinPlayer(player: Player){
        this.players.push(player);
        this.callback('newPlayer');
        return true;
    }

    startGame(){
        if( [0, 1, 5].includes(this.players.length) ) return;
        this.dealCards();
        this.setPawns();
        this.turn = 0;
        this.callback('StartingGame');
    }

    nextTurn(){
        this.turn = (this.turn+1)%this.players.length;
        if( this.players[this.turn].lost ){
            this.nextTurn();
            return;
        }
        this.turnCheckList = {
            dice: false,
            move: false,
            guess: false
        }
        this.callback('nextTurn');
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
        const starts = [{x: 0, y: 6},{x: 0, y: 16},
                        {x: 7, y: 24},{x: 24, y: 18},
                        {x: 24, y: 6},{x: 17, y: 0},]
        this.players.forEach((player, index)=>{
            player.position = starts[index];
        })
    }

    move(playerId: string, to: {x:number, y:number}){
        if(this.turnCheckList.move || !this.turnCheckList.dice) return;
        let player = this.players.find(player=>player.id===playerId);
        if(!player) return; 
        if(!this.canMove(player.position, to, this.dice)) return;

        player.setPosition(to);
        this.callback('playerMoved');
        this.turnCheckList.move = true;

        console.log( inRoom(to.x, to.y) );
        if( inRoom(to.x, to.y) === -1 ) this.nextTurn();
    }

    canMove(from:{x:number, y:number}, to:{x:number, y:number}, inD:number){
        let deltaX = Math.abs(from.x - to.x );
        let deltaY = Math.abs(from.y - to.y );
        if(deltaX+deltaY > inD) return false;
        else return true;
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

    isTurn(id: string){
        if( this.players[this.turn].id === id) return true;
        else return false;
    }

    throwDice(){
        if(this.turnCheckList.dice) return -1;
        this.dice = rand(1, 6) + rand(1, 6);
        this.callback('diceThrown');
        this.turnCheckList.dice = true;
        return this.dice;
    }

    makeGuess(character: number, weapon: number, room: number, who: number){
        if( inRoom( this.players[who].position.x, this.players[who].position.y ) === 9 ){
            this.indictment(character, weapon, room);
            return;
        }
        if( inRoom( this.players[who].position.x, this.players[who].position.y ) !== room ) return;
        if(!this.turnCheckList.dice || !this.turnCheckList.move || this.turnCheckList.guess) return;
        this.shouldShowSugestie = this.countShouldShowSugestie(character, weapon, room);
        this.callback('guess', [{type: 'character', nr: character}, {type: 'weapon', nr: weapon}, {type: 'room', nr: room}]);
        this.turnCheckList.guess = true;
        if(this.shouldShowSugestie === 0)this.nextTurn();
    }

    indictment(character: number, weapon: number, room: number){
        if(
            character === this.truthSource.find(el=>el.type === 'character')?.nr &&
            weapon === this.truthSource.find(el=>el.type === 'weapon')?.nr &&
            room === this.truthSource.find(el=>el.type === 'room')?.nr
        ){
            this.callback('won', {character, weapon, room, who: this.turn});
            this.turn = -1;
        }else{
            this.callback('nwon', {character, weapon, room});
            this.players[this.turn].lost = true;
            this.nextTurn();
        }
    }

    guessAnswer({nr, type}: SugestieCard, ownerId: string){
        console.log(nr, type);
        this.callback('guessAnswer', {nr, type, ownerId});
        this.shouldShowSugestie--;
        if(this.shouldShowSugestie === 0) this.nextTurn();
    }

    countShouldShowSugestie(character: number, weapon: number, room: number){
        let number = 0;
        this.players.forEach((player, index)=>{
            const out = player.sugestie.some(sugestia => {
                if(sugestia.type === 'character') {
                    return sugestia.nr == character;
                }
                else if(sugestia.type === 'weapon') {
                    return sugestia.nr == weapon
                }
                else if(sugestia.type === 'room') {
                    return sugestia.nr == room
                }
                else return false;
            } );
            if(out && index !== this.turn) number++;
        });
        return number;
    }
}
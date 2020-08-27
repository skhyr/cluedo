import React, { useState, useEffect, useContext } from 'react';
import io from 'socket.io-client';
import { MainContext } from '../contexts/MainContext';
import { Sugestia } from '../components';

type sugestia = {
        type: 'character'|'weapon'|'room',
        nr: number,
        owner?: string;
}

type playerType = {
    id: string;
    position:{
        x: number,
        y: number,
    }
    sugestie?:sugestia[],
    lost: boolean,
}

export default (gameId: string)=>{

    const [gameStarted, setGameStarted] = useState(false);
    const [ready, setReady] = useState(false);
    const [socket] = useState(io('https://kludo.herokuapp.com'));
    const [diceResult, setDiceResult] = useState(6);
    const [turn, setTurn] = useState(0);
    const [guess, setGuess] = useState<sugestia[]>([]);
    const [players, setPlayers] = useState<playerType[]>([]);
    const [winner, setWinner] = useState<null | number>(null);
    const [lost, setLost] = useState(false);
    const [player, setPlayer] = useState<playerType>({id: '',lost: false, position:{x:0,y: 0,},sugestie:[{type: 'room',nr: 0,}]});
    
    const { token } = useContext(MainContext);

    useEffect(()=>{
        socket.emit('initial', token, gameId, (data: any)=>{
            setPlayers(data);
        });

        socket.on('newPlayer', (data: any)=>{
            setPlayers(data);
        });

        socket.on('StartingGame', (data1: any, data2:any)=>{
            setPlayer(data1);
            setPlayers(data2);
            setGameStarted(true);
        });

        socket.on('nextTurn', (data: number)=>{
            setTurn(data);
            setTimeout(() => {
                setGuess([]);
            }, 3000);
        });

        socket.on('diceThrown', (data: number)=>{
            setDiceResult(data);
        });
        
        socket.on('playerMoved', (data: any)=>{
            setPlayers(data);
        });

        socket.on('guess', (data: any)=>{
            setGuess(data);
        });

        socket.on('guessAnswer', (data: any)=>{
            setGuess(oldArray => {
                let n  = oldArray.find(el=> el.nr === data.nr && el.type === data.type)
                if(!n) return [...oldArray];
                n.owner = data.ownerId;
                return [...oldArray];
            })
        });

        socket.on('won', (data: any)=>{
            setGuess([
                {
                    type: 'character',
                    nr: data.character
                },{
                    type: "weapon",
                    nr: data.weapon
                },{
                    type: "room",
                    nr: data.room
                }
            ]);
            setWinner(data.who);
        });

        socket.on('nwon', (data: any)=>{
            setGuess([
                {
                    type: 'character',
                    nr: data.character
                },{
                    type: "weapon",
                    nr: data.weapon
                },{
                    type: "room",
                    nr: data.room
                }
            ]);
            setLost(true);
            setTimeout(() => {
                setLost(false);
            }, 2000);
        });
        
    }, []);


    const handleReadyClick = () =>{
        socket.emit('ready', !ready, token, gameId);
        setReady(!ready);
    }

    const throwDice = () =>{
        socket.emit('throwDice', token, gameId);
    }

    const move = (x: number, y: number) =>{
        socket.emit('move',{x, y}, token, gameId);
    }

    const makeGuess = ()=>{
        const data = {
            character: guess.find(el=>el.type === 'character')?.nr,
            weapon: guess.find(el=>el.type === 'weapon')?.nr,
            room: guess.find(el=>el.type === 'room')?.nr,
        } 
        socket.emit('makeGuess', data, token, gameId);
    }

    const guessAnswer = (data: any)=>{
        socket.emit('guessAnswer', data, token, gameId);
    }

    const selectToGuess = (type: "character" | "weapon" | "room", id: number) =>{
        if( player.id !== players[turn].id ) return;
        setGuess(old => {
            old = old.filter(el=> el.type !== type);
            old  = [...old, {type, nr: id}];

            const hehe: sugestia[] = [];
            let c = old.find(el=>el.type==='character');
            if(c) hehe.push(c);
            let w = old.find(el=>el.type==='weapon');
            if(w) hehe.push(w);
            let r = old.find(el=>el.type==='room');
            if(r) hehe.push(r);

            return hehe;
        });
    }

    return { 
        gameStarted,
        players,
        handleReadyClick,
        ready,
        dice:{
            result: diceResult,
            throw: throwDice
        },
        turn,
        move,
        player,
        guess,
        makeGuess,
        guessAnswer,
        selectToGuess,
        winner,
        lost
    };
}
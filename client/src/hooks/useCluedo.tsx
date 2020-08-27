import React, { useState, useEffect, useContext } from 'react';
import io from 'socket.io-client';
import { MainContext } from '../contexts/MainContext';

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
    sugestie?:sugestia[]
}

export default (gameId: string)=>{

    const [gameStarted, setGameStarted] = useState(false);
    const [ready, setReady] = useState(false);
    const [socket] = useState(io('localhost:5000'));
    const [diceResult, setDiceResult] = useState(6);
    const [turn, setTurn] = useState(0);
    const [guess, setGuess] = useState<sugestia[]>([]);
    const [players, setPlayers] = useState<playerType[]>([]);
    const [player, setPlayer] = useState<playerType>({id: '', position:{x:0,y: 0,},sugestie:[{type: 'room',nr: 0,}]});
    
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

    const makeGuess = (data: any)=>{
        socket.emit('makeGuess', data, token, gameId);
    }

    const guessAnswer = (data: any)=>{
        socket.emit('guessAnswer', data, token, gameId);
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
        guessAnswer
    };
}
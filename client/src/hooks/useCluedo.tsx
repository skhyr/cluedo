import React, { useState, useEffect, useContext } from 'react';
import io from 'socket.io-client';
import { MainContext } from '../contexts/MainContext';

type playerType = {
    id: string;
    position:{
        x: number,
        y: number,
    }
    sugestie?:{
        type: 'character'|'weapon'|'room',
        nr: number,
    }[]
}

export default (gameId: string)=>{

    const [gameStarted, setGameStarted] = useState(false);
    const [ready, setReady] = useState(false);
    const [socket, setSocket] = useState(io('localhost:5000'));
    const [diceResult, setDiceResult] = useState(6);
    const [turn, setTurn] = useState(-1);
    const [players, setPlayers] = useState<playerType[]>([]);
    const [player, setPlayer] = useState<playerType>({id: '', position:{x:0,y: 0,},sugestie:[{type: 'room',nr: 0,}]});
    
    const { token } = useContext(MainContext);

    useEffect(()=>{
        socket.emit('initial', token, gameId, (data: any)=>{
            setPlayers(data);
        });

        socket.on('newPlayer', (data: any)=>{
            console.log('new player', data);
            setPlayers(data);
        });

        socket.on('StartingGame', (data: any)=>{
            setPlayer(data);
            setGameStarted(true);
        });

        socket.on('nextTurn', (data: number)=>{
            setTurn(data);
        });

        socket.on('diceThrown', (data: number)=>{
            setDiceResult(data);
        });
        
        socket.on('playerMoved', (data: any)=>{
            setPlayers(data);
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
        player
    };
}
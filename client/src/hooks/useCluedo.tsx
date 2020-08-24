import React, { useState, useEffect, useContext } from 'react';
import io from 'socket.io-client';
import { MainContext } from '../contexts/MainContext';

type playerType = {
    id: string;
    position:{
        x: number,
        y: number,
    }
}

export default (gameId: string)=>{

    const [gameStarted, setGameStarted] = useState(false);
    const [ready, setReady] = useState(false);
    const [socket, setSocket] = useState(io('localhost:5000'));
    const [players, setPlayers] = useState<playerType[]>([]);
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
            setPlayers(data);
            console.log(2137, data)
            setGameStarted(true);
        });
    }, []);


    const handleReadyClick = () =>{
        socket.emit('ready', !ready, token, gameId);
        setReady(!ready);
    }

    return { gameStarted, players, handleReadyClick, ready};
}
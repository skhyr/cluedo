import express from 'express';
import socketio from 'socket.io';
import cors from 'cors';

import { resolve } from 'path';
import dotenv from 'dotenv';
import GameRoomService from './entities/GameRoomService';
dotenv.config({ path: resolve(__dirname, "../.env") });

const app = express();
const server = app.listen(process.env.PORT || 5000, ()=>{
    console.log('server up');
});

import gamesRoute from './routes/game';
const io = socketio(server);
const socketHandler = gamesRoute(io);
io.on('connection', (socket) => {
    socketHandler.socketHandle(socket);
});


export const gameRoomService = new GameRoomService();
gameRoomService.newGame(socketHandler.gameCallback);
gameRoomService.newGame(socketHandler.gameCallback);
gameRoomService.newGame(socketHandler.gameCallback);
gameRoomService.newGame(socketHandler.gameCallback);
gameRoomService.newGame(socketHandler.gameCallback);
gameRoomService.newGame(socketHandler.gameCallback);
gameRoomService.newGame(socketHandler.gameCallback);
gameRoomService.newGame(socketHandler.gameCallback);
gameRoomService.newGame(socketHandler.gameCallback);
gameRoomService.newGame(socketHandler.gameCallback);
gameRoomService.newGame(socketHandler.gameCallback);

app.use(express.json());
app.use(cors());

import getGames from './routes/getGames';
import auth from './routes/auth';
app.use('', getGames);
app.use('', auth);
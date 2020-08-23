import express from 'express';
import socket from 'socket.io';
import cors from 'cors';

import { resolve } from 'path';
import dotenv from 'dotenv';
import GameRoomService from './entities/GameRoomService';
dotenv.config({ path: resolve(__dirname, "../.env") });

const app = express();
const server = app.listen(process.env.PORT || 5000, ()=>{
    console.log('server up');
});

const io = socket(server);
//export const socketsHandler = new SocketsHandler(io);

export const gameRoomService = new GameRoomService();
gameRoomService.newGame();
gameRoomService.newGame();
gameRoomService.newGame();
gameRoomService.newGame();
gameRoomService.newGame();
gameRoomService.newGame();

app.use(express.json());
app.use(cors());

import getGames from './routes/getGames';
import auth from './routes/auth';
app.use('', getGames);
app.use('', auth);
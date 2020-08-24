import socketio from 'socket.io';
import jwt from 'jsonwebtoken';
import { gameRoomService } from '../index';

export default (io: socketio.Server)=>{
    return {

        socketHandle: (socket: socketio.Socket)=>{
            socket.on('initial', (token: string, gameId: string , callback: any) =>{
                const { name } = <{name: string}>jwt.verify(token, 'tokenSecret');
                socket.join(name);
                socket.join(gameId);
                callback(gameRoomService.getGame(gameId)?.players)
            });

            socket.on('ready', (state, token, gameId)=>{
                const { name } = <{name: string}>jwt.verify(token, 'tokenSecret');
                const game = gameRoomService.getGame(gameId);
                if(!game) return;
                game.players.find(player=>player.id === name)?.setReady(state);
                if(game.countReady() === game.players.length) game.startGame();
                console.log(game.countReady());
            });
        },

        gameCallback: (eventType: string, gameId: string)=>{
            console.log(eventType);
            switch (eventType) {
                case 'newPlayer':
                    io.to(gameId).emit('newPlayer', gameRoomService.getGame(gameId)?.players);
                    break;
                case 'StartingGame':
                    io.to(gameId).emit('StartingGame', gameRoomService.getGame(gameId)?.players);
                    break;
                default:
                    break;
            }
        }
    }
}


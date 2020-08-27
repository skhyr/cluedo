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

            socket.on('throwDice', (token, gameId)=>{
                const { name } = <{name: string}>jwt.verify(token, 'tokenSecret');
                const game = gameRoomService.getGame(gameId);
                if(!game) return;
                if(game.isTurn(name)) game.throwDice();
            });

            socket.on('move', (to, token, gameId)=>{
                const { name } = <{name: string}>jwt.verify(token, 'tokenSecret');
                const game = gameRoomService.getGame(gameId);
                if(!game) return;
                if(game.isTurn(name)) game.move(name, to);
            });

            socket.on('makeGuess', (data, token, gameId)=>{
                const { name } = <{name: string}>jwt.verify(token, 'tokenSecret');
                const game = gameRoomService.getGame(gameId);
                if(!game) return;
                if(game.isTurn(name)) game.makeGuess(data.character, data.weapon, data.room, game.players.findIndex(el=> el.id === name));
            });

            socket.on('guessAnswer', (data, token, gameId)=>{
                const { name } = <{name: string}>jwt.verify(token, 'tokenSecret');
                const game = gameRoomService.getGame(gameId);
                if(!game) return;
                game.guessAnswer(data, name);
            });

        },

        gameCallback: (eventType: string, gameId: string, data?: any)=>{
            console.log(eventType);
            switch (eventType) {
                case 'newPlayer':
                    io.to(gameId).emit('newPlayer', gameRoomService.getGame(gameId)?.players);
                    break;
                case 'StartingGame':
                    gameRoomService.getGame(gameId)?.players?.forEach((player, index, arr)=>{
                        io.to(player.id).emit('StartingGame', player, arr);
                    });
                    break;
                case 'diceThrown':
                    io.to(gameId).emit('diceThrown', gameRoomService.getGame(gameId)?.dice);
                    break;
                case 'nextTurn':
                    io.to(gameId).emit('nextTurn', gameRoomService.getGame(gameId)?.turn);
                    break;
                case 'playerMoved':
                    io.to(gameId).emit('playerMoved', gameRoomService.getGame(gameId)?.players);
                    break;
                case 'guess':
                    io.to(gameId).emit('guess', data);
                    break;
                case 'guessAnswer':
                    const game = gameRoomService.getGame(gameId);
                    if(!game) return;
                    io.to(game.players[game.turn].id).emit('guessAnswer', data);
                    break;
                default:
                    break;
            }
        }
    }
}


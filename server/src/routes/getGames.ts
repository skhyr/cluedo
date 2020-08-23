import express from 'express';
const router = express.Router();
import {gameRoomService} from '../'
import jwt from 'jsonwebtoken';
import Player from 'entities/Cluedo/Player';

router.get('/getGames', async (req, res)=>{
    res.send(gameRoomService.getGames());
});

router.post('/joinGame', async (req, res)=>{
    const { name } = <{name: string}>jwt.verify(req.body.token, 'tokenSecret');
    const player = new Player(name);
    const out = gameRoomService.getGame(req.body.game)?.joinPlayer(player);
    if(!out){
        res.status(400).send();
        return;
    } 
    res.status(200).send(gameRoomService.getGame(req.body.game)?.players); 
});

export default router;
import jwt from 'jsonwebtoken';
import express from 'express';
const router = express.Router();
import {gameRoomService} from '../'

router.post('/login', async (req, res)=>{
    const token = jwt.sign({name: req.body.name}, 'tokenSecret' );
    res.send(token);
});

export default router;
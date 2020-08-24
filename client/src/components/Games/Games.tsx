import React, { useContext } from 'react';
import useGameRoom from '../../hooks/useGameRoom';
import {History} from 'history';
import { MainContext } from '../../contexts/MainContext';
interface Props{
    token: string;
    history: History;
}

const Games: React.FC<Props> = ({token, history}) =>{

    const { setToken } = useContext(MainContext);
    const { gameRooms, joinGame } = useGameRoom(10000, (gameId: string)=>{
        history.push(`/games/${gameId}`);
    });


return(
    <div className="Games">
        {gameRooms.map((game, index)=>
            <div className="game" key={index} onClick={()=>joinGame(game.id)}>{game.id} {game.players.length}</div>
        )}
    </div>
)
}

export default Games;
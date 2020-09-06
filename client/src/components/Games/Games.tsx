import React, { useContext } from 'react';
import useGameRoom from '../../hooks/useGameRoom';
import {History} from 'history';
import { MainContext } from '../../contexts/MainContext';
import './Games.css';

interface Props{
    token: string;
    history: History;
}

const Games: React.FC<Props> = ({token, history}) =>{

    const { setToken } = useContext(MainContext);
    const { gameRooms, joinGame } = useGameRoom(2000, (gameId: string)=>{
        history.push(`/games/${gameId}`);
    });


return(
    <div className="Games">
         <div className="gameRow">
                <div className="inside">
                    Players
                </div>
                <div className="id">
                    Game Id 
                </div>
                <button></button>
            </div>
        {gameRooms.map((game, index)=>
            <div className="gameRow" key={index} >
                <div className="inside">
                    {game.players.length}
                </div>
                <div className="id">
                    {game.id} 
                </div>
                <button onClick={()=>joinGame(game.id)} > Join </button>
            </div>
        )}
    </div>
)
}

export default Games;
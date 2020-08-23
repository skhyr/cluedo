import React from 'react';
import { RouteComponentProps } from "react-router-dom";

type Props = RouteComponentProps<{
    gameId: string
}>

const Game: React.FC<Props> = ({match}) =>{

    return(
        <div className="Game">
            gameee {match.params.gameId}
        </div>
    )
}

export default Game;
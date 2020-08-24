import React, { useContext, useEffect } from 'react';
import { RouteComponentProps } from "react-router-dom";
import useGame from '../../hooks/useGame';
import Cluedo from '../Cluedo/Cluedo';
import { MainContext } from '../../contexts/MainContext';

type Props = RouteComponentProps<{
    gameId: string
}>

const Game: React.FC<Props> = ({ match, history }) =>{

    const {token} = useContext(MainContext);
    const {joined} = useGame(token, match.params.gameId);

    useEffect(()=>{
        if(token === '') history.push('/');
    }, [token])

    return(
        <div className="Game">
            {joined ? <Cluedo gameId={match.params.gameId}/> : <> gameee {match.params.gameId}</> }
        </div>
    )
}

export default Game;
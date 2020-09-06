import React from 'react';
import useCluedo from '../../hooks/useCluedo';
import Started from '../Started/Started';

interface Props{
    gameId: string
}

const Cluedo: React.FC<Props> = ({ gameId }) =>{

    const {gameStarted, players, handleReadyClick, ready, turn, dice, move, player, guess, makeGuess, guessAnswer, selectToGuess, winner, lost}
         = useCluedo( gameId )

    return(
    gameStarted ? (
        <div className="Cluedo">
            <Started winner={winner} players={players} turn={turn} dice={dice} move={move} player={player} guess={guess} makeGuess={makeGuess} guessAnswer={guessAnswer} selectToGuess={selectToGuess} lost={lost} />
        </div>
    ) : (
        <div className="Cluedo">
            cluedo
            {players.map((player, index) =>
                <div className="player" key={index}>{player.id}</div>
            )}
            <button onClick={handleReadyClick}>click to be {!ready ? 'ready' : 'unready' }</button>
        </div>
    ));
}

export default Cluedo;
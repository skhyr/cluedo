import React, {useState} from 'react';
import './Started.css';
import Sugestia from '../Sugestia/Sugestia';
import Paper from '../Paper/Paper';
import names from '../../utils/names';

interface Props{
    players:{
        id: string,
        position:{
            x: number,
            y:number,
        },
        lost: boolean,
    }[],
    dice:{
        result: number,
        throw: ()=>void
    },
    turn: number,
    move: (x:number, y:number)=>void,
    player:{
        id: string;
        position:{
            x: number,
            y: number,
        }
        sugestie?:{
            type: 'character'|'weapon'|'room',
            nr: number,
        }[]
    },
    guess:{
        type: 'character'|'weapon'|'room',
        nr: number,
        owner?: string;
    }[],
    makeGuess: ()=>void;
    guessAnswer: (data:any)=>void;
    selectToGuess: (type: "character" | "weapon" | "room", id: number)=>void;
    winner: null | number;
    lost: boolean;
}

const genBoard = () =>{
   let stack = Array(25);
   stack.fill(7);
   stack = stack.map(e => Array(25).fill(-1));
   return stack;
}

const Started: React.FC<Props> = ( { players, dice, turn, move, player, guess, makeGuess, guessAnswer, selectToGuess, winner, lost}) =>{

    const [ board ] = useState(genBoard());

    return(<>
        <div className="Started">
            <div className="board">
                {board.map((col, colI)=>{
                    return <>{
                        col.map((row: any, rowI: number)=>
                            <div 
                                className='field'
                                onClick={()=>move(rowI, colI)}
                                style={{
                                    gridColumn: `${rowI+1} / ${rowI+2}`,
                                    gridRow: `${colI+1} / ${colI+2}`,
                                }}
                            >
                                {players.map((player, index)=>{
                                    return <>{player.position.x === rowI && player.position.y === colI
                                                && <div className="pawn" id={`pawn${index}`} ></div>
                                    }</>
                                })}
                            </div>
                        )
                    }</>
                })}
                <div className="room r0">
                    <img src={names.room[0][1]}/>
                    <div className="desc">{names.room[0][0]}</div>
                </div>
                <div className="room r1">
                    <img src={names.room[1][1]}/>
                    <div className="desc">{names.room[1][0]}</div>
                </div>
                <div className="room r2">
                    <img src={names.room[2][1]}/>
                    <div className="desc">{names.room[2][0]}</div>
                </div>
                <div className="room r3">
                    <img src={names.room[3][1]}/>
                    <div className="desc">{names.room[3][0]}</div>
                </div>
                <div className="room r4">
                    <img src={names.room[4][1]}/>
                    <div className="desc">{names.room[4][0]}</div>
                </div>
                <div className="room r5">
                    <img src={names.room[5][1]}/>
                    <div className="desc">{names.room[5][0]}</div>
                </div>
                <div className="room r6">
                    <img src={names.room[6][1]}/>
                    <div className="desc">{names.room[6][0]}</div>
                </div>
                <div className="room r7">
                    <img src={names.room[7][1]}/>
                    <div className="desc">{names.room[7][0]}</div>
                </div>
                <div className="room r8">
                    <img src={names.room[8][1]}/>
                    <div className="desc">{names.room[8][0]}</div>
                </div>
                <div className="room r9"></div>
            </div>
            <div className="sidebar">
                <div className="players">
                {players.map((player, index)=>
                    <div className="player" key={index}>
                        <div className={ index===turn ? "player now" : "player" + player.lost ? "lost" : ""}>{player.id}</div>
                    </div>
                )}
                </div>
                <div className={ lost ? "guess lost": "guess" }>
                    {guess.map(card=>
                        <div className={card.owner? "CardBox withOwner":"CardBox"}>
                            <Sugestia type={card.type} nr={card.nr}/>
                            <div className="owner">{card.owner}</div>
                        </div>
                    )}
                </div>
                <div className="dice">
                    {dice.result} 
                    <button onClick={dice.throw}>dice</button>
                </div>
                <div className="makeGuess">
                    <button onClick={makeGuess}> guess </button>
                </div>
            </div>
        </div>
        <div className="BottomBar">
            <div className="ucard">
                    <Paper selectToGuess={selectToGuess} />
            </div>
            <div className="cards">
                {player.sugestie?.map(sugestia=>
                    <Sugestia nr={sugestia.nr} type={sugestia.type} click={guessAnswer} />
                )}
            </div>
            {winner}
        </div>
                <div className={typeof winner === 'number' ? 'winner': 'nwinner'}> <div>wygrywa</div><div> {typeof winner === 'number' && players[winner].id}</div></div>
        </>
    );
}

export default Started;
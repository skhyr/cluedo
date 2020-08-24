import React, {useState} from 'react';
import './Started.css';
import Sugestia from '../Sugestia/Sugestia';

interface Props{
    players:{
        id: string,
        position:{
            x: number,
            y:number,
        }
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
    }
}

const genBoard = () =>{
   let stack = Array(25);
   stack.fill(7);
   stack = stack.map(e => Array(25).fill(-1));
   return stack;
}

const Started: React.FC<Props> = ( {players, dice, turn, move, player}) =>{

    const [board, setBoard] = useState(genBoard());

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
                <div className="room r0"></div>
                <div className="room r1"></div>
                <div className="room r2"></div>
                <div className="room r3"></div>
                <div className="room r4"></div>
                <div className="room r5"></div>
                <div className="room r6"></div>
                <div className="room r7"></div>
                <div className="room r8"></div>
                <div className="room r9"></div>
            </div>
            <div className="sidebar">
                <div className="players">
                {players.map((player, index)=>
                    <div className="player" key={index}>
                        <div className="name">{player.id}</div>
                        <div className="pawn">{player.position.x}  {player.position.y}</div>
                    </div>
                )}
                </div>
                <div className="turn">{players[turn]?.id}</div>
                <div className="dice">
                    {dice.result} 
                    <button onClick={dice.throw}>dice</button>
                </div>
            </div>
        </div>
        <div className="BottomBar">
            <div className="ucard">

            </div>
            <div className="cards">
                {player.sugestie?.map(sugestia=>
                    <Sugestia nr={sugestia.nr} type={sugestia.type} />
                )}
            </div>
        </div>
        </>
    );
}

export default Started;
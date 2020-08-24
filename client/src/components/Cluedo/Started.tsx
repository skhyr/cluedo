import React, {useState} from 'react';
import './Started.css';

interface Props{
    players:{
        id: string,
        position:{
            x: number,
            y:number,
        }
    }[]
}

const genBoard = () =>{
   let stack = Array(25);
   stack.fill(7);
   stack = stack.map(e => Array(25).fill(-1));
   return stack;
}

const Started: React.FC<Props> = ( {players}) =>{

    const [board, setBoard] = useState(genBoard());

    return(
        <div className="Started">
            {players.map((player, index)=>
                <div className="player" key={index}>
                    <div className="name">{player.id}</div>
                    <div className="pawn">{player.position.x}  {player.position.y}</div>
                </div>
            )}
            <div className="board">
                {board.map((row, rowI)=>{
                    return <>{
                        row.map((col: any, colI: number)=>
                            <div 
                                className='field' 
                                style={{
                                    gridRow: `${rowI+1} / ${rowI+2}`,
                                    gridColumn: `${colI+1} / ${colI+2}`,
                                }}
                            >
                                {players.map((player, index)=>{
                                    return <>{player.position.x === rowI && player.position.x === rowI
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
        </div>
    );
}

export default Started;
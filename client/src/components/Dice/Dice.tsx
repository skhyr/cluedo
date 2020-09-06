import React, { useState, useEffect } from 'react';
import './Dice.css';
import rand from '../../utils/rand';
import { animated } from 'react-spring/renderprops-universal';

interface Props{
    result: number,
    throwDice: ()=>void,
}


const Dice: React.FC<Props> = ({ result, throwDice }) =>{

    const [random, setRandom] = useState( 6 );
    const [animation, setAnimation] = useState( false );


    useEffect(()=>{
        if( result > 0 ) {
            setTimeout(() => {
                setAnimation(false);
            }, 1000);
            return;
        }
        else if( animation ){
            setAnimation(false);
            return;
        }
        else{
            setAnimation(true);
            setRandom(rand(1, 12));
        }
    }, [ result ]);

    useEffect(()=>{
        if( !animation ) return;
        setTimeout(() => {
            setRandom(rand(1, 12));
        }, 100);
        
    }, [ random ]);

    return !animation ? (
        <div className="Dice" onClick={throwDice}>
            {result}
        </div>
    ) : (
        <div className="Dice" onClick={throwDice} >
            {random}
        </div>
    );
}

export default Dice;
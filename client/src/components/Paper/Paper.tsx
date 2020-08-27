import React from 'react';
import './Paper.css';
import names from '../../utils/names';

interface Props{
    selectToGuess: (type: "character" | "weapon" | "room", id: number)=>void;
}

const Paper: React.FC<Props> = ({ selectToGuess }) =>{

    return(
        <div className="Paper">
            <section>
                {names.character.map((element, index)=>
                    <div key={index}>
                        <span onClick={()=>selectToGuess('character', index)} > {index}. {element[0]} </span>
                        <input type="checkbox" name="" id=""/>
                        <input type="text"/>    
                    </div>
                )}
            </section>
            <section>
                {names.weapon.map((element, index)=>
                    <div key={index}>
                        <span onClick={()=>selectToGuess('weapon', index)} > {index}. {element[0]} </span>
                        <input type="checkbox" name="" id=""/>
                        <input type="text"/>
                    </div>
                )}
            </section>
            <section>
                {names.room.map((element, index)=>
                    <div key={index} >
                        <span onClick={()=>selectToGuess('room', index)} > {index}. {element[0]} </span>
                        <input type="checkbox" name="" id=""/>
                        <input type="text"/>    
                    </div>
                )}
            </section>
        </div>
    );
}

export default Paper;
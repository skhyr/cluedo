import React from 'react';
import './Sugestia.css';
import names from '../../utils/names';

interface Props{
    type: 'character'|'weapon'|'room',
    nr: number,
    click?: any;
}


const Sugestia: React.FC<Props> = ({ nr, type, click }) =>{

    return(
        <div className="Sugestia" >
            <div className="descTop">
                {type}
            </div>
            <img src={names[type][nr][1]} />
            <div className="desc" onClick={()=>click({type, nr})}>
                {names[type][nr][0]}
            </div>
        </div>
    );
}

export default Sugestia;
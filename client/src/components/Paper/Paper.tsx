import React from 'react';
import './Paper.css';
import names from '../../utils/names';

interface Props{

}

const Paper: React.FC<Props> = ({ }) =>{



    return(
        <div className="Paper">
            <section>
                {names.character.map((element, index)=>
                    <div key={index}>
                        {index}. {element[0]}
                        <input type="checkbox" name="" id=""/>
                        <input type="text"/>    
                    </div>
                )}
            </section>
            <section>
                {names.weapon.map((element, index)=>
                    <div key={index}>
                        {index}. {element[0]}
                        <input type="checkbox" name="" id=""/>
                        <input type="text"/>
                    </div>
                )}
            </section>
            <section>
                {names.room.map((element, index)=>
                    <div key={index}>
                        {index}. {element[0]}
                        <input type="checkbox" name="" id=""/>
                        <input type="text"/>    
                    </div>
                )}
            </section>
        </div>
    );
}

export default Paper;
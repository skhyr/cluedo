import React from 'react';
import useCluedo from '../../hooks/useCluedo';
import './Sugestia.css';

import person0 from '../../images/person0.jpg';
import person1 from '../../images/person1.jpg';
import person2 from '../../images/person2.jpg';
import person3 from '../../images/person3.jpg';
import person4 from '../../images/person4.jpg';
import person5 from '../../images/person5.jpg';
import person6 from '../../images/person6.jpg';
import person7 from '../../images/person7.jpg';
import person8 from '../../images/person8.jpg';

import weapon0 from '../../images/weapon0.jpg';
import weapon1 from '../../images/weapon1.jpg';
import weapon2 from '../../images/weapon2.jpg';
import weapon3 from '../../images/weapon3.jpg';
import weapon4 from '../../images/weapon4.jpg';
import weapon5 from '../../images/weapon5.jpg';
import weapon6 from '../../images/weapon6.jpg';
import weapon7 from '../../images/weapon7.jpg';
import weapon8 from '../../images/weapon8.jpg';

import room0 from '../../images/room0.jpg';
import room1 from '../../images/room1.jpg';
import room2 from '../../images/room2.jpg';
import room3 from '../../images/room3.jpg';
import room4 from '../../images/room4.jpg';
import room5 from '../../images/room5.jpg';
import room6 from '../../images/room6.jpg';
import room7 from '../../images/room7.jpg';
import room8 from '../../images/room8.jpg';



interface Props{
    type: 'character'|'weapon'|'room',
    nr: number,
}

const names = {
    character:[
        ["Czerwonka", person0],
        ["Niebiastek", person1],
        ["Żółtaczka", person2],
        ["Zielonka", person3],
        ["Filutek", person4],
        ["White", person5],
        ["Różyczka", person6],
        ["Pomarańczka", person7],
        ["Szarak", person8],
    ],
    weapon: [
        ["Motyka", weapon0],
        ["Widły", weapon1],
        ["Strzelba", weapon2],
        ["Szabla rodowa", weapon3],
        ["Siekiera", weapon4],
        ["Kosa", weapon5],
        ["Sierp", weapon6],
        ["Barszcz sosnowskiego", weapon7],
        ["Zabijacz bydła", weapon8],
    ],
    room: [
        ["Stajnia", room0],
        ["Stodoła", room1],
        ["Letnia kuchnia", room2],
        ["Obora", room3],
        ["Kurnik", room4],
        ["Zagroda", room5],
        ["Chlew", room6],
        ["Drewutnia", room7],
        ["Gołębnik", room8]
    ]
}

const Sugestia: React.FC<Props> = ({ nr, type }) =>{



    return(
        <div className="Sugestia">
            <div className="descTop">
                {type}
            </div>
            <img src={names[type][nr][1]} />
            <div className="desc">
                {names[type][nr][0]}
            </div>
        </div>
    );
}

export default Sugestia;
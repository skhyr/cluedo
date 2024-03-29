import {useEffect, useState} from 'react';

type dataType = {
  id: string;
  players: [];
}

export default (interval: number, callback: any)=>{
    const [gameRooms, setGameRooms] = useState<dataType[]>([]);


    const fe = () =>{
      fetch('http://localhost:5000/getGames', {
            method: 'GET',
            headers: {
              "Access-Control-Allow-Origin": "*",
              'Accept': 'application/json',
            }
          }).then(async(res)=>{
            if (!res.ok) throw await res.json();
            return res.json();
          }).then((data: dataType[])=>{
              setGameRooms(data);
          }).catch(err=>{
              console.log(err);
          });
    }

    useEffect(()=>{
        fe();
        setInterval( fe,  interval );
    }, [])


    const joinGame = (id: string) =>{
        callback(id);
    }

    return({
        gameRooms,
        joinGame
    })
}
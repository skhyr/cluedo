import React, {useEffect, useState} from 'react';

export default (token: string, gameId: string)=>{

    const [joined, setJoined] = useState(false);

    useEffect(()=>{
        fetch('https://kludo.herokuapp.com/joinGame', {
          method: 'POST',
          headers: {
            "Access-Control-Allow-Origin": "*",
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'auth-token': token
          },
          body: JSON.stringify({token, gameId})
          }).then(async(res)=>{
            if (!res.ok) throw await res.json();
            return res.json();
          }).then((data)=>{
              setJoined(true);
          }).catch(err=>{
              console.log(err);
          });
    }, []);


    return {joined};
}
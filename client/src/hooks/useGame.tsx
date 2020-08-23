import React, {useEffect} from 'react';

export default ()=>{
    useEffect(()=>{
        fetch('http://localhost:5000/joinGame', {
            method: 'POST',
            headers: {
              "Access-Control-Allow-Origin": "*",
              'Accept': 'application/json',
            }
          }).then(async(res)=>{
            if (!res.ok) throw await res.json();
            return res.json();
          }).then((data)=>{
              
          }).catch(err=>{
              console.log(err);
          });
    }, [])
}
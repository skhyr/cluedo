import {useEffect, useState} from 'react';

export default ()=>{
    const [token, setToken] = useState('');

    const login = (name: string) =>{
            fetch('http://localhost:5000/getGames', {
                method: 'GET',
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    'Accept': 'application/json',
                }
            }).then(async(res)=>{
                if (!res.ok) throw await res.json();
                return res.json();
            }).then((data)=>{
                setToken(data);
            }).catch(err=>{
                console.log(err);
            });
    }
        
    return({
        token,
        login,
    });
}
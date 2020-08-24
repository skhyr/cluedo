import { useContext } from 'react';
import { MainContext } from '../contexts/MainContext';

export default ()=>{
    const { token, setToken } = useContext(MainContext);

    const login = (name: string) =>{
            fetch('http://localhost:5000/login', {
            method: 'POST',
            headers: {
                "Access-Control-Allow-Origin": "*",
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name })
            }).then(async(res)=>{
                if (!res.ok) throw await res.json();
                return res.json();
            }).then((data)=>{
                setToken(data.token);
            }).catch(err=>{
                console.log(err);
            });
    }
        
    return({
        token,
        login,
    });
}
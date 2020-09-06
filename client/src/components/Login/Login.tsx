import React from 'react';
import './Login.css';

interface Props{
    login: (name: string)=>void;
}

const Login: React.FC<Props> = ({login}) =>{

const handleSubmit = (event: React.FormEvent<HTMLFormElement>) =>{
    event.preventDefault();
    // @ts-ignore
    const v = event.target.name.value;
    if(!v || v.length === 0) return;
    login(v);
}

return(
    <div className="Login">
        <form onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="name" />
            <button>zaloguj</button>
        </form>
    </div>
)
}

export default Login;
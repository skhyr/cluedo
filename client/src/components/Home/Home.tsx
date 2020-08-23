import React, { useState } from 'react';
import {Login, Games } from '../';
import useLogin from '../../hooks/useLogin';
import {History} from 'history';

interface Props{
    history: History;
}

const Home: React.FC<Props> = ({history}) =>{

    const {token, login} = useLogin();

    return(
        <div className="Home">
            {token!=='' ? <Games token={token} history={history}/> : <Login login={login}/> }
        </div>
    )
}
export default Home;
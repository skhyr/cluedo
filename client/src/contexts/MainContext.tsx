import React, {useState, createContext, useEffect} from 'react';

interface contextType{
    token: string,
    setToken:any,
}

export const MainContext = createContext<contextType>({token: '', setToken: ()=>{}});

export const MainProvider = (props: any) => {
    const [token, setToken] = useState('');

    return(
        <MainContext.Provider value={ { token, setToken } }>
            {props.children}
        </MainContext.Provider>
    );

} ;

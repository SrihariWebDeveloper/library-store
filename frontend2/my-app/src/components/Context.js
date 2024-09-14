import { createContext, useEffect, useState } from 'react'
import { ListData } from '../assets/list.js'
import { books } from '../assets/main.js'
import axios from 'axios'

export const StoreContext = createContext(null)


const StoreContextProvider = (props) =>{

    const url = 'http://localhost:5000'

    const [token,setToken] = useState("")

    useEffect(()=>{
        if(localStorage.getItem('token')){
            setToken(localStorage.getItem('token'))
        }
    },[])

    const ContextValue ={
        ListData,
        books,
        url,
        token,
        setToken
    }
    return(
        <StoreContext.Provider value={ContextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;
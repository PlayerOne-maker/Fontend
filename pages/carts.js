import React,{useContext,useEffect} from "react";
import Router from 'next/router'

import {AuthContext} from '../appState/AultProvider'

const carts = () =>{
        const {user} = useContext(AuthContext)
    
        useEffect(() => {
            if(!user){
                Router.push('/signin', undefined, { shallow: true })
                console.log(Router)
            }
        }, [])

        
        return(
            <div>
                sd
            </div>
        )
    
}

export default carts
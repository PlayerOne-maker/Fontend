import React,{createContext, useState,useEffect} from 'react'
import Router from 'next/router'
import cookie from 'js-cookie'

export const AuthContext= createContext()

const AultProvider = ({children , userData}) => {
    const [user,setUser] = useState(userData)

    useEffect(() => {
        const syncLogout = e => {
            if(e.key === 'logout'){
                setUser(null)
                Router.push('/')
            }
        }

        window.addEventListener('storage' , syncLogout)

        return () => {
            window.removeEventListener('storage',syncLogout)
            window.localStorage.removeItem('logout')
        }
    },[])

    

    const setAuthUser = userInfo => setUser(userInfo)

    useEffect(() => {
        const syncLogin = e => {
            if(e.key === 'login'){
                setUser(user)
                Router.push('/products')
            }
        }

        window.addEventListener('storage' , syncLogin)

        return () => {
            window.removeEventListener('storage',syncLogin)
            window.localStorage.removeItem('login')
        }
    },[])

    const signout = () => {
        cookie.remove('jwt')
        setUser(null)
        localStorage.setItem('logout',Date.now())
        Router.push('/')
    }

    return (
        <AuthContext.Provider value={{user,setAuthUser,signout}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AultProvider

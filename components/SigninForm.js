import React, { useState,useContext } from 'react'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import Cookie from 'js-cookie'
import Router from 'next/router'
import {AuthContext} from "../appState/AultProvider"

const Login = gql`
mutation MUTATION_USER($email:String!,$password:String!) {
    login(
        email:$email,
        password:$password){
        user{
            name
            email
            carts{
              id
              product{
                  description
                price
                imageUrl
              }
              quantity
            }
            products{
              id
            }
          }
          jwt
    }
  }
`

function SigninForm() {
    //ต้องตรงกับ name ของ input
    const [UserInfo, setUserInfo] = useState({
        email: "",
        password: ""
    })

    const hadleChange = e => {
        setUserInfo({
            ...UserInfo,
            [e.target.name]: e.target.value
        })
    }

    const {setAuthUser} = useContext(AuthContext)
    
    
    const [login,{loading,error}] = useMutation(Login, 
        { variables: { ...UserInfo } ,
        onCompleted: data => {
            localStorage.setItem('login',Date.now())
            setAuthUser(data.login.user)  
              
            Cookie.set("jwt",data.login.jwt)
            setUserInfo({
                email: "",
                password: ""
            })
            
            Router.push('/products')
        }
    })

    const handleSubmit = async e =>{
        try{
            e.preventDefault()
            await login()
            
        }catch(error){
            console.log(error)
        }
    }

    

    return (
        <div style={{
            margin: '100px'
        }}>
            <form style={{
                display: 'flex',
                flexDirection: 'column',
                magin: 'auto',
                width: '30%'
            }} onSubmit={handleSubmit} >
                email <input type="text" name="email" onChange={hadleChange} value={UserInfo.email} />
                password <input type="password" name="password" onChange={hadleChange} value={UserInfo.password} />
                <button type="submit" disabled={loading}>Submit</button>
            </form>
            <div>
                
                <p>Forgot password ?  <span onClick={() => Router.push('/signin/requestresetpassword')}>Click here</span></p>
            </div>
            <div>
                
                {error && <p style={{
                    color:"red"
                }}>{error.graphQLErrors[0].message}</p>}
            </div>
        </div>
    )
}

export default SigninForm

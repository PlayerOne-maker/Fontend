import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import Link from 'next/link'

const MUTATION_USER = gql`
mutation MUTATION_USER($name:String!,$email:String!,$password:String!) {
    signup(
      name: $name
      email: $email
      password: $password
    ){
      id
      name
      email
      password
      createdAt
    }
  }
`
//Query return เป็น object
//Mutation return เป็น Arry


const SignupForm = () => {
    //ต้องตรงกับ name ของ input
    const [UserInfo, setUserInfo] = useState({
        name: "",
        email: "",
        password: ""
    })

    const hadleChange = e => {
        setUserInfo({
            ...UserInfo,
            [e.target.name]: e.target.value
        })
    }

    const [success,setSuccess] = useState(false)
    const handleSubmit = async e =>{
        try{
            e.preventDefault()
            await signup()
        }catch(error){
            console.log(error)
        }
    }

    const [signup,{loading,error}] = useMutation(MUTATION_USER, { variables: { ...UserInfo } ,
        onCompleted: data => {
            setSuccess(true)
            setUserInfo({
                name: "",
                email: "",
                password: ""
            })
        }
    })

    console.log(UserInfo)
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
                name <input type="text" name="name" onChange={hadleChange} value={UserInfo.name} />
                email <input type="text" name="email" onChange={hadleChange} value={UserInfo.email} />
                password <input type="password" name="password" onChange={hadleChange} value={UserInfo.password} />
                <button type="submit" disabled={loading}>Submit</button>
            </form>
            <div>
                {success && <p>Risgister is success.</p>}
                {error && <p style={{
                    color:"red"
                }}>{error.graphQLErrors[0].message}</p>}
            </div>
        </div>
    )
}

export default SignupForm

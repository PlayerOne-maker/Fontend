import React, { useState, useContext } from 'react'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'

const RESET_PASSOWRD = gql`
mutation RESET_PASSOWRD($email:String!) {
        requsetResetPassword(email:$email){
          massage
        }
      }
`

const requestresetpassword = () => {

    const [email, setEmail] = useState('')

    const [massage, setmassage] = useState('')

    const [requsetResetPassword, { loading, error }] = useMutation(RESET_PASSOWRD
        , {
            variables: { email },
            onCompleted: data => {
                if (data) {
                    setmassage(data.requsetResetPassword.massage)
                }
            }
        })

    const hadleChange = e => {
        setEmail(e.target.value)
    }

    const handleSubmit = async e => {
        try {
            e.preventDefault()
            await requsetResetPassword()
            massage = {
                show: false,
              }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div style={{
            margin: '100px'
        }}>
            {!massage && 
            <form style={{
                display: 'flex',
                flexDirection: 'column',
                magin: 'auto',
                width: '30%'
            }} onSubmit={handleSubmit} >
                email <input type="text" name="email" onChange={hadleChange}
                    value={email}
                />
                <button type="submit"
                    disabled={loading}
                >Submit</button>
            </form>
            }
            <div>
                {massage && <p style={{
                    color: "green"
                }}>{massage}</p>}
            </div>
            <div>

                {error && <p style={{
                    color: "red"
                }}>{error.graphQLErrors[0].message}</p>}
            </div>
        </div>
    )
}

export default requestresetpassword

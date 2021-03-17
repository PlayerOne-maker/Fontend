import apolloClient from '../apollo/apolloClient'
import SignupForm from '../components/SignupForm'
import React from 'react'

const Signup = () => {
    
        return(
            <div>
                <SignupForm />
            </div>
        )
    
}

export default apolloClient(Signup)
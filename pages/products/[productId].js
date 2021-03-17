import React from 'react'
import {useRouter} from 'next/router'
import {useQuery} from "@apollo/react-hooks"
import gql from 'graphql-tag'
import apolloClient from '../../apollo/apolloClient'


const QUERY_PRODUCT = gql `
query QUERY_PRODUCT($id :ID!){
    product(id:$id)  {
      id
      description
      price
      imageUrl
      user{
        id
        name
      }
    }
  }
  `
const Product = () => {
    const route = useRouter()
    
    const {data,loading,error} = useQuery(QUERY_PRODUCT , {
        variables: {id: route.query.productId}
    })

    if (error) return <p>Somding went wrong</p>

    if (loading) return <p>Loading ....</p>

    return (
        <div 
        style={{
            display:"flex",
            flexDirection: "column",
            alignItems:'center',
            marginTop: '20px'
        }}
        >
           <img src={data.product.imageUrl} alt={data.product.description} width="200"></img>
           <h1>{data.product.description}</h1>
           <h2>{data.product.price}</h2>
           <button>Add to Cart</button>
           <hr />
           Owner {data.product.user.name}
        </div>
    )
}

export default apolloClient(Product)

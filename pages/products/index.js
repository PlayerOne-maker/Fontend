import React,{ Component } from "react";
import Link from "next/link"
import {useQuery} from "@apollo/react-hooks"
import gql from 'graphql-tag'
import apolloClient from '../../apollo/apolloClient'

const QUERY_PRODUCTS = gql`
  query {
    products {
      id
      description
      price
      imageUrl
    }
  }
`

const Products = () => {
   
        const {data,loading,error} = useQuery(QUERY_PRODUCTS,{
            pollInterval: 500})
        
        if(error) return <p>Ooobs.... someting wrong, Please try again.</p>

        if(loading) return <p>Loading ..........</p>

        

        return(
            <div style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gridGap : '10px',
                marginTop: '20px',
                padding: '10px'
            }}>
                
                {data.products.map(product => (
                <div style={{
                    display: "flex",
                    flexDirection: 'column',
                    marginBottom : '20px', 
                    border: 'solid 1px black', 
                    alignItems: 'center'
                }}
                key={product.id}>
                    <Link href="/products/[productId]" as={`/products/${product.id}`}> 
                    <a>
                        <img src={product.imageUrl} alt={product.description} width='250px'></img>
                    
                    </a>
                    </Link>
                   <h3> ชื่อ {product.description}</h3>
                   <h4> ราคา {product.price} </h4>
                    <button
                    style={{
                        background: "green",
                        color: "white",
                        padding: '10px',
                        cursor: 'pointer',
                        border: 'none'
                    }}
                    >Add to Cart</button>
                </div>
                ))}
            </div>
        )
    }


export default apolloClient(Products)
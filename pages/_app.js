import React from "react"
import Head from "next/head"
import Header from "../components/Header"
import Footer from "../components/Footer"
import Nav from "../components/Nav"
import AuthProvider from "../appState/AultProvider"
import { ApolloProvider } from "@apollo/react-hooks"
import apolloClient from "../apollo/apolloClient"
import fetch from 'isomorphic-unfetch'
import cookie from 'cookie'

const QUERY_USER = {
  query: `
  query{
    user{
      id
      name
      email
      carts{
        id
        quantity
        product{
          description
          price
          imageUrl
        }
      }
      products{
        id
      }
    }
  }`
}

function MyApp({ Component, pageProps, apollo ,user }) {
  return (
    <ApolloProvider client={apollo}>
      <AuthProvider userData={user}>
        <Head>
          <title>IT Crezy</title>
        </Head>
        <Header />
        <Nav />
        <Component {...pageProps} />
        <Footer />
      </AuthProvider>
    </ApolloProvider>
  )

}

MyApp.getInitialProps = async ({ ctx, router }) => {
  if (process.browser) {
    return __NEXT_DATA__.props.pageProps
  }

  // console.log("Router -->", router)

  const { headers } = ctx.req
  
  const cookies = headers && cookie.parse(headers.cookie || "")

  const token = cookies && cookies.jwt

  if (!token) {
    if (router.pathname === "/carts" ) {
      ctx.res.writeHead(302, { Location: "/signin" })
      ctx.res.end()
    }
    return null
  }

  const response = await fetch("http://localhost:3001/graphql", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}` || ""
    },
    body: JSON.stringify(QUERY_USER)
  })

  if (response.ok) {
    const result = await response.json()
    return { user: result.data.user }
  } else {
    if (router.pathname === "/carts") {
      ctx.res.writeHead(302, { Location: "/signin" })
      ctx.res.end()
    }
    return null
  }
  // calls page's `getInitialProps` and fills `appProps.pageProps`
}


export default apolloClient(MyApp)

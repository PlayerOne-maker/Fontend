import { Component } from "react"
import Head from "next/head"
import Header from "../components/Header"
import Footer from "../components/Footer"
import Nav from "../components/Nav"

// import apolloClient from "../apollo/apolloClient"

class MyApp extends Component{
  
  render(){
    const { Component, pageProps , apollo} = this.props
    return(
     <>
        <Head>
            <title>IT Crezy</title>
        </Head>
        <Header />
        <Nav />
        <Component {...pageProps} />
        <Footer />
     </>
    )
  }
}


export default MyApp

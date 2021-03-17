import react, { Component } from "react"
import Link from "next/link"

class Nav extends Component{

    render(){

        const aStyle ={
            color: 'white',
            fontsize: '23px',
            fontWeight: 'bold',
            textDecoration: 'none'
        }
        return(
            <>
                <div>
                    <nav style={
                        {
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: "center",
                            height:"40px",
                            background: "gray"
                        }
                    }>
                        <ul style={{
                            display: 'flex',
                            justifyContent: 'space-around',
                            alignItems:"center",
                            width: '70%'
                        }} >
                            <li style={{
                                listStyle: "none"
                            }}>
                                <Link href="/">
                                    <a style={aStyle}>Home</a></Link>
                            </li>
                            <li style={{
                                listStyle: "none"
                            }}>
                                <Link href="/products">
                                <a style={aStyle}>Product</a>
                                </Link>
                            </li>
                            <li style={{
                                listStyle: "none"
                            }}>
                                <Link href="/carts">
                                <a style={aStyle}>Carts</a>
                                </Link>
                            </li>
                            <li style={{
                                listStyle: "none"
                            }}>
                                <Link href="/signup">
                                <a style={aStyle}>Signup</a>
                                </Link>
                            </li>
                            <li style={{
                                listStyle: "none"
                            }}>
                                <Link href="/signin">
                                <a style={aStyle}>SignIn</a>
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </>
        )
    }

}

export default Nav
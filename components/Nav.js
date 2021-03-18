import react, { Component, useContext } from "react"
import Link from "next/link"
import { AuthContext } from "../appState/AultProvider"

const Nav = () => {

    const aStyle = {
        color: 'white',
        fontsize: '23px',
        fontWeight: 'bold',
        textDecoration: 'none'
    }

    const { user,signout } = useContext(AuthContext)

    

    return (
        <>
            <div>
                <nav style={
                    {
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: "center",
                        height: "40px",
                        background: "gray"
                    }
                }>
                    <ul style={{
                        display: 'flex',
                        justifyContent: 'space-around',
                        alignItems: "center",
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
                        {user && (
                            <>
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
                                <button onClick={signout} style={{
                                    background: 'gray',
                                    fontsize: '18px',
                                    padding: '10px',
                                    color: 'white',
                                    border: 'none',
                                    cursor: 'pointer'
                                }}>SignOut</button>
                                </li>
                            </>
                        )}
                        {!user && <>
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
                        </>}
                    </ul>
                </nav>
            </div>
        </>
    )


}

export default Nav
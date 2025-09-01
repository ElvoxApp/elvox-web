import React from "react"
import { Link } from "react-router-dom"

const Dashboard = () => {
    return (
        <div className=''>
            <h1 className='text-8xl font-black text-center'>Elvox</h1>
            <Link to='/login'>Login</Link>
            <br />
            <br />
            <Link to='/signup'>Sign Up</Link>
        </div>
    )
}

export default Dashboard

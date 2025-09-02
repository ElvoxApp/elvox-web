import React from "react"
import Logo from "../components/Logo"
import Title from "../components/Title"
import Button from "../components/Button"
import { Link } from "react-router-dom"

const Login = () => {
    const handleClick = (e) => {
        e.preventDefault()
    }
    return (
        <div className='flex flex-col items-center justify-center gap-10 min-h-dvh h-dvh w-full relative bg-bg-dark'>
            <div className=''>
                <Logo
                    width={150}
                    height={150}
                />
            </div>
            <div className='w-11/12 h-[80%] min-h-[450px] max-h-[600px] bg-card rounded-xl shadow-lg flex flex-col items-center gap-10 p-10'>
                <Title
                    title='Login'
                    className='text-3xl '
                />
                <form className='flex flex-col gap-6 w-82 text-sm my-auto mb-20'>
                    <div className='flex flex-col gap-2'>
                        <label
                            htmlFor='eop'
                            className='text-primary'
                        >
                            Email or Phone
                        </label>
                        <input
                            type='text'
                            id='eop'
                            className='outline-none border-none bg-field rounded-md w-full h-11 p-3 text-primary placeholder:text-secondary'
                            placeholder='Enter your email or phone'
                        />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label
                            htmlFor='pass'
                            className='text-primary'
                        >
                            Password
                        </label>
                        <input
                            type='password'
                            id='pass'
                            className='outline-none border-none bg-field rounded-md w-full h-11 p-3 text-primary placeholder:text-secondary'
                            placeholder='Enter your password'
                        />
                    </div>
                    <div className='pt-2'>
                        <Button
                            text='Login'
                            className='w-full h-11 text-sm cursor-pointer'
                            onClick={handleClick}
                        />
                    </div>
                    <div className='flex items-center justify-between text-[#6950ab]'>
                        <Link to='/signup'>
                            Don't have an account?
                            <br />
                            Sign Up
                        </Link>
                        <Link to='#'>
                            Forgot
                            <br />
                            password?
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login

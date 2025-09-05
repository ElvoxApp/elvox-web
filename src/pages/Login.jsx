import { useEffect } from "react"
import { Link } from "react-router-dom"
import Logo from "../components/Logo"
import Title from "../components/Title"
import Button from "../components/Button"

const Login = () => {
    useEffect(() => {
        document.title = "Login"
    }, [])

    const handleClick = (e) => {
        e.preventDefault()
    }
    /*
flex flex-col items-center justify-center gap-10
*/
    return (
        <div className='grid grid-rows-[auto_1fr] min-h-dvh h-dvh w-full relative bg-bg-dark py-14'>
            <div className='justify-self-center'>
                <Logo
                    width={150}
                    height={150}
                />
            </div>
            <div className='w-11/12 md:w-9/12 lg:w-7/12 xl:w-5/12 2xl:w-4/12 h-[80%] min-h-[450px] max-h-[600px] bg-card rounded-xl shadow-lg flex flex-col items-center gap-10 p-10 place-self-center'>
                <Title
                    title='Login'
                    className='text-3xl '
                />
                <form className='flex flex-col gap-6 w-full text-sm 2xl:text- my-auto mb-20'>
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
                            className='outline-none border-none bg-field rounded-md w-full h-11 p-3 text-primary placeholder:text-secondary focus:border-accent focus:ring-2 focus:ring-accent'
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
                            className='outline-none border-none bg-field rounded-md w-full h-11 p-3 text-primary placeholder:text-secondary focus:border-accent focus:ring-2 focus:ring-accent'
                            placeholder='Enter your password'
                        />
                    </div>
                    <div className='pt-2'>
                        <Button
                            text='Login'
                            className='w-full h-11 text-sm'
                            onClick={handleClick}
                        />
                    </div>
                    <div className='flex items-center justify-between text-link'>
                        <Link
                            to='/signup'
                            className='hover:text-link-hover'
                        >
                            Don't have an account?
                            <br />
                            Sign Up
                        </Link>
                        <Link
                            to='#'
                            className='hover:text-link-hover'
                        >
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

import { useEffect, useState } from "react"
import Logo from "../components/Logo"
import Title from "../components/Title"
import LoginForm from "../components/LoginForm"
import FullScreenLoader from "../components/FullScreenLoader"
import { useAuthStore } from "../stores"
import { useNavigate } from "react-router-dom"

const Login = () => {
    const [isLoading, setIsLoading] = useState(false)
    const { isAuthenticated } = useAuthStore()
    const navigate = useNavigate()

    useEffect(() => {
        if (isAuthenticated) navigate("/")
    }, [isAuthenticated, navigate])

    return (
        <>
            <div className='flex flex-col justify-center gap-10 items-center min-h-dvh w-full relative bg-bg-light dark:bg-bg-dark py-3'>
                <title>Login</title>
                <div className=''>
                    <Logo
                        width={150}
                        height={150}
                    />
                </div>
                <div className='w-11/12 md:w-9/12 lg:w-7/12 xl:w-5/12 2xl:w-4/12 bg-card-light dark:bg-card-dark rounded-xl shadow-lg flex flex-col items-center gap-10 px-10 py-11'>
                    <Title
                        title='Login'
                        className='text-3xl '
                    />
                    <LoginForm setIsLoading={setIsLoading} />
                </div>
            </div>
            {isLoading && <FullScreenLoader />}
        </>
    )
}

export default Login

import { useEffect, useState } from "react"
import Logo from "../components/Logo"
import Title from "../components/Title"
import LoginForm from "../components/LoginForm"
import FullScreenLoader from "../components/FullScreenLoader"

const Login = () => {
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        document.title = "Login"
    }, [])

    return (
        <>
            <div className='flex flex-col justify-center gap-10 items-center h-dvh w-full relative bg-bg-dark py-14'>
                <div className=''>
                    <Logo
                        width={150}
                        height={150}
                    />
                </div>
                <div className='w-11/12 md:w-9/12 lg:w-7/12 xl:w-5/12 2xl:w-4/12 bg-card rounded-xl shadow-lg flex flex-col items-center gap-10 p-10'>
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

import { Navigate, Outlet, useLocation } from "react-router-dom"
import FullScreenLoader from "../components/FullScreenLoader"
import { useAuthStore } from "../stores"
import Header from "../components/Header"

const ProtectedRoute = () => {
    const { isAuthenticated, isUserLoaded } = useAuthStore()
    const { pathname } = useLocation()

    if (!isUserLoaded ) return <FullScreenLoader />

    if (!isAuthenticated)
        return (
            <Navigate
                to='/login'
                replace
            />
        )

    const titles = {
        "/": "Dashboard",
        "/candidate-application": "Candidate Application"
    }

    return (
        <div className='min-h-dvh w-full bg-bg-light dark:bg-bg-dark py-3 transition-all duration-100 flex flex-col'>
            <div className='flex flex-col py-3 px-4 flex-1'>
                <Header title={titles[pathname]} />
                <div className='max-w-[1600px] mx-auto w-full flex flex-col flex-1'>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default ProtectedRoute

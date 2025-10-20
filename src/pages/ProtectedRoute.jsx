import { Navigate, Outlet, useLocation } from "react-router-dom"
import FullScreenLoader from "../components/FullScreenLoader"
import { useAuthStore } from "../stores"
import Header from "../components/Header"

const ProtectedRoute = () => {
    const { isAuthenticated, hasHydrated } = useAuthStore()
    const { pathname } = useLocation()

    if (!hasHydrated) return <FullScreenLoader />

    if (!isAuthenticated)
        return (
            <Navigate
                to='/login'
                replace
            />
        )

    const titles = {
        "/": "Dashboard"
    }

    return (
        <div className='min-h-dvh w-full bg-bg-light dark:bg-bg-dark py-3 transition-all duration-100'>
            <div className='flex flex-col py-3 px-4'>
                <Header title={titles[pathname]} />
                <div className='max-w-[1600px] mx-auto w-full'>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default ProtectedRoute

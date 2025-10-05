import { Navigate, Outlet } from "react-router-dom"
import FullScreenLoader from "../components/FullScreenLoader"
import { useAuthStore } from "../stores"

const ProtectedRoute = () => {
    const { isAuthenticated, hasHydrated } = useAuthStore()

    if (!hasHydrated) return <FullScreenLoader />

    if (!isAuthenticated)
        return (
            <Navigate
                to='/login'
                replace
            />
        )

    return (
        <div className='min-h-dvh w-full bg-bg-light dark:bg-bg-dark py-3 transition-all duration-100'>
            <Outlet />
        </div>
    )
}

export default ProtectedRoute

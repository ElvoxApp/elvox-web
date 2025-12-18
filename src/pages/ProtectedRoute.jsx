import { Navigate, Outlet, useLocation, useMatches } from "react-router-dom"
import { useAuthStore } from "../stores"
import Header from "../components/Header"
import ChangePasswordModal from "../components/ChangePasswordModal"
import { useState } from "react"

const ProtectedRoute = () => {
    const [showChangePasswordModal, setShowChangePasswordModal] =
        useState(false)

    const { isAuthenticated, isUserLoaded, user } = useAuthStore()
    const { pathname } = useLocation()

    const matches = useMatches()
    const current = matches[matches.length - 1]

    const allowedRoles = current?.handle?.allowed

    if (!isUserLoaded) return <FullScreenLoader />

    if (!isAuthenticated)
        return (
            <Navigate
                to='/login'
                replace
            />
        )

    const titles = {
        "/": "Dashboard",
        "/candidate-application": "Candidate Application",
        "/candidates": "Candidates"
    }

    return (
        <div className='min-h-dvh w-full bg-bg-light dark:bg-bg-dark py-3 transition-all duration-100 flex flex-col'>
            {!allowedRoles || allowedRoles.includes(user.role) ? (
                <div className='flex flex-col py-3 px-4 flex-1'>
                    <Header
                        title={titles[pathname]}
                        setShowChangePasswordModal={setShowChangePasswordModal}
                    />
                    <div className='max-w-[1600px] mx-auto w-full flex flex-col flex-1'>
                        <Outlet />
                    </div>
                    <ChangePasswordModal
                        isOpen={showChangePasswordModal}
                        setIsOpen={setShowChangePasswordModal}
                    />
                </div>
            ) : (
                <Navigate
                    to='/unauthorized'
                    replace
                />
            )}
        </div>
    )
}

export default ProtectedRoute

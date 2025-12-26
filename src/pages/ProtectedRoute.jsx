import { Navigate, Outlet, useLocation, useMatches } from "react-router-dom"
import { useAuthStore, useElectionStore } from "../stores"
import Header from "../components/Header"
import ChangePasswordModal from "../components/ChangePasswordModal"
import { useEffect, useState } from "react"
import FullScreenLoader from "../components/FullScreenLoader"
import toast from "react-hot-toast"
import api from "../api/api"

const ProtectedRoute = () => {
    const [showChangePasswordModal, setShowChangePasswordModal] =
        useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [electionsLoaded, setElectionsLoaded] = useState(false)

    const { isAuthenticated, isUserLoaded, user } = useAuthStore()
    const { pathname } = useLocation()

    const matches = useMatches()
    const current = matches[matches.length - 1]

    const allowedRoles = current?.handle?.allowed

    const titles = {
        "/": "Dashboard",
        "/candidate-application": "Candidate Application",
        "/candidates": "Candidates",
        "/profile": "Profile",
        "/notifications": "Notifications"
    }

    const { elections, setElections } = useElectionStore()

    const isElectionScheduled = elections.length > 0

    useEffect(() => {
        const fetchElection = async () => {
            try {
                setIsLoading(true)
                const res = await api.get("/elections")
                setElections(res.data)
            } catch (err) {
                toast.error(
                    err?.response?.data?.error || "Something went wrong!",
                    { id: "elections-fetch-error" }
                )
            } finally {
                setIsLoading(false)
                setElectionsLoaded(true)
            }
        }

        if (!isElectionScheduled) fetchElection()
    }, [setIsLoading, isElectionScheduled, setElections])

    const isAllowedWhenInactive = (pathname) =>
        pathname === "/" || pathname.startsWith("/results")

    if (!isUserLoaded) return <FullScreenLoader />

    if (!isAuthenticated)
        return (
            <Navigate
                to='/login'
                replace
            />
        )

    if (
        !isElectionScheduled &&
        !isAllowedWhenInactive(pathname) &&
        electionsLoaded
    ) {
        return (
            <Navigate
                to='/'
                replace
            />
        )
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
                        <Outlet context={{ isLoading, setIsLoading }} />
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
            {isLoading && <FullScreenLoader />}
        </div>
    )
}

export default ProtectedRoute

import { Navigate, Outlet, useLocation, useMatches } from "react-router-dom"
import { useAuthStore, useElectionStore, useNotificationStore } from "../stores"
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
    const [electionLoaded, setElectionLoaded] = useState(false)
    const [checkedIfSupervisor, setCheckedIfSupervisor] = useState(false)

    const { isAuthenticated, isUserLoaded, user, setRole } = useAuthStore()
    const { pathname } = useLocation()

    const matches = useMatches()
    const current = matches[matches.length - 1]

    const allowedRoles = current?.handle?.allowed

    const getTitle = (pathname) => {
        if (pathname.startsWith("/appeals/")) return "Appeal"

        const titles = {
            "/": "Dashboard",
            "/candidate-application": "Candidate Application",
            "/candidates": "Candidates",
            "/profile": "Profile",
            "/notifications": "Notifications",
            "/appeals": "Appeals",
            "/results": "Results",
            "/verify-voter": "Verify Voter",
            "/approve-applications": "Approve Applications",
            "/choose-supervisors": "Choose Supervisors"
        }

        return titles[pathname]
    }

    const { election, setElection } = useElectionStore()
    const { setNotifications } = useNotificationStore()

    const isElectionScheduled = Object.keys(election).length > 0

    useEffect(() => {
        const fetchElection = async () => {
            try {
                setIsLoading(true)
                const res = await api.get("/elections")
                setElection(res.data)
            } catch (err) {
                toast.error(
                    err?.response?.data?.error || "Something went wrong!",
                    { id: "election-fetch-error" }
                )
            } finally {
                setIsLoading(false)
                setElectionLoaded(true)
            }
        }

        if (!isElectionScheduled) fetchElection()
    }, [setIsLoading, isElectionScheduled, setElection])

    useEffect(() => {
        const checkIfSupervisor = async () => {
            try {
                setIsLoading(true)
                const res = await api.get(
                    `/auth/me/check-role?election=${election.id}`
                )
                if (res.data.isSupervisor) setRole(res.data.effectiveRole)
            } catch (err) {
                toast.error(
                    err?.response?.data?.error || "Something went wrong!",
                    { id: "role-fetch-error" }
                )
            } finally {
                setCheckedIfSupervisor(true)
                setIsLoading(false)
            }
        }

        if (election.id) checkIfSupervisor()
    }, [election.id, setRole])

    useEffect(() => {
        const fetchNotificaions = async () => {
            try {
                const res = await api.get("/notifications")
                setNotifications(res.data)
            } catch (err) {
                toast.error(
                    err?.response?.data?.error || "Something went wrong!",
                    { id: "notifications-fetch-error" }
                )
            }
        }

        fetchNotificaions()
    }, [setNotifications])

    const isAllowedWhenInactive = (pathname) =>
        pathname === "/" || pathname.startsWith("/results")

    // CHECK IF THE USER HAVE AUTHORIZATION TO ACCESS THE PAGE
    const isUserAuthorized =
        !allowedRoles ||
        allowedRoles.includes(user?.role) ||
        (allowedRoles.includes("tutor") && user?.tutor_of !== null)

    if (
        !isUserLoaded ||
        !electionLoaded ||
        (electionLoaded && election.id && !checkedIfSupervisor)
    )
        return <FullScreenLoader />

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
        electionLoaded
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
            {isUserAuthorized ? (
                <div className='flex flex-col py-3 px-4 flex-1 min-h-0'>
                    <Header
                        title={getTitle(pathname)}
                        setShowChangePasswordModal={setShowChangePasswordModal}
                    />
                    <div className='max-w-[1600px] mx-auto w-full flex flex-col flex-1 min-h-0'>
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

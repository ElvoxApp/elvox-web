import ElectionDetails from "../components/ElectionDetails"
import DashboardOptionsStudent from "../components/DashboardOptionsStudent"
import DashboardOptionsTeacher from "../components/DashboardOptionsTeacher"
import NotificationAndResults from "../components/NotificationAndResults"
import DashboardOptionsSupervisor from "../components/DashboardOptionsSupervisor"
import DashboardOptionsAdmin from "../components/DashboardOptionsAdmin"
import { useAuthStore, useElectionStore } from "../stores"
import NoActiveElection from "../components/NoActiveElection"
import { useEffect } from "react"
import { useOutletContext } from "react-router-dom"
import api from "../api/api"
import toast from "react-hot-toast"

const Dashboard = () => {
    const {
        user: { role }
    } = useAuthStore()

    const { isLoading, setIsLoading } = useOutletContext()

    const dashboardOptions = {
        student: DashboardOptionsStudent,
        teacher: DashboardOptionsTeacher,
        supervisor: DashboardOptionsSupervisor,
        admin: DashboardOptionsAdmin
    }

    const DashboardOptions = dashboardOptions[role]

    const { election, setElection } = useElectionStore()

    const isElectionSheduled = election.length > 0

    useEffect(() => {
        const fetchElection = async () => {
            try {
                setIsLoading(true)
                const res = await api.get("/elections")
                setElection(res.data)
            } catch (err) {
                toast.error(
                    err?.response?.data?.error || "Something went wrong!"
                )
            } finally {
                setIsLoading(false)
            }
        }

        if (!isElectionSheduled) fetchElection()
    }, [setIsLoading, isElectionSheduled, setElection])

    return (
        <div className='flex flex-col px-3 py-5 sm:px-6 sm:py-6 flex-1'>
            <title>Dashboard</title>
            {!isLoading && (
                <div
                    className={`flex flex-col sm:py-4 sm:px-7 text-sm justify-evenly flex-1 ${
                        isElectionSheduled ? "gap-6" : "gap-10"
                    }`}
                >
                    {isElectionSheduled ? (
                        <>
                            <ElectionDetails />
                            <DashboardOptions />
                        </>
                    ) : (
                        <div className='flex justify-center'>
                            <NoActiveElection />
                        </div>
                    )}
                    <NotificationAndResults />
                </div>
            )}
        </div>
    )
}

export default Dashboard

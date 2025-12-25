import ElectionDetails from "../components/ElectionDetails"
import DashboardOptionsStudent from "../components/DashboardOptionsStudent"
import DashboardOptionsTeacher from "../components/DashboardOptionsTeacher"
import NotificationAndResults from "../components/NotificationAndResults"
import DashboardOptionsSupervisor from "../components/DashboardOptionsSupervisor"
import DashboardOptionsAdmin from "../components/DashboardOptionsAdmin"
import { useAuthStore, useElectionStore } from "../stores"
import NoActiveElection from "../components/NoActiveElection"
import { useOutletContext } from "react-router-dom"

const Dashboard = () => {
    const {
        user: { role }
    } = useAuthStore()

    const { isLoading } = useOutletContext()

    const dashboardOptions = {
        student: DashboardOptionsStudent,
        teacher: DashboardOptionsTeacher,
        supervisor: DashboardOptionsSupervisor,
        admin: DashboardOptionsAdmin
    }

    const DashboardOptions = dashboardOptions[role]

    const { elections } = useElectionStore()

    const isElectionScheduled = elections.length > 0

    return (
        <div className='flex flex-col px-2 py-5 flex-1'>
            <title>Dashboard</title>
            {!isLoading && (
                <div
                    className={`flex flex-col sm:py-4 md:px-3 lg:px-7 text-sm justify-evenly flex-1 ${
                        isElectionScheduled ? "gap-6" : "gap-10"
                    }`}
                >
                    {isElectionScheduled ? (
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

import ElectionDetails from "../components/ElectionDetails"
import DashboardOptionsStudent from "../components/DashboardOptionsStudent"
import DashboardOptionsTeacher from "../components/DashboardOptionsTeacher"
import NotificationAndResults from "../components/NotificationAndResults"
import DashboardOptionsSupervisor from "../components/DashboardOptionsSupervisor"
import DashboardOptionsAdmin from "../components/DashboardOptionsAdmin"
import { useAuthStore, useElectionStore } from "../stores"
import NoActiveElection from "../components/NoActiveElection"

const Dashboard = () => {
    const {
        user: { role }
    } = useAuthStore()

    const dashboardOptions = {
        student: DashboardOptionsStudent,
        teacher: DashboardOptionsTeacher,
        supervisor: DashboardOptionsSupervisor,
        admin: DashboardOptionsAdmin
    }

    const DashboardOptions = dashboardOptions[role]

    const { electionDetails } = useElectionStore()

    const isElectionSheduled = Object.keys(electionDetails).length > 0

    return (
        <div className='flex flex-col px-3 py-5 sm:px-6 sm:py-6 flex-1'>
            <title>Dashboard</title>
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
                    <NoActiveElection />
                )}
                <NotificationAndResults />
            </div>
        </div>
    )
}

export default Dashboard

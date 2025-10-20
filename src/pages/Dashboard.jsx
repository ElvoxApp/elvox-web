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
        <div className='flex flex-col px-3 py-5 sm:px-6 sm:py-6 justify-center '>
            <title>Dashboard</title>
            <h1 className='text-2xl font-semibold max-sm:hidden text-left text-primary-light dark:text-primary-dark'>
                Dashboard
            </h1>
            <div className='flex flex-col gap-6 sm:py-4 sm:px-7 text-sm'>
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

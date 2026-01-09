import Button from "./Button"
import { useAuthStore, useElectionStore } from "../stores"
import toast from "react-hot-toast"

const NoCandidateApplication = ({
    setIsCandidateApplicationOpen,
    showSubmitApplicationButton
}) => {
    const { user } = useAuthStore()
    const { election } = useElectionStore()

    const handleClick = () => {
        if (user?.backlogs && Number(user?.attendance) < 75) {
            toast.error(
                "You’re not eligible to apply due to active backlogs and attendance below 75%",
                { duration: 3000, id: "candidate-application-eligibility" }
            )
        } else if (user?.backlogs) {
            toast.error("You’re not eligible to apply due to active backlogs", {
                duration: 3000,
                id: "candidate-application-backlogs"
            })
        } else if (Number(user?.attendance) < 75) {
            toast.error(
                "You’re not eligible to apply due to attendance below 75%.",
                { duration: 3000, id: "candidate-application-attendance" }
            )
        } else {
            setIsCandidateApplicationOpen(true)
        }
    }

    return (
        <div className='flex flex-col px-3 py-4 gap-8 flex-1 justify-center'>
            <div className='flex justify-center'>
                <h2 className='text-center text-primary-light dark:text-primary-dark text-2xl md:text-3xl lg:text-4xl font-black'>
                    {showSubmitApplicationButton.status === "withdrawn"
                        ? "You Have Withdrawn Your Candidate Application"
                        : election.status === "nominations"
                        ? "No Candidate Application Submitted"
                        : "Nominations are not currently open. You cannot submit an application at this time"}
                </h2>
            </div>
            {user?.role === "student" && showSubmitApplicationButton.show && (
                <div className='flex justify-center items-center'>
                    <Button
                        text='Submit Application'
                        className='px-6 py-3 text-sm font-medium bg-accent hover:bg-button-hover'
                        onClick={handleClick}
                    />
                </div>
            )}
        </div>
    )
}

export default NoCandidateApplication

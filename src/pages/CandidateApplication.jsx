import { useState } from "react"
import CancelConfirm from "../components/CancelConfirm"
import NoCandidateApplication from "../components/NoCandidateApplication"
import CandidateApplicationForm from "../components/CandidateApplicationForm"

const CandidateApplication = () => {
    const [isCandidateApplicationOpen, setIsCandidateApplicationOpen] =
        useState(false)
    const [isCancelConfirmOpen, setIsCancelConfirmOpen] = useState(false)

    return (
        <div className='flex flex-col px-3 py-5 sm:px-6 sm:py-6 flex-1'>
            <title>Candidate Application</title>
            <h1 className='text-2xl font-semibold max-sm:hidden text-left text-primary-light dark:text-primary-dark'>
                Candidate Application
            </h1>
            <NoCandidateApplication
                setIsCandidateApplicationOpen={setIsCandidateApplicationOpen}
            />
            {/* ADD COMPONENT TO SHOW THE CANDIDATE APPLICATION, IF SUBMITTED */}
            <CandidateApplicationForm
                isOpen={isCandidateApplicationOpen}
                setIsCancelConfirmOpen={setIsCancelConfirmOpen}
            />
            <CancelConfirm
                isOpen={isCancelConfirmOpen}
                setIsOpen={setIsCancelConfirmOpen}
                setIsCandidateApplicationOpen={setIsCandidateApplicationOpen}
            />
        </div>
    )
}

export default CandidateApplication

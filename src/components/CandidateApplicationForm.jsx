import Modal from "./Modal"
import { useState } from "react"
import CandidateDetails from "./CandidateDetails"
import CandidateForm from "./CandidateForm"
import FullScreenLoader from "./FullScreenLoader"
import { useAuthStore } from "../stores"
import CandidateFormContent from "./CandidateFormContent"

const CandidateApplicationForm = ({ isOpen, setIsCancelConfirmOpen }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [position, setPosition] = useState("General")
    const [nomineeOneData, setNomineeOneData] = useState(null)
    const [nomineeTwoData, setNomineeTwoData] = useState(null)
    const [candidateSignature, setCandidateSignature] = useState(null)
    const [nomineeOneSignature, setNomineeOneSignature] = useState(null)
    const [nomineeTwoSignature, setNomineeTwoSignature] = useState(null)

    const { user } = useAuthStore()

    const disabled =
        !position ||
        !candidateSignature ||
        isLoading ||
        !nomineeOneData ||
        !nomineeTwoData ||
        !nomineeOneSignature ||
        !nomineeTwoSignature

    const handleSubmit = () => {
        console.log(position)
        console.log(candidateSignature)
        console.log(nomineeOneData)
        console.log(nomineeOneSignature)
        console.log(nomineeTwoData)
        console.log(nomineeTwoSignature)
        console.log(user)
    }

    return (
        <Modal
            open={isOpen}
            onClose={() => setIsCancelConfirmOpen(true)}
        >
            <div className='flex max-sm:flex-col flex-1 py-6 gap-6 w-full h-full min-h-0 max-sm:overflow-y-auto'>
                <CandidateDetails />
                <CandidateForm>
                    <CandidateFormContent
                        position={position}
                        setPosition={setPosition}
                        setCandidateSignature={setCandidateSignature}
                        setIsLoading={setIsLoading}
                        nomineeOneAdmNo={nomineeOneData?.id}
                        nomineeTwoAdmNo={nomineeTwoData?.id}
                        setNomineeOneData={setNomineeOneData}
                        setNomineeTwoData={setNomineeTwoData}
                        setNomineeOneSignature={setNomineeOneSignature}
                        setNomineeTwoSignature={setNomineeTwoSignature}
                        onClose={() => setIsCancelConfirmOpen(true)}
                        handleSubmit={handleSubmit}
                        disabled={disabled}
                    />
                </CandidateForm>
            </div>
            {isLoading && (
                <div className='flex justify-between items-center'>
                    <FullScreenLoader />
                </div>
            )}
        </Modal>
    )
}

export default CandidateApplicationForm

import Modal from "./Modal"
import { useState } from "react"
import CandidateDetails from "./CandidateDetails"
import FullScreenLoader from "./FullScreenLoader"
import { useAuthStore } from "../stores"
import CandidateFormContent from "./CandidateFormContent"
import Button from "./Button"

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
            <div className='flex max-sm:flex-col flex-1 py-6 gap-6 w-full h-full max-sm:overflow-y-auto custom-scrollbar min-h-0'>
                <CandidateDetails />
                <div className='flex flex-col justify-between sm:flex-2 flex-1 w-full'>
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
                    />
                    <div className='flex justify-center gap-3 mt-5 w-full'>
                        <Button
                            text='Cancel'
                            className='w-1/2 h-11 text-sm bg-secondary-button hover:bg-secondary-button-hover'
                            type='button'
                            onClick={() => setIsCancelConfirmOpen(true)}
                        />
                        <Button
                            text='Submit'
                            className='w-1/2 h-11 text-sm bg-accent hover:bg-button-hover'
                            type='button'
                            onClick={handleSubmit}
                            disabled={disabled}
                        />
                    </div>
                </div>
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

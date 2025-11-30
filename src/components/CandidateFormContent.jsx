import Button from "./Button"
import CandidatePosition from "./CandidatePosition"
import Nominee from "./Nominee"
import SignatureInput from "./SignatureInput"
import { useAuthStore } from "../stores"

const CandidateFormContent = ({
    position,
    setPosition,
    setCandidateSignature,
    setIsLoading,
    nomineeOneAdmNo,
    setNomineeOneData,
    nomineeTwoAdmNo,
    setNomineeTwoData,
    setNomineeOneSignature,
    setNomineeTwoSignature,
    onClose,
    handleSubmit,
    disabled
}) => {
    const { user } = useAuthStore()

    return (
        <div className='flex flex-col gap-3 w-full text-sm'>
            <div className='flex flex-col gap-2'>
                <p>Position</p>
                <CandidatePosition
                    user={user}
                    position={position}
                    setPosition={setPosition}
                />
            </div>
            <div className='flex flex-col gap-2'>
                <p>Candidate Signature</p>
                <SignatureInput
                    setSignature={setCandidateSignature}
                    signFor='candidate'
                />
            </div>
            <div className='flex flex-col gap-2'>
                <p>Nominee 1</p>
                <Nominee
                    number={1}
                    setIsLoading={setIsLoading}
                    setNomineeData={setNomineeOneData}
                    setNomineeSignature={setNomineeOneSignature}
                    otherNomineeAdmNo={nomineeTwoAdmNo}
                />
            </div>
            <div className='flex flex-col gap-2'>
                <p>Nominee 2</p>
                <Nominee
                    number={2}
                    setIsLoading={setIsLoading}
                    setNomineeData={setNomineeTwoData}
                    setNomineeSignature={setNomineeTwoSignature}
                    otherNomineeAdmNo={nomineeOneAdmNo}
                />
            </div>
            <div className='flex justify-center gap-3 mt-5 w-full'>
                <Button
                    text='Cancel'
                    className='w-1/2 h-11 text-sm bg-secondary-button hover:bg-secondary-button-hover'
                    type='button'
                    onClick={onClose}
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
    )
}

export default CandidateFormContent

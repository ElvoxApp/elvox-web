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
    setNomineeTwoSignature
}) => {
    const { user } = useAuthStore()

    return (
        <div className='flex flex-col flex-1 min-h-0 gap-3 w-full text-sm overflow-y-auto custom-scrollbar'>
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
        </div>
    )
}

export default CandidateFormContent

import SelectPosition from "./SelectPosition"
import Nominee from "./Nominee"
import SignatureInput from "./SignatureInput"
import { useAuthStore } from "../stores"
import SelectElection from "./SelectElection"

const CandidateFormContent = ({
    election,
    setElection,
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
                <p>Election</p>
                <SelectElection
                    election={election}
                    setElection={setElection}
                />
            </div>
            <div className='flex flex-col gap-2'>
                <p>Position</p>
                <SelectPosition
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

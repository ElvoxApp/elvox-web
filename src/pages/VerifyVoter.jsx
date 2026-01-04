import { useState } from "react"
import VerifyVoterEnterAdmNo from "../components/VerifyVoterEnterAdmNo"
import FullScreenLoader from "../components/FullScreenLoader"
import { useElectionStore } from "../stores"
import toast from "react-hot-toast"
import api from "../api/api"
import VerifyVoterDetails from "../components/VerifyVoterDetails"
import VerifyVoterOTP from "../components/VerifyVoterOTP"

const VerifyVoter = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [admno, setAdmno] = useState("")
    const [student, setStudent] = useState(null)
    const [otpData, setOtpData] = useState(null)
    const [step, setStep] = useState(1)
    const [error, setError] = useState("")

    const { election } = useElectionStore()

    const nextStep = () => {
        if (step === 3) {
            setStep(1)
            return
        }

        setStep((s) => s + 1)
    }

    const reset = () => {
        setStep(1)
        setAdmno("")
        setError("")
        setStudent(null)
    }

    const fetchData = async () => {
        if (!admno) {
            setError("Admission number is required")
            return
        }

        setError("")

        try {
            setIsLoading(true)
            const res = await api.get(`/students/${admno}`)
            setStudent(res.data)
            nextStep()
        } catch (err) {
            toast.error(err.response?.data?.error, {
                id: "fetch-student-error"
            })
            setAdmno("")
        } finally {
            setIsLoading(false)
        }
    }

    const verifyVoter = async () => {
        if (!admno) {
            setError("Admission number is required")
            setStep(1)
            return
        }

        try {
            setIsLoading(true)
            const res = await api.post(`/voters/verify`, {
                admno,
                electionId: election.id
            })
            setOtpData(res.data)
            toast.success("Voter verifeid", { id: "verify-voter-success" })
            nextStep()
            setAdmno("")
        } catch (err) {
            toast.error(err.response?.data?.error, {
                id: "verify-voter-error"
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            <div className='flex flex-col justify-center min-h-0 items-center flex-1 p-2'>
                <title>Verify Voter</title>
                {election.status === "voting" ? (
                    <div className='bg-card-light dark:bg-card-dark rounded-md shadow-lg flex sm:min-w-md justify-center gap-5 px-4 py-6 sm:p-10'>
                        {step === 1 && (
                            <VerifyVoterEnterAdmNo
                                admno={admno}
                                setAdmno={setAdmno}
                                error={error}
                                fetchData={fetchData}
                            />
                        )}
                        {step === 2 && (
                            <VerifyVoterDetails
                                student={student}
                                verify={verifyVoter}
                                reset={reset}
                            />
                        )}
                        {step === 3 && (
                            <VerifyVoterOTP
                                otpData={otpData}
                                nextStep={nextStep}
                            />
                        )}
                    </div>
                ) : (
                    <div className='flex flex-col px-3 py-4 gap-1 flex-1 items-center justify-center'>
                        <h2 className='text-center text-primary-light dark:text-primary-dark text-2xl md:text-3xl lg:text-4xl font-black'>
                            Voting is not active
                        </h2>
                        <p className='text-secondary-light dark:text-secondary-dark text-center text-base md:text-lg'>
                            Voter verification is available only during the
                            voting period
                        </p>
                    </div>
                )}
            </div>
            {isLoading && <FullScreenLoader />}
        </>
    )
}

export default VerifyVoter

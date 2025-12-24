import { useEffect, useState } from "react"
import CancelConfirm from "../components/CancelConfirm"
import NoCandidateApplication from "../components/NoCandidateApplication"
import CandidateApplicationForm from "../components/CandidateApplicationForm"
import { useOutletContext } from "react-router-dom"
import api from "../api/api"
import UserCandidateApplication from "../components/UserCandidateApplication"
import toast from "react-hot-toast"
import { useAuthStore } from "../stores"

const CandidateApplication = () => {
    const [checked, setChecked] = useState(false)
    const [isCandidateApplicationOpen, setIsCandidateApplicationOpen] =
        useState(false)
    const [isCancelConfirmOpen, setIsCancelConfirmOpen] = useState(false)
    const [candidateApplication, setCandidateApplication] = useState(null)

    const { isLoading, setIsLoading } = useOutletContext()

    const {
        user: { id }
    } = useAuthStore()

    useEffect(() => {
        const fetchMyCandidateApplication = async () => {
            try {
                setIsLoading(true)
                const exists = await api.get(`/candidates/exists/${id}`)
                if (exists.data.exists) {
                    const res = await api.get("/candidates/me")
                    if (res.status === 200) {
                        const election = await api.get(
                            `/elections/${res.data?.election_id}`
                        )
                        if (election.status === 200) {
                            setCandidateApplication({
                                ...res.data,
                                election_name: election.data.name,
                                nomination_start:
                                    election.data.nomination_start,
                                nomination_end: election.data.nomination_end,
                                voting_start: election.data.voting_start,
                                election_id: res.data.election_id
                            })
                        }
                    }
                } else {
                    setCandidateApplication(null)
                }
            } catch (err) {
                toast.error(
                    err.response?.data?.message || "Something went wrong"
                )
            } finally {
                setChecked(true)
                setIsLoading(false)
            }
        }

        fetchMyCandidateApplication()
    }, [id, setIsLoading])

    return (
        <div className='flex flex-col px-1 py-5 flex-1'>
            <title>Candidate Application</title>
            {checked && !candidateApplication && !isLoading && (
                <NoCandidateApplication
                    setIsCandidateApplicationOpen={
                        setIsCandidateApplicationOpen
                    }
                />
            )}
            {checked && candidateApplication && (
                <UserCandidateApplication candidate={candidateApplication} />
            )}

            {isCandidateApplicationOpen && !candidateApplication && (
                <CandidateApplicationForm
                    isOpen={isCandidateApplicationOpen}
                    setIsCancelConfirmOpen={setIsCancelConfirmOpen}
                    setIsCandidateApplicationOpen={
                        setIsCandidateApplicationOpen
                    }
                />
            )}
            <CancelConfirm
                isOpen={isCancelConfirmOpen}
                setIsOpen={setIsCancelConfirmOpen}
                setIsCandidateApplicationOpen={setIsCandidateApplicationOpen}
            />
        </div>
    )
}

export default CandidateApplication

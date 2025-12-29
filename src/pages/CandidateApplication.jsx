import { useEffect, useRef, useState } from "react"
import CancelConfirm from "../components/CancelConfirm"
import NoCandidateApplication from "../components/NoCandidateApplication"
import CandidateApplicationForm from "../components/CandidateApplicationForm"
import {
    useBlocker,
    useLocation,
    useNavigate,
    useOutletContext
} from "react-router-dom"
import api from "../api/api"
import UserCandidateApplication from "../components/UserCandidateApplication"
import toast from "react-hot-toast"
import { useAuthStore, useElectionStore } from "../stores"

const CandidateApplication = () => {
    const [checked, setChecked] = useState(false)
    const [isCandidateApplicationOpen, setIsCandidateApplicationOpen] =
        useState(false)
    const [isCancelConfirmOpen, setIsCancelConfirmOpen] = useState(false)
    const [candidateApplication, setCandidateApplication] = useState(null)
    const [isApplicationSubmitted, setIsApplicationSubmitted] = useState({
        submitted: false,
        status: null
    })

    const blocker = useBlocker(isCandidateApplicationOpen)

    const navigate = useNavigate()
    const location = useLocation()

    const { isLoading, setIsLoading } = useOutletContext()

    const {
        user: { id }
    } = useAuthStore()

    const election = useElectionStore((state) => state.elections[0])
    const { nomination_end } = election || {}

    const showSubmitApplicationButton = {
        show:
            !isApplicationSubmitted.submitted &&
            nomination_end &&
            Date.now() < new Date(nomination_end),
        status: isApplicationSubmitted.status
    }

    const hasRestoredRef = useRef(false)

    useEffect(() => {
        if (blocker.state !== "blocked") return

        if (!isCandidateApplicationOpen) {
            hasRestoredRef.current = false
            blocker.reset()
            return
        }

        if (!hasRestoredRef.current) {
            hasRestoredRef.current = true
            navigate(location.pathname, { replace: true })
        }

        setIsCancelConfirmOpen(true)
    }, [
        blocker.state,
        isCandidateApplicationOpen,
        navigate,
        location.pathname,
        blocker
    ])

    useEffect(() => {
        const fetchMyCandidateApplication = async () => {
            try {
                setIsLoading(true)
                const exists = await api.get(`/candidates/exists/${id}`)
                setIsApplicationSubmitted({
                    submitted: exists.data.exists,
                    status: exists.data.exists ? exists.data.status : null
                })
                if (exists.data.exists && exists.data.status !== "withdrawn") {
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
                    err.response?.data?.error || "Something went wrong",
                    {
                        id: "candidate-application-fetch-error"
                    }
                )
            } finally {
                setChecked(true)
                setIsLoading(false)
            }
        }

        fetchMyCandidateApplication()
    }, [id, setIsLoading])

    return (
        <div className='flex justify-center px-2 md:px-5 lg:px-9 pb-5 pt-8 flex-1'>
            <title>Candidate Application</title>
            {checked && !candidateApplication && !isLoading && (
                <NoCandidateApplication
                    setIsCandidateApplicationOpen={
                        setIsCandidateApplicationOpen
                    }
                    showSubmitApplicationButton={showSubmitApplicationButton}
                />
            )}
            {checked && candidateApplication && (
                <UserCandidateApplication
                    candidate={candidateApplication}
                    setCandidateApplication={setCandidateApplication}
                    setIsApplicationSubmitted={setIsApplicationSubmitted}
                />
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
            {isCancelConfirmOpen && (
                <CancelConfirm
                    isOpen={isCancelConfirmOpen}
                    setIsOpen={setIsCancelConfirmOpen}
                    setIsFormOpen={setIsCandidateApplicationOpen}
                />
            )}
        </div>
    )
}

export default CandidateApplication

import { useEffect, useRef, useState } from "react"
import { useBlocker, useLocation, useNavigate } from "react-router-dom"
import NoAppealsSubmitted from "../components/NoAppealsSubmitted"
import SubmitAppealFormModal from "../components/SubmitAppealFormModal"
import CancelConfirm from "../components/CancelConfirm"
import api from "../api/api"
import { useOutletContext } from "react-router-dom"
import toast from "react-hot-toast"

const SubmitAppeal = () => {
    const [appeals, setAppeals] = useState([])
    const [showAppealForm, setShowAppealForm] = useState(false)
    const [isCancelConfirmOpen, setIsCancelConfirmOpen] = useState(false)

    const { setIsLoading } = useOutletContext()

    const navigate = useNavigate()
    const location = useLocation()

    const blocker = useBlocker(showAppealForm)

    const hasRestoredRef = useRef(false)

    useEffect(() => {
        if (blocker.state !== "blocked") return

        if (!showAppealForm) {
            hasRestoredRef.current = false
            blocker.reset()
            return
        }

        if (!hasRestoredRef.current) {
            hasRestoredRef.current = true
            navigate(location.pathname, { replace: true })
        }

        setIsCancelConfirmOpen(true)
    }, [blocker.state, showAppealForm, navigate, location.pathname, blocker])

    useEffect(() => {
        const fetchAppeals = async () => {
            try {
                setIsLoading(true)
                const res = await api.get("/appeals")
                setAppeals(res.data)
            } catch (err) {
                toast.error(
                    err.response?.data?.error ||
                        "Could not fetch appeals. Please try again",
                    { id: "appeals-fetch-error" }
                )
            } finally {
                setIsLoading(false)
            }
        }

        fetchAppeals()
    }, [setIsLoading])

    return (
        <div className='flex flex-col px-2 md:px-5 lg:px-9 py-5 flex-1'>
            <title>Appeals</title>
            {appeals.length === 0 && (
                <NoAppealsSubmitted setShowAppealForm={setShowAppealForm} />
            )}

            {showAppealForm && (
                <SubmitAppealFormModal
                    isOpen={showAppealForm}
                    setIsCancelConfirmOpen={setIsCancelConfirmOpen}
                    setShowAppealForm={setShowAppealForm}
                />
            )}

            {isCancelConfirmOpen && (
                <CancelConfirm
                    isOpen={isCancelConfirmOpen}
                    setIsOpen={setIsCancelConfirmOpen}
                    setIsFormOpen={setShowAppealForm}
                />
            )}
        </div>
    )
}

export default SubmitAppeal

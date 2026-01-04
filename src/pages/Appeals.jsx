import { useEffect, useMemo, useRef, useState } from "react"
import { useBlocker, useLocation, useNavigate } from "react-router-dom"
import NoAppealsSubmitted from "../components/NoAppealsSubmitted"
import SubmitAppealFormModal from "../components/SubmitAppealFormModal"
import CancelConfirm from "../components/CancelConfirm"
import api from "../api/api"
import { useOutletContext } from "react-router-dom"
import toast from "react-hot-toast"
import AppealsList from "../components/AppealsList"
import AppealsHeader from "../components/AppealsHeader"
import { useAuthStore, useElectionStore } from "../stores"

const Appeals = () => {
    const [appeals, setAppeals] = useState([])
    const [showAppealForm, setShowAppealForm] = useState(false)
    const [isCancelConfirmOpen, setIsCancelConfirmOpen] = useState(false)
    const [sort, setSort] = useState("latest")
    const [filter, setFilter] = useState("all")

    const { isLoading, setIsLoading } = useOutletContext()

    const { election } = useElectionStore()
    const {
        user: { role }
    } = useAuthStore()

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
                if (election.id) {
                    const res = await api.get(
                        `/appeals?election=${election.id}`
                    )
                    setAppeals(res.data)
                }
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
    }, [setIsLoading, election.id])

    const visibleAppeals = useMemo(() => {
        let list = [...appeals]

        // sort
        if (sort === "oldest") {
            list.sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
        } else if (sort === "latest") {
            list.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        }

        // filter by category
        if (filter !== "all") {
            list = list.filter((l) => l.category.toLowerCase() === filter)
        }

        return list
    }, [appeals, filter, sort])

    if (isLoading) return null

    return (
        <div className='flex flex-col items-center px-2 md:px-5 lg:px-9 py-5 flex-1'>
            <title>Appeals</title>
            {appeals.length > 0 && (
                <div className='flex flex-col w-full gap-5 max-w-5xl py-2'>
                    <AppealsHeader
                        setShowAppealForm={setShowAppealForm}
                        sort={sort}
                        setSort={setSort}
                        setFilter={setFilter}
                        filter={filter}
                    />
                    {visibleAppeals.length > 0 && (
                        <AppealsList appeals={visibleAppeals} />
                    )}
                </div>
            )}

            {visibleAppeals.length === 0 && !isLoading && (
                <>
                    {role === "admin" ? (
                        <div className='flex px-3 py-4 flex-1 items-center justify-center'>
                            <h2 className='text-center text-primary-light dark:text-primary-dark text-2xl md:text-3xl lg:text-4xl font-black'>
                                No Appeals To Show
                            </h2>
                        </div>
                    ) : (
                        <NoAppealsSubmitted
                            setShowAppealForm={setShowAppealForm}
                        />
                    )}
                </>
            )}

            {showAppealForm && (
                <SubmitAppealFormModal
                    isOpen={showAppealForm}
                    setIsCancelConfirmOpen={setIsCancelConfirmOpen}
                    setShowAppealForm={setShowAppealForm}
                    setAppeals={setAppeals}
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

export default Appeals

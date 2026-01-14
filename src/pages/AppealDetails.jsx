import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import toast from "react-hot-toast"
import api from "../api/api"
import AppealDetailsSummary from "../components/AppealDetailsSummary"
import { useAuthStore, useElectionStore } from "../stores"
import AppealDetailsDescription from "../components/AppealDetailsDescription"
import AppealDetailsAttachments from "../components/AppealDetailsAttachments"
import AppealAdminNote from "../components/AppealAdminNote"
import Button from "../components/Button"
import FullScreenLoader from "../components/FullScreenLoader"

const AppealDetails = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [appeal, setAppeal] = useState({})
    const [noteValue, setNoteValue] = useState("")
    const [error, setError] = useState("")

    const { id } = useParams()
    const navigate = useNavigate()

    const { user } = useAuthStore()
    const { election } = useElectionStore()

    const handleAction = async (action) => {
        if (noteValue.length === 0) {
            setError(
                "Please add a note before approving or rejecting this appeal"
            )
            return
        }
        setError("")

        try {
            setIsLoading(true)
            const res = await api.patch(`/appeals/${id}`, {
                status: action,
                adminNote: noteValue.trim()
            })
            toast.success(`Appeal was successfully ${action}`, {
                id: "appeal-action-success"
            })
            setAppeal((appeal) => {
                return {
                    ...appeal,
                    status: res?.data?.status,
                    admin_comment: res?.data?.admin_comment
                }
            })
        } catch (err) {
            toast.error(
                err.response?.data?.error ||
                    `Failed to ${
                        action === "approved" ? "approve" : "reject"
                    } appeal, please try again`,
                { id: "appeal-action-error" }
            )
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        const fetchAppeal = async () => {
            try {
                setIsLoading(true)
                const res = await api.get(`/appeals/${id}`)
                setAppeal(res.data)
            } catch (err) {
                toast.error(
                    err.response?.data?.error ||
                        "Failed to fetch appeal, please try again",
                    { id: "appeal-fetch-error" }
                )
                navigate("/appeals")
            } finally {
                setIsLoading(false)
            }
        }

        fetchAppeal()
    }, [id, setIsLoading, navigate])

    return (
        <>
            {Object.keys(appeal).length > 0 && (
                <div className='flex justify-center px-2 md:px-5 lg:px-9 py-5 flex-1'>
                    <title>
                        {appeal?.subject
                            ? `Appeal - ${appeal.subject}`
                            : "Appeal"}
                    </title>
                    <div className='flex flex-col gap-4 w-full px-4 py-6 rounded-md dark:bg-card-dark bg-card-light shadow-lg text-primary-light dark:text-primary-dark max-w-4xl'>
                        <AppealDetailsSummary appeal={appeal} />
                        <AppealDetailsDescription
                            description={appeal.description}
                        />
                        <AppealDetailsAttachments
                            attachments={appeal.attachments}
                        />
                        <AppealAdminNote
                            note={appeal.admin_comment}
                            noteValue={noteValue}
                            setNoteValue={setNoteValue}
                            error={error}
                            electionId={appeal.election_id}
                        />

                        {appeal.status === "pending" &&
                            user.role === "admin" &&
                            election?.id === appeal.election_id && (
                                <div className='flex justify-center gap-3 w-full'>
                                    <Button
                                        text='Reject'
                                        className='w-1/2 h-11 text-sm bg-red-700 hover:bg-red-800'
                                        type='button'
                                        onClick={() => handleAction("rejected")}
                                    />
                                    <Button
                                        text='Approve'
                                        className='w-1/2 h-11 text-sm bg-accent hover:bg-button-hover'
                                        type='button'
                                        onClick={() => handleAction("approved")}
                                    />
                                </div>
                            )}
                    </div>
                </div>
            )}
            {isLoading && (
                <div className='flex justify-between items-center'>
                    <FullScreenLoader />
                </div>
            )}
        </>
    )
}

export default AppealDetails

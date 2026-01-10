import { useNavigate } from "react-router-dom"
import ManageElectionElectionDetails from "../components/ManageElectionElectionDetails"
import ManageElectionElectionTimeline from "../components/ManageElectionElectionTimeline"
import ManageElectionConfiguration from "../components/ManageElectionConfiguration"
import { useElectionStore } from "../stores"
import ManageElectionDeleteElection from "../components/ManageElectionDeleteElection"
import { useState } from "react"
import toast from "react-hot-toast"
import api from "../api/api"
import DeleteElectionDialog from "../components/DeleteElectionDialog"
import FullScreenLoader from "../components/FullScreenLoader"
import CreateElectionModal from "../components/CreateElectionModal"

const ManageElection = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [showConfirmDialog, setShowConfirmDialog] = useState(false)
    const [password, setPassword] = useState("")
    const [error, setError] = useState(null)
    const [showEditElectionModal, setShowEditElectionModal] = useState(false)

    const { election, setElection } = useElectionStore()

    const navigate = useNavigate()

    const handleDelete = async () => {
        if (election?.status !== "draft")
            toast.error(
                "This election cannot be deleted in its current state",
                {
                    id: "delete-election-error"
                }
            )

        if (!password) return setError("Password is required")

        if (password.length < 8) return setError("At least 8 characters")

        setError(null)

        try {
            setIsLoading(true)
            await api.delete(`/elections/${election?.id}`, {
                headers: {
                    "x-admin-password": password
                }
            })

            toast.success("Election successfully deleted", {
                id: "election-delete-success"
            })
            setShowConfirmDialog(false)
            setElection({})
            navigate("/")
        } catch (err) {
            toast.error(
                err.response?.data?.error ||
                    "Failed to delete election. Please try again.",
                { id: "delete-election-error" }
            )
        } finally {
            setIsLoading(false)
            setShowConfirmDialog(false)
        }
    }

    return (
        <div className={`flex flex-col px-2 flex-1 py-5`}>
            <title>Manage Election</title>
            <div
                className={`flex flex-col md:px-3 lg:px-7 text-sm justify-evenly flex-1 gap-6 sm:py-3`}
            >
                <ManageElectionElectionDetails
                    setShowEditElectionModal={setShowEditElectionModal}
                />
                <ManageElectionElectionTimeline />
                <ManageElectionConfiguration />
                {election?.status === "draft" && (
                    <ManageElectionDeleteElection
                        handleShowConfirmDialog={() => {
                            setShowConfirmDialog(true)
                            setError(null)
                        }}
                    />
                )}
            </div>
            {showConfirmDialog && election?.status === "draft" && (
                <DeleteElectionDialog
                    isOpen={showConfirmDialog}
                    setIsOpen={setShowConfirmDialog}
                    handleDelete={handleDelete}
                    password={password}
                    setPassword={setPassword}
                    error={error}
                    isLoading={isLoading}
                />
            )}
            {isLoading && (
                <div className='flex justify-between items-center'>
                    <FullScreenLoader />
                </div>
            )}
            {showEditElectionModal && (
                <CreateElectionModal
                    isOpen={showEditElectionModal}
                    setIsOpen={setShowEditElectionModal}
                    edit
                />
            )}
        </div>
    )
}

export default ManageElection

import { useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import FullScreenLoader from "./FullScreenLoader"
import Modal from "./Modal"
import Button from "./Button"
import CreateElectionFormElectionName from "./CreateElectionFormElectionName"
import CreateElectionFormTimeline from "./CreateElectionFormTimeline"
import { toTimestamptz } from "../utils/datetime"
import { createElectionResolver } from "../validators/election"
import api from "../api/api"
import { useElectionStore } from "../stores"

const CreateElectionModal = ({ isOpen, setShowCreateElectionModal }) => {
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()

    const { setElection } = useElectionStore()

    const methods = useForm({
        defaultValues: {
            electionName: "",
            nominationStartDate: "",
            nominationStartTime: "",
            nominationEndDate: "",
            nominationEndTime: "",
            votingStartDate: "",
            votingStartTime: "",
            votingEndDate: "",
            votingEndTime: "",
            electionEndDate: "",
            electionEndTime: ""
        },
        resolver: createElectionResolver()
    })

    const { handleSubmit } = methods

    const onSubmit = async (values) => {
        try {
            setIsLoading(true)

            const data = {
                electionName: values.electionName,
                nominationStart: toTimestamptz(
                    values.nominationStartDate,
                    values.nominationStartTime
                ),
                nominationEnd: toTimestamptz(
                    values.nominationEndDate,
                    values.nominationEndTime
                ),
                votingStart: toTimestamptz(
                    values.votingStartDate,
                    values.votingStartTime
                ),
                votingEnd: toTimestamptz(
                    values.votingEndDate,
                    values.votingEndTime
                ),
                electionEnd: toTimestamptz(
                    values.electionEndDate,
                    values.electionEndTime
                )
            }

            const res = await api.post("/elections", data)
            toast.success("Election created successfully", {
                id: "create-election-success"
            })
            setElection(res.data)
            navigate("/manage-election")
        } catch (err) {
            toast.error(
                err.response?.data?.error || "Failed to create election",
                {
                    id: "create-election-error"
                }
            )
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Modal
            open={isOpen}
            onClose={() => setShowCreateElectionModal(false)}
            title='Create Election'
        >
            <title>Create Election</title>
            <FormProvider {...methods}>
                <form
                    className='flex flex-col pt-6 flex-1 text-sm min-h-0'
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div className='flex flex-col gap-5 flex-1 overflow-y-auto custom-scrollbar py-1'>
                        <CreateElectionFormElectionName />
                        <CreateElectionFormTimeline />
                    </div>
                    <div className='flex justify-center gap-3 mt-5 w-full'>
                        <Button
                            text='Cancel'
                            className='w-1/2 h-11 text-sm bg-secondary-button hover:bg-secondary-button-hover-light dark:hover:bg-secondary-button-hover'
                            type='button'
                            onClick={() => setShowCreateElectionModal(false)}
                        />
                        <Button
                            text='Create Election'
                            className='w-1/2 h-11 text-sm bg-accent hover:bg-button-hover'
                            type='submit'
                            disabled={isLoading}
                        />
                    </div>
                </form>
            </FormProvider>
            {isLoading && (
                <div className='flex justify-between items-center'>
                    <FullScreenLoader />
                </div>
            )}
        </Modal>
    )
}

export default CreateElectionModal

import { useEffect, useState } from "react"
import { useOutletContext, useParams } from "react-router-dom"
import toast from "react-hot-toast"
import api from "../api/api"

const AppealDetails = () => {
    const [appeal, setAppeal] = useState({})

    const { id } = useParams()
    const { isLoading, setIsLoading } = useOutletContext()

    useEffect(() => {
        const fetchAppeal = async () => {
            try {
                setIsLoading(true)
                const res = await api.get(`/appeals/${id}`)
                console.log(res.data)
                setAppeal(res.data)
            } catch (err) {
                toast.error(
                    err.response.data.error ||
                        "Failed to fetch appeal, please try again",
                    { id: "appeal-fetch-error" }
                )
            } finally {
                setIsLoading(false)
            }
        }

        fetchAppeal()
    }, [id, setIsLoading])

    if (isLoading) return null

    return (
        <div className='flex flex-col w-full px-4 py-6 rounded-md dark:bg-card-dark bg-card-light shadow-lg text-primary-light dark:text-primary-dark max-w-4xl'>
            {appeal?.subject}
        </div>
    )
}

export default AppealDetails

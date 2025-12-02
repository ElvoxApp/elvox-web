import { useNavigate } from "react-router-dom"
import { useFormContext } from "react-hook-form"
import Button from "../components/Button"
import axios from "axios"
import toast from "react-hot-toast"

const API_URL = import.meta.env.VITE_API_URL

const SignUpForm = ({ setIsLoading, children }) => {
    const { handleSubmit, getValues } = useFormContext()
    const navigate = useNavigate()

    const user = getValues("user")

    // ONLY FOR DEMO PURPOSES, MUST CHANGE FOR PRODUCTION
    const onSubmit = () => {
        toast.success(`Welcome ${user.name}!`)
    }
    // -----------------------------------------------------------

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className='flex flex-col gap-6 w-full text-sm'
        >
            {children}
        </form>
    )
}

export default SignUpForm

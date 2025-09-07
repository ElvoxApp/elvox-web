import { Link, useNavigate } from "react-router-dom"
import { useFormContext } from "react-hook-form"
import Button from "../components/Button"
import axios from "axios"
import Input from "./Input"

const API_URL = import.meta.env.VITE_API_URL

const SignUpForm = ({ setIsLoading, children }) => {
    const { handleSubmit } = useFormContext()
    const navigate = useNavigate()

    // ONLY FOR DEMO PURPOSES, MUST CHANGE FOR PRODUCTION
    const onSubmit = () => {}
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

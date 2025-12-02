import axios from "axios"
import { useEffect, useRef, useState } from "react"
import { useFormContext } from "react-hook-form"
import Loader from "./Loader"
import Button from "./Button"
import toast from "react-hot-toast"

const API_URL = import.meta.env.VITE_API_URL

const SignUpVerifyDetails = ({ setStep }) => {
    const { setValue, getValues } = useFormContext()
    const [isLoading, setIsLoading] = useState(false)
    const [userData, setUserData] = useState({})

    const toastShown = useRef(false)

    const role = getValues("role")

    const handleNext = async () => {
        setStep((prev) => prev + 1)
    }
    const handlePrev = async () => {
        setStep((prev) => prev - 1)
    }

    /* MUST CHANGE FOR PROD USING ACTUAL API AND DB FOR BOTH STUDENTS AND FACULTY */

    useEffect(() => {
        const fetchData = async () => {
            const { admno, empcode } = getValues()
            if (!role || (!admno && !empcode)) return

            try {
                setIsLoading(true)
                const id = role === "student" ? admno : empcode
                const res = await axios.get(`${API_URL}/users/${id}`)
                setUserData(res.data)
                setValue("user", res.data)
            } catch (error) {
                if (
                    error.response &&
                    error.response.status === 404 &&
                    !toastShown.current
                ) {
                    toast.error("No user found with the provided details")
                    toastShown.current = true
                }
            } finally {
                setIsLoading(false)
            }
        }

        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    /* ---------------------------------------------- */

    const labels = {
        name: "Full Name",
        id: role === "student" ? "Admission Number" : "Employee Code",
        dept: "Department",
        class: "Class",
        sem: "Semester",
        batch: "Batch",
        email: "Email",
        phone: "Phone"
    }

    const fields =
        role === "student"
            ? ["name", "id", "dept", "class", "sem", "batch", "email", "phone"]
            : ["name", "id", "dept", "email", "phone"]

    if (isLoading)
        return (
            <div className='flex justify-between items-center'>
                <Loader />
            </div>
        )
    return (
        <div className='flex flex-col gap-8 w-full'>
            <div className='flex flex-col gap-2.5'>
                {Object.keys(userData).length > 0 &&
                    fields.map((field) => (
                        <div
                            key={field}
                            className='flex w-full'
                        >
                            <p className='text-secondary-light dark:text-secondary-dark w-1/2'>
                                {labels[field]}
                            </p>
                            <p className='text-primary-light dark:text-primary-dark w-1/2'>
                                {field === "phone"
                                    ? `+91 ${userData[field]}`
                                    : userData[field]}
                            </p>
                        </div>
                    ))}
            </div>
            {Object.keys(userData).length > 0 && (
                <div className='flex justify-center w-full'>
                    <p className='text-secondary-light dark:text-secondary-dark text-xs text-center'>
                        If these details are incorrect, please contact the
                        authorities
                    </p>
                </div>
            )}
            {Object.keys(userData).length === 0 && !isLoading && (
                <p className='text-xs text-red-500 mt-1 font-medium text-center'>
                    No user found with the provided details. Please check and
                    try again.
                </p>
            )}
            <div className='flex justify-center gap-3 w-full'>
                <Button
                    text='Previous'
                    className='w-1/2 h-11 text-sm bg-secondary-button hover:bg-secondary-button-hover'
                    type='button'
                    onClick={handlePrev}
                />
                <Button
                    text='Next'
                    className='w-1/2 h-11 text-sm bg-accent hover:bg-button-hover'
                    type='button'
                    onClick={handleNext}
                    disabled={Object.keys(userData).length === 0}
                />
            </div>
        </div>
    )
}

export default SignUpVerifyDetails

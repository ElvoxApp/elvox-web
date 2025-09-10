import axios from "axios"
import { useEffect, useState } from "react"
import { useFormContext } from "react-hook-form"
import Loader from "./Loader"
import Button from "./Button"

const API_URL = import.meta.env.VITE_API_URL

const SignUpVerifyDetails = ({ setStep }) => {
    const { setValue, getValues } = useFormContext()
    const [isLoading, setIsLoading] = useState(false)
    const [userData, setUserData] = useState({})

    const handleNext = async () => {
        setStep((prev) => prev + 1)
    }
    const handlePrev = async () => {
        setStep((prev) => prev - 1)
    }

    useEffect(() => {
        const fetchData = async () => {
            const { role, admno, empcode } = getValues()
            if (!role || (!admno && !empcode)) return

            try {
                setIsLoading(true)
                const id = role === "student" ? admno : empcode
                const res = await axios.get(`${API_URL}/users/${id}`)
                setUserData(res.data)
                setValue("user", res.data)
            } catch (error) {
                console.error("Error fetching data:", error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const labels = {
        name: "Full Name",
        id:
            getValues("role") === "student"
                ? "Admission Number"
                : "Employee Code",
        dept: "Department",
        sem: "Semester",
        batch: "Batch",
        email: "Email",
        phone: "Phone"
    }

    const fields = ["name", "id", "dept", "sem", "batch", "email", "phone"]

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
                            <p className='text-secondary w-1/2'>
                                {labels[field]}
                            </p>
                            <p className='text-primary w-1/2'>
                                {userData[field]}
                            </p>
                        </div>
                    ))}
            </div>
            {Object.keys(userData).length > 0 && (
                <div className='flex justify-center w-full'>
                    <p className='text-secondary text-xs text-center'>
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

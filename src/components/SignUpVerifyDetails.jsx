import { useEffect, useRef, useState } from "react"
import { useFormContext } from "react-hook-form"
import Loader from "./Loader"
import Button from "./Button"
import toast from "react-hot-toast"
import api from "../api/api"
import { useNavigate } from "react-router-dom"

const SignUpVerifyDetails = ({ setStep }) => {
    const { setValue, getValues } = useFormContext()
    const [isLoading, setIsLoading] = useState(false)
    const [userData, setUserData] = useState({})
    const [userExists, setUserExists] = useState(false)
    const navigate = useNavigate()

    const toastShown = useRef(false)

    const role = getValues("role")

    const handleNext = async () => {
        setStep((prev) => prev + 1)
    }
    const handlePrev = async () => {
        setStep((prev) => prev - 1)
    }

    useEffect(() => {
        const fetchData = async () => {
            const { admno, empcode } = getValues()
            if (!role || (!admno && !empcode)) return

            try {
                setIsLoading(true)
                const exisiting = await api.get(
                    `/users/exists?role=${role.toLowerCase()}&id=${
                        role.toLowerCase() === "student" ? admno : empcode
                    }`
                )
                setUserExists(exisiting.data.exists)
                if (!exisiting.data.exists) {
                    const res = await api.get(
                        `/${role.toLowerCase()}s/${
                            role.toLowerCase() === "student" ? admno : empcode
                        }`
                    )
                    setUserData(res.data)
                    setValue("user", res.data)
                } else {
                    if (!toastShown.current) {
                        toast.error("User already exists, Please log in")
                        toastShown.current = true
                    }
                    navigate("/login")
                }
            } catch (err) {
                if (!toastShown.current) {
                    toast.error(
                        err.response.data.error
                            ? err.response.data.error
                            : err.response.data
                    )
                    toastShown.current = true
                }
            } finally {
                setIsLoading(false)
            }
        }

        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const labels = {
        name: "Full Name",
        ...(role === "student"
            ? { admno: "Admission Number" }
            : { empcode: "Employee Code" }),
        department: "Department",
        class: "Class",
        semester: "Semester",
        batch: "Batch",
        email: "Email",
        phone: "Phone"
    }

    const fields =
        role === "student"
            ? [
                  "name",
                  "admno",
                  "department",
                  "class",
                  "semester",
                  "batch",
                  "email",
                  "phone"
              ]
            : ["name", "empcode", "department", "email", "phone"]

    if (isLoading)
        return (
            <div className='flex justify-between items-center'>
                <Loader />
            </div>
        )
    if (!userExists)
        return (
            <div className='flex flex-col gap-8 w-full'>
                <div className='flex flex-col gap-2.5'>
                    {Object.keys(userData).length > 0 &&
                        fields.map((field) => (
                            <div
                                key={field}
                                className='flex w-full'
                            >
                                <p className='text-secondary-light dark:text-secondary-dark w-1/2 break-words'>
                                    {labels[field]}
                                </p>
                                <p className='text-primary-light dark:text-primary-dark w-1/2 break-words'>
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
                        No user found with the provided details. Please check
                        and try again.
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

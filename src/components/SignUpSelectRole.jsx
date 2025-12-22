import SelectRole from "./SelectRole"
import Input from "./Input"
import Button from "./Button"
import { Link, useNavigate } from "react-router-dom"
import { useFormContext } from "react-hook-form"
import api from "../api/api"
import toast from "react-hot-toast"

const SignUpRoleStep = ({ setStep, setIsLoading }) => {
    const {
        register,
        trigger,
        watch,
        getValues,
        formState: { errors }
    } = useFormContext()

    const navigate = useNavigate()

    const role = watch("role")

    const handleNext = async () => {
        const valid = await trigger([
            "role",
            role === "student" ? "admno" : "empcode"
        ])

        try {
            setIsLoading(true)
            const userExists = await api.get(
                `/users/exists?role=${role.toLowerCase()}&id=${
                    role.toLowerCase() === "student"
                        ? getValues("admno")
                        : getValues("empcode")
                }`
            )

            const personExists = await api.get(
                `/${role.toLowerCase()}s/exists/${
                    role.toLowerCase() === "student"
                        ? getValues("admno")
                        : getValues("empcode")
                }`
            )

            if (personExists.data.exists) {
                if (userExists.data.exists) {
                    toast.error("Account already exists, Please login")
                    navigate("/login")
                } else {
                    if (valid) return setStep((prev) => prev + 1)
                }
            } else {
                toast.error(
                    `Invalid ${
                        role.toLowerCase() === "student"
                            ? "admission number"
                            : "employee code"
                    }`
                )
            }
        } catch (err) {
            toast.error(
                err.response.data.error
                    ? err.response.data.error
                    : err.response.data
            )
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className='flex flex-col gap-6 w-full text-sm'>
            <SelectRole />
            {role && (
                <div className='flex flex-col gap-2'>
                    <label
                        htmlFor={role === "student" ? "admno" : "empcode"}
                        className='text-primary-light dark:text-primary-dark'
                    >
                        {role === "student"
                            ? "Admission Number"
                            : "Employee Code"}
                    </label>
                    <Input
                        type='text'
                        id={role === "student" ? "admno" : "empcode"}
                        placeholder={
                            role === "student"
                                ? "Enter your admission number"
                                : "Enter your employee code"
                        }
                        register={register}
                        errors={errors}
                        rules={{
                            required:
                                role === "student"
                                    ? "Admission number is required"
                                    : "Employee code is required"
                        }}
                        onKeyDown={(e) => {
                            e.preventDefault()
                            if (e.key === "Enter") handleNext()
                        }}
                    />
                    {errors[role === "student" ? "admno" : "empcode"] && (
                        <p className='text-xs text-red-500 mt-1 font-medium'>
                            {
                                errors[role === "student" ? "admno" : "empcode"]
                                    .message
                            }
                        </p>
                    )}
                </div>
            )}
            <div className='pt-2'>
                <Button
                    text='Next'
                    className='w-full h-11 text-sm bg-accent hover:bg-button-hover'
                    type='button'
                    onClick={handleNext}
                />
            </div>
            <div className='flex items-center justify-center text-link'>
                <Link
                    to='/login'
                    className='hover:text-link-hover'
                >
                    Already have an account? Login
                </Link>
            </div>
        </div>
    )
}

export default SignUpRoleStep

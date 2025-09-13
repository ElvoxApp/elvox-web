import SelectRole from "./SelectRole"
import Input from "./Input"
import Button from "./Button"
import { Link } from "react-router-dom"
import { useFormContext } from "react-hook-form"

const SignUpRoleStep = ({ setStep }) => {
    const {
        register,
        trigger,
        watch,
        formState: { errors }
    } = useFormContext()

    const role = watch("role")

    const handleNext = async () => {
        const valid = await trigger([
            "role",
            role === "student" ? "admno" : "empcode"
        ])
        if (valid) return setStep((prev) => prev + 1)
    }

    return (
        <div className='flex flex-col gap-6 w-full text-sm'>
            <SelectRole />
            {role && (
                <div className='flex flex-col gap-2'>
                    <label
                        htmlFor={role === "student" ? "admno" : "empcode"}
                        className='text-primary'
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

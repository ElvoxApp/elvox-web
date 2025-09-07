import SelectRole from "./SelectRole"
import Input from "./Input"
import Button from "./Button"
import { Link } from "react-router-dom"
import { useFormContext } from "react-hook-form"

const SignUpRoleStep = ({ setStep }) => {
    const {
        register,
        trigger,
        getValues,
        formState: { errors }
    } = useFormContext()

    const role = getValues("role")

    const handleNext = async () => {
        const valid = await trigger([
            "role",
            role === "student" ? "admno" : "teacherid"
        ])
        if (valid) return setStep((prev) => prev + 1)
    }

    return (
        <>
            <SelectRole />
            {role && (
                <div className='flex flex-col gap-2'>
                    <label
                        htmlFor='pass'
                        className='text-primary'
                    >
                        {role === "student" ? "Admission Number" : "Teacher ID"}
                    </label>
                    <Input
                        type='number'
                        id={role === "student" ? "admno" : "teacherid"}
                        defaultValue='12345' // MUST CHANGE BACK TO EMPTY STRING FOR PRODUCTION
                        placeholder={
                            role === "student"
                                ? "Enter your admission number"
                                : "Enter your teacher ID"
                        }
                        register={register}
                        errors={errors}
                        rules={{
                            required:
                                role === "student"
                                    ? "Admission number is required"
                                    : "Teacher ID is required"
                        }}
                        key='password'
                    />
                    {errors[role === "student" ? "admno" : "teacherid"] && (
                        <p className='text-xs text-red-500 mt-1 font-medium'>
                            {
                                errors[
                                    role === "student" ? "admno" : "teacherid"
                                ].message
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
        </>
    )
}

export default SignUpRoleStep

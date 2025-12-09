import { useEffect, useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import Logo from "../components/Logo"
import Title from "../components/Title"
import FullScreenLoader from "../components/FullScreenLoader"
import SignUpForm from "../components/SignUpForm"
import SignUpSelectRole from "../components/SignUpSelectRole"
import SignUpVerifyDetails from "../components/SignUpVerifyDetails"
import SignUpEnterPassword from "../components/SignUpEnterPassword"
import SignUpEnterOTP from "../components/SignUpEnterOTP"
import { useNavigate } from "react-router-dom"
import { useAuthStore } from "../stores"

const SignUp = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [step, setStep] = useState(1)
    const { isAuthenticated } = useAuthStore()
    const methods = useForm()
    const navigate = useNavigate()
    const widths = {
        1: "w-1/4",
        2: "w-2/4",
        3: "w-3/4",
        4: "w-full"
    }

    useEffect(() => {
        if (isAuthenticated) navigate("/")
    }, [isAuthenticated, navigate])

    return (
        <>
            <div className='flex flex-col justify-center gap-10 items-center min-h-dvh w-full relative bg-bg-light dark:bg-bg-dark py-3'>
                <title>Sign Up</title>
                <div className=''>
                    <Logo
                        width={150}
                        height={150}
                    />
                </div>
                <div className='w-11/12 md:w-9/12 lg:w-7/12 xl:w-5/12 2xl:w-4/12 bg-card-light dark:bg-card-dark rounded-xl shadow-lg flex flex-col items-center gap-10 px-10 py-11'>
                    <div className='flex flex-col items-center gap-2 w-full'>
                        <p className='text-xs text-secondary-light dark:text-secondary-dark font-sansation'>
                            Step {step} of 4
                        </p>
                        <div className='w-full h-2 rounded-xl bg-field-light dark:bg-field-dark '>
                            <p
                                className={`${widths[step]} bg-accent h-full rounded-xl transition-all duration-300 ease-in-out`}
                            ></p>
                        </div>
                    </div>
                    <Title
                        title='Sign Up'
                        className='text-3xl '
                    />
                    <FormProvider {...methods}>
                        <SignUpForm setIsLoading={setIsLoading}>
                            <>
                                {step === 1 && (
                                    <SignUpSelectRole setStep={setStep} />
                                )}
                                {step === 2 && (
                                    <SignUpVerifyDetails setStep={setStep} />
                                )}
                                {step === 3 && (
                                    <SignUpEnterPassword
                                        setStep={setStep}
                                        setIsLoading={setIsLoading}
                                    />
                                )}
                                {step === 4 && (
                                    <SignUpEnterOTP setStep={setStep} />
                                )}
                            </>
                        </SignUpForm>
                    </FormProvider>
                </div>
            </div>
            {isLoading && <FullScreenLoader />}
        </>
    )
}

export default SignUp

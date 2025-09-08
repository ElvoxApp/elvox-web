import { useFormContext } from "react-hook-form"
import { EyeOpenIcon, EyeNoneIcon } from "@radix-ui/react-icons"
import Button from "./Button"
import Input from "./Input"
import { useState } from "react"
import ChooseOTPMethod from "./ChooseOTPMEthod"

const passwordRegex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/

const SignUpEnterPassword = ({ setStep }) => {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const {
        register,
        trigger,
        getValues,
        formState: { errors }
    } = useFormContext()

    const handleNext = async () => {
        const valid = await trigger([
            "password",
            "confirmPassword",
            "otpMethod"
        ])
        if (valid) {
            // Call API to send OTP

            // --------------------
            setStep((prev) => prev + 1)
        }
    }

    const handlePrev = () => {
        setStep((prev) => prev - 1)
    }

    return (
        <div className='flex flex-col gap-6 w-full text-sm'>
            <div className='flex flex-col gap-2'>
                <label
                    htmlFor='password'
                    className='text-primary'
                >
                    Password
                </label>
                <div className='relative w-full'>
                    <Input
                        type={showPassword ? "text" : "password"}
                        id='password'
                        placeholder='Enter your password'
                        className='pr-10 select-none'
                        register={register}
                        errors={errors}
                        rules={{
                            required: "Password is required",
                            pattern: {
                                value: passwordRegex,
                                message:
                                    "Min 8 chars, at least 1 upper, 1 lower, 1 number, 1 special char"
                            }
                        }}
                    />
                    {showPassword ? (
                        <EyeNoneIcon
                            className='absolute right-3 top-1/2 -translate-y-1/2 text-primary cursor-pointer'
                            onClick={() => setShowPassword(false)}
                        />
                    ) : (
                        <EyeOpenIcon
                            className='absolute right-3 top-1/2 -translate-y-1/2 text-primary cursor-pointer'
                            onClick={() => setShowPassword(true)}
                        />
                    )}
                </div>
                {errors.password && (
                    <p className='text-xs text-red-500 mt-1 font-medium'>
                        {errors.password.message}
                    </p>
                )}
            </div>
            <div className='flex flex-col gap-2'>
                <label
                    htmlFor='password-confirm'
                    className='text-primary'
                >
                    Confirm Password
                </label>
                <div className='relative w-full'>
                    <Input
                        type={showConfirmPassword ? "text" : "password"}
                        id='confirmPassword'
                        placeholder='Confirm your password'
                        className='pr-10 select-none'
                        register={register}
                        errors={errors}
                        rules={{
                            required: "Confirm your password",
                            validate: (value) =>
                                value === getValues("password") ||
                                "Passwords do not match"
                        }}
                    />
                    {showConfirmPassword ? (
                        <EyeNoneIcon
                            className='absolute right-3 top-1/2 -translate-y-1/2 text-primary cursor-pointer'
                            onClick={() => setShowConfirmPassword(false)}
                        />
                    ) : (
                        <EyeOpenIcon
                            className='absolute right-3 top-1/2 -translate-y-1/2 text-primary cursor-pointer'
                            onClick={() => setShowConfirmPassword(true)}
                        />
                    )}
                </div>
                {errors.confirmPassword && (
                    <p className='text-xs text-red-500 mt-1 font-medium'>
                        {errors.confirmPassword.message}
                    </p>
                )}
            </div>
            <ChooseOTPMethod />
            <div className='flex justify-center gap-3 w-full'>
                <Button
                    text='Previous'
                    className='w-1/2 h-11 text-sm bg-secondary-button hover:bg-secondary-button-hover'
                    type='button'
                    onClick={handlePrev}
                />
                <Button
                    text='Send OTP'
                    className='w-1/2 h-11 text-sm bg-accent hover:bg-button-hover'
                    type='button'
                    onClick={handleNext}
                />
            </div>
        </div>
    )
}

export default SignUpEnterPassword

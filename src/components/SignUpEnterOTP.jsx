import { useFormContext } from "react-hook-form"
import Button from "./Button"
import OTPInput from "./OTPInput"

const SignUpEnterOTP = ({ setStep }) => {
    const { getValues, watch } = useFormContext()

    const user = getValues("user")
    const method = getValues("otpMethod")
    const otp = watch("otp")

    const handlePrev = () => {
        setStep((prev) => prev - 1)
    }

    return (
        <div className='flex flex-col gap-6 w-full text-sm'>
            <div className='flex flex-col items-center gap-4'>
                <p className='text-primary'>
                    Enter the OTP sent to {user[method]}
                </p>
                <OTPInput />
            </div>
            <div className='flex justify-center gap-3 w-full'>
                <Button
                    text='Previous'
                    className='w-1/2 h-11 text-sm bg-secondary-button hover:bg-secondary-button-hover'
                    type='button'
                    onClick={handlePrev}
                />
                <Button
                    text='Submit'
                    className='w-1/2 h-11 text-sm bg-accent hover:bg-button-hover'
                    type='submit'
                    disabled={otp?.length !== 6}
                />
            </div>
        </div>
    )
}

export default SignUpEnterOTP

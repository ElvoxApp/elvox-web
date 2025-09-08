import { useFormContext } from "react-hook-form"
import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/outline"

const ChooseOTPMethod = () => {
    const {
        register,
        watch,
        formState: { errors }
    } = useFormContext()
    const method = watch("otpMethod")

    return (
        <div className='flex flex-col w-full gap-2 pb-5'>
            <p
                htmlFor='otpMethod'
                className='text-base text-primary'
            >
                Choose where to receive OTP
            </p>
            <div className='flex w-full gap-3 justify-center'>
                <label
                    className={`flex flex-col items-center gap-1 w-1/2 py-7 rounded-md text-primary cursor-pointer active:scale-95 fo transition-all duration-200 ${
                        method === "email"
                            ? "bg-accent hover:bg-button-hover"
                            : "bg-field hover:bg-secondary-button-hover"
                    }`}
                >
                    <input
                        type='radio'
                        value='email'
                        className='hidden'
                        {...register("otpMethod", {
                            required: "Select a method"
                        })}
                    />
                    <EnvelopeIcon className='text-primary w-6' />
                    <p>Email</p>
                </label>
                <label
                    className={`flex flex-col items-center gap-1 w-1/2 py-7 rounded-md text-primary cursor-pointer active:scale-95 transition-all duration-200 ${
                        method === "phone"
                            ? "bg-accent hover:bg-button-hover"
                            : "bg-field hover:bg-secondary-button-hover"
                    }`}
                >
                    <input
                        type='radio'
                        value='phone'
                        className='hidden'
                        {...register("otpMethod", {
                            required: "Select a method"
                        })}
                    />
                    <PhoneIcon className='text-primary w-6' />
                    <p>Phone</p>
                </label>
            </div>
            {errors.otpMethod && (
                <p className='text-xs text-red-500 mt-1 font-medium'>
                    {errors.otpMethod.message}
                </p>
            )}
        </div>
    )
}

export default ChooseOTPMethod

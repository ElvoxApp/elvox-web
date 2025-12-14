import { useFormContext } from "react-hook-form"
import validateEmailOrPhone from "../utils/validateEmailOrPhone"
import Input from "./Input"

const ForgotPasswordFormEmailOrPassFIeld = ({ handleNext }) => {
    const {
        register,
        formState: { errors }
    } = useFormContext()

    return (
        <div className='flex flex-col gap-2'>
            <label
                htmlFor='eop'
                className='text-primary-light dark:text-primary-dark'
            >
                Email or Phone
            </label>
            <Input
                type='text'
                id='eop'
                placeholder='Enter your email or phone'
                register={register}
                errors={errors}
                rules={validateEmailOrPhone}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        e.preventDefault()
                        handleNext()
                    }
                }}
            />
            {errors.eop && (
                <p className='text-xs text-red-500 mt-1 font-medium'>
                    {errors.eop.message}
                </p>
            )}
        </div>
    )
}

export default ForgotPasswordFormEmailOrPassFIeld

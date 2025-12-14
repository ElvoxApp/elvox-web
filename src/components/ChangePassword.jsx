import { useState } from "react"
import { useFormContext } from "react-hook-form"
import Input from "./Input"
import { EyeNoneIcon, EyeOpenIcon } from "@radix-ui/react-icons"

const passwordRegex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/

const ChangePassword = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const {
        register,
        getValues,
        formState: { errors }
    } = useFormContext()

    return (
        <div className='flex flex-col gap-6 w-full text-sm'>
            <div className='flex flex-col gap-2'>
                <label
                    htmlFor='newPassword'
                    className='text-primary-light dark:text-primary-dark'
                >
                    New Password
                </label>
                <div className='relative w-full'>
                    <Input
                        type={showPassword ? "text" : "password"}
                        id='newPassword'
                        placeholder='Enter your new password'
                        className='pr-10 select-none'
                        register={register}
                        errors={errors}
                        rules={{
                            required: "New password is required",
                            pattern: {
                                value: passwordRegex,
                                message:
                                    "Min 8 chars, at least 1 upper, 1 lower, 1 number, 1 special char"
                            }
                        }}
                    />
                    {showPassword ? (
                        <EyeNoneIcon
                            className='absolute right-3 top-1/2 -translate-y-1/2 text-primary-light dark:text-primary-dark cursor-pointer'
                            onClick={() => setShowPassword(false)}
                        />
                    ) : (
                        <EyeOpenIcon
                            className='absolute right-3 top-1/2 -translate-y-1/2 text-primary-light dark:text-primary-dark cursor-pointer'
                            onClick={() => setShowPassword(true)}
                        />
                    )}
                </div>
                {errors?.newPassword && (
                    <p className='text-xs text-red-500 mt-1 font-medium'>
                        {errors?.newPassword?.message}
                    </p>
                )}
            </div>
            <div className='flex flex-col gap-2'>
                <label
                    htmlFor='confirmNewPassword'
                    className='text-primary-light dark:text-primary-dark'
                >
                    Confirm New Password
                </label>
                <div className='relative w-full'>
                    <Input
                        type={showConfirmPassword ? "text" : "password"}
                        id='confirmNewPassword'
                        placeholder='Confirm your new password'
                        className='pr-10 select-none'
                        register={register}
                        errors={errors}
                        rules={{
                            required: "Confirm your new password",
                            validate: (value) =>
                                value === getValues("newPassword") ||
                                "Passwords do not match"
                        }}
                    />
                    {showConfirmPassword ? (
                        <EyeNoneIcon
                            className='absolute right-3 top-1/2 -translate-y-1/2 text-primary-light dark:text-primary-dark cursor-pointer'
                            onClick={() => setShowConfirmPassword(false)}
                        />
                    ) : (
                        <EyeOpenIcon
                            className='absolute right-3 top-1/2 -translate-y-1/2 text-primary-light dark:text-primary-dark cursor-pointer'
                            onClick={() => setShowConfirmPassword(true)}
                        />
                    )}
                </div>
                {errors?.confirmNewPassword && (
                    <p className='text-xs text-red-500 mt-1 font-medium'>
                        {errors?.confirmNewPassword?.message}
                    </p>
                )}
            </div>
        </div>
    )
}

export default ChangePassword

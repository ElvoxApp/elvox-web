import { useState } from "react"
import { useFormContext } from "react-hook-form"
import Input from "./Input"
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5"

const passwordRegex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/

const ChangePassword = ({ forgot = true }) => {
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const {
        register,
        getValues,
        formState: { errors }
    } = useFormContext()

    return (
        <div className='flex flex-col gap-6 w-full text-sm'>
            {!forgot && (
                <div className='flex flex-col gap-2'>
                    <label
                        htmlFor='currentPassword'
                        className='text-primary-light dark:text-primary-dark'
                    >
                        Current Password
                    </label>
                    <div className='relative w-full'>
                        <Input
                            type='password'
                            id='currentPassword'
                            placeholder='Enter your current password'
                            className='pr-10 select-none'
                            register={register}
                            errors={errors}
                            rules={{
                                required: "Current password is required",
                                minLength: {
                                    value: 8,
                                    message: "Minimum 8 characters"
                                }
                            }}
                        />
                    </div>
                    {errors?.currentPassword && (
                        <p className='text-xs text-red-500 mt-1 font-medium'>
                            {errors?.currentPassword?.message}
                        </p>
                    )}
                </div>
            )}
            <div className='flex flex-col gap-2'>
                <label
                    htmlFor='newPassword'
                    className='text-primary-light dark:text-primary-dark'
                >
                    New Password
                </label>
                <div className='relative w-full'>
                    <Input
                        type={showNewPassword ? "text" : "password"}
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
                    {showNewPassword ? (
                        <IoEyeOffOutline
                            className='absolute right-3 top-1/2 -translate-y-1/2 text-primary-light dark:text-primary-dark cursor-pointer size-4'
                            onClick={() => setShowNewPassword(false)}
                        />
                    ) : (
                        <IoEyeOutline
                            className='absolute right-3 top-1/2 -translate-y-1/2 text-primary-light dark:text-primary-dark cursor-pointer size-4'
                            onClick={() => setShowNewPassword(true)}
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
                        <IoEyeOffOutline
                            className='absolute right-3 top-1/2 -translate-y-1/2 text-primary-light dark:text-primary-dark cursor-pointer size-4'
                            onClick={() => setShowConfirmPassword(false)}
                        />
                    ) : (
                        <IoEyeOutline
                            className='absolute right-3 top-1/2 -translate-y-1/2 text-primary-light dark:text-primary-dark cursor-pointer size-4'
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

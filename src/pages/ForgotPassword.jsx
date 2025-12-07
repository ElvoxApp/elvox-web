import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { EyeOpenIcon, EyeNoneIcon } from "@radix-ui/react-icons"
import Logo from "../components/Logo"
import Title from "../components/Title"
import FullScreenLoader from "../components/FullScreenLoader"
import { useAuthStore } from "../stores"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import Button from "../components/Button"
import axios from "axios"
import Input from "../components/Input"
import validateEmailOrPhone from "../utils/validateEmailOrPhone"

const API_URL = import.meta.env.VITE_API_URL
const passwordRegex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/

const ForgotPassword = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [showOtpField, setShowOtpField] = useState(false)
    const [showChangePassword, setShowChangePassword] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [otp, setOtp] = useState(Array(6).fill(""))
    const inputsRef = useRef([])
    const { isAuthenticated } = useAuthStore()
    const navigate = useNavigate()
    const {
        register,
        setValue,
        trigger,
        getValues,
        watch,
        formState: { errors }
    } = useForm()

    const otpField = watch("otp")

    const handleChange = (e, i) => {
        const val = e.target.value.replace(/[^0-9]/g, "")
        const newOtp = [...otp]
        newOtp[i] = val
        setOtp(newOtp)

        if (val && i < 5) {
            inputsRef.current[i + 1].focus()
        }
    }

    const handleKeyDown = (e, i) => {
        if (e.key === "Backspace" && !otp[i] && i > 0) {
            inputsRef.current[i - 1].focus()
        }
    }

    const handlePaste = (e, i) => {
        e.preventDefault()
        if (i === 0) {
            const paste = e.clipboardData.getData("text").replace(/[^0-9]/g, "")
            if (paste.length === 6) {
                setOtp(paste.split(""))
                inputsRef.current[5].focus()
            }
        }
    }

    const handleBlockFocus = (e, i) => {
        if (i > 0 && !otp[i - 1]) {
            e.preventDefault()
            inputsRef.current.find((_, index) => otp[index] === "")?.focus()
        }
    }

    const handleNext = async () => {
        const valid = await trigger()
        if (!valid) return

        if (!showOtpField) {
            try {
                setIsLoading(true)
                // API CALL TO SEND OTP
                setShowOtpField(true)
            } catch (err) {
                console.log(err)
            } finally {
                setIsLoading(false)
            }
        } else {
            setShowChangePassword(true)
            // VERIFY OTP (API CALL)

            // ------------------
            if (showChangePassword) {
                const data = getValues()
                console.log(data)
            }
        }
    }

    useEffect(() => {
        if (isAuthenticated) navigate("/")
    }, [isAuthenticated, navigate])

    useEffect(() => {
        const finalOtp = otp.join("")
        setValue("otp", finalOtp)
    }, [otp, setValue])

    useEffect(() => {
        if (showOtpField) inputsRef.current[0].focus()
    }, [showOtpField])

    return (
        <>
            <div className='flex flex-col justify-center gap-10 items-center min-h-dvh w-full relative bg-bg-light dark:bg-bg-dark py-3'>
                <title>Forgot Password</title>
                <div className=''>
                    <Logo
                        width={150}
                        height={150}
                    />
                </div>
                <div className='w-11/12 md:w-9/12 lg:w-7/12 xl:w-5/12 2xl:w-4/12 bg-card-light dark:bg-card-dark rounded-xl shadow-lg flex flex-col items-center gap-10 px-10 py-11'>
                    <Title
                        title='Forgot Password'
                        className='text-2xl '
                    />
                    <form className='flex flex-col gap-6 w-full text-sm'>
                        {!showChangePassword ? (
                            <>
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
                                    />
                                    {errors.eop && (
                                        <p className='text-xs text-red-500 mt-1 font-medium'>
                                            {errors.eop.message}
                                        </p>
                                    )}
                                </div>
                                {showOtpField && (
                                    <div className='flex flex-col gap-4'>
                                        <label
                                            htmlFor='eop'
                                            className='text-primary-light dark:text-primary-dark'
                                        >
                                            Enter the OTP
                                        </label>
                                        <div className='flex justify-center items-center gap-2 w-full'>
                                            {Array.from({ length: 6 }).map(
                                                (_, i) => (
                                                    <input
                                                        key={i}
                                                        type='text'
                                                        inputMode='numeric'
                                                        pattern='[0-9]*'
                                                        maxLength={1}
                                                        value={otp[i]}
                                                        onChange={(e) =>
                                                            handleChange(e, i)
                                                        }
                                                        onKeyDown={(e) =>
                                                            handleKeyDown(e, i)
                                                        }
                                                        onPaste={(e) =>
                                                            handlePaste(e, i)
                                                        }
                                                        onMouseDown={(e) =>
                                                            handleBlockFocus(
                                                                e,
                                                                i
                                                            )
                                                        }
                                                        onTouchStart={(e) =>
                                                            handleBlockFocus(
                                                                e,
                                                                i
                                                            )
                                                        }
                                                        ref={(el) =>
                                                            (inputsRef.current[
                                                                i
                                                            ] = el)
                                                        }
                                                        className={`outline-none border-secondary border-2 bg-field-light dark:bg-field-dark rounded-md w-1/6 h-11 p-3 text-xl text-primary-light dark:text-primary-dark text-center active:bg-field-light dark:active:bg-field-dark  ${
                                                            !errors?.["id"]
                                                                ? "focus:border-accent focus:ring-2 focus:ring-accent"
                                                                : ""
                                                        } ${
                                                            errors?.otp
                                                                ? "ring-2 ring-red-400"
                                                                : ""
                                                        }`}
                                                    />
                                                )
                                            )}

                                            {/*Hidden input to store the combined OTP in RHF*/}
                                            <input
                                                type='hidden'
                                                {...register("otp")}
                                            />
                                        </div>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className='flex flex-col gap-6 w-full text-sm'>
                                <div className='flex flex-col gap-2'>
                                    <label
                                        htmlFor='password'
                                        className='text-primary-light dark:text-primary-dark'
                                    >
                                        New Password
                                    </label>
                                    <div className='relative w-full'>
                                        <Input
                                            type={
                                                showPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            id='password'
                                            placeholder='Enter your new password'
                                            className='pr-10 select-none'
                                            register={register}
                                            errors={errors}
                                            rules={{
                                                required:
                                                    "Password is required",
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
                                                onClick={() =>
                                                    setShowPassword(false)
                                                }
                                            />
                                        ) : (
                                            <EyeOpenIcon
                                                className='absolute right-3 top-1/2 -translate-y-1/2 text-primary-light dark:text-primary-dark cursor-pointer'
                                                onClick={() =>
                                                    setShowPassword(true)
                                                }
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
                                        className='text-primary-light dark:text-primary-dark'
                                    >
                                        Confirm New Password
                                    </label>
                                    <div className='relative w-full'>
                                        <Input
                                            type={
                                                showConfirmPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            id='confirmPassword'
                                            placeholder='Confirm your new password'
                                            className='pr-10 select-none'
                                            register={register}
                                            errors={errors}
                                            rules={{
                                                required:
                                                    "Confirm your password",
                                                validate: (value) =>
                                                    value ===
                                                        getValues("password") ||
                                                    "Passwords do not match"
                                            }}
                                        />
                                        {showConfirmPassword ? (
                                            <EyeNoneIcon
                                                className='absolute right-3 top-1/2 -translate-y-1/2 text-primary-light dark:text-primary-dark cursor-pointer'
                                                onClick={() =>
                                                    setShowConfirmPassword(
                                                        false
                                                    )
                                                }
                                            />
                                        ) : (
                                            <EyeOpenIcon
                                                className='absolute right-3 top-1/2 -translate-y-1/2 text-primary-light dark:text-primary-dark cursor-pointer'
                                                onClick={() =>
                                                    setShowConfirmPassword(true)
                                                }
                                            />
                                        )}
                                    </div>
                                    {errors.confirmPassword && (
                                        <p className='text-xs text-red-500 mt-1 font-medium'>
                                            {errors.confirmPassword.message}
                                        </p>
                                    )}
                                </div>
                            </div>
                        )}
                        <div className='pt-2'>
                            <Button
                                text='Next'
                                className='w-full h-11 text-sm bg-accent hover:bg-button-hover'
                                onClick={handleNext}
                                disabled={showOtpField && otpField.length !== 6}
                            />
                        </div>
                        <div className='flex items-center justify-between text-link'>
                            <Link
                                to='/signup'
                                className='hover:text-link-hover'
                            >
                                Don't have an account?
                                <br />
                                Sign Up
                            </Link>
                            <Link
                                to='/login'
                                className='hover:text-link-hover text-right'
                            >
                                Already have an account?
                                <br />
                                Login
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
            {isLoading && <FullScreenLoader />}
        </>
    )
}

export default ForgotPassword

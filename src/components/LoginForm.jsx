import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import Button from "../components/Button"
import axios from "axios"
import Input from "./Input"

const API_URL = import.meta.env.VITE_API_URL

const LoginForm = ({ setIsLoading }) => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm()

    const navigate = useNavigate()

    const validateEmailOrPhone = (value) => {
        const emailRegex = /^\S+@\S+\.\S+$/
        const phoneRegex = /^[0-9]{10}$/
        if (!value) return "Email or phone is required"
        if (!emailRegex.test(value) && !phoneRegex.test(value)) {
            return "Enter a valid email or phone number"
        }
        return true
    }

    // ONLY FOR DEMO PURPOSES, MUST CHANGE FOR PRODUCTION
    const onSubmit = async (data) => {
        try {
            setIsLoading(true)
            const res = await axios.get(`${API_URL}/users`)
            const users = res.data
            const user = users.find(
                (u) =>
                    (u.email === data.eop || u.phone === data.eop) &&
                    u.password === data.password
            )
            if (user) navigate("/")
        } catch (error) {
            console.error("Error fetching users: ", error)
        } finally {
            setIsLoading(false)
        }
    }
    // -----------------------------------------------------------

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className='flex flex-col gap-6 w-full text-sm'
        >
            <div className='flex flex-col gap-2'>
                <label
                    htmlFor='eop'
                    className='text-primary'
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
                    key='eop'
                />
                {errors.eop && (
                    <p className='text-xs text-red-500 mt-1 font-medium'>
                        {errors.eop.message}
                    </p>
                )}
            </div>
            <div className='flex flex-col gap-2'>
                <label
                    htmlFor='password'
                    className='text-primary'
                >
                    Password
                </label>
                <Input
                    type='password'
                    id='password'
                    placeholder='Enter your password'
                    register={register}
                    errors={errors}
                    rules={{
                        required: "Password is required",
                        minLength: {
                            value: 8,
                            message: "At least 8 characters"
                        }
                    }}
                    key='password'
                />

                {errors.password && (
                    <p className='text-xs text-red-500 mt-1 font-medium'>
                        {errors.password.message}
                    </p>
                )}
            </div>
            <div className='pt-2'>
                <Button
                    text='Login'
                    className='w-full h-11 text-sm bg-accent hover:bg-button-hover'
                    type='submit'
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
                    to='#'
                    className='hover:text-link-hover'
                >
                    Forgot
                    <br />
                    password?
                </Link>
            </div>
        </form>
    )
}

export default LoginForm

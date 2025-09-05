import { Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import Button from "../components/Button"

const LoginForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const validateEmailOrPhone = (value) => {
        const emailRegex = /^\S+@\S+\.\S+$/
        const phoneRegex = /^[0-9]{10}$/ // adjust if needed
        if (!value) return "Email or phone is required"
        if (!emailRegex.test(value) && !phoneRegex.test(value)) {
            return "Enter a valid email or 10-digit phone number"
        }
        return true
    }

    const onSubmit = (data) => {
        console.log(data)
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className='flex flex-col gap-6 w-full text-sm 2xl:text- my-auto mb-20'
        >
            <div className='flex flex-col gap-2'>
                <label
                    htmlFor='eop'
                    className='text-primary'
                >
                    Email or Phone
                </label>
                <input
                    type='text'
                    id='eop'
                    className='outline-none border-none bg-field rounded-md w-full h-11 p-3 text-primary placeholder:text-secondary focus:border-accent focus:ring-2 focus:ring-accent'
                    placeholder='Enter your email or phone'
                    {...register("eop", { validate: validateEmailOrPhone })}
                />
                {errors.eop && <p className=''>{errors.eop.message}</p>}
            </div>
            <div className='flex flex-col gap-2'>
                <label
                    htmlFor='pass'
                    className='text-primary'
                >
                    Password
                </label>
                <input
                    type='password'
                    id='password'
                    className='outline-none border-none bg-field rounded-md w-full h-11 p-3 text-primary placeholder:text-secondary focus:border-accent focus:ring-2 focus:ring-accent'
                    placeholder='Enter your password'
                    {...register("password", {
                        required: "Password is required",
                    })}
                />
                {errors.password && <p>{errors.password.message}</p>}
            </div>
            <div className='pt-2'>
                <Button
                    text='Login'
                    className='w-full h-11 text-sm'
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

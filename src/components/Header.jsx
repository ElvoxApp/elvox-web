import {
    IoMoonOutline,
    IoSunnyOutline,
    IoNotificationsOutline
} from "react-icons/io5"
import Logo from "./Logo"
import { Link, useNavigate } from "react-router-dom"
import { useAuthStore, useThemeStore } from "../stores"

const Header = ({ title }) => {
    const navigate = useNavigate()

    const { user } = useAuthStore()
    const { theme, toggleTheme } = useThemeStore()

    return (
        <div className='flex w-full justify-between items-center'>
            <div className='flex items-center gap-5'>
                <Link to='/'>
                    <Logo
                        width={40}
                        textless={true}
                        className='cursor-pointer'
                        onClick={() => navigate("/")}
                    />
                </Link>
                <h1 className='text-xl font-semibold sm:hidden text-primary-light dark:text-primary-dark '>
                    {title}
                </h1>
            </div>
            <div className='flex items-center gap-6'>
                {theme === "dark" ? (
                    <IoSunnyOutline
                        className='text-primary-light dark:text-primary-dark text-xl cursor-pointer'
                        onClick={toggleTheme}
                    />
                ) : (
                    <IoMoonOutline
                        className='text-primary-light dark:text-primary-dark text-xl cursor-pointer'
                        onClick={toggleTheme}
                    />
                )}
                <Link to='#'>
                    <IoNotificationsOutline className='text-primary-light dark:text-primary-dark text-xl cursor-pointer' />
                </Link>
                <img
                    src={user?.avatar}
                    width={40}
                    className='rounded-full cursor-pointer select-none'
                />
            </div>
        </div>
    )
}

export default Header

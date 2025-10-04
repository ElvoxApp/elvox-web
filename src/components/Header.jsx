import { IoMoonOutline, IoSunnyOutline } from "react-icons/io5"
import { HiOutlineBell } from "react-icons/hi"
import Logo from "./Logo"
import { useNavigate } from "react-router-dom"
import { useAuthStore, useThemeStore } from "../stores"

const Header = ({ title }) => {
    const navigate = useNavigate()

    const { user } = useAuthStore()
    const { theme, toggleTheme } = useThemeStore()

    return (
        <div className='flex w-full justify-between items-center'>
            <div className='flex items-center gap-5'>
                <Logo
                    width={40}
                    textless={true}
                    className='cursor-pointer'
                    onClick={() => navigate("/")}
                />
                <h1 className='text-lg font-semibold sm:hidden text-primary'>
                    {title}
                </h1>
            </div>
            <div className='flex items-center gap-6'>
                {theme === "dark" ? (
                    <IoSunnyOutline
                        className='text-secondary text-xl cursor-pointer'
                        onClick={toggleTheme}
                    />
                ) : (
                    <IoMoonOutline
                        className='text-secondary text-xl cursor-pointer'
                        onClick={toggleTheme}
                    />
                )}
                <HiOutlineBell className='text-secondary text-xl cursor-pointer' />
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

import {
    IoMoonOutline,
    IoSunnyOutline,
    IoNotificationsOutline
} from "react-icons/io5"
import Logo from "./Logo"
import { Link, useNavigate } from "react-router-dom"
import { useAuthStore, useThemeStore } from "../stores"
import ProfileMenu from "./ProfileMenu"
import { useEffect, useRef, useState } from "react"

const Header = ({ title }) => {
    const [showProfileMenu, setShowProfileMenu] = useState(false)
    const profileMenuRef = useRef(null)
    const profileRef = useRef(null)
    const navigate = useNavigate()

    const { user } = useAuthStore()
    const { theme, toggleTheme } = useThemeStore()

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (
                profileMenuRef.current &&
                !profileMenuRef.current.contains(e.target) &&
                profileRef.current &&
                !profileRef.current.contains(e.target)
            ) {
                setShowProfileMenu(false)
            }
        }

        window.addEventListener("pointerdown", handleClickOutside)

        return () => {
            window.removeEventListener("pointerdown", handleClickOutside)
        }
    }, [])

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
                <div className='flex flex-col relative'>
                    <img
                        src={user?.avatar}
                        alt={user?.name}
                        width={40}
                        className='rounded-full cursor-pointer select-none'
                        onClick={() => setShowProfileMenu((prev) => !prev)}
                        ref={profileRef}
                    />
                    {showProfileMenu && (
                        <ProfileMenu profileMenuRef={profileMenuRef} />
                    )}
                </div>
            </div>
        </div>
    )
}

export default Header

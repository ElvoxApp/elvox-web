import {
    IoMoonOutline,
    IoSunnyOutline,
    IoNotificationsOutline
} from "react-icons/io5"
import Logo from "./Logo"
import { Link } from "react-router-dom"
import { useAuthStore, useNotificationStore, useThemeStore } from "../stores"
import ProfileMenu from "./ProfileMenu"
import { useEffect, useRef, useState } from "react"

const Header = ({ title, setShowChangePasswordModal }) => {
    const [showProfileMenu, setShowProfileMenu] = useState(false)
    const profileMenuRef = useRef(null)
    const profileRef = useRef(null)

    const { user } = useAuthStore()
    const { theme, toggleTheme } = useThemeStore()
    const { unread } = useNotificationStore()

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
            <div className='flex items-center sm:gap-5 gap-3'>
                <Link to='/'>
                    <Logo
                        textless={true}
                        className='w-10 lg:w-12 cursor-pointer'
                    />
                </Link>
                <h1 className='text-base sm:text-xl lg:text-2xl font-semibold text-primary-light dark:text-primary-dark'>
                    {title}
                </h1>
            </div>
            <div className='flex items-center lg:gap-8 sm:gap-6 gap-5'>
                {theme === "dark" ? (
                    <IoSunnyOutline
                        className='text-primary-light dark:text-primary-dark text-xl cursor-pointer'
                        onClick={toggleTheme}
                    />
                ) : (
                    <IoMoonOutline
                        className='text-primary-light dark:text-primary-dark text-2xl cursor-pointer'
                        onClick={toggleTheme}
                    />
                )}
                <Link
                    to='/notifications'
                    className='relative'
                >
                    <IoNotificationsOutline className='text-primary-light dark:text-primary-dark text-2xl cursor-pointer' />
                    {unread > 0 && (
                        <p className='absolute top-0 -right-0.5 text-xs bg-red-600 text-white rounded-full w-4 h-4 flex justify-center items-center text-center'>
                            {unread}
                        </p>
                    )}
                </Link>
                <div className='flex flex-col relative'>
                    <img
                        src={user?.profile_pic}
                        alt={user?.name}
                        className='rounded-full cursor-pointer select-none w-12 lg:w-14'
                        onClick={() => setShowProfileMenu((prev) => !prev)}
                        ref={profileRef}
                    />
                    {showProfileMenu && (
                        <ProfileMenu
                            profileMenuRef={profileMenuRef}
                            setShowChangePasswordModal={
                                setShowChangePasswordModal
                            }
                            setShowProfileMenu={setShowProfileMenu}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}

export default Header

import { LuUserRound, LuLogOut } from "react-icons/lu"
import { useAuthStore } from "../stores"
import { Link } from "react-router-dom"

const ProfileMenu = ({ profileMenuRef }) => {
    const { user, logout } = useAuthStore()

    return (
        <div
            className='flex flex-col absolute right-0 top-full bg-card-light dark:bg-card-dark text-primary-light dark:text-primary-dark shadow-lg dark:shadow-bg-dark rounded-md w-56 mt-2 px-3 py-4 text-sm'
            ref={profileMenuRef}
        >
            <div className='flex items-center gap-3 border-b pb-3'>
                <img
                    src={user?.avatar}
                    alt={user?.name}
                    width={64}
                    className='rounded-full select-none'
                />
                <p className='font-medium text-base'>{user.name}</p>
            </div>
            <div className='flex flex-col pt-3 gap-2'>
                <Link to='#'>
                    <button className='flex items-center gap-2 cursor-pointer'>
                        <LuUserRound className='text-base' />
                        <p>Account Settings</p>
                    </button>
                </Link>
                <button
                    className='flex items-center gap-2 cursor-pointer'
                    onClick={logout}
                >
                    <LuLogOut className='text-base' />
                    <p>Logout</p>
                </button>
            </div>
        </div>
    )
}

export default ProfileMenu

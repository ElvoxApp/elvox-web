import { Link } from "react-router-dom"
import { useAuthStore } from "../stores"
import Button from "./Button"

const NoActiveElection = () => {
    const {
        user: { role }
    } = useAuthStore()

    return (
        <div className='flex flex-col px-3 py-10 gap-8 max-w-lg'>
            <div className='flex justify-center'>
                <h2 className='text-center text-primary-light dark:text-primary-dark text-2xl md:text-3xl lg:text-4xl font-black w-[20ch]'>
                    No Elections Are Currently Active Or Scheduled
                </h2>
            </div>
            <div className='flex items-stretch gap-4 px-3'>
                {role === "admin" && (
                    <Link
                        to='#'
                        className='flex-1'
                    >
                        <Button
                            text='Shedule New Election'
                            className='w-full h-full px-6 py-3 text-sm font-medium bg-accent hover:bg-button-hover'
                        />
                    </Link>
                )}
                <Link
                    to='/results'
                    className='flex-1'
                >
                    <Button
                        text='View Past Results'
                        className='w-full h-full px-6 py-3 text-sm font-medium bg-accent hover:bg-button-hover'
                    />
                </Link>
            </div>
        </div>
    )
}

export default NoActiveElection

import { Link } from "react-router-dom"
import { useAuthStore } from "../stores"
import Button from "./Button"

const NoActiveElection = () => {
    const {
        user: { role }
    } = useAuthStore()

    return (
        <div className='flex flex-col px-3 py-4 gap-8'>
            <div className='flex justify-center'>
                <h2 className='text-center text-primary-light dark:text-primary-dark text-2xl md:text-3xl lg:text-4xl font-black w-[20ch]'>
                    No Elections Are Currently Active Or Scheduled
                </h2>
            </div>
            {role === "admin" && (
                <div className='flex justify-center items-center'>
                    <Link to='#'>
                        <Button
                            text='Shedule New Election'
                            className='px-6 py-3 text-sm font-medium bg-accent hover:bg-button-hover'
                        />
                    </Link>
                </div>
            )}
        </div>
    )
}

export default NoActiveElection

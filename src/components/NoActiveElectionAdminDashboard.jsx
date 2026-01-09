import { Link } from "react-router-dom"
import Button from "./Button"
import { LuCalendarCheck, LuClipboardList, LuScroll } from "react-icons/lu"
import { FiAward } from "react-icons/fi"

const NoActiveElectionAdminDashboard = ({ setShowCreateElectionModal }) => {
    return (
        <>
            <div className='flex flex-col w-full gap-2 px-4 py-14 rounded-md dark:bg-card-dark bg-card-light shadow-lg transition-all duration-100'>
                <div className='flex flex-col items-center gap-6'>
                    <h2 className='text-center text-primary-light dark:text-primary-dark text-base md:text-xl lg:text-2xl font-black'>
                        No election scheduled. Schedule a new election to begin
                    </h2>
                </div>
            </div>
            <div className='flex flex-col gap-10'>
                <div className='grid grid-cols-2 gap-x-3 gap-y-4 lg:gap-y-3 w-full'>
                    <Button
                        className='flex flex-col justify-center items-center py-5 lg:py-7 gap-1 bg-accent hover:bg-button-hover w-full h-full'
                        onClick={() => setShowCreateElectionModal(true)}
                    >
                        <LuCalendarCheck className='text-primary-dark text-base lg:text-lg' />
                        <span className=''>Shedule New Election</span>
                    </Button>
                    <Link to='/appeals'>
                        <Button className='flex flex-col justify-center items-center py-5 lg:py-7 gap-1 bg-accent hover:bg-button-hover w-full h-full'>
                            <LuScroll className='text-primary-dark text-base lg:text-lg' />
                            <span className=''>View Appeals</span>
                        </Button>
                    </Link>
                    <Link
                        to='/results'
                        className='flex-1'
                    >
                        <Button className='flex flex-col justify-center items-center py-5 lg:py-7 gap-1 bg-accent hover:bg-button-hover w-full h-full'>
                            <FiAward className='text-primary-dark text-base lg:text-lg' />
                            <span className=''>Election Results</span>
                        </Button>
                    </Link>
                    <Link to='#'>
                        <Button className='flex flex-col justify-center items-center py-5 lg:py-7 gap-1 bg-accent hover:bg-button-hover w-full h-full'>
                            <LuClipboardList className='text-primary-dark text-base lg:text-lg' />
                            <span className=''>Audit Logs</span>
                        </Button>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default NoActiveElectionAdminDashboard

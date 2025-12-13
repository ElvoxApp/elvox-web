import Button from "./Button"
import { IoSettingsOutline } from "react-icons/io5"
import { FiAward } from "react-icons/fi"
import { LuScroll, LuUsers } from "react-icons/lu"
import { IoFlagOutline } from "react-icons/io5"
import { Link } from "react-router-dom"

const DashboardOptionsAdmin = () => {
    return (
        <div className='grid grid-cols-2 lg:grid-cols-3 gap-x-3 gap-y-4 lg:gap-y-3 w-full'>
            <Link to='#'>
                <Button className='flex flex-col justify-center items-center py-5 lg:py-7 gap-1 bg-accent hover:bg-button-hover w-full'>
                    <IoSettingsOutline className='text-primary-dark text-base lg:text-lg' />
                    <span className=''>Manage Election</span>
                </Button>
            </Link>
            <Link to='#'>
                <Button className='flex flex-col justify-center items-center py-5 lg:py-7 gap-1 bg-accent hover:bg-button-hover w-full'>
                    <LuUsers className='text-primary-dark text-base lg:text-lg' />
                    <span className=''>Choose Supervisors</span>
                </Button>
            </Link>
            <Link to='candidates'>
                <Button className='flex flex-col justify-center items-center py-5 lg:py-7 gap-1 bg-accent hover:bg-button-hover w-full'>
                    <LuUsers className='text-primary-dark text-base lg:text-lg' />
                    <span className=''>View Candidates</span>
                </Button>
            </Link>
            <Link
                to='#'
                className='lg:hidden'
            >
                <Button className='flex flex-col justify-center items-center py-5 lg:py-7 gap-1 bg-accent hover:bg-button-hover w-full'>
                    <FiAward className='text-primary-dark text-base lg:text-lg' />
                    <span className=''>View Results</span>
                </Button>
            </Link>
            <Link
                to='#'
                className='max-lg:col-span-2 lg:hidden'
            >
                <Button className='flex flex-col justify-center items-center py-5 lg:py-7 gap-1 bg-accent hover:bg-button-hover w-full'>
                    <LuScroll className='text-primary-dark text-base lg:text-lg' />
                    <span className=''>View Appeals</span>
                </Button>
            </Link>
            <div className='max-lg:hidden grid grid-cols-2 col-span-3 gap-x-3'>
                <Link
                    to='#'
                    className=''
                >
                    <Button className='flex flex-col justify-center items-center py-7 gap-1 bg-accent hover:bg-button-hover w-full'>
                        <FiAward className='text-primary-dark text-lg' />
                        <span className=''>View Results</span>
                    </Button>
                </Link>
                <Link
                    to='#'
                    className=''
                >
                    <Button className='flex flex-col justify-center items-center py-7 gap-1 bg-accent hover:bg-button-hover w-full'>
                        <LuScroll className='text-primary-dark text-lg' />
                        <span className=''>View Appeals</span>
                    </Button>
                </Link>
            </div>
        </div>
    )
}

export default DashboardOptionsAdmin

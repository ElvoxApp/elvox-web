import Button from "./Button"
import { IoSettingsOutline } from "react-icons/io5"
import { FiAward } from "react-icons/fi"
import { LuScroll, LuUsers } from "react-icons/lu"
import { IoFlagOutline } from "react-icons/io5"
import { Link } from "react-router-dom"

const DashboardOptionsAdmin = () => {
    return (
        <div className='grid grid-cols-2 lg:grid-cols-3 gap-x-3 lg:gap-x-3 gap-y-4 lg:gap-y-2 w-full'>
            <Link to='#'>
                <Button className='flex flex-col justify-center items-center py-5 px-2 lg:p-7 gap-1 bg-accent hover:bg-button-hover w-full'>
                    <IoSettingsOutline className='text-primary-dark text-base lg:text-lg' />
                    <span className=''>Manage Election</span>
                </Button>
            </Link>
            <Link to='#'>
                <Button className='flex flex-col justify-center items-center py-5 px-2 lg:p-7 gap-1 bg-accent hover:bg-button-hover w-full'>
                    <LuUsers className='text-primary-dark text-base lg:text-lg' />
                    <span className=''>Choose Supervisors</span>
                </Button>
            </Link>
            <Link to='#'>
                <Button className='flex flex-col justify-center items-center py-5 px-2 lg:p-7 gap-1 bg-accent hover:bg-button-hover w-full'>
                    <LuUsers className='text-primary-dark text-base lg:text-lg' />
                    <span className=''>View Candidates</span>
                </Button>
            </Link>
            <Link to='#'>
                <Button className='flex flex-col justify-center items-center py-5 px-2 lg:p-7 gap-1 bg-accent hover:bg-button-hover w-full'>
                    <FiAward className='text-primary-dark text-base' />
                    <span className=''>View Results</span>
                </Button>
            </Link>
            <Link to='#'>
                <Button className='flex flex-col justify-center items-center py-5 px-2 lg:p-7 gap-1 bg-accent hover:bg-button-hover w-full'>
                    <LuScroll className='text-primary-dark text-base' />
                    <span className=''>View Appeals</span>
                </Button>
            </Link>
            <Link to='#'>
                <Button className='flex flex-col justify-center items-center py-5 px-2 lg:p-7 gap-1 bg-accent hover:bg-button-hover w-full'>
                    <IoFlagOutline className='text-primary-dark text-base' />
                    <span className=''>View Reports</span>
                </Button>
            </Link>
        </div>
    )
}

export default DashboardOptionsAdmin

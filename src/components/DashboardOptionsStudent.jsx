import Button from "./Button"
import { FaRegFileAlt } from "react-icons/fa"
import { FiAward } from "react-icons/fi"
import { LuScroll, LuUsers } from "react-icons/lu"
import { IoFlagOutline } from "react-icons/io5"
import { Link } from "react-router-dom"

const DashboardOptionsStudent = ({ setIsOpen }) => {
    return (
        <div className='grid grid-cols-2 lg:grid-cols-3 gap-x-3 lg:gap-x-3 gap-y-4 lg:gap-y-2 w-full'>
            <Button
                className='flex flex-col justify-center items-center py-5 px-2 lg:p-7 gap-1 bg-accent hover:bg-button-hover w-full'
                onClick={() => setIsOpen(true)}
            >
                <FaRegFileAlt className='text-primary-dark text-base lg:text-lg' />
                <span className=''>Submit Application</span>
            </Button>
            <Link to='#'>
                <Button className='flex flex-col justify-center items-center py-5 px-2 lg:p-7 gap-1 bg-accent hover:bg-button-hover w-full'>
                    <LuUsers className='text-primary-dark text-base lg:text-lg' />
                    <span className=''>View Candidates</span>
                </Button>
            </Link>
            <Link to='#'>
                <Button className='flex flex-col justify-center items-center py-5 px-2 lg:p-7 gap-1 bg-accent hover:bg-button-hover w-full'>
                    <FiAward className='text-primary-dark text-base lg:text-lg' />
                    <span className=''>View Results</span>
                </Button>
            </Link>
            <Link to='#'>
                <Button className='flex flex-col justify-center items-center py-5 px-2 gap-1 bg-accent hover:bg-button-hover lg:hidden w-full'>
                    <LuScroll className='text-primary-dark text-base' />
                    <span className=''>Submit Appeal</span>
                </Button>
            </Link>
            <Link
                to='#'
                className='max-lg:col-span-2'
            >
                <Button className='flex flex-col justify-center items-center py-5 px-2 gap-1 bg-accent hover:bg-button-hover lg:hidden w-full'>
                    <IoFlagOutline className='text-primary-dark text-base' />
                    <span className=''>Report</span>
                </Button>
            </Link>
            <div className='max-lg:hidden col-span-3 grid grid-cols-2 gap-x-3'>
                <Link to='#'>
                    <Button className='flex flex-col justify-center items-center p-7 gap-1 bg-accent hover:bg-button-hover w-full'>
                        <LuScroll className='text-primary-dark text-base lg:text-lg' />
                        <span className=''>Submit Appeal</span>
                    </Button>
                </Link>
                <Link to='#'>
                    <Button className='flex flex-col justify-center items-center p-7 gap-1 bg-accent hover:bg-button-hover w-full'>
                        <IoFlagOutline className='text-primary-dark text-base lg:text-lg' />
                        <span className=''>Report</span>
                    </Button>
                </Link>
            </div>
        </div>
    )
}

export default DashboardOptionsStudent

import Button from "./Button"
import { FaRegFileAlt } from "react-icons/fa"
import { MdPeopleOutline } from "react-icons/md"
import { FiAward } from "react-icons/fi"
import { LuScroll } from "react-icons/lu"
import { IoFlagOutline } from "react-icons/io5"

const DashboardOptionsStudent = () => {
    return (
        <div className='grid grid-cols-2 lg:grid-cols-3 gap-x-3 lg:gap-x-3 gap-y-4 w-full'>
            <Button className='flex flex-col justify-center items-center p-5 lg:p-7 gap-1 bg-accent hover:bg-button-hover'>
                <FaRegFileAlt className='text-primary text-base lg:text-lg' />
                <span className=''>Submit Application</span>
            </Button>
            <Button className='flex flex-col justify-center items-center p-5 lg:p-7 gap-1 bg-accent hover:bg-button-hover'>
                <MdPeopleOutline className='text-primary text-base lg:text-xl' />
                <span className=''>View Candidates</span>
            </Button>
            <Button className='flex flex-col justify-center items-center p-5 lg:p-7 gap-1 bg-accent hover:bg-button-hover'>
                <FiAward className='text-primary text-base lg:text-lg' />
                <span className=''>View Results</span>
            </Button>
            <Button className='flex flex-col justify-center items-center p-5 gap-1 bg-accent hover:bg-button-hover lg:hidden'>
                <LuScroll className='text-primary text-base' />
                <span className=''>Submit Appeal</span>
            </Button>
            <Button className='flex flex-col justify-center items-center p-5 gap-1 max-lg:col-span-2 bg-accent hover:bg-button-hover lg:hidden'>
                <IoFlagOutline className='text-primary text-base' />
                <span className=''>Report</span>
            </Button>
            <div className='max-lg:hidden col-span-3 grid grid-cols-2 gap-x-3'>
                <Button className='flex flex-col justify-center items-center p-5 lg:p-7 gap-1 bg-accent hover:bg-button-hover'>
                    <LuScroll className='text-primary text-base lg:text-lg' />
                    <span className=''>Submit Appeal</span>
                </Button>
                <Button className='flex flex-col justify-center items-center p-5 lg:p-7 gap-1 max-lg:col-span-2 bg-accent hover:bg-button-hover'>
                    <IoFlagOutline className='text-primary text-base lg:text-lg' />
                    <span className=''>Report</span>
                </Button>
            </div>
        </div>
    )
}

export default DashboardOptionsStudent

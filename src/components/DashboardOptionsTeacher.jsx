import Button from "./Button"
import { FaRegFileAlt } from "react-icons/fa"
import { FiAward } from "react-icons/fi"
import { LuScroll, LuUsers } from "react-icons/lu"
import { Link } from "react-router-dom"
import { useAuthStore } from "../stores"

const DashboardOptionsTeacher = () => {
    const {
        user: { tutor_of }
    } = useAuthStore()

    return (
        <div
            className={`grid ${
                tutor_of !== null ? "grid-cols-2" : "grid-cols-2 lg:grid-cols-3"
            } gap-x-3 gap-y-4 lg:gap-y-3 w-full`}
        >
            {tutor_of !== null && (
                <Link to='#'>
                    <Button className='flex flex-col justify-center items-center py-5 lg:py-7 gap-1 bg-accent hover:bg-button-hover w-full'>
                        <FaRegFileAlt className='text-primary-dark text-base lg:text-lg' />
                        <span className=''>Approve Applications</span>
                    </Button>
                </Link>
            )}
            <Link to='candidates'>
                <Button className='flex flex-col justify-center items-center py-5 lg:py-7 gap-1 bg-accent hover:bg-button-hover w-full'>
                    <LuUsers className='text-primary-dark text-base lg:text-lg' />
                    <span className=''>View Candidates</span>
                </Button>
            </Link>
            <Link to='#'>
                <Button className='flex flex-col justify-center items-center py-5 lg:py-7 gap-1 bg-accent hover:bg-button-hover w-full'>
                    <FiAward className='text-primary-dark text-base lg:text-lg' />
                    <span className=''>View Results</span>
                </Button>
            </Link>
            <Link
                to='#'
                className={`${tutor_of === null ? "max-lg:col-span-2" : ""}`}
            >
                <Button className='flex flex-col justify-center items-center py-5 lg:py-7 gap-1 bg-accent hover:bg-button-hover w-full'>
                    <LuScroll className='text-primary-dark text-base lg:text-lg' />
                    <span className=''>Submit Appeal</span>
                </Button>
            </Link>
        </div>
    )
}

export default DashboardOptionsTeacher

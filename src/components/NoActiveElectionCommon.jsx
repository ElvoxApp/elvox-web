import { Link } from "react-router-dom"
import Button from "./Button"
import { FiAward } from "react-icons/fi"

const NoActiveElectionCommon = () => {
    return (
        <div className='flex flex-col items-center gap-10 px-3 py-10 w-full'>
            <div className='flex justify-center'>
                <h2 className='text-center text-primary-light dark:text-primary-dark text-2xl md:text-3xl lg:text-4xl font-black'>
                    No Elections Are Currently Active Or Scheduled
                </h2>
            </div>
            <Link to='/results'>
                <Button className='flex flex-col justify-center items-center py-3 px-6 gap-1 bg-accent hover:bg-button-hover'>
                    <FiAward className='text-primary-dark text-base lg:text-lg' />
                    <span className=''>View Past Results</span>
                </Button>
            </Link>
        </div>
    )
}

export default NoActiveElectionCommon

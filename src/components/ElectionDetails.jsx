import { LuActivity, LuUsers } from "react-icons/lu"
import { FaRegCalendar } from "react-icons/fa"
import { LiaVoteYeaSolid } from "react-icons/lia"
import { useElectionStore } from "../stores"

const ElectionDetails = () => {
    const { electionDetails } = useElectionStore()
    return (
        <div className='flex flex-col w-full gap-2 px-4 py-4 rounded-md dark:bg-card-dark bg-card-light shadow-lg transition-all duration-100'>
            <h2 className='text-lg font-bold text-left text-primary-light dark:text-primary-dark'>
                {electionDetails?.title}
            </h2>
            <p className='flex items-center gap-1 text-secondary-light dark:text-secondary-dark'>
                <LuActivity className='text-secondary-light dark:text-secondary-dark' />
                <span>
                    Status:{" "}
                    <span className='text-accent'>
                        {electionDetails?.status}
                    </span>
                </span>
            </p>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 lg:gap-x-10 py-3 text-primary-light dark:text-primary-dark'>
                <div className='flex flex-col gap-0.5'>
                    <p>Start Date</p>
                    <p className='flex items-center gap-2'>
                        <FaRegCalendar className='text-accent' />
                        <span className='font-semibold'>
                            {electionDetails?.start}
                        </span>
                    </p>
                </div>
                <div className='flex flex-col gap-0.5'>
                    <p>End Date</p>
                    <p className='flex items-center gap-2'>
                        <FaRegCalendar className='text-accent' />
                        <span className='font-semibold'>
                            {electionDetails?.end}
                        </span>
                    </p>
                </div>
                <div className='flex flex-col gap-0.5'>
                    <p>Total Candidates</p>
                    <p className='flex items-center gap-2'>
                        <LuUsers className='text-accent text-base' />
                        <span className='font-semibold'>
                            {electionDetails?.totalCandidates}
                        </span>
                    </p>
                </div>
                <div className='flex flex-col gap-0.5'>
                    <p>Eligible Voters</p>
                    <p className='flex items-center gap-2'>
                        <LiaVoteYeaSolid className='text-accent text-base' />
                        <span className='font-semibold'>
                            {electionDetails?.eligibleVoters}
                        </span>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default ElectionDetails

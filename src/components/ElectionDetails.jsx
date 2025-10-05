import { LuActivity } from "react-icons/lu"
import { FaRegCalendar } from "react-icons/fa"
import { MdPeopleOutline } from "react-icons/md"
import { IoMdCheckmarkCircleOutline } from "react-icons/io"
import { LiaVoteYeaSolid } from "react-icons/lia"

const ElectionDetails = () => {
    /* MUST CHANGE THE DETAILS OF THE ELECTION TO DATA FETCHED FROM THE DB */
    const electionDetails = {
        title: "College Union Election 2025",
        status: "Voting Day (Active)",
        start: "November 8, 2025",
        end: "November 20, 2025",
        totalCandidates: 45,
        verifiedCandidates: 42,
        eligibleVoters: 3000
    }
    /* ----------------------------------------- */
    return (
        <div className='flex flex-col w-full gap-2 px-4 py-4 rounded-md dark:bg-card-dark bg-card-light shadow-lg transition-all duration-100'>
            <h2 className='text-lg font-bold text-left text-primary-light dark:text-primary-dark'>
                {electionDetails.title}
            </h2>
            <p className='flex items-center gap-1 text-secondary-light dark:text-secondary-dark'>
                <LuActivity className='text-secondary-light dark:text-secondary-dark' />
                <span>
                    Status:{" "}
                    <span className='text-accent'>
                        {electionDetails.status}
                    </span>
                </span>
            </p>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 lg:gap-x-10 py-3 text-primary-light dark:text-primary-dark'>
                <div className='flex flex-col gap-0.5'>
                    <p>Start Date</p>
                    <p className='flex items-center gap-2'>
                        <FaRegCalendar className='text-accent' />
                        <span className='font-semibold'>
                            {electionDetails.start}
                        </span>
                    </p>
                </div>
                <div className='flex flex-col gap-0.5'>
                    <p>End Date</p>
                    <p className='flex items-center gap-2'>
                        <FaRegCalendar className='text-accent' />
                        <span className='font-semibold'>
                            {electionDetails.end}
                        </span>
                    </p>
                </div>
                <div className='flex flex-col gap-0.5'>
                    <p>Total Candidates</p>
                    <p className='flex items-center gap-2'>
                        <MdPeopleOutline className='text-accent text-base' />
                        <span className='font-semibold'>
                            {electionDetails.totalCandidates}
                        </span>
                    </p>
                </div>
                <div className='flex flex-col gap-0.5'>
                    <p>Verified Candidates</p>
                    <p className='flex items-center gap-2'>
                        <IoMdCheckmarkCircleOutline className='text-accent text-base' />
                        <span className='font-semibold'>
                            {electionDetails.verifiedCandidates}
                        </span>
                    </p>
                </div>
                <div className='flex flex-col gap-0.5'>
                    <p>Eligible Voters</p>
                    <p className='flex items-center gap-2'>
                        <LiaVoteYeaSolid className='text-accent text-base' />
                        <span className='font-semibold'>
                            {electionDetails.eligibleVoters}
                        </span>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default ElectionDetails

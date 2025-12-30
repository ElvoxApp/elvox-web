import { LuActivity, LuUsers } from "react-icons/lu"
import { FaRegCalendar } from "react-icons/fa"
import { useElectionStore } from "../stores"
import formatDate from "../utils/formatDate"

const getElectionStatus = (e) => {
    const now = new Date()

    if (now < new Date(e.election_start)) return "Upcoming"

    if (now >= new Date(e.election_start) && now < new Date(e.nomination_start))
        return "Nominations Opening Soon"

    if (now >= new Date(e.nomination_start) && now < new Date(e.nomination_end))
        return "Nominations Open"

    if (now >= new Date(e.nomination_end) && now < new Date(e.voting_start))
        return "Voting Scheduled"

    if (now >= new Date(e.voting_start) && now < new Date(e.voting_end))
        return "Voting Live"

    if (now >= new Date(e.voting_end) && now <= new Date(e.election_end))
        return "Voting Ended"

    return "Closed"
}

const ElectionDetails = () => {
    const { election } = useElectionStore()

    return (
        <div className='flex flex-col w-full gap-2 px-4 py-4 rounded-md dark:bg-card-dark bg-card-light shadow-lg transition-all duration-100'>
            <h2 className='text-lg font-bold text-left text-primary-light dark:text-primary-dark'>
                {election?.name}
            </h2>
            <p className='flex items-center gap-1 text-secondary-light dark:text-secondary-dark'>
                <LuActivity className='text-secondary-light dark:text-secondary-dark' />
                <span>
                    Status:{" "}
                    <span className='text-accent'>
                        {getElectionStatus(election)}
                    </span>
                </span>
            </p>
            <div className='grid grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-x-10 py-3 text-primary-light dark:text-primary-dark'>
                <div className='flex flex-col gap-2'>
                    <p>Nomination Start</p>
                    <p className='flex items-center flex-1 gap-2'>
                        <FaRegCalendar className='text-accent' />
                        <span className='font-semibold'>
                            {formatDate(election?.nomination_start)}
                        </span>
                    </p>
                </div>
                <div className='flex flex-col gap-2'>
                    <p>Nomination End</p>
                    <p className='flex items-center flex-1 gap-2'>
                        <FaRegCalendar className='text-accent' />
                        <span className='font-semibold'>
                            {formatDate(election?.nomination_end)}
                        </span>
                    </p>
                </div>
                <div className='flex flex-col gap-2'>
                    <p>Voting Day</p>
                    <p className='flex items-center flex-1 gap-2'>
                        <FaRegCalendar className='text-accent' />
                        <span className='font-semibold'>
                            {formatDate(election?.voting_start)}
                        </span>
                    </p>
                </div>
                <div className='flex flex-col gap-2'>
                    <p>Total Candidates</p>
                    <p className='flex items-center flex-1 gap-2'>
                        <LuUsers className='text-accent text-base' />
                        <span className='font-semibold'>
                            {election?.total_candidates}
                        </span>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default ElectionDetails

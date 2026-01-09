import { LuActivity, LuUsers } from "react-icons/lu"
import { FaRegCalendar } from "react-icons/fa"
import { useElectionStore } from "../stores"
import formatDate from "../utils/formatDate"

const ElectionDetails = () => {
    const { election } = useElectionStore()

    const electionStatus = {
        draft: "Coming Soon",
        nominations: "Nominations Open",
        "pre-voting": "Voting Preparation",
        voting: "Voting Live",
        "post-voting": election?.result_published
            ? "Results Published"
            : "Voting Finished",
        closed: "Election Concluded"
    }

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
                        {electionStatus[election.status]}
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

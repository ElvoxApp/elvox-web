import capitalize from "../utils/capitalize"
import { FaRegCalendar } from "react-icons/fa"
import { useElectionStore } from "../stores"
import Button from "./Button"

const formatDate = (value) =>
    new Date(value)
        .toLocaleString("en-IN", {
            dateStyle: "medium",
            timeStyle: "short"
        })
        .replace(/\b(am|pm)\b/, (m) => m.toUpperCase())

const ManageElectionElectionDetails = () => {
    const { election } = useElectionStore()

    return (
        <div className='flex flex-col w-full gap-2 px-4 py-4 rounded-md border border-gray-500 shadow-lg transition-all duration-100'>
            <h2 className='flex items-center gap-3 text-lg font-bold text-left text-primary-light dark:text-primary-dark'>
                {election?.name}
                <span className='bg-yellow-400/40 dark:bg-yellow-400/20 text-yellow-600 dark:text-yellow-400 ring-1 ring-yellow-400/30 inline-block px-3 py-1 rounded-xl text-xs font-medium'>
                    {capitalize(election?.status)}
                </span>
            </h2>
            <div className='grid grid-cols-2 lg:grid-cols-5 gap-5 lg:gap-x-10 py-3 text-primary-light dark:text-primary-dark'>
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
                    <p>Voting Start</p>
                    <p className='flex items-center flex-1 gap-2'>
                        <FaRegCalendar className='text-accent' />
                        <span className='font-semibold'>
                            {formatDate(election?.voting_start)}
                        </span>
                    </p>
                </div>
                <div className='flex flex-col gap-2'>
                    <p>Voting End</p>
                    <p className='flex items-center flex-1 gap-2'>
                        <FaRegCalendar className='text-accent' />
                        <span className='font-semibold'>
                            {formatDate(election?.voting_end)}
                        </span>
                    </p>
                </div>
                <div className='flex flex-col gap-2'>
                    <p>Election End</p>
                    <p className='flex items-center flex-1 gap-2'>
                        <FaRegCalendar className='text-accent' />
                        <span className='font-semibold'>
                            {formatDate(election?.election_end)}
                        </span>
                    </p>
                </div>
            </div>
            <div className='flex flex-col gap-2 self-end mt-2'>
                <Button
                    text='Edit Election Details'
                    className='py-2 px-4 text-sm bg-accent hover:bg-button-hover'
                    onClick={() => {}}
                />
            </div>
        </div>
    )
}

export default ManageElectionElectionDetails

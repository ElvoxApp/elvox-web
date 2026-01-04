import { FiXCircle } from "react-icons/fi"
import { IoMdCheckmarkCircleOutline } from "react-icons/io"

const statusStyles = {
    won: "bg-green-400/30 dark:bg-green-400/20 text-green-500 dark:text-green-400 ring-1 ring-green-400/30 inline-block px-3 py-1 rounded-xl text-xs font-medium",
    lost: "bg-red-400/40 dark:bg-red-400/20 text-red-600 dark:text-red-400 ring-1 ring-red-400/30 inline-block px-3 py-1 rounded-xl text-xs font-medium"
}

const getYear = (sem) => {
    const y = Math.ceil(sem / 2)
    return ["First", "Second", "Third", "Fourth"][y - 1] + " year"
}

const Result = ({ result, election }) => {
    return (
        <div
            className={`flex items-center justify-between gap-3 p-3 rounded-md text-primary-light dark:text-primary-dark even:dark:bg-[#16171d] even:bg-[#c4c9d4] odd:dark:bg-bg-dark odd:bg-bg-light`}
        >
            <div className='flex items-center gap-3 flex-1'>
                <div>
                    {result?.result_status === "won" && (
                        <IoMdCheckmarkCircleOutline className='text-green-500 text-xl' />
                    )}
                    {result?.result_status === "lost" && (
                        <FiXCircle className='text-red-500 text-xl' />
                    )}
                </div>
                <div className='flex flex-col gap-2 flex-1'>
                    <p className='text-sm'>{result?.name}</p>
                    <p className='text-xs text-secondary-light dark:text-secondary-dark'>
                        {result?.class} ({getYear(result?.semester)})
                    </p>
                    <p className='text-xs text-secondary-light dark:text-secondary-dark'>
                        {election?.name}
                    </p>
                </div>
                <p className={statusStyles[result?.result_status]}>
                    {result?.result_status?.toUpperCase()}
                </p>
            </div>
        </div>
    )
}

export default Result

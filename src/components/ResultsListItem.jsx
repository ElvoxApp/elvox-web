import VoteProgressBar from "./VoteProgressBar"

const statusStyles = {
    TIE: "bg-yellow-400/40 dark:bg-yellow-400/20 text-yellow-600 dark:text-yellow-400 ring-1 ring-yellow-400/30 inline-block px-3 py-1 rounded-xl text-xs font-medium",
    WON: "bg-green-400/30 dark:bg-green-400/20 text-green-500 dark:text-green-400 ring-1 ring-green-400/30 inline-block px-3 py-1 rounded-xl text-xs font-medium",
    LOST: "bg-red-400/40 dark:bg-red-400/20 text-red-600 dark:text-red-400 ring-1 ring-red-400/30 inline-block px-3 py-1 rounded-xl text-xs font-medium"
}

const getYear = (sem) => {
    const y = Math.ceil(sem / 2)
    return ["First", "Second", "Third", "Fourth"][y - 1] + " year"
}

const ResultsListItem = ({ result }) => {
    return (
        <div className='flex flex-col gap-3 dark:bg-[#16171d] bg-bg-light text-primary-light dark:text-primary-dark rounded-md px-3 py-2'>
            <div className='flex items-center justify-between py-2 border-b border-gray-500'>
                <p className='text-[15px]'>
                    {result?.class}{" "}
                    <span className='text-[13px]'>
                        ({getYear(result?.semester)})
                    </span>
                </p>
                <p className='text-[15px]'>Total votes: {result?.totalVotes}</p>
            </div>
            <div className='flex flex-col gap-2'>
                {result?.candidates
                    .toSorted((a, b) => b.votes - a.votes)
                    .map((candidate) => (
                        <div
                            key={candidate?.id}
                            className='grid grid-cols-[6fr_1fr] max-sm:gap-y-7 sm:grid-cols-[1fr_1.5fr_1fr_0.5fr] sm:gap-x-8 py-2 items-center border-b border-gray-500 last:border-none'
                        >
                            <p>{candidate?.name}</p>
                            <VoteProgressBar
                                totalVotes={result?.totalVotes}
                                votes={candidate?.votes}
                                className='max-sm:hidden'
                            />
                            {candidate?.lead?.startsWith("+") ||
                            candidate?.lead?.startsWith("-") ? (
                                <p className='text-center max-sm:hidden'>
                                    {candidate.lead.startsWith("+")
                                        ? `${candidate.lead} Lead`
                                        : `${candidate.lead.slice(1)} Behind`}
                                </p>
                            ) : (
                                <div className='max-sm:hidden' /> // keeps grid alignment
                            )}

                            <p
                                className={`text-center ${
                                    statusStyles[candidate.status]
                                }`}
                            >
                                {candidate?.status}
                            </p>
                            <VoteProgressBar
                                totalVotes={result?.totalVotes}
                                votes={candidate?.votes}
                                className='sm:hidden col-span-2'
                            >
                                {candidate?.lead?.startsWith("+") ||
                                candidate?.lead?.startsWith("-") ? (
                                    <p className='absolute bottom-full right-0 sm:right-0 text-xs text-secondary-light dark:text-secondary-dark sm:hidden'>
                                        {candidate.lead.startsWith("+")
                                            ? `${candidate.lead} Lead`
                                            : `${candidate.lead.slice(
                                                  1
                                              )} Behind`}
                                    </p>
                                ) : (
                                    <div className='sm:hidden' /> // keeps grid alignment
                                )}
                            </VoteProgressBar>
                        </div>
                    ))}
            </div>
        </div>
    )
}

export default ResultsListItem

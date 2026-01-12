const VoteProgressBar = ({ totalVotes, votes, className, children }) => {
    const percentage =
        Number(totalVotes) === 0
            ? 0
            : (Number(votes) / Number(totalVotes)) * 100

    return (
        <div
            className={`flex flex-col justify-center relative sm:gap-1 w-full ${className}`}
        >
            <div className='absolute bottom-full left-0 sm:left-auto sm:right-0 text-xs text-secondary-light dark:text-secondary-dark pb-1 sm:pb-0.5'>
                {votes} votes · {percentage.toFixed(1)}%
            </div>
            {children}
            <div className='h-1 w-full rounded-md bg-zinc-300 dark:bg-zinc-800 overflow-hidden'>
                <div
                    className={`h-full bg-accent rounded-md transition-all duration-500`}
                    style={{ width: `${percentage}%` }}
                />
            </div>
        </div>
    )
}

export default VoteProgressBar

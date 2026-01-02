const getYear = (sem) => {
    const y = Math.ceil(sem / 2)
    return ["First", "Second", "Third", "Fourth"][y - 1] + " year"
}

const readableDate = (date) => {
    return new Date(date).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric"
    })
}

const Candidate = ({ candidate }) => {
    return (
        <div className='flex items-cente gap-3 dark:bg-[#16171d] bg-bg-light text-primary-light dark:text-primary-dark rounded-md px-3 py-2'>
            <div className='flex items-center'>
                <img
                    src={candidate?.profile_pic}
                    alt={candidate?.name}
                    className='w-14 md:w-18 rounded-full border border-accent'
                />
            </div>
            <div className='flex flex-col justify-center gap-1'>
                <div className='flex items-center gap-2'>
                    <p className='text-sm md:text-base text-primary-light dark:text-primary-dark text-center'>
                        {candidate?.name}
                    </p>
                </div>
                <div className='flex items-center gap-2'>
                    <p className='text-xs'>{candidate?.class},</p>
                    <p className='text-xs'>{getYear(candidate?.semester)}</p>
                </div>
                <div className='flex'>
                    <p className='text-secondary-light dark:text-secondary-dark text-xs text-center'>
                        Approved on: {readableDate(candidate.updated_at)}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Candidate

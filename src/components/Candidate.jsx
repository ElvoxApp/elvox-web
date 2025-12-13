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
        <div className='flex flex-col items-center justify-center bg-card-light dark:bg-card-dark rounded-lg px-3 py-4 gap-4'>
            <div className='flex flex-col gap-2 items-center'>
                <img
                    src={candidate?.profile_pic}
                    alt={candidate?.name}
                    className='w-18 md:w-24 lg:w-24 rounded-full border border-accent'
                />
                <p className='text-sm md:text-base text-primary-light dark:text-primary-dark text-center'>
                    {candidate?.name}
                </p>
            </div>
            <div className='flex gap-4 sm:gap-2 md:gap-3 lg:gap-4 justify-center text-xs text-primary-light dark:text-primary-dark'>
                <p className='border border-accent rounded-lg py-2 px-3 text-center break-words'>
                    {getYear(candidate?.semester)}
                </p>
                <p className='border border-accent rounded-lg py-2 px-3 text-center break-words'>
                    {candidate?.class}
                </p>
                <p className='border border-accent rounded-lg py-2 px-3 text-center break-words'>
                    {candidate?.position}
                </p>
            </div>
            <div className='flex justify-center items-center'>
                <p className='text-secondary-light dark:text-secondary-dark text-xs text-center'>
                    Approved on: {readableDate(candidate.created_at)}
                </p>
            </div>
        </div>
    )
}

export default Candidate

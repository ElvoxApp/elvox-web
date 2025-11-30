import SimpleBar from "simplebar-react"

const CandidateForm = ({ children }) => {
    return (
        <div className='flex flex-col gap-6 justify-between flex-2 w-full min-h-0'>
            <SimpleBar className='flex-1 min-h-0 max-sm:hidden'>
                {children}
            </SimpleBar>
            <div className='sm:hidden'>{children}</div>
        </div>
    )
}

export default CandidateForm

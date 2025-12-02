import { useMediaQuery } from "react-responsive"
import SimpleBar from "simplebar-react"

const CandidateForm = ({ children }) => {
    const isMobile = useMediaQuery({ query: "(max-width: 639px)" })

    return (
        <div className='flex flex-col gap-6 justify-between flex-2 w-full min-h-0'>
            {!isMobile ? (
                <SimpleBar className='flex-1 min-h-0 max-sm:hidden'>
                    {children}
                </SimpleBar>
            ) : (
                <div className='sm:hidden'>{children}</div>
            )}
        </div>
    )
}

export default CandidateForm

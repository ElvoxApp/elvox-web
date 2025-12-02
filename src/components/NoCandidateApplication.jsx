import Button from "./Button"
import { useAuthStore } from "../stores"

const NoCandidateApplication = ({ setIsCandidateApplicationOpen }) => {
    const {
        user: { role }
    } = useAuthStore()

    return (
        <div className='flex flex-col px-3 py-4 gap-8 flex-1 justify-center'>
            <div className='flex justify-center'>
                <h2 className='text-center text-primary-light dark:text-primary-dark text-2xl md:text-3xl lg:text-4xl font-black w-[20ch]'>
                    No Candidate Application Submitted
                </h2>
            </div>
            {role === "student" && (
                <div className='flex justify-center items-center'>
                    <Button
                        text='Submit Application'
                        className='px-6 py-3 text-sm font-medium bg-accent hover:bg-button-hover'
                        onClick={() => setIsCandidateApplicationOpen(true)}
                    />
                </div>
            )}
        </div>
    )
}

export default NoCandidateApplication

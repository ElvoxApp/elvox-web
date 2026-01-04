import { LuScroll } from "react-icons/lu"
import Button from "./Button"

const NoAppealsSubmitted = ({ setShowAppealForm }) => {
    return (
        <div className='flex flex-col px-3 py-4 flex-1 items-center justify-center'>
            <div className='flex flex-col px-3 py-4 gap-4 flex-1 items-center justify-center max-w-xl'>
                <LuScroll className='text-8xl text-primary-light dark:text-primary-dark' />
                <h2 className='text-center text-primary-light dark:text-primary-dark text-2xl md:text-3xl lg:text-4xl font-black'>
                    No Appeals Submitted
                </h2>
                <p className='text-sm md:text-base text-center text-secondary-light dark:text-secondary-dark'>
                    You haven't submitted any appeals yet. If you believe an
                    issue requires review, you can submit an appeal
                </p>
                <Button
                    text='Submit Appeal'
                    className='px-6 py-3 text-sm font-medium bg-accent hover:bg-button-hover'
                    onClick={() => setShowAppealForm(true)}
                />
            </div>
        </div>
    )
}

export default NoAppealsSubmitted

import { Link } from "react-router-dom"

const Unauthorized = () => {
    return (
        <div className='flex flex-1 justify-center items-center'>
            <title>Unauthorized</title>
            <div className='flex flex-col justify-center items-center gap-4'>
                <div className='flex flex-col gap-2'>
                    <h2 className='text-center text-primary-light dark:text-primary-dark text-4xl font-black'>
                        403 <br /> Unauthorized
                    </h2>
                    <p className='text-center text-sm text-secondary-light dark:text-secondary-dark  max-w-[28ch]'>
                        You don’t have permission to access this page.
                    </p>
                </div>
                <Link
                    to='/'
                    className='px-6 py-3 text-sm font-medium bg-accent hover:bg-button-hover text-primary-dark rounded-md active:scale-85 transition-all duration-200'
                >
                    Go to Dashboard
                </Link>
            </div>
        </div>
    )
}

export default Unauthorized

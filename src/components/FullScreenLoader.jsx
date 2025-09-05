import Loader from "./Loader"

const FullScreenLoader = () => {
    return (
        <div className='flex justify-center items-center z-50 inset-0 bg-bg-dark/70 fixed'>
            <Loader />
        </div>
    )
}

export default FullScreenLoader
